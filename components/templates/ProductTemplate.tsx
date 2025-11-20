'use client'

import { CatalogEntry, Product } from '@/lib/types/catalog'
import CatalogView from '../catalog/CatalogView'

interface ProductTemplateProps {
  product: Product
  allEntries?: CatalogEntry[]
}

export default function ProductTemplate({ product, allEntries = [] }: ProductTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            {product.logo && (
              <div className="w-20 h-20 bg-white rounded-xl p-3">
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                  Logo
                </div>
              </div>
            )}
            <div className="flex-1">
              <span className="text-sm text-gray-300 mb-2 block">Product</span>
              <h1 className="text-5xl font-bold mb-3">{product.name}</h1>
              {product.description && (
                <p className="text-xl text-gray-300">{product.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Capabilities */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8C69F0] to-[#7C59D0] rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                  {i}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Feature {i}</h3>
                <p className="text-gray-600">
                  Description of key capability and how it helps customers succeed.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="#"
              className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-[#8C69F0] transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-[#8C69F0] transition-colors">
                <svg className="w-5 h-5 text-[#8C69F0] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Setup Guide</div>
                <div className="text-sm text-gray-500">Get started</div>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-[#8C69F0] transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-[#8C69F0] transition-colors">
                <svg className="w-5 h-5 text-[#8C69F0] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">API Reference</div>
                <div className="text-sm text-gray-500">Developer docs</div>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-[#8C69F0] transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-[#8C69F0] transition-colors">
                <svg className="w-5 h-5 text-[#8C69F0] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">FAQ</div>
                <div className="text-sm text-gray-500">Common questions</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* All Product Resources - Universal Catalog */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              All {product.name} Resources
            </h2>
            <p className="text-lg text-gray-600">
              Training, templates, case studies, competitive intel, and more
            </p>
          </div>

          <CatalogView
            pageType="product"
            pageContext={{ productSlug: product.slug.current }}
            defaultFilters={{
              products: [product._id], // Implicit filter
            }}
            showFilters={true}
            filterOptions={[
              'contentType',
              'format',
              'topic',
              'team',
              'journeyStage',
              'date',
            ]}
            layout="grid"
            itemsPerPage={12}
            sortBy="priority"
            cardStyle="standard"
            showDuration={true}
            showPresenter={true}
            entries={allEntries}
          />
        </div>
      </div>
    </div>
  )
}
