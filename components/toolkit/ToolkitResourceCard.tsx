import { BaseCard } from '@/components/ui';

interface ToolkitResourceCardProps {
  title: string;
  description: string;
  href?: string;
  linkText?: string;
  accentColor?: string;
}

export default function ToolkitResourceCard({
  title,
  description,
  href = '#',
  linkText = 'View Resource →',
  accentColor = '#8C69F0',
}: ToolkitResourceCardProps) {
  return (
    <BaseCard
      href={href}
      padding="md"
      className="flex flex-col hover:bg-[#E5E5E5]"
    >
      <h4 className="text-[15px] text-[#1a1a1a] font-semibold mb-2">
        {title}
      </h4>
      <p className="text-[13px] text-[#4A4A4A] mb-3 flex-grow">
        {description}
      </p>
      <span
        className="font-semibold text-[13px]"
        style={{ color: accentColor }}
      >
        {linkText}
      </span>
    </BaseCard>
  );
}
