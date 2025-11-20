export default {
  name: 'hubStatGridSection',
  title: 'Hub Stat Grid Section',
  type: 'object',
  description: 'Display statistics in a grid layout',
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
      initialValue: 4,
    },
    {
      name: 'styleVariant',
      title: 'Style Variant',
      type: 'string',
      description: 'Choose the visual style for stat cards',
      options: {
        list: [
          { title: 'Minimal Clean (Recommended)', value: 'minimal' },
          { title: 'Gradient Premium', value: 'gradient' },
          { title: 'Badge Icon Style', value: 'badge' },
          { title: 'Border (Legacy)', value: 'border-legacy' },
        ],
      },
      initialValue: 'minimal',
    },
    {
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color for gradients and accents (e.g., #8C69F0). Used mainly for gradient variant.',
      initialValue: '#8C69F0',
      validation: (Rule: any) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: 'hex color',
        invert: false
      }).error('Must be a valid hex color (e.g., #8C69F0)')
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      validation: (Rule: any) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "89.9%", "150+", "$500K"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of the stat',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Emoji icon (optional)',
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              description: 'For legacy style: border color. For minimal/badge: icon background color. Use hex codes (e.g., #F5F3FF) or Tailwind classes.',
              options: {
                list: [
                  { title: 'Light Purple', value: '#F5F3FF' },
                  { title: 'Light Blue', value: '#EFF6FF' },
                  { title: 'Light Green', value: '#F0FDF4' },
                  { title: 'Light Orange', value: '#FFF7ED' },
                  { title: 'Light Yellow', value: '#FEFCE8' },
                  { title: 'Purple Border (Legacy)', value: 'border-purple-500' },
                  { title: 'Blue Border (Legacy)', value: 'border-blue-500' },
                  { title: 'Orange Border (Legacy)', value: 'border-orange-500' },
                ],
              },
              initialValue: '#F5F3FF',
            },
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
              icon: 'icon',
            },
            prepare({ value, label, icon }: any) {
              return {
                title: `${icon || '📊'} ${value}`,
                subtitle: label,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      count: 'stats.length',
      columns: 'columns',
      styleVariant: 'styleVariant',
    },
    prepare({ title, count, columns, styleVariant }: any) {
      return {
        title: `Stat Grid: ${title || 'Untitled'}`,
        subtitle: `${count || 0} stats • ${columns || 4} columns • ${styleVariant || 'minimal'} style`,
      };
    },
  },
}
