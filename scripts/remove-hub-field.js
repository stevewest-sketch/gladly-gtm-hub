const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function removeHubField() {
  // Find all catalogEntry documents - we'll check for hub field in JS
  const entries = await client.fetch(`*[_type == "catalogEntry"]{
    _id,
    title,
    hub,
    publishedTo
  }`);

  // Filter to entries that have the hub key (even if null)
  const entriesWithHub = entries.filter(e => 'hub' in e);

  console.log('Found', entriesWithHub.length, 'entries with "hub" field (including null values)');

  if (entriesWithHub.length === 0) {
    console.log('No entries to migrate!');
    return;
  }

  let updated = 0;
  let errors = 0;

  for (const entry of entriesWithHub) {
    try {
      // Ensure publishedTo includes the hub value if it has a real value
      let newPublishedTo = entry.publishedTo || [];
      if (entry.hub && !newPublishedTo.includes(entry.hub)) {
        newPublishedTo = [...newPublishedTo, entry.hub];
      }

      // Update: set publishedTo and unset hub
      await client
        .patch(entry._id)
        .set({ publishedTo: newPublishedTo })
        .unset(['hub'])
        .commit();

      console.log('UPDATED:', entry.title);
      updated++;
    } catch (err) {
      console.log('ERROR:', entry.title, '-', err.message.substring(0, 60));
      errors++;
    }
  }

  console.log('\n=== COMPLETE ===');
  console.log('Updated:', updated);
  console.log('Errors:', errors);
}

removeHubField().catch(console.error);
