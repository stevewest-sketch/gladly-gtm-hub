/**
 * Sync Script: Copy mainContent.videoUrl to resourceLinks.videoUrl (Session URL)
 *
 * This script ensures all enablement entries with a videoUrl also have it set
 * as the Session URL in resourceLinks.videoUrl.
 *
 * Usage: npx ts-node scripts/sync-video-to-session-url.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

async function syncVideoToSessionUrl() {
  console.log('Syncing mainContent.videoUrl → resourceLinks.videoUrl\n');

  const hasToken = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;
  if (!hasToken) {
    console.log('⚠️  No SANITY_API_TOKEN found. Running in DRY RUN mode.\n');
  }

  // Find all enablement entries with videoUrl but no session URL
  const entries = await client.fetch(`
    *[_type == "catalogEntry" && "enablement" in publishedTo && defined(mainContent.videoUrl)] {
      _id,
      title,
      "slug": slug.current,
      "videoUrl": mainContent.videoUrl,
      "sessionUrl": resourceLinks.videoUrl
    }
  `);

  console.log(`Found ${entries.length} enablement entries with videoUrl\n`);

  let syncCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const entry of entries) {
    try {
      // Skip if already has matching session URL
      if (entry.sessionUrl === entry.videoUrl) {
        console.log(`⏭️  Skip (already synced): ${entry.slug}`);
        skipCount++;
        continue;
      }

      console.log(`📝 ${entry.title}`);
      console.log(`   Slug: ${entry.slug}`);
      console.log(`   Video URL: ${entry.videoUrl}`);
      console.log(`   Current Session URL: ${entry.sessionUrl || '(none)'}`);

      if (hasToken) {
        await client
          .patch(entry._id)
          .set({
            'resourceLinks.videoUrl': entry.videoUrl,
          })
          .commit();

        console.log(`   ✅ Synced to Session URL\n`);
      } else {
        console.log(`   🔄 Would sync (dry run)\n`);
      }

      syncCount++;
    } catch (error) {
      console.error(`❌ Error processing ${entry.slug}:`, error);
      errorCount++;
    }
  }

  console.log('\n--- Sync Summary ---');
  console.log(`✅ Synced: ${syncCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total: ${entries.length}`);

  if (!hasToken) {
    console.log('\n⚠️  This was a DRY RUN. No changes were made.');
  }
}

syncVideoToSessionUrl().catch(console.error);
