/**
 * Seed Script: Create Dummy Enablement Data
 *
 * This script creates 10 diverse dummy enablement entries to test
 * the enablement hub experience.
 *
 * Prerequisites:
 * 1. Sanity project credentials in .env.local
 *
 * Usage:
 *   node scripts/seed-enablement-dummy-data.js
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

// Audience data to create
const AUDIENCES = [
  { name: 'Sales', slug: 'sales', description: 'Sales team members including AEs and SDRs', order: 10 },
  { name: 'CSM', slug: 'csm', description: 'Customer Success Managers', order: 20 },
  { name: 'SC', slug: 'sc', description: 'Solutions Consultants and Pre-Sales Engineers', order: 30 },
  { name: 'Marketing', slug: 'marketing', description: 'Marketing team members', order: 40 },
  { name: 'Product', slug: 'product', description: 'Product team members', order: 50 },
  { name: 'Leadership', slug: 'leadership', description: 'Leadership and management team members', order: 60 },
  { name: 'All Teams', slug: 'all-teams', description: 'Content relevant to all team members', order: 70 },
]

// Content types data
const CONTENT_TYPES = [
  { name: 'Training', slug: 'training', icon: '🎓', color: '#3B82F6' },
  { name: 'Meeting', slug: 'meeting', icon: '🎥', color: '#8C69F0' },
  { name: 'Guide', slug: 'guide', icon: '📖', color: '#10B981' },
  { name: 'Demo', slug: 'demo', icon: '🖥️', color: '#F97316' },
]

// Helper: Create slug object
function createSlug(text) {
  return {
    _type: 'slug',
    current: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }
}

// Helper: Get date offset
function getDaysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

async function main() {
  console.log('🌱 Starting Enablement Hub Seed Script')
  console.log('─'.repeat(60))

  try {
    // Step 1: Create or fetch audiences
    console.log('\n📚 Creating audience taxonomy...')
    const audienceMap = {}

    for (const audienceData of AUDIENCES) {
      // Check if exists
      const existing = await client.fetch(
        `*[_type == "audience" && slug.current == $slug][0]`,
        { slug: audienceData.slug }
      )

      if (existing) {
        console.log(`  ✓ Audience "${audienceData.name}" already exists`)
        audienceMap[audienceData.name] = existing._id
      } else {
        const created = await client.create({
          _type: 'audience',
          name: audienceData.name,
          slug: createSlug(audienceData.slug),
          description: audienceData.description,
          order: audienceData.order,
        })
        console.log(`  ✓ Created audience "${audienceData.name}"`)
        audienceMap[audienceData.name] = created._id
      }
    }

    // Step 2: Create or fetch content types
    console.log('\n📋 Creating content types...')
    const contentTypeMap = {}

    for (const ctData of CONTENT_TYPES) {
      const existing = await client.fetch(
        `*[_type == "contentType" && slug.current == $slug][0]`,
        { slug: ctData.slug }
      )

      if (existing) {
        console.log(`  ✓ Content type "${ctData.name}" already exists`)
        contentTypeMap[ctData.name] = existing._id
      } else {
        const created = await client.create({
          _type: 'contentType',
          name: ctData.name,
          slug: createSlug(ctData.slug),
          icon: ctData.icon,
          color: ctData.color,
        })
        console.log(`  ✓ Created content type "${ctData.name}"`)
        contentTypeMap[ctData.name] = created._id
      }
    }

    // Step 3: Create 10 diverse dummy enablement entries
    console.log('\n📝 Creating 10 dummy enablement entries...')

    const dummyEntries = [
      {
        title: 'New Hire Onboarding: Welcome to Gladly',
        description: 'Essential training for new team members covering company culture, product overview, and key processes. Perfect for your first week at Gladly.',
        contentType: 'Training',
        audiences: ['All Teams'],
        enablementCategory: ['Learning'],
        publishDate: getDaysAgo(2),
        duration: 45,
        difficulty: 'beginner',
        featured: true,
        priority: 90,
        keyTakeaways: [
          'Understand Gladly\'s mission and values',
          'Navigate the Hero platform basics',
          'Connect with your team and key stakeholders',
          'Set up your development environment',
        ],
        mainContent: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-1',
              title: 'Onboarding Checklist',
              url: 'https://docs.google.com/document',
              type: 'link',
            },
          ],
        },
      },
      {
        title: 'Advanced Product Demo: Customer AI Deep Dive',
        description: 'Master the art of demoing Gladly\'s AI capabilities. Learn proven techniques, handle objections, and customize demos for different industries.',
        contentType: 'Demo',
        audiences: ['Sales', 'SC'],
        enablementCategory: ['Product', 'Toolkit'],
        publishDate: getDaysAgo(5),
        duration: 60,
        difficulty: 'advanced',
        featured: true,
        priority: 85,
        presenter: 'Sarah Chen, Senior SC',
        keyTakeaways: [
          'Demo Customer AI features with confidence',
          'Customize demos for retail, e-commerce, and SaaS',
          'Handle common AI objections effectively',
          'Showcase ROI and business value',
        ],
        mainContent: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-2',
              title: 'Demo Script Template',
              url: 'https://docs.google.com/document',
              type: 'download',
            },
          ],
        },
      },
      {
        title: 'Q4 Product Roadmap Review',
        description: 'Join our quarterly product update covering new features, upcoming releases, and strategic priorities for Q4 2024.',
        contentType: 'Meeting',
        audiences: ['Sales', 'CSM', 'SC', 'Product'],
        enablementCategory: ['Product'],
        publishDate: getDaysAgo(10),
        duration: 30,
        presenter: 'Mike Johnson, VP Product',
        keyTakeaways: [
          'Preview Q4 feature releases',
          'Understand strategic product priorities',
          'Learn about customer-driven enhancements',
          'Get early access to beta features',
        ],
        mainContent: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      },
      {
        title: 'Sales Playbook: Competitive Knockout Strategy',
        description: 'Win against Zendesk, Intercom, and Kustomer with our proven competitive strategy. Includes battle cards, positioning, and real win stories.',
        contentType: 'Guide',
        audiences: ['Sales'],
        enablementCategory: ['Competitive', 'Toolkit'],
        publishDate: getDaysAgo(15),
        duration: 20,
        difficulty: 'intermediate',
        featured: true,
        priority: 80,
        keyTakeaways: [
          'Position Gladly against top competitors',
          'Use battle cards effectively in deals',
          'Leverage customer win stories',
          'Navigate pricing objections',
        ],
        mainContent: {
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-3',
              title: 'Competitive Battle Cards',
              url: 'https://docs.google.com/document',
              type: 'download',
            },
            {
              _type: 'object',
              _key: 'res-4',
              title: 'Win Story Database',
              url: 'https://airtable.com',
              type: 'link',
            },
          ],
        },
      },
      {
        title: 'CSM Excellence: Driving Expansion & Retention',
        description: 'Best practices for customer success managers to drive product adoption, identify expansion opportunities, and reduce churn.',
        contentType: 'Training',
        audiences: ['CSM'],
        enablementCategory: ['Toolkit', 'Learning'],
        publishDate: getDaysAgo(20),
        duration: 50,
        difficulty: 'intermediate',
        keyTakeaways: [
          'Build executive relationships',
          'Run effective QBRs and health checks',
          'Identify and close expansion opportunities',
          'Reduce churn with proactive engagement',
        ],
        mainContent: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-5',
              title: 'QBR Template',
              url: 'https://docs.google.com/presentation',
              type: 'download',
            },
          ],
        },
      },
      {
        title: 'Sidekick for Voice: Implementation Guide',
        description: 'Technical deep-dive into implementing Sidekick Voice. Covers setup, configuration, testing, and best practices for voice AI.',
        contentType: 'Guide',
        audiences: ['SC', 'Product'],
        enablementCategory: ['Product', 'Resources'],
        publishDate: getDaysAgo(25),
        duration: 40,
        difficulty: 'advanced',
        presenter: 'Alex Rivera, Solutions Architect',
        keyTakeaways: [
          'Configure Sidekick Voice for different use cases',
          'Test and validate voice AI performance',
          'Troubleshoot common implementation issues',
          'Optimize for customer experience',
        ],
        mainContent: {
          documentUrl: 'https://docs.google.com/document',
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-6',
              title: 'Implementation Checklist',
              url: 'https://docs.google.com/document',
              type: 'link',
            },
          ],
        },
      },
      {
        title: 'Marketing Launch: New Brand Guidelines',
        description: 'Updated Gladly brand guidelines for 2024. Learn about new visual identity, messaging framework, and content templates.',
        contentType: 'Training',
        audiences: ['Marketing', 'Leadership'],
        enablementCategory: ['Resources'],
        publishDate: getDaysAgo(30),
        duration: 25,
        keyTakeaways: [
          'Apply new brand visual identity',
          'Use updated messaging framework',
          'Access new content templates',
          'Maintain brand consistency',
        ],
        mainContent: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-7',
              title: 'Brand Guidelines PDF',
              url: 'https://drive.google.com',
              type: 'download',
            },
          ],
        },
      },
      {
        title: 'Discovery Best Practices: Qualifying Opportunities',
        description: 'Master the art of discovery calls. Learn MEDDIC qualification, pain point identification, and building compelling business cases.',
        contentType: 'Training',
        audiences: ['Sales', 'SC'],
        enablementCategory: ['Toolkit', 'Learning'],
        publishDate: getDaysAgo(40),
        duration: 35,
        difficulty: 'beginner',
        keyTakeaways: [
          'Run effective discovery calls',
          'Qualify opportunities with MEDDIC',
          'Identify and quantify pain points',
          'Build compelling business cases',
        ],
        mainContent: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-8',
              title: 'Discovery Call Template',
              url: 'https://docs.google.com/document',
              type: 'link',
            },
          ],
        },
      },
      {
        title: 'Team Call: Sales Leadership Updates',
        description: 'Monthly sales team meeting covering pipeline updates, new initiatives, team wins, and upcoming priorities.',
        contentType: 'Meeting',
        audiences: ['Sales', 'Leadership'],
        enablementCategory: ['CoE'],
        publishDate: getDaysAgo(50),
        duration: 45,
        presenter: 'Jennifer Smith, VP Sales',
        keyTakeaways: [
          'Review Q3 pipeline and forecast',
          'Celebrate team wins and learnings',
          'Align on Q4 priorities',
          'Share competitive intelligence',
        ],
        mainContent: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      },
      {
        title: 'Product Certification: Hero Platform Fundamentals',
        description: 'Complete certification course covering Hero platform architecture, key features, and use cases. Required for all customer-facing roles.',
        contentType: 'Guide',
        audiences: ['Sales', 'CSM', 'SC'],
        enablementCategory: ['Learning', 'Product'],
        publishDate: getDaysAgo(60),
        duration: 90,
        difficulty: 'beginner',
        keyTakeaways: [
          'Understand Hero platform architecture',
          'Navigate key platform features',
          'Explain use cases by vertical',
          'Earn Hero Platform certification',
        ],
        mainContent: {
          documentUrl: 'https://academy.gladly.com',
          additionalResources: [
            {
              _type: 'object',
              _key: 'res-9',
              title: 'Certification Exam',
              url: 'https://academy.gladly.com/exam',
              type: 'link',
            },
            {
              _type: 'object',
              _key: 'res-10',
              title: 'Study Guide',
              url: 'https://docs.google.com/document',
              type: 'download',
            },
          ],
        },
      },
    ]

    const createdEntries = []

    for (const entry of dummyEntries) {
      // Build audience references
      const audienceRefs = entry.audiences.map(audienceName => ({
        _type: 'reference',
        _ref: audienceMap[audienceName],
        _key: `aud-${audienceMap[audienceName]}`,
      }))

      // Build catalog entry
      const catalogEntry = {
        _type: 'catalogEntry',
        title: entry.title,
        slug: createSlug(entry.title),
        description: entry.description,
        contentType: {
          _type: 'reference',
          _ref: contentTypeMap[entry.contentType],
        },
        pageTemplate: 'training-session',
        format: entry.contentType === 'Guide' ? 'async' : 'live-replay',
        audiences: audienceRefs,
        enablementCategory: entry.enablementCategory,
        publishDate: entry.publishDate,
        duration: entry.duration,
        difficulty: entry.difficulty,
        presenter: entry.presenter,
        mainContent: entry.mainContent,
        keyTakeaways: entry.keyTakeaways,
        featured: entry.featured || false,
        priority: entry.priority || 50,
        publishedTo: ['enablement'],
        status: 'published',
      }

      const created = await client.create(catalogEntry)
      createdEntries.push(created)
      console.log(`  ✓ Created: "${entry.title}"`)
    }

    // Step 4: Summary
    console.log('\n' + '='.repeat(60))
    console.log('✨ Seed Script Complete!')
    console.log('='.repeat(60))
    console.log(`✅ Created ${AUDIENCES.length} audience taxonomy entries`)
    console.log(`✅ Created ${CONTENT_TYPES.length} content type entries`)
    console.log(`✅ Created ${createdEntries.length} dummy enablement entries`)
    console.log('\n📊 Entry Breakdown:')
    console.log(`  - Featured: ${createdEntries.filter(e => e.featured).length}`)
    console.log(`  - Training: ${dummyEntries.filter(e => e.contentType === 'Training').length}`)
    console.log(`  - Guides: ${dummyEntries.filter(e => e.contentType === 'Guide').length}`)
    console.log(`  - Meetings: ${dummyEntries.filter(e => e.contentType === 'Meeting').length}`)
    console.log(`  - Demos: ${dummyEntries.filter(e => e.contentType === 'Demo').length}`)
    console.log('\n🎓 Visit http://localhost:3000/enablement-hub to see your hub!')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

// Run seed script
main()
  .then(() => {
    console.log('\n✅ Seed script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seed script failed:', error)
    process.exit(1)
  })
