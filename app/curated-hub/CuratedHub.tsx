'use client';

import { useState, useMemo, useEffect } from 'react';
import { CatalogEntry, Collection, CollectionSubsection } from '@/lib/types/catalog';
import { ContentCardV2 } from '@/components/content/ContentCardV2';
import styles from './CuratedHub.module.css';

interface CuratedHubProps {
  entries: CatalogEntry[];
  collections: Collection[];
}

export function CuratedHub({ entries, collections }: CuratedHubProps) {
  const [activeTab, setActiveTab] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

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
      setTypeFilter('all');
      setSearchQuery('');
    }
  }, [activeTab]);

  // Build tabs dynamically from collections
  const tabs = useMemo(() => {
    const featuredTab = { id: 'featured', label: 'Highlights', icon: '⭐', subsections: [] as CollectionSubsection[] };

    const collectionTabs = collections
      .filter(c => c.showInNavigation && c.isEnabled)
      .sort((a, b) => a.order - b.order)
      .map(c => ({
        id: c.slug.current,
        label: c.name,
        icon: c.icon || '📁',
        subsections: c.subsections || []
      }));

    const browseAllTab = { id: 'browse-all', label: 'Browse All', icon: '🗂️', subsections: [] as CollectionSubsection[] };

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
      const assignment = e.curatedHubCollections?.find(a =>
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

  // Get unique content types for filter buttons
  const contentTypes = useMemo(() => {
    const types = new Set<string>();
    entries.forEach(entry => {
      const type = entry.contentType?.name || entry.format || 'document';
      types.add(type);
    });
    return Array.from(types).sort();
  }, [entries]);

  // Filter entries based on active tab
  const filteredEntries = useMemo(() => {
    let filtered = entries;

    if (activeTab === 'browse-all') {
      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(e =>
          e.title?.toLowerCase().includes(query) ||
          e.description?.toLowerCase().includes(query)
        );
      }

      // Apply type filter
      if (typeFilter !== 'all') {
        filtered = filtered.filter(e => {
          const type = e.contentType?.name || e.format || 'document';
          return type === typeFilter;
        });
      }

      return filtered;
    }

    if (activeTab === 'featured') {
      return entries.filter(e =>
        e.displayPriority === 'hero' || e.displayPriority === 'featured' || e.featured
      );
    }

    // Collection tab - filter by collection assignment
    const activeCollection = collections.find(c => c.slug.current === activeTab);
    if (!activeCollection) return [];

    return entries.filter(e =>
      e.curatedHubCollections?.some(assignment =>
        assignment?.collection?._id === activeCollection._id
      )
    );
  }, [activeTab, entries, collections, searchQuery, typeFilter]);

  // Hero entries (for Featured tab only)
  const heroEntries = useMemo(() => {
    if (activeTab !== 'featured') return [];
    return filteredEntries.filter(e => e.displayPriority === 'hero').slice(0, 2);
  }, [activeTab, filteredEntries]);

  // Regular featured entries (for Featured tab only)
  const regularFeaturedEntries = useMemo(() => {
    if (activeTab !== 'featured') return filteredEntries;
    return filteredEntries.filter(e => e.displayPriority !== 'hero');
  }, [activeTab, filteredEntries]);

  // Get current tab
  const currentTab = tabs.find(t => t.id === activeTab);

  // Get badge for entry
  const getBadgeLabel = (entry: CatalogEntry): string => {
    const type = entry.contentType?.name || entry.format || 'document';
    return type.toUpperCase();
  };

  const getBadgeColors = (entry: CatalogEntry) => {
    const type = (entry.contentType?.name || entry.format || 'document').toLowerCase();

    const colorMap: Record<string, { bg: string; text: string }> = {
      'deck': { bg: '#dbeafe', text: '#1e40af' },
      'onepager': { bg: '#d1fae5', text: '#065f46' },
      'one-pager': { bg: '#d1fae5', text: '#065f46' },
      'battlecard': { bg: '#ffe4e6', text: '#be123c' },
      'template': { bg: '#fef3c7', text: '#b45309' },
      'tool': { bg: '#e0e7ff', text: '#4338ca' },
      'calculator': { bg: '#e0e7ff', text: '#4338ca' },
      'messaging': { bg: '#fce7f3', text: '#9d174d' },
      'script': { bg: '#fce7f3', text: '#9d174d' },
    };

    return colorMap[type] || { bg: '#f3f4f6', text: '#374151' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Indigo Gradient */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <span>✨</span> Curated Hub
          </h1>
          <p>Hand-picked resources from across all hubs. The best content curated for your success.</p>

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
        {/* HIGHLIGHTS TAB */}
        {activeTab === 'featured' && (
          <div className={`${styles.tabPanel} ${styles.active}`}>
            {/* Hero Callouts Row */}
            {heroEntries.length > 0 && (
              <div className={styles.heroRow}>
                {heroEntries.map(entry => (
                  <ContentCardV2 key={entry._id} entry={entry} variant="hero" />
                ))}
              </div>
            )}

            {/* Featured Content Section */}
            {regularFeaturedEntries.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    <span>⭐</span> Featured Content
                  </h2>
                  <span className={styles.sectionCount}>
                    {regularFeaturedEntries.length} resources
                  </span>
                </div>
                <div className={styles.cardGrid}>
                  {regularFeaturedEntries.map(entry => (
                    <ContentCardV2 key={entry._id} entry={entry} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* COLLECTION TABS (with subsections) */}
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
                          <ContentCardV2 key={entry._id} entry={entry} />
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
                    <ContentCardV2 key={entry._id} entry={entry} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BROWSE ALL TAB */}
        {activeTab === 'browse-all' && (
          <div className={`${styles.tabPanel} ${styles.active}`}>
            {/* Search Bar */}
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search curated content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Type Filter Buttons */}
            <div className={styles.typeFilters}>
              <button
                className={`${styles.typeFilterBtn} ${typeFilter === 'all' ? styles.active : ''}`}
                onClick={() => setTypeFilter('all')}
              >
                All
              </button>
              {contentTypes.map(type => (
                <button
                  key={type}
                  className={`${styles.typeFilterBtn} ${typeFilter === type ? styles.active : ''}`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Browse Header */}
            <div className={styles.browseHeader}>
              <div className={styles.browseLeft}>
                <span className={styles.resultsCount}>{filteredEntries.length} resources</span>
              </div>
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="1" width="6" height="6" rx="1"/>
                    <rect x="9" y="1" width="6" height="6" rx="1"/>
                    <rect x="1" y="9" width="6" height="6" rx="1"/>
                    <rect x="9" y="9" width="6" height="6" rx="1"/>
                  </svg>
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="2" width="14" height="3" rx="1"/>
                    <rect x="1" y="7" width="14" height="3" rx="1"/>
                    <rect x="1" y="12" width="14" height="3" rx="1"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className={styles.browseGrid}>
                {filteredEntries.map(entry => (
                  <ContentCardV2 key={entry._id} entry={entry} />
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className={styles.browseList}>
                {filteredEntries.map(entry => {
                  const badgeColors = getBadgeColors(entry);
                  const badgeLabel = getBadgeLabel(entry);
                  const icon = '✨';

                  return (
                    <div
                      key={entry._id}
                      className={styles.listItem}
                      onClick={() => {
                        if (entry.externalUrl) {
                          window.open(entry.externalUrl, '_blank', 'noopener,noreferrer');
                        } else if (entry.slug?.current) {
                          window.location.href = `/curated-hub/${entry.slug.current}`;
                        }
                      }}
                    >
                      <div className={styles.listIcon}>{icon}</div>
                      <div className={styles.listContent}>
                        <h3 className={styles.listTitle}>{entry.title}</h3>
                        <p className={styles.listDescription}>
                          {entry.description || 'No description available'}
                        </p>
                      </div>
                      <span
                        className={styles.listBadge}
                        style={{ backgroundColor: badgeColors.bg, color: badgeColors.text }}
                      >
                        {badgeLabel}
                      </span>
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
