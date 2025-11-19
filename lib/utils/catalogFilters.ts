import { CatalogEntry, CatalogFilters } from '../types/catalog'

/**
 * Component-based filtering logic for universal catalog
 *
 * Logic:
 * - Within a category: OR logic (entry matches if it has ANY of the selected values)
 * - Across categories: AND logic (entry must match ALL active filter categories)
 *
 * Example:
 * - Entry with products: ['sidekick', 'hero']
 * - Filter: products: ['sidekick'], topics: ['demo']
 * - Result: Entry matches if it has (Sidekick OR Hero) AND (demo topic)
 */

export function matchesFilters(
  entry: CatalogEntry,
  filters: CatalogFilters
): boolean {
  // Content Types filter
  if (filters.contentTypes && filters.contentTypes.length > 0) {
    const entryContentType = entry.contentType?.slug?.current || entry.contentType?._id
    if (!entryContentType || !filters.contentTypes.includes(entryContentType)) {
      return false
    }
  }

  // Format filter
  if (filters.format && filters.format !== 'all') {
    if (entry.format !== filters.format) {
      return false
    }
  }

  // Products filter (multi-select, OR within category)
  if (filters.products && filters.products.length > 0) {
    if (!entry.products || entry.products.length === 0) {
      return false
    }
    const entryProductIds = entry.products.map((p) => p._id || p.slug?.current)
    const hasMatch = entryProductIds.some((id) => filters.products!.includes(id))
    if (!hasMatch) {
      return false
    }
  }

  // Teams filter (multi-select, OR within category)
  if (filters.teams && filters.teams.length > 0) {
    if (!entry.teams || entry.teams.length === 0) {
      return false
    }
    const entryTeamIds = entry.teams.map((t) => t._id || t.slug?.current)
    const hasMatch = entryTeamIds.some((id) => filters.teams!.includes(id))
    if (!hasMatch) {
      return false
    }
  }

  // Topics filter (multi-select, OR within category)
  if (filters.topics && filters.topics.length > 0) {
    if (!entry.topics || entry.topics.length === 0) {
      return false
    }
    const entryTopicIds = entry.topics.map((t) => t._id || t.slug?.current)
    const hasMatch = entryTopicIds.some((id) => filters.topics!.includes(id))
    if (!hasMatch) {
      return false
    }
  }

  // Journey Stages filter (multi-select, OR within category)
  if (filters.journeyStages && filters.journeyStages.length > 0) {
    if (!entry.journeyStages || entry.journeyStages.length === 0) {
      return false
    }
    const entryStageIds = entry.journeyStages.map((j) => j._id || j.slug?.current)
    const hasMatch = entryStageIds.some((id) => filters.journeyStages!.includes(id))
    if (!hasMatch) {
      return false
    }
  }

  // Industries filter (multi-select, OR within category)
  if (filters.industries && filters.industries.length > 0) {
    if (!entry.industries || entry.industries.length === 0) {
      return false
    }
    const entryIndustryIds = entry.industries.map((i) => i._id || i.slug?.current)
    const hasMatch = entryIndustryIds.some((id) => filters.industries!.includes(id))
    if (!hasMatch) {
      return false
    }
  }

  // COE Category filter (multi-select, OR within category)
  if (filters.coeCategory && filters.coeCategory.length > 0) {
    if (!entry.coeCategory || entry.coeCategory.length === 0) {
      return false
    }
    const hasMatch = entry.coeCategory.some((cat) => filters.coeCategory!.includes(cat))
    if (!hasMatch) {
      return false
    }
  }

  // Competitor filter (single-select)
  if (filters.competitor) {
    const entryCompetitorId = entry.competitor?._id || entry.competitor?.slug?.current
    if (entryCompetitorId !== filters.competitor) {
      return false
    }
  }

  // Difficulty filter (single-select)
  if (filters.difficulty && filters.difficulty !== 'all') {
    if (entry.difficulty !== filters.difficulty) {
      return false
    }
  }

  // Presenter filter
  if (filters.presenter && filters.presenter !== 'all') {
    if (entry.presenter !== filters.presenter) {
      return false
    }
  }

  // Featured filter
  if (filters.featured !== undefined) {
    if (entry.featured !== filters.featured) {
      return false
    }
  }

  // Show in Upcoming filter
  if (filters.showInUpcoming !== undefined) {
    if (entry.showInUpcoming !== filters.showInUpcoming) {
      return false
    }
  }

  // Status filter (multi-select)
  if (filters.status && filters.status.length > 0) {
    if (!filters.status.includes(entry.status)) {
      return false
    }
  }

  // Date range filter
  if (filters.dateRange) {
    const entryDate = entry.publishDate ? new Date(entry.publishDate) : null
    if (entryDate) {
      if (filters.dateRange.start) {
        const startDate = new Date(filters.dateRange.start)
        if (entryDate < startDate) {
          return false
        }
      }
      if (filters.dateRange.end) {
        const endDate = new Date(filters.dateRange.end)
        if (entryDate > endDate) {
          return false
        }
      }
    }
  }

  // Search filter (searches title, description, key takeaways)
  if (filters.search && filters.search.trim() !== '') {
    const searchTerm = filters.search.toLowerCase()
    const titleMatch = entry.title?.toLowerCase().includes(searchTerm)
    const descMatch = entry.description?.toLowerCase().includes(searchTerm)
    const takeawaysMatch = entry.keyTakeaways?.some((t) =>
      t.toLowerCase().includes(searchTerm)
    )
    if (!titleMatch && !descMatch && !takeawaysMatch) {
      return false
    }
  }

  // All filters passed
  return true
}

/**
 * Sort catalog entries based on sort option
 */
export function sortEntries(
  entries: CatalogEntry[],
  sortBy: string
): CatalogEntry[] {
  const sorted = [...entries]

  switch (sortBy) {
    case 'date-desc':
      return sorted.sort((a, b) => {
        const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0
        const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0
        return dateB - dateA
      })

    case 'date-asc':
      return sorted.sort((a, b) => {
        const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0
        const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0
        return dateA - dateB
      })

    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))

    case 'priority':
      return sorted.sort((a, b) => {
        const priorityA = a.priority || 50
        const priorityB = b.priority || 50
        return priorityB - priorityA // Higher priority first
      })

    case 'duration':
      return sorted.sort((a, b) => {
        const durationA = a.duration || 0
        const durationB = b.duration || 0
        return durationA - durationB // Shorter duration first
      })

    default:
      return sorted
  }
}

/**
 * Filter entries that are "recent" (within X days)
 */
export function getRecentEntries(
  entries: CatalogEntry[],
  daysRecent: number = 14
): CatalogEntry[] {
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - daysRecent * 24 * 60 * 60 * 1000)

  return entries.filter((entry) => {
    if (!entry.publishDate) return false
    const publishDate = new Date(entry.publishDate)
    return publishDate >= cutoffDate
  })
}

/**
 * Check if an entry was published recently
 */
export function isRecent(publishDate: string | undefined, days: number = 7): boolean {
  if (!publishDate) return false
  const now = new Date()
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
  const date = new Date(publishDate)
  return date >= cutoff
}

/**
 * Merge page-level filters with user-selected filters
 */
export function mergeFilters(
  pageFilters: CatalogFilters,
  userFilters: CatalogFilters
): CatalogFilters {
  return {
    ...pageFilters,
    ...userFilters,
    // For array fields, prefer user filters if they exist, otherwise use page filters
    contentTypes: userFilters.contentTypes || pageFilters.contentTypes,
    products: userFilters.products || pageFilters.products,
    teams: userFilters.teams || pageFilters.teams,
    topics: userFilters.topics || pageFilters.topics,
    journeyStages: userFilters.journeyStages || pageFilters.journeyStages,
    industries: userFilters.industries || pageFilters.industries,
    coeCategory: userFilters.coeCategory || pageFilters.coeCategory,
    status: userFilters.status || pageFilters.status,
  }
}

/**
 * Get active filter count (for UI badges)
 */
export function getActiveFilterCount(filters: CatalogFilters): number {
  let count = 0

  if (filters.contentTypes && filters.contentTypes.length > 0) count += filters.contentTypes.length
  if (filters.products && filters.products.length > 0) count += filters.products.length
  if (filters.teams && filters.teams.length > 0) count += filters.teams.length
  if (filters.topics && filters.topics.length > 0) count += filters.topics.length
  if (filters.journeyStages && filters.journeyStages.length > 0) count += filters.journeyStages.length
  if (filters.industries && filters.industries.length > 0) count += filters.industries.length
  if (filters.coeCategory && filters.coeCategory.length > 0) count += filters.coeCategory.length
  if (filters.competitor) count++
  if (filters.format && filters.format !== 'all') count++
  if (filters.difficulty && filters.difficulty !== 'all') count++
  if (filters.presenter && filters.presenter !== 'all') count++
  if (filters.search && filters.search.trim() !== '') count++
  if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) count++

  return count
}
