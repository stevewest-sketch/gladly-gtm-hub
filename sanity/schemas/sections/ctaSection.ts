export default {
  name: 'ctaSection',
  title: 'Call-to-Action Section',
  type: 'object',
  fields: [
    {
      name: 'anchorId',
      title: 'Anchor ID (for quick nav)',
      type: 'string',
      description: 'Optional: e.g., "contact" for #contact (no # symbol)',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
    },
    {
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text (optional)',
      type: 'string',
    },
    {
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Purple', value: 'purple' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'purple',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }: any) {
      return {
        title: `CTA: ${title}`,
      };
    },
  },
}
