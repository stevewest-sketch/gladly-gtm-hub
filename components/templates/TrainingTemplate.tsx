'use client'

import { CatalogEntry } from '@/lib/types/catalog'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import PageSectionRenderer from '@/components/sections/PageSectionRenderer'

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
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] w-full h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:bg-white/30 transition-all hover:scale-105">
          <span className="text-white text-2xl ml-1">▶</span>
        </div>
        <span className="text-white/70 text-[13px]">Click to watch</span>
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

  // Fallback for external video links
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] w-full h-full flex flex-col items-center justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:bg-white/30 transition-all hover:scale-105"
      >
        <span className="text-white text-2xl ml-1">▶</span>
      </a>
      <span className="text-white/70 text-[13px]">Click to watch</span>
    </div>
  )
}

// Content section component
function ContentSection({
  id,
  title,
  children,
  collapsible = false,
  defaultExpanded = true
}: {
  id: string
  title: string
  children: React.ReactNode
  collapsible?: boolean
  defaultExpanded?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <section id={id} className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
      <div
        className={`px-6 py-4 border-b border-[#E8EBF2] flex items-center justify-between ${
          collapsible ? 'cursor-pointer hover:bg-[#FAFBFC]' : ''
        } transition-colors select-none`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <h2 className="font-semibold text-[16px] text-[#1A1D26]">{title}</h2>
        {collapsible && (
          <div className={`text-[#8B93A7] transition-transform ${isExpanded ? '' : '-rotate-90'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="p-6">
          {children}
        </div>
      )}
    </section>
  )
}

interface TrainingTemplateProps {
  entry: CatalogEntry
}

export default function TrainingTemplate({ entry }: TrainingTemplateProps) {
  const [activeSection, setActiveSection] = useState('overview')

  // Extract overview fields from contentBlocks
  const overviewBlock = entry.contentBlocks?.find((b: any) =>
    b.blockType === 'text' && (b.title?.toLowerCase().includes('overview') || b._key?.includes('overview'))
  )
  const overviewFields = overviewBlock?.content?.split('\n').filter((line: string) => line.trim()).reduce((acc: any, line: string) => {
    const match = line.match(/^(.+?)\s*—\s*(.+)$/)
    if (match) {
      acc[match[1].trim().toLowerCase().replace(/['']/g, '')] = match[2].trim()
    }
    return acc
  }, {}) || {}

  // Get key takeaways (cap at 7)
  const keyTakeaways = (entry.keyTakeaways || []).slice(0, 7)

  // Get process steps/guidelines from contentBlocks
  const processBlock = entry.contentBlocks?.find((b: any) =>
    b.blockType === 'text' &&
    (b.title?.toLowerCase().includes('process') ||
     b.title?.toLowerCase().includes('how') ||
     b.title?.toLowerCase().includes('guidelines') ||
     b.title?.toLowerCase().includes('system'))
  )

  // Get action items (cap at 5 - only the "do" items)
  const actionItems = (entry.actionItems || [])
    .filter(item => !item.toLowerCase().startsWith("don't") && !item.toLowerCase().startsWith("dont"))
    .slice(0, 5)

  // Get FAQs
  const faqs = entry.contentBlocks?.find((b: any) => b.blockType === 'faq')?.faqs || []

  // Get key assets (not session materials - those are slides/recording/transcript)
  const keyAssets = entry.keyAssets || []

  // Check what sections exist
  const hasSession = entry.resourceLinks?.videoUrl || entry.mainContent?.wistiaId
  const hasTakeaways = keyTakeaways.length > 0
  const hasProcess = processBlock || entry.articleSections?.length > 0
  const hasActions = actionItems.length > 0
  const hasFaqs = faqs.length > 0
  const hasKeyAssets = keyAssets.length > 0

  // Build nav sections - strict Training template IDs only
  const navSections: { id: string; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'session', label: 'Session Recording' },
    ...(hasTakeaways ? [{ id: 'takeaways', label: 'Key Takeaways' }] : []),
    ...(hasProcess ? [{ id: 'process', label: 'How We Do It' }] : []),
    ...(hasActions ? [{ id: 'actions', label: 'Action Items' }] : []),
    ...(hasFaqs ? [{ id: 'faqs', label: 'FAQs' }] : []),
  ]

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      let current = 'session'
      for (const section of navSections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 120) {
            current = section.id
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navSections])

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Get product tags
  const productTags = entry.products?.map(p => p.name) || []

  return (
    <div className="min-h-screen bg-[#F8F9FC]" data-template-type="training">
      {/* Breadcrumb */}
      <nav className="px-12 py-3 text-[13px] text-[#8B93A7] bg-white border-b border-[#E8EBF2]">
        <a href="/" className="text-[#5C6578] hover:text-[#16A34A]">Home</a>
        <span className="mx-2">&rsaquo;</span>
        <a href="/learn" className="text-[#5C6578] hover:text-[#16A34A]">Enablement Hub</a>
        <span className="mx-2">&rsaquo;</span>
        <a href="/learn?category=training" className="text-[#5C6578] hover:text-[#16A34A]">Training</a>
        <span className="mx-2">&rsaquo;</span>
        <strong className="text-[#1A1D26]">{entry.title}</strong>
      </nav>

      {/* Hero Header - Simplified */}
      <header className="bg-gradient-to-br from-[#15803D] via-[#16A34A] to-[#22C55E] text-white py-6 px-12">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-[28px] font-bold mb-2">{entry.title}</h1>

          {/* Meta Tags - Just type + date */}
          <div className="flex flex-wrap gap-2 items-center text-[13px]">
            <span className="px-2.5 py-1 rounded text-[11px] font-medium bg-white/25">
              Training
            </span>

            {entry.publishDate && (
              <span className="px-2.5 py-1 rounded text-[11px] font-medium bg-white/15">
                {new Date(entry.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-12 py-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">

        {/* Main Content */}
        <main className="space-y-4">

          {/* NEW: Use PageSectionRenderer if pageSections exist */}
          {entry.pageSections && entry.pageSections.length > 0 ? (
            <PageSectionRenderer sections={entry.pageSections} />
          ) : (
            <>
          {/* LEGACY: Quick Overview - Collapsible like Playbooks */}
          <ContentSection id="overview" title="Quick Overview" collapsible={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-[#F8F9FC] rounded-md">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-1">What It Is</div>
                <div className="text-[14px] text-[#1A1D26] leading-relaxed line-clamp-2">
                  {(overviewFields['what it is'] || entry.description || 'Training content for enablement.').slice(0, 100)}{(overviewFields['what it is'] || entry.description || '').length > 100 ? '...' : ''}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FC] rounded-md">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-1">Who It&apos;s For</div>
                <div className="text-[14px] text-[#1A1D26] leading-relaxed line-clamp-2">
                  {entry.audiences?.map(a => a.name).join(', ') || 'Sales, CS, and SE teams.'}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FC] rounded-md">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-1">When to Use</div>
                <div className="text-[14px] text-[#1A1D26] leading-relaxed line-clamp-2">
                  When this process or feature applies to your work.
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FC] rounded-md">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-1">Success Looks Like</div>
                <div className="text-[14px] text-[#1A1D26] leading-relaxed line-clamp-2">
                  Apply training content effectively in your role.
                </div>
              </div>
            </div>
          </ContentSection>

          {/* Session Recording - Hero Section */}
          <section id="session" className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EBF2]">
              <h2 className="font-semibold text-[16px] text-[#1A1D26]">Session Recording</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 items-start">
                {/* Video Container - Large Hero */}
                <div className="relative bg-[#1a1a1a] rounded-[10px] overflow-hidden aspect-video">
                  <VideoEmbed
                    url={entry.resourceLinks?.videoUrl}
                    wistiaId={entry.mainContent?.wistiaId}
                    title={entry.title}
                  />
                </div>

                {/* Session Materials */}
                <div className="space-y-2">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-2">Session Materials</div>

                  {entry.resourceLinks?.videoUrl && (
                    <a
                      href={entry.resourceLinks.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#F8F9FC] rounded-md hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="w-9 h-9 bg-[#FEE2E2] rounded-md flex items-center justify-center text-base flex-shrink-0">
                        🎬
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium text-[#1A1D26]">Watch Recording</div>
                        <div className="text-[12px] text-[#8B93A7]">Full session video</div>
                      </div>
                    </a>
                  )}

                  {entry.resourceLinks?.slidesUrl && (
                    <a
                      href={entry.resourceLinks.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#F8F9FC] rounded-md hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="w-9 h-9 bg-[#FEF3C7] rounded-md flex items-center justify-center text-base flex-shrink-0">
                        📊
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium text-[#1A1D26]">Presentation Slides</div>
                        <div className="text-[12px] text-[#8B93A7]">Download deck</div>
                      </div>
                    </a>
                  )}

                  {entry.resourceLinks?.transcriptUrl && (
                    <a
                      href={entry.resourceLinks.transcriptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#F8F9FC] rounded-md hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="w-9 h-9 bg-[#E0E7FF] rounded-md flex items-center justify-center text-base flex-shrink-0">
                        📄
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium text-[#1A1D26]">Transcript</div>
                        <div className="text-[12px] text-[#8B93A7]">Full session notes</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          {hasTakeaways && (
            <ContentSection id="takeaways" title="Key Takeaways" collapsible={false}>
              <p className="text-[13px] text-[#8B93A7] mb-4">What you need to remember from this session:</p>
              <div className="space-y-2">
                {keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-[#F8F9FC] rounded-md">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#DCFCE7] text-[#16A34A] rounded-full flex items-center justify-center text-[12px]">
                      ✓
                    </span>
                    <span className="text-[14px] text-[#5C6578] leading-relaxed">{takeaway}</span>
                  </div>
                ))}
              </div>
            </ContentSection>
          )}

          {/* How We Do It (Process/Guidelines) */}
          {hasProcess && (
            <ContentSection id="process" title="How We Do It" collapsible={false}>
              <p className="text-[13px] text-[#8B93A7] mb-4">Process and guidelines covered in this session:</p>

              {/* If we have articleSections, render as steps */}
              {entry.articleSections && entry.articleSections.length > 0 ? (
                <div className="space-y-3">
                  {entry.articleSections.slice(0, 5).map((section: any, index: number) => (
                    <div key={section._key || index} className="p-4 bg-[#F8F9FC] rounded-md border-l-[3px] border-[#16A34A]">
                      <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{section.heading}</div>
                      <div className="text-[13px] text-[#5C6578] leading-relaxed">{section.content}</div>
                    </div>
                  ))}
                </div>
              ) : processBlock ? (
                // Render process block content
                <div className="space-y-3">
                  {processBlock.content?.split('\n').filter((line: string) => line.trim()).slice(0, 5).map((line: string, i: number) => (
                    <p key={i} className="text-[14px] text-[#5C6578] leading-relaxed">
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                          p: ({ children }) => <>{children}</>
                        }}
                      >
                        {line}
                      </ReactMarkdown>
                    </p>
                  ))}
                </div>
              ) : null}
            </ContentSection>
          )}

          {/* Action Items */}
          {hasActions && (
            <ContentSection id="actions" title="Action Items" collapsible={false}>
              <p className="text-[13px] text-[#8B93A7] mb-4">What to do after watching:</p>
              <div className="space-y-2">
                {actionItems.map((item, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-[#F8F9FC] rounded-md">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
                      {index + 1}
                    </span>
                    <span className="text-[14px] text-[#5C6578] leading-relaxed">
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                          p: ({ children }) => <>{children}</>
                        }}
                      >
                        {item}
                      </ReactMarkdown>
                    </span>
                  </div>
                ))}
              </div>
            </ContentSection>
          )}

          {/* FAQs */}
          {hasFaqs && (
            <ContentSection id="faqs" title="FAQs" collapsible={false}>
              <div className="space-y-3">
                {faqs.slice(0, 5).map((faq: any, index: number) => (
                  <div key={index} className="pb-3 border-b border-[#E8EBF2] last:border-0 last:pb-0">
                    <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{faq.question}</div>
                    <div className="text-[14px] text-[#5C6578] leading-relaxed">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </ContentSection>
          )}
            </>
          )}

        </main>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)] lg:overflow-y-auto">

          {/* On This Page */}
          <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8EBF2]">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7]">On This Page</span>
            </div>
            <nav className="p-2">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                      : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Key Assets - Tools and content (not session materials) */}
          {hasKeyAssets && (
            <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E8EBF2]">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7]">Key Assets</span>
              </div>
              <div className="p-2">
                {keyAssets.map((asset: any) => (
                  <a
                    key={asset._id}
                    href={asset.externalUrl || `/learn/${asset.slug?.current}`}
                    target={asset.externalUrl ? '_blank' : undefined}
                    rel={asset.externalUrl ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#DCFCE7] transition-colors"
                  >
                    <span className="text-base">{asset.contentType?.icon || '📄'}</span>
                    <span className="text-[13px] font-medium text-[#1A1D26]">{asset.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Session Details */}
          <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8EBF2]">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7]">Session Details</span>
            </div>
            <div className="p-2">
              {entry.presenter && (
                <div className="px-3 py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-0.5">Presenters</div>
                  <div className="text-[13px] text-[#1A1D26] leading-snug">{entry.presenter}</div>
                </div>
              )}
              {entry.audiences && entry.audiences.length > 0 && (
                <div className="px-3 py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-0.5">Audience</div>
                  <div className="text-[13px] text-[#1A1D26] leading-snug">{entry.audiences.map(a => a.name).join(', ')}</div>
                </div>
              )}
              {entry.duration && (
                <div className="px-3 py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-0.5">Duration</div>
                  <div className="text-[13px] text-[#1A1D26] leading-snug">{entry.duration}</div>
                </div>
              )}
              {entry.publishDate && (
                <div className="px-3 py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-0.5">Recorded</div>
                  <div className="text-[13px] text-[#1A1D26] leading-snug">
                    {new Date(entry.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              )}
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}
