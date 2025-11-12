import React from 'react';
import { gradients, type GradientType } from '@/lib/theme';

export interface SectionDividerProps {
  gradient?: GradientType;
  className?: string;
}

/**
 * SectionDivider - Gradient divider used between sections
 */
export function SectionDivider({
  gradient = 'purple',
  className = ''
}: SectionDividerProps) {
  return (
    <div
      className={`h-1 mb-12 ${className}`}
      style={{ background: gradients[gradient] }}
    />
  );
}
