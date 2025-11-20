export default {
  name: 'hubContentSection',
  title: 'Hub Content Section',
  type: 'object',
  description: 'Flexible content section with background and layout options',
  fields: [
    {
      name: 'sectionId',
      title: 'Section ID (for anchor links)',
      type: 'string',
      description: 'Optional: e.g., "coe-assistant" for #coe-assistant',
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'icon',
      title: 'Section Icon',
      type: 'string',
      description: 'Optional emoji icon',
    },
    {
      name: 'transparent',
      title: 'Transparent Background',
      type: 'boolean',
      description: 'Remove white container box - content flows naturally into page background (overrides background setting)',
      initialValue: false,
    },
    {
      name: 'background',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Gradient (Gray to White)', value: 'gradient' },
          { title: 'Dark', value: 'dark' },
          { title: 'Custom (use className)', value: 'custom' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'customClassName',
      title: 'Custom CSS Classes',
      type: 'string',
      description: 'For custom backgrounds like "bg-gradient-to-r from-purple-600 to-purple-500 text-white"',
      hidden: ({ parent }: any) => parent?.background !== 'custom',
    },
    {
      name: 'noPadding',
      title: 'Remove Padding',
      type: 'boolean',
      description: 'Remove default padding (useful for full-width custom content)',
      initialValue: false,
    },
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rich Text', value: 'richText' },
          { title: 'Two Column Layout', value: 'twoColumn' },
          { title: 'Custom HTML/JSX', value: 'custom' },
        ],
      },
      initialValue: 'richText',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }: any) => parent?.contentType !== 'richText',
    },
    {
      name: 'leftColumn',
      title: 'Left Column Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }: any) => parent?.contentType !== 'twoColumn',
    },
    {
      name: 'rightColumn',
      title: 'Right Column Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }: any) => parent?.contentType !== 'twoColumn',
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Internal path (/page) or external URL (https://...)',
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'White', value: 'white' },
            ],
          },
          initialValue: 'primary',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      background: 'background',
      icon: 'icon',
    },
    prepare({ title, background, icon }: any) {
      return {
        title: `${icon || '📄'} ${title || 'Content Section'}`,
        subtitle: `Background: ${background || 'white'}`,
      };
    },
  },
}
