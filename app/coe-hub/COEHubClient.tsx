'use client'

import { useState } from 'react'
import ButtonNav from '@/components/hub/ButtonNav'
import HubSection from '@/components/hub/HubSection'
import StatGrid from '@/components/hub/StatGrid'
import FeatureCard from '@/components/hub/FeatureCard'
import ProcessSteps from '@/components/hub/ProcessSteps'
import UniversalCatalogSection from '@/components/hub/UniversalCatalogSection'
import { CatalogEntry, Product, Team, Topic } from '@/lib/types/catalog'
import { PortableText } from '@portabletext/react'

interface HubData {
  _id: string
  title: string
  hero: {
    icon: string
    title: string
    subtitle: string
    backgroundColor: string
  }
  buttons: Array<{
    id: string
    label: string
    icon: string
    color: string
    catalogFilter: {
      coeCategory?: string[]
    }
    sections: any[]
  }>
  showCatalog: boolean
  catalogTitle: string
}

interface COEHubClientProps {
  hubData: HubData
  catalogEntries: CatalogEntry[]
  availableProducts: Product[]
  availableTeams: Team[]
  availableTopics: Topic[]
}

export default function COEHubClient({
  hubData,
  catalogEntries,
  availableProducts,
  availableTeams,
  availableTopics,
}: COEHubClientProps) {
  const [activeButton, setActiveButton] = useState(hubData.buttons[0]?.id || 'overview')
  const [resourceTab, setResourceTab] = useState('All Resources')

  const activeButtonData = hubData.buttons.find(b => b.id === activeButton)

  // Filter catalog entries by active button's coeCategory
  const getFilteredCatalogEntries = () => {
    const filter = activeButtonData?.catalogFilter
    if (!filter?.coeCategory || filter.coeCategory.length === 0) {
      return catalogEntries
    }

    return catalogEntries.filter((entry) => {
      const entryCategories = entry.coeCategory || []
      return filter.coeCategory?.some(cat => entryCategories.includes(cat))
    })
  }

  // Get featured entries (featured flag OR showInUpcoming flag)
  const getFeaturedEntries = (): CatalogEntry[] => {
    const filtered = getFilteredCatalogEntries()
    return filtered
      .filter((e) => e.featured || e.showInUpcoming)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .slice(0, 3)
  }

  // Get new entries (last 30 days)
  const getNewEntries = (): CatalogEntry[] => {
    const filtered = getFilteredCatalogEntries()
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    return filtered
      .filter((e) => new Date(e.publishDate).getTime() > thirtyDaysAgo)
      .slice(0, 4)
  }

  // Render a section based on its type
  const renderSection = (section: any) => {
    console.log('Rendering section:', section._type, 'with key:', section._key, 'title:', section.title)
    switch (section._type) {
      case 'hubStatGridSection':
        return (
          <HubSection
            key={section._key}
            title={section.title}
            description={section.description}
            transparent={section.transparent}
          >
            <StatGrid
              stats={section.stats}
              columns={section.columns}
              styleVariant={section.styleVariant}
              accentColor={section.accentColor}
            />
          </HubSection>
        )

      case 'hubFeatureCardsSection':
        return (
          <HubSection
            key={section._key}
            title={section.title}
            description={section.description}
            className={section.title === 'CoE Resource Library' ? 'bg-gray-50' : ''}
            transparent={section.transparent}
          >
            {/* Tabs if showTabs is true */}
            {section.showTabs && section.tabs && (
              <div className="flex gap-3 mb-8 pb-4 border-b-2 border-gray-300 flex-wrap">
                {section.tabs.map((tab: string) => (
                  <button
                    key={tab}
                    onClick={() => setResourceTab(tab)}
                    className={`px-5 py-2.5 rounded text-sm font-semibold transition-all ${
                      resourceTab === tab
                        ? 'bg-purple-600 text-white'
                        : 'bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Feature Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-${section.columns || 3} gap-6`}>
              {(section.showTabs && resourceTab !== 'All Resources'
                ? section.cards.filter((card: any) => card.tag === resourceTab)
                : section.cards
              ).map((card: any) => (
                <FeatureCard
                  key={card._key}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  meta={card.meta}
                  cta={card.cta}
                  link={card.link}
                  tag={card.tag}
                  tagColor={card.tagColor}
                  iconStyle={card.iconStyle}
                  iconBadgeColor={card.iconBadgeColor}
                />
              ))}
            </div>
          </HubSection>
        )

      case 'hubProcessStepsSection':
        return (
          <HubSection
            key={section._key}
            title={section.title}
            description={section.description}
            transparent={section.transparent}
          >
            <ProcessSteps
              steps={section.steps}
              columns={section.columns}
              variant={section.variant}
              accentColor={section.accentColor}
              elevation={section.elevation}
            />
          </HubSection>
        )

      case 'hubContentSection':
        // Special handling for CoE Assistant section
        if (section._key === 'coe-assistant') {
          return (
            <HubSection
              key={section._key}
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Meet Your CoE Assistant</h2>
                  <p className="mb-6 opacity-95">Your AI-powered research tool that gives instant access to institutional knowledge across best practices, proof points, and past projects.</p>
                  <ul className="list-none mb-6 space-y-3">
                    {[
                      'Query our entire knowledge base with conversational AI',
                      'Find reference materials across our teams instantly',
                      'Get instant answers to specific implementation questions',
                      'Access customer case studies and success metrics',
                      'Locate custom code for prospects and customers'
                    ].map((item, i) => (
                      <li key={i} className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:font-bold">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {section.cta && (
                    <a
                      href={section.cta.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-purple-600 px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-purple-50 hover:scale-102 transition-all duration-200"
                    >
                      {section.cta.text}
                    </a>
                  )}
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-6 hover:bg-opacity-15 transition-all duration-200">
                  <h4 className="text-base font-semibold mb-3">Example Query</h4>
                  <p className="text-sm mb-3 opacity-95">
                    <strong>You:</strong> "How does good quality in an AI prompt improve Sidekick performance?"
                  </p>
                  <p className="text-sm opacity-95 leading-relaxed">
                    <strong>CoE Assistant:</strong> "Based on our analysis of 33 accounts, good quality in prompts is absolutely critical to Sidekick's ability to learn, scale, and deliver optimal results..."
                  </p>
                </div>
              </div>
            </HubSection>
          )
        }

        // Special handling for BVA Overview section
        if (section._key === 'bva-overview') {
          return (
            <HubSection
              key={section._key}
              title={section.title}
              description={section.description}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Quantify Gladly's financial impact through value-based discovery and structured business cases—from early messaging to full ROI models.
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Three-level framework:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 text-lg font-bold">101</span>
                      </div>
                      <div className="flex-1 pt-2">
                        <span className="text-gray-900 font-semibold">Value messaging & metrics</span>
                        <p className="text-gray-600 text-sm mt-1">Lead with key capabilities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 text-lg font-bold">201</span>
                      </div>
                      <div className="flex-1 pt-2">
                        <span className="text-gray-900 font-semibold">Value hypothesis</span>
                        <p className="text-gray-600 text-sm mt-1">Quantify high-level opportunity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 text-lg font-bold">301</span>
                      </div>
                      <div className="flex-1 pt-2">
                        <span className="text-gray-900 font-semibold">Detailed business case</span>
                        <p className="text-gray-600 text-sm mt-1">Discovery + benchmarks + data</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Proven impact:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="text-3xl font-bold mb-1">40%</div>
                      <div className="text-xs opacity-90">Higher win rate</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="text-3xl font-bold mb-1">$500K+</div>
                      <div className="text-xs opacity-90">Avg value shown</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="text-3xl font-bold mb-1">15%</div>
                      <div className="text-xs opacity-90">Deal size uplift</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="text-3xl font-bold mb-1">30 min</div>
                      <div className="text-xs opacity-90">Quick analysis</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Tools Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="group bg-white border border-[#F3F3F3] rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#8C69F0] transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-2xl" style={{ backgroundColor: '#F5F3FF' }}>
                      📊
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Pre-Sales BVA</h3>
                      <p className="text-sm text-purple-600 font-semibold">For Prospects</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">Build compelling business cases early in the sales cycle—before the deal is closed</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
                    <p className="font-semibold mb-2 text-gray-900">Best for:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Early deal cycle conversations</li>
                      <li>• Building financial justification</li>
                      <li>• Competitive evaluations</li>
                    </ul>
                  </div>
                  <a href="/coe/bva" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200">
                    Explore BVA Playbook →
                  </a>
                </div>

                <div className="group bg-white border border-[#F3F3F3] rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#F97316] transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-2xl" style={{ backgroundColor: '#FFF7ED' }}>
                      🎯
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">ROI Calculator</h3>
                      <p className="text-sm font-semibold" style={{ color: '#F97316' }}>For Customers</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">Demonstrate actual value delivered using real Sidekick performance data</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
                    <p className="font-semibold mb-2 text-gray-900">Best for:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Renewal conversations</li>
                      <li>• Quarterly business reviews</li>
                      <li>• Upsell opportunities</li>
                    </ul>
                  </div>
                  <a href="/coe/bva" className="block w-full text-white text-center py-3 rounded-lg font-semibold transition-all duration-200" style={{ backgroundColor: '#F97316' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EA580C'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F97316'}>
                    Access ROI Tools →
                  </a>
                </div>
              </div>
            </HubSection>
          )
        }

        // Generic content section rendering
        return (
          <HubSection
            key={section._key}
            title={section.title}
            description={section.description}
            background={section.background}
            className={section.customClassName}
            transparent={section.transparent}
          >
            {section.content && <PortableText value={section.content} />}
          </HubSection>
        )

      case 'ctaSection':
        return (
          <div key={section._key} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-12 text-center mt-8">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl text-gray-900 font-bold mb-3">Submit Your Wins in Slack!</h2>
            <p className="text-base text-gray-700 mb-6">
              Type <code className="bg-white bg-opacity-80 px-2 py-1 rounded text-purple-600 font-mono font-semibold">/coe</code> to access the form
            </p>
            <button className="inline-block bg-purple-600 text-white px-8 py-3.5 rounded font-semibold text-base hover:bg-purple-700 transition-all">
              Tips for Submitting
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <div className={`${hubData.hero.backgroundColor} text-white py-16 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">{hubData.hero.icon}</span>
            <h1 className="text-5xl font-bold">{hubData.hero.title}</h1>
          </div>
          <p className="text-xl text-yellow-100 max-w-3xl">
            {hubData.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Button Navigation */}
      <ButtonNav
        buttons={hubData.buttons.map(b => ({
          id: b.id,
          label: b.label,
          icon: b.icon,
          color: b.color,
        }))}
        activeButton={activeButton}
        onButtonChange={setActiveButton}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Resources Tab - Content Hub Style Layout */}
        {activeButton === 'resources' ? (
          <>
            {/* Featured Section */}
            {getFeaturedEntries().length > 0 && (
              <HubSection
                title="⭐ Featured & New"
                description="Recently added and hand-picked content"
                className="mb-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getFeaturedEntries().map((entry) => (
                    <div key={entry._id} className="bg-white border border-[#DFDFDF] rounded-lg p-5 hover:border-[#F59E0B] hover:shadow-lg transition-all duration-200">
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
                        href={entry.externalUrl || `/catalog/${entry.slug.current}`}
                        target={entry.externalUrl ? '_blank' : undefined}
                        rel={entry.externalUrl ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center text-[13px] leading-[20px] font-semibold text-[#F59E0B] hover:text-[#D97706]"
                      >
                        {entry.externalUrl ? 'Open Link' : 'View Content'} →
                      </a>
                    </div>
                  ))}
                </div>
              </HubSection>
            )}

            {/* New Resources Section */}
            {getNewEntries().length > 0 && (
              <HubSection
                title="🆕 New Resources"
                description={`${getNewEntries().length} new in the last 30 days`}
                className="mb-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getNewEntries().map((entry) => (
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

            {/* Universal Catalog */}
            <HubSection
              title="Browse All Resources"
              description={`${getFilteredCatalogEntries().length} resources available`}
            >
              <UniversalCatalogSection
                title=""
                description=""
                pageType="coe-hub"
                defaultFilters={{}}
                showFilters={true}
                filterOptions={['product', 'team', 'topic']}
                layout="grid"
                sortBy="priority"
                itemsPerPage={12}
                cardStyle="standard"
                entries={getFilteredCatalogEntries()}
                availableProducts={availableProducts}
                availableTeams={availableTeams}
                availableTopics={availableTopics}
              />
            </HubSection>
          </>
        ) : (
          /* Other Tabs - Dynamic Sanity Sections */
          <>
            {activeButtonData?.sections.map((section) => renderSection(section))}
          </>
        )}
      </div>
    </div>
  )
}
