import { defineType } from 'sanity';

export default defineType({
  name: 'coeContentCategory',
  title: 'CoE Content Category',
  type: 'document',
  icon: () => '🏷️',
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
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Content priority theme for roadmap planning',
      options: {
        list: [
          { title: 'Evergreen - Always collect', value: 'evergreen' },
          { title: 'Theme 1 - Adoption + Implementation', value: 'theme-1' },
          { title: 'Theme 2 - Optimization + Expansion', value: 'theme-2' },
          { title: 'Theme 3 - Advanced Setup', value: 'theme-3' },
          { title: 'Theme 4 - Change Management', value: 'theme-4' },
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
    select: { title: 'name', icon: 'icon', theme: 'theme' },
    prepare({ title, icon, theme }) {
      const themeLabels: Record<string, string> = {
        'evergreen': '🌲 Evergreen',
        'theme-1': '1️⃣ Adoption',
        'theme-2': '2️⃣ Optimization',
        'theme-3': '3️⃣ Advanced',
        'theme-4': '4️⃣ Change Mgmt',
      };
      return {
        title: `${icon || '🏷️'} ${title}`,
        subtitle: themeLabels[theme] || theme,
      };
    },
  },
});
