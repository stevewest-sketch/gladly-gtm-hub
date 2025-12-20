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

  // Check a working entry vs a new entry
  console.log("=== Comparing Working vs New Entry ===\n");

  const working = await client.fetch(`*[_type == "catalogEntry" && title == "First Meeting Pitch Play"][0]{
    _id, title, publishedTo, status
  }`);

  const newEntry = await client.fetch(`*[_type == "catalogEntry" && title == "Selling High + FM Deck"][0]{
    _id, title, publishedTo, status
  }`);

  console.log("WORKING (First Meeting Pitch Play):");
  console.log("  publishedTo:", JSON.stringify(working.publishedTo));
  console.log("  status:", working.status);
  console.log("");

  console.log("NEW (Selling High + FM Deck):");
  console.log("  publishedTo:", JSON.stringify(newEntry.publishedTo));
  console.log("  status:", newEntry.status);
  console.log("");

  // They look the same, so let's try patching to force a refresh
  console.log("Patching new entry to force refresh...");

  await client
    .patch(newEntry._id)
    .set({ publishedTo: ['enablement'] })
    .commit();

  console.log("Done. Try refreshing Studio.");
}

main().catch(console.error);
