/**
 * Seed Script: Create Learning Paths
 *
 * This script creates 3 curated learning paths for the enablement hub.
 *
 * Prerequisites:
 * 1. Sanity project credentials in .env.local
 *
 * Usage:
 *   node scripts/seed-learning-paths.js
 */

const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Learning paths data
const LEARNING_PATHS = [
  {
    name: 'New Hire Onboarding',
    slug: 'new-hire-onboarding',
    description: 'Essential training for getting started at Gladly',
    icon: '🎓',
    color: 'bg-[#3B82F6]',
    order: 10,
  },
  {
    name: 'Product Mastery',
    slug: 'product-mastery',
    description: 'Deep-dive into Gladly products and features',
    icon: '🛠️',
    color: 'bg-[#8C69F0]',
    order: 20,
  },
  {
    name: 'Sales Excellence',
    slug: 'sales-excellence',
    description: 'Sales-focused training and best practices',
    icon: '💼',
    color: 'bg-[#F97316]',
    order: 30,
  },
]

// Helper: Create slug object
function createSlug(text) {
  return {
    _type: 'slug',
    current: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }
}

async function main() {
  console.log('🚀 Starting Learning Paths Seed Script')
  console.log('─'.repeat(60))

  try {
    const createdPaths = []

    console.log('\n📚 Creating learning paths...')

    for (const pathData of LEARNING_PATHS) {
      // Check if exists
      const existing = await client.fetch(
        `*[_type == "learningPath" && slug.current == $slug][0]`,
        { slug: pathData.slug }
      )

      if (existing) {
        console.log(`  ✓ Learning path "${pathData.name}" already exists`)
        createdPaths.push(existing)
      } else {
        const created = await client.create({
          _type: 'learningPath',
          name: pathData.name,
          slug: createSlug(pathData.slug),
          description: pathData.description,
          icon: pathData.icon,
          color: pathData.color,
          order: pathData.order,
        })
        console.log(`  ✓ Created learning path "${pathData.name}"`)
        createdPaths.push(created)
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('✨ Seed Script Complete!')
    console.log('='.repeat(60))
    console.log(`✅ Created/verified ${createdPaths.length} learning paths`)

    console.log('\n📋 Learning Paths:')
    createdPaths.forEach(path => {
      console.log(`  ${path.icon} ${path.name}`)
      console.log(`     Color: ${path.color}`)
      console.log(`     Order: ${path.order}`)
    })

    console.log('\n📝 Next Steps:')
    console.log('  1. Go to Sanity Studio (http://localhost:3000/studio)')
    console.log('  2. Edit catalog entries in the Taxonomies tab')
    console.log('  3. Tag enablements to learning paths')
    console.log('  4. Visit http://localhost:3000/enablement-hub to see them!')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

// Run seed script
main()
  .then(() => {
    console.log('\n✅ Seed script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seed script failed:', error)
    process.exit(1)
  })
