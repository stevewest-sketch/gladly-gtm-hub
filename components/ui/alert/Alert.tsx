import React from 'react';
import { Button } from '../buttons';
import { gradients, type GradientType } from '@/lib/theme';

export interface AlertProps {
  badge?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  gradient?: GradientType;
  className?: string;
}

/**
 * Alert - Banner component for announcements, CTAs, etc.
 */
export function Alert({
  badge,
  title,
  description,
  buttonText,
  buttonLink,
  gradient = 'purple',
  className = '',
}: AlertProps) {
  return (
    <div
      className={`text-white rounded-xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 ${className}`}
      style={{ background: gradients[gradient] }}
    >
      <div className="flex-1">
        {badge && (
          <span className="inline-block bg-white/20 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide mb-3">
            {badge}
          </span>
        )}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        {description && (
          <p className="text-[15px] opacity-95">{description}</p>
        )}
      </div>
      {buttonText && buttonLink && (
        <Button
          href={buttonLink}
          variant="ghost"
          size="lg"
          className="bg-white text-[#8C69F0] hover:bg-[#F3F3F3] whitespace-nowrap"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
