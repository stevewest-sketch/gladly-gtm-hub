import { ReactNode } from 'react';
import ToolkitHero from './ToolkitHero';
import ToolkitSection from './ToolkitSection';
import ToolkitResourceCard from './ToolkitResourceCard';
import ToolkitQuickLinkCard from './ToolkitQuickLinkCard';

interface QuickLinkItem {
  icon: string;
  title: string;
}

interface ResourceItem {
  title: string;
  desc: string;
}

interface ToolkitSectionData {
  key: string;
  icon?: string;
  title: string;
  subtitle?: string;
  backgroundColor: 'white' | 'gray';
  gridCols: 2 | 3 | 4;
  type: 'quick-links' | 'resources';
  items: (QuickLinkItem | ResourceItem)[];
}

interface ToolkitPageMultiSectionProps {
  hero: {
    title: string;
    subtitle: string;
    gradient?: 'purple' | 'blue' | 'green' | 'orange';
  };
  sections: ToolkitSectionData[];
  accentColor?: string;
  children?: ReactNode;
}

export default function ToolkitPageMultiSection({
  hero,
  sections,
  accentColor = '#8C69F0',
  children,
}: ToolkitPageMultiSectionProps) {
  const getGridClass = (cols: number) => {
    const map = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
    };
    return map[cols as keyof typeof map] || 'md:grid-cols-3';
  };

  return (
    <div className="min-h-screen bg-white">
      <ToolkitHero {...hero} />

      <div className="max-w-[1200px] mx-auto px-10 py-12">
        {children}

        {sections.map((section) => (
          <ToolkitSection
            key={section.key}
            icon={section.icon}
            title={section.title}
            subtitle={section.subtitle}
            backgroundColor={section.backgroundColor}
          >
            <div className={`grid grid-cols-1 ${getGridClass(section.gridCols)} gap-4`}>
              {section.type === 'quick-links'
                ? (section.items as QuickLinkItem[]).map((item, idx) => (
                    <ToolkitQuickLinkCard
                      key={idx}
                      icon={item.icon}
                      title={item.title}
                    />
                  ))
                : (section.items as ResourceItem[]).map((item, idx) => (
                    <ToolkitResourceCard
                      key={idx}
                      title={item.title}
                      description={item.desc}
                      accentColor={accentColor}
                    />
                  ))
              }
            </div>
          </ToolkitSection>
        ))}

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
