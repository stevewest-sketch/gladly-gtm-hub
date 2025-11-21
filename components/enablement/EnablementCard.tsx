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

  // Link to catalog entry detail page
  const linkHref = entry.slug?.current ? `/catalog/${entry.slug.current}` : '#'

  // Get content type details
  const contentTypeName = entry.contentType?.name || 'Enablement'
  const contentTypeColor = entry.contentType?.color || '#009B00'
  const contentTypeIcon = entry.contentType?.icon || '📄'

  // Get audiences
  const audiences = entry.audiences?.map(a => a.name).join(', ') || ''

  // Get first category
  const category = entry.enablementCategory?.[0] || ''

  // Format duration
  const duration = entry.duration ? `${entry.duration} minutes` : ''

  // Featured variant - larger card with more details
  if (variant === 'featured') {
    return (
      <Link href={linkHref} className="group block h-full">
        <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#009B00] hover:shadow-lg hover:-translate-y-1">
          <div className="p-5">
            {/* Content Type Badge and Featured Badge */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="inline-block px-3 py-1 rounded-full text-white text-[12px] leading-[16px] font-semibold"
                style={{ backgroundColor: contentTypeColor }}
              >
                <span className="mr-1">{contentTypeIcon}</span>
                {contentTypeName}
              </div>
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
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white"
              style={{ backgroundColor: contentTypeColor }}
            >
              <span className="mr-1">{contentTypeIcon}</span>
              {contentTypeName}
            </span>
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
          {/* Content Type Badge and Featured Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white"
              style={{ backgroundColor: contentTypeColor }}
            >
              <span className="mr-1">{contentTypeIcon}</span>
              {contentTypeName}
            </div>
            {entry.featured && (
              <div className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F5A623] text-gray-900">
                ⭐
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

          {/* Audience & Category */}
          <div className="flex flex-wrap gap-2">
            {audiences && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold border border-[#DFDFDF] text-[#252525]">
                {audiences}
              </span>
            )}
            {category && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#E8E0F8] text-[#8C69F0]">
                {category}
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
