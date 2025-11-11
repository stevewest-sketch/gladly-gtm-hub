export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'anchorId',
      title: 'Anchor ID (for quick nav)',
      type: 'string',
      description: 'Optional: e.g., "hero" for #hero (no # symbol)',
    },
    {
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Optional badge text shown above the heading',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: '2 Columns (Text Left, Video Right)', value: '2-column' },
        ],
      },
      initialValue: 'centered',
    },
    {
      name: 'videoMediaId',
      title: 'Wistia Video Media ID',
      type: 'string',
      description: 'Optional: Wistia video ID (e.g., "mwar81dg26")',
    },
    {
      name: 'videoAspectRatio',
      title: 'Video Aspect Ratio',
      type: 'number',
      description: 'Optional: e.g., 1.7777777777777777 for 16:9',
      initialValue: 1.7777777777777777,
    },
    {
      name: 'primaryCtaText',
      title: 'Primary CTA Button Text',
      type: 'string',
    },
    {
      name: 'primaryCtaLink',
      title: 'Primary CTA Button Link',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'secondaryCtaText',
      title: 'Secondary CTA Button Text',
      type: 'string',
    },
    {
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Button Link',
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
          { title: 'Purple Gradient', value: 'purple' },
          { title: 'Blue Gradient', value: 'blue' },
          { title: 'Green Gradient', value: 'green' },
          { title: 'Orange Gradient', value: 'orange' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'purple',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: `Hero: ${title}`,
        subtitle: subtitle,
      };
    },
  },
}
