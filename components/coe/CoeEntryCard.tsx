'use client'

import Link from 'next/link'

interface CoeEntry {
  _id: string
  title: string
  slug: { current: string }
  summary?: string
  headline?: string
  entryType: string
  proofType?: string
  customer?: string
  icon?: string
  featured?: boolean
  permission?: { name: string; color: string }
  section?: { name: string; icon: string; slug: { current: string } }
  _createdAt: string
  // Meeting asset fields
  account?: string
  meetingType?: string
  customerLogoUrl?: string
  deliveryDate?: string
  salesStage?: string
}

interface CoeEntryCardProps {
  entry: CoeEntry
  variant?: 'featured' | 'compact' | 'standard' | 'meeting'
}

const ENTRY_TYPE_COLORS: Record<string, string> = {
  'proof-point': '#10B981',      // Emerald
  'best-practice': '#8C69F0',    // Purple
  'process-innovation': '#3B82F6', // Blue
  'internal-best-practice': '#F59E0B', // Amber
  'tool': '#EF4444',             // Red
  'meeting-asset': '#6366F1',    // Indigo
}

const ENTRY_TYPE_LABELS: Record<string, string> = {
  'proof-point': 'Proof Point',
  'best-practice': 'Best Practice',
  'process-innovation': 'Process Innovation',
  'internal-best-practice': 'Internal Best Practice',
  'tool': 'Tool',
  'meeting-asset': 'Meeting Asset',
}

const ENTRY_TYPE_ICONS: Record<string, string> = {
  'proof-point': '📊',
  'best-practice': '✨',
  'process-innovation': '💡',
  'internal-best-practice': '🏢',
  'tool': '🛠️',
  'meeting-asset': '📁',
}

const PROOF_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'stat': { bg: '#DCFCE7', text: '#166534', border: '#BBF7D0' },
  'benchmark': { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' },
  'anecdote': { bg: '#F3E8FF', text: '#7C3AED', border: '#E9D5FF' },
  'quote': { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' },
  'case-study': { bg: '#FCE7F3', text: '#BE185D', border: '#FBCFE8' },
}

const PERMISSION_COLORS: Record<string, { bg: string; text: string }> = {
  'green': { bg: '#DCFCE7', text: '#166534' },
  'yellow': { bg: '#FEF3C7', text: '#B45309' },
  'red': { bg: '#FEE2E2', text: '#B91C1C' },
  'gray': { bg: '#F3F4F6', text: '#4B5563' },
}

export default function CoeEntryCard({
  entry,
  variant = 'standard',
}: CoeEntryCardProps) {
  const linkHref = entry.slug?.current ? `/coe/${entry.slug.current}` : '#'

  const entryTypeName = ENTRY_TYPE_LABELS[entry.entryType] || entry.entryType
  const entryTypeColor = ENTRY_TYPE_COLORS[entry.entryType] || '#F59E0B'
  const entryTypeIcon = entry.icon || ENTRY_TYPE_ICONS[entry.entryType] || '📄'

  const proofTypeStyle = entry.proofType ? PROOF_TYPE_COLORS[entry.proofType] : null
  const permissionStyle = entry.permission?.color ? PERMISSION_COLORS[entry.permission.color] : null

  // Helper to format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Determine if this should use meeting card style (meeting-asset type or explicit variant)
  const useMeetingStyle = variant === 'meeting' || (entry.entryType === 'meeting-asset' && variant === 'standard')

  // Meeting card variant - for customer meetings with logo, date, stage
  if (useMeetingStyle) {
    const meetingTitle = entry.account && entry.meetingType
      ? `${entry.account} ${entry.meetingType}`
      : entry.title

    return (
      <Link href={linkHref} className="group block h-full">
        <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#6366F1] hover:shadow-lg hover:-translate-y-1">
          <div className="p-5 flex flex-col h-full">
            {/* Customer Logo */}
            {entry.customerLogoUrl && (
              <div className="mb-3 h-10 flex items-center">
                <img
                  src={entry.customerLogoUrl}
                  alt={entry.account || 'Customer'}
                  className="h-8 max-w-[45%] object-contain object-left"
                />
              </div>
            )}

            {/* Title: Account + Type */}
            <h3 className="text-[15px] leading-[22px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#6366F1] transition-colors">
              {meetingTitle}
            </h3>

            {/* Description */}
            <p className="text-[13px] leading-[20px] text-[#666666] mb-4 line-clamp-2 flex-grow">
              {entry.summary || entry.headline}
            </p>

            {/* Bottom row: Date left, Stage right */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F3F3F3]">
              {/* Date */}
              <span className="text-[12px] leading-[16px] text-[#666666]">
                {formatDate(entry.deliveryDate) || formatDate(entry._createdAt)}
              </span>

              {/* Stage Tag */}
              {entry.salesStage && (
                <span
                  className={`px-2 py-1 rounded text-[11px] leading-[14px] font-semibold ${
                    entry.salesStage === 'pre-sales'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {entry.salesStage === 'pre-sales' ? 'Pre-sales' : 'Post-sales'}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <Link href={linkHref} className="group block h-full">
        <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#F59E0B] hover:shadow-lg hover:-translate-y-1">
          <div className="p-5">
            {/* Entry Type Badge and Featured Badge */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="inline-block px-3 py-1 rounded-full text-white text-[12px] leading-[16px] font-semibold"
                style={{ backgroundColor: entryTypeColor }}
              >
                <span className="mr-1">{entryTypeIcon}</span>
                {entryTypeName}
              </div>
              {entry.featured && (
                <div className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F5A623] text-gray-900">
                  Featured
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#F59E0B] transition-colors">
              {entry.title}
            </h3>

            {/* Summary */}
            <p className="text-[13px] leading-[20px] text-[#252525] mb-4 line-clamp-3">
              {entry.summary || entry.headline}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-2">
              {entry.proofType && proofTypeStyle && (
                <span
                  className="px-2 py-0.5 rounded text-[12px] leading-[16px] font-semibold border"
                  style={{
                    backgroundColor: proofTypeStyle.bg,
                    color: proofTypeStyle.text,
                    borderColor: proofTypeStyle.border,
                  }}
                >
                  {entry.proofType}
                </span>
              )}
              {entry.permission && permissionStyle && (
                <span
                  className="px-2 py-0.5 rounded text-[12px] leading-[16px] font-semibold"
                  style={{
                    backgroundColor: permissionStyle.bg,
                    color: permissionStyle.text,
                  }}
                >
                  {entry.permission.name}
                </span>
              )}
              {entry.customer && entry.customer !== 'N/A' && (
                <span className="text-[12px] leading-[16px] text-[#666666]">
                  {entry.customer}
                </span>
              )}
            </div>
          </div>

          {/* Action footer */}
          <div className="px-5 pb-5 pt-2 border-t border-[#F3F3F3] opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[13px] leading-[20px] text-[#F59E0B] font-semibold flex items-center gap-1">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <Link href={linkHref} className="group block h-full">
        <div className="h-full bg-white border border-[#DFDFDF] rounded-lg p-4 hover:border-[#F59E0B] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white"
              style={{ backgroundColor: entryTypeColor }}
            >
              <span className="mr-1">{entryTypeIcon}</span>
              {entryTypeName}
            </span>
            {entry.featured && (
              <span className="inline-block px-1.5 py-0.5 rounded text-[11px] leading-[14px] font-semibold bg-[#F5A623] text-gray-900">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-[15px] leading-[24px] font-semibold text-[#0D0D0D] mb-1 line-clamp-2 group-hover:text-[#F59E0B] transition-colors">
            {entry.title}
          </h3>
          {entry.section && (
            <p className="text-[12px] leading-[16px] text-[#666666]">
              {entry.section.icon} {entry.section.name}
            </p>
          )}
        </div>
      </Link>
    )
  }

  // Standard variant
  return (
    <Link href={linkHref} className="group block h-full">
      <div className="h-full border border-[#DFDFDF] rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-[#F59E0B] hover:shadow-lg hover:-translate-y-1">
        <div className="p-5">
          {/* Entry Type Badge and Featured Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold text-white"
              style={{ backgroundColor: entryTypeColor }}
            >
              <span className="mr-1">{entryTypeIcon}</span>
              {entryTypeName}
            </div>
            {entry.featured && (
              <div className="inline-block px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F5A623] text-gray-900">
                Featured
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[15px] leading-[24px] tracking-[-0.005em] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 group-hover:text-[#F59E0B] transition-colors">
            {entry.title}
          </h3>

          {/* Summary */}
          <p className="text-[13px] leading-[20px] text-[#252525] mb-3 line-clamp-2">
            {entry.summary || entry.headline}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-2">
            {entry.proofType && proofTypeStyle && (
              <span
                className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold border"
                style={{
                  backgroundColor: proofTypeStyle.bg,
                  color: proofTypeStyle.text,
                  borderColor: proofTypeStyle.border,
                }}
              >
                {entry.proofType}
              </span>
            )}
            {entry.permission && permissionStyle && (
              <span
                className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold"
                style={{
                  backgroundColor: permissionStyle.bg,
                  color: permissionStyle.text,
                }}
              >
                {entry.permission.name}
              </span>
            )}
            {entry.customer && entry.customer !== 'N/A' && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold border border-[#DFDFDF] text-[#252525]">
                {entry.customer}
              </span>
            )}
            {entry.section && (
              <span className="px-2 py-1 rounded text-[12px] leading-[16px] font-semibold bg-[#F3F3F3] text-[#252525]">
                {entry.section.icon} {entry.section.name}
              </span>
            )}
          </div>
        </div>

        {/* Action footer */}
        <div className="px-5 pb-5 pt-2 border-t border-[#F3F3F3] opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[13px] leading-[20px] text-[#F59E0B] font-semibold flex items-center gap-1">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
