/**
 * Migration Script: Update Overview Card Emojis and Colors
 *
 * This script updates all catalog entries with overview cards to include
 * intelligently detected icons and color presets based on their labels.
 *
 * Run with: npx tsx scripts/migrate-overview-card-styles.ts
 *
 * Options:
 *   --dry-run    Preview changes without applying them
 *   --force      Skip confirmation prompt
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  apiVersion: '2021-10-21'
})

type ColorPreset = 'blue' | 'green' | 'rose' | 'purple' | 'amber' | 'indigo' | 'cyan' | 'pink' | 'gray'

// Keyword-based intelligent detection for colors
const keywordToColorPreset: Array<{ keywords: string[]; color: ColorPreset }> = [
  { keywords: ['what it is', 'what is', 'definition', 'overview', 'about', 'description', 'summary'], color: 'blue' },
  { keywords: ['who', 'audience', 'team', 'people', 'user', 'customer', 'prospect', 'for whom'], color: 'green' },
  { keywords: ['outcome', 'result', 'goal', 'success', 'achieve', 'benefit', 'impact', 'value', 'roi'], color: 'rose' },
  { keywords: ['why', 'matter', 'important', 'reason', 'insight', 'learn', 'understand'], color: 'purple' },
  { keywords: ['when', 'time', 'trigger', 'moment', 'stage', 'phase', 'timing', 'schedule'], color: 'amber' },
  { keywords: ['pillar', 'framework', 'principle', 'foundation', 'structure', 'component', 'element', 'step'], color: 'indigo' },
  { keywords: ['how', 'process', 'method', 'approach', 'workflow', 'procedure', 'guide', 'instruction'], color: 'cyan' },
  { keywords: ['get', 'receive', 'deliverable', 'include', 'feature', 'offer', 'provide', 'expect'], color: 'pink' },
]

// Keyword-based intelligent detection for emojis
const keywordToIcon: Array<{ keywords: string[]; icon: string }> = [
  { keywords: ['what it is', 'what is', 'definition', 'overview', 'about', 'description'], icon: '📋' },
  { keywords: ['summary', 'brief', 'snapshot'], icon: '📝' },
  { keywords: ['who it\'s for', 'who\'s it for', 'who is it for', 'audience', 'for whom'], icon: '👥' },
  { keywords: ['team', 'people', 'user'], icon: '👤' },
  { keywords: ['customer', 'client'], icon: '🤝' },
  { keywords: ['outcome', 'result', 'goal'], icon: '🎯' },
  { keywords: ['success', 'win', 'achieve'], icon: '🏆' },
  { keywords: ['value', 'roi', 'impact'], icon: '💰' },
  { keywords: ['why', 'matter', 'important', 'reason'], icon: '💡' },
  { keywords: ['insight', 'learn'], icon: '🧠' },
  { keywords: ['when to use', 'when to', 'timing'], icon: '⏰' },
  { keywords: ['time to value', 'timeline'], icon: '⚡' },
  { keywords: ['stage', 'phase'], icon: '📊' },
  { keywords: ['pillar', 'foundation'], icon: '🏛️' },
  { keywords: ['framework', 'structure'], icon: '🔧' },
  { keywords: ['step', 'component', 'element'], icon: '🔢' },
  { keywords: ['how it works', 'how to', 'process'], icon: '⚙️' },
  { keywords: ['method', 'approach', 'workflow'], icon: '🔄' },
  { keywords: ['guide', 'instruction'], icon: '📖' },
  { keywords: ['what you get', 'get', 'receive'], icon: '🎁' },
  { keywords: ['benefit', 'advantage'], icon: '✨' },
  { keywords: ['feature', 'include'], icon: '✅' },
  { keywords: ['key takeaway', 'takeaway'], icon: '💎' },
  { keywords: ['prerequisite', 'require'], icon: '📌' },
  { keywords: ['tip', 'best practice'], icon: '💪' },
  { keywords: ['warning', 'caution', 'avoid'], icon: '⚠️' },
  { keywords: ['example', 'case', 'scenario'], icon: '📎' },
  { keywords: ['resource', 'tool', 'asset'], icon: '🛠️' },
  { keywords: ['contact', 'support', 'help'], icon: '📞' },
  { keywords: ['next step', 'action'], icon: '➡️' },
]

function detectColorFromLabel(label: string): ColorPreset {
  const normalized = label.toLowerCase()
  for (const mapping of keywordToColorPreset) {
    for (const keyword of mapping.keywords) {
      if (normalized.includes(keyword)) {
        return mapping.color
      }
    }
  }
  return 'gray'
}

function detectIconFromLabel(label: string): string {
  const normalized = label.toLowerCase()
  for (const mapping of keywordToIcon) {
    for (const keyword of mapping.keywords) {
      if (normalized.includes(keyword)) {
        return mapping.icon
      }
    }
  }
  return '📌'
}

interface OverviewCard {
  _key?: string
  label: string
  content: string
  icon?: string
  colorPreset?: ColorPreset
}

interface PageSection {
  _key: string
  sectionType: string
  title?: string
  overviewCards?: OverviewCard[]
  [key: string]: unknown
}

interface CatalogEntry {
  _id: string
  _type: string
  title: string
  pageSections?: PageSection[]
}

async function migrate() {
  const isDryRun = process.argv.includes('--dry-run')
  const skipConfirm = process.argv.includes('--force')

  console.log('\n🔄 Overview Card Style Migration')
  console.log('================================')
  if (isDryRun) {
    console.log('🏃 DRY RUN MODE - No changes will be made\n')
  }

  // Fetch all entries with overview sections
  const entries: CatalogEntry[] = await client.fetch(`
    *[_type == "catalogEntry" && defined(pageSections)] {
      _id,
      _type,
      title,
      pageSections
    }
  `)

  console.log(`Found ${entries.length} catalog entries with page sections\n`)

  let totalUpdated = 0
  let totalCardsUpdated = 0
  const updates: Array<{ id: string; title: string; changes: string[] }> = []

  for (const entry of entries) {
    if (!entry.pageSections) continue

    let entryNeedsUpdate = false
    const changes: string[] = []
    const updatedSections = entry.pageSections.map((section) => {
      if (section.sectionType !== 'overview' || !section.overviewCards) {
        return section
      }

      const updatedCards = section.overviewCards.map((card, index) => {
        const detectedIcon = detectIconFromLabel(card.label)
        const detectedColor = detectColorFromLabel(card.label)

        // Only update if not already set
        const needsIconUpdate = !card.icon
        const needsColorUpdate = !card.colorPreset

        if (needsIconUpdate || needsColorUpdate) {
          entryNeedsUpdate = true
          totalCardsUpdated++

          const updateDetails = []
          if (needsIconUpdate) updateDetails.push(`icon: ${detectedIcon}`)
          if (needsColorUpdate) updateDetails.push(`color: ${detectedColor}`)
          changes.push(`  Card ${index + 1} "${card.label}": ${updateDetails.join(', ')}`)

          return {
            ...card,
            icon: card.icon || detectedIcon,
            colorPreset: card.colorPreset || detectedColor,
          }
        }

        return card
      })

      return {
        ...section,
        overviewCards: updatedCards,
      }
    })

    if (entryNeedsUpdate) {
      totalUpdated++
      updates.push({ id: entry._id, title: entry.title, changes })

      if (!isDryRun) {
        await client
          .patch(entry._id)
          .set({ pageSections: updatedSections })
          .commit()
      }
    }
  }

  // Print summary
  console.log('\n📊 Migration Summary')
  console.log('====================')

  if (updates.length === 0) {
    console.log('✅ All entries already have icon and color values set!')
  } else {
    console.log(`\n${isDryRun ? 'Would update' : 'Updated'} ${totalUpdated} entries with ${totalCardsUpdated} cards:\n`)

    for (const update of updates) {
      console.log(`📄 ${update.title}`)
      update.changes.forEach(c => console.log(c))
      console.log()
    }
  }

  if (isDryRun && updates.length > 0) {
    console.log('\n💡 Run without --dry-run to apply these changes')
  }

  console.log('\n✨ Done!')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
