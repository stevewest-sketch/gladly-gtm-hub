export default {
  name: 'learningModule',
  title: 'Learning Module',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Module Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Competitive', value: 'competitive' },
          { title: 'Product Training', value: 'product' },
          { title: 'Process & Operations', value: 'process' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'moduleType',
      title: 'Badge Label',
      type: 'string',
      description: 'e.g., "Process Guide", "Product Deep Dive"',
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'oneLiner',
      title: 'One-line Summary',
      type: 'string',
      description: 'Short summary for card display',
      validation: (Rule: any) => Rule.max(120),
    },
    {
      name: 'videoUrl',
      title: 'Video Embed URL',
      type: 'url',
      description: 'Loom, Vimeo, or Wistia embed URL',
    },
    {
      name: 'videoDuration',
      title: 'Video Duration (minutes)',
      type: 'number',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    },
    // ========================================
    // FLEXIBLE PAGE SECTIONS (new - replaces legacy fields below)
    // ========================================
    {
      name: 'pageSections',
      title: '📄 Page Sections (Flexible Builder)',
      type: 'array',
      description: '🎯 Build your module with flexible, reorderable sections. This replaces keyTakeaways, interactiveFlow, examples, and faqs.',
      of: [{ type: 'pageSection' }],
    },
    // ========================================
    // LEGACY FIELDS (kept for migration, will be deprecated)
    // ========================================
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      description: '3-4 key takeaway cards',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon/Emoji',
              type: 'string',
              description: 'Emoji or icon identifier',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    },
    {
      name: 'interactiveFlow',
      title: 'Interactive Flow',
      type: 'object',
      description: 'Decision tree for triage/routing',
      fields: [
        {
          name: 'question',
          title: 'Main Question',
          type: 'string',
        },
        {
          name: 'paths',
          title: 'Decision Paths',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Path Label',
                  type: 'string',
                },
                {
                  name: 'route',
                  title: 'Route/Action',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Optional Detail',
                  type: 'text',
                  rows: 2,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'examples',
      title: 'Examples',
      type: 'array',
      description: 'Expandable accordion examples',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Example Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      description: 'Frequently asked questions',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    },
    {
      name: 'quickActions',
      title: 'Quick Actions',
      type: 'object',
      description: 'Sidebar quick actions',
      fields: [
        {
          name: 'pdfUrl',
          title: 'One-pager PDF URL',
          type: 'url',
        },
        {
          name: 'slackTemplates',
          title: 'Slack Templates',
          type: 'array',
          of: [{ type: 'text' }],
          description: 'Copy-paste Slack messages',
        },
        {
          name: 'relatedLinks',
          title: 'Related Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Link Label',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'productTags',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'All Products',
          'Sidekick Standalone',
          'Sidekick Sales',
          'Sidekick Voice',
          'Sidekick Email',
          'Hero Platform',
          'Customer AI',
        ],
      },
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Last Updated, Newest',
      name: 'lastUpdatedDesc',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'icon',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? `${subtitle.charAt(0).toUpperCase()}${subtitle.slice(1)}` : '',
      };
    },
  },
};
