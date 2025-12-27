'use client';

import Link from 'next/link';
import { CatalogEntry } from '@/lib/types/catalog';
import styles from './CoECardV2.module.css';

interface CoECardV2Props {
  entry: CatalogEntry;
  variant?: 'hero' | 'standard';
}

// Icons for different CoE types (matching design system v2.0)
const COE_ICONS: Record<string, string> = {
  'meeting-asset': '🎯',
  'best-practice': '⭐',
  'internal-best-practice': '⭐',
  'tool': '🛠️',
  'dashboard': '📊',
  'process-innovation': '💡',
  'proof-point': '📈',
  'playbook': '📚',
};

// Type display labels
const TYPE_LABELS: Record<string, string> = {
  'meeting-asset': 'Meeting Asset',
  'best-practice': 'Best Practice',
  'internal-best-practice': 'Best Practice',
  'tool': 'Tool',
  'dashboard': 'Dashboard',
  'process-innovation': 'Process Innovation',
  'proof-point': 'Proof Point',
  'playbook': 'Playbook',
};

// Access level mapping
type AccessLevel = 'public' | 'internal' | 'confidential';

export function CoECardV2({ entry, variant = 'standard' }: CoECardV2Props) {
  const coeType = entry.coeType?.[0] || 'best-practice';
  const icon = COE_ICONS[coeType] || '📄';
  const typeLabel = TYPE_LABELS[coeType] || coeType.replace(/-/g, ' ');

  // Determine access level (default to internal for CoE)
  const accessLevel: AccessLevel = (entry as any).access || 'internal';

  // Prefer externalUrl if available, otherwise use slug
  const linkHref = entry.externalUrl ||
    (entry.slug?.current ? `/coe-hub/${entry.slug.current}` : '#');
  const isExternal = !!entry.externalUrl;

  // Get CTA text based on CoE type
  const getCtaText = () => {
    switch (coeType) {
      case 'meeting-asset':
        return 'View Example →';
      case 'dashboard':
        return 'Open Dashboard →';
      case 'proof-point':
        return 'View Metrics →';
      case 'process-innovation':
        return 'View Process →';
      default:
        return 'View Example →';
    }
  };

  // Hero variant - large featured card with gradient background
  if (variant === 'hero') {
    return (
      <Link
        href={linkHref}
        className={styles.heroCard}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <div className={styles.heroBadge}>{typeLabel}</div>
        <h3 className={styles.heroTitle}>{entry.title}</h3>
        <p className={styles.heroDescription}>{entry.description}</p>
        <div className={styles.heroMeta}>
          {entry.teams && entry.teams.length > 0 && entry.teams.join(', ')}
        </div>
      </Link>
    );
  }

  // Standard variant - card with orange accent bar
  return (
    <Link
      href={linkHref}
      className={styles.coeCard}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {/* Orange accent bar */}
      <div className={styles.cardAccent} />

      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <span className={styles.cardIcon}>{icon}</span>
          <span className={styles.cardBadge}>{typeLabel}</span>
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
          <span className={styles.cardMeta}>
            <span className={`${styles.accessDot} ${styles[accessLevel]}`} />
            {accessLevel.charAt(0).toUpperCase() + accessLevel.slice(1)}
          </span>
          <span className={styles.cardCta}>{getCtaText()}</span>
        </div>
      </div>
    </Link>
  );
}
