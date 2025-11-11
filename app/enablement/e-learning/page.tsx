import { client } from '@/lib/sanity';
import ELearningFilters from './ELearningFilters';

interface LearningModule {
  _id: string;
  _type: 'learningModule';
  title: string;
  slug: { current: string };
  category: 'competitive' | 'product' | 'process';
  moduleType: string;
  description: string;
  oneLiner: string;
  videoDuration?: number;
  lastUpdated: string;
  productTags?: string[];
}

async function getLearningModules() {
  const query = `*[_type == "learningModule" && isActive == true] | order(lastUpdated desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    category,
    moduleType,
    description,
    oneLiner,
    videoDuration,
    lastUpdated,
    productTags
  }`;

  return await client.fetch(query);
}

export default async function ELearningPage() {
  const modules = await getLearningModules();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-[50px]" style={{background: 'linear-gradient(135deg, #6B46C1 0%, #8C69F0 50%, #A78BFA 100%)'}}>
        <div className="max-w-[1200px] mx-auto px-10 text-center">
          <h1 className="text-[48px] font-bold text-white mb-4">E-Learning Hub</h1>
          <p className="text-[18px] text-white max-w-3xl mx-auto">
            Interactive learning modules and async training content
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">
        {/* Filters and Learning Grid */}
        <ELearningFilters modules={modules} />

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
