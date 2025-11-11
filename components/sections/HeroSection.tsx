'use client';

import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  anchorId?: string;
  badge?: string;
  heading: string;
  subheading?: string;
  layout?: 'centered' | '2-column';
  videoMediaId?: string;
  videoAspectRatio?: number;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundColor?: string;
}

const colorMap: Record<string, string> = {
  purple: 'linear-gradient(135deg, #6B46C1 0%, #8C69F0 50%, #A78BFA 100%)',
  blue: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
  orange: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  dark: 'bg-gradient-to-br from-[#0D0D0D] to-[#2D2D2D]',
};

export default function HeroSection({
  anchorId,
  badge,
  heading,
  subheading,
  layout = 'centered',
  videoMediaId,
  videoAspectRatio = 1.7777777777777777,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundColor = 'purple',
}: HeroSectionProps) {
  const bgStyle = colorMap[backgroundColor] || colorMap.purple;
  const isDark = backgroundColor === 'dark';
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Load Wistia player scripts
  useEffect(() => {
    if (!videoMediaId) return;

    // Load Wistia player.js
    const playerScript = document.createElement('script');
    playerScript.src = 'https://fast.wistia.com/player.js';
    playerScript.async = true;
    document.head.appendChild(playerScript);

    // Load Wistia embed script for this specific video
    const embedScript = document.createElement('script');
    embedScript.src = `https://fast.wistia.com/embed/${videoMediaId}.js`;
    embedScript.async = true;
    embedScript.type = 'module';
    document.head.appendChild(embedScript);

    return () => {
      // Cleanup scripts on unmount
      if (playerScript.parentNode) playerScript.remove();
      if (embedScript.parentNode) embedScript.remove();
    };
  }, [videoMediaId]);

  const is2Column = layout === '2-column' && videoMediaId;

  // Determine button text color based on hero background
  const primaryBtnTextColor = backgroundColor === 'green' ? 'text-[#009B00]' : 'text-gray-900';

  return (
    <div
      id={anchorId}
      className={`text-white py-[50px] px-10 ${isDark ? 'bg-gradient-to-br from-[#0D0D0D] to-[#2D2D2D]' : ''}`}
      style={!isDark ? {background: bgStyle} : undefined}
    >
      <div className={`max-w-[1200px] mx-auto ${is2Column ? 'grid grid-cols-1 lg:grid-cols-2 gap-10 items-center' : 'text-center max-w-4xl'}`}>
        {/* Text Content */}
        <div className={is2Column ? '' : 'mx-auto'}>
          {badge && (
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded text-sm font-semibold mb-5">
              {badge}
            </div>
          )}
          <h1 className="text-[48px] font-bold mb-4 leading-tight">{heading}</h1>
          {subheading && (
            <p className="text-[20px] opacity-95 mb-6 leading-relaxed">{subheading}</p>
          )}
          {(primaryCtaText || secondaryCtaText) && (
            <div className="flex gap-4 flex-wrap" style={{ justifyContent: is2Column ? 'flex-start' : 'center' }}>
              {primaryCtaText && primaryCtaLink && (
                <a
                  href={primaryCtaLink}
                  className={`inline-block bg-white ${primaryBtnTextColor} px-7 py-3 rounded font-semibold hover:bg-[#8C69F0] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(140,105,240,0.3)] transition-all`}
                >
                  {primaryCtaText}
                </a>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <a
                  href={secondaryCtaLink}
                  className="inline-block bg-transparent text-white px-7 py-3 rounded font-semibold border-2 border-white hover:bg-[#8C69F0] hover:border-[#8C69F0] transition-all"
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Video Content (only shown in 2-column layout) */}
        {is2Column && (
          <div
            ref={videoContainerRef}
            className="bg-white rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
          >
            <wistia-player
              media-id={videoMediaId}
              aspect={videoAspectRatio.toString()}
              className="rounded-lg overflow-hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}
