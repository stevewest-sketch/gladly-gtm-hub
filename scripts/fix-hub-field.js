const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  console.log("=== FIXING HUB FIELD FOR ALL ENTRIES ===\n");

  // Get all catalog entries that have publishedTo but no hub
  const entries = await client.fetch(`*[_type == "catalogEntry" && defined(publishedTo) && !defined(hub)]{
    _id,
    title,
    publishedTo
  }`);

  console.log("Found " + entries.length + " entries missing hub field\n");

  if (entries.length === 0) {
    console.log("All entries already have hub field set!");
    return;
  }

  let fixed = 0;
  let errors = 0;

  for (const entry of entries) {
    // Determine hub value from publishedTo array
    let hubValue = null;
    if (entry.publishedTo && entry.publishedTo.length > 0) {
      // Use first value from publishedTo
      hubValue = entry.publishedTo[0];
    }

    if (!hubValue) {
      console.log("SKIP: " + entry.title + " - no publishedTo value");
      continue;
    }

    try {
      await client
        .patch(entry._id)
        .set({ hub: hubValue })
        .commit();

      console.log("FIXED: " + entry.title + " -> hub: " + hubValue);
      fixed++;
    } catch (err) {
      console.log("ERROR: " + entry.title + " - " + err.message);
      errors++;
    }
  }

  console.log("\n=== DONE ===");
  console.log("Fixed: " + fixed);
  console.log("Errors: " + errors);
}

main().catch(console.error);
