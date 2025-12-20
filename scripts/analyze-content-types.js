const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  // Get all content types
  const contentTypes = await client.fetch(`*[_type == "contentType"]{name, "slug": slug.current}`);

  console.log("=== EXISTING CONTENT TYPES ===");
  contentTypes.forEach(ct => console.log("  - " + ct.name + " (" + ct.slug + ")"));

  // Get all catalog entries with their content type
  const entries = await client.fetch(`*[_type == "catalogEntry"]{
    title,
    "contentTypeName": contentType->name,
    hub,
    externalUrl
  } | order(title asc)`);

  console.log("\n=== ANALYSIS: ITEMS THAT MIGHT NEED RECLASSIFICATION ===\n");

  // Find Figma items
  const figmaItems = entries.filter(e =>
    e.title.toLowerCase().includes('figma') ||
    e.title.toLowerCase().includes('prototype') ||
    (e.externalUrl && e.externalUrl.includes('figma.com'))
  );

  console.log("FIGMA/PROTOTYPE ITEMS (" + figmaItems.length + "):");
  figmaItems.forEach(e => {
    console.log("  - " + e.title);
    console.log("    Current type: " + (e.contentTypeName || "NONE"));
    if (e.externalUrl) console.log("    URL: " + e.externalUrl.substring(0, 60) + "...");
  });

  // Find items with specific keywords that suggest content type
  const patterns = [
    { name: "Video", keywords: ["video", "recording"] },
    { name: "Slides/Deck", keywords: ["deck", "slides", "presentation"] },
    { name: "One Pager", keywords: ["one pager", "one-pager", "onepager"] },
    { name: "Template", keywords: ["template"] },
    { name: "Guide", keywords: ["guide", "how to", "howto"] },
    { name: "Dashboard", keywords: ["dashboard"] },
    { name: "Battlecard", keywords: ["battlecard", "battle card"] },
    { name: "Calculator", keywords: ["calculator", "calc"] },
    { name: "Sequence", keywords: ["sequence"] },
    { name: "Checklist", keywords: ["checklist"] },
    { name: "Playbook", keywords: ["playbook", "play"] },
  ];

  console.log("\n=== SUGGESTED RECLASSIFICATIONS ===\n");

  patterns.forEach(pattern => {
    const matches = entries.filter(e => {
      const title = e.title.toLowerCase();
      return pattern.keywords.some(kw => title.includes(kw));
    });

    if (matches.length > 0) {
      console.log(pattern.name.toUpperCase() + " (" + matches.length + " items):");
      matches.slice(0, 10).forEach(e => {
        const currentType = e.contentTypeName || "NONE";
        const needsChange = currentType !== pattern.name;
        console.log("  " + (needsChange ? "→ " : "✓ ") + e.title + " [current: " + currentType + "]");
      });
      if (matches.length > 10) console.log("  ... and " + (matches.length - 10) + " more");
      console.log("");
    }
  });

  // Items with no content type
  const noType = entries.filter(e => !e.contentTypeName);
  console.log("\n=== ITEMS WITH NO CONTENT TYPE (" + noType.length + ") ===");
  noType.slice(0, 30).forEach(e => console.log("  - " + e.title));
  if (noType.length > 30) console.log("  ... and " + (noType.length - 30) + " more");
}

main().catch(console.error);
