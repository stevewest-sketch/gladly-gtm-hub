const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Collections based on HTML mock analysis
const collections = [
  // ========================================
  // ENABLEMENT HUB COLLECTIONS
  // ========================================
  {
    _type: 'collection',
    name: 'Uncategorized',
    slug: { _type: 'slug', current: 'enablement-uncategorized' },
    hub: 'enablement',
    description: 'Training content not yet organized into specific collections',
    icon: '📁',
    order: 0,
    showInNavigation: false, // Hidden from main nav, but available for assignment
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'BDR',
    slug: { _type: 'slug', current: 'bdr' },
    hub: 'enablement',
    description: 'Training and resources for Business Development Representatives',
    icon: '📞',
    order: 1,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Sales',
    slug: { _type: 'slug', current: 'sales' },
    hub: 'enablement',
    description: 'Sales training, methodologies, and enablement content',
    icon: '💼',
    order: 2,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Customer Success',
    slug: { _type: 'slug', current: 'cs' },
    hub: 'enablement',
    description: 'CS onboarding, training, and best practices',
    icon: '🤝',
    order: 3,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Solutions Consultant',
    slug: { _type: 'slug', current: 'sc' },
    hub: 'enablement',
    description: 'Technical enablement for Solutions Consultants',
    icon: '🎯',
    order: 4,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Marketing',
    slug: { _type: 'slug', current: 'marketing' },
    hub: 'enablement',
    description: 'Marketing campaigns, content, and strategies',
    icon: '📣',
    order: 5,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'New Hire',
    slug: { _type: 'slug', current: 'new-hire' },
    hub: 'enablement',
    description: 'Onboarding resources for new team members',
    icon: '🌟',
    order: 6,
    showInNavigation: true,
    isEnabled: true,
  },

  // ========================================
  // COE HUB COLLECTIONS
  // ========================================
  {
    _type: 'collection',
    name: 'Uncategorized',
    slug: { _type: 'slug', current: 'coe-uncategorized' },
    hub: 'coe',
    description: 'CoE content not yet organized into specific collections',
    icon: '📁',
    order: 0,
    showInNavigation: false, // Hidden from main nav, but available for assignment
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Meeting Examples',
    slug: { _type: 'slug', current: 'meeting-examples' },
    hub: 'coe',
    description: 'Real customer meeting examples (BVAs, EBRs, QBRs)',
    icon: '🤝',
    order: 1,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Proof Points',
    slug: { _type: 'slug', current: 'proof-points' },
    hub: 'coe',
    description: 'Customer success stats, quotes, and case studies',
    icon: '📊',
    order: 2,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Best Practices',
    slug: { _type: 'slug', current: 'best-practices' },
    hub: 'coe',
    description: 'Internal best practices and process innovations',
    icon: '⭐',
    order: 3,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Playbooks',
    slug: { _type: 'slug', current: 'playbooks' },
    hub: 'coe',
    description: 'Step-by-step guides and playbooks',
    icon: '📖',
    order: 4,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Dashboards',
    slug: { _type: 'slug', current: 'dashboards' },
    hub: 'coe',
    description: 'Analytics dashboards and reporting tools',
    icon: '📈',
    order: 5,
    showInNavigation: true,
    isEnabled: true,
  },

  // ========================================
  // CONTENT HUB COLLECTIONS
  // ========================================
  {
    _type: 'collection',
    name: 'Uncategorized',
    slug: { _type: 'slug', current: 'uncategorized' },
    hub: 'content',
    description: 'Content not yet organized into specific collections',
    icon: '📁',
    order: 0,
    showInNavigation: false, // Hidden from main nav, but available for assignment
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Meeting Decks',
    slug: { _type: 'slug', current: 'meeting-decks' },
    hub: 'content',
    description: 'Presentation decks for customer meetings',
    icon: '📊',
    order: 1,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'One-Pagers',
    slug: { _type: 'slug', current: 'one-pagers' },
    hub: 'content',
    description: 'Quick reference one-page documents',
    icon: '📄',
    order: 2,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Competitive',
    slug: { _type: 'slug', current: 'competitive' },
    hub: 'content',
    description: 'Battle cards and competitive intelligence',
    icon: '⚔️',
    order: 3,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Templates',
    slug: { _type: 'slug', current: 'templates' },
    hub: 'content',
    description: 'Email templates, proposal templates, and more',
    icon: '📋',
    order: 4,
    showInNavigation: true,
    isEnabled: true,
  },
  {
    _type: 'collection',
    name: 'Value Tools',
    slug: { _type: 'slug', current: 'value-tools' },
    hub: 'content',
    description: 'ROI calculators and value assessment tools',
    icon: '🧮',
    order: 5,
    showInNavigation: true,
    isEnabled: true,
  },
];

async function seedCollections() {
  console.log('🌱 Starting collection seeding...\n');

  try {
    // Check if collections already exist
    const existingCollections = await client.fetch(`*[_type == "collection"]{ slug }`);
    const existingSlugs = new Set(existingCollections.map(c => c.slug.current));

    let created = 0;
    let skipped = 0;

    for (const collection of collections) {
      if (existingSlugs.has(collection.slug.current)) {
        console.log(`⏭️  Skipping ${collection.icon} ${collection.name} (already exists)`);
        skipped++;
        continue;
      }

      const result = await client.create(collection);
      console.log(`✅ Created ${collection.icon} ${collection.name} (${collection.hub})`);
      created++;
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${created} collections`);
    console.log(`   Skipped: ${skipped} collections (already existed)`);
    console.log(`   Total: ${collections.length} collections\n`);

    // Show collection counts by hub
    console.log(`📁 Collections by Hub:`);
    const byHub = collections.reduce((acc, c) => {
      acc[c.hub] = (acc[c.hub] || 0) + 1;
      return acc;
    }, {});

    Object.entries(byHub).forEach(([hub, count]) => {
      const icons = {
        enablement: '🎓',
        coe: '🏆',
        content: '📚',
      };
      console.log(`   ${icons[hub]} ${hub.charAt(0).toUpperCase() + hub.slice(1)}: ${count} collections`);
    });

    console.log('\n✨ Collection seeding complete!\n');
  } catch (error) {
    console.error('❌ Error seeding collections:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.log('💡 Usage: SANITY_API_TOKEN=your_token node scripts/seed-collections.js');
    process.exit(1);
  }

  seedCollections();
}

module.exports = { seedCollections, collections };
