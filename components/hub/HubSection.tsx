'use client'

interface HubSectionProps {
  id?: string
  title?: string
  description?: string
  icon?: string
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient' | 'dark'
  noPadding?: boolean
  transparent?: boolean
}

export default function HubSection({
  id,
  title,
  description,
  icon,
  children,
  className = '',
  background = 'white',
  noPadding = false,
  transparent = false
}: HubSectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-gray-50 to-white',
    dark: 'bg-gray-900'
  }

  const textColors = {
    white: 'text-gray-900',
    gray: 'text-gray-900',
    gradient: 'text-gray-900',
    dark: 'text-white'
  }

  // If transparent, no styling. If className contains background classes, don't apply default background
  const hasCustomBackground = className.includes('bg-')
  const baseClasses = transparent ? 'mb-8' : (noPadding ? '' : 'rounded-xl p-6 md:p-8')
  const backgroundClass = transparent ? '' : (hasCustomBackground ? '' : backgrounds[background])

  return (
    <div
      id={id}
      className={`${backgroundClass} ${baseClasses} ${className} scroll-mt-24`}
    >
      {(title || description || icon) && (
        <div className="mb-6">
          {icon && title && (
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl">{icon}</span>
              <div>
                <h2 className={`text-2xl font-bold ${className.includes('text-white') ? 'text-white' : textColors[background]} mb-1`}>{title}</h2>
                {description && <p className={`text-sm ${className.includes('text-white') ? 'text-white opacity-90' : 'text-gray-600'}`}>{description}</p>}
              </div>
            </div>
          )}
          {icon && !title && (
            <div className="text-4xl mb-3">{icon}</div>
          )}
          {title && !icon && (
            <>
              <h2 className={`text-2xl font-bold ${className.includes('text-white') ? 'text-white' : textColors[background]} mb-2`}>{title}</h2>
              {description && <p className={`${className.includes('text-white') ? 'text-white opacity-90' : 'text-gray-600'}`}>{description}</p>}
            </>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
