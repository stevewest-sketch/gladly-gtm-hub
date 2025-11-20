import { client } from '@/lib/sanity'
import COEHubClient from './COEHubClient'

// GROQ query to fetch hub page data
const query = `*[_type == "hubPage" && slug.current == "coe-hub"][0]{
  _id,
  title,
  hero,
  buttons[]{
    id,
    label,
    icon,
    color,
    catalogFilter,
    sections[]{
      _type,
      _key,
      ...,
      // For hubStatGridSection
      styleVariant,
      accentColor,
      stats[]{
        _key,
        value,
        label,
        icon,
        color
      },
      // For hubFeatureCardsSection
      cards[]{
        _key,
        icon,
        iconStyle,
        iconBadgeColor,
        title,
        description,
        meta,
        cta,
        link,
        tag,
        tagColor
      },
      tabs,
      // For hubProcessStepsSection
      steps[]{
        _key,
        icon,
        title,
        description,
        details
      },
      elevation,
      // For hubContentSection
      content,
      leftColumn,
      rightColumn,
      cta
    }
  },
  showCatalog,
  catalogTitle,
  seo
}`

export default async function COEHubPage() {
  // Fetch hub page data from Sanity
  const hubData = await client.fetch(query, {}, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })

  // If no data exists, show a fallback
  if (!hubData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">COE Hub Not Found</h1>
          <p className="text-gray-600 mb-6">
            The COE Hub hasn't been set up in Sanity yet.
          </p>
          <a
            href="/studio"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    )
  }

  // Pass data to client component for interactivity
  return <COEHubClient hubData={hubData} />
}

// Generate metadata for SEO
export async function generateMetadata() {
  const hubData = await client.fetch(query)

  return {
    title: hubData?.seo?.metaTitle || 'Center of Excellence Hub',
    description: hubData?.seo?.metaDescription || 'Access proven strategies and resources from the Gladly Center of Excellence',
  }
}
