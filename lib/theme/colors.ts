/**
 * GTM Hub Design System - Color Tokens
 * Based on the design specification
 */

/**
 * New Gray Scale (replaces existing neutral colors for v2)
 */
export const gray = {
  50: '#F8F9FC',   // Page background
  100: '#F1F3F9',  // Tag background, hover states
  200: '#E8EBF2',  // Borders, dividers
  300: '#E2E6EF',  // Card borders
  400: '#CBD2E0',  // Hover borders
  500: '#8B93A7',  // Muted text
  600: '#5C6578',  // Secondary text
  700: '#1A1D26',  // Primary text
} as const;

/**
 * Hub Theme Colors
 */
export const hubColors = {
  content: {
    primary: '#7C3AED',
    primaryDark: '#6D28D9',
    primaryLight: '#F3E8FD',
  },
  enablement: {
    primary: '#16A34A',
    primaryDark: '#15803D',
    primaryLight: '#DCFCE7',
  },
} as const;

/**
 * Product Tag Colors (shared across hubs)
 */
export const productTagColors = {
  sidekick: {
    bg: '#FFF4E6',
    text: '#B45309',
  },
  classic: {
    bg: '#E8F4FD',
    text: '#1E6FA6',
  },
  voice: {
    bg: '#F3E8FD',
    text: '#7C3AED',
  },
} as const;

/**
 * Content Hub - Format Badge Colors
 */
export const contentBadgeColors = {
  document: {
    bg: '#F1F3F9',
    text: '#5C6578',
  },
  deck: {
    bg: '#EFF6FF',
    text: '#3B82F6',
  },
  onepager: {
    bg: '#D1FAE5',
    text: '#047857',
  },
  template: {
    bg: '#F3E8FD',
    text: '#8B5CF6',
  },
  kit: {
    bg: '#FEF3C7',
    text: '#B45309',
  },
  battlecard: {
    bg: '#FEE2E2',
    text: '#EF4444',
  },
} as const;

/**
 * Enablement Hub - Category Badge Colors
 */
export const enablementBadgeColors = {
  product: {
    bg: '#EFF6FF',
    text: '#3B82F6',
  },
  cert: {
    bg: '#FEF3C7',
    text: '#B45309',
  },
  allhands: {
    bg: '#EEF2FF',
    text: '#6366F1',
  },
  skills: {
    bg: '#FCE7F3',
    text: '#EC4899',
  },
  gtm: {
    bg: '#D1FAE5',
    text: '#047857',
  },
  partner: {
    bg: '#FEE2E2',
    text: '#EF4444',
  },
} as const;

/**
 * Featured Section Background Colors
 */
export const featuredColors = {
  content: {
    bg: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
    border: '#E9D5FF',
  },
  enablement: {
    bg: 'linear-gradient(135deg, #FEFCF6 0%, #FEF9EE 100%)',
    border: '#FDE68A',
  },
} as const;

/**
 * Hub Gradients (V2)
 */
export const hubGradients = {
  content: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #8B5CF6 100%)',
  enablement: 'linear-gradient(135deg, #15803D 0%, #16A34A 50%, #22C55E 100%)',
} as const;
