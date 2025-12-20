const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function check() {
  // Get ALL enablement entries
  const entries = await client.fetch(`*[_type == "catalogEntry" && "enablement" in publishedTo]{
    _id,
    title,
    "sectionCount": count(pageSections),
    "mainVideoUrl": mainContent.videoUrl,
    "resourceVideoUrl": resourceLinks.videoUrl,
    externalUrl,
    "contentTypeName": contentType->name,
    slug
  }`);

  console.log('Total:', entries.length);

  const empty = entries.filter(e => {
    const hasSections = e.sectionCount > 0;
    const hasVideo = e.mainVideoUrl || e.resourceVideoUrl;
    const hasExternal = e.externalUrl;
    return !hasSections && !hasVideo && !hasExternal;
  });

  console.log('Empty:', empty.length);
  console.log('');

  empty.forEach(e => {
    console.log('-', e.title);
    console.log('  Type:', e.contentTypeName || 'no type');
    console.log('  Slug:', e.slug?.current || 'no slug');
    console.log('');
  });
}

check().catch(console.error);
