'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CatalogEntry,
  Product,
  Team,
  Topic,
  ContentType,
} from '@/lib/types/catalog';

interface ContentHubProps {
  entries: CatalogEntry[];
  products: Product[];
  teams: Team[];
  topics: Topic[];
  contentTypes: ContentType[];
}

// Navigation tabs - aligned with Enablement Hub
const NAVIGATION_TABS = [
  { id: 'all', label: 'All Content', icon: null },
  { id: 'sales', label: 'Sales', icon: '💼' },
  { id: 'customer-success', label: 'Customer Success', icon: '🤝' },
  { id: 'solutions-consulting', label: 'Solutions Consulting', icon: '💡' },
  { id: 'competitive', label: 'Competitive', icon: '⚔️' },
  { id: 'revops', label: 'RevOps Tools', icon: '⚙️' },
];

// Curated collections for each tab
const CURATED_COLLECTIONS: Record<string, { groups: { id: string; label: string; filter: (e: CatalogEntry) => boolean }[] }> = {
  sales: {
    groups: [
      { id: 'pitch-decks', label: 'Pitch Decks', filter: (e) => e.contentType?.slug?.current === 'deck' || e.title.toLowerCase().includes('deck') },
      { id: 'one-pagers', label: 'One-Pagers', filter: (e) => e.contentType?.slug?.current === 'one-pager' || e.title.toLowerCase().includes('one-pager') || e.title.toLowerCase().includes('one pager') },
      { id: 'email-templates', label: 'Email Templates', filter: (e) => e.title.toLowerCase().includes('template') || e.title.toLowerCase().includes('email') || e.title.toLowerCase().includes('follow-up') },
      { id: 'case-studies', label: 'Case Studies & Social Proof', filter: (e) => e.title.toLowerCase().includes('case study') || e.title.toLowerCase().includes('social proof') || e.title.toLowerCase().includes('proof') },
    ],
  },
  'customer-success': {
    groups: [
      { id: 'qbr-materials', label: 'QBR & Business Reviews', filter: (e) => e.title.toLowerCase().includes('qbr') || e.title.toLowerCase().includes('business review') || e.title.toLowerCase().includes('ebr') },
      { id: 'roi-tools', label: 'ROI & Value Tools', filter: (e) => e.title.toLowerCase().includes('roi') || e.title.toLowerCase().includes('calculator') || e.title.toLowerCase().includes('value') },
      { id: 'customer-guides', label: 'Customer Guides', filter: (e) => e.teams?.some(t => t?.slug?.current?.includes('cs') || t?.slug?.current?.includes('customer-success')) || false },
    ],
  },
  'solutions-consulting': {
    groups: [
      { id: 'demo-materials', label: 'Demo Materials', filter: (e) => e.title.toLowerCase().includes('demo') },
      { id: 'technical-docs', label: 'Technical Documentation', filter: (e) => e.title.toLowerCase().includes('technical') || e.title.toLowerCase().includes('implementation') || e.title.toLowerCase().includes('integration') },
      { id: 'workshop-materials', label: 'Workshop Materials', filter: (e) => e.title.toLowerCase().includes('workshop') || e.title.toLowerCase().includes('express') },
    ],
  },
  competitive: {
    groups: [
      { id: 'battlecards', label: 'Battle Cards', filter: (e) => e.contentType?.slug?.current === 'battle-card' || e.title.toLowerCase().includes('battlecard') || e.title.toLowerCase().includes('battle card') },
      { id: 'positioning', label: 'Positioning & Messaging', filter: (e) => e.title.toLowerCase().includes('messaging') || e.title.toLowerCase().includes('positioning') },
    ],
  },
  revops: {
    groups: [
      { id: 'salesforce', label: 'Salesforce Guides', filter: (e) => e.title.toLowerCase().includes('salesforce') },
      { id: 'process-docs', label: 'Process Documentation', filter: (e) => e.title.toLowerCase().includes('process') || e.title.toLowerCase().includes('guide') || e.title.toLowerCase().includes('how to') },
      { id: 'dashboards', label: 'Dashboards & Reporting', filter: (e) => e.title.toLowerCase().includes('dashboard') || e.title.toLowerCase().includes('reporting') || e.title.toLowerCase().includes('pipeline') },
      { id: 'tools', label: 'Tools & Calculators', filter: (e) => e.title.toLowerCase().includes('calculator') || e.title.toLowerCase().includes('tool') },
    ],
  },
};

// Content type filters
const TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'deck', label: 'Decks' },
  { id: 'one-pager', label: 'One-Pagers' },
  { id: 'battle-card', label: 'Battlecards' },
  { id: 'document', label: 'Docs' },
];

// Type badge colors
const TYPE_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  deck: { bg: 'bg-blue-50', text: 'text-blue-600' },
  'one-pager': { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  'battle-card': { bg: 'bg-red-50', text: 'text-red-600' },
  document: { bg: 'bg-sky-50', text: 'text-sky-600' },
  tool: { bg: 'bg-cyan-50', text: 'text-cyan-600' },
  template: { bg: 'bg-purple-50', text: 'text-purple-600' },
};

// Type icons
const TYPE_ICONS: Record<string, string> = {
  'battle-card': '⚔️',
  'one-pager': '📄',
  deck: '📊',
  template: '📋',
  document: '📝',
  tool: '🔧',
};

const TYPE_ICON_BG: Record<string, string> = {
  'battle-card': 'bg-red-50',
  'one-pager': 'bg-emerald-50',
  deck: 'bg-blue-50',
  template: 'bg-purple-50',
  document: 'bg-sky-50',
  tool: 'bg-cyan-50',
};

// Product dot colors
const PRODUCT_DOT_COLORS: Record<string, string> = {
  sidekick: 'bg-amber-500',
  gladly: 'bg-amber-500',
  classic: 'bg-blue-500',
  hero: 'bg-blue-500',
  'gladly-team': 'bg-blue-500',
  voice: 'bg-purple-500',
  guides: 'bg-emerald-500',
  journeys: 'bg-purple-500',
  'app-platform': 'bg-cyan-500',
  copilot: 'bg-pink-500',
  insights: 'bg-indigo-500',
  dashboards: 'bg-indigo-500',
};

// Product filter options (matches Enablement Hub)
const PRODUCT_FILTERS = [
  { id: 'gladly', label: 'Gladly (fka Sidekick)', color: 'bg-amber-500' },
  { id: 'gladly-team', label: 'Gladly Team (fka Hero)', color: 'bg-blue-500' },
  { id: 'guides', label: 'Guides', color: 'bg-emerald-500' },
  { id: 'journeys', label: 'Journeys', color: 'bg-purple-500' },
  { id: 'app-platform', label: 'App Platform', color: 'bg-cyan-500' },
  { id: 'copilot', label: 'Copilot', color: 'bg-pink-500' },
  { id: 'insights', label: 'Insights & Dashboards', color: 'bg-indigo-500' },
];

// Format date
function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Get usage type
function getUsageType(entry: CatalogEntry): 'internal' | 'external' {
  const internalTypes = ['battle-card', 'competitive', 'internal-doc'];
  return internalTypes.includes(entry.contentType?.slug?.current || '') ? 'internal' : 'external';
}

// Check if template
function isTemplate(entry: CatalogEntry): boolean {
  return entry.title.toLowerCase().includes('template') || entry.format === 'template';
}

// Track view
async function trackView(entryId: string) {
  try {
    await fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId }),
    });
  } catch (e) {}
}

export default function ContentHub({
  entries,
  products,
  teams,
  topics,
  contentTypes,
}: ContentHubProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [activeProductFilters, setActiveProductFilters] = useState<string[]>([]);
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'new' | 'popular'>('all');
  const [templatesOnly, setTemplatesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Filtered entries for catalog
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Filter by catalog filter (All, New, Popular)
    if (catalogFilter === 'new') {
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      result = result.filter((e) => new Date(e.publishDate || '').getTime() > thirtyDaysAgo);
    }

    if (activeTypeFilter !== 'all') {
      result = result.filter((e) => e.contentType?.slug?.current === activeTypeFilter);
    }

    if (activeProductFilters.length > 0) {
      result = result.filter((e) =>
        e.products?.some((p) => p?.slug?.current && activeProductFilters.includes(p.slug.current))
      );
    }

    if (templatesOnly) {
      result = result.filter(isTemplate);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((e) =>
        e.title.toLowerCase().includes(query) || e.description?.toLowerCase().includes(query)
      );
    }

    // Sort - Popular filter forces most-used sort
    if (catalogFilter === 'popular') {
      result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else {
      switch (sortBy) {
        case 'oldest':
          result.sort((a, b) => new Date(a.publishDate || '').getTime() - new Date(b.publishDate || '').getTime());
          break;
        case 'az':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'most-used':
          result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
          break;
        default:
          result.sort((a, b) => new Date(b.publishDate || '').getTime() - new Date(a.publishDate || '').getTime());
      }
    }

    return result;
  }, [entries, catalogFilter, activeTypeFilter, activeProductFilters, templatesOnly, searchQuery, sortBy]);

  const toggleProductFilter = (slug: string) => {
    setActiveProductFilters((prev) =>
      prev.includes(slug) ? prev.filter((p) => p !== slug) : [...prev, slug]
    );
  };

  const handleCardClick = (entry: CatalogEntry) => {
    trackView(entry._id);
    const url = entry.externalUrl;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Render catalog card
  const renderCatalogCard = (entry: CatalogEntry) => {
    const typeSlug = entry.contentType?.slug?.current || 'document';
    const badgeColors = TYPE_BADGE_COLORS[typeSlug] || { bg: 'bg-gray-100', text: 'text-gray-600' };
    const typeIcon = TYPE_ICONS[typeSlug] || '📄';
    const usage = getUsageType(entry);
    const entryIsTemplate = isTemplate(entry);

    return (
      <div
        key={entry._id}
        onClick={() => handleCardClick(entry)}
        className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all flex flex-col hover:border-purple-600 hover:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide ${badgeColors.bg} ${badgeColors.text}`}>
              <span className="mr-1">{typeIcon}</span>
              {entry.contentType?.name || 'Document'}
            </span>
            {entryIsTemplate && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 uppercase tracking-wide">
                Template
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {entry.products?.slice(0, 3).map((product) => product && (
              <span
                key={product._id}
                className={`w-2 h-2 rounded-full ${PRODUCT_DOT_COLORS[product?.slug?.current || ''] || 'bg-gray-400'}`}
                title={product.name}
              />
            ))}
          </div>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">{entry.title}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{entry.description}</p>
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
          <span>{formatDate(entry.publishDate)}</span>
          <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wide">{usage}</span>
        </div>
      </div>
    );
  };

  // Render grouped section with boxed styling
  const renderGroupedSection = (groupId: string, title: string, items: CatalogEntry[]) => {
    if (items.length === 0) return null;

    return (
      <section
        className="mb-8 bg-gradient-to-br from-purple-50/50 via-white to-violet-50/50 rounded-2xl p-6 border border-purple-100/50"
        key={title}
        id={`group-${groupId}`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-purple-500">•</span>
            {title}
          </h2>
          <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200">
            {items.length} items
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(renderCatalogCard)}
        </div>
      </section>
    );
  };

  const curatedCollection = CURATED_COLLECTIONS[activeTab];

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Sticky Header - includes quick nav for curated tabs */}
      <header className="sticky top-0 z-20">
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-violet-500 text-white">
          <div className="max-w-[1400px] mx-auto px-8 pt-8 pb-0">
            <div className="mb-6">
              <h1 className="text-[42px] leading-[48px] font-bold flex items-center gap-3 mb-2">
                <span>📚</span>
                Content Hub
              </h1>
              <p className="text-purple-100 text-sm max-w-lg">
                Find it fast, use it now. Decks, one-pagers, battle cards, templates and more.
              </p>
            </div>

            <nav className="flex gap-2 -mb-px overflow-x-auto pb-px">
              {NAVIGATION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-medium px-4 py-2.5 rounded-t-lg border-none cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#F8F9FC] text-gray-900'
                      : 'bg-black/20 text-white hover:bg-black/30'
                  }`}
                >
                  {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Quick Nav - part of sticky header for curated tabs */}
        {activeTab !== 'all' && curatedCollection && (
          <div className="bg-[#F8F9FC] border-b border-gray-200 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-8 py-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0">
                  Jump to:
                </span>
                {curatedCollection.groups.map((group) => {
                  const itemCount = entries.filter(group.filter).length;
                  if (itemCount === 0) return null;
                  return (
                    <button
                      key={group.id}
                      onClick={() => {
                        const el = document.getElementById(`group-${group.id}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer flex-shrink-0"
                    >
                      <span className="text-sm font-medium text-gray-700">{group.label}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                        {itemCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-[1400px] mx-auto px-8 pt-5 pb-8">
        {activeTab === 'all' ? (
          <>
            {/* Catalog Filter Buttons */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { id: 'all', label: 'All', icon: '📋' },
                { id: 'new', label: 'New', icon: '✨' },
                { id: 'popular', label: 'Most Popular', icon: '🔥' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setCatalogFilter(filter.id as 'all' | 'new' | 'popular')}
                  className={`text-sm font-medium px-4 py-2 rounded-lg border cursor-pointer transition-all flex items-center gap-2 ${
                    catalogFilter === filter.id
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Type</span>
                <div className="flex flex-wrap gap-2">
                  {TYPE_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveTypeFilter(filter.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
                        activeTypeFilter === filter.id
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Product</span>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_FILTERS.map((product) => {
                    const isActive = activeProductFilters.includes(product.id);
                    return (
                      <button
                        key={product.id}
                        onClick={() => toggleProductFilter(product.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${product.color}`} />
                        {product.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Options</span>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={templatesOnly}
                    onChange={(e) => setTemplatesOnly(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span>Templates only</span>
                </label>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg mb-6 max-w-sm focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-transparent text-sm text-gray-900 w-full outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Results */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{filteredEntries.length} resources</span>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">A-Z</option>
                  <option value="most-used">Most Used</option>
                </select>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 border rounded-lg cursor-pointer ${viewMode === 'grid' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400'}`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border rounded-lg cursor-pointer ${viewMode === 'list' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400'}`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredEntries.map(renderCatalogCard)}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredEntries.map((entry) => {
                  const typeSlug = entry.contentType?.slug?.current || 'document';
                  const badgeColors = TYPE_BADGE_COLORS[typeSlug] || { bg: 'bg-gray-100', text: 'text-gray-600' };
                  const typeIcon = TYPE_ICONS[typeSlug] || '📄';
                  return (
                    <div
                      key={entry._id}
                      onClick={() => handleCardClick(entry)}
                      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all flex items-center gap-4 hover:border-purple-600"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${TYPE_ICON_BG[typeSlug] || 'bg-gray-100'}`}>
                        {typeIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{entry.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{entry.description}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase ${badgeColors.bg} ${badgeColors.text}`}>
                        <span className="mr-1">{typeIcon}</span>
                        {entry.contentType?.name || 'Document'}
                      </span>
                      <span className="text-[11px] text-gray-400 w-20 text-right">{formatDate(entry.publishDate)}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredEntries.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </>
        ) : (
          /* Curated Collections */
          curatedCollection ? (
            <div>
              {curatedCollection.groups.map((group) => {
                const items = entries.filter(group.filter);
                return renderGroupedSection(group.id, group.label, items);
              })}

              {curatedCollection.groups.every((g) => entries.filter(g.filter).length === 0) && (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No content yet</h3>
                  <p className="text-sm text-gray-500">Content for this collection will be added soon.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Collection coming soon</h3>
              <p className="text-sm text-gray-500">This curated collection is being prepared.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
}
