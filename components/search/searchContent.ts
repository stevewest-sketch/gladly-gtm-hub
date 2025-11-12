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

  // Training & Certifications
  {
    title: 'Training Resources',
    description: 'Comprehensive training materials and certification programs',
    url: '/enablement/training',
    category: 'Learning',
    keywords: ['training', 'certification', 'learning path', 'education', 'onboarding'],
  },
  {
    title: 'Quick Setup Guide',
    description: 'Get started quickly with essential setup steps',
    url: '/quick-setup',
    category: 'Getting Started',
    keywords: ['setup', 'getting started', 'quick start', 'onboarding', 'first steps'],
  },

  // Common Searches & Help Topics
  {
    title: 'How to Demo Gladly',
    description: 'Complete guide to demonstrating Gladly products',
    url: '/enablement/demo/setup-guide',
    category: 'Demo',
    keywords: ['how to demo', 'demo guide', 'presentation', 'showing gladly', 'product demo'],
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate return on investment for Gladly implementation',
    url: '/coe/bva',
    category: 'Tools',
    keywords: ['roi', 'calculator', 'business case', 'financial', 'cost benefit'],
  },
  {
    title: 'Pricing Information',
    description: 'Sidekick Voice pricing and cost estimation',
    url: '/coe/bva',
    category: 'Tools',
    keywords: ['pricing', 'cost', 'price', 'how much', 'budget', 'estimate'],
  },
  {
    title: 'Competitive Battlecards',
    description: 'Win against competitors with battle-tested strategies',
    url: '/enablement/competitive',
    category: 'Sales',
    keywords: ['battlecard', 'zendesk', 'salesforce', 'service cloud', 'competitors', 'vs'],
  },
  {
    title: 'Case Studies',
    description: 'Real customer success stories and implementations',
    url: '/resources/content',
    category: 'Resources',
    keywords: ['case study', 'customer story', 'success story', 'testimonial', 'proof'],
  },
  {
    title: 'Pitch Decks',
    description: 'Presentation templates for sales pitches',
    url: '/resources/templates',
    category: 'Sales',
    keywords: ['pitch deck', 'presentation', 'slides', 'powerpoint', 'sales deck'],
  },
  {
    title: 'Product Features',
    description: 'Complete overview of Gladly platform capabilities',
    url: '/product',
    category: 'Product',
    keywords: ['features', 'capabilities', 'what can gladly do', 'functionality'],
  },

  // AI & Automation
  {
    title: 'Sidekick AI Overview',
    description: 'AI-powered agent assistance across all channels',
    url: '/product/sidekick-email',
    category: 'Product',
    keywords: ['sidekick', 'ai assistant', 'copilot', 'agent assist', 'ai agent'],
  },
  {
    title: 'AI Implementation Guide',
    description: 'Best practices for deploying AI features',
    url: '/coe/ai-best-practices',
    category: 'Implementation',
    keywords: ['ai setup', 'ai implementation', 'deploy ai', 'ai rollout'],
  },
  {
    title: 'Automation Strategies',
    description: 'Optimize customer service with intelligent automation',
    url: '/coe/ai-best-practices',
    category: 'CoE',
    keywords: ['automation', 'automate', 'efficiency', 'productivity', 'workflows'],
  },

  // Customer Success
  {
    title: 'Customer Onboarding',
    description: 'Best practices for onboarding new customers',
    url: '/enablement/toolkits/csm',
    category: 'CSM',
    keywords: ['onboarding', 'implementation', 'getting started', 'new customer'],
  },
  {
    title: 'Account Management',
    description: 'Resources for managing customer accounts',
    url: '/enablement/toolkits/csm',
    category: 'CSM',
    keywords: ['account management', 'csm', 'customer success', 'retention'],
  },
  {
    title: 'Upsell & Cross-sell',
    description: 'Strategies for expanding customer accounts',
    url: '/enablement/toolkits/sales',
    category: 'Sales',
    keywords: ['upsell', 'cross-sell', 'expansion', 'grow accounts', 'revenue growth'],
  },

  // Integration & Technical
  {
    title: 'API Documentation',
    description: 'Developer resources and API references',
    url: '/product/app-platform',
    category: 'Technical',
    keywords: ['api', 'developer', 'integration', 'technical', 'webhook', 'rest'],
  },
  {
    title: 'Integrations Catalog',
    description: 'Available integrations and connectors',
    url: '/product/app-platform',
    category: 'Technical',
    keywords: ['integrations', 'connectors', 'shopify', 'salesforce', 'connect'],
  },

  // Marketing & Brand
  {
    title: 'Brand Guidelines',
    description: 'Official Gladly brand assets and guidelines',
    url: '/resources/templates',
    category: 'Marketing',
    keywords: ['brand', 'logo', 'colors', 'guidelines', 'style guide'],
  },
  {
    title: 'Marketing Campaigns',
    description: 'Campaign templates and marketing resources',
    url: '/enablement/toolkits/marketing',
    category: 'Marketing',
    keywords: ['campaign', 'marketing', 'promotion', 'email marketing'],
  },
  {
    title: 'Social Proof',
    description: 'Customer testimonials and success metrics',
    url: '/coe/customer-wins',
    category: 'Resources',
    keywords: ['testimonial', 'review', 'proof', 'validation', 'customer feedback'],
  },

  // Common Questions & Help
  {
    title: 'Getting Help',
    description: 'How to get support and assistance',
    url: '/',
    category: 'Support',
    keywords: ['help', 'support', 'contact', 'assistance', 'question', 'slack'],
  },
  {
    title: 'Frequently Asked Questions',
    description: 'Common questions about Gladly',
    url: '/enablement/competitive',
    category: 'Support',
    keywords: ['faq', 'questions', 'answers', 'common questions', 'help'],
  },
  {
    title: 'Security & Compliance',
    description: 'Security documentation and compliance information',
    url: '/resources/templates',
    category: 'Resources',
    keywords: ['security', 'compliance', 'gdpr', 'soc2', 'privacy', 'data protection'],
  },

  // Industry Specific
  {
    title: 'Retail Solutions',
    description: 'Gladly for retail and e-commerce',
    url: '/resources/content',
    category: 'Industry',
    keywords: ['retail', 'ecommerce', 'shopping', 'commerce', 'store'],
  },
  {
    title: 'Travel & Hospitality',
    description: 'Customer service solutions for travel industry',
    url: '/resources/content',
    category: 'Industry',
    keywords: ['travel', 'hospitality', 'hotel', 'airline', 'tourism'],
  },

  // Performance & Optimization
  {
    title: 'Performance Optimization',
    description: 'Maximize efficiency and customer satisfaction',
    url: '/coe',
    category: 'CoE',
    keywords: ['optimize', 'performance', 'efficiency', 'improve', 'metrics'],
  },
  {
    title: 'Metrics & Reporting',
    description: 'Track and measure customer service performance',
    url: '/coe/bva',
    category: 'CoE',
    keywords: ['metrics', 'kpi', 'reporting', 'analytics', 'dashboard', 'measure'],
  },
];
