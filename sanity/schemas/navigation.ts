import { defineType, defineField } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for Sanity Studio (not shown on website)',
      initialValue: 'Main Navigation',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Text displayed in the navigation header',
      initialValue: 'GTM Hub',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'navigationItem' }],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      logoText: 'logoText',
    },
    prepare({ title, logoText }) {
      return {
        title: title,
        subtitle: `Logo: ${logoText}`,
      }
    },
  },
})
