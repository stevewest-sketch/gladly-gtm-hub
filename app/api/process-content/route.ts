import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Template-specific prompts
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

const OUTPUT_FORMAT = `
## Output Format (Return ONLY valid JSON):
{
  "title": "Clear, descriptive, action-oriented title",
  "slug": "url-friendly-slug-lowercase-with-dashes",
  "summary": "2-3 sentence description for the card preview",
  "keyTakeaways": [
    "**Key Point 1** — Brief explanation (can use markdown bold)",
    "**Key Point 2** — Another key learning",
    "**Key Point 3** — Action-oriented takeaway",
    "**Key Point 4** — If applicable"
  ],
  "sections": [
    {
      "heading": "Step Name (e.g., Prep, Navigate, Pitch)",
      "content": "Detailed instructions for this step. Use bullet points separated by newlines."
    }
  ],
  "actionItems": [
    "**Do this** — Tip for success with brief explanation",
    "**Also consider** — Another positive tip",
    "Don't skip this step — Pitfall warning",
    "Don't forget to — Another pitfall to avoid"
  ],
  "faqs": [
    {
      "question": "Common question?",
      "answer": "Helpful answer with context."
    }
  ],
  "videoUrl": "Extract Google Drive, Wistia, YouTube, Vimeo, or Loom URLs, or null",
  "slidesUrl": "Extract Google Slides or presentation URLs, or null",
  "transcriptUrl": "Extract Google Doc URLs, or null",
  "suggestedCategory": "Learning|Product|Toolkit|Competitive|Playbook",
  "suggestedDifficulty": "beginner|intermediate|advanced",
  "duration": "Estimated duration in minutes (number only)",
  "presenter": "Name of presenter if mentioned, or null"
}

Return ONLY the JSON object, no additional text or markdown formatting.`;

const EDIT_PROMPT = `You are editing existing content based on user instructions.

You will receive:
1. The current document content (title, description, takeaways, etc.)
2. Fields to preserve (do NOT change these)
3. Edit instructions (what the user wants changed)

Your task:
- Apply the edit instructions to the appropriate fields
- Do NOT modify fields listed in "preserve"
- Maintain the same structure and format
- Keep the same tone and style as the original`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, content, pageTemplate, editPrompt, preserveFields, currentDocument } = body;

    // Handle EDIT mode
    if (mode === 'edit') {
      if (!editPrompt || editPrompt.trim().length < 10) {
        return NextResponse.json(
          { error: 'Edit prompt must be at least 10 characters' },
          { status: 400 }
        );
      }

      const editSystemPrompt = `${EDIT_PROMPT}

## Current Document:
${JSON.stringify(currentDocument, null, 2)}

## Fields to Preserve (DO NOT CHANGE):
${preserveFields?.length > 0 ? preserveFields.join(', ') : 'None - you may edit all fields'}

## Your Edit Instructions:
${editPrompt}

Return the updated document in this format:
${OUTPUT_FORMAT}`;

      const message = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `Apply these edits to the document:\n\n${editSystemPrompt}`,
          },
        ],
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonText = jsonMatch ? jsonMatch[0] : responseText;
        const processedContent = JSON.parse(jsonText);

        return NextResponse.json({
          success: true,
          data: processedContent,
          mode: 'edit',
          usage: {
            inputTokens: message.usage.input_tokens,
            outputTokens: message.usage.output_tokens,
          },
        });
      } catch (parseError) {
        console.error('Failed to parse edit response:', responseText);
        return NextResponse.json(
          { error: 'Failed to parse AI response', details: responseText },
          { status: 500 }
        );
      }
    }

    // Handle PASTE mode (generate from content)
    if (!content || content.trim().length < 50) {
      return NextResponse.json(
        { error: 'Content must be at least 50 characters' },
        { status: 400 }
      );
    }

    // Select the appropriate template prompt
    const templatePrompt = TEMPLATE_PROMPTS[pageTemplate] || TEMPLATE_PROMPTS.training;

    // Build the full system prompt
    const systemPrompt = `You are a content processor that transforms transcripts and documents into structured, publishable content for a GTM enablement platform.

${templatePrompt}

## Processing Guidelines:
- **Clarity**: Remove filler words, fix grammatical errors, make sentences clear and concise
- **Structure**: Organize into logical sections with descriptive headings
- **Completeness**: Capture all key points, include important examples, preserve technical details
- **Readability**: Active voice, short paragraphs, bullet points for lists
- **Actionable**: Focus on what people should DO, not just know
- **Markdown**: Use **bold** for emphasis in takeaways and action items

${OUTPUT_FORMAT}`;

    // Build user message
    let userMessage = `Process this content into a structured ${pageTemplate || 'training'} document:\n\n${content}`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `${systemPrompt}\n\n${userMessage}`,
        },
      ],
    });

    // Extract the response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse the JSON response
    let processedContent;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : responseText;
      processedContent = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      return NextResponse.json(
        { error: 'Failed to parse AI response', details: responseText },
        { status: 500 }
      );
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
  } catch (error: unknown) {
    console.error('Error processing content:', error);

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
