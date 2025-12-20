const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  // Check a specific entry
  const entry = await client.fetch(`*[_type == "catalogEntry" && title == "Selling High + FM Deck"][0]`);
  console.log("Entry: Selling High + FM Deck");
  console.log(JSON.stringify(entry, null, 2));
}

main().catch(console.error);
