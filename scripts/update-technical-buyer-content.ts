/**
 * Update Technical Buyer Enablement entry with extracted content from transcript
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const SLUG = 'technical-buyer-enablement-ciocto';

const CONTENT = {
  description: `Learn how to effectively engage CIOs and CTOs at your top accounts. This session covers why technical buyers are now more accessible than ever due to AI initiatives, how to tailor your messaging to their specific priorities, and proven strategies for getting "in the room where it happens" before competitors like Sierra do.`,

  keyTakeaways: [
    "CIOs and CTOs are now actively interested in meeting vendors due to AI being a top initiative globally - customer service is one of the primary AI use cases they consider",
    "CIOs prioritize operational efficiency, vendor consolidation, and 'if it ain't broke don't fix it' mentality - lead with simplicity and total cost of ownership",
    "CTOs focus on engineering impact, APIs, and architecture - they need substantive proof over marketing fluff and often ask 'should we build this ourselves?'",
    "You have 3-5 minutes to prove you understand their specific world - identify what's 'on fire' for them and show how Gladly can help put it out",
    "Never go to these meetings alone - bring an SC or product person for technical credibility, and leadership (someone with 'chief' in their title) for strategic accounts",
    "Competitors like Sierra are going directly to CIOs/CTOs at major accounts (Ulta, Nordstrom, AG1) and securing pilots - we need to be proactive, not reactive",
    "The best sales tool at Gladly is Gladly - use custom guides to demonstrate tailored solutions that show you understand their business",
    "Multi-threading is critical - lack of engagement with multiple decision-making roles has contributed to pipeline deceleration"
  ],

  actionItems: [
    "Identify the CIO/CTO at your top 5 accounts and reach out to establish relationships",
    "Prepare 30-60 minutes minimum before technical buyer meetings - research their tech stack, recent initiatives, and customize your deck",
    "Build your meeting team: rep + SC/product person + leadership for strategic accounts",
    "Create custom Gladly demos using the guide feature to show prospects their specific use cases",
    "Start multi-threading in open opportunities - get multiple roles activated early in the deal cycle",
    "For existing customer accounts, work with your champion to get introductions to technical buyers before competitors reach them",
    "Use the new custom URL capability - SEs can now point demos to specific prospect URLs without needing engineering",
    "Share your successes and failures with enablement so the team can learn from each other"
  ],

  articleSections: [
    {
      _key: 'intro',
      heading: 'Why Technical Buyers Matter Now More Than Ever',
      content: `The entire attitude and willingness of C-suite executives to meet with vendors has changed completely. Previously, CIOs and CTOs didn't care whether companies used Zendesk or Gladly - it was just a "better or worse mousetrap." But with AI becoming a top initiative globally, customer service is now one of the primary use cases executives consider for AI.

As Andy D'Amato shared: "Executives are super curious and really excited to get to know us and what we can be doing for them and their organization." This isn't just a fluffy call to action - external executives actually want to hear from us.`
    },
    {
      _key: 'threat',
      heading: 'The Competitive Threat: Sierra Is Already There',
      content: `Sierra is using their CEO's connections (ex-CEO of Salesforce and chairman of the board at OpenAI) to connect with executive-level contacts and initiate pilots. At Ulta - a current Gladly Sidekick account - Sierra reached out directly to the CIO and secured a $50,000 pilot.

They position themselves as "conversational AI across the enterprise" and walk into first meetings with fully baked demos. As Sal DiSanto emphasized: "Our first meeting motion has to change. You have to go in with a POV and be able to show them that POV live if you want to compete."

The action item is clear: become proactive about looping in technical buyers, making them champions or key stakeholders early - rather than having them become blockers later.`
    },
    {
      _key: 'personas',
      heading: 'Understanding CIO vs CTO Personas',
      content: `**CIOs** care about operational efficiency. Their mindset is "if it ain't broke, don't fix it." They want to hear about vendor consolidation and total cost of ownership. If you lead with innovation, you might lose them immediately.

**CTOs** care about engineering impact and are constantly asking "should we build this ourselves?" They want to know about APIs and architecture. If you show up with marketing fluff with no proof, they're gone.

Remember: These executives have decades of experience buying technology, but maybe not CX. You need to communicate in their language and identify their specific "burning issue" within the first 3-5 minutes.`
    },
    {
      _key: 'prep',
      heading: 'Meeting Preparation and Execution',
      content: `**Before the meeting (30-60 minutes minimum):**
- Research their tech stack and recent initiatives
- Prep your team on who says what
- Customize your presentation deck
- For cold accounts, bring a "point of view" slide showing you know their initiatives

**During the meeting:**
- First 5 minutes are critical - listen to their language and mirror it back
- If engagement is low, pivot: "What is your biggest concern about this area?"
- Always establish a clear next step before ending

**Your team composition:**
- You (rep) - lead and orchestrate
- SC or product person - establish technical credibility
- Leadership - for strategic accounts (someone with "chief" in their title lands differently)
- Full team required if facing Sierra`
    },
    {
      _key: 'demo',
      heading: 'Custom Demo Strategy: "So Easy a Salesperson Can Do It"',
      content: `Marcus Tetwiler demonstrated a game-changing approach: using Gladly's guide feature to create customized demonstrations. Key elements:

1. **Show you know them**: Display their active channels (voice, chat, email, SMS) and how Gladly manages them from one central system
2. **Tailor instructions**: Show how instructions might be different for voice vs SMS
3. **Demonstrate integrations**: Show contextual handoffs back to their CRM (Salesforce, etc.)
4. **Conversational commerce**: Instead of just deflection, show product suggestions and qualification questions

This approach helped book a meeting with GNC's VP of IT. The custom guides can be created in 30 minutes or less with practice.

**New capability**: SEs can now create custom AI demos pointing to specific prospect URLs without needing product engineers - test your demos first to ensure correct results.`
    },
    {
      _key: 'multithread',
      heading: 'Multi-Threading and Protecting Accounts',
      content: `A significant factor in pipeline deceleration has been the lack of engagement with multiple roles in decision-making committees. You need to be proactive across:

- **Cold outreach**: Find and approach technical buyers at target accounts
- **Warm prospects and leads**: Start building relationships with CIOs/CTOs early
- **Open opportunities**: Multi-thread with multiple personas before the deal closes
- **Existing customers**: Protect your accounts - competitors are actively targeting our biggest customers

For existing accounts, use LinkedIn Navigator to identify 3 new C-suite execs you've never met. Reach out with a message like: "I'm with Gladly. We're already a vendor in customer service. You're using AI today. Here are the results you're getting. We think we can get you to 50% resolution rates." Work in concert with your champion to avoid political issues.`
    }
  ]
};

async function updateTechnicalBuyerContent() {
  console.log('Updating Technical Buyer Enablement content...\n');

  const doc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0] { _id, title }`,
    { slug: SLUG }
  );

  if (!doc) {
    console.log('Entry not found!');
    return;
  }

  console.log(`Found: ${doc.title}`);
  console.log(`\nUpdating with:`);
  console.log(`  - Description: ${CONTENT.description.substring(0, 100)}...`);
  console.log(`  - Key Takeaways: ${CONTENT.keyTakeaways.length} items`);
  console.log(`  - Action Items: ${CONTENT.actionItems.length} items`);
  console.log(`  - Article Sections: ${CONTENT.articleSections.length} sections`);

  await client
    .patch(doc._id)
    .set({
      description: CONTENT.description,
      keyTakeaways: CONTENT.keyTakeaways,
      actionItems: CONTENT.actionItems,
      articleSections: CONTENT.articleSections,
      duration: '47 min',
      presenter: 'Gina Vivar, Steve West, Andy D\'Amato, Marcus Tetwiler',
    })
    .commit();

  console.log('\n✅ Content updated successfully!');
}

updateTechnicalBuyerContent().catch(console.error);
