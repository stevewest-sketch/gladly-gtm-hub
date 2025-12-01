'use client'

import { CatalogEntry } from '@/lib/types/catalog'
import ContentBlockRenderer from './ContentBlockRenderer'
import PageSectionRenderer from '../sections/PageSectionRenderer'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Helper function to convert Google Drive URL to embeddable format
function convertGoogleDriveUrl(url: string): string {
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
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://www.loom.com/embed/${match[1]}`
  }
  return url
}

// Video embed component
function VideoEmbed({ url, wistiaId, title }: { url?: string; wistiaId?: string; title: string }) {
  if (wistiaId) {
    return (
      <iframe
        src={`https://fast.wistia.net/embed/iframe/${wistiaId}?videoFoam=true`}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (!url) {
    return (
      <div className="bg-gray-100 w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No video available</p>
      </div>
    )
  }

  if (url.includes('drive.google.com')) {
    return (
      <iframe
        src={convertGoogleDriveUrl(url)}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (url.includes('wistia.com')) {
    return (
      <iframe
        src={convertWistiaUrl(url)}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return (
      <iframe
        src={convertYouTubeUrl(url)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (url.includes('loom.com')) {
    return (
      <iframe
        src={convertLoomUrl(url)}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  return (
    <div className="bg-gray-900 w-full h-full flex items-center justify-center">
      <a
        href={url}
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
  )
}

interface StandardArticleTemplateProps {
  entry: CatalogEntry
}

export default function StandardArticleTemplate({ entry }: StandardArticleTemplateProps) {
  const [activeSection, setActiveSection] = useState('session')
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set([0]))

  // Determine what sections exist for quick nav
  const hasSession = entry.mainContent?.wistiaId || entry.mainContent?.videoUrl || entry.resourceLinks?.videoUrl || (entry.modules && entry.modules.length > 0)
  const hasTakeaways = entry.keyTakeaways && entry.keyTakeaways.length > 0
  const hasContent = entry.articleSections && entry.articleSections.length > 0
  const hasActions = entry.actionItems && entry.actionItems.length > 0

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['session', 'takeaways', 'content', 'actions']
      let current = sections[0]

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            current = sectionId
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-[#15803D] via-[#16A34A] to-[#22C55E] text-white py-8 px-6 lg:px-12 min-h-[180px] flex items-center">
        <div className="max-w-[1400px] mx-auto w-full">
          <h1 className="text-[28px] font-bold mb-3 flex items-center gap-3">
            <span className="text-3xl">📖</span>
            {entry.title}
          </h1>

          {entry.description && (
            <p className="text-[15px] text-white/90 max-w-[700px] leading-relaxed mb-6">
              {entry.description}
            </p>
          )}

          {/* Meta Tags */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Format Badge */}
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              entry.format === 'live-replay' ? 'bg-red-600' : 'bg-emerald-600'
            }`}>
              {entry.format === 'live-replay' ? '🎬 Live Replay' : '📚 On-Demand'}
            </span>

            {/* Duration */}
            {entry.duration && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/20">
                ⏱ {entry.duration}
              </span>
            )}

            {/* Date */}
            {entry.publishDate && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/20">
                📅 {new Date(entry.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}

            {/* Presenter */}
            {entry.presenter && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/20">
                👤 {entry.presenter}
              </span>
            )}

            {/* Difficulty */}
            {entry.difficulty && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/20">
                📊 {entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)}
              </span>
            )}

            {/* Product Tags */}
            {entry.products?.map((product) => (
              <span
                key={product._id}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: product?.color || '#F97316' }}
              >
                {product?.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Sticky Quick Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#E8EBF2] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3">
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7]">
              Jump to:
            </span>
            <div className="flex gap-4">
              {hasSession && (
                <button
                  onClick={() => scrollToSection('session')}
                  className={`text-[13px] font-medium py-2 border-b-2 transition-colors ${
                    activeSection === 'session'
                      ? 'text-[#16A34A] border-[#16A34A]'
                      : 'text-[#5C6578] border-transparent hover:text-[#16A34A] hover:border-[#16A34A]'
                  }`}
                >
                  Session Recording
                </button>
              )}
              {hasTakeaways && (
                <button
                  onClick={() => scrollToSection('takeaways')}
                  className={`text-[13px] font-medium py-2 border-b-2 transition-colors ${
                    activeSection === 'takeaways'
                      ? 'text-[#16A34A] border-[#16A34A]'
                      : 'text-[#5C6578] border-transparent hover:text-[#16A34A] hover:border-[#16A34A]'
                  }`}
                >
                  Key Takeaways
                </button>
              )}
              {hasContent && (
                <button
                  onClick={() => scrollToSection('content')}
                  className={`text-[13px] font-medium py-2 border-b-2 transition-colors ${
                    activeSection === 'content'
                      ? 'text-[#16A34A] border-[#16A34A]'
                      : 'text-[#5C6578] border-transparent hover:text-[#16A34A] hover:border-[#16A34A]'
                  }`}
                >
                  Content
                </button>
              )}
              {hasActions && (
                <button
                  onClick={() => scrollToSection('actions')}
                  className={`text-[13px] font-medium py-2 border-b-2 transition-colors ${
                    activeSection === 'actions'
                      ? 'text-[#16A34A] border-[#16A34A]'
                      : 'text-[#5C6578] border-transparent hover:text-[#16A34A] hover:border-[#16A34A]'
                  }`}
                >
                  Action Items
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Left Column - Main Content */}
          <main className="space-y-8">
            {/* Session Recording */}
            {hasSession && (
              <section id="session" className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
                {entry.modules && entry.modules.length > 0 ? (
                  // Multiple modules
                  <div>
                    <div className="px-6 py-4 border-b border-[#E8EBF2] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🎬</span>
                        <span className="font-semibold text-[15px] text-[#1A1D26]">Training Modules ({entry.modules.length})</span>
                      </div>
                    </div>
                    <div className="divide-y divide-[#E8EBF2]">
                      {entry.modules.map((module: any, index: number) => (
                        <details
                          key={module._key || index}
                          className="group"
                          open={index === 0}
                        >
                          <summary className="px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-[#F8F9FC] transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 bg-[#16A34A] text-white rounded-md flex items-center justify-center text-[13px] font-bold">
                                {module.moduleNumber}
                              </span>
                              <div>
                                <span className="font-semibold text-[15px] text-[#1A1D26]">
                                  Module {module.moduleNumber}: {module.title}
                                </span>
                                {module.duration && (
                                  <span className="ml-3 text-[13px] text-[#8B93A7]">
                                    {module.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-[#8B93A7] transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="border-t border-[#E8EBF2]">
                            {module.description && (
                              <p className="px-6 py-3 text-[14px] text-[#5C6578]">{module.description}</p>
                            )}
                            <div className="aspect-video bg-[#0D0D0D]">
                              <VideoEmbed
                                url={module.videoUrl}
                                wistiaId={module.wistiaId}
                                title={`Module ${module.moduleNumber}: ${module.title}`}
                              />
                            </div>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Single session
                  <>
                    <div className="px-6 py-4 border-b border-[#E8EBF2] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-[#16A34A] text-white rounded-md flex items-center justify-center text-[13px] font-bold">
                          1
                        </span>
                        <span className="font-semibold text-[15px] text-[#1A1D26]">Session Recording</span>
                      </div>
                      {entry.duration && (
                        <div className="flex items-center gap-1.5 text-[13px] text-[#8B93A7]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {entry.duration}
                        </div>
                      )}
                    </div>
                    <div className="aspect-video bg-[#0D0D0D] relative">
                      <VideoEmbed
                        url={entry.resourceLinks?.videoUrl || entry.mainContent?.videoUrl}
                        wistiaId={entry.mainContent?.wistiaId}
                        title={entry.title}
                      />
                      {entry.presenter && (
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-md text-[12px]">
                          {entry.presenter.split(',')[0]}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </section>
            )}

            {/* Key Takeaways */}
            {hasTakeaways && (
              <section id="takeaways" className="bg-white rounded-[14px] border border-[#E2E6EF] p-6">
                <h2 className="text-[18px] font-bold text-[#1A1D26] mb-4 flex items-center gap-2">
                  📝 Key Takeaways
                </h2>
                <div className="space-y-3">
                  {entry.keyTakeaways?.map((takeaway, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-[#DCFCE7] rounded-[10px]">
                      <div className="flex-shrink-0 w-5 h-5 bg-[#16A34A] rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[14px] text-[#1A1D26] leading-relaxed">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Content Accordions */}
            {hasContent && (
              <section id="content" className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
                <div className="p-6 pb-4 border-b border-[#E8EBF2]">
                  <h2 className="text-[18px] font-bold text-[#1A1D26] flex items-center gap-2">
                    📚 Content
                  </h2>
                </div>
                <div className="divide-y divide-[#E8EBF2]">
                  {entry.articleSections?.map((section: any, index: number) => (
                    <div key={section._key || index} className="group">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F8F9FC] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-1 h-6 bg-[#16A34A] rounded-full" />
                          <span className="font-semibold text-[15px] text-[#1A1D26]">{section.heading}</span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-[#8B93A7] transition-transform ${openAccordions.has(index) ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openAccordions.has(index) && (
                        <div className="px-6 pb-6 pl-10">
                          <div className="text-[14px] text-[#5C6578] leading-relaxed prose prose-sm max-w-none prose-headings:text-[#1A1D26] prose-strong:text-[#1A1D26] prose-ul:list-disc prose-ul:pl-4 prose-li:my-1">
                            <ReactMarkdown>{section.content}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Action Items */}
            {hasActions && (
              <section id="actions" className="bg-white rounded-[14px] border border-[#E2E6EF] p-6">
                <h2 className="text-[18px] font-bold text-[#1A1D26] mb-4 flex items-center gap-2">
                  ✅ Action Items
                </h2>
                <div className="space-y-3">
                  {entry.actionItems?.map((item: string, index: number) => (
                    <div key={index} className="flex gap-3 p-3 bg-[#F8F9FC] rounded-[10px]">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
                        {index + 1}
                      </span>
                      <span className="text-[14px] text-[#1A1D26] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Transcript (collapsible) */}
            {entry.mainContent?.transcript && (
              <details className="bg-white rounded-[14px] border border-[#E2E6EF] p-6 group">
                <summary className="cursor-pointer text-[18px] font-bold text-[#1A1D26] flex items-center justify-between">
                  <span className="flex items-center gap-2">📄 Full Transcript</span>
                  <svg className="w-5 h-5 text-[#8B93A7] transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 pt-4 border-t border-[#E8EBF2]">
                  <p className="text-[14px] text-[#5C6578] whitespace-pre-wrap leading-relaxed">{entry.mainContent.transcript}</p>
                </div>
              </details>
            )}

            {/* Additional Content Blocks */}
            {entry.contentBlocks && entry.contentBlocks.length > 0 && (
              <ContentBlockRenderer blocks={entry.contentBlocks} />
            )}

            {/* Flexible Page Sections (new system) */}
            {entry.pageSections && entry.pageSections.length > 0 && (
              <PageSectionRenderer sections={entry.pageSections} excludeTypes={[]} />
            )}

            {/* Related Sessions */}
            {entry.relatedContent && entry.relatedContent.length > 0 && (
              <section className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
                <div className="p-6 pb-4 border-b border-[#E8EBF2]">
                  <h2 className="text-[18px] font-bold text-[#1A1D26] flex items-center gap-2">
                    📚 Related Sessions
                  </h2>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entry.relatedContent.map((related: any) => (
                    <Link
                      key={related._id}
                      href={`/learn/${related.slug?.current}`}
                      className="group p-4 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-black/5 text-[#8B93A7]">
                          {related.contentType?.name || 'Training'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[13px] text-[#1A1D26] mb-1 group-hover:text-[#16A34A] transition-colors">
                        {related.title}
                      </h3>
                      <div className="text-[11px] text-[#8B93A7]">
                        {related.duration && <span>{related.duration}</span>}
                        {related.duration && related.presenter && <span> • </span>}
                        {related.presenter && <span>{related.presenter.split(',')[0]}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Resources */}
            {(entry.resourceLinks?.videoUrl || entry.resourceLinks?.slidesUrl || entry.resourceLinks?.transcriptUrl) && (
              <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E8EBF2]">
                  <h3 className="font-semibold text-[14px] text-[#1A1D26] flex items-center gap-2">
                    🏷️ Resources
                  </h3>
                </div>
                <div className="p-3 space-y-1">
                  {entry.resourceLinks?.videoUrl && (
                    <a
                      href={entry.resourceLinks.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#FEE2E2] rounded-md flex items-center justify-center text-xl">
                        🎬
                      </div>
                      <div>
                        <div className="font-semibold text-[14px] text-[#1A1D26]">Watch Recording</div>
                        <div className="text-[12px] text-[#8B93A7]">Video</div>
                      </div>
                    </a>
                  )}
                  {entry.resourceLinks?.slidesUrl && (
                    <a
                      href={entry.resourceLinks.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#FEF3C7] rounded-md flex items-center justify-center text-xl">
                        📊
                      </div>
                      <div>
                        <div className="font-semibold text-[14px] text-[#1A1D26]">Presentation Slides</div>
                        <div className="text-[12px] text-[#8B93A7]">Download</div>
                      </div>
                    </a>
                  )}
                  {entry.resourceLinks?.transcriptUrl && (
                    <a
                      href={entry.resourceLinks.transcriptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#E0E7FF] rounded-md flex items-center justify-center text-xl">
                        📄
                      </div>
                      <div>
                        <div className="font-semibold text-[14px] text-[#1A1D26]">Transcript</div>
                        <div className="text-[12px] text-[#8B93A7]">Document</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Key Assets */}
            {entry.keyAssets && entry.keyAssets.length > 0 && (
              <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E8EBF2]">
                  <h3 className="font-semibold text-[14px] text-[#1A1D26] flex items-center gap-2">
                    📎 Key Assets
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  {entry.keyAssets.map((asset: any) => {
                    const assetUrl = asset.externalUrl || `/content/${asset.slug?.current}`
                    return (
                      <a
                        key={asset._id}
                        href={assetUrl}
                        target={asset.externalUrl ? '_blank' : undefined}
                        rel={asset.externalUrl ? 'noopener noreferrer' : undefined}
                        className="block p-3 border border-[#E8EBF2] rounded-[10px] hover:border-[#16A34A] hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-9 h-9 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-[#8B93A7]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                          <div className="font-semibold text-[14px] text-[#1A1D26] leading-tight">
                            {asset.title}
                            {asset.externalUrl && (
                              <svg className="inline-block w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            )}
                          </div>
                        </div>
                        {asset.description && (
                          <p className="text-[12px] text-[#5C6578] leading-relaxed mb-2 line-clamp-2">
                            {asset.description}
                          </p>
                        )}
                        <span className="text-[12px] font-semibold text-[#16A34A]">
                          Open Resource →
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Recommended Enablement */}
            {entry.relatedContent && entry.relatedContent.length > 0 && (
              <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E8EBF2]">
                  <h3 className="font-semibold text-[14px] text-[#1A1D26] flex items-center gap-2">
                    🎓 Recommended
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  {entry.relatedContent.slice(0, 3).map((related: any) => (
                    <Link
                      key={related._id}
                      href={`/learn/${related.slug?.current}`}
                      className="block p-3 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {related.contentType?.name && (
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${related.contentType.color}15` || '#F3E8FF',
                              color: related.contentType.color || '#8C69F0'
                            }}
                          >
                            {related.contentType.name}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-[13px] text-[#1A1D26] leading-tight mb-1">
                        {related.title}
                      </h4>
                      <div className="text-[11px] text-[#8B93A7]">
                        {related.duration && <span>{related.duration}</span>}
                        {related.pageTemplate && <span> • {related.pageTemplate === 'training-session' ? 'On Demand' : 'Training'}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Resources */}
            {entry.mainContent?.additionalResources && entry.mainContent.additionalResources.length > 0 && (
              <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E8EBF2]">
                  <h3 className="font-semibold text-[14px] text-[#1A1D26] flex items-center gap-2">
                    🔗 Additional Resources
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  {entry.mainContent.additionalResources.map((resource: any, index: number) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border border-[#E8EBF2] rounded-[10px] hover:border-[#16A34A] transition-colors"
                    >
                      <div className="font-semibold text-[14px] text-[#1A1D26]">{resource.title}</div>
                      <div className="text-[12px] text-[#8B93A7]">{resource.type}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
