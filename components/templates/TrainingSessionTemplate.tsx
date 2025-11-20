'use client'

import { CatalogEntry } from '@/lib/types/catalog'

interface TrainingSessionTemplateProps {
  entry: CatalogEntry
}

export default function TrainingSessionTemplate({ entry }: TrainingSessionTemplateProps) {
  const formatBadgeColor = entry.format === 'live-replay' ? 'bg-blue-500' : 'bg-purple-500'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`${formatBadgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {entry.format === 'live-replay' ? '🎥 Live Replay' : '📚 E-Learning'}
            </span>
            {entry.difficulty && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{entry.title}</h1>

          {entry.description && (
            <p className="text-xl text-gray-600 mb-6">{entry.description}</p>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            {entry.publishDate && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(entry.publishDate).toLocaleDateString()}</span>
              </div>
            )}
            {entry.duration && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{entry.duration} minutes</span>
              </div>
            )}
            {entry.presenter && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{entry.presenter}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {entry.products?.map((product) => (
              <span
                key={product._id}
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: product.color || '#8C69F0' }}
              >
                {product.name}
              </span>
            ))}
            {entry.teams?.map((team) => (
              <span
                key={team._id}
                className="px-3 py-1 rounded-full text-sm border border-gray-300 text-gray-700"
              >
                {team.name}
              </span>
            ))}
            {entry.topics?.map((topic) => (
              <span
                key={topic._id}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {entry.mainContent?.wistiaId && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm opacity-75">Wistia Video: {entry.mainContent.wistiaId}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {entry.keyTakeaways && entry.keyTakeaways.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Key Takeaways</h2>
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

            {/* Transcript */}
            {entry.mainContent?.transcript && (
              <details className="bg-white rounded-lg shadow-sm p-6 group">
                <summary className="cursor-pointer text-xl font-bold text-gray-900 flex items-center justify-between">
                  <span>📄 Full Transcript</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{entry.mainContent.transcript}</p>
                </div>
              </details>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Materials */}
            {entry.mainContent?.slidesDeck && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📎 Related Materials</h3>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#8C69F0] hover:bg-purple-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-[#8C69F0] transition-colors">
                    <svg className="w-6 h-6 text-[#8C69F0] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Slides</div>
                    <div className="text-sm text-gray-500">Download presentation</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            )}

            {/* Additional Resources */}
            {entry.mainContent?.additionalResources && entry.mainContent.additionalResources.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 Additional Resources</h3>
                <div className="space-y-2">
                  {entry.mainContent.additionalResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border border-gray-200 rounded-lg hover:border-[#8C69F0] hover:bg-purple-50 transition-all"
                    >
                      <div className="font-medium text-gray-900">{resource.title}</div>
                      <div className="text-sm text-gray-500">{resource.type}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
