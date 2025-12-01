/**
 * Seed AI Context Documents for @sanity/assist
 *
 * Creates context documents that guide AI content generation.
 *
 * Usage:
 *   npx ts-node sanity/migrations/seedAIContextDocs.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const contextDocuments = [
  {
    _id: 'sanity.assist.instruction.context.gladly-style-guide',
    _type: 'sanity.assist.instruction.context',
    title: 'Gladly GTM Content Style Guide',
    context: `# Gladly GTM Content Style Guide

## Tone & Voice
- Professional but approachable
- Action-oriented and direct
- Confident without being arrogant
- Helpful and supportive of the GTM team

## Target Audience
GTM team members including:
- Sales Representatives
- Customer Success Managers
- Sales Engineers (SEs)
- Sales Leaders

## Format Preferences

### Titles
- Clear and action-oriented
- Start with verbs when possible (e.g., "Master the Discovery Call", "Navigate Competitive Deals")
- Keep concise (under 60 characters)

### Descriptions
- 1-2 sentences maximum
- Focus on the value/outcome for the reader
- Answer "why should I care about this?"

### Key Takeaways
- 3-5 takeaways per piece of content
- Specific and actionable (start with verbs)
- Focus on what someone can DO with this information
- Examples: "Ask about current ticket volume in discovery" NOT "Ticket volume is important"

### General Writing
- Use short paragraphs (2-3 sentences)
- Prefer bullet points for lists
- Avoid jargon unless it's Gladly-specific terminology
- Write for scanability

## Gladly Terminology (ALWAYS USE)
- "Hero" = our core agent desktop product
- "Sidekick" = our AI/automation product suite
- "Customer" NOT "client"
- "Agent" NOT "representative" or "rep"
- "Conversation" NOT "ticket"
- "People Match" = our customer recognition technology
- "Radically Personal Service" = our brand promise

## Terminology to Avoid
- "Ticket" (use "conversation")
- "Client" (use "customer")
- "Rep" or "representative" (use "agent")
- Overly technical jargon without explanation
- Buzzwords without substance`,
  },
  {
    _id: 'sanity.assist.instruction.context.catalog-entry-rules',
    _type: 'sanity.assist.instruction.context',
    title: 'Catalog Entry Generation Rules',
    context: `# Catalog Entry Content Generation Rules

## For Training Sessions (pageTemplate: "training")

### Key Takeaways
- Extract 3-5 key takeaways from the content
- Each takeaway should be actionable (start with a verb)
- Focus on what the learner can DO after watching
- Include specific tactics or techniques mentioned
- Example: "Use the 3-step objection framework: Acknowledge, Explore, Respond"

### Tips & Pitfalls
- Identify any action items or next steps mentioned
- Note common mistakes or pitfalls to avoid
- Include any "pro tips" from the presenter
- Format as actionable warnings or recommendations

### Resources
- Note any tools, templates, or resources mentioned
- Link to referenced materials when available
- Include any follow-up reading or watching suggestions

## For Playbooks (pageTemplate: "playbook")

### Process Steps
- Break content into clear sequential steps (typically 4-8 steps)
- Each step needs:
  - A clear heading (action-oriented, e.g., "Prepare Your Discovery Questions")
  - A 2-3 sentence explanation of what to do
  - Any specific scripts or examples if mentioned

### Tips Section
- Include tips and common pitfalls where mentioned
- Add "Do this / Don't do this" guidance
- Note any exceptions or special cases

### Structure
- Start with context/overview
- Follow with step-by-step process
- End with tips and resources

## For Battle Cards (pageTemplate: "battle-card")

### Competitive Focus
- Lead with competitive differentiators
- Be specific about what makes Gladly different
- Use concrete comparisons, not vague claims

### Talking Points
- Extract specific phrases reps can use
- Include "when they say X, you say Y" handlers
- Note any proof points or customer examples

### Objection Handlers
- Identify common objections mentioned
- Provide specific response frameworks
- Include supporting evidence or examples

### Structure
- Quick overview (1 paragraph)
- Key differentiators (3-5 bullets)
- Common objections + handlers
- Proof points / customer evidence`,
  },
]

async function seedContextDocs() {
  console.log('🤖 Seeding AI Context Documents for @sanity/assist\n')

  for (const doc of contextDocuments) {
    try {
      // Check if document exists
      const existing = await client.getDocument(doc._id)

      if (existing) {
        console.log(`⏭️  "${doc.title}" already exists, updating...`)
        await client.patch(doc._id).set(doc).commit()
        console.log(`✅ Updated: "${doc.title}"`)
      } else {
        await client.create(doc)
        console.log(`✅ Created: "${doc.title}"`)
      }
    } catch (error: any) {
      console.error(`❌ Error with "${doc.title}": ${error.message}`)
    }
  }

  console.log('\n✅ AI Context documents seeded!')
  console.log('\nNext steps:')
  console.log('1. Open Sanity Studio')
  console.log('2. Go to any catalogEntry document')
  console.log('3. Click the sparkle icon to use AI Assist')
  console.log('4. The context documents will guide AI generation')
}

seedContextDocs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed:', error)
    process.exit(1)
  })
