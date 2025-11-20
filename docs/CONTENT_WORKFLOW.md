# Single-Source Content Workflow

## Overview

**One Catalog Entry → Multiple Sections** across all hubs

Create content ONCE in Sanity Studio, and it automatically appears in the right places based on its properties.

---

## How It Works

### 1. Single Source of Truth: `catalogEntry`

All content lives in Sanity as **Catalog Entry** documents. Every piece of content (training, template, battle card, etc.) is a single `catalogEntry`.

### 2. Smart Filtering with Properties

The same catalog entry can appear in multiple places based on:

| Property | Purpose | Example |
|----------|---------|---------|
| `featured` | Shows in "Featured" sections | `true` = appears in Featured |
| `showInUpcoming` | Shows in "New & Featured" | `true` = highlighted content |
| `priority` | Sort order (higher = first) | `10` = top priority |
| `publishDate` | Determines "new" status | < 30 days = "New" badge |
| `contentType` | Filters by category | `template` = Templates section |
| `products` | Multi-select tags | `[Sidekick]` = filtered by product |
| `teams` | Multi-select tags | `[Sales, CS]` = filtered by team |
| `topics` | Multi-select tags | `[AI, Best Practices]` = filtered by topic |
| `coeCategory` | COE Hub specific | `['bva']` = BVA tab in COE Hub |
| `status` | Publish control | `published` = visible everywhere |

---

## Real Example: One Entry, Five Locations

### Create in Sanity Studio:

```
Title: "Sidekick AI Deck Template"
Content Type: Template → Deck
Products: [Sidekick]
Teams: [Sales, Customer Success]
Topics: [AI, Product Training, Templates]
COE Category: [resources]

Featured: ✅ true
Show in Upcoming: ✅ true
Priority: 10
Publish Date: 2025-01-15
Status: Published
```

### This ONE entry automatically appears in:

#### 1. **Content Hub → Featured Section** ⭐
- **Why?** `featured: true` + `priority: 10`
- **Display**: Large card with "Featured" badge
- **Section**: "Featured & New" at top of page

#### 2. **Content Hub → New Resources** 🆕
- **Why?** `publishDate` is < 30 days ago
- **Display**: Compact card in 4-column grid
- **Section**: "New Resources" section

#### 3. **Content Hub → Templates Category** 📄
- **Why?** Clicked "Templates" button + `contentType: template`
- **Display**: Full catalog card
- **Section**: Filtered catalog view

#### 4. **Content Hub → Sidekick Filter** 🤖
- **Why?** User filters by "Sidekick" product
- **Display**: Full catalog card
- **Section**: Universal catalog with active filters

#### 5. **COE Hub → Resources Tab** 💼
- **Why?** `coeCategory: ['resources']`
- **Display**: Feature card or catalog view
- **Section**: COE Hub Resources section

---

## Content Creation Workflow

### Step 1: Go to Sanity Studio
```
http://localhost:3001/studio
```

### Step 2: Create Catalog Entry

1. Click **"Catalog Entry"** → **"Create"**

2. **Fill Core Fields:**
   - Title: Clear, descriptive name
   - Description: 1-2 sentences explaining value
   - Slug: Auto-generated from title
   - Content Type: Select from list (Training, Template, Battle Card, etc.)

3. **Set Display Properties:**
   ```
   Featured: Check if this should be highlighted
   Show in Upcoming: Check if "new & featured" worthy
   Priority: 10 (high), 5 (medium), 0 (normal)
   ```

4. **Add Tags (Multi-Select):**
   - **Products**: Sidekick, Voice, Classic (which products this relates to)
   - **Teams**: Sales, CS, Onboarding (who should see this)
   - **Topics**: AI, Training, Best Practices (what it covers)
   - **Journey Stage**: Discovery, Implementation, Expansion (customer journey)

5. **For COE Hub Content:**
   ```
   COE Category: [overview, bva, proof-points, resources]
   ```

6. **Add Assets:**
   - Thumbnail Image (recommended: 16:9 ratio)
   - Format: Live Replay, Async, Document, Video, Article
   - Duration: Minutes (for training content)
   - Presenter: Name (for recorded sessions)

7. **Set Status:**
   ```
   Status: Published (makes it visible everywhere)
   ```

### Step 3: Save & Publish

Click **"Publish"** - content immediately appears in all relevant sections!

---

## Filtering Logic

### How Content Appears in Each Section

#### Featured Section
```typescript
// Shows entries where:
featured === true || showInUpcoming === true

// Sorted by:
priority DESC

// Limited to: 3 items
```

#### New Resources Section
```typescript
// Shows entries where:
publishDate > (today - 30 days)

// Sorted by:
publishDate DESC

// Limited to: 4 items
```

#### Category Sections (Templates, Training, etc.)
```typescript
// Shows entries where:
contentType.slug === activeCategory

// Example:
// "Templates" button → contentType.slug === 'template' OR 'deck' OR 'one-pager'
```

#### Universal Catalog
```typescript
// Shows ALL entries (published)
// User can filter by:
// - Products (AND logic within, OR between)
// - Teams (AND logic within, OR between)
// - Topics (AND logic within, OR between)
// - Format
// - Journey Stage
```

---

## Multi-Hub Architecture

### Same Content, Different Hubs

Content Hub and COE Hub pull from the SAME catalog entries:

```
catalogEntry: "Sidekick Best Practices"
├── In Content Hub (contentType: training)
│   ├── Featured Section (featured: true)
│   ├── Training Category (contentType: training)
│   └── Universal Catalog (filterable)
│
└── In COE Hub (coeCategory: ['resources'])
    ├── Resources Tab (coeCategory: resources)
    └── Universal Catalog (coeCategory filter)
```

### Hub-Specific Filtering

Each hub can apply its own pre-filters:

**Content Hub:**
```typescript
// No pre-filter - shows all published content
filter: { status: "published" }
```

**COE Hub:**
```typescript
// Pre-filtered by coeCategory
filter: { 
  status: "published",
  coeCategory: { includes: "resources" } // or "bva", "proof-points", etc.
}
```

**Training Hub (future):**
```typescript
// Pre-filtered by content type
filter: {
  status: "published",
  contentType: { in: ["training", "workshop", "webinar"] }
}
```

---

## Best Practices

### 1. Always Set These Fields
- ✅ Title & Description
- ✅ Content Type
- ✅ At least 1 Product
- ✅ At least 1 Team
- ✅ Publish Date
- ✅ Status: Published

### 2. Use Featured Strategically
- Don't mark everything as featured!
- Reserve for high-value, time-sensitive, or important content
- Update featured items monthly

### 3. Use Priority Correctly
```
10 = Critical/urgent content
5  = Important content
0  = Normal content (default)
```

### 4. Multi-Tag Generously
The more tags, the more discoverable:
- Add ALL relevant products
- Add ALL relevant teams
- Add 3-5 relevant topics

### 5. Keep Thumbnails Consistent
- Use 16:9 ratio
- High quality images
- Consistent branding

---

## FAQ

### Q: How do I make content appear ONLY in COE Hub?
**A:** Set `coeCategory` and DON'T use generic tags:
```
COE Category: [bva]
Products: (leave empty or specific to COE)
```

### Q: How do I make content appear in MULTIPLE hubs?
**A:** Tag it for multiple purposes:
```
Content Type: Training
COE Category: [resources]
Products: [Sidekick]
Teams: [Sales]
```
→ Appears in: Content Hub (Training), COE Hub (Resources), Sidekick filter, Sales filter

### Q: How do I remove content from Featured?
**A:** Uncheck `featured` and `showInUpcoming` in Sanity Studio

### Q: How long does "New" badge show?
**A:** Automatically shows for 30 days after `publishDate`, then disappears

### Q: Can I schedule content for future publish?
**A:** Set `status: draft` and `publishDate` to future date. Manually change to `published` when ready.

---

## Troubleshooting

### Content not showing up?

**Check:**
1. ✅ Status is "Published" (not "Draft")
2. ✅ Content Type is selected
3. ✅ At least one Product or Team tag exists
4. ✅ Publish Date is not in the future
5. ✅ Wait 60 seconds (cache revalidation time)

### Content in wrong section?

**Check:**
1. Content Type matches button category
2. `coeCategory` if using COE Hub
3. `featured` / `showInUpcoming` flags
4. `priority` for sort order

### Can't see any content?

1. Go to `/studio`
2. Check if any Catalog Entries exist
3. Check if Status = "Published"
4. Create a test entry to verify system works

---

## Summary

**🎯 One Entry → Everywhere**

1. Create catalog entry in Sanity ONCE
2. Set properties: featured, tags, dates
3. Content automatically appears in:
   - Featured sections (if flagged)
   - New sections (if recent)
   - Category sections (by type)
   - Filtered catalog (by tags)
   - Multiple hubs (by category)

**No duplication. Single source of truth. Smart filtering.**
