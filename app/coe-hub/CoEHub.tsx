'use client';

import { useState, useMemo } from 'react';
import { CatalogEntry, Collection } from '@/lib/types/catalog';
import styles from './CoEHub.module.css';

interface CoEHubProps {
  entries: CatalogEntry[];
  collections: Collection[];
}

export function CoEHub({ entries, collections }: CoEHubProps) {
  const [activeTab, setActiveTab] = useState('featured');
  const [meetingFilter, setMeetingFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate tabs
  const tabs = [
    { id: 'featured', label: 'Featured', icon: '⭐' },
    { id: 'meeting-examples', label: 'Meeting Examples', icon: '📋' },
    { id: 'proof-points', label: 'Proof Points', icon: '📊' },
    { id: 'best-practices', label: 'Best Practices', icon: '🎯' },
    { id: 'playbooks', label: 'Playbooks', icon: '📚' },
    { id: 'dashboards', label: 'Dashboards', icon: '📈' },
    { id: 'browse-all', label: 'Browse All', icon: '🔍' },
  ];

  // Filter entries by search
  const searchedEntries = useMemo(() => {
    if (!searchQuery) return entries;
    const query = searchQuery.toLowerCase();
    return entries.filter(e =>
      e.title?.toLowerCase().includes(query) ||
      e.description?.toLowerCase().includes(query)
    );
  }, [entries, searchQuery]);

  // Hero callouts
  const heroCallouts = useMemo(() => {
    return [
      {
        _id: 'hero-1',
        badge: 'RECENT WIN',
        title: 'Nordstrom BVA: 3x ROI Projection',
        description: 'Sidekick Answers progress & future Action value projection showing exceptional 3x ROI with Voice + Chat Implementation.',
        meta: 'Enterprise • Retail • Dec 2025'
      },
      {
        _id: 'hero-2',
        badge: 'AI ASSISTANT',
        title: 'CoE Assistant',
        description: 'Search proof points, customer wins, best practices, and benchmark data using AI. Ask anything about customer success patterns.',
        meta: '',
        isAssistant: true
      }
    ];
  }, []);

  // Customer wins (meeting examples) - show any featured or displayPriority entries
  const customerWins = useMemo(() => {
    // First try to get entries with specific CoE types
    let meetingEntries = searchedEntries.filter(e =>
      e.coeType?.some(t => ['meeting-asset', 'proof-point'].includes(t))
    );

    // If no CoE type entries, fall back to any featured entries
    if (meetingEntries.length === 0) {
      meetingEntries = searchedEntries.filter(e =>
        e.featured || e.displayPriority === 'featured' || e.displayPriority === 'hero'
      );
    }

    // If still nothing, just show the first few entries
    if (meetingEntries.length === 0) {
      meetingEntries = searchedEntries.slice(0, 4);
    }

    if (meetingFilter === 'All') return meetingEntries.slice(0, 4);

    return meetingEntries
      .filter(e => e.teams?.some(t => t.toLowerCase().includes(meetingFilter.toLowerCase())))
      .slice(0, 4);
  }, [searchedEntries, meetingFilter]);

  // Best practices - show any entries, fallback to all if no specific type
  const bestPracticeGuides = useMemo(() => {
    let guides = searchedEntries.filter(e =>
      e.coeType?.includes('best-practice') || e.coeType?.includes('playbook')
    );

    // If no specific best practice entries, show any entries
    if (guides.length === 0) {
      guides = searchedEntries.slice(0, 4);
    }

    return guides.slice(0, 4);
  }, [searchedEntries]);

  // Meeting examples for dedicated tab
  const allMeetingExamples = useMemo(() => {
    const meetings = searchedEntries.filter(e =>
      e.coeType?.some(t => ['meeting-asset'].includes(t))
    );

    if (meetingFilter === 'All') return meetings;
    return meetings.filter(e =>
      e.teams?.some(t => t.toLowerCase().includes(meetingFilter.toLowerCase()))
    );
  }, [searchedEntries, meetingFilter]);

  // Meeting filter options
  const meetingFilters = ['All', 'BVA', 'EBR', 'Strategy Session', 'QBR'];

  // Get badge info for meeting type
  const getMeetingBadge = (entry: CatalogEntry) => {
    const title = entry.title?.toLowerCase() || '';
    if (title.includes('bva')) return { label: 'BVA', bg: '#fef3c7', text: '#b45309' };
    if (title.includes('ebr')) return { label: 'EBR', bg: '#e0e7ff', text: '#4338ca' };
    if (title.includes('strategy')) return { label: 'STRATEGY SESSION', bg: '#f3e8ff', text: '#7c3aed' };
    if (title.includes('qbr')) return { label: 'QBR', bg: '#dbeafe', text: '#1e40af' };
    return { label: 'MEETING', bg: '#f3f4f6', text: '#374151' };
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <span className={styles.headerIcon}>🏆</span> Center of Excellence
          </h1>
          <p className={styles.headerSubtitle}>
            Learn from wins. Real customer examples, proof points, and best practices from top performers.
          </p>

          <nav className={styles.navTabs}>
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
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {/* FEATURED TAB */}
        {activeTab === 'featured' && (
          <div className={styles.featuredContent}>
            {/* Hero Callouts */}
            <div className={styles.heroRow}>
              {heroCallouts.map(hero => (
                <div
                  key={hero._id}
                  className={hero.isAssistant ? styles.heroCalloutAssistant : styles.heroCallout}
                >
                  <div className={styles.heroCalloutBadge}>{hero.badge}</div>
                  <h2 className={styles.heroCalloutTitle}>{hero.title}</h2>
                  <p className={styles.heroCalloutDescription}>{hero.description}</p>
                  {hero.meta && <div className={styles.heroCalloutMeta}>{hero.meta}</div>}
                </div>
              ))}
            </div>

            {/* Recent Customer Wins */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span>🎉</span> Recent Customer Wins
                </h2>
                <span className={styles.sectionCount}>{customerWins.length} examples</span>
              </div>
              <div className={styles.cardGrid}>
                {customerWins.map(entry => {
                  const badge = getMeetingBadge(entry);
                  return (
                    <a
                      key={entry._id}
                      href={`/coe-hub/${entry.slug.current}`}
                      className={styles.exampleCard}
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.cardIcon}>💰</div>
                        <span className={styles.cardBadge} style={{ backgroundColor: badge.bg, color: badge.text }}>
                          {badge.label}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{entry.title}</h3>
                      <p className={styles.cardDescription}>{entry.description}</p>
                      <div className={styles.cardFooter}>
                        <div className={styles.cardTags}>
                          {entry.teams?.slice(0, 2).map(team => (
                            <span key={team} className={styles.cardTag}>{team}</span>
                          ))}
                        </div>
                        <span className={styles.cardCta}>View Example →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>

            {/* Top Best Practices */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span>🎯</span> Top Best Practices
                </h2>
                <span className={styles.sectionCount}>{bestPracticeGuides.length} guides</span>
              </div>
              <div className={styles.cardGrid}>
                {bestPracticeGuides.map(entry => (
                  <a
                    key={entry._id}
                    href={`/coe-hub/${entry.slug.current}`}
                    className={styles.guideCard}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIcon}>📈</div>
                      <span className={styles.cardBadge} style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                        BEST PRACTICE
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{entry.title}</h3>
                    <p className={styles.cardDescription}>{entry.description}</p>
                    <div className={styles.cardCta}>View Guide →</div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* MEETING EXAMPLES TAB */}
        {activeTab === 'meeting-examples' && (
          <div className={styles.collectionContent}>
            {/* Filter Bar */}
            <div className={styles.filterBar}>
              <span className={styles.filterLabel}>Filter by type:</span>
              <div className={styles.filterButtons}>
                {meetingFilters.map(filter => (
                  <button
                    key={filter}
                    className={`${styles.filterBtn} ${meetingFilter === filter ? styles.filterBtnActive : ''}`}
                    onClick={() => setMeetingFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Meeting Examples Grid */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span>📋</span> Meeting Examples
              </h2>
              <span className={styles.sectionCount}>{allMeetingExamples.length} examples</span>
            </div>
            <div className={styles.cardGrid}>
              {allMeetingExamples.map(entry => {
                const badge = getMeetingBadge(entry);
                return (
                  <a
                    key={entry._id}
                    href={`/coe-hub/${entry.slug.current}`}
                    className={styles.exampleCard}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIcon}>💰</div>
                      <span className={styles.cardBadge} style={{ backgroundColor: badge.bg, color: badge.text }}>
                        {badge.label}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{entry.title}</h3>
                    <p className={styles.cardDescription}>{entry.description}</p>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardTags}>
                        {entry.teams?.slice(0, 2).map(team => (
                          <span key={team} className={styles.cardTag}>{team}</span>
                        ))}
                      </div>
                      <span className={styles.cardCta}>View Example →</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* PROOF POINTS TAB */}
        {activeTab === 'proof-points' && (
          <div className={styles.collectionContent}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span>📊</span> Proof Points
              </h2>
              <span className={styles.sectionCount}>Customer metrics and outcomes</span>
            </div>

            <div className={styles.proofPointsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableCell}>Customer</div>
                <div className={styles.tableCell}>Metric</div>
                <div className={styles.tableCell}>Category</div>
                <div className={styles.tableCell}>Segment</div>
              </div>
              {searchedEntries
                .filter(e => e.coeType?.includes('proof-point'))
                .slice(0, 10)
                .map(entry => (
                  <div key={entry._id} className={styles.tableRow}>
                    <div className={styles.tableCell}>
                      <strong>{entry.title?.split(':')[0] || entry.title}</strong>
                    </div>
                    <div className={styles.tableCell}>
                      {entry.description?.substring(0, 60)}...
                    </div>
                    <div className={styles.tableCell}>
                      <span className={styles.tableBadge}>ROI</span>
                    </div>
                    <div className={styles.tableCell}>
                      {entry.teams?.[0] || 'Enterprise'}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* BEST PRACTICES TAB */}
        {activeTab === 'best-practices' && (
          <div className={styles.collectionContent}>
            {/* Outcome Filter */}
            <div className={styles.filterBar}>
              <span className={styles.filterLabel}>Outcome:</span>
              <div className={styles.filterButtons}>
                {['All', 'Resolution Rate', 'Adoption', 'Expansion', 'Implementation'].map(filter => (
                  <button
                    key={filter}
                    className={styles.filterBtn}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span>🎯</span> Best Practice Guides
              </h2>
              <span className={styles.sectionCount}>6 guides</span>
            </div>
            <div className={styles.cardGrid}>
              {bestPracticeGuides.map(entry => (
                <a
                  key={entry._id}
                  href={`/coe-hub/${entry.slug.current}`}
                  className={styles.guideCard}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>📈</div>
                    <span className={styles.cardBadge} style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                      BEST PRACTICE
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{entry.title}</h3>
                  <p className={styles.cardDescription}>{entry.description}</p>
                  <div className={styles.cardCta}>View Guide →</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* BROWSE ALL TAB */}
        {activeTab === 'browse-all' && (
          <div className={styles.browseContent}>
            <div className={styles.browseHeader}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.browseControls}>
                <span className={styles.resultsCount}>{searchedEntries.length} resources</span>
                <select className={styles.sortSelect}>
                  <option>Sort by: Newest First</option>
                  <option>Sort by: Title (A-Z)</option>
                  <option>Sort by: Most Popular</option>
                </select>
              </div>
            </div>

            <div className={styles.browseGrid}>
              {searchedEntries.map(entry => {
                const coeType = entry.coeType?.[0] || 'best-practice';
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
                    <span
                      className={styles.listBadge}
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {coeType.replace('-', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* OTHER COLLECTION TABS (Playbooks, Dashboards) */}
        {['playbooks', 'dashboards'].includes(activeTab) && (
          <div className={styles.collectionContent}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {tabs.find(t => t.id === activeTab)?.icon}{' '}
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <span className={styles.sectionCount}>
                {searchedEntries.filter(e => e.coeType?.includes(activeTab.replace('-', ''))).length}
              </span>
            </div>
            <div className={styles.cardGrid}>
              {searchedEntries
                .filter(e => e.coeType?.includes(activeTab.replace('-', '')))
                .map(entry => (
                  <a
                    key={entry._id}
                    href={`/coe-hub/${entry.slug.current}`}
                    className={styles.exampleCard}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIcon}>📊</div>
                      <span className={styles.cardBadge} style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
                        {activeTab.toUpperCase().replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{entry.title}</h3>
                    <p className={styles.cardDescription}>{entry.description}</p>
                    <div className={styles.cardCta}>View →</div>
                  </a>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
