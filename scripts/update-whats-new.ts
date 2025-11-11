import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const whatsNewSection = {
  _type: 'whatsNewSection',
  _key: 'whatsNew',
  badgeText: 'OCT 2025',
  updates: [
    {
      _key: 'update1',
      date: 'OCTOBER 1, 2025',
      emoji: '📦',
      title: 'Conversation Reviewer Enhancements',
      description: "Improve visibility into Sidekick's response reasoning to help customers make targeted improvements.",
      links: [
        {
          _key: 'link1',
          text: 'Product Guide',
          url: '#',
        },
        {
          _key: 'link2',
          text: 'Training Materials',
          url: '#',
        },
      ],
    },
    {
      _key: 'update2',
      date: 'OCTOBER 1, 2025',
      emoji: '🎯',
      title: 'Guide-Level Advice',
      description: 'Customize advice at the individual guide level to support tailored tone and coaching.',
      links: [
        {
          _key: 'link1',
          text: 'Documentation',
          url: '#',
        },
        {
          _key: 'link2',
          text: 'Demo Setup',
          url: '#',
        },
      ],
    },
    {
      _key: 'update3',
      date: 'SEPTEMBER 28, 2025',
      emoji: '💰',
      title: 'Cost Tracking for Sidekick Sales',
      description: 'Track costs and explore optimizations as Sidekick Sales scales.',
      links: [
        {
          _key: 'link1',
          text: 'Feature Overview',
          url: '#',
        },
        {
          _key: 'link2',
          text: 'Customer FAQ',
          url: '#',
        },
      ],
    },
  ],
}

async function updateWhatsNew() {
  try {
    console.log('🔍 Checking for existing homepage document...')

    // Check if homepage document exists
    const existingHomepage = await client.fetch(
      `*[_type == "homepage"][0]{ _id, _rev, pageBuilder }`
    )

    if (existingHomepage) {
      console.log('📝 Updating homepage Page Builder...')

      // Get existing pageBuilder array or create empty one
      const currentPageBuilder = existingHomepage.pageBuilder || []

      // Remove any existing What's New section
      const filteredPageBuilder = currentPageBuilder.filter(
        (section: any) => section._type !== 'whatsNewSection'
      )

      // Add the new What's New section
      const updatedPageBuilder = [...filteredPageBuilder, whatsNewSection]

      // Create or replace the entire document with write token
      await client
        .createOrReplace({
          _type: 'homepage',
          _id: existingHomepage._id,
          pageBuilder: updatedPageBuilder,
        })

      console.log('✅ Successfully added What\'s New section to Page Builder!')
      console.log(`📍 View in Studio: http://localhost:3000/studio/structure/homepage`)
      console.log(`🌐 View on Site: http://localhost:3000`)
    } else {
      console.log('❌ No homepage document found. Creating one...')

      // Create homepage with What's New section
      await client.create({
        _type: 'homepage',
        pageBuilder: [whatsNewSection],
      })

      console.log('✅ Created homepage with What\'s New section!')
      console.log(`📍 View in Studio: http://localhost:3000/studio/structure/homepage`)
      console.log(`🌐 View on Site: http://localhost:3000`)
    }
  } catch (error) {
    console.error('❌ Error updating What\'s New:', error)
    throw error
  }
}

updateWhatsNew()
