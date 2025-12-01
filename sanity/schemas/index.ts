import post from './post'
import homepage from './homepage'
import about from './about'
import contact from './contact'
import page from './page'
import trainingSession from './trainingSession'
import learningModule from './learningModule'
import enablementArticle from './enablementArticle'
import templateResource from './templateResource'
import contentResource from './contentResource'
import competitiveResource from './competitiveResource'
import searchableContent from './searchableContent'
import searchEmbedding from './searchEmbedding'
import { navigation } from './navigation'
import { navigationItem } from './navigationItem'
import { siteSettings } from './siteSettings'

// Universal Catalog System
import catalogEntry from './catalogEntry'
import pageSection from './pageSection'

// Taxonomy types (for universal catalog filtering)
import product from './taxonomies/product'
import team from './taxonomies/team'
import topic from './taxonomies/topic'
import journeyStage from './taxonomies/journeyStage'
import industry from './taxonomies/industry'
import competitor from './taxonomies/competitor'
import contentType from './taxonomies/contentType'
import audience from './taxonomies/audience'
import learningPath from './taxonomies/learningPath'

// CoE Hub taxonomy types
import {
  coeSection,
  coeChannel,
  coeCapability,
  coeContentCategory,
  coeAudience,
  coeIndustry,
  coePermission,
  coeAssetType,
  coeEntry,
  coeHub,
  coeEmbedding,
} from './coe'

// Section types
import heroSection from './sections/heroSection'
import featureGridSection from './sections/featureGridSection'
import statsSection from './sections/statsSection'
import contentSection from './sections/contentSection'
import ctaSection from './sections/ctaSection'
import launchStatusSection from './sections/launchStatusSection'
import imageTextSection from './sections/imageTextSection'
import accordionSection from './sections/accordionSection'
import videoSection from './sections/videoSection'
import testimonialSection from './sections/testimonialSection'

// Homepage-specific sections
import heroWithSearchSection from './sections/heroWithSearchSection'
import teamToolkitsSection from './sections/teamToolkitsSection'
import quickTasksSection from './sections/quickTasksSection'
import productsGridSection from './sections/productsGridSection'
import whatsNewSection from './sections/whatsNewSection'
import popularResourcesSection from './sections/popularResourcesSection'
import helpSection from './sections/helpSection'
import quickStatsSection from './sections/quickStatsSection'
import featuredContentSection from './sections/featuredContentSection'

// Hub page system
import hubPage from './hubPage'
import hubContentSection from './sections/hubContentSection'
import hubStatGridSection from './sections/hubStatGridSection'
import hubFeatureCardsSection from './sections/hubFeatureCardsSection'
import hubProcessStepsSection from './sections/hubProcessStepsSection'

export const schemaTypes = [
  // Core content types
  post,
  homepage,
  about,
  contact,
  page,
  trainingSession,
  learningModule,
  enablementArticle,
  templateResource,
  contentResource,
  competitiveResource,
  searchableContent,
  searchEmbedding,
  navigation,
  navigationItem,
  siteSettings,
  // Universal catalog system
  catalogEntry,
  pageSection,
  // Taxonomy types
  product,
  team,
  topic,
  journeyStage,
  industry,
  competitor,
  contentType,
  audience,
  learningPath,
  // Section types
  heroSection,
  featureGridSection,
  statsSection,
  contentSection,
  ctaSection,
  launchStatusSection,
  imageTextSection,
  accordionSection,
  videoSection,
  testimonialSection,
  // Homepage-specific sections
  heroWithSearchSection,
  teamToolkitsSection,
  quickTasksSection,
  productsGridSection,
  whatsNewSection,
  popularResourcesSection,
  helpSection,
  quickStatsSection,
  featuredContentSection,
  // Hub page system
  hubPage,
  hubContentSection,
  hubStatGridSection,
  hubFeatureCardsSection,
  hubProcessStepsSection,
  // CoE Hub taxonomy types
  coeSection,
  coeChannel,
  coeCapability,
  coeContentCategory,
  coeAudience,
  coeIndustry,
  coePermission,
  coeAssetType,
  coeEntry,
  coeHub,
  coeEmbedding,
]
