'use client';

import { SearchFilters, SearchFacets, FacetItem } from '@/types/search';
import { useState } from 'react';

interface FilterBarProps {
  filters: SearchFilters;
  facets: SearchFacets | null;
  onFilterChange: (key: keyof SearchFilters, value: string | undefined) => void;
  onClearFilters: () => void;
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

const entryTypeLabels: Record<string, string> = {
  'best-practice': 'Best Practices',
  'process-innovation': 'Process Innovations',
  'internal-best-practice': 'Internal Best Practices',
  'proof-point': 'Proof Points',
  tool: 'Tools',
  'meeting-asset': 'Meeting Assets',
};

export function FilterBar({
  filters,
  facets,
  onFilterChange,
  onClearFilters,
  className = '',
}: FilterBarProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      key !== 'q' && key !== 'sort' && filters[key as keyof SearchFilters]
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quick Filters Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Entry Type Pills */}
        {facets?.entryTypes.map(({ value, count }) => (
          <button
            key={value}
            onClick={() =>
              onFilterChange('type', filters.type === value ? undefined : value)
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.type === value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{entryTypeIcons[value]}</span>
            <span>{entryTypeLabels[value] || value}</span>
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                filters.type === value ? 'bg-purple-500' : 'bg-gray-200'
              }`}
            >
              {count}
            </span>
          </button>
        ))}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-purple-600 underline ml-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Dropdown Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Section Filter */}
        <FilterDropdown
          label="Section"
          value={filters.section}
          options={facets?.sections || []}
          onChange={(value) => onFilterChange('section', value)}
          isExpanded={expandedFilter === 'section'}
          onToggle={() =>
            setExpandedFilter(expandedFilter === 'section' ? null : 'section')
          }
        />

        {/* Channel Filter */}
        <FilterDropdown
          label="Channel"
          value={filters.channel}
          options={facets?.channels || []}
          onChange={(value) => onFilterChange('channel', value)}
          isExpanded={expandedFilter === 'channel'}
          onToggle={() =>
            setExpandedFilter(expandedFilter === 'channel' ? null : 'channel')
          }
        />

        {/* Audience Filter */}
        <FilterDropdown
          label="Audience"
          value={filters.audience}
          options={facets?.audiences || []}
          onChange={(value) => onFilterChange('audience', value)}
          isExpanded={expandedFilter === 'audience'}
          onToggle={() =>
            setExpandedFilter(expandedFilter === 'audience' ? null : 'audience')
          }
        />

        {/* Industry Filter */}
        <FilterDropdown
          label="Industry"
          value={filters.industry}
          options={facets?.industries || []}
          onChange={(value) => onFilterChange('industry', value)}
          isExpanded={expandedFilter === 'industry'}
          onToggle={() =>
            setExpandedFilter(expandedFilter === 'industry' ? null : 'industry')
          }
        />

        {/* Sort */}
        <div className="ml-auto">
          <select
            value={filters.sort || 'priority'}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
          >
            <option value="priority">Sort: Priority</option>
            <option value="updated">Sort: Recently Updated</option>
            <option value="created">Sort: Newest</option>
            <option value="title">Sort: A-Z</option>
            <option value="customer">Sort: Customer</option>
          </select>
        </div>
      </div>
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  value?: string;
  options: FacetItem[];
  onChange: (value: string | undefined) => void;
  isExpanded: boolean;
  onToggle: () => void;
  showCount?: boolean;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
  isExpanded,
  onToggle,
  showCount = true,
}: FilterDropdownProps) {
  const selectedOption = options.find((o) => o._id === value);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
          value
            ? 'bg-purple-50 border-purple-300 text-purple-700'
            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
        }`}
      >
        {selectedOption?.icon && <span>{selectedOption.icon}</span>}
        <span>{selectedOption?.name || label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={onToggle} />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 z-20 w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-1 max-h-64 overflow-auto">
            {/* Clear option */}
            {value && (
              <button
                onClick={() => {
                  onChange(undefined);
                  onToggle();
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50"
              >
                Clear filter
              </button>
            )}

            {options.map((option) => (
              <button
                key={option._id}
                onClick={() => {
                  onChange(option._id);
                  onToggle();
                }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                  value === option._id ? 'bg-purple-50 text-purple-700' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  {option.icon && <span>{option.icon}</span>}
                  <span>{option.name}</span>
                </span>
                {showCount && option.count > 0 && (
                  <span className="text-xs text-gray-400">{option.count}</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
