'use client';

import { SearchFilters, SearchFacets } from '@/types/search';

interface ActiveFiltersProps {
  filters: SearchFilters;
  facets: SearchFacets | null;
  onRemoveFilter: (key: keyof SearchFilters) => void;
  onClearAll: () => void;
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
  'best-practice': 'Best Practice',
  'process-innovation': 'Process Innovation',
  'internal-best-practice': 'Internal Best Practice',
  'proof-point': 'Proof Point',
  tool: 'Tool',
  'meeting-asset': 'Meeting Asset',
};

export function ActiveFilters({
  filters,
  facets,
  onRemoveFilter,
  onClearAll,
  className = '',
}: ActiveFiltersProps) {
  const getFilterLabel = (
    key: keyof SearchFilters,
    value: string
  ): { icon?: string; label: string } => {
    switch (key) {
      case 'type':
        return {
          icon: entryTypeIcons[value],
          label: entryTypeLabels[value] || value,
        };
      case 'section':
        const section = facets?.sections.find((s) => s._id === value);
        return { icon: section?.icon, label: section?.name || value };
      case 'channel':
        const channel = facets?.channels.find((c) => c._id === value);
        return { icon: channel?.icon, label: channel?.name || value };
      case 'audience':
        const audience = facets?.audiences.find((a) => a._id === value);
        return { icon: audience?.icon, label: audience?.name || value };
      case 'industry':
        const industry = facets?.industries.find((i) => i._id === value);
        return { icon: industry?.icon, label: industry?.name || value };
      case 'product':
        return { label: value.charAt(0).toUpperCase() + value.slice(1) };
      default:
        return { label: value };
    }
  };

  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value && key !== 'q' && key !== 'sort'
  );

  if (activeFilters.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-500">Filters:</span>

      {activeFilters.map(([key, value]) => {
        const { icon, label } = getFilterLabel(
          key as keyof SearchFilters,
          value as string
        );

        return (
          <button
            key={key}
            onClick={() => onRemoveFilter(key as keyof SearchFilters)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors group"
          >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
            <svg
              className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        );
      })}

      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-purple-600 underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
