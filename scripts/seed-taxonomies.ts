/**
 * Seed Script: Create Taxonomies (Content Types, Products, Teams, Topics)
 *
 * Run BEFORE seed-catalog.ts
 * Run with: npx tsx --env-file=.env.local scripts/seed-taxonomies.ts
 */

import { createClient } from '@sanity/client'

// Verify environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('Run with: npx tsx --env-file=.env.local scripts/seed-taxonomies.ts')
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

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

// Content Types
const contentTypes = [
  { name: 'Training', icon: '🎓', color: '#3B82F6', order: 1 },
  { name: 'Workshop', icon: '🛠️', color: '#3B82F6', order: 2 },
  { name: 'Webinar', icon: '📹', color: '#3B82F6', order: 3 },
  { name: 'Template', icon: '📄', color: '#8C69F0', order: 4 },
  { name: 'Deck', icon: '📊', color: '#8C69F0', order: 5 },
  { name: 'One Pager', icon: '📋', color: '#8C69F0', order: 6 },
  { name: 'Battle Card', icon: '⚔️', color: '#F97316', order: 7 },
  { name: 'Competitive', icon: '🎯', color: '#F97316', order: 8 },
]

// Products
const products = [
  { name: 'Sidekick', color: '#8C69F0', order: 1 },
  { name: 'Voice', color: '#3B82F6', order: 2 },
  { name: 'Classic', color: '#009B00', order: 3 },
]

// Teams
const teams = [
  { name: 'Sales', order: 1 },
  { name: 'Customer Success', order: 2 },
  { name: 'Onboarding', order: 3 },
  { name: 'Support', order: 4 },
  { name: 'Partner', order: 5 },
]

// Topics
const topics = [
  { name: 'AI', category: 'technology', order: 1 },
  { name: 'Product Training', category: 'learning', order: 2 },
  { name: 'Best Practices', category: 'methodology', order: 3 },
  { name: 'Templates', category: 'resources', order: 4 },
  { name: 'Competitive Intelligence', category: 'strategy', order: 5 },
  { name: 'Proof Points', category: 'strategy', order: 6 },
]

async function createOrUpdate(type: string, items: any[]) {
  console.log(`\n📝 Creating ${type}...`)

  for (const item of items) {
    try {
      const slug = slugify(item.name)

      // Check if it already exists
      const existing = await client.fetch(
        `*[_type == $type && slug.current == $slug][0]`,
        { type, slug }
      )

      if (existing) {
        console.log(`  ⏭️  ${item.name} (already exists)`)
        continue
      }

      // Create new document
      const doc = {
        _type: type,
        name: item.name,
        slug: { _type: 'slug', current: slug },
        ...item,
      }

      await client.create(doc)
      console.log(`  ✅ ${item.name}`)
    } catch (error: any) {
      console.error(`  ❌ ${item.name}: ${error.message}`)
    }
  }
}

async function seedTaxonomies() {
  console.log('🌱 Starting taxonomy seed...\n')

  await createOrUpdate('contentType', contentTypes)
  await createOrUpdate('product', products)
  await createOrUpdate('team', teams)
  await createOrUpdate('topic', topics)

  console.log('\n🎉 Taxonomy seed complete!')
  console.log('\n📍 Next step: Run catalog seed')
  console.log('   npx tsx scripts/seed-catalog.ts')
}

// Run the seed
seedTaxonomies()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error)
    process.exit(1)
  })
