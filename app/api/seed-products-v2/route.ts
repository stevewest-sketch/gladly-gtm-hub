import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/sanity-admin';

export async function POST() {
  try {
    // Product data extracted from HTML files
    const products = [
      {
        slug: 'sidekick-standalone',
        title: 'Sidekick Standalone',
        badge: 'SIDEKICK STANDALONE',
        heroSection: {
          _type: 'heroSection',
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
          backgroundColor: 'green'
        },
        quickNav: [
          { label: 'Overview', anchor: '#overview' },
          { label: 'Platforms', anchor: '#platforms' },
          { label: 'Use Cases', anchor: '#use-cases' },
          { label: 'Content', anchor: '#content' },
          { label: 'Demos', anchor: '#demos' },
          { label: 'Competitive', anchor: '#competitive' }
        ],
        pageBuilder: [
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'overview',
            sectionTitle: 'What is Sidekick Standalone?',
            content: [
              {
                _type: 'block',
                _key: 'p1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Sidekick Standalone is an AI agent that integrates with your existing helpdesk platform to automate customer support inquiries. It works alongside your current setup—whether you use Zendesk, Salesforce Service Cloud, Kustomer, or another platform.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Unlike other AI solutions that require you to replace your entire tech stack, Sidekick Standalone plugs into what you already have and starts resolving customer inquiries on day one.'
                  }
                ]
              }
            ],
            backgroundColor: 'dark'
          },
          {
            _type: 'launchStatusSection',
            _key: 'launch-status',
            heading: '🚀 Launch Status',
            statusItems: [
              { label: 'Initial research', isActive: false },
              { label: 'Added to roadmap', isActive: false },
              { label: 'Discovery and design', isActive: false },
              { label: 'Build in progress', isActive: false },
              { label: 'Prototyping', isActive: true },
              { label: 'Limited rollout', isActive: false },
              { label: 'Broader rollout', isActive: false },
              { label: 'Open Access', isActive: false }
            ],
            description: 'Working version available internally. Early demos and testing happening with trusted customers.'
          }
        ]
      },
      {
        slug: 'sidekick-voice',
        title: 'Sidekick Voice',
        badge: 'SIDEKICK VOICE',
        heroSection: {
          _type: 'heroSection',
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
          backgroundColor: 'green'
        },
        quickNav: [
          { label: 'Overview', anchor: '#overview' },
          { label: 'Capabilities', anchor: '#capabilities' },
          { label: 'Use Cases', anchor: '#use-cases' },
          { label: 'Content', anchor: '#content' },
          { label: 'Demos', anchor: '#demos' },
          { label: 'Competitive', anchor: '#competitive' }
        ],
        pageBuilder: [
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'overview',
            sectionTitle: 'What is Sidekick Voice?',
            content: [
              {
                _type: 'block',
                _key: 'p1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Sidekick Voice is an AI phone agent that handles customer calls with natural, human-like conversation. It understands context, accesses customer data, and resolves inquiries without human intervention.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Built on Gladly\'s Customer AI, Sidekick Voice seamlessly integrates with your existing phone system and knowledge base to provide instant, accurate responses 24/7.'
                  }
                ]
              }
            ],
            backgroundColor: 'dark'
          },
          {
            _type: 'launchStatusSection',
            _key: 'launch-status',
            heading: '🚀 Launch Status',
            statusItems: [
              { label: 'Initial research', isActive: false },
              { label: 'Added to roadmap', isActive: false },
              { label: 'Discovery and design', isActive: false },
              { label: 'Build in progress', isActive: false },
              { label: 'Prototyping', isActive: false },
              { label: 'Limited rollout', isActive: true },
              { label: 'Broader rollout', isActive: false },
              { label: 'Open Access', isActive: false }
            ],
            description: 'Beta available to select customers. Gathering feedback and optimizing performance.'
          }
        ]
      },
      {
        slug: 'sidekick-email',
        title: 'Sidekick Email',
        badge: 'SIDEKICK EMAIL',
        heroSection: {
          _type: 'heroSection',
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
          backgroundColor: 'green'
        },
        quickNav: [
          { label: 'What it is', anchor: '#what-it-is' },
          { label: 'Customer Trackers', anchor: '#customer-trackers' },
          { label: 'Content', anchor: '#content' },
          { label: 'Enablement', anchor: '#enablement' }
        ],
        pageBuilder: [
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'what-it-is',
            sectionTitle: 'What it is',
            content: [
              {
                _type: 'block',
                _key: 'p1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Sidekick Email brings generative AI to email support, resolving issues directly in the inbox through AI-powered contextual responses that feel human and relevant. It works with Guides and integrations to answer questions and take actions.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Why it matters: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'Email is a top support channel, but emails are often long, unstructured, and difficult to parse, leading to slow responses and backlogs. Sidekick Email provides instant service with quick, accurate responses, reducing backlogs and supporting agents with handoff summaries, improving customer trust and hero productivity.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p3',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Who it\'s for: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'B2C Businesses that handle high volumes of email support, especially those with simple routing, high first contact resolution rates (FCR), and who are early adopters.'
                  }
                ]
              }
            ],
            backgroundColor: 'dark'
          },
          {
            _type: 'launchStatusSection',
            _key: 'launch-status',
            heading: '🚀 Launch Status',
            statusItems: [
              { label: 'Initial research', isActive: false },
              { label: 'Added to roadmap', isActive: false },
              { label: 'Discovery and design', isActive: false },
              { label: 'Build in progress', isActive: false },
              { label: 'Prototyping', isActive: false },
              { label: 'Limited rollout', isActive: true },
              { label: 'Broader rollout', isActive: false },
              { label: 'Open Access', isActive: false }
            ],
            description: 'Sidekick Email is in limited rollout with select customers.'
          }
        ]
      },
      {
        slug: 'sidekick-sales',
        title: 'Sidekick Sales',
        badge: 'SIDEKICK SALES',
        heroSection: {
          _type: 'heroSection',
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
          backgroundColor: 'green'
        },
        quickNav: [
          { label: 'Overview', anchor: '#overview' },
          { label: 'Capabilities', anchor: '#capabilities' },
          { label: 'Use Cases', anchor: '#use-cases' },
          { label: 'Content', anchor: '#content' },
          { label: 'Demos', anchor: '#demos' },
          { label: 'Competitive', anchor: '#competitive' }
        ],
        pageBuilder: [
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'overview',
            sectionTitle: 'What is Sidekick Sales?',
            content: [
              {
                _type: 'block',
                _key: 'p1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Sidekick Sales is AI designed specifically for revenue generation. It engages website visitors, qualifies leads, books meetings, and nurtures prospects through the sales funnel.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Unlike traditional chatbots that deflect, Sidekick Sales actively converts visitors into qualified opportunities and drives measurable revenue impact.'
                  }
                ]
              }
            ],
            backgroundColor: 'dark'
          },
          {
            _type: 'launchStatusSection',
            _key: 'launch-status',
            heading: '🚀 Launch Status',
            statusItems: [
              { label: 'Initial research', isActive: false },
              { label: 'Added to roadmap', isActive: false },
              { label: 'Discovery and design', isActive: true },
              { label: 'Build in progress', isActive: false },
              { label: 'Prototyping', isActive: false },
              { label: 'Limited rollout', isActive: false },
              { label: 'Broader rollout', isActive: false },
              { label: 'Open Access', isActive: false }
            ],
            description: 'Product design phase. Gathering customer feedback on requirements and use cases.'
          }
        ]
      },
      {
        slug: 'customer-ai',
        title: 'Gladly Customer AI',
        badge: 'CUSTOMER AI',
        heroSection: {
          _type: 'heroSection',
          badge: 'CUSTOMER AI',
          heading: 'Gladly Customer AI',
          subheading: 'Gladly is Customer AI—the per-user intelligence layer that makes radically efficient, radically personal customer experiences possible, allowing AI to understand customers, predict needs, and teams through AI-powered customer intelligence.',
          layout: 'centered',
          primaryCtaText: 'Learn More',
          primaryCtaLink: '#what-it-is',
          secondaryCtaText: 'View Resources',
          secondaryCtaLink: '#content',
          backgroundColor: 'green'
        },
        quickNav: [
          { label: 'What it is', anchor: '#what-it-is' },
          { label: 'Quick Links for Sales', anchor: '#quick-links-sales' },
          { label: 'Quick Links for CS/AM', anchor: '#quick-links-csam' },
          { label: 'Customer AI Videos', anchor: '#videos' },
          { label: 'Shareable Content', anchor: '#shareable' },
          { label: 'PR', anchor: '#pr' },
          { label: 'Enablement', anchor: '#enablement' }
        ],
        pageBuilder: [
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'what-it-is',
            sectionTitle: 'What is Gladly?',
            content: [
              {
                _type: 'block',
                _key: 'p1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Gladly is Customer AI—a per-user intelligence layer that makes radically efficient, radically personal experiences possible, allowing AI agents and human teams to understand customers, predict needs, and provide a seamless experience. It unifies customer conversations, commerce, AI, and support teams through AI-powered customer intelligence.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Why it matters: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'Most platforms treat customer data as isolated tickets rather than continuous relationships. Gladly\'s Customer AI creates a persistent intelligence layer that powers all interactions, enabling both AI agents and human teams to deliver personalized service at scale with full customer context.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p3',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Who it\'s for: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'B2C Businesses with high-touch customer relationships, ecommerce platforms, and brands prioritizing customer experience over transactional support.'
                  }
                ]
              }
            ],
            backgroundColor: 'dark'
          },
          {
            _type: 'launchStatusSection',
            _key: 'launch-status',
            heading: '🚀 Launch Status',
            statusItems: [
              { label: 'Initial research', isActive: false },
              { label: 'Added to roadmap', isActive: false },
              { label: 'Discovery and design', isActive: false },
              { label: 'Build in progress', isActive: false },
              { label: 'Prototyping', isActive: false },
              { label: 'Limited rollout', isActive: false },
              { label: 'Broader rollout', isActive: false },
              { label: 'Open Access', isActive: true }
            ],
            description: 'Customer AI is the foundational intelligence layer powering all Gladly products and is available to all customers.'
          }
        ]
      },
      {
        slug: 'guides-and-journeys',
        title: 'Guides and Journeys',
        badge: 'GUIDES AND JOURNEYS',
        heroSection: {
          _type: 'heroSection',
          badge: 'GUIDES AND JOURNEYS',
          heading: 'Guides and Journeys',
          subheading: 'Sidekick Guides and Journeys simplify AI setup and optimization, giving CX teams full control without technical skills. Guides offers a no-code interface to create and manage AI workflows while Journeys provides insights and analytics to continuously improve AI performance and outcomes.',
          layout: 'centered',
          primaryCtaText: 'Learn More',
          primaryCtaLink: '#what-it-is',
          secondaryCtaText: 'View Resources',
          secondaryCtaLink: '#content',
          backgroundColor: 'green'
        },
        quickNav: [
          { label: 'What it is', anchor: '#what-it-is' },
          { label: 'Content', anchor: '#content' },
          { label: 'Demo', anchor: '#demo' },
          { label: 'Enablement', anchor: '#enablement' }
        ],
        pageBuilder: [
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'what-it-is',
            sectionTitle: 'What it is',
            content: [
              {
                _type: 'block',
                _key: 'p1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Sidekick Guides and Journeys simplify AI setup and optimization, giving CX teams full control without technical skills. Guides offers a no-code interface to create and manage AI workflows while Journeys provides insights and analytics to continuously improve AI performance and outcomes.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Why it matters: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'AI is often hard to manage and optimize without technical help, leading to poor performance and frustrating customer experiences. Guides and Journeys remove complexity, letting CX teams quickly set up, monitor, and refine AI to deliver more effective and personalized support at scale.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p3',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Who it\'s for: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'B2C Businesses and CX teams managing high volumes of support who need simple tools to configure and improve AI without relying on technical skills or external help.'
                  }
                ]
              }
            ],
            backgroundColor: 'dark'
          },
          {
            _type: 'launchStatusSection',
            _key: 'launch-status',
            heading: '🚀 Launch Status',
            statusItems: [
              { label: 'Initial research', isActive: false },
              { label: 'Added to roadmap', isActive: false },
              { label: 'Discovery and design', isActive: false },
              { label: 'Build in progress', isActive: false },
              { label: 'Prototyping', isActive: false },
              { label: 'Limited rollout', isActive: false },
              { label: 'Broader rollout', isActive: true },
              { label: 'Open Access', isActive: false }
            ],
            description: 'Guides and Journeys is in broader rollout and available to most customers.'
          }
        ]
      },
      {
        slug: 'app-platform',
        title: 'App Platform',
        badge: 'APP PLATFORM',
        heroSection: {
          _type: 'heroSection',
          badge: 'APP PLATFORM',
          heading: 'App Platform',
          subheading: 'Gladly\'s App Platform is a low-code integration layer that connects external systems like order management, loyalty, and payment directly to Gladly\'s interface for agents and AI. Teams get faster setup, better service outcomes, and lower IT overhead.',
          layout: 'centered',
          primaryCtaText: 'Learn More',
          primaryCtaLink: '#what-it-is',
          secondaryCtaText: 'View Resources',
          secondaryCtaLink: '#content',
          backgroundColor: 'green'
        },
        quickNav: [
          { label: 'What it is', anchor: '#what-it-is' },
          { label: 'Available Apps', anchor: '#available-apps' },
          { label: 'Talk Tracks + Next Steps', anchor: '#talk-tracks' },
          { label: 'Content', anchor: '#content' },
          { label: 'Demo', anchor: '#demo' },
          { label: 'Technical Enablement', anchor: '#technical-enablement' },
          { label: 'Revenue Enablement', anchor: '#revenue-enablement' }
        ],
        pageBuilder: [
          {
            _type: 'contentSection',
            _key: 'overview',
            anchorId: 'what-it-is',
            sectionTitle: 'What it is',
            content: [
              {
                _type: 'block',
                _key: 'p1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Gladly\'s App Platform is a low-code integration layer that connects external systems like order management, loyalty, and payment directly to Gladly\'s interface for agents and AI.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Why it matters: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'It eliminates tool-switching, gives agents full contact, and lets AI act on real data—teams get faster setup, better service outcomes, and lower IT overhead.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'p3',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Who it\'s for: ',
                    marks: ['strong']
                  },
                  {
                    _type: 'span',
                    text: 'For IT and CX teams at ecommerce high-tech customers who rely on multiple systems to support customers and need simple tools to unify data across agents and AI.'
                  }
                ]
              }
            ],
            backgroundColor: 'dark'
          },
          {
            _type: 'launchStatusSection',
            _key: 'launch-status',
            heading: '🚀 Launch Status',
            statusItems: [
              { label: 'Initial research', isActive: false },
              { label: 'Added to roadmap', isActive: false },
              { label: 'Discovery and design', isActive: false },
              { label: 'Build in progress', isActive: false },
              { label: 'Prototyping', isActive: false },
              { label: 'Limited rollout', isActive: false },
              { label: 'Broader rollout', isActive: false },
              { label: 'Open Access', isActive: true }
            ],
            description: 'App Platform is generally available and accessible to all customers.'
          }
        ]
      }
    ];

    const results = [];

    for (const product of products) {
      // First, check if product already exists to get its _id
      const existingProduct = await adminClient.fetch(
        `*[_type == "page" && slug.current == $slug][0]{_id}`,
        { slug: product.slug }
      );

      // Create or update the product document
      const productDoc: any = {
        _type: 'page',
        title: product.title,
        slug: {
          _type: 'slug',
          current: product.slug
        },
        quickNav: product.quickNav,
        pageBuilder: product.pageBuilder,
        seo: {
          _type: 'seo',
          metaTitle: product.title,
          metaDescription: product.heroSection.subheading
        }
      };

      let result;
      let status;

      if (existingProduct?._id) {
        // Update existing product
        result = await adminClient
          .patch(existingProduct._id)
          .set(productDoc)
          .commit();
        status = 'updated';
        console.log(`Updated product: ${product.slug}`);
      } else {
        // Create new product
        result = await adminClient.create(productDoc);
        status = 'created';
        console.log(`Created product: ${product.slug}`);
      }

      results.push({
        slug: product.slug,
        status: status,
        _id: result._id
      });
    }

    const created = results.filter(r => r.status === 'created').length;
    const updated = results.filter(r => r.status === 'updated').length;

    return NextResponse.json({
      success: true,
      message: `Created ${created} products, Updated ${updated} products`,
      results
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
