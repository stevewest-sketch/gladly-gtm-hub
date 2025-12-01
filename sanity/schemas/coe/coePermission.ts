import { defineType } from 'sanity';

export default defineType({
  name: 'coePermission',
  title: 'CoE Permission',
  type: 'document',
  icon: () => '🔐',
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
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Visual indicator color',
      options: {
        list: [
          { title: '🟢 Green (Approved)', value: 'green' },
          { title: '🟡 Yellow (Internal)', value: 'yellow' },
          { title: '🔴 Red (Needs Permission)', value: 'red' },
          { title: '⚫ Gray (Archived)', value: 'gray' },
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
    select: { title: 'name', color: 'color' },
    prepare({ title, color }) {
      const colorIcons: Record<string, string> = {
        green: '🟢',
        yellow: '🟡',
        red: '🔴',
        gray: '⚫',
      };
      return { title: `${colorIcons[color] || '⚪'} ${title}` };
    },
  },
});
