# Seed Scripts

Scripts for populating the Sanity CMS with test data.

## Quick Start

```bash
# 1. Create taxonomies (content types, products, teams, topics)
npx tsx --env-file=.env.local scripts/seed-taxonomies.ts

# 2. Create catalog entries
npx tsx --env-file=.env.local scripts/seed-catalog.ts
```

## What Gets Created

### Taxonomies (seed-taxonomies.ts)

**Content Types (8)**:
- Training, Workshop, Webinar
- Template, Deck, One Pager
- Battle Card, Competitive

**Products (3)**:
- Sidekick (AI product)
- Voice (voice product)
- Classic (core platform)

**Teams (5)**:
- Sales
- Customer Success
- Onboarding
- Support
- Partner

**Topics (6)**:
- AI
- Product Training
- Best Practices
- Templates
- Competitive Intelligence
- Proof Points

### Catalog Entries (seed-catalog.ts)

**10 Diverse Entries** including:

1. **Sidekick AI Mastery Workshop** - Featured training (new, priority 95)
2. **Executive Business Review Deck** - Featured template (priority 85)
3. **Zendesk vs Gladly Battle Card** - New competitive content
4. **Voice AI Deep Dive** - Voice product training
5. **ROI Calculator One-Pager** - New template (priority 75)
6. **Customer Success Panel** - Webinar recording
7. **Discovery Call Script** - Sales template
8. **New Hire Bootcamp** - Onboarding training (priority 80)
9. **Salesforce vs Gladly** - New battle card
10. **BVA Framework Master Guide** - Featured COE content (new, priority 90)

**Distribution**:
- 3 Featured items (shown in Featured section)
- 5 "New" items (published < 30 days)
- Mix of content types (training, templates, battle cards)
- Various products, teams, topics
- COE categories (proof-points, templates)
- Sales categories (discovery, demo, objections, negotiation)

## Features Demonstrated

### Content Hub
- ✅ Featured section (3 items with `featured: true`)
- ✅ New Resources (5 items < 30 days old)
- ✅ Category filtering (Training, Templates, Competitive)
- ✅ Universal catalog with all entries
- ✅ Product/Team/Topic filters

### COE Hub
- ✅ COE-specific content with `coeCategory`
- ✅ Proof Points tab content
- ✅ Templates & Resources content

### Multi-Hub Architecture
- ✅ Single entries appear in multiple hubs
- ✅ Hub-specific categories (`coeCategory`, `salesCategory`)
- ✅ Different display in different contexts

## Environment Variables Required

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
```

**Note**: `SANITY_API_TOKEN` must have **write** permissions.

## Cleaning Up

To remove all seeded data, use the Sanity Studio:

1. Go to `http://localhost:3001/studio`
2. Navigate to each document type
3. Select and delete test entries

Or use the Sanity CLI:

```bash
# Delete all catalog entries (careful!)
sanity documents delete 'catalogEntry'

# Delete all taxonomies
sanity documents delete 'contentType'
sanity documents delete 'product'
sanity documents delete 'team'
sanity documents delete 'topic'
```

## Customizing Seed Data

### Add More Entries

Edit `scripts/seed-catalog.ts` and add to the `dummyCatalogEntries` array:

```typescript
{
  _type: 'catalogEntry',
  title: 'Your Title',
  description: 'Your description...',
  slug: { _type: 'slug', current: slugify('Your Title') },
  status: 'published',
  publishDate: daysAgo(10), // 10 days ago
  featured: true,
  priority: 80,
  pageTemplate: 'training-session',
  format: 'video',
  _contentTypeRef: 'training',
  _productsRefs: ['sidekick'],
  _teamsRefs: ['sales'],
  _topicsRefs: ['ai'],
}
```

### Add More Taxonomies

Edit `scripts/seed-taxonomies.ts`:

```typescript
// Add to contentTypes, products, teams, or topics arrays
const products = [
  { name: 'Sidekick', color: '#8C69F0', order: 1 },
  { name: 'New Product', color: '#FF5733', order: 4 }, // NEW
]
```

## Re-running Seeds

**Taxonomies**: Script checks for existing items and skips duplicates

```bash
# Safe to run multiple times
npx tsx --env-file=.env.local scripts/seed-taxonomies.ts
```

**Catalog Entries**: Script creates new entries each time

```bash
# Creates 10 NEW entries each run (duplicates possible)
npx tsx --env-file=.env.local scripts/seed-catalog.ts
```

## Troubleshooting

### Error: "Dataset not found"
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check `NEXT_PUBLIC_SANITY_DATASET` (default: 'production')
- Verify dataset exists in Sanity project

### Error: "Insufficient permissions"
- Check `SANITY_API_TOKEN` has **write** permissions
- Generate new token at: manage.sanity.io → API → Tokens

### Error: "Reference not found"
- Run `seed-taxonomies.ts` BEFORE `seed-catalog.ts`
- Catalog entries reference taxonomies (content types, products, etc.)

### Content not showing in Content Hub
- Wait 60 seconds for cache revalidation
- Hard refresh browser (Cmd+Shift+R)
- Check Sanity Studio to verify entries were created
- Ensure `status: "published"` (not "draft")

## View Your Data

After running seeds:

- **Content Hub**: http://localhost:3001/content-hub
- **COE Hub**: http://localhost:3001/coe-hub
- **Sanity Studio**: http://localhost:3001/studio

## What to Expect

### Content Hub
```
Featured & New (3 items)
├── Sidekick AI Mastery Workshop (priority 95, featured)
├── BVA Framework Master Guide (priority 90, featured)
└── Executive Business Review Deck (priority 85, featured)

New Resources (5 items)
├── Sidekick AI Mastery Workshop (5 days ago)
├── ROI Calculator One-Pager (8 days ago)
├── Salesforce Service Cloud vs Gladly (12 days ago)
├── Zendesk vs Gladly Battle Card (15 days ago)
└── BVA Framework Master Guide (20 days ago)

All Content (10 items)
└── Grid view with all entries, filterable by product/team/topic
```

### COE Hub
```
COE Content (items with coeCategory)
├── Sidekick AI Mastery Workshop (proof-points)
├── Executive Business Review Deck (templates)
├── Customer Success Panel (proof-points)
└── BVA Framework Master Guide (proof-points)
```

## Next Steps

After seeding:

1. ✅ Test Content Hub filtering (click Training, Templates, Competitive buttons)
2. ✅ Test product/team/topic filters in catalog
3. ✅ Verify Featured section shows correct items
4. ✅ Verify New Resources shows recent items
5. ✅ Check COE Hub displays coeCategory items
6. ✅ Edit entries in Sanity Studio to test real-time updates
7. ✅ Create your own entries following the seed patterns
