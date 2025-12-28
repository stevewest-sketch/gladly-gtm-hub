// Type definitions for the Universal Catalog System

export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: { current: string }
  description?: string
  color?: string
  logo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  order?: number
}

export interface Team {
  _id: string
  _type: 'team'
  name: string
  slug: { current: string }
  description?: string
  order?: number
}

export interface Topic {
  _id: string
  _type: 'topic'
  name: string
  slug: { current: string }
  category?: string
  description?: string
  order?: number
}

export interface JourneyStage {
  _id: string
  _type: 'journeyStage'
  name: string
  slug: { current: string }
  order: number
  description?: string
  icon?: string
  phase: 'pre-sales' | 'post-sales'
}

export interface Industry {
  _id: string
  _type: 'industry'
  name: string
  slug: { current: string }
  description?: string
  order?: number
}

export interface Competitor {
  _id: string
  _type: 'competitor'
  name: string
  slug: { current: string }
  logo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  aiGeneratedOverview?: string
  generationMethod?: 'auto' | 'manual'
  keyDifferentiators?: string[]
  commonObjections?: Array<{
    objection: string
    response: string
  }>
  lastReviewed?: string
  order?: number
}

export interface ContentType {
  _id: string
  _type: 'contentType'
  name: string
  slug: { current: string }
  icon?: string
  color?: string
  description?: string
  order?: number
}

export interface Audience {
  _id: string
  _type: 'audience'
  name: string
  slug: { current: string }
  description?: string
  order?: number
}

export interface LearningPath {
  _id: string
  _type: 'learningPath'
  name: string
  slug: { current: string }
  description: string
  icon: string
  color: string
  order: number
}

export interface QuarterlyUpdate {
  date: string
  wistiaId?: string
  presenter?: string
  transcript?: string
  whatsNew?: string[]
  generatedBy?: 'auto' | 'manual'
}

export interface AdditionalResource {
  title: string
  url: string
  type: 'link' | 'download' | 'external'
}

export interface MainContent {
  transcript?: string
  videoUrl?: string
  wistiaId?: string
  documentUrl?: string
  slidesDeck?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  additionalResources?: AdditionalResource[]
}

export interface ContentBlock {
  _key: string
  blockType: 'richText' | 'stepByStep' | 'faq' | 'tips' | 'mistakes' | 'useCases' | 'howToUse' | 'dataStats'
  title: string
  content?: any[] // Portable Text blocks
  steps?: Array<{
    stepTitle: string
    stepDescription: string
    stepImage?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  collapsible?: boolean
}

export interface HowToUseSection {
  heading: string
  content: string
  examples?: string[]
}

export interface HowToUseContent {
  title: string
  sections: HowToUseSection[]
}

export interface ArticleSection {
  _key?: string
  heading: string
  content: string
}

export interface ResourceLinks {
  videoUrl?: string
  slidesUrl?: string
  transcriptUrl?: string
  keyAssetUrl?: string
  keyAssetLabel?: string
}

// New Page Section Types
export type OverviewCardColorPreset =
  | 'blue'
  | 'green'
  | 'rose'
  | 'purple'
  | 'amber'
  | 'indigo'
  | 'cyan'
  | 'pink'
  | 'gray'

export interface OverviewCard {
  label: string
  content: string
  icon?: string // Custom emoji, falls back to label-based detection
  colorPreset?: OverviewCardColorPreset // Custom color, falls back to label-based detection
}

export interface SessionMaterials {
  videoUrl?: string
  slidesUrl?: string
  transcriptUrl?: string
}

export interface ProcessStep {
  heading: string
  content: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface AssetItem {
  icon?: string
  title: string
  description?: string
  url: string
}

export interface ChecklistColumn {
  title: string
  items: string[]
}

export interface PageSection {
  _key: string
  sectionType: 'overview' | 'video' | 'takeaways' | 'process' | 'tips' | 'faq' | 'assets' | 'text' | 'checklist'
  title: string
  description?: string
  collapsible?: boolean
  defaultExpanded?: boolean

  // Overview section
  overviewCards?: OverviewCard[]

  // Video section
  videoUrl?: string
  wistiaId?: string
  sessionMaterials?: SessionMaterials

  // Takeaways section
  takeaways?: string[]

  // Process section
  processLayout?: 'steps' | 'text' | 'bullets'
  processSteps?: ProcessStep[]
  processText?: string

  // Tips section
  tips?: string[]

  // FAQ section
  faqs?: FAQ[]

  // Assets section
  assetItems?: AssetItem[]

  // Text section
  textContent?: string

  // Checklist section
  checklistColumns?: ChecklistColumn[]
}

export interface RelatedContent {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  cardType?: string
}

export interface CollectionSubsection {
  name: string
  icon?: string
  filterLogic: 'all' | 'featured' | 'recent' | 'priority'
  maxItems?: number
  order: number
}

export interface Collection {
  _id: string
  _type: 'collection'
  name: string
  slug: { current: string }
  hub: 'content' | 'enablement' | 'coe' | 'curated' | 'sales' | 'training' | 'partner'
  description?: string
  icon?: string
  color?: string
  order: number
  showInNavigation: boolean
  isEnabled: boolean
  subsections?: CollectionSubsection[]
}

export interface CollectionAssignment {
  collection: {
    _id: string
    name: string
    slug: { current: string }
    icon?: string
  }
  subsections?: string[] // Names of subsections, e.g., ["First Meeting", "Discovery & Demo"]
}

export interface CatalogEntry {
  _id: string
  _type: 'catalogEntry'
  _updatedAt?: string
  title: string
  description?: string
  slug: { current: string }

  // Card Type (new unified schema)
  cardType?: 'content-card' | 'enablement-article' | 'best-practice' | 'play' | 'battle-card'

  // Classification
  contentType?: ContentType
  pageTemplate?: 'micro-learning' | 'battle-card' | 'play' | 'product' | 'training-session' | 'playbook' | 'training'
  format?: 'document' | 'slides' | 'video' | 'one-pager' | 'battlecard' | 'competitive' | 'guide' | 'messaging' | 'meeting-asset' | 'playbook' | 'prototype' | 'tool' | 'live-replay' | 'on-demand'

  // Session date for live-replay and on-demand formats
  sessionDate?: string

  // Taxonomies (multi-select arrays)
  products?: Product[]
  teams?: Team[]
  topics?: Topic[]
  journeyStages?: JourneyStage[]
  industries?: Industry[]
  audiences?: Audience[]
  learningPaths?: LearningPath[]

  // Hub-specific categories (for multi-hub architecture)
  coeCategory?: string[]  // COE Hub categories
  salesCategory?: string[]  // Sales Playbook Hub categories
  trainingCategory?: string[]  // Training Hub categories
  partnerCategory?: string[]  // Partner Hub categories
  enablementCategory?: string[]  // Enablement Hub categories

  // Competitive-specific
  competitor?: Competitor
  relatedCompetitors?: Competitor[]
  battleCardFile?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  quarterlyUpdates?: QuarterlyUpdate[]

  // Metadata
  publishDate?: string
  lastUpdated?: string
  duration?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  presenter?: string

  // Content
  thumbnailImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  externalUrl?: string  // Primary link (Google Drive, Docs, etc.)
  videoUrl?: string     // Video/Recording URL
  slidesUrl?: string    // Slides URL
  keyAssetUrl?: string  // Key asset URL
  keyAssetLabel?: string // Label for key asset button
  transcriptUrl?: string // Transcript URL
  customerLogoUrl?: string // Customer logo URL (for meeting-assets)
  mainContent?: MainContent

  // New flexible page sections (replaces scattered fields)
  pageSections?: PageSection[]

  // Page theming
  pageTheme?: 'green' | 'blue' | 'purple' | 'orange' | 'rose' | 'teal' | 'slate'

  // Legacy fields (deprecated - use pageSections instead)
  keyTakeaways?: string[]
  contentBlocks?: ContentBlock[]

  // Article Content (for enablement articles)
  articleSections?: ArticleSection[]
  actionItems?: string[]
  resourceLinks?: ResourceLinks
  relatedContent?: RelatedContent[]
  readingTime?: string

  // Dual View
  hasHowToUse?: boolean
  howToUseContent?: HowToUseContent

  // Display
  featured?: boolean
  priority?: number
  viewCount?: number
  showInUpcoming?: boolean
  publishedTo?: string[]
  status: 'draft' | 'submitted' | 'in-review' | 'approved' | 'published' | 'archived'

  // Collection Assignments (NEW)
  enablementHubCollections?: CollectionAssignment[]
  coeHubCollections?: CollectionAssignment[]
  contentHubCollections?: CollectionAssignment[]
  curatedHubCollections?: CollectionAssignment[]
  salesHubCollections?: Collection[]
  trainingHubCollections?: Collection[]
  partnerHubCollections?: Collection[]

  // Display Priority (NEW)
  displayPriority?: 'hero' | 'featured' | 'normal'

  // Hub-Specific Fields (NEW)
  // CoE-specific
  coeType?: string[]
  meetingType?: 'bva' | 'ebr' | 'qbr' | 'rfx' | 'strategy-session'

  // Proof point specific fields (CoE Hub)
  customer?: string
  isBlindCustomer?: boolean
  kpiCategory?: string
  productTags?: string[]
  channelTag?: string
  approvedForExternal?: boolean
  externalLinks?: Array<{ title: string; url: string }>

  // Enablement-specific
  enablementCategory?: string[]

  // Other hub categories
  salesCategory?: string[]
  trainingCategory?: string[]
  partnerCategory?: string[]
}

// Filter configuration types
export interface CatalogFilters {
  contentTypes?: string[]
  products?: string[]
  teams?: string[]
  topics?: string[]
  journeyStages?: string[]
  industries?: string[]
  audiences?: string[]
  // Hub-specific category filters
  coeCategory?: string[]
  salesCategory?: string[]
  trainingCategory?: string[]
  partnerCategory?: string[]
  enablementCategory?: string[]
  // Other filters
  competitor?: string
  format?: string
  difficulty?: string
  dateRange?: {
    start?: string
    end?: string
  }
  presenter?: string
  search?: string
  featured?: boolean
  showInUpcoming?: boolean
  status?: string[]
}

export type FilterOption =
  | 'contentType'
  | 'format'
  | 'product'
  | 'team'
  | 'topic'
  | 'journeyStage'
  | 'industry'
  | 'audience'
  | 'coeCategory'
  | 'salesCategory'
  | 'trainingCategory'
  | 'partnerCategory'
  | 'enablementCategory'
  | 'competitor'
  | 'difficulty'
  | 'date'
  | 'presenter'
  | 'status'

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'title'
  | 'priority'
  | 'duration'

export type LayoutOption =
  | 'grid'
  | 'list'
  | 'horizontal-strip'
  | 'featured-grid'

export type CardStyle =
  | 'standard'
  | 'training'
  | 'template'
  | 'competitive'
  | 'featured'

export interface CatalogViewProps {
  // Page Configuration
  pageType?: string
  pageContext?: Record<string, any>

  // Filter Configuration
  defaultFilters?: CatalogFilters
  showFilters?: boolean
  filterOptions?: FilterOption[]

  // Display Options
  layout?: LayoutOption
  sortBy?: SortOption
  itemsPerPage?: number

  // UI Customization
  cardStyle?: CardStyle
  showDuration?: boolean
  showPresenter?: boolean

  // Featured Section
  featuredSection?: boolean
  featuredCount?: number
  featuredFilter?: {
    showInUpcoming?: boolean
    daysRecent?: number
  }
  featuredLayout?: LayoutOption
  featuredTitle?: string

  // Data (if provided directly instead of fetching)
  entries?: CatalogEntry[]

  // Taxonomy data for filters
  availableProducts?: Product[]
  availableTeams?: Team[]
  availableTopics?: Topic[]
  availableJourneyStages?: JourneyStage[]
  availableIndustries?: Industry[]
  availableCompetitors?: Competitor[]
  availableContentTypes?: ContentType[]
  availableAudiences?: Audience[]
}

export interface FilterPanelProps {
  filters: CatalogFilters
  onFiltersChange: (filters: CatalogFilters) => void
  filterOptions: FilterOption[]

  // Available options for each filter
  availableProducts?: Product[]
  availableTeams?: Team[]
  availableTopics?: Topic[]
  availableJourneyStages?: JourneyStage[]
  availableIndustries?: Industry[]
  availableCompetitors?: Competitor[]
  availableContentTypes?: ContentType[]
  availableAudiences?: Audience[]

  // UI Options
  showSearch?: boolean
  showClearAll?: boolean
}

export interface CatalogCardProps {
  entry: CatalogEntry
  variant?: CardStyle
  showDuration?: boolean
  showPresenter?: boolean
}
