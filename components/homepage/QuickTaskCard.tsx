'use client';

import { BaseCard } from '@/components/ui';
import { colors } from '@/lib/theme';

interface QuickTaskCardProps {
  emoji: string;
  title: string;
  link: string;
}

export default function QuickTaskCard({
  emoji,
  title,
  link,
}: QuickTaskCardProps) {
  return (
    <BaseCard
      href={link}
      padding="md"
      className="flex items-center gap-4 border-l-[3px] border-l-primary-blue hover:bg-primary-blue-light"
    >
      <span className="text-[32px] flex-shrink-0">{emoji}</span>
      <div>
        <h4 className="text-base font-semibold text-[#1a1a1a]">{title}</h4>
      </div>
    </BaseCard>
  );
}
