'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export interface SearchableItem {
  title: string;
  description?: string;
  url: string;
  category?: string;
  keywords?: string[];
}

export interface SearchBarProps {
  placeholder?: string;
  searchableContent?: SearchableItem[];
  className?: string;
}

/**
 * SearchBar - Global search component
 * Allows users to search through all website content
 * Supports keyboard navigation and instant results
 */
export function SearchBar({
  placeholder = 'Search enablement resources...',
  searchableContent = [],
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = searchableContent.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descMatch = item.description?.toLowerCase().includes(lowerQuery);
      const keywordMatch = item.keywords?.some((kw) =>
        kw.toLowerCase().includes(lowerQuery)
      );
      return titleMatch || descMatch || keywordMatch;
    });

    setResults(filtered.slice(0, 10)); // Limit to 10 results
    setSelectedIndex(0);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
    setIsOpen(true);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          setIsOpen(false);
          setQuery('');
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-4 border-2 border-neutral-gray rounded-lg focus:outline-none focus:border-primary-purple transition-colors"
          aria-label="Search"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-neutral-gray rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
          role="listbox"
        >
          {results.map((result, index) => (
            <a
              key={index}
              href={result.url}
              className={`block px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-primary-purple-light transition-colors ${
                index === selectedIndex ? 'bg-primary-purple-light' : ''
              }`}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
            >
              {result.category && (
                <span className="text-xs text-primary-purple font-semibold uppercase tracking-wide">
                  {result.category}
                </span>
              )}
              <div className="font-semibold text-neutral-black mt-1">
                {result.title}
              </div>
              {result.description && (
                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {result.description}
                </div>
              )}
            </a>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-neutral-gray rounded-lg shadow-xl p-4 z-50">
          <p className="text-gray-600 text-center">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
