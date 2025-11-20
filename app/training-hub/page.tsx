'use client'

import { useState } from 'react'
import ButtonNav from '@/components/hub/ButtonNav'
import CuratedSection from '@/components/hub/CuratedSection'
import UniversalCatalogSection from '@/components/hub/UniversalCatalogSection'
import { mockCatalogEntries, mockProducts, mockTeams, mockTopics, mockContentTypes, mockJourneyStages } from '@/lib/data/mockCatalogData'

export default function TrainingHubPage() {
  const [activeButton, setActiveButton] = useState('all')

  const buttons = [
    { id: 'all', label: 'All Training', icon: '🎓', color: 'bg-[#2563EB]' },
    { id: 'live', label: 'Live Replays', icon: '🎥', color: 'bg-purple-600' },
    { id: 'elearning', label: 'E-Learning', icon: '📚', color: 'bg-[#7C3AED]' },
    { id: 'by-product', label: 'By Product', icon: '🎯', color: 'bg-green-600' },
  ]

  const getFilterForButton = () => {
    const baseFilter = {
      contentTypes: ['contenttype-training', 'contenttype-elearning'],
    }

    switch (activeButton) {
      case 'live':
        return { ...baseFilter, format: 'live-replay' }
      case 'elearning':
        return { ...baseFilter, format: 'async' }
      case 'by-product':
        return baseFilter
      default:
        return baseFilter
    }
  }

  const trainingEntries = mockCatalogEntries.filter(e =>
    e.contentType.slug.current === 'training' || e.contentType.slug.current === 'elearning'
  )
  const liveReplays = trainingEntries.filter(e => e.format === 'live-replay')
  const elearning = trainingEntries.filter(e => e.format === 'async')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🎓</span>
            <h1 className="text-5xl font-bold">Training Hub</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Your central destination for all learning content - live training replays,
            e-learning courses, and certifications.
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
        {/* All Training View */}
        {activeButton === 'all' && (
          <>
            <CuratedSection
              title="📊 Training at a Glance"
              description="Quick stats about available training content"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                  <div className="text-3xl font-bold text-gray-900">{trainingEntries.length}</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                  <div className="text-3xl font-bold text-gray-900">{liveReplays.length}</div>
                  <div className="text-sm text-gray-600">Live Replays</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500">
                  <div className="text-3xl font-bold text-gray-900">{elearning.length}</div>
                  <div className="text-sm text-gray-600">E-Learning</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                  <div className="text-3xl font-bold text-gray-900">{mockProducts.length}</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
              </div>
            </CuratedSection>

            <CuratedSection title="⭐ Popular Topics">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockTopics.slice(0, 4).map((topic) => (
                  <div
                    key={topic._id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
                  >
                    <div className="text-2xl mb-2">📌</div>
                    <div className="font-semibold text-gray-900">{topic.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {trainingEntries.filter(e => e.topics?.some(t => t._id === topic._id)).length} sessions
                    </div>
                  </div>
                ))}
              </div>
            </CuratedSection>
          </>
        )}

        {/* Live Replays View */}
        {activeButton === 'live' && (
          <>
            <CuratedSection
              title="🎥 Live Training Replays"
              description="Watch recordings of live sessions with product experts"
            >
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6 border border-purple-200">
                <h3 className="font-bold text-gray-900 mb-3">What are Live Replays?</h3>
                <p className="text-gray-700">
                  These are recordings of interactive training sessions led by product experts.
                  You'll see real demos, Q&A, and practical examples.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {liveReplays.slice(0, 3).map((entry) => (
                  <a
                    key={entry._id}
                    href={`/catalog/${entry.slug.current}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all group border border-gray-200 hover:border-purple-500"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <svg className="w-16 h-16 text-purple-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{entry.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{entry.duration} min</span>
                        {entry.presenter && <span>• {entry.presenter}</span>}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </CuratedSection>
          </>
        )}

        {/* E-Learning View */}
        {activeButton === 'elearning' && (
          <>
            <CuratedSection
              title="📚 Self-Paced E-Learning"
              description="Learn on your own schedule with interactive courses"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    Learning Paths
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Structured courses designed to take you from beginner to expert
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white rounded p-3 text-sm">
                      <div className="font-medium">Sidekick Fundamentals</div>
                      <div className="text-gray-500">5 courses • 2.5 hours</div>
                    </div>
                    <div className="bg-white rounded p-3 text-sm">
                      <div className="font-medium">Advanced Hero Features</div>
                      <div className="text-gray-500">3 courses • 1.5 hours</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🏆</span>
                    Certifications
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Earn certifications to validate your product expertise
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white rounded p-3 text-sm">
                      <div className="font-medium">Gladly Sales Certified</div>
                      <div className="text-gray-500">6 modules • Exam required</div>
                    </div>
                    <div className="bg-white rounded p-3 text-sm">
                      <div className="font-medium">CS Expert Certification</div>
                      <div className="text-gray-500">8 modules • Exam required</div>
                    </div>
                  </div>
                </div>
              </div>
            </CuratedSection>
          </>
        )}

        {/* By Product View */}
        {activeButton === 'by-product' && (
          <>
            <CuratedSection
              title="🎯 Training by Product"
              description="Find training specific to the products you sell"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockProducts.map((product) => {
                  const productTraining = trainingEntries.filter(e =>
                    e.products?.some(p => p._id === product._id)
                  )
                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200 hover:border-[#8C69F0] transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: product.color }}
                      >
                        {product.name[0]}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          {productTraining.length}
                        </span>
                        <span className="text-sm text-gray-500">training sessions</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CuratedSection>
          </>
        )}
      </div>

      {/* Universal Catalog Section */}
      <UniversalCatalogSection
        title={`Browse All ${buttons.find(b => b.id === activeButton)?.label} Resources`}
        description="Use filters to find exactly what you need"
        pageType="training-hub"
        defaultFilters={getFilterForButton()}
        showFilters={true}
        filterOptions={['format', 'product', 'topic', 'team', 'date', 'journeyStage']}
        layout="grid"
        sortBy="date-desc"
        itemsPerPage={12}
        cardStyle="training"
        showDuration={true}
        showPresenter={true}
        entries={mockCatalogEntries}
        availableProducts={mockProducts}
        availableTeams={mockTeams}
        availableTopics={mockTopics}
        availableJourneyStages={mockJourneyStages}
        availableContentTypes={mockContentTypes}
      />
    </div>
  )
}
