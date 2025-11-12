'use client';

import Image from 'next/image';
import { useState } from 'react';
import { optimizeImageUrl } from '@/lib/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Optimized Image Component
 * Wraps Next.js Image with additional optimizations:
 * - Automatic format selection (WebP/AVIF)
 * - Lazy loading by default
 * - Loading skeleton
 * - Error handling
 * - Responsive sizing
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 85,
  priority = false,
  fill = false,
  className = '',
  objectFit = 'cover',
  sizes,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Optimize image URL if it's from Sanity CDN
  const optimizedSrc = optimizeImageUrl(src, {
    width,
    height,
    quality,
    format: 'webp',
  });

  if (hasError) {
    return (
      <div
        className={`bg-neutral-light flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-neutral-dark text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={fill ? undefined : { width, height }}>
      {isLoading && !priority && (
        <div
          className="absolute inset-0 bg-neutral-light animate-pulse rounded"
          style={{ width, height }}
        />
      )}

      <Image
        src={optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        quality={quality}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`${
          isLoading && !priority ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300 ${objectFit === 'cover' ? 'object-cover' : ''} ${
          objectFit === 'contain' ? 'object-contain' : ''
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={
          fill
            ? { objectFit }
            : {
                maxWidth: '100%',
                height: 'auto',
              }
        }
      />
    </div>
  );
}

/**
 * Background Image Component
 * For decorative background images with lazy loading
 */
export function BackgroundImage({
  src,
  alt = 'Background',
  className = '',
  children,
  overlay = false,
  overlayOpacity = 0.5,
}: {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage src={src} alt={alt} fill objectFit="cover" quality={75} />

      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
