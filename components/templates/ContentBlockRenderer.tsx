'use client'

import { PortableText } from '@portabletext/react'
import { useState } from 'react'
import { ContentBlock } from '@/lib/types/catalog'

interface ContentBlockRendererProps {
  blocks: ContentBlock[]
}

export default function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <BlockComponent key={block._key} block={block} />
      ))}
    </div>
  )
}

function BlockComponent({ block }: { block: ContentBlock }) {
  const [isOpen, setIsOpen] = useState(!block.collapsible)

  // Get icon and color based on block type
  const getBlockStyle = (type: string) => {
    const styles = {
      richText: { icon: '📝', color: 'bg-gray-50', borderColor: 'border-gray-200' },
      stepByStep: { icon: '📋', color: 'bg-blue-50', borderColor: 'border-blue-200' },
      faq: { icon: '❓', color: 'bg-purple-50', borderColor: 'border-purple-200' },
      tips: { icon: '💡', color: 'bg-yellow-50', borderColor: 'border-yellow-200' },
      mistakes: { icon: '⚠️', color: 'bg-red-50', borderColor: 'border-red-200' },
      useCases: { icon: '🎯', color: 'bg-green-50', borderColor: 'border-green-200' },
      howToUse: { icon: '🔧', color: 'bg-indigo-50', borderColor: 'border-indigo-200' },
      dataStats: { icon: '📊', color: 'bg-teal-50', borderColor: 'border-teal-200' },
    }
    return styles[type as keyof typeof styles] || styles.richText
  }

  const style = getBlockStyle(block.blockType)

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${style.borderColor} overflow-hidden`}>
      {/* Header */}
      {block.collapsible ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-6 ${style.color} hover:opacity-80 transition-opacity`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{style.icon}</span>
            <h2 className="text-xl font-bold text-gray-900">{block.title}</h2>
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <div className={`flex items-center gap-3 p-6 ${style.color}`}>
          <span className="text-2xl">{style.icon}</span>
          <h2 className="text-xl font-bold text-gray-900">{block.title}</h2>
        </div>
      )}

      {/* Content */}
      {isOpen && (
        <div className="p-6 pt-0">
          {/* Rich Text Content */}
          {block.content && block.content.length > 0 && (
            <div className="prose prose-gray max-w-none">
              <PortableText
                value={block.content}
                components={{
                  block: {
                    h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">{children}</h4>,
                    normal: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[#009B00] pl-4 py-2 italic text-gray-600 my-6">
                        {children}
                      </blockquote>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
                    number: ({ children }) => <li className="text-gray-700">{children}</li>,
                  },
                  marks: {
                    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-[#8C69F0]">{children}</code>
                    ),
                    underline: ({ children }) => <u>{children}</u>,
                    'strike-through': ({ children }) => <s className="text-gray-400">{children}</s>,
                    link: ({ value, children }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#009B00] hover:text-[#008000] underline"
                      >
                        {children}
                      </a>
                    ),
                    highlight: ({ value, children }) => {
                      const colors = {
                        yellow: 'bg-yellow-200',
                        green: 'bg-green-200',
                        blue: 'bg-blue-200',
                        purple: 'bg-purple-200',
                      }
                      return <span className={`${colors[value?.color as keyof typeof colors] || 'bg-yellow-200'} px-1`}>{children}</span>
                    },
                  },
                  types: {
                    image: ({ value }) => (
                      <figure className="my-6">
                        <img
                          src={value.asset?._ref}
                          alt={value.alt || ''}
                          className="rounded-lg w-full"
                        />
                        {value.caption && (
                          <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                            {value.caption}
                          </figcaption>
                        )}
                      </figure>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* Step-by-Step Content */}
          {block.steps && block.steps.length > 0 && (
            <div className="space-y-6 mt-4">
              {block.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#009B00] text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.stepTitle}</h3>
                    <p className="text-gray-700 mb-3">{step.stepDescription}</p>
                    {step.stepImage && (
                      <img
                        src={step.stepImage.asset?._ref}
                        alt={step.stepTitle}
                        className="rounded-lg border border-gray-200 max-w-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FAQ Content */}
          {block.faqs && block.faqs.length > 0 && (
            <div className="space-y-4 mt-4">
              {block.faqs.map((faq, index) => (
                <details key={index} className="group border border-gray-200 rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-[#009B00]">Q:</span>
                      {faq.question}
                    </span>
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
