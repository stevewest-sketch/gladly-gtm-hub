import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// This is the EXACT query from content-hub/page.tsx
const query = `{
  "entries": *[
    _type == "catalogEntry" &&
    status == "published" &&
    "content" in publishedTo &&
    contentType->slug.current != "training" &&
    pageTemplate != "training-session" &&
    pageTemplate != "micro-learning"
  ] | order(publishDate desc) {
    _id,
    title,
    "contentType": contentType->{
      name,
      slug
    },
    publishedTo,
    publishDate,
    pageTemplate
  }
}`

async function testQuery() {
  console.log('🔍 Testing Content Hub Query...\n')

  const data = await client.fetch(query)

  console.log(`📊 Query returned ${data.entries.length} entries:\n`)

  data.entries.forEach((entry: any, index: number) => {
    console.log(`${index + 1}. ${entry.title}`)
    console.log(`   Content Type: ${entry.contentType?.name || 'NULL'} (${entry.contentType?.slug?.current || 'NULL'})`)
    console.log(`   Page Template: ${entry.pageTemplate || 'NULL'}`)
    console.log(`   Published To: ${entry.publishedTo?.join(', ') || 'NULL'}`)
    console.log('')
  })

  // Group by content type
  const byType: any = {}
  data.entries.forEach((entry: any) => {
    const type = entry.contentType?.slug?.current || 'no-type'
    byType[type] = (byType[type] || 0) + 1
  })

  console.log('\n📈 Breakdown by Content Type:')
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`)
  })
}

testQuery()
