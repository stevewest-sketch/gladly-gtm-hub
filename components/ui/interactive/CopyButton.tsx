'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  successMessage?: string;
  className?: string;
  variant?: 'default' | 'minimal';
}

/**
 * Copy to Clipboard Button
 * Copies text with visual feedback
 */
export function CopyButton({
  text,
  label = 'Copy',
  successMessage = 'Copied!',
  className = '',
  variant = 'default',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 text-sm text-primary-purple hover:text-purple-700 transition-colors ${className}`}
        title={copied ? successMessage : label}
      >
        {copied ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{successMessage}</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-primary-purple text-white hover:bg-purple-700'
      } ${className}`}
    >
      {copied ? successMessage : label}
    </button>
  );
}

/**
 * Code Block with Copy Button
 * Pre-formatted code with easy copying
 */
export function CodeBlock({
  code,
  language = 'text',
  className = '',
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} variant="minimal" />
      </div>
      <pre className="bg-neutral-dark text-white p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
