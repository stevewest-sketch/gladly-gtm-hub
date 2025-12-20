const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  const catalogCount = await client.fetch(`count(*[_type == "catalogEntry"])`);
  const coeCount = await client.fetch(`count(*[_type == "coeEntry"])`);

  const catalogByHub = await client.fetch(`{
    "enablement": count(*[_type == "catalogEntry" && "enablement" in publishedTo]),
    "content": count(*[_type == "catalogEntry" && "content" in publishedTo])
  }`);

  const catalogByStatus = await client.fetch(`{
    "draft": count(*[_type == "catalogEntry" && status == "draft"]),
    "published": count(*[_type == "catalogEntry" && status == "published"])
  }`);

  const coeByStatus = await client.fetch(`{
    "draft": count(*[_type == "coeEntry" && status == "draft"]),
    "published": count(*[_type == "coeEntry" && status == "published"])
  }`);

  const coeByType = await client.fetch(`{
    "proof-point": count(*[_type == "coeEntry" && entryType == "proof-point"]),
    "meeting-asset": count(*[_type == "coeEntry" && entryType == "meeting-asset"]),
    "tool": count(*[_type == "coeEntry" && entryType == "tool"]),
    "best-practice": count(*[_type == "coeEntry" && entryType == "best-practice"])
  }`);

  console.log("=== SANITY CONTENT SUMMARY ===");
  console.log("");
  console.log("CATALOG ENTRIES: " + catalogCount);
  console.log("  - Enablement Hub: " + catalogByHub.enablement);
  console.log("  - Content Hub: " + catalogByHub.content);
  console.log("  - Draft: " + catalogByStatus.draft);
  console.log("  - Published: " + catalogByStatus.published);
  console.log("");
  console.log("COE ENTRIES: " + coeCount);
  console.log("  - Proof Points: " + coeByType["proof-point"]);
  console.log("  - Meeting Assets: " + coeByType["meeting-asset"]);
  console.log("  - Tools: " + coeByType["tool"]);
  console.log("  - Best Practices: " + coeByType["best-practice"]);
  console.log("  - Draft: " + coeByStatus.draft);
  console.log("  - Published: " + coeByStatus.published);
  console.log("");
  console.log("TOTAL: " + (catalogCount + coeCount) + " entries");
}

main().catch(console.error);
