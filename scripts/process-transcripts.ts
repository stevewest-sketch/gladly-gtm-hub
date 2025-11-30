/**
 * Process transcript files and update/create catalog entries with extracted content
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// ============================================================================
// SIDEKICK SALES LAUNCH ENABLEMENT (update existing)
// ============================================================================
const SIDEKICK_SALES = {
  slug: 'sidekick-sales-launch-enablement',
  description: `Comprehensive launch training for Sidekick Sales, covering what it is, how it works, competitive positioning, go-to-market strategy, and available sales assets. Learn how to position Sidekick Sales as a solution that turns every conversation into a revenue opportunity.`,

  keyTakeaways: [
    "Sidekick Sales is GA and helps convert hesitant shoppers by increasing average order value without discounting - already 23 customers live and generating revenue",
    "Setup takes less than 20 minutes by pointing Sidekick at your website URL - no product catalog integration required, completely agnostic to e-commerce platform",
    "Web content knowledge sources pull text, images, and PDFs from product pages in real-time to inform customer conversations",
    "Single touchpoint for service and sales creates better customer experience - one continuous conversation with the brand, not separate bots",
    "Competitor positioning: AI shopping assistants (Big Su), AI agents (Sierra), support suites (Zendesk), and product discovery widgets (Nostto, Dynamic Yield)",
    "Key differentiators: fastest launch time, single lifelong conversation, unified sales and service, and proving support is a growth engine not cost center",
    "Focus on customer service leaders as primary buyers now; e-commerce buyer persona unlocks in October with revenue tracking features",
    "New chat experience coming: product images in responses, comparison tables, wider chat interface, modernized UI - available to all customers"
  ],

  actionItems: [
    "Review the command of the message guide before your next customer conversation about Sidekick Sales",
    "Focus on customer service leaders as your primary buyer persona - it's an easier conversation based on current functionality",
    "Use the elevator pitch: Support is turning into a revenue driver, conversations are getting more complex, you need a unified solution",
    "Highlight the 55% resolution rate for product questions that Tokovas achieved as social proof",
    "For competitive situations, emphasize setup in minutes, single lifelong conversation, and unified sales/service touchpoint",
    "Access all assets on the revenue enablement microsite under Product > Sidekick Sales",
    "Provide feedback on assets in the ask-enablement channel to help refine messaging"
  ],

  articleSections: [
    {
      _key: 'overview',
      heading: 'What is Sidekick Sales?',
      content: `Sidekick Sales is a new set of use cases for Sidekick focused on three core capabilities:

1. **Answering product questions** - Using website content as a knowledge source
2. **Product recommendations** - AI-powered suggestions based on customer context
3. **Assisted handoffs** - Providing live agents with product interest and question context

The solution packages web content knowledge sources, templated guides, and Gladly's existing AI architecture into a single offering targeting customer service and e-commerce leaders.`
    },
    {
      _key: 'problem',
      heading: 'The Problem We Solve',
      content: `E-commerce brands face four key challenges:

- **Plateauing conversion rates** despite optimization efforts
- **Rising customer acquisition costs** making every visitor more expensive
- **High cart abandonment** from unanswered product questions
- **Support seen as a cost center** rather than revenue driver

Sidekick Sales addresses these by turning every conversation into an opportunity for revenue, increasing average order value without discounting.`
    },
    {
      _key: 'howItWorks',
      heading: 'How It Works',
      content: `**Web Content as Knowledge Source:**
Point Sidekick at your website URL and it reads content from product pages in real-time. The system pulls text, images, and PDFs to inform customer conversations. Completely agnostic to e-commerce platform - works with Shopify, Salesforce Commerce, Adobe, etc.

**Templated Guides:**
Pre-built templates for product questions and recommendations make setup easy. Customers can be live in production in less than 20 minutes.

**Dynamic Content:**
When a consumer asks a question, Sidekick pulls content in real-time, summarizes information from multiple pages, and delivers clear answers - especially important on mobile where attention spans are short.`
    },
    {
      _key: 'competitive',
      heading: 'Competitive Landscape',
      content: `**AI Shopping Assistants** (Big Su, LivePerson, Attentive):
- Dedicated to shopping/revenue generation
- Need catalog integrations
- No customer context

**AI Agents for Service** (Sierra, Decagon, ADA):
- Focused on deflection
- Not connected to customer data
- No shopping focus

**Support Suites** (Zendesk, Intercom):
- Reactive, not proactive on sales
- Support as cost center mindset

**Product Discovery Widgets** (Nostto, Dynamic Yield):
- Static recommendations
- No conversation capability
- Limited to on-page behavior

**Gladly's Differentiation:**
- Fastest to launch (no catalog integration)
- Single lifelong conversation
- Unified service + sales
- Turns support into growth engine`
    },
    {
      _key: 'demo',
      heading: 'Enhanced Chat Experience',
      content: `The engineering team has built an improved chat experience showcased in the "kickass demo":

- **Product images in responses** - Visual engagement keeps consumers more engaged
- **Comparison tables** - Easy product comparison capability (coming soon)
- **Wider chat experience** - More engaging on desktop
- **Modernized interface** - Brand logos, customizable colors

These improvements will be available to ALL customers, not just those using Sidekick Sales. The vision is a more conversational e-commerce experience where asking questions replaces browsing long product pages.`
    },
    {
      _key: 'gtm',
      heading: 'Go-to-Market Strategy',
      content: `**Current Focus (Now):**
Customer service leaders as primary buyers - easier conversation based on current functionality.

**Coming in October:**
- E-commerce buyer persona unlocked with new features
- Revenue tracking and attribution
- E-commerce-specific product features
- Enhanced demo capabilities

**Elevator Pitch for CS Leaders:**
"Support is turning into a revenue driver. Conversations are getting more complex with different touchpoints. You need a single solution that unifies those conversations, recommends products, handles pre-purchase questions, and accelerates live agent handoffs with context."`
    }
  ]
};

// ============================================================================
// FIRST MEETING DECK RELEASE 2.0 (new entry)
// ============================================================================
const FIRST_MEETING_DECK = {
  slug: 'first-meeting-deck-release-20',
  title: 'First Meeting Deck Release 2.0',
  description: `Introduction to the updated First Meeting "mega deck" - a comprehensive, approved resource for initial prospect presentations. Learn about the deck's structure, the AI-forward company narrative, available vertical kits, and best practices for customization and battle testing.`,
  videoUrl: 'https://drive.google.com/file/d/1kvznmHGjzOOgQqDmybvUA0F87CC9uuxb/view?usp=drive_web',
  transcriptUrl: 'https://docs.google.com/document/d/1WEWwQ9h5pXBNnOR8a9V64oMDmvaMe-SLlCMco4jDX8Q/edit?usp=meet_tnfm_calendar',
  slidesUrl: 'https://docs.google.com/presentation/d/1TzNEZDVrxebVmFrHC4Jw6xhzUCPf4de7AUQ3-BxsNcY/edit?slide=id.g3a79279a5a3_1_2#slide=id.g3a79279a5a3_1_2',
  publishDate: '2025-11-21',

  keyTakeaways: [
    "The First Meeting Deck 2.0 is a comprehensive 'mega deck' of approved resources - use it as your single source for slides, eliminating the need to search Slack",
    "Think of the deck like cleats meant to be 'scuffed up' - customize aggressively and share feedback on what lands with Christian, Steve, and Austin",
    "Gladly is transitioning from a 'hero-heavy' company to an 'AI-forward' company - the deck supports both existing and new narrative during this transition",
    "The deck contains: primary narrative section (POV, solution, core features), an arsenal of additional slides, and vertical kits for specific industries",
    "Vertical kits include industry-matching product images and use case slides for travel/hospitality, telecommunications, quick service restaurants, etc.",
    "Use Command+F (or Ctrl+F) to quickly search within the deck for specific content",
    "Christian Shockley now owns the series and will circulate proposed agendas; upcoming continued training sessions with Emily and Gina",
    "More architecture and underlying model enablement is coming - Everly is currently refining these materials"
  ],

  actionItems: [
    "Download and familiarize yourself with the First Meeting Deck 2.0 from the provided slides link",
    "Tag Christian Shockley, Steve West, and Austin when you use customized versions to help the team understand what content lands",
    "Use Command+F to navigate the deck quickly - no need to memorize slide locations",
    "SMB team members (Christine, Karl Rehfuss): Provide feedback on modifications needed for hero-pitching scenarios",
    "Share your perspective on which slides land well and which don't - this helps refine the sidekick standalone messaging",
    "Watch for updates to the deck in late November/early December reflecting the new GTM narrative",
    "Participate in upcoming continued training sessions with Emily and Gina"
  ],

  articleSections: [
    {
      _key: 'overview',
      heading: 'What is the First Meeting Deck?',
      content: `The First Meeting Deck 2.0 is a comprehensive "mega deck" of resources intended for your initial pitch of Gladly, whether presenting to a small audience or a full buying committee.

Key characteristics:
- **Comprehensive resource** - Potentially growing to 150+ slides
- **Flexible usage** - Pull 8-20 slides for any meeting
- **Approved source** - The single source of truth for slides
- **Version tracked** - Release numbers clearly marked in the title

No more searching Slack or waiting for announcements - everything you need is in this deck.`
    },
    {
      _key: 'structure',
      heading: 'Deck Structure',
      content: `**Primary Narrative Section:**
- Point of View (POV) slides
- Solution overview
- Core features

**Arsenal of Additional Slides:**
- Additional imagery options
- Architecture slides
- Social proof template with all case studies

**Vertical Kits:**
- Industry-matching product images
- Use case slides developed for each target vertical:
  - Travel & Hospitality
  - Telecommunications
  - Quick Service Restaurants
  - And more...`
    },
    {
      _key: 'narrative',
      heading: 'The Narrative Transition',
      content: `Gladly is currently experiencing an "identity crisis" - transitioning from a **hero-heavy company** to an **AI-forward company**.

The deck is designed to support both:
- The existing narrative while the company finalizes the new pitch
- The evolving story as we become more AI-forward

This transition will be reflected in deck updates coming in late November or early December, following the GTM all hands meeting.`
    },
    {
      _key: 'usage',
      heading: 'How to Use the Deck',
      content: `**Think of it like cleats, not Gucci loafers:**
- Meant to be "scuffed up" and customized
- Tailor it aggressively for your specific meetings
- Don't treat it as precious - make it your own

**Navigation Tips:**
- Use Command+F (Mac) or Ctrl+F (Windows) to search within the deck
- A guide book slide for navigation may be added in future versions

**Feedback Loop:**
Tag Christian Shockley, Steve West, and Austin when sharing customized versions so the team can:
- Understand what content lands
- Refine sidekick standalone messaging
- Improve the deck iteratively`
    },
    {
      _key: 'upcoming',
      heading: 'Upcoming Enablement',
      content: `**More Coming Soon:**
- Architecture and underlying models enablement (Everly currently owns refinement)
- Additional infrastructure and tech stack content
- Refined tools for technical conversations

**Training Sessions:**
- Continued training with Emily and Gina
- Comp plan updates from Jenny B and team (may include office hours)
- Christian Shockley will circulate proposed agendas for the series`
    }
  ]
};

// ============================================================================
// FLIP COMPETITIVE + SK VOICE ROADMAP (new entry)
// ============================================================================
const FLIP_COMPETITIVE = {
  slug: 'flip-competitive-sk-voice-roadmap',
  title: 'Flip Competitive + SK Voice Roadmap',
  description: 'Enablement session on Sidekick Voice competitive positioning against Flip, including performance improvements, battlecard details, product roadmap to close gaps, and GTM expansion strategy.',
  videoUrl: 'https://drive.google.com/file/d/1W2HcWCAl5IdcQQlTGAXw_BgLWAmvXz9B/view?usp=drive_link',
  slidesUrl: 'https://docs.google.com/presentation/d/1T9200y6CYXC7BmsWVJBxQWMti75TV7TeId4lXmST8f8/edit?usp=drive_link',
  transcriptUrl: 'https://docs.google.com/document/d/1tlbcA_le58qtw96lnY_LCTuzRULISytxOw6F-8ZVX3U/edit?usp=drive_link',
  publishDate: '2025-09-04',

  keyTakeaways: [
    "Sidekick Voice is now 41% faster than Flip, delivering seamless, frustration-free conversations",
    "Sidekick uses adaptive generative AI that listens, adapts, and handles interruptions smoothly - unlike Flip's rigid keyword scripts",
    "Sidekick provides comprehensive customer context with lifelong history, while Flip treats each call as a one-off ticket",
    "Gladly offers unified helpdesk + native AI in one platform vs Flip's standalone AI bolted onto a helpdesk (two vendors, two systems)",
    "Sidekick uses outcome-based pricing (pay only when value delivered) vs Flip's per-conversation charges regardless of outcome",
    "Resolution rates have climbed to ~35% average, with Crate & Barrel seeing 40% - hypothesis is increased speed drives customer trust",
    "Two competitive gaps being closed: Topic Assignment (Q4 start) and Custom Routing/Handoffs (~October)",
    "Demo assets available: comparison video showing Flip vs Sidekick, plus live demo environment for SEs"
  ],

  actionItems: [
    "Start blast outreach to customers who haven't seen SK Voice or who saw its rocky start - use provided email templates",
    "Capture customer reactions, objections, and product asks in the shared feedback sheet for product team iteration",
    "Push customers to parallel-track implementations for voice alongside other channels for faster time to value",
    "Use the new comparison video in sales conversations to demonstrate speed and naturalness advantages",
    "Test the live demo environment before customer calls - connected to Gladly store demo with Shopify app",
    "Focus on outcome-based pricing messaging when competitors charge per conversation",
    "Highlight unified platform advantage vs managing two separate vendors/systems"
  ],

  articleSections: [
    {
      _key: 'overview',
      heading: 'Session Overview',
      content: `This enablement session reintroduces Sidekick Voice following a "rocky start," highlighting recent performance improvements, providing a comprehensive battlecard against Flip, outlining the product roadmap to close competitive gaps, and detailing next steps for an aggressive customer outreach and expansion campaign.

The core message: **Sidekick is now faster, smarter, and built to win.**`
    },
    {
      _key: 'competitive',
      heading: 'Sidekick Voice vs Flip Comparison',
      content: `| Capability | Flip | Gladly (Sidekick Voice) | Talk Track |
|------------|------|-------------------------|------------|
| **Conversation Experience** | Awkward pauses, choppy, laggy | Faster, smooth and natural | Sidekick is 41% faster, delivering a seamless experience |
| **Adaptability** | Rigid keyword scripts; brittle | Adaptive generative AI; handles interruptions | Sidekick flexes in real time - just like a human |
| **Customer Context** | Impersonal - treats call as one-off ticket | Comprehensive context - lifelong customer history | Sidekick knows your customer's history, cross-channel context |
| **Platform** | Standalone AI bolted onto helpdesk: two vendors | Unified helpdesk + native AI: single vendor | With Flip, you're managing two solutions. With Gladly, AI is built in |
| **Pricing** | Charges per conversation, regardless of outcome | Outcome-based pricing - pay only when value delivered | Flip racks up charges... Sidekick is outcome-based |
| **Resolution** | Focuses on deflecting calls back to agents | Focuses on resolving issues end-to-end | Flip deflects - Sidekick resolves |`
    },
    {
      _key: 'roadmap',
      heading: 'Roadmap to Close Competitive Gaps',
      content: `**Topic Assignment** (Starting Q4)
- Flip currently wins by using AI to assign topics for better routing and reporting
- Sidekick is adding customer topics for trend tracking and consistent tagging
- Will be channel agnostic

**Custom Routing/Handoffs** (~October)
- Flip allows configuring handoffs to specific queues or numbers
- Sidekick improving handoffs to reach multiple queues and forward calls to other numbers/retail locations
- Will allow Sidekick to be placed higher in the IVR

**Other Known Gaps:**
- Multilingual support (coming to voice after GA on chat)
- AI CSAT (Flip's AI grades its own work vs Gladly's automatic post-conversation surveys)
- Custom voices (available for top enterprise, but default recommended for best performance)`
    },
    {
      _key: 'performance',
      heading: 'Performance & Demo Assets',
      content: `**Resolution Rates:**
- Since switching to faster model: ~35% 30-day resolution rate average
- Crate & Barrel seeing **40%** resolution rate
- Hypothesis: Increased speed = higher customer engagement and trust

**Demo Assets Available:**
- **Comparison video**: Side-by-side of Flip's choppy, scripted experience vs Sidekick's faster, natural, adaptive flow
- **Live demo environment**: Available for SEs, connected to Gladly store demo
- Showcases: Order look-up, SMS follow-up, real-time data pulling from Shopify app and Gladly Answers`
    },
    {
      _key: 'gtm',
      heading: 'GTM Next Steps (Expansion Focus)',
      content: `**For AMs and CSMs - Aggressive expansion push:**

1. **Outreach**: Start blast outreach using provided email templates
   - Target customers who haven't seen SK Voice
   - Re-engage those who saw the initial "rocky start"

2. **Feedback Loop**: Capture all customer reactions, objections, and product asks in shared sheet
   - Product team will iterate in real-time based on feedback

3. **Prioritization**: Target audience list being prepared
   - Outreach is default AM responsibility

4. **Implementation Strategy**: Push parallel-track implementations
   - Voice alongside other channels
   - Achieves shorter time to value`
    }
  ]
};

// ============================================================================
// MONTHLY PARTNERSHIP ENABLEMENT - UNWRAP.AI (new entry)
// ============================================================================
const UNWRAP_PARTNERSHIP = {
  slug: 'unwrap-ai-partnership-enablement',
  title: 'Monthly Partnership Enablement: Unwrap.ai',
  description: `Partnership enablement for Unwrap.ai, Gladly's new data and analytics partner. Learn how Unwrap uses AI to aggregate unstructured customer feedback from multiple sources and extract granular insights, enabling faster issue detection and voice of customer analysis.`,
  publishDate: '2025-11-12',

  keyTakeaways: [
    "Unwrap.ai aggregates unstructured qualitative feedback from multiple sources (Gladly, surveys, social media) and uses AI to extract granular insights automatically",
    "Issue detection is under 1 hour with Unwrap vs. 2 days to 4 weeks previously - proactive alerts within 15 minutes of incidents",
    "Customer service data is the most valued qualitative feedback source - integrating Unwrap makes Gladly stickier at renewal time",
    "Unwrap opportunities between $50K-$250K align with mid-market, $250K+ with enterprise - end-of-year incentives available",
    "No seat-based licensing - any team member can access insights, democratizing data across CX and Product teams",
    "Onboarding takes ~2 weeks total, only ~1 hour of partner time for authentication - no engineering work required",
    "90%+ tagging accuracy with AI vs. 70-72% with manual tagging systems",
    "Mutual customers include DoorDash, Deckers, and similar large brands"
  ],

  actionItems: [
    "Listen for customers saying 'I need better insights from my qualitative data' or 'faster issue detection' - that's the trigger for Unwrap",
    "Position Unwrap when competing against all-in-one solutions like Sprinklr or Qualtrics that offer their own analytics",
    "Reference end-of-year incentives for opportunities brought to Unwrap partnership",
    "Join the shared Slack channel for Unwrap.ai to collaborate on opportunities",
    "Target accounts with high product feedback volume (like Restoration Hardware where 90% of issues are product-related)",
    "Highlight that Unwrap eliminates need for agents to manually tag via forms/fields - data is extracted from conversations",
    "Use 'conversational intelligence' and 'voice of customer' as keywords in RFPs and requirements discussions"
  ],

  articleSections: [
    {
      _key: 'overview',
      heading: 'What is Unwrap.ai?',
      content: `Unwrap.ai aggregates unstructured qualitative customer feedback from multiple sources and uses AI to extract granular insights automatically.

**Data Sources:**
- Support systems (Gladly, Zendesk)
- Surveys (Medallia, Qualtrics, TypeForm, SurveyMonkey)
- Public sources (Google, Yelp, Reddit, X, G2, BBB)

On average, customers have 7-10 feedback sources connected.`
    },
    {
      _key: 'value',
      heading: 'Why CX Leaders Use Unwrap',
      content: `**Fast Issue Detection:**
- Average time to detection under 1 hour (vs. 2 days to 4 weeks previously)
- Proactive alerts within 15 minutes of incidents
- Example: DoorDash's team notified within minutes that merchant tablets are down

**Granular Insights:**
- AI extracts specific details (e.g., "Hoka shoe laces wearing prematurely")
- 90%+ tagging accuracy vs. 70-72% with manual systems
- Deep taxonomy automatically generated and maintained

**Voice of Customer:**
- Own the voice of the customer across all channels
- Build alignment with internal business partners using data-backed insights
- Democratize insights so Product teams can self-serve`
    },
    {
      _key: 'partnership',
      heading: 'Partnership Value for Gladly',
      content: `**Compete with All-in-Ones:**
- Sprinklr and Qualtrics offer their own analytics
- Unwrap is best-in-class alternative in our stack

**Sticky Product:**
- When CSMs hear "I need better insights," you have an answer
- Makes Gladly stickier at renewal time

**Co-Selling:**
- Grow ACVs by estimated 20-30%
- End-of-year incentives available

**Market Keywords:**
- "Conversational intelligence"
- "Voice of customer"
- "Aggregated insights"`
    },
    {
      _key: 'demo',
      heading: 'Platform Capabilities',
      content: `**Proactive Alerts:**
- Automatically categorizes all feedback
- Detects anomalies and sends alerts
- Example: "Damaged packages from FedEx in New York - 88% of complaints despite 5% of feedback"

**Issue Deep Dives:**
- Dedicated page for each issue with time series
- Detailed summary and verbatims
- Agent resolution paths
- Links back to original Gladly ticket

**Self-Service (Assistant):**
- Chatbot for asking questions about feedback
- Generate visualizations on demand
- No seat-based licensing - all users have access

**Bot Analysis:**
- Analyze full bot conversations
- Identify reasons for escalation to humans`
    },
    {
      _key: 'commercial',
      heading: 'Commercial Details',
      content: `**Pricing:**
- Based on feedback volume (not seats)

**Opportunity Tiers:**
- $50K-$250K: Aligned with mid-market deals
- $250K+: Enterprise space

**Onboarding:**
- ~2 weeks total
- Only ~1 hour of partner time for authentication
- No engineering work required

**End-of-Year Incentives:**
Available for team members who include Unwrap in opportunities.`
    }
  ]
};

// ============================================================================
// STANDALONE SK DEMO (FIGMA) (new entry)
// ============================================================================
const STANDALONE_SK_DEMO = {
  slug: 'standalone-sk-demo-figma',
  title: 'Standalone SK Demo (Figma)',
  description: `Training on new Sidekick Standalone demo materials, including Figma mocks for third-party helpdesk handoffs. Covers the demo flow, ZenDesk handoff capabilities, Sidekick's trust layer architecture, and upcoming demo training track.`,
  publishDate: '2025-09-15',

  keyTakeaways: [
    "New standalone demo materials including Figma mocks are available on the Sidekick standalone microsite",
    "Demo flow mirrors Ritali Outdoors certification - remove 'hero' portion and insert new helpdesk section",
    "Figma mock shows complete handoff story: automated conversation, escalation detection, transfer to ZenDesk with full transcript and summary",
    "Use Figma demo 99% of the time until live ZenDesk demo is available (ETA: October 1st)",
    "Sidekick's 'trust layer' checks every response for tone, brand alignment, fact-checking, hallucination prevention, and compliance before reaching customer",
    "Architecture remains consistent whether Sidekick operates within Gladly or as standalone - same knowledge sources, guides, and escalation rules",
    "Current demo focus is on ZenDesk, Fresh Chat, Dixa, and Help Scout - Salesforce will take longer due to needing a consultant",
    "Four-to-six week demo training track launching September 29th with modules, expert sessions, and small group practice"
  ],

  actionItems: [
    "Access the new Figma demo materials on the Sidekick standalone microsite",
    "Practice the demo flow: Ritali Outdoors certification minus 'hero' portion plus new helpdesk section",
    "Pivot smoothly from Ritali demo to Figma when discussing third-party helpdesk handoff capabilities",
    "Use Figma demo for ZenDesk competitions until live demo environment is ready",
    "Prepare for the demo training track launching September 29th",
    "Complete the pre-training survey (coming from Christian Shockley) to assess familiarity with demo principles",
    "For enterprise integrations with homegrown systems, discuss middleware approach through app platform"
  ],

  articleSections: [
    {
      _key: 'overview',
      heading: 'Demo Materials Overview',
      content: `New standalone demo materials are now available on the Sidekick standalone microsite:

- **Figma mocks** for third-party helpdesk portion
- Demo flow largely mirrors Ritali Outdoors certification
- Remove the "hero" portion and insert new helpdesk section

**Important:** Use the Figma demo 99% of the time until the live ZenDesk demo environment is built (ETA: October 1st).`
    },
    {
      _key: 'figma',
      heading: 'Figma Mock Capabilities',
      content: `The Figma mock demonstrates a complete handoff story:

1. **New automated conversation** with customer (Julie)
2. **Sidekick displays information** and responds to queries
3. **Escalation detection** when transfer is necessary
4. **ZenDesk interface** receives the conversation with:
   - Full transcript
   - Handoff summary
   - Structured fields populated with customer data

Agents can resolve issues without customers repeating information - maintaining a continuous story.`
    },
    {
      _key: 'architecture',
      heading: 'Sidekick Architecture & Trust Layer',
      content: `**Experience Orchestration:**
Sidekick's underlying architecture remains consistent whether operating:
- As a full suite within Gladly
- As a standalone product

Same knowledge sources, guides, escalation rules, and performance insights regardless of platform.

**Trust Layer:**
Every Sidekick response undergoes checks for:
- Tone and brand alignment
- Fact-checking
- Hallucination prevention
- Promise detection
- Compliance
- Safety

Responses must pass a confidence threshold. If they fail twice, they're escalated to an agent - ensuring trustworthiness and brand consistency across all channels.`
    },
    {
      _key: 'integrations',
      heading: 'Enterprise Integrations',
      content: `**Current Demo Focus (subset of four):**
- ZenDesk
- Fresh Chat
- Dixa
- Help Scout

**Coming Later:**
- Salesforce (needs consultant involvement)

**CCaaS Logos (Genesis, etc.):**
Represent ability to hand off voice AI with any provider through simple call forwarding.

**Homegrown/Unarticulated Systems:**
Build middleware through the app platform - same approach as existing integrations.`
    },
    {
      _key: 'training',
      heading: 'Demo Training Track',
      content: `**Launching September 29th:**
- Four-to-six week demo training track
- Establish common demo principles
- Build up to full 45-minute demo with Sidekick Standalone focus

**Training Includes:**
- Modules covering "under the hood" technical elements
- Sessions led by BP and product experts
- Small group practice sessions with feedback

**Pre-Training Survey:**
Coming from Christian Shockley to gauge familiarity with principles, pitfalls, and desired technical enablement.`
    },
    {
      _key: 'routing',
      heading: 'Handoff & Routing Rules',
      content: `**Responsibility for Routing Rules:**
The helpdesk is responsible for routing rules after handoff - anything that would typically happen after Sidekick in Gladly now occurs within the helpdesk.

**Intent Detection:**
- Sidekick does perform intent recognition to guide actions and outcomes
- This data is NOT currently exposed to third parties
- Help desk cannot directly utilize Sidekick's intent data

**Tags & Fields (Coming):**
- Tags for ZenDesk planned by end of October
- Ticket fields and forms will NOT be edited
- MVP release: October 1st`
    }
  ]
};

async function processTranscripts() {
  console.log('Processing transcripts and updating catalog entries...\n');

  // Get training content type
  const trainingContentType = await client.fetch(
    `*[_type == "contentType" && slug.current == "training"][0]._id`
  );

  // ========================================================================
  // 1. Update Sidekick Sales Launch Enablement (existing entry)
  // ========================================================================
  console.log('1. Processing: Sidekick Sales Launch Enablement');
  const sidekickSalesDoc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0]{ _id, title }`,
    { slug: SIDEKICK_SALES.slug }
  );

  if (sidekickSalesDoc) {
    await client.patch(sidekickSalesDoc._id)
      .set({
        description: SIDEKICK_SALES.description,
        keyTakeaways: SIDEKICK_SALES.keyTakeaways,
        actionItems: SIDEKICK_SALES.actionItems,
        articleSections: SIDEKICK_SALES.articleSections,
        presenter: 'Austin Reece, Kyle Kacius, Gina Vivar',
        duration: '60 min',
      })
      .commit();
    console.log('   ✅ Updated: Sidekick Sales Launch Enablement\n');
  } else {
    console.log('   ⚠️  Entry not found - skipping\n');
  }

  // ========================================================================
  // 2. Create/Update First Meeting Deck Release 2.0
  // ========================================================================
  console.log('2. Processing: First Meeting Deck Release 2.0');
  let fmDoc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0]{ _id }`,
    { slug: FIRST_MEETING_DECK.slug }
  );

  const fmData = {
    title: FIRST_MEETING_DECK.title,
    description: FIRST_MEETING_DECK.description,
    cardType: 'enablement',
    contentType: trainingContentType ? { _type: 'reference', _ref: trainingContentType } : undefined,
    pageTemplate: 'training-session',
    publishedTo: ['enablement'],
    publishDate: FIRST_MEETING_DECK.publishDate,
    keyTakeaways: FIRST_MEETING_DECK.keyTakeaways,
    actionItems: FIRST_MEETING_DECK.actionItems,
    articleSections: FIRST_MEETING_DECK.articleSections,
    enablementCategory: 'pre-sales',
    status: 'published',
    priority: 80,
    presenter: 'Christian Shockley, Steve West, Emilio Di Zazzo',
    duration: '30 min',
  };

  try {
    if (fmDoc) {
      await client.patch(fmDoc._id)
        .set({
          ...fmData,
          'mainContent.videoUrl': FIRST_MEETING_DECK.videoUrl,
          'resourceLinks.videoUrl': FIRST_MEETING_DECK.videoUrl,
          'resourceLinks.transcriptUrl': FIRST_MEETING_DECK.transcriptUrl,
          'resourceLinks.slidesUrl': FIRST_MEETING_DECK.slidesUrl,
        })
        .commit();
      console.log('   ✅ Updated: First Meeting Deck Release 2.0\n');
    } else {
      await client.create({
        _type: 'catalogEntry',
        slug: { _type: 'slug', current: FIRST_MEETING_DECK.slug },
        ...fmData,
        mainContent: { videoUrl: FIRST_MEETING_DECK.videoUrl },
        resourceLinks: {
          videoUrl: FIRST_MEETING_DECK.videoUrl,
          transcriptUrl: FIRST_MEETING_DECK.transcriptUrl,
          slidesUrl: FIRST_MEETING_DECK.slidesUrl,
        },
      });
      console.log('   ✅ Created: First Meeting Deck Release 2.0\n');
    }
  } catch (err: any) {
    if (err.message?.includes('permission')) {
      console.log('   ⚠️  No create permission - entry needs to be created via Sanity Studio');
      console.log(`      Slug: ${FIRST_MEETING_DECK.slug}\n`);
    } else {
      throw err;
    }
  }

  // ========================================================================
  // 3. Create/Update Flip Competitive + SK Voice Roadmap
  // ========================================================================
  console.log('3. Processing: Flip Competitive + SK Voice Roadmap');
  let flipDoc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0]{ _id }`,
    { slug: FLIP_COMPETITIVE.slug }
  );

  const flipData = {
    title: FLIP_COMPETITIVE.title,
    description: FLIP_COMPETITIVE.description,
    cardType: 'enablement',
    contentType: trainingContentType ? { _type: 'reference', _ref: trainingContentType } : undefined,
    pageTemplate: 'training-session',
    publishedTo: ['enablement'],
    publishDate: FLIP_COMPETITIVE.publishDate,
    keyTakeaways: FLIP_COMPETITIVE.keyTakeaways,
    actionItems: FLIP_COMPETITIVE.actionItems,
    articleSections: FLIP_COMPETITIVE.articleSections,
    enablementCategory: 'product',
    status: 'published',
    priority: 80,
  };

  try {
    if (flipDoc) {
      await client.patch(flipDoc._id)
        .set({
          ...flipData,
          'mainContent.videoUrl': FLIP_COMPETITIVE.videoUrl,
          'resourceLinks.videoUrl': FLIP_COMPETITIVE.videoUrl,
          'resourceLinks.transcriptUrl': FLIP_COMPETITIVE.transcriptUrl,
          'resourceLinks.slidesUrl': FLIP_COMPETITIVE.slidesUrl,
        })
        .commit();
      console.log('   ✅ Updated: Flip Competitive + SK Voice Roadmap\n');
    } else {
      await client.create({
        _type: 'catalogEntry',
        slug: { _type: 'slug', current: FLIP_COMPETITIVE.slug },
        ...flipData,
        mainContent: { videoUrl: FLIP_COMPETITIVE.videoUrl },
        resourceLinks: {
          videoUrl: FLIP_COMPETITIVE.videoUrl,
          transcriptUrl: FLIP_COMPETITIVE.transcriptUrl,
          slidesUrl: FLIP_COMPETITIVE.slidesUrl,
        },
      });
      console.log('   ✅ Created: Flip Competitive + SK Voice Roadmap\n');
    }
  } catch (err: any) {
    if (err.message?.includes('permission')) {
      console.log('   ⚠️  No create permission - entry needs to be created via Sanity Studio');
      console.log(`      Slug: ${FLIP_COMPETITIVE.slug}\n`);
    } else {
      throw err;
    }
  }

  // ========================================================================
  // 4. Create/Update Monthly Partnership Enablement (Unwrap.ai)
  // ========================================================================
  console.log('4. Processing: Monthly Partnership Enablement (Unwrap.ai)');
  let unwrapDoc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0]{ _id }`,
    { slug: UNWRAP_PARTNERSHIP.slug }
  );

  const unwrapData = {
    title: UNWRAP_PARTNERSHIP.title,
    description: UNWRAP_PARTNERSHIP.description,
    cardType: 'enablement',
    contentType: trainingContentType ? { _type: 'reference', _ref: trainingContentType } : undefined,
    pageTemplate: 'training-session',
    publishedTo: ['enablement'],
    publishDate: UNWRAP_PARTNERSHIP.publishDate,
    keyTakeaways: UNWRAP_PARTNERSHIP.keyTakeaways,
    actionItems: UNWRAP_PARTNERSHIP.actionItems,
    articleSections: UNWRAP_PARTNERSHIP.articleSections,
    enablementCategory: 'partner',
    status: 'published',
    priority: 70,
    presenter: 'Nathan Smith, Ben Altneu, Ryan (Unwrap CEO)',
    duration: '30 min',
  };

  try {
    if (unwrapDoc) {
      await client.patch(unwrapDoc._id)
        .set(unwrapData)
        .commit();
      console.log('   ✅ Updated: Monthly Partnership Enablement (Unwrap.ai)\n');
    } else {
      await client.create({
        _type: 'catalogEntry',
        slug: { _type: 'slug', current: UNWRAP_PARTNERSHIP.slug },
        ...unwrapData,
      });
      console.log('   ✅ Created: Monthly Partnership Enablement (Unwrap.ai)\n');
    }
  } catch (err: any) {
    if (err.message?.includes('permission')) {
      console.log('   ⚠️  No create permission - entry needs to be created via Sanity Studio');
      console.log(`      Slug: ${UNWRAP_PARTNERSHIP.slug}\n`);
    } else {
      throw err;
    }
  }

  // ========================================================================
  // 5. Create/Update Standalone SK Demo (Figma)
  // ========================================================================
  console.log('5. Processing: Standalone SK Demo (Figma)');
  let skDemoDoc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0]{ _id }`,
    { slug: STANDALONE_SK_DEMO.slug }
  );

  const skDemoData = {
    title: STANDALONE_SK_DEMO.title,
    description: STANDALONE_SK_DEMO.description,
    cardType: 'enablement',
    contentType: trainingContentType ? { _type: 'reference', _ref: trainingContentType } : undefined,
    pageTemplate: 'training-session',
    publishedTo: ['enablement'],
    publishDate: STANDALONE_SK_DEMO.publishDate,
    keyTakeaways: STANDALONE_SK_DEMO.keyTakeaways,
    actionItems: STANDALONE_SK_DEMO.actionItems,
    articleSections: STANDALONE_SK_DEMO.articleSections,
    enablementCategory: 'demo-standards',
    status: 'published',
    priority: 70,
    presenter: 'Steve West, Christian Eberle, Christian Shockley',
    duration: '30 min',
  };

  try {
    if (skDemoDoc) {
      await client.patch(skDemoDoc._id)
        .set(skDemoData)
        .commit();
      console.log('   ✅ Updated: Standalone SK Demo (Figma)\n');
    } else {
      await client.create({
        _type: 'catalogEntry',
        slug: { _type: 'slug', current: STANDALONE_SK_DEMO.slug },
        ...skDemoData,
      });
      console.log('   ✅ Created: Standalone SK Demo (Figma)\n');
    }
  } catch (err: any) {
    if (err.message?.includes('permission')) {
      console.log('   ⚠️  No create permission - entry needs to be created via Sanity Studio');
      console.log(`      Slug: ${STANDALONE_SK_DEMO.slug}\n`);
    } else {
      throw err;
    }
  }

  console.log('✅ Processing complete!');
}

processTranscripts().catch(console.error);
