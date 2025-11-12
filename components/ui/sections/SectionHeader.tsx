import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * SectionHeader - Consistent section header styling
 */
export function SectionHeader({
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-8 ${alignClass} ${className}`}>
      <h2 className="text-2xl font-bold text-[#0D0D0D] mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-[#252525]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
