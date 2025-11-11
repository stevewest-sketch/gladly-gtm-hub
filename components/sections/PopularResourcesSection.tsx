import QuickTaskCard from '../homepage/QuickTaskCard';

interface Resource {
  emoji: string;
  title: string;
  link: string;
}

interface PopularResourcesSectionProps {
  sectionTitle?: string;
  resources: Resource[];
}

export default function PopularResourcesSection({
  sectionTitle = 'Most Useful Resources',
  resources,
}: PopularResourcesSectionProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <>
      {/* Orange Gradient Divider */}
      <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #FFF7ED 0%, #F97316 50%, #FFF7ED 100%)'}}></div>

      <div className="mb-[50px]">
        <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-6">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="resource-card bg-white p-5 rounded-lg border-l-[3px] border-[#F97316] hover:bg-[#FED7AA] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4"
            >
              <span className="text-[32px] flex-shrink-0">{resource.emoji}</span>
              <h4 className="text-[16px] font-semibold text-[#0D0D0D]">{resource.title}</h4>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
