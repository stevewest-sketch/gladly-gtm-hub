'use client';

import { useState, useEffect } from 'react';
import { useScrollPerformance } from '@/hooks/usePerformance';

interface ScrollToTopProps {
  showAfter?: number; // Pixels scrolled before showing
  className?: string;
}

/**
 * Scroll to Top Button
 * Appears after scrolling down, smooth scrolls back to top
 */
export function ScrollToTop({ showAfter = 300, className = '' }: ScrollToTopProps) {
  const { scrollPosition } = useScrollPerformance();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(scrollPosition > showAfter);
  }, [scrollPosition, showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary-purple text-white shadow-lg hover:bg-purple-700 transition-all hover:scale-110 ${className}`}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
