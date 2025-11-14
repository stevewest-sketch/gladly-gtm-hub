'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import PageTemplate from './PageTemplate';
import PortableTextContent from './PortableTextContent';
import QuickNav from './QuickNav';
import HeroSection from './sections/HeroSection';
import FeatureGridSection from './sections/FeatureGridSection';
import StatsSection from './sections/StatsSection';
import ContentSection from './sections/ContentSection';
import CTASection from './sections/CTASection';
import LaunchStatusSection from './sections/LaunchStatusSection';
import QuickStatsSection from './sections/QuickStatsSection';
import FeaturedContentSection from './sections/FeaturedContentSection';

interface DynamicPageProps {
  slug: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackColor?: string;
}

async function getPage(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    subtitle,
    heroColor,
    content,
    sections,
    quickNav,
    pageBuilder
  }`;
  return await client.fetch(query, { slug });
}

export default function DynamicPage({ slug, fallbackTitle, fallbackSubtitle, fallbackColor = 'purple' }: DynamicPageProps) {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getPage(slug)
      .then(data => {
        setPage(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error fetching page, using fallback:', err);
        setLoading(false);
      });
  }, [slug]);

  if (!mounted) return null;

  const title = page?.title || fallbackTitle || 'Page';
  const subtitle = page?.subtitle || fallbackSubtitle;
  const heroColor = page?.heroColor || fallbackColor;

  const renderSection = (section: any, index: number) => {
    const { _type } = section;

    switch (_type) {
      case 'heroSection':
        return <HeroSection key={index} {...section} />;
      case 'featureGridSection':
        return <FeatureGridSection key={index} {...section} />;
      case 'statsSection':
        return <StatsSection key={index} {...section} />;
      case 'contentSection':
        return <ContentSection key={index} {...section} />;
      case 'ctaSection':
        return <CTASection key={index} {...section} />;
      case 'launchStatusSection':
        return <LaunchStatusSection key={index} {...section} />;
      case 'quickStatsSection':
        return <QuickStatsSection key={index} {...section} />;
      case 'featuredContentSection':
        return <FeaturedContentSection key={index} {...section} />;
      default:
        console.warn(`Unknown section type: ${_type}`);
        return null;
    }
  };

  // Use pageBuilder if available, otherwise fall back to legacy content/sections
  const hasPageBuilder = page?.pageBuilder && page.pageBuilder.length > 0;
  const hasQuickNav = page?.quickNav && page.quickNav.length > 0;
  const hasLegacyContent = page?.content || page?.sections;

  // If using pageBuilder, render sections directly without PageTemplate wrapper
  if (hasPageBuilder) {
    return (
      <div className="min-h-screen">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            {/* Quick Navigation */}
            {hasQuickNav && <QuickNav links={page.quickNav} />}

            {/* Page Builder Sections */}
            <div className="space-y-0">
              {page.pageBuilder.map((section: any, index: number) => renderSection(section, index))}
            </div>
          </>
        )}
      </div>
    );
  }

  // For legacy pages, use PageTemplate wrapper
  return (
    <PageTemplate title={title} subtitle={subtitle} heroColor={heroColor}>
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : hasLegacyContent ? (
        <>
          {page.content && <PortableTextContent content={page.content} />}

          {page.sections && page.sections.length > 0 && (
            <div className="mt-8 space-y-8">
              {page.sections.map((section: any, index: number) => (
                <div key={index} className="border-t border-gray-200 pt-6">
                  {section.sectionTitle && (
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">{section.sectionTitle}</h2>
                  )}
                  {section.sectionContent && (
                    <PortableTextContent content={section.sectionContent} />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Content coming soon. This page is ready to be populated with your materials.
          </p>
          <p className="text-sm text-gray-500">
            Edit this page in Sanity Studio at <a href="/studio" className="text-blue-600">localhost:3000/studio</a>
          </p>
        </div>
      )}
    </PageTemplate>
  );
}
