import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN || '',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const DRY_RUN = process.argv.includes('--dry-run');

// Valid enablementCategory values from schema
// Product, GTM, Strategy, Internal Ops, Competitive, Technical, Partner, Value Realization

// Mapping of entry IDs to their correct enablementCategory
// Based on analyzing titles and descriptions
const CATEGORY_ASSIGNMENTS: Record<string, string[]> = {
  // Sales Process → GTM
  'VLGqHVu3fANOxaDCOdENNc': ['GTM'],

  // DealHub modules → Internal Ops (already correct, just normalizing)
  'dealhub-m1': ['Internal Ops'],
  'dealhub-m2': ['Internal Ops'],
  'dealhub-m3': ['Internal Ops'],
  'dealhub-m4': ['Internal Ops'],
  'dealhub-m5': ['Internal Ops'],
  'drafts.dealhub-m1': ['Internal Ops'],

  // AI Narrative / GTM Strategy → GTM
  'enable-ai-narrative': ['GTM'],
  'drafts.enable-ai-narrative': ['GTM'],
  'enable-standalone-land': ['GTM'],
  'drafts.enable-standalone-land': ['GTM'],

  // First Meeting / Pitch plays → GTM
  'first-meeting-deck-release-20': ['GTM'],
  'drafts.first-meeting-deck-release-20': ['GTM'],

  // White Glove play → GTM
  'white-glove-play-release-1': ['GTM'],
  'drafts.white-glove-play-release-1': ['GTM'],

  // Demo materials → Product
  'standalone-sk-demo-figma': ['Product'],
  'drafts.standalone-sk-demo-figma': ['Product'],
  'enable-gladly-2': ['Product'],
  'enable-voice-demo': ['Product'],

  // Partner enablement → Partner
  'enable-app-loop': ['Partner'],
  'enable-assembled': ['Partner'],
  'enable-simplesat': ['Partner'],
  'unwrap-ai-partnership-enablement': ['Partner'],

  // BVA / ROI → Value Realization
  'enable-bva-calc': ['Value Realization'],
  'enable-bva-sla': ['Value Realization'],
  'enable-roi-calc': ['Value Realization'],

  // Product features → Product
  'enable-email-app': ['Product'],
  'enable-guides-journeys': ['Product'],
  'enable-standalone-sales': ['Product'],
  'enable-voice-ai': ['Product'],
  'enable-voice-ama': ['Product'],
  'sidekick-sales-enablement-1': ['Product'],

  // Sales tactics / GTM activities → GTM
  'enable-selling-high': ['GTM'],
  'enable-standalone-tactical': ['GTM'],
  'enable-tech-buyer': ['GTM'],

  // Internal ops / process → Internal Ops
  'enable-shoptalk': ['Internal Ops'],
  'per-system-training-1': ['Internal Ops'],

  // Technical / integration → Technical
  'enable-zendesk': ['Technical'],

  // Competitive → Competitive
  'flip-competitive-sk-voice-roadmap': ['Competitive'],
};

async function updateCategories() {
  console.log('='.repeat(60));
  console.log('Updating Enablement Categories');
  console.log('='.repeat(60));

  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN MODE - No changes will be made\n');
  }

  if (!client.config().token) {
    console.error('❌ Missing SANITY_TOKEN environment variable');
    process.exit(1);
  }

  // Fetch all enablement entries
  console.log('\n📋 Fetching enablement entries...');
  const entries = await client.fetch(`
    *[_type == "catalogEntry" && "enablement" in publishedTo] {
      _id,
      title,
      enablementCategory,
      description
    }
  `);
  console.log(`   Found ${entries.length} enablement entries\n`);

  let updated = 0;
  let skipped = 0;
  let noMapping = 0;

  for (const entry of entries) {
    const assignment = CATEGORY_ASSIGNMENTS[entry._id];

    if (!assignment) {
      console.log(`   ⚠️  No mapping for: ${entry._id} - "${entry.title}"`);
      noMapping++;
      continue;
    }

    // Check if already correct
    const current = entry.enablementCategory;
    const isCorrect = Array.isArray(current) &&
      current.length === assignment.length &&
      current.every((c: string) => assignment.includes(c));

    if (isCorrect) {
      console.log(`   ✓ Already correct: ${entry.title}`);
      skipped++;
      continue;
    }

    console.log(`   ↻ Updating: ${entry.title}`);
    console.log(`      From: ${JSON.stringify(current)} → To: ${JSON.stringify(assignment)}`);

    if (!DRY_RUN) {
      await client.patch(entry._id).set({
        enablementCategory: assignment,
      }).commit();
    }
    updated++;
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Done!');
  console.log(`   Updated: ${updated}`);
  console.log(`   Already correct: ${skipped}`);
  console.log(`   No mapping: ${noMapping}`);

  if (DRY_RUN) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.');
  }
}

updateCategories().catch((err) => {
  console.error('❌ Script failed:', err.message);
  process.exit(1);
});
