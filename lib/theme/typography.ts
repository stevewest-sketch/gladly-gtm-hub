/**
 * GTM Hub Design System - Typography Tokens
 * DM Sans for display, IBM Plex Sans for body
 */

/**
 * Font Families
 */
export const fontFamily = {
  display: 'var(--font-display), system-ui, sans-serif',
  body: 'var(--font-body), system-ui, sans-serif',
} as const;

/**
 * Font Sizes (from design spec)
 */
export const fontSize = {
  xs: '11px',    // Filter counts, compact meta
  sm: '12px',    // Tags, metadata, filter labels
  base: '13px',  // Body text, descriptions, filter options
  md: '14px',    // Subtitles, nav tabs
  lg: '15px',    // Card titles
  xl: '16px',    // Section titles
  '2xl': '18px', // Results count
  '3xl': '26px', // Page header title
} as const;

/**
 * Font Weights
 */
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Line Heights
 */
export const lineHeight = {
  tight: '1.4',
  normal: '1.5',
} as const;

/**
 * Typography presets for common use cases
 */
export const textStyles = {
  // Page Headers
  pageTitle: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
  },
  pageSubtitle: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.md,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
  },

  // Section Headers
  sectionTitle: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
  },

  // Cards
  cardTitle: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
  },
  cardDescription: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
  },
  cardMeta: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
  },

  // Tags & Badges
  tag: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  badge: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },

  // Filter Panel
  filterGroupTitle: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  filterOption: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
  },
} as const;
