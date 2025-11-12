import { ReactNode } from 'react';

interface ToolkitSectionProps {
  icon?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  backgroundColor?: 'white' | 'gray';
  className?: string;
}

export default function ToolkitSection({
  icon,
  title,
  subtitle,
  children,
  backgroundColor = 'white',
  className = '',
}: ToolkitSectionProps) {
  const bgClass = backgroundColor === 'gray' ? 'bg-[#F3F3F3]' : 'bg-white';
  const shadowClass = backgroundColor === 'white' ? 'shadow-sm' : '';

  return (
    <div className={`${bgClass} rounded-xl p-8 mb-6 ${shadowClass} ${className}`}>
      {(icon || subtitle) ? (
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[#DFDFDF]">
          {icon && <span className="text-[40px]">{icon}</span>}
          <div>
            <h2 className="text-[18px] text-[#1a1a1a] font-semibold mb-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[13px] text-[#4A4A4A]">{subtitle}</p>
            )}
          </div>
        </div>
      ) : (
        <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-2">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
