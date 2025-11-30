/**
 * Seed Script: Gladly Revenue Hub - Complete Link Catalog
 *
 * This script:
 * 1. Deletes all existing catalog entries
 * 2. Creates new entries for Content Hub, Enablement Hub, Internal Hub, and RevOps Tools
 *
 * Run with: npx tsx --env-file=.env.local scripts/seed-revenue-hub.ts
 */

import { createClient } from '@sanity/client'

// Verify environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('Run with: npx tsx --env-file=.env.local scripts/seed-revenue-hub.ts')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('Missing SANITY_API_TOKEN')
  console.error('Add SANITY_API_TOKEN to .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

console.log('Sanity Config:')
console.log(`  Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
console.log(`  Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)
console.log(`  Token: ${process.env.SANITY_API_TOKEN ? 'Set' : 'Missing'}\n`)

// Helper to generate slugs
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 96)
}

// ========================================
// CONTENT DATA (External-Facing)
// ========================================

const SLIDE_DECKS = [
  {
    id: 'deck-exec-briefing',
    title: 'Executive Briefing Deck Template',
    description: 'High-level presentation template for C-suite meetings',
    date: '2025-11-17',
    products: ['classic', 'voice'],
    template: true,
    url: null,
  },
  {
    id: 'deck-ebr',
    title: 'Executive Business Review (EBR)',
    description: 'Quarterly business review presentation template',
    date: '2025-11-14',
    products: ['sidekick', 'classic'],
    template: true,
    url: null,
  },
  {
    id: 'deck-first-meeting',
    title: 'First Meeting Deck',
    description: 'Initial prospect meeting presentation',
    date: '2025-11-10',
    products: ['sidekick', 'classic', 'voice'],
    template: true,
    url: null,
  },
  {
    id: 'deck-standalone',
    title: 'Sidekick Standalone Deck',
    description: 'Standalone product pitch presentation',
    date: '2025-11-08',
    products: ['sidekick'],
    template: false,
    url: 'https://docs.google.com/presentation/d/13zg3jeg-RM2d8IY04dsXC4gxZfveHg6fYIVMOTueCTc/edit',
  },
  {
    id: 'deck-roadmap',
    title: 'Product Roadmap Deck',
    description: 'October roadmap presentation',
    date: '2025-11-05',
    products: ['sidekick', 'classic', 'voice'],
    template: false,
    url: null,
  },
  {
    id: 'deck-buyout',
    title: 'Buyout Program Deck',
    description: 'Contract buyout program presentation',
    date: '2025-11-03',
    products: ['sidekick', 'classic', 'voice'],
    template: false,
    url: null,
  },
  {
    id: 'deck-white-glove',
    title: 'White Glove Implementation Deck',
    description: 'White glove implementation presentation',
    date: '2025-10-30',
    products: ['sidekick', 'classic', 'voice'],
    template: false,
    url: 'https://docs.google.com/presentation/d/1jz0QT608uwqKy4-Q_EHKmCK4LBhGU6-E5O_g91f-nHY/edit',
  },
  {
    id: 'deck-initial-convo',
    title: 'Deck for Initial Conversation',
    description: 'Initial sales conversation deck',
    date: '2025-10-25',
    products: ['sidekick'],
    template: true,
    url: 'https://docs.google.com/presentation/d/1Tc8wCa4b9Z7twKWEzALmw4fZXzMDmVjUDCXKOijQIoU/edit',
  },
  {
    id: 'deck-express-workshop',
    title: 'Express Workshop Slides',
    description: 'Express workshop presentation',
    date: '2025-10-20',
    products: ['sidekick'],
    template: false,
    url: 'https://docs.google.com/presentation/d/1_I0jBz91XhcJFE5Snrs_uPA6DIBFN2_8OjbqS8j_6pQ/edit',
  },
  {
    id: 'deck-social-proof',
    title: 'Social Proof Slides',
    description: 'Customer testimonials and social proof',
    date: '2025-10-15',
    products: ['sidekick', 'classic', 'voice'],
    template: false,
    url: 'https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit',
  },
]

const ONE_PAGERS = [
  {
    id: 'onepager-gladly',
    title: 'Gladly Platform Overview',
    description: 'Single-page overview of the platform, key features, and benefits',
    date: '2025-11-18',
    products: ['classic', 'sidekick', 'voice'],
    template: false,
    url: null,
  },
  {
    id: 'onepager-customer-ai',
    title: 'Customer AI One-Pager Template',
    description: 'Customizable one-pager for AI capabilities overview',
    date: '2025-11-12',
    products: ['sidekick'],
    template: true,
    url: null,
  },
  {
    id: 'onepager-sidekick',
    title: 'Sidekick One-Pager',
    description: 'AI assistant product overview',
    date: '2025-11-08',
    products: ['sidekick'],
    template: false,
    url: null,
  },
  {
    id: 'onepager-voice',
    title: 'Sidekick Voice One-Pager',
    description: 'Voice AI capabilities overview',
    date: '2025-11-05',
    products: ['voice'],
    template: false,
    url: 'https://drive.google.com/file/d/1wxAKviS7giWFTpBeAyQBpafinG9gjk-n/view',
  },
  {
    id: 'onepager-sales',
    title: 'Sidekick Sales One-Pager',
    description: 'Sales automation overview',
    date: '2025-11-03',
    products: ['sidekick'],
    template: false,
    url: null,
  },
  {
    id: 'onepager-guides',
    title: 'Guides & Journeys One-Pager',
    description: 'Proactive guidance product overview',
    date: '2025-10-30',
    products: ['classic'],
    template: false,
    url: 'https://drive.google.com/file/d/1AqXx3BV7UtlUeiovr20Dsc1Rc2qS-u9f/view',
  },
  {
    id: 'onepager-roi',
    title: 'ROI Calculator One-Pager',
    description: 'Customer ROI value proposition',
    date: '2025-10-28',
    products: ['sidekick'],
    template: false,
    url: null,
  },
]

const CASE_STUDIES_EMAIL = [
  {
    id: 'case-social-proof',
    title: 'Social Proof Case Studies',
    description: 'Customer testimonials and success stories deck',
    date: '2025-11-15',
    products: ['sidekick', 'classic', 'voice'],
    contentType: 'document',
    url: 'https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit',
  },
  {
    id: 'email-followup',
    title: 'Follow-up Template',
    description: 'Post-meeting follow-up email template',
    date: '2025-11-08',
    products: ['sidekick', 'classic', 'voice'],
    contentType: 'template',
    url: 'https://docs.google.com/document/d/1f2FfOZ2NcfxbAZKKiKU2lf0MHmqDoTSOmPywWeZ2LKw/edit',
  },
]

// ========================================
// ENABLEMENT DATA (Training Sessions)
// ========================================

// New enablement categories matching EnablementHub.tsx:
// product, gtm-strategy, pre-sales, post-sales, demo-standards, internal-ops, competitive, technical, partner

const ENABLEMENT_SESSIONS = [
  // November 2025
  {
    id: 'enable-product-enhance',
    date: '2025-11-14',
    title: 'Product Enhancement Request System',
    category: 'internal-ops',
    description: 'Centralized system in Salesforce for capturing, tracking, and prioritizing customer enhancement requests',
    duration: null,
    recordingUrl: 'https://drive.google.com/file/d/1wEsHQlMW3b0sClpahv2Wv0YomqCjFk7r/view',
    deckUrl: null,
  },
  // October 2025
  {
    id: 'enable-tech-buyer',
    date: '2025-10-16',
    title: 'Technical Buyer Enablement (CIO/CTO)',
    category: 'pre-sales',
    description: 'Technical Buyer (CIO/CTO) persona deep-dive',
    duration: 60,
    recordingUrl: 'https://drive.google.com/file/d/1CBKOYkIrwNT_xFJozXQiGKNNLULBrsCG/view',
    deckUrl: 'https://drive.google.com/open?id=1nbfFUgTi095VsfX3AmmzmuaSYzQocC_6',
  },
  // September 2025
  {
    id: 'enable-sales-launch',
    date: '2025-09-15',
    title: 'Sidekick Sales Launch Enablement',
    category: 'product',
    description: 'Comprehensive launch training for Sidekick Sales',
    duration: 60,
    recordingUrl: null,
    deckUrl: null,
  },
  // August 2025
  {
    id: 'enable-standalone-land',
    date: '2025-08-28',
    title: 'Sidekick Standalone Land Grab',
    category: 'gtm-strategy',
    description: 'Strategies for rapid Standalone adoption and market penetration',
    duration: 50,
    recordingUrl: 'https://drive.google.com/file/d/1JOAKiN2kjorvZR1AG2f-5Uu3BiXKaeIK/view',
    deckUrl: 'https://drive.google.com/open?id=1iHvQKRgV62igGJOs78hiLFqWeJ7pQADb',
  },
  {
    id: 'enable-voice-ama',
    date: '2025-08-15',
    title: 'Sales Activity Expectations & SK Voice AMA',
    category: 'product',
    description: 'Sales activity tracking expectations and Sidekick Voice Q&A',
    duration: 55,
    recordingUrl: null,
    deckUrl: null,
  },
  {
    id: 'enable-simplesat',
    date: '2025-08-10',
    title: 'SimpleSat Partnership Enablement',
    category: 'partner',
    description: 'Partnership enablement for SimpleSat integration',
    duration: 40,
    recordingUrl: null,
    deckUrl: null,
  },
  // July 2025
  {
    id: 'enable-bva-sla',
    date: '2025-07-17',
    title: 'BVA SLA + Live Demo Walkthrough',
    category: 'demo-standards',
    description: 'New BVA Slack workflow + Walkthrough of the new demo',
    duration: 60,
    recordingUrl: 'https://drive.google.com/file/d/1Itkk6F2_Xyo697xny_TN99yQM4NscpdV/view',
    deckUrl: null,
  },
  // June 2025
  {
    id: 'enable-zendesk',
    date: '2025-06-26',
    title: 'Sidekick for Zendesk',
    category: 'technical',
    description: 'Set up, capabilities, channels, and optimization. Deal Spotlight: Express',
    duration: 50,
    recordingUrl: 'https://drive.google.com/file/d/1DrCVPlu_WJK4zmTgk6IDvfTuEMeeanEw/view',
    deckUrl: null,
  },
  {
    id: 'enable-email-app',
    date: '2025-06-06',
    title: 'SK for Email + App Platform',
    category: 'technical',
    description: 'Foundational enablement for Sidekick on email + App Platform refresher',
    duration: 55,
    recordingUrl: null,
    deckUrl: null,
  },
  {
    id: 'enable-selling-high',
    date: '2025-06-01',
    title: 'Selling High + FM Deck',
    category: 'pre-sales',
    description: 'Selling high to drive strategic growth + First meeting deck expectations',
    duration: 45,
    recordingUrl: null,
    deckUrl: null,
  },
  // May 2025
  {
    id: 'enable-gladly-2',
    date: '2025-05-29',
    title: 'Gladly 2.0 Demo Update',
    category: 'demo-standards',
    description: 'What has changed, what is available, & live walkthrough',
    duration: 55,
    recordingUrl: 'https://drive.google.com/file/d/1sU3eMBBSqSOfMzS2ob-CDzusTlhb2p12/view',
    deckUrl: null,
  },
  {
    id: 'enable-ai-narrative',
    date: '2025-05-22',
    title: 'Customer AI Narrative',
    category: 'gtm-strategy',
    description: "Deep dive into Gladly's messaging, what has changed, and why it matters",
    duration: 50,
    recordingUrl: 'https://drive.google.com/file/d/19Olch59OMWAczh4Rn7VbIpXCHDnOTzeP/view',
    deckUrl: null,
  },
  {
    id: 'enable-standalone-tactical',
    date: '2025-05-15',
    title: 'Sidekick Standalone Tactical Enablement',
    category: 'pre-sales',
    description: 'DQ, discovery, objection, integration training for Sidekick Standalone',
    duration: 55,
    recordingUrl: null,
    deckUrl: null,
  },
  {
    id: 'enable-standalone-sales',
    date: '2025-05-08',
    title: 'Sidekick Standalone + Sidekick Sales',
    category: 'product',
    description: 'Foundational trainings for Sidekick Standalone and Sidekick Sales',
    duration: 60,
    recordingUrl: null,
    deckUrl: null,
  },
  // April 2025
  {
    id: 'enable-voice-demo',
    date: '2025-04-24',
    title: 'Sidekick Voice: Demo, Pitch, Value',
    category: 'demo-standards',
    description: 'New Demo in Generic Retail, SK Voice pitch overview, BVA and ROI calc updates',
    duration: 50,
    recordingUrl: null,
    deckUrl: null,
  },
  // March 2025
  {
    id: 'enable-assembled',
    date: '2025-03-15',
    title: 'Assembled Partner Enablement',
    category: 'partner',
    description: 'Partnership enablement for Assembled integration',
    duration: 40,
    recordingUrl: null,
    deckUrl: null,
  },
  // February 2025
  {
    id: 'enable-shoptalk',
    date: '2025-02-20',
    title: 'Shoptalk Event Prep',
    category: 'internal-ops',
    description: 'Shoptalk event preparation and CTA details',
    duration: null,
    recordingUrl: null,
    deckUrl: null,
  },
  // January 2025
  {
    id: 'enable-guides-journeys',
    date: '2025-01-14',
    title: 'Guides and Journeys',
    category: 'product',
    description: 'Intro to the value of Guides and Journeys and how they work',
    duration: 40,
    recordingUrl: null,
    deckUrl: null,
  },
  {
    id: 'enable-voice-ai',
    date: '2025-01-09',
    title: 'Voice AI',
    category: 'product',
    description: "Intro to Gladly's vision for Voice AI and how it works",
    duration: 50,
    recordingUrl: null,
    deckUrl: null,
  },
  // December 2024
  {
    id: 'enable-app-loop',
    date: '2024-12-19',
    title: 'App Platform + Loop Returns',
    category: 'partner',
    description: 'Customer facing App Platform value slides + partnership value of Loop',
    duration: 55,
    recordingUrl: null,
    deckUrl: null,
  },
  {
    id: 'enable-roi-calc',
    date: '2024-12-11',
    title: 'CS Sidekick ROI Calculator',
    category: 'post-sales',
    description: 'Customer Success Sidekick ROI Calculator training and resources',
    duration: 45,
    recordingUrl: null,
    deckUrl: null,
  },
  // November 2024
  {
    id: 'enable-bva-calc',
    date: '2024-11-15',
    title: 'BVA Calculator Refresh',
    category: 'pre-sales',
    description: 'Updated BVA Calculator training and resources',
    duration: 45,
    recordingUrl: null,
    deckUrl: null,
  },
]

// ========================================
// INTERNAL HUB DATA
// ========================================

const BATTLE_CARDS = [
  {
    id: 'battle-folder',
    title: 'Battlecards Drive Folder',
    description: 'All competitive battlecards',
    date: '2025-11-20',
    competitor: 'All',
    url: 'https://drive.google.com/drive/folders/1C4wZMF_csPSaODt6NzcGpinm4mEjruF7',
  },
  {
    id: 'battle-sierra',
    title: 'Sierra Battlecard',
    description: "Position Gladly against Sierra's Agent OS and AI offerings",
    date: '2025-11-20',
    competitor: 'Sierra',
    url: null,
  },
  {
    id: 'battle-zendesk',
    title: 'Zendesk vs Gladly Battle Card',
    description: 'Competitive positioning against Zendesk AI',
    date: '2025-11-15',
    competitor: 'Zendesk',
    url: null,
  },
  {
    id: 'battle-salesforce',
    title: 'Salesforce Agentforce vs Sidekick',
    description: 'Position against Salesforce Agentforce',
    date: '2025-11-10',
    competitor: 'Salesforce',
    url: null,
  },
  {
    id: 'battle-intercom',
    title: 'Intercom Fin vs Sidekick',
    description: 'Head-to-head with Intercom Fin AI',
    date: '2025-11-05',
    competitor: 'Intercom',
    url: null,
  },
  {
    id: 'battle-kustomer',
    title: 'Kustomer Battlecard',
    description: 'Competitive knockout positioning',
    date: '2025-10-28',
    competitor: 'Kustomer',
    url: null,
  },
]

const MESSAGING_DOCS = [
  {
    id: 'msg-sidekick',
    title: 'Sidekick Messaging Framework',
    description: 'Internal positioning and messaging guidelines for Sidekick',
    date: '2025-11-15',
    products: ['sidekick'],
    url: null,
  },
  {
    id: 'msg-preview',
    title: 'Messaging Preview Doc',
    description: 'Updated messaging preview and positioning',
    date: '2025-06-06',
    products: ['sidekick', 'classic', 'voice'],
    url: 'https://docs.google.com/document/d/1vgX7fLSS2w7BKs2J3IzU_OOml4-LcDY-1SU1jqv4j3c/edit',
  },
]

// ========================================
// REVOPS TOOLS DATA
// ========================================

const REVOPS_101 = [
  {
    id: 'revops-how-to',
    title: 'How To Work With RevOps',
    description: 'Guide on working with RevOps team',
    audience: 'All',
    type: 'document',
    url: 'https://docs.google.com/document/d/1Yi5C5X6SsKeMx0mLloP_kR1gQk9wc3sJL6h-peJbfXw/edit',
  },
  {
    id: 'revops-ticket',
    title: 'RevOps Ticket Submission',
    description: 'Asana form for RevOps ticket submission',
    audience: 'All',
    type: 'tool',
    url: 'https://form.asana.com/?k=vEFTHN5vMhk-uFvmAXLNmw&d=238013372418030',
  },
  {
    id: 'revops-launch-tiering',
    title: 'How RevOps Launches (Launch Tiering)',
    description: 'Launch tiering documentation',
    audience: 'All',
    type: 'document',
    url: 'https://docs.google.com/document/d/1Sobop3Di3Y5op6yRL-me8D9-cbEHRkeeor2mVlJRCgE/edit',
  },
  {
    id: 'revops-project-brief',
    title: 'Project Brief Templates',
    description: 'Project brief template',
    audience: 'All',
    type: 'template',
    url: 'https://docs.google.com/document/d/1-6PZXNsCDD6DBZET-Cs8cMWc_WdH4w82z5jeLeIGVKk/template/preview',
  },
  {
    id: 'revops-user-story',
    title: 'User Story Training',
    description: 'User story training presentation',
    audience: 'All',
    type: 'deck',
    url: 'https://docs.google.com/presentation/d/1fBesrTk4MD-qAhYUrRxBdwvni8hmhmGIm03hLRhUuaw/',
  },
  {
    id: 'revops-sprint',
    title: 'Sprint Planning Boards',
    description: 'Asana sprint planning portfolio',
    audience: 'All',
    type: 'tool',
    url: 'https://app.asana.com/0/portfolio/1209972750071019/1209982290683926',
  },
  {
    id: 'revops-tips',
    title: 'Core Systems Tips & Tricks',
    description: 'Tips and tricks for core systems',
    audience: 'All',
    type: 'document',
    url: 'https://docs.google.com/document/d/1uBiC3y-yMgVGLkk67u_PUFttIhb9d8Nfc_qmyVM39J8/edit',
  },
]

const SALES_GUIDES = [
  {
    id: 'sales-roe',
    title: 'Rules of Engagement 2025',
    description: 'Rules of engagement for sales',
    type: 'document',
    url: 'https://docs.google.com/document/d/1bP8Me45egh-C66SbsoTQOyObrlYXhb58pY-h6jiEY0I/edit',
  },
  {
    id: 'sales-sf-guide',
    title: 'Salesforce Guide (Sales)',
    description: 'Salesforce usage guide for sales',
    type: 'document',
    url: 'https://docs.google.com/document/d/1S-6K8kPROoVJIKYsS0qF1Sffw4K-itn5gfKvdsCOwl4/edit',
  },
  {
    id: 'sales-attribution',
    title: 'Sales Attribution Guide',
    description: 'Sales attribution methodology',
    type: 'deck',
    url: 'https://docs.google.com/presentation/d/1HGD3xdJDt3RXLTLQwI8WNkv6Lj8qsR4XiLqfS3s921A/edit',
  },
  {
    id: 'sales-per-guide',
    title: 'Product Enhancement Request User Guide',
    description: 'How to submit product enhancement requests',
    type: 'document',
    url: 'https://docs.google.com/document/d/1Zuc3NdCiqGv_p1okxRMMOXutso9ZP3pPH3KL9GW8yBI/edit',
  },
  {
    id: 'sales-rtw-dash',
    title: 'Ready To Win Dashboard',
    description: 'Sales readiness dashboard',
    type: 'dashboard',
    url: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002EJ01MAG/view',
  },
  {
    id: 'sales-forecast',
    title: 'Weekly Forecast - SLT',
    description: 'Weekly forecast for SLT',
    type: 'dashboard',
    url: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002aBgXMAU/view',
  },
]

const CS_AM_GUIDES = [
  {
    id: 'cs-sf-guide',
    title: 'Salesforce Guide (CS)',
    description: 'Salesforce usage guide for CS',
    type: 'document',
    url: 'https://docs.google.com/document/d/1cYQAXEPb3wb8XxzDJMdaCzMtEvyUSb_VwJc-dMsDUJc/edit',
  },
  {
    id: 'cs-qbr',
    title: 'QBR Guide',
    description: 'Quarterly business review guide',
    type: 'deck',
    url: 'https://docs.google.com/presentation/d/11EMqR6s3KOlnRafjzgITBmt4QyUFgvlC2zRxfvsmydU/edit',
  },
  {
    id: 'cs-comp-guide',
    title: 'CSM Compensation Guide (FY2026 Q2)',
    description: 'CSM compensation documentation',
    type: 'document',
    url: 'https://docs.google.com/document/d/1xBiMzV5QbgbcLFkOQTdfm5OOFbEs7uvdb5iX1W4clus/',
  },
  {
    id: 'cs-dip-guide',
    title: 'Customer Consumption Dip Cases Guide',
    description: 'How to handle consumption dip cases',
    type: 'document',
    url: 'https://docs.google.com/document/d/1cup1o5nPHzmwL9EFHCWvHt_J8yybmW7aTYKK6-CQ8eY/edit',
  },
  {
    id: 'cs-pod-dash',
    title: 'Pod Success Dashboard',
    description: 'Pod success tracking',
    type: 'dashboard',
    url: 'https://docs.google.com/spreadsheets/d/1TcjaiHWCc74sM9rRSP9UcN8rtxhoBUUI7sMKRetOpro/edit',
  },
  {
    id: 'cs-renewals',
    title: 'Renewals Dashboard',
    description: 'Renewals tracking',
    type: 'dashboard',
    url: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01Z8a0000010XbjEAE/view',
  },
  {
    id: 'cs-utilization',
    title: 'Product Utilization - (CSM)',
    description: 'Product utilization metrics',
    type: 'dashboard',
    url: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002I19NMAS/view',
  },
  {
    id: 'cs-consumption',
    title: 'Consumption Dashboard',
    description: 'Consumption metrics',
    type: 'dashboard',
    url: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002gUYPMA2/view',
  },
  {
    id: 'cs-dip-dash',
    title: 'Customer Consumption Dip Case Dashboard',
    description: 'Dip case tracking',
    type: 'dashboard',
    url: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002uN0nMAE/view',
  },
  {
    id: 'cs-exec-template',
    title: 'Exec Summary Template',
    description: 'Executive summary template',
    type: 'template',
    url: 'https://docs.google.com/document/d/14LpTNuM_v8QvJMv4122mFbkS_tWiLaMQPQ_oKpzBcaw/template/preview',
  },
]

const MARKETING_GUIDES = [
  {
    id: 'mkt-attribution',
    title: 'Marketing Attribution Guide',
    description: 'Marketing attribution methodology',
    type: 'deck',
    url: 'https://docs.google.com/presentation/d/18732hX3L2Hm5ySPYd78K_UzoqEWVKbvGcGJVIcn7oQM/edit',
  },
  {
    id: 'mkt-efficiency',
    title: 'Marketing Efficiency Metrics',
    description: 'Marketing efficiency documentation',
    type: 'document',
    url: 'https://docs.google.com/document/d/1yJFu07fKdeAyOgFFJBZKmFQTajAAbsuwxMtiWxXFYYE/edit',
  },
  {
    id: 'mkt-segmentation',
    title: 'Internal Segmentation Guide',
    description: 'Internal segmentation methodology',
    type: 'document',
    url: 'https://docs.google.com/document/d/1ccNh6ZByNbiYr4zDymvM1TQQF6JZ3JAGSOwHYIXXATM/edit',
  },
  {
    id: 'mkt-pipeline-target',
    title: 'Bottoms Up Pipeline Target Setting',
    description: 'Pipeline target setting methodology',
    type: 'document',
    url: 'https://docs.google.com/spreadsheets/d/1QXJX3_K2bS5LwQj-CAtEhVoC-Hwc5EkWnghYs-IrM8U/edit',
  },
  {
    id: 'mkt-dashboard',
    title: 'Marketing Dashboard',
    description: 'Marketing performance dashboard',
    type: 'dashboard',
    url: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000001rOrdMAE/view',
  },
  {
    id: 'mkt-weekly-bus',
    title: 'Pipeline Reporting - Weekly Bus Review',
    description: 'Weekly pipeline reporting',
    type: 'dashboard',
    url: 'https://docs.google.com/spreadsheets/d/1OeuVoAEZjRyWrm1_0vtKAT_voOpykuHXqsNF56LX_24/edit',
  },
  {
    id: 'mkt-eoq',
    title: 'Pipeline Reporting - EOQ Documentation',
    description: 'End of quarter pipeline documentation',
    type: 'dashboard',
    url: 'https://docs.google.com/spreadsheets/d/11XMQOYakYqJPk7QdEZGKGdPa1mgOAe_N_XWSSPEROHk/edit',
  },
  {
    id: 'mkt-board',
    title: 'Pipeline Coverage - Board Reporting',
    description: 'Board-level pipeline reporting',
    type: 'dashboard',
    url: 'https://docs.google.com/spreadsheets/d/1lJk3sbUAvABXpzskfh-I7OjwYHCtYb8kM-oWZgx3f0o/edit',
  },
]

const DEAL_DESK = [
  {
    id: 'dealdesk-ssot',
    title: 'Deal Desk Operations (SSOT)',
    description: 'Single source of truth for deal desk operations',
    type: 'document',
    url: 'https://docs.google.com/document/d/1QSvu3dq3JFGTix066tZi-UVVpVRN1n5JpnRavFfCMmQ/edit',
  },
]

const DEALHUB_MODULES = [
  {
    id: 'dealhub-m1',
    module: 'Module 1',
    title: 'DealHub 101',
    videoUrl: 'https://drive.google.com/file/d/1r55AH8fD5ECdPrDF0O6vQuO1dywFbSe9/view',
    guideUrl: 'https://docs.google.com/document/d/1jk5C4VXJBGPbkN0knnwepc6TVoQGGZ0VngAr7pKAdqM/edit?tab=t.whsrkvaesbeh',
  },
  {
    id: 'dealhub-m2',
    module: 'Module 2',
    title: 'Simple Quote Generation',
    videoUrl: 'https://drive.google.com/file/d/1VBXMHfoBXvjQWyg5ZvjCAimaazLemOM_/view',
    guideUrl: 'https://docs.google.com/document/d/1jk5C4VXJBGPbkN0knnwepc6TVoQGGZ0VngAr7pKAdqM/edit?tab=t.sei7xl7e3fjn',
  },
  {
    id: 'dealhub-m3',
    module: 'Module 3',
    title: 'Advanced Quoting',
    videoUrl: 'https://drive.google.com/file/d/1oVEM3Jjq7YMQHeW2HvEObjjfLYOt2lip/view',
    guideUrl: 'https://docs.google.com/document/d/1jk5C4VXJBGPbkN0knnwepc6TVoQGGZ0VngAr7pKAdqM/edit?tab=t.75zjs0cak4f7',
  },
  {
    id: 'dealhub-m4',
    module: 'Module 4',
    title: 'Approvals & Dealtalk',
    videoUrl: 'https://drive.google.com/file/d/1nbHeiZr4OzJQN6aF1IWbwPG34jnyQvII/view',
    guideUrl: 'https://docs.google.com/document/d/1jk5C4VXJBGPbkN0knnwepc6TVoQGGZ0VngAr7pKAdqM/edit?tab=t.eeqf83cbsbma',
  },
  {
    id: 'dealhub-m5',
    module: 'Module 5',
    title: 'Publishing & Execution',
    videoUrl: 'https://drive.google.com/file/d/1kEgBI_O8-rM8B4zgvilrQYajA9Chvv0v/view',
    guideUrl: 'https://docs.google.com/document/d/1jk5C4VXJBGPbkN0knnwepc6TVoQGGZ0VngAr7pKAdqM/edit?tab=t.o3g8appq3vrs',
  },
]

// ========================================
// MAIN SEED FUNCTION
// ========================================

async function seedRevenueHub() {
  console.log('Starting Revenue Hub seed...\n')

  // Step 1: Delete all existing catalog entries
  console.log('Step 1: Deleting all existing catalog entries...')
  try {
    const existingEntries = await client.fetch(`*[_type == "catalogEntry"]._id`)
    console.log(`  Found ${existingEntries.length} existing entries to delete`)

    if (existingEntries.length > 0) {
      const transaction = client.transaction()
      for (const id of existingEntries) {
        transaction.delete(id)
      }
      await transaction.commit()
      console.log(`  Deleted ${existingEntries.length} entries\n`)
    }
  } catch (error: any) {
    console.error(`  Error deleting entries: ${error.message}\n`)
  }

  // Step 2: Fetch taxonomies for references
  console.log('Step 2: Fetching taxonomies...')
  const contentTypes = await client.fetch(`*[_type == "contentType"]{ _id, slug, name }`)
  const products = await client.fetch(`*[_type == "product"]{ _id, slug, name }`)
  const teams = await client.fetch(`*[_type == "team"]{ _id, slug, name }`)

  console.log(`  Content Types: ${contentTypes.length}`)
  console.log(`  Products: ${products.length}`)
  console.log(`  Teams: ${teams.length}\n`)

  // Helper to find reference
  const findRef = (items: any[], slug: string) => {
    const item = items.find((i) => i.slug?.current === slug)
    return item ? { _type: 'reference', _ref: item._id } : null
  }

  let createdCount = 0

  // Step 3: Create Content Hub entries (external-facing)
  console.log('Step 3: Creating Content Hub entries...')

  // Slide Decks
  console.log('  Creating Slide Decks...')
  for (const deck of SLIDE_DECKS) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: deck.id,
        title: deck.title,
        description: deck.description,
        slug: { _type: 'slug', current: slugify(deck.title) },
        status: 'published',
        publishDate: deck.date,
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: deck.template ? 'template' : 'document',
        contentType: findRef(contentTypes, 'deck'),
        products: deck.products.map(p => findRef(products, p)).filter(Boolean),
        teams: [findRef(teams, 'sales')].filter(Boolean),
        externalUrl: deck.url,
        publishedTo: ['content'],
        featured: deck.date === '2025-11-17',
        priority: 70,
      }
      await client.createOrReplace(entry)
      console.log(`    + ${deck.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`    x ${deck.title}: ${error.message}`)
    }
  }

  // One-Pagers
  console.log('  Creating One-Pagers...')
  for (const op of ONE_PAGERS) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: op.id,
        title: op.title,
        description: op.description,
        slug: { _type: 'slug', current: slugify(op.title) },
        status: 'published',
        publishDate: op.date,
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: op.template ? 'template' : 'document',
        contentType: findRef(contentTypes, 'one-pager'),
        products: op.products.map(p => findRef(products, p)).filter(Boolean),
        teams: [findRef(teams, 'sales')].filter(Boolean),
        externalUrl: op.url,
        publishedTo: ['content'],
        featured: op.date === '2025-11-18',
        priority: 65,
      }
      await client.createOrReplace(entry)
      console.log(`    + ${op.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`    x ${op.title}: ${error.message}`)
    }
  }

  // Case Studies & Email Templates
  console.log('  Creating Case Studies & Email Templates...')
  for (const item of CASE_STUDIES_EMAIL) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: item.id,
        title: item.title,
        description: item.description,
        slug: { _type: 'slug', current: slugify(item.title) },
        status: 'published',
        publishDate: item.date,
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: item.contentType,
        contentType: findRef(contentTypes, item.contentType),
        products: item.products.map(p => findRef(products, p)).filter(Boolean),
        teams: [findRef(teams, 'sales')].filter(Boolean),
        externalUrl: item.url,
        publishedTo: ['content'],
        priority: 60,
      }
      await client.createOrReplace(entry)
      console.log(`    + ${item.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`    x ${item.title}: ${error.message}`)
    }
  }

  // Step 4: Create Enablement Hub entries (training sessions)
  console.log('\nStep 4: Creating Enablement Hub entries...')
  for (const session of ENABLEMENT_SESSIONS) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: session.id,
        title: session.title,
        description: session.description,
        slug: { _type: 'slug', current: slugify(session.title) },
        status: 'published',
        publishDate: session.date,
        cardType: 'content-card',
        pageTemplate: 'training-session',
        format: session.recordingUrl ? 'live-replay' : 'on-demand',
        duration: session.duration,
        contentType: findRef(contentTypes, 'training'),
        products: [findRef(products, 'sidekick'), findRef(products, 'classic')].filter(Boolean),
        teams: [findRef(teams, 'sales'), findRef(teams, 'customer-success')].filter(Boolean),
        externalUrl: session.recordingUrl,
        enablementCategory: [session.category],
        publishedTo: ['enablement'],
        featured: session.date >= '2025-10-01',
        priority: session.recordingUrl ? 80 : 50,
      }
      await client.createOrReplace(entry)
      console.log(`  + ${session.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`  x ${session.title}: ${error.message}`)
    }
  }

  // Step 5: Create Internal Hub entries (battlecards, messaging)
  console.log('\nStep 5: Creating Internal Hub entries...')

  // Battle Cards
  console.log('  Creating Battle Cards...')
  for (const bc of BATTLE_CARDS) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: bc.id,
        title: bc.title,
        description: bc.description,
        slug: { _type: 'slug', current: slugify(bc.title) },
        status: 'published',
        publishDate: bc.date,
        cardType: 'battle-card',
        pageTemplate: 'battle-card',
        format: 'document',
        contentType: findRef(contentTypes, 'battle-card'),
        products: [findRef(products, 'sidekick'), findRef(products, 'classic')].filter(Boolean),
        teams: [findRef(teams, 'sales')].filter(Boolean),
        externalUrl: bc.url,
        publishedTo: ['content'],
        salesCategory: ['objections'],
        priority: 75,
      }
      await client.createOrReplace(entry)
      console.log(`    + ${bc.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`    x ${bc.title}: ${error.message}`)
    }
  }

  // Messaging Docs
  console.log('  Creating Messaging Docs...')
  for (const msg of MESSAGING_DOCS) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: msg.id,
        title: msg.title,
        description: msg.description,
        slug: { _type: 'slug', current: slugify(msg.title) },
        status: 'published',
        publishDate: msg.date,
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: 'document',
        contentType: findRef(contentTypes, 'document'),
        products: msg.products.map(p => findRef(products, p)).filter(Boolean),
        teams: [findRef(teams, 'sales'), findRef(teams, 'marketing')].filter(Boolean),
        externalUrl: msg.url,
        publishedTo: ['content'],
        priority: 60,
      }
      await client.createOrReplace(entry)
      console.log(`    + ${msg.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`    x ${msg.title}: ${error.message}`)
    }
  }

  // Step 6: Create RevOps Tools entries
  console.log('\nStep 6: Creating RevOps Tools entries...')

  // RevOps 101
  for (const item of REVOPS_101) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: item.id,
        title: item.title,
        description: item.description,
        slug: { _type: 'slug', current: slugify(item.title) },
        status: 'published',
        publishDate: '2025-11-01',
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: item.type === 'tool' ? 'document' : item.type,
        contentType: findRef(contentTypes, item.type === 'deck' ? 'deck' : 'document'),
        teams: [findRef(teams, 'sales'), findRef(teams, 'customer-success')].filter(Boolean),
        externalUrl: item.url,
        publishedTo: ['content'],
        salesCategory: ['revops'],
        priority: 55,
      }
      await client.createOrReplace(entry)
      console.log(`  + ${item.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`  x ${item.title}: ${error.message}`)
    }
  }

  // Sales Guides
  for (const item of SALES_GUIDES) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: item.id,
        title: item.title,
        description: item.description,
        slug: { _type: 'slug', current: slugify(item.title) },
        status: 'published',
        publishDate: '2025-11-01',
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: item.type === 'dashboard' ? 'document' : item.type,
        contentType: findRef(contentTypes, item.type === 'deck' ? 'deck' : 'document'),
        teams: [findRef(teams, 'sales')].filter(Boolean),
        externalUrl: item.url,
        publishedTo: ['content'],
        salesCategory: ['guides'],
        priority: 55,
      }
      await client.createOrReplace(entry)
      console.log(`  + ${item.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`  x ${item.title}: ${error.message}`)
    }
  }

  // CS/AM Guides
  for (const item of CS_AM_GUIDES) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: item.id,
        title: item.title,
        description: item.description,
        slug: { _type: 'slug', current: slugify(item.title) },
        status: 'published',
        publishDate: '2025-11-01',
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: item.type === 'dashboard' ? 'document' : item.type,
        contentType: findRef(contentTypes, item.type === 'deck' ? 'deck' : 'document'),
        teams: [findRef(teams, 'customer-success')].filter(Boolean),
        externalUrl: item.url,
        publishedTo: ['content'],
        salesCategory: ['cs-guides'],
        priority: 55,
      }
      await client.createOrReplace(entry)
      console.log(`  + ${item.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`  x ${item.title}: ${error.message}`)
    }
  }

  // Marketing Guides
  for (const item of MARKETING_GUIDES) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: item.id,
        title: item.title,
        description: item.description,
        slug: { _type: 'slug', current: slugify(item.title) },
        status: 'published',
        publishDate: '2025-11-01',
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: item.type === 'dashboard' ? 'document' : item.type,
        contentType: findRef(contentTypes, item.type === 'deck' ? 'deck' : 'document'),
        teams: [findRef(teams, 'marketing')].filter(Boolean),
        externalUrl: item.url,
        publishedTo: ['content'],
        salesCategory: ['marketing-guides'],
        priority: 55,
      }
      await client.createOrReplace(entry)
      console.log(`  + ${item.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`  x ${item.title}: ${error.message}`)
    }
  }

  // Deal Desk
  for (const item of DEAL_DESK) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: item.id,
        title: item.title,
        description: item.description,
        slug: { _type: 'slug', current: slugify(item.title) },
        status: 'published',
        publishDate: '2025-11-01',
        cardType: 'content-card',
        pageTemplate: 'micro-learning',
        format: 'document',
        contentType: findRef(contentTypes, 'document'),
        teams: [findRef(teams, 'sales')].filter(Boolean),
        externalUrl: item.url,
        publishedTo: ['content'],
        salesCategory: ['deal-desk'],
        priority: 55,
      }
      await client.createOrReplace(entry)
      console.log(`  + ${item.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`  x ${item.title}: ${error.message}`)
    }
  }

  // DealHub Modules (as Enablement entries with Course format)
  console.log('\nStep 7: Creating DealHub Certification entries...')
  for (const mod of DEALHUB_MODULES) {
    try {
      const entry = {
        _type: 'catalogEntry',
        _id: mod.id,
        title: `DealHub ${mod.module}: ${mod.title}`,
        description: `DealHub certification ${mod.module.toLowerCase()} - ${mod.title}`,
        slug: { _type: 'slug', current: slugify(`dealhub-${mod.module}-${mod.title}`) },
        status: 'published',
        publishDate: '2025-11-01',
        cardType: 'content-card',
        pageTemplate: 'training-session',
        format: 'course',
        duration: 30,
        contentType: findRef(contentTypes, 'training'),
        teams: [findRef(teams, 'sales')].filter(Boolean),
        externalUrl: mod.videoUrl,
        enablementCategory: ['internal-ops'],
        publishedTo: ['enablement'],
        priority: 70,
      }
      await client.createOrReplace(entry)
      console.log(`  + ${mod.title}`)
      createdCount++
    } catch (error: any) {
      console.error(`  x ${mod.title}: ${error.message}`)
    }
  }

  console.log('\n========================================')
  console.log(`Seed complete! Created ${createdCount} entries.`)
  console.log('========================================\n')
  console.log('View your content at:')
  console.log('  - Content Hub: http://localhost:3000/content')
  console.log('  - Enablement Hub: http://localhost:3000/learn')
  console.log('  - Sanity Studio: http://localhost:3000/studio')
}

// Run the seed
seedRevenueHub()
  .then(() => {
    console.log('\nDone!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\nSeed failed:', error)
    process.exit(1)
  })
