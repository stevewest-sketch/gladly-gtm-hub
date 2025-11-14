import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const searchableItems = [
  // ===== MAIN PAGES =====
  {
    _type: 'searchableContent',
    title: 'GTM Hub Homepage',
    description: 'Your central hub for selling, supporting, and growing with Gladly. Search resources, access toolkits, and find everything you need.',
    url: '/',
    category: 'Page',
    keywords: ['home', 'hub', 'gtm', 'main', 'start', 'welcome'],
    priority: 100,
    isActive: true,
    icon: '🏠',
  },

  // ===== CENTER OF EXCELLENCE =====
  {
    _type: 'searchableContent',
    title: 'Center of Excellence',
    description: 'Dashboards, customer wins, proof points, best practices, and institutional knowledge. 38+ resources for customer success.',
    url: '/coe',
    category: 'CoE',
    keywords: ['coe', 'center of excellence', 'dashboards', 'customer wins', 'best practices', 'proof points', 'metrics', 'analytics'],
    priority: 95,
    isActive: true,
    icon: '🏆',
  },
  {
    _type: 'searchableContent',
    title: 'Business Value Assessment (BVA)',
    description: 'ROI calculators, business case tools, and value projection resources. Build compelling cases that win deals.',
    url: '/coe/bva',
    category: 'CoE',
    keywords: ['bva', 'roi', 'calculator', 'business case', 'value', 'savings', 'cost benefit', 'business value'],
    priority: 90,
    isActive: true,
    icon: '📊',
  },
  {
    _type: 'searchableContent',
    title: 'AI Best Practices',
    description: 'Guidelines and strategies for implementing AI in customer service.',
    url: '/coe/ai-best-practices',
    category: 'CoE',
    keywords: ['ai', 'best practices', 'implementation', 'guidelines', 'strategy', 'artificial intelligence'],
    priority: 85,
    isActive: true,
    icon: '💡',
  },
  {
    _type: 'searchableContent',
    title: 'Customer Success Stories',
    description: 'Customer-approved metrics, testimonials, and success stories.',
    url: '/coe/customer-wins',
    category: 'CoE',
    keywords: ['customer wins', 'success stories', 'case studies', 'testimonials', 'proof points', 'metrics'],
    priority: 85,
    isActive: true,
    icon: '⭐',
  },

  // ===== ENABLEMENT - TOOLKITS =====
  {
    _type: 'searchableContent',
    title: 'Sales Toolkit',
    description: 'Complete sales enablement with 42+ resources: decks, templates, battle cards, dashboards, proposals, and mutual action plans.',
    url: '/enablement/toolkits/sales',
    category: 'Toolkit',
    keywords: ['sales', 'ae', 'account executive', 'selling', 'pitch', 'competitive', 'proposals', 'templates', 'decks'],
    priority: 95,
    isActive: true,
    icon: '💼',
  },
  {
    _type: 'searchableContent',
    title: 'CSM Toolkit',
    description: '20+ Customer Success Manager resources: QBR guides, dashboards, compensation guides, executive summaries, and retention tools.',
    url: '/enablement/toolkits/csm',
    category: 'Toolkit',
    keywords: ['csm', 'customer success', 'account management', 'retention', 'expansion', 'qbr', 'dashboards'],
    priority: 95,
    isActive: true,
    icon: '🤝',
  },
  {
    _type: 'searchableContent',
    title: 'Success Consultant / Technical Toolkit',
    description: '11+ SC/Technical resources: implementation templates, discovery tools, and technical documentation.',
    url: '/enablement/toolkits/success',
    category: 'Toolkit',
    keywords: ['sc', 'success consultant', 'implementation', 'onboarding', 'professional services', 'technical', 'ps'],
    priority: 90,
    isActive: true,
    icon: '🚀',
  },
  {
    _type: 'searchableContent',
    title: 'Marketing Toolkit',
    description: '12+ Marketing resources: brand guidelines, activity calendars, launch trackers, and content tracking.',
    url: '/enablement/toolkits/marketing',
    category: 'Toolkit',
    keywords: ['marketing', 'campaigns', 'content', 'brand', 'messaging', 'pmm', 'product marketing'],
    priority: 90,
    isActive: true,
    icon: '📢',
  },

  // ===== ENABLEMENT - RESOURCES =====
  {
    _type: 'searchableContent',
    title: 'Competitive Battle Cards',
    description: '28+ battle cards and competitive resources for Ada, Dixa, Genesys, Gorgias, Intercom, Kustomer, Zendesk, Sierra AI, and more.',
    url: '/enablement/competitive',
    category: 'Resources',
    keywords: ['competitive', 'battle cards', 'battlecards', 'vs', 'comparison', 'competitors', 'zendesk', 'intercom', 'genesys'],
    priority: 90,
    isActive: true,
    icon: '⚔️',
  },
  {
    _type: 'searchableContent',
    title: 'Demo Hub',
    description: '18+ demo resources: scripts, setup guides, demo training videos, mockups, and certifications.',
    url: '/enablement/demo',
    category: 'Learning',
    keywords: ['demo', 'demonstration', 'training', 'presentation', 'how to demo', 'mockups', 'scripts'],
    priority: 85,
    isActive: true,
    icon: '🎯',
  },
  {
    _type: 'searchableContent',
    title: 'Demo Setup Guide',
    description: 'Complete step-by-step demo setup instructions and configuration guide.',
    url: '/enablement/demo/setup-guide',
    category: 'Guide',
    keywords: ['demo setup', 'configuration', 'how to', 'instructions', 'getting started'],
    priority: 80,
    isActive: true,
    icon: '⚙️',
  },
  {
    _type: 'searchableContent',
    title: 'Training Hub',
    description: '47+ training videos, enablement sessions, and live recordings organized by product and date.',
    url: '/enablement/training',
    category: 'Learning',
    keywords: ['training', 'learning', 'education', 'courses', 'certification', 'videos', 'enablement'],
    priority: 85,
    isActive: true,
    icon: '🎓',
  },
  {
    _type: 'searchableContent',
    title: 'E-Learning Hub',
    description: 'Interactive learning modules and async training content.',
    url: '/enablement/e-learning',
    category: 'Learning',
    keywords: ['e-learning', 'online learning', 'modules', 'courses', 'self-paced', 'async'],
    priority: 80,
    isActive: true,
    icon: '📚',
  },
  {
    _type: 'searchableContent',
    title: 'Sales Playbooks',
    description: '9+ proven strategies and playbooks: adoption, expansion, competitive knockout, and sales plays.',
    url: '/enablement/playbooks',
    category: 'Guide',
    keywords: ['playbooks', 'strategies', 'plays', 'tactics', 'adoption', 'expansion', 'methodology'],
    priority: 85,
    isActive: true,
    icon: '📖',
  },

  // ===== RESOURCES =====
  {
    _type: 'searchableContent',
    title: 'Template Gallery',
    description: '17+ deck templates and slide inserts: pitch decks, brand guidelines, vertical slides, and partner materials.',
    url: '/resources/templates',
    category: 'Resources',
    keywords: ['templates', 'decks', 'slides', 'presentations', 'pitch', 'brand guidelines'],
    priority: 85,
    isActive: true,
    icon: '📄',
  },
  {
    _type: 'searchableContent',
    title: 'Content Library',
    description: '32+ one-pagers, case studies, whitepapers, articles, and marketing materials.',
    url: '/resources/content',
    category: 'Resources',
    keywords: ['content', 'case studies', 'whitepapers', 'assets', 'materials', 'one pagers', 'collateral'],
    priority: 85,
    isActive: true,
    icon: '📚',
  },

  // ===== PRODUCTS =====
  {
    _type: 'searchableContent',
    title: 'Sidekick for Email',
    description: 'AI-powered email assistance: product info, one-pagers, videos, and implementation guides.',
    url: '/product/sidekick-email',
    category: 'Product',
    keywords: ['sidekick', 'email', 'ai', 'automation', 'support'],
    priority: 95,
    isActive: true,
    icon: '📧',
  },
  {
    _type: 'searchableContent',
    title: 'Sidekick for Voice',
    description: '28+ resources for AI voice assistant: setup guides, training, battle cards, BVA tools, and demo materials.',
    url: '/product/sidekick-voice',
    category: 'Product',
    keywords: ['sidekick', 'voice', 'ai', 'phone', 'calls', 'ivr', 'conversational ai'],
    priority: 95,
    isActive: true,
    icon: '🎤',
  },
  {
    _type: 'searchableContent',
    title: 'Sidekick for Chat',
    description: 'Real-time chat assistance and automation product information.',
    url: '/product/sidekick-chat',
    category: 'Product',
    keywords: ['sidekick', 'chat', 'ai', 'messaging', 'live chat'],
    priority: 95,
    isActive: true,
    icon: '💬',
  },
  {
    _type: 'searchableContent',
    title: 'Sidekick Sales',
    description: '25+ resources for AI sales assistant: messaging briefs, market analysis, decks, prototypes, and launch materials.',
    url: '/product/sidekick-sales',
    category: 'Product',
    keywords: ['sidekick sales', 'ai sales', 'sales automation', 'sales assistant'],
    priority: 95,
    isActive: true,
    icon: '💼',
  },
  {
    _type: 'searchableContent',
    title: 'Sidekick Standalone / Zendesk',
    description: '22+ resources for standalone deployment: deck templates, mockups, demo scripts, and competitive positioning.',
    url: '/product/sidekick-standalone',
    category: 'Product',
    keywords: ['sidekick standalone', 'zendesk', 'standalone deployment', 'integration'],
    priority: 95,
    isActive: true,
    icon: '🔌',
  },
  {
    _type: 'searchableContent',
    title: 'Customer AI',
    description: '6+ resources for advanced AI capabilities: one-pagers, videos, guides, stats, and launch materials.',
    url: '/product/customer-ai',
    category: 'Product',
    keywords: ['ai', 'artificial intelligence', 'automation', 'machine learning', 'customer ai'],
    priority: 95,
    isActive: true,
    icon: '🤖',
  },
  {
    _type: 'searchableContent',
    title: 'App Platform',
    description: 'Integration and app platform capabilities and technical documentation.',
    url: '/product/app-platform',
    category: 'Product',
    keywords: ['app platform', 'integrations', 'apps', 'marketplace', 'api', 'developers'],
    priority: 90,
    isActive: true,
    icon: '🔧',
  },
  {
    _type: 'searchableContent',
    title: 'Guides & Journeys',
    description: '10+ resources for customer journeys: one-pagers, prototypes, demo scripts, and training materials.',
    url: '/product/guides-and-journeys',
    category: 'Product',
    keywords: ['guides', 'journeys', 'customer journeys', 'guided experiences', 'workflows'],
    priority: 90,
    isActive: true,
    icon: '🗺️',
  },

  // ===== HIGH-PRIORITY INDIVIDUAL RESOURCES =====
  // Battle Cards
  {
    _type: 'searchableContent',
    title: 'Zendesk Battle Card',
    description: 'Comprehensive competitive positioning vs Zendesk with feature comparisons and talk tracks.',
    url: '/enablement/competitive#zendesk',
    category: 'Resources',
    keywords: ['zendesk', 'battle card', 'competitive', 'vs zendesk', 'comparison'],
    priority: 85,
    isActive: true,
    icon: '⚔️',
  },
  {
    _type: 'searchableContent',
    title: 'Intercom Battle Card',
    description: 'Competitive intelligence and positioning against Intercom and Fin AI.',
    url: '/enablement/competitive#intercom',
    category: 'Resources',
    keywords: ['intercom', 'fin ai', 'battle card', 'competitive', 'vs intercom'],
    priority: 85,
    isActive: true,
    icon: '⚔️',
  },
  {
    _type: 'searchableContent',
    title: 'Genesys Battle Card',
    description: 'Competitive positioning and differentiation vs Genesys Cloud.',
    url: '/enablement/competitive#genesys',
    category: 'Resources',
    keywords: ['genesys', 'battle card', 'competitive', 'vs genesys', 'cloud'],
    priority: 85,
    isActive: true,
    icon: '⚔️',
  },
  {
    _type: 'searchableContent',
    title: 'Kustomer Battle Card',
    description: 'Competitive analysis and knockout strategies vs Kustomer.',
    url: '/enablement/competitive#kustomer',
    category: 'Resources',
    keywords: ['kustomer', 'battle card', 'competitive', 'vs kustomer'],
    priority: 80,
    isActive: true,
    icon: '⚔️',
  },
  {
    _type: 'searchableContent',
    title: 'Gorgias Battle Card',
    description: 'E-commerce focused competitive positioning vs Gorgias.',
    url: '/enablement/competitive#gorgias',
    category: 'Resources',
    keywords: ['gorgias', 'battle card', 'competitive', 'vs gorgias', 'ecommerce'],
    priority: 75,
    isActive: true,
    icon: '⚔️',
  },
  {
    _type: 'searchableContent',
    title: 'Ada Battle Card',
    description: 'AI chatbot competitive positioning and differentiation vs Ada.',
    url: '/enablement/competitive#ada',
    category: 'Resources',
    keywords: ['ada', 'battle card', 'competitive', 'vs ada', 'chatbot'],
    priority: 75,
    isActive: true,
    icon: '⚔️',
  },

  // Key Templates
  {
    _type: 'searchableContent',
    title: 'First Meeting Deck Template',
    description: 'Standard pitch deck template for initial prospect meetings.',
    url: '/resources/templates#first-meeting',
    category: 'Resources',
    keywords: ['first meeting', 'pitch deck', 'template', 'initial meeting', 'discovery'],
    priority: 80,
    isActive: true,
    icon: '📊',
  },
  {
    _type: 'searchableContent',
    title: 'Mutual Action Plan (MAP) Template',
    description: 'Template for creating mutual success plans with prospects and customers.',
    url: '/enablement/toolkits/sales#map',
    category: 'Resources',
    keywords: ['map', 'mutual action plan', 'template', 'success plan', 'project plan'],
    priority: 80,
    isActive: true,
    icon: '📋',
  },
  {
    _type: 'searchableContent',
    title: 'QBR Template',
    description: 'Quarterly Business Review template and guide for CSMs.',
    url: '/enablement/toolkits/csm#qbr',
    category: 'Resources',
    keywords: ['qbr', 'quarterly business review', 'template', 'customer success', 'review'],
    priority: 80,
    isActive: true,
    icon: '📈',
  },

  // Key Dashboards
  {
    _type: 'searchableContent',
    title: 'Looker Dashboards',
    description: 'Analytics dashboards for Sidekick performance, guides, answers, and cross-org metrics.',
    url: '/coe#dashboards',
    category: 'Tools',
    keywords: ['looker', 'dashboards', 'analytics', 'metrics', 'reporting', 'data'],
    priority: 80,
    isActive: true,
    icon: '📊',
  },
  {
    _type: 'searchableContent',
    title: 'Salesforce Dashboards',
    description: 'CRM dashboards for renewals, pipeline, consumption, and product utilization.',
    url: '/enablement/toolkits/csm#dashboards',
    category: 'Tools',
    keywords: ['salesforce', 'dashboards', 'crm', 'renewals', 'pipeline', 'forecast'],
    priority: 75,
    isActive: true,
    icon: '📊',
  },

  // Training & Certification
  {
    _type: 'searchableContent',
    title: 'Gladly Academy',
    description: 'Official online learning portal with courses and certifications.',
    url: 'https://academy.gladly.com/',
    category: 'Learning',
    keywords: ['academy', 'training', 'certification', 'courses', 'learning', 'education'],
    priority: 85,
    isActive: true,
    icon: '🎓',
  },
  {
    _type: 'searchableContent',
    title: 'Demo Certification',
    description: 'Demo certification program and training materials.',
    url: '/enablement/demo#certification',
    category: 'Learning',
    keywords: ['demo certification', 'certification', 'demo training', 'credential'],
    priority: 75,
    isActive: true,
    icon: '🏅',
  },

  // Tools & Utilities
  {
    _type: 'searchableContent',
    title: 'CoE Assistant (AI)',
    description: 'Gemini-powered AI assistant for institutional knowledge and research.',
    url: 'https://gemini.google.com/gem/1Ni5NH8lMDJ7v_FCN6DdLo2irtn56cLJW',
    category: 'Tools',
    keywords: ['coe assistant', 'ai assistant', 'gemini', 'research', 'knowledge base'],
    priority: 80,
    isActive: true,
    icon: '🤖',
  },
  {
    _type: 'searchableContent',
    title: 'Brand Guidelines',
    description: 'Official Gladly brand guidelines, logos, and visual identity standards.',
    url: '/resources/templates#brand',
    category: 'Resources',
    keywords: ['brand', 'guidelines', 'logo', 'branding', 'visual identity', 'style guide'],
    priority: 75,
    isActive: true,
    icon: '🎨',
  },
  {
    _type: 'searchableContent',
    title: 'Gladly Help Center',
    description: 'Official product documentation and help articles.',
    url: 'https://help.gladly.com/',
    category: 'Resources',
    keywords: ['help', 'documentation', 'docs', 'support', 'help center', 'knowledge base'],
    priority: 80,
    isActive: true,
    icon: '❓',
  },
  {
    _type: 'searchableContent',
    title: 'Integrations Marketplace',
    description: 'Browse and explore available Gladly integrations and apps.',
    url: 'https://www.gladly.ai/integrations/',
    category: 'Product',
    keywords: ['integrations', 'apps', 'marketplace', 'partners', 'api'],
    priority: 75,
    isActive: true,
    icon: '🔌',
  },
  {
    _type: 'searchableContent',
    title: 'Trust & Security Center',
    description: 'Security, compliance, and trust information.',
    url: 'https://trust.gladly.com/',
    category: 'Resources',
    keywords: ['trust', 'security', 'compliance', 'soc2', 'privacy', 'gdpr'],
    priority: 75,
    isActive: true,
    icon: '🔒',
  },

  // Additional common searches
  {
    _type: 'searchableContent',
    title: 'Rules of Engagement',
    description: '2025 rules of engagement for sales and field teams.',
    url: '/enablement/toolkits/sales#rules',
    category: 'Guide',
    keywords: ['rules of engagement', 'roe', 'guidelines', 'territory', 'sales process'],
    priority: 70,
    isActive: true,
    icon: '📋',
  },
  {
    _type: 'searchableContent',
    title: 'Proof Point Repository',
    description: 'Curated customer metrics, wins, and social proof.',
    url: '/coe#proof-points',
    category: 'Resources',
    keywords: ['proof points', 'metrics', 'stats', 'customer wins', 'social proof'],
    priority: 75,
    isActive: true,
    icon: '✨',
  },
  {
    _type: 'searchableContent',
    title: 'Gladly One-Pager',
    description: 'Main Gladly platform one-pager overview.',
    url: '/resources/content#gladly-one-pager',
    category: 'Resources',
    keywords: ['one pager', 'overview', 'platform', 'gladly', 'summary'],
    priority: 75,
    isActive: true,
    icon: '📄',
  },
];

async function seedAllContent() {
  console.log('🌱 Starting comprehensive content seed...');
  console.log(`📊 Total items to create: ${searchableItems.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  try {
    for (const item of searchableItems) {
      try {
        await client.create(item);
        successCount++;
        console.log(`✅ ${successCount}/${searchableItems.length}: ${item.title}`);
      } catch (error: any) {
        errorCount++;
        console.error(`❌ Failed to create: ${item.title} - ${error.message}`);
      }
    }

    console.log(`\n✨ Seed completed!`);
    console.log(`✅ Successfully created: ${successCount} items`);
    if (errorCount > 0) {
      console.log(`❌ Failed: ${errorCount} items`);
    }

    console.log('\n📋 Summary by Category:');
    const categories = searchableItems.reduce((acc: any, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} items`);
    });

    console.log('\n🎯 Next Steps:');
    console.log('1. View searchable content at http://localhost:3000/studio');
    console.log('2. Test search at http://localhost:3000');
    console.log('3. Try searching for: "battle cards", "sidekick", "training", "roi"');

  } catch (error) {
    console.error('❌ Critical error during seeding:', error);
    process.exit(1);
  }
}

seedAllContent();
