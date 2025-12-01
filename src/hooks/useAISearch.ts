'use client';

import { useState, useCallback } from 'react';
import { CoeEntry } from '@/types/coe';

interface AISource {
  id: string;
  title: string;
  slug: string;
  type: string;
  relevance: number;
}

interface AIResponse {
  answer: string;
  sources: AISource[];
  confidence: 'high' | 'medium' | 'low';
}

interface QueryAnalysis {
  intent: string;
  entities: Record<string, string[]>;
  keywords: string[];
  isQuestion: boolean;
  reformulatedQuery: string;
}

export function useAISearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CoeEntry[]>([]);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [queryAnalysis, setQueryAnalysis] = useState<QueryAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (searchQuery: string, mode: 'search' | 'ask') => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setIsLoading(true);
    setError(null);

    // Clear AI response when starting new search
    if (mode === 'search') {
      setAiResponse(null);
    }

    try {
      const response = await fetch('/api/coe/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          mode: mode === 'ask' ? 'assistant' : 'hybrid',
          limit: 20,
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      setResults(data.results || []);
      setQueryAnalysis(data.queryAnalysis);

      if (data.aiResponse) {
        setAiResponse(data.aiResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setAiResponse(null);
    setQueryAnalysis(null);
    setError(null);
  }, []);

  return {
    query,
    results,
    aiResponse,
    queryAnalysis,
    isLoading,
    error,
    search,
    clear,
  };
}
