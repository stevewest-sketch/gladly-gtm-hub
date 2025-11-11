export default {
  name: 'helpSection',
  title: 'Help/CTA Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: '💡 Can\'t find what you need?',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Ask in Slack - the team will help you find it',
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      validation: (Rule: any) => Rule.max(2),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
            {
              name: 'variant',
              title: 'Button Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: any) {
      return {
        title: `Help: ${title || 'Untitled'}`,
      };
    },
  },
}
