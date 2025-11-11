export default {
  name: 'templateResource',
  title: 'Template Resources',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Template Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Guidelines', value: 'brand' },
          { title: 'Pitch Decks', value: 'pitch' },
          { title: 'Product Decks', value: 'product' },
          { title: 'Security + RFX', value: 'security' },
          { title: 'Implementation Decks', value: 'implementation' },
          { title: 'Feature Slides', value: 'features' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Preview Image',
      type: 'image',
      description: 'Slide deck preview or thumbnail',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'slideCount',
      title: 'Slide Count',
      type: 'string',
      description: 'e.g., "45 slides"',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      description: 'e.g., "Updated Oct 2024"',
    },
    {
      name: 'link',
      title: 'Link to Template',
      type: 'url',
    },
    {
      name: 'featured',
      title: 'Featured Template',
      type: 'boolean',
      description: 'Show as larger featured card',
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
