'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  currentPage: string
}

export default function Breadcrumb({ items, currentPage }: BreadcrumbProps) {
  const searchParams = useSearchParams()
  const fromPath = searchParams.get('from')

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              <Link
                href={item.href}
                className="text-gray-600 hover:text-[#009B00] transition-colors font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-400 mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-semibold truncate max-w-md" title={currentPage}>
              {currentPage}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  )
}
