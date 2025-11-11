import { adminClient } from '@/lib/sanity-admin';
import { NextResponse } from 'next/server';

const learningModules = [
  {
    _id: 'learning-module-1',
    _type: 'learningModule',
    title: 'Competitive Support Triage Process',
    slug: { _type: 'slug', current: 'competitive-triage-process' },
    category: 'competitive',
    moduleType: 'Process Guide',
    description:
      'Learn the proper escalation process when competitors reach out for support. This guide covers identification, routing, and communication protocols to protect our competitive advantage while maintaining professionalism.',
    oneLiner: 'When competitors contact you directly—route immediately to AI support',
    videoUrl: 'https://www.loom.com/embed/your-video-id', // Replace with actual URL
    videoDuration: 7,
    lastUpdated: '2025-01-10T10:00:00Z',
    keyTakeaways: [
      {
        icon: '👀',
        title: 'See It',
        description: 'Competitors reaching out via Slack, email, support tickets',
      },
      {
        icon: '➡️',
        title: 'Route It',
        description: 'Tag AI support channel immediately',
      },
      {
        icon: '🚫',
        title: "Don't Respond",
        description: 'Cold shoulder is strategy, not rudeness',
      },
    ],
    interactiveFlow: {
      question: 'Competitor asking for help?',
      paths: [
        {
          label: 'POC/Demo Support',
          route: 'Mel Macalister',
          description: 'Nordstrom-type scenarios requiring engineering',
        },
        {
          label: 'API/Feature Requests',
          route: 'Christian Eberle',
          description: 'Technical questions about our platform',
        },
        {
          label: 'Customer Questions',
          route: 'Support Team handles normally',
          description: 'Actual customer inquiries get standard treatment',
        },
      ],
    },
    examples: [
      {
        title: 'Nordstrom/Sierra Incident',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'A competitor using our platform for a Nordstrom POC reached out directly for technical support. This was immediately escalated to Mel Macalister who coordinated with engineering.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key Lesson: POC/demo scenarios require specialized handling to prevent knowledge transfer while maintaining the deal.',
              },
            ],
          },
        ],
      },
      {
        title: 'Natomi Incident',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Natomi contacted support with API questions. The team correctly identified this as competitive and routed to Christian Eberle for appropriate handling.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Outcome: Competitive inquiry was addressed without revealing strategic platform details.',
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What counts as a competitive inquiry?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Any request from known competitors (Kustomer, Zendesk, Freshworks, etc.) or companies building similar technology. If unsure, check the competitive list or ask AI support.',
              },
            ],
          },
        ],
      },
      {
        question: 'What if I already responded?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Tag AI support immediately and provide context about what information was shared. We can course-correct from there.',
              },
            ],
          },
        ],
      },
      {
        question: 'Is this rude to the competitor?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'No - this is standard industry practice. Competitors understand they are receiving limited support. It\'s strategic, not personal.',
              },
            ],
          },
        ],
      },
      {
        question: 'What about former employees at competitors?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Treat the same as any competitive inquiry. The company affiliation matters more than personal relationships.',
              },
            ],
          },
        ],
      },
    ],
    quickActions: {
      pdfUrl: '/downloads/competitive-triage-one-pager.pdf',
      slackTemplates: [
        'Tagging AI support - competitor inquiry needs triage @ai-support',
        'Competitive inquiry detected - @christian-eberle this is API/technical',
        'POC support needed for competitor - @mel-macalister can you assist?',
      ],
      relatedLinks: [
        {
          label: 'AI Support Channel',
          url: 'https://gladly.slack.com/archives/ai-support',
        },
        {
          label: 'Battle Cards',
          url: '/competitive',
        },
        {
          label: 'Competitor List',
          url: '/competitive/companies',
        },
      ],
    },
    productTags: ['All Products'],
    isActive: true,
  },
  {
    _id: 'learning-module-2',
    _type: 'learningModule',
    title: 'Foundation & Alignment',
    slug: { _type: 'slug', current: 'foundation-alignment' },
    category: 'process',
    moduleType: 'Sales Process Training',
    description:
      'Master the fundamentals of prospecting coordination, opportunity creation criteria, first meeting outcomes, and Salesforce hygiene. Understand who does what, when opportunities move stages, and how to keep your pipeline clean.',
    oneLiner: 'Prospecting roles, opportunity criteria, first meeting outcomes, and SLAs',
    videoUrl: 'https://www.loom.com/embed/foundation-alignment-video',
    videoDuration: 60,
    lastUpdated: '2025-01-10T10:00:00Z',
    keyTakeaways: [
      {
        icon: '👥',
        title: 'Clear Ownership',
        description: 'AEs drive strategy, BDRs support execution',
      },
      {
        icon: '🚀',
        title: '4 Criteria for S1',
        description: 'Right account, right person, right time, first meeting',
      },
      {
        icon: '⚡',
        title: 'Speed Matters',
        description: '20 min for demos, 12 hrs for MQLs',
      },
      {
        icon: '📋',
        title: 'Pipeline Hygiene',
        description: 'Clean data drives accurate forecasting and team alignment',
      },
    ],
    interactiveFlow: {
      question: 'Ready to move opportunity to S1?',
      paths: [
        {
          label: 'Right Account?',
          route: 'Bullseye or Adjacent ICP',
          description: 'Account must fit target profile',
        },
        {
          label: 'Right Individual?',
          route: 'Buying authority/influence',
          description: 'Decision maker or influencer identified',
        },
        {
          label: 'Right Time?',
          route: 'Renewal window OR Standalone compatible',
          description: 'Timing aligns with purchase cycle',
        },
        {
          label: 'First Meeting?',
          route: 'Qualified meeting complete',
          description: 'Discovery call conducted',
        },
      ],
    },
    examples: [
      {
        title: 'SMB Segment - Self-Prospecting',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'SMB AEs own all accounts and handle both inbound and outbound prospecting. They drive the entire cycle from prospecting to close without BDR support.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Closed/Won New Business. Activity expectations: 14 accounts touched and 3 contacts touched in L7, with 2 outbound opportunities in L30.',
              },
            ],
          },
        ],
      },
      {
        title: 'MM/ENT Coordination',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'For Mid-Market and Enterprise, AEs lead outbound strategy while BDRs support with inbound follow-up and targeted outbound. Weekly syncs are required to align on prioritization.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: Clear communication, shared account visibility, and understanding each role\'s responsibilities.',
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What are the 4 criteria to move an opportunity from S0 to S1?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: '1) Right Account (Bullseye or Adjacent ICP), 2) Right Individual (buying authority/influence), 3) Right Time to Buy (renewal window OR Standalone AI compatible), 4) First Meeting Complete (qualified meeting occurred).',
              },
            ],
          },
        ],
      },
      {
        question: 'What is the SLA for responding to demo requests?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: '20 minutes. Demo requests require immediate attention - book the meeting, qualify, and follow the handoff process.',
              },
            ],
          },
        ],
      },
      {
        question: 'What first meeting outcomes move an opportunity to S1?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Only "Completed - Qualified" moves to S1. This means the meeting occurred with a qualified contact who has buying authority and expressed genuine interest.',
              },
            ],
          },
        ],
      },
      {
        question: 'How often should MM/ENT AEs and BDRs sync?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Weekly syncs are required for MM/ENT. These meetings align on account prioritization, review the Ready to Win dashboard, discuss what\'s working, identify additional contacts, and determine if the AE needs assistance.',
              },
            ],
          },
        ],
      },
    ],
    quickActions: {
      pdfUrl: '/downloads/foundation-alignment-slides.pdf',
      resources: [
        {
          label: 'Sales Process Cheat Sheet',
          url: '/downloads/sales-process-cheat-sheet.pdf',
          type: 'doc',
        },
        {
          label: 'First Meeting Decision Tree',
          url: '/downloads/first-meeting-decision-tree.pdf',
          type: 'doc',
        },
        {
          label: 'SLA Quick Reference Guide',
          url: '/resources/sla-guide',
          type: 'doc',
        },
        {
          label: 'Salesforce Opportunity Dashboard',
          url: 'https://gladly.lightning.force.com/dashboards',
          type: 'tool',
        },
        {
          label: 'Rules of Engagement Doc',
          url: '/resources/rules-of-engagement',
          type: 'link',
        },
      ],
      quizUrl: 'https://forms.gle/foundation-alignment-quiz',
    },
    relatedModules: [
      {
        title: 'Early Stage Execution',
        slug: 'early-stage-execution',
        description: 'Master S1-S3: Discovery, solution validation, and active evaluation stages.',
      },
      {
        title: 'Closing Excellence',
        slug: 'closing-excellence',
        description: 'Navigate S4+, understand when to close lost, and maintain pipeline hygiene.',
      },
    ],
    productTags: ['All Products'],
    isActive: true,
  },
  {
    _id: 'learning-module-3',
    _type: 'learningModule',
    title: 'Early Stage Execution',
    slug: { _type: 'slug', current: 'early-stage-execution' },
    category: 'process',
    moduleType: 'Advanced Training',
    description:
      'Deep dive into S1-S3: Discovery through active evaluation. Master discovery, validation, and evaluation stages to move deals forward with confidence.',
    oneLiner: 'Master discovery, validation, and evaluation stages to move deals forward',
    videoUrl: 'https://www.loom.com/embed/early-stage-execution-video',
    videoDuration: 60,
    lastUpdated: '2025-01-10T10:00:00Z',
    keyTakeaways: [
      {
        icon: '🎯',
        title: 'Qualify Hard',
        description: 'Understand pain before pitching solution',
      },
      {
        icon: '🗺️',
        title: 'Map the Journey',
        description: 'Know where buyer is, not just where we want them',
      },
      {
        icon: '💼',
        title: 'Value Over Features',
        description: 'Always tie to business outcomes',
      },
    ],
    interactiveFlow: {
      question: 'Where is your buyer in their journey?',
      paths: [
        {
          label: 'S1: Discovery',
          route: 'Understand pain points',
          description: 'Articulate customer pain and opportunity',
        },
        {
          label: 'S2: Solution Validation',
          route: 'Demonstrate fit',
          description: 'Customer understands how we solve problems',
        },
        {
          label: 'S3: Active Evaluation',
          route: 'Compare & decide',
          description: 'Customer actively comparing solutions',
        },
      ],
    },
    examples: [
      {
        title: 'Discovery Done Right',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'A successful S1 discovery call focuses on understanding the customer\'s current pain points before discussing solutions. Ask about their current state, challenges they face, and the business impact of those challenges.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key outcomes: Articulate customer pain in current state, describe opportunity in future state, understand who\'s involved in decision, identify champion or coach, and define clear next steps.',
              },
            ],
          },
        ],
      },
      {
        title: 'Common Discovery Pitfalls',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Avoid being too feature-driven, not understanding business impact, rushing to demo, or missing key decision makers. Focus on asking great questions rather than telling your story.',
              },
            ],
          },
        ],
      },
      {
        title: 'Navigating S2-S3 Transition',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'The transition from Solution Validation (S2) to Active Evaluation (S3) happens when the customer moves from understanding your solution to actively comparing you against alternatives. Look for signs like requesting pricing, involving procurement, or asking for references.',
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What\'s the difference between sales stages and the buyer\'s journey?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Sales stages (S0-S4) are how we track deals in Salesforce. The buyer\'s journey is the actual steps customers take to make a purchase decision. Our sales process should help buyers move through their journey, with buyer stages informing our sales stages.',
              },
            ],
          },
        ],
      },
      {
        question: 'When should I move from S1 to S2?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Move to S2 when you\'ve completed discovery and the customer acknowledges they have solvable problems. Key indicators: documented pain points, identified stakeholders, willingness to explore solutions, and commitment to next steps.',
              },
            ],
          },
        ],
      },
      {
        question: 'What does success look like in S3?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'S3 success means the customer is actively comparing solutions, you have a coach/champion advocating internally, you understand the decision process, business case has been delivered, and legal/procurement are engaged.',
              },
            ],
          },
        ],
      },
      {
        question: 'How do I avoid being too feature-focused?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Always tie features back to the pain identified in discovery. Quantify impact where possible, speak in the customer\'s language, and connect capabilities to their strategic priorities. Lead with business outcomes, not product capabilities.',
              },
            ],
          },
        ],
      },
    ],
    quickActions: {
      pdfUrl: '/downloads/early-stage-execution-slides.pdf',
      resources: [
        {
          label: 'MEDDPICC Framework Guide',
          url: '/resources/meddpicc',
          type: 'doc',
        },
        {
          label: 'Stage Progression Checklist',
          url: '/resources/stage-progression',
          type: 'doc',
        },
        {
          label: 'Discovery Question Bank',
          url: '/resources/discovery-questions',
          type: 'doc',
        },
        {
          label: 'S1-S3 Training Video',
          url: 'https://www.loom.com/share/s1-to-s3-training',
          type: 'video',
        },
        {
          label: 'Demo Best Practices',
          url: '/resources/demo-best-practices',
          type: 'link',
        },
      ],
      quizUrl: 'https://forms.gle/early-stage-execution-quiz',
    },
    relatedModules: [
      {
        title: 'Foundation & Alignment',
        slug: 'foundation-alignment',
        description: 'Master prospecting roles, opportunity criteria, first meetings, and SLAs.',
      },
      {
        title: 'Closing Excellence',
        slug: 'closing-excellence',
        description: 'Navigate S4+, understand when to close lost, and maintain pipeline hygiene.',
      },
    ],
    productTags: ['All Products'],
    isActive: true,
  },
  {
    _id: 'learning-module-4',
    _type: 'learningModule',
    title: 'Closing Excellence',
    slug: { _type: 'slug', current: 'closing-excellence' },
    category: 'process',
    moduleType: 'Advanced Training',
    description:
      'Navigate S4+, know when to close lost, and master deal progression. Learn the art of closing deals and maintaining pipeline hygiene with accurate closed lost reasons.',
    oneLiner: 'Navigate S4+, know when to close lost, and master deal progression',
    videoUrl: 'https://www.loom.com/embed/closing-excellence-video',
    videoDuration: 60,
    lastUpdated: '2025-01-10T10:00:00Z',
    keyTakeaways: [
      {
        icon: '📝',
        title: 'All Signatures Matter',
        description: 'Navigate legal, procurement, approvals',
      },
      {
        icon: '🚫',
        title: 'Close Lost Honestly',
        description: 'Dead deals clog your pipeline',
      },
      {
        icon: '📊',
        title: 'Data Informs Strategy',
        description: 'Your closed lost reasons shape company decisions',
      },
      {
        icon: '🎯',
        title: 'Timing is Everything',
        description: 'Know when to keep open vs close lost for future opportunities',
      },
    ],
    interactiveFlow: {
      question: 'Is the deal really dead?',
      paths: [
        {
          label: 'Definitely Dead',
          route: 'Close Lost with reason',
          description: 'Competitor won, no need, no budget, unresponsive 60+ days',
        },
        {
          label: 'Maybe Dead',
          route: 'Evaluate carefully',
          description: 'Check for specific timeline, confirmed budget, or requirements change',
        },
        {
          label: 'Not Dead',
          route: 'Keep Open with renewal date',
          description: 'Timing off but customer has specific future timeline',
        },
      ],
    },
    examples: [
      {
        title: 'Scenario: Customer Went Dark After Pricing',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'A customer stopped responding after receiving pricing. What to do: 1) Send follow-up with value summary, 2) Attempt to re-engage via different channel, 3) If no response after 60 days, close lost with reason "Took Incentive / Stopped Responding" or "Lost Funding / No Budget" depending on context.',
              },
            ],
          },
        ],
      },
      {
        title: 'Scenario: Lost to Unknown Competitor',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Customer chose a competitor you\'ve never heard of. Closed lost reason: "Competition". MUST provide Competitor Name in the required field. This intelligence helps product and competitive teams understand the market landscape.',
              },
            ],
          },
        ],
      },
      {
        title: 'Scenario: Renewal in 14 Months',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Customer says "We love it but our renewal isn\'t for 14 months." Decision: Keep Open. Use closed lost reason "Timing / No Immediate Need" and MUST enter CX Renewal Date. This allows automation to re-engage when timing is right.',
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'When should I close lost vs keep open?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Close lost when: customer chose competitor, no current need/interest, budget unavailable, org change eliminates opportunity, unresponsive 60+ days, or requirements can\'t be met. Keep open when: renewal timing not aligned (use "Timing Off" + renewal date), customer asks to revisit with specific timeline, temporary org change, or confirmed budget coming next fiscal year.',
              },
            ],
          },
        ],
      },
      {
        question: 'Why do closed lost reasons matter so much?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Your closed lost reasons inform product roadmap decisions, competitive strategy, and pricing decisions. Leadership uses this data to understand market dynamics, identify product gaps, and allocate resources. Be accurate and detailed.',
              },
            ],
          },
        ],
      },
      {
        question: 'What if my reason is "Competition" - what else do I need to provide?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Competition requires the Competitor Name field to be filled. This is mandatory validation. Capture who they chose and any intelligence about why they chose that competitor.',
              },
            ],
          },
        ],
      },
      {
        question: 'What defines S4+ success?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'S4+ success: All decision makers aligned, commercial terms agreed, legal review underway/complete, implementation timeline clear, success criteria defined, all MEDDPICC complete, and forecast category accurate.',
              },
            ],
          },
        ],
      },
    ],
    quickActions: {
      pdfUrl: '/downloads/closing-excellence-slides.pdf',
      resources: [
        {
          label: 'Closed Lost Reasons Framework',
          url: '/resources/closed-lost-guide',
          type: 'doc',
        },
        {
          label: 'S4+ Progression Checklist',
          url: '/resources/s4-checklist',
          type: 'doc',
        },
        {
          label: 'Deal Review Template',
          url: '/resources/deal-review',
          type: 'doc',
        },
        {
          label: 'Negotiation Best Practices',
          url: '/resources/negotiation-guide',
          type: 'link',
        },
        {
          label: 'Closing Techniques Video',
          url: 'https://www.loom.com/share/closing-techniques',
          type: 'video',
        },
      ],
      quizUrl: 'https://forms.gle/closing-excellence-quiz',
    },
    relatedModules: [
      {
        title: 'Foundation & Alignment',
        slug: 'foundation-alignment',
        description: 'Master prospecting roles, opportunity criteria, first meetings, and SLAs.',
      },
      {
        title: 'Early Stage Execution',
        slug: 'early-stage-execution',
        description: 'Master S1-S3: Discovery, solution validation, and active evaluation stages.',
      },
    ],
    productTags: ['All Products'],
    isActive: true,
  },
  {
    _id: 'learning-module-5',
    _type: 'learningModule',
    title: 'Creating Internal Enablement Documentation',
    slug: { _type: 'slug', current: 'creating-enablement-docs' },
    category: 'process',
    moduleType: 'Documentation Guide',
    description:
      'Learn standards and templates for building effective internal enablement documentation. Master the four pillars of enablement: Clarity, Accessibility, Brevity, and Currency.',
    oneLiner: 'Build effective enablement docs with clear standards and templates',
    lastUpdated: '2025-11-10T10:00:00Z',
    keyTakeaways: [
      {
        icon: '📝',
        title: 'Four Pillars',
        description: 'Clarity, Accessibility, Brevity, Currency - foundation of all enablement',
      },
      {
        icon: '📊',
        title: 'Format Wisely',
        description: 'Use tables for 2+ attributes, lists for simple sequences',
      },
      {
        icon: '🏠',
        title: 'Structure Matters',
        description: 'Multi-tab docs need Home tab with navigation table',
      },
      {
        icon: '🤖',
        title: 'AI-Assisted',
        description: 'Speed up creation with prompts and templates',
      },
    ],
    examples: [
      {
        title: 'Formatting: Tables vs Lists',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Use tables when: You have 2+ attributes per item (e.g., Feature | Description | Use Case), comparing options side-by-side, showing a process with stages/owners/timelines, or presenting structured categorical information.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Use lists when: Items are simple one-liners, showing sequential steps without additional context, listing resources/links, or content doesn\'t benefit from columns.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Readability and scannability. Tables make complex information easier to digest, but overuse makes docs cluttered.',
              },
            ],
          },
        ],
      },
      {
        title: 'Document Structure: Single vs Multi-Tab',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Single-tab when: Content under 5 pages, covers 1-2 related topics, audience reads sequentially top to bottom, content doesn\'t have distinct sections for different use cases.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Multi-tab when: Content exceeds 5 pages, covers 3+ distinct topics, different audiences need different sections (e.g., Admin Setup vs User Guide vs Troubleshooting), or content serves multiple use cases.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: For multi-tab docs, Tab 1 MUST be "Home" with document overview and navigation table linking to each tab with clear descriptions.',
              },
            ],
          },
        ],
      },
      {
        title: 'Header Hierarchy Rules',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Only use these levels: Title (document name at top), H1 (major sections like "Setup Process" or "Key Features"), H2 (subsections under H1s like "Initial Configuration" or "Advanced Settings"), Bold text (emphasis within paragraphs), Normal text (body content).',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'NEVER use: H3, H4, H5, H6, or other header levels. If you need more hierarchy, your doc is too complex - break it into multiple tabs or separate documents.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Consistent navigation experience across all enablement docs. Users should never have to guess hierarchy depth.',
              },
            ],
          },
        ],
      },
      {
        title: 'AI-Assisted Documentation',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Before using AI: Gather all raw content, screenshots/videos, example workflows, and complete the customization template with: what you\'re enabling, target audience, desired outcome after reading, document owner, and whether it\'s for onboarding.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Using AI: Use the provided AI prompt template that enforces our four pillars (Clarity, Accessibility, Brevity, Currency) and formatting rules. Feed all gathered content into one prompt session for consistency.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: After AI generates the doc, ALWAYS review against the checklist. AI is great at formatting but may hallucinate details or miss nuance. Verify accuracy, add screenshots/videos, and ensure examples are real.',
              },
            ],
          },
        ],
      },
      {
        title: 'Required Elements in Every Doc',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Every enablement document must include: Purpose statement (one sentence explaining what this doc enables), Owner (who maintains and updates this content), Last Updated (date of most recent changes), Quick links/navigation table (if multi-tab, on Home tab).',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Currency and accountability. Docs without owners become stale. Docs without last updated dates lose trust.',
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What are the four pillars of enablement?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Clarity (simple language and clear structure), Accessibility (easy to find and navigate), Brevity (concise and scannable), and Currency (up-to-date with clear ownership).',
              },
            ],
          },
        ],
      },
      {
        question: 'What header levels should I use?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Only use: Title (document name), H1 (major sections), H2 (subsections), Bold text (emphasis within paragraphs), and Normal text (body content). NO H3, H4, or other header levels.',
              },
            ],
          },
        ],
      },
      {
        question: 'When should I use multiple tabs?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Use multiple tabs when: document covers 3+ distinct topics, content would exceed 5 pages in a single tab, or different audiences need different sections. Tab 1 must always be "Home" with overview and navigation table.',
              },
            ],
          },
        ],
      },
      {
        question: 'What elements are required in every enablement doc?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Every doc must include: Purpose statement (one sentence at top), Owner (who maintains the content), Last Updated (date of most recent changes), and Quick links table (if multi-tab) on the Home tab.',
              },
            ],
          },
        ],
      },
    ],
    quickActions: {
      pdfUrl: '/downloads/enablement-docs-guide.pdf',
      resources: [
        {
          label: 'Single-Tab Document Template',
          url: '/templates/single-tab-template',
          type: 'doc',
        },
        {
          label: 'Multi-Tab Document Template',
          url: '/templates/multi-tab-template',
          type: 'doc',
        },
        {
          label: 'AI Prompt Template',
          url: '/templates/ai-prompt-template',
          type: 'doc',
        },
        {
          label: 'GTM 15-Min Demo Certification (Example)',
          url: 'https://docs.google.com/gtm-demo-cert',
          type: 'link',
        },
        {
          label: 'Documentation Best Practices Video',
          url: 'https://www.loom.com/share/doc-best-practices',
          type: 'video',
        },
      ],
      quizUrl: 'https://forms.gle/enablement-docs-quiz',
    },
    productTags: ['Enablement', 'Documentation'],
    isActive: true,
  },
  {
    _id: 'learning-module-6',
    _type: 'learningModule',
    title: 'Email Channel Optimization',
    slug: { _type: 'slug', current: 'email-channel-optimization' },
    category: 'coe',
    moduleType: 'Channel Excellence',
    description:
      'Email inquiries take longer to resolve than any other channel - customers often provide incomplete information, agents struggle with thread context, and back-and-forth exchanges waste time. This guide shows you how to resolve 70%+ of email conversations on the first response using Sidekick\'s AI assistance, proven templates, and systematic daily optimization.',
    oneLiner: 'Turn email from your slowest channel into your most efficient with AI-powered automation',
    videoUrl: 'https://www.loom.com/embed/email-optimization-training',
    videoDuration: 45,
    lastUpdated: '2025-11-11T10:00:00Z',
    keyTakeaways: [
      {
        icon: '📧',
        title: 'The Problem',
        description: 'Customers send incomplete info, threads get messy, agents repeat questions - emails take 3-5 exchanges when they should take 1',
      },
      {
        icon: '🎯',
        title: 'The Goal',
        description: 'Resolve 70%+ of emails on first response (top companies like Ulta hit 72%) by anticipating questions and providing complete answers',
      },
      {
        icon: '📊',
        title: 'The Strategy',
        description: 'Categorize emails into 4 types with different automation targets - from 90% for simple order status to 30% for complex issues',
      },
      {
        icon: '⏰',
        title: 'The Investment',
        description: 'Just 15-30 minutes daily reviewing responses and refining templates drives continuous improvement',
      },
    ],
    interactiveFlow: {
      question: 'What type of email intent are you optimizing?',
      paths: [
        {
          label: 'Quick Resolution',
          route: 'Target: 90% automation',
          description: 'Order status, shipping info, return policy, hours, basic account info',
        },
        {
          label: 'Detailed Explanation',
          route: 'Target: 70% automation',
          description: 'Product comparisons, troubleshooting, setup instructions, policy clarifications',
        },
        {
          label: 'Transactional Processing',
          route: 'Target: 60% automation',
          description: 'Order modifications, refund requests, account updates, subscription changes',
        },
        {
          label: 'Complex Investigation',
          route: 'Target: 30% automation',
          description: 'Multi-order issues, escalated complaints, technical problems, sensitive matters',
        },
      ],
    },
    examples: [
      {
        title: 'Email Response Structure Excellence',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Optimal 8-part structure: 1) Personalized greeting, 2) Acknowledgment with empathy, 3) Direct answer (clear + concise), 4) Supporting details (comprehensive), 5) Proactive information (anticipate follow-ups), 6) Next steps (clear actions), 7) Warm closing, 8) Consistent signature.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: First Contact Resolution. The goal is to address all customer questions in the initial email, preventing unnecessary back-and-forth exchanges.',
              },
            ],
          },
        ],
      },
      {
        title: 'Subject Line Optimization',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Best practices: Include ticket/case number for reference, summarize resolution in 50 characters or less, use action-oriented language, avoid spam trigger words, maintain brand voice consistency.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Examples - ✅ "Order #12345 Refund Processed - $49.99 Credited" or "Shipping Update: Your Package Arrives Thursday" vs ❌ "RE: RE: RE: Your Recent Inquiry" or "URGENT!!! Important Information Inside!!!"',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: Subject lines drive open rates and set expectations. Clear, specific subjects improve customer confidence and reduce anxiety.',
              },
            ],
          },
        ],
      },
      {
        title: 'Thread Management Best Practices',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'First Response: Aim for complete resolution - address all questions, provide comprehensive information, include relevant links/resources, anticipate follow-up questions.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Follow-up Responses: Maintain context - reference previous exchange, acknowledge new information, avoid repeating resolved items, escalate if complexity increases.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Thread length reduction. Target 40% fewer exchanges through comprehensive first responses.',
              },
            ],
          },
        ],
      },
      {
        title: 'Daily Optimization Routine (15-30 min)',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Morning Review (10 min): Check overnight email volume and resolution rates, review escalation patterns, identify top 3 unresolved intent types, flag responses needing improvement, note technical issues.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Content Refinement (15 min): Update 2-3 answer templates based on feedback, add new edge cases to knowledge base, refine email-specific language patterns, test changes, document improvements.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: Consistency matters more than intensity. 30 minutes daily beats 2 hours weekly. Ulta achieved 71.9% FCR through this disciplined routine.',
              },
            ],
          },
        ],
      },
      {
        title: 'Ulta Success Story: 71.9% Email FCR',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'The Approach: Prioritized high-volume transactional intents, dedicated daily resources to email optimization, built email-specific templates, integrated with order management systems, implemented rigorous QA processes.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Daily Routine: Morning review of overnight performance → Midday template updates → Afternoon quality audits → End-of-day planning for next priorities.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: 71.9% FCR within 4 months, 60% reduction in response time, 40% decrease in thread length, 85% CSAT, $2.1M annual cost savings.',
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How does email optimization differ from chat optimization?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Email allows time to craft thorough responses, handles asynchronous information gathering, supports rich media and attachments, and requires different structure. Email customers expect comprehensive answers that anticipate follow-ups, while chat customers expect real-time, concise responses.',
              },
            ],
          },
        ],
      },
      {
        question: 'What is a realistic FCR target for email?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Industry leaders achieve 70%+ FCR in email. Start with 20-30% in first 30 days, reach 45-55% by day 60, and target 60-70% by day 90. Ulta achieved 71.9% within 4 months through systematic daily optimization.',
              },
            ],
          },
        ],
      },
      {
        question: 'How much time should we dedicate to email optimization?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Minimum 15-30 minutes daily for basic optimization. High performers dedicate 30-60 minutes daily. Weekly deep dives (2 hours) analyze performance trends and content strategy. Monthly strategic reviews (2-3 hours) plan advanced features and integrations.',
              },
            ],
          },
        ],
      },
      {
        question: 'What are the 4 email response types and their automation targets?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Type 1 - Quick Resolution (90% automation): Order status, shipping info, return policy. Type 2 - Detailed Explanation (70% automation): Product comparisons, troubleshooting, setup guides. Type 3 - Transactional Processing (60% automation): Order modifications, refunds, account updates. Type 4 - Complex Investigation (30% automation): Multi-order issues, escalated complaints, technical problems.',
              },
            ],
          },
        ],
      },
    ],
    quickActions: {
      pdfUrl: '/downloads/email-optimization-guide.pdf',
      resources: [
        {
          label: 'Email Response Structure Template',
          url: '/resources/email-response-template',
          type: 'doc',
        },
        {
          label: 'Subject Line Best Practices',
          url: '/resources/subject-line-guide',
          type: 'doc',
        },
        {
          label: 'Daily Optimization Checklist',
          url: '/resources/email-optimization-checklist',
          type: 'doc',
        },
        {
          label: 'Email Intent Classification Guide',
          url: '/resources/email-intent-guide',
          type: 'doc',
        },
        {
          label: 'Ulta Case Study Video',
          url: 'https://www.loom.com/share/ulta-email-success',
          type: 'video',
        },
      ],
      quizUrl: 'https://forms.gle/email-optimization-quiz',
    },
    relatedModules: [
      {
        title: 'Multi-Channel Optimization Strategy',
        slug: 'multi-channel-optimization',
        description: 'Scale Sidekick across channels while maintaining quality and performance.',
      },
    ],
    coeStats: [
      {
        metric: '72%',
        label: 'Emails Resolved on First Response',
        context: 'Ulta Beauty achieved this with Sidekick - up from their baseline of 45%',
        variant: 'primary',
      },
      {
        metric: '$2.1M',
        label: 'Saved Annually',
        context: 'From reduced agent time and faster resolution (Ulta Beauty)',
        variant: 'success',
      },
      {
        metric: '40%',
        label: 'Fewer Email Exchanges',
        context: 'Average thread went from 3.2 emails to 1.9 emails per customer issue',
        variant: 'info',
      },
      {
        metric: '15-30 min',
        label: 'Daily Time Investment',
        context: 'Review overnight emails and refine templates - that\'s all it takes',
        variant: 'warning',
      },
    ],
    coeCaseStudies: [
      {
        company: 'Ulta Beauty',
        challenge: 'High volume of detailed product and order inquiries requiring comprehensive yet timely responses. Complex loyalty program questions demanding accuracy and completeness.',
        approach: [
          'Prioritized high-volume transactional intents for immediate impact',
          'Dedicated daily resources to email optimization (30-60 minutes)',
          'Built email-specific templates for common inquiries',
          'Integrated with order management systems for real-time data',
          'Implemented rigorous QA processes with quality scoring',
        ],
        metrics: [
          { value: '71.9%', label: 'Email FCR' },
          { value: '60%', label: 'Faster Response' },
          { value: '40%', label: 'Shorter Threads' },
          { value: '85%', label: 'CSAT Score' },
        ],
        keyTakeaway:
          'Daily optimization became embedded in operations. Morning review of overnight performance, midday template updates, afternoon quality audits, and end-of-day planning for next priorities created a sustainable excellence rhythm.',
      },
    ],
    coeBenchmarks: [
      {
        period: 'Days 0-30',
        target: '20-30%',
        focus: 'High-volume simple intents',
        metrics: 'Resolution rate, handoff quality',
        actions: 'Daily content review and refinement',
      },
      {
        period: 'Days 31-60',
        target: '45-55%',
        focus: 'Add complex intents and edge cases',
        metrics: 'First Contact Resolution (FCR)',
        actions: 'Weekly journey analysis and optimization',
      },
      {
        period: 'Days 61-90',
        target: '60-70%',
        focus: 'Advanced features and personalization',
        metrics: 'CSAT correlation',
        actions: 'Monthly strategic review and roadmap',
      },
    ],
    productTags: ['Sidekick', 'Email'],
    isActive: true,
  },
  {
    _id: 'learning-module-7',
    _type: 'learningModule',
    title: 'Multi-Channel Optimization Strategy',
    slug: { _type: 'slug', current: 'multi-channel-optimization' },
    category: 'coe',
    moduleType: 'Strategic Planning',
    description:
      'You\'ve optimized one channel successfully - but scaling Sidekick to chat, email, SMS, and voice can either multiply your success or compound your problems. Companies that launch too early create broken experiences. Companies that move too slowly miss ROI opportunities. This guide shows you exactly when to expand, which deployment model to choose, and how to maintain quality as you scale.',
    oneLiner: 'Know when to scale to new channels, which model to use, and how to maintain quality',
    videoUrl: 'https://www.loom.com/embed/multi-channel-strategy',
    videoDuration: 40,
    lastUpdated: '2025-11-11T10:00:00Z',
    keyTakeaways: [
      {
        icon: '🎯',
        title: 'The Mistake',
        description: 'Launching too early (broken experiences hurt trust) or too late (missing ROI) - you need specific readiness criteria',
      },
      {
        icon: '🚀',
        title: 'The Decision',
        description: 'Launch all channels at once (La Jolla: 57% success) or go one-by-one (Ulta: 90% success) - depends on your team structure',
      },
      {
        icon: '📚',
        title: 'The Efficiency',
        description: 'Share 80% of content across channels (policies, products, FAQs) - only customize 20% for channel-specific formatting',
      },
      {
        icon: '📈',
        title: 'The Timeline',
        description: 'Expect 20-30% resolution in month 1, 45-55% in month 2, 60-70% in month 3 - then repeat for next channel',
      },
    ],
    interactiveFlow: {
      question: 'Which deployment model fits your organization?',
      paths: [
        {
          label: 'Simultaneous Launch',
          route: 'Deploy all channels at once',
          description: 'Single brand, centralized CX team, strong executive mandate, common intents (70%+ overlap)',
        },
        {
          label: 'Phased Expansion',
          route: 'One channel at a time',
          description: 'Multiple brands, distributed teams, need to prove ROI, channel-specific customization required',
        },
        {
          label: 'Chat First',
          route: 'Start with highest volume',
          description: 'Real-time channel with immediate feedback loop, easiest to optimize',
        },
        {
          label: 'Email First',
          route: 'Start with high complexity',
          description: 'Time to craft quality responses, comprehensive answer library, lower pressure',
        },
      ],
    },
    examples: [
      {
        title: 'La Jolla Group: Simultaneous Multi-Channel Success',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'The Challenge: Multiple brands, diverse product lines, need for quick ROI demonstration across SMS, chat, and email simultaneously.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'The Approach: CX leader dedicated 1-2 hours daily to optimization, historical analysis of 3 months of conversations, quick pivot from Answers to Questions & Recommendations when initial approach plateaued.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Resolution rate jumped from 28-30% to 57% within weeks. Built team confidence, created repeatable model, established foundation for Sidekick for Sales expansion.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: Flexibility to pivot approaches accelerated success. Daily investment in content quality paid immediate dividends.',
              },
            ],
          },
        ],
      },
      {
        title: 'Ulta Beauty: Phased Channel Excellence',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'The Approach: Chat (April) → SMS (August) → Email (September) → Voice (September). Built expertise progressively, validated each channel before expanding.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Chat 89.9% FCR, SMS 80.2% FCR, Email 71.9% FCR. Each channel exceeded industry benchmarks through systematic optimization.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: Mastered one channel before scaling. Applied learnings from chat to accelerate SMS and email optimization.',
              },
            ],
          },
        ],
      },
      {
        title: 'Channel Readiness Assessment',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Content Maturity: Current channel achieving >30% resolution for 30+ days, 80% of top intents covered, daily optimization routine established, QA process operational.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Team Capacity: Dedicated resource allocated (1-2 hours daily per channel), executive sponsorship with defined metrics, cross-functional alignment, training completed.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Technical Infrastructure: Integration points identified and tested, reporting dashboards configured, escalation paths defined, channel-specific SLAs established.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Key to success: Don\'t expand until current channel is stable. Premature scaling multiplies problems instead of success.',
              },
            ],
          },
        ],
      },
      {
        title: 'Unified Content Library Structure',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Core Content (80%): Policy information, product details, company facts. Maintain identical across all channels, update simultaneously, version control with approval workflow.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Channel Adaptations (20%): Chat (concise, action-oriented, hyperlink-rich), Email (comprehensive, structured, attachment-capable), SMS (ultra-brief, link-focused, 160-character optimized), Voice (conversational, spelled-out URLs, repetition-friendly).',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Primary KPI: Content governance efficiency. Single source of truth reduces update time by 70% while maintaining channel-specific quality.',
              },
            ],
          },
        ],
      },
      {
        title: '30-60-90 Day Performance Benchmarks',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Days 0-30 (Foundation): Target 20-30% resolution rate. Focus on high-volume simple intents. Daily content review and refinement. Track resolution rate and handoff quality.',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Days 31-60 (Expansion): Target 45-55% resolution rate. Add complex intents and edge cases. Weekly journey analysis and optimization. Track First Contact Resolution (FCR).',
              },
            ],
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Days 61-90 (Excellence): Target 60-70% resolution rate. Advanced features and personalization. Monthly strategic review and roadmap planning. Track CSAT correlation.',
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Should we launch all channels simultaneously or phased?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Simultaneous if: single brand, centralized CX team, strong executive mandate, and common intent patterns (70%+ overlap). La Jolla Group achieved 57% resolution this way. Phased if: multiple brands, distributed teams, need to prove ROI first, or significant channel-specific customization. Ulta achieved 90%+ FCR through phased approach.',
              },
            ],
          },
        ],
      },
      {
        question: 'How much time does multi-channel optimization require?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Allocate 1-2 hours daily per active channel. La Jolla Group dedicated this for 3 channels simultaneously. For phased approach, master one channel first (30 min/day), then add 1 hour/day for each new channel during launch phase. Once stable, reduce to 30 min/day maintenance per channel.',
              },
            ],
          },
        ],
      },
      {
        question: 'What percentage of content should be shared vs channel-specific?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: '80% core content (policies, product info, company facts) should be identical across channels with single source of truth. 20% channel adaptations for formatting, length, and interaction patterns. This balance maintains consistency while optimizing for channel-specific customer expectations.',
              },
            ],
          },
        ],
      },
      {
        question: 'When are we ready to expand to a new channel?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Must meet all three criteria: Content Maturity (current channel >30% resolution for 30+ days, 80% intents covered, daily optimization routine established), Team Capacity (dedicated resources available, training completed, executive support secured), Technical Infrastructure (integrations tested, dashboards configured, escalation paths defined).',
              },
            ],
          },
        ],
      },
    ],
    quickActions: {
      pdfUrl: '/downloads/multi-channel-strategy-guide.pdf',
      resources: [
        {
          label: 'Channel Readiness Assessment',
          url: '/resources/channel-readiness-assessment',
          type: 'doc',
        },
        {
          label: 'Deployment Model Decision Tree',
          url: '/resources/deployment-decision-tree',
          type: 'doc',
        },
        {
          label: 'Content Governance Template',
          url: '/resources/content-governance-template',
          type: 'doc',
        },
        {
          label: '30-60-90 Day Benchmark Tracker',
          url: '/resources/benchmark-tracker',
          type: 'tool',
        },
        {
          label: 'La Jolla Group Case Study',
          url: 'https://www.loom.com/share/la-jolla-success',
          type: 'video',
        },
      ],
      quizUrl: 'https://forms.gle/multi-channel-strategy-quiz',
    },
    relatedModules: [
      {
        title: 'Email Channel Optimization',
        slug: 'email-channel-optimization',
        description: 'Achieve 70%+ FCR through systematic email optimization and daily content refinement.',
      },
    ],
    coeStats: [
      {
        metric: '90%',
        label: 'Best Multi-Channel Performance',
        context: 'Ulta achieved 90% chat, 80% SMS, 72% email by launching one channel at a time',
        variant: 'primary',
      },
      {
        metric: '80%',
        label: 'Content Reuse',
        context: 'Share policies, products, FAQs across channels - only adapt formatting (20%) per channel',
        variant: 'info',
      },
      {
        metric: '1-2 hrs',
        label: 'Daily Time Per Channel',
        context: 'During launch phase - drops to 30 min once stable',
        variant: 'warning',
      },
      {
        metric: '30+ days',
        label: 'Stability Required',
        context: 'Current channel must be stable (>30% resolution for 30+ days) before launching next',
        variant: 'success',
      },
    ],
    coeCaseStudies: [
      {
        company: 'La Jolla Group',
        challenge: 'Multiple brands with diverse product lines requiring quick ROI demonstration. Needed to launch across SMS, chat, and email simultaneously while building team confidence in AI-assisted service.',
        approach: [
          'Launched all digital channels simultaneously for maximum impact',
          'CX leader dedicated 1-2 hours daily to optimization across all channels',
          'Completed historical analysis of 3 months of conversations',
          'Pivoted from Answers to Questions & Recommendations when initial approach plateaued',
          'Built unified content governance from day one',
        ],
        metrics: [
          { value: '57%', label: 'Resolution Rate' },
          { value: '28→57%', label: 'Quick Improvement' },
          { value: '3 Channels', label: 'Simultaneous' },
          { value: 'Weeks', label: 'Time to Value' },
        ],
        keyTakeaway:
          'Flexibility to pivot approaches accelerated success. When Answers plateaued at 28-30%, the team quickly shifted to Questions & Recommendations, jumping to 57% resolution within weeks. Daily investment in content quality paid immediate dividends.',
      },
      {
        company: 'Ulta Beauty',
        challenge: 'Complex multi-channel environment requiring proven ROI before scaling. Needed to build expertise progressively across chat, SMS, email, and voice while maintaining quality standards.',
        approach: [
          'Phased launch: Chat (April) → SMS (August) → Email (September) → Voice (September)',
          'Mastered each channel before expanding to the next',
          'Applied learnings from chat to accelerate SMS and email optimization',
          'Built expertise progressively with dedicated channel owners',
          'Validated each channel against benchmarks before proceeding',
        ],
        metrics: [
          { value: '89.9%', label: 'Chat FCR' },
          { value: '80.2%', label: 'SMS FCR' },
          { value: '71.9%', label: 'Email FCR' },
          { value: '4 Channels', label: 'Total Coverage' },
        ],
        keyTakeaway:
          'Phased approach enabled systematic excellence. Each channel exceeded industry benchmarks through deliberate, sequential optimization. The team applied chat learnings to accelerate SMS launch, then used both to optimize email deployment.',
      },
    ],
    coeBenchmarks: [
      {
        period: 'Weeks 1-2',
        target: 'Planning',
        focus: 'Channel readiness assessment',
        metrics: 'Content maturity, team capacity, technical infrastructure',
        actions: 'Complete readiness scorecard, select deployment model, assign resources',
      },
      {
        period: 'Weeks 3-4',
        target: 'Preparation',
        focus: 'Content & technical setup',
        metrics: 'Answer library coverage, integration testing',
        actions: 'Build unified answer library, configure channel integrations, develop QA rubrics',
      },
      {
        period: 'Weeks 7-8',
        target: 'Soft Launch',
        focus: '10-20% traffic deployment',
        metrics: 'Hourly performance monitoring',
        actions: 'Deploy to limited audience, gather feedback, refine content',
      },
      {
        period: 'Weeks 9-10',
        target: 'Full Deploy',
        focus: '100% traffic scaling',
        metrics: 'Weekly review cadence',
        actions: 'Scale to full traffic, establish optimization routine, plan next channel',
      },
    ],
    productTags: ['Sidekick', 'Strategy'],
    isActive: true,
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

    // First, delete all existing learning modules
    const existingModules = await adminClient.fetch('*[_type == "learningModule"]._id');
    for (const id of existingModules) {
      await adminClient.delete(id);
    }

    // Then create the new ones
    const results = [];
    for (const module of learningModules) {
      const result = await adminClient.create(module);
      results.push(result._id);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} learning modules!`,
      modules: results,
    });
  } catch (error: any) {
    console.error('Error seeding learning modules:', error);
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }
}
