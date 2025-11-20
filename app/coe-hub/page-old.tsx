'use client'

import { useState } from 'react'
import ButtonNav from '@/components/hub/ButtonNav'
import HubSection from '@/components/hub/HubSection'
import StatGrid from '@/components/hub/StatGrid'
import FeatureCard from '@/components/hub/FeatureCard'
import ProcessSteps from '@/components/hub/ProcessSteps'
import UniversalCatalogSection from '@/components/hub/UniversalCatalogSection'
import { mockCatalogEntries, mockProducts, mockTeams, mockTopics, mockContentTypes, mockIndustries, mockJourneyStages } from '@/lib/data/mockCatalogData'

export default function COEHubPage() {
  const [activeButton, setActiveButton] = useState('overview')
  const [resourceTab, setResourceTab] = useState('All Resources')

  const buttons = [
    { id: 'overview', label: 'Overview', icon: '⭐', color: 'bg-[#F59E0B]' },
    { id: 'bva', label: 'BVA', icon: '💰', color: 'bg-yellow-600' },
    { id: 'proof-points', label: 'Proof Points', icon: '🏆', color: 'bg-orange-600' },
    { id: 'resources', label: 'Resources', icon: '📚', color: 'bg-amber-600' },
  ]

  const getFilterForButton = () => {
    switch (activeButton) {
      case 'proof-points':
        return { coeCategory: ['proof-points'] }
      case 'resources':
        return { coeCategory: ['templates', 'best-practices'] }
      case 'bva':
        return { coeCategory: ['bva'] }
      default:
        return {}
    }
  }

  // Resource tabs
  const resourceTabs = ['All Resources', 'Best Practices', 'Dashboards', 'Implementation', 'Troubleshooting', 'Templates', 'Chat Optimization']

  // Mock resource data
  const resources = [
    {
      title: 'Chat Optimization Mastery',
      desc: "Complete guide to achieving 90% FCR in chat based on Ulta's journey and proven strategies from high-performing customers.",
      tag: 'Chat Optimization',
      meta: 'Path to 90% FCR',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.x15qpd8k7ww0'
    },
    {
      title: 'Email Channel Excellence',
      desc: 'Thread management, WISMO integration, and optimization strategies that drive exceptional email performance.',
      tag: 'Best Practices',
      meta: 'Launch to 70%+ FCR',
      cta: 'View Guide →'
    },
    {
      title: 'Real CX Metrics Framework',
      desc: 'Measuring customer experience effectively with metrics that actually matter to business outcomes.',
      tag: 'Best Practices',
      meta: 'What to measure',
      cta: 'View Framework →'
    },
    {
      icon: '🚀',
      title: 'Rapid Value Realization Guide',
      desc: "Customer success patterns showing how top performers achieve 30%+ resolution in first 30 days. Includes timelines, benchmarks, and proven strategies.",
      tag: 'Implementation',
      meta: '15 min read',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.hou5gyam9uco'
    },
    {
      icon: '📈',
      title: 'Daily Optimization Patterns',
      desc: 'How top performers sustain 70-90% resolution through consistent daily investment. Actual routines from Ulta (89.9% FCR), La Jolla Group (57%), and more.',
      tag: 'Best Practices',
      meta: '12 min read',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.t4y35o22uw75'
    },
    {
      title: 'Cross-Org Guides Dashboard',
      desc: 'Cross-organizational view of Guides performance across multiple teams and implementations for benchmarking and insights.',
      tag: 'Dashboards',
      cta: 'View Dashboard →',
      link: 'https://gladly.looker.com/dashboards/4218'
    },
    {
      icon: '📋',
      title: 'QBR Template',
      desc: 'Quarterly business review structure for customer success conversations including performance analysis, optimization opportunities, and expansion planning.',
      tag: 'Templates',
      cta: 'Download Template →'
    },
    {
      icon: '📊',
      title: 'Performance Review Framework',
      desc: 'Weekly and monthly performance review structure with key metrics, diagnostic questions, and action planning template.',
      tag: 'Templates',
      cta: 'Download Template →'
    },
  ]

  const filteredResources = resourceTab === 'All Resources'
    ? resources
    : resources.filter(r => r.tag === resourceTab)

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">⭐</span>
            <h1 className="text-5xl font-bold">Center of Excellence</h1>
          </div>
          <p className="text-xl text-yellow-100 max-w-3xl">
            Where customer wins become repeatable success. Discover proven strategies, benchmark performance, and accelerate AI adoption.
          </p>
        </div>
      </div>

      {/* Button Navigation */}
      <ButtonNav
        buttons={buttons}
        activeButton={activeButton}
        onButtonChange={setActiveButton}
      />

      {/* Curated Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Button */}
        {activeButton === 'overview' && (
          <>
            {/* CoE Assistant */}
            <HubSection className="bg-gradient-to-r from-purple-600 to-purple-500 text-white mb-8">
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
                  <a
                    href="https://gemini.google.com/gem/1Ni5NH8lMDJ7v_FCN6DdLo2irtn56cLJW?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-purple-600 px-8 py-3.5 rounded font-semibold text-base border-2 border-white hover:bg-opacity-90 transition-all"
                  >
                    Access CoE Assistant →
                  </a>
                </div>
                <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-6">
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

            {/* Quick Stats */}
            <HubSection title="CoE at a Glance" description="Impact across our organization">
              <StatGrid
                stats={[
                  { value: '150+', label: 'Success Stories', color: 'border-yellow-500', icon: '🏆' },
                  { value: '89.9%', label: 'Highest FCR Achieved', color: 'border-orange-500', icon: '📊' },
                  { value: '200+', label: 'Resources Available', color: 'border-amber-500', icon: '📚' },
                  { value: '40%', label: 'Higher Win Rate with BVA', color: 'border-yellow-600', icon: '💰' },
                ]}
              />
            </HubSection>

            {/* How CoE Works */}
            <HubSection title="How CoE Works" description="Our systematic approach to capturing and distributing success" className="mt-8">
              <ProcessSteps
                steps={[
                  {
                    icon: '🔍',
                    title: '1. Discover & Identify',
                    description: 'We continuously monitor customer implementations, identify breakthrough wins, and document innovative solutions that deliver exceptional results.'
                  },
                  {
                    icon: '💡',
                    title: '2. Extract Insights',
                    description: "Through data analysis and customer interviews, we extract the specific actions, configurations, and strategies that made the difference. We identify what's repeatable."
                  },
                  {
                    icon: '📦',
                    title: '3. Package & Publish',
                    description: 'We transform insights into actionable guides, playbooks, and best practices. Every resource is tested, approved for use, and made instantly accessible to the entire team.'
                  }
                ]}
              />
            </HubSection>

            {/* Submit Your Wins CTA */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-12 text-center mt-8">
              <div className="text-5xl mb-4">🏆</div>
              <h2 className="text-2xl text-gray-900 font-bold mb-3">Submit Your Wins in Slack!</h2>
              <p className="text-base text-gray-700 mb-6">
                Type <code className="bg-white bg-opacity-80 px-2 py-1 rounded text-purple-600 font-mono font-semibold">/coe</code> to access the form
              </p>
              <button className="inline-block bg-purple-600 text-white px-8 py-3.5 rounded font-semibold text-base hover:bg-purple-700 transition-all">
                Tips for Submitting
              </button>
            </div>
          </>
        )}

        {/* BVA Button */}
        {activeButton === 'bva' && (
          <>
            {/* BVA Overview */}
            <HubSection
              title="Business Value Analysis Playbook"
              description="Quantify the impact of Gladly Sidekick. Build compelling business cases that win deals and prove ROI."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Quantify Gladly's financial impact through value-based discovery and structured business cases—from early messaging to full ROI models.
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Three-level framework:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 text-xl mt-0.5">101</span>
                      <span className="text-gray-700"><strong>Value messaging & metrics</strong> — Lead with key capabilities</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 text-xl mt-0.5">201</span>
                      <span className="text-gray-700"><strong>Value hypothesis</strong> — Quantify high-level opportunity</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 text-xl mt-0.5">301</span>
                      <span className="text-gray-700"><strong>Detailed business case</strong> — Discovery + benchmarks + data</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Proven impact:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">40%</div>
                      <div className="text-xs opacity-90">Higher win rate</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">$500K+</div>
                      <div className="text-xs opacity-90">Avg value shown</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">15%</div>
                      <div className="text-xs opacity-90">Deal size uplift</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">30 min</div>
                      <div className="text-xs opacity-90">Quick analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </HubSection>

            {/* Two Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gray-100 rounded-full p-3">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Pre-Sales BVA</h3>
                    <p className="text-sm text-purple-600 font-semibold">For Prospects</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">Build compelling business cases early in the sales cycle—before the deal is closed</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
                  <p className="font-semibold mb-2">Best for:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Early deal cycle conversations</li>
                    <li>• Building financial justification</li>
                    <li>• Competitive evaluations</li>
                  </ul>
                </div>
                <a href="/coe/bva" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all">
                  Explore BVA Playbook →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-pink-50 rounded-full p-3">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ROI Calculator</h3>
                    <p className="text-sm text-pink-600 font-semibold">For Customers</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">Demonstrate actual value delivered using real Sidekick performance data</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
                  <p className="font-semibold mb-2">Best for:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Renewal conversations</li>
                    <li>• Quarterly business reviews</li>
                    <li>• Upsell opportunities</li>
                  </ul>
                </div>
                <a href="/coe/bva" className="block w-full bg-pink-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-pink-700 transition-all">
                  Access ROI Tools →
                </a>
              </div>
            </div>

            {/* BVA Levels */}
            <HubSection title="Choose Your BVA Level" description="Match your analysis to your available prospect data" className="bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-purple-600 px-3 py-1 rounded-full font-bold text-sm">101</span>
                    <h3 className="text-lg font-bold">Quick Estimate</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">⏱️ 15 min | 📊 Minimal data</p>
                  <p className="text-sm text-gray-700">Total volume + one CPC</p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-purple-600 px-3 py-1 rounded-full font-bold text-sm">201</span>
                    <h3 className="text-lg font-bold">Channel Analysis</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">⏱️ 30-45 min | 📊 Moderate data</p>
                  <p className="text-sm text-gray-700">Volume by channel + CPC + handle times</p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-purple-600 px-3 py-1 rounded-full font-bold text-sm">301</span>
                    <h3 className="text-lg font-bold">Full ROI Model</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">⏱️ 1-2 hours | 📊 Detailed data</p>
                  <p className="text-sm text-gray-700">All 201 + agent costs + revenue + 3-year projections</p>
                </div>
              </div>
            </HubSection>
          </>
        )}

        {/* Proof Points Button */}
        {activeButton === 'proof-points' && (
          <>
            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <a
                href="https://docs.google.com/spreadsheets/d/1Y0n1rVskWIzWcegwCbfP7YUXkjV58TFf5S7LLxMkFNA/edit?gid=1725734072#gid=1725734072"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-500 hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline"
              >
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Proof Point Repository</h4>
                <p className="text-sm text-gray-600 mb-4">Customer proof points: only use externally approved stats for written or verbal use! All proof points are tagged with permission status.</p>
                <span className="text-green-600 font-semibold text-sm">Access Repository →</span>
              </a>
              <a
                href="https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit?usp=drive_open&ouid=102926403603073320356"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-500 hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline"
              >
                <div className="text-4xl mb-3">💬</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Social Proof Templates</h4>
                <p className="text-sm text-gray-600 mb-4">Customer stories and testimonials formatted for different use cases: presentations, proposals, case studies, and website content.</p>
                <span className="text-green-600 font-semibold text-sm">View Templates →</span>
              </a>
            </div>

            {/* Latest Customer Wins */}
            <HubSection title="Latest Customer Wins" description="Recent success stories and breakthrough results">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  icon="📊"
                  title="89.9% FCR"
                  description="Leading outdoor retailer achieves industry-best First Contact Resolution with Sidekick Guides"
                  meta="Key to Success: 3-5 days onboarding cadence with stakeholder role clarity"
                  cta="Read More →"
                />
                <FeatureCard
                  icon="📈"
                  title="28% → 57%"
                  description="Leading beauty retailer's AI adoption journey from skeptical to market-leading engagement"
                  meta="Key to Success: Phased rollout with continuous A/B testing"
                  cta="Read More →"
                />
                <FeatureCard
                  icon="💬"
                  title="77% Email Automation"
                  description="Fully-featured automation in less than 6 weeks from Sidekick Email pilot launch"
                  meta="Key to Success: Smart consolidation of 6 tech stack tools"
                  cta="Read More →"
                />
              </div>
            </HubSection>
          </>
        )}

        {/* Resources Button */}
        {activeButton === 'resources' && (
          <>
            <HubSection title="CoE Resource Library" description="Proven templates, guides, and playbooks organized for your needs" className="bg-gray-50">
              {/* Tabs */}
              <div className="flex gap-3 mb-8 pb-4 border-b-2 border-gray-300 flex-wrap">
                {resourceTabs.map((tab) => (
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

              {/* Resource Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredResources.map((resource, idx) => (
                  <FeatureCard
                    key={idx}
                    icon={resource.icon}
                    title={resource.title}
                    description={resource.desc}
                    meta={resource.meta}
                    cta={resource.cta}
                    link={resource.link}
                    tag={resource.tag}
                  />
                ))}
              </div>
            </HubSection>
          </>
        )}
      </div>

      {/* Universal Catalog Section */}
      <UniversalCatalogSection
        title={`Browse All ${buttons.find(b => b.id === activeButton)?.label} Resources`}
        description="Use filters to find exactly what you need"
        pageType="coe-hub"
        defaultFilters={getFilterForButton()}
        showFilters={true}
        filterOptions={['product', 'team', 'topic', 'date']}
        layout="grid"
        sortBy="priority"
        itemsPerPage={12}
        cardStyle="standard"
        entries={mockCatalogEntries}
        availableProducts={mockProducts}
        availableTeams={mockTeams}
        availableTopics={mockTopics}
        availableIndustries={mockIndustries}
        availableJourneyStages={mockJourneyStages}
        availableContentTypes={mockContentTypes}
      />
    </div>
  )
}
