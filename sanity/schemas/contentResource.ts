export default {
  name: 'contentResource',
  title: 'Content Library',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Content Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Product Presentations', value: 'presentations' },
          { title: 'One-Pagers', value: 'one-pagers' },
          { title: 'Industry Materials', value: 'industry' },
          { title: 'Case Studies', value: 'case-studies' },
          { title: 'Marketing Collateral', value: 'marketing' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Deck', value: 'deck' },
          { title: 'One-Pager', value: 'one-pager' },
          { title: 'Document', value: 'document' },
          { title: 'Video', value: 'video' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Preview Image',
      type: 'image',
      description: 'Content preview or thumbnail',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'icon',
      title: 'Icon/Emoji',
      type: 'string',
      description: 'Emoji or icon for the card',
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'string',
      description: 'e.g., "32 slides • Updated Oct 2024"',
    },
    {
      name: 'link',
      title: 'Link to Content',
      type: 'url',
    },
    {
      name: 'compact',
      title: 'Compact Card Style',
      type: 'boolean',
      description: 'Use for one-pagers and small items',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}
