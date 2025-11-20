'use client'

interface CuratedSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export default function CuratedSection({
  title,
  description,
  children,
  className = ''
}: CuratedSectionProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
