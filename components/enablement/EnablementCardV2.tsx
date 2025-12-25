'use client';

import Link from 'next/link';
import { CatalogEntry } from '@/lib/types/catalog';
import styles from './EnablementCardV2.module.css';

interface EnablementCardV2Props {
  entry: CatalogEntry;
  variant?: 'hero' | 'standard';
}

// Badge class mapping for enablement categories
const BADGE_CLASSES: Record<string, string> = {
  'gtm-strategy': styles.badgeGtm,
  'product': styles.badgeProduct,
  'competitive': styles.badgeCompetitive,
  'technical': styles.badgeTechnical,
  'value-realization': styles.badgeValue,
  'partner': styles.badgePartner,
};

// Format icons
const FORMAT_ICONS: Record<string, string> = {
  'video': '▶️',
  'on-demand': '📹',
  'live-replay': '🎥',
  'slides': '📊',
  'document': '📄',
};

export function EnablementCardV2({ entry, variant = 'standard' }: EnablementCardV2Props) {
  const category = entry.enablementCategory?.[0] || 'product';
  const badgeClass = BADGE_CLASSES[category] || styles.badgeProduct;
  const linkHref = entry.slug?.current ? `/enablement-hub/${entry.slug.current}` : '#';

  // Hero variant - large featured card with gradient background
  if (variant === 'hero') {
    return (
      <Link href={linkHref} className={styles.heroCard}>
        <div className={styles.heroBadge}>{category.replace('-', ' ')}</div>
        <h3 className={styles.heroTitle}>{entry.title}</h3>
        <p className={styles.heroDescription}>{entry.description}</p>
        <div className={styles.heroMeta}>
          {entry.sessionDate && new Date(entry.sessionDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
          {entry.teams && entry.teams.length > 0 && ` • ${entry.teams.join(', ')}`}
        </div>
      </Link>
    );
  }

  // Standard variant - training card with dark header
  return (
    <Link href={linkHref} className={styles.trainingCard}>
      {/* Dark Header */}
      <div className={styles.trainingHeader}>
        <div className={styles.trainingHeaderTop}>
          {entry.sessionDate && (
            <div className={styles.trainingDate}>
              {new Date(entry.sessionDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          )}
          <span className={`${styles.trainingBadge} ${badgeClass}`}>
            {category.replace('-', ' ')}
          </span>
        </div>
        <h3 className={styles.trainingTitle}>{entry.title}</h3>
        {entry.teams && entry.teams.length > 0 && (
          <span className={styles.trainingTeam}>{entry.teams[0]}</span>
        )}
      </div>

      {/* White Body */}
      <div className={styles.trainingBody}>
        {entry.description && (
          <p className={styles.trainingDescription}>{entry.description}</p>
        )}

        {/* Format Tags */}
        <div className={styles.trainingFormats}>
          {entry.format && (
            <span className={styles.formatTag}>
              {FORMAT_ICONS[entry.format] || '📄'} {entry.format}
            </span>
          )}
          {entry.videoUrl && (
            <span className={styles.formatTag}>▶️ Video</span>
          )}
          {entry.slidesUrl && (
            <span className={styles.formatTag}>📊 Slides</span>
          )}
        </div>

        {/* CTA */}
        <div className={styles.trainingCta}>
          View Training <span>→</span>
        </div>
      </div>
    </Link>
  );
}
