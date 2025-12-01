'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useUnifiedSearch } from '@/hooks/useUnifiedSearch';
import { AISearchInput } from '@/components/coe/search/AISearchInput';
import { AISearchResponse } from '@/components/coe/search/AISearchResponse';
import Link from 'next/link';

const suggestions = [
  { icon: 'book', text: 'How do I run a great discovery call?', hub: 'enablement' },
  { icon: 'chart', text: 'Show me proof points about resolution rate', hub: 'coe' },
  { icon: 'tool', text: 'Where is the BVA calculator?', hub: 'coe' },
  { icon: 'lightbulb', text: 'Best practices for Sidekick implementation', hub: 'coe' },
  { icon: 'target', text: 'Competitive battle cards', hub: 'enablement' },
];

export default function UnifiedSearchPage() {
  const [inputValue, setInputValue] = useState('');
  const {
    query,
    filters,
    results,
    total,
    facets,
    aiResponse,
    queryAnalysis,
    isLoading,
    error,
    search,
    setFilter,
    clearFilters,
    clear,
  } = useUnifiedSearch();

  const handleSubmit = (q: string, mode: 'search' | 'ask') => {
    search(q, mode === 'ask' ? 'assistant' : 'search');
  };

  // Get hub-specific URL for result
  const getResultUrl = (result: any) => {
    if (result._hub === 'coe') {
      return `/coe/${result.slug?.current}`;
    }
    return `/catalog/${result.slug?.current}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            Home
          </Link>
          <h1 className="font-semibold text-gray-900">Search Everything</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Search All Hubs
          </h2>
          <p className="text-gray-600">
            Find content across Enablement and CoE in one place
          </p>
        </div>

        <AISearchInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder="Search or ask a question across all content..."
        />

        {/* Suggestions */}
        {!query && !isLoading && (
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3 text-center">Try asking:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(s.text);
                    search(s.text, 'assistant');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <span className="text-gray-700">{s.text}</span>
                  <span className={cn(
                    'px-1.5 py-0.5 rounded text-xs',
                    s.hub === 'coe' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  )}>
                    {s.hub === 'coe' ? 'CoE' : 'Enablement'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters & Results */}
      {(query || isLoading) && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {/* Hub Filter Pills */}
          {facets && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-gray-500">Search in:</span>
              {facets.hubs.map(hub => (
                <button
                  key={hub.value}
                  onClick={() => setFilter('hub', filters.hub === hub.value ? undefined : hub.value as any)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                    filters.hub === hub.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {hub.label}
                  <span className={cn(
                    'ml-1.5 px-1.5 py-0.5 rounded-full text-xs',
                    filters.hub === hub.value ? 'bg-purple-500' : 'bg-gray-200'
                  )}>
                    {hub.count}
                  </span>
                </button>
              ))}

              {Object.keys(filters).length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-purple-600 underline ml-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Entry Type Pills */}
          {facets && facets.entryTypes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {facets.entryTypes
                .filter(t => t.count > 0)
                .filter(t => !filters.hub || t.hub === filters.hub || filters.hub === 'all')
                .map(type => (
                  <button
                    key={type.value}
                    onClick={() => setFilter('type', filters.type === type.value ? undefined : type.value as any)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors',
                      filters.type === type.value
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                    <span className="text-xs text-gray-400">({type.count})</span>
                  </button>
                ))}
            </div>
          )}

          {/* Query Understanding */}
          {queryAnalysis && !isLoading && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Understanding:</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                {queryAnalysis.intent?.replace(/_/g, ' ')}
              </span>
              {queryAnalysis.suggestedHub && queryAnalysis.suggestedHub !== 'all' && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  Suggested: {queryAnalysis.suggestedHub === 'coe' ? 'CoE Hub' : 'Enablement Hub'}
                </span>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* AI Response */}
          {(aiResponse || (isLoading && queryAnalysis?.isQuestion)) && (
            <AISearchResponse
              answer={aiResponse?.answer || ''}
              sources={aiResponse?.sources || []}
              confidence={aiResponse?.confidence || 'low'}
              isLoading={isLoading}
              className="mb-8"
            />
          )}

          {/* Results */}
          {results.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {aiResponse ? 'Related Content' : 'Search Results'}
                <span className="text-gray-400 font-normal ml-2">({total})</span>
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map(result => (
                  <Link
                    key={result._id}
                    href={getResultUrl(result)}
                    className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-purple-200 transition-all group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-2xl">{result.icon}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-xs font-medium',
                          result._hub === 'coe' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        )}>
                          {result._hub === 'coe' ? 'CoE' : 'Enablement'}
                        </span>
                        {result._matchType === 'semantic' && (
                          <span className="text-green-500" title="AI matched">AI</span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {result.title}
                    </h4>

                    {/* Summary/Headline */}
                    {(result.summary) && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {result.summary}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {result.section?.name && (
                        <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
                          {result.section.icon} {result.section.name}
                        </span>
                      )}
                      {result.customer && (
                        <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
                          {result.customer}
                        </span>
                      )}
                      {result.industry?.name && (
                        <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
                          {result.industry.icon} {result.industry.name}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && query && results.length === 0 && !aiResponse && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">Try different keywords or adjust your filters.</p>
              <button
                onClick={() => {
                  clear();
                  setInputValue('');
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
