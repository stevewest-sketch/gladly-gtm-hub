import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const query = `*[
  _type == "catalogEntry" &&
  status == "published" &&
  "content" in publishedTo
] {
  _id,
  title,
  "contentType": contentType->slug.current,
  publishedTo,
  publishDate
} | order(publishDate desc)`

async function checkData() {
  const results = await client.fetch(query)

  console.log(`\n📊 Found ${results.length} content hub entries:\n`)
  results.forEach((entry: any, index: number) => {
    console.log(`${index + 1}. ${entry.title}`)
    console.log(`   Type: ${entry.contentType || 'N/A'}`)
    console.log(`   Published To: ${entry.publishedTo?.join(', ') || 'N/A'}`)
    console.log(`   Date: ${entry.publishDate ? new Date(entry.publishDate).toLocaleDateString() : 'N/A'}`)
    console.log('')
  })
}

checkData()
