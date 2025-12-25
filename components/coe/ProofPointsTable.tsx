'use client'

import { useState } from 'react'

interface ProofPoint {
  stat: string
  customer: string
  isBlind?: boolean
  kpiCategory: string
  product?: string[]
  channel?: string | null
  approved?: boolean
  context?: string
  sourceUrl?: string
}

interface ProofPointsTableProps {
  proofPoints: ProofPoint[]
  title?: string
}

// KPI badge colors
const KPI_COLORS: Record<string, string> = {
  'Resolution Rate': 'bg-green-100 text-green-800',
  'Handle Time': 'bg-blue-100 text-blue-800',
  'CSAT': 'bg-purple-100 text-purple-800',
  'FCR': 'bg-indigo-100 text-indigo-800',
  'Cost Savings': 'bg-emerald-100 text-emerald-800',
  'ROI': 'bg-amber-100 text-amber-800',
  'Volume': 'bg-cyan-100 text-cyan-800',
  'Self-Service': 'bg-teal-100 text-teal-800',
  'Revenue': 'bg-orange-100 text-orange-800',
  'Other': 'bg-gray-100 text-gray-800',
}

export default function ProofPointsTable({ proofPoints, title = "Proof Points" }: ProofPointsTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message)
    setTimeout(() => setCopyFeedback(null), 2000)
  }

  const copyToClipboard = async (text: string, feedbackMessage: string = 'Copied!') => {
    try {
      await navigator.clipboard.writeText(text)
      showCopyFeedback(feedbackMessage)
    } catch {
      showCopyFeedback('Failed to copy')
    }
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Copy Feedback Toast */}
      {copyFeedback && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
          {copyFeedback}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#0D0D0D] text-white p-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <span>📊</span>
          {title}
        </h3>
        <p className="text-sm text-gray-300 mt-2">
          {proofPoints.length} proof point{proofPoints.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                Stat
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-32">
                Customer
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-28">
                KPI
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-28">
                Product
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-20">
                Channel
              </th>
              <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-12">
                OK
              </th>
              <th className="w-20 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {proofPoints.map((point, index) => (
              <>
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-amber-50/50 transition-colors cursor-pointer ${
                    expandedId === index ? 'bg-amber-50/50' : ''
                  }`}
                  onClick={() => setExpandedId(expandedId === index ? null : index)}
                >
                  {/* Stat */}
                  <td className="p-4">
                    <div className="text-sm text-gray-900 font-medium leading-snug">
                      {point.stat}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="p-4">
                    <span className={`text-sm ${point.isBlind ? 'italic text-gray-500' : 'text-gray-700'}`}>
                      {point.customer}
                    </span>
                  </td>

                  {/* KPI */}
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${KPI_COLORS[point.kpiCategory] || KPI_COLORS['Other']}`}>
                      {point.kpiCategory}
                    </span>
                  </td>

                  {/* Product */}
                  <td className="p-4">
                    <span className="text-xs text-gray-600">
                      {point.product?.join(', ') || '-'}
                    </span>
                  </td>

                  {/* Channel */}
                  <td className="p-4">
                    <span className="text-xs text-gray-600">
                      {point.channel || '-'}
                    </span>
                  </td>

                  {/* Approved */}
                  <td className="p-4 text-center">
                    {point.approved ? (
                      <span className="text-green-600" title="Approved for external use">
                        <svg className="w-5 h-5 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>

                  {/* Copy Button */}
                  <td className="p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(point.stat, 'Stat copied!')
                      }}
                      className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </button>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedId === index && (point.context || point.sourceUrl) && (
                  <tr key={`${index}-expanded`} className="bg-amber-50/30 border-b border-gray-200">
                    <td colSpan={7} className="p-4">
                      <div className="pl-10 space-y-3">
                        {/* Context */}
                        {point.context && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Context:</span> {point.context}
                          </p>
                        )}

                        {/* Source URL */}
                        {point.sourceUrl && (
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Source:</span>{' '}
                            <a
                              href={point.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-600 hover:text-amber-700 underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View source
                            </a>
                          </p>
                        )}

                        {/* Copy Options */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(`${point.stat} (${point.customer})`, 'Copied with source!')
                            }}
                            className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Copy with source
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(`"${point.stat}" — ${point.customer}`, 'Copied as quote!')
                            }}
                            className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Copy as quote
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {proofPoints.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">No proof points available</h3>
            <p className="text-sm text-gray-500">Check back later for customer success stories.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
