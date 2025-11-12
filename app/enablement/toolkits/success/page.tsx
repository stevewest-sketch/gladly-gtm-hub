export default function SuccessToolkitPage() {
  const quickAccess = [
    { icon: '🎬', title: 'Demo Environments' },
    { icon: '📐', title: 'Solution Architecture' },
    { icon: '🔧', title: 'Technical Docs' },
    { icon: '⚔️', title: 'Competitive Intel' }
  ];

  const demoResources = [
    { title: 'Demo Microsite', desc: 'Central hub for all demo decks, scripts, and environments' },
    { title: 'Setup Instruction Guide', desc: 'How to configure and access demo environments for prospects' },
    { title: 'Demo Script Library', desc: 'Pre-written scripts for WISMO, returns, voice, and sales demos' },
    { title: 'Platform Demo Deck', desc: 'Full walkthrough of Hero + Sidekick together' },
    { title: 'Sidekick Standalone Demo', desc: 'Demo deck for prospects using existing helpdesk platforms' },
    { title: 'Discovery-to-Demo Framework', desc: 'Tailor your demo based on discovery insights and use cases' }
  ];

  const technicalResources = [
    { title: 'Solution Architecture Guide', desc: 'System architecture, data flows, and infrastructure overview' },
    { title: 'Security & Compliance', desc: 'Security whitepaper, certifications, and compliance documentation' },
    { title: 'Integration Specifications', desc: 'API docs, integration patterns, and technical requirements' },
    { title: 'Platform Migration Guide', desc: 'Technical playbooks for migrating from Zendesk, Salesforce, etc.' },
    { title: 'Technical FAQ Library', desc: 'Answers to common technical objections and questions' },
    { title: 'Implementation Timelines', desc: 'Typical deployment schedules and milestone templates' }
  ];

  const proofOfValue = [
    { title: 'POC Planning Guide', desc: 'Framework for scoping and structuring proof of concept engagements' },
    { title: 'Success Criteria Template', desc: 'Define measurable outcomes and evaluation criteria for POCs' },
    { title: 'POC Environment Setup', desc: 'How to provision and configure trial environments for prospects' },
    { title: 'POC Readout Template', desc: 'Present POC results and business impact to stakeholders' }
  ];

  const competitiveIntel = [
    { title: 'Zendesk Battle Card', desc: 'Positioning, technical differentiators, and objection handling' },
    { title: 'Salesforce Service Cloud', desc: 'How to win against Einstein and Service Cloud implementations' },
    { title: 'Kustomer Battle Card', desc: 'Key differentiators and competitive positioning strategies' },
    { title: 'Intercom Positioning', desc: 'Win against chat-focused solutions with full platform value' },
    { title: 'Voice AI Competitors', desc: 'Positioning vs. PolyAI, Replicant, and other voice-only solutions' },
    { title: 'AI Startup Landscape', desc: 'Sierra, Decagon, and other AI-native competitor positioning' }
  ];

  const discoveryScoping = [
    { title: 'Discovery Question Bank', desc: 'Technical and business discovery questions by use case' },
    { title: 'Technical Qualification', desc: 'Framework for assessing technical fit and implementation complexity' },
    { title: 'Scoping Worksheet', desc: 'Capture requirements, integrations, and success criteria' },
    { title: 'Integration Discovery', desc: 'Questions to uncover CRM, e-commerce, and other integrations' },
    { title: 'Strategic Discovery Playbook', desc: 'Uncover business outcomes and executive priorities' },
    { title: 'Use Case Mapping', desc: 'Match customer needs to Gladly capabilities and features' }
  ];

  const trainingCertification = [
    { title: 'SC Certification Program', desc: 'Complete training path for Solutions Consultant certification' },
    { title: 'Product Deep Dives', desc: 'Technical training on Customer AI, Sidekick products, and Hero platform' },
    { title: 'Demo Training Recordings', desc: 'Learn demo best practices from top-performing SCs' },
    { title: 'SC Onboarding Path', desc: 'New hire curriculum covering products, tools, and processes' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#8C69F0] to-[#7557d9] text-white py-[60px] px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[48px] font-bold mb-4">SC Toolkit</h1>
          <p className="text-[20px] opacity-95 max-w-[800px] mx-auto">
            Win deals with technical expertise and compelling demonstrations
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">

        {/* Quick Access */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#D1FAE5]">
            <span className="text-[40px]">⚡</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Quick Access</h2>
              <p className="text-sm text-[#666]">Your most-used resources and demo environments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickAccess.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#D1FAE5] hover:border-[#10B981] transition-all hover:-translate-y-0.5 text-center no-underline">
                <div className="text-[32px] mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-[#0D0D0D]">{item.title}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Demo Resources */}
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#D1FAE5]">
            <span className="text-[40px]">🎬</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Demo Resources</h2>
              <p className="text-sm text-[#666]">Presentations, environments, and scripts for compelling demos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demoResources.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#D1FAE5] hover:border-[#10B981] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#10B981] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Technical Resources */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#D1FAE5]">
            <span className="text-[40px]">🔧</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Technical Resources</h2>
              <p className="text-sm text-[#666]">Architecture diagrams, security docs, and integration specs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {technicalResources.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#D1FAE5] hover:border-[#10B981] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#10B981] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Proof of Value */}
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#D1FAE5]">
            <span className="text-[40px]">🧪</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Proof of Value & POCs</h2>
              <p className="text-sm text-[#666]">Structure successful proof of concepts and pilots</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proofOfValue.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#D1FAE5] hover:border-[#10B981] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#10B981] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Competitive Intelligence */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#D1FAE5]">
            <span className="text-[40px]">⚔️</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Competitive Intelligence</h2>
              <p className="text-sm text-[#666]">Battle cards and positioning against key competitors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitiveIntel.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#D1FAE5] hover:border-[#10B981] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#10B981] font-semibold text-[13px]">View Card →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Discovery & Scoping */}
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#D1FAE5]">
            <span className="text-[40px]">🔍</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Discovery & Scoping</h2>
              <p className="text-sm text-[#666]">Qualify opportunities and uncover technical requirements</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {discoveryScoping.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#D1FAE5] hover:border-[#10B981] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#10B981] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Training & Certification */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#D1FAE5]">
            <span className="text-[40px]">🎓</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Training & Certification</h2>
              <p className="text-sm text-[#666]">Build expertise and stay current on products</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingCertification.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#D1FAE5] hover:border-[#10B981] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#10B981] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
