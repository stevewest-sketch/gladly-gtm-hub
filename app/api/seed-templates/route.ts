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

    const templates = [
      // Brand Guidelines
      {
        _type: 'templateResource',
        title: 'Gladly Brand Guidelines Deck',
        description: 'Complete brand style guide including logos, colors, typography, imagery guidelines, and best practices for creating on-brand materials',
        category: 'brand',
        slideCount: '45 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: true,
      },
      {
        _type: 'templateResource',
        title: 'Logo Assets',
        description: 'All logo variations and usage guidelines',
        category: 'brand',
        slideCount: '',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Color Palette',
        description: 'Official color codes and application examples',
        category: 'brand',
        slideCount: '',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },

      // Pitch Decks
      {
        _type: 'templateResource',
        title: 'First Meeting Pitch Deck',
        description: 'Comprehensive first meeting template covering company overview, product capabilities, customer success stories, and next steps',
        category: 'pitch',
        slideCount: '32 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: true,
      },
      {
        _type: 'templateResource',
        title: 'Specialized Team Pitch',
        description: 'Pitch template for specialized team conversations',
        category: 'pitch',
        slideCount: '28 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Custom Template w/o Hero',
        description: 'Customizable deck template without Hero content',
        category: 'pitch',
        slideCount: '25 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Buyer Persona Pitch',
        description: 'Persona-specific pitch deck template',
        category: 'pitch',
        slideCount: '30 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'First Day Experience',
        description: 'Day 1 pitch template',
        category: 'pitch',
        slideCount: '22 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Pitch (no team section)',
        description: 'Streamlined pitch deck',
        category: 'pitch',
        slideCount: '26 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },

      // Product Decks
      {
        _type: 'templateResource',
        title: 'Sidekick for Enterprise',
        description: 'Enterprise-focused Sidekick presentation covering advanced features, security, scalability, and integration capabilities',
        category: 'product',
        slideCount: '38 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: true,
      },
      {
        _type: 'templateResource',
        title: 'Product Storytelling Deck',
        description: 'Narrative-driven product presentation',
        category: 'product',
        slideCount: '32 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Zendesk Alternative',
        description: 'Competitive positioning against Zendesk',
        category: 'product',
        slideCount: '35 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Deep Dive Roadmap Kit',
        description: 'Roadmap presentation template',
        category: 'product',
        slideCount: '28 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },

      // Security + RFX
      {
        _type: 'templateResource',
        title: 'Architecture, Security, and SOC 2',
        description: 'Comprehensive security presentation covering system architecture, security controls, compliance certifications, and data protection',
        category: 'security',
        slideCount: '42 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: true,
      },
      {
        _type: 'templateResource',
        title: 'RFP Response Template',
        description: 'Standard template for responding to RFPs',
        category: 'security',
        slideCount: '',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'RFI Response Template',
        description: 'Standard template for responding to RFIs',
        category: 'security',
        slideCount: '',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'VSA Response Template',
        description: 'Vendor security assessment template',
        category: 'security',
        slideCount: '',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },

      // Implementation
      {
        _type: 'templateResource',
        title: 'Customer Onboarding Kickoff',
        description: 'Complete kickoff presentation covering implementation timeline, milestones, team introductions, and success criteria',
        category: 'implementation',
        slideCount: '28 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: true,
      },
      {
        _type: 'templateResource',
        title: '90 Day Implementation',
        description: 'Phased implementation roadmap template',
        category: 'implementation',
        slideCount: '24 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'QBR Deck Template',
        description: 'Quarterly business review presentation',
        category: 'implementation',
        slideCount: '18 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Success Renewal Deck',
        description: 'Renewal conversation template',
        category: 'implementation',
        slideCount: '22 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },

      // Feature Slides
      {
        _type: 'templateResource',
        title: 'Auto Translate Feature Slides',
        description: 'Slides showcasing automatic translation capabilities',
        category: 'features',
        slideCount: '8 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'E-Escalate Widget',
        description: 'Feature slides for escalation widget',
        category: 'features',
        slideCount: '6 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Assisted Auth Slides',
        description: 'Authentication feature presentation',
        category: 'features',
        slideCount: '7 slides',
        lastUpdated: 'Updated Sep 2024',
        link: '#',
        featured: false,
      },
      {
        _type: 'templateResource',
        title: 'Product Storytelling Slides',
        description: 'Narrative feature presentations',
        category: 'features',
        slideCount: '10 slides',
        lastUpdated: 'Updated Oct 2024',
        link: '#',
        featured: false,
      },
    ];

    // Create all templates
    const results = [];
    for (let i = 0; i < templates.length; i++) {
      const template = {
        _id: `template-${i + 1}`,
        ...templates[i],
      };
      const result = await adminClient.createOrReplace(template);
      results.push(result._id);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} template resources!`,
      templates: results,
    });
  } catch (error: any) {
    console.error('Error seeding templates:', error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 }
    );
  }
}
