/**
 * Import Content from Audit Sheet
 *
 * This script imports items from the audit that are NOT already in Sanity.
 * It preserves existing entries and only adds new ones.
 *
 * Usage: npx ts-node --transpile-only scripts/import-from-audit.ts
 */

import { createClient } from 'next-sanity';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 96);
}

// ============================================
// COE ENTRIES TO IMPORT (not in Sanity)
// ============================================

const COE_ENTRIES = [
  // Tools & Dashboards
  { title: 'CoE Assistant', entryType: 'tool' as const, toolType: 'assistant' },
  { title: 'CoE Submission Tips', entryType: 'best-practice' as const },
  { title: 'CoE Repository / Proof Point Repository', entryType: 'tool' as const, toolType: 'template' },
  { title: 'A+R Operational Tooling', entryType: 'tool' as const },
  { title: 'Gladly Reports and Insights', entryType: 'tool' as const },
  { title: 'Real CX Metrics', entryType: 'tool' as const },
  { title: 'Sidekick Debugging', entryType: 'tool' as const },
  { title: 'Cross-Org Guides Looker Dashboard', entryType: 'tool' as const },
  { title: 'Sidekick Answers and Guides Dashboard', entryType: 'tool' as const },
  { title: 'Sidekick Sales Resolution Dashboard', entryType: 'tool' as const },
  { title: 'Hex Answers Performance', entryType: 'tool' as const },
  { title: 'Hex Journey For Guides Report', entryType: 'tool' as const },
  { title: 'Sidekick Cross-Org Metrics', entryType: 'tool' as const },

  // Playbooks & Best Practices
  { title: 'Sidekick Adoption Playbook', entryType: 'best-practice' as const },
  { title: 'Sidekick Expansion Playbook', entryType: 'best-practice' as const },
  { title: 'Multi-Channel Optimization Guide: Scaling Beyond Single-Channel Success', entryType: 'best-practice' as const },
  { title: 'Daily Optimization: Customer Success Patterns', entryType: 'best-practice' as const },
  { title: 'Chat Optimization Mastery: The Path to 90% FCR', entryType: 'best-practice' as const },
  { title: 'Rapid Value Realization: Customer Success Patterns', entryType: 'best-practice' as const },
  { title: 'Integration Depth: Customer Success Patterns', entryType: 'best-practice' as const },
  { title: 'Sidekick Answers & Actions Best Practice', entryType: 'best-practice' as const },
  { title: 'Customer Presentation Best Practices', entryType: 'best-practice' as const },

  // Templates & Assets
  { title: 'Customer Asset Library', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Asset Submission Form', entryType: 'tool' as const, toolType: 'form' },
  { title: 'Sales to CS Handoff Template', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Smith Optics Example', entryType: 'meeting-asset' as const, account: 'Smith Optics' },
  { title: 'Birkenstock Example', entryType: 'meeting-asset' as const, account: 'Birkenstock' },
  { title: 'MEDPICCC Scorecard Template', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Proof Point Repository', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Customer Meeting Template (Megadeck)', entryType: 'tool' as const, toolType: 'template' },

  // Value Realization
  { title: 'Agent Communication Time Metric Play', entryType: 'best-practice' as const },
  { title: 'BVA Readout Template', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Sidekick Voice PAYG Pricing Calculator', entryType: 'tool' as const, toolType: 'calculator' },
  { title: 'Customer Meeting Slides', entryType: 'tool' as const, toolType: 'template' },
  { title: 'BVA Intro Deck for Customers', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Customer BVA One Pager', entryType: 'tool' as const, toolType: 'template' },
  { title: '*New* Pre-Sales BVA', entryType: 'tool' as const, toolType: 'calculator' },
  { title: 'Gladly Value Based Selling Series Video', entryType: 'best-practice' as const },

  // Competitive
  { title: 'Case Studies, Testimonials, Social Proof Slides', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Strategic Discovery Questions (SCs)', entryType: 'best-practice' as const },
  { title: 'Decagon Battlecard', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Genesys Battlecard', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Flip.cx Voice Battle Card', entryType: 'tool' as const, toolType: 'template' },

  // Slides
  { title: 'Online Marketplace Slides', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Online Marketplaces Slides', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Marketplace Sequence Messaging', entryType: 'best-practice' as const },

  // Voice
  { title: 'Sidekick Voice Top 20 Selling Kit', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Email How It Works One Pager', entryType: 'tool' as const, toolType: 'template' },
  { title: 'Tickets vs Customer One Pager', entryType: 'tool' as const, toolType: 'template' },

  // Enablement sessions that belong in CoE
  { title: 'BVA SLA + Demo Walkthrough', entryType: 'best-practice' as const },
  { title: 'Enablement: Assembled Partner Enablement', entryType: 'best-practice' as const },
  { title: 'Enablement: CS - SK ROI Calculator', entryType: 'tool' as const, toolType: 'calculator' },
  { title: 'Enablement: 6Sense Best Practices', entryType: 'best-practice' as const },
  { title: 'Enablement: Customer Presentation Best Practice', entryType: 'best-practice' as const },
  { title: 'Enablement: Guides and Journeys', entryType: 'best-practice' as const },
  { title: 'Enablement: Voice AI', entryType: 'best-practice' as const },
  { title: 'BVA + Calculator Refresh', entryType: 'tool' as const, toolType: 'calculator' },
  { title: 'Sidekick Voice: Demo, Pitch, Value', entryType: 'best-practice' as const },
  { title: 'Partnerships Barrel', entryType: 'best-practice' as const },
];

// ============================================
// CONTENT HUB ENTRIES TO IMPORT (not in Sanity)
// ============================================

const CONTENT_ENTRIES = [
  // Training & Academy
  { title: 'Gladly Academy', description: 'Gladly training and certification platform' },
  { title: 'Gladly Integrations Marketplace', description: 'Integration partners and marketplace' },
  { title: 'CX Benchmark Reports', description: 'Industry CX benchmark data' },

  // Sales Resources
  { title: 'SOW (Implementation) Packages', description: 'Statement of Work templates' },
  { title: 'Gladly Trust (Security & Compliance)', description: 'Security and compliance documentation' },
  { title: 'Customer Interest Tracker', description: 'Track customer interest and engagement' },
  { title: 'Mutual Action Plan', description: 'Mutual action plan template' },
  { title: 'Proposal Template', description: 'Sales proposal template' },
  { title: 'Content Garden', description: 'Content repository and garden' },
  { title: 'Roadmap Figma Prototypes', description: 'Product roadmap prototypes' },
  { title: 'Sales Implementation Template', description: 'Sales implementation documentation' },
  { title: 'Gladly One Pager', description: 'Gladly company overview one pager' },
  { title: 'Tickets vs Customer One Pager', description: 'Comparison of ticket-based vs customer-centric support' },
  { title: 'Gladly Eliminates Silos One Pager', description: 'How Gladly eliminates organizational silos' },
  { title: 'Sales + Marketing Org Chart', description: 'GTM organization structure' },
  { title: 'Demoing Gladly Set Up Instructions', description: 'Demo environment setup guide' },

  // CS Resources
  { title: 'Customer AI Guide', description: 'Guide to Customer AI features' },
  { title: 'CS Introduction Template (QUINCE)', description: 'CS intro template for new customers' },
  { title: 'Automated QBR Decks', description: 'Automated quarterly business review decks' },
  { title: 'CSM Compensation', description: 'CSM compensation documentation' },
  { title: 'Executive Meeting Schedule & Summaries', description: 'Executive meeting management' },

  // Marketing
  { title: 'Full Funnel Customer Expansion Dash', description: 'Dashboard for customer expansion tracking' },
  { title: 'Gladly Brand Guidelines (High Level)', description: 'Brand guidelines overview' },
  { title: 'Gladly Brand Guidelines', description: 'Detailed brand guidelines' },
  { title: 'GTM Launch Sizing', description: 'Go-to-market launch sizing framework' },
  { title: 'Gladly Awards Slide', description: 'Company awards and recognition' },
  { title: 'Inbound Content Tracker', description: 'Track inbound content performance' },
  { title: 'Content Cheat Sheet', description: 'Quick reference for content assets' },
  { title: 'Gladly Slide Template', description: 'Standard slide deck template' },

  // Templates & Decks
  { title: 'Architecture, Security, and Integrations Deck', description: 'Technical architecture overview' },
  { title: 'RFP Responses - Features and Capabilities Catalog', description: 'RFP response library' },
  { title: 'RFX Narrative Template', description: 'RFX narrative writing template' },
  { title: '101 Sales Implementation Template', description: 'Basic sales implementation template' },
  { title: '301 PS Implementation Template', description: 'Advanced PS implementation template' },
  { title: 'Answer Threads Kickoff Implementation Template', description: 'Answer Threads implementation guide' },
  { title: 'App Platform Slides', description: 'App Platform presentation slides' },
  { title: 'AI Features Slides', description: 'AI features overview slides' },
  { title: 'Sidekick Voice Slides', description: 'Sidekick Voice presentation' },
  { title: 'Nascar Logo Slides', description: 'Customer logo slides' },
  { title: 'Travel & Hospitality Slides', description: 'Vertical-specific slides' },
  { title: 'Partnership Capabilities Slides', description: 'Partner capability overview' },
  { title: 'Playvox + Gladly Slides', description: 'Playvox partnership slides' },
  { title: 'Clarabridge + Gladly Slides', description: 'Clarabridge partnership slides' },

  // One Pagers & Collateral
  { title: 'Self-Guided Implementation One Pager', description: 'Self-service implementation guide' },
  { title: 'Gladly Partner Battle Card One Pager', description: 'Partner competitive positioning' },
  { title: 'Online Marketplace Vertical One Pager', description: 'Marketplace vertical overview' },
  { title: 'Travel & Hospitality Vertical One Pager', description: 'Travel vertical overview' },
  { title: 'Travel & Hospitality Vertical Analysis', description: 'Travel vertical market analysis' },
  { title: 'Travel & Hospitality Sequence Messaging', description: 'Travel outreach messaging' },
  { title: 'Travel & Hospitality FAQs', description: 'Travel vertical FAQ' },
  { title: 'Online Marketplace Vertical Analysis', description: 'Marketplace vertical analysis' },
  { title: 'Online Marketplaces FAQs', description: 'Marketplace FAQ' },

  // Sidekick Content
  { title: 'Sidekick for Zendesk One Pager', description: 'Sidekick for Zendesk overview' },
  { title: 'Sidekick Sales Video', description: 'Sidekick Sales demo video' },
  { title: 'Sidekick Voice Video', description: 'Sidekick Voice demo video' },
  { title: 'Sidekick Email Video', description: 'Sidekick Email demo video' },
  { title: 'Intro Deck Sidekick Email', description: 'Sidekick Email introduction deck' },
  { title: 'Email Generic One Pager', description: 'Email channel one pager' },
  { title: 'Sidekick Sales Differentiation Battle Card', description: 'Sidekick Sales competitive positioning' },
  { title: 'Sidekick Sales Use Case PNG', description: 'Sidekick Sales use case visual' },
  { title: 'Sidekick Sales Messaging Brief', description: 'Sidekick Sales messaging guide' },
  { title: 'Sidekick Sales Command of the Message', description: 'MEDDIC for Sidekick Sales' },
  { title: 'Sidekick Voice Deck Template', description: 'Sidekick Voice presentation template' },
  { title: 'Sidekick Voice Email Template', description: 'Sidekick Voice email template' },
  { title: 'Sidekick Voice Positioning Pricing', description: 'Sidekick Voice pricing guide' },
  { title: 'Voice Competitive Landscape', description: 'Voice AI competitive analysis' },
  { title: 'Sidekick Voice vs. The Rest', description: 'Voice AI comparison' },
  { title: 'Voice Readiness Checklist', description: 'Voice implementation checklist' },
  { title: 'Voice Testing Checklist', description: 'Voice QA checklist' },
  { title: 'Social Comments Slide Insert', description: 'Social comments feature slides' },

  // Competitive
  { title: 'Competitive Capability Research', description: 'Competitive research library' },
  { title: 'Zendesk Competitive Snapshot', description: 'Zendesk competitive analysis' },
  { title: 'Zendesk Sidekick Battle Card (External)', description: 'Zendesk comparison (shareable)' },
  { title: 'Salesforce Agent Sidekick Battle Card (External)', description: 'Salesforce comparison (shareable)' },
  { title: 'Intercom Fin Sidekick Battle Card (External)', description: 'Intercom comparison (shareable)' },
  { title: 'Intercom Fin Battlecard', description: 'Intercom Fin competitive analysis' },
  { title: 'Gorgias Battlecard', description: 'Gorgias competitive analysis' },
  { title: 'Salesforce Service Cloud Battle Card 2024', description: 'Salesforce Service Cloud analysis' },
  { title: 'Linc Battle Card 2024', description: 'Linc competitive analysis' },
  { title: 'Sprinklr Battlecard 2024', description: 'Sprinklr competitive analysis' },
  { title: 'Zendesk vs Gladly: CI Analysis 2025', description: 'Zendesk competitive intelligence' },

  // Sequences & Outreach
  { title: 'Sidekick For Zendesk Sequence', description: 'Zendesk targeting sequence' },
  { title: 'One Off to Closed Lost Zendesk Sequence', description: 'Re-engagement sequence' },
  { title: 'CX Persona (Flow A) - AI forward', description: 'AI-forward persona messaging' },
  { title: 'CX Persona (Flow B) - Common pain forward', description: 'Pain-forward persona messaging' },
  { title: 'Airline Vertical Sequence', description: 'Airline targeting sequence' },

  // Demo & Mockups
  { title: 'Zendesk Demo Mockup', description: 'Zendesk demo environment mockup' },
  { title: 'Kustomer Demo Mockup', description: 'Kustomer demo environment mockup' },
  { title: 'Salesforce Demo Mockup', description: 'Salesforce demo environment mockup' },
  { title: 'Gorgias Demo Mockup', description: 'Gorgias demo environment mockup' },
  { title: 'Standalone Demo Script', description: 'Standalone demo script' },
  { title: 'Guides Sales Prototype', description: 'Guides feature prototype' },
  { title: 'Gladly Demo 2025', description: '2025 demo environment' },
  { title: 'Deck Template', description: 'Standard deck template' },

  // Videos & Media
  { title: 'Stats for Customer AI', description: 'Customer AI statistics' },
  { title: 'New customer quotes', description: 'Customer testimonial quotes' },
  { title: 'Fortune article', description: 'Fortune press coverage' },
  { title: 'WIRED article', description: 'WIRED press coverage' },

  // Other
  { title: 'App Platform Templated Slides', description: 'App Platform slide templates' },
  { title: 'How to set up an App', description: 'App Platform setup guide' },
];

// ============================================
// ENABLEMENT ENTRIES TO IMPORT (not in Sanity)
// These are new enablement sessions from audit
// ============================================

const ENABLEMENT_ENTRIES = [
  // Demo Certification & Training
  { title: 'Gladly Platform Demo Guide & Script | Q2 2025 Demo Certification', description: 'Demo certification training and script' },
  { title: 'Demo Enablement: Mapping to Gladly Narrative', description: 'How to map demos to Gladly narrative' },
  { title: 'Demo Monkey Training', description: 'Demo Monkey tool training' },
  { title: 'Field Team Demo Certification (SCs)', description: 'SC demo certification program' },
  { title: 'Field Team Demo Certification (AEs/AMs)', description: 'AE/AM demo certification program' },
  { title: 'DealHub Certification', description: 'DealHub certification training' },
  { title: 'Deal Desk SSOT', description: 'Deal Desk single source of truth' },

  // Sales Process
  { title: 'Discovery', description: 'Discovery methodology training' },
  { title: 'Call Scripts', description: 'Sales call scripts and templates' },
  { title: 'Sidekick Sales Market Analysis', description: 'Market analysis for Sidekick Sales' },

  // Playbooks
  { title: 'Sidekick Expansion Playbook', description: 'Playbook for expanding Sidekick usage' },
  { title: 'Sidekick Adoption Playbook', description: 'Playbook for driving Sidekick adoption' },
  { title: 'Sidekick for Zendesk Play', description: 'Targeting Zendesk customers with Sidekick' },
  { title: 'Live Customer Example Play Library', description: 'Library of customer example plays' },
  { title: 'RFP Lockout Play', description: 'RFP lockout competitive strategy' },
  { title: 'Kustomer Competitor Knockout Play', description: 'Kustomer competitive takeout strategy' },
  { title: 'Champion Kit Play', description: 'Champion enablement kit' },

  // Product Enablement
  { title: 'App Platform Technical Enablement #1', description: 'App Platform technical training part 1' },
  { title: 'App Platform Technical Enablement #2', description: 'App Platform technical training part 2' },
  { title: 'App Platform Technical Enablement #3', description: 'App Platform technical training part 3' },
  { title: 'App Platform for Hero Technical Enablement #1', description: 'App Platform for Hero part 1' },
  { title: 'App Platform for Hero Technical Enablement #2', description: 'App Platform for Hero part 2' },
  { title: 'Gladly Customer AI Launch Video', description: 'Customer AI launch announcement' },
  { title: 'Gladly Customer AI Video', description: 'Customer AI overview video' },
  { title: 'Refuse to Compromise Keynote', description: 'Keynote presentation' },
  { title: 'Customer AI Video (30 sec)', description: 'Customer AI short video' },
  { title: 'Gladly Sidekick Video', description: 'Sidekick overview video' },
  { title: 'Social Comments Video', description: 'Social comments feature video' },
  { title: 'Social Comments Messaging Brief', description: 'Social comments messaging guide' },
  { title: 'MaestroQA + Gladly Slides', description: 'MaestroQA partnership training' },
  { title: '201 SC Implementation Template', description: 'SC implementation template' },

  // Recorded Enablement Sessions (dated)
  { title: 'MM/ENT Closing Excellence S4 → Close', description: 'Mid-market/Enterprise closing excellence training', enablementDate: '2025-12-11' },
  { title: 'SMB Sales Process Training', description: 'SMB sales process training', enablementDate: '2025-12-10' },
  { title: 'ENT/MM: Early Stage Execution S1→S3', description: 'Enterprise early stage execution training', enablementDate: '2025-12-04' },
  { title: 'Gladly Sales Process: S0 → S1', description: 'Sales process Stage 0 to Stage 1', enablementDate: '2025-11-13' },
  { title: 'Social Comments, Product Enhancement Requests, + Competitive Partner Support', description: 'Multi-topic enablement session', enablementDate: '2025-11-13' },
  { title: 'Unwrapped AI Partnership Enablement', description: 'AI partnership enablement session', enablementDate: '2025-11-12' },
  { title: 'Technical Buyer (CIO/CTO)', description: 'Selling to technical buyers', enablementDate: '2025-10-16' },
  { title: 'Sidekick Sales Launch Enablement', description: 'Sidekick Sales launch training', enablementDate: '2025-09-11' },
  { title: 'Sidekick Standalone Land Grab', description: 'Sidekick Standalone GTM strategy', enablementDate: '2025-08-28' },
  { title: 'Sales Activity Expectations & SK Voice AMA', description: 'Sales expectations and Voice Q&A', enablementDate: '2025-08-21' },
  { title: 'SimpleSat Partnership Enablement', description: 'SimpleSat partnership training', enablementDate: '2025-08-13' },
  { title: 'BVA SLA + Live Demo Walkthrough', description: 'BVA and demo walkthrough', enablementDate: '2025-07-17' },
  { title: 'Field Demo Certification Intro', description: 'Demo certification introduction', enablementDate: '2025-07-01' },
  { title: 'July All Hands', description: 'July all hands meeting', enablementDate: '2025-07-03' },
  { title: 'Sidekick for Zendesk', description: 'Sidekick for Zendesk training', enablementDate: '2025-06-26' },
  { title: 'Apollo.io Enablement', description: 'Apollo.io tool training', enablementDate: '2025-06-20' },
  { title: 'SK for Email + App Platform', description: 'Sidekick Email and App Platform', enablementDate: '2025-06-18' },
  { title: 'Selling High + FM Deck', description: 'High-value selling training', enablementDate: '2025-06-12' },
  { title: 'Sales All Hands - Sidekick Standalone', description: 'Sidekick Standalone all hands', enablementDate: '2025-06-06' },
  { title: 'June GTM All Hands', description: 'June GTM all hands', enablementDate: '2025-06-05' },
  { title: 'Answers on Voice Async Enablement', description: 'Voice AI async enablement', enablementDate: '2025-06-01' },
  { title: 'Sidekick Standalone Tactical Enablement', description: 'Sidekick Standalone tactical training', enablementDate: '2025-05-09' },
  { title: 'Sidekick Standalone + Sidekick Sales', description: 'Combined Sidekick training', enablementDate: '2025-05-25' },
  { title: 'Journey For Answers Technical AMA + White Glove Service', description: 'Technical Q&A and services', enablementDate: '2025-04-24' },
  { title: 'Sidekick for Voice', description: 'Sidekick Voice training', enablementDate: '2025-04-17' },
  { title: 'Sidekick Voice: Demo, Pitch, Value', description: 'Voice demo and pitch training', enablementDate: '2025-04-10' },
  { title: 'April GTM All Hands', description: 'April GTM all hands', enablementDate: '2025-04-03' },
  { title: 'BVA + Calculator Refresh', description: 'BVA calculator training', enablementDate: '2025-03-27' },
  { title: 'Assembled Partner Enablement', description: 'Assembled partnership training', enablementDate: '2025-03-15' },
  { title: 'CS - SK ROI Calculator', description: 'CS ROI calculator training', enablementDate: '2025-03-01' },
  { title: '6Sense Best Practices', description: '6Sense tool best practices', enablementDate: '2025-02-21' },
  { title: 'Customer Presentation Best Practice', description: 'Customer presentation tips', enablementDate: '2025-02-21' },
  { title: 'Guides and Journeys', description: 'Guides and Journeys feature training', enablementDate: '2025-01-16' },
  { title: 'Voice AI', description: 'Voice AI training', enablementDate: '2025-01-09' },
  { title: 'App Platform + Loop Returns', description: 'App Platform and Loop Returns', enablementDate: '2024-12-19' },
  { title: 'Transaction Threads', description: 'Transaction Threads training', enablementDate: '2024-12-11' },
  { title: 'Netomi Battle Card 2024', description: 'Netomi competitive analysis', enablementDate: '2024-01-01' },
];

// ============================================
// PROOF POINTS TO IMPORT (from reconciliation)
// ============================================

const PROOF_POINTS = [
  { title: '[PacSun] 90+ CSAT Score Consistently', customer: 'PacSun', headline: '90+ CSAT Score Consistently', proofType: 'stat' as const, kpis: ['csat'] },
  { title: '[Bark] 33% Decrease in overall Handle Time', customer: 'Bark', headline: '33% Decrease in overall Handle Time', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Bark] 56% Decrease in wait time on chat', customer: 'Bark', headline: '56% Decrease in wait time on chat', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Birdies] 69% of customers leveraged self-service', customer: 'Birdies', headline: '69% of customers leveraged self-service', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Birdies] 88% First Call Resolution Rate', customer: 'Birdies', headline: '88% First Call Resolution Rate', proofType: 'stat' as const, kpis: ['fcr'] },
  { title: '[Deckers] 60% of Customers Self-Service', customer: 'Deckers', headline: '60% of Customers Self-Service', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Deckers] 29% Reduction in Order-to-Contact Ratio', customer: 'Deckers', headline: '29% Reduction in Order-to-Contact Ratio', proofType: 'stat' as const, kpis: ['conversation-volume'] },
  { title: "[Allbirds] 87% of 'cancel order' conversations resolved", customer: 'Allbirds', headline: "87% of 'cancel order' conversations resolved", proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Allbirds] 41% decrease in chat AHT', customer: 'Allbirds', headline: '41% decrease in chat AHT', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Best Choice Products] 26% reduction in email AHT', customer: 'Best Choice Products', headline: '26% reduction in email AHT', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Best Choice Products] 27% resolution rate on assisted conversations', customer: 'Best Choice Products', headline: '27% resolution rate on assisted conversations', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Best Choice Products] 33% of email conversations assisted by Sidekick', customer: 'Best Choice Products', headline: '33% of email conversations assisted by Sidekick', proofType: 'stat' as const, kpis: ['agent-productivity'] },
  { title: '[Birdies] 39% of email conversations assisted by Sidekick', customer: 'Birdies', headline: '39% of email conversations assisted by Sidekick', proofType: 'stat' as const, kpis: ['agent-productivity'] },
  { title: '[Bombas] 35% Decrease in TTFR', customer: 'Bombas', headline: '35% Decrease in TTFR', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Bombas] 81% decrease in TTFR', customer: 'Bombas', headline: '81% decrease in TTFR', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Bombas] 88% Resolution rate for repair and damage order', customer: 'Bombas', headline: '88% Resolution rate for repair and damage order', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Bonafide] 50% average ROI', customer: 'Bonafide', headline: '50% average ROI', proofType: 'stat' as const, kpis: ['cost-savings'] },
  { title: '[Bonafide] 65 hero hours saved', customer: 'Bonafide', headline: '65 hero hours saved', proofType: 'stat' as const, kpis: ['agent-productivity'] },
  { title: '[Bonafide] 54% of conversations resolved', customer: 'Bonafide', headline: '54% of conversations resolved', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Cosabella] 48% of conversations resolved', customer: 'Cosabella', headline: '48% of conversations resolved', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Rothy\'s] Increased chat volume from 2% to 41%', customer: "Rothy's", headline: 'Increased chat volume from 2% to 41%', proofType: 'stat' as const, kpis: ['conversation-volume'] },
  { title: '[Rothy\'s] 31% of conversations resolved with AI', customer: "Rothy's", headline: '31% of conversations resolved with AI', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Rothy\'s] 93%+ AI CSAT', customer: "Rothy's", headline: '93%+ AI CSAT', proofType: 'stat' as const, kpis: ['csat'] },
  { title: '[Rothy\'s] 34% reduction in AHT', customer: "Rothy's", headline: '34% reduction in AHT', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Rothy\'s] 83% SLA across all channels', customer: "Rothy's", headline: '83% SLA across all channels', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Rothy\'s] 80% decrease in agent attrition rate', customer: "Rothy's", headline: '80% decrease in agent attrition rate', proofType: 'stat' as const, kpis: ['agent-productivity'] },
  { title: '[Breeze Airways] 61% resolution rate for pre-booking questions', customer: 'Breeze Airways', headline: '61% resolution rate for pre-booking questions (bags, kids, pets)', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Breeze Airways] 40% capacity growth on flat Guest interactions', customer: 'Breeze Airways', headline: '40% capacity growth on flat Guest interactions (March-July 2024 YoY)', proofType: 'stat' as const, kpis: ['agent-productivity'] },
  { title: '[Breeze Airways] 90%+ conversations through digital channels', customer: 'Breeze Airways', headline: '90%+ conversations through digital channels', proofType: 'stat' as const, kpis: ['conversation-volume'] },
  { title: '[Breeze Airways] 95% improvement in SMS wait times', customer: 'Breeze Airways', headline: '95% improvement in SMS wait times', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Breeze Airways] Only 6% of guests needing contact during peak travel', customer: 'Breeze Airways', headline: 'Only 6% of guests needing contact during peak travel', proofType: 'stat' as const, kpis: ['conversation-volume'] },
  { title: '[Breeze Airways] Industry-leading NPS of 59', customer: 'Breeze Airways', headline: 'Industry-leading NPS of 59', proofType: 'stat' as const, kpis: ['csat'] },
  { title: '[Breeze Airways] 45% decrease in handle times', customer: 'Breeze Airways', headline: '45% decrease in handle times', proofType: 'stat' as const, kpis: ['aht'] },
  { title: '[Breeze Airways] 37% of conversations resolved with AI', customer: 'Breeze Airways', headline: '37% of conversations resolved with AI', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Breeze Airways] 71% of conversations AI-assisted', customer: 'Breeze Airways', headline: '71% of conversations AI-assisted', proofType: 'stat' as const, kpis: ['agent-productivity'] },
  { title: '[Breeze Airways] 69% customer adoption of self-service options', customer: 'Breeze Airways', headline: '69% customer adoption of self-service options', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Breeze Airways] Only 0.2% of 500,000+ interactions requiring phone support', customer: 'Breeze Airways', headline: 'Only 0.2% of 500,000+ interactions requiring phone support', proofType: 'stat' as const, kpis: ['conversation-volume'] },
  { title: '[Smith Optics] Increased AI resolution rate by 40% in 2 weeks', customer: 'Smith Optics', headline: 'Increased AI resolution rate by 40% in just 2 weeks by leaning into Suggested Answers from Journeys, with resolution rate jumping to 50%', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Smith Optics] 58% resolution rate for Warranty conversations', customer: 'Smith Optics', headline: '58% resolution rate for Warranty conversations', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Kuhl] 59% email resolution with AI', customer: 'Kuhl', headline: '59% email resolution with AI', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Kuhl] 27% chat resolution rate', customer: 'Kuhl', headline: '27% chat resolution rate', proofType: 'stat' as const, kpis: ['resolution-rate'] },
  { title: '[Kuhl] 44% reduction in WISMO emails', customer: 'Kuhl', headline: '44% reduction in WISMO emails', proofType: 'stat' as const, kpis: ['conversation-volume'] },
  { title: '[Kuhl] Weekend email volume reduced from 100+ to approximately 40', customer: 'Kuhl', headline: 'Weekend email volume reduced from 100+ to approximately 40', proofType: 'stat' as const, kpis: ['conversation-volume'] },
  { title: '[Kuhl] Increased upsell 120% per call', customer: 'Kuhl', headline: 'Increased upsell 120% per call', proofType: 'stat' as const, kpis: ['revenue-impact'] },
  { title: '[Internal] 15M total conversations powered by Gladly Sidekick', customer: 'Internal', headline: '15M total conversations powered by Gladly Sidekick', proofType: 'benchmark' as const, kpis: ['conversation-volume'] },
  { title: '[Internal] 240M total conversations powered by Gladly Customer AI', customer: 'Internal', headline: '240M total conversations powered by Gladly Customer AI', proofType: 'benchmark' as const, kpis: ['conversation-volume'] },
  { title: '[Internal] $510M in cumulative cost savings across brands using Gladly Customer AI', customer: 'Internal', headline: '$510M in cumulative cost savings across brands using Gladly Customer AI', proofType: 'benchmark' as const, kpis: ['cost-savings'] },
  { title: '[Q1 benchmark] 14% SMS resolution rate', customer: 'Internal', headline: '14% SMS resolution rate', proofType: 'benchmark' as const, kpis: ['resolution-rate'] },
  { title: '[Q1 benchmark] 78% Chat Assisted Conversation rate', customer: 'Internal', headline: '78% Chat Assisted Conversation rate', proofType: 'benchmark' as const, kpis: ['agent-productivity'] },
  { title: '[Q1 benchmark] 36% Email Assisted Conversation rate', customer: 'Internal', headline: '36% Email Assisted Conversation rate', proofType: 'benchmark' as const, kpis: ['agent-productivity'] },
];

// ============================================
// MEETING ASSETS TO IMPORT (from reconciliation)
// ============================================

const MEETING_ASSETS = [
  { account: 'Nordstrom', meetingType: 'Exec Meeting' },
  { account: 'Crate & Barrel', meetingType: 'EBR' },
  { account: 'Ulta', meetingType: 'EBR' },
  { account: 'The Farmers Dog', meetingType: 'BVA' },
  { account: 'Sierra vs Gladly TCO', meetingType: 'Exec Meeting' },
  { account: 'Catalyst', meetingType: 'BVA' },
  { account: 'Alternative Airlines', meetingType: 'BVA' },
  { account: 'West Wing', meetingType: 'BVA' },
  { account: 'REI', meetingType: 'EBR' },
  { account: 'Express', meetingType: 'BVA' },
  { account: 'StockX', meetingType: 'EBR' },
  { account: 'Tory Burch', meetingType: 'EBR' },
  { account: 'Netflix', meetingType: 'RFX' },
  { account: 'Belk', meetingType: 'BVA' },
  { account: 'AG1', meetingType: 'Strategy Session' },
  { account: 'Sephora', meetingType: 'RFX' },
  { account: 'Movado', meetingType: 'BVA' },
  { account: 'Warby Parker', meetingType: 'QBR' },
  { account: 'Deckers', meetingType: 'Strategy Session' },
];

// ============================================
// IMPORT FUNCTIONS
// ============================================

async function getExistingSlugs(): Promise<Set<string>> {
  const [catalogSlugs, coeSlugs] = await Promise.all([
    client.fetch(`*[_type == "catalogEntry"].slug.current`),
    client.fetch(`*[_type == "coeEntry"].slug.current`),
  ]);
  return new Set([...catalogSlugs, ...coeSlugs].filter(Boolean));
}

async function importCoeEntries(existingSlugs: Set<string>) {
  console.log('\n=== IMPORTING COE ENTRIES ===');
  let imported = 0;
  let skipped = 0;

  for (const entry of COE_ENTRIES) {
    const slug = createSlug(entry.title);
    if (existingSlugs.has(slug)) {
      console.log(`  SKIP: ${entry.title} (already exists)`);
      skipped++;
      continue;
    }

    const doc = {
      _type: 'coeEntry',
      title: entry.title,
      slug: { _type: 'slug', current: slug },
      entryType: entry.entryType,
      toolType: 'toolType' in entry ? entry.toolType : undefined,
      account: 'account' in entry ? entry.account : undefined,
      status: 'draft',
      priority: 50,
    };

    try {
      await client.create(doc);
      console.log(`  CREATED: ${entry.title}`);
      imported++;
      existingSlugs.add(slug);
    } catch (err: any) {
      console.log(`  ERROR: ${entry.title} - ${err.message}`);
    }
  }

  console.log(`CoE: ${imported} imported, ${skipped} skipped`);
}

async function importContentEntries(existingSlugs: Set<string>) {
  console.log('\n=== IMPORTING CONTENT HUB ENTRIES ===');
  let imported = 0;
  let skipped = 0;

  for (const entry of CONTENT_ENTRIES) {
    const slug = createSlug(entry.title);
    if (existingSlugs.has(slug)) {
      console.log(`  SKIP: ${entry.title} (already exists)`);
      skipped++;
      continue;
    }

    const doc = {
      _type: 'catalogEntry',
      title: entry.title,
      description: entry.description,
      slug: { _type: 'slug', current: slug },
      publishedTo: ['content'],
      status: 'draft',
      priority: 50,
    };

    try {
      await client.create(doc);
      console.log(`  CREATED: ${entry.title}`);
      imported++;
      existingSlugs.add(slug);
    } catch (err: any) {
      console.log(`  ERROR: ${entry.title} - ${err.message}`);
    }
  }

  console.log(`Content Hub: ${imported} imported, ${skipped} skipped`);
}

async function importEnablementEntries(existingSlugs: Set<string>) {
  console.log('\n=== IMPORTING ENABLEMENT ENTRIES ===');
  let imported = 0;
  let skipped = 0;

  for (const entry of ENABLEMENT_ENTRIES) {
    const slug = createSlug(entry.title);
    if (existingSlugs.has(slug)) {
      console.log(`  SKIP: ${entry.title} (already exists)`);
      skipped++;
      continue;
    }

    const doc = {
      _type: 'catalogEntry',
      title: entry.title,
      description: entry.description,
      slug: { _type: 'slug', current: slug },
      publishedTo: ['enablement'],
      status: 'draft',
      priority: 50,
      publishDate: 'enablementDate' in entry ? entry.enablementDate : undefined,
    };

    try {
      await client.create(doc);
      console.log(`  CREATED: ${entry.title}`);
      imported++;
      existingSlugs.add(slug);
    } catch (err: any) {
      console.log(`  ERROR: ${entry.title} - ${err.message}`);
    }
  }

  console.log(`Enablement: ${imported} imported, ${skipped} skipped`);
}

async function importProofPoints(existingSlugs: Set<string>) {
  console.log('\n=== IMPORTING PROOF POINTS ===');
  let imported = 0;
  let skipped = 0;

  for (const entry of PROOF_POINTS) {
    const slug = createSlug(entry.title);
    if (existingSlugs.has(slug)) {
      console.log(`  SKIP: ${entry.title} (already exists)`);
      skipped++;
      continue;
    }

    const doc = {
      _type: 'coeEntry',
      title: entry.title,
      slug: { _type: 'slug', current: slug },
      entryType: 'proof-point',
      customer: entry.customer,
      headline: entry.headline,
      proofType: entry.proofType,
      kpis: entry.kpis,
      status: 'draft',
      priority: 50,
    };

    try {
      await client.create(doc);
      console.log(`  CREATED: ${entry.title}`);
      imported++;
      existingSlugs.add(slug);
    } catch (err: any) {
      console.log(`  ERROR: ${entry.title} - ${err.message}`);
    }
  }

  console.log(`Proof Points: ${imported} imported, ${skipped} skipped`);
}

async function importMeetingAssets(existingSlugs: Set<string>) {
  console.log('\n=== IMPORTING MEETING ASSETS ===');
  let imported = 0;
  let skipped = 0;

  for (const entry of MEETING_ASSETS) {
    const title = `${entry.account} - ${entry.meetingType}`;
    const slug = createSlug(title);
    if (existingSlugs.has(slug)) {
      console.log(`  SKIP: ${title} (already exists)`);
      skipped++;
      continue;
    }

    const doc = {
      _type: 'coeEntry',
      title: title,
      slug: { _type: 'slug', current: slug },
      entryType: 'meeting-asset',
      account: entry.account,
      meetingType: entry.meetingType,
      status: 'draft',
      priority: 50,
    };

    try {
      await client.create(doc);
      console.log(`  CREATED: ${title}`);
      imported++;
      existingSlugs.add(slug);
    } catch (err: any) {
      console.log(`  ERROR: ${title} - ${err.message}`);
    }
  }

  console.log(`Meeting Assets: ${imported} imported, ${skipped} skipped`);
}

// ============================================
// MAIN
// ============================================

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN environment variable is required');
    console.log('Run: export SANITY_API_TOKEN=your_token_here');
    process.exit(1);
  }

  console.log('Starting import from audit...\n');
  console.log('This will ONLY add items that do not already exist.');
  console.log('Existing entries will be preserved.\n');

  const existingSlugs = await getExistingSlugs();
  console.log(`Found ${existingSlugs.size} existing entries in Sanity\n`);

  await importCoeEntries(existingSlugs);
  await importContentEntries(existingSlugs);
  await importEnablementEntries(existingSlugs);
  await importProofPoints(existingSlugs);
  await importMeetingAssets(existingSlugs);

  console.log('\n=== IMPORT COMPLETE ===');
  console.log('\nNext steps:');
  console.log('1. Open Sanity Studio to review imported entries');
  console.log('2. Add missing URLs (externalUrl, videoUrl, etc.)');
  console.log('3. Add descriptions and other metadata');
  console.log('4. Change status from "draft" to "published" when ready');
}

main().catch(console.error);
