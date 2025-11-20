/**
 * Gladly Design System Theme
 * Centralized colors, gradients, and design tokens
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    purple: '#8C69F0',
    purpleDark: '#7B52D9',
    purpleLight: '#E8E0F8',
    green: '#009B00',
    greenDark: '#008000',
    blue: '#3B82F6',
    blueDark: '#2563EB',
    blueLight: '#DBEAFE',
    orange: '#F97316',
    orangeDark: '#EA580C',
  },

  // Neutral Colors
  neutral: {
    black: '#0D0D0D',
    dark: '#252525',
    gray: '#DFDFDF',
    lightGray: '#E5E5E5',
    background: '#F3F3F3',
    white: '#FFFFFF',
  },

  // Semantic Colors
  semantic: {
    success: '#009B00',
    warning: '#F97316',
    error: '#DC2626',
    info: '#3B82F6',
  },

  // Catalog-specific Colors (Design System Unification)
  catalog: {
    borderLight: '#F3F3F3',      // Subtle card borders
    borderHover: '#8C69F0',      // Purple hover state
    badgeBackground: '#8C69F0',  // Default badge fill
    iconBg: {
      purple: '#F5F3FF',         // Light purple for icon badges
      blue: '#EFF6FF',           // Light blue for icon badges
      green: '#F0FDF4',          // Light green for icon badges
      orange: '#FFF7ED',         // Light orange for icon badges
      yellow: '#FEFCE8',         // Light yellow for icon badges
    },
  },
} as const;

export const gradients = {
  purple: 'linear-gradient(135deg, #8C69F0 0%, #7B52D9 100%)',
  green: 'linear-gradient(135deg, #009B00 0%, #007A00 100%)',
  blue: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  orange: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  dark: 'linear-gradient(135deg, #252525 0%, #0D0D0D 100%)',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',

  // Catalog-specific shadows
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  cardHover: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  elevated: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
} as const;

export const typography = {
  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '15px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

/**
 * Badge utility patterns
 */
export const badge = {
  // Badge size variants
  size: {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-2 text-sm',
  },

  // Badge style variants
  style: {
    pill: 'rounded-full font-medium',
    rounded: 'rounded-lg font-medium',
    square: 'rounded font-medium',
  },

  // Badge color schemes
  colors: {
    purple: { bg: '#8C69F0', text: '#FFFFFF' },
    blue: { bg: '#3B82F6', text: '#FFFFFF' },
    green: { bg: '#009B00', text: '#FFFFFF' },
    orange: { bg: '#F97316', text: '#FFFFFF' },
    yellow: { bg: '#EAB308', text: '#FFFFFF' },
    gray: { bg: '#6B7280', text: '#FFFFFF' },
  },

  // Icon badge backgrounds (light colors for icon containers)
  iconBg: {
    purple: '#F5F3FF',
    blue: '#EFF6FF',
    green: '#F0FDF4',
    orange: '#FFF7ED',
    yellow: '#FEFCE8',
  },
} as const;

/**
 * Tailwind class utilities for consistent styling
 */
export const tailwindClasses = {
  // Card styles (Legacy)
  card: {
    base: 'bg-white border-2 border-neutral-background rounded-lg transition-all duration-300',
    hover: 'hover:border-primary-purple hover:shadow-lg hover:-translate-y-1',
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },

  // Catalog Card styles (New unified design)
  catalogCard: {
    base: 'bg-white border rounded-lg transition-all duration-200',
    border: 'border-[#F3F3F3]',
    hover: 'hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-1',
    padding: 'p-5',
    shadow: 'shadow-sm',
  },

  // Button styles
  button: {
    base: 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200',
    primary: 'bg-primary-purple text-white hover:bg-primary-purple-dark hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-white text-primary-purple border-2 border-primary-purple hover:bg-neutral-background hover:shadow-lg hover:-translate-y-0.5',
    ghost: 'bg-white text-primary-purple hover:bg-neutral-background hover:shadow-md hover:-translate-y-0.5',
    size: {
      sm: 'px-4 py-2 text-[13px] leading-[20px]',
      md: 'px-6 py-3 text-[15px] leading-[24px]',
      lg: 'px-8 py-4 text-[15px] leading-[24px]',
    },
  },

  // Section styles
  section: {
    divider: 'h-1 mb-12',
    header: 'text-2xl font-bold mb-4 text-neutral-black',
    subheader: 'text-base text-neutral-dark mb-8',
  },
} as const;

/**
 * Helper function to get gradient background style
 */
export function getGradient(color: keyof typeof gradients): { background: string } {
  return { background: gradients[color] };
}

/**
 * Helper function to get color by path
 */
export function getColor(path: string): string {
  const parts = path.split('.');
  let value: any = colors;

  for (const part of parts) {
    value = value[part];
    if (!value) return colors.primary.purple; // fallback
  }

  return value;
}

/**
 * Helper function to get badge style string
 */
export function getBadgeClasses(
  color: keyof typeof badge.colors,
  size: keyof typeof badge.size = 'md',
  style: keyof typeof badge.style = 'pill'
): string {
  const sizeClass = badge.size[size];
  const styleClass = badge.style[style];
  return `${sizeClass} ${styleClass}`;
}

/**
 * Helper function to get badge inline styles
 */
export function getBadgeStyle(color: keyof typeof badge.colors): { backgroundColor: string; color: string } {
  const colorScheme = badge.colors[color];
  return {
    backgroundColor: colorScheme.bg,
    color: colorScheme.text,
  };
}

/**
 * Type exports for TypeScript
 */
export type ColorPath =
  | `primary.${keyof typeof colors.primary}`
  | `neutral.${keyof typeof colors.neutral}`
  | `semantic.${keyof typeof colors.semantic}`
  | `catalog.${keyof typeof colors.catalog}`;

export type GradientType = keyof typeof gradients;
export type BadgeColor = keyof typeof badge.colors;
export type BadgeSize = keyof typeof badge.size;
export type BadgeStyle = keyof typeof badge.style;
