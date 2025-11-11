import { defineType, defineField } from 'sanity'

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Single emoji to display before the title (e.g., 🏠, 🎯, 📚)',
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'string',
      description: 'URL path (e.g., /coe, /enablement/demo). Leave empty if this is a parent section with children.',
    }),
    defineField({
      name: 'defaultExpanded',
      title: 'Expanded by Default',
      type: 'boolean',
      description: 'Should this section be expanded when the page loads?',
      initialValue: false,
    }),
    defineField({
      name: 'activeColor',
      title: 'Active Highlight Color',
      type: 'string',
      description: 'Color theme for the active state',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Green', value: 'green' },
          { title: 'Orange', value: 'orange' },
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'children',
      title: 'Child Items',
      type: 'array',
      description: 'Sub-navigation items that appear when this section is expanded',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'activeColor',
              title: 'Active Highlight Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: 'blue' },
                  { title: 'Purple', value: 'purple' },
                  { title: 'Green', value: 'green' },
                  { title: 'Orange', value: 'orange' },
                ],
              },
              initialValue: 'blue',
            },
          ],
          preview: {
            select: {
              title: 'title',
              href: 'href',
            },
            prepare({ title, href }) {
              return {
                title: title,
                subtitle: href,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      href: 'href',
    },
    prepare({ title, icon, href }) {
      return {
        title: icon ? `${icon} ${title}` : title,
        subtitle: href || 'Section with children',
      }
    },
  },
})
