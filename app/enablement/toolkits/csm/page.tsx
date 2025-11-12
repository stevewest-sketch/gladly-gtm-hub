export default function CSMToolkitPage() {
  const primaryActions = [
    { icon: '📊', title: 'Prepare QBR', desc: 'Templates, best practices, and data storytelling guides for strategic reviews' },
    { icon: '💰', title: 'Build Business Case', desc: 'ROI calculators, value frameworks, and executive-ready materials' },
    { icon: '🚀', title: 'Drive Adoption', desc: 'Activation strategies, maturity models, and change management guides' },
    { icon: '📈', title: 'Expand Account', desc: 'Channel expansion playbooks, upsell strategies, and positioning materials' },
    { icon: '⚠️', title: 'Manage Risk', desc: 'Renewal strategies, escalation protocols, and save plays' },
    { icon: '🎯', title: 'Evangelize AI', desc: 'Sidekick positioning, Outcomes Velocity framework, and demo resources' }
  ];

  const quickLinks = [
    { icon: '🆕', title: "What's New" },
    { icon: '⭐', title: 'Most Popular' },
    { icon: '📌', title: 'Center of Excellence' },
    { icon: '🗺️', title: 'FY27 Vision' }
  ];

  const browseCategories = [
    {
      icon: '🎯',
      title: 'By Customer Stage',
      links: [
        'Onboarding & Activation',
        'Adoption & Value Realization',
        'Expansion & Upsell',
        'Renewal & Retention',
        'Advocacy & References'
      ]
    },
    {
      icon: '📱',
      title: 'By Product',
      links: [
        'Sidekick Standalone',
        'Sidekick Voice',
        'Sidekick Email',
        'Sidekick Sales',
        'Full Platform (Hero + Sidekick)'
      ]
    },
    {
      icon: '📄',
      title: 'By Resource Type',
      links: [
        'QBR Templates',
        'Success Plans',
        'ROI & Value Tools',
        'Adoption Playbooks',
        'Customer Stories'
      ]
    },
    {
      icon: '🏢',
      title: 'By Customer Segment',
      links: [
        'Enterprise Accounts',
        'Mid-Market',
        'SMB (New!)',
        'PAYG Customers',
        'Platform Migrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#8C69F0] to-[#7B52D9] text-white py-16 px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[40px] font-bold mb-4">CSM Toolkit</h1>
          <p className="text-[18px] opacity-95 max-w-[800px] mx-auto">
            Drive value, expansion, and advocacy with your customers
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-12">

        {/* Primary Actions */}
        <div className="mb-12">
          <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-2">What do you need to do?</h2>
          <p className="text-[15px] text-[#252525] mb-8">Start with your task to get curated resources</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {primaryActions.map((action, idx) => (
              <a key={idx} href="#" className="bg-white p-8 rounded-xl border-2 border-[#DFDFDF] hover:border-[#8C69F0] hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center no-underline">
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
          <p className="text-[15px] text-[#252525] mb-6">Explore by customer journey, product, or content type</p>

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
