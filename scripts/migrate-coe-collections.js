/**
 * Migrate coeHubCollections from simple references to collection + subsection assignments
 * Run with: SANITY_API_TOKEN=xxx node scripts/migrate-coe-collections.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function migrateCoeCollections() {
  console.log('🔄 Migrating coeHubCollections to new format...\n');

  try {
    // Fetch all catalog entries with old-style collection references
    const entries = await client.fetch(
      `*[_type == "catalogEntry" && defined(coeHubCollections)] {
        _id,
        title,
        coeHubCollections
      }`
    );

    console.log(`Found ${entries.length} entries with CoE collection assignments\n`);

    let migratedCount = 0;
    let skippedCount = 0;

    for (const entry of entries) {
      // Skip if no collections
      if (!entry.coeHubCollections || entry.coeHubCollections.length === 0) {
        console.log(`⏭️  Skipping "${entry.title}" - no collections`);
        skippedCount++;
        continue;
      }

      // Check if already migrated (has object structure with collection field)
      const firstCollection = entry.coeHubCollections[0];

      if (firstCollection && typeof firstCollection === 'object' && firstCollection.collection) {
        console.log(`⏭️  Skipping "${entry.title}" - already migrated`);
        skippedCount++;
        continue;
      }

      // Check if old format (array of references)
      if (firstCollection && typeof firstCollection === 'object' && firstCollection._ref) {
        console.log(`📝 Migrating "${entry.title}"...`);

        // Convert from old format to new format
        const newCollections = entry.coeHubCollections.map(ref => ({
          _type: 'collectionAssignment',
          _key: Math.random().toString(36).substr(2, 9),
          collection: {
            _type: 'reference',
            _ref: ref._ref,
          },
          subsections: [], // Empty = show in all subsections
        }));

        await client
          .patch(entry._id)
          .set({ coeHubCollections: newCollections })
          .commit();

        console.log(`   ✅ Migrated ${newCollections.length} collection(s)`);
        migratedCount++;
      } else {
        console.log(`⚠️  Skipping "${entry.title}" - unexpected format`);
        skippedCount++;
      }
    }

    console.log('\n✨ Migration complete!');
    console.log(`   • Entries migrated: ${migratedCount}`);
    console.log(`   • Entries skipped: ${skippedCount}`);

  } catch (error) {
    console.error('\n❌ Migration error:', error.message);
    process.exit(1);
  }
}

// Run the migration
migrateCoeCollections();
