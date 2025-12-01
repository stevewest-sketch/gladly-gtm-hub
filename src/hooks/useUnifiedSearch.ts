'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  UnifiedSearchResult,
  UnifiedSearchFilters,
  UnifiedSearchFacets,
  AISearchResponse,
} from '@/types/unified-search';

interface UseUnifiedSearchReturn {
  // State
  query: string;
  filters: UnifiedSearchFilters;
  results: UnifiedSearchResult[];
  total: number;
  facets: UnifiedSearchFacets | null;
  aiResponse: AISearchResponse | null;
  queryAnalysis: any;
  isLoading: boolean;
  error: string | null;

  // Actions
  search: (query: string, mode: 'search' | 'assistant') => Promise<void>;
  setFilter: (key: keyof UnifiedSearchFilters, value: string | undefined) => void;
  clearFilters: () => void;
  clear: () => void;
}

export function useUnifiedSearch(syncUrl = true): UseUnifiedSearchReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse initial state from URL
  const getInitialFilters = (): UnifiedSearchFilters => {
    if (!syncUrl) return {};
    const filters: UnifiedSearchFilters = {};
    if (searchParams.get('hub')) filters.hub = searchParams.get('hub') as any;
    if (searchParams.get('type')) filters.type = searchParams.get('type') as any;
    if (searchParams.get('section')) filters.section = searchParams.get('section')!;
    if (searchParams.get('channel')) filters.channel = searchParams.get('channel')!;
    if (searchParams.get('industry')) filters.industry = searchParams.get('industry')!;
    if (searchParams.get('audience')) filters.audience = searchParams.get('audience')!;
    return filters;
  };

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<UnifiedSearchFilters>(getInitialFilters);
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [facets, setFacets] = useState<UnifiedSearchFacets | null>(null);
  const [aiResponse, setAiResponse] = useState<AISearchResponse | null>(null);
  const [queryAnalysis, setQueryAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync to URL
  const syncToUrl = useCallback((q: string, f: UnifiedSearchFilters) => {
    if (!syncUrl) return;
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    Object.entries(f).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [syncUrl, pathname, router]);

  // Main search function
  const search = useCallback(async (searchQuery: string, mode: 'search' | 'assistant') => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setIsLoading(true);
    setError(null);
    if (mode === 'search') setAiResponse(null);

    syncToUrl(searchQuery, filters);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          mode: mode === 'assistant' ? 'assistant' : 'search',
          filters,
          limit: 30,
        }),
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();

      setResults(data.results || []);
      setTotal(data.total || 0);
      setFacets(data.facets || null);
      setQueryAnalysis(data.queryAnalysis || null);
      if (data.aiResponse) setAiResponse(data.aiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, syncToUrl]);

  // Set individual filter
  const setFilter = useCallback((key: keyof UnifiedSearchFilters, value: string | undefined) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value as any;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);

    // Re-search if we have a query
    if (query) {
      syncToUrl(query, newFilters);
      // Trigger new search with updated filters
      fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode: 'search', filters: newFilters, limit: 30 }),
      })
        .then(res => res.json())
        .then(data => {
          setResults(data.results || []);
          setTotal(data.total || 0);
          setFacets(data.facets || null);
        })
        .catch(console.error);
    }
  }, [filters, query, syncToUrl]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
    if (query) {
      syncToUrl(query, {});
    }
  }, [query, syncToUrl]);

  // Clear everything
  const clear = useCallback(() => {
    setQuery('');
    setFilters({});
    setResults([]);
    setTotal(0);
    setAiResponse(null);
    setQueryAnalysis(null);
    setError(null);
    if (syncUrl) router.push(pathname);
  }, [syncUrl, pathname, router]);

  return {
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
  };
}
