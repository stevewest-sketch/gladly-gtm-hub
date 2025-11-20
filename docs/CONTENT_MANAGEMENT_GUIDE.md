# Content Management Guide

## How to Control Where Content Appears

### 1. Hub Designation with `publishedTo`

The `publishedTo` field controls which hubs can display your content.

#### How It Works

**Location**: Display Settings tab in Sanity Studio

**Options**:
- **Training Hub** - Appears in Training Hub only
- **COE Hub** - Appears in COE Hub only
- **Content Hub** - Appears in Content Hub only
- **Sales Playbook Hub** - Appears in Sales Hub only (when created)
- **Customer Lifecycle** - Appears in Lifecycle Hub only (when created)
- **All Pages** - Explicitly appears in all hubs

**Default Behavior**: If `publishedTo` is empty, content appears in **ALL hubs** (universal content)

#### Examples

**Universal Content** (appears everywhere):
```
Published To: [] (empty)
```
→ Shows in Content Hub, COE Hub, Sales Hub, Training Hub

**Hub-Specific Content**:
```
Published To: [Sales Playbook Hub, Training Hub]
```
→ Only shows in Sales Hub and Training Hub

**Single Hub Only**:
```
Published To: [COE Hub]
```
→ Only shows in COE Hub

---

### 2. Hub-Specific Categories

Organize content WITHIN each hub using category fields.

#### COE Hub Categories

**Field**: `coeCategory` (multi-select array)

**Options**:
- Proof Points & Best Practices
- Templates & Reusable Content
- In-Product Changes

**Example**:
```
COE Category: [Proof Points & Best Practices]
```
→ Appears in COE Hub "Proof Points" tab

#### Sales Hub Categories

**Field**: `salesCategory` (multi-select array)

**Options**:
- Discovery
- Demo
- Objections
- Negotiation
- Closing
- Upsell

**Example**:
```
Sales Category: [Discovery, Demo]
```
→ Appears in Sales Hub "Discovery" and "Demo" sections

#### Training Hub Categories

**Field**: `trainingCategory` (multi-select array)

**Options**:
- Onboarding
- Advanced Skills
- Certifications
- Product Training

**Example**:
```
Training Category: [Onboarding]
```
→ Appears in Training Hub "Onboarding" path

#### Partner Hub Categories

**Field**: `partnerCategory` (multi-select array)

**Options**:
- Co-Sell
- Onboarding
- Marketing
- Deal Registration

**Example**:
```
Partner Category: [Co-Sell]
```
→ Appears in Partner Hub "Co-Sell" section

---

## External Links to Google Drive

### How to Link to External Content

Instead of hosting content in Sanity, you can link directly to external resources like Google Drive, Docs, Sheets, etc.

#### Step 1: Add External Link in Sanity

1. Go to **Sanity Studio** → **Universal Catalog** → **All Catalog Entries**
2. Open or create a catalog entry
3. In the **Content** tab, find **External Link** field
4. Paste your Google Drive/Docs/Sheets URL:
   ```
   https://docs.google.com/spreadsheets/d/187LXdG7xKeCQwKdjikjDZxhAAHpMJHna/edit?gid=1659187427#gid=1659187427
   ```

#### Step 2: User Experience

When users click the catalog card:
- **With External Link**: Opens URL in a new tab (instantly navigates to Google Drive)
- **Without External Link**: Opens detail page within the site

#### Visual Indicators

Cards with external links show:
- **Text**: "Open Link" (instead of "View Content")
- **Icon**: External link icon (arrow pointing out)
- **Behavior**: Opens in new tab

---

## Complete Example: Sales Proposal Template

### Scenario
You want to create a catalog entry that:
1. Links to a Google Sheets proposal template
2. Appears in Content Hub and Sales Hub
3. Shows in Sales Hub "Discovery" section
4. Is tagged for Sales team and Sidekick product

### Sanity Studio Setup

**Content Tab**:
```
Title: Gladly Proposal Template
Description: Customizable proposal template with pricing, ROI calculator, and timeline
External Link: https://docs.google.com/spreadsheets/d/187LXdG7xKeCQwKdjikjDZxhAAHpMJHna/edit?gid=1659187427#gid=1659187427
```

**Classification Tab**:
```
Content Type: Template
Page Template: micro-learning
Format: Template
```

**Taxonomies Tab**:
```
Products: [Sidekick]
Teams: [Sales]
Topics: [Templates, Best Practices]
Sales Category: [Discovery, Demo]
```

**Display Settings Tab**:
```
Published To: [Content Hub, Sales Playbook Hub]
Featured: ✅ (optional)
Priority: 75
Status: Published
```

**Metadata Tab**:
```
Publish Date: Today
```

### Result

**In Content Hub**:
- Appears in Universal Catalog
- Filterable by "Sidekick" and "Sales" tags
- Shows "Open Link" button with external link icon
- Clicking opens Google Sheets in new tab

**In Sales Hub**:
- Appears in "Discovery" section
- Appears in "Demo" section
- Tagged for Sales team
- External link behavior

**NOT in**:
- COE Hub (not in publishedTo)
- Training Hub (not in publishedTo)

---

## Hub Visibility Matrix

| publishedTo Value | Content Hub | COE Hub | Sales Hub | Training Hub |
|-------------------|-------------|---------|-----------|--------------|
| `[]` (empty) | ✅ | ✅ | ✅ | ✅ |
| `['all']` | ✅ | ✅ | ✅ | ✅ |
| `['content']` | ✅ | ❌ | ❌ | ❌ |
| `['coe']` | ❌ | ✅ | ❌ | ❌ |
| `['sales']` | ❌ | ❌ | ✅ | ❌ |
| `['content', 'sales']` | ✅ | ❌ | ✅ | ❌ |
| `['content', 'coe', 'sales']` | ✅ | ✅ | ✅ | ❌ |

---

## Best Practices

### Hub Designation

1. **Default to Universal** - Leave `publishedTo` empty for most content
2. **Use Specific Values** - Only set `publishedTo` for truly exclusive content
3. **Multi-Hub is OK** - Content can appear in multiple hubs

### Hub Categories

1. **Use Categories for Organization** - These create sections within each hub
2. **Multiple Categories** - One entry can be in multiple categories
3. **Not Required** - Categories are optional, content still appears in hub's catalog

### External Links

1. **Use for Google Drive Content** - Perfect for Sheets, Docs, Slides stored in Drive
2. **Still Add Metadata** - Fill out description, tags, etc. for searchability
3. **Thumbnail Recommended** - Add a thumbnail image for better visual appeal
4. **Test the Link** - Verify URL works before publishing

### Content Organization

**Good Example**:
```
Title: BVA Calculator Template
External Link: [Google Sheets URL]
Published To: [COE Hub, Sales Playbook Hub]
COE Category: [Proof Points & Best Practices]
Sales Category: [Discovery, Demo]
Products: [Sidekick, Classic]
Teams: [Sales]
```

**Why Good**:
- Clear title
- External link to live template
- Appears in 2 relevant hubs
- Organized within each hub
- Properly tagged for filtering

**Bad Example**:
```
Title: Template
Published To: [All Pages]
```

**Why Bad**:
- Vague title
- No description
- Overly broad visibility
- No tags or categories
- No external link or content

---

## Workflow

### Creating Content with External Link

1. **Prepare External Resource**
   - Upload to Google Drive
   - Set sharing permissions (anyone with link can view)
   - Copy the full URL

2. **Create Catalog Entry in Sanity**
   - Go to Universal Catalog → All Catalog Entries → Create
   - Fill in title and description
   - Paste external URL in "External Link" field

3. **Set Hub Visibility**
   - Choose hubs in `publishedTo` (or leave empty for all)
   - Add hub-specific categories

4. **Add Tags**
   - Products: Which Gladly products this relates to
   - Teams: Which teams should see this
   - Topics: What it covers

5. **Publish**
   - Set status to "Published"
   - Content appears in selected hubs within 60 seconds

### Updating Content

**To Update the External Resource**:
- Edit the Google Doc/Sheet/Slide directly
- No changes needed in Sanity
- Users always see latest version

**To Update Metadata** (title, description, tags):
- Edit in Sanity Studio
- Changes reflect in all hubs within 60 seconds

**To Move Between Hubs**:
- Update `publishedTo` field
- Add/remove hub-specific categories

---

## Troubleshooting

### Content Not Showing in a Hub

**Check**:
1. ✅ Status is "Published" (not "Draft")
2. ✅ `publishedTo` includes that hub OR is empty
3. ✅ Wait 60 seconds for cache revalidation
4. ✅ Hard refresh browser (Cmd+Shift+R)

### External Link Not Working

**Check**:
1. ✅ URL is complete (starts with https://)
2. ✅ Google Drive sharing is set to "Anyone with link can view"
3. ✅ URL doesn't have access restrictions
4. ✅ Test URL in private/incognito browser

### Content in Wrong Hub Section

**Check**:
1. Hub-specific category field (coeCategory, salesCategory, etc.)
2. `publishedTo` values
3. Content Type assignment

---

## Quick Reference

### Field Purposes

| Field | Purpose | Required |
|-------|---------|----------|
| `title` | Display name | ✅ |
| `description` | Summary text | Recommended |
| `externalUrl` | Link to Google Drive/external content | Optional |
| `publishedTo` | Which hubs can show this | Optional (empty = all) |
| `coeCategory` | COE Hub organization | Optional |
| `salesCategory` | Sales Hub organization | Optional |
| `trainingCategory` | Training Hub organization | Optional |
| `contentType` | Type classification | ✅ |
| `products` | Product tags | Recommended |
| `teams` | Team tags | Recommended |
| `status` | Publish control | ✅ |

### Common Use Cases

**Google Sheets Template**:
- External Link: ✅
- Published To: Relevant hubs
- Hub Categories: As needed
- Content Type: Template

**Training Video (hosted elsewhere)**:
- External Link: ✅ (YouTube, Wistia, etc.)
- Published To: [Training Hub, Content Hub]
- Training Category: [Product Training]
- Content Type: Training

**Battle Card PDF (Google Drive)**:
- External Link: ✅
- Published To: [Sales Playbook Hub, Content Hub]
- Sales Category: [Objections, Demo]
- Content Type: Battle Card

**Internal Knowledge Article**:
- External Link: ❌ (use detail page)
- Published To: [COE Hub]
- COE Category: [Proof Points & Best Practices]
- Content Type: Article
