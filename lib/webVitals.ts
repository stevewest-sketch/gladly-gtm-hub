/**
 * Web Vitals Performance Tracking
 * Measures and reports Core Web Vitals
 */

export interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  navigationType?: string;
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: WebVitalsMetric): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, metric.value);
  }

  // Send to analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // You can also send to custom analytics endpoint
  // Example: sendToAnalytics({ metric });
}

/**
 * Send custom performance metrics
 */
export function sendPerformanceMetric(
  name: string,
  value: number,
  metadata?: Record<string, any>
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}:`, value, metadata);
  }

  // Send to your analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      value: Math.round(value),
      event_category: 'Performance',
      ...metadata,
    });
  }
}

/**
 * Measure component render time
 */
export function measureRender(componentName: string): () => void {
  const startTime = performance.now();

  return () => {
    const duration = performance.now() - startTime;
    sendPerformanceMetric(`${componentName}_render`, duration, {
      component: componentName,
    });
  };
}

/**
 * Measure data fetching time
 */
export async function measureFetch<T>(
  name: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();

  try {
    const result = await fetchFn();
    const duration = performance.now() - startTime;

    sendPerformanceMetric(`${name}_fetch`, duration, {
      endpoint: name,
      success: true,
    });

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;

    sendPerformanceMetric(`${name}_fetch`, duration, {
      endpoint: name,
      success: false,
    });

    throw error;
  }
}

/**
 * Get Core Web Vitals summary
 */
export function getWebVitalsSummary(): {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
} {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return { lcp: null, fid: null, cls: null, fcp: null, ttfb: null };
  }

  const navigation = performance.getEntriesByType('navigation')[0] as any;

  return {
    lcp: null, // Requires web-vitals library
    fid: null, // Requires web-vitals library
    cls: null, // Requires web-vitals library
    fcp: navigation?.responseStart
      ? navigation.responseStart - navigation.fetchStart
      : null,
    ttfb: navigation?.responseStart ? navigation.responseStart : null,
  };
}

/**
 * Monitor resource loading performance
 */
export function monitorResourceLoading(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resource = entry as PerformanceResourceTiming;

      // Flag slow resources (> 1s)
      if (resource.duration > 1000) {
        console.warn(`Slow resource: ${resource.name} (${resource.duration}ms)`);

        sendPerformanceMetric('slow_resource', resource.duration, {
          resource_name: resource.name,
          resource_type: resource.initiatorType,
        });
      }
    }
  });

  resourceObserver.observe({ entryTypes: ['resource'] });
}

/**
 * Monitor long tasks
 */
export function monitorLongTasks(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  const longTaskObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.warn(`Long task detected: ${entry.duration}ms`);

      sendPerformanceMetric('long_task', entry.duration, {
        start_time: entry.startTime,
      });
    }
  });

  try {
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // longtask may not be supported in all browsers
  }
}

/**
 * Get page load performance metrics
 */
export function getPageLoadMetrics(): {
  dns: number;
  tcp: number;
  request: number;
  response: number;
  dom: number;
  load: number;
} | null {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as any;

  if (!navigation) return null;

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,
  };
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  // Monitor resources
  monitorResourceLoading();

  // Monitor long tasks
  monitorLongTasks();

  // Log page load metrics after load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = getPageLoadMetrics();
      if (metrics) {
        console.log('[Performance] Page load metrics:', metrics);
      }
    }, 0);
  });
}
