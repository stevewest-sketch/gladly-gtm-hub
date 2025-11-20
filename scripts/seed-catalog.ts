/**
 * Seed Script: Create 10 Dummy Catalog Entries
 *
 * Run with: npx tsx --env-file=.env.local scripts/seed-catalog.ts
 */

import { createClient } from '@sanity/client'

// Verify environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('Run with: npx tsx --env-file=.env.local scripts/seed-catalog.ts')
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

// Dummy catalog entries with variety
const dummyCatalogEntries = [
  // Entry 1: Featured Training - Recent
  {
    _type: 'catalogEntry',
    title: 'Sidekick AI Mastery Workshop',
    description: 'Deep dive into Sidekick AI capabilities, best practices, and real customer success stories. Learn how to position AI as a game-changer.',
    slug: { _type: 'slug', current: slugify('Sidekick AI Mastery Workshop') },
    status: 'published',
    publishDate: daysAgo(5), // 5 days ago - NEW
    featured: true,
    showInUpcoming: true,
    priority: 95,
    pageTemplate: 'training-session',
    format: 'live-replay',
    duration: 45,
    presenter: 'Sarah Chen, Product Manager',
    keyTakeaways: [
      'Understand the 3 core AI capabilities that differentiate Gladly',
      'Learn objection handling for AI concerns',
      'See real metrics from top-performing Sidekick customers',
    ],
    // Will reference these after creation
    _contentTypeRef: 'training',
    _productsRefs: ['sidekick'],
    _teamsRefs: ['sales', 'customer-success'],
    _topicsRefs: ['ai', 'product-training'],
    coeCategory: ['proof-points'],
    salesCategory: ['demo'],
  },

  // Entry 2: Template - Featured
  {
    _type: 'catalogEntry',
    title: 'Executive Business Review (EBR) Deck Template',
    description: 'Customizable PowerPoint template for quarterly business reviews. Includes sections for metrics, wins, roadmap, and expansion opportunities.',
    slug: { _type: 'slug', current: slugify('Executive Business Review (EBR) Deck Template') },
    status: 'published',
    publishDate: daysAgo(45),
    featured: true,
    priority: 85,
    pageTemplate: 'micro-learning',
    format: 'template',
    hasHowToUse: true,
    keyTakeaways: [
      'Professional EBR structure proven to drive renewals',
      'Data visualization templates for key metrics',
      'Expansion conversation frameworks',
    ],
    _contentTypeRef: 'deck',
    _productsRefs: ['sidekick', 'voice', 'classic'],
    _teamsRefs: ['customer-success'],
    _topicsRefs: ['templates', 'best-practices'],
    coeCategory: ['templates'],
  },

  // Entry 3: Battle Card - Competitive
  {
    _type: 'catalogEntry',
    title: 'Zendesk vs Gladly Battle Card',
    description: 'Complete competitive positioning guide for Zendesk. Includes feature comparison, pricing insights, customer testimonials, and objection handling.',
    slug: { _type: 'slug', current: slugify('Zendesk vs Gladly Battle Card') },
    status: 'published',
    publishDate: daysAgo(15), // NEW
    featured: false,
    showInUpcoming: true,
    priority: 70,
    pageTemplate: 'battle-card',
    format: 'document',
    keyTakeaways: [
      'Key differentiators: Radically personal vs ticket-based',
      'Total cost of ownership comparison',
      'Common Zendesk pain points and how Gladly solves them',
    ],
    _contentTypeRef: 'battle-card',
    _productsRefs: ['classic'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['competitive-intelligence'],
    salesCategory: ['objections', 'demo'],
  },

  // Entry 4: Training - Voice Product
  {
    _type: 'catalogEntry',
    title: 'Voice AI Deep Dive: Setup to Success',
    description: 'Comprehensive guide to Gladly Voice AI features including call routing, agent assist, and analytics. Perfect for pre-sales and implementation teams.',
    slug: { _type: 'slug', current: slugify('Voice AI Deep Dive: Setup to Success') },
    status: 'published',
    publishDate: daysAgo(60),
    featured: false,
    priority: 60,
    pageTemplate: 'training-session',
    format: 'video',
    duration: 30,
    presenter: 'Marcus Johnson, Solutions Engineer',
    _contentTypeRef: 'training',
    _productsRefs: ['voice'],
    _teamsRefs: ['sales', 'onboarding'],
    _topicsRefs: ['product-training', 'ai'],
    trainingCategory: ['product-training'],
  },

  // Entry 5: One-Pager - Recent
  {
    _type: 'catalogEntry',
    title: 'ROI Calculator One-Pager',
    description: 'Simple one-page tool to calculate customer ROI based on agent efficiency, customer satisfaction improvements, and cost savings.',
    slug: { _type: 'slug', current: slugify('ROI Calculator One-Pager') },
    status: 'published',
    publishDate: daysAgo(8), // NEW
    featured: false,
    showInUpcoming: true,
    priority: 75,
    pageTemplate: 'micro-learning',
    format: 'document',
    keyTakeaways: [
      'Calculate savings from ticket deflection',
      'Measure efficiency gains from unified workspace',
      'Project revenue impact from improved CSAT',
    ],
    _contentTypeRef: 'one-pager',
    _productsRefs: ['sidekick', 'classic'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates', 'best-practices'],
    salesCategory: ['discovery', 'demo'],
  },

  // Entry 6: Webinar Recording
  {
    _type: 'catalogEntry',
    title: 'Customer Success Panel: Retail Excellence',
    description: 'Three retail leaders share how they transformed their customer service with Gladly. Featuring brands: Warby Parker, Bombas, and Crate & Barrel.',
    slug: { _type: 'slug', current: slugify('Customer Success Panel: Retail Excellence') },
    status: 'published',
    publishDate: daysAgo(90),
    featured: false,
    priority: 50,
    pageTemplate: 'training-session',
    format: 'live-replay',
    duration: 60,
    presenter: 'Panel Discussion',
    keyTakeaways: [
      'Real metrics: 40% reduction in handle time',
      'Implementation best practices from 3 different brands',
      'How to build internal buy-in for customer service transformation',
    ],
    _contentTypeRef: 'webinar',
    _productsRefs: ['classic', 'sidekick'],
    _teamsRefs: ['sales', 'customer-success'],
    _topicsRefs: ['best-practices', 'proof-points'],
    coeCategory: ['proof-points'],
  },

  // Entry 7: Template - Demo Script
  {
    _type: 'catalogEntry',
    title: 'Discovery Call Script: Retail & E-commerce',
    description: 'Proven discovery framework tailored for retail and e-commerce prospects. Includes pain point questions, qualification criteria, and next-step recommendations.',
    slug: { _type: 'slug', current: slugify('Discovery Call Script: Retail & E-commerce') },
    status: 'published',
    publishDate: daysAgo(30),
    featured: false,
    priority: 65,
    pageTemplate: 'micro-learning',
    format: 'document',
    hasHowToUse: true,
    keyTakeaways: [
      'Uncover hidden pain points in legacy systems',
      'Qualify enterprise vs mid-market opportunities',
      'Position Gladly as strategic vs tactical solution',
    ],
    _contentTypeRef: 'template',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates', 'best-practices'],
    salesCategory: ['discovery'],
  },

  // Entry 8: Training - Onboarding
  {
    _type: 'catalogEntry',
    title: 'New Hire Bootcamp: Gladly Platform 101',
    description: 'Essential onboarding training for new sales and CS team members. Covers platform overview, key differentiators, demo environment, and first 30 days.',
    slug: { _type: 'slug', current: slugify('New Hire Bootcamp: Gladly Platform 101') },
    status: 'published',
    publishDate: daysAgo(120),
    featured: false,
    priority: 80,
    pageTemplate: 'training-session',
    format: 'async',
    duration: 90,
    presenter: 'Enablement Team',
    difficulty: 'beginner',
    keyTakeaways: [
      'Understand the radically personal customer service philosophy',
      'Navigate the Gladly platform with confidence',
      'Deliver your first demo in 30 days',
    ],
    _contentTypeRef: 'training',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales', 'customer-success', 'onboarding'],
    _topicsRefs: ['product-training'],
    trainingCategory: ['onboarding'],
  },

  // Entry 9: Battle Card - Recent
  {
    _type: 'catalogEntry',
    title: 'Salesforce Service Cloud vs Gladly',
    description: 'In-depth competitive analysis for Salesforce Service Cloud. Focus on complexity vs simplicity, agent productivity, and total cost of ownership.',
    slug: { _type: 'slug', current: slugify('Salesforce Service Cloud vs Gladly') },
    status: 'published',
    publishDate: daysAgo(12), // NEW
    featured: false,
    showInUpcoming: true,
    priority: 72,
    pageTemplate: 'battle-card',
    format: 'document',
    keyTakeaways: [
      'Salesforce is built for sales, not customer service',
      'Implementation complexity and hidden costs',
      'Agent experience comparison: Gladly wins on simplicity',
    ],
    _contentTypeRef: 'battle-card',
    _productsRefs: ['classic'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['competitive-intelligence'],
    salesCategory: ['objections'],
  },

  // Entry 10: Featured - COE Content
  {
    _type: 'catalogEntry',
    title: 'BVA Framework Master Guide',
    description: 'Complete guide to Business Value Assessment methodology. Learn the 3-tier framework (101, 201, 301) with real examples, templates, and best practices.',
    slug: { _type: 'slug', current: slugify('BVA Framework Master Guide') },
    status: 'published',
    publishDate: daysAgo(20), // NEW
    featured: true,
    showInUpcoming: true,
    priority: 90,
    pageTemplate: 'training-session',
    format: 'document',
    duration: 45,
    keyTakeaways: [
      'Master the 3-tier BVA methodology',
      'Calculate customer ROI with confidence',
      'Build compelling business cases for executive buyers',
    ],
    _contentTypeRef: 'training',
    _productsRefs: ['sidekick', 'classic', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['best-practices', 'proof-points'],
    coeCategory: ['proof-points'],
    salesCategory: ['demo', 'negotiation'],
  },
]

async function seedCatalog() {
  console.log('🌱 Starting catalog seed...\n')

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

  // Helper to find reference ID by slug
  const findRef = (items: any[], slug: string) => {
    const item = items.find((i) => i.slug?.current === slug)
    return item ? { _type: 'reference', _ref: item._id } : null
  }

  // Create each entry
  for (const entry of dummyCatalogEntries) {
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
      console.log(`✅ Created: ${entry.title}`)
      console.log(`   ID: ${result._id}`)
      console.log(`   Featured: ${entry.featured ? 'Yes' : 'No'}`)
      console.log(`   Priority: ${entry.priority}`)
      console.log('')
    } catch (error: any) {
      console.error(`❌ Failed to create: ${entry.title}`)
      console.error(`   Error: ${error.message}\n`)
    }
  }

  console.log('🎉 Catalog seed complete!')
  console.log('\n📍 View your content at:')
  console.log('   - Content Hub: http://localhost:3001/content-hub')
  console.log('   - COE Hub: http://localhost:3001/coe-hub')
  console.log('   - Sanity Studio: http://localhost:3001/studio')
}

// Run the seed
seedCatalog()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error)
    process.exit(1)
  })
