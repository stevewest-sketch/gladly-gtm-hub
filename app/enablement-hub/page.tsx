import { client } from '@/lib/sanity'
import EnablementHubClient from './EnablementHubClient'

// GROQ query to fetch catalog entries published to enablement hub only
const query = `{
  "entries": *[
    _type == "catalogEntry" &&
    status == "published" &&
    "enablement" in publishedTo
  ] | order(publishDate desc) {
    _id,
    title,
    slug,
    description,
    "contentType": contentType->{
      _id,
      name,
      slug,
      icon,
      color
    },
    pageTemplate,
    format,
    "audiences": audiences[]->{
      _id,
      name,
      slug
    },
    "learningPaths": learningPaths[]->{
      _id,
      name,
      slug,
      description,
      icon,
      color,
      order
    },
    enablementCategory,
    publishDate,
    duration,
    difficulty,
    presenter,
    thumbnailImage,
    externalUrl,
    mainContent {
      transcript,
      videoUrl,
      wistiaId,
      documentUrl,
      additionalResources[] {
        title,
        url,
        type
      }
    },
    keyTakeaways,
    featured,
    priority,
    status
  },
  "learningPaths": *[_type == "learningPath"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    color,
    order
  }
}`

export default async function EnablementHubPage() {
  // Fetch all enablement catalog entries from Sanity
  const data = await client.fetch(query, {}, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })

  // If no data, show message to create content in Sanity
  if (!data.entries || data.entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Enablement Hub</h1>
          <p className="text-gray-600 mb-6">
            No enablement content found. Create your first catalog entry in Sanity Studio and publish it to the Enablement Hub.
          </p>
          <a
            href="/studio"
            className="inline-block bg-[#009B00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#008000] transition-all"
          >
            Go to Sanity Studio
          </a>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
            <p className="text-sm text-blue-900 font-semibold mb-2">Quick Setup:</p>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Create audience taxonomy entries (Sales, CSM, SC, etc.)</li>
              <li>Run the migration script: <code className="bg-blue-100 px-1 rounded">node scripts/migrate-enablement-enhanced.js</code></li>
              <li>Or create new catalog entries and set "Published To: Enablement Hub"</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  // Pass Sanity data to client component
  return (
    <EnablementHubClient
      entries={data.entries}
      learningPaths={data.learningPaths || []}
    />
  )
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Enablement Hub | Gladly Revenue Enablement',
    description: 'Your learning center for product enablement, certifications, and skill development. Everything you need to master Gladly.',
  }
}
