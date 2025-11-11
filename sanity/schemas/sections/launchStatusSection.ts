export default {
  name: 'launchStatusSection',
  title: 'Launch Status Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: '🚀 Launch Status',
    },
    {
      name: 'statusItems',
      title: 'Status Items (8 items in 2 rows)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'isActive',
              title: 'Is Active Stage',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'label',
              active: 'isActive',
            },
            prepare({ title, active }: any) {
              return {
                title: title,
                subtitle: active ? '✓ Active' : '',
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1).max(8),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }: any) {
      return {
        title: `Launch Status: ${title || 'Untitled'}`,
      };
    },
  },
}
