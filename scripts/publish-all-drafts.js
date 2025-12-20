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

  console.log("=== PUBLISHING ALL DRAFT ENTRIES ===\n");

  // Get all draft catalog entries
  const catalogDrafts = await client.fetch(`*[_type == "catalogEntry" && status == "draft"]{
    _id, title
  }`);

  // Get all draft CoE entries
  const coeDrafts = await client.fetch(`*[_type == "coeEntry" && status == "draft"]{
    _id, title
  }`);

  console.log("Found " + catalogDrafts.length + " draft catalog entries");
  console.log("Found " + coeDrafts.length + " draft CoE entries");
  console.log("Total: " + (catalogDrafts.length + coeDrafts.length) + " to publish\n");

  let published = 0;
  let errors = 0;

  // Publish catalog entries
  console.log("Publishing catalog entries...");
  for (const entry of catalogDrafts) {
    try {
      await client
        .patch(entry._id)
        .set({ status: 'published' })
        .commit();
      published++;
    } catch (err) {
      console.log("ERROR: " + entry.title + " - " + err.message);
      errors++;
    }
  }
  console.log("  Done: " + catalogDrafts.length + " catalog entries");

  // Publish CoE entries
  console.log("Publishing CoE entries...");
  for (const entry of coeDrafts) {
    try {
      await client
        .patch(entry._id)
        .set({ status: 'published' })
        .commit();
      published++;
    } catch (err) {
      console.log("ERROR: " + entry.title + " - " + err.message);
      errors++;
    }
  }
  console.log("  Done: " + coeDrafts.length + " CoE entries");

  console.log("\n=== COMPLETE ===");
  console.log("Published: " + published);
  console.log("Errors: " + errors);
}

main().catch(console.error);
