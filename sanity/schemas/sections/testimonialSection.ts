export default {
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role / Title',
              type: 'string',
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Author Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'rating',
              title: 'Rating (1-5 stars)',
              type: 'number',
              validation: (Rule: any) => Rule.min(1).max(5).integer(),
            },
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'company',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (Multiple)', value: 'grid' },
          { title: 'Single Large', value: 'single' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
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
        ],
      },
      initialValue: 'gray',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      testimonials: 'testimonials',
    },
    prepare({ heading, testimonials }: any) {
      return {
        title: 'Testimonials',
        subtitle: heading || `${testimonials?.length || 0} testimonials`,
      };
    },
  },
}
