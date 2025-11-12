'use client';

import { ReactNode, useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Accordion Component
 * Expandable/collapsible sections
 */
export function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className="border-2 border-neutral-light rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-neutral-light transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-neutral-black">{item.title}</span>
              <svg
                className={`w-5 h-5 text-neutral-dark transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="p-4 bg-white border-t-2 border-neutral-light animate-slide-down">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Simple Accordion Item
 * For one-off collapsible sections
 */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className = '',
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-2 border-neutral-light rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-neutral-light transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-neutral-black">{title}</span>
        <svg
          className={`w-5 h-5 text-neutral-dark transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 bg-white border-t-2 border-neutral-light animate-slide-down">
          {children}
        </div>
      )}
    </div>
  );
}
