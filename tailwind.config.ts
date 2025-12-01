import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // V2 Font Families
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      // V2 Font Sizes (from design spec)
      fontSize: {
        'v2-xs': ['11px', { lineHeight: '1.4' }],
        'v2-sm': ['12px', { lineHeight: '1.5' }],
        'v2-base': ['13px', { lineHeight: '1.5' }],
        'v2-md': ['14px', { lineHeight: '1.5' }],
        'v2-lg': ['15px', { lineHeight: '1.4' }],
        'v2-xl': ['16px', { lineHeight: '1.4' }],
        'v2-2xl': ['18px', { lineHeight: '1.4' }],
        'v2-3xl': ['26px', { lineHeight: '1.2' }],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Gladly Design System Colors (existing)
        primary: {
          purple: '#8C69F0',
          'purple-dark': '#7B52D9',
          'purple-light': '#E8E0F8',
          green: '#009B00',
          'green-dark': '#008000',
          blue: '#3B82F6',
          'blue-dark': '#2563EB',
          'blue-light': '#DBEAFE',
          orange: '#F97316',
          'orange-dark': '#EA580C',
        },
        neutral: {
          black: '#0D0D0D',
          dark: '#252525',
          gray: '#DFDFDF',
          'light-gray': '#E5E5E5',
          background: '#F3F3F3',
          white: '#FFFFFF',
        },
        semantic: {
          success: '#009B00',
          warning: '#F97316',
          error: '#DC2626',
          info: '#3B82F6',
        },
        // V2 Gray Scale (new design system)
        'v2-gray': {
          50: '#F8F9FC',
          100: '#F1F3F9',
          200: '#E8EBF2',
          300: '#E2E6EF',
          400: '#CBD2E0',
          500: '#8B93A7',
          600: '#5C6578',
          700: '#1A1D26',
        },
        // V2 Hub Theme Colors
        'hub-content': {
          primary: '#7C3AED',
          dark: '#6D28D9',
          light: '#F3E8FD',
        },
        'hub-enablement': {
          primary: '#16A34A',
          dark: '#15803D',
          light: '#DCFCE7',
        },
        // V2 CSS Variable References (runtime theming)
        'theme': {
          primary: 'var(--theme-primary)',
          'primary-dark': 'var(--theme-primary-dark)',
          'primary-light': 'var(--theme-primary-light)',
        },
        // V2 Product Tag Colors
        'tag-sidekick': {
          bg: '#FFF4E6',
          text: '#B45309',
        },
        'tag-classic': {
          bg: '#E8F4FD',
          text: '#1E6FA6',
        },
        'tag-voice': {
          bg: '#F3E8FD',
          text: '#7C3AED',
        },
        // V2 Content Hub Badge Colors
        'badge-document': { bg: '#F1F3F9', text: '#5C6578' },
        'badge-deck': { bg: '#EFF6FF', text: '#3B82F6' },
        'badge-onepager': { bg: '#D1FAE5', text: '#047857' },
        'badge-template': { bg: '#F3E8FD', text: '#8B5CF6' },
        'badge-kit': { bg: '#FEF3C7', text: '#B45309' },
        'badge-battlecard': { bg: '#FEE2E2', text: '#EF4444' },
        // V2 Enablement Hub Badge Colors
        'badge-product': { bg: '#EFF6FF', text: '#3B82F6' },
        'badge-cert': { bg: '#FEF3C7', text: '#B45309' },
        'badge-allhands': { bg: '#EEF2FF', text: '#6366F1' },
        'badge-skills': { bg: '#FCE7F3', text: '#EC4899' },
        'badge-gtm': { bg: '#D1FAE5', text: '#047857' },
        'badge-partner': { bg: '#FEE2E2', text: '#EF4444' },
      },
      // V2 Border Radius
      borderRadius: {
        'v2-sm': '4px',
        'v2-md': '8px',
        'v2-lg': '12px',
        'v2-full': '20px',
      },
      // V2 Box Shadows
      boxShadow: {
        'v2-card-hover': '0 4px 12px rgba(0, 0, 0, 0.06)',
      },
      // V2 Spacing (extends default)
      spacing: {
        'v2-xs': '4px',
        'v2-sm': '8px',
        'v2-md': '12px',
        'v2-lg': '16px',
        'v2-xl': '24px',
        'v2-2xl': '32px',
        'v2-3xl': '48px',
      },
      // V2 Max Width
      maxWidth: {
        'v2-content': '1400px',
      },
      // V2 Width
      width: {
        'v2-sidebar': '240px',
        'v2-card-min': '280px',
      },
    },
  },
  plugins: [typography],
};
export default config;
