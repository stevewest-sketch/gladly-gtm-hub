'use client';

import { PortableText } from '@portabletext/react';

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextContentProps {
  content: any;
}

export default function PortableTextContent({ content }: PortableTextContentProps) {
  return (
    <div className="prose max-w-none">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}
