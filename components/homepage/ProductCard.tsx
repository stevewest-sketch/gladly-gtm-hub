'use client';

import { BaseCard } from '@/components/ui';

interface ProductCardProps {
  emoji: string;
  title: string;
  link: string;
}

export default function ProductCard({
  emoji,
  title,
  link,
}: ProductCardProps) {
  return (
    <BaseCard
      href={link}
      padding="md"
      className="text-center hover:bg-primary-purple-light"
    >
      <span className="text-4xl mb-3 block">{emoji}</span>
      <h4 className="text-[15px] font-semibold text-[#1a1a1a]">{title}</h4>
    </BaseCard>
  );
}
