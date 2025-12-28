/**
 * Script to assign catalog entries with coeType='proof-point' to the Proof Points collection
 * Run with: SANITY_API_TOKEN=... node scripts/assign-proof-points-collection.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function assignProofPointsToCollection() {
  console.log('Starting proof point collection assignment...\n');

  // Step 1: Find the Proof Points collection
  const proofPointsCollection = await client.fetch(
    `*[_type == "collection" && slug.current == "proof-points" && hub == "coe"][0]{ _id, name }`
  );

  if (!proofPointsCollection) {
    console.error('ERROR: Proof Points collection not found!');
    console.log('Make sure you have run the seed-hub-collections.js script first.');
    process.exit(1);
  }

  console.log(`Found collection: ${proofPointsCollection.name} (${proofPointsCollection._id})\n`);

  // Step 2: Find all entries with coeType containing 'proof-point'
  const proofPointEntries = await client.fetch(
    `*[_type == "catalogEntry" && "proof-point" in coeType]{
      _id,
      title,
      coeHubCollections
    }`
  );

  console.log(`Found ${proofPointEntries.length} entries with coeType 'proof-point'\n`);

  if (proofPointEntries.length === 0) {
    console.log('No proof point entries found. Checking for entries published to CoE hub...\n');

    // Fallback: Find entries published to CoE hub that might be proof points
    const coeEntries = await client.fetch(
      `*[_type == "catalogEntry" && "coe" in publishedTo]{
        _id,
        title,
        coeType,
        coeHubCollections
      }`
    );

    console.log(`Found ${coeEntries.length} entries published to CoE Hub:`);
    coeEntries.forEach(e => {
      console.log(`  - ${e.title} (coeType: ${e.coeType?.join(', ') || 'none'})`);
    });

    return;
  }

  // Step 3: Update each entry to include the Proof Points collection
  let updated = 0;
  let skipped = 0;

  for (const entry of proofPointEntries) {
    // Check if already assigned to Proof Points collection
    const alreadyAssigned = entry.coeHubCollections?.some(
      assignment => assignment?.collection?._ref === proofPointsCollection._id
    );

    if (alreadyAssigned) {
      console.log(`SKIP: "${entry.title}" - already assigned to Proof Points`);
      skipped++;
      continue;
    }

    // Create the collection assignment
    const newAssignment = {
      _key: `proofpoints-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      collection: {
        _type: 'reference',
        _ref: proofPointsCollection._id,
      },
      subsections: [], // Empty means show in all subsections
    };

    // Patch the entry
    const existingCollections = entry.coeHubCollections || [];

    await client
      .patch(entry._id)
      .set({
        coeHubCollections: [...existingCollections, newAssignment],
      })
      .commit();

    console.log(`UPDATED: "${entry.title}" - assigned to Proof Points collection`);
    updated++;
  }

  console.log('\n========================================');
  console.log(`Assignment complete!`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Total:   ${proofPointEntries.length}`);
  console.log('========================================\n');
}

// Run the script
assignProofPointsToCollection().catch(console.error);
