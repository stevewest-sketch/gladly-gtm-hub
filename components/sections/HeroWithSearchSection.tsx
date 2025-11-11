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
  const [searchResults, setSearchResults] = useState<Array<{title: string; url: string; type: string; description?: string}>>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const paddingClass = paddingClasses[paddingTop as keyof typeof paddingClasses] || paddingClasses.medium;

  // Generate background style based on heroStyle
  const backgroundStyle = heroStyle === 'solid'
    ? { background: heroSolidColor }
    : { background: `linear-gradient(135deg, ${heroGradientStart} 0%, ${heroGradientMiddle} 50%, ${heroGradientEnd} 100%)` };

  // Comprehensive searchable content with deep linking
  const searchableContent = [
    // Pages
    { title: 'Demo Hub', url: '/enablement/demo', type: 'Page', keywords: ['demo', 'demos', 'demonstration'], description: 'Main demo resources hub' },
    { title: 'Demo Setup Guide', url: '/enablement/demo/setup-guide', type: 'Guide', keywords: ['demo', 'setup', 'guide', 'configuration', 'how to demo'], description: 'Step-by-step demo configuration' },
    { title: 'Training Hub', url: '/enablement/training', type: 'Page', keywords: ['training', 'learn', 'courses', 'sessions'], description: 'Live training sessions and recordings' },
    { title: 'E-Learning Hub', url: '/enablement/e-learning', type: 'Page', keywords: ['elearning', 'learning', 'courses', 'modules', 'self-paced'], description: 'Self-paced learning modules' },
    { title: 'Competitive Intel', url: '/enablement/competitive', type: 'Page', keywords: ['competitive', 'battle cards', 'competitors', 'zendesk', 'freshdesk', 'intercom'], description: 'Competitive battle cards and intelligence' },
    { title: 'Playbooks', url: '/enablement/playbooks', type: 'Page', keywords: ['playbook', 'playbooks', 'guides', 'process'], description: 'Sales and success playbooks' },
    { title: 'Templates', url: '/resources/templates', type: 'Resources', keywords: ['templates', 'downloads', 'files', 'documents'], description: 'Downloadable templates and documents' },
    { title: 'Content Hub', url: '/resources/content', type: 'Resources', keywords: ['content', 'articles', 'documentation', 'guides'], description: 'Articles and documentation' },

    // Products
    { title: 'Sidekick Standalone', url: '/product/sidekick-standalone', type: 'Product', keywords: ['sidekick', 'standalone', 'ai', 'assistant', 'chrome extension'], description: 'Standalone AI assistant product' },
    { title: 'Sidekick Voice', url: '/product/sidekick-voice', type: 'Product', keywords: ['sidekick', 'voice', 'phone', 'call', 'telephony', 'ivr'], description: 'Voice AI for phone support' },
    { title: 'Sidekick Email', url: '/product/sidekick-email', type: 'Product', keywords: ['sidekick', 'email', 'inbox', 'gmail', 'outlook'], description: 'Email AI assistant' },
    { title: 'Sidekick Sales', url: '/product/sidekick-sales', type: 'Product', keywords: ['sidekick', 'sales', 'crm', 'salesforce'], description: 'Sales-focused AI assistant' },
    { title: 'Customer AI', url: '/product/customer-ai', type: 'Product', keywords: ['customer', 'ai', 'artificial intelligence', 'personalization', 'recommendations'], description: 'AI-powered customer insights' },
    { title: 'Guides & Journeys', url: '/product/guides-and-journeys', type: 'Product', keywords: ['guides', 'journeys', 'customer journey', 'onboarding', 'walkthroughs'], description: 'Customer journey orchestration' },
    { title: 'App Platform', url: '/product/app-platform', type: 'Product', keywords: ['app', 'platform', 'apps', 'integrations', 'marketplace', 'api'], description: 'Integration platform and marketplace' },

    // CoE
    { title: 'Center of Excellence', url: '/coe', type: 'CoE', keywords: ['coe', 'center', 'excellence', 'best practices'], description: 'Center of Excellence hub' },
    { title: 'Business Value Analysis', url: '/coe/bva', type: 'CoE', keywords: ['bva', 'business', 'value', 'roi', 'return on investment', 'calculator'], description: 'ROI and business value calculator' },
    { title: 'AI Best Practices', url: '/coe/ai-best-practices', type: 'CoE', keywords: ['ai', 'best practices', 'artificial intelligence', 'implementation', 'tips'], description: 'AI implementation best practices' },
    { title: 'Customer Wins', url: '/coe/customer-wins', type: 'CoE', keywords: ['customer', 'wins', 'case studies', 'success', 'stories', 'testimonials'], description: 'Customer success stories' },

    // Toolkits
    { title: 'Sales Toolkit', url: '/enablement/toolkits/sales', type: 'Toolkit', keywords: ['sales', 'toolkit', 'selling', 'prospecting', 'outreach'], description: 'Sales team resources' },
    { title: 'CSM Toolkit', url: '/enablement/toolkits/csm', type: 'Toolkit', keywords: ['csm', 'customer success', 'toolkit', 'retention', 'adoption'], description: 'Customer Success Manager resources' },
    { title: 'SC Toolkit', url: '/enablement/toolkits/success', type: 'Toolkit', keywords: ['sc', 'success', 'toolkit', 'support', 'implementation'], description: 'Success Consultant resources' },
    { title: 'Marketing Toolkit', url: '/enablement/toolkits/marketing', type: 'Toolkit', keywords: ['marketing', 'toolkit', 'campaigns', 'content'], description: 'Marketing team resources' },

    // Specific Features & Topics (deep links)
    { title: 'Setup Gladly Instance', url: '/enablement/demo/setup-guide#setup', type: 'Topic', keywords: ['setup', 'configuration', 'install', 'instance', 'getting started'], description: 'Initial Gladly setup instructions' },
    { title: 'Demo Environment', url: '/enablement/demo/setup-guide#environment', type: 'Topic', keywords: ['demo', 'environment', 'sandbox', 'test'], description: 'Demo environment configuration' },
    { title: 'Pricing Information', url: '/coe/bva#pricing', type: 'Topic', keywords: ['pricing', 'cost', 'price', 'how much', 'expense'], description: 'Pricing and cost information' },
    { title: 'ROI Calculator', url: '/coe/bva#calculator', type: 'Topic', keywords: ['roi', 'calculator', 'value', 'savings', 'calculate'], description: 'Calculate return on investment' },
    { title: 'Integration Setup', url: '/product/app-platform#integrations', type: 'Topic', keywords: ['integration', 'api', 'webhook', 'connect', 'sync'], description: 'How to set up integrations' },
    { title: 'Competitive Comparison', url: '/enablement/competitive#comparison', type: 'Topic', keywords: ['compare', 'comparison', 'vs', 'versus', 'difference'], description: 'Compare Gladly to competitors' },
    { title: 'Onboarding Process', url: '/enablement/playbooks#onboarding', type: 'Topic', keywords: ['onboarding', 'new customer', 'kickoff', 'implementation'], description: 'Customer onboarding process' },
    { title: 'Product Roadmap', url: '/coe#roadmap', type: 'Topic', keywords: ['roadmap', 'future', 'upcoming', 'planned', 'releases'], description: 'Product roadmap and future features' },
    { title: 'Training Schedule', url: '/enablement/training#schedule', type: 'Topic', keywords: ['schedule', 'calendar', 'upcoming', 'sessions', 'webinar'], description: 'Upcoming training sessions' },
    { title: 'Quick Start Guide', url: '/enablement/demo/setup-guide#quickstart', type: 'Topic', keywords: ['quick start', 'quickstart', 'getting started', 'beginner'], description: '5-minute quick start guide' },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.includes(query)) ||
        item.type.toLowerCase().includes(query)
      );

      // Sort by relevance: exact title match first, then keyword match, then description match
      results.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        if (aTitle.includes(query) && !bTitle.includes(query)) return -1;
        if (!aTitle.includes(query) && bTitle.includes(query)) return 1;
        if (aTitle.startsWith(query) && !bTitle.startsWith(query)) return -1;
        if (!aTitle.startsWith(query) && bTitle.startsWith(query)) return 1;
        return 0;
      });

      setSearchResults(results.slice(0, 10)); // Show max 10 results
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
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full px-6 py-3 text-left hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0 flex justify-between items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-0.5">{result.title}</div>
                      {result.description && (
                        <div className="text-xs text-gray-600 line-clamp-1">{result.description}</div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-white bg-[#8C69F0] px-2 py-1 rounded whitespace-nowrap flex-shrink-0">{result.type}</span>
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
