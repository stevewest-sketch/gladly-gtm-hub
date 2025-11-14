'use client';

import { useState } from 'react';

export default function CenterOfExcellencePage() {
  const [activeTab, setActiveTab] = useState('All Resources');

  const roleResources = [
    {
      icon: '🔧',
      title: 'Implementation Teams',
      desc: 'Get customers live with expert deployment',
      links: ['Technical blueprint', 'Change management']
    },
    {
      icon: '🏆',
      title: 'Customer Success',
      desc: 'Drive adoption and optimize performance',
      links: ['Best practice documents', 'QBR resources']
    },
    {
      icon: '⚙️',
      title: 'Technical Teams',
      desc: 'Troubleshoot issues and build integrations',
      links: ['Integration playbooks', 'Advanced use-cases']
    },
    {
      icon: '📊',
      title: 'Sales & Field Teams',
      desc: 'Win deals with proven ROI and customer stories',
      links: ['Customer resources', 'Competitive intel']
    }
  ];

  const customerWins = [
    {
      icon: '📊',
      title: '89.9% FCR',
      desc: 'Leading outdoor retailer achieves industry-best First Contact Resolution with Sidekick Guides',
      meta: 'Key to Success: 3-5 days onboarding cadence with stakeholder role clarity'
    },
    {
      icon: '📈',
      title: '28% → 57%',
      desc: "Leading beauty retailer's AI adoption journey from skeptical to market-leading engagement",
      meta: 'Key to Success: Phased rollout with continuous A/B testing'
    },
    {
      icon: '💬',
      title: '77% Email Automation',
      desc: 'Fully-featured automation in less than 6 weeks from Sidekick Email pilot launch',
      meta: 'Key to Success: Smart consolidation of 6 tech stack tools'
    }
  ];

  const resourceLibrary = [
    // Chat Optimization
    {
      title: 'Chat Optimization Mastery',
      desc: "Complete guide to achieving 90% FCR in chat based on Ulta's journey and proven strategies from high-performing customers.",
      tag: 'Chat Optimization',
      meta: 'Path to 90% FCR',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.x15qpd8k7ww0'
    },
    // Email Excellence
    {
      title: 'Email Channel Excellence',
      desc: 'Thread management, WISMO integration, and optimization strategies that drive exceptional email performance.',
      tag: 'Best Practices',
      meta: 'Launch to 70%+ FCR',
      cta: 'View Guide →'
    },
    // Real CX Metrics
    {
      title: 'Real CX Metrics Framework',
      desc: 'Measuring customer experience effectively with metrics that actually matter to business outcomes.',
      tag: 'Best Practices',
      meta: 'What to measure',
      cta: 'View Framework →'
    },
    // A+R Operations
    {
      title: 'A+R Operational Tooling',
      desc: 'Best practices for operational excellence in Answers and Recommendations deployment.',
      tag: 'Best Practices',
      meta: 'Operational excellence',
      cta: 'View Guide →'
    },
    // Dashboards
    {
      title: 'Cross-Org Guides Dashboard',
      desc: 'Cross-organizational view of Guides performance across multiple teams and implementations for benchmarking and insights.',
      tag: 'Dashboards',
      cta: 'View Dashboard →',
      link: 'https://gladly.looker.com/dashboards/4218'
    },
    {
      title: 'Sidekick Answers and Guides Dashboard',
      desc: 'Combined dashboard showing performance metrics for both Sidekick Answers and Guides implementations.',
      tag: 'Dashboards',
      cta: 'View Dashboard →',
      link: 'https://gladly.looker.com/dashboards/4215'
    },
    {
      title: 'Sidekick Sales Resolutions Dashboard',
      desc: 'Resolution tracking and performance metrics for Sidekick Sales implementations with detailed analytics.',
      tag: 'Dashboards',
      cta: 'View Dashboard →',
      link: 'https://gladly.looker.com/dashboards/4266'
    },
    {
      title: 'How to Interpret Sidekick Guides Performance',
      desc: 'Guide to understanding and analyzing Sidekick Guides performance metrics, including Answer Threads Performance and key indicators.',
      tag: 'Dashboards',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1XANF2CXqwaMNooiz-raP4f0ukKQVyhcS2c_HEOkBffo/edit?tab=t.0#heading=h.a5cvact35pt3'
    },
    {
      title: 'How to Interpret Sidekick Answers and Guides Dashboard',
      desc: 'Comprehensive guide to interpreting Journeys for Guides Report, transaction thread performance, and usage over time trends.',
      tag: 'Dashboards',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1XANF2CXqwaMNooiz-raP4f0ukKQVyhcS2c_HEOkBffo/edit?tab=t.0#heading=h.uf7g68jyftcc'
    },
    {
      title: 'Sidekick Cross-Org Metrics',
      desc: 'Cross-organizational metrics dashboard showing top Sidekick customers, assisted conversation volume over time, and comparative analytics.',
      tag: 'Dashboards',
      cta: 'View Dashboard →',
      link: 'https://gladly.looker.com/dashboards/2634'
    },
    {
      title: 'Hex Answers Performance',
      desc: 'Hex-based analytics for Sidekick Answers performance tracking with detailed metrics and visualizations.',
      tag: 'Dashboards',
      cta: 'View Dashboard →',
      link: 'https://app.hex.tech/5fc41969-6b7a-495f-a378-414a6e730bc5/app/Answer-Threads-Performance-4DcbeTyciebU88GgbfPrRG/latest?tab=org-level'
    },
    {
      title: 'Hex Journey for Guides Report',
      desc: 'Journey analytics for Guides showing customer interaction patterns and guide effectiveness over time.',
      tag: 'Dashboards',
      cta: 'View Dashboard →',
      link: 'https://app.hex.tech/5fc41969-6b7a-495f-a378-414a6e730bc5/app/Journeys-for-Guides-Report-2a6f6vphifGwHLgxf1Gael/latest'
    },
    // Implementation
    {
      icon: '🚀',
      title: 'Rapid Value Realization Guide',
      desc: "Customer success patterns showing how top performers achieve 30%+ resolution in first 30 days. Includes timelines, benchmarks, and proven strategies from MaryRuth's, La Jolla Group, Hot Topic, and more.",
      tag: 'Implementation',
      meta: '15 min read',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.hou5gyam9uco'
    },
    {
      icon: '🔌',
      title: 'Integration Depth Playbook',
      desc: 'How technical capabilities drive resolution performance. Four levels of integration from read-only to full orchestration with customer examples from Chegg, Ulta, Tecovas, and Hot Topic.',
      tag: 'Implementation',
      meta: '18 min read',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.bymvtz37h9kt'
    },
    {
      icon: '🎯',
      title: 'Multi-Channel Optimization',
      desc: "Framework for scaling beyond single-channel success. La Jolla Group's rapid multi-channel deployment, Ulta's phased approach, and decision criteria for deployment models.",
      tag: 'Implementation',
      meta: '20 min read',
      cta: 'View Guide →'
    },
    {
      icon: '📋',
      title: 'Go-Live Checklist',
      desc: 'Comprehensive pre-launch checklist covering content preparation, technical setup, team readiness, and success metrics. Based on patterns from successful implementations.',
      tag: 'Implementation',
      meta: 'Quick reference',
      cta: 'View Checklist →'
    },
    {
      icon: '📧',
      title: 'Email Launch Framework',
      desc: 'Week-by-week launch strategy for email channel. From 0-10% soft launch through 100% deployment with optimization tactics at each phase.',
      tag: 'Implementation',
      meta: '12 min read',
      cta: 'View Guide →'
    },
    {
      icon: '💬',
      title: 'Chat Launch Framework',
      desc: 'Foundation-to-excellence roadmap for chat implementations. 30-60-90 day milestones with target resolution rates and feature deployment sequence.',
      tag: 'Implementation',
      meta: '14 min read',
      cta: 'View Guide →'
    },
    // Best Practices
    {
      icon: '📈',
      title: 'Daily Optimization Patterns',
      desc: 'How top performers sustain 70-90% resolution through consistent daily investment. Actual routines from Ulta (89.9% FCR), La Jolla Group (57%), Fetch (77%), and Chegg including time allocation and activities.',
      tag: 'Best Practices',
      meta: '12 min read',
      cta: 'View Guide →',
      link: 'https://docs.google.com/document/d/1aQPaIBAK4Hjw7LK1U_2m8vYKjnIiatT3urUnmUMh10s/edit?tab=t.t4y35o22uw75'
    },
    {
      icon: '💡',
      title: 'Best Practices Hub',
      desc: 'Centralized playbooks, strategies, and frameworks from Design, PS, TAM, Product and Engineering teams. Drive adoption, efficiency, and ROI.',
      tag: 'Best Practices',
      meta: 'Live resource',
      cta: 'Access Hub →',
      link: 'https://docs.google.com/document/d/17xw1-c5Is6tDT7mwR3ZejHhjlU1sanRfdiSjjQrgAbU/edit?tab=t.6jyoekj0psl#heading=h.ln4hvsxicr78'
    },
    // Troubleshooting
    {
      icon: '📋',
      title: 'Performance Drop Diagnostic Tree',
      desc: 'Systematic framework for diagnosing resolution drops >10 points. Four categories of root causes (Content Gaps, Technical Issues, Routing Problems, Measurement Issues) with step-by-step troubleshooting for each.',
      tag: 'Troubleshooting',
      meta: '20 min read',
      cta: 'View Guide →'
    },
    {
      icon: '⚠️',
      title: 'Top 10 Pitfalls Prevention',
      desc: 'Learn from others\' mistakes. Common implementation traps with real customer examples: first-person language triggers, "set and forget" mentality, bot traffic contamination, unclassified guides, and more.',
      tag: 'Troubleshooting',
      meta: '16 min read',
      cta: 'View Guide →'
    },
    {
      icon: '🚨',
      title: 'Rapid Response Troubleshooting',
      desc: 'Emergency response kit for sudden performance drops >15 points. Includes 15-30-60 minute checklists, minimal repro template, escalation criteria, and channel-specific diagnostics.',
      tag: 'Troubleshooting',
      meta: '30 min read',
      cta: 'View Guide →'
    },
    {
      icon: '🔍',
      title: 'Common Fixes Library',
      desc: '8 most common issues with implementation time and expected impact for each: content gaps, wrong intent match, integration auth failure, unclassified guides, bot traffic, and more.',
      tag: 'Troubleshooting',
      meta: 'Quick Fixes',
      cta: 'View Library →'
    },
    // Templates
    {
      icon: '📋',
      title: 'QBR Template',
      desc: 'Quarterly business review structure for customer success conversations including performance analysis, optimization opportunities, and expansion planning.',
      tag: 'Templates',
      cta: 'Download Template →'
    },
    {
      icon: '📊',
      title: 'Performance Review Framework',
      desc: 'Weekly and monthly performance review structure with key metrics, diagnostic questions, and action planning template.',
      tag: 'Templates',
      cta: 'Download Template →'
    },
    {
      icon: '🎯',
      title: 'Implementation Kickoff',
      desc: 'Kickoff meeting agenda and planning template for new Sidekick implementations including discovery questions and success criteria.',
      tag: 'Templates',
      cta: 'Download Template →'
    },
    {
      icon: '✅',
      title: 'Optimization Audit Checklist',
      desc: 'Comprehensive audit checklist for assessing customer optimization opportunities across content, routing, integrations, and team practices.',
      tag: 'Templates',
      cta: 'Download Template →'
    },
    {
      icon: '📊',
      title: 'Customer Presentation Best Practices',
      desc: 'Preface: Slide Design. Communicate Clearly and Impactfully. Best practices for creating customer-facing presentations that resonate.',
      tag: 'Templates',
      meta: 'Customer Meeting Examples',
      cta: 'Customer Presentation Best Practices →',
      link: 'https://docs.google.com/document/d/1iSyUqK4DJ20SntBW9sgy7pQrHY2RGDbArf6Aqyiy6TY/edit?tab=t.g3xbr9tk8abx#heading=h.dnz75twoxhkz'
    },
    {
      icon: '📁',
      title: 'Customer Asset Library',
      desc: 'FY25 Q2 - July 2025. Centralized repository of customer meeting assets including decks, ROI calculators, executive briefings, and more.',
      tag: 'Templates',
      meta: 'Customer Meeting Examples',
      cta: 'Customer Asset Library →',
      link: 'https://docs.google.com/spreadsheets/d/1F6hagYyIKi614gmOO7WedoCs2CItxOoCVepQTXQiWTQ/edit?gid=1403690311#gid=1403690311'
    },
    {
      icon: '📝',
      title: 'Customer Asset Submission Form',
      desc: 'Please submit your customer asset(s), including a customer meeting deck, ROI calculator, executive briefing doc, etc. to be included in our Customer Asset Library.',
      tag: 'Templates',
      meta: 'Customer Meeting Examples',
      cta: 'Asset Submission Form →',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLScT21C-U0bDh0wXbAYRttoNr1pZa-Dhk8UJZdmbhi3pzB7Fdw/viewform'
    },
    {
      icon: '📋',
      title: 'Sales to CSM Hand-Off Sheet',
      desc: 'Template for sales to CS handoff ensuring smooth transition. Includes objectives, handoff process, and key customer information.',
      tag: 'Templates',
      meta: 'Sales to CS Handoff',
      cta: 'Sales to CS Handoff Template →',
      link: 'https://docs.google.com/document/d/1M0rIA7QBIgUsW3FjVgtZDA_46g9ZYp0C8VQ_7NAHnpo/edit?tab=t.0#heading=h.cfwyuyvb0ol1'
    },
    {
      icon: '👓',
      title: 'Smith Optics Sales to CSM Hand-Off Sheet',
      desc: 'Real-world example of sales to customer success handoff. Shows handoff process and requirement sheet in action.',
      tag: 'Templates',
      meta: 'Sales to CS Handoff',
      cta: 'Smith Optics Example →'
    },
    {
      icon: '👟',
      title: 'Gladly Customer Handoff Form - Birkenstock',
      desc: 'Customer handoff form example from Birkenstock implementation showing detailed customer information, contacts, and implementation details.',
      tag: 'Templates',
      meta: 'Sales to CS Handoff',
      cta: 'Birkenstock Example →'
    }
  ];

  const tabs = ['All Resources', 'Best Practices', 'Dashboards', 'Implementation', 'Troubleshooting', 'Templates', 'Chat Optimization'];

  const filteredResources = resourceLibrary.filter(resource => {
    if (activeTab === 'All Resources') return true;
    return resource.tag === activeTab;
  });

  const workSteps = [
    {
      icon: '🔍',
      title: '1. Discover & Identify',
      desc: 'We continuously monitor customer implementations, identify breakthrough wins, and document innovative solutions that deliver exceptional results.'
    },
    {
      icon: '💡',
      title: '2. Extract Insights',
      desc: "Through data analysis and customer interviews, we extract the specific actions, configurations, and strategies that made the difference. We identify what's repeatable."
    },
    {
      icon: '📦',
      title: '3. Package & Publish',
      desc: 'We transform insights into actionable guides, playbooks, and best practices. Every resource is tested, approved for use, and made instantly accessible to the entire team.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="text-white py-12 px-10" style={{background: 'linear-gradient(135deg, #8C69F0 0%, #A080F0 50%, #B4A0F7 100%)'}}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[40px] font-bold mb-4">Center of Excellence</h1>
          <p className="text-[18px] max-w-[800px] mx-auto">
            Where customer wins become repeatable success. Discover proven strategies, benchmark performance, and accelerate AI adoption.
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white py-5 px-10 sticky top-0 z-[100] shadow-sm">
        <div className="flex gap-3 justify-center items-center flex-wrap max-w-[1200px] mx-auto">
          <a href="#assistant" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            CoE Assistant
          </a>
          <a href="#wins" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Proof Points & Wins
          </a>
          <a href="#roles" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Find Resources
          </a>
          <a href="#library" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Resource Library
          </a>
          <a href="#how-it-works" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            How CoE Works
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-12">

        {/* Meet Your CoE Assistant */}
        <div id="assistant" className="text-white rounded-xl p-12 mb-12 scroll-mt-24" style={{background: 'linear-gradient(135deg, #8C69F0 0%, #A080F0 100%)'}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-[18px] font-bold mb-6">Meet Your CoE Assistant</h2>
              <p className="mb-6 opacity-95">Your AI-powered research tool that gives instant access to institutional knowledge across best practices, proof points, and past projects.</p>
              <ul className="list-none mb-6 space-y-3">
                {[
                  'Query our entire knowledge base with conversational AI',
                  'Find reference materials across our teams instantly',
                  'Get instant answers to specific implementation questions',
                  'Access customer case studies and success metrics',
                  'Locate custom code for prospects and customers'
                ].map((item, i) => (
                  <li key={i} className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:font-bold">
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://gemini.google.com/gem/1Ni5NH8lMDJ7v_FCN6DdLo2irtn56cLJW?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#8C69F0] px-8 py-3.5 rounded font-semibold text-base border-2 border-white hover:bg-opacity-90 transition-all">
                Access CoE Assistant →
              </a>
            </div>
            <div className="bg-[#1a1a1a] bg-opacity-90 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-6">
              <h4 className="text-base font-semibold mb-3">Example Query</h4>
              <p className="text-sm mb-3 opacity-95">
                <strong>You:</strong> "How does good quality in an AI prompt improve Sidekick performance?"
              </p>
              <p className="text-sm opacity-95 leading-relaxed">
                <strong>CoE Assistant:</strong> "Based on our analysis of 33 accounts, good quality in prompts is absolutely critical to Sidekick's ability to learn, scale, and deliver optimal results. Well-written prompts must be concise yet complete, written from the user's perspective, and tagged for searchability. Our data shows that implementing structured templates (like the ones in the AI Writing Style Guide) can significantly increase both the reach and accuracy of AI-generated responses."
              </p>
            </div>
          </div>
        </div>

        {/* Proof Points & Customer Wins */}
        <div id="wins" className="bg-white rounded-xl p-8 mb-12 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[#DFDFDF]">
            <span className="text-[40px]">🏆</span>
            <div>
              <h2 className="text-[18px] text-[#1a1a1a] font-semibold mb-1">Proof Points</h2>
              <p className="text-sm text-[#666]">Customer-approved metrics, testimonials, and success stories</p>
            </div>
          </div>

          {/* Proof Point Repository & Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <a href="https://docs.google.com/spreadsheets/d/1Y0n1rVskWIzWcegwCbfP7YUXkjV58TFf5S7LLxMkFNA/edit?gid=1725734072#gid=1725734072" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline">
              <div className="text-[36px] mb-3">🏆</div>
              <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-2.5">Proof Point Repository</h4>
              <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">Customer proof points: only use externally approved stats for written or verbal use! All proof points are tagged with permission status and include context for when and how to use them.</p>
              <span className="text-[#009B00] font-semibold text-sm">Access Repository →</span>
            </a>
            <a href="https://docs.google.com/presentation/d/1Los9XfjtmFBJbbcY5vUf9YuRhlDzocw5Y9wmJq9Slx8/edit?usp=drive_open&ouid=102926403603073320356" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline">
              <div className="text-[36px] mb-3">💬</div>
              <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-2.5">Social Proof Templates</h4>
              <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">Customer stories and testimonials formatted for different use cases: presentations, proposals, case studies, and website content.</p>
              <span className="text-[#009B00] font-semibold text-sm">View Templates →</span>
            </a>
          </div>

          {/* Latest Customer Wins */}
          <h3 className="text-[18px] font-semibold text-[#1a1a1a] mb-4 mt-6">Latest Customer Wins</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerWins.map((item, idx) => (
              <a key={idx} href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline">
                <div className="text-[36px] mb-3">{item.icon}</div>
                <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-2.5">{item.title}</h4>
                <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">{item.desc}</p>
                <div className="text-xs text-[#888] mb-3">{item.meta}</div>
                <span className="text-[#009B00] font-semibold text-sm">Read More →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Find Resources for Your Role */}
        <div id="roles" className="bg-white rounded-xl p-8 mb-12 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[#DFDFDF]">
            <span className="text-[40px]">👥</span>
            <div>
              <h2 className="text-[18px] text-[#1a1a1a] font-semibold mb-1">Find Resources for Your Role</h2>
              <p className="text-sm text-[#666]">Jump to content designed specifically for how you work with customers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleResources.map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">
                <div className="text-[36px] mb-3">{item.icon}</div>
                <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-4">{item.title}</h4>
                <p className="text-sm text-[#4A4A4A] mb-4">{item.desc}</p>
                <ul className="list-none p-0">
                  {item.links.map((link, i) => (
                    <li key={i} className="text-sm text-[#009B00] mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Your Wins CTA */}
        <div className="bg-gradient-to-br from-[#F3F3F3] to-[#DFDFDF] rounded-xl p-12 text-center mb-12">
          <div className="text-[48px] mb-4">🏆</div>
          <h2 className="text-[18px] text-[#0D0D0D] font-bold mb-3">Submit Your Wins in Slack!</h2>
          <p className="text-[16px] text-[#4A4A4A] mb-6">
            Type <code className="bg-white bg-opacity-80 px-2 py-1 rounded text-[#8C69F0] font-mono font-semibold">/coe</code> to access the form
          </p>
          <a href="#" className="inline-block bg-[#8C69F0] text-white px-8 py-3.5 rounded font-semibold text-base hover:bg-[#7B52D9] transition-all hover:-translate-y-0.5 border-2 border-[#8C69F0]">
            Tips for Submitting
          </a>
        </div>

        {/* CoE Resource Library */}
        <div id="library" className="bg-[#F3F3F3] py-12 px-10 -mx-10 mb-12 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] font-bold mb-2 text-[#0D0D0D]">CoE Resource Library</h2>
            <p className="text-base text-[#666] mb-8">Proven templates, guides, and playbooks organized for your needs</p>

            {/* Tabs */}
            <div className="flex gap-3 mb-8 pb-4 border-b-2 border-[#E0E0E0] flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-[#8C69F0] text-white'
                      : 'bg-transparent text-[#666] hover:bg-[#F3F3F3] hover:text-[#0D0D0D]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredResources.map((item, idx) => (
                <a key={idx} href={item.link || '#'} target={item.link ? '_blank' : '_self'} rel={item.link ? 'noopener noreferrer' : undefined} className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer no-underline flex flex-col">
                  {item.icon && <div className="text-[32px] mb-3">{item.icon}</div>}
                  {item.meta && <div className="text-xs text-[#888] mb-2">{item.meta}</div>}
                  <h4 className="text-base font-bold text-[#0D0D0D] mb-2.5">{item.title}</h4>
                  <p className="text-[13px] text-[#666] mb-4 leading-relaxed flex-grow">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#009B00] font-semibold text-sm">{item.cta}</span>
                    <span className="bg-[#F3F3F3] text-[#8C69F0] px-3 py-1 rounded-full font-semibold text-xs">
                      {item.tag}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* How CoE Works */}
        <div id="how-it-works" className="bg-white rounded-xl p-8 mb-12 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[#DFDFDF]">
            <span className="text-[40px]">⚙️</span>
            <div>
              <h2 className="text-[18px] text-[#1a1a1a] font-semibold mb-1">How CoE Works</h2>
              <p className="text-sm text-[#666]">Our systematic approach to capturing and distributing success</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {workSteps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="text-[48px] mb-4">{step.icon}</div>
                <h4 className="text-[18px] font-bold text-[#0D0D0D] mb-3">{step.title}</h4>
                <p className="text-sm text-[#666] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#F3F3F3] to-[#DFDFDF] rounded-xl p-12 text-center">
          <h2 className="text-[18px] text-[#0D0D0D] font-bold mb-4">Share Your Customer Success</h2>
          <p className="text-[16px] text-[#4A4A4A] mb-7 max-w-[700px] mx-auto">
            Help us build the knowledge base. Your wins become everyone&apos;s wins.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="bg-[#8C69F0] text-white px-8 py-3.5 rounded font-semibold text-base hover:bg-[#7B52D9] transition-all hover:-translate-y-0.5 border-2 border-[#8C69F0]">
              Submit via Slack →
            </a>
            <a href="#" className="bg-white text-[#8C69F0] px-8 py-3.5 rounded font-semibold text-base border-2 border-[#8C69F0] hover:bg-[#8C69F0] hover:text-white transition-all">
              View Submission Tips
            </a>
            <a href="#" className="bg-white text-[#8C69F0] px-8 py-3.5 rounded font-semibold text-base border-2 border-[#8C69F0] hover:bg-[#8C69F0] hover:text-white transition-all">
              Get Help (Slack)
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <a href="/" className="text-[#009B00] hover:text-[#007A00] font-semibold">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
