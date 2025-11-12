import { client } from '../lib/sanity';

const updatedNavigationData = {
  _id: 'navigation',
  _type: 'navigation',
  title: 'Main Navigation',
  logoText: 'Gladly GTM Hub',
  items: [
    {
      _type: 'navigationItem',
      _key: 'home',
      title: 'Home',
      icon: '🏠',
      href: '/',
      defaultExpanded: false,
      activeColor: 'purple',
    },
    {
      _type: 'navigationItem',
      _key: 'coe',
      title: 'CoE',
      icon: '🎖️',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          _key: 'coe-hub',
          title: 'CoE Hub',
          href: '/coe',
          activeColor: 'blue',
        },
        {
          _key: 'bva',
          title: 'BVA Tools',
          href: '/coe/bva',
          activeColor: 'blue',
        },
      ],
    },
    {
      _type: 'navigationItem',
      _key: 'enablement',
      title: 'Enablement',
      icon: '📙',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          _key: 'demo',
          title: 'Demo',
          href: '/enablement/demo',
          activeColor: 'blue',
        },
        {
          _key: 'training',
          title: 'Training Hub',
          href: '/enablement/training',
          activeColor: 'blue',
        },
        {
          _key: 'elearning',
          title: 'e-Learning Hub',
          href: '/enablement/e-learning',
          activeColor: 'blue',
        },
      ],
    },
    {
      _type: 'navigationItem',
      _key: 'products',
      title: 'Products',
      icon: '⚙️',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          _key: 'sidekick-standalone',
          title: 'Sidekick Standalone',
          href: '/product/sidekick-standalone',
          activeColor: 'blue',
        },
        {
          _key: 'sidekick-voice',
          title: 'Sidekick Voice',
          href: '/product/sidekick-voice',
          activeColor: 'blue',
        },
        {
          _key: 'sidekick-email',
          title: 'Sidekick Email',
          href: '/product/sidekick-email',
          activeColor: 'blue',
        },
        {
          _key: 'sidekick-sales',
          title: 'Sidekick Sales',
          href: '/product/sidekick-sales',
          activeColor: 'blue',
        },
        {
          _key: 'guides-journeys',
          title: 'Guides & Journeys',
          href: '/product/guides-and-journeys',
          activeColor: 'blue',
        },
        {
          _key: 'app-platform',
          title: 'App Platform',
          href: '/product/app-platform',
          activeColor: 'blue',
        },
        {
          _key: 'customer-ai',
          title: 'Customer AI',
          href: '/product/customer-ai',
          activeColor: 'blue',
        },
      ],
    },
    {
      _type: 'navigationItem',
      _key: 'role-kits',
      title: 'Role Kits',
      icon: '🫵',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          _key: 'sales',
          title: 'Sales',
          href: '/enablement/toolkits/sales',
          activeColor: 'blue',
        },
        {
          _key: 'csm',
          title: 'CSMs',
          href: '/enablement/toolkits/csm',
          activeColor: 'blue',
        },
        {
          _key: 'sc',
          title: 'SCs',
          href: '/enablement/toolkits/success',
          activeColor: 'blue',
        },
        {
          _key: 'marketing',
          title: 'Marketing',
          href: '/enablement/toolkits/marketing',
          activeColor: 'blue',
        },
        {
          _key: 'bdrs',
          title: 'BDRs',
          href: '/enablement/toolkits/bdrs',
          activeColor: 'blue',
        },
        {
          _key: 'implementation',
          title: 'Implementation',
          href: '/enablement/toolkits/implementation',
          activeColor: 'blue',
        },
      ],
    },
    {
      _type: 'navigationItem',
      _key: 'content',
      title: 'Content',
      icon: '📚',
      defaultExpanded: false,
      activeColor: 'blue',
      children: [
        {
          _key: 'templates',
          title: 'Templates',
          href: '/resources/templates',
          activeColor: 'blue',
        },
        {
          _key: 'content-hub',
          title: 'Content Hub',
          href: '/resources/content',
          activeColor: 'blue',
        },
        {
          _key: 'competitive',
          title: 'Competitive',
          href: '/enablement/competitive',
          activeColor: 'blue',
        },
        {
          _key: 'playbooks',
          title: 'Playbooks',
          href: '/enablement/playbooks',
          activeColor: 'blue',
        },
      ],
    },
  ],
};

async function updateNavigation() {
  try {
    console.log('🔄 Updating navigation with correct URLs...\n');

    const result = await client.createOrReplace(updatedNavigationData);

    console.log('✅ Navigation updated successfully!');
    console.log('📋 Updated navigation with correct URLs:');
    console.log('   - CoE Hub: /coe');
    console.log('   - BVA Tools: /coe/bva');
    console.log('   - Demo: /enablement/demo');
    console.log('   - Training Hub: /enablement/training');
    console.log('   - e-Learning Hub: /enablement/e-learning');
    console.log('   - All Products: /product/*');
    console.log('   - All Role Kits: /enablement/toolkits/*');
    console.log('   - Templates: /resources/templates');
    console.log('   - Content Hub: /resources/content');
    console.log('   - Competitive: /enablement/competitive');
    console.log('   - Playbooks: /enablement/playbooks');

  } catch (error: any) {
    console.error('❌ Error updating navigation:', error.message);
    console.log('\n⚠️  Due to API token permissions, you need to update manually in Sanity Studio:');
    console.log('1. Go to https://gladly-gtm-hub.vercel.app/studio');
    console.log('2. Click 🧭 Navigation');
    console.log('3. Update the URLs as shown above');
    console.log('4. Click Publish');
    process.exit(1);
  }
}

updateNavigation();
