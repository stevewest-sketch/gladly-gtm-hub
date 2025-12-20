const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function cleanup() {
  // Get all catalogEntry documents
  const entries = await client.fetch(`*[_type == "catalogEntry"]{
    _id,
    _createdAt,
    title,
    publishedTo,
    externalUrl
  } | order(title asc, _createdAt asc)`);

  console.log('Total catalogEntry documents:', entries.length);

  // Find duplicates by exact title match
  const byTitle = {};
  entries.forEach(e => {
    const key = (e.title || '').toLowerCase().trim();
    if (!byTitle[key]) byTitle[key] = [];
    byTitle[key].push(e);
  });

  console.log('\n=== DUPLICATE TITLES ===\n');

  const toDelete = [];

  for (const [title, items] of Object.entries(byTitle)) {
    if (items.length > 1) {
      console.log(`"${items[0].title}" (${items.length} copies):`);

      // Keep the first one (oldest), delete the rest
      const [keep, ...duplicates] = items;
      console.log(`  KEEP: ${keep._id} (created ${new Date(keep._createdAt).toLocaleDateString()})`);

      duplicates.forEach(dup => {
        console.log(`  DELETE: ${dup._id} (created ${new Date(dup._createdAt).toLocaleDateString()})`);
        toDelete.push(dup);
      });
      console.log('');
    }
  }

  console.log(`Total duplicates to delete: ${toDelete.length}`);

  if (process.argv.includes('--delete')) {
    console.log('\n=== DELETING DUPLICATES ===\n');

    let deleted = 0;
    let skipped = 0;

    for (const entry of toDelete) {
      try {
        await client.delete(entry._id);
        console.log('DELETED:', entry.title);
        deleted++;
      } catch (err) {
        console.log('SKIP:', entry.title, '-', err.message.substring(0, 50));
        skipped++;
      }
    }

    console.log(`\nDeleted: ${deleted}`);
    console.log(`Skipped: ${skipped}`);
  } else {
    console.log('\nRun with --delete to remove duplicates');
  }
}

cleanup().catch(console.error);
