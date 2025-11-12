import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Gladly Design System Colors
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
      },
    },
  },
  plugins: [],
};
export default config;
