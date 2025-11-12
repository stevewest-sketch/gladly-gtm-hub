import { BaseCard } from '@/components/ui';

interface ToolkitQuickLinkCardProps {
  icon: string;
  title: string;
  href?: string;
}

export default function ToolkitQuickLinkCard({
  icon,
  title,
  href = '#',
}: ToolkitQuickLinkCardProps) {
  return (
    <BaseCard
      href={href}
      padding="md"
      className="text-center bg-[#F3F3F3] hover:bg-[#E5E5E5]"
      hover={false}
    >
      <div className="text-[32px] mb-2">{icon}</div>
      <div className="text-[13px] font-semibold text-[#0D0D0D]">
        {title}
      </div>
    </BaseCard>
  );
}
