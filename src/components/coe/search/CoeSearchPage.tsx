'use client';

import { useCoeSearch } from '@/hooks/useCoeSearch';
import { SearchInput } from './SearchInput';
import { FilterBar } from './FilterBar';
import { ActiveFilters } from './ActiveFilters';
import { SearchResults } from './SearchResults';
import { useState } from 'react';
import Link from 'next/link';

interface CoeSearchPageProps {
  initialQuery?: string;
  initialFilters?: Record<string, string>;
  showHeader?: boolean;
  className?: string;
}

export function CoeSearchPage({
  showHeader = true,
  className = '',
}: CoeSearchPageProps) {
  const [resultsLayout, setResultsLayout] = useState<'grid' | 'list' | 'compact'>(
    'grid'
  );

  const {
    query,
    filters,
    results,
    total,
    facets,
    isLoading,
    error,
    hasMore,
    setQuery,
    setFilter,
    clearFilters,
    loadMore,
  } = useCoeSearch({
    initialLimit: 21,
    syncUrl: true,
  });

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      {showHeader && (
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/coe" className="hover:text-purple-600">
                CoE Hub
              </Link>
              <span>/</span>
              <span className="text-gray-900">Search</span>
            </nav>

            {/* Search Input */}
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search best practices, proof points, tools, customer assets..."
              size="lg"
              isLoading={isLoading && !results.length}
              autoFocus
            />

            <p className="text-sm mt-2 text-gray-400">
              Press{' '}
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono">
                ⌘K
              </kbd>{' '}
              or{' '}
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono">
                /
              </kbd>{' '}
              to search anywhere
            </p>
          </div>
        </header>
      )}

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <FilterBar
            filters={filters}
            facets={facets}
            onFilterChange={setFilter}
            onClearFilters={clearFilters}
          />
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Active Filters & Layout Toggle */}
        <div className="flex items-center justify-between mb-6">
          <ActiveFilters
            filters={filters}
            facets={facets}
            onRemoveFilter={(key) => setFilter(key, undefined)}
            onClearAll={clearFilters}
          />

          {/* Layout Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setResultsLayout('grid')}
              className={`p-2 rounded ${
                resultsLayout === 'grid'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200'
              }`}
              title="Grid view"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setResultsLayout('list')}
              className={`p-2 rounded ${
                resultsLayout === 'list'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200'
              }`}
              title="List view"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setResultsLayout('compact')}
              className={`p-2 rounded ${
                resultsLayout === 'compact'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200'
              }`}
              title="Compact view"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Results */}
        <SearchResults
          results={results}
          total={total}
          isLoading={isLoading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
          layout={resultsLayout}
          query={query}
        />
      </main>
    </div>
  );
}
