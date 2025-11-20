import { client } from '../lib/sanity';

const coeHubData = {
  _type: 'hubPage',
  _id: 'coe-hub',
  title: 'Center of Excellence Hub',
  slug: {
    _type: 'slug',
    current: 'coe-hub',
  },
  hero: {
    icon: '⭐',
    title: 'Center of Excellence',
    subtitle: 'Where customer wins become repeatable success. Discover proven strategies, benchmark performance, and accelerate AI adoption.',
    backgroundColor: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706]',
  },
  buttons: [
    // OVERVIEW BUTTON
    {
      id: 'overview',
      label: 'Overview',
      icon: '⭐',
      color: 'bg-[#F59E0B]',
      catalogFilter: {
        coeCategory: [],
      },
      sections: [
        // CoE Assistant Section
        {
          _type: 'hubContentSection',
          _key: 'coe-assistant',
          sectionId: 'coe-assistant',
          title: 'Meet Your CoE Assistant',
          background: 'custom',
          customClassName: 'bg-gradient-to-r from-purple-600 to-purple-500 text-white',
          contentType: 'custom',
          cta: {
            text: 'Access CoE Assistant →',
            link: 'https://gemini.google.com/gem/1Ni5NH8lMDJ7v_FCN6DdLo2irtn56cLJW?usp=sharing',
            style: 'white',
          },
        },
        // Stats Section
        {
          _type: 'hubStatGridSection',
          _key: 'coe-stats',
          title: 'CoE at a Glance',
          description: 'Impact across our organization',
          columns: 4,
          transparent: true,
          stats: [
            {
              _key: 'stat-1',
              value: '150+',
              label: 'Success Stories',
              icon: '🏆',
              color: 'border-yellow-500',
            },
            {
              _key: 'stat-2',
              value: '89.9%',
              label: 'Highest FCR Achieved',
              icon: '📊',
              color: 'border-orange-500',
            },
            {
              _key: 'stat-3',
              value: '200+',
              label: 'Resources Available',
              icon: '📚',
              color: 'border-amber-500',
            },
            {
              _key: 'stat-4',
              value: '40%',
              label: 'Higher Win Rate with BVA',
              icon: '💰',
              color: 'border-yellow-600',
            },
          ],
        },
        // How CoE Works Section
        {
          _type: 'hubProcessStepsSection',
          _key: 'how-it-works',
          title: 'How CoE Works',
          description: 'Our systematic approach to capturing and distributing success',
          variant: 'default',
          columns: 3,
          transparent: true,
          steps: [
            {
              _key: 'step-1',
              icon: '🔍',
              title: '1. Discover & Identify',
              description: 'We continuously monitor customer implementations, identify breakthrough wins, and document innovative solutions that deliver exceptional results.',
            },
            {
              _key: 'step-2',
              icon: '💡',
              title: '2. Extract Insights',
              description: "Through data analysis and customer interviews, we extract the specific actions, configurations, and strategies that made the difference. We identify what's repeatable.",
            },
            {
              _key: 'step-3',
              icon: '📦',
              title: '3. Package & Publish',
              description: 'We transform insights into actionable guides, playbooks, and best practices. Every resource is tested, approved for use, and made instantly accessible to the entire team.',
            },
          ],
        },
      ],
    },
    // BVA BUTTON
    {
      id: 'bva',
      label: 'BVA',
      icon: '💰',
      color: 'bg-yellow-600',
      catalogFilter: {
        coeCategory: ['bva'],
      },
      sections: [
        // BVA Overview Section
        {
          _type: 'hubContentSection',
          _key: 'bva-overview',
          title: 'Business Value Analysis Playbook',
          description: 'Quantify the impact of Gladly Sidekick. Build compelling business cases that win deals and prove ROI.',
          background: 'white',
          contentType: 'custom',
          transparent: true,
        },
        // BVA Levels Section
        {
          _type: 'hubFeatureCardsSection',
          _key: 'bva-levels',
          title: 'Choose Your BVA Level',
          description: 'Match your analysis to your available prospect data',
          columns: 3,
          transparent: true,
          cards: [
            {
              _key: 'bva-101',
              title: '101 - Quick Estimate',
              description: 'Total volume + one CPC',
              meta: '⏱️ 15 min | 📊 Minimal data',
            },
            {
              _key: 'bva-201',
              title: '201 - Channel Analysis',
              description: 'Volume by channel + CPC + handle times',
              meta: '⏱️ 30-45 min | 📊 Moderate data',
            },
            {
              _key: 'bva-301',
              title: '301 - Full ROI Model',
              description: 'All 201 + agent costs + revenue + 3-year projections',
              meta: '⏱️ 1-2 hours | 📊 Detailed data',
            },
          ],
        },
      ],
    },
    // PROOF POINTS BUTTON
    {
      id: 'proof-points',
      label: 'Proof Points',
      icon: '🏆',
      color: 'bg-orange-600',
      catalogFilter: {
        coeCategory: ['proof-points'],
      },
      sections: [
        // Quick Access Cards
        {
          _type: 'hubFeatureCardsSection',
          _key: 'proof-points-quick-access',
          columns: 2,
          transparent: true,
          cards: [
            {
              _key: 'proof-point-repo',
              icon: '🏆',
              title: 'Proof Point Repository',
              description: 'Customer proof points: only use externally approved stats for written or verbal use! All proof points are tagged with permission status.',
              cta: 'Access Repository →',
              link: 'https://docs.google.com/spreadsheets/d/1Y0n1rVskWIzWcegwCbfP7YUXkjV58TFf5S7LLxMkFNA/edit?gid=1725734072#gid=1725734072',
            },
            {
              _key: 'social-proof-templates',
              icon: '💬',
              title: 'Social Proof Templates',
              description: 'Customer stories and testimonials formatted for different use cases: presentations, proposals, case studies, and website content.',
              cta: 'View Templates →',
              link: 'https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit?usp=drive_open&ouid=102926403603073320356',
            },
          ],
        },
        // Latest Customer Wins
        {
          _type: 'hubFeatureCardsSection',
          _key: 'latest-wins',
          title: 'Latest Customer Wins',
          description: 'Recent success stories and breakthrough results',
          columns: 3,
          transparent: true,
          cards: [
            {
              _key: 'win-1',
              icon: '📊',
              title: '89.9% FCR',
              description: 'Leading outdoor retailer achieves industry-best First Contact Resolution with Sidekick Guides',
              meta: 'Key to Success: 3-5 days onboarding cadence with stakeholder role clarity',
              cta: 'Read More →',
            },
            {
              _key: 'win-2',
              icon: '📈',
              title: '28% → 57%',
              description: "Leading beauty retailer's AI adoption journey from skeptical to market-leading engagement",
              meta: 'Key to Success: Phased rollout with continuous A/B testing',
              cta: 'Read More →',
            },
            {
              _key: 'win-3',
              icon: '💬',
              title: '77% Email Automation',
              description: 'Fully-featured automation in less than 6 weeks from Sidekick Email pilot launch',
              meta: 'Key to Success: Smart consolidation of 6 tech stack tools',
              cta: 'Read More →',
            },
          ],
        },
      ],
    },
    // RESOURCES BUTTON
    {
      id: 'resources',
      label: 'Resources',
      icon: '📚',
      color: 'bg-amber-600',
      catalogFilter: {
        coeCategory: ['templates', 'best-practices'],
      },
      sections: [
        // Resource Library (keep white background for emphasis)
        {
          _type: 'hubFeatureCardsSection',
          _key: 'resource-library',
          title: 'CoE Resource Library',
          description: 'Proven templates, guides, and playbooks organized for your needs',
          columns: 3,
          showTabs: true,
          tabs: ['All Resources', 'Best Practices', 'Dashboards', 'Implementation', 'Troubleshooting', 'Templates', 'Chat Optimization'],
          transparent: false,
          cards: [
            {
              _key: 'resource-1',
              title: 'Chat Optimization Mastery',
              description: "Complete guide to achieving 90% FCR in chat based on Ulta's journey and proven strategies from high-performing customers.",
              tag: 'Chat Optimization',
              meta: 'Path to 90% FCR',
              cta: 'View Guide →',
              link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.x15qpd8k7ww0',
            },
            {
              _key: 'resource-2',
              title: 'Email Channel Excellence',
              description: 'Thread management, WISMO integration, and optimization strategies that drive exceptional email performance.',
              tag: 'Best Practices',
              meta: 'Launch to 70%+ FCR',
              cta: 'View Guide →',
            },
            {
              _key: 'resource-3',
              title: 'Real CX Metrics Framework',
              description: 'Measuring customer experience effectively with metrics that actually matter to business outcomes.',
              tag: 'Best Practices',
              meta: 'What to measure',
              cta: 'View Framework →',
            },
            {
              _key: 'resource-4',
              icon: '🚀',
              title: 'Rapid Value Realization Guide',
              description: 'Customer success patterns showing how top performers achieve 30%+ resolution in first 30 days. Includes timelines, benchmarks, and proven strategies.',
              tag: 'Implementation',
              meta: '15 min read',
              cta: 'View Guide →',
              link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.hou5gyam9uco',
            },
            {
              _key: 'resource-5',
              icon: '📈',
              title: 'Daily Optimization Patterns',
              description: 'How top performers sustain 70-90% resolution through consistent daily investment. Actual routines from Ulta (89.9% FCR), La Jolla Group (57%), and more.',
              tag: 'Best Practices',
              meta: '12 min read',
              cta: 'View Guide →',
              link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.t4y35o22uw75',
            },
            {
              _key: 'resource-6',
              title: 'Cross-Org Guides Dashboard',
              description: 'Cross-organizational view of Guides performance across multiple teams and implementations for benchmarking and insights.',
              tag: 'Dashboards',
              cta: 'View Dashboard →',
              link: 'https://gladly.looker.com/dashboards/4218',
            },
            {
              _key: 'resource-7',
              icon: '📋',
              title: 'QBR Template',
              description: 'Quarterly business review structure for customer success conversations including performance analysis, optimization opportunities, and expansion planning.',
              tag: 'Templates',
              cta: 'Download Template →',
            },
            {
              _key: 'resource-8',
              icon: '📊',
              title: 'Performance Review Framework',
              description: 'Weekly and monthly performance review structure with key metrics, diagnostic questions, and action planning template.',
              tag: 'Templates',
              cta: 'Download Template →',
            },
          ],
        },
      ],
    },
  ],
  showCatalog: true,
  catalogTitle: 'Browse All Resources',
  seo: {
    metaTitle: 'Center of Excellence Hub | Gladly GTM Enablement',
    metaDescription: 'Access proven strategies, best practices, and resources from the Gladly Center of Excellence. Learn from top-performing customers and accelerate your success.',
  },
};

async function seedCOEHub() {
  try {
    console.log('🌱 Seeding COE Hub data...');

    const result = await client.createOrReplace(coeHubData);

    console.log('✅ COE Hub data seeded successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('\n🎉 Your COE Hub is now CMS-driven!');
    console.log('🌐 Visit http://localhost:3000/coe-hub to see it live');
    console.log('✏️  Visit http://localhost:3000/studio to edit the content');
    console.log('\n📊 Hub Structure:');
    console.log('   - 4 Buttons: Overview, BVA, Proof Points, Resources');
    console.log('   - 8 Content Sections across all buttons');
    console.log('   - All existing content preserved');
  } catch (error) {
    console.error('❌ Error seeding COE Hub:', error);
    process.exit(1);
  }
}

seedCOEHub();
