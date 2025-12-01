import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

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

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// CSV file path
const CSV_PATH = './enablement transcripts/Copy of Customer Asset Library _ FY26 Q3 - Oct 2025 - FY26 Customer Meetings + BVAs.csv';

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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
}

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split('\n');
  const results: Record<string, string>[] = [];

  // Find header row (row 14 based on the CSV structure - "Logo,Account,Stage,Type,...")
  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Logo,Account,Stage,Type')) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) {
    log.error('Could not find header row in CSV');
    return [];
  }

  const headers = parseCSVLine(lines[headerIndex]);
  log.verbose(`Headers: ${headers.join(', ')}`);

  // Parse data rows
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || '';
    });

    // Skip rows without account name (like the instruction rows)
    if (row['Account'] && row['Account'].length > 0) {
      results.push(row);
    }
  }

  return results;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function convertLogoPath(localPath: string): string | null {
  if (!localPath) return null;

  // Extract filename from the local path
  const filename = path.basename(localPath);

  // Return the web-accessible URL
  return `/logos/${filename}`;
}

function parseDate(dateStr: string): string | null {
  if (!dateStr) return null;

  // Handle formats like "5/30/2025" or "9/30/2025"
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  return null;
}

function mapMeetingType(type: string): string {
  if (!type) return 'BVA';

  const lower = type.toLowerCase();

  if (lower.includes('strategy session')) return 'Strategy Session';
  if (lower.includes('executive business review') || lower === 'ebr') return 'EBR';
  if (lower.includes('quarterly business review') || lower === 'qbr') return 'QBR';
  if (lower.includes('rfx') || lower.includes('rfp') || lower.includes('rfi')) return 'RFX';
  if (lower.includes('bva') || lower.includes('business value')) return 'BVA';

  return type;
}

function mapSalesStage(stage: string): string {
  if (!stage) return 'post-sales';

  const lower = stage.toLowerCase();
  if (lower.includes('pre')) return 'pre-sales';
  return 'post-sales';
}

// ========================================
// MAIN UPDATE FUNCTION
// ========================================

async function updateMeetingAssets() {
  log.divider();
  log.info('Updating Meeting Assets from CSV');
  log.divider();

  if (DRY_RUN) {
    log.warning('DRY RUN MODE - No documents will be modified');
  }

  if (!client.config().token) {
    log.error('Missing SANITY_TOKEN environment variable');
    process.exit(1);
  }

  // Read CSV file
  if (!fs.existsSync(CSV_PATH)) {
    log.error(`CSV file not found: ${CSV_PATH}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const rows = parseCSV(csvContent);

  log.info(`Found ${rows.length} meeting assets in CSV`);

  let updated = 0;
  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of rows) {
    try {
      const account = row['Account'];
      const meetingType = mapMeetingType(row['Type']);

      if (!account) {
        skipped++;
        continue;
      }

      // Build update data
      const updateData: Record<string, any> = {
        account,
        meetingType,
        customerLogoUrl: convertLogoPath(row['Logo']),
        summary: row['Description'] || null,
        deliveryDate: parseDate(row['Date']),
        salesStage: mapSalesStage(row['Stage']),
        csOrSalesLead: row['CS or Sales Lead'] || null,
        assetAuthor: row['BVA Author(s)'] || null,
        slidesUrl: row['Slides URL'] || null,
        modelUrl: row['Model URL'] || null,
        recordingUrl: row['Meeting Recording **NEW**'] || null,
      };

      // Remove null values
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === null || updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      // Search for existing entry by account + meetingType (unique combination)
      const existing = await client.fetch(
        `*[_type == "coeEntry" && entryType == "meeting-asset" && account == $account && meetingType == $meetingType][0]`,
        { account, meetingType }
      );

      const title = `${account} ${meetingType}`;

      if (existing) {
        // Update existing entry
        if (!DRY_RUN) {
          await client.patch(existing._id).set(updateData).commit();
        }
        log.verbose(`Updated: ${title}`);
        updated++;
      } else {
        // Try to find by exact title
        const byTitle = await client.fetch(
          `*[_type == "coeEntry" && entryType == "meeting-asset" && title == $title][0]`,
          { title }
        );

        if (byTitle) {
          if (!DRY_RUN) {
            await client.patch(byTitle._id).set(updateData).commit();
          }
          log.verbose(`Updated (by title): ${title}`);
          updated++;
        } else {
          // Create new entry
          const newEntry = {
            _type: 'coeEntry',
            entryType: 'meeting-asset',
            title,
            slug: { _type: 'slug', current: slugify(title) },
            status: 'published',
            ...updateData,
          };

          if (!DRY_RUN) {
            await client.create(newEntry as any);
          }
          log.verbose(`Created: ${title}`);
          created++;
        }
      }
    } catch (err: any) {
      log.error(`Failed to process ${row['Account']}: ${err.message}`);
      errors++;
    }
  }

  log.divider();
  log.success(`Results: ${updated} updated, ${created} created, ${skipped} skipped, ${errors} errors`);

  if (DRY_RUN) {
    log.warning('This was a dry run. Run without --dry-run to apply changes.');
  }
}

updateMeetingAssets().catch(err => {
  log.error(`Script failed: ${err.message}`);
  console.error(err);
  process.exit(1);
});
