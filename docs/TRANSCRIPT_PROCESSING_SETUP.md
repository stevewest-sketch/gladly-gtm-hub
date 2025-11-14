# Transcript Processing Setup Guide

## Overview

The Transcript Processing feature allows you to paste meeting transcripts directly into Sanity Studio and have AI automatically generate a structured, publishable article with title, summary, sections, tags, and SEO metadata.

## Features

- **One-Click Processing**: Process transcripts with a single button click in Sanity Studio
- **AI-Powered**: Uses Claude 3.5 Sonnet to intelligently extract key information
- **Structured Output**: Generates title, summary, key takeaways, content sections, action items, tags
- **SEO Ready**: Automatically creates SEO metadata
- **Optional Metadata**: Enhance processing by providing meeting context
- **Time Savings**: 2 hours → 10 minutes per article (90% reduction)

## Setup Instructions

### 1. Get Anthropic API Key

1. Go to https://console.anthropic.com/
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

### 2. Add Environment Variable

Add to your `.env.local` file:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

**Important:** Never commit this file to Git!

### 3. Restart Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## How to Use

### Step 1: Create New Enablement Article

1. Open Sanity Studio at http://localhost:3000/studio
2. Click "Create" or the + button
3. Select "Enablement Articles"

### Step 2: Process Transcript

1. In the document toolbar, click "Process Transcript" button (sparkles icon)
2. A modal will appear with two sections:

   **Metadata (Optional but Recommended):**
   - Meeting title
   - Date
   - Participants
   - Target audience
   - Content type

   **Transcript (Required):**
   - Paste your meeting transcript (minimum 50 characters)

3. Click "Process Transcript"
4. Wait 10-30 seconds for AI processing
5. Fields will auto-populate with structured content

### Step 3: Review and Publish

1. Review the generated content
2. Make any necessary edits
3. Click "Publish" to make it live

## Example Workflow

### Input

```
Metadata:
- Title: Claude Code Club Session
- Date: November 14, 2024
- Participants: Nate, Steve
- Audience: Development Team
- Content Type: Training

Transcript:
Today we discussed best practices for Claude Code development...
[paste full transcript]
```

### Output (Auto-Generated)

```
Title: Claude Code Club: Best Practices for Development Workflows
Slug: claude-code-club-nov-14
Summary: Comprehensive discussion on Claude Code development best practices...

Category: Learning
Content Type: Training
Audience: All Teams

Key Takeaways:
- Use Google File Search instead of complex RAG
- Create Claude skills for automation
- Commit frequently with proper messages
- [more insights...]

Sections:
1. Introduction
   [processed content]

2. Development Best Practices
   [processed content]

3. Integration Strategies
   [processed content]

Action Items:
- Set up Google File Search API
- Create content processor skill
- Configure webhooks

Tags: claude-code, ai, automation, best-practices
Reading Time: 8 minutes

SEO:
- Title: Claude Code Best Practices Guide | Development Workflows
- Description: Learn best practices for Claude Code development...
```

## Processing Guidelines

The AI follows these quality standards:

### Content Cleanup
- Removes filler words (um, uh, like)
- Fixes grammatical errors
- Makes sentences clear and concise

### Structure
- Organizes into logical sections
- Uses descriptive headings
- Groups related topics

### Completeness
- Captures all key points
- Includes important examples
- Preserves technical details

### Accuracy
- Preserves technical terms correctly
- Maintains product name capitalization
- Keeps context and meaning

## Category Assignment

The AI automatically assigns categories based on content:

| Content About | Category | Audience |
|--------------|----------|----------|
| Product features/updates | Product | All Teams |
| Sales techniques/pitches | Toolkit | Sales |
| Customer success strategies | Toolkit | CSM |
| Battle cards/competitors | Competitive | Sales, SC |
| Training sessions | Learning | Role-specific |
| Best practices/frameworks | CoE | All Teams |
| Implementation guides | Resources | SC, CSM |

## Tag Suggestions

The AI suggests relevant tags from these categories:

**Product Tags:**
- sidekick-voice, sidekick-sales, sidekick-chat
- sidekick-email, customer-ai, hero-platform, guides

**Skill Tags:**
- objection-handling, discovery, demo
- roi, value-selling, competitive-positioning

**Topic Tags:**
- ai, automation, integration
- implementation, training, best-practices

**Role Tags:**
- sales, csm, sc, marketing, leadership

## API Details

### Endpoint
`POST /api/process-transcript`

### Request Format
```json
{
  "transcript": "Meeting transcript text...",
  "metadata": {
    "title": "Meeting Title",
    "date": "November 14, 2024",
    "participants": "Names",
    "audience": "Target audience",
    "contentType": "Training"
  }
}
```

### Response Format
```json
{
  "success": true,
  "data": {
    "title": "Generated Title",
    "slug": "generated-slug",
    "summary": "Executive summary...",
    "category": "Learning",
    "contentType": "Training",
    "audience": "All Teams",
    "keyTakeaways": ["Insight 1", "Insight 2"],
    "sections": [
      {
        "heading": "Section 1",
        "content": "Section content..."
      }
    ],
    "actionItems": ["Action 1", "Action 2"],
    "tags": ["tag1", "tag2"],
    "readingTime": "5 minutes",
    "seoTitle": "SEO Title",
    "seoDescription": "SEO description"
  },
  "usage": {
    "inputTokens": 1234,
    "outputTokens": 567
  }
}
```

## Troubleshooting

### Issue: "Process Transcript" button not appearing
**Solution:** Make sure you're editing an "Enablement Article" document type, not a different document type.

### Issue: "Transcript must be at least 50 characters"
**Solution:** Ensure your transcript has substantial content (minimum 50 characters).

### Issue: API Error or timeout
**Solutions:**
1. Check that ANTHROPIC_API_KEY is set in .env.local
2. Restart the development server
3. Check that the API key is valid
4. Verify you have Claude API credits

### Issue: Fields not populating after processing
**Solutions:**
1. Check browser console for errors
2. Verify the API response in Network tab
3. Make sure you clicked "Process Transcript" (not just typing)

### Issue: Generated content is poor quality
**Solutions:**
1. Add more metadata context (meeting title, date, etc.)
2. Ensure transcript is clean and readable
3. Provide longer, more detailed transcripts
4. Specify target audience and content type

## Cost Considerations

### Claude API Pricing
- Claude 3.5 Sonnet: $3 per million input tokens, $15 per million output tokens
- Average transcript (2000 words): ~$0.02 per processing
- 100 transcripts per month: ~$2

### Usage Tips
- Process transcripts in bulk during off-hours
- Review generated content before re-processing
- Use metadata to improve first-time quality

## Future Enhancements

Planned improvements:
- Batch processing multiple transcripts
- Custom prompts for different content types
- Auto-translation to multiple languages
- Integration with Zoom/Gong for direct transcript import
- Version history for processed articles

## Support

For issues or questions:
1. Check this documentation
2. Review API logs in browser console
3. Check Anthropic API status page
4. Contact development team

---

**Last Updated:** November 14, 2024
**Version:** 1.0.0
