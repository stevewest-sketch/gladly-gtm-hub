'use client'

import { badge } from '@/lib/theme'

type IconStyle = 'emoji' | 'badge'

interface FeatureCardProps {
  icon?: string
  title: string
  description: string
  meta?: string
  cta?: string
  link?: string
  tag?: string
  tagColor?: string
  iconStyle?: IconStyle
  iconBadgeColor?: string
  hoverColor?: string
  onClick?: () => void
  className?: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  meta,
  cta,
  link,
  tag,
  tagColor,
  iconStyle = 'emoji',
  iconBadgeColor,
  hoverColor = '#8C69F0',
  onClick,
  className = ''
}: FeatureCardProps) {
  const Component = link ? 'a' : 'div'
  const props = link
    ? { href: link, target: link.startsWith('http') ? '_blank' : '_self', rel: link.startsWith('http') ? 'noopener noreferrer' : undefined }
    : {}

  // Render icon based on style
  const renderIcon = () => {
    if (!icon) return null

    if (iconStyle === 'badge') {
      // Icon badge with colored background
      const bgColor = iconBadgeColor || badge.iconBg.purple
      return (
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-2xl mb-3"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
      )
    }

    // Default: Large emoji
    return <div className="text-4xl mb-3">{icon}</div>
  }

  return (
    <Component
      {...props}
      onClick={onClick}
      className={`group bg-white border border-[#F3F3F3] rounded-lg p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer no-underline flex flex-col ${className}`}
      style={{
        ['--hover-border-color' as string]: hoverColor
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = hoverColor
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#F3F3F3'
      }}
    >
      {renderIcon()}
      {meta && <div className="text-xs text-gray-500 mb-2">{meta}</div>}
      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8C69F0] transition-colors">
        {title}
      </h4>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
        {description}
      </p>
      <div className="flex justify-between items-center gap-3">
        {cta && (
          <span className="text-[#8C69F0] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            {cta}
            {link && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </span>
        )}
        {tag && (
          <span
            className="px-3 py-1 rounded-full font-medium text-xs text-white flex-shrink-0"
            style={{ backgroundColor: tagColor || '#8C69F0' }}
          >
            {tag}
          </span>
        )}
      </div>
    </Component>
  )
}
