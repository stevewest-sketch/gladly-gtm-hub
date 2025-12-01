import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ==========================================
// TEMPLATE-SPECIFIC GENERATION PROMPTS
// ==========================================
const TEMPLATE_PROMPTS: Record<string, string> = {
  training: `You are processing content for a Training Session article.
Focus on:
- Learning objectives and key concepts taught
- Actionable skills and knowledge transfer
- Summary of what attendees should take away
- FAQs that learners commonly have`,

  playbook: `You are processing content for a Playbook (How-To Guide).
Focus on:
- Step-by-step process with clear action items
- Practical "How-To" sections (Prep, Navigate, Pitch, Follow-Up, etc.)
- Tips for success and common pitfalls to avoid
- Real-world applicability`,

  'battle-card': `You are processing content for a Battle Card (Competitive Positioning).
Focus on:
- Key differentiators and competitive advantages
- Objection handling and responses
- Quick-reference talking points
- Win themes and proof points`,
};

// ==========================================
// FIELD-SPECIFIC EDIT PROMPTS
// ==========================================
const FIELD_EDIT_PROMPTS: Record<string, string> = {
  title: `You are editing a document title.

Rules:
- Keep it clear, descriptive, and action-oriented
- Typically 5-15 words
- Should tell the reader what they'll learn or be able to do
- Use title case

Return ONLY the new title as plain text, no quotes, no JSON, no explanation.`,

  description: `You are editing a document description/summary.

Rules:
- Keep it to 2-3 sentences maximum
- Should work as a card preview - hook the reader
- Be specific about what the content covers
- Use active voice

Return ONLY the new description as plain text, no quotes, no JSON, no explanation.`,

  keyTakeaways: `You are editing a list of key takeaways.

Rules:
- Each takeaway should be actionable and specific
- Format: Start with **Bold key point** followed by a dash and explanation
- Example: "**Always confirm the decision maker** — Before diving into a demo, verify who has budget authority"
- Keep each takeaway to 1-2 sentences
- Aim for 3-5 takeaways total
- Use active voice and action verbs

Return ONLY a JSON array of strings. Example:
["**Point one** — Explanation here", "**Point two** — Another explanation"]`,

  articleSections: `You are editing how-to steps/sections for a playbook.

Rules:
- Each section needs a clear heading (the step name) and detailed content
- Headings should be action-oriented (e.g., "Prep the Account", "Run Discovery", "Handle Objections")
- Content should be practical instructions, can include bullet points within the text
- Keep steps in logical order
- Each section's content should be 2-4 sentences or a short paragraph

Return ONLY a JSON array of objects. Example:
[{"heading": "Step Name", "content": "Detailed instructions for this step..."}]`,

  actionItems: `You are editing a list of tips and pitfalls.

Rules:
- Tips should start with "**Do this**" or similar positive framing
- Pitfalls should start with "**Don't**" or "**Avoid**" as a warning
- Each item should be actionable and specific
- Mix of tips (things to do) and pitfalls (things to avoid)
- Keep each item to 1-2 sentences

Return ONLY a JSON array of strings. Example:
["**Do this** — Positive tip with explanation", "**Don't skip** — Warning about common mistake"]`,
};

// ==========================================
// OUTPUT FORMAT FOR GENERATION (pageSections format)
// ==========================================
const GENERATION_OUTPUT_FORMAT = `
## Output Format (Return ONLY valid JSON, no markdown code blocks, no explanation):
{
  "title": "Clear, descriptive, action-oriented title",
  "slug": "url-friendly-slug-lowercase-with-dashes",
  "summary": "2-3 sentence description for the card preview",
  "pageSections": [
    {
      "sectionType": "overview",
      "title": "Overview",
      "overviewCards": [
        {
          "label": "What It Is",
          "content": "A brief explanation of what this content covers and its purpose."
        },
        {
          "label": "Who It's For",
          "content": "The target audience - e.g., Sales reps, CSMs, New hires, etc."
        },
        {
          "label": "Key Outcome",
          "content": "What the reader will be able to do or understand after engaging with this."
        }
      ]
    },
    {
      "sectionType": "takeaways",
      "title": "Key Takeaways",
      "takeaways": [
        "**Key Point 1** — Brief explanation of the first key learning",
        "**Key Point 2** — Another important takeaway",
        "**Key Point 3** — Action-oriented insight"
      ]
    },
    {
      "sectionType": "process",
      "title": "How To",
      "processLayout": "numbered",
      "processSteps": [
        {
          "heading": "Step Name",
          "content": "Detailed instructions for this step."
        }
      ]
    },
    {
      "sectionType": "tips",
      "title": "Tips & Best Practices",
      "tips": [
        "**Do this** — Tip for success with explanation",
        "**Avoid this** — Common pitfall to watch out for"
      ]
    },
    {
      "sectionType": "faq",
      "title": "FAQs",
      "faqs": [
        {
          "question": "Common question?",
          "answer": "Helpful, detailed answer."
        }
      ]
    }
  ],
  "videoUrl": "Extract video URLs (Google Drive, Wistia, YouTube, Loom) or null",
  "slidesUrl": "Extract presentation URLs or null",
  "suggestedCategory": "Learning|Product|Toolkit|Competitive|Playbook",
  "suggestedDifficulty": "beginner|intermediate|advanced",
  "duration": "Estimated minutes as number only",
  "presenter": "Name if mentioned, or null"
}

IMPORTANT:
- ALWAYS include an "overview" section with overviewCards as the FIRST section
- The overview section MUST have 2-4 cards with labels like "What It Is", "Who It's For", "Key Outcome", "When to Use"
- Each pageSection MUST have a sectionType and title
- For takeaways, use **bold** for the key point followed by an em-dash and explanation
- For process steps, each step needs a heading and content
- Skip other sections if there's no relevant content (e.g., skip FAQ if no questions are evident)`;

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function parseJsonResponse(text: string, expectArray: boolean = false): unknown {
  // Clean up the response
  let cleaned = text.trim();

  // Remove markdown code blocks if present
  cleaned = cleaned.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '');

  // Try to extract JSON
  if (expectArray) {
    const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      return JSON.parse(arrayMatch[0]);
    }
  } else {
    const objectMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      return JSON.parse(objectMatch[0]);
    }
  }

  // If no JSON found, return the cleaned text for string fields
  return cleaned;
}

function cleanStringResponse(text: string): string {
  return text
    .trim()
    .replace(/^["']|["']$/g, '') // Remove surrounding quotes
    .replace(/^```[\s\S]*?```$/gm, '') // Remove code blocks
    .trim();
}

// ==========================================
// MAIN HANDLER
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode } = body;

    // ==========================================
    // MODE: edit-field (Single field targeted edit)
    // ==========================================
    if (mode === 'edit-field') {
      const { targetField, currentValue, editPrompt, context } = body;

      // Validate
      if (!targetField || !FIELD_EDIT_PROMPTS[targetField]) {
        return NextResponse.json(
          { error: `Invalid or unsupported field: ${targetField}` },
          { status: 400 }
        );
      }

      if (!editPrompt || editPrompt.trim().length < 3) {
        return NextResponse.json(
          { error: 'Edit prompt is required' },
          { status: 400 }
        );
      }

      if (currentValue === undefined || currentValue === null ||
          (Array.isArray(currentValue) && currentValue.length === 0) ||
          (typeof currentValue === 'string' && currentValue.trim() === '')) {
        return NextResponse.json(
          { error: 'Cannot edit empty field. Add content first.' },
          { status: 400 }
        );
      }

      const fieldPrompt = FIELD_EDIT_PROMPTS[targetField];
      const isStringField = targetField === 'title' || targetField === 'description';

      // Format current value for the prompt
      let currentValueStr: string;
      if (Array.isArray(currentValue)) {
        currentValueStr = JSON.stringify(currentValue, null, 2);
      } else {
        currentValueStr = String(currentValue);
      }

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', // Use Sonnet for better editing quality
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: `${fieldPrompt}

CURRENT VALUE:
${currentValueStr}

CONTEXT:
- Document title: ${context?.title || 'Untitled'}
- Template type: ${context?.pageTemplate || 'training'}

USER'S EDIT REQUEST:
"${editPrompt}"

Apply the requested edit. Return ONLY the new value in the exact format specified above.`,
          },
        ],
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

      let newValue: unknown;
      try {
        if (isStringField) {
          newValue = cleanStringResponse(responseText);
        } else {
          newValue = parseJsonResponse(responseText, true);
          if (!Array.isArray(newValue)) {
            throw new Error('Expected array response');
          }
        }
      } catch (parseError) {
        console.error(`Failed to parse ${targetField} edit response:`, responseText);
        return NextResponse.json(
          {
            error: 'Failed to parse AI response. Try a simpler edit request.',
            details: responseText.slice(0, 500)
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: { [targetField]: newValue },
        mode: 'edit-field',
        targetField,
        usage: {
          inputTokens: message.usage.input_tokens,
          outputTokens: message.usage.output_tokens,
        },
      });
    }

    // ==========================================
    // MODE: edit (Bulk edit multiple fields)
    // ==========================================
    if (mode === 'edit') {
      const { editPrompt, preserveFields = [], pageTemplate, currentDocument } = body;

      if (!editPrompt || editPrompt.trim().length < 10) {
        return NextResponse.json(
          { error: 'Edit prompt must be at least 10 characters' },
          { status: 400 }
        );
      }

      // Determine which fields have content and can be edited
      const editableFields = ['title', 'description', 'keyTakeaways', 'articleSections', 'actionItems'];
      const fieldsWithContent = editableFields.filter(field => {
        const value = currentDocument?.[field];
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'string') return value.trim().length > 0;
        return false;
      });

      const fieldsToEdit = fieldsWithContent.filter(f => !preserveFields.includes(f));

      if (fieldsToEdit.length === 0) {
        return NextResponse.json({
          success: true,
          data: currentDocument,
          mode: 'edit',
          fieldsEdited: [],
          message: 'No fields to edit (all preserved or empty)',
        });
      }

      // Edit each field that needs updating
      const updates: Record<string, unknown> = {};
      let totalInputTokens = 0;
      let totalOutputTokens = 0;

      for (const field of fieldsToEdit) {
        const fieldPrompt = FIELD_EDIT_PROMPTS[field];
        if (!fieldPrompt) continue;

        const currentValue = currentDocument[field];
        const isStringField = field === 'title' || field === 'description';

        let currentValueStr: string;
        if (Array.isArray(currentValue)) {
          currentValueStr = JSON.stringify(currentValue, null, 2);
        } else {
          currentValueStr = String(currentValue);
        }

        try {
          const fieldMessage = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            messages: [
              {
                role: 'user',
                content: `${fieldPrompt}

CURRENT VALUE:
${currentValueStr}

CONTEXT:
- Document title: ${currentDocument.title || 'Untitled'}
- Template type: ${pageTemplate || 'training'}
- This is part of a bulk edit. The user wants: "${editPrompt}"

Apply the requested changes to this field. Return ONLY the new value in the exact format specified above.`,
              },
            ],
          });

          totalInputTokens += fieldMessage.usage.input_tokens;
          totalOutputTokens += fieldMessage.usage.output_tokens;

          const responseText = fieldMessage.content[0].type === 'text' ? fieldMessage.content[0].text : '';

          if (isStringField) {
            updates[field] = cleanStringResponse(responseText);
          } else {
            const parsed = parseJsonResponse(responseText, true);
            if (Array.isArray(parsed)) {
              updates[field] = parsed;
            }
          }
        } catch (fieldError) {
          console.error(`Failed to edit ${field}:`, fieldError);
          // Continue with other fields
        }
      }

      // Merge updates with original document
      const result = { ...currentDocument };
      for (const [field, value] of Object.entries(updates)) {
        result[field] = value;
      }

      // Generate new slug if title changed
      if (updates.title && updates.title !== currentDocument.title) {
        result.slug = (updates.title as string)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 96);
      }

      return NextResponse.json({
        success: true,
        data: result,
        mode: 'edit',
        fieldsEdited: Object.keys(updates),
        usage: {
          inputTokens: totalInputTokens,
          outputTokens: totalOutputTokens,
        },
      });
    }

    // ==========================================
    // MODE: paste (Generate from content)
    // ==========================================
    if (mode === 'paste' || !mode) {
      const { content, pageTemplate, metadata } = body;

      if (!content || content.trim().length < 50) {
        return NextResponse.json(
          { error: 'Content must be at least 50 characters' },
          { status: 400 }
        );
      }

      const templatePrompt = TEMPLATE_PROMPTS[pageTemplate] || TEMPLATE_PROMPTS.training;

      const systemPrompt = `You are a content processor that transforms transcripts and documents into structured, publishable content for a GTM enablement platform.

${templatePrompt}

## Processing Guidelines:
- **Clarity**: Remove filler words, fix grammatical errors, make sentences clear and concise
- **Structure**: Organize into logical sections with descriptive headings
- **Completeness**: Capture all key points, include important examples, preserve technical details
- **Readability**: Active voice, short paragraphs, bullet points for lists
- **Actionable**: Focus on what people should DO, not just know
- **Formatting**: Use **bold** for emphasis in takeaways and action items

${GENERATION_OUTPUT_FORMAT}`;

      // Build context from metadata
      let contextStr = '';
      if (metadata) {
        if (metadata.title) contextStr += `Suggested title: ${metadata.title}\n`;
        if (metadata.presenter) contextStr += `Presenter: ${metadata.presenter}\n`;
        if (metadata.audience) contextStr += `Target audience: ${metadata.audience}\n`;
      }

      const userMessage = `${contextStr ? `Context:\n${contextStr}\n` : ''}Process this content into a structured ${pageTemplate || 'training'} document:\n\n${content}`;

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', // Using Sonnet for better quality generation
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `${systemPrompt}\n\n${userMessage}`,
          },
        ],
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

      let processedContent: Record<string, unknown>;
      try {
        const parsed = parseJsonResponse(responseText, false);
        if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) {
          throw new Error('Expected object response');
        }
        processedContent = parsed as Record<string, unknown>;
      } catch (parseError) {
        console.error('Failed to parse generation response:', responseText);
        return NextResponse.json(
          { error: 'Failed to parse AI response', details: responseText.slice(0, 500) },
          { status: 500 }
        );
      }

      // Add presenter from metadata if not extracted
      if (metadata?.presenter && !processedContent.presenter) {
        processedContent.presenter = metadata.presenter;
      }

      return NextResponse.json({
        success: true,
        data: processedContent,
        mode: 'paste',
        pageTemplate,
        usage: {
          inputTokens: message.usage.input_tokens,
          outputTokens: message.usage.output_tokens,
        },
      });
    }

    // Unknown mode
    return NextResponse.json(
      { error: `Unknown mode: ${mode}` },
      { status: 400 }
    );

  } catch (error: unknown) {
    console.error('Error processing content:', error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: 'AI service error', message: error.message },
        { status: 502 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to process content', message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process content', message: 'Unknown error' },
      { status: 500 }
    );
  }
}
