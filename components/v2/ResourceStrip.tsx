'use client';

import { CompactCard, CompactCardProps } from './CompactCard';

/**
 * ResourceStrip Props
 */
interface ResourceStripProps {
  /** Section title */
  title?: string;
  /** Badge showing count */
  badge?: string;
  /** Icon for the section header */
  icon?: string;
  /** Items to display */
  items: CompactCardProps[];
}

/**
 * ResourceStrip Component (V2)
 *
 * A horizontal scrolling strip for displaying new/recent resources.
 * Uses compact cards in a scrollable container.
 *
 * @example
 * ```tsx
 * <ResourceStrip
 *   title="New Resources"
 *   badge="4 new in 30 days"
 *   items={[
 *     { title: "Sierra Battlecard", href: "/catalog/sierra", type: "BATTLECARD", date: "Nov 20" },
 *     { title: "Platform Overview", href: "/catalog/overview", type: "ONE-PAGER", date: "Nov 18" },
 *   ]}
 * />
 * ```
 */
export function ResourceStrip({
  title = 'New Resources',
  badge,
  icon = '🆕',
  items,
}: ResourceStripProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-lg">{icon}</span>
        <h2 className="font-display text-v2-xl font-semibold text-v2-gray-700">
          {title}
        </h2>
        {badge && (
          <span
            className="
              font-body text-v2-xs font-medium
              px-2 py-0.5 rounded-full
              bg-[var(--theme-primary-light)] text-[var(--theme-primary)]
            "
          >
            {badge}
          </span>
        )}
      </div>

      {/* Scrollable Strip */}
      <div
        className="
          flex gap-3 overflow-x-auto pb-2
          scrollbar-thin scrollbar-thumb-v2-gray-300 scrollbar-track-v2-gray-100
        "
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        {items.map((item, index) => (
          <CompactCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

export type { ResourceStripProps };
