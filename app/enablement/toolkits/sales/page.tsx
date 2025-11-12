export default function SalesToolkitPage() {
  const primaryActions = [
    { icon: '🎬', title: 'Prepare for Demo', desc: 'Get demo decks, environment guides, and scripts for your prospect' },
    { icon: '⚔️', title: 'Handle Competitor', desc: 'Battle cards, positioning, and responses for competitive situations' },
    { icon: '💰', title: 'Build Business Case', desc: 'ROI calculators, value frameworks, and customer proof points' },
    { icon: '📋', title: 'Run Sales Play', desc: 'Step-by-step playbooks for common sales scenarios' },
    { icon: '📞', title: 'Prep Discovery Call', desc: 'Question frameworks and qualification guides' },
    { icon: '🎓', title: 'Get Certified', desc: 'Training courses and certification programs' }
  ];

  const quickLinks = [
    { icon: '🆕', title: "What's New" },
    { icon: '⭐', title: 'Most Popular' },
    { icon: '❤️', title: 'My Favorites' },
    { icon: '🗺️', title: 'Product Roadmap' }
  ];

  const browseCategories = [
    {
      icon: '📊',
      title: 'By Sales Stage',
      links: [
        'Prospecting & Outreach',
        'Discovery & Qualification',
        'Demo & Presentation',
        'Proof of Value',
        'Negotiation & Close'
      ]
    },
    {
      icon: '📱',
      title: 'By Product',
      links: [
        'Sidekick Standalone',
        'Sidekick Sales',
        'Sidekick Voice',
        'Sidekick Email',
        'Full Platform (Hero + Sidekick)'
      ]
    },
    {
      icon: '📄',
      title: 'By Content Type',
      links: [
        'Battle Cards',
        'Demo Decks & Guides',
        'One-Pagers',
        'Playbooks',
        'Customer Stories'
      ]
    },
    {
      icon: '🏢',
      title: 'By Industry',
      links: [
        'Retail & E-commerce',
        'Beauty & Personal Care',
        'Travel & Hospitality',
        'Financial Services',
        'Healthcare'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#8C69F0] to-[#7B52D9] text-white py-16 px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[40px] font-bold mb-4">Sales Toolkit</h1>
          <p className="text-[18px] opacity-95 max-w-[800px] mx-auto">
            Everything you need to sell, demo, and close deals with Gladly
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-12">

        {/* CTA Banner */}
        <div className="bg-gradient-to-br from-[#8C69F0] to-[#7B52D9] text-white rounded-xl p-8 mb-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <span className="inline-block bg-white/20 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide mb-3">
              🚨 COMPETITIVE DEFENSE
            </span>
            <h3 className="text-2xl font-bold mb-2">Defend Against Sierra & Decagon Targeting Your Accounts</h3>
            <p className="text-[15px] opacity-95">
              Get the multithreading enablement, defense playbook, and technical buyer deck you need to protect deals and engage CTOs/CIOs
            </p>
          </div>
          <a href="/personas/cto-cio" className="bg-white text-[#8C69F0] px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#F3F3F3] transition-all duration-200 hover:-translate-y-0.5 shadow-md whitespace-nowrap">
            Access Defense Materials →
          </a>
        </div>

        {/* Primary Actions */}
        <div className="mb-12">
          <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-2">What do you need to do?</h2>
          <p className="text-[15px] text-[#252525] mb-8">Start with your task to get curated materials</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {primaryActions.map((action, idx) => (
              <a key={idx} href="#" className="bg-white p-8 rounded-xl border-2 border-[#DFDFDF] hover:border-[#009B00] hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center no-underline">
                <div className="text-[48px] mb-4">{action.icon}</div>
                <h3 className="text-[16px] font-bold text-[#0D0D0D] mb-3">{action.title}</h3>
                <p className="text-[13px] text-[#252525] leading-relaxed">{action.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-6">Quick Access</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickLinks.map((link, idx) => (
              <a key={idx} href="#" className="bg-[#F3F3F3] p-5 rounded-lg hover:bg-[#E5E5E5] transition-all duration-200 hover:-translate-y-0.5 text-center no-underline">
                <div className="text-[32px] mb-2">{link.icon}</div>
                <div className="text-[13px] font-semibold text-[#0D0D0D]">{link.title}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Browse Section */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-2">Browse All Resources</h2>
          <p className="text-[15px] text-[#252525] mb-6">Explore by sales stage, product, or content type</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {browseCategories.map((category, idx) => (
              <div key={idx} className="p-6 border-2 border-[#DFDFDF] rounded-lg hover:border-[#8C69F0] hover:bg-[#DFDFDF] transition-all duration-200">
                <h4 className="text-lg font-bold text-[#0D0D0D] mb-4">
                  {category.icon} {category.title}
                </h4>
                <ul className="space-y-2">
                  {category.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-[#8C69F0] hover:underline text-[13px] font-medium">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a href="/" className="text-[#009B00] hover:text-[#008000] font-semibold transition-colors duration-200">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
