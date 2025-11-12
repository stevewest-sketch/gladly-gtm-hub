export const salesToolkitData = {
  hero: {
    title: 'Sales Toolkit',
    subtitle: 'Everything you need to sell, demo, and close deals with Gladly',
    gradient: 'purple' as const,
  },

  banner: {
    badge: '🚨 COMPETITIVE DEFENSE',
    title: 'Defend Against Sierra & Decagon Targeting Your Accounts',
    description: 'Get the multithreading enablement, defense playbook, and technical buyer deck you need to protect deals and engage CTOs/CIOs',
    buttonText: 'Access Defense Materials →',
    buttonLink: '/personas/cto-cio',
  },

  primaryActions: [
    { icon: '🎬', title: 'Prepare for Demo', desc: 'Get demo decks, environment guides, and scripts for your prospect' },
    { icon: '⚔️', title: 'Handle Competitor', desc: 'Battle cards, positioning, and responses for competitive situations' },
    { icon: '💰', title: 'Build Business Case', desc: 'ROI calculators, value frameworks, and customer proof points' },
    { icon: '📋', title: 'Run Sales Play', desc: 'Step-by-step playbooks for common sales scenarios' },
    { icon: '📞', title: 'Prep Discovery Call', desc: 'Question frameworks and qualification guides' },
    { icon: '🎓', title: 'Get Certified', desc: 'Training courses and certification programs' }
  ],

  quickLinks: [
    { icon: '🆕', title: "What's New" },
    { icon: '⭐', title: 'Most Popular' },
    { icon: '❤️', title: 'My Favorites' },
    { icon: '🗺️', title: 'Product Roadmap' }
  ],

  browseCategories: [
    {
      icon: '📊',
      title: 'By Sales Stage',
      links: [
        'Prospecting & Outreach',
        'Discovery & Qualification',
        'Demo & Presentation',
        'Proof of Value',
        'Negotiation & Close'
      ]
    },
    {
      icon: '📱',
      title: 'By Product',
      links: [
        'Sidekick Standalone',
        'Sidekick Sales',
        'Sidekick Voice',
        'Sidekick Email',
        'Full Platform (Hero + Sidekick)'
      ]
    },
    {
      icon: '📄',
      title: 'By Content Type',
      links: [
        'Battle Cards',
        'Demo Decks & Guides',
        'One-Pagers',
        'Playbooks',
        'Customer Stories'
      ]
    },
    {
      icon: '🏢',
      title: 'By Industry',
      links: [
        'Retail & E-commerce',
        'Beauty & Personal Care',
        'Travel & Hospitality',
        'Financial Services',
        'Healthcare'
      ]
    }
  ],
};
