import { ReactNode } from 'react';
import { colors } from '@/lib/theme';

export interface ContentSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  variant?: 'white' | 'light' | 'dark';
  fullWidth?: boolean;
  className?: string;
}

/**
 * ContentSection - Full-width section container
 * Provides consistent section styling with different background variants
 */
export function ContentSection({
  id,
  title,
  subtitle,
  children,
  variant = 'white',
  fullWidth = false,
  className = '',
}: ContentSectionProps) {
  const variantStyles = {
    white: 'bg-white',
    light: 'bg-neutral-background',
    dark: 'bg-neutral-black text-white',
  };

  const containerClass = fullWidth
    ? 'py-12 px-10 -mx-10 mb-12'
    : 'py-12 mb-12';

  return (
    <section
      id={id}
      className={`${variantStyles[variant]} ${containerClass} ${
        id ? 'scroll-mt-24' : ''
      } ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl lg:text-[26px] font-semibold mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-sm lg:text-base ${variant === 'dark' ? 'opacity-90' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
