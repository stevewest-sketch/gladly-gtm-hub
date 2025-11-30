'use client'

import { CatalogEntry } from '@/lib/types/catalog'
import ContentBlockRenderer from './ContentBlockRenderer'
import Breadcrumb from '../ui/Breadcrumb'
import ReactMarkdown from 'react-markdown'

// Helper function to convert Google Drive URL to embeddable format
function convertGoogleDriveUrl(url: string): string {
  // Handle different Google Drive URL formats
  // Format 1: https://drive.google.com/file/d/FILE_ID/view
  // Format 2: https://drive.google.com/open?id=FILE_ID
  let fileId = ''

  if (url.includes('/file/d/')) {
    const match = url.match(/\/file\/d\/([^/]+)/)
    if (match) fileId = match[1]
  } else if (url.includes('id=')) {
    const match = url.match(/id=([^&]+)/)
    if (match) fileId = match[1]
  }

  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`
  }
  return url
}

// Helper function to convert Wistia URL to embeddable format
function convertWistiaUrl(url: string): string {
  // Extract video ID from various Wistia URL formats
  const match = url.match(/wistia\.com\/(?:medias|embed)\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://fast.wistia.net/embed/iframe/${match[1]}?videoFoam=true`
  }
  return url
}

// Helper function to convert YouTube URL to embeddable format
function convertYouTubeUrl(url: string): string {
  let videoId = ''

  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?]+)/)
    if (match) videoId = match[1]
  } else if (url.includes('youtube.com')) {
    const match = url.match(/[?&]v=([^&]+)/)
    if (match) videoId = match[1]
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  return url
}

// Helper function to convert Loom URL to embeddable format
function convertLoomUrl(url: string): string {
  // Extract video ID from Loom URL
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://www.loom.com/embed/${match[1]}`
  }
  return url
}

interface TrainingSessionTemplateProps {
  entry: CatalogEntry
}

export default function TrainingSessionTemplate({ entry }: TrainingSessionTemplateProps) {
  const formatBadgeColor = entry.format === 'live-replay' ? 'bg-blue-500' : 'bg-purple-500'

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

      {/* Header Banner - Matching Hub Style */}
      <div className="relative bg-gradient-to-br from-[#009B00] via-[#008000] to-[#006B00] text-white overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Accent shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          {/* Title Row with Icon */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📖</span>
            <h1 className="text-[32px] leading-[38px] tracking-[-0.02em] font-bold">{entry.title}</h1>
          </div>

          {/* Description */}
          {entry.description && (
            <p className="text-[17px] leading-[28px] text-green-50 max-w-3xl mb-6">{entry.description}</p>
          )}

          {/* Metadata Pills Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Format Badge */}
            <span className={`${formatBadgeColor} text-white px-3 py-1.5 rounded-full text-sm font-medium`}>
              {entry.format === 'live-replay' ? '🎥 Live Replay' : '📚 On-Demand'}
            </span>

            {/* Duration */}
            {entry.duration && (
              <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {entry.duration}
              </span>
            )}

            {/* Date */}
            {entry.publishDate && (
              <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(entry.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}

            {/* Presenter */}
            {entry.presenter && (
              <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {entry.presenter}
              </span>
            )}

            {/* Difficulty */}
            {entry.difficulty && (
              <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                {entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)}
              </span>
            )}

            {/* Product Tags */}
            {entry.products?.map((product) => (
              <span
                key={product._id}
                className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: `${product.color || '#8C69F0'}` }}
              >
                {product.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Key Assets - Featured at Top (Full Width) */}
        {entry.keyAssets && entry.keyAssets.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Key Assets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entry.keyAssets.map((asset: any) => {
                const assetUrl = asset.externalUrl || `/content/${asset.slug?.current}`;
                const contentTypeIcon = asset.contentType?.icon || '📄';
                const contentTypeColor = asset.contentType?.color || '#8C69F0';

                return (
                  <a
                    key={asset._id}
                    href={assetUrl}
                    target={asset.externalUrl ? '_blank' : undefined}
                    rel={asset.externalUrl ? 'noopener noreferrer' : undefined}
                    className="group"
                  >
                    <div className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 p-5 transition-all hover:shadow-lg h-full flex flex-col">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ backgroundColor: `${contentTypeColor}15` }}
                        >
                          {contentTypeIcon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {asset.title}
                            </h3>
                            {asset.externalUrl && (
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </div>
                          {asset.contentType?.name && (
                            <span
                              className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${contentTypeColor}15`,
                                color: contentTypeColor
                              }}
                            >
                              {asset.contentType.name}
                            </span>
                          )}
                        </div>
                      </div>
                      {asset.description && (
                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{asset.description}</p>
                      )}
                      <div className="mt-auto pt-4">
                        <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700 flex items-center gap-1">
                          {asset.externalUrl ? 'Open Resource' : 'View Details'}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Modules Section */}
            {entry.modules && entry.modules.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">🎬</span> Training Modules
                </h2>
                <div className="space-y-4">
                  {entry.modules.map((module: any, index: number) => (
                    <details
                      key={module._key || index}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group"
                      open={index === 0}
                    >
                      <summary className="cursor-pointer p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            {module.moduleNumber}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Module {module.moduleNumber}: {module.title}
                            </h3>
                            {module.duration && (
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {module.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="border-t border-gray-100">
                        {module.description && (
                          <p className="text-gray-600 px-5 pt-4 pb-2">{module.description}</p>
                        )}
                        <div className="aspect-video">
                          {module.wistiaId ? (
                            <iframe
                              src={`https://fast.wistia.net/embed/iframe/${module.wistiaId}?videoFoam=true`}
                              title={`Module ${module.moduleNumber}: ${module.title}`}
                              allow="autoplay; fullscreen"
                              allowFullScreen
                              className="w-full h-full"
                              style={{ border: 'none' }}
                            />
                          ) : module.videoUrl?.includes('drive.google.com') ? (
                            <iframe
                              src={convertGoogleDriveUrl(module.videoUrl)}
                              title={`Module ${module.moduleNumber}: ${module.title}`}
                              allow="autoplay; fullscreen"
                              allowFullScreen
                              className="w-full h-full"
                              style={{ border: 'none' }}
                            />
                          ) : module.videoUrl?.includes('wistia.com') ? (
                            <iframe
                              src={convertWistiaUrl(module.videoUrl)}
                              title={`Module ${module.moduleNumber}: ${module.title}`}
                              allow="autoplay; fullscreen"
                              allowFullScreen
                              className="w-full h-full"
                              style={{ border: 'none' }}
                            />
                          ) : module.videoUrl?.includes('youtube.com') || module.videoUrl?.includes('youtu.be') ? (
                            <iframe
                              src={convertYouTubeUrl(module.videoUrl)}
                              title={`Module ${module.moduleNumber}: ${module.title}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                              style={{ border: 'none' }}
                            />
                          ) : module.videoUrl?.includes('loom.com') ? (
                            <iframe
                              src={convertLoomUrl(module.videoUrl)}
                              title={`Module ${module.moduleNumber}: ${module.title}`}
                              allow="autoplay; fullscreen"
                              allowFullScreen
                              className="w-full h-full"
                              style={{ border: 'none' }}
                            />
                          ) : module.videoUrl ? (
                            <div className="bg-gray-900 w-full h-full flex items-center justify-center">
                              <a
                                href={module.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-center hover:opacity-80 transition-opacity"
                              >
                                <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm opacity-75">Click to watch video</p>
                              </a>
                            </div>
                          ) : (
                            <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                              <p className="text-gray-500">No video available for this module</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Single Video Player - Wistia */}
                {entry.mainContent?.wistiaId && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <span className="font-medium text-gray-900">Session Recording</span>
                      {entry.duration && (
                        <span className="text-sm text-gray-500 ml-auto flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {entry.duration}
                        </span>
                      )}
                    </div>
                    <div className="aspect-video">
                      <iframe
                        src={`https://fast.wistia.net/embed/iframe/${entry.mainContent.wistiaId}?videoFoam=true`}
                        title="Wistia video player"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="w-full h-full"
                        style={{ border: 'none' }}
                      />
                    </div>
                  </div>
                )}

                {/* Single Video Player - From Resource Links (Google Drive or other) */}
                {entry.resourceLinks?.videoUrl && !entry.mainContent?.wistiaId && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <span className="font-medium text-gray-900">Session Recording</span>
                      {entry.duration && (
                        <span className="text-sm text-gray-500 ml-auto flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {entry.duration}
                        </span>
                      )}
                    </div>
                    <div className="aspect-video">
                      {entry.resourceLinks.videoUrl.includes('drive.google.com') ? (
                        <iframe
                          src={convertGoogleDriveUrl(entry.resourceLinks.videoUrl)}
                          title="Video player"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="w-full h-full"
                          style={{ border: 'none' }}
                        />
                      ) : entry.resourceLinks.videoUrl.includes('wistia.com') ? (
                        <iframe
                          src={convertWistiaUrl(entry.resourceLinks.videoUrl)}
                          title="Wistia video player"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="w-full h-full"
                          style={{ border: 'none' }}
                        />
                      ) : entry.resourceLinks.videoUrl.includes('youtube.com') || entry.resourceLinks.videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={convertYouTubeUrl(entry.resourceLinks.videoUrl)}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          style={{ border: 'none' }}
                        />
                      ) : entry.resourceLinks.videoUrl.includes('loom.com') ? (
                        <iframe
                          src={convertLoomUrl(entry.resourceLinks.videoUrl)}
                          title="Loom video player"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="w-full h-full"
                          style={{ border: 'none' }}
                        />
                      ) : (
                        <div className="bg-gray-900 w-full h-full flex items-center justify-center">
                          <a
                            href={entry.resourceLinks.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-center hover:opacity-80 transition-opacity"
                          >
                            <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm opacity-75">Click to watch video</p>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
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

            {/* Article Sections (for enablement articles) - Collapsible */}
            {entry.articleSections && entry.articleSections.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">📖 Content</h2>
                {entry.articleSections.map((section: any, index: number) => (
                  <details
                    key={section._key || index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 group"
                    open={index === 0}
                  >
                    <summary className="cursor-pointer p-5 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                        {section.heading}
                      </h3>
                      <svg className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                      <div className="text-gray-700 leading-relaxed pl-3 prose prose-sm max-w-none prose-headings:text-gray-900 prose-strong:text-gray-900 prose-ul:list-disc prose-ul:pl-4 prose-li:my-1">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            )}

            {/* Action Items */}
            {entry.actionItems && entry.actionItems.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Action Items</h2>
                <ul className="space-y-3">
                  {entry.actionItems.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 flex-1">{item}</p>
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

            {/* Additional Content Blocks */}
            {entry.contentBlocks && entry.contentBlocks.length > 0 && (
              <ContentBlockRenderer blocks={entry.contentBlocks} />
            )}

            {/* Related Sessions & Content */}
            {entry.relatedContent && entry.relatedContent.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📚</span> Related Sessions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entry.relatedContent.map((related: any) => {
                    const contentTypeColor = related.contentType?.color || '#009B00';
                    const contentTypeIcon = related.contentType?.icon || '📖';

                    return (
                      <a
                        key={related._id}
                        href={`/learn/${related.slug?.current}`}
                        className="group"
                      >
                        <div className="bg-white rounded-xl border border-gray-200 hover:border-green-300 p-4 transition-all hover:shadow-md h-full">
                          <div className="flex items-start gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                              style={{ backgroundColor: `${contentTypeColor}15` }}
                            >
                              {contentTypeIcon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                {related.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                                {related.duration && (
                                  <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {related.duration}
                                  </span>
                                )}
                                {related.presenter && (
                                  <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {related.presenter.split(',')[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resource Links */}
            {entry.resourceLinks && (entry.resourceLinks.videoUrl || entry.resourceLinks.slidesUrl || entry.resourceLinks.transcriptUrl || entry.resourceLinks.keyAssetUrl) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📎 Resources</h3>
                <div className="space-y-3">
                  {entry.resourceLinks.videoUrl && (
                    <a
                      href={entry.resourceLinks.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🎥</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Watch Recording</div>
                        <div className="text-sm text-gray-500">Video</div>
                      </div>
                    </a>
                  )}
                  {entry.resourceLinks.slidesUrl && (
                    <a
                      href={entry.resourceLinks.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Presentation Slides</div>
                        <div className="text-sm text-gray-500">Download</div>
                      </div>
                    </a>
                  )}
                  {entry.resourceLinks.transcriptUrl && (
                    <a
                      href={entry.resourceLinks.transcriptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📝</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Transcript</div>
                        <div className="text-sm text-gray-500">Document</div>
                      </div>
                    </a>
                  )}
                  {entry.resourceLinks.keyAssetUrl && (
                    <a
                      href={entry.resourceLinks.keyAssetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🎯</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{entry.resourceLinks.keyAssetLabel || 'Key Asset'}</div>
                        <div className="text-sm text-gray-500">Download</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

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
