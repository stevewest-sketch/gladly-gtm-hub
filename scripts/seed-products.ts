import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN || '',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const DRY_RUN = process.argv.includes('--dry-run');

// The official product list
const PRODUCTS = [
  {
    name: 'Gladly (fka Sidekick)',
    slug: 'gladly',
    color: '#FF9500', // Orange
    order: 1,
  },
  {
    name: 'Gladly Team (fka Hero)',
    slug: 'gladly-team',
    color: '#3B82F6', // Blue
    order: 2,
  },
  {
    name: 'Guides',
    slug: 'guides',
    color: '#10B981', // Green
    order: 3,
  },
  {
    name: 'Journeys',
    slug: 'journeys',
    color: '#8B5CF6', // Purple
    order: 4,
  },
  {
    name: 'App Platform',
    slug: 'app-platform',
    color: '#EC4899', // Pink
    order: 5,
  },
  {
    name: 'Co-Pilot',
    slug: 'co-pilot',
    color: '#06B6D4', // Cyan
    order: 6,
  },
];

async function seedProducts() {
  console.log('='.repeat(60));
  console.log('Seeding Products');
  console.log('='.repeat(60));

  if (DRY_RUN) {
    console.log('⚠️  DRY RUN MODE - No changes will be made\n');
  }

  if (!client.config().token) {
    console.error('❌ Missing SANITY_TOKEN environment variable');
    process.exit(1);
  }

  // Fetch existing products
  console.log('\n📋 Fetching existing products...');
  const existingProducts = await client.fetch(`*[_type == "product"]{ _id, name, slug }`);
  console.log(`   Found ${existingProducts.length} existing products`);

  const existingBySlug = new Map<string, any>(
    existingProducts
      .filter((p: any) => p.slug?.current)
      .map((p: any) => [p.slug.current, p])
  );

  let created = 0;
  let updated = 0;

  // Create or update products
  console.log('\n✨ Processing products...');
  for (const product of PRODUCTS) {
    const existing = existingBySlug.get(product.slug) as any;

    if (existing) {
      // Update existing product
      console.log(`   ↻ Updating: ${product.name}`);
      if (!DRY_RUN) {
        await client.patch(existing._id as string).set({
          name: product.name,
          color: product.color,
          order: product.order,
        }).commit();
      }
      updated++;
    } else {
      // Create new product
      console.log(`   + Creating: ${product.name}`);
      if (!DRY_RUN) {
        await client.create({
          _type: 'product',
          name: product.name,
          slug: { _type: 'slug', current: product.slug },
          color: product.color,
          order: product.order,
        });
      }
      created++;
    }
  }

  // Try to delete products not in the list (ones without references)
  console.log('\n🗑️  Cleaning up old products...');
  const validSlugs = new Set(PRODUCTS.map(p => p.slug));
  let deleted = 0;
  let skipped = 0;

  for (const product of existingProducts) {
    const slug = product.slug?.current;
    if (!slug || validSlugs.has(slug)) continue;

    console.log(`   - Attempting to delete: ${product.name || product._id}`);
    if (!DRY_RUN) {
      try {
        await client.delete(product._id);
        deleted++;
      } catch (err: any) {
        if (err.message?.includes('references')) {
          console.log(`     ⚠️  Skipped (has references)`);
          skipped++;
        } else {
          throw err;
        }
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Done!`);
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Deleted: ${deleted}`);
  console.log(`   Skipped: ${skipped} (have references)`);
  console.log('\nFinal product list:');
  PRODUCTS.forEach((p, i) => console.log(`   ${i + 1}. ${p.name}`));

  if (DRY_RUN) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.');
  }
}

seedProducts().catch((err) => {
  console.error('❌ Script failed:', err.message);
  process.exit(1);
});
