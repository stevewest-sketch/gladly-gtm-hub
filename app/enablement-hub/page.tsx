import { client } from '@/lib/sanity'
import EnablementHubClient from './EnablementHubClient'

// GROQ query to fetch ALL enablement articles
const query = `{
  "entries": *[_type == "enablementArticle"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    summary,
    category,
    contentType,
    audience,
    keyTakeaways,
    tags,
    readingTime,
    publishedDate,
    videoUrl,
    slidesUrl
  }
}`

export default async function EnablementHubPage() {
  // Fetch all enablement articles from Sanity
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
            No enablement articles found. Create your first enablement article in Sanity Studio.
          </p>
          <a
            href="/studio"
            className="inline-block bg-[#009B00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#008000] transition-all"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    )
  }

  // Pass Sanity data to client component
  return (
    <EnablementHubClient
      entries={data.entries}
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
