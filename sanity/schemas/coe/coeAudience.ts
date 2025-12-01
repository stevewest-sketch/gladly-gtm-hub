import { defineType } from 'sanity';

export default defineType({
  name: 'coeAudience',
  title: 'CoE Audience',
  type: 'document',
  icon: () => '👥',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
    },
    {
      name: 'attentionSpan',
      title: 'Attention Span',
      type: 'string',
      description: 'How much time do they have for content?',
      options: {
        list: [
          { title: 'High - Will read in depth', value: 'high' },
          { title: 'Medium - Skims then dives in', value: 'medium' },
          { title: 'Low - Needs executive summary', value: 'low' },
        ],
      },
    },
    {
      name: 'buyingImportance',
      title: 'Buying Importance',
      type: 'string',
      description: 'Role in purchase decisions',
      options: {
        list: [
          { title: 'Critical - Decision maker', value: 'critical' },
          { title: 'Consulted - Key influencer', value: 'consulted' },
          { title: 'Informed - Needs awareness', value: 'informed' },
        ],
      },
    },
    {
      name: 'renewalImportance',
      title: 'Renewal Importance',
      type: 'string',
      description: 'Role in renewal decisions',
      options: {
        list: [
          { title: 'Critical - Decision maker', value: 'critical' },
          { title: 'Consulted - Key influencer', value: 'consulted' },
          { title: 'Informed - Needs awareness', value: 'informed' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', icon: 'icon', buying: 'buyingImportance' },
    prepare({ title, icon, buying }) {
      return {
        title: `${icon || '👥'} ${title}`,
        subtitle: buying ? `Buying: ${buying}` : '',
      };
    },
  },
});
