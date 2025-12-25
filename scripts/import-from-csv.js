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

// Parse date from title like "6/12/25 Enablement: Title"
function extractDateFromTitle(title) {
  const dateMatch = title.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s*/);
  if (!dateMatch) return null;

  const [fullMatch, month, day, year] = dateMatch;
  const fullYear = year.length === 4 ? parseInt(year, 10) : 2000 + parseInt(year, 10);
  const isoDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  let cleanedTitle = title.replace(/^\d{1,2}\/\d{1,2}\/\d{2,4}\s*/, '').trim();
  cleanedTitle = cleanedTitle.replace(/^:\s*/, '');

  return { sessionDate: isoDate, cleanedTitle };
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 96);
}

// Parse CSV line (handles quoted fields with commas)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Map CSV format to schema format
function mapFormat(csvFormat) {
  const formatMap = {
    'article': 'document',
    'deck': 'slides',
    'slides': 'slides',
    'video': 'video',
    'one-pager': 'one-pager',
    'battlecard': 'battlecard',
    'competitive': 'competitive',
    'guide': 'guide',
    'messaging': 'messaging',
    'meeting-asset': 'meeting-asset',
    'playbook': 'playbook',
    'prototype': 'prototype',
    'tool': 'tool',
    'live-replay': 'live-replay',
    'on-demand': 'on-demand',
  };
  return formatMap[csvFormat] || csvFormat || undefined;
}

// Map hub to publishedTo array
function mapHub(hub) {
  if (!hub) return ['content'];
  const hubLower = hub.toLowerCase();
  if (hubLower === 'enablement') return ['enablement'];
  if (hubLower === 'content') return ['content'];
  if (hubLower === 'coe') return ['coe'];
  if (hubLower === 'both') return ['content', 'enablement'];
  return ['content'];
}

async function importFromCSV() {
  const csvPath = process.argv[2] || path.join(__dirname, 'audit-data.csv');

  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found:', csvPath);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());

  // Parse header
  const header = parseCSVLine(lines[0]);
  console.log('CSV Headers:', header.join(', '));
  console.log('');

  // Get column indices
  const cols = {
    title: header.indexOf('title'),
    description: header.indexOf('description'),
    hub: header.indexOf('hub'),
    coeType: header.indexOf('coeType'),
    enablementCategory: header.indexOf('enablementCategory'),
    contentType: header.indexOf('contentType'),
    teams: header.indexOf('teams'),
    products: header.indexOf('products'),
    format: header.indexOf('format'),
    externalUrl: header.indexOf('externalUrl'),
    videoUrl: header.indexOf('videoUrl'),
    slidesUrl: header.indexOf('slidesUrl'),
    keyAssetUrl: header.indexOf('keyAssetUrl'),
    keyAssetLabel: header.indexOf('keyAssetLabel'),
    presenter: header.indexOf('presenter'),
    duration: header.indexOf('duration'),
    publishDate: header.indexOf('publishDate'),
    featured: header.indexOf('featured'),
    priority: header.indexOf('priority'),
  };

  // Fetch existing entries by title for matching
  const existingEntries = await client.fetch(`*[_type == "catalogEntry"]{
    _id,
    title,
    slug
  }`);

  const existingByTitle = {};
  existingEntries.forEach(e => {
    const key = (e.title || '').toLowerCase().trim();
    existingByTitle[key] = e;
  });

  // Fetch all collections for auto-assignment
  const collections = await client.fetch(`*[_type == "collection"]{
    _id,
    name,
    slug,
    hub
  }`);

  // Create lookup maps for collections by hub and slug
  const collectionsByHubAndSlug = {};
  collections.forEach(c => {
    const key = `${c.hub}:${c.slug.current}`;
    collectionsByHubAndSlug[key] = c._id;
  });

  console.log(`Found ${existingEntries.length} existing entries in Sanity`);
  console.log(`Found ${collections.length} collections for auto-assignment`);
  console.log(`Processing ${lines.length - 1} CSV rows...\n`);

  const toCreate = [];
  const toUpdate = [];
  const skipped = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length < 2 || !row[cols.title]) continue;

    let title = row[cols.title];
    const description = row[cols.description] || '';
    const hub = row[cols.hub] || '';
    const coeType = row[cols.coeType] || '';
    const enablementCategory = row[cols.enablementCategory] || '';
    const teamsRaw = row[cols.teams] || '';
    const teams = teamsRaw ? teamsRaw.split('|').map(t => t.trim()).filter(Boolean) : [];
    const format = mapFormat(row[cols.format]);
    const externalUrl = row[cols.externalUrl] || '';
    const videoUrl = row[cols.videoUrl] || '';
    const slidesUrl = row[cols.slidesUrl] || '';
    const keyAssetUrl = row[cols.keyAssetUrl] || '';
    const keyAssetLabel = row[cols.keyAssetLabel] || '';
    const presenter = row[cols.presenter] || '';
    const featured = row[cols.featured]?.toLowerCase() === 'true';
    const priority = parseInt(row[cols.priority]) || 50;

    // Extract session date from title if present
    let sessionDate = null;
    const dateInfo = extractDateFromTitle(title);
    if (dateInfo) {
      sessionDate = dateInfo.sessionDate;
      title = dateInfo.cleanedTitle;
    }

    // Build entry object
    let publishedTo = mapHub(hub);

    // AUTO-ADD BOTH HUBS: If it's video/on-demand content in enablement, also add to content hub
    // This allows videos to appear in both Content Hub collections AND Enablement Hub collections
    if (publishedTo.includes('enablement') && (format === 'video' || format === 'on-demand' || format === 'live-replay')) {
      if (!publishedTo.includes('content')) {
        publishedTo.push('content');
      }
    }

    const entry = {
      _type: 'catalogEntry',
      title,
      description: description.substring(0, 500), // Limit description length
      slug: { _type: 'slug', current: generateSlug(title) },
      publishedTo,
      format,
      status: 'published',
      featured,
      priority,
    };

    // Add optional fields
    if (sessionDate) entry.sessionDate = sessionDate;
    if (externalUrl) entry.externalUrl = externalUrl;
    if (videoUrl) entry.videoUrl = videoUrl;
    if (slidesUrl) entry.slidesUrl = slidesUrl;
    if (keyAssetUrl) entry.keyAssetUrl = keyAssetUrl;
    if (keyAssetLabel) entry.keyAssetLabel = keyAssetLabel;
    if (presenter) entry.presenter = presenter;
    if (teams.length > 0) entry.teams = teams;

    // Add categories as arrays
    if (enablementCategory) {
      entry.enablementCategory = [enablementCategory];
    }
    if (coeType) {
      entry.coeType = [coeType];
    }

    // ========================================
    // AUTO-ASSIGN COLLECTIONS
    // ========================================

    const assignedCollections = {
      enablement: [],
      coe: [],
      content: [],
    };

    // For Enablement Hub: Assign based on teams
    if (entry.publishedTo.includes('enablement')) {
      teams.forEach(team => {
        const teamSlugMap = {
          'sales': 'sales',
          'customer-success': 'cs',
          'solutions-consultant': 'sc',
          'implementation': 'sc', // Map implementation to SC
          'ps': 'sc', // Map PS to SC
        };
        const slug = teamSlugMap[team];
        if (slug) {
          const collectionId = collectionsByHubAndSlug[`enablement:${slug}`];
          if (collectionId && !assignedCollections.enablement.includes(collectionId)) {
            assignedCollections.enablement.push(collectionId);
          }
        }
      });

      // Also check for New Hire content (if it has certain keywords or is onboarding)
      if (title.toLowerCase().includes('new hire') ||
          title.toLowerCase().includes('onboarding') ||
          enablementCategory === 'onboarding') {
        const newHireId = collectionsByHubAndSlug['enablement:new-hire'];
        if (newHireId && !assignedCollections.enablement.includes(newHireId)) {
          assignedCollections.enablement.push(newHireId);
        }
      }

      // If no teams assigned, default to Uncategorized
      if (assignedCollections.enablement.length === 0) {
        const uncategorizedId = collectionsByHubAndSlug['enablement:enablement-uncategorized'];
        if (uncategorizedId) {
          assignedCollections.enablement.push(uncategorizedId);
        }
      }
    }

    // For CoE Hub: Assign based on coeType
    if (entry.publishedTo.includes('coe')) {
      if (coeType) {
        const coeTypeSlugMap = {
          'meeting-asset': 'meeting-examples',
          'proof-point': 'proof-points',
          'internal-best-practice': 'best-practices',
          'process-innovation': 'best-practices',
          'tool': 'best-practices', // Tools can go to best practices
        };
        const slug = coeTypeSlugMap[coeType];
        if (slug) {
          const collectionId = collectionsByHubAndSlug[`coe:${slug}`];
          if (collectionId) {
            assignedCollections.coe.push(collectionId);
          }
        }
      }

      // Check for playbooks and dashboards in title/format
      if (format === 'playbook' || title.toLowerCase().includes('playbook')) {
        const playbookId = collectionsByHubAndSlug['coe:playbooks'];
        if (playbookId && !assignedCollections.coe.includes(playbookId)) {
          assignedCollections.coe.push(playbookId);
        }
      }

      if (title.toLowerCase().includes('dashboard')) {
        const dashboardId = collectionsByHubAndSlug['coe:dashboards'];
        if (dashboardId && !assignedCollections.coe.includes(dashboardId)) {
          assignedCollections.coe.push(dashboardId);
        }
      }

      // Default to Uncategorized if no collection assigned
      if (assignedCollections.coe.length === 0) {
        const uncategorizedId = collectionsByHubAndSlug['coe:coe-uncategorized'];
        if (uncategorizedId) {
          assignedCollections.coe.push(uncategorizedId);
        }
      }
    }

    // For Content Hub: Assign based on format
    if (entry.publishedTo.includes('content')) {
      const formatSlugMap = {
        'slides': 'meeting-decks',
        'deck': 'meeting-decks',
        'one-pager': 'one-pagers',
        'battlecard': 'competitive',
        'competitive': 'competitive',
        'template': 'templates',
        'tool': 'value-tools',
        'calculator': 'value-tools',
      };

      const slug = formatSlugMap[format];
      if (slug) {
        const collectionId = collectionsByHubAndSlug[`content:${slug}`];
        if (collectionId) {
          assignedCollections.content.push(collectionId);
        }
      }

      // Default to Uncategorized if no format match
      if (assignedCollections.content.length === 0) {
        const uncategorizedId = collectionsByHubAndSlug['content:uncategorized'];
        if (uncategorizedId) {
          assignedCollections.content.push(uncategorizedId);
        }
      }
    }

    // Add collection references to entry with proper _key values
    if (assignedCollections.enablement.length > 0) {
      entry.enablementHubCollections = assignedCollections.enablement.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: id, // Use collection ID as key for uniqueness
      }));
    }
    if (assignedCollections.coe.length > 0) {
      entry.coeHubCollections = assignedCollections.coe.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: id, // Use collection ID as key for uniqueness
      }));
    }
    if (assignedCollections.content.length > 0) {
      entry.contentHubCollections = assignedCollections.content.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: id, // Use collection ID as key for uniqueness
      }));
    }

    // Check if exists
    const existingKey = title.toLowerCase().trim();
    const existing = existingByTitle[existingKey];

    if (existing) {
      entry._id = existing._id;
      toUpdate.push(entry);
    } else {
      toCreate.push(entry);
    }
  }

  console.log(`=== SUMMARY ===`);
  console.log(`To create: ${toCreate.length}`);
  console.log(`To update: ${toUpdate.length}`);
  console.log('');

  // Preview first 5 of each
  if (toCreate.length > 0) {
    console.log('=== NEW ENTRIES (first 5) ===');
    toCreate.slice(0, 5).forEach(e => {
      const collectionCounts = [];
      if (e.enablementHubCollections) collectionCounts.push(`Enablement: ${e.enablementHubCollections.length}`);
      if (e.coeHubCollections) collectionCounts.push(`CoE: ${e.coeHubCollections.length}`);
      if (e.contentHubCollections) collectionCounts.push(`Content: ${e.contentHubCollections.length}`);
      const collectionInfo = collectionCounts.length > 0 ? ` [${collectionCounts.join(', ')}]` : '';
      console.log(`  "${e.title}" (${e.format || 'no format'}) -> ${e.publishedTo?.join(', ')}${collectionInfo}`);
    });
    console.log('');
  }

  if (toUpdate.length > 0) {
    console.log('=== UPDATES (first 5) ===');
    toUpdate.slice(0, 5).forEach(e => {
      const collectionCounts = [];
      if (e.enablementHubCollections) collectionCounts.push(`Enablement: ${e.enablementHubCollections.length}`);
      if (e.coeHubCollections) collectionCounts.push(`CoE: ${e.coeHubCollections.length}`);
      if (e.contentHubCollections) collectionCounts.push(`Content: ${e.contentHubCollections.length}`);
      const collectionInfo = collectionCounts.length > 0 ? ` [${collectionCounts.join(', ')}]` : '';
      console.log(`  "${e.title}" (${e.format || 'no format'}) -> ${e.publishedTo?.join(', ')}${collectionInfo}`);
      if (e.sessionDate) console.log(`    sessionDate: ${e.sessionDate}`);
    });
    console.log('');
  }

  if (process.argv.includes('--apply')) {
    console.log('=== APPLYING CHANGES ===\n');

    let created = 0;
    let updated = 0;
    let errors = 0;

    // Create new entries
    for (const entry of toCreate) {
      try {
        await client.create(entry);
        console.log('CREATED:', entry.title);
        created++;
      } catch (err) {
        console.log('ERROR creating:', entry.title, '-', err.message.substring(0, 60));
        errors++;
      }
    }

    // Update existing entries
    for (const entry of toUpdate) {
      try {
        const { _id, _type, ...fields } = entry;
        await client.patch(_id).set(fields).commit();
        console.log('UPDATED:', entry.title);
        updated++;
      } catch (err) {
        console.log('ERROR updating:', entry.title, '-', err.message.substring(0, 60));
        errors++;
      }
    }

    console.log('\n=== COMPLETE ===');
    console.log(`Created: ${created}`);
    console.log(`Updated: ${updated}`);
    console.log(`Errors: ${errors}`);
  } else {
    console.log('Run with --apply to make these changes');
  }
}

importFromCSV().catch(console.error);
