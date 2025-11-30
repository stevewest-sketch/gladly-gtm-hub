/**
 * Export Sanity Catalog to CSV
 *
 * Usage: npx ts-node scripts/export-catalog.ts
 * Output: catalog-export.csv in project root
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// CSV column headers matching the spreadsheet template
const CSV_HEADERS = [
  'slug',
  'title',
  'description',
  'hub',
  'cardType',
  'contentType',
  'pageTemplate',
  'format',
  'products',
  'teams',
  'topics',
  'journeyStages',
  'audiences',
  'presenter',
  'duration',
  'difficulty',
  'publishDate',
  'featured',
  'priority',
  'externalUrl',
  'videoUrl',
  'wistiaId',
  'slidesUrl',
  'transcriptUrl',
  'keyAssetUrl',
  'keyAssetLabel',
  'thumbnailUrl',
  'keyTakeaways',
  'actionItems',
  'readingTime',
  'competitor',
  'enablementCategory',
  'status',
];

// GROQ query to fetch all catalog entries with expanded references
const CATALOG_QUERY = `*[_type == "catalogEntry"] | order(title asc) {
  _id,
  title,
  description,
  "slug": slug.current,
  cardType,
  "contentType": contentType->slug.current,
  pageTemplate,
  format,
  "products": products[]->slug.current,
  "teams": teams[]->slug.current,
  "topics": topics[]->slug.current,
  "journeyStages": journeyStages[]->slug.current,
  "audiences": audiences[]->slug.current,
  presenter,
  duration,
  difficulty,
  publishDate,
  featured,
  priority,
  externalUrl,
  "videoUrl": mainContent.videoUrl,
  "wistiaId": mainContent.wistiaId,
  "slidesUrl": resourceLinks.slidesUrl,
  "transcriptUrl": resourceLinks.transcriptUrl,
  "keyAssetUrl": resourceLinks.keyAssetUrl,
  "keyAssetLabel": resourceLinks.keyAssetLabel,
  "thumbnailUrl": thumbnailImage.asset->url,
  keyTakeaways,
  actionItems,
  readingTime,
  "competitor": competitor->slug.current,
  enablementCategory,
  publishedTo,
  status
}`;

// Helper to escape CSV values
function escapeCSV(value: any): string {
  if (value === null || value === undefined) return '';

  const str = Array.isArray(value) ? value.join(', ') : String(value);

  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Determine hub based on publishedTo array
function determineHub(publishedTo: string[] | undefined): string {
  if (!publishedTo || publishedTo.length === 0) return '';

  const hasContent = publishedTo.includes('content');
  const hasEnablement = publishedTo.includes('enablement') || publishedTo.includes('learn');

  if (hasContent && hasEnablement) return 'both';
  if (hasContent) return 'content';
  if (hasEnablement) return 'enablement';
  return publishedTo.join(', ');
}

async function exportCatalog() {
  console.log('Fetching catalog entries from Sanity...');

  const entries = await client.fetch(CATALOG_QUERY);
  console.log(`Found ${entries.length} catalog entries`);

  if (entries.length === 0) {
    console.log('No entries found. Check your Sanity dataset.');
    return;
  }

  // Build CSV content
  const rows: string[] = [];

  // Header row
  rows.push(CSV_HEADERS.join(','));

  // Data rows
  for (const entry of entries) {
    const row = CSV_HEADERS.map(header => {
      switch (header) {
        case 'hub':
          return escapeCSV(determineHub(entry.publishedTo));
        case 'featured':
          return entry.featured ? 'TRUE' : 'FALSE';
        case 'keyTakeaways':
          return escapeCSV(entry.keyTakeaways?.join('; '));
        case 'actionItems':
          return escapeCSV(entry.actionItems?.join('; '));
        case 'enablementCategory':
          return escapeCSV(entry.enablementCategory);
        default:
          return escapeCSV(entry[header]);
      }
    });
    rows.push(row.join(','));
  }

  // Write to file
  const csvContent = rows.join('\n');
  const outputPath = './catalog-export.csv';
  fs.writeFileSync(outputPath, csvContent, 'utf-8');

  console.log(`\nExported to: ${outputPath}`);
  console.log(`Total entries: ${entries.length}`);
  console.log('\nNext steps:');
  console.log('1. Open catalog-export.csv in Google Sheets');
  console.log('2. Review and fill in missing fields');
  console.log('3. Add curated collection assignments in Sheet 2');
  console.log('4. Add related content/courses in Sheet 3');
}

// Also export taxonomies
async function exportTaxonomies() {
  console.log('\nFetching taxonomies...');

  const taxonomies = await client.fetch(`{
    "products": *[_type == "product"] | order(order asc, name asc) { name, "slug": slug.current },
    "teams": *[_type == "team"] | order(order asc, name asc) { name, "slug": slug.current },
    "topics": *[_type == "topic"] | order(order asc, name asc) { name, "slug": slug.current },
    "contentTypes": *[_type == "contentType"] | order(order asc, name asc) { name, "slug": slug.current },
    "audiences": *[_type == "audience"] | order(order asc, name asc) { name, "slug": slug.current },
    "competitors": *[_type == "competitor"] | order(order asc, name asc) { name, "slug": slug.current },
    "journeyStages": *[_type == "journeyStage"] | order(order asc, name asc) { name, "slug": slug.current }
  }`);

  // Write taxonomies as JSON for reference
  const outputPath = './taxonomy-reference.json';
  fs.writeFileSync(outputPath, JSON.stringify(taxonomies, null, 2), 'utf-8');

  console.log(`Taxonomy reference saved to: ${outputPath}`);

  // Print summary
  console.log('\nTaxonomy counts:');
  Object.entries(taxonomies).forEach(([key, items]: [string, any]) => {
    console.log(`  ${key}: ${items.length}`);
  });
}

// Run exports
async function main() {
  try {
    await exportCatalog();
    await exportTaxonomies();
    console.log('\nExport complete!');
  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  }
}

main();
