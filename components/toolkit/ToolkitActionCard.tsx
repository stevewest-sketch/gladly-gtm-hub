import { IconCard } from '@/components/ui';

interface ToolkitActionCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export default function ToolkitActionCard({
  icon,
  title,
  description,
  href = '#',
}: ToolkitActionCardProps) {
  return (
    <IconCard
      icon={icon}
      title={title}
      description={description}
      href={href}
      orientation="vertical"
      className="p-8"
    />
  );
}
