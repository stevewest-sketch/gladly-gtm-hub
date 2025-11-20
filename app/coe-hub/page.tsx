import { client } from '@/lib/sanity'
import COEHubClient from './COEHubClient'

// GROQ query to fetch hub page data AND catalog entries
const query = `{
  "hubData": *[_type == "hubPage" && slug.current == "coe-hub"][0]{
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
  },
  "catalogEntries": *[
    _type == "catalogEntry"
    && status == "published"
    && defined(coeCategory)
    && count(coeCategory) > 0
  ] | order(publishDate desc) {
    _id,
    title,
    description,
    slug,
    contentType->{
      _id,
      name,
      slug,
      icon,
      color
    },
    format,
    publishDate,
    duration,
    presenter,
    thumbnailImage{
      asset->{
        _id,
        url
      }
    },
    externalUrl,
    featured,
    priority,
    coeCategory,
    products[]->{
      _id,
      name,
      slug,
      color
    },
    teams[]->{
      _id,
      name,
      slug
    },
    topics[]->{
      _id,
      name,
      slug
    }
  },
  "products": *[_type == "product"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    color
  },
  "teams": *[_type == "team"] | order(order asc, name asc) {
    _id,
    name,
    slug
  },
  "topics": *[_type == "topic"] | order(order asc, name asc) {
    _id,
    name,
    slug
  }
}`

export default async function COEHubPage() {
  // Fetch hub page data and catalog entries from Sanity
  const data = await client.fetch(query, {}, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })

  // If no data exists, show a fallback
  if (!data.hubData) {
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
  return (
    <COEHubClient
      hubData={data.hubData}
      catalogEntries={data.catalogEntries || []}
      availableProducts={data.products || []}
      availableTeams={data.teams || []}
      availableTopics={data.topics || []}
    />
  )
}

// Generate metadata for SEO
export async function generateMetadata() {
  const data = await client.fetch(query)

  return {
    title: data.hubData?.seo?.metaTitle || 'Center of Excellence Hub',
    description: data.hubData?.seo?.metaDescription || 'Access proven strategies and resources from the Gladly Center of Excellence',
  }
}
