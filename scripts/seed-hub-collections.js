/**
 * Seed script to create collections with subsections for ALL hubs
 * Run with: SANITY_API_TOKEN=... node scripts/seed-hub-collections.js
 *
 * Based on HTML mock designs:
 * - Content Hub: Meeting Decks, One-Pagers, Competitive, Templates & Tools
 * - Enablement Hub: BDR, Sales, CS, SC, Marketing, New Hire
 * - CoE Hub: Meeting Examples, Proof Points, Best Practices, Playbooks, Dashboards
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// ============================================
// ENABLEMENT HUB COLLECTIONS (from mock)
// ============================================
const enablementCollections = [
  {
    _type: 'collection',
    name: 'BDR',
    slug: { _type: 'slug', current: 'bdr' },
    hub: 'enablement',
    description: 'Training and resources for Business Development Representatives',
    icon: '🎯',
    color: '#3b82f6',
    order: 1,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Getting Started', icon: '🚀', filterLogic: 'featured', maxItems: 6, order: 0 },
      { name: 'Prospecting', icon: '🔍', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Cold Calling', icon: '📞', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Email Sequences', icon: '✉️', filterLogic: 'all', maxItems: 0, order: 3 },
    ],
  },
  {
    _type: 'collection',
    name: 'Sales',
    slug: { _type: 'slug', current: 'sales' },
    hub: 'enablement',
    description: 'Sales process, playbooks, and competitive training',
    icon: '💼',
    color: '#8b5cf6',
    order: 2,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Getting Started', icon: '🚀', filterLogic: 'featured', maxItems: 4, order: 0 },
      { name: 'Sales Process', icon: '📈', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Product Knowledge', icon: '📦', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Competitive', icon: '⚔️', filterLogic: 'all', maxItems: 0, order: 3 },
      { name: 'Value Selling', icon: '💰', filterLogic: 'all', maxItems: 0, order: 4 },
      { name: 'Sales Playbooks', icon: '📖', filterLogic: 'all', maxItems: 0, order: 5 },
    ],
  },
  {
    _type: 'collection',
    name: 'Customer Success',
    slug: { _type: 'slug', current: 'customer-success' },
    hub: 'enablement',
    description: 'CS onboarding, BVA methodology, health & retention',
    icon: '🤝',
    color: '#10b981',
    order: 3,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Onboarding', icon: '👋', filterLogic: 'featured', maxItems: 4, order: 0 },
      { name: 'BVA Methodology', icon: '💰', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Health & Retention', icon: '❤️', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Expansion', icon: '📈', filterLogic: 'all', maxItems: 0, order: 3 },
      { name: 'Customer Health', icon: '🤝', filterLogic: 'all', maxItems: 0, order: 4 },
    ],
  },
  {
    _type: 'collection',
    name: 'Solutions',
    slug: { _type: 'slug', current: 'solutions' },
    hub: 'enablement',
    description: 'Demo training, technical deep dives, guide writing',
    icon: '💡',
    color: '#f59e0b',
    order: 4,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Demo Training', icon: '🎬', filterLogic: 'featured', maxItems: 4, order: 0 },
      { name: 'Technical Deep Dives', icon: '🔧', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Guide Writing', icon: '📝', filterLogic: 'all', maxItems: 0, order: 2 },
    ],
  },
  {
    _type: 'collection',
    name: 'Marketing',
    slug: { _type: 'slug', current: 'marketing' },
    hub: 'enablement',
    description: 'Messaging, brand guidelines, and content strategy',
    icon: '📣',
    color: '#ec4899',
    order: 5,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Messaging', icon: '💬', filterLogic: 'featured', maxItems: 4, order: 0 },
      { name: 'Brand', icon: '🎨', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Content', icon: '📄', filterLogic: 'all', maxItems: 0, order: 2 },
    ],
  },
  {
    _type: 'collection',
    name: 'New Hire',
    slug: { _type: 'slug', current: 'new-hire' },
    hub: 'enablement',
    description: 'Week-by-week onboarding for new team members',
    icon: '📚',
    color: '#6366f1',
    order: 6,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Week 1: Foundations', icon: '📅', filterLogic: 'priority', maxItems: 4, order: 0 },
      { name: 'Week 2: Go Deeper', icon: '📅', filterLogic: 'priority', maxItems: 4, order: 1 },
      { name: 'Week 3: Apply', icon: '📅', filterLogic: 'priority', maxItems: 4, order: 2 },
      { name: 'Week 4: Certify', icon: '📅', filterLogic: 'priority', maxItems: 4, order: 3 },
    ],
  },
];

// ============================================
// COE HUB COLLECTIONS (from mock)
// ============================================
const coeCollections = [
  {
    _type: 'collection',
    name: 'Meeting Examples',
    slug: { _type: 'slug', current: 'meeting-examples' },
    hub: 'coe',
    description: 'Real customer meeting presentations and examples',
    icon: '📁',
    color: '#3b82f6',
    order: 1,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'BVA', icon: '💰', filterLogic: 'all', maxItems: 0, order: 0 },
      { name: 'EBR', icon: '📊', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Strategy Session', icon: '📋', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'QBR', icon: '📈', filterLogic: 'all', maxItems: 0, order: 3 },
    ],
  },
  {
    _type: 'collection',
    name: 'Proof Points',
    slug: { _type: 'slug', current: 'proof-points' },
    hub: 'coe',
    description: 'Customer metrics, stats, and proof points',
    icon: '📊',
    color: '#10b981',
    order: 2,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      // Proof Points uses a special table view, no subsections needed
    ],
  },
  {
    _type: 'collection',
    name: 'Best Practices',
    slug: { _type: 'slug', current: 'best-practices' },
    hub: 'coe',
    description: 'Proven patterns and guides for success',
    icon: '🎯',
    color: '#8b5cf6',
    order: 3,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Resolution Rate', icon: '📈', filterLogic: 'all', maxItems: 0, order: 0 },
      { name: 'Adoption', icon: '🚀', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Expansion', icon: '⬆️', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Implementation', icon: '🔧', filterLogic: 'all', maxItems: 0, order: 3 },
    ],
  },
  {
    _type: 'collection',
    name: 'Playbooks',
    slug: { _type: 'slug', current: 'playbooks' },
    hub: 'coe',
    description: 'Step-by-step playbooks for Sales and CS',
    icon: '📖',
    color: '#f59e0b',
    order: 4,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Sales', icon: '💼', filterLogic: 'all', maxItems: 0, order: 0 },
      { name: 'CS', icon: '🤝', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Implementation', icon: '🔧', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Expansion', icon: '📈', filterLogic: 'all', maxItems: 0, order: 3 },
    ],
  },
  {
    _type: 'collection',
    name: 'Dashboards',
    slug: { _type: 'slug', current: 'dashboards' },
    hub: 'coe',
    description: 'Performance dashboards and metrics',
    icon: '📈',
    color: '#ec4899',
    order: 5,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      // Dashboards don't need subsections - single view
    ],
  },
];

// ============================================
// CONTENT HUB COLLECTIONS (from mock - enhanced)
// ============================================
const contentCollections = [
  {
    _type: 'collection',
    name: 'Meeting Decks',
    slug: { _type: 'slug', current: 'meeting-decks' },
    hub: 'content',
    description: 'Presentation materials for customer meetings',
    icon: '📊',
    color: '#3b82f6',
    order: 1,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'First Meeting', icon: '👋', filterLogic: 'featured', maxItems: 6, order: 0 },
      { name: 'Discovery', icon: '🔍', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Evaluation', icon: '⚖️', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Closing', icon: '🤝', filterLogic: 'all', maxItems: 0, order: 3 },
      { name: 'Customer Success', icon: '🏆', filterLogic: 'all', maxItems: 0, order: 4 },
    ],
  },
  {
    _type: 'collection',
    name: 'One-Pagers',
    slug: { _type: 'slug', current: 'one-pagers' },
    hub: 'content',
    description: 'Quick reference sheets and summaries',
    icon: '📄',
    color: '#10b981',
    order: 2,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Platform', icon: '🖥️', filterLogic: 'all', maxItems: 0, order: 0 },
      { name: 'Gladly AI', icon: '🤖', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Voice', icon: '📞', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Standalone', icon: '📦', filterLogic: 'all', maxItems: 0, order: 3 },
    ],
  },
  {
    _type: 'collection',
    name: 'Competitive',
    slug: { _type: 'slug', current: 'competitive' },
    hub: 'content',
    description: 'Battle cards and competitive intelligence',
    icon: '⚔️',
    color: '#ef4444',
    order: 3,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Sierra', icon: '🏔️', filterLogic: 'all', maxItems: 0, order: 0 },
      { name: 'Zendesk', icon: '💬', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Intercom', icon: '📱', filterLogic: 'all', maxItems: 0, order: 2 },
      { name: 'Salesforce', icon: '☁️', filterLogic: 'all', maxItems: 0, order: 3 },
      { name: 'Decagon', icon: '🔷', filterLogic: 'all', maxItems: 0, order: 4 },
    ],
  },
  {
    _type: 'collection',
    name: 'Templates',
    slug: { _type: 'slug', current: 'templates' },
    hub: 'content',
    description: 'Email templates, documents, and proposals',
    icon: '📝',
    color: '#8b5cf6',
    order: 4,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Email', icon: '✉️', filterLogic: 'all', maxItems: 0, order: 0 },
      { name: 'Documents', icon: '📄', filterLogic: 'all', maxItems: 0, order: 1 },
      { name: 'Proposals', icon: '📋', filterLogic: 'all', maxItems: 0, order: 2 },
    ],
  },
  {
    _type: 'collection',
    name: 'Value Tools',
    slug: { _type: 'slug', current: 'value-tools' },
    hub: 'content',
    description: 'ROI calculators and value resources',
    icon: '💰',
    color: '#f59e0b',
    order: 5,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      { name: 'Calculators', icon: '🧮', filterLogic: 'all', maxItems: 0, order: 0 },
      { name: 'Supporting Resources', icon: '📚', filterLogic: 'all', maxItems: 0, order: 1 },
    ],
  },
];

// Combine all collections
const allCollections = [
  ...enablementCollections,
  ...coeCollections,
  ...contentCollections,
];

async function seedCollections() {
  console.log('🌱 Seeding Hub Collections...\n');
  console.log('━'.repeat(50));

  const stats = {
    created: 0,
    updated: 0,
    errors: 0,
    byHub: {
      enablement: { created: 0, updated: 0 },
      coe: { created: 0, updated: 0 },
      content: { created: 0, updated: 0 },
    },
  };

  try {
    for (const collection of allCollections) {
      const hubEmoji = {
        enablement: '🎓',
        coe: '🏆',
        content: '📚',
      }[collection.hub] || '📁';

      console.log(`\n${hubEmoji} ${collection.hub.toUpperCase()} Hub → ${collection.name}`);

      // Check if collection already exists
      const existingCollection = await client.fetch(
        `*[_type == "collection" && hub == $hub && slug.current == $slug][0]`,
        { hub: collection.hub, slug: collection.slug.current }
      );

      if (existingCollection) {
        console.log(`   ⚠️  Already exists, updating...`);
        await client
          .patch(existingCollection._id)
          .set(collection)
          .commit();
        console.log(`   ✅ Updated`);
        stats.updated++;
        stats.byHub[collection.hub].updated++;
      } else {
        await client.create(collection);
        console.log(`   ✅ Created`);
        stats.created++;
        stats.byHub[collection.hub].created++;
      }

      // Log subsections
      if (collection.subsections?.length > 0) {
        console.log(`   📋 Subsections: ${collection.subsections.map(s => s.name).join(', ')}`);
      }
    }

    console.log('\n' + '━'.repeat(50));
    console.log('\n✨ Seeding Complete!\n');
    console.log('📊 Summary:');
    console.log(`   • Total Collections: ${allCollections.length}`);
    console.log(`   • Created: ${stats.created}`);
    console.log(`   • Updated: ${stats.updated}`);
    console.log(`   • Errors: ${stats.errors}`);
    console.log('\n📁 By Hub:');
    console.log(`   • 🎓 Enablement: ${enablementCollections.length} collections (${enablementCollections.reduce((sum, c) => sum + (c.subsections?.length || 0), 0)} subsections)`);
    console.log(`   • 🏆 CoE: ${coeCollections.length} collections (${coeCollections.reduce((sum, c) => sum + (c.subsections?.length || 0), 0)} subsections)`);
    console.log(`   • 📚 Content: ${contentCollections.length} collections (${contentCollections.reduce((sum, c) => sum + (c.subsections?.length || 0), 0)} subsections)`);

  } catch (error) {
    console.error('\n❌ Error seeding collections:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedCollections();
