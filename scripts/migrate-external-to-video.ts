/**
 * Migration Script: Move externalUrl to videoUrl for Enablement Articles
 *
 * This script moves Google Drive video links from externalUrl to mainContent.videoUrl
 * for enablement entries, so they display as "Session Video" on article pages.
 *
 * Usage: npx ts-node scripts/migrate-external-to-video.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN, // Required for mutations
});

// Entries to migrate (from the user's table)
const ENTRIES_TO_MIGRATE = [
  { slug: 'customer-ai-narrative', videoUrl: 'https://drive.google.com/file/d/19Olch59OMWAczh4Rn7VbIpXCHDnOTzeP/view' },
  { slug: 'gladly-20-demo-update', videoUrl: 'https://drive.google.com/file/d/1sU3eMBBSqSOfMzS2ob-CDzusTlhb2p12/view' },
  { slug: 'sidekick-for-zendesk', videoUrl: 'https://drive.google.com/file/d/1DrCVPlu_WJK4zmTgk6IDvfTuEMeeanEw/view' },
  { slug: 'bva-sla-live-demo-walkthrough', videoUrl: 'https://drive.google.com/file/d/1Itkk6F2_Xyo697xny_TN99yQM4NscpdV/view' },
  { slug: 'sidekick-standalone-land-grab', videoUrl: 'https://drive.google.com/file/d/1JOAKiN2kjorvZR1AG2f-5Uu3BiXKaeIK/view' },
  { slug: 'technical-buyer-enablement-ciocto', videoUrl: 'https://drive.google.com/file/d/1CBKOYkIrwNT_xFJozXQiGKNNLULBrsCG/view' },
  { slug: 'dealhub-module-1-dealhub-101', videoUrl: 'https://drive.google.com/file/d/1r55AH8fD5ECdPrDF0O6vQuO1dywFbSe9/view' },
  { slug: 'dealhub-module-2-simple-quote-generation', videoUrl: 'https://drive.google.com/file/d/1VBXMHfoBXvjQWyg5ZvjCAimaazLemOM_/view' },
  { slug: 'dealhub-module-3-advanced-quoting', videoUrl: 'https://drive.google.com/file/d/1oVEM3Jjq7YMQHeW2HvEObjjfLYOt2lip/view' },
  { slug: 'dealhub-module-4-approvals-dealtalk', videoUrl: 'https://drive.google.com/file/d/1nbHeiZr4OzJQN6aF1IWbwPG34jnyQvII/view' },
  { slug: 'dealhub-module-5-publishing-execution', videoUrl: 'https://drive.google.com/file/d/1kEgBI_O8-rM8B4zgvilrQYajA9Chvv0v/view' },
  { slug: 'introducing-new-product-enhancement-request-system', videoUrl: 'https://drive.google.com/file/d/1wEsHQlMW3b0sClpahv2Wv0YomqCjFk7r/view' },
];

async function migrateExternalToVideo() {
  console.log('Starting migration: externalUrl → videoUrl\n');

  const hasToken = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;
  if (!hasToken) {
    console.log('⚠️  No SANITY_API_TOKEN found. Running in DRY RUN mode.\n');
    console.log('To execute the migration, ensure .env.local has SANITY_API_TOKEN\n');
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const entry of ENTRIES_TO_MIGRATE) {
    try {
      // Find the document by slug
      const doc = await client.fetch(
        `*[_type == "catalogEntry" && slug.current == $slug][0] { _id, title, externalUrl, "currentVideoUrl": mainContent.videoUrl }`,
        { slug: entry.slug }
      );

      if (!doc) {
        console.log(`❌ Not found: ${entry.slug}`);
        errorCount++;
        continue;
      }

      // Check if already has videoUrl
      if (doc.currentVideoUrl) {
        console.log(`⏭️  Skip (already has videoUrl): ${entry.slug}`);
        skipCount++;
        continue;
      }

      console.log(`📝 ${doc.title}`);
      console.log(`   Slug: ${entry.slug}`);
      console.log(`   Video URL: ${entry.videoUrl}`);

      // Execute mutation if token is available
      if (hasToken) {
        await client
          .patch(doc._id)
          .set({
            'mainContent.videoUrl': entry.videoUrl,
          })
          .unset(['externalUrl'])
          .commit();

        console.log(`   ✅ Migrated successfully\n`);
      } else {
        console.log(`   🔄 Would migrate (dry run)\n`);
      }

      successCount++;
    } catch (error) {
      console.error(`❌ Error processing ${entry.slug}:`, error);
      errorCount++;
    }
  }

  console.log('\n--- Migration Summary ---');
  console.log(`✅ Migrated: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total: ${ENTRIES_TO_MIGRATE.length}`);

  if (!hasToken) {
    console.log('\n⚠️  This was a DRY RUN. No changes were made.');
    console.log('Ensure SANITY_API_TOKEN is set in .env.local');
  }
}

// Also create a script to find ALL entries with externalUrl that should be migrated
async function findAllExternalUrls() {
  console.log('\n--- All Enablement Entries with externalUrl ---\n');

  const entries = await client.fetch(`
    *[_type == "catalogEntry" && defined(externalUrl) && "enablement" in publishedTo] | order(title asc) {
      "slug": slug.current,
      title,
      externalUrl,
      "hasVideoUrl": defined(mainContent.videoUrl)
    }
  `);

  if (entries.length === 0) {
    console.log('No enablement entries found with externalUrl');
    return;
  }

  console.log('These entries have externalUrl and are in Enablement Hub:\n');
  for (const entry of entries) {
    const status = entry.hasVideoUrl ? '(has videoUrl)' : '(needs migration)';
    console.log(`${entry.slug}: ${status}`);
    console.log(`  Title: ${entry.title}`);
    console.log(`  External URL: ${entry.externalUrl}\n`);
  }

  console.log(`Total: ${entries.length} entries`);
}

async function main() {
  await findAllExternalUrls();
  await migrateExternalToVideo();
}

main().catch(console.error);
