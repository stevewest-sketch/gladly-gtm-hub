'use client'

import Link from 'next/link'

interface EnablementArticle {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  category: string
  contentType: string
  audience: string
  keyTakeaways?: string[]
  tags?: string[]
  readingTime?: string
  publishedDate: string
  videoUrl?: string
  slidesUrl?: string
}

interface EnablementCardProps {
  entry: EnablementArticle
  variant?: 'featured' | 'compact' | 'standard'
  showVideo?: boolean
}

export default function EnablementCard({
  entry,
  variant = 'standard',
  showVideo = false,
}: EnablementCardProps) {
  const publishDate = entry.publishedDate
    ? new Date(entry.publishedDate).toLocaleDateString()
    : ''

  // Link to existing enablement article detail page
  const linkHref = entry.slug?.current ? `/enablement/articles/${entry.slug.current}` : '#'

  // Get color based on content type
  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'Training':
        return '#3B82F6'  // Blue
      case 'Meeting':
        return '#8C69F0'  // Purple
      case 'Demo':
        return '#F97316'  // Orange
      case 'Guide':
        return '#10B981'  // Emerald
      default:
        return '#009B00'  // Gladly green
    }
  }

  // Get icon based on content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'Training':
        return '🎓'
      case 'Meeting':
        return '🎥'
      case 'Demo':
        return '🖥️'
      case 'Guide':
        return '📖'
      default:
        return '📄'
    }
  }

  const contentTypeColor = getContentTypeColor(entry.contentType)
  const contentTypeIcon = getContentTypeIcon(entry.contentType)

  // Featured variant - larger card with more details
  if (variant === 'featured') {
    return (
      <Link href={linkHref} className="group block h-full">
        <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#009B00] hover:shadow-lg hover:-translate-y-1">
          <div className="p-5">
            {/* Content Type Badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-white text-[12px] leading-[16px] font-semibold mb-3"
              style={{ backgroundColor: contentTypeColor }}
            >
              <span className="mr-1">{contentTypeIcon}</span>
              {entry.contentType}
            </div>

            {/* Title */}
            <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#009B00] transition-colors">
              {entry.title}
            </h3>

            {/* Summary */}
            <p className="text-[13px] leading-[20px] text-[#252525] mb-4 line-clamp-3">
              {entry.summary}
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

              {entry.readingTime && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{entry.readingTime}</span>
                </div>
              )}

              {entry.audience && (
                <span className="px-2 py-0.5 bg-[#F3F3F3] rounded text-[12px] leading-[16px] font-semibold">
                  {entry.audience}
                </span>
              )}
            </div>

            {/* Tags */}
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F3F3F3] text-[#252525]"
                  >
                    {tag}
                  </span>
                ))}
                {entry.tags.length > 3 && (
                  <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F3F3F3] text-[#252525]">
                    +{entry.tags.length - 3} more
                  </span>
                )}
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
          <span
            className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white mb-2"
            style={{ backgroundColor: contentTypeColor }}
          >
            <span className="mr-1">{contentTypeIcon}</span>
            {entry.contentType}
          </span>
          <h3 className="text-[15px] leading-[24px] font-semibold text-[#0D0D0D] mb-1 line-clamp-2 group-hover:text-[#009B00] transition-colors">
            {entry.title}
          </h3>
          <p className="text-[12px] leading-[16px] text-[#252525] mb-2">
            {publishDate}
          </p>
          {entry.audience && (
            <span className="inline-block px-2 py-0.5 bg-[#F3F3F3] rounded text-[11px] leading-[14px] font-semibold text-[#252525]">
              {entry.audience}
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
          {/* Content Type Badge */}
          <div
            className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white mb-3"
            style={{ backgroundColor: contentTypeColor }}
          >
            <span className="mr-1">{contentTypeIcon}</span>
            {entry.contentType}
          </div>

          {/* Title */}
          <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#009B00] transition-colors">
            {entry.title}
          </h3>

          {/* Summary */}
          <p className="text-[13px] leading-[20px] text-[#252525] mb-3 line-clamp-2">
            {entry.summary}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-[12px] leading-[16px] font-semibold text-[#252525]">
            {publishDate && (
              <span className="text-[#666666]">{publishDate}</span>
            )}
            {entry.readingTime && (
              <span className="text-[#666666]">• {entry.readingTime}</span>
            )}
          </div>

          {/* Audience & Category */}
          <div className="flex flex-wrap gap-2">
            {entry.audience && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold border border-[#DFDFDF] text-[#252525]">
                {entry.audience}
              </span>
            )}
            {entry.category && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#E8E0F8] text-[#8C69F0]">
                {entry.category}
              </span>
            )}
            {showVideo && entry.videoUrl && (
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
