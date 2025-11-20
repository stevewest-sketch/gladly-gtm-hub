export default {
  name: 'hubFeatureCardsSection',
  title: 'Hub Feature Cards Section',
  type: 'object',
  description: 'Grid of feature/resource cards with links',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'transparent',
      title: 'Transparent Background',
      type: 'boolean',
      description: 'Remove white container box - content flows naturally into page background',
      initialValue: false,
    },
    {
      name: 'columns',
      title: 'Number of Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      validation: (Rule: any) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Emoji icon (optional)',
            },
            {
              name: 'iconStyle',
              title: 'Icon Style',
              type: 'string',
              description: 'How to display the icon',
              options: {
                list: [
                  { title: 'Large Emoji', value: 'emoji' },
                  { title: 'Badge with Background', value: 'badge' },
                ],
              },
              initialValue: 'emoji',
              hidden: ({ parent }: any) => !parent?.icon,
            },
            {
              name: 'iconBadgeColor',
              title: 'Icon Badge Background Color',
              type: 'string',
              description: 'Hex color for icon badge background (e.g., #F5F3FF)',
              initialValue: '#F5F3FF',
              hidden: ({ parent }: any) => parent?.iconStyle !== 'badge',
              validation: (Rule: any) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
                name: 'hex color',
                invert: false
              }).error('Must be a valid hex color')
            },
            {
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Card Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'meta',
              title: 'Meta Info',
              type: 'string',
              description: 'Optional metadata (e.g., "15 min read", "Updated Nov 2024")',
            },
            {
              name: 'cta',
              title: 'Call to Action Text',
              type: 'string',
              description: 'Button/link text (e.g., "View Guide →", "Download →")',
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'url',
              description: 'Internal path (/page) or external URL (https://...)',
            },
            {
              name: 'tag',
              title: 'Tag',
              type: 'string',
              description: 'Optional tag label (e.g., "Best Practices", "Template")',
            },
            {
              name: 'tagColor',
              title: 'Tag Background Color',
              type: 'string',
              description: 'Hex color for tag background (e.g., #8C69F0). Defaults to purple.',
              initialValue: '#8C69F0',
              hidden: ({ parent }: any) => !parent?.tag,
              validation: (Rule: any) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
                name: 'hex color',
                invert: false
              }).error('Must be a valid hex color')
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
              tag: 'tag',
            },
            prepare({ title, icon, tag }: any) {
              return {
                title: `${icon || '📄'} ${title}`,
                subtitle: tag || 'No tag',
              };
            },
          },
        },
      ],
    },
    {
      name: 'showTabs',
      title: 'Show Filter Tabs',
      type: 'boolean',
      description: 'Enable filtering by tag/category tabs',
      initialValue: false,
    },
    {
      name: 'tabs',
      title: 'Filter Tabs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tab labels (e.g., "All Resources", "Best Practices", "Templates")',
      hidden: ({ parent }: any) => !parent?.showTabs,
    },
  ],
  preview: {
    select: {
      title: 'title',
      count: 'cards.length',
      columns: 'columns',
    },
    prepare({ title, count, columns }: any) {
      return {
        title: `Feature Cards: ${title || 'Untitled'}`,
        subtitle: `${count || 0} cards • ${columns || 3} columns`,
      };
    },
  },
}
