'use client';

/**
 * Pagination Props
 */
interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Total number of items */
  totalItems?: number;
  /** Items per page (for showing "1-12 of X") */
  itemsPerPage?: number;
}

/**
 * Pagination Component (V2)
 *
 * Page navigation with Previous/Next buttons and page numbers.
 * Uses theme colors via CSS variables.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={3}
 *   totalItems={28}
 *   itemsPerPage={12}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 12,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate showing range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

  // Generate page numbers to show
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-8 pt-6 border-t border-v2-gray-200">
      {/* Navigation */}
      <nav className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 rounded-v2-sm
            font-body text-v2-base
            border border-v2-gray-300 bg-white
            transition-colors duration-150
            ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed text-v2-gray-400'
                : 'text-v2-gray-600 hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'
            }
          `}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-v2-gray-500"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                min-w-[36px] h-9 rounded-v2-sm
                font-body text-v2-base
                border transition-colors duration-150
                ${
                  isActive
                    ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white'
                    : 'border-v2-gray-300 bg-white text-v2-gray-600 hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'
                }
              `}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 rounded-v2-sm
            font-body text-v2-base
            border border-v2-gray-300 bg-white
            transition-colors duration-150
            ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed text-v2-gray-400'
                : 'text-v2-gray-600 hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'
            }
          `}
        >
          Next
        </button>
      </nav>

      {/* Showing info */}
      {totalItems && (
        <p className="text-center mt-3 font-body text-v2-base text-v2-gray-500">
          Showing {startItem} - {endItem} of {totalItems} results
        </p>
      )}
    </div>
  );
}

export type { PaginationProps };
