'use client'

interface Step {
  icon?: string
  title: string
  description: string
  details?: string[]
}

type ElevationLevel = 'none' | 'subtle' | 'medium'

interface ProcessStepsProps {
  steps: Step[]
  columns?: 2 | 3 | 4
  variant?: 'default' | 'compact'
  accentColor?: string
  elevation?: ElevationLevel
  className?: string
}

export default function ProcessSteps({
  steps,
  columns = 3,
  variant = 'default',
  accentColor = '#8C69F0',
  elevation = 'subtle',
  className = ''
}: ProcessStepsProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  const elevationClasses = {
    none: '',
    subtle: 'shadow-sm hover:shadow-md',
    medium: 'shadow-md hover:shadow-lg'
  }

  if (variant === 'compact') {
    return (
      <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`bg-white border border-[#F3F3F3] rounded-lg p-4 hover:-translate-y-1 transition-all duration-200 ${elevationClasses[elevation]}`}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = accentColor
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#F3F3F3'
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {index + 1}
              </div>
              <h4 className="text-base font-semibold text-gray-900">{step.title}</h4>
            </div>
            {step.description && (
              <p className="text-sm text-gray-600 mb-2 ml-11">{step.description}</p>
            )}
            {step.details && (
              <ul className="space-y-1 text-xs text-gray-600 ml-11">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: accentColor }} className="flex-shrink-0">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-8 ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="text-center">
          {step.icon ? (
            <div className="text-5xl mb-4">{step.icon}</div>
          ) : (
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold text-white mb-4"
              style={{ backgroundColor: accentColor }}
            >
              {index + 1}
            </div>
          )}
          <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
          {step.details && (
            <ul className="mt-4 text-sm text-gray-600 space-y-2 text-left">
              {step.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: accentColor }} className="flex-shrink-0 font-bold">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
