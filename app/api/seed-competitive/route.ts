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

    const competitiveResources = [
      // Zendesk Resources
      {
        _type: 'competitiveResource',
        title: 'Zendesk Battle Card',
        description: 'Key differentiators: Radically personal vs. ticket-based, single conversation thread vs. fragmented tickets, AI resolution vs. AI containment, built-in voice vs. add-on',
        competitor: 'zendesk',
        resourceType: 'battlecard',
        icon: '⚔️',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Zendesk Feature Comparison',
        description: 'Side-by-side feature comparison matrix with Zendesk',
        competitor: 'zendesk',
        resourceType: 'comparison',
        icon: '📊',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Zendesk Positioning Guide',
        description: 'How to position Gladly against Zendesk in competitive situations',
        competitor: 'zendesk',
        resourceType: 'positioning',
        icon: '🎯',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },

      // Salesforce Resources
      {
        _type: 'competitiveResource',
        title: 'Salesforce Service Cloud Battle Card',
        description: 'Key differentiators: Purpose-built for service vs. sales-first CRM, modern UI vs. complex Lightning, Outcomes Velocity vs. Einstein metrics, faster implementation (weeks vs. months)',
        competitor: 'salesforce',
        resourceType: 'battlecard',
        icon: '⚔️',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Salesforce Feature Comparison',
        description: 'Detailed comparison of Gladly vs. Salesforce Service Cloud',
        competitor: 'salesforce',
        resourceType: 'comparison',
        icon: '📊',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Salesforce Positioning Guide',
        description: 'Strategic positioning against Salesforce Service Cloud',
        competitor: 'salesforce',
        resourceType: 'positioning',
        icon: '🎯',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },

      // Kustomer Resources
      {
        _type: 'competitiveResource',
        title: 'Kustomer Battle Card',
        description: 'Key differentiators: People-first vs. timeline-first UI, native voice vs. third-party integration, proven enterprise scale, superior onboarding experience',
        competitor: 'other',
        resourceType: 'battlecard',
        icon: '⚔️',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Kustomer Comparison',
        description: 'Feature and capability comparison with Kustomer',
        competitor: 'other',
        resourceType: 'comparison',
        icon: '📊',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },

      // Intercom Resources
      {
        _type: 'competitiveResource',
        title: 'Intercom Battle Card',
        description: 'Key differentiators: Omnichannel vs. chat-first, voice support included, enterprise-ready vs. SMB focus, unified agent experience',
        competitor: 'intercom',
        resourceType: 'battlecard',
        icon: '⚔️',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Intercom Positioning Guide',
        description: 'How to position against Intercom in enterprise deals',
        competitor: 'intercom',
        resourceType: 'positioning',
        icon: '🎯',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },

      // Freshdesk Resources
      {
        _type: 'competitiveResource',
        title: 'Freshdesk Battle Card',
        description: 'Key differentiators: Conversation-focused vs. ticket-based, superior AI capabilities, better customer context, modern intuitive interface',
        competitor: 'freshdesk',
        resourceType: 'battlecard',
        icon: '⚔️',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Freshdesk Feature Comparison',
        description: 'Comprehensive feature comparison with Freshdesk',
        competitor: 'freshdesk',
        resourceType: 'comparison',
        icon: '📊',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },

      // Genesys Resources
      {
        _type: 'competitiveResource',
        title: 'Genesys Cloud Battle Card',
        description: 'Key differentiators: Modern cloud-native vs. legacy platform, simpler pricing model, better agent experience, faster time to value',
        competitor: 'genesys',
        resourceType: 'battlecard',
        icon: '⚔️',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Genesys Positioning Guide',
        description: 'Strategic positioning against Genesys Cloud',
        competitor: 'genesys',
        resourceType: 'positioning',
        icon: '🎯',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },

      // General Resources
      {
        _type: 'competitiveResource',
        title: 'Win/Loss Analysis Report',
        description: 'Insights from competitive deals won and lost across all competitors',
        competitor: 'all',
        resourceType: 'winloss',
        icon: '📈',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Competitive Playbook',
        description: 'Step-by-step strategies for displacing competitors',
        competitor: 'all',
        resourceType: 'positioning',
        icon: '📚',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Common Objection Handling',
        description: 'Responses to common competitive objections across all platforms',
        competitor: 'all',
        resourceType: 'objections',
        icon: '💡',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
      },
      {
        _type: 'competitiveResource',
        title: 'Migration Success Stories',
        description: 'Customer success stories from competitor switches',
        competitor: 'all',
        resourceType: 'winloss',
        icon: '🎉',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
      },
    ];

    // Create all competitive resources
    const results = [];
    for (let i = 0; i < competitiveResources.length; i++) {
      const resource = {
        _id: `competitive-${i + 1}`,
        ...competitiveResources[i],
      };
      const result = await adminClient.createOrReplace(resource);
      results.push(result._id);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} competitive resources!`,
      competitive: results,
    });
  } catch (error: any) {
    console.error('Error seeding competitive resources:', error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 }
    );
  }
}
