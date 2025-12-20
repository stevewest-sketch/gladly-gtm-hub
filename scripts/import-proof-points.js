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

// Parse CSV with proper quote handling
function parseCSV(content) {
  const lines = content.split('\n');
  // Skip the first line which has "f," and the second line which has the note
  // Header is on line 3 (index 2)
  const headers = parseCSVLine(lines[2]);
  const rows = [];

  for (let i = 3; i < lines.length; i++) {
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

// Parse a single CSV line handling quoted fields
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

// Map KPI to our categories
function mapKpiCategory(kpi) {
  if (!kpi) return 'Other';
  const kpiLower = kpi.toLowerCase();

  if (kpiLower.includes('resolution')) return 'Resolution Rate';
  if (kpiLower.includes('handle time') || kpiLower.includes('aht') || kpiLower.includes('ttfr')) return 'Handle Time';
  if (kpiLower.includes('csat') || kpiLower.includes('nps') || kpiLower.includes('experience')) return 'CSAT';
  if (kpiLower.includes('fcr') || kpiLower.includes('first contact') || kpiLower.includes('first call')) return 'FCR';
  if (kpiLower.includes('cost') || kpiLower.includes('reduce cost')) return 'Cost Savings';
  if (kpiLower.includes('roi')) return 'ROI';
  if (kpiLower.includes('volume') || kpiLower.includes('capacity') || kpiLower.includes('backlog')) return 'Volume';
  if (kpiLower.includes('self-service') || kpiLower.includes('self service')) return 'Self-Service';
  if (kpiLower.includes('revenue') || kpiLower.includes('upsell') || kpiLower.includes('rev gen')) return 'Revenue';
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
  if (productLower.includes('app platform')) {
    products.push('App Platform');
  }
  if (productLower.includes('voice ai')) {
    products.push('Voice AI');
  }

  // Default to platform if nothing matched
  if (products.length === 0 && product.trim()) {
    if (productLower.includes('gladly')) {
      products.push('Gladly Platform');
    }
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
  if (channelLower.includes('voice') || channelLower.includes('phone') || channelLower.includes('call')) return 'Voice';
  if (channelLower.includes('sms')) return 'SMS';
  if (channelLower.includes('digital')) return 'Digital';
  if (channelLower.includes('self-service')) return 'All';

  return null;
}

// Check if approved for external use
function isApproved(approval) {
  if (!approval) return false;
  const lower = approval.toLowerCase();
  return lower.includes('yes') || lower.includes('approved');
}

// Check if blind case study
function isBlindCase(customer) {
  if (!customer) return false;
  const lower = customer.toLowerCase();
  return lower.includes('blind') || lower.includes('internal') || lower.includes('benchmark') || lower.includes('q1') || lower.includes('q2') || lower.includes('q3') || lower.includes('q4');
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN required');
    console.error('Run: export SANITY_API_TOKEN=your-token-here');
    process.exit(1);
  }

  // Read CSV
  const csvPath = path.join('/Users/steve.westgladly.com/Downloads', 'Gladly Proof Point + CoE Repository - Metrics of Success.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(csvContent);

  console.log("=== IMPORTING PROOF POINTS ===");
  console.log("Found " + rows.length + " proof points in CSV\n");

  // Check for existing proof points
  const existing = await client.fetch(`*[_type == "proofPoint"]{_id, stat}`);
  const existingStats = new Set(existing.map(p => p.stat.toLowerCase().trim()));
  console.log("Found " + existing.length + " existing proof points in Sanity\n");

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of rows) {
    const stat = row['Data Point'].trim();

    // Skip if already exists
    if (existingStats.has(stat.toLowerCase())) {
      console.log("SKIP (exists): " + stat.substring(0, 60) + "...");
      skipped++;
      continue;
    }

    const customer = row['Brand/Source'] || 'Unknown';
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

    // Only add sourceUrl if it's a valid URL
    if (sourceUrl && (sourceUrl.startsWith('http://') || sourceUrl.startsWith('https://'))) {
      doc.sourceUrl = sourceUrl;
    }

    try {
      await client.create(doc);
      console.log("CREATED: " + stat.substring(0, 60) + (stat.length > 60 ? '...' : ''));
      created++;
    } catch (err) {
      console.log("ERROR: " + stat.substring(0, 40) + " - " + err.message);
      errors++;
    }
  }

  console.log("\n=== COMPLETE ===");
  console.log("Created: " + created);
  console.log("Skipped (existing): " + skipped);
  console.log("Errors: " + errors);
}

main().catch(console.error);
