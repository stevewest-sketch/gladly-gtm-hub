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

const contentResources = [
  // One-Pagers
  {
    _type: 'contentResource',
    title: 'Gladly Platform One-Pager',
    description: 'Overview of Gladly platform capabilities and benefits',
    category: 'one-pagers',
    type: 'one-pager',
    icon: '📄',
    metadata: '1 page',
    link: 'https://docs.google.com/file/d/1FQv7jWDtaZUKfGaVYAYbvGV0NQYrEZbi/view?usp=drive_link',
    compact: true
  },
  {
    _type: 'contentResource',
    title: 'Customer AI One-Pager',
    description: 'AI capabilities and use cases overview',
    category: 'one-pagers',
    type: 'one-pager',
    icon: '🤖',
    metadata: '1 page',
    link: 'https://docs.google.com/file/d/1Vdvif-TOMCDwCbdhm3RtY5SQs0IppWkd/view?usp=sharing',
    compact: true
  },
  {
    _type: 'contentResource',
    title: 'Sidekick for Sales One-Pager',
    description: 'Sales-specific Sidekick capabilities',
    category: 'one-pagers',
    type: 'one-pager',
    icon: '💼',
    metadata: '1 page',
    link: 'https://drive.google.com/file/d/1IT4yvW_A72wTuFl1TmbYGnMl6Qs68uLZ/view?usp=drive_link',
    compact: true
  },
  {
    _type: 'contentResource',
    title: 'Sidekick for Voice One-Pager',
    description: 'Voice AI capabilities and benefits',
    category: 'one-pagers',
    type: 'one-pager',
    icon: '🎤',
    metadata: '1 page',
    link: 'https://drive.google.com/file/d/1D3TgLMnQC5H_Uo_bMvWdFcHQxNWz0J-9/view?usp=drive_link',
    compact: true
  },
  {
    _type: 'contentResource',
    title: 'Sidekick for Email One-Pager',
    description: 'Email automation and AI assistance',
    category: 'one-pagers',
    type: 'one-pager',
    icon: '📧',
    metadata: '1 page',
    link: 'https://drive.google.com/file/d/1lfQfKXj8RmIEAWoWzS52P0Gp1xqOtj7H/view?usp=drive_link',
    compact: true
  },
  {
    _type: 'contentResource',
    title: 'Sidekick for Zendesk One-Pager',
    description: 'How Sidekick enhances Zendesk deployments',
    category: 'one-pagers',
    type: 'one-pager',
    icon: '🔗',
    metadata: '1 page',
    link: 'https://drive.google.com/file/d/1T_jQJ4ERy44OTzj-i_7ZNF-QFeRIso66/view?usp=sharing',
    compact: true
  },

  // Presentations
  {
    _type: 'contentResource',
    title: 'Gladly Reports & Insights',
    description: 'Comprehensive reporting and analytics framework presentation',
    category: 'presentations',
    type: 'presentation',
    icon: '📊',
    metadata: '42 slides',
    link: 'https://docs.google.com/presentation/d/1K3vl9yFqU54gkf1C0nhABoFxm0kLCY5Ci7r5DQT240E/edit?slide=id.g36025773fef_0_793#slide=id.g36025773fef_0_793',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'Real CX Metrics',
    description: 'Framework for measuring customer experience effectively',
    category: 'presentations',
    type: 'presentation',
    icon: '📈',
    metadata: '38 slides',
    link: 'https://docs.google.com/presentation/d/1jDCjcoAwJ4Oq3xDP-AwzMW91iVY7VWDB_GG2-6lMK_0/edit?slide=id.g36025773fef_0_793#slide=id.g36025773fef_0_793',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'Sidekick Debugging Guide',
    description: 'Troubleshooting guide for Sidekick issues',
    category: 'presentations',
    type: 'presentation',
    icon: '🔧',
    metadata: '25 slides',
    link: 'https://docs.google.com/presentation/d/1wXKPjMZRwOpHBuhglLDZbJhwOwfmkN_KpF0KUWY5OFU/edit?slide=id.g36025773fef_0_793#slide=id.g36025773fef_0_793',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'A&R Operational Tooling',
    description: 'Answers & Recommendations tooling and best practices',
    category: 'presentations',
    type: 'presentation',
    icon: '⚙️',
    metadata: '32 slides',
    link: 'https://docs.google.com/presentation/d/1xi66eHAkaQbQLUeQ7BHRCFU08a4of1t30REdRpCJv_4/edit?slide=id.g36efe0cce60_2_55#slide=id.g36efe0cce60_2_55',
    compact: false
  },

  // Case Studies & Social Proof
  {
    _type: 'contentResource',
    title: 'Customer Success Stories',
    description: 'Case studies, testimonials, and social proof slides',
    category: 'case-studies',
    type: 'presentation',
    icon: '⭐',
    metadata: '45+ slides',
    link: 'https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit?usp=drive_open&ouid=102926403603073320356',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'Proof Point Repository',
    description: 'Customer-approved metrics, wins, and success stories',
    category: 'case-studies',
    type: 'repository',
    icon: '🏆',
    metadata: 'Spreadsheet',
    link: 'https://docs.google.com/spreadsheets/d/1Y0n1rVskWIzWcegwCbfP7YUXkjV58TFf5S7LLxMkFNA/edit?gid=1725734072#gid=1725734072',
    compact: false
  },

  // Industry Specific
  {
    _type: 'contentResource',
    title: 'Travel & Hospitality Vertical Slides',
    description: 'Industry-specific messaging and use cases for travel',
    category: 'industry',
    type: 'slides',
    icon: '✈️',
    metadata: '12 slides',
    link: 'https://docs.google.com/presentation/d/1PVNNnhM2o0qD_dXd5MXXqYMmEKKcf4Q4t0gU7zzVAUc/edit?slide=id.g35f391192_00#slide=id.g35f391192_00',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'Online Marketplace Vertical Slides',
    description: 'Industry-specific messaging for online marketplaces',
    category: 'industry',
    type: 'slides',
    icon: '🛒',
    metadata: '10 slides',
    link: 'https://docs.google.com/presentation/d/1R0RyB0eFrvvXBK7h9TCKN2LMzLaWrEyP5sCo7hD1Zr4/edit?slide=id.g35f391192_00#slide=id.g35f391192_00',
    compact: false
  },

  // Marketing Materials
  {
    _type: 'contentResource',
    title: 'Marketing Attribution Guide',
    description: 'Framework for tracking and measuring marketing effectiveness',
    category: 'marketing',
    type: 'guide',
    icon: '🎯',
    metadata: 'Document',
    link: 'https://docs.google.com/document/d/1s1a2Yx0SWvIj4KIeqWHe8zOTJCjJpCnM9UqLNPWs7E0/edit?tab=t.0',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'Marketing Efficiency Metrics',
    description: 'KPIs and metrics for marketing team performance',
    category: 'marketing',
    type: 'guide',
    icon: '📊',
    metadata: 'Document',
    link: 'https://docs.google.com/document/d/1L3bRsL4s5m6DfPr8Yq7FvJmN8xW2zQcC6dR9hK3tB1/edit?tab=t.0',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'Brand Guidelines',
    description: 'Complete brand style guide with logos, colors, and typography',
    category: 'marketing',
    type: 'guide',
    icon: '🎨',
    metadata: 'PDF + Presentation',
    link: 'https://docs.google.com/presentation/d/10SILxH41R64hYfIngnCsO3nZfbJY7zFDGB2cA9b1FoM/edit?slide=id.g36025773fef_0_793#slide=id.g36025773fef_0_793',
    compact: false
  },

  // Partner Materials
  {
    _type: 'contentResource',
    title: 'BigCommerce Partnership Slides',
    description: 'Partner messaging and integration overview',
    category: 'presentations',
    type: 'partner-slides',
    icon: '🤝',
    metadata: '8 slides',
    link: 'https://docs.google.com/presentation/d/1yLnJ7hRgKfD8mW9qC5xB2nE3vP4sT6oA1zU7yX3wV2/edit?slide=id.g35f391192_00#slide=id.g35f391192_00',
    compact: false
  },
  {
    _type: 'contentResource',
    title: 'Salesforce Partnership Slides',
    description: 'Salesforce integration and partnership overview',
    category: 'presentations',
    type: 'partner-slides',
    icon: '☁️',
    metadata: '10 slides',
    link: 'https://docs.google.com/presentation/d/1mK4nP8rQ2sE7vL9xW3yC5zB6nF1tR4oD8hU3jY2wX5/edit?slide=id.g35f391192_00#slide=id.g35f391192_00',
    compact: false
  }
];

async function seedContentLibrary() {
  console.log('🌱 Starting to seed content library...');

  try {
    for (const resource of contentResources) {
      const result = await client.create(resource);
      console.log(`✅ Created: ${resource.title} (${resource.category})`);
    }

    console.log(`\n✨ Successfully seeded ${contentResources.length} content resources!`);
    console.log('\nYou can now:');
    console.log('1. View them in Sanity Studio at http://localhost:3000/studio');
    console.log('2. See them on the content library page at http://localhost:3000/resources/content');
    console.log('3. Filter by category and explore resources');
    console.log('4. Edit/add more resources through Sanity Studio');

  } catch (error) {
    console.error('❌ Error seeding content library:', error);
    process.exit(1);
  }
}

seedContentLibrary();
