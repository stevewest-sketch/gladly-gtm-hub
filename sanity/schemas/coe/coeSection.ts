import { defineType } from 'sanity';

export default defineType({
  name: 'coeSection',
  title: 'CoE Section',
  type: 'document',
  icon: () => '📂',
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
      description: 'Emoji icon for this section',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower = first)',
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
    select: { title: 'name', icon: 'icon', order: 'order' },
    prepare({ title, icon, order }) {
      return {
        title: `${icon || '📂'} ${title}`,
        subtitle: `Order: ${order}`,
      };
    },
  },
});
