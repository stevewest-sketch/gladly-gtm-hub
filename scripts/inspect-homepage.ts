import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function inspectHomepage() {
  try {
    console.log('🔍 Fetching homepage document...')

    const homepage = await client.fetch(
      `*[_type == "homepage"][0]`
    )

    console.log('\n📄 Full Homepage Document:')
    console.log(JSON.stringify(homepage, null, 2))

  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  }
}

inspectHomepage()
