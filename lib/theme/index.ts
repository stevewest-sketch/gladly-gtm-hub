/**
 * GTM Hub Design System - Main Export
 * Centralized theme configuration for all hubs
 */

// Re-export legacy theme for backward compatibility
export * from '../theme-legacy';

// Re-export all V2 theme modules
export * from './types';
export * from './colors';
export * from './typography';

// Import for convenience functions
import { HubType, HUB_REGISTRY, ThemeColors } from './types';
import { gray, hubColors, gradients } from './colors';

/**
 * Spacing Scale
 */
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
} as const;

/**
 * Border Radius
 */
export const borderRadius = {
  sm: '4px',     // Tags, badges
  md: '8px',     // Cards, inputs, buttons
  lg: '12px',    // Panels, featured sections
  full: '20px',  // Pills, active filters
} as const;

/**
 * Shadows
 */
export const shadows = {
  cardHover: '0 4px 12px rgba(0, 0, 0, 0.06)',
} as const;

/**
 * Layout Constants
 */
export const layout = {
  sidebarWidth: '240px',
  maxContentWidth: '1400px',
  cardMinWidth: '280px',
} as const;

/**
 * Get hub configuration by type
 */
export function getHubConfig(hub: HubType) {
  return HUB_REGISTRY[hub];
}

/**
 * Get hub colors by type
 */
export function getHubColors(hub: HubType): ThemeColors {
  return HUB_REGISTRY[hub].colors;
}

/**
 * Check if a hub type is valid
 */
export function isValidHub(hub: string): hub is HubType {
  return hub === 'content' || hub === 'enablement';
}

/**
 * CSS variable names for theme properties
 * Used for runtime theming via data-hub attribute
 */
export const cssVars = {
  primary: '--theme-primary',
  primaryDark: '--theme-primary-dark',
  primaryLight: '--theme-primary-light',
  gradient: '--theme-gradient',
} as const;

/**
 * Tailwind class utilities for v2 components
 */
export const v2Classes = {
  // Card styles
  card: {
    base: `bg-white border border-[${gray[300]}] rounded-lg transition-all duration-200`,
    hover: 'hover:border-[var(--theme-primary)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5',
    padding: 'p-4',
  },

  // Badge styles
  badge: {
    base: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium',
  },

  // Tag styles
  tag: {
    base: 'px-2 py-0.5 rounded text-xs font-medium',
  },

  // Filter panel
  filter: {
    panel: 'bg-white border border-gray-300 rounded-xl p-4',
    groupTitle: 'text-xs font-semibold uppercase tracking-wide text-gray-500',
    option: 'flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-gray-100 cursor-pointer',
  },

  // Active filter pill
  activePill: 'inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--theme-primary-light)] text-[var(--theme-primary-dark)] rounded-full text-sm font-medium',
} as const;
