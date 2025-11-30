import { client } from '@/lib/sanity'
import MicroLearningTemplate from '@/components/templates/MicroLearningTemplate'
import StandardArticleTemplate from '@/components/templates/StandardArticleTemplate'
import PlaybookTemplate from '@/components/templates/PlaybookTemplate'
import TrainingTemplate from '@/components/templates/TrainingTemplate'
import BattleCardTemplate from '@/components/templates/BattleCardTemplate'
import PlayTemplate from '@/components/templates/PlayTemplate'
import ProductTemplate from '@/components/templates/ProductTemplate'
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
            href="/learn"
            className="inline-block px-6 py-3 bg-[#009B00] text-white font-semibold rounded-lg hover:bg-[#008000] transition-colors"
          >
            Back to Enablement Hub
          </a>
        </div>
      </div>
    )
  }

  // Route to appropriate template based on pageTemplate
  switch (entry.pageTemplate) {
    case 'micro-learning':
      return <MicroLearningTemplate entry={entry} />

    case 'training-session':
      // Standard Article Template for session-focused content
      return <StandardArticleTemplate entry={entry} />

    case 'playbook':
      // Playbook Template for asset-focused content (like First Meeting Deck)
      return <PlaybookTemplate entry={entry} />

    case 'training':
      // Training Template for live replay sessions with positioning/assets
      return <TrainingTemplate entry={entry} />

    case 'battle-card':
      return <BattleCardTemplate entry={entry} />

    case 'play':
      return <PlayTemplate entry={entry} />

    case 'product':
      // For product template, we need to pass the product data
      const product = entry.products?.[0]
      if (!product) {
        // Fallback to standard article if no product
        return <StandardArticleTemplate entry={entry} />
      }
      // Fetch all entries for this product
      const allEntriesQuery = `*[_type == "catalogEntry" && references($productId)]{
        _id,
        title,
        slug,
        description,
        "contentType": contentType->{ name, icon, color },
        pageTemplate,
        publishDate,
        duration
      }`
      const allEntries = await client.fetch(allEntriesQuery, { productId: product._id })
      return <ProductTemplate product={product} allEntries={allEntries} />

    default:
      // Default to Standard Article template
      return <StandardArticleTemplate entry={entry} />
  }
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
