/**
 * Create Example Enablement
 *
 * This script creates a fully-featured example enablement that demonstrates
 * all the capabilities of the enablement system.
 *
 * Usage:
 *   node scripts/create-example-enablement.js
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

// Helper: Create slug object
function createSlug(text) {
  return {
    _type: 'slug',
    current: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }
}

async function main() {
  console.log('🚀 Creating Example Enablement')
  console.log('─'.repeat(60))

  try {
    // Fetch required taxonomy data
    console.log('\n📚 Fetching taxonomy data...')

    const [contentTypes, audiences, learningPaths] = await Promise.all([
      client.fetch('*[_type == "contentType"]{ _id, name }'),
      client.fetch('*[_type == "audience"]{ _id, name }'),
      client.fetch('*[_type == "learningPath"]{ _id, name, slug }'),
    ])

    console.log(`✓ Found ${contentTypes.length} content types`)
    console.log(`✓ Found ${audiences.length} audiences`)
    console.log(`✓ Found ${learningPaths.length} learning paths`)

    // Create lookup maps
    const contentTypeMap = {}
    contentTypes.forEach(ct => { contentTypeMap[ct.name] = ct._id })

    const audienceMap = {}
    audiences.forEach(a => { audienceMap[a.name] = a._id })

    const learningPathMap = {}
    learningPaths.forEach(lp => {
      learningPathMap[lp.slug.current] = lp._id
    })

    // Create comprehensive example enablement
    const exampleEnablement = {
      _type: 'catalogEntry',

      // ========================================
      // BASICS
      // ========================================
      title: '[EXAMPLE] Mastering Gladly Sidekick AI - Complete Training',
      slug: createSlug('[EXAMPLE] Mastering Gladly Sidekick AI - Complete Training'),
      description: 'Learn how to leverage Gladly Sidekick AI to supercharge your customer service team. This comprehensive training covers setup, best practices, and advanced features to maximize efficiency and customer satisfaction.',

      // Classification
      contentType: {
        _type: 'reference',
        _ref: contentTypeMap['Training'],
      },
      pageTemplate: 'training-session',
      format: 'live-replay',

      // ========================================
      // CONTENT
      // ========================================
      mainContent: {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        wistiaId: 'abc123def456',
        documentUrl: 'https://docs.google.com/document/d/example',
        transcript: `Welcome everyone to today's training on Gladly Sidekick AI!

I'm excited to walk you through this powerful feature that's transforming how our customers deliver exceptional service.

Today we'll cover:
1. What is Sidekick AI and why it matters
2. How to set up and configure Sidekick for your team
3. Best practices from top-performing customers
4. Advanced features and automation capabilities
5. Measuring success and ROI

Let's dive in!

[Full transcript would continue here with the complete video content...]

By the end of this session, you'll be able to:
- Configure Sidekick AI for optimal performance
- Train your agents to work effectively with AI assistance
- Measure and demonstrate ROI to stakeholders
- Implement advanced automation workflows

Remember, Sidekick AI is designed to augment your team, not replace them. It's about making your best agents even better!

Thank you for joining today's training. If you have questions, please reach out to the enablement team.`,
        additionalResources: [
          {
            title: 'Sidekick AI Setup Guide',
            url: 'https://docs.gladly.com/sidekick-setup',
            type: 'link',
          },
          {
            title: 'Best Practices Playbook',
            url: 'https://drive.google.com/file/d/example-playbook',
            type: 'download',
          },
          {
            title: 'ROI Calculator Template',
            url: 'https://sheets.google.com/example-calculator',
            type: 'external',
          },
        ],
      },

      keyTakeaways: [
        'Understand how Sidekick AI enhances agent productivity by 40%',
        'Configure AI settings to match your brand voice and customer expectations',
        'Implement best practices for training agents to work alongside AI',
        'Measure success with key metrics: CSAT, AHT reduction, and agent satisfaction',
        'Leverage advanced automation to handle routine inquiries automatically',
      ],

      duration: 45,
      difficulty: 'intermediate',
      presenter: 'Sarah Chen, Senior Solutions Consultant',
      publishDate: new Date().toISOString(),

      // ========================================
      // TAGGING
      // ========================================
      audiences: [
        { _type: 'reference', _ref: audienceMap['Sales'], _key: `aud-sales` },
        { _type: 'reference', _ref: audienceMap['SC'], _key: `aud-sc` },
        { _type: 'reference', _ref: audienceMap['CSM'], _key: `aud-csm` },
      ],

      learningPaths: [
        { _type: 'reference', _ref: learningPathMap['product-mastery'], _key: `lp-product` },
      ],

      enablementCategory: ['Product', 'Learning', 'Toolkit'],

      // ========================================
      // PUBLISHING
      // ========================================
      status: 'published',
      publishedTo: ['enablement', 'content'],
      featured: true,
      priority: 95,
      showInUpcoming: true,
    }

    // Create the enablement
    console.log('\n📝 Creating example enablement...')
    const created = await client.create(exampleEnablement)

    console.log('\n' + '='.repeat(60))
    console.log('✨ Example Enablement Created Successfully!')
    console.log('='.repeat(60))

    console.log(`\n📋 Details:`)
    console.log(`   Title: ${created.title}`)
    console.log(`   Slug: ${created.slug.current}`)
    console.log(`   Status: ${created.status}`)
    console.log(`   Featured: ${created.featured ? 'Yes' : 'No'}`)
    console.log(`   Priority: ${created.priority}`)

    console.log(`\n🎯 View the enablement:`)
    console.log(`   Enablement Hub: http://localhost:3000/enablement-hub`)
    console.log(`   Detail Page: http://localhost:3000/catalog/${created.slug.current}`)

    console.log(`\n📦 What's Included:`)
    console.log(`   ✓ Complete description and metadata`)
    console.log(`   ✓ Video URL and Wistia ID`)
    console.log(`   ✓ Full transcript`)
    console.log(`   ✓ 5 key takeaways`)
    console.log(`   ✓ 3 additional resources`)
    console.log(`   ✓ Audience targeting (Sales, SC, CSM)`)
    console.log(`   ✓ Learning path assignment (Product Mastery)`)
    console.log(`   ✓ Featured content (high priority)`)

    console.log(`\n🗑️  To remove this example:`)
    console.log(`   1. Go to Sanity Studio`)
    console.log(`   2. Search for "[EXAMPLE]"`)
    console.log(`   3. Delete the entry`)

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error(error)
    process.exit(1)
  }
}

// Run script
main()
  .then(() => {
    console.log('\n✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })
