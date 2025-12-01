import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'coeHub',
  title: 'CoE Hub',
  type: 'document',
  icon: () => '🎯',
  groups: [
    { name: 'hero', title: '🏠 Hero', default: true },
    { name: 'featured', title: '⭐ Featured' },
    { name: 'sections', title: '📂 Sections' },
    { name: 'tools', title: '🛠️ Tools' },
    { name: 'content', title: '📝 Custom Content' },
    { name: 'settings', title: '⚙️ Settings' },
  ],
  fields: [
    // ========================================
    // HERO GROUP
    // ========================================

    defineField({
      name: 'title',
      title: 'Hub Title',
      type: 'string',
      description: 'Internal title for this hub configuration',
      initialValue: 'Center of Excellence (CoE)',
      group: 'hero',
    }),

    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main headline (e.g., "Center of Excellence")',
          initialValue: 'Center of Excellence',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          description: 'Supporting text below headline',
          initialValue: 'Your hub for best practices, proof points, tools, and customer insights to drive success with Gladly.',
        },
        {
          name: 'showSearch',
          title: 'Show Search Bar',
          type: 'boolean',
          initialValue: true,
          description: 'Display search functionality in the hero',
        },
        {
          name: 'searchPlaceholder',
          title: 'Search Placeholder',
          type: 'string',
          description: 'Placeholder text for search input',
          initialValue: 'Search best practices, proof points, tools...',
          hidden: ({ parent }) => !parent?.showSearch,
        },
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Optional background or accent image',
        },
        {
          name: 'heroStyle',
          title: 'Hero Style',
          type: 'string',
          options: {
            list: [
              { title: 'Default - Clean with search', value: 'default' },
              { title: 'Gradient - Purple gradient background', value: 'gradient' },
              { title: 'Minimal - Just text', value: 'minimal' },
              { title: 'Image - With background image', value: 'image' },
            ],
          },
          initialValue: 'default',
        },
        {
          name: 'quickStats',
          title: 'Quick Stats',
          type: 'array',
          description: 'Optional stats to display in hero (e.g., "150+ Best Practices")',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ],
            preview: {
              select: { value: 'value', label: 'label' },
              prepare({ value, label }) {
                return { title: `${value} ${label}` };
              },
            },
          }],
        },
      ],
    }),

    defineField({
      name: 'heroQuickLinks',
      title: 'Hero Quick Links',
      type: 'array',
      description: 'Quick navigation links displayed below the search (e.g., section shortcuts)',
      group: 'hero',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon', type: 'string', description: 'Emoji icon' },
          { name: 'label', title: 'Label', type: 'string' },
          {
            name: 'linkType',
            title: 'Link Type',
            type: 'string',
            options: {
              list: [
                { title: 'Section', value: 'section' },
                { title: 'URL', value: 'url' },
              ],
            },
            initialValue: 'section',
          },
          {
            name: 'sectionRef',
            title: 'Section',
            type: 'reference',
            to: [{ type: 'coeSection' }],
            hidden: ({ parent }) => parent?.linkType !== 'section',
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
            hidden: ({ parent }) => parent?.linkType !== 'url',
          },
        ],
        preview: {
          select: { icon: 'icon', label: 'label', sectionName: 'sectionRef.name' },
          prepare({ icon, label, sectionName }) {
            return { title: `${icon || '🔗'} ${label || sectionName}` };
          },
        },
      }],
    }),

    // ========================================
    // FEATURED GROUP
    // ========================================

    defineField({
      name: 'featuredSection',
      title: 'Featured Content Section',
      type: 'object',
      group: 'featured',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'showFeatured',
          title: 'Show Featured Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'featuredTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: '⭐ Featured',
        },
        {
          name: 'featuredSubtitle',
          title: 'Section Subtitle',
          type: 'string',
          description: 'Optional subtitle below the title',
        },
        {
          name: 'featuredEntries',
          title: 'Featured Entries',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'coeEntry' }] }],
          validation: (Rule) => Rule.max(6),
          description: 'Select up to 6 entries to feature (or leave empty to auto-select based on featured flag)',
        },
        {
          name: 'featuredLayout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Grid - Card grid', value: 'grid' },
              { title: 'Carousel - Scrollable', value: 'carousel' },
              { title: 'Featured - One large + smaller', value: 'featured' },
              { title: 'List - Vertical list', value: 'list' },
            ],
          },
          initialValue: 'grid',
        },
        {
          name: 'autoSelectFeatured',
          title: 'Auto-Select Featured',
          type: 'boolean',
          description: 'Automatically include entries marked as "featured" in addition to manual selections',
          initialValue: true,
        },
      ],
    }),

    defineField({
      name: 'recentWinsSection',
      title: 'Recent Customer Wins Section',
      type: 'object',
      group: 'featured',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'showRecentWins',
          title: 'Show Recent Wins',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'recentWinsTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: '🏆 Recent Customer Wins',
        },
        {
          name: 'recentWinsSubtitle',
          title: 'Section Subtitle',
          type: 'string',
        },
        {
          name: 'recentWinsEntries',
          title: 'Customer Wins',
          type: 'array',
          of: [{
            type: 'reference',
            to: [{ type: 'coeEntry' }],
            options: {
              filter: 'entryType == "proof-point" && (proofType == "anecdote" || proofType == "quote" || proofType == "case-study")',
            },
          }],
          description: 'Select proof points with quotes, anecdotes, or case studies',
          validation: (Rule) => Rule.max(6),
        },
        {
          name: 'recentWinsLayout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Carousel - Scrollable cards', value: 'carousel' },
              { title: 'Grid - Card grid', value: 'grid' },
              { title: 'Testimonial - Quote style', value: 'testimonial' },
            ],
          },
          initialValue: 'carousel',
        },
        {
          name: 'autoSelectRecentWins',
          title: 'Auto-Select Recent',
          type: 'boolean',
          description: 'Automatically pull in recent proof points in addition to manual selections',
          initialValue: true,
        },
        {
          name: 'autoSelectCount',
          title: 'Auto-Select Count',
          type: 'number',
          description: 'Number of recent wins to auto-select',
          initialValue: 4,
          hidden: ({ parent }) => !parent?.autoSelectRecentWins,
        },
      ],
    }),

    // ========================================
    // SECTIONS GROUP
    // ========================================

    defineField({
      name: 'hubSections',
      title: 'Hub Sections',
      type: 'array',
      group: 'sections',
      description: 'Configure each section of the hub landing page. Drag to reorder.',
      of: [{
        type: 'object',
        name: 'hubSection',
        title: 'Section',
        fields: [
          {
            name: 'sectionRef',
            title: 'Section',
            type: 'reference',
            to: [{ type: 'coeSection' }],
            description: 'Which CoE section is this?',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'isEnabled',
            title: 'Enabled',
            type: 'boolean',
            description: 'Show this section on the hub',
            initialValue: true,
          },
          {
            name: 'displayTitle',
            title: 'Display Title (override)',
            type: 'string',
            description: 'Leave blank to use section name',
          },
          {
            name: 'displayDescription',
            title: 'Section Intro',
            type: 'text',
            rows: 2,
            description: 'Brief description shown below the section title',
          },
          {
            name: 'displayLayout',
            title: 'Card Layout',
            type: 'string',
            options: {
              list: [
                { title: 'Grid - Card grid', value: 'grid' },
                { title: 'List - Vertical list', value: 'list' },
                { title: 'Compact - Dense list', value: 'compact' },
                { title: 'Featured - One large + smaller', value: 'featured' },
                { title: 'Carousel - Scrollable', value: 'carousel' },
              ],
            },
            initialValue: 'grid',
          },
          {
            name: 'maxItems',
            title: 'Max Items to Show',
            type: 'number',
            description: 'Items to show before "See All" button',
            initialValue: 6,
          },
          {
            name: 'showFilters',
            title: 'Show Filters',
            type: 'boolean',
            description: 'Display filter controls for this section',
            initialValue: false,
          },
          {
            name: 'filterOptions',
            title: 'Filter Options',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
              list: [
                { title: 'Channel', value: 'channel' },
                { title: 'Capability', value: 'capability' },
                { title: 'Audience', value: 'audience' },
                { title: 'Industry', value: 'industry' },
                { title: 'Content Category', value: 'content-category' },
                { title: 'Product', value: 'product' },
              ],
            },
            hidden: ({ parent }) => !parent?.showFilters,
          },
          {
            name: 'sortBy',
            title: 'Sort By',
            type: 'string',
            options: {
              list: [
                { title: 'Priority (manual)', value: 'priority' },
                { title: 'Recently Updated', value: 'updated' },
                { title: 'Recently Created', value: 'created' },
                { title: 'Title A-Z', value: 'title' },
              ],
            },
            initialValue: 'priority',
          },
          {
            name: 'pinnedEntries',
            title: 'Pinned Entries',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'coeEntry' }] }],
            description: 'Pin specific items at top of this section',
          },
          {
            name: 'showSeeAll',
            title: 'Show "See All" Link',
            type: 'boolean',
            description: 'Show link to full section page',
            initialValue: true,
          },
          {
            name: 'seeAllLabel',
            title: '"See All" Label',
            type: 'string',
            description: 'Custom label for the link (default: "See all →")',
            hidden: ({ parent }) => !parent?.showSeeAll,
          },
          {
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            options: {
              list: [
                { title: 'None', value: 'none' },
                { title: 'Subtle Gray', value: 'gray' },
                { title: 'Light Purple', value: 'purple' },
                { title: 'Light Blue', value: 'blue' },
              ],
            },
            initialValue: 'none',
          },
        ],
        preview: {
          select: {
            sectionName: 'sectionRef.name',
            sectionIcon: 'sectionRef.icon',
            displayTitle: 'displayTitle',
            layout: 'displayLayout',
            isEnabled: 'isEnabled',
          },
          prepare({ sectionName, sectionIcon, displayTitle, layout, isEnabled }) {
            const enabledIcon = isEnabled === false ? '🚫 ' : '';
            return {
              title: `${enabledIcon}${sectionIcon || '📂'} ${displayTitle || sectionName || 'Section'}`,
              subtitle: `Layout: ${layout || 'grid'}`,
            };
          },
        },
      }],
    }),

    // ========================================
    // TOOLS GROUP
    // ========================================

    defineField({
      name: 'toolsSection',
      title: 'Tools & Calculators Section',
      type: 'object',
      group: 'tools',
      options: { collapsible: true, collapsed: false },
      description: 'Special section for featuring tools prominently',
      fields: [
        {
          name: 'showToolsSection',
          title: 'Show Tools Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'toolsSectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: '🛠️ Tools & Calculators',
        },
        {
          name: 'toolsSectionSubtitle',
          title: 'Section Subtitle',
          type: 'string',
        },
        {
          name: 'toolsSectionPosition',
          title: 'Position',
          type: 'string',
          options: {
            list: [
              { title: 'After Featured', value: 'after-featured' },
              { title: 'After Recent Wins', value: 'after-wins' },
              { title: 'Before Sections', value: 'before-sections' },
              { title: 'After Sections', value: 'after-sections' },
            ],
          },
          initialValue: 'after-featured',
        },
        {
          name: 'featuredTool',
          title: 'Featured Tool',
          type: 'reference',
          to: [{ type: 'coeEntry' }],
          options: {
            filter: 'entryType == "tool"',
          },
          description: 'Select a tool to feature prominently (e.g., CoE Assistant)',
        },
        {
          name: 'featuredToolLayout',
          title: 'Featured Tool Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Horizontal - Split layout with example', value: 'horizontal' },
              { title: 'Vertical - Stacked', value: 'vertical' },
              { title: 'Banner - Full width', value: 'banner' },
            ],
          },
          initialValue: 'horizontal',
        },
        {
          name: 'featuredToolBackground',
          title: 'Featured Tool Background',
          type: 'string',
          options: {
            list: [
              { title: 'Purple Gradient', value: 'purple' },
              { title: 'Blue Gradient', value: 'blue' },
              { title: 'Subtle Gray', value: 'subtle' },
              { title: 'None', value: 'none' },
            ],
          },
          initialValue: 'purple',
        },
        {
          name: 'featuredToolExampleQuery',
          title: 'Example Query (override)',
          type: 'object',
          description: 'Override the example shown with the featured tool',
          fields: [
            { name: 'userQuery', title: 'Example Question', type: 'string' },
            { name: 'assistantResponse', title: 'Example Response', type: 'text', rows: 3 },
          ],
        },
        {
          name: 'additionalTools',
          title: 'Additional Tools',
          type: 'array',
          of: [{
            type: 'reference',
            to: [{ type: 'coeEntry' }],
            options: {
              filter: 'entryType == "tool"',
            },
          }],
          description: 'Other tools to display as cards below the featured tool',
        },
        {
          name: 'additionalToolsLayout',
          title: 'Additional Tools Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Two Column', value: 'two-column' },
              { title: 'Three Column', value: 'three-column' },
              { title: 'List', value: 'list' },
            ],
          },
          initialValue: 'two-column',
        },
      ],
    }),

    // ========================================
    // CONTENT GROUP
    // ========================================

    defineField({
      name: 'customContentBefore',
      title: 'Custom Content (Before Sections)',
      type: 'array',
      of: [{ type: 'pageSection' }],
      description: 'Add custom page sections before the main section grid',
      group: 'content',
    }),

    defineField({
      name: 'customContentAfter',
      title: 'Custom Content (After Sections)',
      type: 'array',
      of: [{ type: 'pageSection' }],
      description: 'Add custom page sections after the main section grid',
      group: 'content',
    }),

    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      description: 'Call to action at the bottom of the hub',
      fields: [
        {
          name: 'showCta',
          title: 'Show CTA Section',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'ctaHeadline',
          title: 'Headline',
          type: 'string',
        },
        {
          name: 'ctaDescription',
          title: 'Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'ctaButtons',
          title: 'Buttons',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'url', title: 'URL', type: 'url' },
              {
                name: 'style',
                title: 'Style',
                type: 'string',
                options: {
                  list: [
                    { title: 'Primary', value: 'primary' },
                    { title: 'Secondary', value: 'secondary' },
                    { title: 'Link', value: 'link' },
                  ],
                },
              },
            ],
            preview: {
              select: { label: 'label', style: 'style' },
              prepare({ label, style }) {
                return { title: label, subtitle: style };
              },
            },
          }],
        },
        {
          name: 'ctaBackground',
          title: 'Background',
          type: 'string',
          options: {
            list: [
              { title: 'Purple Gradient', value: 'purple' },
              { title: 'Subtle Gray', value: 'gray' },
              { title: 'None', value: 'none' },
            ],
          },
          initialValue: 'purple',
        },
      ],
    }),

    // ========================================
    // SETTINGS GROUP
    // ========================================

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'settings',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'OG Image', type: 'image' },
      ],
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      group: 'settings',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'trackingEnabled',
          title: 'Enable Tracking',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'customEventName',
          title: 'Custom Event Name',
          type: 'string',
          description: 'Event name for analytics (e.g., "coe_hub_view")',
        },
      ],
    }),

    defineField({
      name: 'accessControl',
      title: 'Access Control',
      type: 'object',
      group: 'settings',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'requireAuth',
          title: 'Require Authentication',
          type: 'boolean',
          description: 'Require login to access the hub',
          initialValue: true,
        },
        {
          name: 'allowedRoles',
          title: 'Allowed Roles',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Sales', value: 'sales' },
              { title: 'CS', value: 'cs' },
              { title: 'Marketing', value: 'marketing' },
              { title: 'Product', value: 'product' },
              { title: 'Leadership', value: 'leadership' },
              { title: 'All', value: 'all' },
            ],
          },
          initialValue: ['all'],
        },
      ],
    }),

    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Display',
      type: 'object',
      group: 'settings',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'showLastUpdated',
          title: 'Show Last Updated',
          type: 'boolean',
          description: 'Display when the hub was last updated',
          initialValue: true,
        },
        {
          name: 'lastUpdatedLabel',
          title: 'Label',
          type: 'string',
          initialValue: 'Last updated',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      headline: 'heroSection.headline',
    },
    prepare({ title, headline }) {
      return {
        title: `🎯 ${title || 'CoE Hub'}`,
        subtitle: headline,
      };
    },
  },
});
