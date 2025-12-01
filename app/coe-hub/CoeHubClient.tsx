'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// Types
interface CoeSection {
  _id: string
  name: string
  slug: { current: string }
  icon: string
  description: string
  order: number
}

interface CoeEntry {
  _id: string
  title: string
  slug: { current: string }
  summary?: string
  headline?: string
  entryType: string
  proofType?: string
  customer?: string
  icon?: string
  featured?: boolean
  permission?: { name: string; color: string }
  section?: { name: string; icon: string; slug: { current: string } }
  _createdAt: string
  // Meeting asset specific fields
  account?: string
  meetingType?: string
  customerLogoUrl?: string
  deliveryDate?: string
  salesStage?: string
  slidesUrl?: string
}

interface CoeHubClientProps {
  sections: CoeSection[]
  bestPractices: CoeEntry[]
  tools: CoeEntry[]
  proofPoints: CoeEntry[]
  dashboards: CoeEntry[]
  counts: {
    total: number
    proofPoints: number
    bestPractices: number
    tools: number
  }
}

// Navigation tabs
const NAVIGATION_TABS = [
  { id: 'all', label: 'Best Practice Library', icon: null },
  { id: 'bva-tools', label: 'BVA & ROI Tools', icon: '🧮' },
  { id: 'proof-points', label: 'Proof Points', icon: '📊' },
  { id: 'dashboards', label: 'Performance Dashboards', icon: '📈' },
]

// Entry type filters (excluding proof points - they have their own tab)
const ENTRY_TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'best-practice', label: 'Best Practice' },
  { id: 'process-innovation', label: 'Process Innovation' },
  { id: 'internal-best-practice', label: 'Internal Best Practice' },
  { id: 'meeting-asset', label: 'Meeting Asset' },
  { id: 'tool', label: 'Tool' },
]

// Proof type filters
const PROOF_TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'stat', label: 'Stat' },
  { id: 'benchmark', label: 'Benchmark' },
  { id: 'anecdote', label: 'Anecdote' },
  { id: 'quote', label: 'Quote' },
  { id: 'case-study', label: 'Case Study' },
]

// Permission filters
const PERMISSION_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'green', label: 'Public', color: 'bg-emerald-500' },
  { id: 'yellow', label: 'Internal', color: 'bg-amber-500' },
  { id: 'red', label: 'Confidential', color: 'bg-red-500' },
]

// Type badge colors
const TYPE_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  'proof-point': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'best-practice': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'process-innovation': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'internal-best-practice': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'tool': { bg: 'bg-red-100', text: 'text-red-700' },
  'meeting-asset': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
}

// Type icons
const TYPE_ICONS: Record<string, string> = {
  'proof-point': '📊',
  'best-practice': '✨',
  'process-innovation': '💡',
  'internal-best-practice': '🏢',
  'tool': '🛠️',
  'meeting-asset': '📁',
}

// Get type label
function getTypeLabel(type: string): string {
  switch (type) {
    case 'proof-point': return 'PROOF POINT'
    case 'best-practice': return 'BEST PRACTICE'
    case 'process-innovation': return 'PROCESS'
    case 'internal-best-practice': return 'INTERNAL'
    case 'tool': return 'TOOL'
    case 'meeting-asset': return 'MEETING'
    default: return type.toUpperCase()
  }
}

// Format date
function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function CoeHubClient({
  sections,
  bestPractices,
  tools,
  proofPoints,
  dashboards,
  counts,
}: CoeHubClientProps) {
  // State
  const [activeTab, setActiveTab] = useState('all')
  const [activeType, setActiveType] = useState('all')
  const [activeProofType, setActiveProofType] = useState('all')
  const [activeSection, setActiveSection] = useState('all')
  const [activePermission, setActivePermission] = useState('all')
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'new' | 'popular'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  // Best practice entries (excluding proof points)
  const bestPracticeEntries = useMemo(() => {
    return [...bestPractices, ...tools]
  }, [bestPractices, tools])

  // Filter entries based on active tab and filters
  const filteredEntries = useMemo(() => {
    let result: CoeEntry[] = []

    // Filter by tab
    if (activeTab === 'all') {
      result = [...bestPracticeEntries]
    } else if (activeTab === 'bva-tools') {
      result = [...tools]
    } else if (activeTab === 'proof-points') {
      result = [...proofPoints]
    } else if (activeTab === 'dashboards') {
      result = [...dashboards]
    }

    // Filter by catalog filter (All, New, Popular)
    if (catalogFilter === 'new') {
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
      result = result.filter((e) => new Date(e._createdAt || '').getTime() > thirtyDaysAgo)
    }

    // Filter by entry type (only for best practice library tab)
    if (activeTab === 'all' && activeType !== 'all') {
      result = result.filter((e) => e.entryType === activeType)
    }

    // Filter by proof type (only for proof points tab)
    if (activeTab === 'proof-points' && activeProofType !== 'all') {
      result = result.filter((e) => e.proofType === activeProofType)
    }

    // Filter by section
    if (activeSection !== 'all') {
      result = result.filter((e) => e.section?.slug?.current === activeSection)
    }

    // Filter by permission
    if (activePermission !== 'all') {
      result = result.filter((e) => e.permission?.color === activePermission)
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((e) =>
        e.title.toLowerCase().includes(query) ||
        e.summary?.toLowerCase().includes(query) ||
        e.headline?.toLowerCase().includes(query) ||
        e.customer?.toLowerCase().includes(query)
      )
    }

    // Sort - Popular filter forces featured sort
    if (catalogFilter === 'popular') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else {
      switch (sortBy) {
        case 'oldest':
          result.sort((a, b) => new Date(a._createdAt || '').getTime() - new Date(b._createdAt || '').getTime())
          break
        case 'az':
          result.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'featured':
          result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
          break
        default:
          result.sort((a, b) => new Date(b._createdAt || '').getTime() - new Date(a._createdAt || '').getTime())
      }
    }

    return result
  }, [bestPracticeEntries, tools, proofPoints, dashboards, activeTab, catalogFilter, activeType, activeProofType, activeSection, activePermission, searchQuery, sortBy])

  // Render meeting asset card with special design
  const renderMeetingCard = (entry: CoeEntry) => {
    const meetingTitle = entry.account && entry.meetingType
      ? `${entry.account} ${entry.meetingType}`
      : entry.title

    // Use external slides URL if available, otherwise fallback to internal page
    const href = entry.slidesUrl || `/coe-hub/${entry.slug.current}`
    const isExternal = !!entry.slidesUrl

    return (
      <a
        key={entry._id}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all flex flex-col hover:border-indigo-500 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] no-underline"
      >
        {/* Customer Logo */}
        {entry.customerLogoUrl && (
          <div className="mb-3 h-10 flex items-center">
            <img
              src={entry.customerLogoUrl}
              alt={entry.account || 'Customer'}
              className="h-8 max-w-[45%] object-contain object-left"
            />
          </div>
        )}

        {/* Title: Account + Type */}
        <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
          {meetingTitle}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
          {entry.summary || entry.headline}
        </p>

        {/* Footer: Date left, Stage right */}
        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-gray-100">
          <span className="text-gray-400">
            {formatDate(entry.deliveryDate) || formatDate(entry._createdAt)}
          </span>
          {entry.salesStage && (
            <span
              className={`px-2 py-1 rounded text-[10px] font-semibold ${
                entry.salesStage === 'pre-sales'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {entry.salesStage === 'pre-sales' ? 'Pre-sales' : 'Post-sales'}
            </span>
          )}
        </div>
      </a>
    )
  }

  // Render catalog card
  const renderCatalogCard = (entry: CoeEntry) => {
    // Use special meeting card design for meeting assets
    if (entry.entryType === 'meeting-asset') {
      return renderMeetingCard(entry)
    }

    const badgeColors = TYPE_BADGE_COLORS[entry.entryType] || { bg: 'bg-gray-100', text: 'text-gray-600' }
    const icon = entry.icon || TYPE_ICONS[entry.entryType] || '📄'

    return (
      <Link
        key={entry._id}
        href={`/coe-hub/${entry.slug.current}`}
        className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all flex flex-col hover:border-amber-600 hover:shadow-[0_0_0_3px_rgba(217,119,6,0.1)] no-underline"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide ${badgeColors.bg} ${badgeColors.text}`}>
              {getTypeLabel(entry.entryType)}
            </span>
            {entry.featured && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {entry.permission && (
              <span
                className={`w-2 h-2 rounded-full ${
                  entry.permission.color === 'green' ? 'bg-emerald-500' :
                  entry.permission.color === 'yellow' ? 'bg-amber-500' :
                  entry.permission.color === 'red' ? 'bg-red-500' : 'bg-gray-400'
                }`}
                title={entry.permission.name}
              />
            )}
          </div>
        </div>

        {/* Icon + Title */}
        <div className="flex items-start gap-2 mb-1">
          <span className="text-base flex-shrink-0">{icon}</span>
          <h3 className="text-sm font-semibold text-gray-900 leading-tight">{entry.title}</h3>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
          {entry.summary || entry.headline}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
          <span>{formatDate(entry._createdAt)}</span>
          <div className="flex items-center gap-2">
            {entry.customer && entry.customer !== 'N/A' && (
              <span className="text-[9px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                {entry.customer}
              </span>
            )}
            {entry.proofType && (
              <span className="text-[9px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">
                {entry.proofType}
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Render list item
  const renderListItem = (entry: CoeEntry) => {
    const badgeColors = TYPE_BADGE_COLORS[entry.entryType] || { bg: 'bg-gray-100', text: 'text-gray-600' }
    const icon = entry.icon || TYPE_ICONS[entry.entryType] || '📄'

    return (
      <Link
        key={entry._id}
        href={`/coe-hub/${entry.slug.current}`}
        className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all flex items-center gap-4 hover:border-amber-600 no-underline"
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 bg-amber-50">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{entry.title}</h3>
          <p className="text-xs text-gray-500 line-clamp-1">{entry.summary || entry.headline}</p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase ${badgeColors.bg} ${badgeColors.text}`}>
          {getTypeLabel(entry.entryType)}
        </span>
        <span className="text-[11px] text-gray-400 w-20 text-right">{formatDate(entry._createdAt)}</span>
      </Link>
    )
  }

  // Get section title and description based on active tab
  const getSectionInfo = () => {
    switch (activeTab) {
      case 'all':
        return {
          title: 'Best Practice Library',
          description: 'Curated collection of proven strategies, process innovations, internal best practices, and meeting assets from across the organization.'
        }
      case 'bva-tools':
        return {
          title: 'BVA & ROI Tools',
          description: 'Business value assessment calculators and ROI tools to help quantify customer value and build compelling business cases.'
        }
      case 'proof-points':
        return {
          title: 'Proof Points',
          description: 'Customer success metrics, benchmarks, quotes, and case studies to support your sales conversations and customer presentations.'
        }
      case 'dashboards':
        return {
          title: 'Performance Dashboards',
          description: 'Track key metrics and performance indicators to measure success and identify opportunities for improvement.'
        }
      default:
        return { title: '', description: '' }
    }
  }

  const sectionInfo = getSectionInfo()

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20">
        <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 text-white">
          <div className="max-w-[1400px] mx-auto px-8 pt-8 pb-0">
            <div className="mb-6">
              <h1 className="text-[42px] leading-[48px] font-bold flex items-center gap-3 mb-2">
                <span>🏆</span>
                Center of Excellence
              </h1>
              <p className="text-amber-100 text-sm max-w-lg">
                Where customer wins become repeatable success. Discover proven strategies, benchmark performance, and accelerate AI adoption.
              </p>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex gap-2 -mb-px overflow-x-auto pb-px">
              {NAVIGATION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    // Reset filters when changing tabs
                    setActiveType('all')
                    setActiveProofType('all')
                    setActiveSection('all')
                    setActivePermission('all')
                    setSearchQuery('')
                  }}
                  className={`text-sm font-medium px-4 py-2.5 rounded-t-lg border-none cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#F8F9FC] text-gray-900'
                      : 'bg-white/30 text-white hover:bg-white/45'
                  }`}
                >
                  {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

      </header>

      <main className="max-w-[1400px] mx-auto px-8 pt-5 pb-8">
        {/* Quick Action Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CoE Assistant Card */}
            <Link
              href="/?hub=coe"
              className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer transition-all hover:border-amber-500 hover:shadow-lg no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-amber-50 border border-amber-100">
                  🤖
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">CoE Assistant</h3>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Search proof points, customer wins, and success metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Get AI-powered answers from our knowledge base</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Find best practices and winning strategies</span>
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:translate-x-1 transition-transform">
                    Ask a Question
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Submit to CoE Card */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScT21C-U0bDh0wXbAYRttoNr1pZa-Dhk8UJZdmbhi3pzB7Fdw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer transition-all hover:border-emerald-500 hover:shadow-lg no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-emerald-50 border border-emerald-100">
                  📝
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Submit to CoE</h3>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Share customer wins, quotes, and success metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Contribute best practices and process innovations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Help the team learn and win more deals</span>
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
                    Submit a Win
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Catalog Filter Buttons */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'all', label: 'All', icon: '📋' },
            { id: 'new', label: 'New', icon: '✨' },
            { id: 'popular', label: 'Most Popular', icon: '🔥' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setCatalogFilter(filter.id as 'all' | 'new' | 'popular')}
              className={`text-sm font-medium px-4 py-2 rounded-lg border cursor-pointer transition-all flex items-center gap-2 ${
                catalogFilter === filter.id
                  ? 'bg-amber-600 border-amber-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          {/* Type - only for Best Practice Library tab */}
          {activeTab === 'all' && (
            <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Type</span>
              <div className="flex flex-wrap gap-2">
                {ENTRY_TYPE_FILTERS.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
                      activeType === type.id
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Proof Type - only for Proof Points tab */}
          {activeTab === 'proof-points' && (
            <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Type</span>
              <div className="flex flex-wrap gap-2">
                {PROOF_TYPE_FILTERS.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveProofType(type.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
                      activeProofType === type.id
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section */}
          <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Section</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSection('all')}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
                  activeSection === 'all'
                    ? 'bg-amber-600 border-amber-600 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              {sections.map((section) => (
                <button
                  key={section._id}
                  onClick={() => setActiveSection(section.slug.current)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeSection === section.slug.current
                      ? 'bg-amber-600 border-amber-600 text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          {/* Permission */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Access</span>
            <div className="flex flex-wrap gap-2">
              {PERMISSION_FILTERS.map((perm) => {
                const isActive = activePermission === perm.id
                return (
                  <button
                    key={perm.id}
                    onClick={() => setActivePermission(perm.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {perm.color && <span className={`w-2 h-2 rounded-full ${perm.color}`} />}
                    {perm.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg mb-6 max-w-sm focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100 transition-all">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={`Search ${sectionInfo.title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-transparent text-sm text-gray-900 w-full outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Results count and controls */}
        <div className="flex items-center justify-end gap-3 mb-4">
            <span className="text-sm text-gray-500">{filteredEntries.length} resources</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="featured">Most Popular</option>
            </select>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 border rounded-lg cursor-pointer ${
                  viewMode === 'grid' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 border rounded-lg cursor-pointer ${
                  viewMode === 'list' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
        </div>

        {/* Catalog Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEntries.map(renderCatalogCard)}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredEntries.map(renderListItem)}
          </div>
        )}

        {filteredEntries.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No resources found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
            ← Back to GTM Hub
          </Link>
        </div>
      </main>
    </div>
  )
}
