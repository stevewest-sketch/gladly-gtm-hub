import { client } from '../lib/sanity';

const homepageData = {
  _type: 'homepage',
  _id: 'homepage',

  // Hero Section
  heroTitle: 'The GTM Hub',
  heroSubtitle: 'Your central hub for selling, supporting, and growing with Gladly',
  searchPlaceholder: 'Search for battle cards, templates, demos, product info...',

  // Team Toolkits Section
  teamToolkitsTitle: 'Start with Your Role',
  teamToolkitsSubtitle: 'Everything you need, organized for your job',
  teamToolkits: [
    {
      emoji: '💼',
      title: 'Sales Toolkit',
      description: 'Demos, battle cards, plays, and sales materials',
      link: '/enablement/toolkits/sales',
      color: 'blue',
    },
    {
      emoji: '🎯',
      title: 'CSM Toolkit',
      description: 'QBRs, adoption, value tools, and renewal resources',
      link: '/enablement/toolkits/csm',
      color: 'purple',
    },
    {
      emoji: '🔧',
      title: 'SC Toolkit',
      description: 'Demo environments, technical docs, and POC materials',
      link: '/enablement/toolkits/success',
      color: 'green',
    },
    {
      emoji: '📣',
      title: 'Marketing Toolkit',
      description: 'Campaigns, content, templates, and brand assets',
      link: '/enablement/toolkits/marketing',
      color: 'orange',
    },
  ],

  // Quick Tasks Section
  quickTasksTitle: 'What do you need to do today?',
  quickTasks: [
    {
      emoji: '🎬',
      title: 'Prepare for Demo',
      link: '/enablement/demo',
    },
    {
      emoji: '📊',
      title: 'Run a QBR',
      link: 'https://docs.google.com/presentation/d/11EMqR6s3KOlnRafjzgITBmt4QyUFgvlC2zRxfvsmydU/edit',
    },
    {
      emoji: '⚔️',
      title: 'Handle Competitor',
      link: '/enablement/competitive',
    },
    {
      emoji: '💰',
      title: 'Build Business Case',
      link: '/enablement/bva',
    },
    {
      emoji: '🚀',
      title: 'Drive Adoption',
      link: '/coe',
    },
    {
      emoji: '🎓',
      title: 'Access Training',
      link: '/enablement/training',
    },
  ],

  // Products Section
  productsTitle: 'Product Knowledge',
  productsSubtitle: 'Learn about our products and features',
  products: [
    {
      emoji: '🤖',
      title: 'Sidekick Standalone',
      link: '/product/sidekick-standalone',
    },
    {
      emoji: '📞',
      title: 'Sidekick Voice',
      link: '/product/sidekick-voice',
    },
    {
      emoji: '✉️',
      title: 'Sidekick Email',
      link: '/product/sidekick-email',
    },
    {
      emoji: '💵',
      title: 'Sidekick Sales',
      link: '/product/sidekick-sales',
    },
    {
      emoji: '🧠',
      title: 'Customer AI',
      link: '/product/customer-ai',
    },
    {
      emoji: '🗺️',
      title: 'Guides & Journeys',
      link: '/product/guides-journeys',
    },
    {
      emoji: '🔌',
      title: 'App Platform',
      link: '/product/app-platform',
    },
  ],

  // What's New Section
  whatsNewBadge: 'Oct 2025',
  whatsNew: [
    {
      date: 'OCTOBER 1, 2025',
      emoji: '📦',
      title: 'Conversation Reviewer Enhancements',
      description: "Improve visibility into Sidekick's response reasoning to help customers make targeted improvements.",
      links: [
        {
          text: 'Product Guide',
          url: '#',
        },
        {
          text: 'Training Materials',
          url: '#',
        },
      ],
    },
    {
      date: 'OCTOBER 1, 2025',
      emoji: '🎯',
      title: 'Guide-Level Advice',
      description: 'Customize advice at the individual guide level to support tailored tone and coaching.',
      links: [
        {
          text: 'Documentation',
          url: '#',
        },
        {
          text: 'Demo Setup',
          url: '#',
        },
      ],
    },
    {
      date: 'SEPTEMBER 28, 2025',
      emoji: '💰',
      title: 'Cost Tracking for Sidekick Sales',
      description: 'Track costs and explore optimizations as Sidekick Sales scales.',
      links: [
        {
          text: 'Feature Overview',
          url: '#',
        },
        {
          text: 'Customer FAQ',
          url: '#',
        },
      ],
    },
  ],

  // Popular Resources Section
  popularResourcesTitle: 'Most Useful Resources',
  popularResources: [
    {
      emoji: '🎯',
      title: 'Center of Excellence',
      link: '/coe',
    },
    {
      emoji: '⚔️',
      title: 'Competitive Battle Cards',
      link: '/enablement/competitive',
    },
    {
      emoji: '🎬',
      title: 'Demo Hub',
      link: '/enablement/demo',
    },
    {
      emoji: '💰',
      title: 'ROI & BVA Tools',
      link: '/enablement/bva',
    },
    {
      emoji: '📖',
      title: 'Sales Playbooks',
      link: '/enablement/playbooks',
    },
    {
      emoji: '📋',
      title: 'Templates Library',
      link: '/resources/templates',
    },
  ],

  // Help Section
  helpSection: {
    title: "💡 Can't find what you need?",
    description: 'Ask in Slack - the team will help you find it',
    buttons: [
      {
        text: '#enablement-resources',
        link: 'https://gladly.slack.com/archives/C06T8V6TJUA',
        variant: 'primary',
      },
      {
        text: 'Browse All Content',
        link: '#',
        variant: 'secondary',
      },
    ],
  },
};

async function seedHomepage() {
  try {
    console.log('🌱 Seeding homepage data...');

    const result = await client.createOrReplace(homepageData);

    console.log('✅ Homepage data seeded successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('\n🎉 Your homepage is now populated with content from the original HTML!');
    console.log('🌐 Visit http://localhost:3000 to see it live');
    console.log('✏️  Visit http://localhost:3000/studio to edit the content');
  } catch (error) {
    console.error('❌ Error seeding homepage:', error);
    process.exit(1);
  }
}

seedHomepage();
