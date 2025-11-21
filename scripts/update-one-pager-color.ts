/**
 * Update One-Pager content type color to blue
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function updateColor() {
  console.log('🎨 Updating one-pager color to blue...\n')

  // Find the one-pager content type
  const onePagerType = await client.fetch(
    `*[_type == "contentType" && slug.current == "one-pager"][0]{ _id, name, color }`
  )

  if (!onePagerType) {
    console.error('❌ one-pager content type not found!')
    return
  }

  console.log(`Found: ${onePagerType.name}`)
  console.log(`Current color: ${onePagerType.color}\n`)

  // Update to blue (#3B82F6)
  await client
    .patch(onePagerType._id)
    .set({ color: '#3B82F6' })
    .commit()

  console.log('✅ Updated one-pager color to #3B82F6 (blue)')
  console.log('   This matches the One-Pagers button color!')
}

updateColor()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error)
    process.exit(1)
  })
