/**
 * Analytics & Tracking Utilities
 * Track user interactions and page views
 */

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
}

/**
 * Track custom event
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track search query
 */
export function trackSearch(query: string, resultsCount: number) {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: query,
    value: resultsCount,
  });
}

/**
 * Track resource download
 */
export function trackDownload(resourceName: string, resourceType: string) {
  trackEvent({
    action: 'download',
    category: 'resource',
    label: `${resourceType}: ${resourceName}`,
  });
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string) {
  trackEvent({
    action: 'click',
    category: 'external_link',
    label: url,
  });
}

/**
 * Track toolkit visit
 */
export function trackToolkitVisit(toolkitName: string) {
  trackEvent({
    action: 'visit',
    category: 'toolkit',
    label: toolkitName,
  });
}

/**
 * Track learning module completion
 */
export function trackLearningComplete(moduleName: string, timeSpent: number) {
  trackEvent({
    action: 'complete',
    category: 'learning',
    label: moduleName,
    value: timeSpent,
  });
}
