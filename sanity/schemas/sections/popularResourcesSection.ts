export default {
  name: 'popularResourcesSection',
  title: 'Popular Resources Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Most Useful Resources',
    },
    {
      name: 'resources',
      title: 'Popular Resources',
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
      count: 'resources.length',
    },
    prepare({ title, count }: any) {
      return {
        title: `Popular Resources: ${title || 'Untitled'}`,
        subtitle: `${count || 0} resources`,
      };
    },
  },
}
