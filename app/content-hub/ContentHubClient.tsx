'use client'

import { useState } from 'react'
import ButtonNav from '@/components/hub/ButtonNav'
import CatalogView from '@/components/catalog/CatalogView'
import HubSection from '@/components/hub/HubSection'
import { CatalogEntry, Product, Team, Topic, ContentType, JourneyStage } from '@/lib/types/catalog'

interface ContentHubClientProps {
  entries: CatalogEntry[]
  availableProducts: Product[]
  availableTeams: Team[]
  availableTopics: Topic[]
  availableContentTypes: ContentType[]
  availableJourneyStages: JourneyStage[]
}

const CATEGORIES = [
  {
    id: 'all',
    label: 'All Content',
    icon: '📚',
    color: 'bg-[#009B00]',  // Gladly green
    contentTypes: [],
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: '📄',
    color: 'bg-[#8C69F0]',  // Purple
    contentTypes: ['template', 'deck'],
  },
  {
    id: 'one-pagers',
    label: 'One-Pagers',
    icon: '📋',
    color: 'bg-[#3B82F6]',  // Blue
    contentTypes: ['one-pager'],
  },
  {
    id: 'activation-kits',
    label: 'Activation Kits',
    icon: '📦',
    color: 'bg-[#10B981]',  // Emerald
    contentTypes: ['activation-kit'],
  },
  {
    id: 'competitive',
    label: 'Competitive',
    icon: '⚔️',
    color: 'bg-[#F97316]',  // Orange
    contentTypes: ['competitive', 'battle-card'],
  },
]

export default function ContentHubClient({
  entries,
  availableProducts,
  availableTeams,
  availableTopics,
  availableContentTypes,
  availableJourneyStages,
}: ContentHubClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory)

  // Get featured entries (only from all entries, not filtered)
  const featuredEntries = entries
    .filter((e) => e.featured || e.showInUpcoming)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, 3)

  // Get new entries (last 30 days, from all entries)
  const newEntries = (() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    return entries
      .filter((e) => new Date(e.publishDate).getTime() > thirtyDaysAgo)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 4)
  })()

  // Filter entries for catalog view or curated category view
  const filteredEntries = (() => {
    if (!activeCategoryData?.contentTypes.length) {
      return entries
    }

    return entries.filter((entry) =>
      activeCategoryData.contentTypes.includes(entry.contentType?.slug?.current || '')
    )
  })()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Purple Brand */}
      <div className="relative bg-gradient-to-br from-[#8C69F0] via-[#7C59D0] to-[#6B46C1] text-white py-20 px-4 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Accent shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📚</span>
            <h1 className="text-[32px] leading-[38px] tracking-[-0.02em] font-bold">
              Content Hub
            </h1>
          </div>
          <p className="text-[17px] leading-[28px] text-purple-50 max-w-2xl">
            Your repository for templates, collateral, and competitive intelligence. Everything
            you need to win deals and enable your success.
          </p>
        </div>
      </div>

      {/* Button Navigation */}
      <ButtonNav
        buttons={CATEGORIES}
        activeButton={activeCategory}
        onButtonChange={setActiveCategory}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Section - Only show when "All Content" is active */}
        {activeCategory === 'all' && featuredEntries.length > 0 && (
          <HubSection
            title="⭐ Featured & New"
            description="Recently added and hand-picked content"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEntries.map((entry) => (
                <div key={entry._id} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#009B00] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="px-3 py-1.5 rounded-md text-[12px] leading-[16px] font-semibold text-white shadow-sm"
                      style={{ backgroundColor: entry.contentType?.color || '#8C69F0' }}
                    >
                      {entry.contentType?.name}
                    </span>
                    {entry.featured && (
                      <span className="text-[12px] leading-[16px] font-semibold text-[#F5A623]">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-[16px] leading-[24px] tracking-[-0.01em] font-bold text-[#0D0D0D] mb-2 group-hover:text-[#009B00] transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-[14px] leading-[22px] text-[#666] mb-4 line-clamp-2">
                    {entry.description}
                  </p>
                  <a
                    href={`/catalog/${entry.slug.current}`}
                    className="inline-flex items-center text-[14px] leading-[20px] font-semibold text-[#009B00] hover:text-[#008000] transition-colors"
                  >
                    View Content →
                  </a>
                </div>
              ))}
            </div>
          </HubSection>
        )}

        {/* New Resources Section - Only show when "All Content" is active */}
        {activeCategory === 'all' && newEntries.length > 0 && (
          <HubSection
            title="🆕 New Resources"
            description={`${newEntries.length} new in the last 30 days`}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newEntries.map((entry) => (
                <a
                  key={entry._id}
                  href={`/catalog/${entry.slug.current}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#009B00] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <span
                    className="inline-block px-3 py-1.5 rounded-md text-[12px] leading-[16px] font-semibold text-white mb-3 shadow-sm"
                    style={{ backgroundColor: entry.contentType?.color || '#8C69F0' }}
                  >
                    {entry.contentType?.name}
                  </span>
                  <h3 className="text-[15px] leading-[22px] tracking-[-0.01em] font-bold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#009B00] transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-[13px] leading-[18px] text-[#666]">
                    {new Date(entry.publishDate).toLocaleDateString()}
                  </p>
                </a>
              ))}
            </div>
          </HubSection>
        )}

        {/* Show either full catalog (for "All Content") or curated cards (for specific categories) */}
        {activeCategory === 'all' ? (
          // Full catalog with filters for "All Content"
          <HubSection
            title="📖 Browse All Resources"
            description={`${entries.length} resources available`}
          >
            <CatalogView
              pageType="content-hub"
              showFilters={true}
              filterOptions={['product', 'team', 'topic', 'format']}
              layout="grid"
              sortBy="date-desc"
              itemsPerPage={12}
              cardStyle="standard"
              showDuration={true}
              showPresenter={true}
              featuredSection={false}
              entries={entries}
              availableProducts={availableProducts}
              availableTeams={availableTeams}
              availableTopics={availableTopics}
              availableContentTypes={availableContentTypes}
              availableJourneyStages={availableJourneyStages}
            />
          </HubSection>
        ) : (
          // Curated category view for Templates/Competitive
          <HubSection
            title={`${activeCategoryData?.icon} ${activeCategoryData?.label}`}
            description={`${filteredEntries.length} ${activeCategoryData?.label.toLowerCase()} resources`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntries.map((entry) => (
                <a
                  key={entry._id}
                  href={`/catalog/${entry.slug.current}`}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#009B00] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="px-3 py-1.5 rounded-md text-[12px] leading-[16px] font-semibold text-white shadow-sm"
                      style={{ backgroundColor: entry.contentType?.color || '#8C69F0' }}
                    >
                      {entry.contentType?.name}
                    </span>
                  </div>
                  <h3 className="text-[16px] leading-[24px] tracking-[-0.01em] font-bold text-[#0D0D0D] mb-2 group-hover:text-[#009B00] transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-[14px] leading-[22px] text-[#666] mb-4 line-clamp-2">
                    {entry.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] leading-[18px] text-[#666]">
                      {new Date(entry.publishDate).toLocaleDateString()}
                    </span>
                    <span className="text-[14px] leading-[20px] font-semibold text-[#009B00] group-hover:text-[#008000] transition-colors">
                      View →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </HubSection>
        )}
      </div>
    </div>
  )
}
