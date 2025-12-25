/**
 * Seed script to create Content Hub collections with subsections
 * Run with: node scripts/seed-content-collections.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const collections = [
  {
    _type: 'collection',
    name: 'Meeting Decks',
    slug: { _type: 'slug', current: 'meeting-decks' },
    hub: 'content',
    description: 'Presentation materials for customer meetings',
    icon: '📊',
    color: '#3b82f6',
    order: 2,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      {
        name: 'First Meeting',
        icon: '👋',
        filterLogic: 'featured',
        maxItems: 6,
        order: 0,
      },
      {
        name: 'Discovery & Demo',
        icon: '🔍',
        filterLogic: 'all',
        maxItems: 8,
        order: 1,
      },
      {
        name: 'Executive Presentations',
        icon: '💼',
        filterLogic: 'priority',
        maxItems: 4,
        order: 2,
      },
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
    order: 3,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      {
        name: 'Product Overviews',
        icon: '📝',
        filterLogic: 'all',
        maxItems: 0,
        order: 0,
      },
      {
        name: 'Industry Solutions',
        icon: '🏢',
        filterLogic: 'all',
        maxItems: 0,
        order: 1,
      },
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
    order: 4,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      {
        name: 'Battle Cards',
        icon: '🃏',
        filterLogic: 'all',
        maxItems: 0,
        order: 0,
      },
      {
        name: 'Recently Updated',
        icon: '🆕',
        filterLogic: 'recent',
        maxItems: 5,
        order: 1,
      },
    ],
  },
  {
    _type: 'collection',
    name: 'Templates & Tools',
    slug: { _type: 'slug', current: 'templates-tools' },
    hub: 'content',
    description: 'Email templates, calculators, and productivity tools',
    icon: '🧰',
    color: '#f59e0b',
    order: 5,
    showInNavigation: true,
    isEnabled: true,
    subsections: [
      {
        name: 'Email Templates',
        icon: '✉️',
        filterLogic: 'all',
        maxItems: 0,
        order: 0,
      },
      {
        name: 'Calculators',
        icon: '🧮',
        filterLogic: 'all',
        maxItems: 0,
        order: 1,
      },
      {
        name: 'Messaging Scripts',
        icon: '💬',
        filterLogic: 'all',
        maxItems: 0,
        order: 2,
      },
    ],
  },
];

async function seedCollections() {
  console.log('🌱 Seeding Content Hub collections...\n');

  try {
    for (const collection of collections) {
      console.log(`📦 Creating collection: ${collection.name}`);

      // Check if collection already exists
      const existingCollection = await client.fetch(
        `*[_type == "collection" && slug.current == $slug][0]`,
        { slug: collection.slug.current }
      );

      if (existingCollection) {
        console.log(`   ⚠️  Collection "${collection.name}" already exists, updating...`);
        await client
          .patch(existingCollection._id)
          .set(collection)
          .commit();
        console.log(`   ✅ Updated: ${collection.name}\n`);
      } else {
        await client.create(collection);
        console.log(`   ✅ Created: ${collection.name}\n`);
      }
    }

    console.log('\n✨ Collections seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`   • Total collections: ${collections.length}`);
    console.log(`   • With subsections: ${collections.filter(c => c.subsections?.length).length}`);
    console.log(`   • Total subsections: ${collections.reduce((sum, c) => sum + (c.subsections?.length || 0), 0)}`);

  } catch (error) {
    console.error('\n❌ Error seeding collections:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedCollections();
