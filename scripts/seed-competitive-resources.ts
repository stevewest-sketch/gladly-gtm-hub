import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const competitiveResources = [
  // Battle Cards
  {
    _type: 'competitiveResource',
    title: 'Zendesk Battle Card',
    description: 'Complete competitive positioning against Zendesk including key differentiators, objection handling, and win themes',
    competitor: 'Zendesk',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1W-PaZAwqmm7g8EwEyAXJMRs0omZVV84MbndapbZexxk/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Zendesk AI vs Sidekick One Pager',
    description: 'One-page competitive comparison highlighting Sidekick advantages over Zendesk AI',
    competitor: 'Zendesk',
    resourceType: 'One Pager',
    icon: '📄',
    lastUpdated: '2025-01-01',
    link: 'https://drive.google.com/file/d/1HSkV0bx4q4KltfvBiqCAmcsIEJm7OrhR/view?usp=sharing'
  },
  {
    _type: 'competitiveResource',
    title: 'Zendesk Competitive Snapshot',
    description: 'Quick reference guide for Zendesk competitive positioning',
    competitor: 'Zendesk',
    resourceType: 'Guide',
    icon: '📊',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1JqejOWDJcdhUYJC62LwZsHJZvjI8BpukCW14-VRGv9k/edit?tab=t.0#heading=h.w2vezcatf8t2'
  },
  {
    _type: 'competitiveResource',
    title: 'Sidekick for Zendesk One Pager',
    description: 'How Sidekick integrates with and enhances Zendesk deployments',
    competitor: 'Zendesk',
    resourceType: 'One Pager',
    icon: '📄',
    lastUpdated: '2025-01-01',
    link: 'https://drive.google.com/file/d/1T_jQJ4ERy44OTzj-i_7ZNF-QFeRIso66/view?usp=sharing'
  },
  {
    _type: 'competitiveResource',
    title: 'Intercom Battle Card',
    description: 'Strategic positioning against Intercom Fin and other Intercom AI products',
    competitor: 'Intercom',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1Fs33T14sI1pt_9DQ_IbPb_Mhmgcm3YG-cM7jD9eozFY/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Intercom Fin vs Sidekick One Pager',
    description: 'Head-to-head comparison of Intercom Fin and Sidekick capabilities',
    competitor: 'Intercom',
    resourceType: 'One Pager',
    icon: '📄',
    lastUpdated: '2025-01-01',
    link: 'https://drive.google.com/file/d/1it3W8ly3oDsj25SOr-cEkkpnD_pxcyEX/view'
  },
  {
    _type: 'competitiveResource',
    title: 'Salesforce Agentforce Battle Card',
    description: 'Positioning against Salesforce Agentforce with key differentiators and messaging',
    competitor: 'Salesforce',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://drive.google.com/file/d/1T30zPp-W1jWX7vCrU5IP5ZN-6IdoyEqv/view'
  },
  {
    _type: 'competitiveResource',
    title: 'Salesforce Agentforce vs Sidekick One Pager',
    description: 'One-page comparison showing Sidekick advantages over Salesforce Agentforce',
    competitor: 'Salesforce',
    resourceType: 'One Pager',
    icon: '📄',
    lastUpdated: '2025-01-01',
    link: 'https://drive.google.com/file/d/1T30zPp-W1jWX7vCrU5IP5ZN-6IdoyEqv/view'
  },
  {
    _type: 'competitiveResource',
    title: 'Genesys Battle Card',
    description: 'Complete competitive intelligence for Genesys Cloud positioning',
    competitor: 'Genesys',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1h9B0TPLhLPvV1HIu43u4_NQbx0eWhuffYIMW40-kZVM/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Kustomer Battle Card',
    description: 'Strategic positioning and differentiation against Kustomer',
    competitor: 'Kustomer',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1z-ePQ3ApRnIdaZYaoJt03_MT5IibRID6TOgDqpYXslo/edit?tab=t.n4au1kn49atb'
  },
  {
    _type: 'competitiveResource',
    title: 'Gorgias Battle Card',
    description: 'E-commerce focused competitive positioning against Gorgias',
    competitor: 'Gorgias',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1iJj5WT0hdlceKK1x8I05V90su0MoHhZL8M4W4CbuZs0/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Ada Battle Card',
    description: 'AI-focused competitive positioning against Ada',
    competitor: 'Ada',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1JXnRO9qXiQzU5YOKtDs7TVYdS-pGy0hUx7kOwZIiKpw/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Dixa Battle Card',
    description: 'Competitive positioning and differentiation against Dixa',
    competitor: 'Dixa',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1_x1GZjDmha5lDn-Fn2a0tkeAV10NdVeN0nP147KX3lk/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Sierra AI Battle Card',
    description: 'Strategic positioning against Sierra AI platform',
    competitor: 'Sierra AI',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1sftpMuPGj5_IaX04jtyGppmTqLtqVkhjybWvx05q7Sg/edit?tab=t.0'
  },
  {
    _type: 'competitiveResource',
    title: 'Sprinklr Battle Card',
    description: 'Enterprise social and CX platform competitive positioning',
    competitor: 'Sprinklr',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1LTHFTItCxQHYg894EE0s0ewtL0w1uYihCImJjMdW3Pg/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Linc (Capacity) Battle Card',
    description: 'Competitive intelligence for Linc/Capacity positioning',
    competitor: 'Linc',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1vpQ9pWOMhNjA-bzMeMZAsegTaiHU6QgTLjigIlvfy28/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Netomi Battle Card',
    description: 'AI customer service competitive positioning against Netomi',
    competitor: 'Netomi',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/10SGlOfQa6ScUmQX4qAgpe_YrSdZPFtHDnK_lFK7bSAI/edit?usp=drive_link'
  },
  {
    _type: 'competitiveResource',
    title: 'Flip.cx Battle Card',
    description: 'Voice AI competitive positioning against Flip.cx',
    competitor: 'Flip.cx',
    resourceType: 'Battle Card',
    icon: '⚔️',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/document/d/1JOiR2HIDwXNUMvDK46nUV7wtX-ccRtdzgLwVTdAgiU4/edit?tab=t.0#heading=h.dpgshr71bogs'
  },
  // Additional Competitive Resources
  {
    _type: 'competitiveResource',
    title: 'Competitive Landscape: Voice AI',
    description: 'Comprehensive analysis of the Voice AI competitive landscape with capability comparison matrix',
    competitor: 'All',
    resourceType: 'Analysis',
    icon: '📊',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/spreadsheets/d/10JXfIooSo3nLNuU8p468f91uUbXqxGFh9tsONsv-ebQ/edit?gid=0#gid=0'
  },
  {
    _type: 'competitiveResource',
    title: 'Competitive Capability Research',
    description: 'Detailed research comparing competitor capabilities across key features and integrations',
    competitor: 'All',
    resourceType: 'Research',
    icon: '🔍',
    lastUpdated: '2025-01-01',
    link: 'https://docs.google.com/spreadsheets/d/1PupVCE-HdsYnrMkscOI2Mtw73Zbceg02rPVX7XK5TKU/edit?gid=0#gid=0'
  },
  {
    _type: 'competitiveResource',
    title: 'Sidekick Sales Differentiation',
    description: 'How Sidekick Sales differentiates from competitive offerings with use case examples',
    competitor: 'All',
    resourceType: 'Differentiation',
    icon: '⭐',
    lastUpdated: '2025-01-01',
    link: 'https://drive.google.com/file/d/1LbVIO3dhY61GxT2_08CQx_5tbl-Q5SmX/view?usp=sharing'
  }
];

async function seedCompetitiveResources() {
  console.log('🌱 Starting to seed competitive resources...');

  try {
    for (const resource of competitiveResources) {
      const result = await client.create(resource);
      console.log(`✅ Created: ${resource.title} (${resource.competitor})`);
    }

    console.log(`\n✨ Successfully seeded ${competitiveResources.length} competitive resources!`);
    console.log('\nYou can now:');
    console.log('1. View them in Sanity Studio at http://localhost:3000/studio');
    console.log('2. See them on the competitive page at http://localhost:3000/enablement/competitive');
    console.log('3. Edit/add more resources through Sanity Studio');

  } catch (error) {
    console.error('❌ Error seeding competitive resources:', error);
    process.exit(1);
  }
}

seedCompetitiveResources();
