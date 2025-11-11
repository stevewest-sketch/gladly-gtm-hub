export default {
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    {
      name: 'anchorId',
      title: 'Anchor ID (for quick nav)',
      type: 'string',
      description: 'Optional: e.g., "stats" for #stats (no # symbol)',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Purple', value: 'purple' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'gray',
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'e.g., "87%", "10x", "$2M"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
            },
            prepare({ number, label }: any) {
              return {
                title: `${number} - ${label}`,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      statsCount: 'stats.length',
    },
    prepare({ statsCount }: any) {
      return {
        title: `Stats Section`,
        subtitle: `${statsCount || 0} statistics`,
      };
    },
  },
}
