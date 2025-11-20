export default {
  name: 'hubProcessStepsSection',
  title: 'Hub Process Steps Section',
  type: 'object',
  description: 'Display a step-by-step process or workflow',
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
      name: 'variant',
      title: 'Display Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Large with icons)', value: 'default' },
          { title: 'Compact (Dense layout)', value: 'compact' },
        ],
      },
      initialValue: 'default',
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
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color for step numbers and highlights (e.g., #8C69F0)',
      initialValue: '#8C69F0',
      validation: (Rule: any) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: 'hex color',
        invert: false
      }).error('Must be a valid hex color (e.g., #8C69F0)')
    },
    {
      name: 'elevation',
      title: 'Card Elevation',
      type: 'string',
      description: 'Shadow depth for compact variant cards',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Subtle (Recommended)', value: 'subtle' },
          { title: 'Medium', value: 'medium' },
        ],
      },
      initialValue: 'subtle',
      hidden: ({ parent }: any) => parent?.variant !== 'compact',
    },
    {
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      validation: (Rule: any) => Rule.required().min(2),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Emoji icon (leave empty to show step number)',
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'details',
              title: 'Detail Points',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Optional bullet points with additional details',
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
            },
            prepare({ title, icon }: any) {
              return {
                title: `${icon || '📍'} ${title}`,
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
      count: 'steps.length',
      variant: 'variant',
    },
    prepare({ title, count, variant }: any) {
      return {
        title: `Process Steps: ${title || 'Untitled'}`,
        subtitle: `${count || 0} steps • ${variant || 'default'} variant`,
      };
    },
  },
}
