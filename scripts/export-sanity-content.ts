import { createClient } from 'next-sanity'

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function exportContent() {
  // Get all catalog entries
  const catalogEntries = await client.fetch(`*[_type == "catalogEntry"]{
    _id,
    title,
    "slug": slug.current,
    publishedTo,
    status,
    externalUrl,
    "resourceLinks": resourceLinks {
      videoUrl,
      slidesUrl,
      transcriptUrl,
      keyAssetUrl
    },
    "hasPageSections": count(pageSections) > 0,
    "pageSectionCount": count(pageSections),
    enablementCategory,
    "contentType": contentType->name,
    publishDate
  } | order(title asc)`)

  // Get all CoE entries
  const coeEntries = await client.fetch(`*[_type == "coeEntry"]{
    _id,
    title,
    "slug": slug.current,
    entryType,
    externalUrl,
    status,
    publishDate
  } | order(title asc)`)

  console.log("=== CATALOG ENTRIES IN SANITY ===")
  console.log("Total: " + catalogEntries.length)
  console.log("")

  const enablementEntries = catalogEntries.filter((e: any) => e.publishedTo?.includes('enablement'))
  const contentEntries = catalogEntries.filter((e: any) => e.publishedTo?.includes('content'))

  console.log("Enablement Hub: " + enablementEntries.length)
  console.log("Content Hub: " + contentEntries.length)
  console.log("")

  console.log("--- ENABLEMENT ENTRIES IN SANITY ---")
  enablementEntries.forEach((e: any) => {
    const hasVideo = e.resourceLinks?.videoUrl ? '🎬' : ''
    const hasSlides = e.resourceLinks?.slidesUrl ? '📊' : ''
    const hasSections = e.hasPageSections ? "(" + e.pageSectionCount + " sections)" : '(no sections)'
    const statusIcon = e.status === 'published' ? '✅' : '📝'
    console.log(statusIcon + " " + e.title)
    console.log("   " + hasVideo + hasSlides + " " + hasSections)
    if (e.resourceLinks?.videoUrl) {
      console.log("   Video: " + e.resourceLinks.videoUrl.substring(0, 60) + "...")
    }
    if (e.externalUrl) {
      console.log("   External: " + e.externalUrl.substring(0, 60) + "...")
    }
    console.log("")
  })

  console.log("")
  console.log("--- CONTENT HUB ENTRIES IN SANITY (first 30) ---")
  contentEntries.slice(0, 30).forEach((e: any) => {
    const statusIcon = e.status === 'published' ? '✅' : '📝'
    console.log(statusIcon + " " + e.title)
    if (e.externalUrl) {
      console.log("   → " + e.externalUrl.substring(0, 70) + "...")
    }
  })
  if (contentEntries.length > 30) {
    console.log("   ... and " + (contentEntries.length - 30) + " more")
  }

  console.log("")
  console.log("=== COE ENTRIES IN SANITY ===")
  console.log("Total: " + coeEntries.length)
  const coeByType: Record<string, number> = {}
  coeEntries.forEach((e: any) => {
    coeByType[e.entryType] = (coeByType[e.entryType] || 0) + 1
  })
  Object.entries(coeByType).forEach(([type, count]) => {
    console.log("  " + type + ": " + count)
  })

  console.log("")
  console.log("--- COE ENTRIES LIST ---")
  coeEntries.forEach((e: any) => {
    console.log("[" + e.entryType + "] " + e.title)
  })
}

exportContent().catch(console.error)
