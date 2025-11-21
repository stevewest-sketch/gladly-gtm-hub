export default {
  name: 'audience',
  title: 'Audiences',
  type: 'document',
  description: 'Target audiences for enablement content (Sales, CSM, SC, etc.)',
  fields: [
    {
      name: 'name',
      title: 'Audience Name',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this audience (e.g., "Customer Success Managers")',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this audience appears in filter lists',
      initialValue: 50,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
}
