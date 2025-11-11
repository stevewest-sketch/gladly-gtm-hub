export default function PlaybooksPage() {
  const playbooks = [
    { icon: '🎯', title: 'Discovery to Demo', desc: 'Complete workflow from initial discovery call through product demonstration', updated: 'Updated Q4 2024' },
    { icon: '💼', title: 'Enterprise Sales', desc: 'Strategies for selling into large enterprises with complex buying processes', updated: 'Updated Oct 2024' },
    { icon: '🚀', title: 'SMB Quick Close', desc: 'Fast-cycle playbook for closing SMB deals in 30-60 days', updated: 'Updated Sep 2024' },
    { icon: '🔄', title: 'Renewal & Expansion', desc: 'Playbook for customer renewals and upsell opportunities', updated: 'Updated Q3 2024' },
    { icon: '⚡', title: 'Competitive Displacement', desc: 'Win deals away from Zendesk, Salesforce, and other competitors', updated: 'Updated Oct 2024' },
    { icon: '🎬', title: 'Demo to Close', desc: 'Post-demo follow-up through contract signature', updated: 'Updated Sep 2024' }
  ];

  const industryPlaybooks = [
    { icon: '🛍️', title: 'Retail & E-Commerce', desc: 'Positioning for online retailers and DTC brands', updated: 'Updated Q4 2024' },
    { icon: '💄', title: 'Beauty & Personal Care', desc: 'Playbook for beauty brands and subscription services', updated: 'Updated Oct 2024' },
    { icon: '✈️', title: 'Travel & Hospitality', desc: 'Strategies for travel, tourism, and hospitality companies', updated: 'Updated Sep 2024' },
    { icon: '🏦', title: 'Financial Services', desc: 'Approach for banks, fintechs, and insurance companies', updated: 'Updated Q3 2024' }
  ];

  const useCasePlaybooks = [
    { icon: '📦', title: 'Order Status (WISMO)', desc: 'Selling Sidekick for order tracking automation' },
    { icon: '🔄', title: 'Returns & Exchanges', desc: 'Positioning for return request handling' },
    { icon: '💰', title: 'Product Recommendations', desc: 'Sidekick Sales revenue-generation playbook' },
    { icon: '📞', title: 'Voice Automation', desc: 'Sidekick Voice phone support playbook' },
    { icon: '🎫', title: 'Account Management', desc: 'Password resets, profile updates, and account help' },
    { icon: '📅', title: 'Appointment Scheduling', desc: 'Booking and scheduling automation playbook' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-[50px] px-10 text-center" style={{background: 'linear-gradient(135deg, #6B46C1 0%, #8C69F0 50%, #A78BFA 100%)'}}>
        <h1 className="text-[48px] font-bold text-white mb-3">Sales Playbooks</h1>
        <p className="text-[18px] text-white max-w-[700px] mx-auto">
          Proven strategies and step-by-step guides for every stage of the sales process
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">
        {/* Core Sales Playbooks */}
        <div className="mb-[50px]">
          <div className="mb-[30px]">
            <h2 className="text-[28px] text-[#0D0D0D] font-bold mb-2">Core Sales Playbooks</h2>
            <p className="text-[15px] text-[#4A4A4A]">End-to-end guides for the complete sales cycle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playbooks.map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-[#F3F3F3] rounded-lg p-7 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="text-[36px] mb-4">{item.icon}</div>
                <h3 className="text-xl text-[#0D0D0D] font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A4A4A] mb-4 flex-grow leading-relaxed">{item.desc}</p>
                <div className="text-xs text-[#AAAAAA] mb-4 pb-4 border-b border-[#F3F3F3]">{item.updated}</div>
                <div className="flex gap-2">
                  <a href="#" className="flex-1 bg-[#8C69F0] text-white px-4 py-2.5 rounded text-sm font-semibold text-center hover:bg-[#7557d9] transition-colors">
                    View Playbook
                  </a>
                  <a href="#" className="flex-1 bg-white text-[#8C69F0] border-2 border-[#8C69F0] px-4 py-2.5 rounded text-sm font-semibold text-center hover:bg-[#F3F3F3] transition-colors">
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry-Specific Playbooks */}
        <div className="mb-[50px]">
          <div className="mb-[30px]">
            <h2 className="text-[28px] text-[#0D0D0D] font-bold mb-2">Industry-Specific Playbooks</h2>
            <p className="text-[15px] text-[#4A4A4A]">Vertical-focused approaches and positioning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryPlaybooks.map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-[#F3F3F3] rounded-lg p-7 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="text-[36px] mb-4">{item.icon}</div>
                <h3 className="text-xl text-[#0D0D0D] font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A4A4A] mb-4 flex-grow leading-relaxed">{item.desc}</p>
                <div className="text-xs text-[#AAAAAA] mb-4 pb-4 border-b border-[#F3F3F3]">{item.updated}</div>
                <div className="flex gap-2">
                  <a href="#" className="flex-1 bg-[#8C69F0] text-white px-4 py-2.5 rounded text-sm font-semibold text-center hover:bg-[#7557d9] transition-colors">
                    View Playbook
                  </a>
                  <a href="#" className="flex-1 bg-white text-[#8C69F0] border-2 border-[#8C69F0] px-4 py-2.5 rounded text-sm font-semibold text-center hover:bg-[#F3F3F3] transition-colors">
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Case Playbooks */}
        <div className="mb-[50px]">
          <div className="mb-[30px]">
            <h2 className="text-[28px] text-[#0D0D0D] font-bold mb-2">Use Case Playbooks</h2>
            <p className="text-[15px] text-[#4A4A4A]">Feature and solution-specific positioning guides</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCasePlaybooks.map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-[#F3F3F3] rounded-lg p-7 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="text-[36px] mb-4">{item.icon}</div>
                <h3 className="text-xl text-[#0D0D0D] font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A4A4A] mb-4 flex-grow leading-relaxed">{item.desc}</p>
                <a href="#" className="bg-[#8C69F0] text-white px-4 py-2.5 rounded text-sm font-semibold text-center hover:bg-[#7557d9] transition-colors">
                  View Playbook
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <a href="/" className="text-[#8C69F0] hover:text-[#6B46C1] font-semibold transition-colors duration-300">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
