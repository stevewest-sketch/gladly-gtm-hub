const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// New content types to create
const NEW_CONTENT_TYPES = [
  { name: 'Video', slug: 'video', order: 1 },
  { name: 'Figma Prototype', slug: 'figma', order: 2 },
  { name: 'Dashboard', slug: 'dashboard', order: 3 },
  { name: 'Sequence', slug: 'sequence', order: 4 },
  { name: 'Checklist', slug: 'checklist', order: 5 },
  { name: 'Calculator', slug: 'calculator', order: 6 },
  { name: 'Playbook', slug: 'playbook', order: 7 },
  { name: 'Article', slug: 'article', order: 8 },
  { name: 'FAQ', slug: 'faq', order: 9 },
  { name: 'Report', slug: 'report', order: 10 },
];

// Classification rules (order matters - first match wins)
const CLASSIFICATION_RULES = [
  { pattern: /figma|prototype/i, typeSlug: 'figma' },
  { pattern: /video|recording/i, typeSlug: 'video' },
  { pattern: /dashboard/i, typeSlug: 'dashboard' },
  { pattern: /calculator|calc\b/i, typeSlug: 'calculator' },
  { pattern: /checklist/i, typeSlug: 'checklist' },
  { pattern: /sequence/i, typeSlug: 'sequence' },
  { pattern: /playbook|\bplay\b/i, typeSlug: 'playbook' },
  { pattern: /battlecard|battle card/i, typeSlug: 'battle-card' },
  { pattern: /one[- ]?pager/i, typeSlug: 'one-pager' },
  { pattern: /template/i, typeSlug: 'template' },
  { pattern: /\bguide\b|how to|guidelines/i, typeSlug: 'guide' },
  { pattern: /deck|slides|presentation/i, typeSlug: 'deck' },
  { pattern: /demo/i, typeSlug: 'demo' },
  { pattern: /training|enablement|certification/i, typeSlug: 'training' },
  { pattern: /workshop/i, typeSlug: 'workshop' },
  { pattern: /webinar/i, typeSlug: 'webinar' },
  { pattern: /competitive|competitor/i, typeSlug: 'competitive' },
  { pattern: /report|analysis|metrics|benchmark/i, typeSlug: 'report' },
  { pattern: /faq/i, typeSlug: 'faq' },
];

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  console.log("=== ORGANIZING CONTENT TYPES ===\n");

  // Step 1: Create new content types
  console.log("Step 1: Creating new content types...");
  const existingTypes = await client.fetch(`*[_type == "contentType"]{"slug": slug.current}`);
  const existingSlugs = new Set(existingTypes.map(t => t.slug));

  for (const ct of NEW_CONTENT_TYPES) {
    if (existingSlugs.has(ct.slug)) {
      console.log("  EXISTS: " + ct.name);
    } else {
      await client.create({
        _type: 'contentType',
        name: ct.name,
        slug: { _type: 'slug', current: ct.slug },
        order: ct.order,
      });
      console.log("  CREATED: " + ct.name);
      existingSlugs.add(ct.slug);
    }
  }

  // Step 2: Get all content types with their IDs
  console.log("\nStep 2: Fetching content type IDs...");
  const allTypes = await client.fetch(`*[_type == "contentType"]{_id, name, "slug": slug.current}`);
  const typeMap = {};
  allTypes.forEach(t => { typeMap[t.slug] = t._id; });
  console.log("  Found " + allTypes.length + " content types");

  // Step 3: Get all catalog entries without content type
  console.log("\nStep 3: Classifying entries...");
  const entries = await client.fetch(`*[_type == "catalogEntry" && !defined(contentType)]{
    _id, title, externalUrl
  }`);
  console.log("  Found " + entries.length + " entries without content type\n");

  let classified = 0;
  let unclassified = 0;
  const unclassifiedList = [];

  for (const entry of entries) {
    const title = entry.title;
    const url = entry.externalUrl || '';

    // Check for Figma URL
    let matchedSlug = null;
    if (url.includes('figma.com')) {
      matchedSlug = 'figma';
    }

    // Check title patterns
    if (!matchedSlug) {
      for (const rule of CLASSIFICATION_RULES) {
        if (rule.pattern.test(title)) {
          matchedSlug = rule.typeSlug;
          break;
        }
      }
    }

    if (matchedSlug && typeMap[matchedSlug]) {
      try {
        await client
          .patch(entry._id)
          .set({ contentType: { _type: 'reference', _ref: typeMap[matchedSlug] } })
          .commit();
        console.log("  ✓ " + title + " → " + matchedSlug);
        classified++;
      } catch (err) {
        console.log("  ERROR: " + title + " - " + err.message);
      }
    } else {
      unclassifiedList.push(title);
      unclassified++;
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Classified: " + classified);
  console.log("Unclassified: " + unclassified);

  if (unclassifiedList.length > 0) {
    console.log("\n=== STILL NEEDS MANUAL CLASSIFICATION ===");
    unclassifiedList.forEach(t => console.log("  - " + t));
  }
}

main().catch(console.error);
