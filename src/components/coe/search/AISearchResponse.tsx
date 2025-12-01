'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

interface AISource {
  id: string;
  title: string;
  slug: string;
  type: string;
  relevance: number;
}

interface AISearchResponseProps {
  answer: string;
  sources: AISource[];
  confidence: 'high' | 'medium' | 'low';
  isLoading?: boolean;
  className?: string;
}

export function AISearchResponse({
  answer,
  sources,
  confidence,
  isLoading = false,
  className,
}: AISearchResponseProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const confidenceConfig = {
    high: { color: 'bg-green-100 text-green-700', label: 'High confidence' },
    medium: { color: 'bg-yellow-100 text-yellow-700', label: 'Medium confidence' },
    low: { color: 'bg-orange-100 text-orange-700', label: 'Low confidence' },
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className={cn('bg-purple-50 rounded-2xl p-6 border border-purple-100', className)}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center animate-pulse">
            <span className="text-lg">AI</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-purple-900">AI Assistant</span>
              <span className="text-purple-400">is thinking...</span>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-purple-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-purple-200 rounded animate-pulse w-4/5" />
              <div className="h-4 bg-purple-200 rounded animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-purple-50 rounded-2xl border border-purple-100 overflow-hidden', className)}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-purple-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
            <span className="text-lg font-medium text-purple-700">AI</span>
          </div>
          <div className="text-left">
            <span className="font-semibold text-purple-900">AI Answer</span>
            <span className={cn('ml-2 px-2 py-0.5 rounded-full text-xs font-medium', confidenceConfig[confidence].color)}>
              {confidenceConfig[confidence].label}
            </span>
          </div>
        </div>
        <svg
          className={cn('w-5 h-5 text-purple-600 transition-transform', isExpanded && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6">
          {/* Answer */}
          <div className="prose prose-purple max-w-none mb-6 text-gray-800 whitespace-pre-wrap">
            {answer}
          </div>

          {/* Sources */}
          {sources.length > 0 && (
            <div className="border-t border-purple-200 pt-4">
              <h4 className="text-sm font-medium text-purple-700 mb-3">
                Sources ({sources.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {sources.map((source, i) => (
                  <Link
                    key={source.id}
                    href={`/coe/${source.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-white border border-purple-200 hover:border-purple-400 transition-colors"
                  >
                    <span className="text-purple-400 text-xs">[{i + 1}]</span>
                    <span className="text-gray-900 truncate max-w-[180px]">{source.title}</span>
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      source.relevance > 75 ? 'bg-green-500' : source.relevance > 50 ? 'bg-yellow-500' : 'bg-gray-300'
                    )} title={`${source.relevance}% relevance`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-purple-200 pt-4 mt-4 flex items-center justify-between">
            <span className="text-sm text-purple-600">Was this helpful?</span>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-purple-100 transition-colors text-sm" title="Helpful">
                Yes
              </button>
              <button className="p-2 rounded-lg hover:bg-purple-100 transition-colors text-sm" title="Not helpful">
                No
              </button>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                title="Copy answer"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
