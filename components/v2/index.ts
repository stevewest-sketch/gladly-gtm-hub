/**
 * V2 Design System Components
 * GTM Hub unified component library
 */

// Page Structure
export { PageHeader } from './PageHeader';
export type { PageHeaderProps, NavTab } from './PageHeader';

// Cards
export { HubCard } from './HubCard';
export type { HubCardProps, CardBadge, CardTag } from './HubCard';

export { CompactCard } from './CompactCard';
export type { CompactCardProps } from './CompactCard';

// Sections
export { FeaturedSection } from './FeaturedSection';
export type { FeaturedSectionProps } from './FeaturedSection';

export { ResourceStrip } from './ResourceStrip';
export type { ResourceStripProps } from './ResourceStrip';

// Filtering
export { FilterPanel } from './FilterPanel';
export type {
  FilterPanelProps,
  FilterGroup,
  FilterOption,
  ActiveFilters as ActiveFiltersState,
} from './FilterPanel';

export { ActiveFilters } from './ActiveFilters';
export type { ActiveFiltersProps, ActiveFilterItem } from './ActiveFilters';

// Results Display
export { ResultsHeader } from './ResultsHeader';
export type { ResultsHeaderProps, SortOption } from './ResultsHeader';

export { Pagination } from './Pagination';
export type { PaginationProps } from './Pagination';
