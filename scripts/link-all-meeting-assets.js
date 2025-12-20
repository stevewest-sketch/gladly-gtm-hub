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

// Normalize text for matching
function normalize(text) {
  if (!text) return '';
  return text.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  const csvPath = '/Users/steve.westgladly.com/Downloads/Copy of Customer Asset Library _ FY26 Q3 - Oct 2025 - FY26 Customer Meetings + BVAs.csv';
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
  const accountIdx = 0;
  const deckIdx = 8;

  // Get ALL meeting assets without slidesUrl
  const entries = await client.fetch(`*[_type == "coeEntry" && entryType == "meeting-asset" && !defined(slidesUrl)]{_id, title, account}`);
  console.log("Found " + entries.length + " meeting assets WITHOUT URLs\n");

  let updated = 0;

  // For each entry, try to find matching URL in CSV
  for (const entry of entries) {
    const entryTitle = normalize(entry.title);
    const entryAccount = normalize(entry.account || '');

    // Search through CSV for a match
    for (let i = headerIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);
      const csvAccount = values[accountIdx];
      const deckUrl = values[deckIdx];

      if (!csvAccount || !deckUrl || !deckUrl.startsWith('http')) continue;

      const csvAccountNorm = normalize(csvAccount);

      // Match by account name
      if (entryAccount && csvAccountNorm &&
          (entryAccount.includes(csvAccountNorm) || csvAccountNorm.includes(entryAccount))) {

        // Found a match! Update this entry
        try {
          await client.patch(entry._id).set({ slidesUrl: deckUrl }).commit();
          console.log("UPDATED: " + entry.title);
          console.log("   -> " + deckUrl.substring(0, 60) + "...\n");
          updated++;
          break; // Move to next entry
        } catch (err) {
          console.log("ERROR: " + err.message);
        }
      }
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Updated: " + updated);
  console.log("Remaining without URL: " + (entries.length - updated));
}

main().catch(console.error);
