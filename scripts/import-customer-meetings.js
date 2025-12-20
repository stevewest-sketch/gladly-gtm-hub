const { createClient } = require('next-sanity');
const fs = require('fs');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Parse CSV line handling quoted fields
function parseCSVLine(line) {
  const values = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }
  values.push(currentField.trim());

  return values;
}

// Create slug from text
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  const csvPath = '/Users/steve.westgladly.com/Downloads/Customer Asset Library _ FY26 Q3 - Oct 2025 - FY26 Customer Meetings + BVAs.csv';
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n');

  // Find header row
  let headerIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Account') && lines[i].includes('Pre/Post sales')) {
      headerIndex = i;
      break;
    }
  }

  const headers = parseCSVLine(lines[headerIndex]);
  console.log("Headers:", headers);

  // Get Meeting Asset Examples section
  const sections = await client.fetch(`*[_type == "coeSection" && slug.current == "meeting-asset-examples"]{_id}`);
  const sectionId = sections[0]?._id;
  console.log("Meeting Assets section ID:", sectionId);

  // Get existing entries to avoid duplicates
  const existing = await client.fetch(`*[_type == "coeEntry" && entryType == "meeting-asset"]{title}`);
  const existingTitles = new Set(existing.map(e => e.title.toLowerCase()));
  console.log("Existing meeting assets:", existing.length);

  let created = 0;
  let skipped = 0;

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const account = values[0];
    const stage = values[1]; // Pre/Post sales
    const output = values[2]; // BVA, EBR, etc.
    const positioning = values[3];
    const outcomes = values[4];
    const deliveryDate = values[5];
    const csLead = values[6];
    const bvaAuthor = values[7];
    const deckTitle = values[8];
    const bvaTitle = values[9];

    if (!account || account === 'Account' || account.includes('N/A')) continue;

    // Create title from deck title or account + output
    let title = deckTitle || `${account} ${output}`;
    title = title.replace(/\n/g, ' ').trim();

    if (!title || title.length < 5) continue;

    // Skip if already exists
    if (existingTitles.has(title.toLowerCase())) {
      skipped++;
      continue;
    }

    // Parse date
    let dateFormatted = null;
    if (deliveryDate) {
      const parts = deliveryDate.split('/');
      if (parts.length === 3) {
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        const year = parts[2].length === 2 ? '20' + parts[2] : parts[2];
        dateFormatted = `${year}-${month}-${day}`;
      }
    }

    // Determine sales stage
    const salesStage = stage?.toLowerCase().includes('pre') ? 'pre-sales' : 'post-sales';

    // Build summary
    const summaryParts = [];
    if (outcomes) summaryParts.push(outcomes);
    if (positioning) summaryParts.push(`Positioning: ${positioning}`);
    if (bvaAuthor && bvaAuthor !== 'N/A') summaryParts.push(`BVA by: ${bvaAuthor}`);
    if (csLead) summaryParts.push(`Lead: ${csLead}`);
    const summary = summaryParts.join('. ');

    const doc = {
      _type: 'coeEntry',
      title: title,
      slug: { _type: 'slug', current: slugify(title) },
      entryType: 'meeting-asset',
      account: account,
      meetingType: output,
      salesStage: salesStage,
      summary: summary || `${account} ${output} - ${positioning}`,
      deliveryDate: dateFormatted,
      hub: 'coe',
    };

    if (sectionId) {
      doc.coeSection = { _type: 'reference', _ref: sectionId };
    }

    try {
      await client.create(doc);
      existingTitles.add(title.toLowerCase());
      console.log("CREATED: " + title.substring(0, 60));
      created++;
    } catch (err) {
      console.log("ERROR: " + title.substring(0, 40) + " - " + err.message);
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Created: " + created);
  console.log("Skipped (existing): " + skipped);
}

main().catch(console.error);
