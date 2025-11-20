'use client'

import { useParams } from 'next/navigation'
import { mockCatalogEntries, mockProducts } from '@/lib/data/mockCatalogData'
import MicroLearningTemplate from '@/components/templates/MicroLearningTemplate'
import TrainingSessionTemplate from '@/components/templates/TrainingSessionTemplate'
import BattleCardTemplate from '@/components/templates/BattleCardTemplate'
import PlayTemplate from '@/components/templates/PlayTemplate'
import ProductTemplate from '@/components/templates/ProductTemplate'

export default function CatalogDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // Find the entry by slug
  const entry = mockCatalogEntries.find((e) => e.slug.current === slug)

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-6">
            The requested catalog entry could not be found.
          </p>
          <a
            href="/catalog-demo"
            className="inline-block px-6 py-3 bg-[#8C69F0] text-white font-semibold rounded-lg hover:bg-[#7C59D0] transition-colors"
          >
            Back to Catalog
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
      const product = entry.products?.[0] || mockProducts[0]
      return <ProductTemplate product={product} allEntries={mockCatalogEntries} />

    default:
      // Default to training session template
      return <TrainingSessionTemplate entry={entry} />
  }
}
