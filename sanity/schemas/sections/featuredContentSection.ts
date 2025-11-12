export default {
  name: 'featuredContentSection',
  title: 'Featured Content Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Content',
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
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Cards Grid', value: 'cards' },
          { title: 'List', value: 'list' },
        ],
      },
      initialValue: 'cards',
    },
    {
      name: 'items',
      title: 'Featured Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Link to the content',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon (optional)',
              type: 'string',
              description: 'Emoji icon for the item',
            },
            {
              name: 'badge',
              title: 'Badge Text (optional)',
              type: 'string',
              description: 'e.g., "New", "Updated", "Popular"',
            },
            {
              name: 'badgeVariant',
              title: 'Badge Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Info (Blue)', value: 'info' },
                  { title: 'Success (Green)', value: 'success' },
                  { title: 'Warning (Orange)', value: 'warning' },
                  { title: 'Error (Red)', value: 'error' },
                ],
              },
              initialValue: 'info',
            },
            {
              name: 'imageUrl',
              title: 'Image URL (optional)',
              type: 'string',
              description: 'Optional image for the item',
            },
          ],
          preview: {
            select: {
              title: 'title',
              badge: 'badge',
              icon: 'icon',
            },
            prepare({ title, badge, icon }: any) {
              return {
                title: `${icon || '📄'} ${title}`,
                subtitle: badge || 'No badge',
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
      count: 'items.length',
      layout: 'layout',
    },
    prepare({ title, count, layout }: any) {
      return {
        title: `Featured Content: ${title || 'Untitled'}`,
        subtitle: `${count || 0} items (${layout || 'cards'} layout)`,
      };
    },
  },
}
