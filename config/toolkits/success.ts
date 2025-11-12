export const successToolkitData = {
  hero: {
    title: 'SC Toolkit',
    subtitle: 'Win deals with technical expertise and compelling demonstrations',
    gradient: 'purple' as const,
  },

  accentColor: '#009B00', // Green accent for SC toolkit

  sections: [
    {
      key: 'quick-access',
      icon: '⚡',
      title: 'Quick Access',
      subtitle: 'Your most-used resources and demo environments',
      backgroundColor: 'gray' as const,
      gridCols: 4,
      type: 'quick-links' as const,
      items: [
        { icon: '🎬', title: 'Demo Environments' },
        { icon: '📐', title: 'Solution Architecture' },
        { icon: '🔧', title: 'Technical Docs' },
        { icon: '⚔️', title: 'Competitive Intel' }
      ]
    },
    {
      key: 'demo',
      icon: '🎬',
      title: 'Demo Resources',
      subtitle: 'Presentations, environments, and scripts for compelling demos',
      backgroundColor: 'white' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Demo Microsite', desc: 'Central hub for all demo decks, scripts, and environments' },
        { title: 'Setup Instruction Guide', desc: 'How to configure and access demo environments for prospects' },
        { title: 'Demo Script Library', desc: 'Pre-written scripts for WISMO, returns, voice, and sales demos' },
        { title: 'Platform Demo Deck', desc: 'Full walkthrough of Hero + Sidekick together' },
        { title: 'Sidekick Standalone Demo', desc: 'Demo deck for prospects using existing helpdesk platforms' },
        { title: 'Discovery-to-Demo Framework', desc: 'Tailor your demo based on discovery insights and use cases' }
      ]
    },
    {
      key: 'technical',
      icon: '🔧',
      title: 'Technical Resources',
      subtitle: 'Architecture diagrams, security docs, and integration specs',
      backgroundColor: 'gray' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Solution Architecture Guide', desc: 'System architecture, data flows, and infrastructure overview' },
        { title: 'Security & Compliance', desc: 'Security whitepaper, certifications, and compliance documentation' },
        { title: 'Integration Specifications', desc: 'API docs, integration patterns, and technical requirements' },
        { title: 'Platform Migration Guide', desc: 'Technical playbooks for migrating from Zendesk, Salesforce, etc.' },
        { title: 'Technical FAQ Library', desc: 'Answers to common technical objections and questions' },
        { title: 'Implementation Timelines', desc: 'Typical deployment schedules and milestone templates' }
      ]
    },
    {
      key: 'poc',
      icon: '🧪',
      title: 'Proof of Value & POCs',
      subtitle: 'Structure successful proof of concepts and pilots',
      backgroundColor: 'white' as const,
      gridCols: 2,
      type: 'resources' as const,
      items: [
        { title: 'POC Planning Guide', desc: 'Framework for scoping and structuring proof of concept engagements' },
        { title: 'Success Criteria Template', desc: 'Define measurable outcomes and evaluation criteria for POCs' },
        { title: 'POC Environment Setup', desc: 'How to provision and configure trial environments for prospects' },
        { title: 'POC Readout Template', desc: 'Present POC results and business impact to stakeholders' }
      ]
    },
    {
      key: 'competitive',
      icon: '⚔️',
      title: 'Competitive Intelligence',
      subtitle: 'Battle cards and positioning against key competitors',
      backgroundColor: 'gray' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Zendesk Battle Card', desc: 'Positioning, technical differentiators, and objection handling' },
        { title: 'Salesforce Service Cloud', desc: 'How to win against Einstein and Service Cloud implementations' },
        { title: 'Kustomer Battle Card', desc: 'Key differentiators and competitive positioning strategies' },
        { title: 'Intercom Positioning', desc: 'Win against chat-focused solutions with full platform value' },
        { title: 'Voice AI Competitors', desc: 'Positioning vs. PolyAI, Replicant, and other voice-only solutions' },
        { title: 'AI Startup Landscape', desc: 'Sierra, Decagon, and other AI-native competitor positioning' }
      ]
    },
    {
      key: 'discovery',
      icon: '🔍',
      title: 'Discovery & Scoping',
      subtitle: 'Qualify opportunities and uncover technical requirements',
      backgroundColor: 'white' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Discovery Question Bank', desc: 'Technical and business discovery questions by use case' },
        { title: 'Technical Qualification', desc: 'Framework for assessing technical fit and implementation complexity' },
        { title: 'Scoping Worksheet', desc: 'Capture requirements, integrations, and success criteria' },
        { title: 'Integration Discovery', desc: 'Questions to uncover CRM, e-commerce, and other integrations' },
        { title: 'Strategic Discovery Playbook', desc: 'Uncover business outcomes and executive priorities' },
        { title: 'Use Case Mapping', desc: 'Match customer needs to Gladly capabilities and features' }
      ]
    },
    {
      key: 'training',
      icon: '🎓',
      title: 'Training & Certification',
      subtitle: 'Build expertise and stay current on products',
      backgroundColor: 'gray' as const,
      gridCols: 2,
      type: 'resources' as const,
      items: [
        { title: 'SC Certification Program', desc: 'Complete training path for Solutions Consultant certification' },
        { title: 'Product Deep Dives', desc: 'Technical training on Customer AI, Sidekick products, and Hero platform' },
        { title: 'Demo Training Recordings', desc: 'Learn demo best practices from top-performing SCs' },
        { title: 'SC Onboarding Path', desc: 'New hire curriculum covering products, tools, and processes' }
      ]
    }
  ],
};
