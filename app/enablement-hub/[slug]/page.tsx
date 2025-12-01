import { client } from '@/lib/sanity'
import PlayTemplate from '@/components/templates/PlayTemplate'
import { CatalogEntry } from '@/lib/types/catalog'

// GROQ query to fetch a single catalog entry by slug
const query = `*[_type == "catalogEntry" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  cardType,
  "contentType": contentType->{
    _id,
    name,
    slug,
    icon,
    color
  },
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
  "products": products[]->{
    _id,
    name,
    slug,
    color,
    description
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
  // NEW: Flexible page sections
  pageSections[] {
    _key,
    sectionType,
    title,
    description,
    collapsible,
    defaultExpanded,
    overviewCards[] { label, content },
    videoUrl,
    wistiaId,
    sessionMaterials { videoUrl, slidesUrl, transcriptUrl },
    takeaways,
    processLayout,
    processSteps[] { heading, content },
    processText,
    tips,
    faqs[] { question, answer },
    assetItems[] { icon, title, description, url },
    textContent,
    checklistColumns[] { title, items }
  },
  // Legacy fields (for backwards compatibility)
  keyTakeaways,
  articleSections[] {
    _key,
    heading,
    content
  },
  actionItems,
  resourceLinks {
    videoUrl,
    slidesUrl,
    transcriptUrl,
    keyAssetUrl,
    keyAssetLabel
  },
  modules[] {
    _key,
    moduleNumber,
    title,
    description,
    videoUrl,
    wistiaId,
    duration
  },
  "keyAssets": keyAssets[]->{
    _id,
    title,
    slug,
    description,
    cardType,
    externalUrl,
    "contentType": contentType->{
      name,
      icon,
      color
    },
    format,
    thumbnailImage
  },
  "relatedContent": relatedContent[]->{
    _id,
    title,
    slug,
    description,
    cardType,
    pageTemplate,
    duration,
    presenter,
    publishDate,
    "contentType": contentType->{
      name,
      icon,
      color
    }
  },
  readingTime,
  contentBlocks[] {
    _key,
    blockType,
    title,
    content,
    steps[] {
      stepTitle,
      stepDescription,
      stepImage
    },
    faqs[] {
      question,
      answer
    },
    collapsible
  },
  featured,
  priority,
  status,
  "competitor": competitor->{
    _id,
    name,
    slug
  },
  battleCardFile,
  quarterlyUpdates
}`

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function LearnDetailPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch the entry from Sanity
  const entry: CatalogEntry = await client.fetch(query, { slug })

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-6">
            The requested enablement content could not be found.
          </p>
          <a
            href="/enablement-hub"
            className="inline-block px-6 py-3 bg-[#009B00] text-white font-semibold rounded-lg hover:bg-[#008000] transition-colors"
          >
            Back to Enablement Hub
          </a>
        </div>
      </div>
    )
  }

  // Use unified template with flexible page sections
  return <PlayTemplate entry={entry} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = (await params)
  const entry: CatalogEntry = await client.fetch(query, { slug })

  if (!entry) {
    return {
      title: 'Content Not Found',
    }
  }

  return {
    title: `${entry.title} | Gladly Enablement Hub`,
    description: entry.description || `View ${entry.title} - ${entry.contentType?.name || 'Enablement'}`,
  }
}

// Generate static params for build-time rendering
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(`*[_type == "catalogEntry" && defined(slug.current) && "enablement" in publishedTo].slug.current`)

  return slugs.map((slug) => ({
    slug,
  }))
}
