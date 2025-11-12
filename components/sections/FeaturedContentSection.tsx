'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui';

export interface FeaturedItem {
  title: string;
  description: string;
  url: string;
  badge?: string;
  badgeVariant?: 'success' | 'info' | 'warning' | 'error';
  icon?: string;
  imageUrl?: string;
}

interface FeaturedContentSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  items: FeaturedItem[];
  variant?: 'light' | 'white';
  layout?: 'cards' | 'list';
}

export default function FeaturedContentSection({
  sectionTitle = 'Featured Content',
  sectionSubtitle,
  items,
  variant = 'white',
  layout = 'cards',
}: FeaturedContentSectionProps) {
  if (!items || items.length === 0) return null;

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

        {/* Content Grid/List */}
        {layout === 'cards' ? (
          <div className={`grid gap-6 ${
            items.length === 1 ? 'grid-cols-1' :
            items.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="group bg-white rounded-xl p-6 border-2 border-neutral-light hover:border-primary-purple transition-all hover:shadow-lg"
              >
                {item.icon && (
                  <div className="text-4xl mb-4">{item.icon}</div>
                )}

                {item.imageUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-neutral-black group-hover:text-primary-purple transition-colors flex-1">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <Badge variant={item.badgeVariant || 'info'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                <p className="text-neutral-dark">
                  {item.description}
                </p>

                <div className="mt-4 text-primary-purple font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="group flex items-start gap-4 bg-white rounded-xl p-6 border-2 border-neutral-light hover:border-primary-purple transition-all hover:shadow-lg"
              >
                {item.icon && (
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-neutral-black group-hover:text-primary-purple transition-colors">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <Badge variant={item.badgeVariant || 'info'} size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-neutral-dark text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="flex-shrink-0 text-primary-purple font-semibold group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
