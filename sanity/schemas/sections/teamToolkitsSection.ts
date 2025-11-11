export default {
  name: 'teamToolkitsSection',
  title: 'Team Toolkits Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Start with Your Role',
    },
    {
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'Everything you need, organized for your job',
    },
    {
      name: 'toolkits',
      title: 'Toolkits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
              description: 'Single emoji character',
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
              rows: 2,
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
            {
              name: 'color',
              title: 'Color Theme',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue (Sales)', value: 'blue' },
                  { title: 'Purple (CSM)', value: 'purple' },
                  { title: 'Green (SC)', value: 'green' },
                  { title: 'Orange (Marketing)', value: 'orange' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
              color: 'color',
            },
            prepare({ title, emoji, color }: any) {
              return {
                title: `${emoji} ${title}`,
                subtitle: color,
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
    },
    prepare({ title }: any) {
      return {
        title: `Team Toolkits: ${title || 'Untitled'}`,
      };
    },
  },
}
