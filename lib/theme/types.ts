/**
 * GTM Hub Design System - Type Definitions
 * Supports multiple hub themes with type-safe configuration
 */

export type HubType = 'content' | 'enablement';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  gradient: string;
}

export interface HubConfig {
  type: HubType;
  name: string;
  icon: string;
  description: string;
  route: string;
  colors: ThemeColors;
}

/**
 * Hub Registry - Central configuration for all hubs
 * To add a new hub, add an entry here and CSS variables in globals.css
 */
export const HUB_REGISTRY: Record<HubType, HubConfig> = {
  content: {
    type: 'content',
    name: 'Content Hub',
    icon: '📁',
    description: 'Your repository for templates, collateral, and competitive intelligence.',
    route: '/content',
    colors: {
      primary: '#7C3AED',
      primaryDark: '#6D28D9',
      primaryLight: '#F3E8FD',
      gradient: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #8B5CF6 100%)',
    },
  },
  enablement: {
    type: 'enablement',
    name: 'Enablement Hub',
    icon: '🚀',
    description: 'Your learning center for product enablement, certifications, and skill development.',
    route: '/enablement',
    colors: {
      primary: '#16A34A',
      primaryDark: '#15803D',
      primaryLight: '#DCFCE7',
      gradient: 'linear-gradient(135deg, #15803D 0%, #16A34A 50%, #22C55E 100%)',
    },
  },
} as const;

/**
 * Badge variants for Content Hub
 */
export type ContentBadgeVariant =
  | 'document'
  | 'deck'
  | 'onepager'
  | 'template'
  | 'kit'
  | 'battlecard';

/**
 * Badge variants for Enablement Hub
 */
export type EnablementBadgeVariant =
  | 'product'
  | 'cert'
  | 'allhands'
  | 'skills'
  | 'gtm'
  | 'partner';

/**
 * Product tag variants (shared across hubs)
 */
export type ProductTagVariant = 'sidekick' | 'classic' | 'voice';

/**
 * Resource type labels
 */
export type ContentResourceType = 'document' | 'presentation' | 'kit';
export type EnablementResourceType = 'ondemand' | 'livereplay' | 'certification';
