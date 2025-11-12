'use client';

import { BaseCard } from '@/components/ui';

interface WhatsNewCardProps {
  date: string;
  emoji: string;
  title: string;
  description: string;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

export default function WhatsNewCard({
  date,
  emoji,
  title,
  description,
  links,
}: WhatsNewCardProps) {
  return (
    <BaseCard padding="md" hover={false} className="border-b border-[#eeeeee] last:border-b-0 rounded-none">
      <div className="text-[13px] text-[#888] font-semibold mb-2">
        {date}
      </div>
      <div className="text-lg text-[#1a1a1a] font-semibold mb-2">
        <span className="mr-2">{emoji}</span>
        {title}
      </div>
      <div className="text-[15px] text-[#666] mb-3">
        {description}
      </div>
      {links && links.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-[#3B82F6] hover:text-[#1E40AF] hover:underline text-sm font-semibold transition-colors"
            >
              → {link.text}
            </a>
          ))}
        </div>
      )}
    </BaseCard>
  );
}
