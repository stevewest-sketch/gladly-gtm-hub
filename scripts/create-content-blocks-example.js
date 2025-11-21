import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Helper to create slug
function createSlug(text) {
  return {
    _type: 'slug',
    current: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  }
}

async function createContentBlocksExample() {
  console.log('🚀 Creating enablement with content blocks...')

  // First, get the necessary reference IDs
  const contentTypes = await client.fetch(`*[_type == "contentType"]{ _id, name }`)
  const audiences = await client.fetch(`*[_type == "audience"]{ _id, name }`)
  const learningPaths = await client.fetch(`*[_type == "learningPath"]{ _id, name }`)
  const products = await client.fetch(`*[_type == "product"]{ _id, name }`)

  // Create reference maps
  const contentTypeMap = {}
  contentTypes.forEach(ct => { contentTypeMap[ct.name] = ct._id })

  const audienceMap = {}
  audiences.forEach(a => { audienceMap[a.name] = a._id })

  const learningPathMap = {}
  learningPaths.forEach(lp => { learningPathMap[lp.name] = lp._id })

  const productMap = {}
  products.forEach(p => { productMap[p.name] = p._id })

  // Create the enablement with content blocks
  const enablementWithBlocks = {
    _type: 'catalogEntry',
    title: 'Advanced Customer Service Techniques - Complete Guide',
    slug: createSlug('advanced-customer-service-techniques-complete-guide'),
    description: 'Master advanced customer service techniques with this comprehensive guide covering best practices, common pitfalls, and real-world use cases. Perfect for customer service teams looking to elevate their support game.',
    contentType: { _type: 'reference', _ref: contentTypeMap['Training'] || contentTypes[0]._id },
    pageTemplate: 'training-session',
    format: 'async',

    // Main Content
    mainContent: {
      wistiaId: 'customer-service-101',
      transcript: `Welcome to Advanced Customer Service Techniques!

In this comprehensive training, we'll cover everything you need to know to provide exceptional customer service. We'll explore best practices, examine common mistakes, and dive into real-world use cases that will help you handle even the most challenging customer interactions.

Throughout this session, we'll focus on practical, actionable techniques that you can start using immediately to improve customer satisfaction and build stronger relationships with your customers.

Let's get started!`,
      additionalResources: [
        { title: 'Customer Service Best Practices Playbook', url: 'https://example.com/playbook', type: 'download' },
        { title: 'Support Scripts Library', url: 'https://example.com/scripts', type: 'link' },
      ],
    },

    // Key Takeaways
    keyTakeaways: [
      'Master the art of active listening and empathetic responses',
      'Learn proven de-escalation techniques for challenging situations',
      'Understand how to balance speed with quality in customer interactions',
      'Discover strategies for turning negative experiences into positive outcomes',
    ],

    // Content Blocks - demonstrating all types
    contentBlocks: [
      // 1. How to Use
      {
        _type: 'object',
        _key: 'how-to-use-block',
        blockType: 'howToUse',
        title: 'How to Apply These Techniques',
        collapsible: false,
        content: [
          {
            _type: 'block',
            _key: 'how-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'These customer service techniques are designed to be applied immediately in your daily interactions. Start by focusing on one technique at a time, master it, then move to the next.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'how-2',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Quick Start Guide',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'how-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Begin with active listening in your next 5 customer conversations. Focus solely on understanding before responding. Then, incorporate empathetic language patterns into your responses.',
              },
            ],
          },
        ],
      },

      // 2. Step-by-Step Guide
      {
        _type: 'object',
        _key: 'deescalation-steps',
        blockType: 'stepByStep',
        title: 'De-escalation Framework',
        collapsible: true,
        steps: [
          {
            stepTitle: 'Acknowledge the Emotion',
            stepDescription: 'Start by recognizing and validating the customer\'s feelings. Use phrases like "I understand this is frustrating" or "I can see why this is concerning for you."',
          },
          {
            stepTitle: 'Take Ownership',
            stepDescription: 'Even if the issue wasn\'t directly your fault, take ownership of finding a solution. Say "Let me help you resolve this" instead of "That\'s not my department."',
          },
          {
            stepTitle: 'Clarify the Issue',
            stepDescription: 'Ask clarifying questions to fully understand the problem. This shows you care and ensures you\'re solving the right issue.',
          },
          {
            stepTitle: 'Present Solutions',
            stepDescription: 'Offer 2-3 concrete solutions when possible. Giving options empowers the customer and shows you\'re flexible.',
          },
          {
            stepTitle: 'Follow Through',
            stepDescription: 'Confirm the solution works and follow up as promised. This builds trust and turns a negative experience positive.',
          },
        ],
      },

      // 3. Tips & Best Practices
      {
        _type: 'object',
        _key: 'tips-block',
        blockType: 'tips',
        title: 'Pro Tips for Excellence',
        collapsible: false,
        content: [
          {
            _type: 'block',
            _key: 'tip-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: 'Use the customer\'s name',
              },
              {
                _type: 'span',
                text: ' - Personalization creates connection and shows you see them as an individual, not a ticket number.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'tip-2',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: 'Mirror their communication style',
              },
              {
                _type: 'span',
                text: ' - If they\'re formal, be professional. If they\'re casual, match that energy. This builds rapport quickly.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'tip-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: 'Always end with next steps',
              },
              {
                _type: 'span',
                text: ' - Never leave a customer hanging. Clearly state what happens next, even if it\'s just "I\'ll follow up in 24 hours."',
              },
            ],
          },
        ],
      },

      // 4. Common Mistakes
      {
        _type: 'object',
        _key: 'mistakes-block',
        blockType: 'mistakes',
        title: 'Pitfalls to Avoid',
        collapsible: true,
        content: [
          {
            _type: 'block',
            _key: 'mistake-1',
            style: 'h4',
            children: [
              {
                _type: 'span',
                text: '❌ Over-promising to close the ticket',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'mistake-1-desc',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Never promise what you can\'t deliver. Under-promise and over-deliver instead.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'mistake-2',
            style: 'h4',
            children: [
              {
                _type: 'span',
                text: '❌ Using jargon or technical language',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'mistake-2-desc',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Speak in plain language. What\'s obvious to you might be confusing to the customer.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'mistake-3',
            style: 'h4',
            children: [
              {
                _type: 'span',
                text: '❌ Defending the company instead of listening',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'mistake-3-desc',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Your job is to solve problems, not win arguments. Listen first, defend later (if at all).',
              },
            ],
          },
        ],
      },

      // 5. Use Cases
      {
        _type: 'object',
        _key: 'use-cases-block',
        blockType: 'useCases',
        title: 'Real-World Scenarios',
        collapsible: true,
        content: [
          {
            _type: 'block',
            _key: 'case-1',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Scenario 1: The Angry Customer',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'case-1-desc',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['em'],
                text: 'Situation: ',
              },
              {
                _type: 'span',
                text: 'Customer received wrong product twice and is furious.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'case-1-solution',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: 'Approach: ',
              },
              {
                _type: 'span',
                text: 'Acknowledge their frustration, take full ownership, expedite correct shipment with premium shipping (free), offer 20% discount on next order, personally monitor fulfillment.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'case-2',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Scenario 2: The Confused Customer',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'case-2-desc',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['em'],
                text: 'Situation: ',
              },
              {
                _type: 'span',
                text: 'Customer can\'t figure out how to use a product feature and is getting frustrated.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'case-2-solution',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: 'Approach: ',
              },
              {
                _type: 'span',
                text: 'Normalize the confusion ("This trips up a lot of people at first!"), offer step-by-step walkthrough, share video tutorial, check in after 24 hours to ensure success.',
              },
            ],
          },
        ],
      },

      // 6. FAQ
      {
        _type: 'object',
        _key: 'faq-block',
        blockType: 'faq',
        title: 'Frequently Asked Questions',
        collapsible: true,
        faqs: [
          {
            question: 'How do I balance speed with quality in customer service?',
            answer: 'Focus on efficiency, not speed. Use templates for common issues but personalize them. Solve the issue right the first time rather than rushing and creating follow-up work. Your average handle time will naturally improve as you master these techniques.',
          },
          {
            question: 'What if the customer is asking for something I can\'t provide?',
            answer: 'Be honest and transparent. Explain why you can\'t fulfill the request, then offer alternatives. Focus on what you CAN do rather than what you can\'t. Sometimes the best answer is "I can\'t do X, but I can do Y which will accomplish the same goal."',
          },
          {
            question: 'How do I handle a customer who keeps escalating even after I\'ve offered solutions?',
            answer: 'Some customers need to be heard by someone "higher up." In these cases, facilitate the escalation gracefully. Brief your manager on the situation, set expectations with the customer about response time, and follow up to ensure resolution.',
          },
          {
            question: 'Should I ever push back on unreasonable customer demands?',
            answer: 'Yes, but tactfully. Use the "feel, felt, found" technique: "I understand how you feel. Others have felt the same way. What they found is..." This validates their feelings while guiding them to a reasonable resolution.',
          },
        ],
      },

      // 7. Data & Stats
      {
        _type: 'object',
        _key: 'data-block',
        blockType: 'dataStats',
        title: 'Impact Metrics',
        collapsible: false,
        content: [
          {
            _type: 'block',
            _key: 'stat-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: '📈 86% of customers',
              },
              {
                _type: 'span',
                text: ' say they would pay more for a better customer experience.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'stat-2',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: '🎯 70% of buying experiences',
              },
              {
                _type: 'span',
                text: ' are based on how customers feel they are being treated.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'stat-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: '⚡ First response time',
              },
              {
                _type: 'span',
                text: ' has the biggest impact on customer satisfaction - every minute counts.',
              },
            ],
          },
          {
            _type: 'block',
            _key: 'stat-4',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: ['strong'],
                text: '🔁 Repeat customers',
              },
              {
                _type: 'span',
                text: ' spend 67% more than new customers on average.',
              },
            ],
          },
        ],
      },
    ],

    // Metadata
    duration: 35,
    difficulty: 'intermediate',
    presenter: 'Jessica Martinez, Customer Success Lead',
    publishDate: new Date().toISOString(),

    // Taxonomies
    audiences: audienceMap['Customer Success Manager'] ? [
      { _type: 'reference', _ref: audienceMap['Customer Success Manager'] },
    ] : [],
    learningPaths: learningPathMap['Product Mastery'] ? [
      { _type: 'reference', _ref: learningPathMap['Product Mastery'] },
    ] : [],
    enablementCategory: ['Learning', 'Toolkit'],

    // Publishing
    status: 'published',
    publishedTo: ['enablement'],
    featured: true,
    priority: 90,
  }

  try {
    const result = await client.create(enablementWithBlocks)
    console.log('✅ Successfully created enablement with content blocks!')
    console.log(`   Title: ${result.title}`)
    console.log(`   ID: ${result._id}`)
    console.log(`   Slug: ${result.slug.current}`)
    console.log(`   Content Blocks: ${result.contentBlocks.length}`)
    console.log('\n📋 Content Block Types:')
    result.contentBlocks.forEach((block, i) => {
      console.log(`   ${i + 1}. ${block.blockType} - "${block.title}"`)
    })
    console.log('\n🔗 View at: http://localhost:3000/catalog/' + result.slug.current)
  } catch (error) {
    console.error('❌ Error creating enablement:', error)
  }
}

createContentBlocksExample()
