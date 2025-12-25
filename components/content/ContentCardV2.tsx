'use client';

import Link from 'next/link';
import { CatalogEntry } from '@/lib/types/catalog';
import styles from './ContentCardV2.module.css';

interface ContentCardV2Props {
  entry: CatalogEntry;
  variant?: 'hero' | 'standard';
}

// Badge color mapping for content types (matching HTML mock)
const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  // From mock
  'deck': { bg: '#dbeafe', text: '#1e40af' },
  'onepager': { bg: '#d1fae5', text: '#065f46' },
  'one-pager': { bg: '#d1fae5', text: '#065f46' },
  'battlecard': { bg: '#ffe4e6', text: '#be123c' },
  'template': { bg: '#fef3c7', text: '#b45309' },
  'tool': { bg: '#e0e7ff', text: '#4338ca' },
  'calculator': { bg: '#e0e7ff', text: '#4338ca' },
  'messaging': { bg: '#fce7f3', text: '#9d174d' },
  'script': { bg: '#fce7f3', text: '#9d174d' },
  // Additional types
  'case-study': { bg: '#dbeafe', text: '#1e40af' },
  'video': { bg: '#f3e8ff', text: '#7c3aed' },
  'guide': { bg: '#d1fae5', text: '#065f46' },
  'article': { bg: '#ffe4e6', text: '#be123c' },
  'webinar': { bg: '#e0e7ff', text: '#4338ca' },
  'slides': { bg: '#dbeafe', text: '#1e40af' },
  'document': { bg: '#f3f4f6', text: '#374151' },
};

// Icons for different content types (matching HTML mock)
const CONTENT_ICONS: Record<string, string> = {
  'deck': '📊',
  'onepager': '📄',
  'one-pager': '📄',
  'battlecard': '⚔️',
  'template': '📋',
  'tool': '🧰',
  'calculator': '🧮',
  'messaging': '💬',
  'script': '📝',
  'case-study': '📊',
  'video': '🎥',
  'guide': '📖',
  'article': '📄',
  'webinar': '🎓',
  'presentation': '📊',
  'slides': '📊',
  'document': '📄',
};

export function ContentCardV2({ entry, variant = 'standard' }: ContentCardV2Props) {
  const contentType = entry.contentType?.name || entry.format || 'article';
  const badgeColors = BADGE_COLORS[contentType] || { bg: '#f3f4f6', text: '#374151' };
  const icon = CONTENT_ICONS[contentType] || '📄';

  // Prefer externalUrl if available, otherwise use slug
  const linkHref = entry.externalUrl ||
    (entry.slug?.current ? `/content-hub/${entry.slug.current}` : '#');
  const isExternal = !!entry.externalUrl;

  // Hero variant - large featured card with gradient background
  if (variant === 'hero') {
    // Determine badge text based on display priority or content type
    const heroBadge = entry.displayPriority === 'hero'
      ? (entry.featured ? '✨ What\'s New' : '📊 Essential')
      : contentType.toUpperCase();

    return (
      <Link
        href={linkHref}
        className={styles.heroCard}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <div className={styles.heroBadge}>{heroBadge}</div>
        <h3 className={styles.heroTitle}>{entry.title}</h3>
        <p className={styles.heroDescription}>{entry.description}</p>
        <div className={styles.heroMeta}>
          {entry.teams && entry.teams.length > 0 && `${entry.teams.join(', ')}`}
        </div>
      </Link>
    );
  }

  // Standard variant - clean card with large icon
  return (
    <Link
      href={linkHref}
      className={styles.contentCard}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{icon}</div>
        <span
          className={styles.cardBadge}
          style={{ backgroundColor: badgeColors.bg, color: badgeColors.text }}
        >
          {contentType}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{entry.title}</h3>

      {entry.description && (
        <p className={styles.cardDescription}>{entry.description}</p>
      )}

      <div className={styles.cardFooter}>
        {entry.teams && entry.teams.length > 0 && (
          <div className={styles.cardMeta}>
            {entry.teams.slice(0, 2).map(team => (
              <span key={team} className={styles.metaTag}>{team}</span>
            ))}
          </div>
        )}
        <span className={styles.cardCta}>View →</span>
      </div>
    </Link>
  );
}
