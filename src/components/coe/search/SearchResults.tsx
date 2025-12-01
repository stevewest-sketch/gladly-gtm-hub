'use client';

import { CoeEntryResult } from '@/types/search';
import Link from 'next/link';

interface SearchResultsProps {
  results: CoeEntryResult[];
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  layout?: 'grid' | 'list' | 'compact';
  query?: string;
  className?: string;
}

const entryTypeIcons: Record<string, string> = {
  'best-practice': '📋',
  'process-innovation': '💡',
  'internal-best-practice': '🏢',
  'proof-point': '📊',
  tool: '🛠️',
  'meeting-asset': '📁',
};

export function SearchResults({
  results,
  total,
  isLoading,
  error,
  hasMore,
  onLoadMore,
  layout = 'grid',
  query,
  className = '',
}: SearchResultsProps) {
  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }

  if (!isLoading && results.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No results found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {query
            ? `We couldn't find anything matching "${query}". Try different keywords or adjust your filters.`
            : "Try adjusting your filters to find what you're looking for."}
        </p>
      </div>
    );
  }

  const layoutClasses = {
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
    list: 'divide-y divide-gray-100',
    compact: 'space-y-1',
  };

  return (
    <div className={className}>
      {/* Results Count */}
      <div className="text-sm text-gray-500 mb-4">
        {total > 0 && (
          <>
            Showing {results.length} of {total} result{total !== 1 ? 's' : ''}
            {query && (
              <>
                {' '}
                for &quot;
                <span className="font-medium text-gray-700">{query}</span>&quot;
              </>
            )}
          </>
        )}
      </div>

      {/* Results Grid/List */}
      <div className={layoutClasses[layout]}>
        {results.map((entry) => (
          <ResultCard key={entry._id} entry={entry} layout={layout} />
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-3 text-gray-500">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </div>
        </div>
      )}

      {/* Load More */}
      {!isLoading && hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Load more results
          </button>
        </div>
      )}
    </div>
  );
}

interface ResultCardProps {
  entry: CoeEntryResult;
  layout: 'grid' | 'list' | 'compact';
}

function ResultCard({ entry, layout }: ResultCardProps) {
  const href = `/coe/entry/${entry.slug?.current || entry._id}`;

  if (layout === 'compact') {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg">{entryTypeIcons[entry.entryType]}</span>
        <span className="font-medium text-gray-900 truncate">{entry.title}</span>
        {entry.customer && (
          <span className="text-sm text-gray-500 truncate">{entry.customer}</span>
        )}
      </Link>
    );
  }

  if (layout === 'list') {
    return (
      <Link
        href={href}
        className="flex items-start gap-4 py-4 hover:bg-gray-50 px-2 -mx-2 rounded-lg transition-colors"
      >
        <span className="text-2xl">{entryTypeIcons[entry.entryType]}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{entry.title}</h3>
          {(entry.summary || entry.headline) && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {entry.summary || entry.headline}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
            {entry.coeSection && (
              <span className="flex items-center gap-1">
                {entry.coeSection.icon} {entry.coeSection.name}
              </span>
            )}
            {entry.customer && <span>{entry.customer}</span>}
          </div>
        </div>
        {entry.featured && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
            Featured
          </span>
        )}
      </Link>
    );
  }

  // Grid layout (card)
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-purple-200 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{entryTypeIcons[entry.entryType]}</span>
        {entry.featured && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
            ⭐ Featured
          </span>
        )}
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
        {entry.title}
      </h3>

      {(entry.summary || entry.headline) && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {entry.summary || entry.headline}
        </p>
      )}

      <div className="flex flex-wrap gap-2 text-xs">
        {entry.coeSection && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {entry.coeSection.icon} {entry.coeSection.name}
          </span>
        )}
        {entry.customer && (
          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
            {entry.customer}
          </span>
        )}
        {entry.industry && (
          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full">
            {entry.industry.icon} {entry.industry.name}
          </span>
        )}
      </div>
    </Link>
  );
}
