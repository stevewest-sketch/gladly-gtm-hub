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
    contentTypes: ['template', 'deck', 'one-pager'],
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

  // Filter entries based on active category
  const getFilteredEntries = (): CatalogEntry[] => {
    if (!activeCategoryData?.contentTypes.length) {
      return entries
    }

    return entries.filter((entry) =>
      activeCategoryData.contentTypes.includes(entry.contentType?.slug?.current || '')
    )
  }

  // Get featured entries (featured flag OR showInUpcoming flag)
  const getFeaturedEntries = (): CatalogEntry[] => {
    const filtered = getFilteredEntries()
    return filtered
      .filter((e) => e.featured || e.showInUpcoming)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .slice(0, 3)
  }

  // Get new entries (last 30 days)
  const getNewEntries = (): CatalogEntry[] => {
    const filtered = getFilteredEntries()
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    return filtered
      .filter((e) => new Date(e.publishDate).getTime() > thirtyDaysAgo)
      .slice(0, 4)
  }

  const filteredEntries = getFilteredEntries()
  const featuredEntries = getFeaturedEntries()
  const newEntries = getNewEntries()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section - Gladly Design */}
      <div className="bg-[#252525] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📚</span>
            <h1 className="text-[28px] leading-[32px] tracking-[-0.01em] font-bold">
              Content Hub
            </h1>
          </div>
          <p className="text-[15px] leading-[24px] text-gray-300 max-w-2xl">
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
        {/* Featured Section - Always Visible */}
        {featuredEntries.length > 0 && (
          <HubSection
            title="⭐ Featured & New"
            description="Recently added and hand-picked content"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEntries.map((entry) => (
                <div key={entry._id} className="bg-white border border-[#DFDFDF] rounded-lg p-5 hover:border-[#009B00] hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white"
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
                  <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-[13px] leading-[20px] text-[#252525] mb-3 line-clamp-2">
                    {entry.description}
                  </p>
                  <a
                    href={`/catalog/${entry.slug.current}`}
                    className="inline-flex items-center text-[13px] leading-[20px] font-semibold text-[#009B00] hover:text-[#008000]"
                  >
                    View Content →
                  </a>
                </div>
              ))}
            </div>
          </HubSection>
        )}

        {/* New Resources Section - Always Visible */}
        {newEntries.length > 0 && (
          <HubSection
            title="🆕 New Resources"
            description={`${newEntries.length} new in the last 30 days`}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newEntries.map((entry) => (
                <div key={entry._id} className="bg-white border border-[#DFDFDF] rounded-lg p-4 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <span
                    className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white mb-2"
                    style={{ backgroundColor: entry.contentType?.color || '#8C69F0' }}
                  >
                    {entry.contentType?.name}
                  </span>
                  <h3 className="text-[15px] leading-[24px] font-semibold text-[#0D0D0D] mb-1 line-clamp-2">
                    {entry.title}
                  </h3>
                  <p className="text-[12px] leading-[16px] text-[#252525]">
                    {new Date(entry.publishDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </HubSection>
        )}

        {/* Category Description - Changes per Button */}
        {activeCategoryData && activeCategoryData.id !== 'all' && (
          <HubSection className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-[#DFDFDF] border-l-4 border-l-[#009B00] rounded-lg p-6">
              <h2 className="text-[18px] leading-[24px] font-semibold tracking-[-0.005em] text-[#0D0D0D] mb-2">
                {activeCategoryData.icon} {activeCategoryData.label}
              </h2>
              <p className="text-[15px] leading-[24px] text-[#252525]">
                {activeCategoryData.id === 'templates' && 'Browse presentation templates, one-pagers, and ready-to-use decks.'}
                {activeCategoryData.id === 'competitive' && 'Competitive intelligence, battle cards, and positioning guides.'}
              </p>
            </div>
          </HubSection>
        )}

        {/* Universal Catalog - Pre-filtered by Active Button */}
        <HubSection
          title="Browse All Resources"
          description={`${filteredEntries.length} resources available`}
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
            entries={filteredEntries}
            availableProducts={availableProducts}
            availableTeams={availableTeams}
            availableTopics={availableTopics}
            availableContentTypes={availableContentTypes}
            availableJourneyStages={availableJourneyStages}
          />
        </HubSection>
      </div>
    </div>
  )
}
