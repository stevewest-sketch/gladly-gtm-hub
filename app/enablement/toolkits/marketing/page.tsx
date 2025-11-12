export default function MarketingToolkitPage() {
  const quickAccess = [
    { icon: '🎨', title: 'Brand Guidelines' },
    { icon: '📊', title: 'Marketing Dashboard' },
    { icon: '📸', title: 'Asset Library' },
    { icon: '🗓️', title: 'Campaign Calendar' }
  ];

  const campaignsPrograms = [
    { title: 'Active Campaign Hub', desc: 'Current campaigns, messaging, and go-to-market assets' },
    { title: 'Land Grab Campaign', desc: 'Materials for the Land Grab AI growth initiative' },
    { title: 'Project 500 Materials', desc: 'Resources supporting 500% YoY AI growth initiative' },
    { title: 'Demand Gen Programs', desc: 'Lead generation campaigns, webinars, and nurture tracks' },
    { title: 'ABM Campaign Materials', desc: 'Account-based marketing plays and personalized content' },
    { title: 'Partner Marketing', desc: 'Co-marketing materials and partner program resources' }
  ];

  const contentMessaging = [
    { title: 'Messaging Framework', desc: 'Core positioning, value props, and Outcomes Velocity narrative' },
    { title: 'Content Library', desc: 'Blog posts, whitepapers, case studies, and thought leadership' },
    { title: 'Customer Stories', desc: 'Case studies, testimonials, and success story templates' },
    { title: 'Product Messaging', desc: 'Positioning and messaging for each product line' },
    { title: 'Industry Content', desc: 'Vertical-specific messaging for retail, beauty, travel, healthcare' },
    { title: 'Thought Leadership', desc: 'Executive content, research reports, and industry insights' }
  ];

  const templatesTools = [
    { title: 'Email Templates', desc: 'Nurture sequences, event invites, and promotional email templates' },
    { title: 'Landing Page Templates', desc: 'Campaign landing pages, signup forms, and conversion pages' },
    { title: 'Social Media Templates', desc: 'LinkedIn, Twitter/X templates and content calendar' },
    { title: 'Presentation Templates', desc: 'Webinar decks, event presentations, and speaking templates' },
    { title: 'One-Pager Templates', desc: 'Product sheets, solution briefs, and sales collateral templates' },
    { title: 'Video Scripts', desc: 'Product demo scripts, customer testimonial guides, and video briefs' }
  ];

  const brandCreative = [
    { title: 'Brand Guidelines', desc: 'Complete brand guide including logo usage, colors, typography, and voice' },
    { title: 'Logo & Asset Library', desc: 'Company logos, product logos, icons, and brand marks in all formats' },
    { title: 'Photography & Imagery', desc: 'Brand photography, product shots, and stock image library' },
    { title: 'Design Templates', desc: 'Figma templates, presentation masters, and design systems' }
  ];

  const eventsWebinars = [
    { title: 'Event Marketing Kit', desc: 'Pre-event, during-event, and post-event marketing materials' },
    { title: 'Webinar Playbook', desc: 'End-to-end guide for planning and executing webinars' },
    { title: 'Trade Show Materials', desc: 'Booth design, swag, collateral, and pre-show campaigns' },
    { title: 'Virtual Event Platform', desc: 'Setup guides and best practices for virtual events' },
    { title: 'Speaker Resources', desc: 'Speaker briefs, talking points, and presentation tips' },
    { title: 'Event Calendar', desc: 'Upcoming events, speaking opportunities, and sponsorships' }
  ];

  const analyticsReporting = [
    { title: 'Marketing Dashboard', desc: 'Real-time metrics on campaigns, pipeline, and attribution' },
    { title: 'Campaign Performance', desc: 'Track engagement, conversion, and ROI by campaign' },
    { title: 'Website Analytics', desc: 'Traffic sources, page performance, and conversion analysis' },
    { title: 'Lead Quality Metrics', desc: 'MQL-to-SQL conversion, lead scoring, and attribution reporting' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#8C69F0] to-[#7557d9] text-white py-[60px] px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[48px] font-bold mb-4">Marketing Toolkit</h1>
          <p className="text-[20px] opacity-95 max-w-[800px] mx-auto">
            Content, campaigns, and creative resources to drive awareness and pipeline
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">

        {/* Quick Access */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">⚡</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Quick Access</h2>
              <p className="text-sm text-[#666]">Your most-used resources and active campaigns</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickAccess.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all hover:-translate-y-0.5 text-center no-underline">
                <div className="text-[32px] mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-[#0D0D0D]">{item.title}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Campaigns & Programs */}
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">🚀</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Campaigns & Programs</h2>
              <p className="text-sm text-[#666]">Active campaigns and marketing program resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaignsPrograms.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Content & Messaging */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">✍️</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Content & Messaging</h2>
              <p className="text-sm text-[#666]">Messaging frameworks, content library, and storytelling resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contentMessaging.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Templates & Tools */}
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">🛠️</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Templates & Tools</h2>
              <p className="text-sm text-[#666]">Ready-to-use templates for marketing execution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templatesTools.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Brand & Creative */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">🎨</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Brand & Creative Assets</h2>
              <p className="text-sm text-[#666]">Logos, design guidelines, and creative resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brandCreative.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Events & Webinars */}
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">🎤</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Events & Webinars</h2>
              <p className="text-sm text-[#666]">Event marketing materials and webinar resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eventsWebinars.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Resource →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Analytics & Reporting */}
        <div className="bg-[#F3F3F3] rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">📊</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Analytics & Reporting</h2>
              <p className="text-sm text-[#666]">Marketing metrics, dashboards, and performance tracking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsReporting.map((item, idx) => (
              <a key={idx} href="#" className="bg-white p-5 rounded-lg border-2 border-[#F3F3F3] hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all hover:-translate-y-0.5 flex flex-col no-underline">
                <h4 className="text-base text-[#1a1a1a] font-semibold mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#666] mb-3 flex-grow">{item.desc}</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Resource →</span>
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
