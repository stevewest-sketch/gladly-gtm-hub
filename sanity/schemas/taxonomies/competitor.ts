export default {
  name: 'competitor',
  title: 'Competitors',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Competitor Name',
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
      name: 'logo',
      title: 'Competitor Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'aiGeneratedOverview',
      title: 'AI-Generated Overview',
      type: 'text',
      rows: 5,
      description: 'Can be auto-generated from battle card or written manually',
    },
    {
      name: 'generationMethod',
      title: 'Generation Method',
      type: 'string',
      options: {
        list: [
          { title: 'Auto-generated', value: 'auto' },
          { title: 'Manually written', value: 'manual' },
        ],
      },
      initialValue: 'manual',
    },
    {
      name: 'keyDifferentiators',
      title: 'Key Differentiators',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'How Gladly wins against this competitor',
    },
    {
      name: 'commonObjections',
      title: 'Common Objections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'objection',
              title: 'Objection',
              type: 'string',
            },
            {
              name: 'response',
              title: 'Response',
              type: 'text',
              rows: 3,
            },
          ],
        },
      ],
    },
    {
      name: 'lastReviewed',
      title: 'Last Reviewed',
      type: 'datetime',
      description: 'When this competitive intelligence was last updated',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this competitor appears in lists',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'lastReviewed',
      media: 'logo',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      const lastReviewed = subtitle
        ? new Date(subtitle).toLocaleDateString()
        : 'Not reviewed';
      return {
        title: title,
        subtitle: `Last reviewed: ${lastReviewed}`,
        media: media,
      };
    },
  },
}
