/**
 * Export all catalog entries to CSV for manual re-attribution
 * Run with: SANITY_API_TOKEN=... node scripts/export-catalog-to-csv.js
 *
 * This creates a master CSV with all entries and their current assignments.
 * You can edit this CSV and re-import with import-from-csv.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// GROQ query to fetch all catalog entries with their assignments
const query = `*[_type == "catalogEntry"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  status,
  publishedTo,
  format,

  // Taxonomy
  teams,
  enablementCategory,
  coeType,

  // References (need to dereference)
  "products": products[]->name,
  "audiences": audiences[]->name,
  "contentTypeName": contentType->name,
  "competitorName": competitor->name,

  // Links
  externalUrl,
  videoUrl,
  slidesUrl,
  keyAssetUrl,
  transcriptUrl,

  // Display settings
  featured,
  displayPriority,
  priority,

  // Proof point fields
  customer,
  isBlindCustomer,
  kpiCategory,
  productTags,
  channelTag,
  approvedForExternal,

  // Collection assignments - get collection names
  "contentHubCollections": contentHubCollections[]{
    "name": collection->name,
    "slug": collection->slug.current,
    subsections
  },
  "enablementHubCollections": enablementHubCollections[]{
    "name": collection->name,
    "slug": collection->slug.current,
    subsections
  },
  "coeHubCollections": coeHubCollections[]{
    "name": collection->name,
    "slug": collection->slug.current,
    subsections
  },
  "curatedHubCollections": curatedHubCollections[]{
    "name": collection->name,
    "slug": collection->slug.current,
    subsections
  },

  // Metadata
  publishDate,
  presenter,
  duration
}`;

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return '';
  return arr.join('|');
}

function formatCollections(collections) {
  if (!collections || !Array.isArray(collections) || collections.length === 0) return '';
  return collections.map(c => {
    if (c.subsections && c.subsections.length > 0) {
      return `${c.name}:${c.subsections.join('+')}`;
    }
    return c.name;
  }).join('|');
}

async function exportToCsv() {
  console.log('Fetching all catalog entries...\n');

  const entries = await client.fetch(query);
  console.log(`Found ${entries.length} entries\n`);

  // CSV Headers
  const headers = [
    '_id',
    'title',
    'slug',
    'description',
    'status',
    'publishedTo',
    'format',
    'teams',
    'enablementCategory',
    'coeType',
    'products',
    'audiences',
    'contentType',
    'competitor',
    'externalUrl',
    'videoUrl',
    'slidesUrl',
    'keyAssetUrl',
    'transcriptUrl',
    'featured',
    'displayPriority',
    'priority',
    'customer',
    'isBlindCustomer',
    'kpiCategory',
    'productTags',
    'channelTag',
    'approvedForExternal',
    'contentHubCollections',
    'enablementHubCollections',
    'coeHubCollections',
    'curatedHubCollections',
    'publishDate',
    'presenter',
    'duration',
  ];

  // Build CSV rows
  const rows = entries.map(entry => [
    escapeCSV(entry._id),
    escapeCSV(entry.title),
    escapeCSV(entry.slug),
    escapeCSV(entry.description),
    escapeCSV(entry.status),
    escapeCSV(formatArray(entry.publishedTo)),
    escapeCSV(entry.format),
    escapeCSV(formatArray(entry.teams)),
    escapeCSV(formatArray(entry.enablementCategory)),
    escapeCSV(formatArray(entry.coeType)),
    escapeCSV(formatArray(entry.products)),
    escapeCSV(formatArray(entry.audiences)),
    escapeCSV(entry.contentTypeName),
    escapeCSV(entry.competitorName),
    escapeCSV(entry.externalUrl),
    escapeCSV(entry.videoUrl),
    escapeCSV(entry.slidesUrl),
    escapeCSV(entry.keyAssetUrl),
    escapeCSV(entry.transcriptUrl),
    escapeCSV(entry.featured),
    escapeCSV(entry.displayPriority),
    escapeCSV(entry.priority),
    escapeCSV(entry.customer),
    escapeCSV(entry.isBlindCustomer),
    escapeCSV(entry.kpiCategory),
    escapeCSV(formatArray(entry.productTags)),
    escapeCSV(entry.channelTag),
    escapeCSV(entry.approvedForExternal),
    escapeCSV(formatCollections(entry.contentHubCollections)),
    escapeCSV(formatCollections(entry.enablementHubCollections)),
    escapeCSV(formatCollections(entry.coeHubCollections)),
    escapeCSV(formatCollections(entry.curatedHubCollections)),
    escapeCSV(entry.publishDate),
    escapeCSV(entry.presenter),
    escapeCSV(entry.duration),
  ]);

  // Build CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Write to file
  const outputPath = path.join(__dirname, '../catalog-export.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf8');

  console.log('========================================');
  console.log(`CSV exported successfully!`);
  console.log(`  File: ${outputPath}`);
  console.log(`  Entries: ${entries.length}`);
  console.log('========================================\n');
  console.log('Column format notes:');
  console.log('  - Array fields use | as separator (e.g., "content|enablement")');
  console.log('  - Collection assignments: "CollectionName:Subsec1+Subsec2|OtherCollection"');
  console.log('  - Empty subsections = show in all subsections');
  console.log('');
  console.log('To re-import after editing:');
  console.log('  SANITY_API_TOKEN=... node scripts/import-from-csv.js catalog-export.csv');
}

// Run the export
exportToCsv().catch(console.error);
