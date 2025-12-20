const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function cleanup() {
  // Get ALL meeting assets
  const entries = await client.fetch(`*[_type == "coeEntry" && entryType == "meeting-asset"]{
    _id,
    _createdAt,
    title,
    account,
    customerLogoUrl,
    externalUrl,
    videoUrl,
    slidesUrl
  } | order(account asc, _createdAt asc)`);

  console.log('Total meeting-asset entries:', entries.length);
  console.log('With customerLogoUrl:', entries.filter(e => e.customerLogoUrl).length);
  console.log('Without customerLogoUrl:', entries.filter(e => !e.customerLogoUrl).length);

  // Group by account
  const byAccount = {};
  entries.forEach(e => {
    const acct = (e.account || 'NO_ACCOUNT').toLowerCase().trim();
    if (!byAccount[acct]) byAccount[acct] = [];
    byAccount[acct].push(e);
  });

  // Find duplicates: accounts that have BOTH entries with logos AND without logos
  console.log('\n=== DUPLICATES TO CLEAN UP ===\n');

  const toDelete = [];

  for (const [account, items] of Object.entries(byAccount)) {
    const withLogo = items.filter(e => e.customerLogoUrl);
    const withoutLogo = items.filter(e => !e.customerLogoUrl);

    if (withLogo.length > 0 && withoutLogo.length > 0) {
      console.log(`--- ${items[0].account || 'NO ACCOUNT'} ---`);
      console.log(`  Original (with logo): ${withLogo.length}`);
      withLogo.forEach(e => console.log(`    KEEP: "${e.title}"`));

      console.log(`  Imports (no logo): ${withoutLogo.length}`);
      withoutLogo.forEach(e => {
        console.log(`    DELETE: "${e.title}" (ID: ${e._id})`);
        toDelete.push(e);
      });
      console.log('');
    }
  }

  console.log(`\nTotal entries to delete: ${toDelete.length}`);

  // Ask for confirmation
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
        console.log('SKIP (has refs):', entry.title, '-', err.message.substring(0, 50));
        skipped++;
      }
    }

    console.log(`\nDeleted: ${deleted}`);
    console.log(`Skipped: ${skipped}`);
  } else {
    console.log('\nRun with --delete flag to actually delete these entries');
    console.log('Example: node scripts/cleanup-duplicates.js --delete');
  }
}

cleanup().catch(console.error);
