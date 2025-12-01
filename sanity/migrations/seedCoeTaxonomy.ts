/**
 * Seed CoE Hub Taxonomy Documents
 *
 * Creates all taxonomy documents for the Center of Excellence Hub.
 *
 * Usage:
 *   npx ts-node sanity/migrations/seedCoeTaxonomy.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ==========================================
// SEED DATA
// ==========================================

const coeSections = [
  { name: 'Use Case Best Practices', slug: 'use-case-best-practices', icon: '📱', order: 1, description: 'Best practices organized by Sidekick channel and use case' },
  { name: 'Customer Process Innovation', slug: 'customer-process-innovation', icon: '💡', order: 2, description: 'How customers are innovating with Gladly - creative implementations and success stories' },
  { name: 'Internal Best Practice', slug: 'internal-best-practice', icon: '🏢', order: 3, description: 'Internal processes, methodologies, and operational excellence' },
  { name: 'Tools & Calculators', slug: 'tools-calculators', icon: '🛠️', order: 4, description: 'ROI calculators, templates, and interactive tools' },
  { name: 'Proof Points', slug: 'proof-points', icon: '📊', order: 5, description: 'Stats, benchmarks, quotes, and customer anecdotes' },
  { name: 'Meeting Asset Examples', slug: 'meeting-asset-examples', icon: '📁', order: 6, description: 'Real customer deliverables - BVAs, QBRs, strategy sessions' },
]

const coeChannels = [
  { name: 'Chat', slug: 'chat', icon: '💬', order: 1 },
  { name: 'Voice', slug: 'voice', icon: '📞', order: 2 },
  { name: 'Email', slug: 'email', icon: '📧', order: 3 },
  { name: 'SMS', slug: 'sms', icon: '📱', order: 4 },
  { name: 'Social', slug: 'social', icon: '🌐', order: 5 },
  { name: 'In-App Messaging', slug: 'in-app-messaging', icon: '📲', order: 6 },
]

const coeCapabilities = [
  { name: 'General AI', slug: 'general-ai', icon: '🤖', order: 1 },
  { name: 'Guides', slug: 'guides', icon: '📚', order: 2 },
  { name: 'Journeys', slug: 'journeys', icon: '🗺️', order: 3 },
  { name: 'App Actions', slug: 'app-actions', icon: '⚡', order: 4 },
  { name: 'Integrations', slug: 'integrations', icon: '🔗', order: 5 },
  { name: 'Reporting & Analytics', slug: 'reporting-analytics', icon: '📈', order: 6 },
]

const coeIndustries = [
  { name: 'Retail', slug: 'retail', icon: '🛒', order: 1 },
  { name: 'Ecommerce', slug: 'ecommerce', icon: '🛍️', order: 2 },
  { name: 'Travel & Hospitality', slug: 'travel-hospitality', icon: '✈️', order: 3 },
  { name: 'Consumer Goods', slug: 'consumer-goods', icon: '📦', order: 4 },
  { name: 'Health & Wellness', slug: 'health-wellness', icon: '💪', order: 5 },
  { name: 'Financial Services', slug: 'financial-services', icon: '🏦', order: 6 },
  { name: 'Telecommunications', slug: 'telecommunications', icon: '📡', order: 7 },
  { name: 'Quick Service Restaurants', slug: 'qsr', icon: '🍔', order: 8 },
  { name: 'Media & Streaming', slug: 'media-streaming', icon: '🎬', order: 9 },
]

const coePermissions = [
  { name: 'Approved for External Use', slug: 'approved-external', color: 'green', description: 'Can be used in marketing, sales materials, and external presentations', order: 1 },
  { name: 'Internal Only', slug: 'internal-only', color: 'yellow', description: 'For internal enablement and training only', order: 2 },
  { name: 'Needs Customer Permission', slug: 'needs-permission', color: 'red', description: 'Requires explicit customer approval before use', order: 3 },
  { name: 'Archived', slug: 'archived', color: 'gray', description: 'No longer current or relevant', order: 4 },
]

const coeAssetTypes = [
  { name: 'BVA - Business Value Assessment', slug: 'bva', icon: '📊', description: 'Financial model highlighting cost savings and revenue growth', order: 1 },
  { name: 'QBR - Quarterly Business Review', slug: 'qbr', icon: '📅', description: 'Progress summary and optimization opportunities', order: 2 },
  { name: 'EBR - Executive Business Review', slug: 'ebr', icon: '👔', description: 'Customized partnership history and future opportunities for top customers', order: 3 },
  { name: 'RFX - RFP/RFI Response', slug: 'rfx', icon: '📝', description: 'Comprehensive proposal and response to customer/prospect request', order: 4 },
  { name: 'Strategy Session', slug: 'strategy-session', icon: '🎯', description: 'Customer meeting driving Hero or Sidekick optimization and expansion', order: 5 },
]

const coeAudiences = [
  { name: 'Executive', slug: 'executive', icon: '👔', attentionSpan: 'low', buyingImportance: 'critical', renewalImportance: 'critical', order: 1 },
  { name: 'Functional Leader', slug: 'functional-leader', icon: '📊', attentionSpan: 'medium', buyingImportance: 'consulted', renewalImportance: 'consulted', order: 2 },
  { name: 'Admin', slug: 'admin', icon: '⚙️', attentionSpan: 'high', buyingImportance: 'consulted', renewalImportance: 'consulted', order: 3 },
  { name: 'Manager', slug: 'manager', icon: '👥', attentionSpan: 'medium', buyingImportance: 'informed', renewalImportance: 'consulted', order: 4 },
  { name: 'Agent', slug: 'agent', icon: '🎧', attentionSpan: 'high', buyingImportance: 'informed', renewalImportance: 'informed', order: 5 },
]

const coeContentCategories = [
  { name: 'Onboarding Milestones', slug: 'onboarding-milestones', icon: '🚀', theme: 'theme-1', order: 1 },
  { name: 'Adoption Benchmarks', slug: 'adoption-benchmarks', icon: '📏', theme: 'theme-1', order: 2 },
  { name: 'Implementation Checklist', slug: 'implementation-checklist', icon: '✅', theme: 'theme-1', order: 3 },
  { name: 'Optimization Tips', slug: 'optimization-tips', icon: '💡', theme: 'theme-2', order: 4 },
  { name: 'Guide Templates', slug: 'guide-templates', icon: '📋', theme: 'theme-3', order: 5 },
  { name: 'Customer Anecdotes', slug: 'customer-anecdotes', icon: '💬', theme: 'evergreen', order: 6 },
  { name: 'ROI Proof Points', slug: 'roi-proof-points', icon: '💰', theme: 'evergreen', order: 7 },
  { name: 'Common Pitfalls', slug: 'common-pitfalls', icon: '⚠️', theme: 'evergreen', order: 8 },
  { name: 'Frameworks & Models', slug: 'frameworks-models', icon: '🧩', theme: 'theme-2', order: 9 },
  { name: 'Playbooks', slug: 'playbooks', icon: '📖', theme: 'theme-2', order: 10 },
  { name: 'Communication Assets', slug: 'communication-assets', icon: '📣', theme: 'theme-2', order: 11 },
  { name: 'Success Criteria', slug: 'success-criteria', icon: '🏆', theme: 'theme-1', order: 12 },
]

// ==========================================
// SEED FUNCTIONS
// ==========================================

interface SeedItem {
  name: string
  slug: string
  [key: string]: unknown
}

async function seedData(type: string, items: SeedItem[]) {
  console.log(`\n📦 Seeding ${type}...`)

  let created = 0
  let skipped = 0

  for (const item of items) {
    const { slug, ...rest } = item
    const doc = {
      _type: type,
      ...rest,
      slug: { _type: 'slug', current: slug },
    }

    try {
      const existing = await client.fetch(
        `*[_type == $type && slug.current == $slug][0]._id`,
        { type, slug }
      )

      if (existing) {
        console.log(`  ⏭️  ${item.name} (exists)`)
        skipped++
      } else {
        await client.create(doc)
        console.log(`  ✅ ${item.name}`)
        created++
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error(`  ❌ ${item.name}: ${message}`)
    }
  }

  console.log(`  → Created: ${created}, Skipped: ${skipped}`)
}

async function main() {
  console.log('🚀 Starting CoE Hub Taxonomy Seed\n')
  console.log('=' .repeat(50))

  await seedData('coeSection', coeSections)
  await seedData('coeChannel', coeChannels)
  await seedData('coeCapability', coeCapabilities)
  await seedData('coeIndustry', coeIndustries)
  await seedData('coePermission', coePermissions)
  await seedData('coeAssetType', coeAssetTypes)
  await seedData('coeAudience', coeAudiences)
  await seedData('coeContentCategory', coeContentCategories)

  console.log('\n' + '=' .repeat(50))
  console.log('✅ CoE Hub taxonomy seed complete!')
  console.log('\nNext: Open Sanity Studio to verify the taxonomy documents.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed:', error)
    process.exit(1)
  })
