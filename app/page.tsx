'use client';

import { useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import { AISummary } from '@/components/search/AISummary';
import type {
  UnifiedSearchResponse,
  UnifiedSearchResult,
  UnifiedSearchFilters,
} from '@/src/types/unified-search';

type ViewMode = 'list' | 'grid';

function HomeContent() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [response, setResponse] = useState<UnifiedSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<UnifiedSearchFilters>({
    hub: (searchParams.get('hub') as UnifiedSearchFilters['hub']) || 'all',
    type: (searchParams.get('type') as UnifiedSearchFilters['type']) || 'all',
  });
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());
  const INITIAL_SHOW_COUNT = 3;

  // Load view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('search-view-mode') as ViewMode;
    if (savedViewMode && (savedViewMode === 'list' || savedViewMode === 'grid')) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode to localStorage
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('search-view-mode', mode);
  };

  const performSearch = useCallback(async (searchQuery: string, searchFilters: UnifiedSearchFilters) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setResponse(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          filters: searchFilters,
          mode: 'search',
          limit: 50,
        }),
      });

      if (!res.ok) throw new Error('Search failed');

      const data: UnifiedSearchResponse = await res.json();
      setResults(data.results);
      setResponse(data);
      setExpandedTypes(new Set()); // Reset expanded groups on new search
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useDebouncedCallback((q: string, f: UnifiedSearchFilters) => {
    performSearch(q, f);
  }, 300);

  // Focus search on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('main-search-input');
        searchInput?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search on mount if query exists
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      performSearch(q, filters);
    }
  }, []);

  // Search when query or filters change
  useEffect(() => {
    debouncedSearch(query, filters);
  }, [query, filters, debouncedSearch]);

  const getResultUrl = (result: UnifiedSearchResult) => {
    if (result._hub === 'coe') {
      return `/coe-hub/${result.slug?.current || result._id}`;
    }
    if (result._hub === 'content') {
      const link = (result as any).link;
      if (link) {
        if (link.startsWith('/')) return link;
        return link;
      }
      if (result._type === 'enablementArticle') {
        return `/enablement/articles/${result.slug?.current || result._id}`;
      }
      return `/content-hub/${result.slug?.current || result._id}`;
    }
    return `/catalog/${result.slug?.current || result._id}`;
  };

  const isExternalLink = (result: UnifiedSearchResult) => {
    const link = (result as any).link;
    return link && !link.startsWith('/') && (link.startsWith('http://') || link.startsWith('https://'));
  };

  const getHubBadge = (hub: string) => {
    const styles: Record<string, string> = {
      coe: 'bg-purple-100 text-purple-700 border-purple-200',
      enablement: 'bg-blue-100 text-blue-700 border-blue-200',
      content: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    const labels: Record<string, string> = {
      coe: 'CoE Hub',
      enablement: 'Enablement',
      content: 'Content Hub',
    };
    return (
      <span className={`px-2 py-0.5 text-xs rounded-full border ${styles[hub] || 'bg-gray-100'}`}>
        {labels[hub] || hub}
      </span>
    );
  };

  const getTypeBadge = (result: UnifiedSearchResult) => {
    const type = result.entryType || result.category || result._type;
    const styles: Record<string, string> = {
      'proof-point': 'bg-green-50 text-green-700',
      'best-practice': 'bg-amber-50 text-amber-700',
      'process-innovation': 'bg-cyan-50 text-cyan-700',
      'meeting-asset': 'bg-pink-50 text-pink-700',
      'training': 'bg-indigo-50 text-indigo-700',
      'resource': 'bg-slate-50 text-slate-700',
      'competitive': 'bg-red-50 text-red-700',
      'article': 'bg-orange-50 text-orange-700',
    };
    return (
      <span className={`px-2 py-0.5 text-xs rounded ${styles[type] || 'bg-gray-50 text-gray-600'}`}>
        {type?.replace(/-/g, ' ')}
      </span>
    );
  };

  // Type metadata for grouping
  const typeMetadata: Record<string, { label: string; icon: string; color: string }> = {
    'proof-point': { label: 'Proof Points', icon: '📊', color: 'border-green-200 bg-green-50' },
    'best-practice': { label: 'Best Practices', icon: '✨', color: 'border-amber-200 bg-amber-50' },
    'process-innovation': { label: 'Process Innovation', icon: '⚡', color: 'border-cyan-200 bg-cyan-50' },
    'meeting-asset': { label: 'Meeting Assets', icon: '📋', color: 'border-pink-200 bg-pink-50' },
    'training': { label: 'Training', icon: '📚', color: 'border-indigo-200 bg-indigo-50' },
    'resource': { label: 'Resources', icon: '📁', color: 'border-slate-200 bg-slate-50' },
    'competitive': { label: 'Competitive Intel', icon: '🎯', color: 'border-red-200 bg-red-50' },
    'article': { label: 'Articles', icon: '📰', color: 'border-orange-200 bg-orange-50' },
  };

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, UnifiedSearchResult[]> = {};
    results.forEach(result => {
      const type = result.entryType || result.category || 'other';
      if (!groups[type]) groups[type] = [];
      groups[type].push(result);
    });
    // Sort groups by count (descending)
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [results]);

  const toggleTypeExpanded = (type: string) => {
    setExpandedTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  // Render a single result card (shared between views)
  const renderResultCard = (result: UnifiedSearchResult, compact = false) => {
    const url = getResultUrl(result);
    const external = isExternalLink(result);
    const ResultWrapper = external ? 'a' : Link;
    const extraProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    if (compact) {
      return (
        <ResultWrapper
          key={result._id}
          href={url}
          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
          {...extraProps}
        >
          {result.icon && <span className="text-lg shrink-0">{result.icon}</span>}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-purple-700 transition-colors">
              {result.title}
              {external && <span className="ml-1 text-gray-400 text-xs">↗</span>}
            </h4>
            {result.customer && (
              <span className="text-xs text-gray-500">{result.customer}</span>
            )}
          </div>
          {getHubBadge(result._hub)}
        </ResultWrapper>
      );
    }

    return (
      <ResultWrapper
        key={result._id}
        href={url}
        className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all"
        {...extraProps}
      >
        <div className="flex items-start gap-3">
          {result.icon && <span className="text-xl shrink-0 mt-0.5">{result.icon}</span>}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
              {result.title}
              {external && <span className="ml-1 text-gray-400 text-sm">↗</span>}
            </h3>
            {result.summary && result.summary !== result.title && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{result.summary}</p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {getHubBadge(result._hub)}
              {(result as any).competitor && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  vs {(result as any).competitor}
                </span>
              )}
              {result.customer && (
                <span className="text-xs text-gray-500">Customer: {result.customer}</span>
              )}
              {result.industry?.name && (
                <span className="text-xs text-gray-500">{result.industry.icon} {result.industry.name}</span>
              )}
            </div>
          </div>
        </div>
      </ResultWrapper>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Dark Gradient Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Title & Description - First */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">GTM Hub</h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Your central hub for selling, supporting, and growing with Gladly.
            </p>
          </div>

          {/* Hub CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <Link
              href="/coe-hub"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#009B00]/50 rounded-xl p-6 transition-all no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#009B00] transition-colors">CoE Hub</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Centers of Excellence resources and best practices for customer success.
              </p>
            </Link>

            <Link
              href="/content-hub"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#009B00]/50 rounded-xl p-6 transition-all no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#009B00] transition-colors">Content Hub</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Sales content, decks, one-pagers, and customer-facing resources.
              </p>
            </Link>

            <Link
              href="/enablement-hub"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#009B00]/50 rounded-xl p-6 transition-all no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#009B00] transition-colors">Enablement Hub</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Training sessions, learning paths, and skill-building resources.
              </p>
            </Link>
          </div>

          {/* Search Input - Just the bar */}
          <div className="relative max-w-3xl mx-auto">
            <input
              id="main-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for battle cards, proof points, training, competitive intel... or ask a question"
              className="w-full px-5 py-4 pr-24 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#009B00]/50 text-lg"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {loading ? (
                <div className="w-6 h-6 border-2 border-gray-300 border-t-[#009B00] rounded-full animate-spin" />
              ) : (
                <kbd className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded border border-gray-200">
                  {'\u2318'}K
                </kbd>
              )}
            </div>
          </div>

          {/* Hub Filters - Below search */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-3xl mx-auto pb-6">
            {['all', 'coe', 'enablement', 'content'].map((hub) => (
              <button
                key={hub}
                onClick={() => setFilters((f) => ({ ...f, hub: hub as UnifiedSearchFilters['hub'] }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.hub === hub
                    ? 'bg-[#009B00] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {hub === 'all' ? 'All Hubs' : hub === 'coe' ? 'CoE Hub' : hub === 'enablement' ? 'Enablement' : 'Content Hub'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-6 py-8 overflow-hidden">
        {/* AI Response Loading State */}
        {loading && query && (
          <div className="mb-8 rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20" />
                <div>
                  <div className="h-4 w-24 bg-white/30 rounded mb-1" />
                  <div className="h-3 w-32 bg-white/20 rounded" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            </div>
          </div>
        )}

        {/* AI Response */}
        {!loading && response?.aiResponse && (
          <AISummary aiResponse={response.aiResponse} />
        )}

        {/* Meta info */}
        {response && query && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {response.total} results for &quot;<span className="font-medium">{query}</span>&quot;
              {response.meta.cached && <span className="text-xs text-gray-400 ml-2">(cached)</span>}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">{response.meta.took}ms</p>
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="List view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="Grid view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Facets */}
        {response?.facets && response.facets.entryTypes.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilters((f) => ({ ...f, type: 'all' }))}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filters.type === 'all'
                  ? 'bg-gray-900 text-white font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Types
            </button>
            {response.facets.entryTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilters((f) => ({ ...f, type: type.value as UnifiedSearchFilters['type'] }))}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filters.type === type.value
                    ? 'bg-gray-900 text-white font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.icon} {type.label} ({type.count})
              </button>
            ))}
          </div>
        )}

        {/* Results - Grouped by Type */}
        {results.length > 0 ? (
          <div className="space-y-6">
            {groupedResults.map(([type, typeResults]) => {
              const meta = typeMetadata[type] || { label: type.replace(/-/g, ' '), icon: '📄', color: 'border-gray-200 bg-gray-50' };
              const isExpanded = expandedTypes.has(type);
              const displayResults = isExpanded ? typeResults : typeResults.slice(0, INITIAL_SHOW_COUNT);
              const hasMore = typeResults.length > INITIAL_SHOW_COUNT;

              return (
                <div key={type} className={`rounded-xl border ${meta.color} overflow-hidden`}>
                  {/* Group Header */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{meta.icon}</span>
                      <h3 className="font-semibold text-gray-900">{meta.label}</h3>
                      <span className="text-sm text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">
                        {typeResults.length} {typeResults.length === 1 ? 'result' : 'results'}
                      </span>
                    </div>
                    {hasMore && (
                      <button
                        onClick={() => toggleTypeExpanded(type)}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            Show less
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Show all {typeResults.length}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Results */}
                  <div className="px-4 pb-4">
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {displayResults.map(result => renderResultCard(result, false))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {displayResults.map(result => renderResultCard(result, true))}
                      </div>
                    )}

                    {/* Collapsed indicator */}
                    {!isExpanded && hasMore && (
                      <button
                        onClick={() => toggleTypeExpanded(type)}
                        className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 bg-white/60 hover:bg-white rounded-lg border border-dashed border-gray-300 transition-colors"
                      >
                        + {typeResults.length - INITIAL_SHOW_COUNT} more {meta.label.toLowerCase()}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : query && !loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-2">No results found</p>
            <p className="text-gray-400 text-sm">Try different keywords or adjust your filters</p>
          </div>
        ) : !query ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Search across 200+ items in Enablement, CoE, and Content Hubs
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Fallback loading state for Suspense
function HomeLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#009B00] via-[#008000] to-[#006B00] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12 w-64 bg-white/20 rounded-lg mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 w-96 bg-white/20 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="h-14 bg-white/10 rounded-xl animate-pulse"></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="h-8 w-32 bg-gray-200 rounded mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
