export default {
  name: 'contentSection',
  title: 'Rich Content Section',
  type: 'object',
  fields: [
    {
      name: 'anchorId',
      title: 'Anchor ID (for quick nav)',
      type: 'string',
      description: 'Optional: e.g., "content" for #content (no # symbol)',
    },
    {
      name: 'sectionTitle',
      title: 'Section Title (optional)',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'includeLaunchStatus',
      title: 'Include Launch Status Section',
      type: 'boolean',
      initialValue: false,
      description: 'Add a launch status roadmap inside this section',
    },
    {
      name: 'launchStatus',
      title: 'Launch Status',
      type: 'object',
      hidden: ({ parent }: any) => !parent?.includeLaunchStatus,
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
                },
                {
                  name: 'isActive',
                  title: 'Is Active Stage',
                  type: 'boolean',
                  initialValue: false,
                },
              ],
            },
          ],
          validation: (Rule: any) => Rule.max(8),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Dark/Black', value: 'dark' },
        ],
      },
      initialValue: 'white',
    },
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
    prepare({ title }: any) {
      return {
        title: `Content: ${title || 'Untitled'}`,
      };
    },
  },
}
