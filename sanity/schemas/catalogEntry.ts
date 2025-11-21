export default {
  name: 'catalogEntry',
  title: 'Catalog Entries',
  type: 'document',
  groups: [
    { name: 'basics', title: '📝 Basics', default: true },
    { name: 'content', title: '💎 Content' },
    { name: 'tagging', title: '🏷️ Tagging' },
    { name: 'publishing', title: '🚀 Publishing' },
    { name: 'advanced', title: '⚙️ Advanced' },
  ],
  fieldsets: [
    {
      name: 'contentClassification',
      title: 'Content Classification',
      description: 'How should this content be categorized and displayed?',
      options: { collapsible: false },
    },
    {
      name: 'targetingCore',
      title: 'Core Targeting (Most Common)',
      description: 'Who should see this and where?',
      options: { collapsible: false },
    },
    {
      name: 'targetingAdditional',
      title: 'Additional Targeting (Optional)',
      description: 'Add more specific targeting if needed',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'publishSettings',
      title: 'Publish Settings',
      description: 'Control visibility and status',
      options: { collapsible: false },
    },
    {
      name: 'displayOptions',
      title: 'Display Options',
      description: 'Featured content and priority',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ========================================
    // BASICS TAB
    // ========================================
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Clear, descriptive title for this content',
      group: 'basics',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Auto-generated from title - this creates the URL',
      group: 'basics',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: '2-3 sentence summary that appears in cards and previews',
      group: 'basics',
    },

    // Content Classification Fieldset
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'reference',
      to: [{ type: 'contentType' }],
      description: 'What kind of content is this? (Training, Template, Guide, etc.)',
      validation: (Rule: any) => Rule.required(),
      fieldset: 'contentClassification',
      group: 'basics',
    },
    {
      name: 'pageTemplate',
      title: 'Page Template',
      type: 'string',
      options: {
        list: [
          { title: '🎓 Training Session', value: 'training-session' },
          { title: '📚 Micro-Learning', value: 'micro-learning' },
          { title: '⚔️ Battle Card', value: 'battle-card' },
          { title: '🎯 Play', value: 'play' },
          { title: '📦 Product', value: 'product' },
        ],
      },
      description: 'Template determines page layout',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'training-session',
      fieldset: 'contentClassification',
      group: 'basics',
    },
    {
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: '🎥 Live Replay', value: 'live-replay' },
          { title: '💻 Async/E-Learning', value: 'async' },
          { title: '📄 Document', value: 'document' },
          { title: '🎬 Video', value: 'video' },
          { title: '📝 Article', value: 'article' },
          { title: '📋 Template', value: 'template' },
        ],
      },
      description: 'How is this content delivered?',
      fieldset: 'contentClassification',
      group: 'basics',
    },

    // ========================================
    // CONTENT TAB
    // ========================================
    {
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Card thumbnail (recommended: 1200x630px)',
      group: 'content',
    },
    {
      name: 'externalUrl',
      title: 'External Link (Optional)',
      type: 'url',
      description: '🔗 If this content lives elsewhere (Google Drive, Docs, etc.), paste the link here. The card will link directly to this URL instead of creating a detail page.',
      group: 'content',
      validation: (Rule: any) => Rule.uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'mainContent',
      title: 'Main Content',
      type: 'object',
      description: 'The actual content - videos, documents, transcripts',
      options: { collapsible: false },
      fields: [
        {
          name: 'videoUrl',
          title: '🎥 Video URL',
          type: 'url',
          description: 'YouTube, Vimeo, or other video link',
        },
        {
          name: 'wistiaId',
          title: 'Wistia Video ID',
          type: 'string',
          description: 'If using Wistia hosting',
        },
        {
          name: 'documentUrl',
          title: '📄 Document URL',
          type: 'url',
          description: 'Google Docs, Slides, or other document link',
        },
        {
          name: 'slidesDeck',
          title: '📊 Slides File',
          type: 'file',
          description: 'Upload PowerPoint, PDF, etc.',
        },
        {
          name: 'transcript',
          title: '📝 Transcript',
          type: 'text',
          rows: 8,
          description: 'Full transcript of video/presentation',
        },
        {
          name: 'additionalResources',
          title: '🔗 Additional Resources',
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
    {
      name: 'keyTakeaways',
      title: '⭐ Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3-5 bullet points of main learnings',
      group: 'content',
    },
    {
      name: 'duration',
      title: '⏱️ Duration (minutes)',
      type: 'number',
      description: 'For videos/training content',
      group: 'content',
    },
    {
      name: 'difficulty',
      title: '📊 Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Beginner', value: 'beginner' },
          { title: '🟡 Intermediate', value: 'intermediate' },
          { title: '🔴 Advanced', value: 'advanced' },
        ],
      },
      group: 'content',
    },
    {
      name: 'presenter',
      title: '👤 Presenter/Author',
      type: 'string',
      description: 'Who created or presented this?',
      group: 'content',
    },

    // Additional Content Blocks
    {
      name: 'contentBlocks',
      title: '📦 Additional Content Blocks',
      type: 'array',
      description: 'Add flexible content sections (How to Use, FAQs, Step-by-Step guides, etc.)',
      of: [
        {
          type: 'object',
          name: 'contentBlock',
          title: 'Content Block',
          fields: [
            {
              name: 'blockType',
              title: 'Block Type',
              type: 'string',
              options: {
                list: [
                  { title: '📝 Rich Text Section', value: 'richText' },
                  { title: '📋 Step-by-Step Guide', value: 'stepByStep' },
                  { title: '❓ FAQ', value: 'faq' },
                  { title: '💡 Tips & Best Practices', value: 'tips' },
                  { title: '⚠️ Common Mistakes', value: 'mistakes' },
                  { title: '🎯 Use Cases', value: 'useCases' },
                  { title: '🔧 How to Use', value: 'howToUse' },
                  { title: '📊 Data/Stats', value: 'dataStats' },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'e.g., "How to Use This Feature", "Common Questions"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Rich Text Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Underline', value: 'underline' },
                      { title: 'Strike', value: 'strike-through' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                      {
                        name: 'highlight',
                        type: 'object',
                        title: 'Highlight',
                        fields: [
                          {
                            name: 'color',
                            type: 'string',
                            title: 'Highlight Color',
                            options: {
                              list: [
                                { title: 'Yellow', value: 'yellow' },
                                { title: 'Green', value: 'green' },
                                { title: 'Blue', value: 'blue' },
                                { title: 'Purple', value: 'purple' },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    },
                  ],
                },
              ],
              hidden: ({ parent }: any) => parent?.blockType === 'stepByStep' || parent?.blockType === 'faq',
            },
            // Step-by-Step specific fields
            {
              name: 'steps',
              title: 'Steps',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'stepTitle',
                      title: 'Step Title',
                      type: 'string',
                    },
                    {
                      name: 'stepDescription',
                      title: 'Step Description',
                      type: 'text',
                      rows: 3,
                    },
                    {
                      name: 'stepImage',
                      title: 'Step Image (Optional)',
                      type: 'image',
                      options: { hotspot: true },
                    },
                  ],
                  preview: {
                    select: {
                      title: 'stepTitle',
                      subtitle: 'stepDescription',
                      media: 'stepImage',
                    },
                  },
                },
              ],
              hidden: ({ parent }: any) => parent?.blockType !== 'stepByStep',
            },
            // FAQ specific fields
            {
              name: 'faqs',
              title: 'Questions & Answers',
              type: 'array',
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
                      type: 'text',
                      rows: 4,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'question',
                      subtitle: 'answer',
                    },
                  },
                },
              ],
              hidden: ({ parent }: any) => parent?.blockType !== 'faq',
            },
            // Collapsible option
            {
              name: 'collapsible',
              title: 'Make Collapsible',
              type: 'boolean',
              description: 'Allow users to expand/collapse this section',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              blockType: 'blockType',
            },
            prepare({ title, blockType }: any) {
              const icons: any = {
                richText: '📝',
                stepByStep: '📋',
                faq: '❓',
                tips: '💡',
                mistakes: '⚠️',
                useCases: '🎯',
                howToUse: '🔧',
                dataStats: '📊',
              }
              return {
                title: title || 'Untitled Block',
                subtitle: `${icons[blockType] || '📦'} ${blockType}`,
              }
            },
          },
        },
      ],
      group: 'content',
    },

    // ========================================
    // TAGGING TAB
    // ========================================

    // Core Targeting Fieldset
    {
      name: 'audiences',
      title: '👥 Audiences',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'audience' }] }],
      description: 'Who is this for? (Sales, CSM, SC, All Teams, etc.)',
      fieldset: 'targetingCore',
      group: 'tagging',
    },
    {
      name: 'learningPaths',
      title: '🎓 Learning Paths',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'learningPath' }] }],
      description: 'Add to curated learning paths (New Hire Onboarding, Product Mastery, etc.)',
      fieldset: 'targetingCore',
      group: 'tagging',
    },
    {
      name: 'enablementCategory',
      title: '📂 Enablement Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🎓 Learning', value: 'Learning' },
          { title: '📦 Product', value: 'Product' },
          { title: '🛠️ Toolkit', value: 'Toolkit' },
          { title: '⚔️ Competitive', value: 'Competitive' },
          { title: '🎯 CoE', value: 'CoE' },
          { title: '📚 Resources', value: 'Resources' },
        ],
      },
      description: 'Filter categories for Enablement Hub',
      fieldset: 'targetingCore',
      group: 'tagging',
    },

    // Additional Targeting Fieldset (Collapsed by default)
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Which products does this relate to?',
      fieldset: 'targetingAdditional',
      group: 'tagging',
    },
    {
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'team' }] }],
      description: 'Which teams should see this?',
      fieldset: 'targetingAdditional',
      group: 'tagging',
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
      description: 'Related topics',
      fieldset: 'targetingAdditional',
      group: 'tagging',
    },
    {
      name: 'journeyStages',
      title: 'Journey Stages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'journeyStage' }] }],
      description: 'Customer lifecycle stages',
      fieldset: 'targetingAdditional',
      group: 'tagging',
    },
    {
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
      description: 'Relevant industries',
      fieldset: 'targetingAdditional',
      group: 'tagging',
    },

    // Other Hub Categories (Collapsed)
    {
      name: 'coeCategory',
      title: 'COE Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Proof Points & Best Practices', value: 'proof-points' },
          { title: 'Templates & Reusable Content', value: 'templates' },
          { title: 'In-Product Changes', value: 'in-product-changes' },
        ],
      },
      description: 'For COE Hub content',
      hidden: ({ document }: any) => !document?.publishedTo?.includes('coe'),
      group: 'tagging',
    },
    {
      name: 'salesCategory',
      title: 'Sales Playbook Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Discovery Plays', value: 'discovery' },
          { title: 'Demo Scripts', value: 'demo' },
          { title: 'Objection Handling', value: 'objections' },
          { title: 'Negotiation Tactics', value: 'negotiation' },
          { title: 'Closing Techniques', value: 'closing' },
          { title: 'Upsell Strategies', value: 'upsell' },
        ],
      },
      description: 'For Sales Hub content',
      hidden: ({ document }: any) => !document?.publishedTo?.includes('content'),
      group: 'tagging',
    },

    // ========================================
    // PUBLISHING TAB
    // ========================================

    // Publish Settings Fieldset
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '📝 Draft', value: 'draft' },
          { title: '📤 Submitted for Review', value: 'submitted' },
          { title: '👀 In Review', value: 'in-review' },
          { title: '✅ Approved', value: 'approved' },
          { title: '🚀 Published', value: 'published' },
          { title: '📦 Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule: any) => Rule.required(),
      fieldset: 'publishSettings',
      group: 'publishing',
    },
    {
      name: 'publishedTo',
      title: 'Published To',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🎓 Enablement Hub', value: 'enablement' },
          { title: '📚 Content Hub', value: 'content' },
          { title: '🎯 COE Hub', value: 'coe' },
          { title: '🏋️ Training Hub', value: 'training' },
          { title: '🔄 Customer Lifecycle', value: 'customer-lifecycle' },
          { title: '🌐 All Hubs', value: 'all' },
        ],
      },
      description: '⚠️ IMPORTANT: Select which hubs should display this content',
      validation: (Rule: any) => Rule.required().min(1).error('You must select at least one hub'),
      fieldset: 'publishSettings',
      group: 'publishing',
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'When was this published?',
      fieldset: 'publishSettings',
      group: 'publishing',
    },

    // Display Options Fieldset
    {
      name: 'featured',
      title: '⭐ Featured Content',
      type: 'boolean',
      description: 'Show in featured sections',
      initialValue: false,
      fieldset: 'displayOptions',
      group: 'publishing',
    },
    {
      name: 'priority',
      title: '📊 Priority (0-100)',
      type: 'number',
      description: 'Higher numbers appear first in featured sections',
      initialValue: 50,
      validation: (Rule: any) => Rule.min(0).max(100),
      fieldset: 'displayOptions',
      group: 'publishing',
    },
    {
      name: 'showInUpcoming',
      title: '🆕 Show in "New" Section',
      type: 'boolean',
      description: 'Display in "Recently Added" sections',
      initialValue: false,
      fieldset: 'displayOptions',
      group: 'publishing',
    },

    // ========================================
    // ADVANCED TAB
    // ========================================

    // Competitive Battle Card Features
    {
      name: 'competitor',
      title: '🥊 Primary Competitor',
      type: 'reference',
      to: [{ type: 'competitor' }],
      description: 'For battle cards - single competitor focus',
      group: 'advanced',
    },
    {
      name: 'relatedCompetitors',
      title: '🥊 Related Competitors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'competitor' }] }],
      description: 'Multiple competitors mentioned',
      group: 'advanced',
    },
    {
      name: 'battleCardFile',
      title: '📄 Battle Card PDF',
      type: 'file',
      description: 'Upload PDF battle card',
      group: 'advanced',
    },
    {
      name: 'quarterlyUpdates',
      title: '📅 Quarterly Updates',
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
            },
            {
              name: 'presenter',
              title: 'Presenter',
              type: 'string',
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
            },
          ],
        },
      ],
      description: 'For competitive battle cards - video updates',
      group: 'advanced',
    },

    // Dual View Support
    {
      name: 'hasHowToUse',
      title: '📖 Enable "How to Use" Tab',
      type: 'boolean',
      description: 'Add a separate "How to Use" view with instructions',
      initialValue: false,
      group: 'advanced',
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
      group: 'advanced',
    },

    // Additional Metadata
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When was this content last modified?',
      group: 'advanced',
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

      // Status emoji
      const statusEmoji = {
        draft: '📝',
        submitted: '📤',
        'in-review': '👀',
        approved: '✅',
        published: '🚀',
        archived: '📦',
      }[status] || '📄';

      return {
        title: title,
        subtitle: `${statusEmoji} ${status} • ${contentType || 'No type'} ${date ? `• ${date}` : ''}`,
        media: media,
      };
    },
  },
}
