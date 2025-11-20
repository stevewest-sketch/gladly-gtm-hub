# Multi-Hub Quick Reference

## Single Entry → Multiple Hubs Architecture

```
CREATE ONCE IN SANITY
        ↓
   catalogEntry
        ↓
    Properties Determine Visibility
        ↓
┌───────┴──────────────────┬──────────────┬────────────────┐
│                          │              │                │
Content Hub          COE Hub       Sales Hub      Training Hub
(all content)    (coeCategory)  (salesCategory) (trainingCategory)
```

---

## Key Fields for Multi-Hub Distribution

### Universal Fields (Every Hub Uses)
```typescript
title: string              // Title shown everywhere
description: string        // Description shown everywhere
contentType: reference     // Training, Template, Battle Card, etc.
products: array            // Multi-select products
teams: array              // Multi-select teams
topics: array             // Multi-select topics
status: "published"        // MUST be published to show anywhere
```

### Hub Control Fields
```typescript
publishedTo: string[]
// Empty or [] = shows in ALL hubs
// ['sales', 'training'] = shows ONLY in Sales Hub and Training Hub
// ['all'] = explicitly shows in all hubs

Options:
- 'training'
- 'coe'
- 'content'
- 'sales'
- 'customer-lifecycle'
- 'all'
```

### Hub-Specific Categories
```typescript
coeCategory: string[]
// Values: 'proof-points', 'templates', 'in-product-changes'
// Organizes content WITHIN COE Hub

salesCategory: string[]
// Values: 'discovery', 'demo', 'objections', 'negotiation', 'closing', 'upsell'
// Organizes content WITHIN Sales Hub

trainingCategory: string[]
// Values: 'onboarding', 'advanced-skills', 'certifications', 'product-training'
// Organizes content WITHIN Training Hub

partnerCategory: string[]
// Values: 'co-sell', 'onboarding', 'marketing', 'deal-registration'
// Organizes content WITHIN Partner Hub
```

### Display Control
```typescript
featured: boolean          // Shows in Featured sections (all hubs)
showInUpcoming: boolean    // Shows in "New & Featured" sections
priority: number           // Sort order (0-100, higher = first)
publishDate: datetime      // Auto-shows in "New" if < 30 days
```

---

## Common Scenarios

### Scenario 1: Universal Content (Shows Everywhere)
```typescript
{
  title: "Sidekick AI Overview",
  publishedTo: [],  // EMPTY = all hubs
  contentType: Training,
  products: [Sidekick],
  teams: [Sales, CS],
  status: "published"
}
```
**Result**: Appears in Content Hub, COE Hub, Sales Hub, Training Hub

---

### Scenario 2: Hub-Specific Content
```typescript
{
  title: "Discovery Call Framework",
  publishedTo: ['sales', 'training'],  // ONLY these hubs
  contentType: Template,
  salesCategory: ['discovery'],
  status: "published"
}
```
**Result**:
- ✅ Sales Hub → Discovery category
- ✅ Training Hub → Universal catalog
- ❌ Content Hub
- ❌ COE Hub

---

### Scenario 3: Multi-Hub with Different Categories
```typescript
{
  title: "BVA Best Practices",
  publishedTo: ['coe', 'sales', 'content'],
  contentType: Training,
  coeCategory: ['proof-points'],
  salesCategory: ['demo'],
  featured: true,
  status: "published"
}
```
**Result**:
- ✅ COE Hub → Proof Points tab + Featured
- ✅ Sales Hub → Demo category + Featured
- ✅ Content Hub → Featured section
- ❌ Training Hub (not in publishedTo)

---

### Scenario 4: Featured Across All Hubs
```typescript
{
  title: "Q1 Product Roadmap",
  publishedTo: ['all'],  // Explicit all
  contentType: Document,
  featured: true,
  priority: 100,
  status: "published"
}
```
**Result**: Top of Featured section in EVERY hub

---

## Hub Queries (GROQ Patterns)

### Content Hub (Universal)
```groq
*[
  _type == "catalogEntry"
  && status == "published"
  && (
    "content" in publishedTo
    || "all" in publishedTo
    || count(publishedTo) == 0
  )
]
```

### COE Hub (Category-Specific)
```groq
*[
  _type == "catalogEntry"
  && status == "published"
  && defined(coeCategory)
  && count(coeCategory) > 0
]
```

### Sales Hub (Hybrid)
```groq
*[
  _type == "catalogEntry"
  && status == "published"
  && (
    "sales" in publishedTo
    || "all" in publishedTo
    || count(publishedTo) == 0
    || defined(salesCategory)
  )
]
```

### Training Hub (Type-Filtered)
```groq
*[
  _type == "catalogEntry"
  && status == "published"
  && (
    "training" in publishedTo
    || "all" in publishedTo
  )
  && contentType->slug.current in ["training", "workshop", "webinar"]
]
```

---

## Creating Content for Multiple Hubs

### Step 1: Create Catalog Entry in Sanity
Go to: `http://localhost:3001/studio` → Catalog Entry → Create

### Step 2: Fill Core Fields
```
Title: "Your Content Title"
Description: "2-3 sentence summary"
Content Type: Select one (Training, Template, etc.)
Status: Published
```

### Step 3: Set Hub Distribution
```
Published To: Leave empty for ALL hubs
              OR select specific hubs

Hub Categories:
- COE Category: If this should appear in COE Hub tabs
- Sales Category: If this should appear in Sales Hub sections
- Training Category: If this should appear in Training Hub paths
```

### Step 4: Add Tags
```
Products: Select all relevant products
Teams: Select all relevant teams
Topics: Select 3-5 topics
```

### Step 5: Set Display Preferences
```
Featured: ✅ for high-priority content
Priority: 10 (high), 5 (medium), 0 (normal)
Publish Date: Set to today (or actual publish date)
```

### Step 6: Publish
Click **Publish** → Content appears in all relevant hubs within 60 seconds!

---

## Troubleshooting

### Content Not Showing in Any Hub
- [ ] Check `status` = "published" (not "draft")
- [ ] Wait 60 seconds for cache revalidation
- [ ] Check browser cache (hard refresh)

### Content Not Showing in Specific Hub
- [ ] Check `publishedTo` doesn't exclude that hub
- [ ] If hub uses category field (like COE), check category is set
- [ ] Check hub's GROQ query in page.tsx

### Content Showing in Wrong Hub
- [ ] Check `publishedTo` values
- [ ] Remove hub value if content shouldn't appear there
- [ ] Clear hub-specific categories if needed

---

## File Structure for New Hub

```
/app/[hub-name]/
├── page.tsx              # Server component
│   └── GROQ query with hub filtering
└── [HubName]Client.tsx   # Client component
    ├── Button navigation (categories)
    ├── Filtering logic
    └── CatalogView integration
```

---

## Summary Table

| Field | Purpose | Example | Impact |
|-------|---------|---------|--------|
| `publishedTo` | Hub visibility control | `['sales', 'training']` | Only Sales + Training hubs |
| `coeCategory` | COE Hub organization | `['proof-points']` | Appears in COE "Proof Points" tab |
| `salesCategory` | Sales Hub organization | `['demo']` | Appears in Sales "Demo" section |
| `featured` | Featured sections | `true` | Top of page in all hubs |
| `priority` | Sort order | `100` | Appears first in featured |
| `contentType` | Category filtering | `Training` | Filtered by "Training" button |
| `products` | Product filtering | `[Sidekick]` | Filtered by "Sidekick" tag |

---

## Quick Commands

### View Existing Hubs
- Content Hub: `http://localhost:3001/content-hub`
- COE Hub: `http://localhost:3001/coe-hub`

### Create Content
- Sanity Studio: `http://localhost:3001/studio`

### Check Logs
```bash
tail -f /tmp/dev-server.log
```

### Clear Cache
Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
