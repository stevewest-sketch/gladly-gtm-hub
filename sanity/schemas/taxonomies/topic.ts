export default {
  name: 'topic',
  title: 'Topics',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Topic Name',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Optional grouping for topics',
      options: {
        list: [
          { title: 'Product Knowledge', value: 'product-knowledge' },
          { title: 'Sales Process', value: 'sales-process' },
          { title: 'Customer Success', value: 'customer-success' },
          { title: 'Technical', value: 'technical' },
          { title: 'Business Value', value: 'business-value' },
          { title: 'General', value: 'general' },
        ],
      },
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
      description: 'Order in which this topic appears in lists',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
}
