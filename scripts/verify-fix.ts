import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// FIXED query - removed micro-learning filter
const query = `{
  "entries": *[
    _type == "catalogEntry" &&
    status == "published" &&
    "content" in publishedTo &&
    contentType->slug.current != "training" &&
    pageTemplate != "training-session"
  ] | order(publishDate desc) {
    title,
    "contentType": contentType->slug.current
  }
}`

async function verify() {
  const data = await client.fetch(query)

  console.log(`\n✅ Fixed query returns ${data.entries.length} entries!\n`)

  const byType: any = {}
  data.entries.forEach((entry: any) => {
    const type = entry.contentType || 'no-type'
    byType[type] = (byType[type] || 0) + 1
  })

  console.log('📊 Breakdown:')
  Object.entries(byType).sort((a, b) => (b[1] as number) - (a[1] as number)).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`)
  })
}

verify()
