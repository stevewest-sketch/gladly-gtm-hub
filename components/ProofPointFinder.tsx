'use client'

import { useState, useMemo, useCallback } from 'react'

interface ProofPoint {
  _id: string
  stat: string
  customer: string
  isBlind: boolean
  kpiCategory: string
  product: string[]
  channel: string | null
  approved: boolean
  sourceUrl?: string
  context?: string
  industry?: string
}

interface ProofPointFinderProps {
  proofPoints: ProofPoint[]
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

export default function ProofPointFinder({ proofPoints }: ProofPointFinderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedKpi, setSelectedKpi] = useState<string>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all')
  const [selectedProduct, setSelectedProduct] = useState<string>('all')
  const [selectedChannel, setSelectedChannel] = useState<string>('all')
  const [approvedOnly, setApprovedOnly] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)

  // Get unique values for filters
  const kpiOptions = useMemo(() => {
    const kpis = new Set(proofPoints.map(p => p.kpiCategory).filter(Boolean))
    return Array.from(kpis).sort()
  }, [proofPoints])

  const customerOptions = useMemo(() => {
    const customers = new Set(proofPoints.map(p => p.customer).filter(Boolean))
    return Array.from(customers).sort()
  }, [proofPoints])

  const productOptions = useMemo(() => {
    const products = new Set(proofPoints.flatMap(p => p.product || []))
    return Array.from(products).sort()
  }, [proofPoints])

  const channelOptions = useMemo(() => {
    const channels = new Set(proofPoints.map(p => p.channel).filter(Boolean) as string[])
    return Array.from(channels).sort()
  }, [proofPoints])

  // Filter proof points
  const filteredPoints = useMemo(() => {
    let result = [...proofPoints]

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.stat.toLowerCase().includes(query) ||
        p.customer?.toLowerCase().includes(query) ||
        p.context?.toLowerCase().includes(query)
      )
    }

    // KPI filter
    if (selectedKpi !== 'all') {
      result = result.filter(p => p.kpiCategory === selectedKpi)
    }

    // Customer filter
    if (selectedCustomer !== 'all') {
      result = result.filter(p => p.customer === selectedCustomer)
    }

    // Product filter
    if (selectedProduct !== 'all') {
      result = result.filter(p => p.product?.includes(selectedProduct))
    }

    // Channel filter
    if (selectedChannel !== 'all') {
      result = result.filter(p => p.channel === selectedChannel)
    }

    // Approved only
    if (approvedOnly) {
      result = result.filter(p => p.approved)
    }

    return result
  }, [proofPoints, searchQuery, selectedKpi, selectedCustomer, selectedProduct, selectedChannel, approvedOnly])

  // Copy functionality
  const showCopyFeedback = useCallback((message: string) => {
    setCopyFeedback(message)
    setTimeout(() => setCopyFeedback(null), 2000)
  }, [])

  const copyToClipboard = useCallback(async (text: string, feedbackMessage: string = 'Copied!') => {
    try {
      await navigator.clipboard.writeText(text)
      showCopyFeedback(feedbackMessage)
    } catch {
      showCopyFeedback('Failed to copy')
    }
  }, [showCopyFeedback])

  const copyStat = (point: ProofPoint) => {
    copyToClipboard(point.stat, 'Stat copied!')
  }

  const copyWithSource = (point: ProofPoint) => {
    const text = `${point.stat} (${point.customer})`
    copyToClipboard(text, 'Copied with source!')
  }

  const copyAsQuote = (point: ProofPoint) => {
    const text = `"${point.stat}" — ${point.customer}`
    copyToClipboard(text, 'Copied as quote!')
  }

  const copySelected = () => {
    const selected = proofPoints.filter(p => selectedIds.has(p._id))
    const text = selected.map(p => `- ${p.stat} (${p.customer})`).join('\n')
    copyToClipboard(text, `${selected.length} stats copied!`)
  }

  // Selection handlers
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectAll = () => {
    if (selectedIds.size === filteredPoints.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredPoints.map(p => p._id)))
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedKpi('all')
    setSelectedCustomer('all')
    setSelectedProduct('all')
    setSelectedChannel('all')
    setApprovedOnly(false)
  }

  return (
    <div className="relative">
      {/* Copy Feedback Toast */}
      {copyFeedback && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
          {copyFeedback}
        </div>
      )}

      {/* Search + Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg mb-4 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100 transition-all">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search proof points..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-transparent text-sm text-gray-900 w-full outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* KPI Filter */}
          <select
            value={selectedKpi}
            onChange={(e) => setSelectedKpi(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer"
          >
            <option value="all">All KPIs</option>
            {kpiOptions.map(kpi => (
              <option key={kpi} value={kpi}>{kpi}</option>
            ))}
          </select>

          {/* Customer Filter */}
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer"
          >
            <option value="all">All Customers</option>
            {customerOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Product Filter */}
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer"
          >
            <option value="all">All Products</option>
            {productOptions.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Channel Filter */}
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer"
          >
            <option value="all">All Channels</option>
            {channelOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Approved Only Toggle */}
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={approvedOnly}
              onChange={(e) => setApprovedOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            Approved only
          </label>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {filteredPoints.length} proof point{filteredPoints.length !== 1 ? 's' : ''}
          </span>
          {selectedIds.size > 0 && (
            <button
              onClick={copySelected}
              className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy {selectedIds.size} selected
            </button>
          )}
        </div>
        <button
          onClick={selectAll}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {selectedIds.size === filteredPoints.length ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-10 px-4 py-3"></th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Stat</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-32">Customer</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-28">KPI</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-28">Product</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-20">Channel</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-12">OK</th>
              <th className="w-20 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPoints.map((point) => (
              <>
                <tr
                  key={point._id}
                  className={`hover:bg-amber-50/50 transition-colors ${expandedId === point._id ? 'bg-amber-50/50' : ''}`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(point._id)}
                      onChange={() => toggleSelect(point._id)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                  </td>

                  {/* Stat */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setExpandedId(expandedId === point._id ? null : point._id)}
                      className="text-left text-sm text-gray-900 hover:text-amber-700 font-medium leading-snug"
                    >
                      {point.stat}
                    </button>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <span className={`text-sm ${point.isBlind ? 'italic text-gray-500' : 'text-gray-700'}`}>
                      {point.customer}
                    </span>
                  </td>

                  {/* KPI */}
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${KPI_COLORS[point.kpiCategory] || KPI_COLORS['Other']}`}>
                      {point.kpiCategory}
                    </span>
                  </td>

                  {/* Product */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600">
                      {point.product?.join(', ') || '-'}
                    </span>
                  </td>

                  {/* Channel */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600">
                      {point.channel || '-'}
                    </span>
                  </td>

                  {/* Approved */}
                  <td className="px-4 py-3 text-center">
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
                  <td className="px-4 py-3">
                    <button
                      onClick={() => copyStat(point)}
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
                {expandedId === point._id && (
                  <tr key={`${point._id}-expanded`} className="bg-amber-50/30">
                    <td colSpan={8} className="px-4 py-4">
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
                            >
                              View source
                            </a>
                          </p>
                        )}

                        {/* Copy Options */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => copyWithSource(point)}
                            className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Copy with source
                          </button>
                          <button
                            onClick={() => copyAsQuote(point)}
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

        {filteredPoints.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">No proof points found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
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
