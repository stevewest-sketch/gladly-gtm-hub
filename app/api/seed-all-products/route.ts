import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/sanity-admin';

export async function GET() {
  try {
    const productPages = [
      // 1. Sidekick Standalone
      {
        _id: 'page-product-sidekick-standalone',
        _type: 'page',
        title: 'Sidekick Standalone',
        slug: {
          _type: 'slug',
          current: 'product/sidekick-standalone'
        },
        quickNav: [
          { label: 'Overview', anchor: 'overview' },
          { label: 'Platforms', anchor: 'platforms' },
          { label: 'Use Cases', anchor: 'use-cases' },
          { label: 'Content', anchor: 'content' },
          { label: 'Demos', anchor: 'demos' },
          { label: 'Competitive', anchor: 'competitive' }
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero-standalone',
            badge: 'SIDEKICK STANDALONE',
            heading: 'AI That Works With Your Helpdesk',
            subheading: 'Integrate Sidekick AI with Zendesk, Salesforce, Kustomer, or any existing platform to automate customer support',
            buttons: [
              { label: 'Learn More', link: '#overview', variant: 'primary' },
              { label: 'View Demos', link: '#demos', variant: 'secondary' }
            ],
            videoId: 'mwar81dg26',
            colorScheme: 'green'
          },
          // Overview Section
          {
            _type: 'contentSection',
            _key: 'overview-standalone',
            anchorId: 'overview',
            heading: 'What is Sidekick Standalone?',
            content: [
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Sidekick Standalone is an AI agent that integrates with your existing helpdesk platform to automate customer support inquiries. It works alongside your current setup—whether you use Zendesk, Salesforce Service Cloud, Kustomer, or another platform.'
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Unlike other AI solutions that require you to replace your entire tech stack, Sidekick Standalone plugs into what you already have and starts resolving customer inquiries on day one.'
                }]
              }
            ],
            backgroundColor: 'black',
            launchStatus: {
              currentStage: 'Prototyping',
              description: 'Working version available internally. Early demos and testing happening with trusted customers.'
            }
          },
          // Platforms Section
          {
            _type: 'featureGridSection',
            _key: 'platforms-standalone',
            anchorId: 'platforms',
            heading: 'Works With Your Platform',
            columns: 3,
            features: [
              {
                icon: '🎫',
                title: 'Zendesk',
                description: 'Native integration with Zendesk Support and Sunshine Conversations'
              },
              {
                icon: '☁️',
                title: 'Salesforce',
                description: 'Works with Service Cloud and Einstein Bot'
              },
              {
                icon: '🔧',
                title: 'Kustomer',
                description: 'Seamless integration with Kustomer CRM'
              },
              {
                icon: '💬',
                title: 'Intercom',
                description: 'Connect Sidekick to Intercom messenger'
              },
              {
                icon: '🌱',
                title: 'Freshdesk',
                description: 'Integration with Freshworks products'
              },
              {
                icon: '🔌',
                title: 'Other Platforms',
                description: 'Custom integrations available via API'
              }
            ],
            backgroundColor: 'gray'
          },
          // Use Cases Section
          {
            _type: 'featureGridSection',
            _key: 'use-cases-standalone',
            anchorId: 'use-cases',
            heading: 'Common Use Cases',
            columns: 2,
            features: [
              {
                title: 'Where Is My Order (WISMO)',
                description: 'Automate order status inquiries with real-time tracking updates'
              },
              {
                title: 'Returns & Exchanges',
                description: 'Handle return requests, generate labels, and process exchanges'
              },
              {
                title: 'Account Management',
                description: 'Password resets, profile updates, subscription changes'
              },
              {
                title: 'Product Recommendations',
                description: 'Suggest products based on customer history and preferences'
              },
              {
                title: 'FAQs & Self-Service',
                description: 'Answer common questions about policies, shipping, products'
              },
              {
                title: 'Appointment Scheduling',
                description: 'Book, reschedule, and cancel appointments automatically'
              }
            ]
          },
          // Content Library
          {
            _type: 'featureGridSection',
            _key: 'content-standalone',
            anchorId: 'content',
            heading: 'Content & Resources',
            columns: 3,
            features: [
              {
                icon: '📄',
                title: 'One-Pagers',
                description: 'Quick product overviews and value propositions',
                link: '#'
              },
              {
                icon: '📊',
                title: 'Presentation Decks',
                description: 'Full product decks and platform-specific presentations',
                link: '#'
              },
              {
                icon: '⭐',
                title: 'Case Studies',
                description: 'Customer success stories by industry and use case',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Demo Resources
          {
            _type: 'featureGridSection',
            _key: 'demos-standalone',
            anchorId: 'demos',
            heading: 'Demo Materials',
            columns: 2,
            features: [
              {
                icon: '💻',
                title: 'Demo Environments',
                description: 'Access live Sidekick demo environments with sample data',
                link: '#'
              },
              {
                icon: '📝',
                title: 'Demo Scripts & Mockups',
                description: 'Conversation scripts and visual mockups for walkthroughs',
                link: '#'
              },
              {
                icon: '🎥',
                title: 'Video Library',
                description: 'Product walkthrough videos and recorded demos',
                link: '#'
              },
              {
                icon: '💰',
                title: 'ROI Calculator',
                description: 'Calculate cost savings and efficiency gains',
                link: '#'
              }
            ]
          },
          // Competitive Intelligence
          {
            _type: 'featureGridSection',
            _key: 'competitive-standalone',
            anchorId: 'competitive',
            heading: 'Competitive Intelligence',
            columns: 3,
            features: [
              {
                icon: '⚔️',
                title: 'Battle Cards',
                description: 'Positioning against Zendesk AI, Einstein, and other competitors',
                link: '#'
              },
              {
                icon: '🔄',
                title: 'Migration Stories',
                description: 'Customer success stories from competitive replacements',
                link: '#'
              },
              {
                icon: '💬',
                title: 'Objection Handling',
                description: 'Responses to common competitive objections',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta-standalone',
            heading: 'Need Help With Sidekick?',
            subheading: "Can't find what you're looking for? Reach out to the enablement team",
            buttons: [
              { label: 'Ask in #enablement-resources', link: '#', variant: 'primary' },
              { label: 'Browse All Products', link: '#', variant: 'secondary' }
            ]
          }
        ]
      },

      // 2. Sidekick Voice
      {
        _id: 'page-product-sidekick-voice',
        _type: 'page',
        title: 'Sidekick Voice',
        slug: {
          _type: 'slug',
          current: 'product/sidekick-voice'
        },
        quickNav: [
          { label: 'Overview', anchor: 'overview' },
          { label: 'Capabilities', anchor: 'capabilities' },
          { label: 'Use Cases', anchor: 'use-cases' },
          { label: 'Content', anchor: 'content' },
          { label: 'Demos', anchor: 'demos' },
          { label: 'Competitive', anchor: 'competitive' }
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero-voice',
            badge: 'SIDEKICK VOICE',
            heading: 'AI-Powered Voice Agent',
            subheading: 'Handle phone calls 24/7 with natural conversation AI that resolves customer inquiries instantly',
            buttons: [
              { label: 'Learn More', link: '#overview', variant: 'primary' },
              { label: 'Hear Examples', link: '#demos', variant: 'secondary' }
            ],
            videoId: '62ev998jm3',
            colorScheme: 'green'
          },
          // Overview Section
          {
            _type: 'contentSection',
            _key: 'overview-voice',
            anchorId: 'overview',
            heading: 'What is Sidekick Voice?',
            content: [
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: "Sidekick Voice is an AI phone agent that handles customer calls with natural, human-like conversation. It understands context, accesses customer data, and resolves inquiries without human intervention."
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: "Built on Gladly's Customer AI, Sidekick Voice seamlessly integrates with your existing phone system and knowledge base to provide instant, accurate responses 24/7."
                }]
              }
            ],
            backgroundColor: 'black',
            launchStatus: {
              currentStage: 'Limited rollout',
              description: 'Beta available to select customers. Gathering feedback and optimizing performance.'
            }
          },
          // Capabilities Section
          {
            _type: 'featureGridSection',
            _key: 'capabilities-voice',
            anchorId: 'capabilities',
            heading: 'Voice Capabilities',
            columns: 3,
            features: [
              {
                icon: '🗣️',
                title: 'Natural Conversation',
                description: 'Human-like dialogue with context awareness and interruption handling',
                link: '#'
              },
              {
                icon: '🌐',
                title: 'Multi-Language Support',
                description: 'Handles calls in multiple languages with native fluency',
                link: '#'
              },
              {
                icon: '🔄',
                title: 'Seamless Handoff',
                description: 'Intelligent routing to human agents when needed',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Use Cases Section
          {
            _type: 'featureGridSection',
            _key: 'use-cases-voice',
            anchorId: 'use-cases',
            heading: 'Common Use Cases',
            columns: 2,
            features: [
              {
                title: 'Order Status Inquiries',
                description: 'Handle WISMO calls with real-time order tracking information'
              },
              {
                title: 'Appointment Scheduling',
                description: 'Book, reschedule, and cancel appointments via phone'
              },
              {
                title: 'Account Support',
                description: 'Password resets, balance inquiries, and account updates'
              },
              {
                title: 'Technical Support',
                description: 'Troubleshooting and resolution for common issues'
              },
              {
                title: 'After-Hours Support',
                description: '24/7 availability without staffing overnight shifts'
              },
              {
                title: 'Peak Volume Management',
                description: 'Scale instantly during high-volume periods'
              }
            ]
          },
          // Content Library
          {
            _type: 'featureGridSection',
            _key: 'content-voice',
            anchorId: 'content',
            heading: 'Content & Resources',
            columns: 3,
            features: [
              {
                icon: '📄',
                title: 'Voice One-Pager',
                description: 'Quick overview of Sidekick Voice capabilities',
                link: '#'
              },
              {
                icon: '📊',
                title: 'Voice ROI Calculator',
                description: 'Calculate savings from automating phone support',
                link: '#'
              },
              {
                icon: '🎯',
                title: 'Implementation Guide',
                description: 'Step-by-step guide to deploying Voice',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Demo Resources
          {
            _type: 'featureGridSection',
            _key: 'demos-voice',
            anchorId: 'demos',
            heading: 'Demo Materials',
            columns: 2,
            features: [
              {
                icon: '🎧',
                title: 'Call Recordings Library',
                description: 'Real examples of Sidekick Voice handling customer calls',
                link: '#'
              },
              {
                icon: '📱',
                title: 'Live Demo Number',
                description: 'Call our demo line to experience Sidekick Voice',
                link: '#'
              },
              {
                icon: '🎬',
                title: 'Voice Demo Video',
                description: 'See Sidekick Voice in action with real scenarios',
                link: '#'
              },
              {
                icon: '📝',
                title: 'Call Flow Templates',
                description: 'Example conversation flows for different use cases',
                link: '#'
              }
            ]
          },
          // Competitive Intelligence
          {
            _type: 'featureGridSection',
            _key: 'competitive-voice',
            anchorId: 'competitive',
            heading: 'Competitive Intelligence',
            columns: 3,
            features: [
              {
                icon: '⚔️',
                title: 'Voice AI Comparison',
                description: 'How we compare to other voice AI solutions',
                link: '#'
              },
              {
                icon: '🏆',
                title: 'Differentiators',
                description: 'What makes Sidekick Voice unique',
                link: '#'
              },
              {
                icon: '💬',
                title: 'Objection Handling',
                description: 'Common concerns and responses',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta-voice',
            heading: 'Ready to See Sidekick Voice?',
            subheading: 'Experience our AI voice agent with a personalized demo',
            buttons: [
              { label: 'Schedule Demo', link: '#', variant: 'primary' },
              { label: 'Call Demo Line', link: '#', variant: 'secondary' }
            ]
          }
        ]
      },

      // 3. Sidekick Email
      {
        _id: 'page-product-sidekick-email',
        _type: 'page',
        title: 'Sidekick Email',
        slug: {
          _type: 'slug',
          current: 'product/sidekick-email'
        },
        quickNav: [
          { label: 'What it is', anchor: 'what-it-is' },
          { label: 'Customer Trackers', anchor: 'customer-trackers' },
          { label: 'Content', anchor: 'content' },
          { label: 'Enablement', anchor: 'enablement' }
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero-email',
            badge: 'SIDEKICK EMAIL',
            heading: 'Sidekick Email',
            subheading: 'Sidekick Email brings generative AI to email support, resolving issues directly in the inbox through AI-powered contextual responses that feel human and relevant. It works with Guides and integrations to answer questions and take actions.',
            buttons: [
              { label: 'Learn More', link: '#what-it-is', variant: 'primary' },
              { label: 'View Resources', link: '#content', variant: 'secondary' }
            ],
            videoId: '62ev998jm3',
            colorScheme: 'green'
          },
          // What it is Section
          {
            _type: 'contentSection',
            _key: 'what-it-is-email',
            anchorId: 'what-it-is',
            heading: 'What it is',
            content: [
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Sidekick Email brings generative AI to email support, resolving issues directly in the inbox through AI-powered contextual responses that feel human and relevant. It works with Guides and integrations to answer questions and take actions.'
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Why it matters: ',
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: 'Email is a top support channel, but emails are often long, unstructured, and difficult to parse, leading to slow responses and backlogs. Sidekick Email provides instant service with quick, accurate responses, reducing backlogs and supporting agents with handoff summaries, improving customer trust and hero productivity.'
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: "Who it's for: ",
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: 'B2C Businesses that handle high volumes of email support, especially those with simple routing, high first contact resolution rates (FCR), and who are early adopters.'
                }]
              }
            ],
            backgroundColor: 'black',
            launchStatus: {
              currentStage: 'Limited rollout',
              description: 'Sidekick Email is in limited rollout with select customers.'
            }
          },
          // Key Capabilities
          {
            _type: 'featureGridSection',
            _key: 'capabilities-email',
            heading: 'Key Capabilities',
            columns: 2,
            features: [
              {
                title: 'AI-powered contextual responses',
                description: 'Delivers human-like, relevant email replies automatically'
              },
              {
                title: 'Answers questions and takes actions',
                description: 'Not just responses—completes tasks and resolves issues'
              },
              {
                title: 'Works with Guides and integrations',
                description: 'Leverages existing workflows and connected systems'
              },
              {
                title: 'Reduces backlogs',
                description: 'Handles high volume email efficiently at scale'
              },
              {
                title: 'Supports heroes with handoff summaries',
                description: 'Provides context when escalation to agents is needed'
              },
              {
                title: 'Instant service delivery',
                description: 'Eliminates wait times for email responses'
              }
            ]
          },
          // Customer Trackers Section
          {
            _type: 'featureGridSection',
            _key: 'customer-trackers-email',
            anchorId: 'customer-trackers',
            heading: 'Customer Trackers',
            columns: 2,
            features: [
              {
                title: 'Customer Interest Tracker',
                description: 'Track customer interest and engagement with Sidekick Email',
                link: '#'
              },
              {
                title: 'List of available apps',
                description: 'Compatible applications and integrations',
                link: '#'
              },
              {
                title: 'SFDC Report',
                description: 'Salesforce reporting and analytics',
                link: '#'
              }
            ]
          },
          // Content Section
          {
            _type: 'featureGridSection',
            _key: 'content-email',
            anchorId: 'content',
            heading: 'Content',
            columns: 3,
            features: [
              {
                title: 'Sidekick Email',
                description: 'Core product documentation and overview',
                link: '#'
              },
              {
                title: 'Intro Deck Sidekick Email',
                description: 'Introduction presentation for customer conversations',
                link: '#'
              },
              {
                title: 'Email How It Works One Pager',
                description: 'Quick reference guide explaining functionality',
                link: '#'
              },
              {
                title: 'Sidekick Email Implementation',
                description: 'Implementation guide and best practices',
                link: '#'
              },
              {
                title: 'Email Generic One Pager',
                description: 'General overview one-pager for prospects',
                link: '#'
              },
              {
                title: 'Follow Up Template',
                description: 'Email templates for follow-up communications',
                link: '#'
              },
              {
                title: 'Sidekick Email Follow-Up',
                description: 'Follow-up strategy and messaging guide',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Enablement Section
          {
            _type: 'featureGridSection',
            _key: 'enablement-email',
            anchorId: 'enablement',
            heading: 'Enablement',
            columns: 2,
            features: [
              {
                title: 'Sidekick Email + App Platform',
                description: 'Integration training with App Platform',
                link: '#'
              },
              {
                title: '6/18/25: SK for Email + App Enablement',
                description: 'Product enablement session recording',
                link: '#'
              },
              {
                title: 'Foundational Enablement For SK Email',
                description: 'Core training materials for Sidekick Email',
                link: '#'
              },
              {
                title: 'GTM FAQs | Q2 launch',
                description: 'Go-to-market frequently asked questions',
                link: '#'
              },
              {
                title: 'FAQ Doc',
                description: 'Comprehensive FAQ documentation',
                link: '#'
              }
            ]
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta-email',
            heading: 'Need Help With Sidekick Email?',
            subheading: "Can't find what you're looking for? Reach out to the enablement team",
            buttons: [
              { label: 'Ask in #enablement-resources', link: '#', variant: 'primary' },
              { label: 'Browse All Products', link: '#', variant: 'secondary' }
            ]
          }
        ]
      },

      // 4. Sidekick Sales
      {
        _id: 'page-product-sidekick-sales',
        _type: 'page',
        title: 'Sidekick Sales',
        slug: {
          _type: 'slug',
          current: 'product/sidekick-sales'
        },
        quickNav: [
          { label: 'Overview', anchor: 'overview' },
          { label: 'Capabilities', anchor: 'capabilities' },
          { label: 'Use Cases', anchor: 'use-cases' },
          { label: 'Content', anchor: 'content' },
          { label: 'Demos', anchor: 'demos' },
          { label: 'Competitive', anchor: 'competitive' }
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero-sales',
            badge: 'SIDEKICK SALES',
            heading: 'AI for Revenue Teams',
            subheading: 'Empower sales and marketing with AI that engages prospects, qualifies leads, and drives revenue',
            buttons: [
              { label: 'Learn More', link: '#overview', variant: 'primary' },
              { label: 'View Demos', link: '#demos', variant: 'secondary' }
            ],
            videoId: '85i16s6k7a',
            colorScheme: 'green'
          },
          // Overview Section
          {
            _type: 'contentSection',
            _key: 'overview-sales',
            anchorId: 'overview',
            heading: 'What is Sidekick Sales?',
            content: [
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Sidekick Sales is AI designed specifically for revenue generation. It engages website visitors, qualifies leads, books meetings, and nurtures prospects through the sales funnel.'
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Unlike traditional chatbots that deflect, Sidekick Sales actively converts visitors into qualified opportunities and drives measurable revenue impact.'
                }]
              }
            ],
            backgroundColor: 'black',
            launchStatus: {
              currentStage: 'Discovery and design',
              description: 'Product design phase. Gathering customer feedback on requirements and use cases.'
            }
          },
          // Capabilities Section
          {
            _type: 'featureGridSection',
            _key: 'capabilities-sales',
            anchorId: 'capabilities',
            heading: 'Sales AI Capabilities',
            columns: 3,
            features: [
              {
                icon: '🎯',
                title: 'Lead Qualification',
                description: 'Automatically qualify prospects based on your ideal customer profile',
                link: '#'
              },
              {
                icon: '📅',
                title: 'Meeting Scheduling',
                description: 'Book demos directly into AE calendars without back-and-forth',
                link: '#'
              },
              {
                icon: '📈',
                title: 'Lead Nurturing',
                description: 'Engage prospects with personalized follow-ups and content',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Use Cases Section
          {
            _type: 'featureGridSection',
            _key: 'use-cases-sales',
            anchorId: 'use-cases',
            heading: 'Common Use Cases',
            columns: 2,
            features: [
              {
                title: 'Website Conversion',
                description: 'Convert anonymous visitors into qualified leads 24/7'
              },
              {
                title: 'Demo Requests',
                description: 'Qualify and book product demos automatically'
              },
              {
                title: 'Event Follow-up',
                description: 'Engage trade show and webinar leads at scale'
              },
              {
                title: 'Pricing Inquiries',
                description: 'Provide custom pricing based on prospect needs'
              },
              {
                title: 'Content Recommendations',
                description: 'Share relevant case studies and resources'
              },
              {
                title: 'Pipeline Acceleration',
                description: 'Re-engage stalled deals and dormant accounts'
              }
            ]
          },
          // Content Library
          {
            _type: 'featureGridSection',
            _key: 'content-sales',
            anchorId: 'content',
            heading: 'Content & Resources',
            columns: 3,
            features: [
              {
                icon: '📄',
                title: 'Sales One-Pager',
                description: 'Quick overview for revenue teams',
                link: '#'
              },
              {
                icon: '💰',
                title: 'Revenue Impact Calculator',
                description: 'Calculate potential pipeline and revenue lift',
                link: '#'
              },
              {
                icon: '📚',
                title: 'Best Practices Guide',
                description: 'Optimize AI for maximum conversion',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Demo Resources
          {
            _type: 'featureGridSection',
            _key: 'demos-sales',
            anchorId: 'demos',
            heading: 'Demo Materials',
            columns: 2,
            features: [
              {
                icon: '💻',
                title: 'Interactive Demo',
                description: 'Experience Sidekick Sales on a live website',
                link: '#'
              },
              {
                icon: '📊',
                title: 'Performance Metrics',
                description: 'Real customer results and conversion rates',
                link: '#'
              },
              {
                icon: '🎬',
                title: 'Customer Success Stories',
                description: 'Video testimonials from revenue teams',
                link: '#'
              },
              {
                icon: '🔧',
                title: 'Integration Guides',
                description: 'Connect with CRM, marketing automation, and calendaring',
                link: '#'
              }
            ]
          },
          // Competitive Intelligence
          {
            _type: 'featureGridSection',
            _key: 'competitive-sales',
            anchorId: 'competitive',
            heading: 'Competitive Intelligence',
            columns: 3,
            features: [
              {
                icon: '⚔️',
                title: 'vs. Traditional Chatbots',
                description: 'Why Sidekick Sales converts better',
                link: '#'
              },
              {
                icon: '🏆',
                title: 'Unique Differentiators',
                description: 'What sets us apart in the market',
                link: '#'
              },
              {
                icon: '💬',
                title: 'Objection Handling',
                description: 'Address common sales concerns',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta-sales',
            heading: 'Ready to Drive More Revenue?',
            subheading: 'See how Sidekick Sales can transform your pipeline',
            buttons: [
              { label: 'Schedule Demo', link: '#', variant: 'primary' },
              { label: 'Calculate ROI', link: '#', variant: 'secondary' }
            ]
          }
        ]
      },

      // 5. Customer AI
      {
        _id: 'page-product-customer-ai',
        _type: 'page',
        title: 'Gladly Customer AI',
        slug: {
          _type: 'slug',
          current: 'product/customer-ai'
        },
        quickNav: [
          { label: 'What it is', anchor: 'what-it-is' },
          { label: 'Quick Links for Sales', anchor: 'quick-links-sales' },
          { label: 'Quick Links for CS/AM', anchor: 'quick-links-csam' },
          { label: 'Customer AI Videos', anchor: 'videos' },
          { label: 'Shareable Content', anchor: 'shareable' },
          { label: 'PR', anchor: 'pr' },
          { label: 'Enablement', anchor: 'enablement' }
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero-customer-ai',
            badge: 'CUSTOMER AI',
            heading: 'Gladly Customer AI',
            subheading: 'Gladly is Customer AI—the per-user intelligence layer that makes radically efficient, radically personal customer experiences possible, allowing AI to understand customers, predict needs, and teams through AI-powered customer intelligence.',
            buttons: [
              { label: 'Learn More', link: '#what-it-is', variant: 'primary' },
              { label: 'View Resources', link: '#content', variant: 'secondary' }
            ],
            colorScheme: 'green'
          },
          // What it is Section
          {
            _type: 'contentSection',
            _key: 'what-it-is-customer-ai',
            anchorId: 'what-it-is',
            heading: 'What is Gladly?',
            content: [
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Gladly is Customer AI—a per-user intelligence layer that makes radically efficient, radically personal experiences possible, allowing AI agents and human teams to understand customers, predict needs, and provide a seamless experience. It unifies customer conversations, commerce, AI, and support teams through AI-powered customer intelligence.'
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Why it matters: ',
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: "Most platforms treat customer data as isolated tickets rather than continuous relationships. Gladly's Customer AI creates a persistent intelligence layer that powers all interactions, enabling both AI agents and human teams to deliver personalized service at scale with full customer context."
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: "Who it's for: ",
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: 'B2C Businesses with high-touch customer relationships, ecommerce platforms, and brands prioritizing customer experience over transactional support.'
                }]
              }
            ],
            backgroundColor: 'black',
            launchStatus: {
              currentStage: 'Open Access',
              description: 'Customer AI is the foundational intelligence layer powering all Gladly products and is available to all customers.'
            }
          },
          // Key Capabilities
          {
            _type: 'featureGridSection',
            _key: 'capabilities-customer-ai',
            heading: 'Key Capabilities',
            columns: 2,
            features: [
              {
                title: 'Customer-Centered Platform',
                description: 'All interactions organized by customer, not tickets'
              },
              {
                title: 'AI-Powered Resolution and Support',
                description: 'Automate resolutions while assisting human agents'
              },
              {
                title: 'Real-Time Customer Context',
                description: 'Complete conversation and purchase history instantly available'
              },
              {
                title: 'Omnichannel Continuity',
                description: 'Seamless experience across all communication channels'
              },
              {
                title: 'Commerce Integration',
                description: 'Direct integration with order management and catalogs'
              },
              {
                title: 'Trusted Access & Configuration',
                description: 'Secure, compliant access to customer intelligence'
              }
            ]
          },
          // Quick Links for Sales
          {
            _type: 'featureGridSection',
            _key: 'quick-links-sales-customer-ai',
            anchorId: 'quick-links-sales',
            heading: 'Quick Links For Sales',
            columns: 2,
            features: [
              {
                title: 'Launch video',
                description: 'Product launch overview and announcement',
                link: '#'
              },
              {
                title: 'Customer AI Video',
                description: 'Detailed product walkthrough and capabilities',
                link: '#'
              },
              {
                title: 'Customer AI one-pager',
                description: 'Quick reference sheet for sales conversations',
                link: '#'
              },
              {
                title: 'New customer stories',
                description: 'Latest customer success stories and testimonials',
                link: '#'
              },
              {
                title: 'Cluadia photos',
                description: 'Visual assets and brand imagery',
                link: '#'
              }
            ]
          },
          // Quick Links for CS/AM
          {
            _type: 'featureGridSection',
            _key: 'quick-links-csam-customer-ai',
            anchorId: 'quick-links-csam',
            heading: 'Quick Links For CS/AM',
            columns: 2,
            features: [
              {
                title: 'Sidekick Sales usage',
                description: 'Usage guidelines and best practices',
                link: '#'
              },
              {
                title: 'Rollout to Customers for CSMs',
                description: 'Customer rollout strategy and materials',
                link: '#'
              },
              {
                title: 'New customer assets',
                description: 'Latest onboarding and training materials',
                link: '#'
              },
              {
                title: 'Claudia videos',
                description: 'Video resources for customer presentations',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Customer AI Videos
          {
            _type: 'featureGridSection',
            _key: 'videos-customer-ai',
            anchorId: 'videos',
            heading: 'Customer AI Videos',
            columns: 2,
            features: [
              {
                title: 'Gladly Demo Walk',
                description: 'Complete platform demonstration',
                link: '#'
              },
              {
                title: 'Gladly Launch Video',
                description: 'Official product launch announcement',
                link: '#'
              },
              {
                title: 'Customer AI Video',
                description: 'Deep dive into AI capabilities',
                link: '#'
              },
              {
                title: 'Gladly AI Video w/ text',
                description: 'Captioned version for accessibility',
                link: '#'
              },
              {
                title: 'Customer AI Videos w/ tec',
                description: 'Technical deep-dive versions',
                link: '#'
              }
            ]
          },
          // Shareable Content
          {
            _type: 'featureGridSection',
            _key: 'shareable-customer-ai',
            anchorId: 'shareable',
            heading: 'Shareable Content',
            columns: 2,
            features: [
              {
                title: 'Gladly One Pager',
                description: 'One-page overview for quick reference',
                link: '#'
              },
              {
                title: 'Customer AI One Pager',
                description: 'AI-focused one-page summary',
                link: '#'
              },
              {
                title: 'External Customer Branded',
                description: 'Branded materials for customer-facing use',
                link: '#'
              },
              {
                title: "Buyer's Guide or XLSX site",
                description: "Comprehensive buyer's guide and resources",
                link: '#'
              },
              {
                title: 'Email to Gladly on AI ...',
                description: 'Email templates for AI discussions',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // PR Section
          {
            _type: 'featureGridSection',
            _key: 'pr-customer-ai',
            anchorId: 'pr',
            heading: 'PR',
            columns: 2,
            features: [
              {
                title: 'WIRED article',
                description: 'Featured coverage in WIRED magazine',
                link: '#'
              },
              {
                title: 'Fortune Access',
                description: 'Fortune magazine feature and analysis',
                link: '#'
              },
              {
                title: 'Further News',
                description: 'Additional press coverage and mentions',
                link: '#'
              }
            ]
          },
          // Enablement Section
          {
            _type: 'featureGridSection',
            _key: 'enablement-customer-ai',
            anchorId: 'enablement',
            heading: 'Enablement',
            columns: 2,
            features: [
              {
                title: 'Customer AI Nametrix Training',
                description: 'Training session on AI capabilities',
                link: '#'
              },
              {
                title: 'Connection of the Message to the',
                description: 'Messaging framework and guidelines',
                link: '#'
              },
              {
                title: 'Rebranding FAQ',
                description: 'Frequently asked questions about rebrand',
                link: '#'
              },
              {
                title: 'Sidekick AI Demo Integrations',
                description: 'Demo integration guides and examples',
                link: '#'
              },
              {
                title: '2025 GKO',
                description: 'Go-to-market kickoff materials',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta-customer-ai',
            heading: 'Need Help With Customer AI?',
            subheading: "Can't find what you're looking for? Reach out to the enablement team",
            buttons: [
              { label: 'Ask in #enablement-resources', link: '#', variant: 'primary' },
              { label: 'Browse All Products', link: '#', variant: 'secondary' }
            ]
          }
        ]
      },

      // 6. Guides and Journeys
      {
        _id: 'page-product-guides-journeys',
        _type: 'page',
        title: 'Guides and Journeys',
        slug: {
          _type: 'slug',
          current: 'product/guides-journeys'
        },
        quickNav: [
          { label: 'What it is', anchor: 'what-it-is' },
          { label: 'Content', anchor: 'content' },
          { label: 'Demo', anchor: 'demo' },
          { label: 'Enablement', anchor: 'enablement' }
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero-guides',
            badge: 'GUIDES AND JOURNEYS',
            heading: 'Guides and Journeys',
            subheading: 'Sidekick Guides and Journeys simplify AI setup and optimization, giving CX teams full control without technical skills. Guides offers a no-code interface to create and manage AI workflows while Journeys provides insights and analytics to continuously improve AI performance and outcomes.',
            buttons: [
              { label: 'Learn More', link: '#what-it-is', variant: 'primary' },
              { label: 'View Resources', link: '#content', variant: 'secondary' }
            ],
            colorScheme: 'green'
          },
          // What it is Section
          {
            _type: 'contentSection',
            _key: 'what-it-is-guides',
            anchorId: 'what-it-is',
            heading: 'What it is',
            content: [
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Sidekick Guides and Journeys simplify AI setup and optimization, giving CX teams full control without technical skills. Guides offers a no-code interface to create and manage AI workflows while Journeys provides insights and analytics to continuously improve AI performance and outcomes.'
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Why it matters: ',
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: 'AI is often hard to manage and optimize without technical help, leading to poor performance and frustrating customer experiences. Guides and Journeys remove complexity, letting CX teams quickly set up, monitor, and refine AI to deliver more effective and personalized support at scale.'
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: "Who it's for: ",
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: 'B2C Businesses and CX teams managing high volumes of support who need simple tools to configure and improve AI without relying on technical skills or external help.'
                }]
              }
            ],
            backgroundColor: 'black',
            launchStatus: {
              currentStage: 'Broader rollout',
              description: 'Guides and Journeys is in broader rollout and available to most customers.'
            }
          },
          // Key Capabilities
          {
            _type: 'featureGridSection',
            _key: 'capabilities-guides',
            heading: 'Key Capabilities',
            columns: 2,
            features: [
              {
                title: 'No Code AI Workflow Setup',
                description: 'Create and manage AI conversations without any coding'
              },
              {
                title: 'Continuous Performance Insights',
                description: 'Real-time analytics on AI effectiveness and customer satisfaction'
              },
              {
                title: 'Instant Updates and Optimization',
                description: 'Make changes to AI behavior instantly without technical support'
              },
              {
                title: 'Customer-Centric Workflow Design',
                description: 'Build workflows focused on customer needs and journeys'
              },
              {
                title: 'Seamless Feedback Loop',
                description: 'Continuous improvement based on real customer interactions'
              },
              {
                title: 'Multi-Channel Support',
                description: 'Deploy guides across all customer communication channels'
              },
              {
                title: 'Unified AI and Customer Context',
                description: 'Leverage full customer intelligence in every workflow'
              }
            ]
          },
          // Content Section
          {
            _type: 'featureGridSection',
            _key: 'content-guides',
            anchorId: 'content',
            heading: 'Content',
            columns: 3,
            features: [
              {
                title: 'Product One Pager: Guides',
                description: 'Quick reference guide for Guides product',
                link: '#'
              },
              {
                title: 'One Pager',
                description: 'General overview one-pager',
                link: '#'
              },
              {
                title: 'Deck Template Coming Soon',
                description: 'Presentation deck for customer conversations',
                link: '#'
              },
              {
                title: 'September Roadmap Deck',
                description: 'Product roadmap and upcoming features',
                link: '#'
              }
            ]
          },
          // Demo Section
          {
            _type: 'featureGridSection',
            _key: 'demo-guides',
            anchorId: 'demo',
            heading: 'Demo',
            columns: 2,
            features: [
              {
                title: 'Guides Sales Prototype',
                description: 'Interactive sales prototype demonstrating key features',
                link: '#'
              },
              {
                title: 'Demo Script JSON, late ...',
                description: 'Demo script and configuration files',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Enablement Section
          {
            _type: 'featureGridSection',
            _key: 'enablement-guides',
            anchorId: 'enablement',
            heading: 'Enablement',
            columns: 2,
            features: [
              {
                title: 'Foundational Training',
                description: 'Core training materials for Guides and Journeys',
                link: '#'
              },
              {
                title: 'Tactical Enablement',
                description: 'Hands-on tactical training and exercises',
                link: '#'
              },
              {
                title: 'April 2025 GTM AI Hands',
                description: 'Go-to-market training session recording',
                link: '#'
              },
              {
                title: '2025 GKO',
                description: 'Global kickoff materials and resources',
                link: '#'
              }
            ]
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta-guides',
            heading: 'Need Help With Guides and Journeys?',
            subheading: "Can't find what you're looking for? Reach out to the enablement team",
            buttons: [
              { label: 'Ask in #enablement-resources', link: '#', variant: 'primary' },
              { label: 'Browse All Products', link: '#', variant: 'secondary' }
            ]
          }
        ]
      },

      // 7. App Platform
      {
        _id: 'page-product-app-platform',
        _type: 'page',
        title: 'App Platform',
        slug: {
          _type: 'slug',
          current: 'product/app-platform'
        },
        quickNav: [
          { label: 'What it is', anchor: 'what-it-is' },
          { label: 'Available Apps', anchor: 'available-apps' },
          { label: 'Talk Tracks + Next Steps', anchor: 'talk-tracks' },
          { label: 'Content', anchor: 'content' },
          { label: 'Demo', anchor: 'demo' },
          { label: 'Technical Enablement', anchor: 'technical-enablement' },
          { label: 'Revenue Enablement', anchor: 'revenue-enablement' }
        ],
        pageBuilder: [
          // Hero Section
          {
            _type: 'heroSection',
            _key: 'hero-app-platform',
            badge: 'APP PLATFORM',
            heading: 'App Platform',
            subheading: "Gladly's App Platform is a low-code integration layer that connects external systems like order management, loyalty, and payment directly to Gladly's interface for agents and AI. Teams get faster setup, better service outcomes, and 'lower IT overhead.",
            buttons: [
              { label: 'Learn More', link: '#what-it-is', variant: 'primary' },
              { label: 'View Resources', link: '#content', variant: 'secondary' }
            ],
            colorScheme: 'green'
          },
          // What it is Section
          {
            _type: 'contentSection',
            _key: 'what-it-is-app-platform',
            anchorId: 'what-it-is',
            heading: 'What it is',
            content: [
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: "Gladly's App Platform is a low-code integration layer that connects external systems like order management, loyalty, and payment directly to Gladly's interface for agents and AI."
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: 'Why it matters: ',
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: "It eliminates tool-switching, gives agents full contact, and lets AI act on real data—teams get faster setup, better service outcomes, and 'lower IT overhead."
                }]
              },
              {
                _type: 'block',
                children: [{
                  _type: 'span',
                  text: "Who it's for: ",
                  marks: ['strong']
                }, {
                  _type: 'span',
                  text: 'For IT and CX teams at ecommerce high-tech customers who rely on multiple systems to support customers and need simple tools to unify data across agents and AI.'
                }]
              }
            ],
            backgroundColor: 'black',
            launchStatus: {
              currentStage: 'Open Access',
              description: 'App Platform is generally available and accessible to all customers.'
            }
          },
          // Key Capabilities
          {
            _type: 'featureGridSection',
            _key: 'capabilities-app-platform',
            heading: 'Key Capabilities',
            columns: 2,
            features: [
              {
                title: 'Bi-directional data sync (read and write)',
                description: 'Two-way data flow between Gladly and external systems'
              },
              {
                title: 'Real-time visibility in Hero and Sidekick',
                description: 'Live data accessible to both human agents and AI'
              },
              {
                title: '40+ pre-built integrations',
                description: 'Ready-to-use connections with popular business tools'
              },
              {
                title: 'Open APIs and SDK',
                description: 'Build custom integrations for unique requirements'
              },
              {
                title: 'Secure and compliant',
                description: 'Enterprise-grade security and data protection'
              }
            ]
          },
          // Available Apps
          {
            _type: 'featureGridSection',
            _key: 'available-apps-app-platform',
            anchorId: 'available-apps',
            heading: 'Available Apps',
            columns: 1,
            features: [
              {
                title: 'List of available apps',
                description: 'Browse all pre-built integrations and apps available on the platform',
                link: '#'
              }
            ]
          },
          // Talk Tracks + Next Steps
          {
            _type: 'featureGridSection',
            _key: 'talk-tracks-app-platform',
            anchorId: 'talk-tracks',
            heading: 'Talk Tracks + Next Steps',
            columns: 2,
            features: [
              {
                title: 'Next steps - Internal',
                description: 'Internal process and handoff documentation',
                link: '#'
              },
              {
                title: 'Next steps - External',
                description: 'Customer-facing implementation steps',
                link: '#'
              },
              {
                title: 'SC + CRM Talk Tracks',
                description: 'Solutions consulting and CRM conversation guides',
                link: '#'
              },
              {
                title: 'AE Talk Tracks',
                description: 'Account executive conversation frameworks',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Content Section
          {
            _type: 'featureGridSection',
            _key: 'content-app-platform',
            anchorId: 'content',
            heading: 'Content',
            columns: 3,
            features: [
              {
                title: '📄 START | Apps Platform 3...',
                description: 'Getting started guide for App Platform',
                link: '#'
              },
              {
                title: 'Templated Slides',
                description: 'Pre-built presentation templates',
                link: '#'
              },
              {
                title: 'September Roadmap Deck',
                description: 'Product roadmap and upcoming features',
                link: '#'
              }
            ]
          },
          // Demo Section
          {
            _type: 'featureGridSection',
            _key: 'demo-app-platform',
            anchorId: 'demo',
            heading: 'Demo',
            columns: 1,
            features: [
              {
                title: 'How to set up an App',
                description: 'Step-by-step demo of app configuration and setup',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // Technical Enablement
          {
            _type: 'featureGridSection',
            _key: 'technical-enablement-app-platform',
            anchorId: 'technical-enablement',
            heading: 'Technical Enablement',
            columns: 3,
            features: [
              {
                title: 'Product Enablement - ...',
                description: 'Technical product training materials',
                link: '#'
              },
              {
                title: 'Product Enablement - ...',
                description: 'Advanced technical enablement',
                link: '#'
              },
              {
                title: 'App Platform Technical En...',
                description: 'Platform architecture and technical overview',
                link: '#'
              },
              {
                title: 'App Platform Technical En...',
                description: 'Developer documentation and API guides',
                link: '#'
              },
              {
                title: 'App Platform for Hero Tech...',
                description: 'Hero integration technical guide',
                link: '#'
              },
              {
                title: 'App Platform for Hero Tech...',
                description: 'Advanced Hero platform configurations',
                link: '#'
              }
            ]
          },
          // Revenue Enablement
          {
            _type: 'featureGridSection',
            _key: 'revenue-enablement-app-platform',
            anchorId: 'revenue-enablement',
            heading: 'Revenue Enablement',
            columns: 2,
            features: [
              {
                title: 'Sidekick Email + ...',
                description: 'Revenue enablement for Email integrations',
                link: '#'
              },
              {
                title: '12/19/24: App Platform &...',
                description: 'Platform enablement session recording',
                link: '#'
              },
              {
                title: 'Session Folder',
                description: 'Complete enablement session materials',
                link: '#'
              }
            ],
            backgroundColor: 'gray'
          },
          // CTA Section
          {
            _type: 'ctaSection',
            _key: 'cta-app-platform',
            heading: 'Need Help With App Platform?',
            subheading: "Can't find what you're looking for? Reach out to the enablement team",
            buttons: [
              { label: 'Ask in #enablement-resources', link: '#', variant: 'primary' },
              { label: 'Browse All Products', link: '#', variant: 'secondary' }
            ]
          }
        ]
      }
    ];

    // Create or replace all product pages
    let successCount = 0;
    for (const page of productPages) {
      try {
        await adminClient.createOrReplace(page);
        successCount++;
        console.log(`Created/updated: ${page.title}`);
      } catch (error) {
        console.error(`Error creating ${page.title}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${successCount} of ${productPages.length} product pages`,
      pages: productPages.map(p => ({ id: p._id, title: p.title, slug: p.slug.current }))
    });

  } catch (error) {
    console.error('Error seeding product pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed product pages' },
      { status: 500 }
    );
  }
}
