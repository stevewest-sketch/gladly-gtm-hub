import { ReactNode } from 'react';
import { colors } from '@/lib/theme';

export interface InfoCalloutProps {
  icon?: string;
  title?: string;
  children: ReactNode;
  variant?: 'purple' | 'blue' | 'green' | 'orange' | 'neutral';
  className?: string;
}

/**
 * InfoCallout - Highlighted information box
 * Used for important messages, tips, warnings, etc.
 */
export function InfoCallout({
  icon,
  title,
  children,
  variant = 'purple',
  className = '',
}: InfoCalloutProps) {
  const variantStyles = {
    purple: {
      bg: 'bg-primary-purple-light',
      border: 'border-primary-purple',
      text: 'text-neutral-black',
    },
    blue: {
      bg: 'bg-primary-blue-light',
      border: 'border-primary-blue',
      text: 'text-neutral-black',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-primary-green',
      text: 'text-neutral-black',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-primary-orange',
      text: 'text-neutral-black',
    },
    neutral: {
      bg: 'bg-neutral-background',
      border: 'border-neutral-gray',
      text: 'text-neutral-black',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`${styles.bg} rounded-xl p-6 lg:p-8 border-b-4 ${styles.border} ${styles.text} ${className}`}
    >
      {(icon || title) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <span className="text-2xl">{icon}</span>}
          {title && <h3 className="text-lg lg:text-xl font-semibold">{title}</h3>}
        </div>
      )}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
