const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Parse CSV
function parseCSV(content) {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    // Handle quoted fields with commas
    const row = {};
    let currentField = '';
    let fieldIndex = 0;
    let inQuotes = false;

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row[headers[fieldIndex]] = currentField.trim();
        currentField = '';
        fieldIndex++;
      } else {
        currentField += char;
      }
    }
    // Last field
    row[headers[fieldIndex]] = currentField.trim();

    if (row.title) {
      rows.push(row);
    }
  }

  return rows;
}

// Create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 96);
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  // Read CSV
  const csvPath = path.join(__dirname, 'audit-data.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(csvContent);

  console.log("=== UPDATING ENTRIES FROM AUDIT CSV ===");
  console.log("Found " + rows.length + " rows in CSV\n");

  // Get all existing entries
  const catalogEntries = await client.fetch(`*[_type == "catalogEntry"]{_id, title, "slug": slug.current}`);
  const coeEntries = await client.fetch(`*[_type == "coeEntry"]{_id, title, "slug": slug.current}`);

  // Create lookup by slug
  const catalogBySlug = {};
  catalogEntries.forEach(e => { catalogBySlug[e.slug] = e; });
  const coeBySlug = {};
  coeEntries.forEach(e => { coeBySlug[e.slug] = e; });

  // Also create lookup by title (fuzzy)
  const catalogByTitle = {};
  catalogEntries.forEach(e => { catalogByTitle[e.title.toLowerCase()] = e; });
  const coeByTitle = {};
  coeEntries.forEach(e => { coeByTitle[e.title.toLowerCase()] = e; });

  let updated = 0;
  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of rows) {
    const slug = createSlug(row.title);
    const titleLower = row.title.toLowerCase();
    const hub = row.hub;

    // Find existing entry
    let existingEntry = null;
    let entryType = null;

    if (hub === 'coe') {
      existingEntry = coeBySlug[slug] || coeByTitle[titleLower];
      entryType = 'coeEntry';
    } else {
      existingEntry = catalogBySlug[slug] || catalogByTitle[titleLower];
      entryType = 'catalogEntry';
    }

    // Build update object
    const updateData = {};

    if (row.description && row.description.trim()) {
      if (entryType === 'coeEntry') {
        updateData.summary = row.description;
      } else {
        updateData.description = row.description;
      }
    }

    if (row.externalUrl && row.externalUrl.trim()) {
      if (entryType === 'coeEntry') {
        // For CoE entries, check entry type
        if (row.coeType === 'tool') {
          updateData.toolUrl = row.externalUrl;
        } else {
          updateData.externalUrl = row.externalUrl;
        }
      } else {
        updateData.externalUrl = row.externalUrl;
      }
    }

    if (row.videoUrl && row.videoUrl.trim()) {
      updateData.resourceLinks = updateData.resourceLinks || {};
      updateData.resourceLinks.videoUrl = row.videoUrl;
    }

    if (row.slidesUrl && row.slidesUrl.trim()) {
      updateData.resourceLinks = updateData.resourceLinks || {};
      updateData.resourceLinks.slidesUrl = row.slidesUrl;
    }

    if (row.keyAssetUrl && row.keyAssetUrl.trim()) {
      updateData.resourceLinks = updateData.resourceLinks || {};
      updateData.resourceLinks.keyAssetUrl = row.keyAssetUrl;
      if (row.keyAssetLabel) {
        updateData.resourceLinks.keyAssetLabel = row.keyAssetLabel;
      }
    }

    if (row.presenter && row.presenter.trim()) {
      updateData.presenter = row.presenter;
    }

    if (row.duration && row.duration.trim()) {
      updateData.duration = row.duration;
    }

    // Skip if no updates
    if (Object.keys(updateData).length === 0) {
      skipped++;
      continue;
    }

    if (existingEntry) {
      // Update existing
      try {
        await client.patch(existingEntry._id).set(updateData).commit();
        console.log("UPDATED: " + row.title);
        updated++;
      } catch (err) {
        console.log("ERROR updating " + row.title + ": " + err.message);
        errors++;
      }
    } else {
      // Create new
      const newDoc = {
        _type: entryType,
        title: row.title,
        slug: { _type: 'slug', current: slug },
        status: 'published',
        ...updateData,
      };

      if (entryType === 'catalogEntry') {
        newDoc.hub = hub;
        newDoc.publishedTo = [hub];
      } else {
        // CoE entry type
        const coeTypeMap = {
          'tool': 'tool',
          'meeting-asset': 'meeting-asset',
          'proof-point': 'proof-point',
          'best-practice': 'best-practice',
          'process-innovation': 'process-innovation',
          'internal-best-practice': 'internal-best-practice',
        };
        newDoc.entryType = coeTypeMap[row.coeType] || 'best-practice';
      }

      try {
        await client.create(newDoc);
        console.log("CREATED: " + row.title);
        created++;
      } catch (err) {
        console.log("ERROR creating " + row.title + ": " + err.message);
        errors++;
      }
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Updated: " + updated);
  console.log("Created: " + created);
  console.log("Skipped (no data): " + skipped);
  console.log("Errors: " + errors);
}

main().catch(console.error);
