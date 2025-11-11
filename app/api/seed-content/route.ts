import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/sanity-admin';

export async function GET() {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: 'Missing SANITY_API_TOKEN in environment variables' },
        { status: 500 }
      );
    }

    const contentResources = [
      // Product Presentations
      {
        _type: 'contentResource',
        title: 'Sidekick Overview Deck',
        description: 'Comprehensive presentation on all Sidekick capabilities',
        category: 'presentations',
        type: 'deck',
        icon: '🤖',
        metadata: '32 slides • Updated Oct 2024',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Hero Platform Deck',
        description: 'Agent workspace and platform capabilities',
        category: 'presentations',
        type: 'deck',
        icon: '🦸',
        metadata: '28 slides • Updated Sep 2024',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Customer AI Deep Dive',
        description: 'Intelligence layer powering all products',
        category: 'presentations',
        type: 'deck',
        icon: '🧠',
        metadata: '24 slides • Updated Oct 2024',
        link: '#',
        compact: false,
      },

      // One-Pagers
      {
        _type: 'contentResource',
        title: 'Sidekick Standalone',
        description: '1-page overview',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },
      {
        _type: 'contentResource',
        title: 'Sidekick Sales',
        description: '1-page overview',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },
      {
        _type: 'contentResource',
        title: 'Sidekick Voice',
        description: '1-page overview',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },
      {
        _type: 'contentResource',
        title: 'Sidekick Email',
        description: '1-page overview',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },
      {
        _type: 'contentResource',
        title: 'Hero Platform',
        description: '1-page overview',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },
      {
        _type: 'contentResource',
        title: 'Platform Overview',
        description: 'Complete solution',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },
      {
        _type: 'contentResource',
        title: 'Outcomes Velocity',
        description: 'Philosophy overview',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },
      {
        _type: 'contentResource',
        title: 'AI Comparison',
        description: 'Resolution vs containment',
        category: 'one-pagers',
        type: 'one-pager',
        icon: '📄',
        metadata: 'PDF • 1 page',
        link: '#',
        compact: true,
      },

      // Industry Materials
      {
        _type: 'contentResource',
        title: 'Retail & E-commerce',
        description: 'Industry deck with retail use cases and customer stories',
        category: 'industry',
        type: 'deck',
        icon: '🛍️',
        metadata: '20 slides • Updated Oct 2024',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Beauty & Personal Care',
        description: 'Vertical-specific positioning and case studies',
        category: 'industry',
        type: 'deck',
        icon: '💄',
        metadata: '18 slides • Updated Sep 2024',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Travel & Hospitality',
        description: 'Industry challenges and Gladly solutions',
        category: 'industry',
        type: 'deck',
        icon: '✈️',
        metadata: '22 slides • Updated Aug 2024',
        link: '#',
        compact: false,
      },

      // Case Studies
      {
        _type: 'contentResource',
        title: 'Leading Beauty Brand: 87% AI Resolution Rate',
        description: 'How a top beauty retailer achieved industry-leading resolution rates with Sidekick',
        category: 'case-studies',
        type: 'document',
        icon: '⭐',
        metadata: 'Case Study • PDF',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Outdoor Retailer: 40% Reduction in Handle Time',
        description: 'Efficiency gains through Sidekick Answers and Agent Assist',
        category: 'case-studies',
        type: 'document',
        icon: '🏔️',
        metadata: 'Case Study • PDF',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Fashion E-commerce: $2M Cost Savings',
        description: 'ROI analysis from implementing full Gladly platform',
        category: 'case-studies',
        type: 'document',
        icon: '👗',
        metadata: 'Case Study • PDF',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Travel Company: 95% CSAT with AI',
        description: 'Maintaining high satisfaction while scaling with automation',
        category: 'case-studies',
        type: 'document',
        icon: '🌍',
        metadata: 'Case Study • PDF',
        link: '#',
        compact: false,
      },

      // Marketing Collateral
      {
        _type: 'contentResource',
        title: 'Brand Guidelines',
        description: 'Logos, colors, typography, and usage guidelines',
        category: 'marketing',
        type: 'document',
        icon: '🎨',
        metadata: 'PDF • 45 pages',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Email Templates',
        description: 'Branded email templates for campaigns',
        category: 'marketing',
        type: 'document',
        icon: '📧',
        metadata: 'Templates',
        link: '#',
        compact: false,
      },
      {
        _type: 'contentResource',
        title: 'Social Media Assets',
        description: 'LinkedIn, Twitter, and social sharing content',
        category: 'marketing',
        type: 'document',
        icon: '💬',
        metadata: 'Asset Pack',
        link: '#',
        compact: false,
      },
    ];

    // Create all content resources
    const results = [];
    for (let i = 0; i < contentResources.length; i++) {
      const resource = {
        _id: `content-${i + 1}`,
        ...contentResources[i],
      };
      const result = await adminClient.createOrReplace(resource);
      results.push(result._id);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} content resources!`,
      content: results,
    });
  } catch (error: any) {
    console.error('Error seeding content:', error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 }
    );
  }
}
