'use client'

import { useState, useEffect } from 'react'
import { CatalogViewProps, CatalogEntry, CatalogFilters } from '@/lib/types/catalog'
import { matchesFilters, sortEntries, getRecentEntries, mergeFilters } from '@/lib/utils/catalogFilters'
import FilterPanel from './FilterPanel'
import CatalogCard from './CatalogCard'

export default function CatalogView({
  pageType,
  pageContext,
  defaultFilters = {},
  showFilters = true,
  filterOptions = ['contentType', 'product', 'team', 'topic'],
  layout = 'grid',
  sortBy = 'date-desc',
  itemsPerPage = 12,
  cardStyle = 'standard',
  showDuration = false,
  showPresenter = false,
  featuredSection = false,
  featuredCount = 3,
  featuredFilter,
  featuredLayout = 'horizontal-strip',
  featuredTitle = 'Featured',
  entries = [],
  // Taxonomy data for filters (extract from entries if not provided)
  availableProducts,
  availableTeams,
  availableTopics,
  availableJourneyStages,
  availableIndustries,
  availableCompetitors,
  availableContentTypes,
}: CatalogViewProps) {
  const [userFilters, setUserFilters] = useState<CatalogFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Merge page filters with user filters
  const combinedFilters = mergeFilters(defaultFilters, userFilters)

  // Apply filters
  const filteredEntries = entries.filter((entry) =>
    matchesFilters(entry, combinedFilters)
  )

  // Sort entries
  const sortedEntries = sortEntries(filteredEntries, sortBy)

  // Featured entries (if enabled)
  let featuredEntries: CatalogEntry[] = []
  let mainEntries = sortedEntries

  if (featuredSection) {
    let candidateEntries = entries

    // Apply featured filter
    if (featuredFilter?.showInUpcoming) {
      candidateEntries = candidateEntries.filter((e) => e.showInUpcoming === true)
    }

    if (featuredFilter?.daysRecent) {
      candidateEntries = getRecentEntries(candidateEntries, featuredFilter.daysRecent)
    }

    // Take featured count
    featuredEntries = candidateEntries.slice(0, featuredCount)

    // Remove featured entries from main list
    const featuredIds = new Set(featuredEntries.map((e) => e._id))
    mainEntries = sortedEntries.filter((e) => !featuredIds.has(e._id))
  }

  // Pagination
  const totalPages = Math.ceil(mainEntries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedEntries = mainEntries.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [userFilters])

  // Grid class based on layout
  const getGridClass = (layoutType: typeof layout) => {
    switch (layoutType) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      case 'list':
        return 'flex flex-col gap-4'
      case 'horizontal-strip':
        return 'flex gap-6 overflow-x-auto pb-4'
      case 'featured-grid':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6'
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    }
  }

  return (
    <div className="space-y-8">
      {/* Featured Section */}
      {featuredSection && featuredEntries.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{featuredTitle}</h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              {featuredEntries.length} {featuredEntries.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className={getGridClass(featuredLayout)}>
            {featuredEntries.map((entry) => (
              <CatalogCard
                key={entry._id}
                entry={entry}
                variant="featured"
                showDuration={showDuration}
                showPresenter={showPresenter}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterPanel
                filters={userFilters}
                onFiltersChange={setUserFilters}
                filterOptions={filterOptions}
                availableProducts={availableProducts}
                availableTeams={availableTeams}
                availableTopics={availableTopics}
                availableJourneyStages={availableJourneyStages}
                availableIndustries={availableIndustries}
                availableCompetitors={availableCompetitors}
                availableContentTypes={availableContentTypes}
                showSearch={true}
                showClearAll={true}
              />
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredEntries.length} {filteredEntries.length === 1 ? 'Result' : 'Results'}
              </h2>
              {Object.keys(userFilters).length > 0 && (
                <p className="text-sm text-gray-600 mt-1">Showing filtered results</p>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  // In a real implementation, this would update the sort prop
                  console.log('Sort changed to:', e.target.value)
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8C69F0] focus:border-transparent"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="priority">Priority</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8C69F0]"></div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && paginatedEntries.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search query
              </p>
              {Object.keys(userFilters).length > 0 && (
                <button
                  onClick={() => setUserFilters({})}
                  className="text-[#8C69F0] hover:text-[#7C59D0] font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Content Grid */}
          {!isLoading && paginatedEntries.length > 0 && (
            <>
              <div className={getGridClass(layout)}>
                {paginatedEntries.map((entry) => (
                  <CatalogCard
                    key={entry._id}
                    entry={entry}
                    variant={cardStyle}
                    showDuration={showDuration}
                    showPresenter={showPresenter}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first, last, current, and adjacent pages
                      const shouldShow =
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1

                      if (!shouldShow && page === currentPage - 2) {
                        return (
                          <span key={page} className="px-2 text-gray-500">
                            ...
                          </span>
                        )
                      }

                      if (!shouldShow && page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-gray-500">
                            ...
                          </span>
                        )
                      }

                      if (!shouldShow) return null

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-[#8C69F0] text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Results Info */}
              <div className="text-center mt-4 text-sm text-gray-600">
                Showing {startIndex + 1} - {Math.min(endIndex, mainEntries.length)} of{' '}
                {mainEntries.length} results
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
