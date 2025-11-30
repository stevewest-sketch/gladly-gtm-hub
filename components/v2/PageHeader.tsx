'use client';

import { ReactNode } from 'react';
import { useHubConfig } from '@/components/providers/ThemeProvider';

/**
 * Navigation Tab Interface
 */
interface NavTab {
  id: string;
  label: string;
  icon?: string;
}

/**
 * PageHeader Props
 */
interface PageHeaderProps {
  /** Navigation tabs displayed below the title */
  tabs?: NavTab[];
  /** Currently active tab ID */
  activeTab?: string;
  /** Callback when a tab is clicked */
  onTabChange?: (tabId: string) => void;
  /** Override the default title from hub config */
  title?: string;
  /** Override the default subtitle from hub config */
  subtitle?: string;
}

/**
 * PageHeader Component (V2)
 *
 * A gradient page header with icon, title, subtitle, and navigation tabs.
 * Automatically uses theme colors from the ThemeProvider context.
 *
 * @example
 * ```tsx
 * <PageHeader
 *   tabs={[
 *     { id: 'all', label: 'All Content', icon: '📁' },
 *     { id: 'templates', label: 'Templates', icon: '📋' },
 *   ]}
 *   activeTab="all"
 *   onTabChange={(id) => setActiveTab(id)}
 * />
 * ```
 */
export function PageHeader({
  tabs = [],
  activeTab,
  onTabChange,
  title,
  subtitle,
}: PageHeaderProps) {
  const config = useHubConfig();

  const displayTitle = title ?? config.name;
  const displaySubtitle = subtitle ?? config.description;

  return (
    <header
      className="relative pt-8 pb-0 px-8 overflow-hidden"
      style={{ background: 'var(--theme-gradient)' }}
    >
      {/* Background pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Accent blur shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-v2-content mx-auto">
        {/* Title Row */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{config.icon}</span>
          <h1 className="font-display text-v2-3xl font-bold text-white">
            {displayTitle}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="font-body text-v2-md text-white/80 max-w-xl mb-6">
          {displaySubtitle}
        </p>

        {/* Navigation Tabs */}
        {tabs.length > 0 && (
          <nav className="flex gap-2 -mb-px">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5
                    font-body text-v2-base font-medium
                    rounded-t-v2-md border-b-2
                    transition-all duration-150
                    ${
                      isActive
                        ? 'bg-v2-gray-50 text-v2-gray-700 border-transparent'
                        : 'bg-white/15 text-white/90 border-transparent hover:bg-white/25 hover:text-white'
                    }
                  `}
                >
                  {tab.icon && <span className="text-sm">{tab.icon}</span>}
                  {tab.label}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

export type { NavTab, PageHeaderProps };
