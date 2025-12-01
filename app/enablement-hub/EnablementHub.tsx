'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CatalogEntry,
  Product,
  Audience,
  LearningPath,
} from '@/lib/types/catalog';

interface EnablementHubProps {
  entries: CatalogEntry[];
  audiences: Audience[];
  learningPaths: LearningPath[];
  products: Product[];
}

// Navigation tabs - "All Training" shows catalog, others show curated collections
const NAVIGATION_TABS = [
  { id: 'all', label: 'All Training', icon: null },
  { id: 'product', label: 'Product', icon: '📦' },
  { id: 'sales', label: 'Sales', icon: '💼' },
  { id: 'customer-success', label: 'Customer Success', icon: '🤝' },
  { id: 'solutions-consulting', label: 'Solutions Consulting', icon: '💡' },
  { id: 'competitive', label: 'Competitive', icon: '⚔️' },
];

// Curated collections for each tab (can be managed via Sanity or here)
// Each collection has groups with specific entry IDs or filter criteria
const CURATED_COLLECTIONS: Record<string, { groups: { id: string; label: string; entryIds?: string[]; filter?: (e: CatalogEntry) => boolean }[] }> = {
  product: {
    groups: [
      { id: 'gladly', label: 'Gladly', filter: (e) => e.products?.some(p => p.slug.current === 'sidekick' || p.slug.current === 'gladly') || false },
      { id: 'by-channel', label: 'By Channel', filter: (e) => e.title.toLowerCase().includes('channel') || e.title.toLowerCase().includes('email') || e.title.toLowerCase().includes('voice') },
      { id: 'technical', label: 'Technical', filter: (e) => e.enablementCategory?.some(c => c.toLowerCase().includes('technical')) || false },
      { id: 'integrations', label: 'Integrations', filter: (e) => e.title.toLowerCase().includes('zendesk') || e.title.toLowerCase().includes('integration') || e.title.toLowerCase().includes('app platform') },
    ],
  },
  sales: {
    groups: [
      { id: 'first-meeting', label: 'First Meeting', filter: (e) => e.title.toLowerCase().includes('first') || e.title.toLowerCase().includes('meeting') || e.title.toLowerCase().includes('initial') },
      { id: 'poc', label: 'POC', filter: (e) => e.title.toLowerCase().includes('poc') || e.title.toLowerCase().includes('pilot') },
      { id: 'pipeline', label: 'Pipeline Conversion', filter: (e) => e.title.toLowerCase().includes('pipeline') || e.title.toLowerCase().includes('conversion') || e.enablementCategory?.some(c => c.toLowerCase().includes('gtm')) || false },
      { id: 'demoing', label: 'Demoing', filter: (e) => e.enablementCategory?.some(c => c.toLowerCase().includes('demo')) || e.title.toLowerCase().includes('demo') },
    ],
  },
  'customer-success': {
    groups: [
      { id: 'customer-meetings', label: 'Customer Meetings', filter: (e) => e.title.toLowerCase().includes('customer') && !e.title.toLowerCase().includes('ai') },
      { id: 'business-reviews', label: 'Business Reviews', filter: (e) => e.title.toLowerCase().includes('qbr') || e.title.toLowerCase().includes('review') || e.title.toLowerCase().includes('ebr') },
      { id: 'bva', label: 'Business Value Analysis', filter: (e) => e.title.toLowerCase().includes('bva') || e.title.toLowerCase().includes('roi') || e.title.toLowerCase().includes('value') },
    ],
  },
  'solutions-consulting': {
    groups: [
      { id: 'demo-standards', label: 'Demo Standards', filter: (e) => e.enablementCategory?.some(c => c.toLowerCase().includes('demo')) || false },
      { id: 'demo-training', label: 'Demo Training', filter: (e) => e.title.toLowerCase().includes('demo') && (e.title.toLowerCase().includes('training') || e.title.toLowerCase().includes('walkthrough')) },
    ],
  },
  competitive: {
    groups: [
      { id: 'competitive-intel', label: 'Competitive Intelligence', filter: (e) => e.enablementCategory?.some(c => c.toLowerCase().includes('competitive')) || e.title.toLowerCase().includes('competitive') },
    ],
  },
};

// Enablement Types for catalog filter
const ENABLEMENT_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Product' },
  { id: 'technical', label: 'Technical' },
  { id: 'gtm-strategy', label: 'GTM Strategy' },
  { id: 'competitive', label: 'Competitive' },
  { id: 'partner', label: 'Partner' },
  { id: 'value-realization', label: 'Value Realization' },
];

// Roles filter
const ROLE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'sales', label: 'Sales' },
  { id: 'customer-success', label: 'Customer Success' },
  { id: 'solutions-consultant', label: 'Solutions Consultant' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'ps', label: 'PS' },
];

// Product filters
const PRODUCT_FILTERS = [
  { id: 'gladly', label: 'Gladly (fka Sidekick)', color: 'bg-amber-500' },
  { id: 'gladly-team', label: 'Gladly Team (fka Hero)', color: 'bg-blue-500' },
  { id: 'guides', label: 'Guides', color: 'bg-emerald-500' },
  { id: 'journeys', label: 'Journeys', color: 'bg-purple-500' },
  { id: 'app-platform', label: 'App Platform', color: 'bg-cyan-500' },
  { id: 'copilot', label: 'Copilot', color: 'bg-pink-500' },
  { id: 'insights', label: 'Insights & Dashboards', color: 'bg-indigo-500' },
];

// Format filters
const FORMAT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live-replay', label: 'Live Replay' },
  { id: 'on-demand', label: 'On-Demand' },
  { id: 'playbook', label: 'Playbook' },
];

// Type badge colors
const TYPE_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  product: { bg: 'bg-blue-100', text: 'text-blue-700' },
  technical: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  'gtm-strategy': { bg: 'bg-amber-100', text: 'text-amber-700' },
  gtm: { bg: 'bg-amber-100', text: 'text-amber-700' },
  competitive: { bg: 'bg-red-100', text: 'text-red-700' },
  partner: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'pre-sales': { bg: 'bg-rose-100', text: 'text-rose-700' },
  'post-sales': { bg: 'bg-teal-100', text: 'text-teal-700' },
  'demo-standards': { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700' },
  'internal-ops': { bg: 'bg-gray-200', text: 'text-gray-700' },
  'value-realization': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

// Category icons - matches the category tag shown on each card
const CATEGORY_ICONS: Record<string, string> = {
  'product': '📦',
  'technical': '🔧',
  'gtm-strategy': '🚀',
  'gtm': '🚀',
  'competitive': '⚔️',
  'partner': '🤝',
  'pre-sales': '💼',
  'post-sales': '✅',
  'demo-standards': '🎬',
  'internal-ops': '⚙️',
  'training': '🎓',
  'value-realization': '💰',
};

const CATEGORY_ICON_BG: Record<string, string> = {
  'product': 'bg-blue-50',
  'technical': 'bg-cyan-50',
  'gtm-strategy': 'bg-amber-50',
  'gtm': 'bg-amber-50',
  'competitive': 'bg-red-50',
  'partner': 'bg-orange-50',
  'pre-sales': 'bg-rose-50',
  'post-sales': 'bg-teal-50',
  'demo-standards': 'bg-fuchsia-50',
  'internal-ops': 'bg-gray-100',
  'training': 'bg-emerald-50',
  'value-realization': 'bg-emerald-50',
};

// Format date
function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Get type label
function getTypeLabel(category?: string | string[]): string {
  const cat = Array.isArray(category) ? category[0] : category;
  if (!cat) return 'TRAINING';
  const slug = cat.toLowerCase().replace(/\s+/g, '-');
  switch (slug) {
    case 'product': return 'PRODUCT';
    case 'technical': return 'TECHNICAL';
    case 'gtm-strategy':
    case 'gtm': return 'GTM';
    case 'competitive': return 'COMPETITIVE';
    case 'partner': return 'PARTNER';
    case 'pre-sales': return 'PRE-SALES';
    case 'post-sales': return 'POST-SALES';
    case 'demo-standards': return 'DEMO';
    case 'internal-ops': return 'INTERNAL';
    default: return cat.toUpperCase().substring(0, 10);
  }
}

// Get category label (full)
function getCategoryLabel(category?: string | string[]): string {
  const cat = Array.isArray(category) ? category[0] : category;
  if (!cat) return 'Training';
  const slug = cat.toLowerCase().replace(/\s+/g, '-');
  switch (slug) {
    case 'product': return 'Product';
    case 'technical': return 'Technical';
    case 'gtm-strategy':
    case 'gtm': return 'GTM Strategy';
    case 'competitive': return 'Competitive';
    case 'partner': return 'Partner';
    case 'pre-sales': return 'Pre-Sales';
    case 'post-sales': return 'Post-Sales';
    case 'demo-standards': return 'Demo Standards';
    case 'internal-ops': return 'Internal Ops';
    default: return cat;
  }
}

// Get entry format
function getEntryFormat(entry: CatalogEntry): string {
  if (entry.format === 'live-replay') return 'live-replay';
  if (entry.format === 'course') return 'course';
  return 'on-demand';
}

// Track view
async function trackView(entryId: string) {
  try {
    await fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId }),
    });
  } catch (e) {
    // Silent fail
  }
}

export default function EnablementHub({
  entries,
  audiences,
  learningPaths,
  products,
}: EnablementHubProps) {
  // State
  const [activeTab, setActiveTab] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [activeRole, setActiveRole] = useState('all');
  const [activeProductFilters, setActiveProductFilters] = useState<string[]>([]);
  const [activeFormat, setActiveFormat] = useState('all');
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'new' | 'popular'>('all');
  const [coursesOnly, setCoursesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Filter entries for catalog view
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Filter by catalog filter (All, New, Popular)
    if (catalogFilter === 'new') {
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      result = result.filter((e) => new Date(e.publishDate || '').getTime() > thirtyDaysAgo);
    }

    // Filter by type
    if (activeType !== 'all') {
      result = result.filter((e) => {
        const cats = e.enablementCategory || [];
        return cats.some((cat) => cat.toLowerCase().replace(/\s+/g, '-').includes(activeType));
      });
    }

    // Filter by role (using teams)
    if (activeRole !== 'all') {
      result = result.filter((e) => {
        const teams = e.teams || [];
        return teams.some((team) => {
          const slug = team.slug.current.toLowerCase();
          if (activeRole === 'sales') return slug.includes('sales') || slug.includes('ae') || slug.includes('sdr');
          if (activeRole === 'customer-success') return slug.includes('cs') || slug.includes('customer-success') || slug.includes('csm');
          if (activeRole === 'solutions-consultant') return slug.includes('sc') || slug.includes('solutions') || slug.includes('se');
          if (activeRole === 'implementation') return slug.includes('implementation') || slug.includes('onboarding');
          if (activeRole === 'ps') return slug.includes('ps') || slug.includes('professional');
          return true;
        });
      });
    }

    // Filter by products
    if (activeProductFilters.length > 0) {
      result = result.filter((e) =>
        e.products?.some((p) => {
          const slug = p.slug.current.toLowerCase();
          return activeProductFilters.some((filter) => {
            if (filter === 'gladly') return slug === 'sidekick' || slug === 'gladly';
            if (filter === 'gladly-team') return slug === 'classic' || slug === 'hero' || slug === 'gladly-team';
            if (filter === 'insights') return slug === 'insights' || slug === 'dashboards' || slug.includes('dashboard');
            return slug === filter || slug.includes(filter);
          });
        })
      );
    }

    // Filter by format
    if (activeFormat !== 'all') {
      result = result.filter((e) => getEntryFormat(e) === activeFormat);
    }

    // Filter courses only
    if (coursesOnly) {
      result = result.filter((e) => e.format === 'course');
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((e) =>
        e.title.toLowerCase().includes(query) || e.description?.toLowerCase().includes(query)
      );
    }

    // Sort - Popular filter forces most-viewed sort
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
        case 'most-viewed':
          result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
          break;
        default:
          result.sort((a, b) => new Date(b.publishDate || '').getTime() - new Date(a.publishDate || '').getTime());
      }
    }

    return result;
  }, [entries, catalogFilter, activeType, activeRole, activeProductFilters, activeFormat, coursesOnly, searchQuery, sortBy]);

  // Toggle product filter
  const toggleProductFilter = (productId: string) => {
    setActiveProductFilters((prev) =>
      prev.includes(productId) ? prev.filter((p) => p !== productId) : [...prev, productId]
    );
  };

  // Render catalog card
  const renderCatalogCard = (entry: CatalogEntry) => {
    const format = getEntryFormat(entry);
    const category = entry.enablementCategory?.[0] || 'training';
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const badgeColors = TYPE_BADGE_COLORS[categorySlug] || { bg: 'bg-gray-100', text: 'text-gray-600' };
    const categoryIcon = CATEGORY_ICONS[categorySlug] || '🎓';
    const isCourse = format === 'course';

    return (
      <Link
        key={entry._id}
        href={`/enablement-hub/${entry.slug.current}`}
        onClick={() => trackView(entry._id)}
        className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all flex flex-col hover:border-emerald-600 hover:shadow-[0_0_0_3px_rgba(5,150,105,0.1)] no-underline"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide ${badgeColors.bg} ${badgeColors.text}`}>
              <span className="mr-1">{categoryIcon}</span>
              {getCategoryLabel(category)}
            </span>
            {isCourse && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 uppercase tracking-wide">
                Course
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {entry.products?.slice(0, 3).map((product) => {
              const slug = product.slug.current;
              let dotColor = 'bg-gray-400';
              if (slug === 'sidekick' || slug === 'gladly') dotColor = 'bg-amber-500';
              else if (slug === 'classic' || slug === 'gladly-team') dotColor = 'bg-blue-500';
              else if (slug === 'guides') dotColor = 'bg-emerald-500';
              else if (slug === 'journeys') dotColor = 'bg-purple-500';
              return <span key={product._id} className={`w-2 h-2 rounded-full ${dotColor}`} title={product.name} />;
            })}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">{entry.title}</h3>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{entry.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
          <span>{formatDate(entry.publishDate)}</span>
          <span className={`text-[9px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded ${
            format === 'live-replay' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
          }`}>
            {format === 'live-replay' ? 'Live Replay' : 'On-Demand'}
          </span>
        </div>
      </Link>
    );
  };

  // Render grouped section with boxed styling
  const renderGroupedSection = (groupId: string, title: string, items: CatalogEntry[]) => {
    if (items.length === 0) return null;

    return (
      <section
        className="mb-8 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 rounded-2xl p-6 border border-emerald-100/50"
        key={title}
        id={`group-${groupId}`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-emerald-500">•</span>
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

  // Get curated collection content
  const curatedCollection = CURATED_COLLECTIONS[activeTab];

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Sticky Header - includes quick nav for curated tabs */}
      <header className="sticky top-0 z-20">
        <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-500 text-white">
          <div className="max-w-[1400px] mx-auto px-8 pt-8 pb-0">
            <div className="mb-6">
              <h1 className="text-[42px] leading-[48px] font-bold flex items-center gap-3 mb-2">
                <span>🎓</span>
                Enablement Hub
              </h1>
              <p className="text-emerald-100 text-sm max-w-lg">
                Your learning center for product knowledge, sales skills, and professional development.
              </p>
            </div>

            {/* Navigation Tabs */}
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

        {/* Quick Nav for curated tabs */}
        {activeTab !== 'all' && curatedCollection && (
          <div className="bg-[#F8F9FC] border-b border-gray-200">
            <div className="max-w-[1400px] mx-auto px-8 py-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0">
                  Jump to:
                </span>
                {curatedCollection.groups.map((group) => {
                  const itemCount = entries.filter(group.filter || (() => false)).length;
                  if (itemCount === 0) return null;
                  return (
                    <button
                      key={group.id}
                      onClick={() => {
                        const el = document.getElementById(`group-${group.id}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer flex-shrink-0"
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
        {/* "All Training" Tab - Full Catalog */}
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
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Filter Panel */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
              {/* Type */}
              <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Type</span>
                <div className="flex flex-wrap gap-2">
                  {ENABLEMENT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveType(type.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
                        activeType === type.id
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Role</span>
                <div className="flex flex-wrap gap-2">
                  {ROLE_FILTERS.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setActiveRole(role.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
                        activeRole === role.id
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product */}
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
                            ? 'bg-emerald-600 border-emerald-600 text-white'
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

              {/* Format */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Format</span>
                <div className="flex flex-wrap gap-2 items-center">
                  {FORMAT_FILTERS.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => setActiveFormat(format.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
                        activeFormat === format.id
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {format.label}
                    </button>
                  ))}
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={coursesOnly}
                      onChange={(e) => setCoursesOnly(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span>Courses only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg mb-6 max-w-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search training..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-transparent text-sm text-gray-900 w-full outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Results Header */}
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
                  <option value="most-viewed">Most Viewed</option>
                </select>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 border rounded-lg cursor-pointer ${
                      viewMode === 'grid' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border rounded-lg cursor-pointer ${
                      viewMode === 'list' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Catalog Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredEntries.map(renderCatalogCard)}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredEntries.map((entry) => {
                  const category = entry.enablementCategory?.[0] || 'training';
                  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
                  const badgeColors = TYPE_BADGE_COLORS[categorySlug] || { bg: 'bg-gray-100', text: 'text-gray-600' };
                  const categoryIcon = CATEGORY_ICONS[categorySlug] || '🎓';
                  const categoryIconBg = CATEGORY_ICON_BG[categorySlug] || 'bg-gray-100';

                  return (
                    <Link
                      key={entry._id}
                      href={entry.externalUrl || `/enablement-hub/${entry.slug.current}`}
                      target={entry.externalUrl ? '_blank' : undefined}
                      onClick={() => trackView(entry._id)}
                      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all flex items-center gap-4 hover:border-emerald-600 no-underline"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${categoryIconBg}`}>
                        {categoryIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{entry.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{entry.description}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase ${badgeColors.bg} ${badgeColors.text}`}>
                        {getCategoryLabel(category)}
                      </span>
                      <span className="text-[11px] text-gray-400 w-20 text-right">{formatDate(entry.publishDate)}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {filteredEntries.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No training found</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </>
        ) : (
          /* Curated Collection Tabs */
          curatedCollection ? (
            <div>
              {curatedCollection.groups.map((group) => {
                const items = entries.filter(group.filter || (() => false));
                return renderGroupedSection(group.id, group.label, items);
              })}

              {curatedCollection.groups.every((g) => entries.filter(g.filter || (() => false)).length === 0) && (
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
