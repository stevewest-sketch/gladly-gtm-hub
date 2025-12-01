const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function generateKey() {
  return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9)
}

// Parse "Label — Content" format into overviewCards
function parseOverviewContent(content) {
  const lines = content.split('\n').filter(l => l.trim())
  const cards = []

  for (const line of lines) {
    const match = line.match(/^(.+?)\s*—\s*(.+)$/)
    if (match) {
      cards.push({
        _key: generateKey(),
        label: match[1].trim(),
        content: match[2].trim()
      })
    }
  }
  return cards
}

async function migrate() {
  const entry = await client.fetch(`
    *[_type == "catalogEntry" && slug.current == "per-system-training"][0] {
      _id,
      contentBlocks,
      keyTakeaways,
      articleSections,
      actionItems,
      mainContent,
      resourceLinks
    }
  `)

  const sections = []

  // 1. VIDEO
  if (entry.mainContent?.videoUrl || entry.resourceLinks?.videoUrl) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'video',
      title: 'Watch the Recording',
      collapsible: false,
      videoUrl: entry.mainContent?.videoUrl || entry.resourceLinks?.videoUrl,
      sessionMaterials: entry.resourceLinks ? {
        videoUrl: entry.resourceLinks.videoUrl,
        slidesUrl: entry.resourceLinks.slidesUrl,
        transcriptUrl: entry.resourceLinks.transcriptUrl,
      } : undefined,
    })
  }

  // 2. Process contentBlocks
  for (const block of (entry.contentBlocks || [])) {
    // OVERVIEW → overview section with cards
    if (block.title === 'Overview' || block._key === 'overview1') {
      const cards = parseOverviewContent(block.content)
      if (cards.length > 0) {
        sections.push({
          _type: 'pageSection',
          _key: generateKey(),
          sectionType: 'overview',
          title: 'Quick Overview',
          collapsible: true,
          defaultExpanded: true,
          overviewCards: cards,
        })
      }
      continue
    }

    // FAQ blocks
    if (block.blockType === 'faq' && block.faqs) {
      sections.push({
        _type: 'pageSection',
        _key: generateKey(),
        sectionType: 'faq',
        title: block.title || 'Frequently Asked Questions',
        collapsible: true,
        defaultExpanded: true,
        faqs: block.faqs.map(f => ({
          _key: generateKey(),
          question: f.question,
          answer: f.answer,
        })),
      })
      continue
    }

    // Blocks with cards → overview cards
    if (block.cards && block.cards.length > 0) {
      sections.push({
        _type: 'pageSection',
        _key: generateKey(),
        sectionType: 'overview',
        title: block.title,
        description: block.content,
        collapsible: true,
        defaultExpanded: true,
        overviewCards: block.cards.map(c => ({
          _key: generateKey(),
          label: c.title,
          content: c.description,
        })),
      })
      continue
    }

    // Regular text blocks (skip if title is "Action Items" - we handle that separately)
    if (block.content && block.title !== 'Action Items') {
      sections.push({
        _type: 'pageSection',
        _key: generateKey(),
        sectionType: 'text',
        title: block.title || 'Content',
        collapsible: true,
        defaultExpanded: true,
        textContent: block.content + (block.callout ? '\n\n> ' + block.callout : ''),
      })
    }
  }

  // 3. KEY TAKEAWAYS
  if (entry.keyTakeaways && entry.keyTakeaways.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'takeaways',
      title: 'Key Takeaways',
      collapsible: false,
      takeaways: entry.keyTakeaways,
    })
  }

  // 4. ARTICLE SECTIONS as process steps
  if (entry.articleSections && entry.articleSections.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'process',
      title: 'Step-by-Step Guide',
      collapsible: true,
      defaultExpanded: true,
      processLayout: 'steps',
      processSteps: entry.articleSections.map(s => ({
        _key: generateKey(),
        heading: s.heading,
        content: s.content,
      })),
    })
  }

  // 5. ACTION ITEMS as tips (from the actionItems field, not contentBlocks)
  if (entry.actionItems && entry.actionItems.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'tips',
      title: 'Action Items',
      collapsible: false,
      tips: entry.actionItems,
    })
  }

  console.log('Creating sections:')
  sections.forEach((s, i) => {
    const icons = { video: '🎬', overview: '📋', takeaways: '💡', process: '📝', text: '📄', faq: '❓', tips: '⚠️' }
    console.log('  ' + (i+1) + '. ' + (icons[s.sectionType] || '📄') + ' ' + s.title)
  })

  // Update the document
  await client.patch(entry._id).set({ pageSections: sections }).commit()
  console.log('\n✅ Updated successfully!')
}

migrate().catch(e => { console.error(e); process.exit(1) })
