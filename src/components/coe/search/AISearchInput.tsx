'use client';

import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

interface AISearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string, mode: 'search' | 'ask') => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function AISearchInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = 'Search or ask a question...',
  className,
}: AISearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect if input looks like a question
  const isQuestion = value.includes('?') ||
    /^(how|what|why|when|where|which|can|do|does|is|are|should|could|would|find|show|give|get|help)/i.test(value);

  const handleSubmit = (e: React.FormEvent, mode?: 'search' | 'ask') => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim(), mode || (isQuestion ? 'ask' : 'search'));
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className={cn(
        'relative rounded-2xl border-2 transition-all overflow-hidden bg-white',
        isFocused ? 'border-purple-500 shadow-lg shadow-purple-100' : 'border-gray-200 hover:border-gray-300'
      )}>
        {/* Mode indicator */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-medium transition-colors',
            isQuestion ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
          )}>
            {isQuestion ? 'AI' : 'Search'}
          </span>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-20 pr-36 py-4 text-lg outline-none disabled:opacity-50"
          disabled={isLoading}
        />

        {/* Action buttons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {value && !isLoading && (
            <>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'search')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'ask')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Ask AI
              </button>
            </>
          )}
          {isLoading && (
            <div className="flex items-center gap-2 px-3 py-1.5 text-purple-600">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm">Thinking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-sm text-gray-400 mt-2">
        Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">Cmd+K</kbd> to search - Ask a question for AI-powered answers
      </p>
    </form>
  );
}
