'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HeroWithSearchSectionProps {
  heroTitle: string;
  heroSubtitle?: string;
  searchPlaceholder?: string;
  paddingTop?: string;
  heroStyle?: string;
  heroGradientStart?: string;
  heroGradientMiddle?: string;
  heroGradientEnd?: string;
  heroSolidColor?: string;
}

const paddingClasses = {
  none: 'pt-0',
  small: 'pt-10',
  medium: 'pt-20',
  large: 'pt-30',
  xlarge: 'pt-40',
};

export default function HeroWithSearchSection({
  heroTitle,
  heroSubtitle,
  searchPlaceholder = 'Search for battle cards, templates, demos, product info...',
  paddingTop = 'medium',
  heroStyle = 'gradient',
  heroGradientStart = '#6B46C1',
  heroGradientMiddle = '#8C69F0',
  heroGradientEnd = '#A78BFA',
  heroSolidColor = '#8C69F0',
}: HeroWithSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{title: string; url: string; type: string}>>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const paddingClass = paddingClasses[paddingTop as keyof typeof paddingClasses] || paddingClasses.medium;

  // Generate background style based on heroStyle
  const backgroundStyle = heroStyle === 'solid'
    ? { background: heroSolidColor }
    : { background: `linear-gradient(135deg, ${heroGradientStart} 0%, ${heroGradientMiddle} 50%, ${heroGradientEnd} 100%)` };

  // Searchable content - you can expand this list
  const searchableContent = [
    { title: 'Demo Hub', url: '/enablement/demo', type: 'Enablement', keywords: ['demo', 'demos', 'demonstration'] },
    { title: 'Demo Setup Guide', url: '/enablement/demo/setup-guide', type: 'Guide', keywords: ['demo', 'setup', 'guide', 'configuration'] },
    { title: 'Training Hub', url: '/enablement/training', type: 'Enablement', keywords: ['training', 'learn', 'courses'] },
    { title: 'E-Learning Hub', url: '/enablement/e-learning', type: 'Enablement', keywords: ['elearning', 'learning', 'courses', 'modules'] },
    { title: 'Competitive Intel', url: '/enablement/competitive', type: 'Enablement', keywords: ['competitive', 'battle cards', 'competitors'] },
    { title: 'Playbooks', url: '/enablement/playbooks', type: 'Enablement', keywords: ['playbook', 'playbooks', 'guides'] },
    { title: 'Templates', url: '/resources/templates', type: 'Resources', keywords: ['templates', 'downloads', 'files'] },
    { title: 'Content Hub', url: '/resources/content', type: 'Resources', keywords: ['content', 'articles', 'documentation'] },
    { title: 'Sidekick Standalone', url: '/product/sidekick-standalone', type: 'Product', keywords: ['sidekick', 'standalone', 'product'] },
    { title: 'Sidekick Voice', url: '/product/sidekick-voice', type: 'Product', keywords: ['sidekick', 'voice', 'phone'] },
    { title: 'Sidekick Email', url: '/product/sidekick-email', type: 'Product', keywords: ['sidekick', 'email'] },
    { title: 'Sidekick Sales', url: '/product/sidekick-sales', type: 'Product', keywords: ['sidekick', 'sales'] },
    { title: 'Customer AI', url: '/product/customer-ai', type: 'Product', keywords: ['customer', 'ai', 'artificial intelligence'] },
    { title: 'Guides & Journeys', url: '/product/guides-and-journeys', type: 'Product', keywords: ['guides', 'journeys', 'customer journey'] },
    { title: 'App Platform', url: '/product/app-platform', type: 'Product', keywords: ['app', 'platform', 'apps', 'integrations'] },
    { title: 'Center of Excellence', url: '/coe', type: 'CoE', keywords: ['coe', 'center', 'excellence'] },
    { title: 'Business Value', url: '/coe/bva', type: 'CoE', keywords: ['bva', 'business', 'value', 'roi'] },
    { title: 'AI Best Practices', url: '/coe/ai-best-practices', type: 'CoE', keywords: ['ai', 'best practices', 'artificial intelligence'] },
    { title: 'Customer Wins', url: '/coe/customer-wins', type: 'CoE', keywords: ['customer', 'wins', 'case studies', 'success'] },
    { title: 'Sales Toolkit', url: '/enablement/toolkits/sales', type: 'Toolkit', keywords: ['sales', 'toolkit'] },
    { title: 'CSM Toolkit', url: '/enablement/toolkits/csm', type: 'Toolkit', keywords: ['csm', 'customer success', 'toolkit'] },
    { title: 'SC Toolkit', url: '/enablement/toolkits/success', type: 'Toolkit', keywords: ['sc', 'success', 'toolkit'] },
    { title: 'Marketing Toolkit', url: '/enablement/toolkits/marketing', type: 'Toolkit', keywords: ['marketing', 'toolkit'] },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.includes(query)) ||
        item.type.toLowerCase().includes(query)
      );
      setSearchResults(results.slice(0, 8)); // Show max 8 results
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleResultClick = (url: string) => {
    setSearchQuery('');
    setShowResults(false);
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleResultClick(searchResults[0].url);
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  return (
    <div
      className={`${paddingClass} py-[50px]`}
      style={backgroundStyle}
    >
      {/* Header */}
      <div className="text-center mb-12 max-w-[1200px] mx-auto px-10">
        <h1 className="text-[48px] text-white mb-4 font-bold tracking-tight">
          {heroTitle}
        </h1>
        {heroSubtitle && (
          <p className="text-[18px] text-white font-medium">{heroSubtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto relative px-10">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery && setShowResults(true)}
              className="w-full px-6 py-4 text-base text-gray-900 font-semibold placeholder:text-gray-500 placeholder:font-normal border-2 border-[#F3F3F3] rounded-full transition-all bg-white shadow-sm focus:outline-none focus:border-[#8C69F0] focus:shadow-lg"
            />
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-900">{result.title}</span>
                    <span className="text-xs font-medium text-white bg-[#8C69F0] px-2 py-1 rounded">{result.type}</span>
                  </button>
                ))}
              </div>
            )}
            {showResults && searchResults.length === 0 && searchQuery && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden px-6 py-4">
                <p className="text-gray-600 font-medium">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
