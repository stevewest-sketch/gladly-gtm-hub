/**
 * Migration Script: CatalogEntry Legacy Fields → pageSections
 *
 * Transforms legacy content fields (keyTakeaways, articleSections, actionItems, contentBlocks)
 * into the new flexible pageSections array format.
 *
 * Usage:
 *   npx ts-node sanity/migrations/catalogEntryToPageSections.ts --dry-run
 *   npx ts-node sanity/migrations/catalogEntryToPageSections.ts
 *
 * Options:
 *   --dry-run    Show what would be migrated without making changes
 *   --verbose    Show detailed output for each document
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const DRY_RUN = process.argv.includes('--dry-run')
const VERBOSE = process.argv.includes('--verbose')

// Generate unique keys for Sanity arrays
function generateKey(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`
}

// Types for legacy fields
interface LegacyArticleSection {
  _key?: string
  heading: string
  content: string
}

interface LegacyFaq {
  _key?: string
  question: string
  answer: string
}

interface LegacyAssetItem {
  _key?: string
  icon?: string
  title: string
  description?: string
  url?: string
}

interface LegacyChecklistColumn {
  _key?: string
  title: string
  items?: string[]
}

interface LegacyContentBlock {
  _key?: string
  blockType: 'faq' | 'assets' | 'checklist' | 'text'
  title?: string
  description?: string
  content?: string
  faqs?: LegacyFaq[]
  items?: LegacyAssetItem[]
  columns?: LegacyChecklistColumn[]
}

interface CatalogEntryDoc {
  _id: string
  _rev: string
  title: string
  publishedTo?: string[]
  pageTemplate?: string
  pageSections?: any[]
  keyTakeaways?: string[]
  articleSections?: LegacyArticleSection[]
  actionItems?: string[]
  contentBlocks?: LegacyContentBlock[]
  resourceLinks?: {
    videoUrl?: string
    slidesUrl?: string
    transcriptUrl?: string
    keyAssetUrl?: string
    keyAssetLabel?: string
  }
  mainContent?: {
    videoUrl?: string
    wistiaId?: string
  }
}

// Types for new pageSections
interface PageSection {
  _type: 'pageSection'
  _key: string
  sectionType: string
  title: string
  description?: string
  collapsible?: boolean
  defaultExpanded?: boolean
  // Video fields
  videoUrl?: string
  wistiaId?: string
  sessionMaterials?: {
    videoUrl?: string
    slidesUrl?: string
    transcriptUrl?: string
  }
  // Takeaways fields
  takeaways?: string[]
  // Process fields
  processLayout?: string
  processSteps?: Array<{
    _key: string
    heading: string
    content: string
  }>
  // Tips fields
  tips?: string[]
  // FAQ fields
  faqs?: Array<{
    _key: string
    question: string
    answer: string
  }>
  // Assets fields
  assetItems?: Array<{
    _key: string
    icon?: string
    title: string
    description?: string
    url?: string
  }>
  // Checklist fields
  checklistColumns?: Array<{
    _key: string
    title: string
    items?: string[]
  }>
  // Text fields
  textContent?: string
}

/**
 * Build pageSections array from legacy fields
 */
function buildPageSections(doc: CatalogEntryDoc): PageSection[] {
  const sections: PageSection[] = []

  // 1. VIDEO SECTION - from resourceLinks or mainContent
  const videoUrl = doc.resourceLinks?.videoUrl || doc.mainContent?.videoUrl
  const wistiaId = doc.mainContent?.wistiaId

  if (videoUrl || wistiaId) {
    const videoSection: PageSection = {
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'video',
      title: 'Session Recording',
      collapsible: false,
      defaultExpanded: true,
    }

    if (videoUrl) videoSection.videoUrl = videoUrl
    if (wistiaId) videoSection.wistiaId = wistiaId

    // Add session materials if available
    if (doc.resourceLinks?.slidesUrl || doc.resourceLinks?.transcriptUrl) {
      videoSection.sessionMaterials = {
        videoUrl: doc.resourceLinks?.videoUrl,
        slidesUrl: doc.resourceLinks?.slidesUrl,
        transcriptUrl: doc.resourceLinks?.transcriptUrl,
      }
    }

    sections.push(videoSection)
  }

  // 2. KEY TAKEAWAYS SECTION
  if (doc.keyTakeaways && doc.keyTakeaways.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'takeaways',
      title: 'Key Takeaways',
      collapsible: false,
      defaultExpanded: true,
      takeaways: doc.keyTakeaways,
    })
  }

  // 3. HOW-TO STEPS (articleSections) → Process Section
  if (doc.articleSections && doc.articleSections.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'process',
      title: 'How To',
      collapsible: true,
      defaultExpanded: true,
      processLayout: 'steps',
      processSteps: doc.articleSections.map((step) => ({
        _key: generateKey(),
        heading: step.heading,
        content: step.content,
      })),
    })
  }

  // 4. TIPS & PITFALLS (actionItems)
  if (doc.actionItems && doc.actionItems.length > 0) {
    sections.push({
      _type: 'pageSection',
      _key: generateKey(),
      sectionType: 'tips',
      title: 'Tips & Pitfalls',
      collapsible: false,
      defaultExpanded: true,
      tips: doc.actionItems,
    })
  }

  // 5. CONTENT BLOCKS - Process each in order
  if (doc.contentBlocks && doc.contentBlocks.length > 0) {
    for (const block of doc.contentBlocks) {
      switch (block.blockType) {
        case 'faq':
          if (block.faqs && block.faqs.length > 0) {
            sections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'faq',
              title: block.title || 'FAQs',
              collapsible: true,
              defaultExpanded: true,
              faqs: block.faqs.map((faq) => ({
                _key: generateKey(),
                question: faq.question,
                answer: faq.answer,
              })),
            })
          }
          break

        case 'assets':
          if (block.items && block.items.length > 0) {
            sections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'assets',
              title: block.title || 'Resources',
              collapsible: false,
              defaultExpanded: true,
              assetItems: block.items.map((item) => ({
                _key: generateKey(),
                icon: item.icon,
                title: item.title,
                description: item.description,
                url: item.url,
              })),
            })
          }
          break

        case 'checklist':
          if (block.columns && block.columns.length > 0) {
            sections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'checklist',
              title: block.title || 'Checklist',
              description: block.description,
              collapsible: true,
              defaultExpanded: true,
              checklistColumns: block.columns.map((col) => ({
                _key: generateKey(),
                title: col.title,
                items: col.items,
              })),
            })
          }
          break

        case 'text':
          if (block.content) {
            sections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'text',
              title: block.title || 'Details',
              collapsible: true,
              defaultExpanded: true,
              textContent: block.content,
            })
          }
          break
      }
    }
  }

  return sections
}

/**
 * Check if document has legacy content to migrate
 */
function hasLegacyContent(doc: CatalogEntryDoc): boolean {
  return Boolean(
    doc.resourceLinks?.videoUrl ||
    doc.mainContent?.videoUrl ||
    doc.mainContent?.wistiaId ||
    (doc.keyTakeaways && doc.keyTakeaways.length > 0) ||
    (doc.articleSections && doc.articleSections.length > 0) ||
    (doc.actionItems && doc.actionItems.length > 0) ||
    (doc.contentBlocks && doc.contentBlocks.length > 0)
  )
}

/**
 * Generate migration report
 */
function generateReport(
  toMigrate: Array<{ doc: CatalogEntryDoc; sections: PageSection[] }>,
  skipped: Array<{ doc: CatalogEntryDoc; reason: string }>
) {
  console.log('\n' + '='.repeat(70))
  console.log('📊 MIGRATION REPORT')
  console.log('='.repeat(70))

  // Summary
  console.log(`\n📈 Summary:`)
  console.log(`   Total documents to migrate: ${toMigrate.length}`)
  console.log(`   Total documents skipped: ${skipped.length}`)

  // Breakdown by pageTemplate
  const byTemplate: Record<string, number> = {}
  toMigrate.forEach(({ doc }) => {
    const template = doc.pageTemplate || 'no-template'
    byTemplate[template] = (byTemplate[template] || 0) + 1
  })

  console.log(`\n📋 Breakdown by Page Template:`)
  Object.entries(byTemplate).forEach(([template, count]) => {
    const icon = template === 'training' ? '📺' : template === 'playbook' ? '📋' : template === 'battle-card' ? '⚔️' : '📄'
    console.log(`   ${icon} ${template}: ${count}`)
  })

  // Section type summary
  const sectionTypeCounts: Record<string, number> = {}
  toMigrate.forEach(({ sections }) => {
    sections.forEach((section) => {
      sectionTypeCounts[section.sectionType] = (sectionTypeCounts[section.sectionType] || 0) + 1
    })
  })

  console.log(`\n📦 Sections to be created:`)
  const sectionIcons: Record<string, string> = {
    video: '🎬',
    takeaways: '💡',
    process: '📝',
    tips: '⚠️',
    faq: '❓',
    assets: '📦',
    checklist: '✅',
    text: '📄',
  }
  Object.entries(sectionTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`   ${sectionIcons[type] || '📄'} ${type}: ${count}`)
    })

  // Document details
  if (VERBOSE && toMigrate.length > 0) {
    console.log(`\n📄 Documents to migrate:`)
    toMigrate.forEach(({ doc, sections }, idx) => {
      console.log(`\n   ${idx + 1}. "${doc.title}"`)
      console.log(`      Template: ${doc.pageTemplate || 'none'}`)
      console.log(`      Sections to create (${sections.length}):`)
      sections.forEach((section) => {
        console.log(`         ${sectionIcons[section.sectionType] || '📄'} ${section.title}`)
      })
    })
  }

  // Skipped documents
  if (skipped.length > 0) {
    console.log(`\n⏭️  Skipped documents:`)
    skipped.forEach(({ doc, reason }) => {
      console.log(`   - "${doc.title}": ${reason}`)
    })
  }

  // Potential issues
  const issues: string[] = []
  toMigrate.forEach(({ doc, sections }) => {
    if (sections.length === 0) {
      issues.push(`"${doc.title}": No sections generated despite having legacy content`)
    }
    if (!doc.resourceLinks?.videoUrl && !doc.mainContent?.videoUrl && doc.pageTemplate === 'training') {
      issues.push(`"${doc.title}": Training without video URL`)
    }
  })

  if (issues.length > 0) {
    console.log(`\n⚠️  Potential Issues:`)
    issues.forEach((issue) => console.log(`   - ${issue}`))
  }

  console.log('\n' + '='.repeat(70))
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 CatalogEntry → pageSections Migration')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE'}\n`)

  // Fetch all catalogEntry documents that:
  // - Are published to enablement hub
  // - Have legacy content
  // - Don't already have pageSections
  const query = `*[_type == "catalogEntry" && "enablement" in publishedTo] {
    _id,
    _rev,
    title,
    publishedTo,
    pageTemplate,
    pageSections,
    keyTakeaways,
    articleSections,
    actionItems,
    contentBlocks,
    resourceLinks,
    mainContent
  }`

  console.log('📦 Fetching documents...')
  const documents: CatalogEntryDoc[] = await client.fetch(query)
  console.log(`✓ Found ${documents.length} enablement documents\n`)

  const toMigrate: Array<{ doc: CatalogEntryDoc; sections: PageSection[] }> = []
  const skipped: Array<{ doc: CatalogEntryDoc; reason: string }> = []

  // Process each document
  for (const doc of documents) {
    // Skip if already has pageSections
    if (doc.pageSections && doc.pageSections.length > 0) {
      skipped.push({ doc, reason: `Already has ${doc.pageSections.length} pageSections` })
      continue
    }

    // Skip if no legacy content
    if (!hasLegacyContent(doc)) {
      skipped.push({ doc, reason: 'No legacy content to migrate' })
      continue
    }

    // Build new pageSections
    const sections = buildPageSections(doc)

    if (sections.length > 0) {
      toMigrate.push({ doc, sections })
    } else {
      skipped.push({ doc, reason: 'No sections generated from legacy content' })
    }
  }

  // Generate report
  generateReport(toMigrate, skipped)

  // Execute migration if not dry run
  if (!DRY_RUN && toMigrate.length > 0) {
    console.log('\n🔄 Executing migration...\n')

    let successCount = 0
    let errorCount = 0

    for (const { doc, sections } of toMigrate) {
      try {
        await client
          .patch(doc._id)
          .set({
            pageSections: sections,
            _migratedAt: new Date().toISOString(),
            _migratedFrom: 'catalogEntryToPageSections',
          })
          .commit()

        successCount++
        console.log(`✅ Migrated: "${doc.title}" (${sections.length} sections)`)
      } catch (error: any) {
        errorCount++
        console.error(`❌ Error migrating "${doc.title}": ${error.message}`)
      }
    }

    console.log(`\n${'='.repeat(70)}`)
    console.log(`📊 Migration Complete:`)
    console.log(`   ✅ Success: ${successCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log(`${'='.repeat(70)}`)
  } else if (DRY_RUN) {
    console.log('\n💡 This was a DRY RUN. No changes were made.')
    console.log('   Run without --dry-run to execute the migration.')
  }
}

// Run migration
migrate()
  .then(() => {
    console.log('\n✅ Migration script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
