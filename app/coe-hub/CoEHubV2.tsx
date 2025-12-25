'use client';

import { useState, useMemo, useEffect } from 'react';
import { CatalogEntry, Collection, CollectionSubsection } from '@/lib/types/catalog';
import { CoECardV2 } from '@/components/coe/CoECardV2';
import styles from './CoEHubV2.module.css';

interface CoEHubV2Props {
  entries: CatalogEntry[];
  collections: Collection[];
}

export function CoEHubV2({ entries, collections }: CoEHubV2Props) {
  const [activeTab, setActiveTab] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Enable smooth scrolling on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

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
      const assignment = e.coeHubCollections?.find(a =>
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
      return entries;
    }

    const activeCollection = collections.find(c => c.slug.current === activeTab);
    if (!activeCollection) return [];

    return entries.filter(e =>
      e.coeHubCollections?.some(assignment =>
        assignment?.collection?._id === activeCollection._id
      )
    );
  }, [activeTab, entries, collections]);

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
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1>
              <span>🏆</span> Center of Excellence
            </h1>
            <p>Customer success stories, best practices, and proven strategies from the field</p>
          </div>

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

      <main className={styles.mainContent}>
        {activeTab === 'featured' && (
          <div className={`${styles.tabPanel} ${styles.active}`}>
            {heroEntries.length > 0 && (
              <div className={styles.heroRow}>
                {heroEntries.map(entry => (
                  <CoECardV2 key={entry._id} entry={entry} variant="hero" />
                ))}
              </div>
            )}

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
                    <CoECardV2 key={entry._id} entry={entry} />
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
                          <CoECardV2 key={entry._id} entry={entry} />
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
                    <CoECardV2 key={entry._id} entry={entry} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'browse-all' && (
          <div className={`${styles.tabPanel} ${styles.active}`}>
            <div className={styles.browseHeader}>
              <div className={styles.browseLeft}>
                <span className={styles.resultsCount}>{filteredEntries.length} resources</span>
                <select className={styles.sortSelect}>
                  <option>Sort by: Newest First</option>
                  <option>Sort by: Title (A-Z)</option>
                  <option>Sort by: Most Popular</option>
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
                  <CoECardV2 key={entry._id} entry={entry} />
                ))}
              </div>
            ) : (
              <div className={styles.browseList}>
                {filteredEntries.map(entry => {
                  const coeType = entry.coeType?.[0] || '';
                  const badgeColors: Record<string, { bg: string; text: string }> = {
                    'proof-point': { bg: '#dbeafe', text: '#1e40af' },
                    'best-practice': { bg: '#d1fae5', text: '#065f46' },
                    'meeting-asset': { bg: '#f3e8ff', text: '#7c3aed' },
                    'tool': { bg: '#fef3c7', text: '#b45309' },
                    'playbook': { bg: '#ffe4e6', text: '#be123c' },
                  };
                  const colors = badgeColors[coeType] || { bg: '#f3f4f6', text: '#374151' };

                  return (
                    <div
                      key={entry._id}
                      className={styles.listItem}
                      onClick={() => window.location.href = `/coe-hub/${entry.slug.current}`}
                    >
                      <div className={styles.listIcon}>🏆</div>
                      <div className={styles.listContent}>
                        <h3 className={styles.listTitle}>{entry.title}</h3>
                        <p className={styles.listDescription}>{entry.description || 'No description available'}</p>
                      </div>
                      {coeType && (
                        <span
                          className={styles.listBadge}
                          style={{ backgroundColor: colors.bg, color: colors.text }}
                        >
                          {coeType.replace('-', ' ')}
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
