export default {
  name: 'hubPage',
  title: 'Hub Page',
  type: 'document',
  icon: () => '🎯',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal name for this hub page',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL path (e.g., "coe-hub" becomes /coe-hub)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Hero Icon',
          type: 'string',
          description: 'Large emoji icon for the hero',
        },
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          rows: 2,
        },
        {
          name: 'backgroundColor',
          title: 'Background Gradient',
          type: 'string',
          options: {
            list: [
              { title: 'Purple Gradient', value: 'bg-gradient-to-r from-purple-600 to-purple-500' },
              { title: 'Blue Gradient', value: 'bg-gradient-to-r from-blue-600 to-blue-500' },
              { title: 'Green Gradient', value: 'bg-gradient-to-r from-green-600 to-green-500' },
              { title: 'Orange Gradient', value: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706]' },
              { title: 'Yellow Gradient', value: 'bg-gradient-to-r from-yellow-600 to-yellow-500' },
            ],
          },
          initialValue: 'bg-gradient-to-r from-purple-600 to-purple-500',
        },
      ],
    },
    {
      name: 'buttons',
      title: 'Navigation Buttons',
      type: 'array',
      description: 'Define the main navigation buttons for this hub',
      validation: (Rule: any) => Rule.required().min(2).max(6),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Button ID',
              type: 'string',
              description: 'Unique identifier (e.g., "overview", "bva")',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Button Label',
              type: 'string',
              description: 'Display text on the button',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Emoji icon for the button',
            },
            {
              name: 'color',
              title: 'Active Color',
              type: 'string',
              description: 'Background color when button is active',
              options: {
                list: [
                  { title: 'Purple', value: 'bg-[#8C69F0]' },
                  { title: 'Orange', value: 'bg-[#F59E0B]' },
                  { title: 'Yellow', value: 'bg-yellow-600' },
                  { title: 'Amber', value: 'bg-amber-600' },
                  { title: 'Blue', value: 'bg-blue-600' },
                  { title: 'Green', value: 'bg-green-600' },
                  { title: 'Pink', value: 'bg-pink-600' },
                ],
              },
              initialValue: 'bg-[#8C69F0]',
            },
            {
              name: 'sections',
              title: 'Sections for this Button',
              type: 'array',
              description: 'Content sections shown when this button is active',
              of: [
                { type: 'hubContentSection' },
                { type: 'hubStatGridSection' },
                { type: 'hubFeatureCardsSection' },
                { type: 'hubProcessStepsSection' },
                { type: 'contentSection' },
                { type: 'ctaSection' },
              ],
            },
            {
              name: 'catalogFilter',
              title: 'Catalog Filter',
              type: 'object',
              description: 'Define how the universal catalog filters for this button',
              fields: [
                {
                  name: 'coeCategory',
                  title: 'CoE Categories',
                  type: 'array',
                  of: [{ type: 'string' }],
                  options: {
                    list: [
                      { title: 'BVA', value: 'bva' },
                      { title: 'Proof Points', value: 'proof-points' },
                      { title: 'Templates', value: 'templates' },
                      { title: 'Best Practices', value: 'best-practices' },
                    ],
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              label: 'label',
              icon: 'icon',
              sectionsCount: 'sections.length',
            },
            prepare({ label, icon, sectionsCount }: any) {
              return {
                title: `${icon || '🔘'} ${label}`,
                subtitle: `${sectionsCount || 0} sections`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'showCatalog',
      title: 'Show Universal Catalog',
      type: 'boolean',
      description: 'Display the universal catalog section at the bottom',
      initialValue: true,
    },
    {
      name: 'catalogTitle',
      title: 'Catalog Section Title',
      type: 'string',
      description: 'Title for the catalog section (can use button name dynamically)',
      initialValue: 'Browse All Resources',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      buttonsCount: 'buttons.length',
    },
    prepare({ title, slug, buttonsCount }: any) {
      return {
        title: `Hub: ${title}`,
        subtitle: `/${slug} • ${buttonsCount || 0} buttons`,
        media: () => '🎯',
      };
    },
  },
}
