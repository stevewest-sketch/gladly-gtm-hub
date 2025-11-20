'use client'

import CatalogView from '../catalog/CatalogView'
import type { CatalogViewProps } from '@/lib/types/catalog'

interface UniversalCatalogSectionProps extends CatalogViewProps {
  title: string
  description?: string
}

export default function UniversalCatalogSection({
  title,
  description,
  ...catalogProps
}: UniversalCatalogSectionProps) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <CatalogView {...catalogProps} />
      </div>
    </div>
  )
}
