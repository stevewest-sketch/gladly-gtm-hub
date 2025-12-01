/**
 * Migration Script: CatalogEntry Legacy Fields → pageSections
 *
 * Migrates catalogEntry documents with legacy content (keyTakeaways, contentBlocks,
 * articleSections) to the new flexible pageSections format.
 *
 * Usage:
 *   node scripts/migrate-catalog-to-pagesections.js --dry-run
 *   node scripts/migrate-catalog-to-pagesections.js
 *   node scripts/migrate-catalog-to-pagesections.js --slug=per-system-training  # Single doc
 */

const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const DRY_RUN = process.argv.includes('--dry-run')
const SINGLE_SLUG = process.argv.find(arg => arg.startsWith('--slug='))?.split('=')[1]

function generateKey() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Transform legacy fields into pageSections array
 */
function buildPageSections(entry) {
  const sections = []

  // 1. VIDEO SECTION - from mainContent
  if (entry.mainContent?.videoUrl || entry.mainContent?.wistiaId || entry.resourceLinks?.videoUrl) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'video',
      title: 'Watch the Recording',
      collapsible: false,
      videoUrl: entry.mainContent?.videoUrl || entry.resourceLinks?.videoUrl,
      wistiaId: entry.mainContent?.wistiaId,
      sessionMaterials: {
        videoUrl: entry.resourceLinks?.videoUrl,
        slidesUrl: entry.resourceLinks?.slidesUrl,
        transcriptUrl: entry.resourceLinks?.transcriptUrl,
      },
    })
  }

  // 2. KEY TAKEAWAYS
  if (entry.keyTakeaways && entry.keyTakeaways.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'takeaways',
      title: 'Key Takeaways',
      collapsible: false,
      takeaways: entry.keyTakeaways.map(t => typeof t === 'string' ? t : t),
    })
  }

  // 3. CONTENT BLOCKS - varies by blockType
  if (entry.contentBlocks && entry.contentBlocks.length > 0) {
    for (const block of entry.contentBlocks) {
      switch (block.blockType) {
        case 'text':
          sections.push({
            _type: 'pageSection',
            _key: generateKey(),
            sectionType: 'text',
            title: block.title || 'Content',
            collapsible: block.collapsible || false,
            defaultExpanded: true,
            textContent: block.content,
          })
          break

        case 'steps':
          if (block.steps && block.steps.length > 0) {
            sections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'process',
              title: block.title || 'Process Steps',
              collapsible: block.collapsible || false,
              defaultExpanded: true,
              processLayout: 'steps',
              processSteps: block.steps.map(step => ({
                _key: generateKey(),
                heading: step.stepTitle,
                content: step.stepDescription,
              })),
            })
          }
          break

        case 'faq':
          if (block.faqs && block.faqs.length > 0) {
            sections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'faq',
              title: block.title || 'Frequently Asked Questions',
              collapsible: block.collapsible || false,
              defaultExpanded: true,
              faqs: block.faqs.map(faq => ({
                _key: generateKey(),
                question: faq.question,
                answer: faq.answer,
              })),
            })
          }
          break

        default:
          // Generic text block
          if (block.content) {
            sections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'text',
              title: block.title || 'Content',
              collapsible: block.collapsible || false,
              defaultExpanded: true,
              textContent: block.content,
            })
          }
      }
    }
  }

  // 4. ARTICLE SECTIONS → Process/Text sections
  if (entry.articleSections && entry.articleSections.length > 0) {
    // Check if these look like numbered steps
    const looksLikeSteps = entry.articleSections.length >= 3 &&
      entry.articleSections.every(s => s.heading && s.content)

    if (looksLikeSteps) {
      sections.push({
        _type: 'pageSection',
        _key: generateKey(),
        sectionType: 'process',
        title: 'How It Works',
        collapsible: false,
        defaultExpanded: true,
        processLayout: 'steps',
        processSteps: entry.articleSections.map(section => ({
          _key: generateKey(),
          heading: section.heading,
          content: section.content,
        })),
      })
    } else {
      // Create individual text sections
      for (const section of entry.articleSections) {
        sections.push({
          _type: 'pageSection',
          _key: generateKey(),
          sectionType: 'text',
          title: section.heading || 'Section',
          collapsible: true,
          defaultExpanded: false,
          textContent: section.content,
        })
      }
    }
  }

  // 5. ACTION ITEMS → Tips section
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

  // 6. ADDITIONAL RESOURCES → Assets section
  if (entry.mainContent?.additionalResources && entry.mainContent.additionalResources.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'assets',
      title: 'Resources & Downloads',
      collapsible: false,
      assetItems: entry.mainContent.additionalResources.map(res => ({
        _key: generateKey(),
        icon: res.type === 'video' ? '🎬' : res.type === 'download' ? '📥' : '🔗',
        title: res.title,
        description: '',
        url: res.url,
      })),
    })
  }

  return sections
}

async function main() {
  console.log('🚀 Starting CatalogEntry → pageSections Migration')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE'}`)
  if (SINGLE_SLUG) console.log(`Target: Single document with slug "${SINGLE_SLUG}"`)
  console.log('─'.repeat(60))

  // Build query
  let queryFilter = `_type == "catalogEntry"`
  if (SINGLE_SLUG) {
    queryFilter += ` && slug.current == "${SINGLE_SLUG}"`
  }

  const entries = await client.fetch(`
    *[${queryFilter}] | order(_createdAt desc) {
      _id,
      title,
      slug,
      pageTemplate,
      mainContent {
        videoUrl,
        wistiaId,
        additionalResources
      },
      resourceLinks,
      keyTakeaways,
      contentBlocks,
      articleSections,
      actionItems,
      pageSections
    }
  `)

  console.log(`✓ Found ${entries.length} catalog entries`)

  const results = { success: [], skipped: [], errors: [] }

  for (const entry of entries) {
    try {
      // Skip if already has pageSections
      if (entry.pageSections && entry.pageSections.length > 0) {
        console.log(`⏭  Skipping "${entry.title}": Already has ${entry.pageSections.length} pageSections`)
        results.skipped.push({ id: entry._id, title: entry.title, reason: 'Already migrated' })
        continue
      }

      // Check for legacy content
      const hasLegacy =
        entry.mainContent?.videoUrl ||
        entry.mainContent?.wistiaId ||
        entry.resourceLinks?.videoUrl ||
        (entry.keyTakeaways && entry.keyTakeaways.length > 0) ||
        (entry.contentBlocks && entry.contentBlocks.length > 0) ||
        (entry.articleSections && entry.articleSections.length > 0) ||
        (entry.actionItems && entry.actionItems.length > 0)

      if (!hasLegacy) {
        console.log(`⏭  Skipping "${entry.title}": No legacy content`)
        results.skipped.push({ id: entry._id, title: entry.title, reason: 'No legacy content' })
        continue
      }

      const pageSections = buildPageSections(entry)

      console.log(`\n📋 "${entry.title}"`)
      console.log(`   Legacy fields found:`)
      if (entry.mainContent?.videoUrl || entry.mainContent?.wistiaId) console.log(`     ✓ video`)
      if (entry.keyTakeaways?.length) console.log(`     ✓ keyTakeaways (${entry.keyTakeaways.length})`)
      if (entry.contentBlocks?.length) console.log(`     ✓ contentBlocks (${entry.contentBlocks.length})`)
      if (entry.articleSections?.length) console.log(`     ✓ articleSections (${entry.articleSections.length})`)
      if (entry.actionItems?.length) console.log(`     ✓ actionItems (${entry.actionItems.length})`)
      console.log(`   → Creating ${pageSections.length} page sections`)

      pageSections.forEach((section, idx) => {
        const icons = { video: '🎬', takeaways: '💡', process: '📝', text: '📄', faq: '❓', assets: '📦', tips: '⚠️' }
        console.log(`      ${idx + 1}. ${icons[section.sectionType] || '📄'} ${section.title}`)
      })

      if (DRY_RUN) {
        console.log(`   ✓ Would update document`)
        results.success.push({ id: entry._id, title: entry.title, sections: pageSections.length })
      } else {
        await client.patch(entry._id).set({ pageSections }).commit()
        console.log(`   ✅ Updated successfully`)
        results.success.push({ id: entry._id, title: entry.title, sections: pageSections.length })
      }

    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`)
      results.errors.push({ id: entry._id, title: entry.title, error: error.message })
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Migration Summary')
  console.log('='.repeat(60))
  console.log(`✅ Successfully migrated: ${results.success.length}`)
  console.log(`⏭  Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)

  if (DRY_RUN) {
    console.log('\n💡 This was a DRY RUN. Run without --dry-run to apply changes.')
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
