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

// Extract Google Doc/Sheets URL from text
function extractUrl(text) {
  if (!text) return null;

  // Look for Google Docs/Sheets/Slides URLs
  const urlMatch = text.match(/https:\/\/docs\.google\.com\/[^\s,)]+/);
  if (urlMatch) return urlMatch[0];

  // Look for any https URL
  const httpsMatch = text.match(/https:\/\/[^\s,)]+/);
  if (httpsMatch) return httpsMatch[0];

  return null;
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  const csvPath = '/Users/steve.westgladly.com/Downloads/Copy of Customer Asset Library _ FY26 Q3 - Oct 2025 - FY26 Customer Meetings + BVAs.csv';
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n');

  // Find header row (row 14 in the file, index 13)
  let headerIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Account') && lines[i].includes('Pre/Post sales')) {
      headerIndex = i;
      break;
    }
  }

  const headers = parseCSVLine(lines[headerIndex]);
  console.log("Headers found at line " + (headerIndex + 1) + ":", headers);

  // Get column indices
  const accountIdx = headers.indexOf('Account');
  const stageIdx = headers.indexOf('Pre/Post sales');
  const outputIdx = headers.indexOf('Output');
  const positioningIdx = headers.indexOf('Positioning');
  const outcomesIdx = headers.indexOf('Outcomes ');
  const dateIdx = headers.indexOf('Delivery Date');
  const deckIdx = headers.indexOf('Executive Summary or Readout Deck');
  const bvaIdx = headers.indexOf('BVA Model (if applicable)');
  const recordingIdx = headers.indexOf('Meeting Recording **NEW**');

  console.log("\nColumn indices:", { accountIdx, stageIdx, deckIdx, bvaIdx });

  // Get existing coeEntry meeting assets
  const entries = await client.fetch(`*[_type == "coeEntry" && entryType == "meeting-asset"]{_id, title, account, slidesUrl}`);
  console.log("\nFound " + entries.length + " meeting asset entries in Sanity");

  // Build lookup by account name
  const entriesByAccount = {};
  entries.forEach(e => {
    const account = (e.account || '').toLowerCase().trim();
    const titleAccount = e.title.split(' ')[0].toLowerCase().trim();
    if (account) entriesByAccount[account] = e;
    if (titleAccount) entriesByAccount[titleAccount] = e;
  });

  // Parse CSV rows and match to entries
  let updated = 0;
  let notFound = 0;
  let alreadyLinked = 0;

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const account = values[accountIdx];
    const deckText = values[deckIdx];
    const bvaText = values[bvaIdx];

    if (!account || account === 'Account') continue;

    // Extract URLs
    const deckUrl = extractUrl(deckText);
    const bvaUrl = extractUrl(bvaText);

    if (!deckUrl && !bvaUrl) continue;

    // Find matching entry
    const accountLower = account.toLowerCase().trim();
    let entry = entriesByAccount[accountLower];

    if (!entry) {
      // Try partial match
      for (const key of Object.keys(entriesByAccount)) {
        if (key.includes(accountLower) || accountLower.includes(key)) {
          entry = entriesByAccount[key];
          break;
        }
      }
    }

    if (!entry) {
      console.log("NOT FOUND: " + account + " (has " + (deckUrl ? 'deck' : '') + (bvaUrl ? ' bva' : '') + ")");
      notFound++;
      continue;
    }

    // Check if already has a URL
    if (entry.slidesUrl) {
      alreadyLinked++;
      continue;
    }

    // Update with the deck URL (prefer deck over BVA)
    const urlToUse = deckUrl || bvaUrl;
    try {
      await client.patch(entry._id).set({ slidesUrl: urlToUse }).commit();
      console.log("UPDATED: " + entry.title + " -> " + urlToUse.substring(0, 50) + "...");
      updated++;
    } catch (err) {
      console.log("ERROR updating " + entry.title + ": " + err.message);
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Updated: " + updated);
  console.log("Already linked: " + alreadyLinked);
  console.log("Not found in Sanity: " + notFound);
}

main().catch(console.error);
