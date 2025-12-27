'use client';

import Link from 'next/link';
import { CatalogEntry } from '@/lib/types/catalog';
import styles from './ContentCardV2.module.css';

interface ContentCardV2Props {
  entry: CatalogEntry;
  variant?: 'hero' | 'standard';
}

// Icons for different content types (matching design system v2.0)
const CONTENT_ICONS: Record<string, string> = {
  'deck': '📊',
  'slides': '📊',
  'onepager': '📄',
  'one-pager': '📄',
  'battlecard': '⚔️',
  'template': '📋',
  'tool': '🧰',
  'calculator': '🧮',
  'messaging': '💬',
  'script': '📝',
  'sequence': '📧',
  'case-study': '📊',
  'video': '🎥',
  'guide': '📖',
  'article': '📰',
  'press': '📰',
  'webinar': '🎓',
  'presentation': '📊',
  'document': '📄',
  'report': '📊',
  'demo': '🎬',
  'checklist': '✅',
};

// Format display names
const FORMAT_LABELS: Record<string, string> = {
  'deck': 'Deck',
  'slides': 'Slides',
  'one-pager': 'One-Pager',
  'battlecard': 'Battlecard',
  'template': 'Template',
  'calculator': 'Calculator',
  'tool': 'Tool',
  'guide': 'Guide',
  'document': 'Document',
  'video': 'Video',
  'article': 'Article',
  'press': 'Press',
  'sequence': 'Sequence',
  'report': 'Report',
  'demo': 'Demo',
};

export function ContentCardV2({ entry, variant = 'standard' }: ContentCardV2Props) {
  const contentType = entry.contentType?.name?.toLowerCase() || entry.format || 'document';
  const icon = CONTENT_ICONS[contentType] || '📄';
  const formatLabel = FORMAT_LABELS[contentType] || contentType.replace('-', ' ');

  // Prefer externalUrl if available, otherwise use slug
  const linkHref = entry.externalUrl ||
    (entry.slug?.current ? `/content-hub/${entry.slug.current}` : '#');
  const isExternal = !!entry.externalUrl;

  // Get CTA text based on content type
  const getCtaText = () => {
    switch (contentType) {
      case 'deck':
      case 'slides':
        return 'View Deck →';
      case 'video':
        return 'Watch Video →';
      case 'calculator':
      case 'tool':
        return 'Open Tool →';
      case 'article':
      case 'press':
        return 'Read Article →';
      case 'template':
      case 'sequence':
        return 'View Template →';
      default:
        return 'View Doc →';
    }
  };

  // Hero variant - large featured card with gradient background
  if (variant === 'hero') {
    const heroBadge = entry.displayPriority === 'hero'
      ? (entry.featured ? '✨ What\'s New' : '📊 Essential')
      : formatLabel.toUpperCase();

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
          {entry.teams && entry.teams.length > 0 && entry.teams.join(', ')}
        </div>
      </Link>
    );
  }

  // Standard variant - clean card matching design system v2.0
  return (
    <Link
      href={linkHref}
      className={styles.contentCard}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <span className={styles.cardBadge}>{formatLabel}</span>
      </div>

      <h4 className={styles.cardTitle}>{entry.title}</h4>

      {entry.description && (
        <p className={styles.cardDescription}>{entry.description}</p>
      )}

      {entry.teams && entry.teams.length > 0 && (
        <div className={styles.cardTags}>
          {entry.teams.slice(0, 3).map(team => (
            <span key={team} className={styles.cardTag}>{team}</span>
          ))}
        </div>
      )}

      <div className={styles.cardFooter}>
        <span className={styles.metaTag}>
          {entry.products?.[0]?.name || 'Gladly'}
        </span>
        <span className={styles.cardCta}>{getCtaText()}</span>
      </div>
    </Link>
  );
}
