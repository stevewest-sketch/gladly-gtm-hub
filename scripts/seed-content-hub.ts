/**
 * Seed Script: Create Content Hub Dummy Entries
 *
 * Run with: npx tsx --env-file=.env.local scripts/seed-content-hub.ts
 */

import { createClient } from '@sanity/client'

// Verify environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('Run with: npx tsx --env-file=.env.local scripts/seed-content-hub.ts')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing SANITY_API_TOKEN')
  console.error('Add SANITY_API_TOKEN to .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

console.log('🔧 Sanity Config:')
console.log(`  Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
console.log(`  Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)
console.log(`  Token: ${process.env.SANITY_API_TOKEN ? '✅ Set' : '❌ Missing'}\n`)

// Helper to generate slugs
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

// Helper to get date X days ago
const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

// Content Hub entries (Templates, Battle Cards, etc.)
const contentHubEntries = [
  // Template 1: EBR Deck - Featured
  {
    _type: 'catalogEntry',
    title: 'Executive Business Review (EBR) Deck Template',
    description: 'Customizable PowerPoint template for quarterly business reviews. Includes sections for metrics, wins, roadmap, and expansion opportunities.',
    slug: { _type: 'slug', current: slugify('Executive Business Review (EBR) Deck Template') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(5), // NEW
    featured: true,
    priority: 95,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://docs.google.com/presentation/d/example-ebr-deck',
    keyTakeaways: [
      'Professional EBR structure proven to drive renewals',
      'Data visualization templates for key metrics',
      'Expansion conversation frameworks',
    ],
    _contentTypeRef: 'deck',
    _productsRefs: ['sidekick', 'voice', 'classic'],
    _teamsRefs: ['customer-success'],
    _topicsRefs: ['templates', 'best-practices'],
  },

  // Template 2: Discovery Script
  {
    _type: 'catalogEntry',
    title: 'Discovery Call Script: Retail & E-commerce',
    description: 'Proven discovery framework tailored for retail and e-commerce prospects. Includes pain point questions, qualification criteria, and next-step recommendations.',
    slug: { _type: 'slug', current: slugify('Discovery Call Script: Retail & E-commerce') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(12), // NEW
    featured: false,
    showInUpcoming: true,
    priority: 80,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/example-discovery-script',
    keyTakeaways: [
      'Uncover hidden pain points in legacy systems',
      'Qualify enterprise vs mid-market opportunities',
      'Position Gladly as strategic vs tactical solution',
    ],
    _contentTypeRef: 'template',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates', 'best-practices'],
  },

  // Template 3: Demo Deck
  {
    _type: 'catalogEntry',
    title: 'Standard Sales Demo Deck',
    description: 'Complete pitch deck for standard sales demos. Covers Gladly overview, key differentiators, customer success stories, and pricing framework.',
    slug: { _type: 'slug', current: slugify('Standard Sales Demo Deck') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(20),
    featured: false,
    showInUpcoming: true,
    priority: 85,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://docs.google.com/presentation/d/example-demo-deck',
    keyTakeaways: [
      'Proven deck structure for 30-minute demos',
      'Key slides that drive urgency and value',
      'Customization tips for different verticals',
    ],
    _contentTypeRef: 'deck',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },

  // Template 4: ROI One-Pager
  {
    _type: 'catalogEntry',
    title: 'ROI Calculator One-Pager',
    description: 'Simple one-page tool to calculate customer ROI based on agent efficiency, customer satisfaction improvements, and cost savings.',
    slug: { _type: 'slug', current: slugify('ROI Calculator One-Pager') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(8), // NEW
    featured: true,
    priority: 90,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/example-roi-calculator',
    keyTakeaways: [
      'Calculate savings from ticket deflection',
      'Measure efficiency gains from unified workspace',
      'Project revenue impact from improved CSAT',
    ],
    _contentTypeRef: 'one-pager',
    _productsRefs: ['sidekick', 'classic'],
    _teamsRefs: ['sales', 'customer-success'],
    _topicsRefs: ['templates', 'best-practices'],
  },

  // Template 5: Email Templates
  {
    _type: 'catalogEntry',
    title: 'Cold Outreach Email Templates Pack',
    description: 'Collection of 10 proven cold email templates for different buyer personas and use cases. Includes subject lines, body copy, and follow-up sequences.',
    slug: { _type: 'slug', current: slugify('Cold Outreach Email Templates Pack') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(25),
    featured: false,
    priority: 70,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/example-email-templates',
    keyTakeaways: [
      '10 email templates with proven open rates',
      'Personalization frameworks for each persona',
      'Follow-up cadence recommendations',
    ],
    _contentTypeRef: 'template',
    _productsRefs: ['classic'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },

  // Battle Card 1: Zendesk - Featured
  {
    _type: 'catalogEntry',
    title: 'Zendesk vs Gladly Battle Card',
    description: 'Complete competitive positioning guide for Zendesk. Includes feature comparison, pricing insights, customer testimonials, and objection handling.',
    slug: { _type: 'slug', current: slugify('Zendesk vs Gladly Battle Card') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(10), // NEW
    featured: true,
    priority: 88,
    pageTemplate: 'battle-card',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/example-zendesk-battlecard',
    keyTakeaways: [
      'Key differentiators: Radically personal vs ticket-based',
      'Total cost of ownership comparison',
      'Common Zendesk pain points and how Gladly solves them',
    ],
    _contentTypeRef: 'battle-card',
    _productsRefs: ['classic'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['competitive-intelligence'],
  },

  // Battle Card 2: Salesforce
  {
    _type: 'catalogEntry',
    title: 'Salesforce Service Cloud vs Gladly',
    description: 'In-depth competitive analysis for Salesforce Service Cloud. Focus on complexity vs simplicity, agent productivity, and total cost of ownership.',
    slug: { _type: 'slug', current: slugify('Salesforce Service Cloud vs Gladly') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(15),
    featured: false,
    showInUpcoming: true,
    priority: 75,
    pageTemplate: 'battle-card',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/example-salesforce-battlecard',
    keyTakeaways: [
      'Salesforce is built for sales, not customer service',
      'Implementation complexity and hidden costs',
      'Agent experience comparison: Gladly wins on simplicity',
    ],
    _contentTypeRef: 'battle-card',
    _productsRefs: ['classic'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['competitive-intelligence'],
  },

  // Battle Card 3: Kustomer
  {
    _type: 'catalogEntry',
    title: 'Kustomer vs Gladly Battle Card',
    description: 'Competitive positioning for Kustomer. Highlight differences in customer-first approach, ease of use, and proven ROI at scale.',
    slug: { _type: 'slug', current: slugify('Kustomer vs Gladly Battle Card') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(30),
    featured: false,
    priority: 65,
    pageTemplate: 'battle-card',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/example-kustomer-battlecard',
    keyTakeaways: [
      'Customer-first vs customer-centric: the key difference',
      'Platform stability and reliability comparison',
      'Why leading brands choose Gladly over Kustomer',
    ],
    _contentTypeRef: 'battle-card',
    _productsRefs: ['classic', 'sidekick'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['competitive-intelligence'],
  },

  // Competitive 4: Market Landscape
  {
    _type: 'catalogEntry',
    title: 'Customer Service Platform Market Landscape 2024',
    description: 'Comprehensive overview of the customer service platform market. Includes vendor comparison matrix, market trends, and Gladly positioning.',
    slug: { _type: 'slug', current: slugify('Customer Service Platform Market Landscape 2024') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(18),
    featured: false,
    showInUpcoming: true,
    priority: 72,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/example-market-landscape',
    keyTakeaways: [
      'Understand the 4 categories of customer service platforms',
      'Key market trends driving platform selection',
      'Where Gladly fits and wins in the landscape',
    ],
    _contentTypeRef: 'competitive',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['competitive-intelligence'],
  },

  // Competitive 5: Case Study Deck
  {
    _type: 'catalogEntry',
    title: 'Top 10 Customer Success Stories Deck',
    description: 'Curated collection of our best customer success stories across verticals. Includes metrics, testimonials, and implementation timelines.',
    slug: { _type: 'slug', current: slugify('Top 10 Customer Success Stories Deck') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(35),
    featured: false,
    priority: 78,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://docs.google.com/presentation/d/example-case-studies',
    keyTakeaways: [
      'Proven results across retail, travel, and fintech',
      'Common success patterns and metrics',
      'How to position case studies for maximum impact',
    ],
    _contentTypeRef: 'deck',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales', 'customer-success'],
    _topicsRefs: ['proof-points'],
  },
]

async function seedContentHub() {
  console.log('🌱 Starting Content Hub seed...\n')

  // First, let's fetch the reference documents we need
  const contentTypes = await client.fetch(`*[_type == "contentType"]{ _id, slug }`)
  const products = await client.fetch(`*[_type == "product"]{ _id, slug }`)
  const teams = await client.fetch(`*[_type == "team"]{ _id, slug }`)
  const topics = await client.fetch(`*[_type == "topic"]{ _id, slug }`)

  console.log('📚 Found taxonomies:')
  console.log(`  - Content Types: ${contentTypes.length}`)
  console.log(`  - Products: ${products.length}`)
  console.log(`  - Teams: ${teams.length}`)
  console.log(`  - Topics: ${topics.length}\n`)

  if (contentTypes.length === 0) {
    console.error('❌ No content types found. Run seed-taxonomies.ts first!')
    process.exit(1)
  }

  // Helper to find reference ID by slug
  const findRef = (items: any[], slug: string) => {
    const item = items.find((i) => i.slug?.current === slug)
    return item ? { _type: 'reference', _ref: item._id } : null
  }

  // Create each entry
  let created = 0
  let failed = 0

  for (const entry of contentHubEntries) {
    try {
      const {
        _contentTypeRef,
        _productsRefs,
        _teamsRefs,
        _topicsRefs,
        ...entryData
      } = entry

      // Build the full entry with references
      const fullEntry = {
        ...entryData,
        contentType: findRef(contentTypes, _contentTypeRef as string),
        products: (_productsRefs as string[])?.map((slug) => findRef(products, slug)).filter(Boolean),
        teams: (_teamsRefs as string[])?.map((slug) => findRef(teams, slug)).filter(Boolean),
        topics: (_topicsRefs as string[])?.map((slug) => findRef(topics, slug)).filter(Boolean),
      }

      // Create the document
      const result = await client.create(fullEntry)
      created++
      console.log(`✅ Created: ${entry.title}`)
      console.log(`   ID: ${result._id}`)
      console.log(`   Type: ${_contentTypeRef}`)
      console.log(`   Featured: ${entry.featured ? 'Yes' : 'No'}`)
      console.log(`   External URL: ${entry.externalUrl}`)
      console.log('')
    } catch (error: any) {
      failed++
      console.error(`❌ Failed to create: ${entry.title}`)
      console.error(`   Error: ${error.message}\n`)
    }
  }

  console.log('🎉 Content Hub seed complete!')
  console.log(`   ✅ Created: ${created}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log('\n📍 View your content at:')
  console.log('   - Content Hub: http://localhost:3001/content-hub')
  console.log('   - Sanity Studio: http://localhost:3001/studio')
}

// Run the seed
seedContentHub()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error)
    process.exit(1)
  })
