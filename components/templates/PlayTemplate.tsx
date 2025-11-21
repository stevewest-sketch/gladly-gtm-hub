'use client'

import { CatalogEntry } from '@/lib/types/catalog'
import Breadcrumb from '../ui/Breadcrumb'

interface PlayTemplateProps {
  entry: CatalogEntry
}

export default function PlayTemplate({ entry }: PlayTemplateProps) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} currentPage={entry.title} />

      {/* Engaging Hero */}
      <div className="bg-gradient-to-br from-[#8C69F0] via-[#7C59D0] to-[#6B46C1] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
              {entry.contentType?.icon} {entry.contentType?.name}
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6">{entry.title}</h1>

          {entry.description && (
            <p className="text-2xl text-purple-100 leading-relaxed mb-8">
              {entry.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {entry.products?.map((product) => (
              <span
                key={product._id}
                className="px-3 py-1.5 bg-white/20 backdrop-blur rounded-full text-sm font-medium"
              >
                {product.name}
              </span>
            ))}
            {entry.topics?.map((topic) => (
              <span
                key={topic._id}
                className="px-3 py-1.5 border border-white/30 rounded-full text-sm"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* How to Use This */}
        {entry.howToUseContent?.sections && entry.howToUseContent.sections.length > 0 && (
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How to Use This</h2>

            {entry.howToUseContent.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border-l-4 border-[#8C69F0] overflow-hidden">
                <div className="p-6">
                  {/* Step Number */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#8C69F0] to-[#7C59D0] rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {section.heading}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {section.content}
                      </p>

                      {/* Examples */}
                      {section.examples && section.examples.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Examples
                          </h4>
                          <div className="grid gap-3">
                            {section.examples.map((example, i) => (
                              <div
                                key={i}
                                className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                  <p className="text-gray-700">{example}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Takeaways */}
        {entry.keyTakeaways && entry.keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-sm p-8 mb-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">✅ Key Takeaways</h2>
            <ul className="space-y-3">
              {entry.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg flex-1">{takeaway}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Resources */}
        {entry.mainContent?.additionalResources && entry.mainContent.additionalResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Resources</h2>
            <div className="grid gap-4">
              {entry.mainContent.additionalResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-[#8C69F0] hover:bg-purple-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-[#8C69F0] transition-colors">
                    <svg className="w-6 h-6 text-[#8C69F0] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-[#8C69F0] transition-colors">
                      {resource.title}
                    </div>
                    <div className="text-sm text-gray-500">{resource.type}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
