const { createClient } = require('@sanity/client');
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

// Parse publishedTo from pipe-separated string (e.g., "content|enablement|coe")
function parsePublishedTo(value) {
  if (!value) return [];
  return value.split('|').map(v => v.trim()).filter(Boolean);
}

// Parse pipe-separated array values
function parsePipeSeparated(value) {
  if (!value) return [];
  return value.split('|').map(v => v.trim()).filter(Boolean);
}

// Parse collection assignments from CSV format
// Format: "CollectionName:Subsec1+Subsec2|OtherCollection"
function parseCollectionAssignments(value, collectionsByName) {
  if (!value) return [];
  const assignments = [];
  const parts = value.split('|');

  for (const part of parts) {
    const [collectionName, subsectionsStr] = part.split(':');
    const name = collectionName.trim();

    const collectionId = collectionsByName[name.toLowerCase()];
    if (!collectionId) {
      console.log(`  WARNING: Collection "${name}" not found`);
      continue;
    }

    const subsections = subsectionsStr
      ? subsectionsStr.split('+').map(s => s.trim()).filter(Boolean)
      : [];

    assignments.push({
      _key: `${collectionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      collection: {
        _type: 'reference',
        _ref: collectionId,
      },
      subsections,
    });
  }

  return assignments;
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

  // Get column indices - supports both old and new format
  // Supports v2.0 CMS schema with id/type/product/collections as well as legacy format
  const cols = {
    // Core identifiers
    _id: header.indexOf('_id'),
    id: header.indexOf('id'), // v2.0 format uses 'id' instead of '_id'
    title: header.indexOf('title'),
    slug: header.indexOf('slug'),
    description: header.indexOf('description'),
    status: header.indexOf('status'),

    // Hub assignment
    publishedTo: header.indexOf('publishedTo'),
    hub: header.indexOf('hub'), // Legacy support AND v2.0 format

    // Type categorization
    type: header.indexOf('type'), // v2.0 format: unified type field
    coeType: header.indexOf('coeType'),
    enablementCategory: header.indexOf('enablementCategory'),
    contentType: header.indexOf('contentType'),

    // Taxonomy
    teams: header.indexOf('teams'),
    products: header.indexOf('products'),
    product: header.indexOf('product'), // v2.0 format: singular
    audiences: header.indexOf('audiences'),
    format: header.indexOf('format'),

    // URLs
    externalUrl: header.indexOf('externalUrl'),
    internalUrl: header.indexOf('internalUrl'), // v2.0 format
    videoUrl: header.indexOf('videoUrl'),
    slidesUrl: header.indexOf('slidesUrl'),
    keyAssetUrl: header.indexOf('keyAssetUrl'),
    keyAssetLabel: header.indexOf('keyAssetLabel'),
    transcriptUrl: header.indexOf('transcriptUrl'),

    // Metadata
    presenter: header.indexOf('presenter'),
    duration: header.indexOf('duration'),
    publishDate: header.indexOf('publishDate'),
    date: header.indexOf('date'), // v2.0 format: 'date' instead of 'publishDate'
    icon: header.indexOf('icon'), // v2.0 format

    // Display settings
    featured: header.indexOf('featured'),
    featuredLaunch: header.indexOf('featuredLaunch'), // v2.0 format
    displayPriority: header.indexOf('displayPriority'),
    priority: header.indexOf('priority'),

    // Access control (v2.0 format)
    access: header.indexOf('access'),

    // Proof point fields
    customer: header.indexOf('customer'),
    isBlindCustomer: header.indexOf('isBlindCustomer'),
    kpiCategory: header.indexOf('kpiCategory'),
    productTags: header.indexOf('productTags'),
    channelTag: header.indexOf('channelTag'),
    approvedForExternal: header.indexOf('approvedForExternal'),
    competitor: header.indexOf('competitor'), // v2.0 format

    // Collection assignments (supports both naming conventions)
    contentHubCollections: header.indexOf('contentHubCollections'),
    enablementHubCollections: header.indexOf('enablementHubCollections'),
    coeHubCollections: header.indexOf('coeHubCollections'),
    curatedHubCollections: header.indexOf('curatedHubCollections'),
    collections: header.indexOf('collections'), // v2.0 format: unified collections field
  };

  // Detect CSV format version
  const hasExportFormat = cols._id >= 0 && cols.publishedTo >= 0;
  const hasV2Format = cols.id >= 0 && cols.hub >= 0 && cols.type >= 0;
  const hasNewFormat = hasExportFormat || hasV2Format;

  if (hasV2Format) {
    console.log('CSV Format: v2.0 (unified design system format)\n');
  } else if (hasExportFormat) {
    console.log('CSV Format: EXPORT (catalog-export format)\n');
  } else {
    console.log('CSV Format: LEGACY (audit format)\n');
  }

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

  // Create lookup maps for collections
  const collectionsByHubAndSlug = {};
  const collectionsByName = {}; // For new format import
  collections.forEach(c => {
    const key = `${c.hub}:${c.slug.current}`;
    collectionsByHubAndSlug[key] = c._id;
    // Map by name (case insensitive)
    collectionsByName[c.name.toLowerCase()] = c._id;
  });

  console.log(`Found ${existingEntries.length} existing entries in Sanity`);
  console.log(`Found ${collections.length} collections for auto-assignment`);
  console.log(`Processing ${lines.length - 1} CSV rows...\n`);

  const toCreate = [];
  const toUpdate = [];
  const skipped = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length < 2 || !row[cols.title >= 0 ? cols.title : 1]) continue;

    let title = row[cols.title] || '';
    const description = row[cols.description] || '';

    // Parse format (different handling for new vs legacy)
    const format = hasNewFormat
      ? (row[cols.format] || undefined)
      : mapFormat(row[cols.format]);

    // Parse links
    const externalUrl = cols.externalUrl >= 0 ? (row[cols.externalUrl] || '') : '';
    const videoUrl = cols.videoUrl >= 0 ? (row[cols.videoUrl] || '') : '';
    const slidesUrl = cols.slidesUrl >= 0 ? (row[cols.slidesUrl] || '') : '';
    const keyAssetUrl = cols.keyAssetUrl >= 0 ? (row[cols.keyAssetUrl] || '') : '';
    const keyAssetLabel = cols.keyAssetLabel >= 0 ? (row[cols.keyAssetLabel] || '') : '';
    const transcriptUrl = cols.transcriptUrl >= 0 ? (row[cols.transcriptUrl] || '') : '';
    const presenter = cols.presenter >= 0 ? (row[cols.presenter] || '') : '';
    const duration = cols.duration >= 0 ? (row[cols.duration] || '') : '';

    // Parse boolean and number fields
    const featured = cols.featured >= 0 ? row[cols.featured]?.toLowerCase() === 'true' : false;
    const priority = cols.priority >= 0 ? (parseInt(row[cols.priority]) || 50) : 50;
    const displayPriority = cols.displayPriority >= 0 ? (row[cols.displayPriority] || '') : '';

    // Parse array fields
    const teams = cols.teams >= 0 ? parsePipeSeparated(row[cols.teams]) : [];
    const coeTypeArr = cols.coeType >= 0 ? parsePipeSeparated(row[cols.coeType]) : [];
    const enablementCategoryArr = cols.enablementCategory >= 0 ? parsePipeSeparated(row[cols.enablementCategory]) : [];

    // Proof point fields (new format only)
    const customer = cols.customer >= 0 ? (row[cols.customer] || '') : '';
    const isBlindCustomer = cols.isBlindCustomer >= 0 ? row[cols.isBlindCustomer]?.toLowerCase() === 'true' : false;
    const kpiCategory = cols.kpiCategory >= 0 ? (row[cols.kpiCategory] || '') : '';
    const productTags = cols.productTags >= 0 ? parsePipeSeparated(row[cols.productTags]) : [];
    const channelTag = cols.channelTag >= 0 ? (row[cols.channelTag] || '') : '';
    const approvedForExternal = cols.approvedForExternal >= 0 ? row[cols.approvedForExternal]?.toLowerCase() === 'true' : false;

    // Extract session date from title if present (legacy format)
    let sessionDate = null;
    if (!hasNewFormat) {
      const dateInfo = extractDateFromTitle(title);
      if (dateInfo) {
        sessionDate = dateInfo.sessionDate;
        title = dateInfo.cleanedTitle;
      }
    }

    // Build publishedTo array
    let publishedTo;
    if (hasExportFormat && cols.publishedTo >= 0) {
      publishedTo = parsePublishedTo(row[cols.publishedTo]);
    } else if (hasV2Format && cols.hub >= 0) {
      // v2.0 format uses 'hub' column with single value: Content, CoE, Enablement
      const hub = row[cols.hub] || '';
      publishedTo = mapHub(hub);
    } else {
      const hub = row[cols.hub] || '';
      publishedTo = mapHub(hub);
    }

    // v2.0 format: Map unified 'type' field to appropriate hub-specific category
    if (hasV2Format && cols.type >= 0 && row[cols.type]) {
      const entryType = row[cols.type];
      const hub = (row[cols.hub] || '').toLowerCase();

      // Map type to enablementCategory or coeType based on hub
      if (hub === 'enablement') {
        enablementCategoryArr.push(entryType);
      } else if (hub === 'coe') {
        coeTypeArr.push(entryType);
      }
    }

    // v2.0 format: Parse product (singular) field
    let productNames = [];
    if (hasV2Format && cols.product >= 0 && row[cols.product]) {
      productNames = parsePipeSeparated(row[cols.product]);
    }

    // v2.0 format: Get date from 'date' column if publishDate not present
    let publishDate = cols.publishDate >= 0 ? row[cols.publishDate] : '';
    if (!publishDate && cols.date >= 0) {
      publishDate = row[cols.date] || '';
    }

    // v2.0 format: Get access level
    const access = cols.access >= 0 ? row[cols.access] : '';

    // v2.0 format: Get competitor
    const competitor = cols.competitor >= 0 ? row[cols.competitor] : '';

    // AUTO-ADD BOTH HUBS: If it's video/on-demand content in enablement, also add to content hub
    // This allows videos to appear in both Content Hub collections AND Enablement Hub collections
    if (publishedTo.includes('enablement') && (format === 'video' || format === 'on-demand' || format === 'live-replay')) {
      if (!publishedTo.includes('content')) {
        publishedTo.push('content');
      }
    }

    // Determine slug - v2.0 uses 'id' column as slug
    let slug;
    if (hasV2Format && cols.id >= 0 && row[cols.id]) {
      slug = row[cols.id];
    } else if (hasNewFormat && cols.slug >= 0 && row[cols.slug]) {
      slug = row[cols.slug];
    } else {
      slug = generateSlug(title);
    }

    // Determine status
    const status = hasNewFormat && cols.status >= 0 && row[cols.status]
      ? row[cols.status]
      : 'published';

    // Get internalUrl if present (v2.0 format)
    const internalUrl = cols.internalUrl >= 0 ? row[cols.internalUrl] : '';

    const entry = {
      _type: 'catalogEntry',
      title,
      description: description.substring(0, 500), // Limit description length
      slug: { _type: 'slug', current: slug },
      publishedTo,
      status,
      featured,
      priority,
    };

    // Add format if present
    if (format) entry.format = format;

    // Add display priority if present
    if (displayPriority) entry.displayPriority = displayPriority;

    // Add optional fields
    if (sessionDate) entry.sessionDate = sessionDate;
    if (externalUrl) entry.externalUrl = externalUrl;
    if (videoUrl) entry.videoUrl = videoUrl;
    if (slidesUrl) entry.slidesUrl = slidesUrl;
    if (keyAssetUrl) entry.keyAssetUrl = keyAssetUrl;
    if (keyAssetLabel) entry.keyAssetLabel = keyAssetLabel;
    if (transcriptUrl) entry.transcriptUrl = transcriptUrl;
    if (presenter) entry.presenter = presenter;
    if (duration) entry.duration = duration;
    if (teams.length > 0) entry.teams = teams;

    // Add categories as arrays
    if (enablementCategoryArr.length > 0) {
      entry.enablementCategory = enablementCategoryArr;
    }
    if (coeTypeArr.length > 0) {
      entry.coeType = coeTypeArr;
    }

    // Add proof point fields
    if (customer) entry.customer = customer;
    if (isBlindCustomer) entry.isBlindCustomer = isBlindCustomer;
    if (kpiCategory) entry.kpiCategory = kpiCategory;
    if (productTags.length > 0) entry.productTags = productTags;
    if (channelTag) entry.channelTag = channelTag;
    if (approvedForExternal) entry.approvedForExternal = approvedForExternal;

    // ========================================
    // COLLECTION ASSIGNMENTS
    // ========================================

    // Check if CSV has explicit collection assignments (new format or v2.0 format)
    const hasExplicitCollections =
      (cols.contentHubCollections >= 0 && row[cols.contentHubCollections]) ||
      (cols.enablementHubCollections >= 0 && row[cols.enablementHubCollections]) ||
      (cols.coeHubCollections >= 0 && row[cols.coeHubCollections]) ||
      (cols.curatedHubCollections >= 0 && row[cols.curatedHubCollections]) ||
      (cols.collections >= 0 && row[cols.collections]); // v2.0 unified collections field

    if (hasExplicitCollections) {
      // Parse explicit collection assignments from CSV

      // v2.0 format: single 'collections' column applies to current hub
      if (cols.collections >= 0 && row[cols.collections]) {
        const hub = (row[cols.hub] || '').toLowerCase();
        const assignments = parseCollectionAssignments(row[cols.collections], collectionsByName);
        if (assignments.length > 0) {
          if (hub === 'content') {
            entry.contentHubCollections = assignments;
          } else if (hub === 'enablement') {
            entry.enablementHubCollections = assignments;
          } else if (hub === 'coe') {
            entry.coeHubCollections = assignments;
          } else if (hub === 'curated') {
            entry.curatedHubCollections = assignments;
          }
        }
      }

      // Standard export format: separate columns per hub
      if (cols.contentHubCollections >= 0 && row[cols.contentHubCollections]) {
        const assignments = parseCollectionAssignments(row[cols.contentHubCollections], collectionsByName);
        if (assignments.length > 0) entry.contentHubCollections = assignments;
      }
      if (cols.enablementHubCollections >= 0 && row[cols.enablementHubCollections]) {
        const assignments = parseCollectionAssignments(row[cols.enablementHubCollections], collectionsByName);
        if (assignments.length > 0) entry.enablementHubCollections = assignments;
      }
      if (cols.coeHubCollections >= 0 && row[cols.coeHubCollections]) {
        const assignments = parseCollectionAssignments(row[cols.coeHubCollections], collectionsByName);
        if (assignments.length > 0) entry.coeHubCollections = assignments;
      }
      if (cols.curatedHubCollections >= 0 && row[cols.curatedHubCollections]) {
        const assignments = parseCollectionAssignments(row[cols.curatedHubCollections], collectionsByName);
        if (assignments.length > 0) entry.curatedHubCollections = assignments;
      }
    } else {
      // Fall back to auto-assignment based on categories and teams
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
    } // End of auto-assignment else block

    // Check if exists - use _id if present in CSV (export format), or slug for v2.0, otherwise match by title
    let csvId = cols._id >= 0 ? row[cols._id] : null;

    // v2.0 format: Match existing entry by slug (id column)
    if (!csvId && hasV2Format && slug) {
      // Look up existing entry by slug
      const existingBySlug = existingEntries.find(e => e.slug?.current === slug);
      if (existingBySlug) {
        csvId = existingBySlug._id;
      }
    }

    if (csvId) {
      // Export/v2.0 format: use _id from CSV or matched by slug
      entry._id = csvId;
      toUpdate.push(entry);
    } else {
      // Legacy format: match by title
      const existingKey = title.toLowerCase().trim();
      const existing = existingByTitle[existingKey];

      if (existing) {
        entry._id = existing._id;
        toUpdate.push(entry);
      } else {
        toCreate.push(entry);
      }
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
