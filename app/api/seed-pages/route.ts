import { adminClient } from '@/lib/sanity-admin';
import { NextResponse } from 'next/server';

// Helper function to create text blocks
const text = (content: string, style: string = 'normal', key?: string) => ({
  _type: 'block',
  _key: key || Math.random().toString(36).substr(2, 9),
  style,
  children: [{ _type: 'span', marks: [], text: content }],
});

const pages = [
  // COE Main Page
  {
    _id: 'page-coe',
    _type: 'page',
    title: 'Center of Excellence',
    slug: { _type: 'slug', current: 'coe' },
    subtitle: 'Customer wins, best practices, and proof points that drive Sidekick success',
    heroColor: 'purple',
    content: [
      text('The Center of Excellence is your hub for proof points, best practices, and customer success stories that demonstrate the value of Sidekick AI.'),
      text('Core Proof Points', 'h2'),
      text('Access customer proof points (externally approved only!), social proof templates, and performance dashboards.'),
      text('Best Practices', 'h2'),
      text('Centralized playbooks, strategies, and frameworks to drive adoption, efficiency, and ROI from our Design, PS, TAM, product and engineering teams. Includes operational tooling, Gladly Reports and Insights, Real CX Metrics, implementation guides, and optimization playbooks.'),
      text('Recent Customer Wins', 'h2'),
      text('Real-world anecdotes, innovative implementations, and success stories from customers using Sidekick. Submit your wins via Slack using /coe.'),
      text('Sidekick Performance', 'h2'),
      text('Access dashboards for Sidekick Guides, Sidekick Answers, and Sidekick Sales Resolutions to track performance metrics.'),
    ],
  },

  // BVA Page
  {
    _id: 'page-coe-bva',
    _type: 'page',
    title: 'Business Value Assessment (BVA)',
    slug: { _type: 'slug', current: 'coe/bva' },
    subtitle: 'Quantify the ROI and business impact of Gladly\'s platform through structured analysis, benchmarking, and financial modeling',
    heroColor: 'green',
    content: [
      text('What it is', 'h2'),
      text('The Business Value Assessment (BVA) is a quantified analysis that measures the ROI and business impact of implementing Gladly. It combines industry benchmarks, customer data, and financial modeling to demonstrate cost savings, efficiency gains, and revenue impact.'),
      text('Why it matters: Procurement and finance teams require quantified ROI to justify technology investments. BVAs provide data-backed justification that accelerates deal cycles and strengthens business cases.'),
      text('Who it\'s for: Sales teams selling to enterprise accounts, especially those requiring C-level or procurement approval with formal ROI documentation.'),
      text('Content', 'h2'),
      text('Access BVA templates, ROI calculators, industry benchmarks, and a case study library featuring real customer ROI examples.'),
      text('How to Run a BVA', 'h2'),
      text('Follow our step-by-step BVA runbook with discovery questions and presentation guides to conduct effective assessments and present findings to stakeholders.'),
      text('Enablement', 'h2'),
      text('Complete BVA training videos, certification programs for sales teams, and weekly office hours for support.'),
    ],
  },

  // AI Best Practices
  {
    _id: 'page-coe-ai-best-practices',
    _type: 'page',
    title: 'AI Best Practices',
    slug: { _type: 'slug', current: 'coe/ai-best-practices' },
    subtitle: 'Proven frameworks, implementation strategies, and optimization techniques for deploying AI in customer service environments',
    heroColor: 'blue',
    content: [
      text('What it is', 'h2'),
      text('AI Best Practices is a curated collection of proven strategies, frameworks, and implementation guides for successfully deploying and optimizing AI in customer service. It includes setup guides, optimization playbooks, and real-world examples.'),
      text('Why it matters: AI implementations often fail due to poor configuration, lack of optimization, or unclear success metrics. These best practices accelerate time-to-value and maximize AI performance.'),
      text('Who it\'s for: Implementation teams, customer success managers, and CX operations leaders responsible for deploying and managing AI solutions.'),
      text('Implementation Guides', 'h2'),
      text('Access AI setup checklists, prompt engineering guides, knowledge base optimization strategies, and common AI workflow templates.'),
      text('Optimization Playbooks', 'h2'),
      text('Learn performance tuning techniques to improve accuracy and response quality, escalation optimization to reduce unnecessary escalations, and A/B testing frameworks.'),
      text('Training & Enablement', 'h2'),
      text('Complete AI fundamentals courses, advanced optimization training, and AI specialist certification programs.'),
    ],
  },

  // Customer Wins
  {
    _id: 'page-coe-customer-wins',
    _type: 'page',
    title: 'Customer Success Stories',
    slug: { _type: 'slug', current: 'coe/customer-wins' },
    subtitle: 'Real customer success stories, metrics, and outcomes organized by industry, use case, and product',
    heroColor: 'orange',
    content: [
      text('What it is', 'h2'),
      text('The Customer Wins Library is a searchable collection of customer success stories, including metrics, quotes, use cases, and video testimonials. Stories are tagged by industry, product, use case, and company size for easy discovery.'),
      text('Why it matters: Prospects trust peer validation more than vendor claims. Relevant customer stories with quantified outcomes significantly increase win rates and shorten sales cycles.'),
      text('Who it\'s for: Sales, customer success, and marketing teams who need compelling proof points and social proof for prospect conversations.'),
      text('Featured Success Stories', 'h2'),
      text('87% AI Resolution Rate - Beauty brand achieves industry-leading automation'),
      text('$2M Cost Savings - Retailer ROI in first year'),
      text('40% Handle Time Reduction - Efficiency gains with Sidekick'),
      text('95% CSAT with AI - Maintaining quality while scaling'),
    ],
  },

  // Demo Resources
  {
    _id: 'page-enablement-demo',
    _type: 'page',
    title: 'Demo Resources',
    slug: { _type: 'slug', current: 'enablement/demo' },
    subtitle: 'Interactive demos, demo scripts, and presentation guides for showcasing Gladly\'s platform capabilities',
    heroColor: 'blue',
    content: [
      text('What it is', 'h2'),
      text('Demo Resources provides everything needed to deliver compelling product demonstrations, including interactive demo environments, scripted walkthroughs, and presentation best practices.'),
      text('Why it matters: Effective demos directly impact win rates. Structured demo resources ensure consistent, compelling product presentations across the sales organization.'),
      text('Who it\'s for: Sales engineers, account executives, and customer success teams delivering product demonstrations.'),
      text('Demo Environments', 'h2'),
      text('Access standard demo org, retail demo org with e-commerce data, and enterprise demo org for complex use cases.'),
      text('Demo Scripts', 'h2'),
      text('15-minute Sidekick demo for quick AI overview, 45-minute full platform walkthrough, and technical deep dive for architecture and integrations.'),
      text('Enablement', 'h2'),
      text('Demo certification training and best practices guides for effective demonstrations.'),
    ],
  },

  // Competitive Intelligence
  {
    _id: 'page-enablement-competitive',
    _type: 'page',
    title: 'Competitive Intelligence',
    slug: { _type: 'slug', current: 'enablement/competitive' },
    subtitle: 'Battlecards, positioning guides, and competitive analysis for winning against Zendesk, Salesforce, and other platforms',
    heroColor: 'orange',
    content: [
      text('What it is', 'h2'),
      text('Competitive Intelligence provides battlecards, positioning strategies, and objection handling for competing against major customer service platforms including Zendesk, Salesforce Service Cloud, Freshdesk, and others.'),
      text('Why it matters: Understanding competitor weaknesses and differentiating Gladly\'s unique value drives higher win rates in competitive deals.'),
      text('Who it\'s for: Sales teams, sales engineers, and customer success managers in competitive evaluations.'),
      text('Major Competitors', 'h2'),
      text('Access battlecards for Zendesk, Salesforce Service Cloud, Freshdesk/Freshworks, and Intercom with feature comparisons and positioning strategies.'),
      text('Positioning Strategies', 'h2'),
      text('Customer-Centric vs. Ticket-Centric architecture, AI Resolution vs. Containment philosophy, and Built-for-AI vs. AI Add-on advantages.'),
    ],
  },

  // Training Resources
  {
    _id: 'page-enablement-training',
    _type: 'page',
    title: 'Training & Certification',
    slug: { _type: 'slug', current: 'enablement/training' },
    subtitle: 'Comprehensive training programs, courses, and certification paths for sales, customer success, and technical teams',
    heroColor: 'purple',
    content: [
      text('What it is', 'h2'),
      text('Training & Certification provides structured learning paths, courses, and certification programs to build expertise across products, sales methodologies, and customer success practices.'),
      text('Why it matters: Well-trained teams close more deals, deliver better customer outcomes, and represent the brand more effectively.'),
      text('Who it\'s for: All go-to-market teams including sales, customer success, solutions consulting, and sales engineering.'),
      text('Sales Training', 'h2'),
      text('Gladly Sales Fundamentals, Discovery Mastery, Demo Certification, and Objection Handling workshops.'),
      text('Customer Success Training', 'h2'),
      text('CSM Onboarding, Implementation Best Practices, and Renewal & Expansion strategies.'),
      text('Certifications', 'h2'),
      text('Gladly Platform Certified, Sidekick AI Specialist, and Solutions Architect certifications.'),
    ],
  },

  // Playbooks
  {
    _id: 'page-enablement-playbooks',
    _type: 'page',
    title: 'Sales Playbooks',
    slug: { _type: 'slug', current: 'enablement/playbooks' },
    subtitle: 'Structured methodologies and frameworks for discovery, qualification, demos, and closing deals',
    heroColor: 'blue',
    content: [
      text('What it is', 'h2'),
      text('Sales Playbooks provide repeatable frameworks for executing key sales activities including discovery, qualification, demonstration, objection handling, and closing. Each playbook is tailored to specific buyer personas, industries, or deal types.'),
      text('Why it matters: Structured playbooks enable consistent execution, accelerate ramp time, and increase win rates by codifying what works.'),
      text('Who it\'s for: Account executives, sales engineers, and sales leaders managing deals and coaching teams.'),
      text('By Deal Stage', 'h2'),
      text('Prospecting, Discovery, Evaluation, and Negotiation playbooks for each stage of the sales cycle.'),
      text('By Buyer Persona', 'h2'),
      text('CX Leader, CTO/IT, and CFO/Procurement playbooks tailored to stakeholder priorities.'),
      text('Special Situations', 'h2'),
      text('Competitive Displacement, Enterprise Deals, and Fast-Track Deal playbooks.'),
    ],
  },

  // Sales Toolkit
  {
    _id: 'page-toolkit-sales',
    _type: 'page',
    title: 'Sales Toolkit',
    slug: { _type: 'slug', current: 'enablement/toolkits/sales' },
    subtitle: 'Everything sales teams need: decks, one-pagers, email templates, objection handling, and sales enablement materials',
    heroColor: 'blue',
    content: [
      text('What it is', 'h2'),
      text('The Sales Toolkit provides all materials sales teams need to execute deals: presentation decks, one-pagers, email templates, battlecards, ROI calculators, and proposal templates.'),
      text('Why it matters: Having ready-to-use, high-quality materials enables sales teams to move faster and present more professionally.'),
      text('Who it\'s for: Account executives, sales development reps, and sales engineers.'),
      text('Presentation Materials', 'h2'),
      text('First Meeting Deck, Product Deep Dive, Executive Summary Deck, and Security & Compliance presentations.'),
      text('Outreach & Follow-up', 'h2'),
      text('Cold email sequences, meeting follow-up templates, and proposal cover letters.'),
      text('Sales Tools', 'h2'),
      text('Interactive ROI calculator, pricing guide, and discovery question bank.'),
    ],
  },

  // CSM Toolkit
  {
    _id: 'page-toolkit-csm',
    _type: 'page',
    title: 'CSM Toolkit',
    slug: { _type: 'slug', current: 'enablement/toolkits/csm' },
    subtitle: 'Resources for customer success managers including onboarding guides, QBR templates, expansion playbooks, and retention strategies',
    heroColor: 'purple',
    content: [
      text('What it is', 'h2'),
      text('The CSM Toolkit provides customer success managers with resources for onboarding, adoption, renewal, and expansion including playbooks, templates, and best practices.'),
      text('Why it matters: Effective customer success drives retention, expansion, and customer advocacy—key drivers of revenue growth.'),
      text('Who it\'s for: Customer success managers and customer success leaders.'),
      text('Onboarding & Implementation', 'h2'),
      text('Kickoff deck templates, implementation checklists, success criteria frameworks, and customer training materials.'),
      text('Ongoing Success', 'h2'),
      text('QBR deck templates, executive summary reports, and optimization workshop materials.'),
      text('Renewal & Expansion', 'h2'),
      text('Renewal playbooks, expansion opportunity identification, and business case templates.'),
    ],
  },

  // SC Toolkit
  {
    _id: 'page-toolkit-success',
    _type: 'page',
    title: 'Solutions Consultant Toolkit',
    slug: { _type: 'slug', current: 'enablement/toolkits/success' },
    subtitle: 'Technical resources for SCs including implementation guides, best practices, and optimization frameworks',
    heroColor: 'green',
    content: [
      text('What it is', 'h2'),
      text('The Success Toolkit provides resources for ensuring customer success including implementation guides, optimization frameworks, training materials, and customer-facing resources.'),
      text('Why it matters: Successful implementations drive product adoption, customer satisfaction, and long-term retention.'),
      text('Who it\'s for: Implementation specialists, customer success teams, and professional services.'),
      text('Implementation Resources', 'h2'),
      text('Implementation runbooks, configuration checklists, testing frameworks, and go-live checklists.'),
      text('Customer Training', 'h2'),
      text('Admin training decks, agent training materials, and train-the-trainer guides.'),
      text('Optimization', 'h2'),
      text('Performance review frameworks, reporting & analytics guides, and AI optimization playbooks.'),
    ],
  },

  // Marketing Toolkit
  {
    _id: 'page-toolkit-marketing',
    _type: 'page',
    title: 'Marketing Toolkit',
    slug: { _type: 'slug', current: 'enablement/toolkits/marketing' },
    subtitle: 'Brand guidelines, campaign assets, social media content, and marketing collateral',
    heroColor: 'orange',
    content: [
      text('What it is', 'h2'),
      text('The Marketing Toolkit provides brand assets, campaign materials, social content, and marketing collateral for field marketing teams and partners.'),
      text('Why it matters: Consistent, high-quality marketing materials drive brand awareness, lead generation, and market positioning.'),
      text('Who it\'s for: Field marketing, partner marketing, and sales teams running campaigns.'),
      text('Brand Assets', 'h2'),
      text('Complete brand guidelines, logo library with all variations, color palette, and typography guide.'),
      text('Campaign Materials', 'h2'),
      text('Event booth graphics, webinar templates, and email nurture campaigns.'),
      text('Social & Digital', 'h2'),
      text('Social media templates, thought leadership content, and customer story social posts.'),
    ],
  },

  // Product Pages
  {
    _id: 'page-product-sidekick-standalone',
    _type: 'page',
    title: 'Sidekick Standalone',
    slug: { _type: 'slug', current: 'product/sidekick-standalone' },
    subtitle: 'Gladly\'s autonomous AI agent that handles customer conversations end-to-end, resolving inquiries without human intervention',
    heroColor: 'purple',
    content: [
      text('What it is', 'h2'),
      text('Sidekick Standalone is an autonomous AI agent that handles complete customer conversations across all channels—chat, email, SMS, and social—without human intervention. It resolves inquiries using real-time customer data, conversation history, and business systems.'),
      text('Why it matters: Unlike basic chatbots that deflect to FAQs, Sidekick resolves complete customer issues including order changes, returns, account updates, and complex inquiries—reducing costs while improving customer experience.'),
      text('Who it\'s for: B2C companies with high-volume, repetitive support needs looking to automate customer service while maintaining personalized, high-quality experiences.'),
      text('Key Capabilities', 'h2'),
      text('Autonomous resolution end-to-end, omnichannel deployment, real-time actions (process orders, update accounts, issue refunds), customer context awareness, brand voice customization, and seamless escalation to human agents.'),
    ],
  },

  {
    _id: 'page-product-sidekick-voice',
    _type: 'page',
    title: 'Sidekick Voice',
    slug: { _type: 'slug', current: 'product/sidekick-voice' },
    subtitle: 'AI-powered voice agent that handles phone conversations naturally with human-like interaction',
    heroColor: 'blue',
    content: [
      text('What it is', 'h2'),
      text('Sidekick Voice is an AI voice agent that handles inbound phone calls with natural conversation, resolving customer issues without human agents. It understands context, accesses systems in real-time, and escalates seamlessly when needed.'),
      text('Why it matters: Phone remains the highest-cost support channel. Sidekick Voice automates phone support while maintaining the personal, conversational experience customers expect, dramatically reducing costs.'),
      text('Who it\'s for: Companies with high call volumes looking to reduce phone support costs while maintaining or improving customer experience.'),
      text('Key Capabilities', 'h2'),
      text('Natural conversation with human-like voice interaction, phone call automation without human agents, real-time system access, multi-language support, sentiment detection, and IVR replacement.'),
    ],
  },

  {
    _id: 'page-product-sidekick-email',
    _type: 'page',
    title: 'Sidekick Email',
    slug: { _type: 'slug', current: 'product/sidekick-email' },
    subtitle: 'AI that reads, understands, and responds to customer emails automatically',
    heroColor: 'purple',
    content: [
      text('What it is', 'h2'),
      text('Sidekick Email automatically reads, triages, and responds to customer emails with fully resolved answers. It handles simple questions and complex issues requiring multiple steps or system actions.'),
      text('Why it matters: Email remains a primary support channel but is labor-intensive. Sidekick Email automates responses while maintaining personalization and quality, improving response times and reducing workload.'),
      text('Who it\'s for: Companies with high email volumes looking to improve response times and reduce manual email handling costs.'),
      text('Key Capabilities', 'h2'),
      text('Automated email response, intent understanding, multi-step resolution, personalized responses, attachment processing, and smart escalation.'),
    ],
  },

  {
    _id: 'page-product-sidekick-sales',
    _type: 'page',
    title: 'Sidekick Sales',
    slug: { _type: 'slug', current: 'product/sidekick-sales' },
    subtitle: 'AI that turns customer service conversations into revenue opportunities',
    heroColor: 'blue',
    content: [
      text('What it is', 'h2'),
      text('Sidekick Sales transforms customer service into a revenue channel by identifying sales opportunities in conversations, recommending products, and guiding agents through upsell conversations with AI-generated talking points.'),
      text('Why it matters: Customer service conversations are untapped revenue opportunities. Sidekick Sales helps agents recognize and capture these moments, turning cost centers into profit centers.'),
      text('Who it\'s for: E-commerce and retail companies looking to drive revenue through customer service interactions and increase customer lifetime value.'),
      text('Key Capabilities', 'h2'),
      text('Sales opportunity detection, AI-powered product recommendations, guided selling, revenue analytics, basket analysis, and agent coaching.'),
    ],
  },

  {
    _id: 'page-product-customer-ai',
    _type: 'page',
    title: 'Customer AI',
    slug: { _type: 'slug', current: 'product/customer-ai' },
    subtitle: 'The intelligence layer that powers radically efficient, radically personal customer experiences',
    heroColor: 'purple',
    content: [
      text('What is Gladly?', 'h2'),
      text('Gladly is Customer AI—a per-user intelligence layer that makes radically efficient, radically personal experiences possible. It unifies customer conversations, commerce, AI, and support teams through AI-powered customer intelligence.'),
      text('Why it matters: Most platforms treat customer data as isolated tickets rather than continuous relationships. Gladly\'s Customer AI creates a persistent intelligence layer that powers all interactions, enabling both AI agents and human teams to deliver personalized service at scale.'),
      text('Who it\'s for: B2C businesses with high-touch customer relationships, ecommerce platforms, and brands prioritizing customer experience over transactional support.'),
      text('Key Capabilities', 'h2'),
      text('Customer-centered platform (all interactions by customer, not tickets), AI-powered resolution and support, real-time customer context, omnichannel continuity, commerce integration, and trusted access & configuration.'),
    ],
  },

  {
    _id: 'page-product-guides-journeys',
    _type: 'page',
    title: 'Guides and Journeys',
    slug: { _type: 'slug', current: 'product/guides-journeys' },
    subtitle: 'No-code AI setup and optimization with full CX team control',
    heroColor: 'blue',
    content: [
      text('What it is', 'h2'),
      text('Sidekick Guides and Journeys simplify AI setup and optimization, giving CX teams full control without technical skills. Guides offers a no-code interface to create and manage AI workflows while Journeys provides insights and analytics to continuously improve AI performance.'),
      text('Why it matters: AI is often hard to manage and optimize without technical help. Guides and Journeys remove complexity, letting CX teams quickly set up, monitor, and refine AI to deliver more effective and personalized support at scale.'),
      text('Who it\'s for: B2C businesses and CX teams managing high volumes of support who need simple tools to configure and improve AI without technical skills.'),
      text('Key Capabilities', 'h2'),
      text('No-code AI workflow setup, continuous performance insights, instant updates and optimization, customer-centric workflow design, seamless feedback loop, multi-channel support, and unified AI and customer context.'),
    ],
  },

  {
    _id: 'page-product-app-platform',
    _type: 'page',
    title: 'App Platform',
    slug: { _type: 'slug', current: 'product/app-platform' },
    subtitle: 'Low-code integration layer connecting external systems directly to Gladly',
    heroColor: 'green',
    content: [
      text('What it is', 'h2'),
      text('Gladly\'s App Platform is a low-code integration layer that connects external systems like order management, loyalty, and payment directly to Gladly\'s interface for agents and AI.'),
      text('Why it matters: It eliminates tool-switching, gives agents full context, and lets AI act on real data—teams get faster setup, better service outcomes, and lower IT overhead.'),
      text('Who it\'s for: IT and CX teams at ecommerce and high-tech customers who rely on multiple systems to support customers and need simple tools to unify data across agents and AI.'),
      text('Key Capabilities', 'h2'),
      text('Bi-directional data sync (read and write), real-time visibility in Hero and Sidekick, 40+ pre-built integrations, open APIs and SDK, and enterprise security and compliance.'),
    ],
  },

  {
    _id: 'page-resources-templates',
    _type: 'page',
    title: 'Template Gallery',
    slug: { _type: 'slug', current: 'resources/templates' },
    subtitle: 'Deck templates and slide inserts for your presentations',
    heroColor: 'orange',
    content: [
      text('Brand Guidelines', 'h2'),
      text('Complete brand style guide including logos, colors, typography, imagery guidelines, and best practices for creating on-brand materials.'),
      text('Pitch Decks', 'h2'),
      text('Full presentation templates including First Meeting Pitch Deck, Specialized Team Pitch, and Buyer Persona-specific pitches.'),
      text('Product Decks', 'h2'),
      text('Deep dive product presentations including Sidekick for Enterprise, Product Storytelling Deck, and Zendesk Alternative positioning.'),
      text('Security + RFX Templates', 'h2'),
      text('Comprehensive security presentations, RFP/RFI response templates, and vendor security assessment templates.'),
      text('Implementation Decks', 'h2'),
      text('Customer onboarding kickoff presentations, 90-day implementation roadmaps, QBR templates, and success renewal decks.'),
    ],
  },

  {
    _id: 'page-resources-content',
    _type: 'page',
    title: 'Content Library',
    slug: { _type: 'slug', current: 'resources/content' },
    subtitle: 'All decks, one-pagers, collateral, and marketing materials in one place',
    heroColor: 'purple',
    content: [
      text('Product Presentations', 'h2'),
      text('Comprehensive decks for Sidekick Overview, Hero Platform, and Customer AI Deep Dive.'),
      text('One-Pagers & Product Sheets', 'h2'),
      text('Quick reference materials for all products: Sidekick Standalone, Sidekick Sales, Sidekick Voice, Sidekick Email, Hero Platform, and Platform Overview.'),
      text('Industry-Specific Materials', 'h2'),
      text('Tailored content for Retail & E-commerce, Beauty & Personal Care, and Travel & Hospitality verticals.'),
      text('Case Studies & Customer Stories', 'h2'),
      text('Success stories featuring 87% AI resolution rates, $2M cost savings, 40% handle time reduction, and 95% CSAT with AI.'),
      text('Marketing Collateral', 'h2'),
      text('Brand guidelines, email templates, and social media assets.'),
    ],
  },
];

export async function GET() {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: 'Missing SANITY_API_TOKEN in environment variables' },
        { status: 500 }
      );
    }

    // Create or replace each page
    const results = [];
    for (const page of pages) {
      const result = await adminClient.createOrReplace(page);
      results.push(result._id);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} pages with real content!`,
      pages: results,
    });
  } catch (error: any) {
    console.error('Error seeding pages:', error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 }
    );
  }
}
