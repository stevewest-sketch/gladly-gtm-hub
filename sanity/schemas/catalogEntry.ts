export default {
  name: 'catalogEntry',
  title: 'Catalog Entries',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'classification', title: 'Classification' },
    { name: 'taxonomies', title: 'Taxonomies (Tags)' },
    { name: 'competitive', title: 'Competitive' },
    { name: 'display', title: 'Display Settings' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    // Core Fields - Content Group
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      group: 'content',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: '2-3 sentence summary',
      group: 'content',
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
      group: 'content',
    },

    // Content Classification - Classification Group
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'reference',
      to: [{ type: 'contentType' }],
      description: 'Single selection - Training, E-Learning, Template, Competitive, etc.',
      validation: (Rule: any) => Rule.required(),
      group: 'classification',
    },
    {
      name: 'pageTemplate',
      title: 'Page Template',
      type: 'string',
      options: {
        list: [
          { title: 'Micro-Learning', value: 'micro-learning' },
          { title: 'Battle Card', value: 'battle-card' },
          { title: 'Play', value: 'play' },
          { title: 'Product', value: 'product' },
          { title: 'Training Session', value: 'training-session' },
        ],
      },
      description: 'Template determines page layout and structure',
      validation: (Rule: any) => Rule.required(),
      group: 'classification',
    },
    {
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'Live Replay', value: 'live-replay' },
          { title: 'Async/E-Learning', value: 'async' },
          { title: 'Document', value: 'document' },
          { title: 'Video', value: 'video' },
          { title: 'Article', value: 'article' },
          { title: 'Template', value: 'template' },
        ],
      },
      group: 'classification',
    },

    // TAXONOMIES (MULTI-SELECT ARRAYS) - Taxonomies Group
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Select ALL products this content relates to (multi-select)',
      group: 'taxonomies',
    },
    {
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'team' }] }],
      description: 'Which teams should see this content? (multi-select)',
      group: 'taxonomies',
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
      description: 'Select all relevant topics (multi-select)',
      group: 'taxonomies',
    },
    {
      name: 'journeyStages',
      title: 'Journey Stages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'journeyStage' }] }],
      description: 'Where in the customer lifecycle does this apply? (multi-select)',
      group: 'taxonomies',
    },
    {
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
      description: 'Relevant industries (multi-select)',
      group: 'taxonomies',
    },

    // COE-specific
    {
      name: 'coeCategory',
      title: 'COE Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Proof Points & Best Practices', value: 'proof-points' },
          { title: 'Templates & Reusable Content', value: 'templates' },
          { title: 'In-Product Changes', value: 'in-product-changes' },
        ],
      },
      description: 'For Center of Excellence content only',
      group: 'taxonomies',
    },

    // Competitive-specific - Competitive Group
    {
      name: 'competitor',
      title: 'Primary Competitor',
      type: 'reference',
      to: [{ type: 'competitor' }],
      description: 'Single competitor for battle cards',
      group: 'competitive',
    },
    {
      name: 'relatedCompetitors',
      title: 'Related Competitors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'competitor' }] }],
      description: 'Multiple competitors mentioned in this content',
      group: 'competitive',
    },
    {
      name: 'battleCardFile',
      title: 'Battle Card File',
      type: 'file',
      description: 'PDF battle card file',
      group: 'competitive',
    },
    {
      name: 'quarterlyUpdates',
      title: 'Quarterly Updates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Update Date',
              type: 'datetime',
            },
            {
              name: 'wistiaId',
              title: 'Wistia Video ID',
              type: 'string',
              description: 'Video hosting (may change platform later)',
            },
            {
              name: 'presenter',
              title: 'Presenter',
              type: 'string',
              description: 'e.g., Hans',
            },
            {
              name: 'transcript',
              title: 'Transcript',
              type: 'text',
              rows: 10,
            },
            {
              name: 'whatsNew',
              title: "What's New Highlights",
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Auto-generated or manual highlights',
            },
            {
              name: 'generatedBy',
              title: 'Generated By',
              type: 'string',
              options: {
                list: [
                  { title: 'Auto-generated', value: 'auto' },
                  { title: 'Manual', value: 'manual' },
                ],
              },
              initialValue: 'manual',
            },
          ],
        },
      ],
      description: 'For competitive battle cards - quarterly video updates',
      group: 'competitive',
    },

    // Metadata - Metadata Group
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      group: 'metadata',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'metadata',
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'For training/video content',
      group: 'metadata',
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      group: 'metadata',
    },
    {
      name: 'presenter',
      title: 'Presenter',
      type: 'string',
      description: 'For training content',
      group: 'metadata',
    },

    // Content Assets - Content Group
    {
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Recommended: 1200x630px',
      group: 'content',
    },
    {
      name: 'mainContent',
      title: 'Main Content',
      type: 'object',
      fields: [
        {
          name: 'transcript',
          title: 'Transcript',
          type: 'text',
          rows: 10,
        },
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
        },
        {
          name: 'wistiaId',
          title: 'Wistia Video ID',
          type: 'string',
          description: 'Wistia-specific ID (hosting platform may change)',
        },
        {
          name: 'documentUrl',
          title: 'Document URL',
          type: 'url',
        },
        {
          name: 'slidesDeck',
          title: 'Slides Deck',
          type: 'file',
          description: 'Upload PowerPoint, PDF, etc.',
        },
        {
          name: 'additionalResources',
          title: 'Additional Resources',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Resource Title',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                },
                {
                  name: 'type',
                  title: 'Type',
                  type: 'string',
                  options: {
                    list: ['link', 'download', 'external'],
                  },
                },
              ],
            },
          ],
        },
      ],
      group: 'content',
    },

    // Key Takeaways - Content Group
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      description: '2-5 bullet points of key takeaways',
      group: 'content',
    },

    // Dual View Support - Content Group
    {
      name: 'hasHowToUse',
      title: 'Has "How to Use" Tab',
      type: 'boolean',
      description: 'Enable dual-view with Content / How to Use tabs',
      initialValue: false,
      group: 'content',
    },
    {
      name: 'howToUseContent',
      title: 'How to Use Content',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'sections',
          title: 'Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'heading',
                  title: 'Heading',
                  type: 'string',
                },
                {
                  name: 'content',
                  title: 'Content',
                  type: 'text',
                  rows: 5,
                },
                {
                  name: 'examples',
                  title: 'Examples',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
      ],
      hidden: ({ parent }: any) => !parent?.hasHowToUse,
      group: 'content',
    },

    // Display Preferences - Display Group
    {
      name: 'featured',
      title: 'Featured Content',
      type: 'boolean',
      description: 'Show in featured sections',
      initialValue: false,
      group: 'display',
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers appear first (0-100)',
      initialValue: 50,
      validation: (Rule: any) => Rule.min(0).max(100),
      group: 'display',
    },
    {
      name: 'showInUpcoming',
      title: 'Show in "Just Released"',
      type: 'boolean',
      description: 'Display in "Just Released" / "What\'s New" strips',
      initialValue: false,
      group: 'display',
    },

    // Visibility & Status - Display Group
    {
      name: 'publishedTo',
      title: 'Published To',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Training Hub', value: 'training' },
          { title: 'COE Hub', value: 'coe' },
          { title: 'Content Hub', value: 'content' },
          { title: 'Customer Lifecycle', value: 'customer-lifecycle' },
          { title: 'All Pages', value: 'all' },
        ],
      },
      description: 'Which hubs can display this? (empty = all hubs)',
      group: 'display',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Submitted for Review', value: 'submitted' },
          { title: 'In Review', value: 'in-review' },
          { title: 'Approved', value: 'approved' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule: any) => Rule.required(),
      group: 'display',
    },
  ],
  preview: {
    select: {
      title: 'title',
      contentType: 'contentType.name',
      status: 'status',
      media: 'thumbnailImage',
      publishDate: 'publishDate',
    },
    prepare(selection: any) {
      const { title, contentType, status, media, publishDate } = selection;
      const date = publishDate ? new Date(publishDate).toLocaleDateString() : '';
      return {
        title: title,
        subtitle: `${contentType || 'No type'} • ${status} ${date ? `• ${date}` : ''}`,
        media: media,
      };
    },
  },
}
