import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'name',
      title: 'Collection Name',
      type: 'string',
      description: 'Display name for this collection (e.g., "BDR", "Meeting Examples")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'URL-friendly identifier for this collection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hub',
      title: 'Hub',
      type: 'string',
      options: {
        list: [
          { title: '📚 Content Hub', value: 'content' },
          { title: '🎓 Enablement Hub', value: 'enablement' },
          { title: '🏆 CoE Hub', value: 'coe' },
          { title: '✨ Curated Hub', value: 'curated' },
          { title: '💼 Sales Hub', value: 'sales' },
          { title: '🎯 Training Hub', value: 'training' },
          { title: '🤝 Partner Hub', value: 'partner' },
        ],
        layout: 'radio',
      },
      description: 'Which hub does this collection belong to?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Internal description to help editors understand what content belongs in this collection',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Emoji to display in tab navigation (e.g., 💼, 🎯, 📊)',
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color for visual theming (optional)',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).warning('Must be a valid hex color (e.g., #009B00)'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in navigation (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0).integer(),
      initialValue: 99,
    }),
    defineField({
      name: 'showInNavigation',
      title: 'Show in Navigation',
      type: 'boolean',
      description: 'Display this collection as a tab in the hub navigation',
      initialValue: true,
    }),
    defineField({
      name: 'isEnabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Enable this collection (disabled collections are hidden from the frontend)',
      initialValue: true,
    }),
    defineField({
      name: 'subsections',
      title: 'Subsections',
      type: 'array',
      description: 'Define multiple sections within this collection tab (e.g., "Your Go-To Assets", "Recently Updated")',
      of: [{
        type: 'object',
        name: 'subsection',
        fields: [
          {
            name: 'name',
            title: 'Section Name',
            type: 'string',
            description: 'e.g., "Your Go-To Assets", "Recently Updated"',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'icon',
            title: 'Section Icon',
            type: 'string',
            description: 'Optional emoji for section header (e.g., ⭐, ✨)',
            validation: (Rule) => Rule.max(4),
          },
          {
            name: 'filterLogic',
            title: 'Filter Logic',
            type: 'string',
            options: {
              list: [
                { title: 'All entries in collection', value: 'all' },
                { title: 'Featured entries only', value: 'featured' },
                { title: 'Recently updated (last 30 days)', value: 'recent' },
                { title: 'By display priority', value: 'priority' },
              ],
            },
            description: 'How to filter entries for this subsection',
            initialValue: 'all',
          },
          {
            name: 'maxItems',
            title: 'Max Items to Display',
            type: 'number',
            description: 'Maximum number of entries to show (leave empty for no limit)',
            validation: (Rule) => Rule.min(1).integer(),
            initialValue: 6,
          },
          {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order within the tab (lower numbers appear first)',
            validation: (Rule) => Rule.required().min(0).integer(),
            initialValue: 0,
          },
        ],
        preview: {
          select: {
            name: 'name',
            icon: 'icon',
            filterLogic: 'filterLogic',
            maxItems: 'maxItems',
          },
          prepare({ name, icon, filterLogic, maxItems }) {
            return {
              title: `${icon || '📋'} ${name}`,
              subtitle: `${filterLogic} • Max: ${maxItems || '∞'}`,
            }
          },
        },
      }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'hub',
      icon: 'icon',
      enabled: 'isEnabled',
      order: 'order',
    },
    prepare({ title, subtitle, icon, enabled, order }) {
      const hubLabels: Record<string, string> = {
        content: '📚 Content Hub',
        enablement: '🎓 Enablement Hub',
        coe: '🏆 CoE Hub',
        curated: '✨ Curated Hub',
        sales: '💼 Sales Hub',
        training: '🎯 Training Hub',
        partner: '🤝 Partner Hub',
      }

      return {
        title: `${icon || '📁'} ${title}`,
        subtitle: `${hubLabels[subtitle] || subtitle} • Order: ${order}${!enabled ? ' • Disabled' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'hub', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Hub',
      name: 'hubAsc',
      by: [
        { field: 'hub', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
})
