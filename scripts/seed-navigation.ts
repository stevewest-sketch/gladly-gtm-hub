import { client } from '../lib/sanity';

const navigationData = {
  _id: 'navigation',
  _type: 'navigation',
  title: 'Main Navigation',
  logoText: 'GTM Hub',
  items: [
    {
      _type: 'navigationItem',
      title: 'Home',
      icon: '🏠',
      href: '/',
      defaultExpanded: false,
      activeColor: 'blue',
    },
    {
      _type: 'navigationItem',
      title: 'Center of Excellence',
      icon: '🎯',
      defaultExpanded: true,
      activeColor: 'purple',
      children: [
        {
          title: 'CoE Overview',
          href: '/coe',
          activeColor: 'purple',
        },
        {
          title: 'Business Value',
          href: '/coe/bva',
          activeColor: 'green',
        },
        {
          title: 'AI Best Practices',
          href: '/coe/ai-best-practices',
          activeColor: 'blue',
        },
        {
          title: 'Customer Wins',
          href: '/coe/customer-wins',
          activeColor: 'orange',
        },
      ],
    },
    {
      _type: 'navigationItem',
      title: 'Enablement',
      icon: '📚',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          title: 'Demo Hub',
          href: '/enablement/demo',
          activeColor: 'blue',
        },
        {
          title: 'Competitive',
          href: '/enablement/competitive',
          activeColor: 'orange',
        },
        {
          title: 'Training Hub',
          href: '/enablement/training',
          activeColor: 'green',
        },
        {
          title: 'E-Learning Hub',
          href: '/enablement/e-learning',
          activeColor: 'blue',
        },
        {
          title: 'Playbooks',
          href: '/enablement/playbooks',
          activeColor: 'blue',
        },
      ],
    },
    {
      _type: 'navigationItem',
      title: 'Team Toolkits',
      icon: '🛠️',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          title: 'Sales',
          href: '/enablement/toolkits/sales',
          activeColor: 'blue',
        },
        {
          title: 'CSM',
          href: '/enablement/toolkits/csm',
          activeColor: 'purple',
        },
        {
          title: 'SC',
          href: '/enablement/toolkits/success',
          activeColor: 'green',
        },
        {
          title: 'Marketing',
          href: '/enablement/toolkits/marketing',
          activeColor: 'orange',
        },
      ],
    },
    {
      _type: 'navigationItem',
      title: 'Products',
      icon: '🤖',
      defaultExpanded: true,
      activeColor: 'blue',
      children: [
        {
          title: 'Sidekick Standalone',
          href: '/product/sidekick-standalone',
          activeColor: 'green',
        },
        {
          title: 'Sidekick Voice',
          href: '/product/sidekick-voice',
          activeColor: 'green',
        },
        {
          title: 'Sidekick Email',
          href: '/product/sidekick-email',
          activeColor: 'green',
        },
        {
          title: 'Sidekick Sales',
          href: '/product/sidekick-sales',
          activeColor: 'green',
        },
        {
          title: 'Customer AI',
          href: '/product/customer-ai',
          activeColor: 'purple',
        },
        {
          title: 'Guides & Journeys',
          href: '/product/guides-and-journeys',
          activeColor: 'purple',
        },
        {
          title: 'App Platform',
          href: '/product/app-platform',
          activeColor: 'blue',
        },
      ],
    },
    {
      _type: 'navigationItem',
      title: 'Resources',
      icon: '📁',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          title: 'Templates',
          href: '/resources/templates',
          activeColor: 'orange',
        },
        {
          title: 'Content Hub',
          href: '/resources/content',
          activeColor: 'purple',
        },
      ],
    },
  ],
};

async function seedNavigation() {
  try {
    console.log('🚀 Starting navigation seed...');

    // Create or update the navigation document
    const result = await client.createOrReplace(navigationData);

    console.log('✅ Navigation seeded successfully!');
    console.log('📋 Result:', result);
    console.log('\n🎯 You can now edit navigation in Sanity Studio under "🧭 Navigation"');

  } catch (error) {
    console.error('❌ Error seeding navigation:', error);
    process.exit(1);
  }
}

seedNavigation();
