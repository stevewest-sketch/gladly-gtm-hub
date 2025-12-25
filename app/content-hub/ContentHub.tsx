'use client';

import { useState, useMemo } from 'react';
import { CatalogEntry, Collection } from '@/lib/types/catalog';
import styles from './ContentHub.module.css';

interface ContentHubProps {
  entries: CatalogEntry[];
  collections: Collection[];
}

export function ContentHub({ entries, collections }: ContentHubProps) {
  const [activeTab, setActiveTab] = useState('featured');
  const [contentFilter, setContentFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate tabs
  const tabs = useMemo(() => {
    const baseTabs = [
      { id: 'featured', label: 'Featured', icon: '⭐' },
      { id: 'sales-collateral', label: 'Sales Collateral', icon: '💼' },
      { id: 'battlecards', label: 'Battlecards', icon: '⚔️' },
      { id: 'one-pagers', label: 'One-Pagers', icon: '📄' },
      { id: 'templates', label: 'Templates', icon: '📋' },
    ];

    const baseTabIds = new Set(baseTabs.map(t => t.id));

    const collectionTabs = collections
      .filter(c => c.showInNavigation && c.isEnabled && !baseTabIds.has(c.slug.current))
      .sort((a, b) => a.order - b.order)
      .map(c => ({
        id: c.slug.current,
        label: c.name,
        icon: c.icon || '📁'
      }));

    return [...baseTabs, ...collectionTabs, { id: 'browse-all', label: 'Browse All', icon: null }];
  }, [collections]);

  // Search functionality
  const searchedEntries = useMemo(() => {
    if (!searchQuery.trim()) return entries;

    const query = searchQuery.toLowerCase();
    return entries.filter(e =>
      e.title?.toLowerCase().includes(query) ||
      e.description?.toLowerCase().includes(query)
    );
  }, [entries, searchQuery]);

  // Hero callouts - hardcoded to match mock
  const heroCallouts = useMemo(() => {
    return [
      {
        _id: 'hero-1',
        badge: 'NEW DECK',
        title: '2025 Enterprise Sales Pitch Deck',
        description: 'Updated pitch deck with latest AI capabilities, ROI data, and customer success stories. Ready for enterprise accounts.',
        meta: 'Updated Dec 2025 • 45 slides'
      },
      {
        _id: 'hero-2',
        badge: 'TEMPLATE',
        title: 'Business Value Calculator',
        description: 'Interactive ROI calculator with industry benchmarks. Calculate time-savings, cost reduction, and customer satisfaction improvements.',
        meta: 'Excel + Google Sheets',
        isTemplate: true
      }
    ];
  }, []);

  // Sales collateral with fallback logic
  const salesCollateralData = useMemo(() => {
    let collateral = searchedEntries.filter(e =>
      e.contentType?.name?.toLowerCase().includes('deck') ||
      e.format === 'deck' ||
      e.contentType?.name?.toLowerCase().includes('collateral')
    );

    if (collateral.length === 0) {
      collateral = searchedEntries.filter(e =>
        e.featured || e.displayPriority === 'featured' || e.displayPriority === 'hero'
      );
    }

    if (collateral.length === 0) {
      collateral = searchedEntries.slice(0, 4);
    }

    if (contentFilter === 'All') return collateral.slice(0, 4);

    return collateral
      .filter(e => {
        const title = e.title?.toLowerCase() || '';
        const filterLower = contentFilter.toLowerCase();
        return title.includes(filterLower) || e.format?.toLowerCase().includes(filterLower);
      })
      .slice(0, 4);
  }, [searchedEntries, contentFilter]);

  // Battlecards with fallback
  const battlecardsData = useMemo(() => {
    let cards = searchedEntries.filter(e =>
      e.contentType?.name?.toLowerCase().includes('battle') ||
      e.format === 'battlecard'
    );

    if (cards.length === 0) {
      cards = searchedEntries.slice(0, 4);
    }

    return cards.slice(0, 4);
  }, [searchedEntries]);

  // Get content badge based on type/format
  const getContentBadge = (entry: CatalogEntry) => {
    const format = entry.format?.toLowerCase() || '';
    const type = entry.contentType?.name?.toLowerCase() || '';

    if (format.includes('deck') || type.includes('deck')) {
      return { label: 'DECK', bg: '#dbeafe', text: '#1e40af' };
    }
    if (format.includes('battlecard') || type.includes('battle')) {
      return { label: 'BATTLECARD', bg: '#ffe4e6', text: '#be123c' };
    }
    if (format.includes('one-pager') || type.includes('one-pager')) {
      return { label: 'ONE-PAGER', bg: '#d1fae5', text: '#065f46' };
    }
    if (format.includes('template') || type.includes('template')) {
      return { label: 'TEMPLATE', bg: '#f3e8ff', text: '#7c3aed' };
    }
    return { label: 'DOCUMENT', bg: '#e0e7ff', text: '#4338ca' };
  };

  // Filter entries based on active tab
  const filteredEntries = useMemo(() => {
    if (activeTab === 'browse-all') {
      return searchedEntries;
    }

    if (activeTab === 'featured') {
      return searchedEntries.filter(e =>
        e.displayPriority === 'hero' || e.displayPriority === 'featured' || e.featured
      );
    }

    const activeCollection = collections.find(c => c.slug.current === activeTab);
    if (activeCollection) {
      return searchedEntries.filter(e =>
        e.contentHubCollections?.some(c => c._id === activeCollection._id)
      );
    }

    return searchedEntries;
  }, [activeTab, searchedEntries, collections]);

  return (
    <div className={styles.container}>
      {/* Header - Purple Gradient */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <span className={styles.headerIcon}>📚</span>
            Content Hub
          </h1>
          <p className={styles.headerSubtitle}>
            Sales collateral, marketing assets, and resources to support your customer conversations
          </p>

          {/* Navigation Tabs */}
          <div className={styles.navTabs}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.navTab} ${activeTab === tab.id ? styles.navTabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Featured Tab */}
        {activeTab === 'featured' && (
          <div className={styles.featuredContent}>
            {/* Hero Callouts */}
            <div className={styles.heroRow}>
              {heroCallouts.map(callout => (
                <div
                  key={callout._id}
                  className={callout.isTemplate ? styles.heroCalloutTemplate : styles.heroCallout}
                >
                  <span className={styles.heroCalloutBadge}>{callout.badge}</span>
                  <h2 className={styles.heroCalloutTitle}>{callout.title}</h2>
                  <p className={styles.heroCalloutDescription}>{callout.description}</p>
                  {callout.meta && <div className={styles.heroCalloutMeta}>{callout.meta}</div>}
                </div>
              ))}
            </div>

            {/* Sales Collateral Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span>💼</span> Sales Collateral
                </h2>
                <span className={styles.sectionCount}>{salesCollateralData.length} resources</span>
              </div>

              {/* Filter Bar */}
              <div className={styles.filterBar}>
                <span className={styles.filterLabel}>Filter by:</span>
                <div className={styles.filterButtons}>
                  {['All', 'Deck', 'One-Pager', 'Case Study', 'Template'].map(filter => (
                    <button
                      key={filter}
                      className={`${styles.filterBtn} ${contentFilter === filter ? styles.filterBtnActive : ''}`}
                      onClick={() => setContentFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Cards */}
              <div className={styles.cardGrid}>
                {salesCollateralData.map(entry => {
                  const badge = getContentBadge(entry);
                  return (
                    <a
                      key={entry._id}
                      href={entry.externalUrl || `/content-hub/${entry.slug.current}`}
                      target={entry.externalUrl ? '_blank' : undefined}
                      rel={entry.externalUrl ? 'noopener noreferrer' : undefined}
                      className={styles.contentCard}
                    >
                      <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}>📊</span>
                        <span
                          className={styles.cardBadge}
                          style={{ backgroundColor: badge.bg, color: badge.text }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{entry.title}</h3>
                      <p className={styles.cardDescription}>
                        {entry.description || 'No description available'}
                      </p>
                      <div className={styles.cardFooter}>
                        <div className={styles.cardTags}>
                          {entry.format && <span className={styles.cardTag}>{entry.format}</span>}
                        </div>
                        <span className={styles.cardCta}>View →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Battlecards Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span>⚔️</span> Competitive Battlecards
                </h2>
                <span className={styles.sectionCount}>{battlecardsData.length} cards</span>
              </div>

              <div className={styles.cardGrid}>
                {battlecardsData.map(entry => (
                  <a
                    key={entry._id}
                    href={entry.externalUrl || `/content-hub/${entry.slug.current}`}
                    target={entry.externalUrl ? '_blank' : undefined}
                    rel={entry.externalUrl ? 'noopener noreferrer' : undefined}
                    className={styles.battleCard}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIcon}>⚔️</span>
                      <span
                        className={styles.cardBadge}
                        style={{
                          backgroundColor: '#ffe4e6',
                          color: '#be123c'
                        }}
                      >
                        BATTLECARD
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{entry.title}</h3>
                    <p className={styles.cardDescription}>
                      {entry.description || 'No description available'}
                    </p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardCta}>View Card →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Collection Tabs */}
        {activeTab !== 'featured' && activeTab !== 'browse-all' && (
          <div className={styles.collectionContent}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  {tabs.find(t => t.id === activeTab)?.icon}{' '}
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <span className={styles.sectionCount}>{filteredEntries.length}</span>
              </div>

              <div className={styles.cardGrid}>
                {filteredEntries.map(entry => {
                  const badge = getContentBadge(entry);
                  return (
                    <a
                      key={entry._id}
                      href={entry.externalUrl || `/content-hub/${entry.slug.current}`}
                      target={entry.externalUrl ? '_blank' : undefined}
                      rel={entry.externalUrl ? 'noopener noreferrer' : undefined}
                      className={styles.contentCard}
                    >
                      <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}>📚</span>
                        <span
                          className={styles.cardBadge}
                          style={{ backgroundColor: badge.bg, color: badge.text }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{entry.title}</h3>
                      <p className={styles.cardDescription}>
                        {entry.description || 'No description available'}
                      </p>
                      <div className={styles.cardFooter}>
                        <span className={styles.cardCta}>View →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Browse All Tab */}
        {activeTab === 'browse-all' && (
          <div className={styles.browseContent}>
            <div className={styles.browseHeader}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search content resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={styles.browseControls}>
                <span className={styles.resultsCount}>{filteredEntries.length} resources</span>
                <select className={styles.sortSelect}>
                  <option>Sort by: Newest First</option>
                  <option>Sort by: Title (A-Z)</option>
                  <option>Sort by: Most Popular</option>
                </select>
              </div>
            </div>

            <div className={styles.browseGrid}>
              {filteredEntries.map(entry => {
                const badge = getContentBadge(entry);
                return (
                  <div
                    key={entry._id}
                    className={styles.listItem}
                    onClick={() => {
                      if (entry.externalUrl) {
                        window.open(entry.externalUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        window.location.href = `/content-hub/${entry.slug.current}`;
                      }
                    }}
                  >
                    <div className={styles.listIcon}>📚</div>
                    <div className={styles.listContent}>
                      <h3 className={styles.listTitle}>{entry.title}</h3>
                      <p className={styles.listDescription}>
                        {entry.description || 'No description available'}
                      </p>
                    </div>
                    <span
                      className={styles.listBadge}
                      style={{ backgroundColor: badge.bg, color: badge.text }}
                    >
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
