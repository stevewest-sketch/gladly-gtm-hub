'use client';

/**
 * Sort Option Interface
 */
interface SortOption {
  id: string;
  label: string;
}

/**
 * ResultsHeader Props
 */
interface ResultsHeaderProps {
  /** Total number of results */
  count: number;
  /** Label for the results (e.g., "Results", "Resources") */
  label?: string;
  /** Sort options */
  sortOptions?: SortOption[];
  /** Current sort value */
  sortValue?: string;
  /** Callback when sort changes */
  onSortChange?: (value: string) => void;
}

/**
 * Default sort options
 */
const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'az', label: 'A-Z' },
];

/**
 * ResultsHeader Component (V2)
 *
 * Displays the results count and sort dropdown above the card grid.
 *
 * @example
 * ```tsx
 * <ResultsHeader
 *   count={23}
 *   sortValue="newest"
 *   onSortChange={(value) => setSortBy(value)}
 * />
 * ```
 */
export function ResultsHeader({
  count,
  label = 'Results',
  sortOptions = DEFAULT_SORT_OPTIONS,
  sortValue,
  onSortChange,
}: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Results Count */}
      <h2 className="font-display text-v2-2xl font-semibold text-v2-gray-700">
        {count} {label}
      </h2>

      {/* Sort Dropdown */}
      {sortOptions.length > 0 && onSortChange && (
        <div className="flex items-center gap-2">
          <span className="font-body text-v2-base text-v2-gray-500">
            Sort by:
          </span>
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="
              px-2.5 py-1.5
              border border-v2-gray-300 rounded-v2-sm
              font-body text-v2-base text-v2-gray-600
              bg-white cursor-pointer
              focus:outline-none focus:border-[var(--theme-primary)]
              transition-colors duration-150
            "
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export type { ResultsHeaderProps, SortOption };
