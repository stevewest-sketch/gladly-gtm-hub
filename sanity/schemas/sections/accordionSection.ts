export default {
  name: 'accordionSection',
  title: 'Accordion / FAQ Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question / Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer / Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'defaultOpen',
              title: 'Open by Default',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
        ],
      },
      initialValue: 'white',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({ heading, items }: any) {
      return {
        title: 'Accordion / FAQ',
        subtitle: heading || `${items?.length || 0} items`,
      };
    },
  },
}
