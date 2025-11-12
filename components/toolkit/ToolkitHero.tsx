import { gradients } from '@/lib/theme';

interface ToolkitHeroProps {
  title: string;
  subtitle: string;
  gradient?: 'purple' | 'blue' | 'green' | 'orange';
}

export default function ToolkitHero({
  title,
  subtitle,
  gradient = 'purple',
}: ToolkitHeroProps) {
  return (
    <div
      className="text-white py-16 px-10"
      style={{ background: gradients[gradient] }}
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <h1 className="text-[40px] font-bold mb-4">{title}</h1>
        <p className="text-[18px] opacity-95 max-w-[800px] mx-auto">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
