'use client';

import { ReactNode } from 'react';
import { HubCard, HubCardProps } from './HubCard';

/**
 * FeaturedSection Props
 */
interface FeaturedSectionProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Featured items (up to 3) */
  items: Omit<HubCardProps, 'isFeatured'>[];
  /** Icon for the section header */
  icon?: string;
}

/**
 * FeaturedSection Component (V2)
 *
 * A featured content section with a highlighted background and 3-column grid.
 * Uses theme colors for the featured background via CSS variables.
 *
 * @example
 * ```tsx
 * <FeaturedSection
 *   title="Featured & New"
 *   subtitle="Recently added and hand-picked content"
 *   items={[
 *     { title: "EBR Deck Template", href: "/catalog/ebr", ... },
 *     { title: "Platform Overview", href: "/catalog/overview", ... },
 *     { title: "Briefing Template", href: "/catalog/briefing", ... },
 *   ]}
 * />
 * ```
 */
export function FeaturedSection({
  title = 'Featured & New',
  subtitle = 'Recently added and hand-picked content',
  items,
  icon = '⭐',
}: FeaturedSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="rounded-v2-lg p-6 mb-8"
      style={{
        background: 'var(--featured-bg)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--featured-border)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{icon}</span>
        <h2 className="font-display text-v2-xl font-semibold text-v2-gray-700">
          {title}
        </h2>
        <span className="font-body text-v2-base text-v2-gray-600 ml-1">
          — {subtitle}
        </span>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 3).map((item, index) => (
          <HubCard key={index} {...item} isFeatured />
        ))}
      </div>
    </section>
  );
}

export type { FeaturedSectionProps };
