/**
 * Test Script: Verify Sanity Query
 *
 * Run with: npx tsx --env-file=.env.local scripts/test-query.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function testQuery() {
  console.log('🔍 Testing Sanity query...\n')

  // Same query as Content Hub page
  const query = `{
    "entries": *[_type == "catalogEntry" && status == "published"] | order(publishDate desc) {
      _id,
      title,
      status,
      publishDate,
      featured,
      contentType->{
        name,
        slug
      }
    }
  }`

  try {
    const data = await client.fetch(query)

    console.log(`✅ Found ${data.entries?.length || 0} published catalog entries\n`)

    if (data.entries && data.entries.length > 0) {
      console.log('📋 Entries:\n')
      data.entries.forEach((entry: any, index: number) => {
        console.log(`${index + 1}. ${entry.title}`)
        console.log(`   ID: ${entry._id}`)
        console.log(`   Status: ${entry.status}`)
        console.log(`   Featured: ${entry.featured ? 'Yes' : 'No'}`)
        console.log(`   Type: ${entry.contentType?.name || 'N/A'}`)
        console.log(`   Date: ${new Date(entry.publishDate).toLocaleDateString()}`)
        console.log('')
      })
    } else {
      console.log('❌ No entries found!')
      console.log('\nTroubleshooting:')
      console.log('1. Check if entries exist in Sanity Studio')
      console.log('2. Verify status = "published" (not "draft")')
      console.log('3. Run seed script: npx tsx --env-file=.env.local scripts/seed-catalog.ts')
    }
  } catch (error: any) {
    console.error('❌ Query failed:', error.message)
  }
}

testQuery()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })
