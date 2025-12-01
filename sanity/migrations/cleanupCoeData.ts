import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN || '',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const DRY_RUN = process.argv.includes('--dry-run');
const CONFIRM = process.argv.includes('--confirm');

async function cleanup() {
  console.log('\n');
  console.log('─'.repeat(60));
  console.log('⚠️  CoE Data Cleanup');
  console.log('─'.repeat(60));

  if (!client.config().token) {
    console.log('❌ Missing SANITY_TOKEN environment variable');
    process.exit(1);
  }

  console.log('ℹ️  Finding coeEntry documents...');

  const entries = await client.fetch<string[]>(`*[_type == "coeEntry"]._id`);
  console.log(`ℹ️  Found ${entries.length} coeEntry documents`);

  if (entries.length === 0) {
    console.log('✅ No documents to delete');
    return;
  }

  if (DRY_RUN) {
    console.log('─'.repeat(60));
    console.log('⚠️  DRY RUN - Would delete the following:');
    console.log('─'.repeat(60));

    // Show first 10
    for (let i = 0; i < Math.min(10, entries.length); i++) {
      console.log(`   - ${entries[i]}`);
    }
    if (entries.length > 10) {
      console.log(`   ... and ${entries.length - 10} more`);
    }

    console.log('─'.repeat(60));
    console.log('ℹ️  Run with --confirm to actually delete');
    return;
  }

  if (!CONFIRM) {
    console.log('─'.repeat(60));
    console.log('⚠️  This will permanently delete all coeEntry documents!');
    console.log('─'.repeat(60));
    console.log('ℹ️  Run with --dry-run to preview');
    console.log('ℹ️  Run with --confirm to actually delete');
    return;
  }

  console.log('─'.repeat(60));
  console.log('🗑️  Deleting documents...');
  console.log('─'.repeat(60));

  let deleted = 0;
  let errors = 0;

  for (const id of entries) {
    try {
      await client.delete(id);
      deleted++;
      if (deleted % 10 === 0) {
        console.log(`   Deleted ${deleted}/${entries.length}...`);
      }
    } catch (err: any) {
      console.log(`❌ Failed to delete ${id}: ${err.message}`);
      errors++;
    }
  }

  console.log('─'.repeat(60));
  console.log(`✅ Deleted ${deleted} documents`);
  if (errors > 0) {
    console.log(`❌ ${errors} errors`);
  }
  console.log('\n');
}

cleanup().catch((err) => {
  console.error('❌ Cleanup failed:', err.message);
  process.exit(1);
});
