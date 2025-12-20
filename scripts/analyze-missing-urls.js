const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function analyze() {
  // Get ALL coeEntry documents
  const coeEntries = await client.fetch(`*[_type == "coeEntry"]{
    _id,
    title,
    entryType,
    externalUrl,
    videoUrl,
    slidesUrl,
    "sectionName": coeSection->name
  } | order(entryType asc, title asc)`);

  // Get ALL catalogEntry documents
  const catalogEntries = await client.fetch(`*[_type == "catalogEntry"]{
    _id,
    title,
    entryType,
    externalUrl,
    videoUrl,
    slidesUrl,
    "hubName": hub->name
  } | order(entryType asc, title asc)`);

  console.log('=== COE ENTRIES ANALYSIS ===');
  console.log('Total coeEntry documents:', coeEntries.length);

  // Group by entryType
  const coeByType = {};
  coeEntries.forEach(e => {
    const type = e.entryType || 'unknown';
    if (!coeByType[type]) coeByType[type] = { total: 0, withUrl: 0, missing: [] };
    coeByType[type].total++;
    const hasUrl = e.externalUrl || e.videoUrl || e.slidesUrl;
    if (hasUrl) {
      coeByType[type].withUrl++;
    } else {
      coeByType[type].missing.push({ title: e.title, section: e.sectionName });
    }
  });

  for (const [type, data] of Object.entries(coeByType)) {
    console.log(`\n--- ${type.toUpperCase()} (${data.withUrl}/${data.total} have URLs) ---`);
    if (data.missing.length > 0) {
      console.log('Missing URLs:');
      data.missing.forEach(m => {
        const title = m.title || 'Untitled';
        console.log('  -', title.substring(0, 80), m.section ? `[${m.section}]` : '');
      });
    }
  }

  console.log('\n\n=== CATALOG ENTRIES ANALYSIS ===');
  console.log('Total catalogEntry documents:', catalogEntries.length);

  const catByType = {};
  catalogEntries.forEach(e => {
    const key = e.entryType || 'unknown';
    if (!catByType[key]) catByType[key] = { total: 0, withUrl: 0, missing: [] };
    catByType[key].total++;
    const hasUrl = e.externalUrl || e.videoUrl || e.slidesUrl;
    if (hasUrl) {
      catByType[key].withUrl++;
    } else {
      catByType[key].missing.push({ title: e.title, hub: e.hubName });
    }
  });

  for (const [type, data] of Object.entries(catByType)) {
    console.log(`\n--- ${type.toUpperCase()} (${data.withUrl}/${data.total} have URLs) ---`);
    if (data.missing.length > 0) {
      console.log('Missing URLs:');
      data.missing.forEach(m => {
        const title = m.title || 'Untitled';
        console.log('  -', title.substring(0, 70), '|', m.hub || 'no hub');
      });
    }
  }

  // Summary
  const totalCoe = coeEntries.length;
  const coeWithUrl = coeEntries.filter(e => e.externalUrl || e.videoUrl || e.slidesUrl).length;
  const totalCat = catalogEntries.length;
  const catWithUrl = catalogEntries.filter(e => e.externalUrl || e.videoUrl || e.slidesUrl).length;

  console.log('\n\n=== SUMMARY ===');
  console.log(`CoE Entries: ${coeWithUrl}/${totalCoe} have URLs (${Math.round(coeWithUrl/totalCoe*100)}%)`);
  console.log(`Catalog Entries: ${catWithUrl}/${totalCat} have URLs (${Math.round(catWithUrl/totalCat*100)}%)`);
  console.log(`Total missing URLs: ${(totalCoe - coeWithUrl) + (totalCat - catWithUrl)}`);
}

analyze().catch(console.error);
