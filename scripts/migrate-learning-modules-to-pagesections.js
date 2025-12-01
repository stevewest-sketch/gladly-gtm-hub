/**
 * Migration Script: LearningModule Legacy Fields → pageSections
 *
 * This script migrates the legacy rigid structure of learningModule documents
 * to the new flexible pageSections array format.
 *
 * Field Mapping:
 * - videoUrl, videoDuration → video section
 * - keyTakeaways[] → takeaways section
 * - interactiveFlow → process section (decision tree)
 * - examples[] → text sections (accordion-style)
 * - faqs[] → faq section
 * - quickActions (pdfUrl, slackTemplates, relatedLinks) → assets section
 *
 * Usage:
 *   node scripts/migrate-learning-modules-to-pagesections.js --dry-run
 *   node scripts/migrate-learning-modules-to-pagesections.js
 *
 * Options:
 *   --dry-run    Show what would be migrated without making changes
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

// Generate unique keys for Sanity arrays
function generateKey() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Transform legacy fields into pageSections array
 */
function buildPageSections(module) {
  const sections = []

  // 1. VIDEO SECTION - if videoUrl exists
  if (module.videoUrl || module.wistiaId) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'video',
      title: 'Watch the Recording',
      description: module.videoDuration ? `Duration: ${module.videoDuration} minutes` : undefined,
      collapsible: false,
      videoUrl: module.videoUrl || undefined,
      wistiaId: module.wistiaId || undefined,
      sessionMaterials: module.quickActions ? {
        videoUrl: module.videoUrl,
        slidesUrl: undefined, // Could be added if we have this data
        transcriptUrl: undefined,
      } : undefined,
    })
  }

  // 2. KEY TAKEAWAYS SECTION
  if (module.keyTakeaways && module.keyTakeaways.length > 0) {
    // Transform from objects with icon/title/description to simple text items
    const takeawayTexts = module.keyTakeaways.map(kt => {
      if (typeof kt === 'string') return kt
      // Format: "Icon Title: Description" or just "Title: Description"
      const parts = []
      if (kt.icon) parts.push(kt.icon)
      if (kt.title) parts.push(kt.title)
      let text = parts.join(' ')
      if (kt.description) text += `: ${kt.description}`
      return text
    })

    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'takeaways',
      title: 'Key Takeaways',
      collapsible: false,
      takeaways: takeawayTexts,
    })
  }

  // 3. INTERACTIVE FLOW → PROCESS SECTION (decision tree)
  if (module.interactiveFlow && module.interactiveFlow.question) {
    const processSteps = []

    // Add the main question as the first step
    processSteps.push({
      _key: generateKey(),
      heading: 'Decision Point',
      content: module.interactiveFlow.question,
    })

    // Add each path as a step
    if (module.interactiveFlow.paths && module.interactiveFlow.paths.length > 0) {
      module.interactiveFlow.paths.forEach((path, index) => {
        processSteps.push({
          _key: generateKey(),
          heading: path.label || `Option ${index + 1}`,
          content: `${path.route || ''}${path.description ? '\n\n' + path.description : ''}`,
        })
      })
    }

    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'process',
      title: 'Decision Guide',
      description: 'Follow this guide to determine the right path',
      collapsible: true,
      defaultExpanded: true,
      processLayout: 'steps',
      processSteps: processSteps,
    })
  }

  // 4. EXAMPLES → TEXT SECTIONS (collapsible)
  if (module.examples && module.examples.length > 0) {
    // Create a single section with all examples, or individual sections
    // Going with individual collapsible sections for better UX
    module.examples.forEach((example, index) => {
      // Extract plain text from block content
      let contentText = ''
      if (example.content && Array.isArray(example.content)) {
        contentText = example.content
          .filter(block => block._type === 'block')
          .map(block => {
            if (block.children) {
              return block.children.map(child => child.text || '').join('')
            }
            return ''
          })
          .join('\n\n')
      }

      if (example.title || contentText) {
        sections.push({
          _type: 'pageSection',
          _key: generateKey(),
          sectionType: 'text',
          title: example.title || `Example ${index + 1}`,
          collapsible: true,
          defaultExpanded: false,
          textContent: contentText,
        })
      }
    })
  }

  // 5. FAQs SECTION
  if (module.faqs && module.faqs.length > 0) {
    const faqItems = module.faqs.map(faq => {
      // Extract plain text from block content for answer
      let answerText = ''
      if (faq.answer && Array.isArray(faq.answer)) {
        answerText = faq.answer
          .filter(block => block._type === 'block')
          .map(block => {
            if (block.children) {
              return block.children.map(child => child.text || '').join('')
            }
            return ''
          })
          .join('\n\n')
      } else if (typeof faq.answer === 'string') {
        answerText = faq.answer
      }

      return {
        _key: generateKey(),
        question: faq.question,
        answer: answerText,
      }
    })

    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'faq',
      title: 'Frequently Asked Questions',
      collapsible: true,
      defaultExpanded: true,
      faqs: faqItems,
    })
  }

  // 6. QUICK ACTIONS → ASSETS SECTION
  if (module.quickActions) {
    const assetItems = []

    if (module.quickActions.pdfUrl) {
      assetItems.push({
        _key: generateKey(),
        icon: '📄',
        title: 'One-Pager PDF',
        description: 'Download the summary document',
        url: module.quickActions.pdfUrl,
      })
    }

    if (module.quickActions.slackTemplates && module.quickActions.slackTemplates.length > 0) {
      // Store Slack templates as a single asset with description listing them
      assetItems.push({
        _key: generateKey(),
        icon: '💬',
        title: 'Slack Templates',
        description: `${module.quickActions.slackTemplates.length} ready-to-use message templates`,
        url: undefined, // These are copy-paste, not URLs
      })
    }

    if (module.quickActions.relatedLinks && module.quickActions.relatedLinks.length > 0) {
      module.quickActions.relatedLinks.forEach(link => {
        assetItems.push({
          _key: generateKey(),
          icon: '🔗',
          title: link.label || 'Related Resource',
          description: undefined,
          url: link.url,
        })
      })
    }

    if (assetItems.length > 0) {
      sections.push({
        _type: 'pageSection',
        _key: generateKey(),
        sectionType: 'assets',
        title: 'Resources & Downloads',
        collapsible: false,
        assetItems: assetItems,
      })
    }
  }

  return sections
}

async function main() {
  console.log('🚀 Starting LearningModule → pageSections Migration')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE'}`)
  console.log('─'.repeat(60))

  // Step 1: Fetch all learningModule documents
  console.log('\n📦 Fetching learningModule documents...')

  const modules = await client.fetch(`
    *[_type == "learningModule"] | order(_createdAt desc) {
      _id,
      _rev,
      title,
      slug,
      category,
      moduleType,
      description,
      oneLiner,
      videoUrl,
      videoDuration,
      lastUpdated,
      keyTakeaways,
      interactiveFlow,
      examples,
      faqs,
      quickActions,
      productTags,
      isActive,
      // Check if already migrated
      pageSections
    }
  `)

  console.log(`✓ Found ${modules.length} learning modules`)

  if (modules.length === 0) {
    console.log('\n✅ No learning modules to migrate. Exiting.')
    return
  }

  // Step 2: Process each module
  console.log('\n🔄 Converting legacy fields to pageSections...\n')

  const results = {
    success: [],
    skipped: [],
    errors: [],
  }

  for (const module of modules) {
    try {
      // Check if already has pageSections
      if (module.pageSections && module.pageSections.length > 0) {
        console.log(`⏭  Skipping "${module.title}": Already has ${module.pageSections.length} pageSections`)
        results.skipped.push({
          id: module._id,
          title: module.title,
          reason: 'Already migrated',
        })
        continue
      }

      // Check if there's any content to migrate
      const hasLegacyContent =
        module.videoUrl ||
        (module.keyTakeaways && module.keyTakeaways.length > 0) ||
        module.interactiveFlow ||
        (module.examples && module.examples.length > 0) ||
        (module.faqs && module.faqs.length > 0) ||
        module.quickActions

      if (!hasLegacyContent) {
        console.log(`⏭  Skipping "${module.title}": No legacy content to migrate`)
        results.skipped.push({
          id: module._id,
          title: module.title,
          reason: 'No legacy content',
        })
        continue
      }

      // Build the new pageSections array
      const pageSections = buildPageSections(module)

      console.log(`\n📋 "${module.title}"`)
      console.log(`   Legacy fields found:`)
      if (module.videoUrl) console.log(`     ✓ videoUrl`)
      if (module.keyTakeaways?.length) console.log(`     ✓ keyTakeaways (${module.keyTakeaways.length} items)`)
      if (module.interactiveFlow?.question) console.log(`     ✓ interactiveFlow`)
      if (module.examples?.length) console.log(`     ✓ examples (${module.examples.length} items)`)
      if (module.faqs?.length) console.log(`     ✓ faqs (${module.faqs.length} items)`)
      if (module.quickActions) console.log(`     ✓ quickActions`)
      console.log(`   → Creating ${pageSections.length} page sections`)

      // List the sections being created
      pageSections.forEach((section, idx) => {
        const icons = {
          video: '🎬',
          takeaways: '💡',
          process: '📝',
          text: '📄',
          faq: '❓',
          assets: '📦',
        }
        console.log(`      ${idx + 1}. ${icons[section.sectionType] || '📄'} ${section.title}`)
      })

      if (DRY_RUN) {
        console.log(`   ✓ Would update document`)
        results.success.push({ id: module._id, title: module.title, sections: pageSections.length })
      } else {
        // Update the document with the new pageSections
        await client
          .patch(module._id)
          .set({ pageSections: pageSections })
          .commit()

        console.log(`   ✅ Updated successfully`)
        results.success.push({ id: module._id, title: module.title, sections: pageSections.length })
      }

    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`)
      results.errors.push({
        id: module._id,
        title: module.title,
        error: error.message,
      })
    }
  }

  // Step 3: Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Migration Summary')
  console.log('='.repeat(60))
  console.log(`✅ Successfully migrated: ${results.success.length}`)
  console.log(`⏭  Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)

  if (results.success.length > 0) {
    console.log('\n✅ Migrated modules:')
    results.success.forEach(item => {
      console.log(`  - ${item.title} (${item.sections} sections)`)
    })
  }

  if (results.skipped.length > 0) {
    console.log('\n⏭  Skipped entries:')
    results.skipped.forEach(item => {
      console.log(`  - ${item.title}: ${item.reason}`)
    })
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:')
    results.errors.forEach(item => {
      console.log(`  - ${item.title}: ${item.error}`)
    })
  }

  if (DRY_RUN) {
    console.log('\n💡 This was a DRY RUN. No changes were made.')
    console.log('   Run without --dry-run to perform actual migration.')
  } else {
    console.log('\n✨ Migration complete!')
    console.log('\n📝 Next steps:')
    console.log('  1. Review migrated content in Sanity Studio')
    console.log('  2. Verify pageSections render correctly on frontend')
    console.log('  3. Test at http://localhost:3000/learn/[slug]')
    console.log('  4. Once verified, legacy fields can be removed from schema')
  }
}

// Run migration
main()
  .then(() => {
    console.log('\n✅ Script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
