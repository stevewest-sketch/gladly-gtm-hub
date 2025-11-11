export default {
  name: 'featureGridSection',
  title: 'Feature Grid Section',
  type: 'object',
  fields: [
    {
      name: 'anchorId',
      title: 'Anchor ID (for quick nav)',
      type: 'string',
      description: 'Optional: e.g., "features" for #features (no # symbol)',
    },
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon/Emoji',
              type: 'string',
              description: 'Add an emoji or icon',
            },
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'string',
              description: 'Optional: Add a URL to make this card clickable (e.g., "#" for placeholder, "/path" for internal, or "https://..." for external)',
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
            },
            prepare({ title, icon }: any) {
              return {
                title: `${icon ? icon + ' ' : ''}${title}`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'columns',
      title: 'Number of Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    },
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      featuresCount: 'features.length',
    },
    prepare({ title, featuresCount }: any) {
      return {
        title: `Feature Grid: ${title || 'Untitled'}`,
        subtitle: `${featuresCount || 0} features`,
      };
    },
  },
}
