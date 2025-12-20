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

// Parse CSV file
function parseCSV(content, skipRows = 0) {
  const lines = content.split('\n');

  // Find header row
  let headerIndex = skipRows;
  while (headerIndex < lines.length && !lines[headerIndex].includes('Data Point')) {
    headerIndex++;
  }

  if (headerIndex >= lines.length) {
    console.log("  Could not find header row");
    return [];
  }

  const headers = parseCSVLine(lines[headerIndex]);
  const rows = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    // Only include rows with a Data Point
    if (row['Data Point'] && row['Data Point'].trim()) {
      rows.push(row);
    }
  }

  return rows;
}

// Map KPI to our categories
function mapKpiCategory(kpi) {
  if (!kpi) return 'Other';
  const kpiLower = kpi.toLowerCase();

  if (kpiLower.includes('resolution')) return 'Resolution Rate';
  if (kpiLower.includes('handle time') || kpiLower.includes('aht') || kpiLower.includes('ttfr')) return 'Handle Time';
  if (kpiLower.includes('csat') || kpiLower.includes('nps') || kpiLower.includes('experience')) return 'CSAT';
  if (kpiLower.includes('fcr') || kpiLower.includes('first contact') || kpiLower.includes('first call')) return 'FCR';
  if (kpiLower.includes('cost')) return 'Cost Savings';
  if (kpiLower.includes('roi')) return 'ROI';
  if (kpiLower.includes('volume') || kpiLower.includes('capacity') || kpiLower.includes('backlog') || kpiLower.includes('contacts per order')) return 'Volume';
  if (kpiLower.includes('self-service')) return 'Self-Service';
  if (kpiLower.includes('revenue') || kpiLower.includes('upsell')) return 'Revenue';
  if (kpiLower.includes('efficiency') || kpiLower.includes('time saving')) return 'Handle Time';

  return 'Other';
}

// Map product names
function mapProduct(product) {
  if (!product) return [];
  const productLower = product.toLowerCase();
  const products = [];

  if (productLower.includes('sidekick sales')) {
    products.push('Sidekick Sales');
  } else if (productLower.includes('sidekick')) {
    products.push('Sidekick');
  }
  if (productLower.includes('hero') || productLower.includes('gladly team')) {
    products.push('Gladly Team');
  }
  if (productLower.includes('platform') && !productLower.includes('app')) {
    products.push('Gladly Platform');
  }
  if (productLower.includes('guides')) {
    products.push('Guides');
  }
  if (productLower.includes('journeys')) {
    products.push('Journeys');
  }

  return products;
}

// Map channel
function mapChannel(channel) {
  if (!channel) return null;
  const channelLower = channel.toLowerCase();

  if (channelLower.includes('all') || channelLower.includes('written')) return 'All';
  if (channelLower.includes('chat')) return 'Chat';
  if (channelLower.includes('email')) return 'Email';
  if (channelLower.includes('voice') || channelLower.includes('phone')) return 'Voice';
  if (channelLower.includes('sms')) return 'SMS';
  if (channelLower.includes('digital')) return 'Digital';

  return null;
}

// Check if approved
function isApproved(approval) {
  if (!approval) return false;
  return approval.toLowerCase().includes('yes');
}

// Check if blind
function isBlindCase(customer) {
  if (!customer) return true;
  const lower = customer.toLowerCase();
  return lower.includes('blind') || lower.includes('internal') || lower.includes('benchmark') ||
         lower.includes('industry') || lower.includes('calculation') ||
         lower.includes('q1') || lower.includes('q2') || lower.includes('q3') || lower.includes('q4');
}

async function importFile(filePath, existingStats) {
  const fileName = path.basename(filePath);
  console.log("\n--- Importing: " + fileName + " ---");

  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(content);

  console.log("  Found " + rows.length + " rows");

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of rows) {
    const stat = row['Data Point'].trim();

    // Skip if stat is too short or already exists
    if (stat.length < 5) {
      skipped++;
      continue;
    }

    if (existingStats.has(stat.toLowerCase())) {
      skipped++;
      continue;
    }

    const customer = row['Brand/Source'] || row['Competitor'] || 'Industry Wide';
    const kpi = row['KPIs / BVA Pillar'] || row['KPIs'] || '';
    const approval = row['Approved usage y/n'] || '';
    const channel = row['Channel'] || '';
    const notes = row['Notes'] || '';
    const product = row['Product'] || '';
    const sourceUrl = row['Source URL'] || '';

    const doc = {
      _type: 'proofPoint',
      stat: stat,
      customer: customer,
      isBlind: isBlindCase(customer),
      kpiCategory: mapKpiCategory(kpi),
      product: mapProduct(product),
      channel: mapChannel(channel),
      approved: isApproved(approval),
      context: notes,
    };

    if (sourceUrl && (sourceUrl.startsWith('http://') || sourceUrl.startsWith('https://'))) {
      doc.sourceUrl = sourceUrl;
    }

    try {
      await client.create(doc);
      existingStats.add(stat.toLowerCase());
      created++;
    } catch (err) {
      console.log("  ERROR: " + stat.substring(0, 40) + " - " + err.message);
      errors++;
    }
  }

  console.log("  Created: " + created + ", Skipped: " + skipped + ", Errors: " + errors);
  return { created, skipped, errors };
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  console.log("=== IMPORTING ALL PROOF POINTS ===\n");

  // Get existing proof points
  const existing = await client.fetch(`*[_type == "proofPoint"]{_id, stat}`);
  const existingStats = new Set(existing.map(p => p.stat.toLowerCase().trim()));
  console.log("Found " + existing.length + " existing proof points in Sanity");

  const downloadsDir = '/Users/steve.westgladly.com/Downloads';
  const files = [
    'Gladly Proof Point + CoE Repository - Benchmarks.csv',
    'Gladly Proof Point + CoE Repository - External Proof Points.csv',
    'Gladly Proof Point + CoE Repository - Gladly vs. Competitors.csv',
  ];

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const file of files) {
    const filePath = path.join(downloadsDir, file);
    if (fs.existsSync(filePath)) {
      const result = await importFile(filePath, existingStats);
      totalCreated += result.created;
      totalSkipped += result.skipped;
      totalErrors += result.errors;
    } else {
      console.log("\n--- SKIP: " + file + " (not found) ---");
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Total Created: " + totalCreated);
  console.log("Total Skipped: " + totalSkipped);
  console.log("Total Errors: " + totalErrors);
}

main().catch(console.error);
