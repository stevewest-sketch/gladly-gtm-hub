'use client'

import { useState } from 'react'
import CatalogView from '@/components/catalog/CatalogView'
import {
  mockCatalogEntries,
  mockProducts,
  mockTeams,
  mockTopics,
  mockContentTypes,
  mockJourneyStages,
} from '@/lib/data/mockCatalogData'

export default function CatalogDemoPage() {
  const [viewMode, setViewMode] = useState<'all' | 'training' | 'competitive' | 'templates'>('all')

  // Configure filters based on view mode
  const getFiltersForMode = () => {
    switch (viewMode) {
      case 'training':
        return {
          contentTypes: ['contenttype-training', 'contenttype-elearning'],
        }
      case 'competitive':
        return {
          contentTypes: ['contenttype-competitive'],
        }
      case 'templates':
        return {
          contentTypes: ['contenttype-template'],
        }
      default:
        return {}
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8C69F0] to-[#2563EB] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <h1 className="text-4xl md:text-5xl font-bold">
              Universal Catalog Demo
            </h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Experience the new unified enablement system with multi-tag filtering,
            where ANY asset can appear on ANY page based on intelligent taxonomies.
          </p>

          {/* Demo Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{mockCatalogEntries.length}</div>
              <div className="text-purple-100 text-sm">Total Resources</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{mockProducts.length}</div>
              <div className="text-purple-100 text-sm">Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{mockTeams.length}</div>
              <div className="text-purple-100 text-sm">Teams</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{mockTopics.length}</div>
              <div className="text-purple-100 text-sm">Topics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ What You're Seeing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                🏷️
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Multi-Tag Filtering</h3>
                <p className="text-sm text-gray-600">
                  Filter by products, teams, topics, and more. Each entry can have multiple tags.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                🔄
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Universal Placement</h3>
                <p className="text-sm text-gray-600">
                  Same content appears in multiple hubs based on its tags automatically.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Features</h3>
                <p className="text-sm text-gray-600">
                  Featured content, "Just Released", sorting, search, and pagination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎛️ Simulate Different Hub Views
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            These buttons simulate how the catalog would be pre-filtered on different hub pages:
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'all'
                  ? 'bg-[#8C69F0] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setViewMode('training')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'training'
                  ? 'bg-[#2563EB] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎓 Training Hub View
            </button>
            <button
              onClick={() => setViewMode('competitive')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'competitive'
                  ? 'bg-[#DC2626] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚔️ Competitive Hub View
            </button>
            <button
              onClick={() => setViewMode('templates')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'templates'
                  ? 'bg-[#059669] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📄 Templates View
            </button>
          </div>
        </div>

        {/* Catalog View */}
        <CatalogView
          pageType="demo"
          defaultFilters={getFiltersForMode()}
          showFilters={true}
          filterOptions={[
            'contentType',
            'format',
            'product',
            'team',
            'topic',
            'journeyStage',
          ]}
          layout="grid"
          sortBy="date-desc"
          itemsPerPage={9}
          cardStyle="standard"
          showDuration={true}
          showPresenter={true}
          featuredSection={true}
          featuredCount={2}
          featuredFilter={{
            showInUpcoming: true,
            daysRecent: 7,
          }}
          featuredLayout="featured-grid"
          featuredTitle="🔥 Just Released"
          entries={mockCatalogEntries}
          availableProducts={mockProducts}
          availableTeams={mockTeams}
          availableTopics={mockTopics}
          availableJourneyStages={mockJourneyStages}
          availableContentTypes={mockContentTypes}
        />
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            🚀 Next Steps
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>✅ Phase 1 & 2 Complete:</strong> All schemas and components are built and working!
            </p>
            <p>
              <strong>📋 Coming Next:</strong> We'll integrate this system into your actual hub pages (Training, COE, Content, Customer Lifecycle)
            </p>
            <p>
              <strong>🎨 Try It Out:</strong> Use the filters on the left, try different view modes above, test search, sorting, and pagination
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-purple-200">
            <h4 className="font-semibold text-gray-900 mb-2">Key Features to Test:</h4>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
              <li>✓ Multi-select product filtering (try Sidekick + Hero)</li>
              <li>✓ Team filtering (Sales, CS, Marketing)</li>
              <li>✓ Topic filtering (Demo, Discovery, Competitive)</li>
              <li>✓ Search within results</li>
              <li>✓ Sort by date, title, priority</li>
              <li>✓ Featured "Just Released" section</li>
              <li>✓ Active filter chips with remove</li>
              <li>✓ Pagination for large result sets</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
