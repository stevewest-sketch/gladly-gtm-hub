'use client'

import { useState } from 'react'

export interface EnablementFilters {
  search?: string
  audiences?: string[]
  categories?: string[]
}

interface EnablementFiltersProps {
  filters: EnablementFilters
  onFiltersChange: (filters: EnablementFilters) => void
  availableAudiences: string[]
  availableCategories: string[]
}

export default function EnablementFilters({
  filters,
  onFiltersChange,
  availableAudiences,
  availableCategories,
}: EnablementFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleArrayFilter = (filterKey: 'audiences' | 'categories', value: string) => {
    const currentArray = filters[filterKey] || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value]

    onFiltersChange({
      ...filters,
      [filterKey]: newArray.length > 0 ? newArray : undefined,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  const removeFilter = (filterKey: 'audiences' | 'categories', value: string) => {
    const currentArray = filters[filterKey] || []
    const newArray = currentArray.filter((v) => v !== value)
    onFiltersChange({
      ...filters,
      [filterKey]: newArray.length > 0 ? newArray : undefined,
    })
  }

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.audiences?.length || 0) +
    (filters.categories?.length || 0)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-[#009B00] text-white text-xs font-medium rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-[#009B00] transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
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
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search enablements..."
              value={filters.search || ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value || undefined })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009B00] focus:border-transparent text-sm"
            />
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {filters.audiences?.map((audience) => (
                  <button
                    key={audience}
                    onClick={() => removeFilter('audiences', audience)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-[#009B00] text-white rounded"
                  >
                    {audience}
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ))}
                {filters.categories?.map((category) => (
                  <button
                    key={category}
                    onClick={() => removeFilter('categories', category)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-[#8C69F0] text-white rounded"
                  >
                    {category}
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Audience Filter */}
          {availableAudiences.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Audience</h4>
              <div className="space-y-2">
                {availableAudiences.map((audience) => (
                  <label
                    key={audience}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={(filters.audiences || []).includes(audience)}
                      onChange={() => toggleArrayFilter('audiences', audience)}
                      className="w-4 h-4 rounded border-gray-300 text-[#009B00] focus:ring-[#009B00]"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {audience}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          {availableCategories.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
              <div className="space-y-2">
                {availableCategories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={(filters.categories || []).includes(category)}
                      onChange={() => toggleArrayFilter('categories', category)}
                      className="w-4 h-4 rounded border-gray-300 text-[#8C69F0] focus:ring-[#8C69F0]"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
