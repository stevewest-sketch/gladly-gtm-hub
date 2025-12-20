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

// Map product names
function mapProduct(product) {
  if (!product) return [];
  const productLower = product.toLowerCase();
  const products = [];

  if (productLower.includes('sidekick')) {
    products.push('Sidekick');
  }
  if (productLower.includes('hero')) {
    products.push('Gladly Team');
  }
  if (productLower.includes('gladly') && !productLower.includes('sidekick') && !productLower.includes('hero')) {
    products.push('Gladly Platform');
  }

  return products.length > 0 ? products : ['Gladly Platform'];
}

// Check if approved
function isApproved(approval) {
  if (!approval) return false;
  const lower = approval.toLowerCase();
  return lower.includes('yes') || lower.includes('marketing') || lower.includes('sales');
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  const csvPath = '/Users/steve.westgladly.com/Downloads/Gladly Proof Point + CoE Repository - Customer Quotes.csv';
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n');

  // Find header row
  const headers = parseCSVLine(lines[0]);
  console.log("Headers:", headers.slice(0, 10));

  // Get existing proof points
  const existing = await client.fetch(`*[_type == "proofPoint"]{stat}`);
  const existingStats = new Set(existing.map(p => p.stat.toLowerCase().substring(0, 50)));

  console.log("\n=== IMPORTING CUSTOMER QUOTES ===");
  console.log("Found " + existing.length + " existing proof points\n");

  let created = 0;
  let skipped = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const quote = values[0]; // Data Point column
    const approved = values[1]; // Approved usage
    const customer = values[2]; // Brand/Source
    const sourceUrl = values[3]; // Source URL
    const product = values[9]; // Product
    const dataType = values[10]; // Type of data

    if (!quote || quote.length < 10) continue;
    if (dataType && !dataType.toLowerCase().includes('quote')) continue;

    // Skip if already exists (check first 50 chars)
    const statKey = quote.toLowerCase().substring(0, 50);
    if (existingStats.has(statKey)) {
      skipped++;
      continue;
    }

    const doc = {
      _type: 'proofPoint',
      stat: quote,
      customer: customer || 'Unknown',
      isBlind: false,
      kpiCategory: 'Other', // Quotes don't have specific KPIs
      product: mapProduct(product),
      approved: isApproved(approved),
      context: 'Customer quote',
    };

    if (sourceUrl && (sourceUrl.startsWith('http://') || sourceUrl.startsWith('https://'))) {
      doc.sourceUrl = sourceUrl;
    }

    try {
      await client.create(doc);
      existingStats.add(statKey);
      console.log("CREATED: " + quote.substring(0, 60) + "...");
      created++;
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Created: " + created);
  console.log("Skipped: " + skipped);
}

main().catch(console.error);
