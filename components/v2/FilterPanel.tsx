'use client';

import { useState } from 'react';

/**
 * Filter Option Interface
 */
interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

/**
 * Filter Group Interface
 */
interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
  /** Default collapsed state */
  defaultCollapsed?: boolean;
}

/**
 * Active Filter State
 */
interface ActiveFilters {
  [groupId: string]: string[];
}

/**
 * FilterPanel Props
 */
interface FilterPanelProps {
  /** Filter groups configuration */
  groups: FilterGroup[];
  /** Currently active filters */
  activeFilters: ActiveFilters;
  /** Callback when filters change */
  onFiltersChange: (filters: ActiveFilters) => void;
  /** Search query for filtering within results */
  searchQuery?: string;
  /** Callback when search query changes */
  onSearchChange?: (query: string) => void;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
}

/**
 * Chevron Icon Component
 */
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-v2-gray-500 transition-transform duration-150 ${
        isOpen ? '' : '-rotate-90'
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * FilterPanel Component (V2)
 *
 * A sidebar filter panel with search, collapsible filter groups, and checkboxes.
 * Uses theme colors for accent states via CSS variables.
 *
 * @example
 * ```tsx
 * const [filters, setFilters] = useState<ActiveFilters>({});
 * const [search, setSearch] = useState('');
 *
 * <FilterPanel
 *   groups={[
 *     {
 *       id: 'format',
 *       title: 'Format',
 *       options: [
 *         { id: 'document', label: 'Document', count: 8 },
 *         { id: 'deck', label: 'Deck', count: 6 },
 *       ]
 *     }
 *   ]}
 *   activeFilters={filters}
 *   onFiltersChange={setFilters}
 *   searchQuery={search}
 *   onSearchChange={setSearch}
 * />
 * ```
 */
export function FilterPanel({
  groups,
  activeFilters,
  onFiltersChange,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search content...',
}: FilterPanelProps) {
  // Track collapsed state for each group
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    groups.forEach((group) => {
      initial[group.id] = group.defaultCollapsed ?? false;
    });
    return initial;
  });

  // Toggle a filter option
  const toggleFilter = (groupId: string, optionId: string) => {
    const current = activeFilters[groupId] || [];
    const newFilters = { ...activeFilters };

    if (current.includes(optionId)) {
      newFilters[groupId] = current.filter((id) => id !== optionId);
      if (newFilters[groupId].length === 0) {
        delete newFilters[groupId];
      }
    } else {
      newFilters[groupId] = [...current, optionId];
    }

    onFiltersChange(newFilters);
  };

  // Toggle group collapsed state
  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Clear all filters
  const clearAll = () => {
    onFiltersChange({});
    onSearchChange?.('');
  };

  // Count total active filters
  const totalActiveFilters = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <aside className="sticky top-6 w-v2-sidebar h-fit">
      <div className="bg-white border border-v2-gray-300 rounded-v2-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-v2-gray-200">
          <span className="font-display text-v2-md font-semibold text-v2-gray-700">
            Filters
          </span>
          {totalActiveFilters > 0 && (
            <button
              onClick={clearAll}
              className="font-body text-v2-sm text-[var(--theme-primary)] hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search Input */}
        {onSearchChange && (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="
              w-full px-3 py-2 mb-4
              border border-v2-gray-300 rounded-v2-md
              font-body text-v2-base text-v2-gray-700
              placeholder:text-v2-gray-500
              focus:outline-none focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)]
              transition-colors duration-150
            "
          />
        )}

        {/* Filter Groups */}
        <div className="space-y-4">
          {groups.map((group) => {
            const isCollapsed = collapsedGroups[group.id];
            const activeInGroup = activeFilters[group.id] || [];

            return (
              <div key={group.id}>
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex items-center justify-between w-full py-1.5 mb-2"
                >
                  <span className="font-body text-v2-xs font-semibold uppercase tracking-wide text-v2-gray-500">
                    {group.title}
                  </span>
                  <ChevronIcon isOpen={!isCollapsed} />
                </button>

                {/* Options */}
                {!isCollapsed && (
                  <div className="space-y-0.5">
                    {group.options.map((option) => {
                      const isActive = activeInGroup.includes(option.id);
                      return (
                        <label
                          key={option.id}
                          className="
                            flex items-center gap-2 px-2 py-1.5 rounded-v2-sm
                            cursor-pointer transition-colors duration-100
                            hover:bg-v2-gray-100
                          "
                        >
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => toggleFilter(group.id, option.id)}
                            className="
                              w-3.5 h-3.5 rounded
                              border-v2-gray-300
                              text-[var(--theme-primary)]
                              focus:ring-[var(--theme-primary)] focus:ring-offset-0
                              cursor-pointer
                            "
                            style={{
                              accentColor: 'var(--theme-primary)',
                            }}
                          />
                          <span
                            className={`
                              flex-1 font-body text-v2-base
                              ${isActive ? 'text-v2-gray-700' : 'text-v2-gray-600'}
                            `}
                          >
                            {option.label}
                          </span>
                          {option.count !== undefined && (
                            <span className="font-body text-v2-xs text-v2-gray-500 bg-v2-gray-100 px-1.5 py-0.5 rounded-full">
                              {option.count}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export type { FilterPanelProps, FilterGroup, FilterOption, ActiveFilters };
