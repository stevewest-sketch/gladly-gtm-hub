'use client'

import { useState, useMemo } from 'react'
import ButtonNav from '@/components/hub/ButtonNav'
import HubSection from '@/components/hub/HubSection'
import EnablementCard from '@/components/enablement/EnablementCard'
import { CatalogEntry, LearningPath } from '@/lib/types/catalog'

interface EnablementHubClientProps {
  entries: CatalogEntry[]
  learningPaths: LearningPath[]
}

export default function EnablementHubClient({
  entries,
  learningPaths,
}: EnablementHubClientProps) {
  // Add "All Enablements" as the first button
  const allLearningPaths = useMemo(() => {
    return [
      {
        _id: 'all',
        _type: 'learningPath' as const,
        name: 'All Enablements',
        slug: { current: 'all' },
        description: 'Browse all enablement resources',
        icon: '📚',
        color: 'bg-[#009B00]',
        order: 0,
      },
      ...learningPaths,
    ]
  }, [learningPaths])
  const [activeLearningPath, setActiveLearningPath] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title'>('date-desc')
  const itemsPerPage = 12

  // Extract unique audiences and categories
  const availableAudiences = useMemo(() => {
    const audiences = new Set<string>()
    entries.forEach(entry => {
      entry.audiences?.forEach(audience => {
        if (audience.name) audiences.add(audience.name)
      })
    })
    return Array.from(audiences).sort()
  }, [entries])

  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    entries.forEach(entry => {
      entry.enablementCategory?.forEach(cat => {
        categories.add(cat)
      })
    })
    return Array.from(categories).sort()
  }, [entries])

  // Get new enablements (last 30 days)
  const newEnablements = useMemo(() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    return entries
      .filter(e => {
        const publishDate = e.publishDate ? new Date(e.publishDate).getTime() : 0
        return publishDate > thirtyDaysAgo
      })
      .sort((a, b) => {
        const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0
        const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0
        return dateB - dateA
      })
      .slice(0, 4)
  }, [entries])

  // Get featured enablements
  const featuredEnablements = useMemo(() => {
    return entries
      .filter(e => e.featured === true)
      .sort((a, b) => (b.priority || 50) - (a.priority || 50))
      .slice(0, 3)
  }, [entries])

  // Filter entries for catalog
  const filteredEntries = useMemo(() => {
    let filtered = entries

    // Apply learning path filter (skip if 'all')
    if (activeLearningPath !== 'all') {
      filtered = filtered.filter(entry => {
        // Check if entry has this learning path in its learningPaths array
        return entry.learningPaths?.some(lp => lp._id === activeLearningPath)
      })
      // For curated paths, return the filtered results without additional filters
      return filtered
    }

    // Only apply search and sidebar filters when "All Enablements" is active
    // Apply search
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      filtered = filtered.filter(entry => {
        return (
          entry.title.toLowerCase().includes(searchLower) ||
          entry.description?.toLowerCase().includes(searchLower) ||
          entry.keyTakeaways?.some(t => t.toLowerCase().includes(searchLower))
        )
      })
    }

    // Apply audience filters
    if (selectedAudiences.length > 0) {
      filtered = filtered.filter(entry =>
        entry.audiences?.some(a => selectedAudiences.includes(a.name))
      )
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(entry =>
        entry.enablementCategory?.some(cat => selectedCategories.includes(cat))
      )
    }

    return filtered
  }, [entries, activeLearningPath, searchQuery, selectedAudiences, selectedCategories])

  // Sort entries
  const sortedEntries = useMemo(() => {
    const sorted = [...filteredEntries]
    switch (sortBy) {
      case 'date-desc':
        return sorted.sort((a, b) => {
          const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0
          const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0
          return dateB - dateA
        })
      case 'date-asc':
        return sorted.sort((a, b) => {
          const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0
          const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0
          return dateA - dateB
        })
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return sorted
    }
  }, [filteredEntries, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedEntries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedEntries = sortedEntries.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [activeLearningPath, searchQuery, selectedAudiences, selectedCategories])

  // Toggle audience filter
  const toggleAudience = (audience: string) => {
    setSelectedAudiences(prev =>
      prev.includes(audience)
        ? prev.filter(a => a !== audience)
        : [...prev, audience]
    )
  }

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Clear all filters
  const clearAllFilters = () => {
    setActiveLearningPath('all')
    setSearchQuery('')
    setSelectedAudiences([])
    setSelectedCategories([])
  }

  const activeFilterCount =
    (activeLearningPath !== 'all' ? 1 : 0) +
    (activeLearningPath === 'all' && searchQuery ? 1 : 0) +
    (activeLearningPath === 'all' ? selectedAudiences.length : 0) +
    (activeLearningPath === 'all' ? selectedCategories.length : 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Green Brand */}
      <div className="relative bg-gradient-to-br from-[#009B00] via-[#008000] to-[#006B00] text-white py-20 px-4 overflow-hidden">
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
            <span className="text-4xl">🎓</span>
            <h1 className="text-[32px] leading-[38px] tracking-[-0.02em] font-bold">
              Enablement Hub
            </h1>
          </div>
          <p className="text-[17px] leading-[28px] text-green-50 max-w-2xl">
            Your learning center for product enablement, certifications, and skill development.
            Everything you need to master Gladly.
          </p>
        </div>
      </div>

      {/* Button Navigation */}
      <ButtonNav
        buttons={allLearningPaths.map(path => ({
          id: path._id,
          label: path.name,
          icon: path.icon,
          color: path.color,
        }))}
        activeButton={activeLearningPath}
        onButtonChange={setActiveLearningPath}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Section - Only show when "All Enablements" is active */}
        {activeLearningPath === 'all' && featuredEnablements.length > 0 && (
          <HubSection
            title="⭐ Featured Enablements"
            description="Hand-picked enablement resources"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEnablements.map((entry) => (
                <EnablementCard key={entry._id} entry={entry} variant="featured" />
              ))}
            </div>
          </HubSection>
        )}

        {/* New Enablements Section - Only show when "All Enablements" is active */}
        {activeLearningPath === 'all' && newEnablements.length > 0 && (
          <HubSection
            title="🆕 New Enablements"
            description={`${newEnablements.length} new in the last 30 days`}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newEnablements.map((entry) => (
                <EnablementCard key={entry._id} entry={entry} variant="compact" />
              ))}
            </div>
          </HubSection>
        )}

        {/* Catalog Section - Different layouts for "All" vs Curated Paths */}
        <div id="catalog-section" className="scroll-mt-24">
          <HubSection
            title={activeLearningPath === 'all' ? '📖 Browse All Resources' : `${allLearningPaths.find(p => p._id === activeLearningPath)?.icon} ${allLearningPaths.find(p => p._id === activeLearningPath)?.name}`}
            description={activeLearningPath === 'all' ? `${filteredEntries.length} enablement resources available` : allLearningPaths.find(p => p._id === activeLearningPath)?.description}
          >
            {/* Curated Learning Path View - Simple Grid */}
            {activeLearningPath !== 'all' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntries.map((entry) => (
                  <EnablementCard key={entry._id} entry={entry} variant="standard" />
                ))}
              </div>
            )}

            {/* All Enablements View - Full Catalog with Filters */}
            {activeLearningPath === 'all' && (
              <div className="flex gap-8">
              {/* Filters Sidebar */}
              <div className="w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                        {activeFilterCount > 0 && (
                          <span className="px-2 py-0.5 bg-[#009B00] text-white text-xs font-medium rounded-full">
                            {activeFilterCount}
                          </span>
                        )}
                      </div>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-gray-600 hover:text-[#009B00] transition-colors"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {/* Search */}
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search enablements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009B00] focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Active Filters */}
                    {activeFilterCount > 0 && (
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeLearningPath !== 'all' && (
                            <button
                              onClick={() => setActiveLearningPath('all')}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-[#F59E0B] text-white rounded"
                            >
                              {allLearningPaths.find(p => p._id === activeLearningPath)?.name}
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                          {selectedAudiences.map((audience) => (
                            <button
                              key={audience}
                              onClick={() => toggleAudience(audience)}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-[#009B00] text-white rounded"
                            >
                              {audience}
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ))}
                          {selectedCategories.map((category) => (
                            <button
                              key={category}
                              onClick={() => toggleCategory(category)}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-[#8C69F0] text-white rounded"
                            >
                              {category}
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Audience Filter */}
                    {availableAudiences.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Audience</h4>
                        <div className="space-y-2">
                          {availableAudiences.map((audience) => (
                            <label
                              key={audience}
                              className="flex items-center gap-2 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={selectedAudiences.includes(audience)}
                                onChange={() => toggleAudience(audience)}
                                className="w-4 h-4 rounded border-gray-300 text-[#009B00] focus:ring-[#009B00]"
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                {audience}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Category Filter */}
                    {availableCategories.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                        <div className="space-y-2">
                          {availableCategories.map((category) => (
                            <label
                              key={category}
                              className="flex items-center gap-2 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="w-4 h-4 rounded border-gray-300 text-[#8C69F0] focus:ring-[#8C69F0]"
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                {category}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {sortedEntries.length} {sortedEntries.length === 1 ? 'Result' : 'Results'}
                    </h2>
                    {activeFilterCount > 0 && (
                      <p className="text-sm text-gray-600 mt-1">Showing filtered results</p>
                    )}
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#009B00] focus:border-transparent"
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="title">Title (A-Z)</option>
                    </select>
                  </div>
                </div>

                {/* Empty State */}
                {paginatedEntries.length === 0 && (
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
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-[#009B00] hover:text-[#008000] font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                )}

                {/* Results Grid */}
                {paginatedEntries.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {paginatedEntries.map((entry) => (
                        <EnablementCard key={entry._id} entry={entry} variant="standard" />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                                    ? 'bg-[#009B00] text-white'
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
                      Showing {startIndex + 1} - {Math.min(endIndex, sortedEntries.length)} of{' '}
                      {sortedEntries.length} results
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          </HubSection>
        </div>
      </div>
    </div>
  )
}
