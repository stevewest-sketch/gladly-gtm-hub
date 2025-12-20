const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function analyze() {
  // Get all catalogEntry documents
  const entries = await client.fetch(`*[_type == "catalogEntry"]{
    _id,
    title,
    entryType,
    "hubName": hub->name,
    "hubSlug": hub->slug.current
  } | order(hubName asc, title asc)`);

  console.log('Total catalogEntry documents:', entries.length);

  // Group by hub
  const byHub = {};
  entries.forEach(e => {
    const hub = e.hubName || 'NO HUB';
    if (!byHub[hub]) byHub[hub] = [];
    byHub[hub].push(e);
  });

  console.log('\n=== ENTRIES BY HUB ===');
  for (const [hub, items] of Object.entries(byHub)) {
    console.log(hub + ':', items.length);
  }

  // Check for duplicates by title
  console.log('\n=== POTENTIAL DUPLICATES (same title) ===');
  const byTitle = {};
  entries.forEach(e => {
    const key = (e.title || '').toLowerCase().trim();
    if (!byTitle[key]) byTitle[key] = [];
    byTitle[key].push(e);
  });

  let dupCount = 0;
  for (const [title, items] of Object.entries(byTitle)) {
    if (items.length > 1) {
      dupCount++;
      console.log('\n"' + items[0].title + '" (' + items.length + ' copies):');
      items.forEach(i => console.log('  - Hub:', i.hubName || 'none', '| Type:', i.entryType));
    }
  }
  console.log('\nTotal duplicate groups:', dupCount);

  // Also check enablement hub specifically
  const enablementHubs = await client.fetch(`*[_type == "hub" && slug.current match "*enablement*"]{
    _id, name, "slug": slug.current
  }`);

  console.log('\n=== ENABLEMENT HUBS ===');
  enablementHubs.forEach(h => console.log(h.name, '|', h.slug));
}

analyze().catch(console.error);
