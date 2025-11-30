/**
 * Create special entries with detailed content from CSV
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Flip Competitive + SK Voice Roadmap entry
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

// First Meeting Deck Release 2.0 entry
const FIRST_MEETING_DECK_RELEASE = {
  slug: 'first-meeting-deck-release-20',
  title: 'First Meeting Deck Release 2.0',
  description: 'Training session on the updated First Meeting deck, covering new structure, messaging updates, and best practices for initial prospect presentations.',
  videoUrl: 'https://drive.google.com/file/d/1kvznmHGjzOOgQqDmybvUA0F87CC9uuxb/view?usp=drive_web',
  transcriptUrl: 'https://docs.google.com/document/d/1WEWwQ9h5pXBNnOR8a9V64oMDmvaMe-SLlCMco4jDX8Q/edit?usp=meet_tnfm_calendar',
  slidesUrl: 'https://docs.google.com/presentation/d/1TzNEZDVrxebVmFrHC4Jw6xhzUCPf4de7AUQ3-BxsNcY/edit?slide=id.g3a79279a5a3_1_2#slide=id.g3a79279a5a3_1_2',
  publishDate: '2025-11-21',
};

async function createSpecialEntries() {
  console.log('Creating special entries with detailed content...\n');

  // Get training content type
  const trainingContentType = await client.fetch(
    `*[_type == "contentType" && slug.current == "training"][0]._id`
  );

  // Create/update Flip Competitive entry
  console.log('Processing: Flip Competitive + SK Voice Roadmap');
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
    mainContent: {
      videoUrl: FLIP_COMPETITIVE.videoUrl,
    },
    resourceLinks: {
      videoUrl: FLIP_COMPETITIVE.videoUrl,
      transcriptUrl: FLIP_COMPETITIVE.transcriptUrl,
      slidesUrl: FLIP_COMPETITIVE.slidesUrl,
    },
    enablementCategory: 'product',
    status: 'published',
    priority: 80,
  };

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
    console.log('✏️  Updated: Flip Competitive + SK Voice Roadmap');
  } else {
    await client.create({
      _type: 'catalogEntry',
      slug: { _type: 'slug', current: FLIP_COMPETITIVE.slug },
      ...flipData,
    });
    console.log('✅ Created: Flip Competitive + SK Voice Roadmap');
  }

  // Create/update First Meeting Deck Release 2.0 entry
  console.log('\nProcessing: First Meeting Deck Release 2.0');
  let fmDoc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0]{ _id }`,
    { slug: FIRST_MEETING_DECK_RELEASE.slug }
  );

  const fmData = {
    title: FIRST_MEETING_DECK_RELEASE.title,
    description: FIRST_MEETING_DECK_RELEASE.description,
    cardType: 'enablement',
    contentType: trainingContentType ? { _type: 'reference', _ref: trainingContentType } : undefined,
    pageTemplate: 'training-session',
    publishedTo: ['enablement'],
    publishDate: FIRST_MEETING_DECK_RELEASE.publishDate,
    mainContent: {
      videoUrl: FIRST_MEETING_DECK_RELEASE.videoUrl,
    },
    resourceLinks: {
      videoUrl: FIRST_MEETING_DECK_RELEASE.videoUrl,
      transcriptUrl: FIRST_MEETING_DECK_RELEASE.transcriptUrl,
      slidesUrl: FIRST_MEETING_DECK_RELEASE.slidesUrl,
    },
    enablementCategory: 'pre-sales',
    status: 'published',
    priority: 80,
  };

  if (fmDoc) {
    await client.patch(fmDoc._id)
      .set({
        ...fmData,
        'mainContent.videoUrl': FIRST_MEETING_DECK_RELEASE.videoUrl,
        'resourceLinks.videoUrl': FIRST_MEETING_DECK_RELEASE.videoUrl,
        'resourceLinks.transcriptUrl': FIRST_MEETING_DECK_RELEASE.transcriptUrl,
        'resourceLinks.slidesUrl': FIRST_MEETING_DECK_RELEASE.slidesUrl,
      })
      .commit();
    console.log('✏️  Updated: First Meeting Deck Release 2.0');
  } else {
    await client.create({
      _type: 'catalogEntry',
      slug: { _type: 'slug', current: FIRST_MEETING_DECK_RELEASE.slug },
      ...fmData,
    });
    console.log('✅ Created: First Meeting Deck Release 2.0');
  }

  console.log('\n✅ Special entries complete!');
}

createSpecialEntries().catch(console.error);
