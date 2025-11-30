'use client';

import Link from 'next/link';

/**
 * CompactCard Props
 */
interface CompactCardProps {
  /** Resource title */
  title: string;
  /** Link URL */
  href: string;
  /** Type label (uppercase) - e.g., "BATTLECARD", "ON DEMAND" */
  type?: string;
  /** Duration in minutes */
  duration?: number;
  /** Date string */
  date?: string;
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
 * CompactCard Component (V2)
 *
 * A slim card for horizontal scrolling strips (New Resources section).
 * Shows type, title, and brief metadata in a compact format.
 *
 * @example
 * ```tsx
 * <CompactCard
 *   title="Sierra Battlecard"
 *   href="/catalog/sierra-battlecard"
 *   type="BATTLECARD"
 *   date="Nov 20, 2025"
 * />
 * ```
 */
export function CompactCard({
  title,
  href,
  type,
  duration,
  date,
}: CompactCardProps) {
  // Build meta string
  const metaParts: string[] = [];
  if (duration) metaParts.push(formatDuration(duration));
  if (date) metaParts.push(date);
  const metaString = metaParts.join(' · ');

  return (
    <Link
      href={href}
      className="
        block min-w-[220px] flex-shrink-0
        bg-white border border-v2-gray-300 rounded-v2-md
        px-4 py-3
        transition-all duration-200
        hover:border-v2-gray-400 hover:bg-v2-gray-50
      "
    >
      {/* Type */}
      {type && (
        <span className="block font-body text-[10px] text-v2-gray-500 uppercase tracking-wide mb-1">
          {type}
        </span>
      )}

      {/* Title */}
      <h4 className="font-display text-v2-base font-semibold text-v2-gray-700 truncate mb-1">
        {title}
      </h4>

      {/* Meta */}
      {metaString && (
        <span className="font-body text-v2-xs text-v2-gray-500">
          {metaString}
        </span>
      )}
    </Link>
  );
}

export type { CompactCardProps };
