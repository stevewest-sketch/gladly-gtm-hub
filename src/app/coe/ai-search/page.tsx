'use client';

import { useState } from 'react';
import { useAISearch } from '@/hooks/useAISearch';
import { AISearchInput } from '@/components/coe/search/AISearchInput';
import { AISearchResponse } from '@/components/coe/search/AISearchResponse';
import { CoeEntryCard } from '@/components/coe/CoeEntryCard';
import Link from 'next/link';

const suggestions = [
  { icon: 'chart', text: 'Show me proof points about resolution rate' },
  { icon: 'target', text: 'Best practices for Sidekick implementation' },
  { icon: 'chat', text: 'Customer quotes about AI chat' },
  { icon: 'trophy', text: 'Recent customer success stories in retail' },
];

export default function AISearchPage() {
  const [inputValue, setInputValue] = useState('');
  const {
    query,
    results,
    aiResponse,
    queryAnalysis,
    isLoading,
    error,
    search,
    clear,
  } = useAISearch();

  const handleSubmit = (q: string, mode: 'search' | 'ask') => {
    search(q, mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/coe" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            <span>Back to Hub</span>
          </Link>
          <h1 className="font-semibold text-gray-900">AI Search</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Ask anything about the CoE
          </h2>
          <p className="text-gray-600">
            Search for content or ask questions in natural language
          </p>
        </div>

        <AISearchInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder="Search or ask a question..."
        />

        {/* Suggestions (when no query) */}
        {!query && !isLoading && (
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3 text-center">Try asking:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(suggestion.text);
                    search(suggestion.text, 'ask');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <span className="text-gray-700">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {(query || isLoading) && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Query Understanding */}
          {queryAnalysis && !isLoading && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Understanding:</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                {queryAnalysis.intent?.replace(/_/g, ' ')}
              </span>
              {queryAnalysis.keywords?.slice(0, 4).map((kw: string) => (
                <span key={kw} className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* AI Response */}
          {(aiResponse || isLoading) && (
            <AISearchResponse
              answer={aiResponse?.answer || ''}
              sources={aiResponse?.sources || []}
              confidence={aiResponse?.confidence || 'low'}
              isLoading={isLoading}
              className="mb-8"
            />
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {aiResponse ? 'Related Content' : 'Search Results'}
                <span className="text-gray-400 font-normal ml-2">({results.length})</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((entry) => (
                  <CoeEntryCard
                    key={entry._id}
                    entry={entry}
                    showSection
                    showPermission
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && query && results.length === 0 && !aiResponse && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">Try different keywords or rephrase your question.</p>
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
