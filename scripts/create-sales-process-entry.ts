/**
 * Create or Update Sales Process Foundational Training (11/18/25) entry
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const SLUG = 'sales-process-foundational-training-s0-s1';
const VIDEO_URL = 'https://drive.google.com/open?id=1UHYUQWIHF8iZYJ399KDmCuv86GfkZSGw';
const TRANSCRIPT_URL = 'https://drive.google.com/open?id=1dv4kOy8PcAOCpqi01Yt4ip5g4RyuNhc9i1qZWeo0eEA';
const SLIDES_URL = 'https://drive.google.com/open?id=1jt6LRfLN-KUjVYqA3JKD2hMLIl0pn490';

const CONTENT = {
  title: 'Sales Process Foundational Training: S0→S1',
  description: `A comprehensive reset and alignment for the Sales team on the updated Gladly Sales Process, focusing on the transition from Stage 0 (S0) to Stage 1 (S1). Learn the four mandatory qualification criteria, sales team roles by segment, and new Salesforce automation rules designed to speed up sales cycles and provide clearer paths to quota.`,

  keyTakeaways: [
    "Four mandatory S0→S1 criteria: Right Account (Bullseye/Adjacent ICP), Right Individual (buying authority), Right Time to Buy (renewal window), and First Meeting Complete",
    "SMB renewal window is 6 months, Mid-Market is 12 months, Enterprise is 18 months - or Sidekick standalone-compatible helpdesk (Zendesk, SFDC, Gorgias)",
    "CX Renewal Date is now mandatory - opportunities without it auto-close-lost after 30 days",
    "First Meeting outcomes determine opportunity fate: Qualified moves to S1, Wrong Contact/No Next Steps stays in S0 with 60-day auto-close, Disqualified immediately closes lost",
    "SMB AEs own all accounts and self-prospect; MM/ENT AEs lead outbound with BDR support",
    "BDR payout applies to Completed meetings (Qualified, Wrong Contact, No Next Steps, Timing Off) - No payout for Disqualified or No Show",
    "System automation now moves qualified opportunities from S0 to S1 when renewal timing aligns",
    "Clean data hygiene is critical for forecasting and leadership decision-making"
  ],

  actionItems: [
    "Review and understand the four S0→S1 exit criteria before creating new opportunities",
    "Ensure CX Renewal Date is populated on all opportunities to avoid 30-day auto-close",
    "AEs: Coordinate weekly with your BDR on account coverage and outbound strategy",
    "BDRs: Track your Accounts Touched (L7), Contacts Touched (L7), and Outbound Opps (L30) metrics",
    "Use correct First Meeting Outcome categories to ensure proper Salesforce automation",
    "For timing-off opportunities, keep CX Renewal Date populated to prevent auto-close",
    "SMB AEs: Target 14 accounts and 3 contacts touched per week, 2 outbound opps per month",
    "ENT BDRs: Target 10 accounts, 10 contacts per week, 8 outbound opps per month"
  ],

  articleSections: [
    {
      _key: 'overview',
      heading: 'Why This Training Matters',
      content: `This foundational training provides a comprehensive reset on the Gladly Sales Process. The goal is to ensure only truly viable opportunities enter Stage 1, reducing pipeline clutter, improving forecasting accuracy, and ultimately speeding up sales cycles.

The shift is designed to be data-driven - clean Salesforce data enables better leadership decision-making and clearer paths to quota for reps.`
    },
    {
      _key: 's0-s1-criteria',
      heading: 'S0 → S1 Exit Criteria',
      content: `To move an opportunity from Stage 0 to Stage 1, ALL four criteria must be met:

| # | Criteria | What This Means |
|---|----------|-----------------|
| 1 | **Right Account** | Bullseye or Adjacent ICP |
| 2 | **Right Individual** | Has buying authority/influence over CS platform decisions |
| 3 | **Right Time to Buy** | Renewal in window (SMB: 6mo, MM: 12mo, ENT: 18mo) OR Sidekick standalone-compatible helpdesk |
| 4 | **First Meeting Complete** | A qualified first meeting has occurred |

These are non-negotiable requirements. The system automation will move qualified opportunities from S0 to S1 when the renewal timing aligns.`
    },
    {
      _key: 'team-responsibilities',
      heading: 'Sales Team Roles by Segment',
      content: `**SMB:**
- AEs own all accounts, handle inbound + outbound, drive to close
- No BDR support - AEs self-prospect
- Primary KPI: Closed/Won New Business

**Mid-Market:**
- AEs own accounts, lead outbound strategy, drive progression
- BDRs support inbound/targeted outbound, assist coverage
- Primary KPIs: Closed/Won (AE) / Qualified S1 opps (BDR)

**Enterprise:**
- AEs own accounts, lead outbound, strategic account management
- BDRs support inbound/targeted outbound, multi-contact coverage
- Primary KPIs: Closed/Won (AE) / Qualified S1 opps (BDR)`
    },
    {
      _key: 'activity-metrics',
      heading: 'Weekly Activity Expectations',
      content: `| Role | Segment | Accounts Touched (L7) | Contacts Touched (L7) | Outbound Opps (L30) |
|------|---------|----------------------|----------------------|---------------------|
| AE | ENT | 2 | 10 | 1 |
| AE | MM | 14 | 3 | 2 |
| AE | SMB | 14 | 3 | 2 |
| BDR | ENT | 10 | 10 | 8 |
| BDR | MM | 30 | 3 | 24.5 |

These metrics ensure consistent pipeline generation across all segments.`
    },
    {
      _key: 'meeting-outcomes',
      heading: 'First Meeting Outcomes & Auto Close Rules',
      content: `| Outcome | Salesforce Action | Auto Close Lost Rule | BDR Payout? |
|---------|------------------|---------------------|-------------|
| **Completed - Qualified** | Moves to Stage 1 | N/A | Yes |
| Completed - Wrong Contact | Stays in S0 | 60 days → auto Close Lost | Yes |
| Completed - No Next Steps | Stays in S0 | 60 days → auto Close Lost | Yes |
| Completed - Qualified, Timing Off | Stays in S0 until timing aligns | If no CX Renewal Date: 60 days → auto Close Lost | Yes |
| Completed - Disqualified | Auto Close Lost | Immediate | No |
| No Show | Stays in S0 | 30 days → auto Close Lost | No |

**Critical:** The CX Renewal Date field is mandatory. Opportunities without it will auto-close-lost after 30 days.`
    },
    {
      _key: 'sidekick-exception',
      heading: 'Sidekick Standalone Exception',
      content: `For the "Right Time to Buy" criteria, there's an important exception: If the prospect uses a Sidekick standalone-compatible helpdesk (Zendesk, Salesforce Service Cloud, or Gorgias), they can qualify regardless of their renewal window.

This allows us to pursue Sidekick opportunities where we can layer on top of their existing platform rather than waiting for a full platform replacement cycle.`
    }
  ]
};

async function createOrUpdateEntry() {
  console.log('Searching for existing entry...\n');

  // Check if entry exists
  let doc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0] { _id, title }`,
    { slug: SLUG }
  );

  if (doc) {
    console.log(`Found existing entry: ${doc.title}`);
    console.log('Updating...\n');

    await client
      .patch(doc._id)
      .set({
        title: CONTENT.title,
        description: CONTENT.description,
        keyTakeaways: CONTENT.keyTakeaways,
        actionItems: CONTENT.actionItems,
        articleSections: CONTENT.articleSections,
        'mainContent.videoUrl': VIDEO_URL,
        'resourceLinks.videoUrl': VIDEO_URL,
        'resourceLinks.transcriptUrl': TRANSCRIPT_URL,
        'resourceLinks.slidesUrl': SLIDES_URL,
        duration: '60 min',
        presenter: 'RevOps Team',
        publishDate: '2024-11-18',
      })
      .commit();

    console.log('✅ Entry updated successfully!');
  } else {
    console.log('No existing entry found. Creating new entry...\n');

    // Get the training content type reference
    const contentType = await client.fetch(
      `*[_type == "contentType" && slug.current == "training"][0]._id`
    );

    const newDoc = await client.create({
      _type: 'catalogEntry',
      title: CONTENT.title,
      slug: { _type: 'slug', current: SLUG },
      description: CONTENT.description,
      cardType: 'enablement',
      contentType: contentType ? { _type: 'reference', _ref: contentType } : undefined,
      pageTemplate: 'training-session',
      publishedTo: ['enablement'],
      keyTakeaways: CONTENT.keyTakeaways,
      actionItems: CONTENT.actionItems,
      articleSections: CONTENT.articleSections,
      mainContent: {
        videoUrl: VIDEO_URL,
      },
      resourceLinks: {
        videoUrl: VIDEO_URL,
        transcriptUrl: TRANSCRIPT_URL,
        slidesUrl: SLIDES_URL,
      },
      duration: '60 min',
      presenter: 'RevOps Team',
      publishDate: '2024-11-18',
      status: 'published',
    });

    console.log(`✅ Created new entry: ${newDoc.title}`);
    console.log(`   Slug: ${SLUG}`);
  }

  console.log(`\nURLs set:`);
  console.log(`  Video/Session URL: ${VIDEO_URL}`);
  console.log(`  Transcript URL: ${TRANSCRIPT_URL}`);
  console.log(`  Slides URL: ${SLIDES_URL}`);
}

createOrUpdateEntry().catch(console.error);
