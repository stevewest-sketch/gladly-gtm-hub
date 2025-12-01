'use client'

import Link from 'next/link'
import { CatalogEntry } from '@/lib/types/catalog'

interface EnablementCardProps {
  entry: CatalogEntry
  variant?: 'featured' | 'compact' | 'standard'
  showVideo?: boolean
}

export default function EnablementCard({
  entry,
  variant = 'standard',
  showVideo = false,
}: EnablementCardProps) {
  const publishDate = entry.publishDate
    ? new Date(entry.publishDate).toLocaleDateString()
    : ''

  // Link to enablement hub detail page
  const linkHref = entry.slug?.current ? `/enablement-hub/${entry.slug.current}` : '#'

  // Get audiences
  const audiences = entry.audiences?.map(a => a.name).join(', ') || ''

  // Get first category with color mapping
  const category = entry.enablementCategory?.[0] || ''

  // Category color and icon mapping for distinctive tags
  const categoryConfig: Record<string, { bg: string; text: string; icon: string }> = {
    'Product': { bg: '#E0F2FE', text: '#0369A1', icon: '📦' },        // Sky blue
    'GTM Strategy': { bg: '#DCFCE7', text: '#166534', icon: '🚀' },   // Green
    'Internal Ops': { bg: '#F3E8FF', text: '#7C3AED', icon: '⚙️' },  // Purple
    'Competitive': { bg: '#FFE4E6', text: '#BE123C', icon: '⚔️' },   // Rose
    'Technical': { bg: '#E0E7FF', text: '#4338CA', icon: '🔧' },     // Indigo
    'Partner': { bg: '#FFEDD5', text: '#C2410C', icon: '🤝' },       // Orange
    'Value Realization': { bg: '#D1FAE5', text: '#047857', icon: '💰' }, // Emerald
  }
  const categoryStyle = categoryConfig[category] || { bg: '#F3F4F6', text: '#374151', icon: '📄' }

  // Format duration
  const duration = entry.duration ? `${entry.duration} minutes` : ''

  // Featured variant - larger card with more details
  if (variant === 'featured') {
    return (
      <Link href={linkHref} className="group block h-full">
        <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#009B00] hover:shadow-lg hover:-translate-y-1">
          <div className="p-5">
            {/* Category Badge (top left, color coded) and Featured Badge */}
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <div
                  className="inline-block px-3 py-1 rounded-full text-[12px] leading-[16px] font-bold uppercase tracking-wide"
                  style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.text }}
                >
                  <span className="mr-1">{categoryStyle.icon}</span>
                  {category}
                </div>
              )}
              {entry.featured && (
                <div className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F5A623] text-gray-900">
                  ⭐ Featured
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#009B00] transition-colors">
              {entry.title}
            </h3>

            {/* Summary */}
            <p className="text-[13px] leading-[20px] text-[#252525] mb-4 line-clamp-3">
              {entry.description}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-[12px] leading-[16px] font-semibold text-[#252525]">
              {publishDate && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{publishDate}</span>
                </div>
              )}

              {duration && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{duration}</span>
                </div>
              )}

              {audiences && (
                <span className="px-2 py-0.5 bg-[#F3F3F3] rounded text-[12px] leading-[16px] font-semibold">
                  {audiences}
                </span>
              )}
            </div>

            {/* Key Takeaways */}
            {entry.keyTakeaways && entry.keyTakeaways.length > 0 && (
              <div className="space-y-1">
                {entry.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-[#009B00] text-[12px] mt-0.5">✓</span>
                    <span className="text-[12px] leading-[16px] text-[#252525] line-clamp-1">
                      {takeaway}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action footer */}
          <div className="px-5 pb-5 pt-2 border-t border-[#F3F3F3] opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[13px] leading-[20px] text-[#009B00] font-semibold flex items-center gap-1">
              View Enablement
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // Compact variant - minimal card for grids
  if (variant === 'compact') {
    return (
      <Link href={linkHref} className="group block h-full">
        <div className="h-full bg-white border border-[#DFDFDF] rounded-lg p-4 hover:border-[#009B00] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {category && (
              <span
                className="inline-block px-2 py-1 rounded-full text-[11px] leading-[14px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.text }}
              >
                <span className="mr-1">{categoryStyle.icon}</span>
                {category}
              </span>
            )}
            {entry.featured && (
              <span className="inline-block px-1.5 py-0.5 rounded text-[11px] leading-[14px] font-semibold bg-[#F5A623] text-gray-900">
                ⭐
              </span>
            )}
          </div>
          <h3 className="text-[15px] leading-[24px] font-semibold text-[#0D0D0D] mb-1 line-clamp-2 group-hover:text-[#009B00] transition-colors">
            {entry.title}
          </h3>
          <p className="text-[12px] leading-[16px] text-[#252525] mb-2">
            {publishDate}
          </p>
          {audiences && (
            <span className="inline-block px-2 py-0.5 bg-[#F3F3F3] rounded text-[11px] leading-[14px] font-semibold text-[#252525]">
              {audiences}
            </span>
          )}
        </div>
      </Link>
    )
  }

  // Standard variant - balanced card
  return (
    <Link href={linkHref} className="group block h-full">
      <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#009B00] hover:shadow-lg hover:-translate-y-1">
        <div className="p-5">
          {/* Category Badge and Featured Badge */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {category && (
              <div
                className="inline-block px-3 py-1 rounded-full text-[12px] leading-[16px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.text }}
              >
                <span className="mr-1">{categoryStyle.icon}</span>
                {category}
              </div>
            )}
            {entry.featured && (
              <div className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F5A623] text-gray-900">
                ⭐ Featured
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#009B00] transition-colors">
            {entry.title}
          </h3>

          {/* Summary */}
          <p className="text-[13px] leading-[20px] text-[#252525] mb-3 line-clamp-2">
            {entry.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-[12px] leading-[16px] font-semibold text-[#252525]">
            {publishDate && (
              <span className="text-[#666666]">{publishDate}</span>
            )}
            {duration && (
              <span className="text-[#666666]">• {duration}</span>
            )}
          </div>

          {/* Audience & Video indicator */}
          <div className="flex flex-wrap gap-2">
            {audiences && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold border border-[#DFDFDF] text-[#252525]">
                {audiences}
              </span>
            )}
            {showVideo && entry.mainContent?.videoUrl && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#3B82F6] text-white">
                🎥 Video
              </span>
            )}
          </div>
        </div>

        {/* Action footer */}
        <div className="px-5 pb-5 pt-2 border-t border-[#F3F3F3] opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[13px] leading-[20px] text-[#009B00] font-semibold flex items-center gap-1">
            View Enablement
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
