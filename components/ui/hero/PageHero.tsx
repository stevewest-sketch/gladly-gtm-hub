import { ReactNode } from 'react';
import { gradients, type GradientType } from '@/lib/theme';

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  gradient?: GradientType;
  backLink?: {
    href: string;
    label: string;
  };
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * PageHero - Reusable hero section component
 * Used across multiple pages for consistent hero styling
 */
export function PageHero({
  title,
  subtitle,
  gradient = 'purple',
  backLink,
  badge,
  children,
  className = '',
}: PageHeroProps) {
  return (
    <div
      className={`text-white py-12 px-6 lg:px-10 ${className}`}
      style={{ background: gradients[gradient] }}
    >
      <div className="max-w-6xl mx-auto">
        {backLink && (
          <div className="mb-4">
            <a
              href={backLink.href}
              className="text-white hover:text-opacity-80 text-sm font-medium transition-opacity"
            >
              ← {backLink.label}
            </a>
          </div>
        )}

        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">{title}</h1>
            {subtitle && (
              <p className="text-base lg:text-lg opacity-90 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {badge && (
            <div className="flex-shrink-0">
              {badge}
            </div>
          )}
        </div>

        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
