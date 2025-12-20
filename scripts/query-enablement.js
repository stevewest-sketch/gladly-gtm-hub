const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  const entries = await client.fetch(`*[_type == "catalogEntry" && "enablement" in publishedTo]{
    title,
    "slug": slug.current,
    "videoUrl": resourceLinks.videoUrl,
    "slidesUrl": resourceLinks.slidesUrl,
    "sectionCount": count(pageSections),
    status
  } | order(title asc)`);

  console.log("ENABLEMENT ENTRIES IN SANITY:");
  console.log("Total: " + entries.length);
  console.log("");

  entries.forEach(function(e) {
    var video = e.videoUrl ? "HAS VIDEO" : "";
    var slides = e.slidesUrl ? "HAS SLIDES" : "";
    var sections = e.sectionCount > 0 ? "(" + e.sectionCount + " sections)" : "(no sections)";
    var status = e.status === 'published' ? '[PUBLISHED]' : '[DRAFT]';
    console.log(status + " " + e.title);
    console.log("   " + sections + " " + video + " " + slides);
    if (e.videoUrl) console.log("   VIDEO: " + e.videoUrl);
  });

  console.log("");
  console.log("SUMMARY:");
  console.log("  With video URL: " + entries.filter(function(e) { return e.videoUrl; }).length);
  console.log("  With pageSections: " + entries.filter(function(e) { return e.sectionCount > 0; }).length);
  console.log("  Published: " + entries.filter(function(e) { return e.status === 'published'; }).length);
}

main().catch(console.error);
