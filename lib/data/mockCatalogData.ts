import { CatalogEntry, Product, Team, Topic, ContentType, JourneyStage, Industry, Competitor } from '../types/catalog'

// Mock Taxonomy Data
export const mockProducts: Product[] = [
  {
    _id: 'product-sidekick',
    _type: 'product',
    name: 'Sidekick',
    slug: { current: 'sidekick' },
    description: 'AI-powered customer service assistant',
    color: '#8C69F0',
    order: 1,
  },
  {
    _id: 'product-hero',
    _type: 'product',
    name: 'Hero',
    slug: { current: 'hero' },
    description: 'Customer service platform',
    color: '#2563EB',
    order: 2,
  },
  {
    _id: 'product-superhero',
    _type: 'product',
    name: 'Superhero',
    slug: { current: 'superhero' },
    description: 'Advanced customer experience platform',
    color: '#DC2626',
    order: 3,
  },
]

export const mockTeams: Team[] = [
  {
    _id: 'team-sales',
    _type: 'team',
    name: 'Sales',
    slug: { current: 'sales' },
    description: 'Sales team resources',
    order: 1,
  },
  {
    _id: 'team-cs',
    _type: 'team',
    name: 'Customer Success',
    slug: { current: 'customer-success' },
    description: 'Customer success team resources',
    order: 2,
  },
  {
    _id: 'team-marketing',
    _type: 'team',
    name: 'Marketing',
    slug: { current: 'marketing' },
    description: 'Marketing team resources',
    order: 3,
  },
]

export const mockTopics: Topic[] = [
  {
    _id: 'topic-demo',
    _type: 'topic',
    name: 'Demo',
    slug: { current: 'demo' },
    category: 'sales-process',
    order: 1,
  },
  {
    _id: 'topic-discovery',
    _type: 'topic',
    name: 'Discovery',
    slug: { current: 'discovery' },
    category: 'sales-process',
    order: 2,
  },
  {
    _id: 'topic-competitive',
    _type: 'topic',
    name: 'Competitive',
    slug: { current: 'competitive' },
    category: 'product-knowledge',
    order: 3,
  },
  {
    _id: 'topic-roi',
    _type: 'topic',
    name: 'ROI & Business Value',
    slug: { current: 'roi' },
    category: 'business-value',
    order: 4,
  },
  {
    _id: 'topic-bva',
    _type: 'topic',
    name: 'BVA',
    slug: { current: 'bva' },
    category: 'business-value',
    order: 5,
  },
]

export const mockContentTypes: ContentType[] = [
  {
    _id: 'contenttype-training',
    _type: 'contentType',
    name: 'Training',
    slug: { current: 'training' },
    icon: '🎓',
    color: '#2563EB',
    order: 1,
  },
  {
    _id: 'contenttype-elearning',
    _type: 'contentType',
    name: 'E-Learning',
    slug: { current: 'elearning' },
    icon: '📚',
    color: '#7C3AED',
    order: 2,
  },
  {
    _id: 'contenttype-template',
    _type: 'contentType',
    name: 'Template',
    slug: { current: 'template' },
    icon: '📄',
    color: '#059669',
    order: 3,
  },
  {
    _id: 'contenttype-competitive',
    _type: 'contentType',
    name: 'Competitive',
    slug: { current: 'competitive' },
    icon: '⚔️',
    color: '#DC2626',
    order: 4,
  },
  {
    _id: 'contenttype-guide',
    _type: 'contentType',
    name: 'Guide',
    slug: { current: 'guide' },
    icon: '📖',
    color: '#EA580C',
    order: 5,
  },
]

export const mockJourneyStages: JourneyStage[] = [
  {
    _id: 'stage-sales-process',
    _type: 'journeyStage',
    name: 'Sales Process',
    slug: { current: 'sales-process' },
    order: 1,
    icon: '📋',
    phase: 'pre-sales',
  },
  {
    _id: 'stage-demo',
    _type: 'journeyStage',
    name: 'Demo',
    slug: { current: 'demo' },
    order: 2,
    icon: '🎬',
    phase: 'pre-sales',
  },
  {
    _id: 'stage-bva',
    _type: 'journeyStage',
    name: 'BVA',
    slug: { current: 'bva' },
    order: 3,
    icon: '💰',
    phase: 'pre-sales',
  },
]

export const mockIndustries: Industry[] = [
  {
    _id: 'industry-retail',
    _type: 'industry',
    name: 'Retail',
    slug: { current: 'retail' },
    description: 'Retail and e-commerce customer experience',
    order: 1,
  },
  {
    _id: 'industry-saas',
    _type: 'industry',
    name: 'SaaS',
    slug: { current: 'saas' },
    description: 'Software as a service companies',
    order: 2,
  },
  {
    _id: 'industry-financial',
    _type: 'industry',
    name: 'Financial Services',
    slug: { current: 'financial-services' },
    description: 'Banking and financial technology',
    order: 3,
  },
]

export const mockCompetitors: Competitor[] = [
  {
    _id: 'comp-zendesk',
    _type: 'competitor',
    name: 'Zendesk',
    slug: { current: 'zendesk' },
    description: 'Customer service software company',
    website: 'https://www.zendesk.com',
  },
  {
    _id: 'comp-salesforce',
    _type: 'competitor',
    name: 'Salesforce Service Cloud',
    slug: { current: 'salesforce' },
    description: 'CRM and customer service platform',
    website: 'https://www.salesforce.com',
  },
  {
    _id: 'comp-freshdesk',
    _type: 'competitor',
    name: 'Freshdesk',
    slug: { current: 'freshdesk' },
    description: 'Cloud-based customer support software',
    website: 'https://www.freshdesk.com',
  },
]

// Mock Catalog Entries
export const mockCatalogEntries: CatalogEntry[] = [
  {
    _id: 'entry-1',
    _type: 'catalogEntry',
    title: 'Sidekick Demo Best Practices',
    description: 'Learn the best practices for delivering compelling Sidekick product demonstrations that showcase AI-powered customer service capabilities.',
    slug: { current: 'sidekick-demo-best-practices' },
    contentType: mockContentTypes[0], // Training
    pageTemplate: 'training-session',
    format: 'live-replay',
    products: [mockProducts[0]], // Sidekick
    teams: [mockTeams[0], mockTeams[1]], // Sales, CS
    topics: [mockTopics[0]], // Demo
    journeyStages: [mockJourneyStages[1]], // Demo stage
    publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    duration: 45,
    presenter: 'Sarah Johnson',
    featured: true,
    showInUpcoming: true,
    priority: 90,
    status: 'published',
    keyTakeaways: [
      'Start with the customer problem, not product features',
      'Use real-world scenarios relevant to their industry',
      'Demonstrate AI capabilities with live interactions',
    ],
  },
  {
    _id: 'entry-2',
    _type: 'catalogEntry',
    title: 'Competitive Battle Card: Zendesk',
    description: 'Complete competitive intelligence on Zendesk including key differentiators, common objections, and winning strategies.',
    slug: { current: 'competitive-zendesk' },
    contentType: mockContentTypes[3], // Competitive
    pageTemplate: 'battle-card',
    format: 'document',
    products: [mockProducts[0], mockProducts[1]], // Sidekick, Hero
    teams: [mockTeams[0]], // Sales
    topics: [mockTopics[2]], // Competitive
    publishDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    featured: true,
    priority: 85,
    status: 'published',
    keyTakeaways: [
      'Gladly offers true omnichannel vs Zendesk ticket-based system',
      'AI-powered agent assistance reduces handle time by 40%',
      'Better suited for modern B2C customer service',
    ],
  },
  {
    _id: 'entry-3',
    _type: 'catalogEntry',
    title: 'Business Value Analysis Framework',
    description: 'Step-by-step guide for conducting business value assessments with enterprise customers to quantify ROI and build compelling business cases.',
    slug: { current: 'bva-framework' },
    contentType: mockContentTypes[4], // Guide
    pageTemplate: 'play',
    format: 'document',
    products: [mockProducts[0], mockProducts[1], mockProducts[2]], // All products
    teams: [mockTeams[0], mockTeams[1]], // Sales, CS
    topics: [mockTopics[3], mockTopics[4]], // ROI, BVA
    journeyStages: [mockJourneyStages[2]], // BVA stage
    publishDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 80,
    status: 'published',
    keyTakeaways: [
      'Focus on business outcomes, not software features',
      'Quantify time savings, cost reduction, and revenue impact',
      'Use customer-specific data whenever possible',
    ],
  },
  {
    _id: 'entry-4',
    _type: 'catalogEntry',
    title: 'Hero Platform Overview Training',
    description: 'Comprehensive training on the Hero customer service platform, covering core features, use cases, and implementation best practices.',
    slug: { current: 'hero-platform-overview' },
    contentType: mockContentTypes[0], // Training
    pageTemplate: 'training-session',
    format: 'live-replay',
    products: [mockProducts[1]], // Hero
    teams: [mockTeams[0], mockTeams[1], mockTeams[2]], // All teams
    topics: [mockTopics[0], mockTopics[1]], // Demo, Discovery
    publishDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    presenter: 'Michael Chen',
    priority: 75,
    status: 'published',
  },
  {
    _id: 'entry-5',
    _type: 'catalogEntry',
    title: 'Discovery Call Script Template',
    description: 'Proven discovery call framework with questions, talk tracks, and qualification criteria for initial customer conversations.',
    slug: { current: 'discovery-call-template' },
    contentType: mockContentTypes[2], // Template
    pageTemplate: 'play',
    format: 'template',
    products: [mockProducts[0], mockProducts[1]], // Sidekick, Hero
    teams: [mockTeams[0]], // Sales
    topics: [mockTopics[1]], // Discovery
    journeyStages: [mockJourneyStages[0]], // Sales Process
    publishDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 70,
    status: 'published',
    hasHowToUse: true,
  },
  {
    _id: 'entry-6',
    _type: 'catalogEntry',
    title: 'Sidekick AI Capabilities Deep Dive',
    description: 'Advanced training on Sidekick AI features including sentiment analysis, auto-response suggestions, and conversation intelligence.',
    slug: { current: 'sidekick-ai-deep-dive' },
    contentType: mockContentTypes[1], // E-Learning
    pageTemplate: 'training-session',
    format: 'async',
    products: [mockProducts[0]], // Sidekick
    teams: [mockTeams[0], mockTeams[1]], // Sales, CS
    topics: [mockTopics[0]], // Demo
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    duration: 30,
    showInUpcoming: true,
    priority: 88,
    status: 'published',
  },
  {
    _id: 'entry-7',
    _type: 'catalogEntry',
    title: 'ROI Calculator Tool & Methodology',
    description: 'Interactive ROI calculator with methodology guide for quantifying customer service efficiency gains and cost savings.',
    slug: { current: 'roi-calculator' },
    contentType: mockContentTypes[2], // Template
    pageTemplate: 'play',
    format: 'template',
    products: [mockProducts[0], mockProducts[1], mockProducts[2]], // All products
    teams: [mockTeams[0], mockTeams[1]], // Sales, CS
    topics: [mockTopics[3]], // ROI
    journeyStages: [mockJourneyStages[2]], // BVA
    publishDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 82,
    status: 'published',
    hasHowToUse: true,
  },
  {
    _id: 'entry-8',
    _type: 'catalogEntry',
    title: 'Superhero Enterprise Features',
    description: 'Training on advanced enterprise capabilities in Superhero including custom workflows, advanced analytics, and integrations.',
    slug: { current: 'superhero-enterprise' },
    contentType: mockContentTypes[0], // Training
    pageTemplate: 'training-session',
    format: 'live-replay',
    products: [mockProducts[2]], // Superhero
    teams: [mockTeams[0], mockTeams[1]], // Sales, CS
    topics: [mockTopics[0]], // Demo
    publishDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 50,
    presenter: 'Emily Rodriguez',
    priority: 78,
    status: 'published',
  },
  {
    _id: 'entry-9',
    _type: 'catalogEntry',
    title: 'Handling Price Objections',
    description: 'Techniques and scripts for effectively addressing pricing concerns and demonstrating value in competitive situations.',
    slug: { current: 'price-objections' },
    contentType: mockContentTypes[4], // Guide
    pageTemplate: 'play',
    format: 'document',
    products: [mockProducts[0], mockProducts[1]], // Sidekick, Hero
    teams: [mockTeams[0]], // Sales
    topics: [mockTopics[2], mockTopics[3]], // Competitive, ROI
    publishDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 72,
    status: 'published',
  },
  {
    _id: 'entry-10',
    _type: 'catalogEntry',
    title: 'Customer Success Onboarding Playbook',
    description: 'Complete playbook for CS teams to successfully onboard new customers including timelines, milestones, and best practices.',
    slug: { current: 'cs-onboarding-playbook' },
    contentType: mockContentTypes[4], // Guide
    pageTemplate: 'play',
    format: 'document',
    products: [mockProducts[0], mockProducts[1], mockProducts[2]], // All products
    teams: [mockTeams[1]], // CS
    topics: [mockTopics[1]], // Discovery (using as proxy for onboarding)
    publishDate: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 76,
    status: 'published',
    hasHowToUse: true,
  },
  {
    _id: 'entry-11',
    _type: 'catalogEntry',
    title: 'Multi-Product Demo Strategy',
    description: 'NEW: Learn how to effectively demonstrate multiple Gladly products in a single session to showcase the full platform value.',
    slug: { current: 'multi-product-demo' },
    contentType: mockContentTypes[0], // Training
    pageTemplate: 'training-session',
    format: 'live-replay',
    products: [mockProducts[0], mockProducts[1], mockProducts[2]], // All products
    teams: [mockTeams[0]], // Sales
    topics: [mockTopics[0]], // Demo
    journeyStages: [mockJourneyStages[1]], // Demo stage
    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (NEW!)
    duration: 40,
    presenter: 'David Park',
    featured: true,
    showInUpcoming: true,
    priority: 95,
    status: 'published',
  },
  {
    _id: 'entry-12',
    _type: 'catalogEntry',
    title: 'Q4 2024 Competitive Updates',
    description: 'Latest competitive intelligence updates for Q4 2024 covering Zendesk, Salesforce, and Intercom recent releases.',
    slug: { current: 'q4-competitive-updates' },
    contentType: mockContentTypes[3], // Competitive
    pageTemplate: 'battle-card',
    format: 'video',
    products: [mockProducts[0], mockProducts[1]], // Sidekick, Hero
    teams: [mockTeams[0], mockTeams[2]], // Sales, Marketing
    topics: [mockTopics[2]], // Competitive
    publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (NEW!)
    duration: 25,
    showInUpcoming: true,
    priority: 92,
    status: 'published',
  },
]
