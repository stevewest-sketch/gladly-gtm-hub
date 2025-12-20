const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function analyze() {
  const entries = await client.fetch(`*[_type == "catalogEntry" && "enablement" in publishedTo]{
    _id,
    title,
    "hasSections": count(pageSections) > 0,
    "hasLegacyVideo": defined(mainContent.videoUrl) || defined(resourceLinks.videoUrl),
    "hasExternalUrl": defined(externalUrl),
    externalUrl
  }`);

  console.log('Total enablement entries:', entries.length);

  const withSections = entries.filter(e => e.hasSections);
  const withLegacyVideo = entries.filter(e => e.hasLegacyVideo);
  const withExternalUrl = entries.filter(e => e.hasExternalUrl);
  const empty = entries.filter(e => !e.hasSections && !e.hasLegacyVideo && !e.hasExternalUrl);

  console.log('With pageSections:', withSections.length);
  console.log('With legacy video:', withLegacyVideo.length);
  console.log('With external URL:', withExternalUrl.length);
  console.log('EMPTY (no content):', empty.length);

  console.log('\n=== EMPTY ENTRIES (should redirect or be deleted) ===');
  empty.slice(0, 30).forEach(e => console.log(' -', e.title));
  if (empty.length > 30) console.log('  ... and', (empty.length - 30), 'more');

  console.log('\n=== ENTRIES WITH EXTERNAL URLS ===');
  withExternalUrl.slice(0, 20).forEach(e => {
    console.log(' -', e.title);
    console.log('   URL:', e.externalUrl ? e.externalUrl.substring(0, 60) : 'none');
  });
}

analyze().catch(console.error);
