import { SearchableItem } from './SearchBar';

/**
 * Searchable Content Database
 * Add all pages, resources, and content here to make them searchable
 */
export const searchableContent: SearchableItem[] = [
  // Toolkits
  {
    title: 'CSM Toolkit',
    description: 'Resources and tools for Customer Success Managers',
    url: '/enablement/toolkits/csm',
    category: 'Toolkit',
    keywords: ['csm', 'customer success', 'account management', 'retention'],
  },
  {
    title: 'Sales Toolkit',
    description: 'Sales enablement resources and competitive intelligence',
    url: '/enablement/toolkits/sales',
    category: 'Toolkit',
    keywords: ['sales', 'ae', 'account executive', 'selling', 'pitch', 'competitive'],
  },
  {
    title: 'Marketing Toolkit',
    description: 'Marketing resources, campaigns, and collateral',
    url: '/enablement/toolkits/marketing',
    category: 'Toolkit',
    keywords: ['marketing', 'campaigns', 'collateral', 'content', 'brand'],
  },
  {
    title: 'Success/SC Toolkit',
    description: 'Solution Consultant and Success team resources',
    url: '/enablement/toolkits/success',
    category: 'Toolkit',
    keywords: ['success', 'sc', 'solution consultant', 'implementation'],
  },

  // Training & Learning
  {
    title: 'E-Learning Modules',
    description: 'Interactive training courses and certification programs',
    url: '/enablement/e-learning',
    category: 'Learning',
    keywords: ['training', 'learning', 'certification', 'courses', 'education'],
  },
  {
    title: 'Demo Hub',
    description: 'Demo environments, setup guides, and best practices',
    url: '/enablement/demo',
    category: 'Demo',
    keywords: ['demo', 'demonstration', 'sandbox', 'environment', 'setup'],
  },
  {
    title: 'Demo Setup Guide',
    description: 'Step-by-step guide for setting up product demonstrations',
    url: '/enablement/demo/setup-guide',
    category: 'Demo',
    keywords: ['demo', 'setup', 'guide', 'walkthrough', 'how to demo'],
  },
  {
    title: 'Playbooks',
    description: 'Sales and implementation playbooks',
    url: '/enablement/playbooks',
    category: 'Resources',
    keywords: ['playbook', 'strategy', 'methodology', 'best practices'],
  },
  {
    title: 'Competitive Intelligence',
    description: 'Competitive analysis and battlecards',
    url: '/enablement/competitive',
    category: 'Resources',
    keywords: ['competitive', 'competition', 'battlecard', 'vs', 'comparison'],
  },

  // Resources
  {
    title: 'Content Library',
    description: 'Marketing collateral, case studies, and sales materials',
    url: '/resources/content',
    category: 'Resources',
    keywords: ['content', 'collateral', 'case study', 'one pager', 'slide deck'],
  },
  {
    title: 'Templates',
    description: 'Document templates, pitch decks, and brand guidelines',
    url: '/resources/templates',
    category: 'Resources',
    keywords: ['template', 'deck', 'presentation', 'document', 'brand'],
  },

  // CoE
  {
    title: 'Center of Excellence',
    description: 'CoE resources, best practices, and optimization guides',
    url: '/coe',
    category: 'CoE',
    keywords: ['coe', 'center of excellence', 'optimization', 'best practices'],
  },
  {
    title: 'Business Value Assessment (BVA)',
    description: 'BVA framework and value articulation resources',
    url: '/coe/bva',
    category: 'CoE',
    keywords: ['bva', 'business value', 'roi', 'value assessment', 'metrics'],
  },
  {
    title: 'AI Best Practices',
    description: 'Guidelines for implementing and optimizing Gladly AI',
    url: '/coe/ai-best-practices',
    category: 'CoE',
    keywords: ['ai', 'artificial intelligence', 'sidekick', 'automation', 'optimization'],
  },
  {
    title: 'Customer Wins',
    description: 'Customer success stories and case studies',
    url: '/coe/customer-wins',
    category: 'CoE',
    keywords: ['customer wins', 'success stories', 'case studies', 'testimonials'],
  },

  // Products
  {
    title: 'Gladly Platform Overview',
    description: 'Learn about the Gladly customer service platform',
    url: '/product',
    category: 'Product',
    keywords: ['platform', 'product', 'overview', 'features', 'capabilities'],
  },
  {
    title: 'Sidekick for Email',
    description: 'AI-powered email automation and assistance',
    url: '/product/sidekick-email',
    category: 'Product',
    keywords: ['sidekick', 'email', 'ai', 'automation', 'compose'],
  },
  {
    title: 'Sidekick for Voice',
    description: 'AI-powered voice support and call summarization',
    url: '/product/sidekick-voice',
    category: 'Product',
    keywords: ['sidekick', 'voice', 'phone', 'call', 'transcription'],
  },
  {
    title: 'Sidekick for Sales',
    description: 'AI-powered sales enablement and upsell recommendations',
    url: '/product/sidekick-sales',
    category: 'Product',
    keywords: ['sidekick', 'sales', 'upsell', 'recommendations', 'revenue'],
  },
  {
    title: 'Sidekick Standalone',
    description: 'Standalone Sidekick AI for any customer service platform',
    url: '/product/sidekick-standalone',
    category: 'Product',
    keywords: ['sidekick', 'standalone', 'bring your own', 'integration'],
  },
  {
    title: 'Customer AI',
    description: 'Self-service AI and intelligent automation',
    url: '/product/customer-ai',
    category: 'Product',
    keywords: ['customer ai', 'self-service', 'automation', 'chatbot', 'virtual agent'],
  },
  {
    title: 'Guides & Journeys',
    description: 'Guided workflows and customer journeys',
    url: '/product/guides-and-journeys',
    category: 'Product',
    keywords: ['guides', 'journeys', 'workflow', 'automation', 'orchestration'],
  },
  {
    title: 'App Platform',
    description: 'Extensibility and custom integrations',
    url: '/product/app-platform',
    category: 'Product',
    keywords: ['apps', 'integrations', 'api', 'extensions', 'marketplace'],
  },
];
