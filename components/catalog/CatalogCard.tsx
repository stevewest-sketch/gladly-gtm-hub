'use client'

import { CatalogCardProps } from '@/lib/types/catalog'
import { isRecent } from '@/lib/utils/catalogFilters'
import Image from 'next/image'
import Link from 'next/link'

export default function CatalogCard({
  entry,
  variant = 'standard',
  showDuration = false,
  showPresenter = false,
}: CatalogCardProps) {
  const contentTypeColor = entry.contentType?.color || '#8C69F0'
  const publishDate = entry.publishDate
    ? new Date(entry.publishDate).toLocaleDateString()
    : ''
  const isNew = isRecent(entry.publishDate, 7)

  // If external URL exists, use it; otherwise link to detail page
  const linkHref = entry.externalUrl || `/catalog/${entry.slug.current}`
  const isExternal = !!entry.externalUrl

  return (
    <Link
      href={linkHref}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group block h-full"
    >
      <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-1">
        {/* Thumbnail with Content Type Badge */}
        <div className="relative h-48 bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
          {entry.thumbnailImage?.asset?.url && (
            <Image
              src={entry.thumbnailImage.asset.url}
              alt={entry.title}
              fill
              className="object-cover"
            />
          )}

          {/* Content Type Badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[12px] leading-[16px] font-semibold"
            style={{ backgroundColor: contentTypeColor }}
          >
            {entry.contentType?.icon && (
              <span className="mr-1">{entry.contentType.icon}</span>
            )}
            {entry.contentType?.name || 'Content'}
          </div>

          {/* New Badge */}
          {isNew && (
            <div className="absolute top-3 right-3 bg-[#009B00] text-white px-2 py-1 rounded-full text-[12px] leading-[16px] font-semibold">
              New
            </div>
          )}

          {/* Featured Badge */}
          {entry.featured && (
            <div className="absolute bottom-3 left-3 bg-[#F5A623] text-gray-900 px-2 py-1 rounded text-[12px] leading-[16px] font-semibold flex items-center gap-1">
              <span>⭐</span>
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#8C69F0] transition-colors">
            {entry.title}
          </h3>

          {/* Description */}
          {entry.description && (
            <p className="text-[13px] leading-[20px] text-[#252525] mb-4 line-clamp-3">
              {entry.description}
            </p>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[12px] leading-[16px] font-semibold text-[#252525]">
            {publishDate && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{publishDate}</span>
              </div>
            )}

            {showDuration && entry.duration && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{entry.duration} min</span>
              </div>
            )}

            {entry.format && (
              <div className="px-2 py-0.5 bg-[#F3F3F3] rounded text-[12px] leading-[16px] font-semibold">
                {entry.format === 'live-replay'
                  ? 'Live Replay'
                  : entry.format === 'async'
                  ? 'Async'
                  : entry.format.charAt(0).toUpperCase() + entry.format.slice(1)}
              </div>
            )}

            {showPresenter && entry.presenter && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{entry.presenter}</span>
              </div>
            )}
          </div>

          {/* Multi-Tag Pills */}
          <div className="flex flex-wrap gap-2">
            {/* Products - Colored tags */}
            {entry.products?.filter(Boolean).map((product) => (
              <span
                key={product._id}
                className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white"
                style={{ backgroundColor: product?.color || '#8C69F0' }}
              >
                {product?.name}
              </span>
            ))}

            {/* Teams - Outline tags */}
            {entry.teams?.filter(Boolean).map((team) => (
              <span
                key={team._id}
                className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold border border-[#DFDFDF] text-[#252525]"
              >
                {team?.name}
              </span>
            ))}

            {/* Topics - Subtle tags (max 3, then +N more) */}
            {entry.topics?.filter(Boolean).slice(0, 3).map((topic) => (
              <span
                key={topic._id}
                className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F3F3F3] text-[#252525]"
              >
                {topic?.name}
              </span>
            ))}
            {entry.topics && entry.topics.filter(Boolean).length > 3 && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F3F3F3] text-[#252525]">
                +{entry.topics.filter(Boolean).length - 3} more
              </span>
            )}

            {/* Journey Stage tags */}
            {entry.journeyStages?.filter(Boolean).map((stage) => (
              <span
                key={stage._id}
                className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold border border-[#E8E0F8] text-[#8C69F0] bg-[#E8E0F8]"
              >
                {stage?.icon && <span className="mr-1">{stage.icon}</span>}
                {stage?.name}
              </span>
            ))}
          </div>
        </div>

        {/* Actions (shown on hover) */}
        <div className="px-5 pb-5 pt-2 border-t border-[#F3F3F3] opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <span className="text-[13px] leading-[20px] text-[#8C69F0] font-semibold flex items-center gap-1">
              {isExternal ? 'Open Link' : 'View Content'}
              {isExternal ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </span>

            <div className="flex items-center gap-2">
              <button
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  // Share functionality
                }}
                title="Share"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>

              <button
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  // Bookmark functionality
                }}
                title="Bookmark"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
