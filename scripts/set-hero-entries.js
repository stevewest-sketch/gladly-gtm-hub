/**
 * Set hero entries for Content Hub Essentials tab
 * Run with: node scripts/set-hero-entries.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function setHeroEntries() {
  console.log('🔍 Finding entries to set as hero entries...\n');

  try {
    // Fetch all catalog entries for content hub
    const entries = await client.fetch(
      `*[_type == "catalogEntry" && status == "published" && "content" in publishedTo] | order(publishDate desc) {
        _id,
        title,
        description,
        displayPriority,
        featured,
        format,
        contentType->{name}
      }[0...10]`
    );

    console.log(`Found ${entries.length} published content entries\n`);

    // Show current hero entries
    const currentHeroEntries = entries.filter(e => e.displayPriority === 'hero');
    console.log(`Current hero entries: ${currentHeroEntries.length}\n`);

    if (currentHeroEntries.length >= 2) {
      console.log('✅ Already have 2+ hero entries:');
      currentHeroEntries.forEach(e => {
        console.log(`   - ${e.title}`);
      });
      console.log('\nNo changes needed.');
      return;
    }

    // Set first 2 entries as hero if we don't have enough
    console.log('Setting first 2 recent entries as hero entries...\n');

    const entriesToUpdate = entries.slice(0, 2);

    for (let i = 0; i < entriesToUpdate.length; i++) {
      const entry = entriesToUpdate[i];

      console.log(`${i + 1}. "${entry.title}"`);
      console.log(`   Current: displayPriority=${entry.displayPriority || 'null'}, featured=${entry.featured || false}`);

      await client
        .patch(entry._id)
        .set({
          displayPriority: 'hero',
          featured: i === 0 // First one is "What's New"
        })
        .commit();

      console.log(`   Updated: displayPriority=hero, featured=${i === 0}`);
      console.log('');
    }

    // Set next 6 as featured (for "Your Go-To Assets" section)
    console.log('\nSetting next 6 entries as featured...\n');
    const featuredEntries = entries.slice(2, 8);

    for (const entry of featuredEntries) {
      await client
        .patch(entry._id)
        .set({
          displayPriority: 'featured',
          featured: true
        })
        .commit();

      console.log(`   ✅ "${entry.title}" → featured`);
    }

    console.log('\n✨ Hero entries set successfully!');
    console.log('   • 2 hero entries (for hero cards)');
    console.log('   • 6 featured entries (for Your Go-To Assets)');

  } catch (error) {
    console.error('\n❌ Error setting hero entries:', error.message);
    process.exit(1);
  }
}

// Run the function
setHeroEntries();
