import { createClient } from '@sanity/client';
import XLSX from 'xlsx';
import { nanoid } from 'nanoid';
import fs from 'fs';

// ========================================
// CONFIGURATION
// ========================================

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN || '',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Set to true to preview without creating documents
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// File paths - update these to match your file locations
const FILES = {
  proofPoints: './data/Gladly Proof Point + CoE Repository (3).xlsx',
  customerAssets: './data/Customer Asset Library _ FY26 Q3 - Oct 2025.xlsx',
  coeAudit: './data/CoE Audit (5).xlsx',
};

// ========================================
// LOGGING HELPERS
// ========================================

const log = {
  info: (msg: string) => console.log(`ℹ️  ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  warning: (msg: string) => console.log(`⚠️  ${msg}`),
  error: (msg: string) => console.log(`❌ ${msg}`),
  verbose: (msg: string) => VERBOSE && console.log(`   ${msg}`),
  divider: () => console.log('─'.repeat(60)),
};

// ========================================
// HELPER FUNCTIONS
// ========================================

// Create URL-friendly slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
}

// Generate unique key for arrays
function generateKey(): string {
  return nanoid(12);
}

// Clean and normalize text
function cleanText(text: any): string | null {
  if (!text) return null;
  return String(text).trim();
}

// Parse date from various formats
function parseDate(value: any): string | null {
  if (!value) return null;

  // If it's already a date object or number (Excel serial date)
  if (typeof value === 'number') {
    // Excel serial date conversion
    const date = new Date((value - 25569) * 86400 * 1000);
    return date.toISOString().split('T')[0];
  }

  // Try parsing string date
  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }

  return null;
}

// Cache for reference lookups
const refCache: Record<string, Record<string, string>> = {};

// Find or create a reference document
async function findOrCreateRef(
  type: string,
  name: string,
  additionalFields: Record<string, any> = {}
): Promise<{ _type: 'reference'; _ref: string } | null> {
  if (!name || !name.trim()) return null;

  const normalizedName = name.trim();

  // Check cache first
  if (!refCache[type]) {
    refCache[type] = {};
  }

  if (refCache[type][normalizedName.toLowerCase()]) {
    return {
      _type: 'reference',
      _ref: refCache[type][normalizedName.toLowerCase()],
    };
  }

  // Query for existing document
  const existing = await client.fetch(
    `*[_type == $type && (name == $name || lower(name) == $lowerName)][0]._id`,
    { type, name: normalizedName, lowerName: normalizedName.toLowerCase() }
  );

  if (existing) {
    refCache[type][normalizedName.toLowerCase()] = existing;
    return { _type: 'reference', _ref: existing };
  }

  // Create new document if not in dry run
  if (!DRY_RUN) {
    try {
      const doc = await client.create({
        _type: type,
        name: normalizedName,
        slug: { _type: 'slug', current: slugify(normalizedName) },
        ...additionalFields,
      });
      refCache[type][normalizedName.toLowerCase()] = doc._id;
      log.verbose(`Created new ${type}: ${normalizedName}`);
      return { _type: 'reference', _ref: doc._id };
    } catch (err) {
      log.error(`Failed to create ${type}: ${normalizedName}`);
      return null;
    }
  }

  return null;
}

// ========================================
// MAPPING FUNCTIONS
// ========================================

// Map industry names to standardized values
const industryMap: Record<string, string> = {
  retail: 'Retail',
  ecommerce: 'Ecommerce',
  'e-commerce': 'Ecommerce',
  beauty: 'Beauty & Cosmetics',
  'beauty & cosmetics': 'Beauty & Cosmetics',
  cosmetics: 'Beauty & Cosmetics',
  travel: 'Travel & Hospitality',
  'travel & hospitality': 'Travel & Hospitality',
  'travel / transportation': 'Travel & Hospitality',
  'travel and hospitality': 'Travel & Hospitality',
  hospitality: 'Travel & Hospitality',
  'consumer goods': 'Consumer Goods',
  cpg: 'Consumer Goods',
  health: 'Health & Wellness',
  'health & wellness': 'Health & Wellness',
  wellness: 'Health & Wellness',
  financial: 'Financial Services',
  'financial services': 'Financial Services',
  finserv: 'Financial Services',
  telecom: 'Telecommunications',
  telecommunications: 'Telecommunications',
  telco: 'Telecommunications',
  qsr: 'Quick Service Restaurants',
  'quick service': 'Quick Service Restaurants',
  'quick service restaurants': 'Quick Service Restaurants',
  restaurants: 'Quick Service Restaurants',
  media: 'Media & Streaming',
  'media & streaming': 'Media & Streaming',
  streaming: 'Media & Streaming',
  entertainment: 'Media & Streaming',
};

function normalizeIndustry(raw: string): string {
  if (!raw) return '';
  const lower = raw.toLowerCase().trim();
  return industryMap[lower] || raw.trim();
}

// Map permission status
const permissionMap: Record<string, string> = {
  yes: 'Approved for External Use',
  external: 'Approved for External Use',
  approved: 'Approved for External Use',
  'approved for external': 'Approved for External Use',
  'approved for external use': 'Approved for External Use',
  internal: 'Internal Only',
  'internal only': 'Internal Only',
  no: 'Needs Customer Permission',
  'needs permission': 'Needs Customer Permission',
  pending: 'Needs Customer Permission',
  archived: 'Archived',
};

function mapPermission(raw: string): string {
  if (!raw) return 'Internal Only';
  const lower = raw.toLowerCase().trim();

  for (const [key, value] of Object.entries(permissionMap)) {
    if (lower.includes(key)) {
      return value;
    }
  }

  return 'Internal Only';
}

// Map proof type from data
function mapProofType(raw: string): string {
  if (!raw) return 'anecdote';
  const lower = raw.toLowerCase();

  if (lower.includes('stat') || lower.includes('metric') || lower.includes('number')) {
    return 'stat';
  }
  if (lower.includes('quote')) {
    return 'quote';
  }
  if (lower.includes('benchmark')) {
    return 'benchmark';
  }
  if (lower.includes('case study') || lower.includes('case-study')) {
    return 'case-study';
  }

  return 'anecdote';
}

// Map asset type
const assetTypeMap: Record<string, string> = {
  bva: 'BVA - Business Value Assessment',
  'business value assessment': 'BVA - Business Value Assessment',
  qbr: 'QBR - Quarterly Business Review',
  'quarterly business review': 'QBR - Quarterly Business Review',
  ebr: 'EBR - Executive Business Review',
  'executive business review': 'EBR - Executive Business Review',
  rfx: 'RFX - RFP/RFI Response',
  rfp: 'RFX - RFP/RFI Response',
  rfi: 'RFX - RFP/RFI Response',
  strategy: 'Strategy Session',
  'strategy session': 'Strategy Session',
};

function mapAssetType(raw: string): string {
  if (!raw) return 'BVA - Business Value Assessment';
  const lower = raw.toLowerCase().trim();

  for (const [key, value] of Object.entries(assetTypeMap)) {
    if (lower.includes(key)) {
      return value;
    }
  }

  return 'BVA - Business Value Assessment';
}

// Map KPIs from text
function extractKpis(text: string): string[] {
  if (!text) return [];

  const kpiPatterns: Record<string, string> = {
    resolution: 'resolution-rate',
    resolve: 'resolution-rate',
    aht: 'aht',
    'handle time': 'aht',
    'handling time': 'aht',
    'cost sav': 'cost-savings',
    'cost reduction': 'cost-savings',
    'cost per contact': 'cost-per-contact',
    csat: 'csat',
    satisfaction: 'csat',
    fcr: 'fcr',
    'first contact': 'fcr',
    volume: 'conversation-volume',
    conversations: 'conversation-volume',
    productivity: 'agent-productivity',
    efficiency: 'agent-productivity',
    revenue: 'revenue-impact',
    sales: 'revenue-impact',
    reopen: 'reopen-rate',
  };

  const lower = text.toLowerCase();
  const found: string[] = [];

  for (const [pattern, kpi] of Object.entries(kpiPatterns)) {
    if (lower.includes(pattern) && !found.includes(kpi)) {
      found.push(kpi);
    }
  }

  return found;
}

// Parse tags from comma-separated string
function parseTags(text: string): string[] {
  if (!text) return [];
  return text
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

// ========================================
// IMPORT FUNCTIONS
// ========================================

interface ImportStats {
  total: number;
  created: number;
  skipped: number;
  errors: number;
}

// Import Proof Points from main spreadsheet
async function importProofPoints(filePath: string): Promise<ImportStats> {
  const stats: ImportStats = { total: 0, created: 0, skipped: 0, errors: 0 };

  if (!fs.existsSync(filePath)) {
    log.warning(`File not found: ${filePath}`);
    return stats;
  }

  log.info(`Reading: ${filePath}`);
  const workbook = XLSX.readFile(filePath);

  // Get CoE section reference
  const proofPointsSectionRef = await findOrCreateRef('coeSection', 'Proof Points', {
    icon: '📊',
    order: 5,
  });

  // ----------------------------------------
  // Sheet: CoE Proof Points (Anecdotes)
  // ----------------------------------------
  const anecdotesSheet = workbook.Sheets['CoE Proof Points'];
  if (anecdotesSheet) {
    const anecdotes = XLSX.utils.sheet_to_json(anecdotesSheet);
    log.info(`Processing ${anecdotes.length} anecdotes...`);
    stats.total += anecdotes.length;

    for (const row of anecdotes as any[]) {
      try {
        const headline = cleanText(row['Anecdote']) || cleanText(row['Data Point']);
        if (!headline) {
          stats.skipped++;
          continue;
        }

        // Check for duplicate
        const existing = await client.fetch(
          `*[_type == "coeEntry" && entryType == "proof-point" && headline == $headline][0]._id`,
          { headline }
        );

        if (existing) {
          log.verbose(`Skipping duplicate: ${headline.slice(0, 50)}...`);
          stats.skipped++;
          continue;
        }

        const industryRef = row['Industry']
          ? await findOrCreateRef('coeIndustry', normalizeIndustry(row['Industry']))
          : null;

        const permissionRef = await findOrCreateRef(
          'coePermission',
          mapPermission(row['Permissions'] || row['Permission'])
        );

        const doc: Record<string, any> = {
          _type: 'coeEntry',
          entryType: 'proof-point',
          title: headline.slice(0, 100),
          slug: {
            _type: 'slug',
            current: slugify(headline.slice(0, 50)) + '-' + generateKey().slice(0, 6),
          },
          headline,
          proofType: 'anecdote',
          customer: cleanText(row['Customer']) || cleanText(row['Brand']),
          source: cleanText(row['OG Submission Link']) || cleanText(row['Source']),
          proofSourceUrl: cleanText(row['OG Submission Link']) || cleanText(row['Source URL']),
          howToUse: cleanText(row['How to Use']) || cleanText(row['How to Use This']),
          reformattingRecommendations: cleanText(row['Reformatting Recommendations']),
          coeSection: proofPointsSectionRef,
          industry: industryRef,
          permission: permissionRef,
          tags: parseTags(row['Tags']),
          kpis: extractKpis(headline + ' ' + (row['How to Use'] || '')),
          status: 'draft',
          dateCollected: parseDate(row['Date']) || parseDate(row['Date Collected']),
          sourceContent: {
            rawContent: headline,
            sourceUrl: cleanText(row['OG Submission Link']),
            submittedBy: cleanText(row['Submitted By']),
            submissionDate: parseDate(row['Date']),
          },
        };

        // Remove null/undefined values
        Object.keys(doc).forEach((key) => {
          if (doc[key] === null || doc[key] === undefined) {
            delete doc[key];
          }
        });

        if (DRY_RUN) {
          log.verbose(`Would create: ${doc.title.slice(0, 50)}...`);
          stats.created++;
        } else {
          await client.create(doc as any);
          log.verbose(`Created: ${doc.title.slice(0, 50)}...`);
          stats.created++;
        }
      } catch (err: any) {
        log.error(`Failed to import anecdote: ${err.message}`);
        stats.errors++;
      }
    }
  }

  // ----------------------------------------
  // Sheet: Metrics of Success (Stats)
  // ----------------------------------------
  const metricsSheet = workbook.Sheets['Metrics of Success'];
  if (metricsSheet) {
    const metrics = XLSX.utils.sheet_to_json(metricsSheet);
    log.info(`Processing ${metrics.length} metrics...`);
    stats.total += metrics.length;

    for (const row of metrics as any[]) {
      try {
        const headline = cleanText(row['Data Point']) || cleanText(row['Metric']);
        if (!headline) {
          stats.skipped++;
          continue;
        }

        // Check for duplicate
        const existing = await client.fetch(
          `*[_type == "coeEntry" && entryType == "proof-point" && headline == $headline][0]._id`,
          { headline }
        );

        if (existing) {
          log.verbose(`Skipping duplicate: ${headline.slice(0, 50)}...`);
          stats.skipped++;
          continue;
        }

        const typeOfData = cleanText(row['Type of data']) || '';
        const proofType = mapProofType(typeOfData);

        const doc: Record<string, any> = {
          _type: 'coeEntry',
          entryType: 'proof-point',
          title: headline.slice(0, 100),
          slug: {
            _type: 'slug',
            current: slugify(headline.slice(0, 50)) + '-' + generateKey().slice(0, 6),
          },
          headline,
          proofType,
          customer: cleanText(row['Brand/Source']) || cleanText(row['Customer']),
          source: cleanText(row['Source']),
          coeSection: proofPointsSectionRef,
          kpis: extractKpis(headline),
          status: 'draft',
        };

        Object.keys(doc).forEach((key) => {
          if (doc[key] === null || doc[key] === undefined) {
            delete doc[key];
          }
        });

        if (DRY_RUN) {
          log.verbose(`Would create metric: ${doc.title.slice(0, 50)}...`);
          stats.created++;
        } else {
          await client.create(doc as any);
          log.verbose(`Created metric: ${doc.title.slice(0, 50)}...`);
          stats.created++;
        }
      } catch (err: any) {
        log.error(`Failed to import metric: ${err.message}`);
        stats.errors++;
      }
    }
  }

  // ----------------------------------------
  // Sheet: Customer Quotes
  // ----------------------------------------
  const quotesSheet = workbook.Sheets['Customer Quotes'] || workbook.Sheets['Quotes'];
  if (quotesSheet) {
    const quotes = XLSX.utils.sheet_to_json(quotesSheet);
    log.info(`Processing ${quotes.length} quotes...`);
    stats.total += quotes.length;

    for (const row of quotes as any[]) {
      try {
        const headline = cleanText(row['Quote']) || cleanText(row['Customer Quote']);
        if (!headline) {
          stats.skipped++;
          continue;
        }

        const existing = await client.fetch(
          `*[_type == "coeEntry" && entryType == "proof-point" && headline == $headline][0]._id`,
          { headline }
        );

        if (existing) {
          stats.skipped++;
          continue;
        }

        const industryRef = row['Industry']
          ? await findOrCreateRef('coeIndustry', normalizeIndustry(row['Industry']))
          : null;

        const permissionRef = await findOrCreateRef(
          'coePermission',
          mapPermission(row['Permission'] || 'Internal Only')
        );

        const doc: Record<string, any> = {
          _type: 'coeEntry',
          entryType: 'proof-point',
          title: `Quote: ${(cleanText(row['Customer']) || 'Customer').slice(0, 50)}`,
          slug: {
            _type: 'slug',
            current:
              'quote-' +
              slugify((row['Customer'] || '').slice(0, 30)) +
              '-' +
              generateKey().slice(0, 6),
          },
          headline,
          proofType: 'quote',
          customer: cleanText(row['Customer']),
          source: cleanText(row['Source']),
          coeSection: proofPointsSectionRef,
          industry: industryRef,
          permission: permissionRef,
          status: 'draft',
        };

        Object.keys(doc).forEach((key) => {
          if (doc[key] === null || doc[key] === undefined) {
            delete doc[key];
          }
        });

        if (DRY_RUN) {
          log.verbose(`Would create quote: ${doc.title}`);
          stats.created++;
        } else {
          await client.create(doc as any);
          log.verbose(`Created quote: ${doc.title}`);
          stats.created++;
        }
      } catch (err: any) {
        log.error(`Failed to import quote: ${err.message}`);
        stats.errors++;
      }
    }
  }

  // ----------------------------------------
  // Sheet: Benchmarks
  // ----------------------------------------
  const benchmarksSheet = workbook.Sheets['Benchmarks'];
  if (benchmarksSheet) {
    const benchmarks = XLSX.utils.sheet_to_json(benchmarksSheet);
    log.info(`Processing ${benchmarks.length} benchmarks...`);
    stats.total += benchmarks.length;

    for (const row of benchmarks as any[]) {
      try {
        const headline = cleanText(row['Benchmark']) || cleanText(row['Data Point']);
        if (!headline) {
          stats.skipped++;
          continue;
        }

        const existing = await client.fetch(
          `*[_type == "coeEntry" && entryType == "proof-point" && headline == $headline][0]._id`,
          { headline }
        );

        if (existing) {
          stats.skipped++;
          continue;
        }

        const doc: Record<string, any> = {
          _type: 'coeEntry',
          entryType: 'proof-point',
          title: headline.slice(0, 100),
          slug: {
            _type: 'slug',
            current:
              'benchmark-' + slugify(headline.slice(0, 40)) + '-' + generateKey().slice(0, 6),
          },
          headline,
          proofType: 'benchmark',
          source: cleanText(row['Source']),
          howToUse: cleanText(row['How to Use']),
          coeSection: proofPointsSectionRef,
          kpis: extractKpis(headline),
          status: 'draft',
        };

        Object.keys(doc).forEach((key) => {
          if (doc[key] === null || doc[key] === undefined) {
            delete doc[key];
          }
        });

        if (DRY_RUN) {
          log.verbose(`Would create benchmark: ${doc.title.slice(0, 50)}...`);
          stats.created++;
        } else {
          await client.create(doc as any);
          log.verbose(`Created benchmark: ${doc.title.slice(0, 50)}...`);
          stats.created++;
        }
      } catch (err: any) {
        log.error(`Failed to import benchmark: ${err.message}`);
        stats.errors++;
      }
    }
  }

  return stats;
}

// Import Customer Assets (BVAs, QBRs, etc.)
async function importCustomerAssets(filePath: string): Promise<ImportStats> {
  const stats: ImportStats = { total: 0, created: 0, skipped: 0, errors: 0 };

  if (!fs.existsSync(filePath)) {
    log.warning(`File not found: ${filePath}`);
    return stats;
  }

  log.info(`Reading: ${filePath}`);
  const workbook = XLSX.readFile(filePath);

  // Get section reference
  const assetsSectionRef = await findOrCreateRef('coeSection', 'Meeting Asset Examples', {
    icon: '📁',
    order: 6,
  });

  // Try different sheet names
  const sheetNames = ['FY26 Customer Meetings + BVAs', 'Customer Assets', 'BVAs', 'Sheet1'];

  let sheet = null;
  let usedSheetName = '';

  for (const name of sheetNames) {
    if (workbook.Sheets[name]) {
      sheet = workbook.Sheets[name];
      usedSheetName = name;
      break;
    }
  }

  if (!sheet) {
    log.warning(`No matching sheet found in ${filePath}`);
    log.info(`Available sheets: ${workbook.SheetNames.join(', ')}`);
    return stats;
  }

  log.info(`Using sheet: ${usedSheetName}`);

  // Get all rows including headers
  const allRows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

  // Find header row (usually first or second row)
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(5, allRows.length); i++) {
    const row = allRows[i];
    if (
      row &&
      row.some(
        (cell: any) =>
          String(cell).toLowerCase().includes('account') ||
          String(cell).toLowerCase().includes('customer')
      )
    ) {
      headerRowIndex = i;
      break;
    }
  }

  const headers = allRows[headerRowIndex].map((h: any) => String(h || '').toLowerCase().trim());
  const dataRows = allRows.slice(headerRowIndex + 1);

  log.info(`Found ${dataRows.length} potential assets (header row: ${headerRowIndex + 1})`);
  stats.total = dataRows.length;

  // Find column indices
  const findCol = (patterns: string[]): number => {
    return headers.findIndex((h) => patterns.some((p) => h.includes(p)));
  };

  const cols = {
    account: findCol(['account', 'customer', 'company']),
    assetType: findCol(['output type', 'asset type', 'type', 'deliverable']),
    positioning: findCol(['positioning', 'product']),
    outcomes: findCol(['outcome', 'result', 'impact']),
    deliveryDate: findCol(['date', 'delivery', 'delivered']),
    salesStage: findCol(['stage', 'pre-sales', 'post-sales', 'sales stage']),
    csLead: findCol(['cs lead', 'sales lead', 'owner', 'lead']),
    author: findCol(['author', 'created by', 'by']),
    execSummary: findCol(['exec', 'summary', 'deck', 'presentation']),
    model: findCol(['model', 'bva model', 'calculator']),
    recording: findCol(['recording', 'video', 'meeting recording']),
    learnings: findCol(['learning', 'notes', 'key learning']),
  };

  log.verbose(`Column mapping: ${JSON.stringify(cols)}`);

  for (const row of dataRows) {
    try {
      // Skip empty rows
      if (!row || row.length === 0) {
        stats.skipped++;
        continue;
      }

      const account = cleanText(row[cols.account]);
      if (!account) {
        stats.skipped++;
        continue;
      }

      const assetTypeName = cleanText(row[cols.assetType]) || 'BVA';
      const title = `${account} - ${mapAssetType(assetTypeName).split(' - ')[0]}`;

      // Check for duplicate
      const existing = await client.fetch(
        `*[_type == "coeEntry" && entryType == "meeting-asset" && account == $account && title match $titlePattern][0]._id`,
        { account, titlePattern: `${account}*` }
      );

      if (existing) {
        log.verbose(`Skipping duplicate: ${title}`);
        stats.skipped++;
        continue;
      }

      const assetTypeRef = await findOrCreateRef('coeAssetType', mapAssetType(assetTypeName));

      // Determine sales stage
      let salesStage = 'post-sales';
      const stageValue = cleanText(row[cols.salesStage]) || '';
      if (stageValue.toLowerCase().includes('pre')) {
        salesStage = 'pre-sales';
      }

      const doc: Record<string, any> = {
        _type: 'coeEntry',
        entryType: 'meeting-asset',
        title,
        slug: { _type: 'slug', current: slugify(title) + '-' + generateKey().slice(0, 6) },
        account,
        assetType: assetTypeRef,
        positioning: cleanText(row[cols.positioning]),
        outcomes: cleanText(row[cols.outcomes]),
        deliveryDate: parseDate(row[cols.deliveryDate]),
        salesStage,
        csOrSalesLead: cleanText(row[cols.csLead]),
        assetAuthor: cleanText(row[cols.author]),
        executiveSummaryUrl: cleanText(row[cols.execSummary]),
        modelUrl: cleanText(row[cols.model]),
        recordingUrl: cleanText(row[cols.recording]),
        learnings: cleanText(row[cols.learnings]),
        coeSection: assetsSectionRef,
        status: 'draft',
      };

      // Remove null/undefined values
      Object.keys(doc).forEach((key) => {
        if (doc[key] === null || doc[key] === undefined) {
          delete doc[key];
        }
      });

      if (DRY_RUN) {
        log.verbose(`Would create asset: ${doc.title}`);
        stats.created++;
      } else {
        await client.create(doc as any);
        log.verbose(`Created asset: ${doc.title}`);
        stats.created++;
      }
    } catch (err: any) {
      log.error(`Failed to import asset: ${err.message}`);
      stats.errors++;
    }
  }

  return stats;
}

// ========================================
// MAIN EXECUTION
// ========================================

async function main() {
  console.log('\n');
  log.divider();
  log.info('CoE Data Import');
  log.divider();

  if (DRY_RUN) {
    log.warning('DRY RUN MODE - No documents will be created');
  }

  if (!client.config().token) {
    log.error('Missing SANITY_TOKEN environment variable');
    log.info('Set SANITY_TOKEN in your environment or .env.local file');
    log.info('Get a token from: sanity.io/manage > Your Project > API > Tokens');
    process.exit(1);
  }

  const allStats: Record<string, ImportStats> = {};

  // Import Proof Points
  log.divider();
  log.info('Importing Proof Points...');
  log.divider();
  allStats.proofPoints = await importProofPoints(FILES.proofPoints);
  log.success(
    `Proof Points: ${allStats.proofPoints.created} created, ${allStats.proofPoints.skipped} skipped, ${allStats.proofPoints.errors} errors`
  );

  // Import Customer Assets
  log.divider();
  log.info('Importing Customer Assets...');
  log.divider();
  allStats.customerAssets = await importCustomerAssets(FILES.customerAssets);
  log.success(
    `Customer Assets: ${allStats.customerAssets.created} created, ${allStats.customerAssets.skipped} skipped, ${allStats.customerAssets.errors} errors`
  );

  // Summary
  log.divider();
  log.info('IMPORT SUMMARY');
  log.divider();

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const [name, stats] of Object.entries(allStats)) {
    console.log(
      `  ${name}: ${stats.created} created, ${stats.skipped} skipped, ${stats.errors} errors`
    );
    totalCreated += stats.created;
    totalSkipped += stats.skipped;
    totalErrors += stats.errors;
  }

  log.divider();
  log.success(`TOTAL: ${totalCreated} created, ${totalSkipped} skipped, ${totalErrors} errors`);

  if (DRY_RUN) {
    log.warning('This was a dry run. Run without --dry-run to create documents.');
  }

  console.log('\n');
}

main().catch((err) => {
  log.error(`Import failed: ${err.message}`);
  console.error(err);
  process.exit(1);
});
