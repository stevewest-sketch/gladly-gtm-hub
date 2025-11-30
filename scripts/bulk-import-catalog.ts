/**
 * Bulk Import/Update Catalog Entries from CSV data
 *
 * This processes the enablement article updates CSV
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Entries to create/update from CSV
const ENTRIES = [
  // New enablement entries without video URLs
  { slug: 'bva-calculator-refresh', title: 'BVA Calculator Refresh', description: 'Updated BVA Calculator training and resources', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2024-11-15', enablementCategory: 'pre-sales' },
  { slug: 'cs-sidekick-roi-calculator', title: 'CS Sidekick ROI Calculator', description: 'Customer Success Sidekick ROI Calculator training and resources', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2024-12-11', enablementCategory: 'post-sales' },
  { slug: 'app-platform-loop-returns', title: 'App Platform + Loop Returns', description: 'Customer facing App Platform value slides + partnership value of Loop', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2024-12-19', enablementCategory: 'partner' },
  { slug: 'voice-ai', title: 'Voice AI', description: "Intro to Gladly's vision for Voice AI and how it works", hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-01-09', enablementCategory: 'product' },
  { slug: 'guides-and-journeys', title: 'Guides and Journeys', description: 'Intro to the value of Guides and Journeys and how they work', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-01-14', enablementCategory: 'product' },
  { slug: 'shoptalk-event-prep', title: 'Shoptalk Event Prep', description: 'Shoptalk event preparation and CTA details', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-02-20', enablementCategory: 'internal-ops' },
  { slug: 'assembled-partner-enablement', title: 'Assembled Partner Enablement', description: 'Partnership enablement for Assembled integration', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-03-15', enablementCategory: 'partner' },
  { slug: 'sidekick-voice-demo-pitch-value', title: 'Sidekick Voice: Demo, Pitch, Value', description: 'New Demo in Generic Retail, SK Voice pitch overview, BVA and ROI calc updates', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-04-24', enablementCategory: 'demo-standards' },
  { slug: 'sidekick-standalone-sidekick-sales', title: 'Sidekick Standalone + Sidekick Sales', description: 'Foundational trainings for Sidekick Standalone and Sidekick Sales', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-05-08', enablementCategory: 'product' },
  { slug: 'sidekick-standalone-tactical-enablement', title: 'Sidekick Standalone Tactical Enablement', description: 'DQ, discovery, objection, integration training for Sidekick Standalone', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-05-15', enablementCategory: 'pre-sales' },
  { slug: 'selling-high-fm-deck', title: 'Selling High + FM Deck', description: 'Selling high to drive strategic growth + First meeting deck expectations', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-06-01', enablementCategory: 'pre-sales' },
  { slug: 'sk-for-email-app-platform', title: 'SK for Email + App Platform', description: 'Foundational enablement for Sidekick on email + App Platform refresher', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-06-06', enablementCategory: 'technical' },
  { slug: 'simplesat-partnership-enablement', title: 'SimpleSat Partnership Enablement', description: 'Partnership enablement for SimpleSat integration', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-08-10', enablementCategory: 'partner' },
  { slug: 'sales-activity-expectations-sk-voice-ama', title: 'Sales Activity Expectations & SK Voice AMA', description: 'Sales activity tracking expectations and Sidekick Voice Q&A', hub: 'enablement', contentType: 'training', pageTemplate: 'training-session', publishDate: '2025-08-15', enablementCategory: 'product' },

  // Entry with URLs: Sidekick Sales Launch Enablement
  {
    slug: 'sidekick-sales-launch-enablement',
    title: 'Sidekick Sales Launch Enablement',
    description: 'Comprehensive launch training for Sidekick Sales',
    hub: 'enablement',
    contentType: 'training',
    pageTemplate: 'training-session',
    publishDate: '2025-09-15',
    videoUrl: 'https://drive.google.com/file/d/1Eh6k62DgAvcVmlaKwvg3_NlDJT7yJjU5/view?usp=drive_link',
    transcriptUrl: 'https://docs.google.com/document/d/1m7qlzfOTFiudzAI8NoW7_H7NHx_vfviR1mdFpX1UCIk/edit?usp=drive_link',
    slidesUrl: 'https://docs.google.com/presentation/d/1tQOXRDoAZl60XkKeP6ctX_Z5fbuPU_Tuk6EeQzvEHmw/edit?usp=drive_link',
    enablementCategory: 'product'
  },

  // Content hub entries with externalUrl
  { slug: 'messaging-preview-doc', title: 'Messaging Preview Doc', description: 'Updated messaging preview and positioning', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-06-06', externalUrl: 'https://docs.google.com/document/d/1vgX7fLSS2w7BKs2J3IzU_OOml4-LcDY-1SU1jqv4j3c/edit' },
  { slug: 'social-proof-slides', title: 'Social Proof Slides', description: 'Customer testimonials and social proof', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-10-15', externalUrl: 'https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit' },
  { slug: 'express-workshop-slides', title: 'Express Workshop Slides', description: 'Express workshop presentation', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-10-20', externalUrl: 'https://docs.google.com/presentation/d/1_I0jBz91XhcJFE5Snrs_uPA6DIBFN2_8OjbqS8j_6pQ/edit' },
  { slug: 'deck-for-initial-conversation', title: 'Deck for Initial Conversation', description: 'Initial sales conversation deck', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-10-25', externalUrl: 'https://docs.google.com/presentation/d/1Tc8wCa4b9Z7twKWEzALmw4fZXzMDmVjUDCXKOijQIoU/edit' },
  { slug: 'white-glove-implementation-deck', title: 'White Glove Implementation Deck', description: 'White glove implementation presentation', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-10-30', externalUrl: 'https://docs.google.com/presentation/d/1jz0QT608uwqKy4-Q_EHKmCK4LBhGU6-E5O_g91f-nHY/edit' },
  { slug: 'guides-journeys-one-pager', title: 'Guides & Journeys One-Pager', description: 'Proactive guidance product overview', hub: 'content', contentType: 'one-pager', pageTemplate: 'micro-learning', publishDate: '2025-10-30', externalUrl: 'https://drive.google.com/file/d/1AqXx3BV7UtlUeiovr20Dsc1Rc2qS-u9f/view' },
  { slug: 'sidekick-standalone-deck', title: 'Sidekick Standalone Deck', description: 'Standalone product pitch presentation', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-08', externalUrl: 'https://docs.google.com/presentation/d/13zg3jeg-RM2d8IY04dsXC4gxZfveHg6fYIVMOTueCTc/edit' },
  { slug: 'follow-up-template', title: 'Follow-up Template', description: 'Post-meeting follow-up email template', hub: 'content', contentType: 'template', pageTemplate: 'micro-learning', publishDate: '2025-11-08', externalUrl: 'https://docs.google.com/document/d/1f2FfOZ2NcfxbAZKKiKU2lf0MHmqDoTSOmPywWeZ2LKw/edit' },
  { slug: 'sidekick-voice-one-pager', title: 'Sidekick Voice One-Pager', description: 'Voice AI capabilities overview', hub: 'content', contentType: 'one-pager', pageTemplate: 'micro-learning', publishDate: '2025-11-05', externalUrl: 'https://drive.google.com/file/d/1wxAKviS7giWFTpBeAyQBpafinG9gjk-n/view' },
  { slug: 'social-proof-case-studies', title: 'Social Proof Case Studies', description: 'Customer testimonials and success stories deck', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-15', externalUrl: 'https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit' },
  { slug: 'battlecards-drive-folder', title: 'Battlecards Drive Folder', description: 'All competitive battlecards', hub: 'content', contentType: 'battle-card', cardType: 'battle-card', pageTemplate: 'battle-card', publishDate: '2025-11-20', externalUrl: 'https://drive.google.com/drive/folders/1C4wZMF_csPSaODt6NzcGpinm4mEjruF7' },

  // RevOps resources
  { slug: 'marketing-attribution-guide', title: 'Marketing Attribution Guide', description: 'Marketing attribution methodology', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/presentation/d/18732hX3L2Hm5ySPYd78K_UzoqEWVKbvGcGJVIcn7oQM/edit' },
  { slug: 'qbr-guide', title: 'QBR Guide', description: 'Quarterly business review guide', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/presentation/d/11EMqR6s3KOlnRafjzgITBmt4QyUFgvlC2zRxfvsmydU/edit' },
  { slug: 'sales-attribution-guide', title: 'Sales Attribution Guide', description: 'Sales attribution methodology', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/presentation/d/1HGD3xdJDt3RXLTLQwI8WNkv6Lj8qsR4XiLqfS3s921A/edit' },
  { slug: 'user-story-training', title: 'User Story Training', description: 'User story training presentation', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/presentation/d/1fBesrTk4MD-qAhYUrRxBdwvni8hmhmGIm03hLRhUuaw/' },
  { slug: 'bottoms-up-pipeline-target-setting', title: 'Bottoms Up Pipeline Target Setting', description: 'Pipeline target setting methodology', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/spreadsheets/d/1QXJX3_K2bS5LwQj-CAtEhVoC-Hwc5EkWnghYs-IrM8U/edit' },
  { slug: 'csm-compensation-guide-fy2026-q2', title: 'CSM Compensation Guide (FY2026 Q2)', description: 'CSM compensation documentation', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1xBiMzV5QbgbcLFkOQTdfm5OOFbEs7uvdb5iX1W4clus/' },
  { slug: 'consumption-dashboard', title: 'Consumption Dashboard', description: 'Consumption metrics', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002gUYPMA2/view' },
  { slug: 'core-systems-tips-tricks', title: 'Core Systems Tips & Tricks', description: 'Tips and tricks for core systems', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1uBiC3y-yMgVGLkk67u_PUFttIhb9d8Nfc_qmyVM39J8/edit' },
  { slug: 'customer-consumption-dip-case-dashboard', title: 'Customer Consumption Dip Case Dashboard', description: 'Dip case tracking', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002uN0nMAE/view' },
  { slug: 'customer-consumption-dip-cases-guide', title: 'Customer Consumption Dip Cases Guide', description: 'How to handle consumption dip cases', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1cup1o5nPHzmwL9EFHCWvHt_J8yybmW7aTYKK6-CQ8eY/edit' },
  { slug: 'deal-desk-operations-ssot', title: 'Deal Desk Operations (SSOT)', description: 'Single source of truth for deal desk operations', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1QSvu3dq3JFGTix066tZi-UVVpVRN1n5JpnRavFfCMmQ/edit' },
  { slug: 'exec-summary-template', title: 'Exec Summary Template', description: 'Executive summary template', hub: 'content', contentType: 'template', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/14LpTNuM_v8QvJMv4122mFbkS_tWiLaMQPQ_oKpzBcaw/template/preview' },
  { slug: 'how-revops-launches-launch-tiering', title: 'How RevOps Launches (Launch Tiering)', description: 'Launch tiering documentation', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1Sobop3Di3Y5op6yRL-me8D9-cbEHRkeeor2mVlJRCgE/edit' },
  { slug: 'how-to-work-with-revops', title: 'How To Work With RevOps', description: 'Guide on working with RevOps team', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1Yi5C5X6SsKeMx0mLloP_kR1gQk9wc3sJL6h-peJbfXw/edit' },
  { slug: 'internal-segmentation-guide', title: 'Internal Segmentation Guide', description: 'Internal segmentation methodology', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1ccNh6ZByNbiYr4zDymvM1TQQF6JZ3JAGSOwHYIXXATM/edit' },
  { slug: 'marketing-dashboard', title: 'Marketing Dashboard', description: 'Marketing performance dashboard', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000001rOrdMAE/view' },
  { slug: 'marketing-efficiency-metrics', title: 'Marketing Efficiency Metrics', description: 'Marketing efficiency documentation', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1yJFu07fKdeAyOgFFJBZKmFQTajAAbsuwxMtiWxXFYYE/edit' },
  { slug: 'pipeline-coverage-board-reporting', title: 'Pipeline Coverage - Board Reporting', description: 'Board-level pipeline reporting', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/spreadsheets/d/1lJk3sbUAvABXpzskfh-I7OjwYHCtYb8kM-oWZgx3f0o/edit' },
  { slug: 'pipeline-reporting-eoq-documentation', title: 'Pipeline Reporting - EOQ Documentation', description: 'End of quarter pipeline documentation', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/spreadsheets/d/11XMQOYakYqJPk7QdEZGKGdPa1mgOAe_N_XWSSPEROHk/edit' },
  { slug: 'pipeline-reporting-weekly-bus-review', title: 'Pipeline Reporting - Weekly Bus Review', description: 'Weekly pipeline reporting', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/spreadsheets/d/1OeuVoAEZjRyWrm1_0vtKAT_voOpykuHXqsNF56LX_24/edit' },
  { slug: 'pod-success-dashboard', title: 'Pod Success Dashboard', description: 'Pod success tracking', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/spreadsheets/d/1TcjaiHWCc74sM9rRSP9UcN8rtxhoBUUI7sMKRetOpro/edit' },
  { slug: 'product-enhancement-request-user-guide', title: 'Product Enhancement Request User Guide', description: 'How to submit product enhancement requests', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1Zuc3NdCiqGv_p1okxRMMOXutso9ZP3pPH3KL9GW8yBI/edit' },
  { slug: 'product-utilization-csm', title: 'Product Utilization - (CSM)', description: 'Product utilization metrics', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002I19NMAS/view' },
  { slug: 'project-brief-templates', title: 'Project Brief Templates', description: 'Project brief template', hub: 'content', contentType: 'template', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1-6PZXNsCDD6DBZET-Cs8cMWc_WdH4w82z5jeLeIGVKk/template/preview' },
  { slug: 'ready-to-win-dashboard', title: 'Ready To Win Dashboard', description: 'Sales readiness dashboard', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002EJ01MAG/view' },
  { slug: 'renewals-dashboard', title: 'Renewals Dashboard', description: 'Renewals tracking', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01Z8a0000010XbjEAE/view' },
  { slug: 'revops-ticket-submission', title: 'RevOps Ticket Submission', description: 'Asana form for RevOps ticket submission', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://form.asana.com/?k=vEFTHN5vMhk-uFvmAXLNmw&d=238013372418030' },
  { slug: 'rules-of-engagement-2025', title: 'Rules of Engagement 2025', description: 'Rules of engagement for sales', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1bP8Me45egh-C66SbsoTQOyObrlYXhb58pY-h6jiEY0I/edit' },
  { slug: 'salesforce-guide-cs', title: 'Salesforce Guide (CS)', description: 'Salesforce usage guide for CS', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1cYQAXEPb3wb8XxzDJMdaCzMtEvyUSb_VwJc-dMsDUJc/edit' },
  { slug: 'salesforce-guide-sales', title: 'Salesforce Guide (Sales)', description: 'Salesforce usage guide for sales', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://docs.google.com/document/d/1S-6K8kPROoVJIKYsS0qF1Sffw4K-itn5gfKvdsCOwl4/edit' },
  { slug: 'sprint-planning-boards', title: 'Sprint Planning Boards', description: 'Asana sprint planning portfolio', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://app.asana.com/0/portfolio/1209972750071019/1209982290683926' },
  { slug: 'weekly-forecast-slt', title: 'Weekly Forecast - SLT', description: 'Weekly forecast for SLT', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-01', externalUrl: 'https://gladly.lightning.force.com/lightning/r/Dashboard/01ZQh000002aBgXMAU/view' },

  // Battle cards and other content
  { slug: 'kustomer-battlecard', title: 'Kustomer Battlecard', description: 'Competitive knockout positioning', hub: 'content', contentType: 'battle-card', cardType: 'battle-card', pageTemplate: 'battle-card', publishDate: '2025-10-28' },
  { slug: 'roi-calculator-one-pager', title: 'ROI Calculator One-Pager', description: 'Customer ROI value proposition', hub: 'content', contentType: 'one-pager', pageTemplate: 'micro-learning', publishDate: '2025-10-28' },
  { slug: 'buyout-program-deck', title: 'Buyout Program Deck', description: 'Contract buyout program presentation', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-03' },
  { slug: 'sidekick-sales-one-pager', title: 'Sidekick Sales One-Pager', description: 'Sales automation overview', hub: 'content', contentType: 'one-pager', pageTemplate: 'micro-learning', publishDate: '2025-11-03' },
  { slug: 'intercom-fin-vs-sidekick', title: 'Intercom Fin vs Sidekick', description: 'Head-to-head with Intercom Fin AI', hub: 'content', contentType: 'battle-card', cardType: 'battle-card', pageTemplate: 'battle-card', publishDate: '2025-11-05' },
  { slug: 'product-roadmap-deck', title: 'Product Roadmap Deck', description: 'October roadmap presentation', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-05' },
  { slug: 'sidekick-one-pager', title: 'Sidekick One-Pager', description: 'AI assistant product overview', hub: 'content', contentType: 'one-pager', pageTemplate: 'micro-learning', publishDate: '2025-11-08' },
  { slug: 'salesforce-agentforce-vs-sidekick', title: 'Salesforce Agentforce vs Sidekick', description: 'Position against Salesforce Agentforce', hub: 'content', contentType: 'battle-card', cardType: 'battle-card', pageTemplate: 'battle-card', publishDate: '2025-11-10' },
  { slug: 'first-meeting-deck', title: 'First Meeting Deck', description: 'Initial prospect meeting presentation', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-10' },
  { slug: 'customer-ai-one-pager-template', title: 'Customer AI One-Pager Template', description: 'Customizable one-pager for AI capabilities overview', hub: 'content', contentType: 'one-pager', pageTemplate: 'micro-learning', publishDate: '2025-11-12' },
  { slug: 'executive-business-review-ebr', title: 'Executive Business Review (EBR)', description: 'Quarterly business review presentation template', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-14' },
  { slug: 'zendesk-vs-gladly-battle-card', title: 'Zendesk vs Gladly Battle Card', description: 'Competitive positioning against Zendesk AI', hub: 'content', contentType: 'battle-card', cardType: 'battle-card', pageTemplate: 'battle-card', publishDate: '2025-11-15' },
  { slug: 'sidekick-messaging-framework', title: 'Sidekick Messaging Framework', description: 'Internal positioning and messaging guidelines for Sidekick', hub: 'content', pageTemplate: 'micro-learning', publishDate: '2025-11-15' },
  { slug: 'executive-briefing-deck-template', title: 'Executive Briefing Deck Template', description: 'High-level presentation template for C-suite meetings', hub: 'content', contentType: 'deck', pageTemplate: 'micro-learning', publishDate: '2025-11-17', featured: true },
  { slug: 'gladly-platform-overview', title: 'Gladly Platform Overview', description: 'Single-page overview of the platform, key features, and benefits', hub: 'content', contentType: 'one-pager', pageTemplate: 'micro-learning', publishDate: '2025-11-18', featured: true },
  { slug: 'sierra-battlecard', title: 'Sierra Battlecard', description: "Position Gladly against Sierra's Agent OS and AI offerings", hub: 'content', contentType: 'battle-card', cardType: 'battle-card', pageTemplate: 'battle-card', publishDate: '2025-11-20' },
];

async function bulkImport() {
  console.log(`Processing ${ENTRIES.length} entries...\n`);

  let created = 0;
  let updated = 0;
  let errors = 0;

  // Get content type references
  const contentTypes = await client.fetch(`*[_type == "contentType"]{ _id, "slug": slug.current }`);
  const contentTypeMap: Record<string, string> = {};
  for (const ct of contentTypes) {
    contentTypeMap[ct.slug] = ct._id;
  }

  for (const entry of ENTRIES) {
    try {
      // Check if exists
      const existing = await client.fetch(
        `*[_type == "catalogEntry" && slug.current == $slug][0]{ _id, title }`,
        { slug: entry.slug }
      );

      const publishedTo = entry.hub === 'enablement' ? ['enablement'] :
                          entry.hub === 'content' ? ['content'] :
                          entry.hub === 'both' ? ['content', 'enablement'] : ['content'];

      const docData: Record<string, any> = {
        title: entry.title,
        description: entry.description,
        cardType: entry.cardType || 'content-card',
        pageTemplate: entry.pageTemplate || 'micro-learning',
        publishedTo,
        publishDate: entry.publishDate,
        status: 'published',
        priority: 50,
      };

      // Add content type reference if available
      if (entry.contentType && contentTypeMap[entry.contentType]) {
        docData.contentType = { _type: 'reference', _ref: contentTypeMap[entry.contentType] };
      }

      // Add enablement category if present
      if (entry.enablementCategory) {
        docData.enablementCategory = entry.enablementCategory;
      }

      // Add featured flag
      if (entry.featured) {
        docData.featured = true;
      }

      // Add external URL for content hub items
      if (entry.externalUrl) {
        docData.externalUrl = entry.externalUrl;
      }

      // Add video/transcript/slides URLs for enablement items
      if (entry.videoUrl) {
        docData['mainContent.videoUrl'] = entry.videoUrl;
        docData['resourceLinks.videoUrl'] = entry.videoUrl;
      }
      if (entry.transcriptUrl) {
        docData['resourceLinks.transcriptUrl'] = entry.transcriptUrl;
      }
      if (entry.slidesUrl) {
        docData['resourceLinks.slidesUrl'] = entry.slidesUrl;
      }

      if (existing) {
        // Update existing
        await client.patch(existing._id).set(docData).commit();
        console.log(`✏️  Updated: ${entry.title}`);
        updated++;
      } else {
        // Create new
        await client.create({
          _type: 'catalogEntry',
          slug: { _type: 'slug', current: entry.slug },
          ...docData,
        });
        console.log(`✅ Created: ${entry.title}`);
        created++;
      }
    } catch (error) {
      console.error(`❌ Error: ${entry.slug}`, error);
      errors++;
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`✅ Created: ${created}`);
  console.log(`✏️  Updated: ${updated}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`📊 Total: ${ENTRIES.length}`);
}

bulkImport().catch(console.error);
