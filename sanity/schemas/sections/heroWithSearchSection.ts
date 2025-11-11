export default {
  name: 'heroWithSearchSection',
  title: 'Hero with Search Bar',
  type: 'object',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Main heading (displays at 72px)',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Supporting text below title',
    },
    {
      name: 'searchPlaceholder',
      title: 'Search Bar Placeholder',
      type: 'string',
      initialValue: 'Search for battle cards, templates, demos, product info...',
    },
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }: any) {
      return {
        title: `Hero: ${title || 'Untitled'}`,
      };
    },
  },
}
