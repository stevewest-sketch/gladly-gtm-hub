'use client'

import { CatalogEntry } from '@/lib/types/catalog'

interface BattleCardTemplateProps {
  entry: CatalogEntry
}

export default function BattleCardTemplate({ entry }: BattleCardTemplateProps) {
  const competitor = entry.competitor

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency-Optimized Header - Critical Info Above Fold */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            {competitor?.logo && (
              <div className="w-16 h-16 bg-white rounded-lg p-2">
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                  Logo
                </div>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm opacity-90">⚔️ Competitive Intelligence</span>
                {competitor?.lastReviewed && (
                  <span className="text-xs opacity-75">
                    Last reviewed: {new Date(competitor.lastReviewed).toLocaleDateString()}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold">{competitor?.name || entry.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* AI Overview */}
        {competitor?.aiGeneratedOverview && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-bold text-gray-900">Quick Overview</h2>
              {competitor.generationMethod === 'auto' && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
                  <span>✨</span> AI-Generated
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{competitor.aiGeneratedOverview}</p>
          </div>
        )}

        {/* How Gladly Wins */}
        {competitor?.keyDifferentiators && competitor.keyDifferentiators.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-sm p-6 mb-6 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🏆</span>
              How Gladly Wins
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competitor.keyDifferentiators.map((diff, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 flex-1">{diff}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {entry.battleCardFile && (
            <button className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-[#8C69F0] group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-[#8C69F0] transition-colors">
                  <svg className="w-6 h-6 text-[#8C69F0] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Battle Card</div>
                  <div className="text-sm text-gray-500">Download PDF</div>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Common Objections */}
        {competitor?.commonObjections && competitor.commonObjections.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>💬</span>
              Common Objections & Responses
            </h2>
            <div className="space-y-4">
              {competitor.commonObjections.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-[#8C69F0] transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-2">{item.objection}</div>
                      <div className="text-gray-700 bg-green-50 rounded p-3 border-l-2 border-green-500">
                        <div className="text-xs text-green-700 font-medium mb-1">✓ Response:</div>
                        {item.response}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quarterly Updates */}
        {entry.quarterlyUpdates && entry.quarterlyUpdates.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Quarterly Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entry.quarterlyUpdates.map((update, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#8C69F0] transition-colors">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs opacity-75">Video: {update.wistiaId}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{new Date(update.date).toLocaleDateString()}</span>
                      {update.presenter && <span>• {update.presenter}</span>}
                    </div>
                    {update.whatsNew && update.whatsNew.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs font-medium text-gray-700 mb-1">What's New:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {update.whatsNew.slice(0, 2).map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
