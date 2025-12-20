const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function findDuplicates() {
  // Get ALL coeEntry documents with meeting-asset type
  const entries = await client.fetch(`*[_type == "coeEntry" && entryType == "meeting-asset"]{
    _id,
    _createdAt,
    title,
    account,
    externalUrl,
    videoUrl,
    slidesUrl,
    "hasLogo": defined(logo),
    "logoUrl": logo.asset->url,
    "sectionName": coeSection->name
  } | order(account asc, _createdAt asc)`);

  console.log('Total meeting-asset entries:', entries.length);
  console.log('');

  // Group by account name (normalized)
  const byAccount = {};
  entries.forEach(e => {
    const acct = (e.account || 'NO_ACCOUNT').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    if (!byAccount[acct]) byAccount[acct] = [];
    byAccount[acct].push(e);
  });

  // Find accounts with multiple entries (potential duplicates)
  console.log('=== POTENTIAL DUPLICATES (same account, multiple entries) ===\n');

  let duplicateCount = 0;
  const duplicatesToReview = [];

  for (const [account, items] of Object.entries(byAccount)) {
    if (items.length > 1) {
      duplicateCount++;
      console.log(`--- ${items[0].account || 'NO ACCOUNT'} (${items.length} entries) ---`);

      items.forEach((item, idx) => {
        const hasUrl = item.externalUrl || item.videoUrl || item.slidesUrl;
        const hasLogo = item.hasLogo;
        const created = new Date(item._createdAt).toLocaleDateString();

        console.log(`  ${idx + 1}. ${item.title}`);
        console.log(`     Created: ${created}`);
        console.log(`     Has Logo: ${hasLogo ? 'YES' : 'NO'}`);
        console.log(`     Has URL: ${hasUrl ? 'YES' : 'NO'}`);
        console.log(`     ID: ${item._id}`);
        console.log('');
      });

      duplicatesToReview.push({
        account: items[0].account,
        entries: items
      });
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log('Accounts with duplicates:', duplicateCount);
  console.log('Total entries in duplicate groups:', duplicatesToReview.reduce((sum, d) => sum + d.entries.length, 0));

  // Identify which ones to potentially delete (no logo, created more recently)
  console.log('\n=== SUGGESTED CLEANUP ===');
  console.log('Entries that appear to be imports (no logo, likely duplicates):');

  let suggestedDeletes = 0;
  for (const dup of duplicatesToReview) {
    // If there's one with logo and one without, the one without is likely the import
    const withLogo = dup.entries.filter(e => e.hasLogo);
    const withoutLogo = dup.entries.filter(e => !e.hasLogo);

    if (withLogo.length > 0 && withoutLogo.length > 0) {
      withoutLogo.forEach(e => {
        console.log(`  DELETE: "${e.title}" (ID: ${e._id})`);
        console.log(`    Reason: Duplicate of entry with logo`);
        suggestedDeletes++;
      });
    }
  }

  console.log('\nSuggested deletions:', suggestedDeletes);
}

findDuplicates().catch(console.error);
