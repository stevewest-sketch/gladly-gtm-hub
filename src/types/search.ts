export interface SearchFilters {
  q?: string;
  type?: string;
  section?: string;
  channel?: string;
  capability?: string;
  audience?: string;
  industry?: string;
  product?: string;
  proofType?: string;
  permission?: string;
  sort?: 'priority' | 'updated' | 'created' | 'title' | 'customer';
}

export interface FacetItem {
  _id: string;
  name: string;
  icon?: string;
  count: number;
}

export interface EntryTypeFacet {
  value: string;
  count: number;
}

export interface SearchFacets {
  entryTypes: EntryTypeFacet[];
  sections: FacetItem[];
  channels: FacetItem[];
  industries: FacetItem[];
  audiences: FacetItem[];
}

export interface SearchPagination {
  offset: number;
  limit: number;
  hasMore: boolean;
}

export interface CoeEntryResult {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  entryType: string;
  title: string;
  slug?: { current: string };
  summary?: string;
  headline?: string;
  proofType?: string;
  customer?: string;
  account?: string;
  toolType?: string;
  featured?: boolean;
  priority?: number;
  coeSection?: {
    _id: string;
    name: string;
    slug?: { current: string };
    icon?: string;
  };
  industry?: {
    _id: string;
    name: string;
    icon?: string;
  };
  permission?: {
    _id: string;
    name: string;
    color?: string;
  };
  channels?: Array<{
    _id: string;
    name: string;
    icon?: string;
  }>;
  audiences?: Array<{
    _id: string;
    name: string;
    icon?: string;
  }>;
}

export interface SearchResponse {
  results: CoeEntryResult[];
  total: number;
  facets: SearchFacets;
  pagination: SearchPagination;
}
