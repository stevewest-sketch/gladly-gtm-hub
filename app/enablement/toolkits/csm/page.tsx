import { ToolkitHero, ToolkitActionCard, ToolkitQuickLinkCard, ToolkitSection } from '@/components/toolkit';
import { csmToolkitData } from '@/config/toolkits/csm';

export default function CSMToolkitPage() {
  const { hero, primaryActions, quickLinks, browseCategories } = csmToolkitData;

  return (
    <div className="min-h-screen bg-white">
      <ToolkitHero {...hero} />

      <div className="max-w-[1200px] mx-auto px-10 py-12">
        {/* Primary Actions */}
        <div className="mb-12">
          <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-2">What do you need to do?</h2>
          <p className="text-[15px] text-[#252525] mb-8">Start with your task to get curated resources</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {primaryActions.map((action, idx) => (
              <ToolkitActionCard
                key={idx}
                icon={action.icon}
                title={action.title}
                description={action.desc}
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <ToolkitSection title="Quick Access">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickLinks.map((link, idx) => (
              <ToolkitQuickLinkCard
                key={idx}
                icon={link.icon}
                title={link.title}
              />
            ))}
          </div>
        </ToolkitSection>

        {/* Browse Section */}
        <ToolkitSection
          title="Browse All Resources"
          subtitle="Explore by customer journey, product, or content type"
        >
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
        </ToolkitSection>

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
