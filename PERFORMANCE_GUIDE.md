# Performance Optimization Guide

Comprehensive guide to performance features and best practices for the Gladly Enablement Website.

## Overview

The site includes multiple performance optimizations:
- ✅ Image optimization (WebP/AVIF, lazy loading)
- ✅ Code splitting and tree shaking
- ✅ Caching strategies
- ✅ Performance monitoring
- ✅ Security headers
- ✅ Bundle size optimization

---

## Performance Utilities

### Core Performance Functions (`/lib/performance.ts`)

#### Debounce & Throttle

```tsx
import { debounce, throttle } from '@/lib/performance';

// Debounce search input
const handleSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

// Throttle scroll handler
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

#### Image Optimization

```tsx
import { optimizeImageUrl } from '@/lib/performance';

// Automatically optimize Sanity images
const optimizedUrl = optimizeImageUrl(imageUrl, {
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp'
});
```

#### Lazy Loading

```tsx
import { lazyLoadImage, preloadResource, prefetchResource } from '@/lib/performance';

// Lazy load images
const img = document.querySelector('img');
lazyLoadImage(img);

// Preload critical resources
preloadResource('/critical-script.js', 'script');

// Prefetch for next navigation
prefetchResource('/next-page');
```

#### Utility Functions

```tsx
import {
  isMobileDevice,
  getConnectionSpeed,
  prefersReducedMotion,
  supportsWebP
} from '@/lib/performance';

// Adapt behavior based on device/connection
if (isMobileDevice() || getConnectionSpeed() === 'slow') {
  // Load lighter version
}

// Respect user preferences
if (prefersReducedMotion()) {
  // Disable animations
}
```

---

## Performance Hooks (`/hooks/usePerformance.ts`)

### useDebounce

```tsx
import { useDebounce } from '@/hooks/usePerformance';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Only runs 300ms after user stops typing
    performSearch(debouncedSearch);
  }, [debouncedSearch]);
}
```

### useInViewport

```tsx
import { useInViewport } from '@/hooks/usePerformance';

function LazyComponent() {
  const ref = useRef(null);
  const isVisible = useInViewport(ref, { rootMargin: '100px' });

  return (
    <div ref={ref}>
      {isVisible && <HeavyComponent />}
    </div>
  );
}
```

### useLazyLoad

```tsx
import { useLazyLoad } from '@/hooks/usePerformance';

function DataSection() {
  const ref = useRef(null);
  const { data, loading, error } = useLazyLoad(
    ref,
    () => fetchHeavyData()
  );

  return (
    <div ref={ref}>
      {loading && <Spinner />}
      {data && <DataDisplay data={data} />}
    </div>
  );
}
```

### useNetworkSpeed

```tsx
import { useNetworkSpeed } from '@/hooks/usePerformance';

function AdaptiveComponent() {
  const { effectiveType, downlink } = useNetworkSpeed();

  // Load different content based on connection
  if (effectiveType === '4g') {
    return <HighQualityVideo />;
  }
  return <LowQualityVideo />;
}
```

### Other Hooks

```tsx
import {
  useThrottle,
  useScrollPerformance,
  useOnlineStatus,
  useComponentPerformance,
  useRenderTime
} from '@/hooks/usePerformance';
```

---

## Optimized Components

### OptimizedImage

```tsx
import { OptimizedImage } from '@/components/ui/image/OptimizedImage';

// Automatic WebP/AVIF conversion, lazy loading, error handling
<OptimizedImage
  src="https://cdn.sanity.io/images/..."
  alt="Product screenshot"
  width={800}
  height={600}
  quality={85}
  priority={false} // Lazy load
  sizes="(max-width: 768px) 100vw, 800px"
/>

// Background image with overlay
import { BackgroundImage } from '@/components/ui/image/OptimizedImage';

<BackgroundImage
  src="/hero-bg.jpg"
  overlay={true}
  overlayOpacity={0.5}
>
  <h1>Hero Title</h1>
</BackgroundImage>
```

### LazySection

```tsx
import { LazySection, LazyBelowFold } from '@/components/ui/lazy/LazySection';

// Render only when visible
<LazySection
  rootMargin="100px" // Load 100px before entering viewport
  minHeight={400}
  fallback={<Skeleton />}
>
  <HeavySection />
</LazySection>

// Simplified for below-the-fold content
<LazyBelowFold>
  <Footer />
</LazyBelowFold>
```

### LazyTab

```tsx
import { LazyTab } from '@/components/ui/lazy/LazySection';

<LazyTab isActive={activeTab === 'tab1'}>
  <Tab1Content />
</LazyTab>
```

---

## Web Vitals Monitoring (`/lib/webVitals.ts`)

### Track Performance Metrics

```tsx
import { reportWebVitals, sendPerformanceMetric } from '@/lib/webVitals';

// In _app.tsx or layout.tsx
export function reportWebVitals(metric) {
  reportWebVitals(metric);
}

// Custom metrics
sendPerformanceMetric('api_response', 245, {
  endpoint: '/api/data',
  success: true
});
```

### Measure Component Render Time

```tsx
import { measureRender } from '@/lib/webVitals';

function HeavyComponent() {
  const endMeasure = measureRender('HeavyComponent');

  useEffect(() => {
    return endMeasure;
  }, []);
}
```

### Measure Data Fetching

```tsx
import { measureFetch } from '@/lib/webVitals';

async function getData() {
  return measureFetch('homepage_data', async () => {
    return await client.fetch(query);
  });
}
```

### Initialize Monitoring

```tsx
import { initPerformanceMonitoring } from '@/lib/webVitals';

// In root layout
useEffect(() => {
  initPerformanceMonitoring();
}, []);
```

---

## Next.js Configuration

### Image Optimization (`next.config.ts`)

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

### Performance Features

- ✅ **Compression**: Automatic gzip/brotli
- ✅ **SWC Minification**: Faster builds
- ✅ **Tree Shaking**: Remove unused code
- ✅ **Code Splitting**: Automatic by route
- ✅ **Remove console.log**: In production

### Security Headers

Automatic headers for all pages:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`

### Caching Headers

- Static assets: 1 year cache
- Images: 1 year cache
- Pages: ISR with revalidation

---

## Best Practices

### Images

**Do:**
```tsx
// Use OptimizedImage component
<OptimizedImage
  src={imageUrl}
  alt="Descriptive text"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 800px"
/>

// Add priority to above-the-fold images
<OptimizedImage
  src={heroImage}
  priority={true}
  alt="Hero"
/>
```

**Don't:**
```tsx
// ❌ Don't use regular <img> tags
<img src={imageUrl} alt="..." />

// ❌ Don't skip width/height
<Image src={imageUrl} alt="..." />

// ❌ Don't load all images eagerly
<Image src={imageUrl} loading="eager" />
```

### Code Splitting

**Do:**
```tsx
// Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Spinner />,
  ssr: false // If not needed server-side
});

// Lazy load below-the-fold sections
<LazyBelowFold>
  <HeavySection />
</LazyBelowFold>
```

**Don't:**
```tsx
// ❌ Don't import heavy libs at top level
import Chart from 'heavy-chart-library';

// ❌ Don't render everything immediately
function Page() {
  return (
    <>
      <Hero />
      <HeavyChart />
      <HeavyTable />
      <HeavyMap />
    </>
  );
}
```

### Data Fetching

**Do:**
```tsx
// Use React Server Components
async function Page() {
  const data = await getData(); // Server-side
  return <Display data={data} />;
}

// Lazy load client-side data
const { data } = useLazyLoad(ref, () => fetchData());
```

**Don't:**
```tsx
// ❌ Don't fetch in client components unnecessarily
'use client';
function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(setData);
  }, []);
}
```

### Event Handlers

**Do:**
```tsx
// Debounce search
const handleSearch = useDebounce((query) => {
  search(query);
}, 300);

// Throttle scroll
const handleScroll = useThrottle(() => {
  updatePosition();
}, 100);
```

**Don't:**
```tsx
// ❌ Don't run expensive operations on every event
<input onChange={(e) => expensiveSearch(e.target.value)} />
<div onScroll={() => expensiveCalculation()} />
```

---

## Performance Checklist

### For Every Page

- [ ] Use OptimizedImage for all images
- [ ] Add lazy loading for below-the-fold content
- [ ] Implement proper caching strategies
- [ ] Minimize client-side JavaScript
- [ ] Use React Server Components where possible
- [ ] Add proper meta tags and structured data

### For Heavy Components

- [ ] Use dynamic imports
- [ ] Implement lazy loading
- [ ] Add loading states
- [ ] Consider code splitting
- [ ] Measure render performance

### For User Interactions

- [ ] Debounce text inputs
- [ ] Throttle scroll/resize handlers
- [ ] Prefetch on hover for links
- [ ] Show loading indicators
- [ ] Optimize for mobile devices

---

## Monitoring Performance

### Development

```bash
# Run with bundle analyzer
ANALYZE=true npm run build

# Check build output
npm run build
# Look for page sizes and warnings
```

### Production

- Monitor Core Web Vitals in Google Analytics
- Check browser DevTools Performance tab
- Use Lighthouse for audits
- Monitor real user metrics (RUM)

---

## Tools & Resources

- **Next.js Image Optimization**: Automatic format conversion
- **Vercel Analytics**: Real user monitoring
- **Lighthouse**: Performance audits
- **Web Vitals Extension**: Chrome extension for metrics
- **Bundle Analyzer**: Visualize bundle size

---

## Need Help?

- Check existing components for examples
- Review Next.js performance docs
- Use browser DevTools Performance tab
- Contact the development team

