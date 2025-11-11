import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/sanity-admin';

interface LaunchStatus {
  heading: string;
  statusItems: Array<{
    label: string;
    isActive: boolean;
  }>;
  description: string;
}

interface ContentSection {
  _type: 'contentSection';
  _key: string;
  anchorId: string;
  sectionTitle: string;
  content: Array<{
    _type: 'block';
    _key: string;
    style: 'normal';
    children: Array<{
      _type: 'span';
      _key: string;
      text: string;
      marks: string[];
    }>;
    markDefs: any[];
  }>;
  backgroundColor: 'dark' | 'white' | 'gray';
  includeLaunchStatus: boolean;
  launchStatus?: LaunchStatus;
}

interface HeroSection {
  _type: 'heroSection';
  _key: string;
  badge: string;
  heading: string;
  subheading: string;
  layout: '2-column' | 'centered';
  videoMediaId?: string;
  videoAspectRatio?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundColor: 'green';
}

interface QuickNavItem {
  _key: string;
  label: string;
  href: string;
}

const productData = [
  {
    slug: 'sidekick-standalone',
    title: 'Sidekick Standalone',
    hero: {
      _type: 'heroSection',
      _key: 'hero-1',
      badge: 'SIDEKICK STANDALONE',
      heading: 'AI That Works With Your Helpdesk',
      subheading: 'Integrate Sidekick AI with Zendesk, Salesforce, Kustomer, or any existing platform to automate customer support',
      layout: '2-column',
      videoMediaId: 'mwar81dg26',
      videoAspectRatio: '1.7777777777777777',
      primaryCtaText: 'Learn More',
      primaryCtaLink: '#overview',
      secondaryCtaText: 'View Demos',
      secondaryCtaLink: '#demos',
      backgroundColor: 'green',
    } as HeroSection,
    quickNav: [
      { _key: 'nav-1', label: 'Overview', href: '#overview' },
      { _key: 'nav-2', label: 'Platforms', href: '#platforms' },
      { _key: 'nav-3', label: 'Use Cases', href: '#use-cases' },
      { _key: 'nav-4', label: 'Content', href: '#content' },
      { _key: 'nav-5', label: 'Demos', href: '#demos' },
      { _key: 'nav-6', label: 'Competitive', href: '#competitive' },
    ],
    overview: {
      _type: 'contentSection',
      _key: 'overview-1',
      anchorId: 'overview',
      sectionTitle: 'What is Sidekick Standalone?',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-1',
            text: 'Sidekick Standalone is an AI agent that integrates with your existing helpdesk platform to automate customer support inquiries. It works alongside your current setup—whether you use Zendesk, Salesforce Service Cloud, Kustomer, or another platform.',
            marks: [],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-2',
            text: 'Unlike other AI solutions that require you to replace your entire tech stack, Sidekick Standalone plugs into what you already have and starts resolving customer inquiries on day one.',
            marks: [],
          }],
          markDefs: [],
        },
      ],
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
    } as ContentSection,
  },
  {
    slug: 'sidekick-voice',
    title: 'Sidekick Voice',
    hero: {
      _type: 'heroSection',
      _key: 'hero-2',
      badge: 'SIDEKICK VOICE',
      heading: 'AI-Powered Voice Agent',
      subheading: 'Handle phone calls 24/7 with natural conversation AI that resolves customer inquiries instantly',
      layout: '2-column',
      videoMediaId: '62ev998jm3',
      videoAspectRatio: '1.7843866171003717',
      primaryCtaText: 'Learn More',
      primaryCtaLink: '#overview',
      secondaryCtaText: 'Hear Examples',
      secondaryCtaLink: '#demos',
      backgroundColor: 'green',
    } as HeroSection,
    quickNav: [
      { _key: 'nav-1', label: 'Overview', href: '#overview' },
      { _key: 'nav-2', label: 'Capabilities', href: '#capabilities' },
      { _key: 'nav-3', label: 'Use Cases', href: '#use-cases' },
      { _key: 'nav-4', label: 'Content', href: '#content' },
      { _key: 'nav-5', label: 'Demos', href: '#demos' },
      { _key: 'nav-6', label: 'Competitive', href: '#competitive' },
    ],
    overview: {
      _type: 'contentSection',
      _key: 'overview-2',
      anchorId: 'overview',
      sectionTitle: 'What is Sidekick Voice?',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-1',
            text: 'Sidekick Voice is an AI phone agent that handles customer calls with natural, human-like conversation. It understands context, accesses customer data, and resolves inquiries without human intervention.',
            marks: [],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-2',
            text: 'Built on Gladly\'s Customer AI, Sidekick Voice seamlessly integrates with your existing phone system and knowledge base to provide instant, accurate responses 24/7.',
            marks: [],
          }],
          markDefs: [],
        },
      ],
      backgroundColor: 'dark',
      includeLaunchStatus: true,
      launchStatus: {
        heading: '🚀 Launch Status',
        statusItems: [
          { label: 'Initial research', isActive: false },
          { label: 'Added to roadmap', isActive: false },
          { label: 'Discovery and design', isActive: false },
          { label: 'Build in progress', isActive: false },
          { label: 'Prototyping', isActive: false },
          { label: '➡️ Limited rollout ⬅️', isActive: true },
          { label: 'Broader rollout', isActive: false },
          { label: 'Open Access', isActive: false },
        ],
        description: 'Beta available to select customers. Gathering feedback and optimizing performance.',
      },
    } as ContentSection,
  },
  {
    slug: 'sidekick-email',
    title: 'Sidekick Email',
    hero: {
      _type: 'heroSection',
      _key: 'hero-3',
      badge: 'SIDEKICK EMAIL',
      heading: 'Sidekick Email',
      subheading: 'Sidekick Email brings generative AI to email support, resolving issues directly in the inbox through AI-powered contextual responses that feel human and relevant. It works with Guides and integrations to answer questions and take actions.',
      layout: '2-column',
      videoMediaId: '62ev998jm3',
      videoAspectRatio: '1.7843866171003717',
      primaryCtaText: 'Learn More',
      primaryCtaLink: '#what-it-is',
      secondaryCtaText: 'View Resources',
      secondaryCtaLink: '#content',
      backgroundColor: 'green',
    } as HeroSection,
    quickNav: [
      { _key: 'nav-1', label: 'What it is', href: '#what-it-is' },
      { _key: 'nav-2', label: 'Customer Trackers', href: '#customer-trackers' },
      { _key: 'nav-3', label: 'Content', href: '#content' },
      { _key: 'nav-4', label: 'Enablement', href: '#enablement' },
    ],
    overview: {
      _type: 'contentSection',
      _key: 'overview-3',
      anchorId: 'what-it-is',
      sectionTitle: 'What it is',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-1',
            text: 'Sidekick Email brings generative AI to email support, resolving issues directly in the inbox through AI-powered contextual responses that feel human and relevant. It works with Guides and integrations to answer questions and take actions.',
            marks: [],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-2',
            text: 'Why it matters: Email is a top support channel, but emails are often long, unstructured, and difficult to parse, leading to slow responses and backlogs. Sidekick Email provides instant service with quick, accurate responses, reducing backlogs and supporting agents with handoff summaries, improving customer trust and hero productivity.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-3',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-3',
            text: 'Who it\'s for: B2C Businesses that handle high volumes of email support, especially those with simple routing, high first contact resolution rates (FCR), and who are early adopters.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
      ],
      backgroundColor: 'dark',
      includeLaunchStatus: true,
      launchStatus: {
        heading: '🚀 Launch Status',
        statusItems: [
          { label: 'Initial research', isActive: false },
          { label: 'Added to roadmap', isActive: false },
          { label: 'Discovery and design', isActive: false },
          { label: 'Build in progress', isActive: false },
          { label: 'Prototyping', isActive: false },
          { label: '➡️ Limited rollout ⬅️', isActive: true },
          { label: 'Broader rollout', isActive: false },
          { label: 'Open Access', isActive: false },
        ],
        description: 'Sidekick Email is in limited rollout with select customers.',
      },
    } as ContentSection,
  },
  {
    slug: 'sidekick-sales',
    title: 'Sidekick Sales',
    hero: {
      _type: 'heroSection',
      _key: 'hero-4',
      badge: 'SIDEKICK SALES',
      heading: 'AI for Revenue Teams',
      subheading: 'Empower sales and marketing with AI that engages prospects, qualifies leads, and drives revenue',
      layout: '2-column',
      videoMediaId: '85i16s6k7a',
      videoAspectRatio: '1.7777777777777777',
      primaryCtaText: 'Learn More',
      primaryCtaLink: '#overview',
      secondaryCtaText: 'View Demos',
      secondaryCtaLink: '#demos',
      backgroundColor: 'green',
    } as HeroSection,
    quickNav: [
      { _key: 'nav-1', label: 'Overview', href: '#overview' },
      { _key: 'nav-2', label: 'Capabilities', href: '#capabilities' },
      { _key: 'nav-3', label: 'Use Cases', href: '#use-cases' },
      { _key: 'nav-4', label: 'Content', href: '#content' },
      { _key: 'nav-5', label: 'Demos', href: '#demos' },
      { _key: 'nav-6', label: 'Competitive', href: '#competitive' },
    ],
    overview: {
      _type: 'contentSection',
      _key: 'overview-4',
      anchorId: 'overview',
      sectionTitle: 'What is Sidekick Sales?',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-1',
            text: 'Sidekick Sales is AI designed specifically for revenue generation. It engages website visitors, qualifies leads, books meetings, and nurtures prospects through the sales funnel.',
            marks: [],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-2',
            text: 'Unlike traditional chatbots that deflect, Sidekick Sales actively converts visitors into qualified opportunities and drives measurable revenue impact.',
            marks: [],
          }],
          markDefs: [],
        },
      ],
      backgroundColor: 'dark',
      includeLaunchStatus: true,
      launchStatus: {
        heading: '🚀 Launch Status',
        statusItems: [
          { label: 'Initial research', isActive: false },
          { label: 'Added to roadmap', isActive: false },
          { label: '➡️ Discovery and design ⬅️', isActive: true },
          { label: 'Build in progress', isActive: false },
          { label: 'Prototyping', isActive: false },
          { label: 'Limited rollout', isActive: false },
          { label: 'Broader rollout', isActive: false },
          { label: 'Open Access', isActive: false },
        ],
        description: 'Product design phase. Gathering customer feedback on requirements and use cases.',
      },
    } as ContentSection,
  },
  {
    slug: 'customer-ai',
    title: 'Gladly Customer AI',
    hero: {
      _type: 'heroSection',
      _key: 'hero-5',
      badge: 'CUSTOMER AI',
      heading: 'Gladly Customer AI',
      subheading: 'Gladly is Customer AI—the per-user intelligence layer that makes radically efficient, radically personal customer experiences possible, allowing AI to understand customers, predict needs, and teams through AI-powered customer intelligence.',
      layout: 'centered',
      primaryCtaText: 'Learn More',
      primaryCtaLink: '#what-it-is',
      secondaryCtaText: 'View Resources',
      secondaryCtaLink: '#content',
      backgroundColor: 'green',
    } as HeroSection,
    quickNav: [
      { _key: 'nav-1', label: 'What it is', href: '#what-it-is' },
      { _key: 'nav-2', label: 'Quick Links for Sales', href: '#quick-links-sales' },
      { _key: 'nav-3', label: 'Quick Links for CS/AM', href: '#quick-links-csam' },
      { _key: 'nav-4', label: 'Customer AI Videos', href: '#videos' },
      { _key: 'nav-5', label: 'Shareable Content', href: '#shareable' },
      { _key: 'nav-6', label: 'PR', href: '#pr' },
      { _key: 'nav-7', label: 'Enablement', href: '#enablement' },
    ],
    overview: {
      _type: 'contentSection',
      _key: 'overview-5',
      anchorId: 'what-it-is',
      sectionTitle: 'What is Gladly?',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-1',
            text: 'Gladly is Customer AI—a per-user intelligence layer that makes radically efficient, radically personal experiences possible, allowing AI agents and human teams to understand customers, predict needs, and provide a seamless experience. It unifies customer conversations, commerce, AI, and support teams through AI-powered customer intelligence.',
            marks: [],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-2',
            text: 'Why it matters: Most platforms treat customer data as isolated tickets rather than continuous relationships. Gladly\'s Customer AI creates a persistent intelligence layer that powers all interactions, enabling both AI agents and human teams to deliver personalized service at scale with full customer context.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-3',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-3',
            text: 'Who it\'s for: B2C Businesses with high-touch customer relationships, ecommerce platforms, and brands prioritizing customer experience over transactional support.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
      ],
      backgroundColor: 'dark',
      includeLaunchStatus: true,
      launchStatus: {
        heading: '🚀 Launch Status',
        statusItems: [
          { label: 'Initial research', isActive: false },
          { label: 'Added to roadmap', isActive: false },
          { label: 'Discovery and design', isActive: false },
          { label: 'Build in progress', isActive: false },
          { label: 'Prototyping', isActive: false },
          { label: 'Limited rollout', isActive: false },
          { label: 'Broader rollout', isActive: false },
          { label: '➡️ Open Access 🎉 ⬅️', isActive: true },
        ],
        description: 'Customer AI is the foundational intelligence layer powering all Gladly products and is available to all customers.',
      },
    } as ContentSection,
  },
  {
    slug: 'guides-and-journeys',
    title: 'Guides and Journeys',
    hero: {
      _type: 'heroSection',
      _key: 'hero-6',
      badge: 'GUIDES AND JOURNEYS',
      heading: 'Guides and Journeys',
      subheading: 'Sidekick Guides and Journeys simplify AI setup and optimization, giving CX teams full control without technical skills. Guides offers a no-code interface to create and manage AI workflows while Journeys provides insights and analytics to continuously improve AI performance and outcomes.',
      layout: 'centered',
      primaryCtaText: 'Learn More',
      primaryCtaLink: '#what-it-is',
      secondaryCtaText: 'View Resources',
      secondaryCtaLink: '#content',
      backgroundColor: 'green',
    } as HeroSection,
    quickNav: [
      { _key: 'nav-1', label: 'What it is', href: '#what-it-is' },
      { _key: 'nav-2', label: 'Content', href: '#content' },
      { _key: 'nav-3', label: 'Demo', href: '#demo' },
      { _key: 'nav-4', label: 'Enablement', href: '#enablement' },
    ],
    overview: {
      _type: 'contentSection',
      _key: 'overview-6',
      anchorId: 'what-it-is',
      sectionTitle: 'What it is',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-1',
            text: 'Sidekick Guides and Journeys simplify AI setup and optimization, giving CX teams full control without technical skills. Guides offers a no-code interface to create and manage AI workflows while Journeys provides insights and analytics to continuously improve AI performance and outcomes.',
            marks: [],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-2',
            text: 'Why it matters: AI is often hard to manage and optimize without technical help, leading to poor performance and frustrating customer experiences. Guides and Journeys remove complexity, letting CX teams quickly set up, monitor, and refine AI to deliver more effective and personalized support at scale.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-3',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-3',
            text: 'Who it\'s for: B2C Businesses and CX teams managing high volumes of support who need simple tools to configure and improve AI without relying on technical skills or external help.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
      ],
      backgroundColor: 'dark',
      includeLaunchStatus: true,
      launchStatus: {
        heading: '🚀 Launch Status',
        statusItems: [
          { label: 'Initial research', isActive: false },
          { label: 'Added to roadmap', isActive: false },
          { label: 'Discovery and design', isActive: false },
          { label: 'Build in progress', isActive: false },
          { label: 'Prototyping', isActive: false },
          { label: 'Limited rollout', isActive: false },
          { label: '➡️ Broader rollout ⬅️', isActive: true },
          { label: 'Open Access', isActive: false },
        ],
        description: 'Guides and Journeys is in broader rollout and available to most customers.',
      },
    } as ContentSection,
  },
  {
    slug: 'app-platform',
    title: 'App Platform',
    hero: {
      _type: 'heroSection',
      _key: 'hero-7',
      badge: 'APP PLATFORM',
      heading: 'App Platform',
      subheading: 'Gladly\'s App Platform is a low-code integration layer that connects external systems like order management, loyalty, and payment directly to Gladly\'s interface for agents and AI. Teams get faster setup, better service outcomes, and \'lower IT overhead.',
      layout: 'centered',
      primaryCtaText: 'Learn More',
      primaryCtaLink: '#what-it-is',
      secondaryCtaText: 'View Resources',
      secondaryCtaLink: '#content',
      backgroundColor: 'green',
    } as HeroSection,
    quickNav: [
      { _key: 'nav-1', label: 'What it is', href: '#what-it-is' },
      { _key: 'nav-2', label: 'Available Apps', href: '#available-apps' },
      { _key: 'nav-3', label: 'Talk Tracks + Next Steps', href: '#talk-tracks' },
      { _key: 'nav-4', label: 'Content', href: '#content' },
      { _key: 'nav-5', label: 'Demo', href: '#demo' },
      { _key: 'nav-6', label: 'Technical Enablement', href: '#technical-enablement' },
      { _key: 'nav-7', label: 'Revenue Enablement', href: '#revenue-enablement' },
    ],
    overview: {
      _type: 'contentSection',
      _key: 'overview-7',
      anchorId: 'what-it-is',
      sectionTitle: 'What it is',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-1',
            text: 'Gladly\'s App Platform is a low-code integration layer that connects external systems like order management, loyalty, and payment directly to Gladly\'s interface for agents and AI.',
            marks: [],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-2',
            text: 'Why it matters: It eliminates tool-switching, gives agents full contact, and lets AI act on real data—teams get faster setup, better service outcomes, and \'lower IT overhead.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block-3',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span-3',
            text: 'Who it\'s for: For IT and CX teams at ecommerce high-tech customers who rely on multiple systems to support customers and need simple tools to unify data across agents and AI.',
            marks: ['strong'],
          }],
          markDefs: [],
        },
      ],
      backgroundColor: 'dark',
      includeLaunchStatus: true,
      launchStatus: {
        heading: '🚀 Launch Status',
        statusItems: [
          { label: 'Initial research', isActive: false },
          { label: 'Added to roadmap', isActive: false },
          { label: 'Discovery and design', isActive: false },
          { label: 'Build in progress', isActive: false },
          { label: 'Prototyping', isActive: false },
          { label: 'Limited rollout', isActive: false },
          { label: 'Broader rollout', isActive: false },
          { label: '➡️ Open Access 🎉 ⬅️', isActive: true },
        ],
        description: 'App Platform is generally available and accessible to all customers.',
      },
    } as ContentSection,
  },
];

export async function POST() {
  try {
    console.log('Starting comprehensive product seeding...');

    const results = [];

    for (const product of productData) {
      console.log(`\nProcessing ${product.title}...`);

      // Check if page exists
      const existingPages = await adminClient.fetch(
        `*[_type == "page" && slug.current == $slug][0]`,
        { slug: product.slug }
      );

      if (existingPages) {
        console.log(`Page exists for ${product.slug}, updating...`);

        // Update existing page
        await adminClient
          .patch(existingPages._id)
          .set({
            title: product.title,
            pageBuilder: [
              product.hero,
              product.overview,
            ],
            quickNav: product.quickNav,
          })
          .commit();

        results.push({
          slug: product.slug,
          status: 'updated',
          id: existingPages._id,
        });
      } else {
        console.log(`Creating new page for ${product.slug}...`);

        // Create new page
        const newPage = await adminClient.create({
          _type: 'page',
          title: product.title,
          slug: {
            _type: 'slug',
            current: product.slug,
          },
          pageBuilder: [
            product.hero,
            product.overview,
          ],
          quickNav: product.quickNav,
        });

        results.push({
          slug: product.slug,
          status: 'created',
          id: newPage._id,
        });
      }
    }

    console.log('\n✅ All products seeded successfully!');

    return NextResponse.json({
      success: true,
      message: 'All 7 product pages seeded successfully',
      results,
      productSlugs: productData.map(p => p.slug),
    });

  } catch (error) {
    console.error('Error seeding products:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
