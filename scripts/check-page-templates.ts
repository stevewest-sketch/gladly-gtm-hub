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
  title,
  "contentType": contentType->slug.current,
  pageTemplate,
  publishedTo
}`

async function checkTemplates() {
  const results = await client.fetch(query)

  console.log('\n📋 Page Templates for Content Hub entries:\n')

  const byTemplate: any = {}
  results.forEach((entry: any) => {
    const template = entry.pageTemplate || 'NULL'
    byTemplate[template] = byTemplate[template] || []
    byTemplate[template].push(`${entry.title} (${entry.contentType})`)
  })

  Object.entries(byTemplate).forEach(([template, entries]: [string, any]) => {
    console.log(`\n${template}: ${entries.length} entries`)
    entries.forEach((entry: string) => {
      console.log(`  - ${entry}`)
    })
  })
}

checkTemplates()
