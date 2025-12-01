'use client'

import { CatalogEntry } from '@/lib/types/catalog'
import Image from 'next/image'
import Breadcrumb from '../ui/Breadcrumb'
import PageSectionRenderer from '../sections/PageSectionRenderer'

interface MicroLearningTemplateProps {
  entry: CatalogEntry
}

export default function MicroLearningTemplate({ entry }: MicroLearningTemplateProps) {
  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Enablement Hub', href: '/enablement-hub' },
  ]

  // Add learning path if available
  if (entry.learningPaths && entry.learningPaths.length > 0) {
    const primaryPath = entry.learningPaths[0]
    breadcrumbItems.push({
      label: primaryPath.name,
      href: `/enablement-hub?path=${primaryPath.slug.current}`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} currentPage={entry.title} />

      {/* Hero Section - Compact */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#8C69F0] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-500 rounded-full text-xs font-medium">
              Quick Update
            </span>
            {entry.duration && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs">
                ⏱️ {entry.duration} min read
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{entry.title}</h1>

          {entry.description && (
            <p className="text-xl text-blue-100">{entry.description}</p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 mt-6 text-sm text-blue-100">
            {entry.publishDate && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(entry.publishDate).toLocaleDateString()}</span>
              </div>
            )}
            {entry.presenter && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{entry.presenter}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* What You Need to Know - Highlighted */}
        {entry.keyTakeaways && entry.keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              What You Need to Know
            </h2>
            <ul className="space-y-3">
              {entry.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 flex-1">{takeaway}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Video Section */}
        {entry.mainContent?.wistiaId && (
          <div className="mb-8">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">Wistia Video: {entry.mainContent.wistiaId}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        {entry.mainContent?.documentUrl && (
          <div className="text-center py-8">
            <a
              href={entry.mainContent.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8C69F0] text-white font-semibold rounded-lg hover:bg-[#7C59D0] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resource
            </a>
          </div>
        )}

        {/* Flexible Page Sections */}
        {entry.pageSections && entry.pageSections.length > 0 && (
          <PageSectionRenderer sections={entry.pageSections} excludeTypes={[]} />
        )}

        {/* Tags */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {entry.products?.map((product) => (
              <span
                key={product._id}
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: product.color || '#8C69F0' }}
              >
                {product.name}
              </span>
            ))}
            {entry.topics?.map((topic) => (
              <span
                key={topic._id}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
