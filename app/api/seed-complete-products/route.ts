import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/sanity-admin';

export async function POST() {
  try {
    const products = [
      {
        _type: 'page',
        _id: 'page-product-sidekick-standalone',
        title: 'Sidekick Standalone',
        slug: { _type: 'slug', current: 'sidekick-standalone' },
        quickNav: [
          { label: 'Overview', anchor: 'overview' },
          { label: 'Platforms', anchor: 'platforms' },
          { label: 'Use Cases', anchor: 'use-cases' },
          { label: 'Content', anchor: 'content' },
          { label: 'Demos', anchor: 'demos' },
          { label: 'Competitive', anchor: 'competitive' },
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero',
            badge: 'SIDEKICK STANDALONE',
            heading: 'AI That Works With Your Helpdesk',
            subheading: 'Integrate Sidekick AI with Zendesk, Salesforce, Kustomer, or any existing platform to automate customer support',
            layout: '2-column',
            videoMediaId: 'mwar81dg26',
            videoAspectRatio: 1.7777777777777777,
            primaryCtaText: 'Learn More',
            primaryCtaLink: '#overview',
            secondaryCtaText: 'View Demos',
            secondaryCtaLink: '#demos',
            backgroundColor: 'green',
          },
          // Overview Section (Black with Launch Status)
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'overview',
            sectionTitle: 'What is Sidekick Standalone?',
            backgroundColor: 'dark',
            includeLaunchStatus: true,
            launchStatus: {
              heading: '🚀 Launch Status',
              statusItems: [
                { label: 'Initial research', isActive: false },
                { label: 'Added to roadmap', isActive: false },
                { label: 'Discovery and design', isActive: false },
                { label: 'Build in progress', isActive: false },
                { label: '➡️ Prototyping ⬅️', isActive: true },
                { label: 'Limited rollout', isActive: false },
                { label: 'Broader rollout', isActive: false },
                { label: 'Open Access', isActive: false },
              ],
              description: 'Working version available internally. Early demos and testing happening with trusted customers.',
            },
            content: [
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Sidekick Standalone is an AI agent that integrates with your existing helpdesk platform to automate customer support inquiries. It works alongside your current setup—whether you use Zendesk, Salesforce Service Cloud, Kustomer, or another platform.',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Unlike other AI solutions that require you to replace your entire tech stack, Sidekick Standalone plugs into what you already have and starts resolving customer inquiries on day one.',
                  },
                ],
              },
            ],
          },
          // Platforms Section
          {
            _type: 'featureGridSection',
            _key: 'platforms',
            anchorId: 'platforms',
            sectionTitle: 'Works With Your Platform',
            backgroundColor: 'gray',
            columns: 3,
            features: [
              {
                icon: '🎫',
                title: 'Zendesk',
                description: 'Native integration with Zendesk Support and Sunshine Conversations',
              },
              {
                icon: '☁️',
                title: 'Salesforce',
                description: 'Works with Service Cloud and Einstein Bots',
              },
              {
                icon: '🔧',
                title: 'Kustomer',
                description: 'Seamless integration with Kustomer CRM',
              },
              {
                icon: '💬',
                title: 'Intercom',
                description: 'Connect Sidekick to Intercom messenger',
              },
              {
                icon: '🌱',
                title: 'Freshdesk',
                description: 'Integration with Freshworks products',
              },
              {
                icon: '🔌',
                title: 'Other Platforms',
                description: 'Custom integrations available via API',
              },
            ],
          },
          // Use Cases Section
          {
            _type: 'contentSection',
            _key: 'use-cases',
            anchorId: 'use-cases',
            sectionTitle: 'Common Use Cases',
            backgroundColor: 'white',
            content: [
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    marks: ['strong'],
                    text: 'Where is My Order (WISMO)',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Automate order status inquiries with real-time tracking updates',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    marks: ['strong'],
                    text: 'Returns & Exchanges',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Handle return requests, generate labels, and process exchanges',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    marks: ['strong'],
                    text: 'Account Management',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Password resets, profile updates, subscription changes',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    marks: ['strong'],
                    text: 'Product Recommendations',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Suggest products based on customer history and preferences',
                  },
                ],
              },
            ],
          },
          // Content Section
          {
            _type: 'featureGridSection',
            _key: 'content',
            anchorId: 'content',
            sectionTitle: 'Content & Resources',
            backgroundColor: 'gray',
            columns: 3,
            features: [
              {
                icon: '📄',
                title: 'Standalone One-Pager',
                description: 'Quick overview of features and benefits',
                link: '#',
              },
              {
                icon: '📊',
                title: 'Intro Deck',
                description: 'Comprehensive presentation for customers',
                link: '#',
              },
              {
                icon: '📈',
                title: 'ROI Calculator',
                description: 'Calculate cost savings and efficiency gains',
                link: '#',
              },
              {
                icon: '📝',
                title: 'Implementation Guide',
                description: 'Step-by-step setup instructions',
                link: '#',
              },
              {
                icon: '🎯',
                title: 'Use Case Library',
                description: 'Real-world examples and templates',
                link: '#',
              },
              {
                icon: '📚',
                title: 'FAQ Document',
                description: 'Common questions and answers',
                link: '#',
              },
            ],
          },
          // Demos Section
          {
            _type: 'featureGridSection',
            _key: 'demos',
            anchorId: 'demos',
            sectionTitle: 'Demo Materials',
            backgroundColor: 'white',
            columns: 2,
            features: [
              {
                icon: '🖥️',
                title: 'Demo Environment',
                description: 'Live sandbox for testing Sidekick capabilities',
                link: '#',
              },
              {
                icon: '📹',
                title: 'Video Library',
                description: 'Product demos and customer testimonials',
                link: '#',
              },
              {
                icon: '📋',
                title: 'Demo Scripts',
                description: 'Guided walkthrough for sales presentations',
                link: '#',
              },
              {
                icon: '🎨',
                title: 'Mockups & Screenshots',
                description: 'Visual assets for presentations',
                link: '#',
              },
            ],
          },
          // Competitive Section
          {
            _type: 'contentSection',
            _key: 'competitive',
            anchorId: 'competitive',
            sectionTitle: 'Competitive Intelligence',
            backgroundColor: 'gray',
            content: [
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    marks: ['strong'],
                    text: 'Key Differentiators',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: '✓ Platform agnostic - works with any helpdesk',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: '✓ No platform migration required',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: '✓ Built on Gladly Customer AI foundation',
                  },
                ],
              },
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: '✓ Seamless handoff to human agents',
                  },
                ],
              },
            ],
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta',
            heading: 'Need Help With Sidekick Standalone?',
            description: "Can't find what you're looking for? Reach out to the enablement team",
            primaryCtaText: 'Ask in #enablement-resources',
            primaryCtaLink: '#',
            secondaryCtaText: 'Browse All Products',
            secondaryCtaLink: '/',
            backgroundColor: 'purple',
          },
        ],
      },
    ];

    const results = [];
    for (const product of products) {
      const result = await adminClient.createOrReplace(product);
      results.push(result._id);
      console.log(`Created/updated: ${product.title}`);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} complete product page(s)`,
      ids: results
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
