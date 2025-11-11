'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full text-left bg-white border-2 border-[#F3F3F3] rounded-lg p-4 text-sm hover:border-[#8C69F0] hover:shadow-md hover:-translate-y-0.5 transition-all group relative"
    >
      <div className="flex items-start gap-3">
        <span className="text-lg">💬</span>
        <span className="flex-1 text-[#0D0D0D] leading-relaxed">{text}</span>
        <span className={`text-xs font-semibold ${copied ? 'text-green-600' : 'text-[#8C69F0]'} opacity-0 group-hover:opacity-100 transition-opacity`}>
          {copied ? '✓ Copied!' : 'Copy'}
        </span>
      </div>
    </button>
  );
}
