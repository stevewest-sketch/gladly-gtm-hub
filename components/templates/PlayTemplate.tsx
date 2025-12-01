'use client'

import { useState, useEffect } from 'react'
import { CatalogEntry } from '@/lib/types/catalog'
import PageSectionRenderer from '../sections/PageSectionRenderer'

interface PlayTemplateProps {
  entry: CatalogEntry
}

export default function PlayTemplate({ entry }: PlayTemplateProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  // Build navigation sections from pageSections
  const navSections: { id: string; label: string }[] = []

  if (entry.pageSections && entry.pageSections.length > 0) {
    entry.pageSections.forEach((section) => {
      const sectionTypeLabels: Record<string, string> = {
        'overview': 'Overview',
        'video': section.title || 'Session Recording',
        'takeaways': section.title || 'Key Takeaways',
        'process': section.title || 'How to Run',
        'tips': section.title || 'Best Practices',
        'faq': section.title || 'FAQs',
        'assets': section.title || "What's Included",
        'text': section.title || 'Content',
        'checklist': section.title || 'Checklist',
      }
      navSections.push({
        id: `section-${section._key}`,
        label: sectionTypeLabels[section.sectionType] || section.title || 'Section'
      })
    })
  }

  // Scroll spy
  useEffect(() => {
    if (navSections.length === 0) return

    const handleScroll = () => {
      const sections = navSections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navSections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Set initial active section
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navSections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Get primary asset for sidebar
  const primaryAsset = entry.keyAssets?.[0]

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-[28px] font-bold mb-3">{entry.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white/90">
            {entry.presenter && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {entry.presenter}
              </span>
            )}
            {entry.duration && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {entry.duration}
              </span>
            )}
            {entry.publishDate && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(entry.publishDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Main Content Column */}
          <div className="space-y-6">
            {entry.pageSections && entry.pageSections.length > 0 ? (
              <PageSectionRenderer sections={entry.pageSections} excludeTypes={['assets']} />
            ) : (
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <p className="text-[#6B7280]">No content sections configured for this entry.</p>
              </div>
            )}
          </div>

          {/* Combined Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start space-y-4">
            {/* ON THIS PAGE Navigation */}
            {navSections.length > 0 && (
              <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="bg-[#F8F9FC] px-5 py-3 border-b border-[#E5E7EB]">
                  <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">ON THIS PAGE</div>
                </div>
                <nav className="p-3 space-y-0.5">
                  {navSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-[14px] transition-colors ${
                        activeSection === section.id
                          ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                          : 'text-[#374151] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Key Assets - from pageSections assets or keyAssets reference */}
            {(() => {
              // Get assets from pageSections
              const assetsSection = entry.pageSections?.find(s => s.sectionType === 'assets')
              const assetItems = assetsSection?.assetItems || []
              const keyAssets = entry.keyAssets || []

              if (assetItems.length === 0 && keyAssets.length === 0) return null

              return (
                <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                  <div className="bg-[#F8F9FC] px-5 py-3 border-b border-[#E5E7EB]">
                    <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">KEY ASSETS</div>
                  </div>
                  <div className="p-4 space-y-2">
                    {/* Asset items from pageSections */}
                    {assetItems.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors group"
                      >
                        <div className="w-9 h-9 bg-[#DBEAFE] rounded-lg flex items-center justify-center text-base flex-shrink-0">
                          {item.icon || '📄'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] font-medium text-[#111827]">{item.title}</div>
                          {item.description && (
                            <div className="text-[12px] text-[#6B7280] line-clamp-1">{item.description}</div>
                          )}
                        </div>
                        <span className="text-[#9CA3AF] group-hover:text-[#16A34A] transition-colors">↗</span>
                      </a>
                    ))}
                    {/* Key assets from reference field */}
                    {keyAssets.map((asset) => (
                      <a
                        key={asset._id}
                        href={asset.externalUrl || `/enablement-hub/${asset.slug?.current}`}
                        target={asset.externalUrl ? '_blank' : undefined}
                        rel={asset.externalUrl ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors group"
                      >
                        <div className="w-9 h-9 bg-[#DBEAFE] rounded-lg flex items-center justify-center text-base flex-shrink-0">
                          📁
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] font-medium text-[#111827]">{asset.title}</div>
                          <div className="text-[12px] text-[#6B7280]">{asset.contentType?.name || 'Documentation'}</div>
                        </div>
                        <span className="text-[#9CA3AF] group-hover:text-[#16A34A] transition-colors">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })()}

          </aside>
        </div>
      </div>
    </div>
  )
}
