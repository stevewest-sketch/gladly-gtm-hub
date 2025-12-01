'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  SearchFilters,
  SearchResponse,
  SearchFacets,
  CoeEntryResult,
} from '@/types/search';
import { useDebouncedCallback } from 'use-debounce';

interface UseCoeSearchOptions {
  initialLimit?: number;
  syncUrl?: boolean;
}

interface UseCoeSearchReturn {
  query: string;
  filters: SearchFilters;
  results: CoeEntryResult[];
  total: number;
  facets: SearchFacets | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  setQuery: (query: string) => void;
  setFilter: (key: keyof SearchFilters, value: string | undefined) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  loadMore: () => void;
  refresh: () => void;
}

const defaultFacets: SearchFacets = {
  entryTypes: [],
  sections: [],
  channels: [],
  industries: [],
  audiences: [],
};

export function useCoeSearch(
  options: UseCoeSearchOptions = {}
): UseCoeSearchReturn {
  const { initialLimit = 20, syncUrl = true } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getInitialFilters = (): SearchFilters => {
    if (!syncUrl) return {};

    const filters: SearchFilters = {};

    if (searchParams.get('q')) filters.q = searchParams.get('q')!;
    if (searchParams.get('type')) filters.type = searchParams.get('type')!;
    if (searchParams.get('section'))
      filters.section = searchParams.get('section')!;
    if (searchParams.get('channel'))
      filters.channel = searchParams.get('channel')!;
    if (searchParams.get('capability'))
      filters.capability = searchParams.get('capability')!;
    if (searchParams.get('audience'))
      filters.audience = searchParams.get('audience')!;
    if (searchParams.get('industry'))
      filters.industry = searchParams.get('industry')!;
    if (searchParams.get('product'))
      filters.product = searchParams.get('product')!;
    if (searchParams.get('proofType'))
      filters.proofType = searchParams.get('proofType')!;
    if (searchParams.get('permission'))
      filters.permission = searchParams.get('permission')!;
    if (searchParams.get('sort'))
      filters.sort = searchParams.get('sort') as SearchFilters['sort'];

    return filters;
  };

  const [filters, setFiltersState] = useState<SearchFilters>(getInitialFilters);
  const [results, setResults] = useState<CoeEntryResult[]>([]);
  const [total, setTotal] = useState(0);
  const [facets, setFacets] = useState<SearchFacets | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const buildSearchParams = useCallback(
    (filters: SearchFilters): URLSearchParams => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      return params;
    },
    []
  );

  const syncFiltersToUrl = useCallback(
    (filters: SearchFilters) => {
      if (!syncUrl) return;

      const params = buildSearchParams(filters);
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(newUrl, { scroll: false });
    },
    [syncUrl, pathname, router, buildSearchParams]
  );

  const fetchResults = useCallback(
    async (
      filters: SearchFilters,
      currentOffset: number,
      append: boolean = false
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters.q) params.set('q', filters.q);
        if (filters.type) params.set('type', filters.type);
        if (filters.section) params.set('section', filters.section);
        if (filters.channel) params.set('channel', filters.channel);
        if (filters.capability) params.set('capability', filters.capability);
        if (filters.audience) params.set('audience', filters.audience);
        if (filters.industry) params.set('industry', filters.industry);
        if (filters.product) params.set('product', filters.product);
        if (filters.proofType) params.set('proofType', filters.proofType);
        if (filters.permission) params.set('permission', filters.permission);
        if (filters.sort) params.set('sort', filters.sort);
        params.set('limit', String(initialLimit));
        params.set('offset', String(currentOffset));

        const response = await fetch(`/api/coe/search?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data: SearchResponse = await response.json();

        setResults((prev) =>
          append ? [...prev, ...data.results] : data.results
        );
        setTotal(data.total);
        setFacets(data.facets);
        setHasMore(data.pagination.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setIsLoading(false);
      }
    },
    [initialLimit]
  );

  const debouncedSearch = useDebouncedCallback((filters: SearchFilters) => {
    setOffset(0);
    fetchResults(filters, 0);
    syncFiltersToUrl(filters);
  }, 300);

  const setQuery = useCallback(
    (query: string) => {
      const newFilters = { ...filters, q: query || undefined };
      setFiltersState(newFilters);
      debouncedSearch(newFilters);
    },
    [filters, debouncedSearch]
  );

  const setFilter = useCallback(
    (key: keyof SearchFilters, value: string | undefined) => {
      const newFilters = { ...filters, [key]: value };

      if (!value) {
        delete newFilters[key];
      }

      setFiltersState(newFilters);
      setOffset(0);
      fetchResults(newFilters, 0);
      syncFiltersToUrl(newFilters);
    },
    [filters, fetchResults, syncFiltersToUrl]
  );

  const setFilters = useCallback(
    (newFilters: Partial<SearchFilters>) => {
      const merged = { ...filters, ...newFilters };

      Object.keys(merged).forEach((key) => {
        if (!merged[key as keyof SearchFilters]) {
          delete merged[key as keyof SearchFilters];
        }
      });

      setFiltersState(merged);
      setOffset(0);
      fetchResults(merged, 0);
      syncFiltersToUrl(merged);
    },
    [filters, fetchResults, syncFiltersToUrl]
  );

  const clearFilters = useCallback(() => {
    setFiltersState({});
    setOffset(0);
    fetchResults({}, 0);
    syncFiltersToUrl({});
  }, [fetchResults, syncFiltersToUrl]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    const newOffset = offset + initialLimit;
    setOffset(newOffset);
    fetchResults(filters, newOffset, true);
  }, [isLoading, hasMore, offset, initialLimit, filters, fetchResults]);

  const refresh = useCallback(() => {
    setOffset(0);
    fetchResults(filters, 0);
  }, [filters, fetchResults]);

  useEffect(() => {
    fetchResults(filters, 0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    query: filters.q || '',
    filters,
    results,
    total,
    facets,
    isLoading,
    error,
    hasMore,
    setQuery,
    setFilter,
    setFilters,
    clearFilters,
    loadMore,
    refresh,
  };
}
