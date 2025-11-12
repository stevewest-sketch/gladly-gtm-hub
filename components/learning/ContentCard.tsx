import { BaseCard } from '@/components/ui';

interface ContentCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

export default function ContentCard({ title, icon, children }: ContentCardProps) {
  return (
    <BaseCard padding="md">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h4 className="text-lg font-bold mb-3 text-primary-purple">{title}</h4>
      <div className="text-[#0D0D0D] text-sm leading-relaxed">{children}</div>
    </BaseCard>
  );
}
