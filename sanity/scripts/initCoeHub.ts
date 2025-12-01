import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

interface CoeSection {
  _id: string;
  name: string;
  icon?: string;
  slug?: { current: string };
}

async function initCoeHub() {
  console.log('Checking for existing CoE Hub...');

  const existing = await client.fetch(`*[_type == "coeHub" && _id == "coeHub"][0]`);

  if (existing) {
    console.log('✅ CoE Hub already exists');
    return;
  }

  console.log('Creating CoE Hub...');

  // Get section references for quick links
  const sections: CoeSection[] = await client.fetch(
    `*[_type == "coeSection"] | order(order asc) { _id, name, icon, slug }`
  );

  const heroQuickLinks = sections.map((section) => ({
    _type: 'object',
    _key: section.slug?.current || section._id,
    icon: section.icon,
    label: section.name,
    linkType: 'section',
    sectionRef: { _type: 'reference', _ref: section._id },
  }));

  const hubSections = sections.map((section) => ({
    _type: 'hubSection',
    _key: section.slug?.current || section._id,
    sectionRef: { _type: 'reference', _ref: section._id },
    isEnabled: true,
    displayLayout: 'grid',
    maxItems: 6,
    showFilters: false,
    sortBy: 'priority',
    showSeeAll: true,
    backgroundColor: 'none',
  }));

  const hub = await client.createOrReplace({
    _type: 'coeHub',
    _id: 'coeHub',
    title: 'Center of Excellence (CoE)',
    heroSection: {
      headline: 'Center of Excellence',
      subheadline: 'Your hub for best practices, proof points, tools, and customer insights to drive success with Gladly.',
      showSearch: true,
      searchPlaceholder: 'Search best practices, proof points, tools...',
      heroStyle: 'default',
    },
    heroQuickLinks,
    featuredSection: {
      showFeatured: true,
      featuredTitle: '⭐ Featured',
      featuredLayout: 'grid',
      autoSelectFeatured: true,
    },
    recentWinsSection: {
      showRecentWins: true,
      recentWinsTitle: '🏆 Recent Customer Wins',
      recentWinsLayout: 'carousel',
      autoSelectRecentWins: true,
      autoSelectCount: 4,
    },
    hubSections,
    toolsSection: {
      showToolsSection: true,
      toolsSectionTitle: '🛠️ Tools & Calculators',
      toolsSectionPosition: 'after-featured',
      featuredToolLayout: 'horizontal',
      featuredToolBackground: 'purple',
      additionalToolsLayout: 'two-column',
    },
    seo: {
      metaTitle: 'Center of Excellence | Gladly GTM',
      metaDescription: 'Best practices, proof points, tools, and customer insights for Gladly GTM teams.',
    },
    accessControl: {
      requireAuth: true,
      allowedRoles: ['all'],
    },
    lastUpdated: {
      showLastUpdated: true,
      lastUpdatedLabel: 'Last updated',
    },
  });

  console.log('✅ Created CoE Hub:', hub._id);
  console.log(`   - ${heroQuickLinks.length} quick links configured`);
  console.log(`   - ${hubSections.length} sections configured`);
}

initCoeHub().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
