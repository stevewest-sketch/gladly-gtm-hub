export default {
  name: 'imageTextSection',
  title: 'Image & Text Section',
  type: 'object',
  fields: [
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image on Left', value: 'imageLeft' },
          { title: 'Image on Right', value: 'imageRight' },
          { title: 'Image on Top', value: 'imageTop' },
        ],
        layout: 'radio',
      },
      initialValue: 'imageRight',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'buttons',
      title: 'Call-to-Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'style',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (Purple)', value: 'primary' },
                  { title: 'Secondary (Blue)', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Light Purple', value: 'purple' },
          { title: 'Light Blue', value: 'blue' },
        ],
      },
      initialValue: 'white',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'image',
    },
    prepare({ heading, media }: any) {
      return {
        title: 'Image & Text',
        subtitle: heading,
        media,
      };
    },
  },
}
