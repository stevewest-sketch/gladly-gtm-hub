export default {
  name: 'whatsNewSection',
  title: 'What\'s New Section',
  type: 'object',
  fields: [
    {
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Oct 2025',
      description: 'Badge text shown next to "What\'s New" heading',
    },
    {
      name: 'updates',
      title: 'Updates',
      type: 'array',
      validation: (Rule: any) => Rule.max(3),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'Format: MONTH DAY, YEAR (e.g., OCTOBER 1, 2025)',
            },
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              validation: (Rule: any) => Rule.max(2),
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
            },
            prepare({ title, date }: any) {
              return {
                title: title,
                subtitle: date,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      badge: 'badgeText',
      count: 'updates.length',
    },
    prepare({ badge, count }: any) {
      return {
        title: `What's New: ${badge || 'Untitled'}`,
        subtitle: `${count || 0} updates`,
      };
    },
  },
}
