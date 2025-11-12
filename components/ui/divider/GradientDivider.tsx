import { gradients, type GradientType } from '@/lib/theme';

export interface GradientDividerProps {
  gradient?: GradientType;
  height?: 'thin' | 'normal' | 'thick';
  marginBottom?: string;
  className?: string;
}

/**
 * GradientDivider - Reusable gradient divider component
 * Replaces repeated inline divider patterns
 */
export function GradientDivider({
  gradient = 'purple',
  height = 'normal',
  marginBottom = 'mb-[50px]',
  className = '',
}: GradientDividerProps) {
  const heightMap = {
    thin: 'h-0.5',
    normal: 'h-1',
    thick: 'h-2',
  };

  return (
    <div
      className={`${heightMap[height]} ${marginBottom} ${className}`}
      style={{ background: gradients[gradient] }}
    />
  );
}
