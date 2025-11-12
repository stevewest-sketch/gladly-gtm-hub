export default {
  name: 'quickStatsSection',
  title: 'Quick Stats Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Quick Stats',
    },
    {
      name: 'sectionSubtitle',
      title: 'Section Subtitle (optional)',
      type: 'string',
    },
    {
      name: 'variant',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'light' },
        ],
      },
      initialValue: 'white',
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
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "87%", "10x", "$2M", "50+"',
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
              title: 'Icon (optional)',
              type: 'string',
              description: 'Emoji icon for the stat',
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Purple', value: 'purple' },
                  { title: 'Blue', value: 'blue' },
                  { title: 'Green', value: 'green' },
                  { title: 'Orange', value: 'orange' },
                ],
              },
              initialValue: 'purple',
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
      title: 'sectionTitle',
      count: 'stats.length',
    },
    prepare({ title, count }: any) {
      return {
        title: `Quick Stats: ${title || 'Untitled'}`,
        subtitle: `${count || 0} statistics`,
      };
    },
  },
}
