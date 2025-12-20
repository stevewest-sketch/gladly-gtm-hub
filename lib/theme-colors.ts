// Theme color definitions for enablement pages
// Single source of truth for all theme-related colors

export type PageTheme = 'green' | 'blue' | 'purple' | 'orange' | 'rose' | 'teal' | 'slate'

export interface ThemeColors {
  // Header gradient
  headerGradientFrom: string
  headerGradientTo: string

  // Primary accent (checkmarks, step numbers, active states)
  accent: string
  accentLight: string  // Lighter version for backgrounds
  accentDark: string   // Darker version for text on light bg

  // Hover states
  hoverBg: string

  // Text colors
  accentText: string   // Text that uses accent color
}

const themePresets: Record<PageTheme, ThemeColors> = {
  green: {
    headerGradientFrom: '#16A34A',
    headerGradientTo: '#15803D',
    accent: '#16A34A',
    accentLight: '#DCFCE7',
    accentDark: '#15803D',
    hoverBg: '#DCFCE7',
    accentText: '#16A34A',
  },
  blue: {
    headerGradientFrom: '#2563EB',
    headerGradientTo: '#1D4ED8',
    accent: '#2563EB',
    accentLight: '#DBEAFE',
    accentDark: '#1E40AF',
    hoverBg: '#DBEAFE',
    accentText: '#2563EB',
  },
  purple: {
    headerGradientFrom: '#7C3AED',
    headerGradientTo: '#6D28D9',
    accent: '#7C3AED',
    accentLight: '#EDE9FE',
    accentDark: '#5B21B6',
    hoverBg: '#EDE9FE',
    accentText: '#7C3AED',
  },
  orange: {
    headerGradientFrom: '#EA580C',
    headerGradientTo: '#C2410C',
    accent: '#EA580C',
    accentLight: '#FFEDD5',
    accentDark: '#9A3412',
    hoverBg: '#FFEDD5',
    accentText: '#EA580C',
  },
  rose: {
    headerGradientFrom: '#E11D48',
    headerGradientTo: '#BE123C',
    accent: '#E11D48',
    accentLight: '#FFE4E6',
    accentDark: '#9F1239',
    hoverBg: '#FFE4E6',
    accentText: '#E11D48',
  },
  teal: {
    headerGradientFrom: '#0D9488',
    headerGradientTo: '#0F766E',
    accent: '#0D9488',
    accentLight: '#CCFBF1',
    accentDark: '#115E59',
    hoverBg: '#CCFBF1',
    accentText: '#0D9488',
  },
  slate: {
    headerGradientFrom: '#475569',
    headerGradientTo: '#334155',
    accent: '#475569',
    accentLight: '#F1F5F9',
    accentDark: '#1E293B',
    hoverBg: '#F1F5F9',
    accentText: '#475569',
  },
}

export function getThemeColors(theme?: string | null): ThemeColors {
  const validTheme = (theme && theme in themePresets) ? theme as PageTheme : 'green'
  return themePresets[validTheme]
}

// CSS variable style object for inline styles
export function getThemeStyles(theme?: string | null): Record<string, string> {
  const colors = getThemeColors(theme)
  return {
    '--theme-header-from': colors.headerGradientFrom,
    '--theme-header-to': colors.headerGradientTo,
    '--theme-accent': colors.accent,
    '--theme-accent-light': colors.accentLight,
    '--theme-accent-dark': colors.accentDark,
    '--theme-hover-bg': colors.hoverBg,
    '--theme-accent-text': colors.accentText,
  }
}

export default themePresets
