'use client';

import { useState, useMemo, useEffect } from 'react';
import { CatalogEntry, Collection, CollectionSubsection } from '@/lib/types/catalog';
import { EnablementCardV2 } from '@/components/enablement/EnablementCardV2';
import styles from './EnablementHubV2.module.css';

interface EnablementHubV2Props {
  entries: CatalogEntry[];
  collections: Collection[];
}

export function EnablementHubV2({ entries, collections }: EnablementHubV2Props) {
  const [activeTab, setActiveTab] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Enable smooth scrolling on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Reset filters when switching tabs
  useEffect(() => {
    if (activeTab !== 'browse-all') {
      setCategoryFilter('all');
      setSearchQuery('');
    }
  }, [activeTab]);

  // Generate tabs from CMS collections
  const tabs = useMemo(() => {
    const featuredTab = { id: 'featured', label: 'Featured', icon: '⭐', subsections: [] as CollectionSubsection[] };
    const collectionTabs = collections
      .filter(c => c.showInNavigation && c.isEnabled)
      .sort((a, b) => a.order - b.order)
      .map(c => ({
        id: c.slug.current,
        label: c.name,
        icon: c.icon || '📁',
        subsections: c.subsections || []
      }));
    const browseAllTab = { id: 'browse-all', label: 'Browse All', icon: null, subsections: [] as CollectionSubsection[] };

    return [featuredTab, ...collectionTabs, browseAllTab];
  }, [collections]);

  // Filter entries by subsection logic
  const filterEntriesBySubsection = (
    entries: CatalogEntry[],
    subsection: CollectionSubsection,
    collectionId: string
  ): CatalogEntry[] => {
    // First filter by subsection assignment
    let filtered = entries.filter(e => {
      const assignment = e.enablementHubCollections?.find(a =>
        a?.collection?._id === collectionId
      );

      if (!assignment) return false;

      // If no subsections specified in assignment, show in all subsections
      if (!assignment.subsections || assignment.subsections.length === 0) {
        return true;
      }

      // Otherwise, check if this subsection is in the assignment
      return assignment.subsections.includes(subsection.name);
    });

    // Then apply filter logic
    switch (subsection.filterLogic) {
      case 'featured':
        filtered = filtered.filter(e =>
          e.displayPriority === 'featured' || e.featured
        );
        break;

      case 'recent':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = filtered.filter(e => {
          const updatedDate = e._updatedAt || e.publishDate;
          if (!updatedDate) return false;
          return new Date(updatedDate) > thirtyDaysAgo;
        });
        break;

      case 'priority':
        filtered = filtered
          .filter(e => e.displayPriority)
          .sort((a, b) => {
            const priorityOrder: Record<string, number> = { hero: 0, featured: 1, normal: 2 };
            const aPriority = a.displayPriority || 'normal';
            const bPriority = b.displayPriority || 'normal';
            return priorityOrder[aPriority] - priorityOrder[bPriority];
          });
        break;

      case 'all':
      default:
        // Return all entries (already filtered by subsection assignment above)
        break;
    }

    return subsection.maxItems && subsection.maxItems > 0
      ? filtered.slice(0, subsection.maxItems)
      : filtered;
  };

  // Get unique enablement categories for filter buttons
  const enablementCategories = useMemo(() => {
    const categories = new Set<string>();
    entries.forEach(entry => {
      if (entry.enablementCategory && entry.enablementCategory.length > 0) {
        entry.enablementCategory.forEach(cat => categories.add(cat));
      }
    });
    return Array.from(categories).sort();
  }, [entries]);

  // Filter entries by active tab
  const filteredEntries = useMemo(() => {
    if (activeTab === 'featured') {
      return entries
        .filter(e => e.displayPriority === 'hero' || e.displayPriority === 'featured' || e.featured)
        .sort((a, b) => {
          const priorityOrder = { hero: 0, featured: 1, normal: 2 };
          const aPriority = a.displayPriority || 'normal';
          const bPriority = b.displayPriority || 'normal';
          return priorityOrder[aPriority as keyof typeof priorityOrder] - priorityOrder[bPriority as keyof typeof priorityOrder];
        });
    }

    if (activeTab === 'browse-all') {
      let filtered = entries;

      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(e =>
          e.title?.toLowerCase().includes(query) ||
          e.description?.toLowerCase().includes(query)
        );
      }

      // Apply category filter
      if (categoryFilter !== 'all') {
        filtered = filtered.filter(e =>
          e.enablementCategory?.includes(categoryFilter)
        );
      }

      return filtered;
    }

    const activeCollection = collections.find(c => c.slug.current === activeTab);
    if (!activeCollection) return [];

    return entries.filter(e =>
      e.enablementHubCollections?.some(assignment =>
        assignment?.collection?._id === activeCollection._id
      )
    );
  }, [activeTab, entries, collections, searchQuery, categoryFilter]);

  // Get current tab
  const currentTab = tabs.find(t => t.id === activeTab);

  const heroEntries = useMemo(() => {
    if (activeTab !== 'featured') return [];
    return filteredEntries.filter(e => e.displayPriority === 'hero').slice(0, 2);
  }, [activeTab, filteredEntries]);

  const regularFeaturedEntries = useMemo(() => {
    if (activeTab !== 'featured') return filteredEntries;
    return filteredEntries.filter(e => e.displayPriority !== 'hero');
  }, [activeTab, filteredEntries]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Green Gradient */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <span>🎓</span> Enablement Hub
          </h1>
          <p>Training sessions, playbooks, and enablement resources for all GTM teams</p>

          {/* Navigation Tabs */}
          <div className={styles.navTabs}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.navTab} ${activeTab === tab.id ? styles.active : ''} ${tab.id === 'browse-all' ? styles.browseAll : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon && <span>{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Featured Tab */}
        {activeTab === 'featured' && (
          <div className={`${styles.tabPanel} ${styles.active}`}>
            {/* Hero Row */}
            {heroEntries.length > 0 && (
              <div className={styles.heroRow}>
                {heroEntries.map(entry => (
                  <EnablementCardV2 key={entry._id} entry={entry} variant="hero" />
                ))}
              </div>
            )}

            {/* Regular Featured Entries */}
            {regularFeaturedEntries.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    <span>✨</span> Featured Content
                  </h2>
                  <span className={styles.sectionCount}>{regularFeaturedEntries.length}</span>
                </div>
                <div className={styles.cardGrid}>
                  {regularFeaturedEntries.map(entry => (
                    <EnablementCardV2 key={entry._id} entry={entry} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collection Tabs (with subsections) */}
        {activeTab !== 'featured' && activeTab !== 'browse-all' && currentTab && (
          <div className={`${styles.tabPanel} ${styles.active}`}>
            {/* Jump Navigation for Subsections */}
            {currentTab.subsections && currentTab.subsections.length > 1 && (
              <div className={styles.jumpNav}>
                <span className={styles.jumpLabel}>Jump to:</span>
                {currentTab.subsections
                  .sort((a, b) => a.order - b.order)
                  .map((subsection) => (
                    <a
                      key={subsection.name}
                      href={`#section-${subsection.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={styles.jumpLink}
                    >
                      {subsection.name}
                    </a>
                  ))}
              </div>
            )}

            {currentTab.subsections && currentTab.subsections.length > 0 ? (
              // Multiple subsections
              currentTab.subsections
                .sort((a, b) => a.order - b.order)
                .map(subsection => {
                  const activeCollection = collections.find(c => c.slug.current === activeTab);
                  if (!activeCollection) return null;

                  const subsectionEntries = filterEntriesBySubsection(
                    filteredEntries,
                    subsection,
                    activeCollection._id
                  );

                  if (subsectionEntries.length === 0) return null;

                  return (
                    <div
                      key={subsection.name}
                      id={`section-${subsection.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={styles.section}
                    >
                      <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                          {subsection.icon && <span>{subsection.icon}</span>}
                          {subsection.name}
                        </h2>
                        <span className={styles.sectionCount}>
                          {subsectionEntries.length} {subsectionEntries.length === 1 ? 'resource' : 'resources'}
                        </span>
                      </div>
                      <div className={styles.cardGrid}>
                        {subsectionEntries.map(entry => (
                          <EnablementCardV2 key={entry._id} entry={entry} />
                        ))}
                      </div>
                    </div>
                  );
                })
            ) : (
              // No subsections, show all entries in one section
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    {currentTab.icon} {currentTab.label}
                  </h2>
                  <span className={styles.sectionCount}>
                    {filteredEntries.length}
                  </span>
                </div>
                <div className={styles.cardGrid}>
                  {filteredEntries.map(entry => (
                    <EnablementCardV2 key={entry._id} entry={entry} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Browse All Tab */}
        {activeTab === 'browse-all' && (
          <div className={`${styles.tabPanel} ${styles.active}`}>
            {/* Search Bar */}
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search all enablement content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter Buttons */}
            <div className={styles.categoryFilters}>
              <button
                className={`${styles.categoryFilterBtn} ${categoryFilter === 'all' ? styles.active : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All
              </button>
              {enablementCategories.map(category => (
                <button
                  key={category}
                  className={`${styles.categoryFilterBtn} ${categoryFilter === category ? styles.active : ''}`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category.replace(/-/g, ' ')}
                </button>
              ))}
            </div>

            <div className={styles.browseHeader}>
              <div className={styles.browseLeft}>
                <span className={styles.resultsCount}>{filteredEntries.length} resources</span>
                <select
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="title">A-Z</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="2" rx="1" />
                    <rect x="3" y="11" width="18" height="2" rx="1" />
                    <rect x="3" y="17" width="18" height="2" rx="1" />
                  </svg>
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className={styles.browseGrid}>
                {filteredEntries.map(entry => (
                  <EnablementCardV2 key={entry._id} entry={entry} />
                ))}
              </div>
            ) : (
              <div className={styles.browseList}>
                {filteredEntries.map(entry => {
                  const category = entry.enablementCategory?.[0] || '';
                  const badgeColors: Record<string, { bg: string; text: string }> = {
                    'gtm-strategy': { bg: '#f3e8ff', text: '#7c3aed' },
                    'product': { bg: '#dbeafe', text: '#1e40af' },
                    'competitive': { bg: '#ffe4e6', text: '#be123c' },
                    'technical': { bg: '#e0e7ff', text: '#4338ca' },
                    'value-realization': { bg: '#fef3c7', text: '#b45309' },
                    'partner': { bg: '#d1fae5', text: '#065f46' },
                  };
                  const colors = badgeColors[category] || { bg: '#f3f4f6', text: '#374151' };

                  return (
                    <div
                      key={entry._id}
                      className={styles.listItem}
                      onClick={() => window.location.href = `/enablement-hub/${entry.slug.current}`}
                    >
                      <div className={styles.listIcon}>📚</div>
                      <div className={styles.listContent}>
                        <h3 className={styles.listTitle}>{entry.title}</h3>
                        <p className={styles.listDescription}>{entry.description || 'No description available'}</p>
                      </div>
                      {category && (
                        <span
                          className={styles.listBadge}
                          style={{ backgroundColor: colors.bg, color: colors.text }}
                        >
                          {category.replace('-', ' ')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
