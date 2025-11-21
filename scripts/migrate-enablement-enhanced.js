/**
 * Enhanced Migration Script: EnablementArticle → CatalogEntry
 *
 * This script migrates legacy enablementArticle entries to the new
 * unified catalogEntry schema with proper audience parsing.
 *
 * Key Features:
 * - Parses grouped audiences (e.g., "Sales,CSM,SC") into individual references
 * - Maps content types to references
 * - Creates proper enablementCategory arrays
 * - Handles multi-select audiences
 *
 * Prerequisites:
 * 1. Create audience taxonomy entries in Sanity Studio (Sales, CSM, SC, Marketing, Product, Leadership, All Teams)
 * 2. Ensure content types exist (Training, Meeting, Demo, Guide)
 * 3. Set up environment variables (see .env.example)
 *
 * Usage:
 *   node scripts/migrate-enablement-enhanced.js [--dry-run]
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

// Helper: Parse grouped audiences string into array
function parseAudiences(audienceString) {
  if (!audienceString) return []

  // Split by comma and clean up whitespace
  return audienceString
    .split(',')
    .map(a => a.trim())
    .filter(a => a.length > 0)
}

// Helper: Parse reading time to duration in minutes
function parseReadingTime(readingTime) {
  if (!readingTime) return undefined
  const match = readingTime.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : undefined
}

// Helper: Map old category to enablement category array
function mapCategory(category) {
  const categoryMap = {
    'Product': ['Product'],
    'Toolkit': ['Toolkit'],
    'Competitive': ['Competitive'],
    'Learning': ['Learning'],
    'CoE': ['CoE'],
    'Resources': ['Resources'],
  }
  return categoryMap[category] || []
}

// Helper: Determine page template based on content type
function getPageTemplate(contentType) {
  return 'training-session' // Default for all enablement content
}

// Helper: Determine format based on content type
function getFormat(contentType) {
  const formatMap = {
    'Training': 'live-replay',
    'Meeting': 'live-replay',
    'Demo': 'live-replay',
    'Guide': 'async',
  }
  return formatMap[contentType] || 'async'
}

// Helper: Determine learning path based on content
function determineLearningPath(article) {
  const paths = []

  // Check for onboarding keywords
  if (
    article.title?.toLowerCase().includes('onboarding') ||
    article.title?.toLowerCase().includes('getting started') ||
    article.tags?.some(t => t.toLowerCase().includes('onboarding'))
  ) {
    paths.push('onboarding')
  }

  // Check for product-related content
  if (
    article.category === 'Product' ||
    article.tags?.some(t => ['product', 'feature', 'enhancement'].some(kw => t.toLowerCase().includes(kw)))
  ) {
    paths.push('product-mastery')
  }

  // Check for sales-focused content
  if (
    article.audience?.toLowerCase().includes('sales') ||
    article.tags?.some(t => ['sales', 'discovery', 'demo', 'objection', 'roi'].some(kw => t.toLowerCase().includes(kw)))
  ) {
    paths.push('sales-excellence')
  }

  return paths
}

async function main() {
  console.log('🚀 Starting Enhanced Enablement → Catalog Migration')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE'}`)
  console.log('─'.repeat(60))

  // Step 1: Fetch all taxonomies
  console.log('\n📚 Fetching taxonomies...')

  const [audiences, contentTypes] = await Promise.all([
    client.fetch('*[_type == "audience"]{ _id, name, slug }'),
    client.fetch('*[_type == "contentType"]{ _id, name, slug }'),
  ])

  console.log(`✓ Found ${audiences.length} audiences`)
  console.log(`✓ Found ${contentTypes.length} content types`)

  // Create lookup maps
  const audienceMap = {}
  audiences.forEach(a => {
    // Map both by name and slug for flexible matching
    audienceMap[a.name.toLowerCase()] = a._id
    audienceMap[a.slug.current.toLowerCase()] = a._id
  })

  const contentTypeMap = {}
  contentTypes.forEach(ct => {
    contentTypeMap[ct.name.toLowerCase()] = ct._id
  })

  console.log('\n📊 Audience mapping:')
  const uniqueAudiences = new Set(Object.keys(audienceMap).map(k => audienceMap[k]))
  uniqueAudiences.forEach(id => {
    const audience = audiences.find(a => a._id === id)
    console.log(`  ${audience.name} → ${id}`)
  })

  // Step 2: Fetch all enablementArticle entries
  console.log('\n📦 Fetching enablementArticle entries...')

  const articles = await client.fetch(`
    *[_type == "enablementArticle"] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      slug,
      summary,
      category,
      contentType,
      audience,
      keyTakeaways,
      tags,
      readingTime,
      publishedDate,
      videoUrl,
      slidesUrl,
      transcriptUrl,
      keyAssetUrl,
      keyAssetLabel,
      featured,
      sections,
      actionItems
    }
  `)

  console.log(`✓ Found ${articles.length} articles to migrate`)

  if (articles.length === 0) {
    console.log('\n✅ No articles to migrate. Exiting.')
    return
  }

  // Step 3: Convert and create catalog entries
  console.log('\n🔄 Converting articles to catalog entries...\n')

  const results = {
    success: [],
    skipped: [],
    errors: [],
  }

  for (const article of articles) {
    try {
      // Skip if missing required fields
      if (!article.title || !article.slug || !article.contentType) {
        console.log(`⚠ Skipping "${article.title || article._id}": Missing required fields`)
        results.skipped.push({
          id: article._id,
          title: article.title,
          reason: 'Missing required fields',
        })
        continue
      }

      // Look up content type reference
      const contentTypeRef = contentTypeMap[article.contentType.toLowerCase()]
      if (!contentTypeRef) {
        console.log(`⚠ Skipping "${article.title}": Content type "${article.contentType}" not found`)
        results.skipped.push({
          id: article._id,
          title: article.title,
          reason: `Content type not found: ${article.contentType}`,
        })
        continue
      }

      // Parse and look up audience references
      const audienceNames = parseAudiences(article.audience)
      const audienceRefs = []

      for (const audienceName of audienceNames) {
        const audienceId = audienceMap[audienceName.toLowerCase()]
        if (audienceId) {
          audienceRefs.push({
            _type: 'reference',
            _ref: audienceId,
            _key: `audience-${audienceId}`,
          })
        } else {
          console.log(`  ⚠ Warning: Audience "${audienceName}" not found for "${article.title}"`)
        }
      }

      // Build additional resources array
      const additionalResources = []

      if (article.slidesUrl) {
        additionalResources.push({
          _type: 'object',
          _key: `slides-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: 'Presentation Slides',
          url: article.slidesUrl,
          type: 'link',
        })
      }

      if (article.transcriptUrl) {
        additionalResources.push({
          _type: 'object',
          _key: `transcript-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: 'Meeting Transcript',
          url: article.transcriptUrl,
          type: 'link',
        })
      }

      if (article.keyAssetUrl) {
        additionalResources.push({
          _type: 'object',
          _key: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: article.keyAssetLabel || 'Key Asset',
          url: article.keyAssetUrl,
          type: 'download',
        })
      }

      // Determine learning paths
      const learningPaths = determineLearningPath(article)

      // Build the new catalog entry
      const catalogEntry = {
        _type: 'catalogEntry',
        title: article.title,
        slug: article.slug,
        description: article.summary,
        contentType: {
          _type: 'reference',
          _ref: contentTypeRef,
        },
        pageTemplate: getPageTemplate(article.contentType),
        format: getFormat(article.contentType),
        audiences: audienceRefs.length > 0 ? audienceRefs : undefined,
        enablementCategory: mapCategory(article.category),
        publishDate: article.publishedDate,
        duration: parseReadingTime(article.readingTime),
        mainContent: {
          _type: 'object',
          videoUrl: article.videoUrl || undefined,
          additionalResources: additionalResources.length > 0 ? additionalResources : undefined,
        },
        keyTakeaways: article.keyTakeaways || undefined,
        featured: article.featured || false,
        priority: article.featured ? 75 : 50,
        publishedTo: ['enablement'],
        status: 'published',
        // Store learning paths as metadata for filtering
        _learningPaths: learningPaths, // This is for logging, won't be stored
      }

      if (DRY_RUN) {
        console.log(`✓ Would migrate: "${article.title}"`)
        console.log(`  Categories: ${catalogEntry.enablementCategory.join(', ')}`)
        console.log(`  Audiences: ${audienceNames.join(', ')} (${audienceRefs.length} mapped)`)
        if (learningPaths.length > 0) {
          console.log(`  Learning Paths: ${learningPaths.join(', ')}`)
        }
        results.success.push({ id: article._id, title: article.title })
      } else {
        // Remove the _learningPaths field before creating
        delete catalogEntry._learningPaths

        // Create the new catalog entry
        const result = await client.create(catalogEntry)
        console.log(`✅ Migrated: "${article.title}" → ${result._id}`)
        console.log(`  Audiences: ${audienceNames.join(', ')}`)
        if (learningPaths.length > 0) {
          console.log(`  Suggested for: ${learningPaths.join(', ')}`)
        }
        results.success.push({
          id: article._id,
          title: article.title,
          newId: result._id,
        })
      }

    } catch (error) {
      console.error(`❌ Error migrating "${article.title}":`, error.message)
      results.errors.push({
        id: article._id,
        title: article.title,
        error: error.message,
      })
    }
  }

  // Step 4: Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Migration Summary')
  console.log('='.repeat(60))
  console.log(`✅ Successfully migrated: ${results.success.length}`)
  console.log(`⚠  Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)

  if (results.skipped.length > 0) {
    console.log('\n⚠  Skipped entries:')
    results.skipped.forEach(item => {
      console.log(`  - ${item.title || item.id}: ${item.reason}`)
    })
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:')
    results.errors.forEach(item => {
      console.log(`  - ${item.title || item.id}: ${item.error}`)
    })
  }

  if (DRY_RUN) {
    console.log('\n💡 This was a DRY RUN. No changes were made.')
    console.log('   Run without --dry-run to perform actual migration.')
  } else {
    console.log('\n✨ Migration complete!')
    console.log('\n📝 Next steps:')
    console.log('  1. Review migrated entries in Sanity Studio')
    console.log('  2. Create audience taxonomy entries if any were missing')
    console.log('  3. Test the Enablement Hub at http://localhost:3000/enablement-hub')
    console.log('  4. Manually tag entries with learning paths in Sanity Studio')
    console.log('  5. Once verified, archive old enablementArticle entries')
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
