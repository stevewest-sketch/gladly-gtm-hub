'use client';

import { colors } from '@/lib/theme';

export interface StatItem {
  value: string;
  label: string;
  icon?: string;
  color?: 'purple' | 'blue' | 'green' | 'orange';
}

interface QuickStatsSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  stats: StatItem[];
  variant?: 'light' | 'white';
}

const colorClasses = {
  purple: {
    bg: 'bg-purple-50',
    text: 'text-primary-purple',
    border: 'border-primary-purple',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-primary-blue',
    border: 'border-primary-blue',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-600',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-600',
  },
};

export default function QuickStatsSection({
  sectionTitle = 'Quick Stats',
  sectionSubtitle,
  stats,
  variant = 'white',
}: QuickStatsSectionProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className={`py-12 ${variant === 'light' ? 'bg-neutral-light' : 'bg-white'}`}>
      <div className="max-w-[1200px] mx-auto px-10">
        {/* Section Header */}
        {sectionTitle && (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-black mb-2">
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className="text-lg text-neutral-dark">{sectionSubtitle}</p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className={`grid gap-6 ${
          stats.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          stats.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          stats.length === 4 ? 'grid-cols-2 md:grid-cols-4' :
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {stats.map((stat, index) => {
            const colorConfig = colorClasses[stat.color || 'purple'];

            return (
              <div
                key={index}
                className={`${colorConfig.bg} rounded-xl p-6 border-2 ${colorConfig.border} transition-all hover:shadow-lg hover:scale-105`}
              >
                {stat.icon && (
                  <div className="text-4xl mb-3">{stat.icon}</div>
                )}
                <div className={`text-4xl font-bold ${colorConfig.text} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-neutral-dark">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
