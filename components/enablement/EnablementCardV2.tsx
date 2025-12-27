'use client';

import Link from 'next/link';
import { CatalogEntry } from '@/lib/types/catalog';
import styles from './EnablementCardV2.module.css';

interface EnablementCardV2Props {
  entry: CatalogEntry;
  variant?: 'hero' | 'standard';
}

// Category to tag class mapping
const CATEGORY_TAG_CLASSES: Record<string, string> = {
  'product': styles.tagProduct,
  'product-training': styles.tagProduct,
  'technical': styles.tagTechnical,
  'competitive': styles.tagCompetitive,
  'gtm-strategy': styles.tagGtmStrategy,
  'value-realization': styles.tagValueRealization,
  'playbook': styles.tagPlaybook,
  'certification': styles.tagCertification,
  'partner': styles.tagPartner,
  'internal-ops': styles.tagProduct,
  'demo-standards': styles.tagProduct,
};

// Category display labels
const CATEGORY_LABELS: Record<string, string> = {
  'product': 'Product',
  'product-training': 'Product',
  'technical': 'Technical',
  'competitive': 'Competitive',
  'gtm-strategy': 'GTM Strategy',
  'value-realization': 'Value Realization',
  'playbook': 'Playbook',
  'certification': 'Certification',
  'partner': 'Partner',
  'internal-ops': 'Internal Ops',
  'demo-standards': 'Demo Standards',
};

// Format display labels
const FORMAT_LABELS: Record<string, string> = {
  'video': 'Live Replay',
  'on-demand': 'On-Demand',
  'playbook': 'Playbook',
  'slides': 'Slides',
  'document': 'Document',
  'certification': 'Certification',
};

export function EnablementCardV2({ entry, variant = 'standard' }: EnablementCardV2Props) {
  const category = entry.enablementCategory?.[0] || 'product';
  const tagClass = CATEGORY_TAG_CLASSES[category] || styles.tagProduct;
  const categoryLabel = CATEGORY_LABELS[category] || category.replace(/-/g, ' ');
  const formatLabel = FORMAT_LABELS[entry.format || ''] || entry.format || 'Video';

  const linkHref = entry.slug?.current ? `/enablement-hub/${entry.slug.current}` : '#';

  // Format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Hero variant - large featured card with gradient background
  if (variant === 'hero') {
    return (
      <Link href={linkHref} className={styles.heroCard}>
        <div className={styles.heroBadge}>{categoryLabel}</div>
        <h3 className={styles.heroTitle}>{entry.title}</h3>
        <p className={styles.heroDescription}>{entry.description}</p>
        <div className={styles.heroMeta}>
          {formatDate(entry.sessionDate || entry.publishDate)}
          {entry.teams && entry.teams.length > 0 && ` • ${entry.teams.join(', ')}`}
        </div>
      </Link>
    );
  }

  // Standard variant - training card with dark header matching design system v2.0
  return (
    <Link href={linkHref} className={styles.trainingCard}>
      {/* Dark Header */}
      <div className={styles.trainingHeader}>
        <div className={styles.trainingHeaderTop}>
          {(entry.sessionDate || entry.publishDate) && (
            <span className={styles.trainingDate}>
              {formatDate(entry.sessionDate || entry.publishDate)}
            </span>
          )}
          <span className={styles.trainingFormat}>{formatLabel}</span>
        </div>

        <h4 className={styles.trainingTitle}>{entry.title}</h4>

        <div className={styles.trainingTags}>
          <span className={`${styles.trainingTag} ${tagClass}`}>
            {categoryLabel}
          </span>
          {entry.enablementCategory && entry.enablementCategory.length > 1 && (
            <span className={`${styles.trainingTag} ${CATEGORY_TAG_CLASSES[entry.enablementCategory[1]] || styles.tagProduct}`}>
              {CATEGORY_LABELS[entry.enablementCategory[1]] || entry.enablementCategory[1].replace(/-/g, ' ')}
            </span>
          )}
        </div>
      </div>

      {/* White Body */}
      <div className={styles.trainingBody}>
        {/* Product tag */}
        <span className={styles.trainingProduct}>
          {entry.products?.[0]?.name || 'Gladly'}
        </span>

        {entry.description && (
          <p className={styles.trainingDescription}>{entry.description}</p>
        )}

        <div className={styles.trainingFooter}>
          <span className={styles.trainingDuration}>
            {entry.duration ? `⏱ ${entry.duration}` : '⏱ 45 min'}
          </span>
          <span className={styles.trainingCta}>Start Learning →</span>
        </div>
      </div>
    </Link>
  );
}
