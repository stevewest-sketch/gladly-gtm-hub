/**
 * Cleanup Migration: Remove Legacy Fields from Migrated CatalogEntry Documents
 *
 * Removes legacy content fields from documents that have been successfully
 * migrated to pageSections.
 *
 * Fields removed:
 *   - keyTakeaways
 *   - articleSections
 *   - actionItems
 *   - contentBlocks
 *
 * Fields preserved:
 *   - resourceLinks (still useful for session materials)
 *   - mainContent (kept for backwards compatibility)
 *
 * Usage:
 *   npx ts-node sanity/migrations/catalogEntryCleanupLegacy.ts --dry-run
 *   npx ts-node sanity/migrations/catalogEntryCleanupLegacy.ts
 *
 * Options:
 *   --dry-run    Show what would be cleaned without making changes
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

// Legacy fields to remove
const LEGACY_FIELDS = ['keyTakeaways', 'articleSections', 'actionItems', 'contentBlocks']

interface CatalogEntryDoc {
  _id: string
  title: string
  pageTemplate?: string
  pageSections?: any[]
  keyTakeaways?: string[]
  articleSections?: any[]
  actionItems?: string[]
  contentBlocks?: any[]
  _migratedAt?: string
}

interface CleanupReport {
  doc: CatalogEntryDoc
  fieldsToRemove: string[]
  fieldDetails: Record<string, number>
}

/**
 * Check which legacy fields have data
 */
function getLegacyFieldsWithData(doc: CatalogEntryDoc): { fields: string[]; details: Record<string, number> } {
  const fields: string[] = []
  const details: Record<string, number> = {}

  if (doc.keyTakeaways && doc.keyTakeaways.length > 0) {
    fields.push('keyTakeaways')
    details.keyTakeaways = doc.keyTakeaways.length
  }

  if (doc.articleSections && doc.articleSections.length > 0) {
    fields.push('articleSections')
    details.articleSections = doc.articleSections.length
  }

  if (doc.actionItems && doc.actionItems.length > 0) {
    fields.push('actionItems')
    details.actionItems = doc.actionItems.length
  }

  if (doc.contentBlocks && doc.contentBlocks.length > 0) {
    fields.push('contentBlocks')
    details.contentBlocks = doc.contentBlocks.length
  }

  return { fields, details }
}

/**
 * Main cleanup function
 */
async function cleanup() {
  console.log('🧹 CatalogEntry Legacy Fields Cleanup')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE'}\n`)

  // Fetch documents that have pageSections AND legacy fields
  const query = `*[_type == "catalogEntry" && defined(pageSections) && count(pageSections) > 0] {
    _id,
    title,
    pageTemplate,
    pageSections,
    keyTakeaways,
    articleSections,
    actionItems,
    contentBlocks,
    _migratedAt
  }`

  console.log('📦 Fetching migrated documents...')
  const documents: CatalogEntryDoc[] = await client.fetch(query)
  console.log(`✓ Found ${documents.length} documents with pageSections\n`)

  // Filter to only those with legacy data
  const toCleanup: CleanupReport[] = []
  const alreadyClean: CatalogEntryDoc[] = []

  for (const doc of documents) {
    const { fields, details } = getLegacyFieldsWithData(doc)

    if (fields.length > 0) {
      toCleanup.push({
        doc,
        fieldsToRemove: fields,
        fieldDetails: details,
      })
    } else {
      alreadyClean.push(doc)
    }
  }

  // Generate report
  console.log('='.repeat(70))
  console.log('📊 CLEANUP REPORT')
  console.log('='.repeat(70))

  console.log(`\n📈 Summary:`)
  console.log(`   Documents to clean: ${toCleanup.length}`)
  console.log(`   Already clean: ${alreadyClean.length}`)

  if (toCleanup.length === 0) {
    console.log('\n✅ No documents need cleanup. All migrated documents are already clean.')
    return
  }

  // Count fields to remove
  const fieldCounts: Record<string, number> = {}
  const itemCounts: Record<string, number> = {}

  toCleanup.forEach(({ fieldsToRemove, fieldDetails }) => {
    fieldsToRemove.forEach((field) => {
      fieldCounts[field] = (fieldCounts[field] || 0) + 1
      itemCounts[field] = (itemCounts[field] || 0) + (fieldDetails[field] || 0)
    })
  })

  console.log(`\n🗑️  Fields to remove:`)
  const fieldIcons: Record<string, string> = {
    keyTakeaways: '💡',
    articleSections: '📝',
    actionItems: '⚠️',
    contentBlocks: '📦',
  }

  Object.entries(fieldCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([field, count]) => {
      console.log(`   ${fieldIcons[field] || '📄'} ${field}: ${count} documents (${itemCounts[field]} items total)`)
    })

  // Document details
  console.log(`\n📄 Documents to clean:`)
  toCleanup.forEach(({ doc, fieldsToRemove, fieldDetails }, idx) => {
    const fieldSummary = fieldsToRemove
      .map((f) => `${f}(${fieldDetails[f]})`)
      .join(', ')
    console.log(`   ${idx + 1}. "${doc.title}"`)
    console.log(`      Remove: ${fieldSummary}`)
  })

  console.log('\n' + '='.repeat(70))

  // Execute cleanup if not dry run
  if (!DRY_RUN) {
    console.log('\n🔄 Executing cleanup...\n')

    let successCount = 0
    let errorCount = 0

    for (const { doc, fieldsToRemove, fieldDetails } of toCleanup) {
      try {
        // Build unset operation
        await client
          .patch(doc._id)
          .unset(fieldsToRemove)
          .set({ _cleanedAt: new Date().toISOString() })
          .commit()

        successCount++
        const fieldSummary = fieldsToRemove
          .map((f) => `${f}(${fieldDetails[f]})`)
          .join(', ')
        console.log(`✅ Cleaned: "${doc.title}" - removed: ${fieldSummary}`)
      } catch (error: any) {
        errorCount++
        console.error(`❌ Error cleaning "${doc.title}": ${error.message}`)
      }
    }

    console.log(`\n${'='.repeat(70)}`)
    console.log(`📊 Cleanup Complete:`)
    console.log(`   ✅ Success: ${successCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log(`${'='.repeat(70)}`)
  } else {
    console.log('\n💡 This was a DRY RUN. No changes were made.')
    console.log('   Run without --dry-run to execute the cleanup.')
  }
}

// Run cleanup
cleanup()
  .then(() => {
    console.log('\n✅ Cleanup script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Cleanup failed:', error)
    process.exit(1)
  })
