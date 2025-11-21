/**
 * Seed Script: Extended Content Hub Entries (One-Pagers, Activation Kits, Templates)
 *
 * Run with: npx tsx --env-file=.env.local scripts/seed-content-hub-extended.ts
 */

import { createClient } from '@sanity/client'

// Verify environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('Run with: npx tsx --env-file=.env.local scripts/seed-content-hub-extended.ts')
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

// Extended content hub entries
const extendedContentEntries = [
  // === ONE-PAGERS (4) ===
  {
    _type: 'catalogEntry',
    title: 'Gladly Platform Overview One-Pager',
    description: 'Single-page overview of the Gladly platform, key features, and benefits. Perfect for quick reference during calls or to leave behind after meetings.',
    slug: { _type: 'slug', current: slugify('Gladly Platform Overview One-Pager') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(3),
    featured: true,
    priority: 92,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/platform-overview',
    keyTakeaways: [
      'All core features on one page',
      'Perfect for quick prospect education',
      'Includes key differentiators and proof points',
    ],
    _contentTypeRef: 'one-pager',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales', 'customer-success'],
    _topicsRefs: ['templates'],
  },
  {
    _type: 'catalogEntry',
    title: 'Sidekick AI Capabilities One-Pager',
    description: 'Concise overview of Sidekick AI features, use cases, and customer results. Ideal for AI-focused conversations.',
    slug: { _type: 'slug', current: slugify('Sidekick AI Capabilities One-Pager') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(7),
    featured: false,
    showInUpcoming: true,
    priority: 85,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/sidekick-overview',
    keyTakeaways: [
      'AI features explained in simple terms',
      'Real customer ROI metrics',
      'Comparison to legacy AI approaches',
    ],
    _contentTypeRef: 'one-pager',
    _productsRefs: ['sidekick'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['ai', 'templates'],
  },
  {
    _type: 'catalogEntry',
    title: 'Security & Compliance One-Pager',
    description: 'Comprehensive security and compliance overview including SOC 2, GDPR, CCPA, and data residency options.',
    slug: { _type: 'slug', current: slugify('Security & Compliance One-Pager') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(14),
    featured: false,
    priority: 78,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/security-compliance',
    keyTakeaways: [
      'All certifications and compliance standards',
      'Data security architecture overview',
      'Addresses common enterprise security questions',
    ],
    _contentTypeRef: 'one-pager',
    _productsRefs: ['classic'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },
  {
    _type: 'catalogEntry',
    title: 'Pricing Framework One-Pager',
    description: 'Internal guide to Gladly pricing structure, packaging options, and negotiation guidelines.',
    slug: { _type: 'slug', current: slugify('Pricing Framework One-Pager') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(22),
    featured: false,
    priority: 75,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/pricing-framework',
    keyTakeaways: [
      'Standard pricing tiers and packages',
      'Discount guidelines and approval process',
      'How to structure multi-year deals',
    ],
    _contentTypeRef: 'one-pager',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },

  // === ACTIVATION KITS (4) ===
  {
    _type: 'catalogEntry',
    title: 'New Customer Welcome Kit',
    description: 'Complete activation package for new customers including welcome email templates, kickoff deck, success metrics framework, and 90-day roadmap.',
    slug: { _type: 'slug', current: slugify('New Customer Welcome Kit') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(5),
    featured: true,
    priority: 88,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://drive.google.com/drive/folders/welcome-kit',
    keyTakeaways: [
      'Everything needed for successful customer onboarding',
      'Proven templates that reduce time-to-value',
      'Includes success metrics and milestone tracking',
    ],
    _contentTypeRef: 'activation-kit',
    _productsRefs: ['classic', 'sidekick'],
    _teamsRefs: ['customer-success', 'onboarding'],
    _topicsRefs: ['templates', 'best-practices'],
  },
  {
    _type: 'catalogEntry',
    title: 'Retail Vertical Activation Kit',
    description: 'Industry-specific kit for retail prospects including vertical pitch deck, retail case studies, ROI calculator with retail benchmarks, and demo script.',
    slug: { _type: 'slug', current: slugify('Retail Vertical Activation Kit') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(11),
    featured: false,
    showInUpcoming: true,
    priority: 82,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://drive.google.com/drive/folders/retail-kit',
    keyTakeaways: [
      'Retail-specific messaging and positioning',
      'Case studies from Warby Parker, Bombas, AllBirds',
      'Benchmarks and metrics relevant to retail',
    ],
    _contentTypeRef: 'activation-kit',
    _productsRefs: ['classic', 'sidekick'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },
  {
    _type: 'catalogEntry',
    title: 'QBR (Quarterly Business Review) Kit',
    description: 'Complete QBR package including presentation template, data visualization tools, success story framework, and renewal conversation guide.',
    slug: { _type: 'slug', current: slugify('QBR (Quarterly Business Review) Kit') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(18),
    featured: false,
    priority: 76,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://drive.google.com/drive/folders/qbr-kit',
    keyTakeaways: [
      'Professional QBR structure that drives renewals',
      'Data-driven storytelling templates',
      'Expansion and upsell conversation frameworks',
    ],
    _contentTypeRef: 'activation-kit',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['customer-success'],
    _topicsRefs: ['templates', 'best-practices'],
  },
  {
    _type: 'catalogEntry',
    title: 'Enterprise Sales Campaign Kit',
    description: 'Multi-touch campaign package for enterprise accounts including outreach sequences, executive briefing deck, ROI white paper, and follow-up templates.',
    slug: { _type: 'slug', current: slugify('Enterprise Sales Campaign Kit') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(26),
    featured: false,
    priority: 73,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://drive.google.com/drive/folders/enterprise-kit',
    keyTakeaways: [
      '6-touch campaign proven for enterprise deals',
      'Executive-level messaging and materials',
      'Includes objection handling and competitive positioning',
    ],
    _contentTypeRef: 'activation-kit',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },

  // === TEMPLATES (4) ===
  {
    _type: 'catalogEntry',
    title: 'Executive Briefing Deck Template',
    description: 'High-level presentation template for C-suite meetings. Focus on business value, strategic alignment, and transformation roadmap.',
    slug: { _type: 'slug', current: slugify('Executive Briefing Deck Template') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(4),
    featured: true,
    priority: 90,
    pageTemplate: 'micro-learning',
    format: 'template',
    externalUrl: 'https://docs.google.com/presentation/d/exec-briefing',
    keyTakeaways: [
      'C-suite focused messaging and metrics',
      'Strategic value over feature details',
      'Proven to accelerate enterprise sales cycles',
    ],
    _contentTypeRef: 'template',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },
  {
    _type: 'catalogEntry',
    title: 'Mutual Success Plan Template',
    description: 'Collaborative planning template for aligning with prospects on evaluation criteria, timeline, stakeholders, and success metrics.',
    slug: { _type: 'slug', current: slugify('Mutual Success Plan Template') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(9),
    featured: false,
    showInUpcoming: true,
    priority: 84,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/mutual-success-plan',
    keyTakeaways: [
      'Builds alignment and commitment with prospects',
      'Identifies and mitigates deal risks early',
      'Increases win rates by 40% when used properly',
    ],
    _contentTypeRef: 'template',
    _productsRefs: ['classic', 'sidekick'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates', 'best-practices'],
  },
  {
    _type: 'catalogEntry',
    title: 'Customer Reference Call Script',
    description: 'Structured template for facilitating customer reference calls including pre-call prep, question framework, and follow-up best practices.',
    slug: { _type: 'slug', current: slugify('Customer Reference Call Script') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(16),
    featured: false,
    priority: 79,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/reference-script',
    keyTakeaways: [
      'Maximize value from customer reference calls',
      'Prep customers to share compelling stories',
      'Follow-up process to convert interest to deals',
    ],
    _contentTypeRef: 'template',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales', 'customer-success'],
    _topicsRefs: ['templates', 'best-practices'],
  },
  {
    _type: 'catalogEntry',
    title: 'Proposal Template - Enterprise',
    description: 'Professional proposal template for enterprise deals including executive summary, solution overview, pricing, implementation plan, and ROI projection.',
    slug: { _type: 'slug', current: slugify('Proposal Template - Enterprise') },
    status: 'published',
    publishedTo: ['content'],
    publishDate: daysAgo(24),
    featured: false,
    priority: 77,
    pageTemplate: 'micro-learning',
    format: 'document',
    externalUrl: 'https://docs.google.com/document/d/enterprise-proposal',
    keyTakeaways: [
      'Enterprise-grade proposal structure',
      'Combines business value with technical details',
      'Includes legal and security sections',
    ],
    _contentTypeRef: 'template',
    _productsRefs: ['classic', 'sidekick', 'voice'],
    _teamsRefs: ['sales'],
    _topicsRefs: ['templates'],
  },
]

async function seedExtendedContent() {
  console.log('🌱 Starting Extended Content Hub seed...\n')

  // First, ensure activation-kit content type exists
  console.log('🔍 Checking for activation-kit content type...')
  const activationKitType = await client.fetch(
    `*[_type == "contentType" && slug.current == "activation-kit"][0]`
  )

  if (!activationKitType) {
    console.log('📝 Creating activation-kit content type...')
    await client.create({
      _type: 'contentType',
      name: 'Activation Kit',
      slug: { _type: 'slug', current: 'activation-kit' },
      icon: '📦',
      color: '#10B981', // Emerald
      description: 'Comprehensive resource packages for specific use cases',
      order: 6,
    })
    console.log('✅ Created activation-kit content type\n')
  } else {
    console.log('✅ activation-kit content type already exists\n')
  }

  // Fetch reference documents
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
  let created = 0
  let failed = 0

  for (const entry of extendedContentEntries) {
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
      console.log('')
    } catch (error: any) {
      failed++
      console.error(`❌ Failed to create: ${entry.title}`)
      console.error(`   Error: ${error.message}\n`)
    }
  }

  console.log('🎉 Extended Content Hub seed complete!')
  console.log(`   ✅ Created: ${created}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log('\n📊 Summary by Type:')
  console.log('   - One-Pagers: 4')
  console.log('   - Activation Kits: 4')
  console.log('   - Templates: 4')
  console.log('\n📍 View your content at:')
  console.log('   - Content Hub: http://localhost:3001/content-hub')
  console.log('   - Sanity Studio: http://localhost:3001/studio')
}

// Run the seed
seedExtendedContent()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error)
    process.exit(1)
  })
