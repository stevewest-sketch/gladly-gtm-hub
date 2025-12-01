// ========================================
// UNIFIED SEARCH TYPES
// ========================================

// All searchable content types
export type SearchableContentType =
  | 'catalogEntry'      // Existing enablement catalog
  | 'coeEntry'          // New CoE hub
  | 'page'              // Static pages (if searchable)
  | 'all';              // Search everything

// Entry type filters (across all hubs)
export type EntryTypeFilter =
  // Catalog types
  | 'training'
  | 'resource'
  | 'tool'
  | 'process'
  // CoE types
  | 'best-practice'
  | 'process-innovation'
  | 'internal-best-practice'
  | 'proof-point'
  | 'meeting-asset'
  // Shared
  | 'all';

// Unified search result
export interface UnifiedSearchResult {
  _id: string;
  _type: 'catalogEntry' | 'coeEntry' | 'page' | 'competitiveResource' | 'trainingSession' | 'enablementArticle';
  _score: number;
  _matchType: 'semantic' | 'keyword' | 'hybrid';
  _hub: 'enablement' | 'coe' | 'content' | 'general';

  // Common fields
  title: string;
  slug: { current: string };
  summary?: string;

  // Display metadata
  icon?: string;
  category?: string;
  tags?: string[];

  // Hub-specific fields (flattened for display)
  entryType?: string;
  proofType?: string;
  customer?: string;
  industry?: { name: string; icon?: string };
  section?: { name: string; icon?: string };
  permission?: { name: string; color: string };

  // Content Hub fields
  link?: string;           // External link for competitive resources
  competitor?: string;     // Competitor name for competitive resources
}

// Search filters
export interface UnifiedSearchFilters {
  q?: string;                    // Search query
  hub?: 'all' | 'enablement' | 'coe' | 'content';  // Which hub to search
  type?: EntryTypeFilter;        // Entry type filter
  section?: string;              // Section/category filter
  channel?: string;              // CoE channel
  capability?: string;           // CoE capability
  audience?: string;             // Target audience
  industry?: string;             // Industry filter
  product?: string;              // Product filter (hero/sidekick/platform)
  permission?: string;           // Permission status
  sort?: 'relevance' | 'updated' | 'created' | 'title' | 'priority';
}

// Facets for filtering UI
export interface SearchFacet {
  _id: string;
  name: string;
  icon?: string;
  count: number;
  hub?: string;
}

export interface UnifiedSearchFacets {
  hubs: { value: string; label: string; count: number }[];
  entryTypes: { value: string; label: string; icon: string; count: number; hub: string }[];
  sections: SearchFacet[];
  channels: SearchFacet[];
  audiences: SearchFacet[];
  industries: SearchFacet[];
}

// AI response
export interface AISearchResponse {
  answer: string;
  sources: {
    id: string;
    title: string;
    slug: string;
    type: string;
    hub: string;
    relevance: number;
  }[];
  confidence: 'high' | 'medium' | 'low';
}

// Full search response
export interface UnifiedSearchResponse {
  results: UnifiedSearchResult[];
  total: number;
  facets: UnifiedSearchFacets;
  queryAnalysis?: {
    intent: string;
    entities: Record<string, string[]>;
    keywords: string[];
    isQuestion: boolean;
    suggestedHub?: string;
  };
  aiResponse?: AISearchResponse;
  meta: {
    query: string;
    mode: 'search' | 'assistant';
    cached: boolean;
    took: number;
  };
}
