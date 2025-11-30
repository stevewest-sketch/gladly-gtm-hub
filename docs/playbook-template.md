# Playbook Page Template

The Playbook template is designed for asset-focused enablement content like sales plays, pitch decks, and resource guides. It provides a structured layout for presenting key assets, usage instructions, updates, and training materials.

## When to Use

Use the Playbook template (`pageTemplate: 'playbook'`) for:
- First Meeting Decks and pitch materials
- Sales plays and implementation guides
- Asset-focused content where the primary deliverable is a deck, document, or resource
- Content that needs step-by-step usage instructions
- Playbooks that require changelog tracking (what's new, coming soon)

## Template Structure

### Sections (in order)

1. **Quick Overview** (collapsible)
   - 2x2 grid with: What It Is, Who It's For, When to Use, Success Looks Like
   - Always visible by default, can be collapsed

2. **What's Included** (non-collapsible)
   - Primary Asset link with icon
   - Training video link
   - Additional resources/key assets

3. **What's New & Coming** (non-collapsible)
   - Two-column layout
   - Left: Current updates (NEW, UPDATED badges)
   - Right: Coming soon items

4. **How to Use** (non-collapsible)
   - Numbered process steps with connecting lines
   - Each step has title, description, and action items
   - Sub-navigation in sidebar for each step

5. **Best Practices** (non-collapsible)
   - Tip cards with amber left border
   - Common Pitfalls section with warning icons

6. **Training Videos** (non-collapsible)
   - Optional section with "deep dive" note
   - Video thumbnails with metadata

7. **FAQs** (non-collapsible)
   - Question/answer format
   - Sourced from contentBlocks with blockType: 'faq'

### Sidebar Components

- **On This Page**: Jump navigation with scroll spy, includes sub-links for process steps
- **Key Assets**: Quick access to primary deck and session recording
- **Play Details**: Owner, contributors, target stage, prep time

## Sanity Schema Fields

### Required Fields
- `title`: The playbook name
- `description`: Brief overview (shown in hero and overview section)
- `pageTemplate`: Must be set to `'playbook'`

### Recommended Fields
- `audiences`: Array of audience references (shown in hero tags)
- `publishDate`: Publication date (shown in hero)
- `presenter`: Owner/contributors (comma-separated, first name = owner)

### Content Sections

#### articleSections (How to Use steps)
```json
{
  "articleSections": [
    {
      "_key": "step1",
      "heading": "Prep",
      "content": "Main description for this step.\nAction item 1\nAction item 2"
    }
  ]
}
```
- First line of `content` = step description
- Subsequent lines = action items (shown with arrow bullets)

#### keyTakeaways (Changelog)
```json
{
  "keyTakeaways": [
    "New: AI-Forward Narrative - New positioning...",
    "Updated: Vertical Kits Expanded - Added...",
    "Coming Soon: Architecture & Model Enablement - Everly is..."
  ]
}
```
- Items containing "coming soon" or "coming:" go in "What's Coming" column
- Items containing "updated" get UPDATED badge, others get NEW badge

#### actionItems (Best Practices)
```json
{
  "actionItems": [
    "**Think of it like cleats:** Customize aggressively...",
    "**Command+F is your friend:** Navigate by searching...",
    "Don't edit the master file...",
    "Don't use 150 slides in one meeting..."
  ]
}
```
- First 3 items = tip cards (with bold formatting for titles)
- Remaining items = Common Pitfalls with warning icons

#### resourceLinks (Assets)
```json
{
  "resourceLinks": {
    "slidesUrl": "https://docs.google.com/presentation/...",
    "videoUrl": "https://drive.google.com/file/...",
    "keyAssetUrl": "https://...",
    "keyAssetLabel": "Custom Label"
  }
}
```

#### modules (Training Videos)
```json
{
  "modules": [
    {
      "_key": "module1",
      "moduleNumber": 1,
      "title": "Deck Walkthrough",
      "description": "Overview of the mega deck structure...",
      "videoUrl": "https://...",
      "wistiaId": "abc123",
      "duration": "30 min"
    }
  ]
}
```

#### contentBlocks (FAQs)
```json
{
  "contentBlocks": [
    {
      "_key": "faq1",
      "blockType": "faq",
      "faqs": [
        {
          "question": "How do I navigate a 150+ slide deck?",
          "answer": "Use Command+F to search for keywords..."
        }
      ]
    }
  ]
}
```

## Design Tokens

### Colors
- Background: `#F8F9FC`
- Card background: `#FFFFFF`
- Primary text: `#1A1D26`
- Secondary text: `#5C6578`
- Muted text: `#8B93A7`
- Accent green: `#16A34A`
- Accent green light: `#DCFCE7`
- Border: `#E2E6EF` / `#E8EBF2`

### Badge Colors
- NEW: green (`#DCFCE7` bg, `#15803D` text)
- UPDATED: amber (`#FEF3C7` bg, `#B45309` text)
- COMING SOON: gray (`#F3F4F6` bg, `#6B7280` text)

### Spacing
- Section gap: 16px (space-y-4)
- Content padding: 24px (p-6)
- Border radius: 14px for cards, 6px for inner elements

## Example NDJSON Import

```json
{
  "_id": "first-meeting-pitch",
  "_type": "catalogEntry",
  "title": "First Meeting Pitch",
  "slug": {"_type": "slug", "current": "first-meeting-pitch"},
  "description": "How to create and customize your deck for any meeting",
  "pageTemplate": "playbook",
  "publishDate": "2025-11-19T00:00:00.000Z",
  "presenter": "Christian Shockley, Steve West, Emilio Di Zazzo",
  "articleSections": [
    {"_key": "step1", "heading": "Prep", "content": "Download the deck and make a copy.\nMake a copy in your Google Drive\nReview the prospect's industry"},
    {"_key": "step2", "heading": "Navigate", "content": "Use Command+F to search for keywords.\nSearch for industry keywords\nSearch for feature names"}
  ],
  "keyTakeaways": [
    "Updated: First Meeting Deck Template - The mega deck is now your one-stop resource.",
    "Coming Soon: AI-Forward Company Narrative - Updated GTM positioning."
  ],
  "actionItems": [
    "**Think of it like cleats:** Customize aggressively and share feedback.",
    "**Command+F is your friend:** Navigate by searching for keywords.",
    "Don't edit the master file—always make a copy first."
  ],
  "resourceLinks": {
    "slidesUrl": "https://docs.google.com/presentation/d/...",
    "videoUrl": "https://drive.google.com/file/d/..."
  },
  "status": "published",
  "publishedTo": ["enablement"]
}
```

## Component Location

Template: `components/templates/PlaybookTemplate.tsx`

## Related Templates

- **StandardArticleTemplate**: For session-focused training content
- **PlayTemplate**: For detailed sales plays with extended process flows
- **BattleCardTemplate**: For competitive analysis content
