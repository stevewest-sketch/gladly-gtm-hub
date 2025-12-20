const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  // Check a working published entry
  const entry = await client.fetch(`*[_type == "catalogEntry" && title == "First Meeting Pitch Play"][0]`);
  console.log("Working Entry: First Meeting Pitch Play");
  console.log(JSON.stringify(entry, null, 2));
}

main().catch(console.error);
