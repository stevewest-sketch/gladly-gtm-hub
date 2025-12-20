const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Parse date from title like "6/12/25 Enablement: Title" or "12/10/25 Enablement: Title" or "7/3/2025 Enablement: Title"
function extractDateFromTitle(title) {
  // Match M/D/YY or M/D/YYYY at start of title
  const dateMatch = title.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s*/);
  if (!dateMatch) return null;

  const [fullMatch, month, day, year] = dateMatch;
  // Convert 2-digit year to 4-digit (assume 20xx for years 00-99)
  const fullYear = year.length === 4 ? parseInt(year, 10) : 2000 + parseInt(year, 10);

  // Create ISO date string (YYYY-MM-DD)
  const isoDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  // Get cleaned title (remove date prefix and any leading colon/space)
  let cleanedTitle = title.replace(/^\d{1,2}\/\d{1,2}\/\d{2,4}\s*/, '').trim();
  // Remove leading colon if present (e.g., ": Enablement:" -> "Enablement:")
  cleanedTitle = cleanedTitle.replace(/^:\s*/, '');

  return {
    sessionDate: isoDate,
    cleanedTitle,
    originalDateStr: fullMatch.trim()
  };
}

async function updateSessionDates() {
  // Fetch all catalogEntry documents with live-replay or on-demand format
  const entries = await client.fetch(`*[_type == "catalogEntry" && (format == "live-replay" || format == "on-demand")]{
    _id,
    title,
    format,
    sessionDate
  }`);

  console.log(`Found ${entries.length} live-replay/on-demand entries\n`);

  // Also find entries that might have dates in titles regardless of format
  const allEntries = await client.fetch(`*[_type == "catalogEntry"]{
    _id,
    title,
    format,
    sessionDate,
    publishedTo
  }`);

  // Find entries with dates in titles
  const entriesWithDates = allEntries.filter(e => {
    const dateInfo = extractDateFromTitle(e.title || '');
    return dateInfo !== null;
  });

  console.log(`Found ${entriesWithDates.length} entries with dates in titles\n`);

  if (entriesWithDates.length === 0) {
    console.log('No entries with date prefixes found.');
    return;
  }

  // Preview changes
  console.log('=== PREVIEW OF CHANGES ===\n');

  for (const entry of entriesWithDates) {
    const dateInfo = extractDateFromTitle(entry.title);
    if (dateInfo) {
      console.log(`ID: ${entry._id}`);
      console.log(`  Current title: "${entry.title}"`);
      console.log(`  New title:     "${dateInfo.cleanedTitle}"`);
      console.log(`  Session date:  ${dateInfo.sessionDate}`);
      console.log(`  Current sessionDate: ${entry.sessionDate || '(none)'}`);
      console.log(`  Format: ${entry.format || '(none)'}`);
      console.log('');
    }
  }

  if (process.argv.includes('--apply')) {
    console.log('\n=== APPLYING CHANGES ===\n');

    let updated = 0;
    let errors = 0;

    for (const entry of entriesWithDates) {
      const dateInfo = extractDateFromTitle(entry.title);
      if (!dateInfo) continue;

      try {
        // Update the entry: set sessionDate, cleaned title, and ensure format is live-replay
        const patch = client.patch(entry._id);

        // Set sessionDate
        patch.set({ sessionDate: dateInfo.sessionDate });

        // Clean up title (remove date prefix)
        patch.set({ title: dateInfo.cleanedTitle });

        // If no format is set, default to live-replay since these are dated sessions
        if (!entry.format) {
          patch.set({ format: 'live-replay' });
        }

        await patch.commit();

        console.log(`UPDATED: "${entry.title}" -> "${dateInfo.cleanedTitle}" (${dateInfo.sessionDate})`);
        updated++;
      } catch (err) {
        console.log(`ERROR: ${entry.title} - ${err.message.substring(0, 60)}`);
        errors++;
      }
    }

    console.log('\n=== COMPLETE ===');
    console.log(`Updated: ${updated}`);
    console.log(`Errors: ${errors}`);
  } else {
    console.log('Run with --apply to make these changes');
  }
}

// Test the date extraction function
console.log('Testing date extraction:');
const testTitles = [
  '6/12/25 Enablement: Selling High + FM Deck',
  '12/10/25 Enablement:Partnerships Barrel',
  '7/17/25 Enablement: BVA SLA + Live Demo Walkthrough',
  '7/3/2025 Enablement: July All Hands',
  '4/17/25: Enablement: Sidekick for Voice',
  'Regular Title Without Date'
];

for (const title of testTitles) {
  const result = extractDateFromTitle(title);
  if (result) {
    console.log(`  "${title}"`);
    console.log(`    -> Date: ${result.sessionDate}, Title: "${result.cleanedTitle}"`);
  } else {
    console.log(`  "${title}" -> No date found`);
  }
}
console.log('\n');

updateSessionDates().catch(console.error);
