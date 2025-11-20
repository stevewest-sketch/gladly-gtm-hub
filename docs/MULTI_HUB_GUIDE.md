# Multi-Hub Architecture Guide

## Overview

Create multiple specialized hubs (Content Hub, COE Hub, Sales Hub, Partner Hub, etc.) that all pull from the **same catalog entries** in Sanity with smart filtering.

---

## Current Hub Setup

### Existing Hubs
1. **Content Hub** (`/content-hub`) - Templates, training, competitive intelligence
2. **COE Hub** (`/coe-hub`) - Center of Excellence resources

### Future Hub Ideas
- **Training Hub** (`/training-hub`) - Pure training and learning paths
- **Sales Playbook Hub** (`/sales-hub`) - Sales-specific plays, methodologies
- **Partner Hub** (`/partner-hub`) - Partner enablement and co-selling
- **Customer Lifecycle Hub** (`/lifecycle-hub`) - Journey-based content
- **Product Hub** (`/product-hub`) - Product-specific deep dives

---

## How Multi-Hub Filtering Works

### Two-Level Filtering System

#### Level 1: `publishedTo` - Hub Access Control
**Purpose**: Control which hubs can display this content

```typescript
// Example in Sanity
publishedTo: ['training', 'content']
// → Appears in Training Hub and Content Hub only

publishedTo: []  // or empty
// → Appears in ALL hubs (universal content)

publishedTo: ['all']
// → Explicitly published to all hubs
```

#### Level 2: Hub-Specific Categories - In-Hub Organization
**Purpose**: Organize content WITHIN a specific hub

```typescript
// COE Hub specific
coeCategory: ['proof-points', 'templates']

// Training Hub specific (add to schema)
trainingCategory: ['onboarding', 'advanced-skills']

// Sales Hub specific (add to schema)
salesCategory: ['discovery', 'demo', 'negotiation']
```

---

## Step-by-Step: Add a New Hub

### Example: Creating a Sales Playbook Hub

#### Step 1: Update Sanity Schema (Optional)

Add hub-specific category field to `/sanity/schemas/catalogEntry.ts`:

```typescript
// Add to fields array (after coeCategory)
{
  name: 'salesCategory',
  title: 'Sales Playbook Category',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    list: [
      { title: 'Discovery Plays', value: 'discovery' },
      { title: 'Demo Scripts', value: 'demo' },
      { title: 'Objection Handling', value: 'objections' },
      { title: 'Negotiation Tactics', value: 'negotiation' },
      { title: 'Closing Techniques', value: 'closing' },
      { title: 'Upsell Strategies', value: 'upsell' },
    ],
  },
  description: 'For Sales Playbook Hub only',
  group: 'taxonomies',
},
```

**Update `publishedTo` list** to include new hub:

```typescript
{
  name: 'publishedTo',
  title: 'Published To',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    list: [
      { title: 'Training Hub', value: 'training' },
      { title: 'COE Hub', value: 'coe' },
      { title: 'Content Hub', value: 'content' },
      { title: 'Sales Playbook Hub', value: 'sales' }, // NEW
      { title: 'Customer Lifecycle', value: 'customer-lifecycle' },
      { title: 'All Pages', value: 'all' },
    ],
  },
  description: 'Which hubs can display this? (empty = all hubs)',
  group: 'display',
},
```

#### Step 2: Create Hub Directory Structure

```bash
/app/sales-hub/
├── page.tsx           # Server component (fetches from Sanity)
└── SalesHubClient.tsx # Client component (UI and filtering)
```

#### Step 3: Create Server Component (`page.tsx`)

```typescript
import { client } from '@/lib/sanity'
import SalesHubClient from './SalesHubClient'

const query = `{
  "entries": *[
    _type == "catalogEntry"
    && status == "published"
    && (
      "sales" in publishedTo
      || "all" in publishedTo
      || count(publishedTo) == 0
      || defined(salesCategory)
    )
  ] | order(publishDate desc) {
    _id,
    title,
    description,
    slug,
    contentType->{
      _id,
      name,
      slug,
      icon,
      color
    },
    format,
    publishDate,
    duration,
    presenter,
    thumbnailImage{
      asset->{
        _id,
        url
      }
    },
    featured,
    showInUpcoming,
    priority,
    salesCategory,
    products[]->{
      _id,
      name,
      slug,
      color
    },
    teams[]->{
      _id,
      name,
      slug
    },
    topics[]->{
      _id,
      name,
      slug
    }
  },
  "products": *[_type == "product"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    color
  },
  "teams": *[_type == "team"] | order(order asc, name asc) {
    _id,
    name,
    slug
  },
  "topics": *[_type == "topic"] | order(order asc, name asc) {
    _id,
    name,
    slug
  }
}`

export default async function SalesHubPage() {
  const data = await client.fetch(query, {}, {
    next: { revalidate: 60 }
  })

  if (!data.entries || data.entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Sales Playbook Hub</h1>
          <p className="text-gray-600 mb-6">
            No sales content found. Create catalog entries in Sanity with salesCategory.
          </p>
          <a
            href="/studio"
            className="inline-block bg-[#009B00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#008000] transition-all"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    )
  }

  return (
    <SalesHubClient
      entries={data.entries}
      availableProducts={data.products}
      availableTeams={data.teams}
      availableTopics={data.topics}
    />
  )
}

export async function generateMetadata() {
  return {
    title: 'Sales Playbook Hub | Gladly Enablement',
    description: 'Sales plays, methodologies, and winning strategies for every stage of the deal.',
  }
}
```

#### Step 4: Create Client Component (`SalesHubClient.tsx`)

```typescript
'use client'

import { useState } from 'react'
import ButtonNav from '@/components/hub/ButtonNav'
import CatalogView from '@/components/catalog/CatalogView'
import HubSection from '@/components/hub/HubSection'
import { CatalogEntry, Product, Team, Topic } from '@/lib/types/catalog'

interface SalesHubClientProps {
  entries: CatalogEntry[]
  availableProducts: Product[]
  availableTeams: Team[]
  availableTopics: Topic[]
}

const SALES_CATEGORIES = [
  {
    id: 'all',
    label: 'All Plays',
    icon: '📊',
    color: 'bg-[#009B00]',
    salesCategories: [],
  },
  {
    id: 'discovery',
    label: 'Discovery',
    icon: '🔍',
    color: 'bg-[#3B82F6]',
    salesCategories: ['discovery'],
  },
  {
    id: 'demo',
    label: 'Demo & Presentation',
    icon: '🎯',
    color: 'bg-[#8C69F0]',
    salesCategories: ['demo'],
  },
  {
    id: 'objections',
    label: 'Objection Handling',
    icon: '🛡️',
    color: 'bg-[#F97316]',
    salesCategories: ['objections'],
  },
  {
    id: 'closing',
    label: 'Closing',
    icon: '🎉',
    color: 'bg-[#10B981]',
    salesCategories: ['closing', 'negotiation'],
  },
]

export default function SalesHubClient({
  entries,
  availableProducts,
  availableTeams,
  availableTopics,
}: SalesHubClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const activeCategoryData = SALES_CATEGORIES.find(c => c.id === activeCategory)

  // Filter by sales category
  const getFilteredEntries = (): CatalogEntry[] => {
    if (!activeCategoryData?.salesCategories.length) {
      return entries
    }

    return entries.filter((entry) => {
      const entrySalesCategories = entry.salesCategory || []
      return activeCategoryData.salesCategories.some(cat =>
        entrySalesCategories.includes(cat)
      )
    })
  }

  const filteredEntries = getFilteredEntries()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-[#252525] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📊</span>
            <h1 className="text-[28px] leading-[32px] tracking-[-0.01em] font-bold">
              Sales Playbook Hub
            </h1>
          </div>
          <p className="text-[15px] leading-[24px] text-gray-300 max-w-2xl">
            Winning plays, proven methodologies, and battle-tested strategies
            for every stage of the sales cycle.
          </p>
        </div>
      </div>

      {/* Button Navigation */}
      <ButtonNav
        buttons={SALES_CATEGORIES}
        activeButton={activeCategory}
        onButtonChange={setActiveCategory}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <HubSection
          title={`${activeCategoryData?.icon} ${activeCategoryData?.label}`}
          description={`${filteredEntries.length} plays available`}
        >
          <CatalogView
            pageType="sales-hub"
            showFilters={true}
            filterOptions={['product', 'team', 'topic']}
            layout="grid"
            sortBy="priority"
            itemsPerPage={12}
            cardStyle="standard"
            showDuration={true}
            featuredSection={false}
            entries={filteredEntries}
            availableProducts={availableProducts}
            availableTeams={availableTeams}
            availableTopics={availableTopics}
          />
        </HubSection>
      </div>
    </div>
  )
}
```

---

## Query Patterns for Different Hubs

### Pattern 1: Hub-Specific Content ONLY
**Use case**: Training Hub showing ONLY training content

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

### Pattern 2: Universal Content + Hub-Specific
**Use case**: Content Hub showing all content OR content specifically tagged for it

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

### Pattern 3: Hub Category-Based
**Use case**: COE Hub showing only entries with coeCategory set

```groq
*[
  _type == "catalogEntry"
  && status == "published"
  && defined(coeCategory)
  && count(coeCategory) > 0
]
```

### Pattern 4: Combined Filtering
**Use case**: Sales Hub with both publishedTo AND salesCategory

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

---

## Real-World Examples

### Example 1: Universal Content
```
Title: "Sidekick AI Overview"
publishedTo: []  // Empty = all hubs
contentType: Training
coeCategory: []
salesCategory: []
```
**Appears in**: Content Hub, Training Hub, Sales Hub, COE Hub (everywhere)

### Example 2: Multi-Hub with Categories
```
Title: "Discovery Call Framework"
publishedTo: ['sales', 'training']
contentType: Template
coeCategory: []
salesCategory: ['discovery']
```
**Appears in**:
- Sales Hub → Discovery category
- Training Hub → Universal catalog
- NOT in COE Hub or Content Hub

### Example 3: Hub-Exclusive
```
Title: "BVA Framework Deep Dive"
publishedTo: ['coe']
contentType: Training
coeCategory: ['proof-points']
salesCategory: []
```
**Appears in**:
- COE Hub → Proof Points tab
- NOT in any other hub

### Example 4: All Hubs, Different Sections
```
Title: "Q1 Product Roadmap"
publishedTo: ['all']
contentType: Document
coeCategory: ['resources']
salesCategory: ['demo']
featured: true
```
**Appears in**:
- Content Hub → Featured section + Universal catalog
- COE Hub → Resources tab
- Sales Hub → Demo category
- Training Hub → Universal catalog

---

## Best Practices

### 1. Hub Design Philosophy

**General-Purpose Hubs** (Content Hub)
- `publishedTo`: Empty or 'all'
- Use `contentType` for categorization
- Broad filtering (products, teams, topics)

**Specialized Hubs** (Sales, COE, Training)
- `publishedTo`: Specific hub value or empty
- Use hub-specific category fields (`salesCategory`, `coeCategory`)
- Focused filtering relevant to hub purpose

### 2. Content Strategy

**Create Once, Publish Everywhere**
```
✅ Single catalogEntry with multiple hub tags
❌ Duplicate catalogEntry for each hub
```

**Use Hub Categories for Organization**
```
✅ salesCategory for in-hub navigation
❌ Creating separate contentTypes for each hub
```

**Empty publishedTo = Universal**
```
✅ Most content should have empty publishedTo (available everywhere)
⚠️ Only use specific publishedTo values for truly exclusive content
```

### 3. Filtering Guidelines

**Hub Page Query**
- Filter by `publishedTo` OR empty/all
- Optionally filter by hub-specific category field
- Always check `status == "published"`

**Client Component**
- Use hub-specific categories for button navigation
- Use universal filters (products, teams, topics) for catalog filtering
- Featured/New sections work the same across all hubs

---

## Checklist: Adding a New Hub

- [ ] Decide hub purpose and name (e.g., "Partner Hub")
- [ ] Update `catalogEntry.ts` schema:
  - [ ] Add hub value to `publishedTo` list
  - [ ] (Optional) Add hub-specific category field (e.g., `partnerCategory`)
- [ ] Create directory: `/app/[hub-name]/`
- [ ] Create `page.tsx` (server component with GROQ query)
- [ ] Create `[HubName]Client.tsx` (client component with button nav)
- [ ] Define category buttons for hub navigation
- [ ] Set up filtering logic for hub-specific categories
- [ ] Apply Gladly design system (colors, typography)
- [ ] Add hub link to main navigation
- [ ] Test with content that has:
  - [ ] Empty `publishedTo` (should appear)
  - [ ] Hub-specific `publishedTo` value (should appear)
  - [ ] Different hub `publishedTo` value (should NOT appear)
  - [ ] Hub-specific category values
- [ ] Document hub-specific fields in content creation guide

---

## Future Hub Ideas

### Training Hub
- **Purpose**: Learning paths, skill development
- **Categories**: Onboarding, Product Training, Advanced Skills, Certifications
- **Filter**: `publishedTo: ['training']` OR `contentType` in training-related types

### Partner Hub
- **Purpose**: Partner enablement, co-selling resources
- **Categories**: Partner Onboarding, Co-Sell Plays, Deal Registration, Marketing Resources
- **Field**: `partnerCategory: ['co-sell', 'onboarding', 'marketing']`

### Customer Lifecycle Hub
- **Purpose**: Journey-based content organization
- **Categories**: Pre-Sale, Onboarding, Adoption, Expansion, Renewal
- **Filter**: Use `journeyStages` taxonomy (already exists!)

### Product Hub
- **Purpose**: Deep product knowledge and features
- **Categories**: Per product (Sidekick, Voice, Platform)
- **Filter**: Use `products` taxonomy + `contentType` filtering

---

## Summary

**Multi-Hub Architecture = Single Source + Smart Filtering**

1. **Create content ONCE** in Sanity as `catalogEntry`
2. **Set `publishedTo`** to control hub visibility (empty = all hubs)
3. **Add hub-specific categories** for in-hub navigation (optional)
4. **Each hub queries** with appropriate filters
5. **Same entry appears** in multiple hubs based on properties

**No duplication. Maximum flexibility. Minimal maintenance.**
