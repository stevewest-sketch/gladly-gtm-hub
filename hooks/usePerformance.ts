'use client';

import { useEffect, useRef, useState } from 'react';
import { debounce, throttle } from '@/lib/performance';

/**
 * Hook to track component mount performance
 */
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const duration = performance.now() - startTime;
      if (duration > 100) {
        console.warn(`${componentName} took ${duration}ms to mount/unmount`);
      }
    };
  }, [componentName]);
}

/**
 * Hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for throttled callbacks
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const throttledFn = useRef<T>();

  if (!throttledFn.current) {
    throttledFn.current = throttle(callback, delay) as T;
  }

  return throttledFn.current;
}

/**
 * Hook to detect if element is in viewport
 */
export function useInViewport(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInViewport;
}

/**
 * Hook to lazy load when element enters viewport
 */
export function useLazyLoad<T>(
  ref: React.RefObject<HTMLElement>,
  loader: () => Promise<T>,
  options?: IntersectionObserverInit
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const hasLoaded = useRef(false);

  const isInViewport = useInViewport(ref, options);

  useEffect(() => {
    if (isInViewport && !hasLoaded.current) {
      hasLoaded.current = true;
      setLoading(true);

      loader()
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [isInViewport, loader]);

  return { data, loading, error };
}

/**
 * Hook to measure render performance
 */
export function useRenderTime(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const duration = performance.now() - startTime.current;

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[Render] ${componentName} - Count: ${renderCount.current}, Duration: ${duration.toFixed(2)}ms`
      );
    }

    startTime.current = performance.now();
  });
}

/**
 * Hook to detect slow renders
 */
export function useSlowRenderDetection(
  threshold: number = 16.67 // ~60fps
): { isSlowRender: boolean; renderTime: number } {
  const [renderTime, setRenderTime] = useState(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const duration = performance.now() - startTime.current;
    setRenderTime(duration);
    startTime.current = performance.now();
  });

  return {
    isSlowRender: renderTime > threshold,
    renderTime,
  };
}

/**
 * Hook for prefetching data on hover
 */
export function usePrefetch<T>(
  prefetchFn: () => Promise<T>
): [() => void, { data: T | null; loading: boolean }] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const hasPrefetched = useRef(false);

  const prefetch = () => {
    if (hasPrefetched.current) return;

    hasPrefetched.current = true;
    setLoading(true);

    prefetchFn()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return [prefetch, { data, loading }];
}

/**
 * Hook to track scroll performance
 */
export function useScrollPerformance() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;

      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      setScrollPosition(currentScrollY);
      lastScrollY.current = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollPosition, scrollDirection };
}

/**
 * Hook to detect online/offline status
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Hook to measure network speed
 */
export function useNetworkSpeed(): {
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
} {
  const [networkInfo, setNetworkInfo] = useState<{
    effectiveType: string | null;
    downlink: number | null;
    rtt: number | null;
  }>({
    effectiveType: null,
    downlink: null,
    rtt: null,
  });

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;

      const updateNetworkInfo = () => {
        setNetworkInfo({
          effectiveType: connection.effectiveType || null,
          downlink: connection.downlink || null,
          rtt: connection.rtt || null,
        });
      };

      updateNetworkInfo();
      connection.addEventListener('change', updateNetworkInfo);

      return () => {
        connection.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  return networkInfo;
}
