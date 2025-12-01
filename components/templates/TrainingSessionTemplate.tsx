'use client'

import { useState, useEffect } from 'react'
import { CatalogEntry } from '@/lib/types/catalog'
import PageSectionRenderer from '../sections/PageSectionRenderer'

interface TrainingSessionTemplateProps {
  entry: CatalogEntry
}

export default function TrainingSessionTemplate({ entry }: TrainingSessionTemplateProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  // Build navigation sections from pageSections
  const navSections: { id: string; label: string }[] = []

  if (entry.pageSections && entry.pageSections.length > 0) {
    entry.pageSections.forEach((section) => {
      const sectionTypeLabels: Record<string, string> = {
        'overview': 'Overview',
        'video': section.title || 'Session Recording',
        'takeaways': section.title || 'Key Takeaways',
        'process': section.title || 'How We Do It',
        'tips': section.title || 'Best Practices',
        'faq': section.title || 'FAQs',
        'assets': section.title || 'Resources',
        'text': section.title || 'Content',
        'checklist': section.title || 'Checklist',
      }
      navSections.push({
        id: `section-${section._key}`,
        label: sectionTypeLabels[section.sectionType] || section.title || 'Section'
      })
    })
  }

  // Scroll spy for active section
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

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-[28px] font-bold mb-3">{entry.title}</h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 rounded text-[13px] font-medium">
              Training
            </span>
            {entry.publishDate && (
              <span className="px-3 py-1 bg-white/20 rounded text-[13px] font-medium">
                {formatDate(entry.publishDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_220px] gap-8 items-start">
          {/* Main Content Column */}
          <div className="space-y-6">
            {entry.pageSections && entry.pageSections.length > 0 ? (
              <PageSectionRenderer sections={entry.pageSections} excludeTypes={[]} />
            ) : (
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <p className="text-[#6B7280]">No content sections configured for this entry.</p>
              </div>
            )}
          </div>

          {/* ON THIS PAGE Navigation */}
          {navSections.length > 0 && (
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mb-3">ON THIS PAGE</div>
              <nav className="space-y-1">
                {navSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#DCFCE7] text-[#16A34A] font-medium'
                        : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>
          )}

          {/* SESSION DETAILS Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
              <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mb-4">SESSION DETAILS</div>

              {entry.presenter && (
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-1">PRESENTERS</div>
                  <div className="text-[14px] text-[#111827]">{entry.presenter}</div>
                </div>
              )}

              {entry.duration && (
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-1">DURATION</div>
                  <div className="text-[14px] text-[#111827]">{entry.duration}</div>
                </div>
              )}

              {entry.publishDate && (
                <div>
                  <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-1">RECORDED</div>
                  <div className="text-[14px] text-[#111827]">{formatDate(entry.publishDate)}</div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
