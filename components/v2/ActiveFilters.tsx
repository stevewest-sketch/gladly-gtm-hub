'use client';

/**
 * Active Filter Item Interface
 */
interface ActiveFilterItem {
  groupId: string;
  groupLabel: string;
  optionId: string;
  optionLabel: string;
}

/**
 * ActiveFilters Props
 */
interface ActiveFiltersProps {
  /** List of active filter items to display */
  filters: ActiveFilterItem[];
  /** Callback when a filter is removed */
  onRemove: (groupId: string, optionId: string) => void;
  /** Callback to clear all filters */
  onClearAll?: () => void;
}

/**
 * Close Icon Component
 */
function CloseIcon() {
  return (
    <svg
      className="w-3 h-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * ActiveFilters Component (V2)
 *
 * Displays active filters as removable pill badges.
 * Uses theme colors via CSS variables.
 *
 * @example
 * ```tsx
 * <ActiveFilters
 *   filters={[
 *     { groupId: 'product', groupLabel: 'Product', optionId: 'sidekick', optionLabel: 'Sidekick' },
 *     { groupId: 'team', groupLabel: 'Team', optionId: 'sales', optionLabel: 'Sales' },
 *   ]}
 *   onRemove={(groupId, optionId) => removeFilter(groupId, optionId)}
 *   onClearAll={() => clearAllFilters()}
 * />
 * ```
 */
export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {filters.map((filter) => (
        <span
          key={`${filter.groupId}-${filter.optionId}`}
          className="
            inline-flex items-center gap-1.5
            px-2.5 py-1
            bg-[var(--theme-primary-light)] text-[var(--theme-primary-dark)]
            rounded-v2-full
            font-body text-v2-sm font-medium
          "
        >
          {filter.optionLabel}
          <button
            onClick={() => onRemove(filter.groupId, filter.optionId)}
            className="
              p-0.5 rounded-full
              opacity-70 hover:opacity-100
              transition-opacity duration-100
            "
            aria-label={`Remove ${filter.optionLabel} filter`}
          >
            <CloseIcon />
          </button>
        </span>
      ))}

      {onClearAll && filters.length > 1 && (
        <button
          onClick={onClearAll}
          className="
            font-body text-v2-sm text-v2-gray-500
            hover:text-v2-gray-700 hover:underline
            transition-colors duration-100
          "
        >
          Clear all
        </button>
      )}
    </div>
  );
}

export type { ActiveFiltersProps, ActiveFilterItem };
