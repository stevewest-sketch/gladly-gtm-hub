'use client';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { AISearchResponse } from '@/src/types/unified-search';

interface AISummaryProps {
  aiResponse: AISearchResponse;
}

export function AISummary({ aiResponse }: AISummaryProps) {
  const { answer, sources, confidence } = aiResponse;

  // Get URL for a source
  const getSourceUrl = (source: typeof sources[0]) => {
    if (source.hub === 'coe') return `/coe-hub/${source.slug}`;
    if (source.hub === 'content') return `/content-hub/${source.slug}`;
    return `/catalog/${source.slug}`;
  };

  // Hub colors for source cards
  const hubStyles: Record<string, { bg: string; border: string; text: string; label: string }> = {
    coe: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', label: 'CoE Hub' },
    enablement: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', label: 'Enablement' },
    content: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Content Hub' },
  };

  // Type labels and icons
  const typeInfo: Record<string, { label: string; icon: string }> = {
    'proof-point': { label: 'Proof Point', icon: '📊' },
    'best-practice': { label: 'Best Practice', icon: '✨' },
    'process-innovation': { label: 'Process Innovation', icon: '⚡' },
    'meeting-asset': { label: 'Meeting Asset', icon: '📋' },
    'competitive': { label: 'Competitive Intel', icon: '🎯' },
    'training': { label: 'Training', icon: '📚' },
    'coeEntry': { label: 'CoE Entry', icon: '⭐' },
    'catalogEntry': { label: 'Resource', icon: '📁' },
  };

  // Process text to replace [1], [2] etc. with links
  const processCitations = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const num = parseInt(match[1]);
        const index = num - 1;
        const source = sources[index];
        if (source) {
          return (
            <Link
              key={i}
              href={getSourceUrl(source)}
              className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 mx-0.5 text-xs font-semibold text-purple-700 bg-purple-100 rounded hover:bg-purple-200 transition-colors no-underline align-middle"
              title={source.title}
            >
              {num}
            </Link>
          );
        }
      }
      return part;
    });
  };

  // Recursively process children to find text nodes and convert citations
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') {
      return processCitations(children);
    }
    if (Array.isArray(children)) {
      return children.map((child, i) => (
        <span key={i}>{processChildren(child)}</span>
      ));
    }
    return children;
  };

  return (
    <div className="mb-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI Summary</h3>
              <p className="text-sm text-white/80">Synthesized from {sources.length} sources</p>
            </div>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
            confidence === 'high' ? 'bg-green-500/30 text-green-100 border border-green-400/40' :
            confidence === 'medium' ? 'bg-yellow-500/30 text-yellow-100 border border-yellow-400/40' :
            'bg-white/20 text-white/90 border border-white/30'
          }`}>
            {confidence} confidence
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="prose prose-slate prose-sm max-w-none
          prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
          prose-h2:text-lg prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
          prose-h3:text-base prose-h3:text-gray-800
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-2
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-ul:my-2 prose-li:my-0.5 prose-li:text-gray-700
        ">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p>{processChildren(children)}</p>,
              li: ({ children }) => <li>{processChildren(children)}</li>,
              strong: ({ children }) => <strong>{processChildren(children)}</strong>,
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>

        {/* Source Cards */}
        {sources.length > 0 && (
          <div className="mt-6 pt-5 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Referenced Sources</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {sources.map((source, i) => {
                const style = hubStyles[source.hub] || hubStyles.content;
                const type = typeInfo[source.type] || { label: source.type, icon: '📄' };

                return (
                  <Link
                    key={source.id}
                    href={getSourceUrl(source)}
                    className={`group flex items-start gap-3 p-3 rounded-xl border ${style.border} ${style.bg} hover:shadow-md transition-all no-underline`}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-gray-200 text-sm font-bold text-gray-600 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${style.text} group-hover:underline line-clamp-2`}>
                        {source.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-gray-500">{type.icon} {type.label}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-500">{style.label}</span>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
