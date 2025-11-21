/**
 * Seed Script: Create Dummy Enablements for Learning Paths
 *
 * This script creates dummy enablements tagged to learning paths
 * so you can test the enablement hub experience.
 *
 * All entries are prefixed with "[DEMO]" for easy identification and deletion.
 *
 * Prerequisites:
 * 1. Run seed-learning-paths.js first to create learning paths
 * 2. Run seed-enablement-dummy-data.js to create audiences and content types
 *
 * Usage:
 *   node scripts/seed-learning-path-enablements.js
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

// Helper: Get date offset
function getDaysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

async function main() {
  console.log('🚀 Starting Learning Path Enablements Seed Script')
  console.log('─'.repeat(60))

  try {
    // Fetch learning paths
    console.log('\n📚 Fetching learning paths...')
    const learningPaths = await client.fetch(`*[_type == "learningPath"]{ _id, name, slug }`)
    console.log(`✓ Found ${learningPaths.length} learning paths`)

    if (learningPaths.length === 0) {
      console.log('\n⚠️  No learning paths found. Please run seed-learning-paths.js first.')
      process.exit(1)
    }

    // Create lookup map
    const learningPathMap = {}
    learningPaths.forEach(lp => {
      learningPathMap[lp.slug.current] = lp._id
    })

    // Fetch audiences and content types
    console.log('\n👥 Fetching audiences and content types...')
    const [audiences, contentTypes] = await Promise.all([
      client.fetch('*[_type == "audience"]{ _id, name, slug }'),
      client.fetch('*[_type == "contentType"]{ _id, name, slug }'),
    ])

    console.log(`✓ Found ${audiences.length} audiences`)
    console.log(`✓ Found ${contentTypes.length} content types`)

    if (audiences.length === 0 || contentTypes.length === 0) {
      console.log('\n⚠️  Missing audiences or content types. Please run seed-enablement-dummy-data.js first.')
      process.exit(1)
    }

    // Create lookup maps
    const audienceMap = {}
    audiences.forEach(a => {
      audienceMap[a.name] = a._id
    })

    const contentTypeMap = {}
    contentTypes.forEach(ct => {
      contentTypeMap[ct.name] = ct._id
    })

    // Dummy enablements data
    const dummyEnablements = [
      // New Hire Onboarding (5 entries)
      {
        title: '[DEMO] Welcome to Gladly - First Week Essentials',
        description: 'Your complete guide to getting started at Gladly. Learn about our culture, values, and how to navigate your first week.',
        contentType: 'Training',
        audiences: ['All Teams'],
        learningPaths: ['new-hire-onboarding'],
        enablementCategory: ['Learning'],
        publishDate: getDaysAgo(3),
        duration: 30,
        difficulty: 'beginner',
        featured: true,
        priority: 90,
        keyTakeaways: [
          'Understand Gladly\'s mission and values',
          'Meet your team and key stakeholders',
          'Set up your workspace and tools',
        ],
      },
      {
        title: '[DEMO] Gladly Platform Basics',
        description: 'Introduction to the Gladly Hero platform. Learn the interface, key features, and basic navigation.',
        contentType: 'Training',
        audiences: ['All Teams'],
        learningPaths: ['new-hire-onboarding'],
        enablementCategory: ['Learning', 'Product'],
        publishDate: getDaysAgo(5),
        duration: 45,
        difficulty: 'beginner',
        keyTakeaways: [
          'Navigate the Hero platform',
          'Understand core features',
          'Create your first customer interaction',
        ],
      },
      {
        title: '[DEMO] Customer Success Fundamentals',
        description: 'Learn the fundamentals of customer success at Gladly and how to deliver exceptional customer experiences.',
        contentType: 'Guide',
        audiences: ['CSM', 'Sales'],
        learningPaths: ['new-hire-onboarding'],
        enablementCategory: ['Learning'],
        publishDate: getDaysAgo(7),
        duration: 35,
        difficulty: 'beginner',
        keyTakeaways: [
          'Understand customer success principles',
          'Learn Gladly\'s approach to CX',
          'Build strong customer relationships',
        ],
      },
      {
        title: '[DEMO] Your First 30 Days Checklist',
        description: 'Complete checklist for your first month at Gladly. Track your progress and ensure you cover all essential onboarding topics.',
        contentType: 'Guide',
        audiences: ['All Teams'],
        learningPaths: ['new-hire-onboarding'],
        enablementCategory: ['Learning'],
        publishDate: getDaysAgo(10),
        duration: 15,
        difficulty: 'beginner',
        keyTakeaways: [
          'Complete onboarding milestones',
          'Build foundational knowledge',
          'Connect with key team members',
        ],
      },
      {
        title: '[DEMO] Tools & Resources Overview',
        description: 'Master the tools you\'ll use daily at Gladly including Slack, Google Workspace, and internal systems.',
        contentType: 'Training',
        audiences: ['All Teams'],
        learningPaths: ['new-hire-onboarding'],
        enablementCategory: ['Resources'],
        publishDate: getDaysAgo(12),
        duration: 25,
        difficulty: 'beginner',
        keyTakeaways: [
          'Access essential tools',
          'Navigate internal resources',
          'Get help when you need it',
        ],
      },

      // Product Mastery (5 entries)
      {
        title: '[DEMO] Advanced Customer AI Features',
        description: 'Deep dive into Gladly\'s AI capabilities including sentiment analysis, intent detection, and automated responses.',
        contentType: 'Demo',
        audiences: ['Sales', 'SC', 'Product'],
        learningPaths: ['product-mastery'],
        enablementCategory: ['Product'],
        publishDate: getDaysAgo(2),
        duration: 50,
        difficulty: 'advanced',
        featured: true,
        priority: 85,
        presenter: 'Sarah Chen, Senior SC',
        keyTakeaways: [
          'Configure AI-powered features',
          'Optimize sentiment analysis',
          'Demonstrate ROI to customers',
        ],
      },
      {
        title: '[DEMO] Omnichannel Routing Mastery',
        description: 'Master Gladly\'s intelligent routing system to optimize agent workload and customer experience.',
        contentType: 'Training',
        audiences: ['SC', 'CSM'],
        learningPaths: ['product-mastery'],
        enablementCategory: ['Product'],
        publishDate: getDaysAgo(6),
        duration: 40,
        difficulty: 'intermediate',
        keyTakeaways: [
          'Configure routing rules',
          'Balance agent workloads',
          'Improve response times',
        ],
      },
      {
        title: '[DEMO] Integration Deep Dive: Shopify',
        description: 'Technical walkthrough of Gladly\'s Shopify integration including setup, customization, and best practices.',
        contentType: 'Training',
        audiences: ['SC', 'Product'],
        learningPaths: ['product-mastery'],
        enablementCategory: ['Product', 'Resources'],
        publishDate: getDaysAgo(8),
        duration: 55,
        difficulty: 'advanced',
        presenter: 'Alex Rivera, Solutions Architect',
        keyTakeaways: [
          'Install and configure Shopify integration',
          'Customize data sync settings',
          'Troubleshoot common issues',
        ],
      },
      {
        title: '[DEMO] Reporting & Analytics Best Practices',
        description: 'Learn to create powerful reports and dashboards that drive business decisions and demonstrate value.',
        contentType: 'Training',
        audiences: ['CSM', 'SC', 'Leadership'],
        learningPaths: ['product-mastery'],
        enablementCategory: ['Product'],
        publishDate: getDaysAgo(11),
        duration: 45,
        difficulty: 'intermediate',
        keyTakeaways: [
          'Build custom reports',
          'Track key metrics',
          'Present insights to stakeholders',
        ],
      },
      {
        title: '[DEMO] Product Roadmap Q1 2025',
        description: 'Preview upcoming features and enhancements coming in Q1 2025. Learn what\'s next for Gladly.',
        contentType: 'Meeting',
        audiences: ['Sales', 'CSM', 'SC', 'Product'],
        learningPaths: ['product-mastery'],
        enablementCategory: ['Product'],
        publishDate: getDaysAgo(1),
        duration: 30,
        presenter: 'Mike Johnson, VP Product',
        featured: true,
        priority: 80,
        keyTakeaways: [
          'Understand Q1 feature releases',
          'Plan customer conversations',
          'Leverage beta programs',
        ],
      },

      // Sales Excellence (5 entries)
      {
        title: '[DEMO] Discovery Call Framework',
        description: 'Master the art of discovery with our proven framework. Learn to qualify opportunities and uncover pain points.',
        contentType: 'Training',
        audiences: ['Sales', 'SC'],
        learningPaths: ['sales-excellence'],
        enablementCategory: ['Toolkit', 'Learning'],
        publishDate: getDaysAgo(4),
        duration: 40,
        difficulty: 'intermediate',
        featured: true,
        priority: 85,
        keyTakeaways: [
          'Run effective discovery calls',
          'Qualify with MEDDIC',
          'Identify decision makers',
        ],
      },
      {
        title: '[DEMO] Competitive Battle Cards: Zendesk',
        description: 'Win against Zendesk with our proven competitive strategy, positioning, and objection handling.',
        contentType: 'Guide',
        audiences: ['Sales'],
        learningPaths: ['sales-excellence'],
        enablementCategory: ['Competitive', 'Toolkit'],
        publishDate: getDaysAgo(9),
        duration: 20,
        difficulty: 'intermediate',
        keyTakeaways: [
          'Position Gladly vs Zendesk',
          'Handle pricing objections',
          'Leverage customer wins',
        ],
      },
      {
        title: '[DEMO] ROI Calculator Workshop',
        description: 'Learn to build compelling business cases using Gladly\'s ROI calculator and value selling techniques.',
        contentType: 'Training',
        audiences: ['Sales', 'SC'],
        learningPaths: ['sales-excellence'],
        enablementCategory: ['Toolkit'],
        publishDate: getDaysAgo(13),
        duration: 35,
        difficulty: 'intermediate',
        keyTakeaways: [
          'Build quantified business cases',
          'Calculate customer ROI',
          'Present value to executives',
        ],
      },
      {
        title: '[DEMO] Handling Objections Masterclass',
        description: 'Turn objections into opportunities with proven techniques for handling the most common sales objections.',
        contentType: 'Training',
        audiences: ['Sales'],
        learningPaths: ['sales-excellence'],
        enablementCategory: ['Toolkit', 'Learning'],
        publishDate: getDaysAgo(15),
        duration: 45,
        difficulty: 'advanced',
        keyTakeaways: [
          'Anticipate common objections',
          'Use proven response frameworks',
          'Build customer confidence',
        ],
      },
      {
        title: '[DEMO] Closing Techniques & Negotiation',
        description: 'Advanced strategies for closing deals and negotiating win-win agreements with enterprise customers.',
        contentType: 'Training',
        audiences: ['Sales', 'Leadership'],
        learningPaths: ['sales-excellence'],
        enablementCategory: ['Toolkit'],
        publishDate: getDaysAgo(18),
        duration: 50,
        difficulty: 'advanced',
        keyTakeaways: [
          'Navigate complex negotiations',
          'Close enterprise deals',
          'Manage procurement processes',
        ],
      },
    ]

    // Create enablements
    console.log('\n📝 Creating dummy enablements...')
    const createdEntries = []

    for (const entry of dummyEnablements) {
      // Build audience references
      const audienceRefs = entry.audiences.map(audienceName => ({
        _type: 'reference',
        _ref: audienceMap[audienceName],
        _key: `aud-${audienceMap[audienceName]}`,
      }))

      // Build learning path references
      const learningPathRefs = entry.learningPaths.map(lpSlug => ({
        _type: 'reference',
        _ref: learningPathMap[lpSlug],
        _key: `lp-${learningPathMap[lpSlug]}`,
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
        learningPaths: learningPathRefs,
        enablementCategory: entry.enablementCategory,
        publishDate: entry.publishDate,
        duration: entry.duration,
        difficulty: entry.difficulty,
        presenter: entry.presenter,
        mainContent: {
          videoUrl: entry.contentType !== 'Guide' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : undefined,
        },
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

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('✨ Seed Script Complete!')
    console.log('='.repeat(60))
    console.log(`✅ Created ${createdEntries.length} dummy enablements`)

    console.log('\n📊 Breakdown by Learning Path:')
    console.log(`  🎓 New Hire Onboarding: ${dummyEnablements.filter(e => e.learningPaths.includes('new-hire-onboarding')).length}`)
    console.log(`  🛠️  Product Mastery: ${dummyEnablements.filter(e => e.learningPaths.includes('product-mastery')).length}`)
    console.log(`  💼 Sales Excellence: ${dummyEnablements.filter(e => e.learningPaths.includes('sales-excellence')).length}`)

    console.log('\n🎯 Visit http://localhost:3000/enablement-hub to see the experience!')

    console.log('\n🗑️  To remove all demo enablements later:')
    console.log('   1. Go to Sanity Studio')
    console.log('   2. Filter catalog entries by title containing "[DEMO]"')
    console.log('   3. Delete all matching entries')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error(error)
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
