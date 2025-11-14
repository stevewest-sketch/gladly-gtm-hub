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
  // Toolkits
  {
    _type: 'searchableContent',
    title: 'Sales Toolkit',
    description: 'Comprehensive sales enablement resources and competitive intelligence',
    url: '/enablement/toolkits/sales',
    category: 'Toolkit',
    keywords: ['sales', 'ae', 'account executive', 'selling', 'pitch', 'competitive', 'battlecards'],
    priority: 90,
    isActive: true,
    icon: '💼',
  },
  {
    _type: 'searchableContent',
    title: 'CSM Toolkit',
    description: 'Customer Success Manager resources and best practices',
    url: '/enablement/toolkits/csm',
    category: 'Toolkit',
    keywords: ['csm', 'customer success', 'account management', 'retention', 'expansion'],
    priority: 90,
    isActive: true,
    icon: '🤝',
  },
  {
    _type: 'searchableContent',
    title: 'Marketing Toolkit',
    description: 'Marketing resources, templates, and campaign materials',
    url: '/enablement/toolkits/marketing',
    category: 'Toolkit',
    keywords: ['marketing', 'campaigns', 'content', 'brand', 'messaging'],
    priority: 85,
    isActive: true,
    icon: '📢',
  },
  {
    _type: 'searchableContent',
    title: 'SC Toolkit',
    description: 'Success Consultant tools and implementation resources',
    url: '/enablement/toolkits/success-consultant',
    category: 'Toolkit',
    keywords: ['sc', 'success consultant', 'implementation', 'onboarding', 'professional services'],
    priority: 85,
    isActive: true,
    icon: '🚀',
  },
  // Products
  {
    _type: 'searchableContent',
    title: 'Sidekick for Email',
    description: 'AI-powered email assistance product information',
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
    description: 'AI voice assistant for customer service',
    url: '/product/sidekick-voice',
    category: 'Product',
    keywords: ['sidekick', 'voice', 'ai', 'phone', 'calls'],
    priority: 95,
    isActive: true,
    icon: '🎤',
  },
  {
    _type: 'searchableContent',
    title: 'Sidekick for Chat',
    description: 'Real-time chat assistance and automation',
    url: '/product/sidekick-chat',
    category: 'Product',
    keywords: ['sidekick', 'chat', 'ai', 'messaging', 'live chat'],
    priority: 95,
    isActive: true,
    icon: '💬',
  },
  {
    _type: 'searchableContent',
    title: 'Customer AI',
    description: 'Advanced AI capabilities for customer service',
    url: '/product/customer-ai',
    category: 'Product',
    keywords: ['ai', 'artificial intelligence', 'automation', 'machine learning'],
    priority: 95,
    isActive: true,
    icon: '🤖',
  },
  // CoE
  {
    _type: 'searchableContent',
    title: 'Business Value Assessment',
    description: 'ROI calculator and business case resources',
    url: '/coe/bva',
    category: 'CoE',
    keywords: ['bva', 'roi', 'calculator', 'business case', 'value', 'savings', 'cost benefit'],
    priority: 85,
    isActive: true,
    icon: '📊',
  },
  {
    _type: 'searchableContent',
    title: 'AI Best Practices',
    description: 'Guidelines for implementing AI in customer service',
    url: '/coe/ai-best-practices',
    category: 'CoE',
    keywords: ['ai', 'best practices', 'implementation', 'guidelines', 'strategy'],
    priority: 80,
    isActive: true,
    icon: '💡',
  },
  // Training
  {
    _type: 'searchableContent',
    title: 'Demo Training',
    description: 'Learn how to effectively demonstrate Gladly products',
    url: '/enablement/demo',
    category: 'Learning',
    keywords: ['demo', 'demonstration', 'training', 'presentation', 'how to demo'],
    priority: 75,
    isActive: true,
    icon: '🎯',
  },
  {
    _type: 'searchableContent',
    title: 'Product Training',
    description: 'Comprehensive product knowledge and training materials',
    url: '/enablement/training',
    category: 'Learning',
    keywords: ['training', 'learning', 'education', 'courses', 'certification'],
    priority: 75,
    isActive: true,
    icon: '🎓',
  },
  // Resources
  {
    _type: 'searchableContent',
    title: 'Battle Cards',
    description: 'Competitive intelligence and positioning',
    url: '/resources/competitive',
    category: 'Resources',
    keywords: ['battlecard', 'competitive', 'comparison', 'vs', 'competitor'],
    priority: 80,
    isActive: true,
    icon: '⚔️',
  },
  {
    _type: 'searchableContent',
    title: 'Templates',
    description: 'Ready-to-use templates and documents',
    url: '/resources/templates',
    category: 'Resources',
    keywords: ['templates', 'documents', 'examples', 'samples'],
    priority: 70,
    isActive: true,
    icon: '📄',
  },
  {
    _type: 'searchableContent',
    title: 'Content Library',
    description: 'Marketing content, case studies, and assets',
    url: '/resources/content',
    category: 'Resources',
    keywords: ['content', 'case studies', 'whitepapers', 'assets', 'materials'],
    priority: 70,
    isActive: true,
    icon: '📚',
  },
];

async function seedSearchableContent() {
  console.log('🌱 Starting to seed searchable content...');

  try {
    // Create all items
    for (const item of searchableItems) {
      const result = await client.create(item);
      console.log(`✅ Created: ${item.title}`);
    }

    console.log(`\n✨ Successfully seeded ${searchableItems.length} searchable items!`);
    console.log('\nYou can now:');
    console.log('1. View them in Sanity Studio at http://localhost:3000/studio');
    console.log('2. Test the search functionality on your website');
    console.log('3. Edit/add more items through Sanity Studio');

  } catch (error) {
    console.error('❌ Error seeding searchable content:', error);
    process.exit(1);
  }
}

seedSearchableContent();
