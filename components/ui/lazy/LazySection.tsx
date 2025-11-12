'use client';

import { useRef, ReactNode } from 'react';
import { useInViewport } from '@/hooks/usePerformance';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  minHeight?: number;
}

/**
 * Lazy Section Component
 * Renders children only when they enter the viewport
 * Perfect for heavy sections below the fold
 */
export function LazySection({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0,
  className = '',
  minHeight = 200,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(ref, { rootMargin, threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: !isInViewport ? minHeight : undefined }}
    >
      {isInViewport ? (
        children
      ) : (
        fallback || (
          <div
            className="bg-neutral-light animate-pulse rounded-lg"
            style={{ height: minHeight }}
          />
        )
      )}
    </div>
  );
}

/**
 * Lazy Load Below Fold
 * Wrapper that delays rendering until user scrolls
 */
export function LazyBelowFold({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <LazySection rootMargin="200px" className={className} minHeight={300}>
      {children}
    </LazySection>
  );
}

/**
 * Lazy Tab Content
 * For tab panels that should load when activated
 */
export function LazyTab({
  isActive,
  children,
  fallback,
}: {
  isActive: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  // Once loaded, keep in DOM
  const hasBeenActive = useRef(false);

  if (isActive) {
    hasBeenActive.current = true;
  }

  if (!hasBeenActive.current) {
    return <>{fallback || <div className="p-4">Loading...</div>}</>;
  }

  return <div className={isActive ? 'block' : 'hidden'}>{children}</div>;
}

/**
 * Progressive Enhancement Wrapper
 * Shows simpler version first, then enhanced version
 */
export function ProgressiveEnhancement({
  simple,
  enhanced,
  delay = 100,
}: {
  simple: ReactNode;
  enhanced: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(ref, { rootMargin: '50px' });
  const [showEnhanced, setShowEnhanced] = React.useState(false);

  React.useEffect(() => {
    if (isInViewport) {
      const timer = setTimeout(() => setShowEnhanced(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInViewport, delay]);

  return <div ref={ref}>{showEnhanced ? enhanced : simple}</div>;
}
