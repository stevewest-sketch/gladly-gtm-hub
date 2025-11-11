import { client } from '@/lib/sanity';
import TrainingFilters from './TrainingFilters';

interface TrainingSession {
  _id: string;
  _type: 'trainingSession';
  title: string;
  dateDisplay: string;
  product: string;
  productLabel: string;
  description: string;
  duration: string;
  materials: string;
  dateFilter: string;
  link: string;
  tags?: string[];
}

async function getTrainingSessions() {
  const query = `*[_type == "trainingSession" && isActive == true] | order(date desc) {
    _id,
    _type,
    title,
    dateDisplay,
    product,
    productLabel,
    description,
    duration,
    materials,
    dateFilter,
    link,
    tags
  }`;

  return await client.fetch(query);
}

export default async function TrainingPage() {
  const sessions = await getTrainingSessions();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-[50px]" style={{background: 'linear-gradient(135deg, #6B46C1 0%, #8C69F0 50%, #A78BFA 100%)'}}>
        <div className="max-w-[1200px] mx-auto px-10 text-center">
          <h1 className="text-[48px] font-bold text-white mb-4">Training Hub</h1>
          <p className="text-[18px] text-white max-w-3xl mx-auto">
            Live session recordings and enablement materials
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">
        {/* Filters and Training Grid */}
        <TrainingFilters sessions={sessions} />

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
