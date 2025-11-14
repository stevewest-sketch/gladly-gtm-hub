---
skill: content-processor
description: Transform meeting transcripts into structured, publishable articles
tags: [automation, content, transcripts, articles]
version: 1.0.0
---

# Content Processor Skill

## Purpose

Automates the conversion of meeting transcripts, training session recordings, and enablement discussions into well-structured, publishable articles ready for the GTM Enablement Hub.

**Time Savings:** 2 hours → 10 minutes per article (90% reduction)

## What This Skill Does

1. **Analyzes** the transcript to identify key themes and topics
2. **Extracts** actionable insights and important information
3. **Structures** content into logical sections with clear headings
4. **Generates** title, summary, and key takeaways
5. **Creates** Sanity CMS-compatible JSON schema
6. **Suggests** tags, categories, and SEO metadata
7. **Formats** for immediate review and publishing

## How to Use

### In Claude Code (Recommended)

```
Hey Claude, use the content-processor skill to process this transcript:

[Title/Context]
Meeting: Claude Code Club Session
Date: November 14, 2024
Participants: Nate Larkin, Steve

[Paste full transcript here]
```

### Alternative Methods

**Option 1: Direct Invocation**
```
/skill content-processor

Input: [paste transcript]
```

**Option 2: With Context**
```
Process this enablement session transcript into an article:

Context: Training session on Sidekick Voice features
Audience: Sales team
Priority: High

Transcript:
[paste transcript]
```

## Input Format

### Required
- **Transcript Text** - Raw transcript from Zoom, Gong, or manual notes
- Minimum 200 words for meaningful processing

### Optional (Improves Output Quality)
- **Meeting Title** - Name of session/meeting
- **Date** - When it occurred
- **Participants** - Who was involved
- **Context** - What the session was about
- **Target Audience** - Who should read this (Sales, CSM, etc.)
- **Content Type** - Training, meeting notes, demo walkthrough, etc.

### Example Input

```
Meeting: Sales Enablement - Competitive Positioning
Date: November 14, 2024
Participants: Sarah (Product Marketing), Team
Audience: Account Executives
Type: Training Session

Transcript:
[00:00] Sarah: Today we're covering how to position against Zendesk...
[00:02] The key differentiator is our people-centric approach...
[full transcript continues]
```

## Output Format

### 1. Structured Markdown Article

```markdown
# [Generated Title]

**Published:** [Date]
**Type:** [Content Type]
**Audience:** [Target Audience]
**Reading Time:** [X] minutes

## Summary

[2-3 sentence executive summary of the content]

## Key Takeaways

- [Major insight 1]
- [Major insight 2]
- [Major insight 3]
- [Additional insights as needed]

## [Section 1 Heading]

[Well-organized content from transcript]

### [Subsection if needed]

[Detailed content]

## [Section 2 Heading]

[Continued content]

## Action Items

- [ ] [Actionable item 1]
- [ ] [Actionable item 2]
- [ ] [Actionable item 3]

## Next Steps

[Recommended follow-up actions or related resources]

---

**Tags:** `tag1`, `tag2`, `tag3`
**Category:** [Suggested category]
```

### 2. Sanity CMS JSON Schema

```json
{
  "_type": "page",
  "title": "[Generated Title]",
  "slug": {
    "current": "[auto-generated-slug]"
  },
  "publishedAt": "[ISO date]",
  "category": "[Category]",
  "audience": "[Target audience]",
  "contentType": "[Type]",
  "summary": "[Executive summary]",
  "sections": [
    {
      "_type": "textSection",
      "heading": "[Section Heading]",
      "content": [
        {
          "_type": "block",
          "children": [
            {
              "_type": "span",
              "text": "[Section content]"
            }
          ]
        }
      ]
    }
  ],
  "tags": ["tag1", "tag2", "tag3"],
  "seo": {
    "metaTitle": "[SEO Title]",
    "metaDescription": "[SEO Description]",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

### 3. Metadata File

```yaml
title: "[Article Title]"
slug: "[url-slug]"
category: "[Category]"
audience: "[Audience]"
type: "[Content Type]"
tags:
  - tag1
  - tag2
  - tag3
keywords:
  - keyword1
  - keyword2
estimated_reading_time: "X minutes"
date: "2024-11-14"
seo_title: "[SEO Title]"
seo_description: "[Meta Description]"
```

## Processing Guidelines

### Content Quality Standards

When processing transcripts, ensure the output:

1. **Clarity**
   - Remove filler words (um, uh, like, you know)
   - Fix grammatical errors
   - Make sentences clear and concise

2. **Structure**
   - Organize into logical sections
   - Use descriptive headings
   - Group related topics together
   - Add context where conversation jumps topics

3. **Completeness**
   - Capture all key points
   - Include important examples
   - Preserve technical details
   - Note any action items or decisions

4. **Readability**
   - Write in active voice
   - Use short paragraphs (2-4 sentences)
   - Add bullet points for lists
   - Include subsections for long topics

5. **Accuracy**
   - Preserve technical terms correctly
   - Keep product names capitalized properly
   - Maintain context and meaning
   - Don't add information not in transcript

### Section Structure Best Practices

**Typical Article Structure:**

1. **Title** - Clear, descriptive, action-oriented
2. **Summary** - What, why, who (2-3 sentences)
3. **Key Takeaways** - 3-7 bullet points
4. **Main Content** - 3-5 major sections
5. **Action Items** - Concrete next steps
6. **Related Resources** - Links to relevant content

**Section Naming:**
- Use descriptive, specific headings
- Front-load important words
- Make scannable for quick reading
- Examples: "How to Handle Zendesk Objections" vs "Objections"

### Category Assignment Guidelines

| Content About | Category | Audience |
|--------------|----------|----------|
| Product features, updates | Product | All Teams |
| Sales techniques, pitches | Toolkit | Sales |
| Customer success strategies | Toolkit | CSM |
| Battle cards, competitors | Competitive | Sales, SC |
| Training sessions | Learning | Role-specific |
| Best practices, frameworks | CoE | All Teams |
| Implementation guides | Resources | SC, CSM |
| Demo walkthroughs | Learning | Sales, SC |

### Tag Suggestions

**Product Tags:**
sidekick-voice, sidekick-sales, sidekick-chat, sidekick-email, customer-ai, hero-platform, guides

**Skill Tags:**
objection-handling, discovery, demo, roi, value-selling, competitive-positioning

**Topic Tags:**
ai, automation, integration, implementation, training, best-practices

**Role Tags:**
sales, csm, sc, marketing, leadership

## Examples

### Example 1: Training Session

**Input:**
```
Meeting: Sidekick Voice Training
Date: Nov 14, 2024
Audience: Sales Team

Transcript:
[00:00] Today we're covering Sidekick Voice capabilities...
[00:05] The main differentiator is real-time call handling...
[00:10] Here's how to demo the voice features...
[continues for 30 minutes]
```

**Output:**
```markdown
# Sidekick Voice Training: Real-Time Call Handling & Demo Techniques

**Published:** November 14, 2024
**Type:** Training Session
**Audience:** Sales Team
**Reading Time:** 8 minutes

## Summary

Comprehensive training on Sidekick Voice capabilities, focusing on real-time call handling features and effective demonstration techniques for prospect meetings.

## Key Takeaways

- Sidekick Voice handles calls in real-time without transfer delays
- Three demo scenarios show different use cases effectively
- ROI calculator shows average 40% reduction in call handling time
- Best practice: Demo with customer's actual call scenarios

[Full article continues...]
```

### Example 2: Meeting Notes

**Input:**
```
Meeting: Weekly Enablement Sync
Participants: Team leads
Type: Meeting Notes

Transcript:
Quick sync on priorities. Sarah mentioned new battle card for Intercom.
Mike needs help with SC onboarding materials.
Launch of new training module next week.
```

**Output:**
```markdown
# Weekly Enablement Sync - November 14, 2024

## Summary

Team alignment on current priorities including new competitive content, SC onboarding improvements, and upcoming training module launch.

## Key Discussion Points

### New Competitive Content
- Sarah developing updated Intercom battle card
- Focus on AI capabilities comparison
- Target completion: End of week

### SC Onboarding
- Mike identified gaps in current materials
- Need technical implementation guides
- Priority for next sprint

### Training Module Launch
- New Sidekick Sales module ready
- Launch scheduled for next week
- Team to review by Friday

## Action Items

- [ ] Sarah: Complete Intercom battle card (EOW)
- [ ] Mike: Document SC onboarding gaps (by Monday)
- [ ] Team: Review training module (by Friday)
```

## Best Practices

### Getting Best Results

1. **Provide Context**
   - Include meeting title, date, participants
   - Note the target audience
   - Specify content type (training, meeting, demo, etc.)

2. **Clean Transcript (Optional)**
   - Remove timestamp prefixes if desired (I can handle them)
   - Remove extreme repetition or cross-talk
   - Keep technical terms and proper nouns

3. **Specify Requirements**
   - Tell me if you want shorter/longer output
   - Request specific sections if needed
   - Note any must-include information

4. **Iterate if Needed**
   - Review the output
   - Ask for adjustments ("Make the summary shorter")
   - Request section reorganization if needed

### Common Adjustments

**"Make it more concise"** - I'll reduce word count by 30-40%
**"Add more detail to [section]"** - I'll expand that section
**"Change tone to [casual/formal/technical]"** - I'll adjust language
**"Focus on [specific aspect]"** - I'll emphasize that area
**"Split this into multiple articles"** - I'll create separate pieces

### Quality Checklist

Before finalizing, verify the output has:
- [ ] Clear, descriptive title
- [ ] 2-3 sentence summary
- [ ] 3-7 key takeaways
- [ ] Logical section structure
- [ ] Action items (if applicable)
- [ ] Appropriate tags
- [ ] Correct category
- [ ] SEO metadata
- [ ] Proper formatting

## Publishing Workflow

### After Processing

1. **Review** the generated article
   - Check for accuracy
   - Verify all key points included
   - Ensure proper formatting

2. **Edit** as needed
   - Refine wording
   - Add context
   - Include additional links

3. **Choose Publishing Method:**

   **Option A: Sanity Studio (Manual)**
   - Copy generated JSON
   - Create new document in Sanity Studio
   - Paste JSON content
   - Preview and publish

   **Option B: Markdown File**
   - Save as .md file in project
   - Create PR manually
   - Review and merge

   **Option C: Direct Publishing Script** (Future)
   - Use `npm run publish-article article.json`
   - Auto-creates in Sanity
   - Auto-indexes to search

## Limitations & Considerations

### What This Skill Can Do
✅ Process transcripts of any length
✅ Extract key themes and insights
✅ Create well-structured articles
✅ Generate metadata and tags
✅ Produce Sanity-compatible JSON
✅ Handle technical discussions
✅ Preserve important context

### What This Skill Cannot Do
❌ Access external systems (Sanity, GitHub) directly
❌ Auto-publish without your review
❌ Generate content not in the transcript
❌ Make strategic content decisions
❌ Replace human editorial judgment

### When to Use This Skill

**Great For:**
- Training session transcripts
- Enablement meeting notes
- Product demo walkthroughs
- Customer call summaries
- Strategy discussions
- Weekly sync notes

**Not Ideal For:**
- Very short conversations (< 200 words)
- Highly technical/code-heavy discussions
- Conversations with poor audio/transcript quality
- Confidential/sensitive information
- Real-time conversations (process after complete)

## Troubleshooting

### Issue: Output too long
**Solution:** Request "shorter version" or "executive summary only"

### Issue: Missing key information
**Solution:** Point out what's missing: "Include discussion about X"

### Issue: Wrong tone/style
**Solution:** Specify desired tone: "More casual" or "More technical"

### Issue: Poor section organization
**Solution:** Request reorganization: "Group all competitive info together"

### Issue: Incorrect category
**Solution:** Specify category: "This should be categorized as Training"

## Version History

**v1.0.0** (November 14, 2024)
- Initial release
- Core transcript processing
- Sanity JSON generation
- SEO metadata creation

---

## Related Skills

- **seo-optimizer** - Enhance SEO after article creation
- **component-generator** - Build UI components for articles
- **schema-creator** - Create new Sanity schemas

## Feedback & Improvements

This skill improves with usage. If you notice patterns or have suggestions:
- Note what works well
- Share examples of ideal output
- Suggest additional features
- Report issues or edge cases

The more you use it, the better it gets at matching your style and needs!
