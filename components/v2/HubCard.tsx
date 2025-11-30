'use client';

import Link from 'next/link';
import { useHub } from '@/components/providers/ThemeProvider';

/**
 * Badge configuration for the card
 */
interface CardBadge {
  label: string;
  variant?: string;
  bgColor?: string;
  textColor?: string;
}

/**
 * Tag configuration
 */
interface CardTag {
  label: string;
  variant?: 'sidekick' | 'classic' | 'voice' | 'default';
}

/**
 * HubCard Props
 */
interface HubCardProps {
  /** Resource title */
  title: string;
  /** Short description (~8 words) */
  description?: string;
  /** Link URL */
  href: string;
  /** Type label (gray, uppercase) - e.g., "DOCUMENT", "ON DEMAND" */
  type?: string;
  /** Type icon (optional) */
  typeIcon?: React.ReactNode;
  /** Colored badge */
  badge?: CardBadge;
  /** Duration in minutes (Enablement Hub) */
  duration?: number;
  /** Date string */
  date?: string;
  /** Tags (products, teams, etc.) */
  tags?: CardTag[];
  /** Whether this is a new item */
  isNew?: boolean;
  /** Whether this is featured */
  isFeatured?: boolean;
}

/**
 * Format duration in minutes to readable string
 */
function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Get tag colors based on variant
 */
function getTagColors(variant: CardTag['variant']): { bg: string; text: string } {
  switch (variant) {
    case 'sidekick':
      return { bg: 'bg-tag-sidekick-bg', text: 'text-tag-sidekick-text' };
    case 'classic':
      return { bg: 'bg-tag-classic-bg', text: 'text-tag-classic-text' };
    case 'voice':
      return { bg: 'bg-tag-voice-bg', text: 'text-tag-voice-text' };
    default:
      return { bg: 'bg-v2-gray-100', text: 'text-v2-gray-600' };
  }
}

/**
 * Clock Icon Component
 */
function ClockIcon() {
  return (
    <svg
      className="w-3 h-3 opacity-70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/**
 * HubCard Component (V2)
 *
 * A resource card displaying type, badge, title, description, metadata, and tags.
 * Automatically uses theme colors for hover states from CSS variables.
 *
 * @example
 * ```tsx
 * <HubCard
 *   title="Executive Business Review (EBR) Deck Template"
 *   description="Quarterly business review framework"
 *   href="/catalog/ebr-deck"
 *   type="PRESENTATION"
 *   badge={{ label: "Deck", bgColor: "#EFF6FF", textColor: "#3B82F6" }}
 *   date="Nov 16, 2025"
 *   tags={[
 *     { label: "Sidekick", variant: "sidekick" },
 *     { label: "Customer Success" }
 *   ]}
 * />
 * ```
 */
export function HubCard({
  title,
  description,
  href,
  type,
  typeIcon,
  badge,
  duration,
  date,
  tags = [],
  isNew,
  isFeatured,
}: HubCardProps) {
  const hub = useHub();

  return (
    <Link
      href={href}
      className="
        group block h-full
        bg-white border border-v2-gray-300 rounded-v2-lg
        p-4 transition-all duration-200
        hover:border-[var(--theme-primary)] hover:shadow-v2-card-hover hover:-translate-y-0.5
      "
    >
      {/* Type Label (gray, uppercase) */}
      {type && (
        <div className="flex items-center gap-1.5 mb-2">
          {typeIcon && <span className="opacity-60">{typeIcon}</span>}
          <span className="font-body text-v2-xs text-v2-gray-500 font-medium uppercase tracking-wide">
            {type}
          </span>
        </div>
      )}

      {/* Badge (colored) */}
      {badge && (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-v2-sm text-v2-sm font-medium mb-2"
          style={{
            backgroundColor: badge.bgColor || 'var(--theme-primary-light)',
            color: badge.textColor || 'var(--theme-primary-dark)',
          }}
        >
          {badge.label}
        </span>
      )}

      {/* Title */}
      <h3 className="font-display text-v2-lg font-semibold text-v2-gray-700 leading-tight mb-1 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="font-body text-v2-base text-v2-gray-600 mb-3 line-clamp-1">
          {description}
        </p>
      )}

      {/* Metadata (duration, date) */}
      <div className="flex items-center gap-3 text-v2-sm text-v2-gray-500 mb-3 mt-auto">
        {duration && (
          <span className="flex items-center gap-1">
            <ClockIcon />
            {formatDuration(duration)}
          </span>
        )}
        {date && <span>{date}</span>}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => {
            const { bg, text } = getTagColors(tag.variant);
            return (
              <span
                key={index}
                className={`px-2 py-0.5 rounded-v2-sm text-v2-xs font-medium ${bg} ${text}`}
              >
                {tag.label}
              </span>
            );
          })}
        </div>
      )}
    </Link>
  );
}

export type { HubCardProps, CardBadge, CardTag };
