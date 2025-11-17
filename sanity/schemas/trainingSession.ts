export default {
  name: 'trainingSession',
  title: 'Training Sessions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Session Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Session Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dateDisplay',
      title: 'Date Display Text',
      type: 'string',
      description: 'e.g., "October 15, 2024"',
    },
    {
      name: 'product',
      title: 'Product',
      type: 'string',
      options: {
        list: [
          { title: 'All Products', value: 'all' },
          { title: 'Sidekick Standalone', value: 'sidekick-standalone' },
          { title: 'Sidekick Sales', value: 'sidekick-sales' },
          { title: 'Sidekick Voice', value: 'sidekick-voice' },
          { title: 'Sidekick Email', value: 'sidekick-email' },
          { title: 'Hero Platform', value: 'hero' },
          { title: 'Customer AI', value: 'customer-ai' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'productLabel',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Value Selling', value: 'Value Selling' },
          { title: 'Sales Skills', value: 'Sales Skills' },
          { title: 'GTM Strategy', value: 'GTM Strategy' },
          { title: 'Product', value: 'Product' },
          { title: 'Team', value: 'Team' },
          { title: 'Professional Skills', value: 'Professional Skills' },
          { title: 'Demo', value: 'Demo' },
          { title: 'Partner', value: 'Partner' },
          { title: 'Competitive', value: 'Competitive' },
          { title: 'Persona', value: 'Persona' },
        ],
      },
      description: 'Select the primary category for this training session',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "60 min"',
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'string',
      description: 'e.g., "Recording + Deck"',
    },
    {
      name: 'link',
      title: 'Materials Link',
      type: 'string',
      description: 'Internal path (e.g., /enablement/articles/slug) or external URL',
    },
    {
      name: 'enablementArticle',
      title: 'Linked Enablement Article',
      type: 'reference',
      to: [{ type: 'enablementArticle' }],
      description: 'Reference to the associated enablement article (auto-created from transcript processing)',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Categories for filtering (select from: Value Selling, Sales Skills, GTM Strategy, Product, Team, Professional Skills, Demo, Partner, Competitive, Persona)',
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'dateFilter',
      title: 'Date Filter Category',
      type: 'string',
      options: {
        list: [
          { title: 'Last 30 Days', value: '30days' },
          { title: 'Last 90 Days', value: '90days' },
          { title: 'Q4 2024', value: 'q4-2024' },
          { title: 'Q3 2024', value: 'q3-2024' },
          { title: 'Earlier', value: 'earlier' },
        ],
      },
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this session should be displayed on the training hub',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dateDisplay',
      product: 'productLabel',
    },
    prepare(selection: any) {
      const { title, subtitle, product } = selection;
      return {
        title: title,
        subtitle: `${subtitle} • ${product}`,
      };
    },
  },
}
