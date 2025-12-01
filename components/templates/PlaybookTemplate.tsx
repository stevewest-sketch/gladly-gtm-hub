'use client'

import { CatalogEntry } from '@/lib/types/catalog'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import PageSectionRenderer from '@/components/sections/PageSectionRenderer'

// Section type to title mapping for navigation
const SECTION_TYPE_TITLES: Record<string, string> = {
  'overview': 'Quick Overview',
  'video': 'Session Recording',
  'takeaways': 'Key Takeaways',
  'process': 'How to Run',
  'tips': 'Best Practices',
  'faq': 'FAQs',
  'assets': 'Key Assets',
  'text': 'Content',
  'checklist': 'Checklist',
}

// Helper to extract navigation items from pageSections
function extractNavFromSections(sections: any[]): { id: string; label: string }[] {
  return sections.map((section) => ({
    id: `section-${section._key}`,
    label: section.title || SECTION_TYPE_TITLES[section.sectionType] || 'Section',
  }))
}

// Collapsible section component
function ContentSection({
  id,
  title,
  children,
  defaultExpanded = true,
  collapsible = true
}: {
  id: string
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  collapsible?: boolean
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

interface PlaybookTemplateProps {
  entry: CatalogEntry
}

export default function PlaybookTemplate({ entry }: PlaybookTemplateProps) {
  const [activeSection, setActiveSection] = useState('overview')

  // Get assets from contentBlocks (blockType='assets')
  const assetsBlock = entry.contentBlocks?.find((b: any) => b.blockType === 'assets')
  const assetsFromBlocks = assetsBlock?.items || []

  // Get keyAssets (references to other catalog entries)
  const keyAssetsRefs = entry.keyAssets || []

  // Combined assets for display
  const hasKeyAssets = assetsFromBlocks.length > 0 || keyAssetsRefs.length > 0

  // Resource links
  const hasRecording = entry.resourceLinks?.videoUrl
  const hasPrimaryDeck = entry.resourceLinks?.slidesUrl || entry.resourceLinks?.keyAssetUrl
  const primaryAssetLabel = entry.resourceLinks?.keyAssetLabel || 'Primary Deck'
  const primaryAssetUrl = entry.resourceLinks?.keyAssetUrl || entry.resourceLinks?.slidesUrl

  // Check what sections exist
  const hasHowTo = entry.articleSections && entry.articleSections.length > 0
  const hasBestPractices = entry.actionItems && entry.actionItems.length > 0
  const hasFaqs = entry.contentBlocks?.some((b: any) => b.blockType === 'faq')
  const hasChecklist = entry.contentBlocks?.some((b: any) => b.blockType === 'checklist')
  // Only show legacy training if NOT using pageSections (pageSections is the new way)
  const usingPageSections = entry.pageSections && entry.pageSections.length > 0
  const hasTraining = !usingPageSections && ((entry.modules && entry.modules.length > 0) || entry.mainContent?.wistiaId || hasRecording)

  // Get overview from contentBlocks (blockType='text' with title containing 'overview')
  const overviewBlock = entry.contentBlocks?.find((b: any) =>
    b.blockType === 'text' && b.title?.toLowerCase().includes('overview')
  )

  // Get how-to steps from articleSections
  const howToSteps = entry.articleSections?.map((section: any, index: number) => {
    const lines = section.content?.split('\n') || []
    const description = lines[0] || ''
    const remainingLines = lines.slice(1).filter((line: string) => line.trim())

    // Separate actions from callouts
    const calloutIndex = remainingLines.findIndex((line: string) =>
      line.toLowerCase().includes('**callout:') || line.toLowerCase().includes('callout:')
    )

    let actions: string[] = []
    let callout: string | null = null

    if (calloutIndex >= 0) {
      actions = remainingLines.slice(0, calloutIndex)
      callout = remainingLines[calloutIndex]?.replace(/\*\*callout:\*\*\s*/i, '').replace(/callout:\s*/i, '')
    } else {
      actions = remainingLines
    }

    // Generate step ID from heading
    const stepId = `step-${section.heading?.toLowerCase().replace(/\s+/g, '-') || index + 1}`

    return {
      id: stepId,
      number: index + 1,
      title: section.heading,
      description,
      actions: actions.slice(0, 3),
      callout
    }
  }) || []

  // Get FAQs from content blocks
  const faqs = entry.contentBlocks?.find((b: any) => b.blockType === 'faq')?.faqs || []

  // Parse actionItems into tips and pitfalls
  const tips = entry.actionItems?.filter(item =>
    !item.toLowerCase().startsWith("don't") && !item.toLowerCase().startsWith("dont")
  ).slice(0, 3) || []

  const pitfalls = entry.actionItems?.filter(item =>
    item.toLowerCase().startsWith("don't") || item.toLowerCase().startsWith("dont")
  ).slice(0, 5) || []

  // Build navigation items from pageSections if they exist
  const pageSectionNav = entry.pageSections && entry.pageSections.length > 0
    ? [
        ...extractNavFromSections(entry.pageSections),
        // Add Optional Training to nav if modules exist
        ...(hasTraining ? [{ id: 'training', label: 'Optional Training' }] : [])
      ]
    : null

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      // Use pageSectionNav if available, otherwise use legacy section IDs
      const sectionIds = pageSectionNav
        ? pageSectionNav.map(s => s.id)
        : ['overview', 'key-assets', 'how-to-run', 'best-practices', 'loe-checklist', 'faqs', 'training']
      const stepIds = pageSectionNav ? [] : howToSteps.map(s => s.id)
      const allIds = [...sectionIds, ...stepIds]

      let current = allIds[0] || 'overview'

      for (const id of allIds) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 120) {
            current = id
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [howToSteps, pageSectionNav])

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Format last updated date
  const lastUpdated = entry.publishDate
    ? new Date(entry.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div className="min-h-screen bg-[#F8F9FC]" data-template-type="playbook">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-[#15803D] via-[#16A34A] to-[#22C55E] text-white py-6 px-12">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-[28px] font-bold mb-2">{entry.title}</h1>
          <div className="flex flex-wrap gap-2 items-center text-[13px]">
            <span className="px-2.5 py-1 rounded text-[11px] font-medium bg-white/25">
              Playbook
            </span>
            {lastUpdated && (
              <span className="px-2.5 py-1 rounded text-[11px] font-medium bg-white/15">
                {lastUpdated}
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
            <>
              <PageSectionRenderer sections={entry.pageSections} />
              {/* Optional Training - render after pageSections if modules exist */}
              {hasTraining && (
                <ContentSection id="training" title="Optional Training" collapsible={false}>
                  <p className="text-[13px] text-[#8B93A7] italic mb-4 px-3 py-2 bg-[#F8F9FC] rounded-md">
                    Nice-to-have, not required. You can run this play without watching.
                  </p>
                  <div className="space-y-3">
                    {entry.modules && entry.modules.length > 0 ? (
                      entry.modules.map((module: any, index: number) => (
                        <a
                          key={module._key || index}
                          href={module.videoUrl || entry.resourceLinks?.videoUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex gap-4 p-4 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                        >
                          <div className="w-[120px] h-[68px] bg-[#1a1a1a] rounded-md flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-lg opacity-90">▶</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{module.title}</div>
                            <div className="text-[12px] text-[#8B93A7] mb-1">
                              {module.duration} {module.presenter && `• ${module.presenter}`}
                            </div>
                            {module.description && (
                              <div className="text-[13px] text-[#5C6578] line-clamp-2">{module.description}</div>
                            )}
                          </div>
                        </a>
                      ))
                    ) : hasRecording && (
                      <a
                        href={entry.resourceLinks?.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 p-4 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                      >
                        <div className="w-[120px] h-[68px] bg-[#1a1a1a] rounded-md flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-lg opacity-90">▶</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{entry.title} Walkthrough</div>
                          <div className="text-[12px] text-[#8B93A7]">
                            {entry.duration} {entry.presenter && `• ${entry.presenter}`}
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </ContentSection>
              )}
            </>
          ) : (
            <>
          {/* LEGACY: 1. Quick Overview - Always first */}
          <ContentSection id="overview" title="Quick Overview" defaultExpanded={true} collapsible={true}>
            {overviewBlock?.content ? (
              <div className="prose prose-sm max-w-none text-[14px] text-[#5C6578] leading-relaxed">
                <ReactMarkdown>{overviewBlock.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-[#F8F9FC] rounded-md">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-1">What It Is</div>
                  <div className="text-[14px] text-[#1A1D26] leading-relaxed line-clamp-2">
                    {entry.description || 'A playbook for your sales process.'}
                  </div>
                </div>
                <div className="p-3 bg-[#F8F9FC] rounded-md">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-1">Who It&apos;s For</div>
                  <div className="text-[14px] text-[#1A1D26] leading-relaxed line-clamp-2">
                    {entry.audiences?.map(a => a.name).join(', ') || 'Sales and SC teams.'}
                  </div>
                </div>
              </div>
            )}
          </ContentSection>

          {/* 2. Key Takeaways - if present */}
          {entry.keyTakeaways && entry.keyTakeaways.length > 0 && (
            <ContentSection id="key-takeaways" title="Key Takeaways" collapsible={false}>
              <ul className="space-y-2">
                {entry.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex gap-3 text-[14px] text-[#5C6578]">
                    <span className="text-[#16A34A] flex-shrink-0">✓</span>
                    <span>
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                          p: ({ children }) => <>{children}</>
                        }}
                      >
                        {takeaway}
                      </ReactMarkdown>
                    </span>
                  </li>
                ))}
              </ul>
            </ContentSection>
          )}

          {/* 3. Key Assets - from contentBlocks assets */}
          {hasKeyAssets && (
            <ContentSection id="key-assets" title={assetsBlock?.title || 'Key Assets'} collapsible={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Assets from contentBlocks */}
                {assetsFromBlocks.map((item: any, idx: number) => (
                  <a
                    key={idx}
                    href={item.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors border border-[#E2E6EF]"
                  >
                    <div className="w-10 h-10 bg-[#E0E7FF] rounded-md flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon || '📄'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-[#1A1D26] mb-0.5">{item.title}</div>
                      <div className="text-[12px] text-[#5C6578] leading-snug line-clamp-2">
                        {item.description || 'Supporting resource'}
                      </div>
                    </div>
                    <span className="text-[#16A34A] text-[14px]">→</span>
                  </a>
                ))}

                {/* Referenced keyAssets */}
                {keyAssetsRefs.map((asset: any) => (
                  <a
                    key={asset._id}
                    href={asset.externalUrl || `/learn/${asset.slug?.current}`}
                    target={asset.externalUrl ? '_blank' : undefined}
                    rel={asset.externalUrl ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-3 p-3 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors border border-[#E2E6EF]"
                  >
                    <div className="w-10 h-10 bg-[#E0E7FF] rounded-md flex items-center justify-center text-lg flex-shrink-0">
                      {asset.contentType?.icon || '📄'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-[#1A1D26] mb-0.5">{asset.title}</div>
                      <div className="text-[12px] text-[#5C6578] leading-snug line-clamp-2">
                        {asset.description || 'Supporting document'}
                      </div>
                    </div>
                    <span className="text-[#16A34A] text-[14px]">→</span>
                  </a>
                ))}
              </div>
            </ContentSection>
          )}

          {/* 4. How to Run the Play */}
          {hasHowTo && (
            <ContentSection id="how-to-run" title="How to Run the Play" collapsible={false}>
              <div className="space-y-0">
                {howToSteps.map((step, index) => (
                  <div
                    key={step.id}
                    id={step.id}
                    className="flex gap-4 py-4 border-b border-[#E8EBF2] last:border-0"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="w-7 h-7 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                        {step.number}
                      </span>
                      {index < howToSteps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-[#E8EBF2] min-h-[20px]" />
                      )}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h4 className="text-[15px] font-semibold text-[#1A1D26] mb-1">{step.title}</h4>
                      <p className="text-[14px] text-[#5C6578] leading-relaxed mb-2">{step.description}</p>

                      {step.actions.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {step.actions.map((action: string, actionIndex: number) => (
                            <div key={actionIndex} className="text-[13px] text-[#5C6578] pl-4 relative">
                              <span className="absolute left-0 text-[#16A34A]">→</span>
                              {action}
                            </div>
                          ))}
                        </div>
                      )}

                      {step.callout && (
                        <div className="mt-3 p-3 bg-[#FEF3C7] border-l-[3px] border-[#F59E0B] rounded-r-md">
                          <p className="text-[13px] text-[#5C6578] leading-relaxed">
                            <ReactMarkdown
                              components={{
                                strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                                p: ({ children }) => <>{children}</>
                              }}
                            >
                              {step.callout}
                            </ReactMarkdown>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ContentSection>
          )}

          {/* 5. Best Practices & Common Pitfalls */}
          {hasBestPractices && (
            <ContentSection id="best-practices" title="Best Practices & Common Pitfalls" collapsible={false}>
              {tips.length > 0 && (
                <div className="mb-4 p-4 bg-[#DCFCE7] border border-[#16A34A]/20 rounded-md">
                  <div className="text-[13px] font-semibold text-[#15803D] mb-2">If you only remember three things...</div>
                  <ul className="space-y-1">
                    {tips.slice(0, 3).map((tip, idx) => (
                      <li key={idx} className="text-[13px] text-[#5C6578] pl-4 relative">
                        <span className="absolute left-0 text-[#16A34A]">✓</span>
                        <ReactMarkdown
                          components={{
                            strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                            p: ({ children }) => <>{children}</>
                          }}
                        >
                          {tip.replace(/^\*\*(.+?):\*\*\s*/, '**$1:** ')}
                        </ReactMarkdown>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pitfalls.length > 0 && (
                <div>
                  <h4 className="text-[14px] font-semibold text-[#1A1D26] mb-3">Common Pitfalls</h4>
                  <div className="space-y-2">
                    {pitfalls.map((item, index) => (
                      <div key={index} className="flex gap-2 text-[14px] text-[#5C6578] py-1">
                        <span className="flex-shrink-0 text-amber-500">⚠</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ContentSection>
          )}

          {/* 6. LOE Checklist - if present */}
          {hasChecklist && entry.contentBlocks?.filter((b: any) => b.blockType === 'checklist').map((block: any, blockIdx: number) => (
            <ContentSection key={blockIdx} id="loe-checklist" title={block.title || 'Level of Effort Checklist'} collapsible={false}>
              {block.description && (
                <p className="text-[14px] text-[#5C6578] mb-4">{block.description}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {block.columns?.map((column: any, colIdx: number) => (
                  <div key={colIdx} className={`p-4 rounded-[10px] border ${
                    colIdx === 0 ? 'bg-[#DCFCE7] border-[#16A34A]/20' :
                    colIdx === 1 ? 'bg-[#FEF3C7] border-[#F59E0B]/20' :
                    'bg-[#FEE2E2] border-[#EF4444]/20'
                  }`}>
                    <div className={`text-[14px] font-semibold mb-3 ${
                      colIdx === 0 ? 'text-[#15803D]' :
                      colIdx === 1 ? 'text-[#B45309]' :
                      'text-[#DC2626]'
                    }`}>
                      {column.title}
                    </div>
                    <ul className="space-y-2">
                      {column.items?.map((item: string, itemIdx: number) => (
                        <li key={itemIdx} className="flex gap-2 text-[13px] text-[#5C6578]">
                          <span className={`flex-shrink-0 mt-0.5 ${
                            colIdx === 0 ? 'text-[#16A34A]' :
                            colIdx === 1 ? 'text-[#F59E0B]' :
                            'text-[#EF4444]'
                          }`}>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ContentSection>
          ))}

          {/* 7. FAQs */}
          {faqs.length > 0 && (
            <ContentSection id="faqs" title="FAQs" collapsible={false}>
              <div className="space-y-3">
                {faqs.map((faq: any, index: number) => (
                  <div key={index} className="pb-3 border-b border-[#E8EBF2] last:border-0">
                    <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{faq.question}</div>
                    <div className="text-[14px] text-[#5C6578] leading-relaxed">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </ContentSection>
          )}

          {/* 8. Optional Training */}
          {hasTraining && (
            <ContentSection id="training" title="Optional Training" collapsible={false}>
              <p className="text-[13px] text-[#8B93A7] italic mb-4 px-3 py-2 bg-[#F8F9FC] rounded-md">
                Nice-to-have, not required. You can run this play without watching.
              </p>

              <div className="space-y-3">
                {entry.modules && entry.modules.length > 0 ? (
                  entry.modules.map((module: any, index: number) => (
                    <a
                      key={module._key || index}
                      href={module.videoUrl || entry.resourceLinks?.videoUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 p-4 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                    >
                      <div className="w-[120px] h-[68px] bg-[#1a1a1a] rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg opacity-90">▶</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{module.title}</div>
                        <div className="text-[12px] text-[#8B93A7] mb-1">
                          {module.duration} {entry.presenter && `• ${entry.presenter}`}
                        </div>
                        {module.description && (
                          <div className="text-[13px] text-[#5C6578] line-clamp-2">{module.description}</div>
                        )}
                      </div>
                    </a>
                  ))
                ) : hasRecording && (
                  <a
                    href={entry.resourceLinks?.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-4 bg-[#F8F9FC] rounded-[10px] hover:bg-[#DCFCE7] transition-colors"
                  >
                    <div className="w-[120px] h-[68px] bg-[#1a1a1a] rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg opacity-90">▶</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{entry.title} Walkthrough</div>
                      <div className="text-[12px] text-[#8B93A7]">
                        {entry.duration} {entry.presenter && `• ${entry.presenter}`}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </ContentSection>
          )}
            </>
          )}

        </main>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">

          {/* On This Page */}
          <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8EBF2]">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7]">On This Page</span>
            </div>
            <nav className="p-2">
              {/* Dynamic navigation from pageSections */}
              {pageSectionNav ? (
                pageSectionNav.map((section) => (
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
                ))
              ) : (
                <>
                  {/* Legacy navigation */}
                  <a
                    href="#overview"
                    onClick={(e) => scrollToSection(e, 'overview')}
                    className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                      activeSection === 'overview'
                        ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                        : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                    }`}
                  >
                    Overview
                  </a>

                  {entry.keyTakeaways && entry.keyTakeaways.length > 0 && (
                    <a
                      href="#key-takeaways"
                      onClick={(e) => scrollToSection(e, 'key-takeaways')}
                      className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                        activeSection === 'key-takeaways'
                          ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                          : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                      }`}
                    >
                      Key Takeaways
                    </a>
                  )}

                  {hasKeyAssets && (
                    <a
                      href="#key-assets"
                      onClick={(e) => scrollToSection(e, 'key-assets')}
                      className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                        activeSection === 'key-assets'
                          ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                          : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                      }`}
                    >
                      Key Assets
                    </a>
                  )}

                  {hasHowTo && (
                    <>
                      <a
                        href="#how-to-run"
                        onClick={(e) => scrollToSection(e, 'how-to-run')}
                        className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                          activeSection === 'how-to-run' || howToSteps.some(s => activeSection === s.id)
                            ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                            : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                        }`}
                      >
                        How to Run
                      </a>
                      <div className="pl-4">
                        {howToSteps.map((step) => (
                          <a
                            key={step.id}
                            href={`#${step.id}`}
                            onClick={(e) => scrollToSection(e, step.id)}
                            className={`block px-3 py-1 text-[12px] rounded-md transition-colors ${
                              activeSection === step.id
                                ? 'text-[#16A34A] font-medium'
                                : 'text-[#8B93A7] hover:text-[#15803D]'
                            }`}
                          >
                            {step.title}
                          </a>
                        ))}
                      </div>
                    </>
                  )}

                  {hasBestPractices && (
                    <a
                      href="#best-practices"
                      onClick={(e) => scrollToSection(e, 'best-practices')}
                      className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                        activeSection === 'best-practices'
                          ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                          : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                      }`}
                    >
                      Best Practices
                    </a>
                  )}

                  {hasChecklist && (
                    <a
                      href="#loe-checklist"
                      onClick={(e) => scrollToSection(e, 'loe-checklist')}
                      className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                        activeSection === 'loe-checklist'
                          ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                          : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                      }`}
                    >
                      LOE Checklist
                    </a>
                  )}

                  {faqs.length > 0 && (
                    <a
                      href="#faqs"
                      onClick={(e) => scrollToSection(e, 'faqs')}
                      className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                        activeSection === 'faqs'
                          ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                          : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                      }`}
                    >
                      FAQs
                    </a>
                  )}

                  {hasTraining && (
                    <a
                      href="#training"
                      onClick={(e) => scrollToSection(e, 'training')}
                      className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                        activeSection === 'training'
                          ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                          : 'text-[#5C6578] hover:bg-[#DCFCE7] hover:text-[#15803D]'
                      }`}
                    >
                      Optional Training
                    </a>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* Key Assets Sidebar */}
          {hasKeyAssets && (
            <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E8EBF2]">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7]">Key Assets</span>
              </div>
              <div className="p-2">
                {/* Assets from contentBlocks */}
                {assetsFromBlocks.map((item: any, idx: number) => (
                  <a
                    key={idx}
                    href={item.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#DCFCE7] transition-colors"
                  >
                    <span className="text-base">{item.icon || '📄'}</span>
                    <span className="text-[13px] font-medium text-[#1A1D26] truncate">{item.title}</span>
                  </a>
                ))}
                {/* Referenced keyAssets */}
                {keyAssetsRefs.map((asset: any) => (
                  <a
                    key={asset._id}
                    href={asset.externalUrl || `/learn/${asset.slug?.current}`}
                    target={asset.externalUrl ? '_blank' : undefined}
                    rel={asset.externalUrl ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#DCFCE7] transition-colors"
                  >
                    <span className="text-base">📄</span>
                    <span className="text-[13px] font-medium text-[#1A1D26] truncate">{asset.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Play Details */}
          <div className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8EBF2]">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7]">Play Details</span>
            </div>
            <div className="p-2">
              {entry.presenter && (
                <div className="px-3 py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-0.5">Owned By</div>
                  <div className="text-[13px] text-[#1A1D26] leading-snug">{entry.presenter.split(',')[0]}</div>
                </div>
              )}
              <div className="px-3 py-2">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-0.5">Target Stage</div>
                <div className="text-[13px] text-[#1A1D26] leading-snug">Stage 1-2 (First Meetings)</div>
              </div>
              <div className="px-3 py-2">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-0.5">Prep Time</div>
                <div className="text-[13px] text-[#1A1D26] leading-snug">{entry.duration || '30-60 minutes'}</div>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}
