/**
 * Rollback Script: CatalogEntry pageSections Migration
 *
 * Reverts the migration by:
 * - Finding all documents that were migrated (have _migratedFrom field)
 * - Clearing the pageSections array
 * - Removing migration metadata fields
 *
 * Usage:
 *   npx ts-node sanity/migrations/catalogEntryToPageSections.rollback.ts --dry-run
 *   npx ts-node sanity/migrations/catalogEntryToPageSections.rollback.ts
 *
 * Options:
 *   --dry-run    Show what would be rolled back without making changes
 *   --force      Roll back ALL documents with pageSections (not just migrated ones)
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
const FORCE = process.argv.includes('--force')

interface MigratedDoc {
  _id: string
  title: string
  pageTemplate?: string
  pageSections?: any[]
  _migratedAt?: string
  _migratedFrom?: string
}

async function rollback() {
  console.log('🔄 CatalogEntry pageSections Migration Rollback')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE'}`)
  console.log(`Target: ${FORCE ? 'ALL documents with pageSections' : 'Only auto-migrated documents'}\n`)

  // Build query based on mode
  let query: string
  if (FORCE) {
    query = `*[_type == "catalogEntry" && defined(pageSections) && count(pageSections) > 0] {
      _id,
      title,
      pageTemplate,
      pageSections,
      _migratedAt,
      _migratedFrom
    }`
  } else {
    query = `*[_type == "catalogEntry" && _migratedFrom == "catalogEntryToPageSections"] {
      _id,
      title,
      pageTemplate,
      pageSections,
      _migratedAt,
      _migratedFrom
    }`
  }

  console.log('📦 Fetching documents to rollback...')
  const documents: MigratedDoc[] = await client.fetch(query)

  if (documents.length === 0) {
    console.log('\n✅ No documents found to rollback.')
    console.log('   Either no migration was performed, or all migrations have already been rolled back.')
    return
  }

  console.log(`✓ Found ${documents.length} documents to rollback\n`)

  // Generate report
  console.log('=' .repeat(60))
  console.log('📊 ROLLBACK REPORT')
  console.log('='.repeat(60))

  // Breakdown by template
  const byTemplate: Record<string, number> = {}
  documents.forEach((doc) => {
    const template = doc.pageTemplate || 'no-template'
    byTemplate[template] = (byTemplate[template] || 0) + 1
  })

  console.log(`\n📋 Breakdown by Page Template:`)
  Object.entries(byTemplate).forEach(([template, count]) => {
    const icon = template === 'training' ? '📺' : template === 'playbook' ? '📋' : template === 'battle-card' ? '⚔️' : '📄'
    console.log(`   ${icon} ${template}: ${count}`)
  })

  // Section count summary
  let totalSections = 0
  documents.forEach((doc) => {
    totalSections += doc.pageSections?.length || 0
  })
  console.log(`\n📦 Total pageSections to be removed: ${totalSections}`)

  // Document details
  console.log(`\n📄 Documents to rollback:`)
  documents.forEach((doc, idx) => {
    const migratedInfo = doc._migratedAt
      ? ` (migrated: ${new Date(doc._migratedAt).toLocaleDateString()})`
      : ''
    console.log(`   ${idx + 1}. "${doc.title}" - ${doc.pageSections?.length || 0} sections${migratedInfo}`)
  })

  console.log('\n' + '='.repeat(60))

  // Execute rollback if not dry run
  if (!DRY_RUN) {
    console.log('\n⚠️  WARNING: This will remove pageSections from the above documents!')
    console.log('   The legacy fields (keyTakeaways, articleSections, etc.) are still intact.\n')

    console.log('🔄 Executing rollback...\n')

    let successCount = 0
    let errorCount = 0

    for (const doc of documents) {
      try {
        await client
          .patch(doc._id)
          .set({ pageSections: [] })
          .unset(['_migratedAt', '_migratedFrom'])
          .commit()

        successCount++
        console.log(`✅ Rolled back: "${doc.title}"`)
      } catch (error: any) {
        errorCount++
        console.error(`❌ Error rolling back "${doc.title}": ${error.message}`)
      }
    }

    console.log(`\n${'='.repeat(60)}`)
    console.log(`📊 Rollback Complete:`)
    console.log(`   ✅ Success: ${successCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log(`${'='.repeat(60)}`)
  } else {
    console.log('\n💡 This was a DRY RUN. No changes were made.')
    console.log('   Run without --dry-run to execute the rollback.')
    if (!FORCE) {
      console.log('   Use --force to rollback ALL documents with pageSections (not just migrated ones).')
    }
  }
}

// Run rollback
rollback()
  .then(() => {
    console.log('\n✅ Rollback script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Rollback failed:', error)
    process.exit(1)
  })
