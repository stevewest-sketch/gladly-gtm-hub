import { client } from '@/lib/sanity';
import CompetitiveFilters from './CompetitiveFilters';

interface CompetitiveResource {
  _id: string;
  title: string;
  description: string;
  competitor: string;
  resourceType: string;
  icon: string;
  lastUpdated: string;
  link: string;
}

async function getCompetitiveResources() {
  const query = `*[_type == "competitiveResource"] | order(competitor asc, resourceType asc) {
    _id,
    title,
    description,
    competitor,
    resourceType,
    icon,
    lastUpdated,
    link
  }`;
  return await client.fetch(query);
}

export default async function CompetitivePage() {
  const resources = await getCompetitiveResources();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-[50px]" style={{background: 'linear-gradient(135deg, #6B46C1 0%, #8C69F0 50%, #A78BFA 100%)'}}>
        <div className="max-w-[1200px] mx-auto px-10 text-center">
          <h1 className="text-[48px] font-bold text-white mb-4">Competitive Battle Cards</h1>
          <p className="text-[18px] text-white max-w-3xl mx-auto">
            Everything you need to position against competitors and win competitive deals
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">
        {/* Filters and Resources Grid */}
        <CompetitiveFilters resources={resources} />

        {/* Additional Resources Section */}
        <div className="bg-[#F5F3FF] rounded-lg p-10 mt-12">
          <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-6">
            Additional Competitive Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-lg border-l-[3px] border-[#8C69F0] hover:bg-[#E8E0F8] transition-all duration-300">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-2">
                Win/Loss Analysis
              </h4>
              <p className="text-[13px] text-[#666666] mb-3">
                Insights from competitive deals won and lost
              </p>
              <a href="#" className="text-[#8C69F0] font-semibold text-[13px] hover:text-[#6B46C1] transition-colors duration-300">
                View Analysis →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-[3px] border-[#8C69F0] hover:bg-[#E8E0F8] transition-all duration-300">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-2">
                Competitive Playbooks
              </h4>
              <p className="text-[13px] text-[#666666] mb-3">
                Step-by-step strategies for displacing competitors
              </p>
              <a href="#" className="text-[#8C69F0] font-semibold text-[13px] hover:text-[#6B46C1] transition-colors duration-300">
                View Playbooks →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-[3px] border-[#8C69F0] hover:bg-[#E8E0F8] transition-all duration-300">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-2">
                Objection Handling
              </h4>
              <p className="text-[13px] text-[#666666] mb-3">
                Responses to common competitive objections
              </p>
              <a href="#" className="text-[#8C69F0] font-semibold text-[13px] hover:text-[#6B46C1] transition-colors duration-300">
                View Responses →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-[3px] border-[#8C69F0] hover:bg-[#E8E0F8] transition-all duration-300">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-2">
                Migration Stories
              </h4>
              <p className="text-[13px] text-[#666666] mb-3">
                Customer success stories from competitor switches
              </p>
              <a href="#" className="text-[#8C69F0] font-semibold text-[13px] hover:text-[#6B46C1] transition-colors duration-300">
                Browse Stories →
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a href="/" className="text-[#8C69F0] hover:text-[#6B46C1] font-semibold transition-colors duration-300">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
