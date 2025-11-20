'use client'

import { badge } from '@/lib/theme'

interface Stat {
  value: string | number
  label: string
  icon?: string
  color?: string
}

type StyleVariant = 'minimal' | 'gradient' | 'badge' | 'border-legacy'

interface StatGridProps {
  stats: Stat[]
  columns?: 2 | 3 | 4
  styleVariant?: StyleVariant
  accentColor?: string
  className?: string
}

export default function StatGrid({
  stats,
  columns = 4,
  styleVariant = 'minimal',
  accentColor = '#8C69F0',
  className = ''
}: StatGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  }

  // Get card classes based on style variant
  const getCardClasses = () => {
    switch(styleVariant) {
      case 'minimal':
        return 'bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200'
      case 'gradient':
        return 'text-white rounded-lg p-6 shadow-lg'
      case 'badge':
        return 'bg-white border border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200'
      case 'border-legacy':
        return 'bg-white rounded-lg shadow-sm p-6 border-l-4'
      default:
        return 'bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200'
    }
  }

  // Get icon badge background color from stat color or default
  const getIconBgColor = (statColor?: string): string => {
    if (statColor) return statColor
    return badge.iconBg.purple
  }

  // Render icon based on style variant
  const renderIcon = (stat: Stat) => {
    if (!stat.icon) return null

    switch(styleVariant) {
      case 'minimal':
      case 'badge':
        // Icon badge with colored background
        return (
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-2xl mb-3"
            style={{ backgroundColor: getIconBgColor(stat.color) }}
          >
            {stat.icon}
          </div>
        )
      case 'gradient':
      case 'border-legacy':
      default:
        // Simple large emoji
        return <div className="text-2xl mb-2">{stat.icon}</div>
    }
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${getCardClasses()} ${
            styleVariant === 'border-legacy' ? stat.color || 'border-blue-500' : ''
          }`}
          style={styleVariant === 'gradient' ? {
            background: `linear-gradient(135deg, ${accentColor} 0%, ${adjustBrightness(accentColor, -20)} 100%)`
          } : {}}
        >
          {renderIcon(stat)}
          <div className={`text-3xl font-bold ${
            styleVariant === 'gradient' ? 'text-white' : 'text-gray-900'
          }`}>
            {stat.value}
          </div>
          <div className={`text-sm mt-1 ${
            styleVariant === 'gradient' ? 'text-white opacity-90' : 'text-gray-600'
          }`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Helper function to adjust color brightness for gradients
 * @param hex - Hex color code (e.g., "#8C69F0")
 * @param percent - Percentage to adjust (-100 to 100)
 * @returns Adjusted hex color
 */
function adjustBrightness(hex: string, percent: number): string {
  // Remove # if present
  const color = hex.replace('#', '')

  // Parse RGB
  const num = parseInt(color, 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + Math.round((255 * percent) / 100)))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + Math.round((255 * percent) / 100)))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + Math.round((255 * percent) / 100)))

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
}
