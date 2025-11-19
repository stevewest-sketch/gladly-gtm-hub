export default {
  name: 'contentType',
  title: 'Content Types',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Content Type Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji for this content type',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for visual differentiation (e.g., #2563EB for Training)',
      validation: (Rule: any) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color code'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this content type appears in lists',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
}
