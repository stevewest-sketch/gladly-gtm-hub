export default {
  name: 'productsGridSection',
  title: 'Products Grid Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Product Knowledge',
    },
    {
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'Learn about our products and features',
    },
    {
      name: 'products',
      title: 'Products',
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
      count: 'products.length',
    },
    prepare({ title, count }: any) {
      return {
        title: `Products: ${title || 'Untitled'}`,
        subtitle: `${count || 0} products`,
      };
    },
  },
}
