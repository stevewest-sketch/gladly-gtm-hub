'use client';

import { BaseCard } from '@/components/ui';
import { colors } from '@/lib/theme';

interface TeamToolkitCardProps {
  emoji: string;
  title: string;
  description: string;
  link: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

export default function TeamToolkitCard({
  emoji,
  title,
  description,
  link,
  color,
}: TeamToolkitCardProps) {
  const colorMap = {
    blue: colors.primary.blue,
    purple: colors.primary.purple,
    green: colors.primary.orange, // 'sc' was mapped to orange in original
    orange: colors.primary.purple, // 'marketing' was mapped to purple in original
  };

  const topBarColor = colorMap[color];

  return (
    <BaseCard
      href={link}
      padding="lg"
      className="text-center relative overflow-hidden rounded-xl hover:bg-primary-purple-light"
    >
      {/* Top color bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-full group-hover:opacity-10"
        style={{ backgroundColor: topBarColor }}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="text-5xl mb-4 block">{emoji}</span>
        <h3 className="text-[22px] font-semibold text-[#1a1a1a] mb-2">{title}</h3>
        <p className="text-sm text-[#666] leading-tight">{description}</p>
      </div>
    </BaseCard>
  );
}
