import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CONTENT_PROCESSOR_PROMPT = `You are a content processor that transforms meeting transcripts into structured, publishable articles for a GTM enablement platform.

Your task is to:
1. Analyze the transcript to identify key themes and topics
2. Extract actionable insights and important information
3. Structure content into logical sections with clear headings
4. Generate title, summary, and key takeaways
5. Suggest tags, categories, and SEO metadata
6. Format for immediate review and publishing

## Processing Guidelines:

### Content Quality Standards
- **Clarity**: Remove filler words (um, uh, like, you know), fix grammatical errors, make sentences clear and concise
- **Structure**: Organize into logical sections with descriptive headings
- **Completeness**: Capture all key points, include important examples, preserve technical details
- **Readability**: Active voice, short paragraphs (2-4 sentences), bullet points for lists
- **Accuracy**: Preserve technical terms correctly, keep product names capitalized, maintain context

### Output Format (Return ONLY valid JSON):
{
  "title": "Clear, descriptive, action-oriented title",
  "slug": "url-friendly-slug",
  "summary": "2-3 sentence executive summary",
  "category": "Product|Toolkit|Competitive|Learning|CoE|Resources",
  "contentType": "Training|Meeting|Demo|Guide",
  "audience": "Sales|CSM|SC|Marketing|Leadership|All Teams",
  "keyTakeaways": [
    "Major insight 1",
    "Major insight 2",
    "Major insight 3"
  ],
  "sections": [
    {
      "heading": "Section Heading",
      "content": "Well-organized content from transcript. Use markdown formatting for emphasis, lists, etc."
    }
  ],
  "actionItems": [
    "Actionable item 1",
    "Actionable item 2"
  ],
  "videoUrl": "URL to session recording if mentioned in transcript (Google Drive, Wistia, etc.) or null if not found",
  "slidesUrl": "URL to presentation slides if mentioned in transcript (Google Slides, PDF, etc.) or null if not found",
  "tags": ["tag1", "tag2", "tag3"],
  "readingTime": "X minutes",
  "seoTitle": "SEO-optimized title",
  "seoDescription": "SEO meta description"
}

## Category Assignment:
- Product features/updates → Product
- Sales techniques/pitches → Toolkit
- Competitive intel → Competitive
- Training sessions → Learning
- Best practices/frameworks → CoE
- Implementation guides → Resources

## Tag Suggestions:
Product: sidekick-voice, sidekick-sales, sidekick-chat, sidekick-email, customer-ai, hero-platform, guides
Skills: objection-handling, discovery, demo, roi, value-selling, competitive-positioning
Topics: ai, automation, integration, implementation, training, best-practices
Roles: sales, csm, sc, marketing, leadership

Return ONLY the JSON object, no additional text or markdown formatting.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcript, metadata } = body;

    if (!transcript || transcript.trim().length < 50) {
      return NextResponse.json(
        { error: 'Transcript must be at least 50 characters' },
        { status: 400 }
      );
    }

    // Build the full prompt with metadata context
    let fullPrompt = '';
    if (metadata) {
      fullPrompt += 'Context:\n';
      if (metadata.title) fullPrompt += `Meeting: ${metadata.title}\n`;
      if (metadata.date) fullPrompt += `Date: ${metadata.date}\n`;
      if (metadata.participants) fullPrompt += `Participants: ${metadata.participants}\n`;
      if (metadata.audience) fullPrompt += `Target Audience: ${metadata.audience}\n`;
      if (metadata.contentType) fullPrompt += `Content Type: ${metadata.contentType}\n`;
      fullPrompt += '\n';
    }
    fullPrompt += `Transcript:\n${transcript}`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `${CONTENT_PROCESSOR_PROMPT}\n\n${fullPrompt}`,
        },
      ],
    });

    // Extract the response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Parse the JSON response
    let processedContent;
    try {
      // Try to extract JSON if wrapped in markdown
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
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      },
    });
  } catch (error: unknown) {
    console.error('Error processing transcript:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to process transcript', message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process transcript', message: 'Unknown error' },
      { status: 500 }
    );
  }
}
