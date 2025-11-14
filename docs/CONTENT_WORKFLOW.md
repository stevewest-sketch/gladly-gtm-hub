# Content Workflow Documentation

## Overview

This document outlines the current and planned content creation, publishing, and management workflows for the Gladly GTM Enablement Hub.

## Current Workflow (Manual)

### Content Creation Process

```
1. Content Request/Need Identified
   ↓
2. Create Content (Google Docs, Slides, etc.)
   ↓
3. Review & Approval
   ↓
4. Manual Entry to Sanity CMS
   ↓
5. Publish in Sanity Studio
   ↓
6. Content Appears on Website (via ISR)
```

### Content Types

#### 1. Pages
**Created in:** Sanity Studio
**Workflow:**
1. Navigate to Sanity Studio (`/studio`)
2. Create new Page document
3. Fill in required fields:
   - Title
   - Slug
   - SEO metadata
4. Add sections (drag & drop)
5. Configure each section
6. Preview
7. Publish

**Frequency:** Ad-hoc (new features, pages)
**Ownership:** Enablement team

#### 2. Searchable Content
**Created in:** Sanity Studio or seed scripts
**Workflow:**
1. Create new Searchable Content document
2. Fill in fields:
   - Title
   - Description
   - URL
   - Category
   - Keywords
   - Priority
   - Icon
3. Set active status
4. Publish

**Frequency:** Weekly (new resources, updates)
**Ownership:** All GTM teams

#### 3. Competitive Resources
**Created in:** Sanity Studio or seed scripts
**Workflow:**
1. Create new Competitive Resource document
2. Fill in fields:
   - Competitor name
   - Title
   - Description
   - Resource type
   - Link
   - Icon
3. Publish

**Frequency:** As needed (new competitors, updates)
**Ownership:** Product Marketing

#### 4. Training Content
**Created in:** External tools → Manual Sanity entry
**Workflow:**
1. Record training session (Zoom, Gong)
2. Export transcript
3. **Manual:** Create training article in Sanity
4. **Manual:** Add transcript content
5. **Manual:** Format and structure
6. **Manual:** Add metadata, tags
7. Publish

**Frequency:** Weekly (training sessions)
**Ownership:** Enablement team
**Pain Points:**
- Time-consuming manual formatting
- Inconsistent structure
- Transcript cleanup required
- Delayed publishing

#### 5. Meeting Transcripts → Articles
**Current Process:** MANUAL ❌
1. Meeting recorded (Zoom/Gong)
2. Transcript exported
3. **Manual:** Copy/paste to Google Doc
4. **Manual:** Clean up transcript
5. **Manual:** Extract key points
6. **Manual:** Format as article
7. **Manual:** Add to Sanity
8. **Manual:** Publish

**Time:** 1-2 hours per transcript
**Pain Points:**
- Very manual and time-consuming
- Inconsistent formatting
- Information loss in summarization
- Publishing delays

---

## Planned Workflow (Automated)

### Vision: AI-Powered Content Pipeline

```
Meeting/Recording
   ↓
Transcript Extraction (Automatic)
   ↓
Claude Content Processor Skill
   ↓
Structured Article Generated
   ↓
GitHub PR Created (Automatic)
   ↓
Review & Approval
   ↓
Merge to Main
   ↓
Auto-publish to Sanity
   ↓
Auto-index to Google File Search
   ↓
Content Live on Website
```

### Phase 1: Content Processor Skill (Week 4)

**Tool:** Claude skill for transcript processing

**Input:**
- Meeting transcript (text file)
- Meeting metadata (title, date, participants)

**Processing:**
```
1. Extract key topics and themes
2. Identify actionable insights
3. Generate article structure:
   - Title
   - Executive Summary
   - Key Takeaways (bullets)
   - Main Content (sections)
   - Next Steps/Action Items
4. Suggest tags and categories
5. Create Sanity-compatible JSON
6. Generate SEO metadata
```

**Output:**
```json
{
  "_type": "page",
  "title": "Claude Code Club: Building Automation",
  "slug": { "current": "claude-code-club-nov-14" },
  "summary": "Discussion on implementing AI-powered search and content automation...",
  "sections": [
    {
      "_type": "textSection",
      "heading": "Key Discussion Points",
      "content": [...]
    }
  ],
  "tags": ["automation", "ai", "content-processing"],
  "category": "Training"
}
```

**Usage:**
```bash
# Command line
npm run process-transcript -- input.txt

# Or via Claude directly
/skill content-processor [paste transcript]
```

**Benefits:**
- ⏱️ Reduces processing time from 2 hours to 5 minutes
- ✅ Consistent formatting
- 🎯 Better structure and organization
- 📊 Automatic metadata generation
- 🚀 Faster publishing

### Phase 2: GitHub PR Automation (Month 2)

**Workflow:**
```
1. Content processed by Claude skill
   ↓
2. Create feature branch automatically
   ↓
3. Commit generated content
   ↓
4. Create Pull Request with:
   - Generated article
   - Preview link
   - Checklist for review
   ↓
5. Reviewer approves/requests changes
   ↓
6. Merge to main
   ↓
7. Automatic deployment
```

**GitHub Action Configuration:**
```yaml
name: Auto-publish Content

on:
  pull_request:
    branches: [main]
    paths:
      - 'content/**'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Validate Content
        run: npm run validate-content

      - name: Publish to Sanity
        if: github.event.pull_request.merged == true
        env:
          SANITY_TOKEN: ${{ secrets.SANITY_TOKEN }}
        run: npm run publish-to-sanity
```

**Benefits:**
- 📝 Version control for all content
- 👀 Review process built-in
- 🔄 Rollback capability
- 📊 Audit trail
- 🤝 Team collaboration

### Phase 3: Auto-indexing (Week 3)

**Trigger:** Sanity webhook on publish

**Workflow:**
```
Content Published in Sanity
   ↓
Webhook sent to /api/sanity-webhook
   ↓
Validate webhook signature
   ↓
Fetch full document from Sanity
   ↓
Extract searchable content:
   - Title
   - Description
   - Full text content
   - Metadata
   ↓
Format for Google File Search
   ↓
Index to Google File Search API
   ↓
Store indexing metadata
   ↓
Revalidate Next.js cache
   ↓
Content searchable immediately
```

**Implementation:**
```typescript
// app/api/sanity-webhook/route.ts
export async function POST(request: Request) {
  // 1. Validate webhook signature
  const isValid = await validateSignature(request);
  if (!isValid) return new Response('Unauthorized', { status: 401 });

  // 2. Parse webhook payload
  const payload = await request.json();

  // 3. Fetch full document from Sanity
  const document = await sanityClient.fetch(
    `*[_id == $id][0]`,
    { id: payload._id }
  );

  // 4. Extract searchable content
  const searchableContent = extractContent(document);

  // 5. Index to Google File Search
  await indexToGoogle(searchableContent);

  // 6. Revalidate cache
  revalidatePath(document.slug);

  return Response.json({ success: true });
}
```

**Benefits:**
- ⚡ Real-time search index updates
- 🎯 No manual indexing required
- 🔍 Improved search quality
- 📊 Centralized search infrastructure

---

## Content Types & Workflows

### 1. Training Sessions

#### Current Workflow
```
Record → Export → Manual Formatting → Publish
Time: 2 hours
```

#### Automated Workflow
```
Record → Transcript → Claude Processing → PR → Publish
Time: 15 minutes
```

**Implementation:**
```bash
# 1. Export transcript from Zoom/Gong
# 2. Process with Claude skill
npm run process-transcript training-session-nov-14.txt

# 3. Review generated content in PR
# 4. Merge and auto-publish
```

### 2. Meeting Notes

#### Current Workflow
```
Meeting → Manual Notes → Google Doc → Manual Sanity Entry
Time: 1 hour
```

#### Automated Workflow
```
Meeting → Transcript → Claude Processing → PR → Publish
Time: 10 minutes
```

### 3. Product Updates

#### Current Workflow
```
Write Update → Format → Add to Sanity → Link Resources
Time: 30 minutes
```

#### Automated Workflow
```
Write Update → Claude Enhancement → Auto-format → Auto-link
Time: 5 minutes
```

**Claude Skill Features:**
- Automatically link to related resources
- Suggest relevant battle cards
- Add appropriate tags
- Generate SEO metadata
- Create related content suggestions

### 4. Competitive Intelligence

#### Current Workflow
```
Research → Create Battle Card → Add to Sanity
Time: 1 hour
```

#### Streamlined Workflow
```
Research → Paste in Template → Claude Enhancement → Publish
Time: 15 minutes
```

**Claude Features:**
- Extract key differentiators
- Generate comparison tables
- Suggest related competitors
- Format consistently

---

## Content Governance

### Review Process

#### Pre-automation (Current)
1. Content created by individual
2. Self-review
3. Publish directly to Sanity
4. Live on website

**Issues:**
- No peer review
- Potential errors/typos
- Inconsistent quality

#### Post-automation (Planned)
1. Content processed by Claude
2. PR created automatically
3. **Required review** by designated reviewer
4. Approval required to merge
5. Merge triggers auto-publish
6. Live on website

**Benefits:**
- ✅ Mandatory peer review
- 📝 Written approval trail
- 🔄 Easy rollback if issues
- 👥 Knowledge sharing

### Content Quality Standards

#### Checklist (Auto-applied by Claude)
- [ ] Clear, descriptive title
- [ ] Executive summary present
- [ ] Key takeaways listed
- [ ] Proper formatting
- [ ] Relevant tags assigned
- [ ] Category specified
- [ ] SEO metadata complete
- [ ] Links functional
- [ ] Images optimized
- [ ] Accessibility compliant

### Approval Matrix

| Content Type | Reviewer Required | Auto-publish Enabled |
|-------------|------------------|---------------------|
| Training Notes | Enablement Lead | After review |
| Meeting Transcripts | Team Lead | After review |
| Product Updates | Product Marketing | After review |
| Battle Cards | Competitive Intel | After review |
| Page Updates | Content Owner | After review |
| Searchable Content | Any team member | Immediate |

---

## Tools & Integrations

### Current Tools
- **Sanity CMS** - Content storage and management
- **Sanity Studio** - Content editor
- **Seed Scripts** - Bulk content import
- **Manual entry** - All content creation

### Planned Tools

#### Claude Skills
1. **content-processor** - Transcript to article
2. **seo-optimizer** - SEO enhancement
3. **content-validator** - Quality checks
4. **link-suggester** - Related content links

#### Automation Tools
1. **GitHub Actions** - Workflow automation
2. **Vercel** - Deployment automation
3. **Sanity Webhooks** - Content event triggers
4. **Google File Search API** - Search indexing

#### Supporting Tools
1. **Slack** - Notifications and bot
2. **11 Labs** - Text-to-speech
3. **Plausible/PostHog** - Analytics

---

## Metrics & KPIs

### Content Creation Efficiency

**Current State:**
- Average time to publish: 2 hours
- Articles per week: 5
- Manual effort per article: 1.5 hours

**Target State (Post-automation):**
- Average time to publish: 15 minutes
- Articles per week: 20
- Manual effort per article: 10 minutes

**Improvement:**
- ⬇️ 87% reduction in time
- ⬆️ 300% increase in output
- ⬆️ 89% reduction in manual effort

### Content Quality

**Metrics to Track:**
- Formatting consistency score
- SEO completeness score
- Search discoverability rate
- User engagement (time on page, shares)
- Content freshness (days since update)

### Search Performance

**Metrics to Track:**
- Search queries per day
- Average search response time
- Search success rate (clicked result)
- Top searched terms
- Failed search queries

---

## Migration Plan

### Phase 1: Foundation (Week 1) ✅
- [x] Create Claude.md
- [x] Document workflows
- [x] Establish Git practices

### Phase 2: Content Processor (Week 4)
- [ ] Build content-processor skill
- [ ] Test with sample transcripts
- [ ] Refine prompts and templates
- [ ] Document usage

### Phase 3: Search Integration (Weeks 2-3)
- [ ] Google File Search API setup
- [ ] Implement search endpoint
- [ ] Build auto-indexing webhook
- [ ] Test end-to-end

### Phase 4: Full Automation (Month 2)
- [ ] GitHub Actions workflows
- [ ] PR automation
- [ ] Review process
- [ ] Slack notifications

---

## Training & Documentation

### User Guides Needed

1. **Content Creator Guide**
   - How to submit transcripts for processing
   - How to review generated articles
   - How to approve/edit PRs
   - How to publish to Sanity

2. **Reviewer Guide**
   - What to check in PR reviews
   - How to request changes
   - How to approve and merge
   - When to reject content

3. **Admin Guide**
   - How to manage Claude skills
   - How to configure webhooks
   - How to monitor indexing
   - How to troubleshoot issues

---

## Future Enhancements

### Voice Content
- Automatic audio generation for articles
- Podcast-style content from transcripts
- Multi-voice conversations
- Audio search capability

### Multi-language
- Automatic translation of content
- Language-specific search
- Localized resources

### Personalization
- Role-based content recommendations
- Learning path tracking
- Personalized search results
- Content usage analytics

---

**Last Updated:** November 14, 2024
**Version:** 1.0.0
