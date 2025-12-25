'use client';

import { useState, useMemo } from 'react';
import { CatalogEntry, Collection } from '@/lib/types/catalog';
import styles from './EnablementHub.module.css';

interface EnablementHubProps {
  entries: CatalogEntry[];
  collections: Collection[];
}

export function EnablementHub({ entries, collections }: EnablementHubProps) {
  const [activeTab, setActiveTab] = useState('featured');
  const [trainingFilter, setTrainingFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate tabs
  const tabs = useMemo(() => {
    const baseTabs = [
      { id: 'featured', label: 'Featured', icon: '⭐' },
      { id: 'training-sessions', label: 'Training Sessions', icon: '🎓' },
      { id: 'product-guides', label: 'Product Guides', icon: '📘' },
      { id: 'certifications', label: 'Certifications', icon: '🏆' },
      { id: 'playbooks', label: 'Playbooks', icon: '📚' },
    ];

    const collectionTabs = collections
      .filter(c => c.showInNavigation && c.isEnabled)
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

  // Hero callouts - from HTML mock
  const heroCallouts = useMemo(() => {
    return [
      {
        _id: 'hero-1',
        badge: '🎯 Priority Training',
        title: 'Narrative Deep Dive: Apex 2',
        description: 'Master the ACE pattern, handle deflection questions, and differentiate from Sierra, Decagon, and Fin using the new narrative framework.',
        meta: 'Dec 2025 · 30 min · Required'
      },
      {
        _id: 'hero-2',
        badge: '💼 Sales Process',
        title: 'MM/ENT Closing Excellence S4→Close',
        description: 'Final phases of Enterprise and Mid-Market sales process from Stage 4 (Finalist) through Closed Won.',
        meta: 'Dec 2025 · 45 min',
        isPurple: true
      }
    ];
  }, []);

  // Training sessions with fallback logic
  const trainingSessionsData = useMemo(() => {
    let sessions = searchedEntries.filter(e =>
      e.enablementCategory?.includes('training') ||
      e.format === 'video' ||
      e.sessionDate
    );

    if (sessions.length === 0) {
      sessions = searchedEntries.filter(e =>
        e.featured || e.displayPriority === 'featured' || e.displayPriority === 'hero'
      );
    }

    if (sessions.length === 0) {
      sessions = searchedEntries.slice(0, 4);
    }

    if (trainingFilter === 'All') return sessions.slice(0, 4);

    return sessions
      .filter(e => {
        const title = e.title?.toLowerCase() || '';
        const filterLower = trainingFilter.toLowerCase();
        return title.includes(filterLower) || e.enablementCategory?.some(c => c.toLowerCase().includes(filterLower));
      })
      .slice(0, 4);
  }, [searchedEntries, trainingFilter]);

  // Product guides with fallback
  const productGuides = useMemo(() => {
    let guides = searchedEntries.filter(e =>
      e.enablementCategory?.includes('product') || e.format === 'guide'
    );

    if (guides.length === 0) {
      guides = searchedEntries.slice(0, 4);
    }

    return guides.slice(0, 4);
  }, [searchedEntries]);

  // Get training badge based on title/category
  const getTrainingBadge = (entry: CatalogEntry) => {
    const title = entry.title?.toLowerCase() || '';
    const categories = entry.enablementCategory || [];

    if (title.includes('product') || categories.includes('product')) {
      return { label: 'PRODUCT', bg: '#dbeafe', text: '#1e40af' };
    }
    if (title.includes('competitive') || categories.includes('competitive')) {
      return { label: 'COMPETITIVE', bg: '#ffe4e6', text: '#be123c' };
    }
    if (title.includes('technical') || categories.includes('technical')) {
      return { label: 'TECHNICAL', bg: '#e0e7ff', text: '#4338ca' };
    }
    if (title.includes('value') || categories.includes('value-realization')) {
      return { label: 'VALUE', bg: '#fef3c7', text: '#b45309' };
    }
    return { label: 'TRAINING', bg: '#d1fae5', text: '#065f46' };
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
        e.enablementHubCollections?.some(c => c._id === activeCollection._id)
      );
    }

    return searchedEntries;
  }, [activeTab, searchedEntries, collections]);

  return (
    <div className={styles.container}>
      {/* Header - Green Gradient */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <span className={styles.headerIcon}>🎓</span>
            Enablement Hub
          </h1>
          <p className={styles.headerSubtitle}>
            Training sessions, playbooks, and enablement resources for all GTM teams
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
                  className={callout.isPurple ? styles.heroCalloutPurple : styles.heroCallout}
                >
                  <span className={styles.heroCalloutBadge}>{callout.badge}</span>
                  <h2 className={styles.heroCalloutTitle}>{callout.title}</h2>
                  <p className={styles.heroCalloutDescription}>{callout.description}</p>
                  {callout.meta && <div className={styles.heroCalloutMeta}>{callout.meta}</div>}
                </div>
              ))}
            </div>

            {/* Training Sessions Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span>🆕</span> New This Week
                </h2>
                <span className={styles.sectionCount}>{trainingSessionsData.length} sessions</span>
              </div>

              {/* Filter Bar */}
              <div className={styles.filterBar}>
                <span className={styles.filterLabel}>Filter by:</span>
                <div className={styles.filterButtons}>
                  {['All', 'Product', 'Competitive', 'Technical', 'Value'].map(filter => (
                    <button
                      key={filter}
                      className={`${styles.filterBtn} ${trainingFilter === filter ? styles.filterBtnActive : ''}`}
                      onClick={() => setTrainingFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Training Cards */}
              <div className={styles.cardGrid}>
                {trainingSessionsData.map(entry => {
                  const badge = getTrainingBadge(entry);
                  const sessionDate = entry.sessionDate
                    ? new Date(entry.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
                    : 'DEC 2025';
                  const team = entry.teams?.[0] || 'All Teams';

                  return (
                    <a
                      key={entry._id}
                      href={`/enablement-hub/${entry.slug.current}`}
                      className={styles.exampleCard}
                    >
                      <div className={styles.trainingHeader}>
                        <div className={styles.trainingHeaderTop}>
                          <span className={styles.trainingDate}>{sessionDate}</span>
                          <span
                            className={styles.cardBadge}
                            style={{ backgroundColor: badge.bg, color: badge.text }}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <h3 className={styles.trainingTitle}>{entry.title}</h3>
                        <span className={styles.trainingTeam}>{team}</span>
                      </div>
                      <div className={styles.trainingBody}>
                        <p className={styles.cardDescription}>
                          {entry.description || 'No description available'}
                        </p>
                        <div className={styles.trainingFormats}>
                          {entry.videoUrl && <span className={styles.formatTag}>🎬 Video</span>}
                          {entry.slidesUrl && <span className={styles.formatTag}>📊 Slides</span>}
                          {entry.duration && <span className={styles.formatTag}>{entry.duration}</span>}
                        </div>
                        <span className={styles.trainingCta}>View Materials →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Essential Training Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span>⭐</span> Essential Training
                </h2>
                <span className={styles.sectionCount}>{productGuides.length} resources</span>
              </div>

              <div className={styles.cardGrid}>
                {productGuides.map(entry => {
                  const badge = getTrainingBadge(entry);
                  const sessionDate = entry.sessionDate
                    ? new Date(entry.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
                    : 'DEC 2025';
                  const team = entry.teams?.[0] || 'All Teams';

                  return (
                    <a
                      key={entry._id}
                      href={`/enablement-hub/${entry.slug.current}`}
                      className={styles.exampleCard}
                    >
                      <div className={styles.trainingHeader}>
                        <div className={styles.trainingHeaderTop}>
                          <span className={styles.trainingDate}>{sessionDate}</span>
                          <span
                            className={styles.cardBadge}
                            style={{ backgroundColor: badge.bg, color: badge.text }}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <h3 className={styles.trainingTitle}>{entry.title}</h3>
                        <span className={styles.trainingTeam}>{team}</span>
                      </div>
                      <div className={styles.trainingBody}>
                        <p className={styles.cardDescription}>
                          {entry.description || 'No description available'}
                        </p>
                        <div className={styles.trainingFormats}>
                          {entry.videoUrl && <span className={styles.formatTag}>🎬 Video</span>}
                          {entry.slidesUrl && <span className={styles.formatTag}>📊 Slides</span>}
                          {entry.duration && <span className={styles.formatTag}>{entry.duration}</span>}
                        </div>
                        <span className={styles.trainingCta}>View Materials →</span>
                      </div>
                    </a>
                  );
                })}
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
                  const badge = getTrainingBadge(entry);
                  return (
                    <a
                      key={entry._id}
                      href={`/enablement-hub/${entry.slug.current}`}
                      className={styles.exampleCard}
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
                  placeholder="Search enablement resources..."
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
                const badge = getTrainingBadge(entry);
                return (
                  <div
                    key={entry._id}
                    className={styles.listItem}
                    onClick={() => window.location.href = `/enablement-hub/${entry.slug.current}`}
                  >
                    <div className={styles.listIcon}>🎓</div>
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
