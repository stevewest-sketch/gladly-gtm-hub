/**
 * Add subsections to existing Content Hub collections
 * Run with: node scripts/add-subsections-to-collections.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Define subsections for each collection
const collectionSubsections = {
  'meeting-decks': [
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
  'one-pagers': [
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
  'competitive': [
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
  'templates': [
    {
      name: 'Email Templates',
      icon: '✉️',
      filterLogic: 'all',
      maxItems: 0,
      order: 0,
    },
    {
      name: 'Presentation Templates',
      icon: '📊',
      filterLogic: 'all',
      maxItems: 0,
      order: 1,
    },
  ],
  'value-tools': [
    {
      name: 'Calculators',
      icon: '🧮',
      filterLogic: 'all',
      maxItems: 0,
      order: 0,
    },
    {
      name: 'Messaging Scripts',
      icon: '💬',
      filterLogic: 'all',
      maxItems: 0,
      order: 1,
    },
  ],
};

async function addSubsections() {
  console.log('🔧 Adding subsections to Content Hub collections...\n');

  try {
    // Fetch all content collections
    const collections = await client.fetch(
      `*[_type == "collection" && hub == "content" && isEnabled == true] {
        _id,
        name,
        slug,
        subsections
      }`
    );

    let updatedCount = 0;
    let skippedCount = 0;

    for (const collection of collections) {
      const slug = collection.slug.current;
      const subsections = collectionSubsections[slug];

      if (!subsections) {
        console.log(`⏭️  Skipping "${collection.name}" - no subsections defined`);
        skippedCount++;
        continue;
      }

      if (collection.subsections && collection.subsections.length > 0) {
        console.log(`⚠️  "${collection.name}" already has subsections, skipping...`);
        skippedCount++;
        continue;
      }

      console.log(`📝 Adding ${subsections.length} subsections to "${collection.name}"...`);

      await client
        .patch(collection._id)
        .set({ subsections })
        .commit();

      console.log(`   ✅ Updated "${collection.name}" with subsections:`);
      subsections.forEach(s => {
        console.log(`      ${s.icon} ${s.name} (${s.filterLogic})`);
      });
      console.log('');

      updatedCount++;
    }

    console.log('\n✨ Subsections added successfully!');
    console.log(`   • Collections updated: ${updatedCount}`);
    console.log(`   • Collections skipped: ${skippedCount}`);

  } catch (error) {
    console.error('\n❌ Error adding subsections:', error.message);
    process.exit(1);
  }
}

// Run the function
addSubsections();
