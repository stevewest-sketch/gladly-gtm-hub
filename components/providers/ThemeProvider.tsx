'use client';

import { createContext, useContext, ReactNode } from 'react';
import { HubType, HUB_REGISTRY, HubConfig } from '@/lib/theme';

/**
 * Theme Context Value
 */
interface ThemeContextValue {
  hub: HubType;
  config: HubConfig;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * ThemeProvider Props
 */
interface ThemeProviderProps {
  hub: HubType;
  children: ReactNode;
}

/**
 * ThemeProvider Component
 *
 * Wraps hub pages to provide theme context and apply CSS variables
 * via the data-hub attribute for runtime theming.
 *
 * @example
 * ```tsx
 * // In /app/content/layout.tsx
 * import { ThemeProvider } from '@/components/providers/ThemeProvider';
 *
 * export default function ContentLayout({ children }) {
 *   return <ThemeProvider hub="content">{children}</ThemeProvider>;
 * }
 * ```
 */
export function ThemeProvider({ hub, children }: ThemeProviderProps) {
  const config = HUB_REGISTRY[hub];

  return (
    <ThemeContext.Provider value={{ hub, config }}>
      <div data-hub={hub} className="min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current hub type
 *
 * @returns The current hub type ('content' | 'enablement')
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * const hub = useHub();
 * // Returns: 'content' or 'enablement'
 * ```
 */
export function useHub(): HubType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useHub must be used within a ThemeProvider');
  }
  return context.hub;
}

/**
 * Hook to access the full hub configuration
 *
 * @returns The HubConfig object with name, colors, route, etc.
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * const config = useHubConfig();
 * // Returns: { type, name, icon, description, route, colors }
 * ```
 */
export function useHubConfig(): HubConfig {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useHubConfig must be used within a ThemeProvider');
  }
  return context.config;
}

/**
 * Hook to access just the hub colors
 *
 * @returns The hub's color palette (primary, primaryDark, primaryLight, gradient)
 *
 * @example
 * ```tsx
 * const colors = useHubColors();
 * // Use with inline styles:
 * <div style={{ backgroundColor: colors.primary }} />
 * ```
 */
export function useHubColors() {
  const config = useHubConfig();
  return config.colors;
}

/**
 * Optional hook that returns hub context or null if not in a provider
 * Useful for components that work both inside and outside hub pages
 */
export function useOptionalHub(): HubType | null {
  const context = useContext(ThemeContext);
  return context?.hub ?? null;
}
