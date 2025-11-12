import React from 'react';
import { tailwindClasses } from '@/lib/theme';

export interface BaseCardProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  hoverBorderColor?: string;
}

/**
 * BaseCard - Universal card component for all card variants
 * Provides consistent styling and hover effects across the design system
 */
export function BaseCard({
  children,
  href,
  onClick,
  padding = 'md',
  hover = true,
  className = '',
  hoverBorderColor = '#8C69F0',
}: BaseCardProps) {
  const baseClasses = tailwindClasses.card.base;
  const paddingClass = tailwindClasses.card.padding[padding];
  const hoverClasses = hover ? tailwindClasses.card.hover : '';

  // Custom hover border color if provided
  const customHoverStyle = hoverBorderColor !== '#8C69F0'
    ? { '--hover-border-color': hoverBorderColor } as React.CSSProperties
    : undefined;

  const combinedClassName = `${baseClasses} ${paddingClass} ${hoverClasses} ${className}`.trim();

  // Render as link if href is provided
  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        style={customHoverStyle}
      >
        {children}
      </a>
    );
  }

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={combinedClassName}
        style={customHoverStyle}
      >
        {children}
      </button>
    );
  }

  // Otherwise render as div
  return (
    <div className={combinedClassName} style={customHoverStyle}>
      {children}
    </div>
  );
}

/**
 * IconCard - Card with icon, title, and optional description
 * Common pattern used throughout the site
 */
export interface IconCardProps extends Omit<BaseCardProps, 'children'> {
  icon: string;
  title: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function IconCard({
  icon,
  title,
  description,
  orientation = 'vertical',
  ...cardProps
}: IconCardProps) {
  const isVertical = orientation === 'vertical';

  return (
    <BaseCard {...cardProps}>
      <div className={`flex ${isVertical ? 'flex-col items-center text-center' : 'flex-row items-start gap-4'}`}>
        <div className={`text-${isVertical ? '5xl' : '4xl'} ${isVertical ? 'mb-4' : ''}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#0D0D0D] mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[#252525] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
