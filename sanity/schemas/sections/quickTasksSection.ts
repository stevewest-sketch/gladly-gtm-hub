export default {
  name: 'quickTasksSection',
  title: 'Quick Tasks Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What do you need to do today?',
    },
    {
      name: 'tasks',
      title: 'Quick Tasks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
            },
            prepare({ title, emoji }: any) {
              return {
                title: `${emoji} ${title}`,
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
      count: 'tasks.length',
    },
    prepare({ title, count }: any) {
      return {
        title: `Quick Tasks: ${title || 'Untitled'}`,
        subtitle: `${count || 0} tasks`,
      };
    },
  },
}
