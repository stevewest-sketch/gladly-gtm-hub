import { client } from '@/lib/sanity'
import MicroLearningTemplate from '@/components/templates/MicroLearningTemplate'
import TrainingSessionTemplate from '@/components/templates/TrainingSessionTemplate'
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
  keyTakeaways,
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
  params: {
    slug: string
  }
}

export default async function CatalogDetailPage({ params }: PageProps) {
  const { slug } = params

  // Fetch the entry from Sanity
  const entry: CatalogEntry = await client.fetch(query, { slug })

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-6">
            The requested catalog entry could not be found.
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

  // Route to appropriate template based on pageTemplate
  switch (entry.pageTemplate) {
    case 'micro-learning':
      return <MicroLearningTemplate entry={entry} />

    case 'training-session':
      return <TrainingSessionTemplate entry={entry} />

    case 'battle-card':
      return <BattleCardTemplate entry={entry} />

    case 'play':
      return <PlayTemplate entry={entry} />

    case 'product':
      // For product template, we need to pass the product data
      const product = entry.products?.[0]
      if (!product) {
        // Fallback to training session if no product
        return <TrainingSessionTemplate entry={entry} />
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
      // Default to training session template
      return <TrainingSessionTemplate entry={entry} />
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params
  const entry: CatalogEntry = await client.fetch(query, { slug })

  if (!entry) {
    return {
      title: 'Content Not Found',
    }
  }

  return {
    title: `${entry.title} | Gladly Enablement`,
    description: entry.description || `View ${entry.title} - ${entry.contentType?.name || 'Enablement'}`,
  }
}

// Generate static params for build-time rendering (optional - can remove for fully dynamic)
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(`*[_type == "catalogEntry" && defined(slug.current)].slug.current`)

  return slugs.map((slug) => ({
    slug,
  }))
}
