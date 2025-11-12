import WhatsNewCard from '../homepage/WhatsNewCard';
import { GradientDivider } from '@/components/ui';
import { colors } from '@/lib/theme';

interface Update {
  date: string;
  emoji: string;
  title: string;
  description: string;
  links: Array<{ text: string; url: string }>;
}

interface WhatsNewSectionProps {
  badgeText?: string;
  updates: Update[];
}

export default function WhatsNewSection({
  badgeText = 'Oct 2025',
  updates,
}: WhatsNewSectionProps) {
  if (!updates || updates.length === 0) return null;

  return (
    <>
      <GradientDivider gradient="blue" />

      <div className="bg-white rounded-xl p-8 border-2 border-[#F3F3F3] mb-[50px]">
        <div className="flex justify-between items-center mb-6 pb-4" style={{borderBottom: `2px solid ${colors.primary.blue}`}}>
          <h2 className="text-[26px] font-semibold text-[#1a1a1a] flex items-center gap-2.5">
            <span>🆕</span> What&apos;s New
            <span className="text-white px-3 py-1 rounded-full text-xs font-semibold uppercase" style={{background: colors.primary.blueDark}}>
              {badgeText}
            </span>
          </h2>
        </div>

        {updates.slice(0, 3).map((update, index) => (
          <WhatsNewCard
            key={index}
            date={update.date}
            emoji={update.emoji}
            title={update.title}
            description={update.description}
            links={update.links}
          />
        ))}
      </div>
    </>
  );
}
