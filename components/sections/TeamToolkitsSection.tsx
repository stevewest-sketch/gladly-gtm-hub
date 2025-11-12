import TeamToolkitCard from '../homepage/TeamToolkitCard';
import { GradientDivider } from '@/components/ui';

interface Toolkit {
  emoji: string;
  title: string;
  description: string;
  link: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

interface TeamToolkitsSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  toolkits: Toolkit[];
}

export default function TeamToolkitsSection({
  sectionTitle = 'Start with Your Role',
  sectionSubtitle = 'Everything you need, organized for your job',
  toolkits,
}: TeamToolkitsSectionProps) {
  if (!toolkits || toolkits.length === 0) return null;

  return (
    <>
      <GradientDivider gradient="purple" />

      <div className="mb-[50px]">
        <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-3">
          {sectionTitle}
        </h2>
        <p className="text-[14px] text-[#666666] mb-8">{sectionSubtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {toolkits.map((toolkit, index) => (
            <TeamToolkitCard
              key={index}
              emoji={toolkit.emoji}
              title={toolkit.title}
              description={toolkit.description}
              link={toolkit.link}
              color={toolkit.color}
            />
          ))}
        </div>
      </div>
    </>
  );
}
