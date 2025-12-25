'use client';

import Link from 'next/link';
import { CatalogEntry } from '@/lib/types/catalog';
import styles from './CoECardV2.module.css';

interface CoECardV2Props {
  entry: CatalogEntry;
  variant?: 'hero' | 'standard';
}

// Badge color mapping for CoE types
const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  'proof-point': { bg: '#dbeafe', text: '#1e40af' },
  'best-practice': { bg: '#d1fae5', text: '#065f46' },
  'meeting-asset': { bg: '#f3e8ff', text: '#7c3aed' },
  'tool': { bg: '#fef3c7', text: '#b45309' },
  'playbook': { bg: '#ffe4e6', text: '#be123c' },
};

// Icons for different CoE types
const COE_ICONS: Record<string, string> = {
  'proof-point': '📊',
  'best-practice': '⭐',
  'meeting-asset': '🤝',
  'tool': '🧮',
  'playbook': '📖',
  'dashboard': '📈',
};

export function CoECardV2({ entry, variant = 'standard' }: CoECardV2Props) {
  const coeType = entry.coeType?.[0] || 'best-practice';
  const badgeColors = BADGE_COLORS[coeType] || { bg: '#f3f4f6', text: '#374151' };
  const icon = COE_ICONS[coeType] || '📄';
  const linkHref = entry.slug?.current ? `/coe-hub/${entry.slug.current}` : '#';

  // Hero variant - large featured card with gradient background
  if (variant === 'hero') {
    return (
      <Link href={linkHref} className={styles.heroCard}>
        <div className={styles.heroBadge}>{coeType.replace('-', ' ')}</div>
        <h3 className={styles.heroTitle}>{entry.title}</h3>
        <p className={styles.heroDescription}>{entry.description}</p>
        <div className={styles.heroMeta}>
          {entry.teams && entry.teams.length > 0 && `${entry.teams.join(', ')}`}
        </div>
      </Link>
    );
  }

  // Standard variant - clean card with large icon (Zendesk Play style)
  return (
    <Link href={linkHref} className={styles.coeCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{icon}</div>
        <span
          className={styles.cardBadge}
          style={{ backgroundColor: badgeColors.bg, color: badgeColors.text }}
        >
          {coeType.replace('-', ' ')}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{entry.title}</h3>

      {entry.description && (
        <p className={styles.cardDescription}>{entry.description}</p>
      )}

      <div className={styles.cardFooter}>
        {entry.teams && entry.teams.length > 0 && (
          <div className={styles.cardTeams}>
            {entry.teams.slice(0, 2).map(team => (
              <span key={team} className={styles.teamTag}>{team}</span>
            ))}
          </div>
        )}
        <span className={styles.cardCta}>View →</span>
      </div>
    </Link>
  );
}
