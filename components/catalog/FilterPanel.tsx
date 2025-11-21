'use client'

import { useState } from 'react'
import { FilterPanelProps } from '@/lib/types/catalog'
import { getActiveFilterCount } from '@/lib/utils/catalogFilters'

export default function FilterPanel({
  filters,
  onFiltersChange,
  filterOptions,
  availableProducts = [],
  availableTeams = [],
  availableTopics = [],
  availableJourneyStages = [],
  availableIndustries = [],
  availableCompetitors = [],
  availableContentTypes = [],
  availableAudiences = [],
  showSearch = true,
  showClearAll = true,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const activeCount = getActiveFilterCount(filters)

  const toggleArrayFilter = (filterKey: keyof typeof filters, value: string) => {
    const currentArray = (filters[filterKey] as string[]) || []
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

  const removeFilter = (filterKey: keyof typeof filters, value?: string) => {
    if (value && Array.isArray(filters[filterKey])) {
      const currentArray = filters[filterKey] as string[]
      const newArray = currentArray.filter((v) => v !== value)
      onFiltersChange({
        ...filters,
        [filterKey]: newArray.length > 0 ? newArray : undefined,
      })
    } else {
      onFiltersChange({
        ...filters,
        [filterKey]: undefined,
      })
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 bg-[#8C69F0] text-white text-xs font-medium rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showClearAll && activeCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-[#8C69F0] transition-colors"
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

      {/* Search */}
      {showSearch && isExpanded && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search within results..."
            value={filters.search || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C69F0] focus:border-transparent"
          />
        </div>
      )}

      {/* Active Filters */}
      {activeCount > 0 && isExpanded && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {/* Products */}
            {filters.products?.map((productId) => {
              const product = availableProducts.find((p) => p._id === productId)
              return product ? (
                <button
                  key={productId}
                  onClick={() => removeFilter('products', productId)}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white rounded"
                  style={{ backgroundColor: product.color || '#8C69F0' }}
                >
                  {product.name}
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : null
            })}

            {/* Teams */}
            {filters.teams?.map((teamId) => {
              const team = availableTeams.find((t) => t._id === teamId)
              return team ? (
                <button
                  key={teamId}
                  onClick={() => removeFilter('teams', teamId)}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium border border-gray-300 text-gray-700 bg-white rounded"
                >
                  {team.name}
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : null
            })}

            {/* Topics */}
            {filters.topics?.map((topicId) => {
              const topic = availableTopics.find((t) => t._id === topicId)
              return topic ? (
                <button
                  key={topicId}
                  onClick={() => removeFilter('topics', topicId)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {topic.name}
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : null
            })}

            {/* Audiences */}
            {filters.audiences?.map((audienceId) => {
              const audience = availableAudiences.find((a) => a._id === audienceId)
              return audience ? (
                <button
                  key={audienceId}
                  onClick={() => removeFilter('audiences', audienceId)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-[#009B00] text-white rounded"
                >
                  {audience.name}
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : null
            })}

            {/* Enablement Categories */}
            {filters.enablementCategory?.map((category) => (
              <button
                key={category}
                onClick={() => removeFilter('enablementCategory', category)}
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

      {/* Filter Options */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Content Type Filter */}
          {filterOptions.includes('contentType') && availableContentTypes.length > 0 && (
            <FilterGroup label="Content Type">
              {availableContentTypes.map((type) => (
                <Checkbox
                  key={type._id}
                  label={type.name}
                  checked={(filters.contentTypes || []).includes(type._id)}
                  onChange={() => toggleArrayFilter('contentTypes', type._id)}
                  icon={type.icon}
                  color={type.color}
                />
              ))}
            </FilterGroup>
          )}

          {/* Format Filter */}
          {filterOptions.includes('format') && (
            <FilterGroup label="Format">
              <RadioGroup
                options={[
                  { value: 'all', label: 'All Formats' },
                  { value: 'live-replay', label: 'Live Replay' },
                  { value: 'async', label: 'Async/E-Learning' },
                  { value: 'document', label: 'Document' },
                  { value: 'video', label: 'Video' },
                ]}
                selected={filters.format || 'all'}
                onChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    format: value === 'all' ? undefined : value,
                  })
                }
              />
            </FilterGroup>
          )}

          {/* Products Filter */}
          {filterOptions.includes('product') && availableProducts.length > 0 && (
            <FilterGroup label="Products">
              {availableProducts.map((product) => (
                <Checkbox
                  key={product._id}
                  label={product.name}
                  checked={(filters.products || []).includes(product._id)}
                  onChange={() => toggleArrayFilter('products', product._id)}
                  color={product.color}
                />
              ))}
            </FilterGroup>
          )}

          {/* Teams Filter */}
          {filterOptions.includes('team') && availableTeams.length > 0 && (
            <FilterGroup label="Teams">
              {availableTeams.map((team) => (
                <Checkbox
                  key={team._id}
                  label={team.name}
                  checked={(filters.teams || []).includes(team._id)}
                  onChange={() => toggleArrayFilter('teams', team._id)}
                />
              ))}
            </FilterGroup>
          )}

          {/* Topics Filter */}
          {filterOptions.includes('topic') && availableTopics.length > 0 && (
            <FilterGroup label="Topics">
              {availableTopics.map((topic) => (
                <Checkbox
                  key={topic._id}
                  label={topic.name}
                  checked={(filters.topics || []).includes(topic._id)}
                  onChange={() => toggleArrayFilter('topics', topic._id)}
                />
              ))}
            </FilterGroup>
          )}

          {/* Journey Stages Filter */}
          {filterOptions.includes('journeyStage') && availableJourneyStages.length > 0 && (
            <FilterGroup label="Journey Stage">
              {availableJourneyStages
                .sort((a, b) => a.order - b.order)
                .map((stage) => (
                  <Checkbox
                    key={stage._id}
                    label={stage.name}
                    checked={(filters.journeyStages || []).includes(stage._id)}
                    onChange={() => toggleArrayFilter('journeyStages', stage._id)}
                    icon={stage.icon}
                  />
                ))}
            </FilterGroup>
          )}

          {/* Industries Filter */}
          {filterOptions.includes('industry') && availableIndustries.length > 0 && (
            <FilterGroup label="Industries">
              {availableIndustries.map((industry) => (
                <Checkbox
                  key={industry._id}
                  label={industry.name}
                  checked={(filters.industries || []).includes(industry._id)}
                  onChange={() => toggleArrayFilter('industries', industry._id)}
                />
              ))}
            </FilterGroup>
          )}

          {/* Audiences Filter */}
          {filterOptions.includes('audience') && availableAudiences.length > 0 && (
            <FilterGroup label="Audience">
              {availableAudiences
                .sort((a, b) => (a.order || 50) - (b.order || 50))
                .map((audience) => (
                  <Checkbox
                    key={audience._id}
                    label={audience.name}
                    checked={(filters.audiences || []).includes(audience._id)}
                    onChange={() => toggleArrayFilter('audiences', audience._id)}
                  />
                ))}
            </FilterGroup>
          )}

          {/* Enablement Category Filter */}
          {filterOptions.includes('enablementCategory') && (
            <FilterGroup label="Category">
              {['Product', 'Toolkit', 'Competitive', 'Learning', 'CoE', 'Resources'].map((category) => (
                <Checkbox
                  key={category}
                  label={category}
                  checked={(filters.enablementCategory || []).includes(category)}
                  onChange={() => toggleArrayFilter('enablementCategory', category)}
                />
              ))}
            </FilterGroup>
          )}

          {/* Competitor Filter */}
          {filterOptions.includes('competitor') && availableCompetitors.length > 0 && (
            <FilterGroup label="Competitor">
              <select
                value={filters.competitor || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    competitor: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C69F0] focus:border-transparent"
              >
                <option value="">All Competitors</option>
                {availableCompetitors.map((competitor) => (
                  <option key={competitor._id} value={competitor._id}>
                    {competitor.name}
                  </option>
                ))}
              </select>
            </FilterGroup>
          )}

          {/* Difficulty Filter */}
          {filterOptions.includes('difficulty') && (
            <FilterGroup label="Difficulty">
              <RadioGroup
                options={[
                  { value: 'all', label: 'All Levels' },
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
                selected={filters.difficulty || 'all'}
                onChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    difficulty: value === 'all' ? undefined : value,
                  })
                }
              />
            </FilterGroup>
          )}
        </div>
      )}
    </div>
  )
}

// Helper Components

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">{label}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
  icon,
  color,
}: {
  label: string
  checked: boolean
  onChange: () => void
  icon?: string
  color?: string
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-[#8C69F0] focus:ring-[#8C69F0]"
        style={color ? { accentColor: color } : {}}
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">
        {icon && <span className="mr-1">{icon}</span>}
        {label}
      </span>
    </label>
  )
}

function RadioGroup({
  options,
  selected,
  onChange,
}: {
  options: Array<{ value: string; label: string }>
  selected: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="w-4 h-4 border-gray-300 text-[#8C69F0] focus:ring-[#8C69F0]"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}
