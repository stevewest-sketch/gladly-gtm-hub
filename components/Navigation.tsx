'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/search';

interface NavigationChild {
  title: string;
  href: string;
  activeColor: string;
}

interface NavigationItem {
  title: string;
  icon?: string;
  href?: string;
  defaultExpanded: boolean;
  activeColor: string;
  children?: NavigationChild[];
}

interface NavigationData {
  logoText: string;
  items: NavigationItem[];
}

interface SearchableItem {
  title: string;
  description?: string;
  url: string;
  category?: string;
  keywords?: string[];
}

interface NavigationProps {
  data?: NavigationData | null;
  searchableContent?: SearchableItem[];
}

export default function Navigation({ data, searchableContent = [] }: NavigationProps) {
  const pathname = usePathname();

  // Helper function to check if current path is within a section
  const isPathInSection = (children?: NavigationChild[]) => {
    if (!children || !pathname) return false;
    return children.some(child => pathname.startsWith(child.href));
  };

  // Helper for hardcoded navigation
  const isPathInHardcodedSection = (paths: string[]) => {
    if (!pathname) return false;
    return paths.some(path => pathname.startsWith(path));
  };

  // Initialize expanded sections based on current path
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    if (data?.items) {
      const initial: Record<string, boolean> = {};
      data.items.forEach((item, index) => {
        // Auto-expand if current path is in this section
        initial[`section-${index}`] = isPathInSection(item.children);
      });
      return initial;
    }
    // Hardcoded navigation - only expand if current path matches
    return {
      coe: isPathInHardcodedSection(['/coe']),
      enablement: isPathInHardcodedSection(['/enablement']),
      toolkits: isPathInHardcodedSection(['/enablement/toolkits']),
      products: isPathInHardcodedSection(['/product']),
      resources: isPathInHardcodedSection(['/resources']),
    };
  });

  // Update expanded sections when path changes
  useEffect(() => {
    if (data?.items) {
      const updated: Record<string, boolean> = {};
      data.items.forEach((item, index) => {
        const sectionKey = `section-${index}`;
        // Keep current expanded state unless we're navigating to a page in a different section
        updated[sectionKey] = isPathInSection(item.children);
      });
      setExpandedSections(updated);
    } else {
      // Update hardcoded navigation based on current path
      setExpandedSections({
        coe: isPathInHardcodedSection(['/coe']),
        enablement: isPathInHardcodedSection(['/enablement']),
        toolkits: isPathInHardcodedSection(['/enablement/toolkits']),
        products: isPathInHardcodedSection(['/product']),
        resources: isPathInHardcodedSection(['/resources']),
      });
    }
  }, [pathname, data]);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getActiveColorClasses = (color: string, isActive: boolean) => {
    if (!isActive) return 'text-gray-600 hover:bg-gray-100';

    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600 font-semibold';
      case 'purple':
        return 'bg-purple-50 text-purple-600 font-semibold';
      case 'green':
        return 'bg-green-50 text-green-600 font-semibold';
      case 'orange':
        return 'bg-orange-50 text-orange-600 font-semibold';
      default:
        return 'bg-blue-50 text-blue-600 font-semibold';
    }
  };

  // If data is available and has items, use Sanity-driven navigation
  if (data && data.items && data.items.length > 0) {
    return (
      <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 sticky top-0 overflow-y-auto">
        {/* Logo/Home */}
        <Link href="/" className="block mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{data.logoText || 'GTM Hub'}</h2>
        </Link>

        {/* Global Search */}
        <div className="mb-6">
          <SearchBar
            placeholder="Search..."
            searchableContent={searchableContent}
          />
        </div>

        {/* Navigation Sections */}
        <div className="space-y-2">
          {data.items.map((item, index) => {
            const sectionKey = `section-${index}`;
            const hasChildren = item.children && item.children.length > 0;

            // Single link item (no children)
            if (!hasChildren && item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg font-semibold ${
                    pathname === item.href
                      ? getActiveColorClasses(item.activeColor, true)
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon && `${item.icon} `}{item.title}
                </Link>
              );
            }

            // Expandable section with children
            return (
              <div key={index}>
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>
                    {item.icon && `${item.icon} `}{item.title}
                  </span>
                  <span className="text-gray-400">
                    {expandedSections[sectionKey] ? '▼' : '▶'}
                  </span>
                </button>
                {expandedSections[sectionKey] && item.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={`block px-3 py-2 rounded-lg text-sm ${
                          isActive(child.href)
                            ? getActiveColorClasses(child.activeColor, true)
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    );
  }

  // Fallback to hardcoded navigation if no data

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 sticky top-0 overflow-y-auto">
      {/* Logo/Home */}
      <Link href="/" className="block mb-6">
        <h2 className="text-2xl font-bold text-gray-900">GTM Hub</h2>
      </Link>

      {/* Global Search */}
      <div className="mb-6">
        <SearchBar
          placeholder="Search..."
          searchableContent={searchableContent}
        />
      </div>

      {/* Navigation Sections */}
      <div className="space-y-2">
        {/* Home */}
        <Link
          href="/"
          className={`block px-3 py-2 rounded-lg font-semibold ${
            pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          🏠 Home
        </Link>

        {/* Center of Excellence */}
        <div>
          <button
            onClick={() => toggleSection('coe')}
            className="w-full flex items-center justify-between px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <span>🎯 Center of Excellence</span>
            <span className="text-gray-400">{expandedSections.coe ? '▼' : '▶'}</span>
          </button>
          {expandedSections.coe && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
            <Link
              href="/coe"
              className={`block px-3 py-2 rounded-lg text-sm ${
                pathname === '/coe' ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              CoE Overview
            </Link>
            <Link
              href="/coe/bva"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/coe/bva') ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Business Value
            </Link>
            <Link
              href="/coe/ai-best-practices"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/coe/ai-best-practices') ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              AI Best Practices
            </Link>
            <Link
              href="/coe/customer-wins"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/coe/customer-wins') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Customer Wins
            </Link>
            </div>
          )}
        </div>

        {/* Enablement */}
        <div>
          <button
            onClick={() => toggleSection('enablement')}
            className="w-full flex items-center justify-between px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <span>📚 Enablement</span>
            <span className="text-gray-400">{expandedSections.enablement ? '▼' : '▶'}</span>
          </button>
          {expandedSections.enablement && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
            <Link
              href="/enablement/demo"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/demo') ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Demo Hub
            </Link>
            <Link
              href="/enablement/competitive"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/competitive') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Competitive
            </Link>
            <Link
              href="/enablement/training"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/training') ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Training Hub
            </Link>
            <Link
              href="/enablement/e-learning"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/e-learning') ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              E-Learning Hub
            </Link>
            <Link
              href="/enablement/playbooks"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/playbooks') ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Playbooks
            </Link>
            </div>
          )}
        </div>

        {/* Toolkits */}
        <div>
          <button
            onClick={() => toggleSection('toolkits')}
            className="w-full flex items-center justify-between px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <span>🛠️ Team Toolkits</span>
            <span className="text-gray-400">{expandedSections.toolkits ? '▼' : '▶'}</span>
          </button>
          {expandedSections.toolkits && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
            <Link
              href="/enablement/toolkits/sales"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/toolkits/sales') ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sales
            </Link>
            <Link
              href="/enablement/toolkits/csm"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/toolkits/csm') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              CSM
            </Link>
            <Link
              href="/enablement/toolkits/success"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/toolkits/success') ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              SC
            </Link>
            <Link
              href="/enablement/toolkits/marketing"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/enablement/toolkits/marketing') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Marketing
            </Link>
            </div>
          )}
        </div>

        {/* Products */}
        <div>
          <button
            onClick={() => toggleSection('products')}
            className="w-full flex items-center justify-between px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <span>🤖 Products</span>
            <span className="text-gray-400">{expandedSections.products ? '▼' : '▶'}</span>
          </button>
          {expandedSections.products && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
            <Link
              href="/product/sidekick-standalone"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/product/sidekick-standalone') ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sidekick Standalone
            </Link>
            <Link
              href="/product/sidekick-voice"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/product/sidekick-voice') ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sidekick Voice
            </Link>
            <Link
              href="/product/sidekick-email"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/product/sidekick-email') ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sidekick Email
            </Link>
            <Link
              href="/product/sidekick-sales"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/product/sidekick-sales') ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sidekick Sales
            </Link>
            <Link
              href="/product/customer-ai"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/product/customer-ai') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Customer AI
            </Link>
            <Link
              href="/product/guides-and-journeys"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/product/guides-and-journeys') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Guides & Journeys
            </Link>
            <Link
              href="/product/app-platform"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/product/app-platform') ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              App Platform
            </Link>
            </div>
          )}
        </div>

        {/* Resources */}
        <div>
          <button
            onClick={() => toggleSection('resources')}
            className="w-full flex items-center justify-between px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <span>📁 Resources</span>
            <span className="text-gray-400">{expandedSections.resources ? '▼' : '▶'}</span>
          </button>
          {expandedSections.resources && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
            <Link
              href="/resources/templates"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/resources/templates') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Templates
            </Link>
            <Link
              href="/resources/content"
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive('/resources/content') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Content Hub
            </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
