export default {
  name: 'catalogEntry',
  title: 'Catalog Entries',
  type: 'document',
  groups: [
    { name: 'create', title: '✨ Create', default: true },
    { name: 'content', title: '📝 Content' },
    { name: 'resources', title: '📦 Resources' },
    { name: 'publish', title: '🚀 Publish' },
  ],
  fields: [
    // ========================================
    // CREATE TAB - Hub Selection & AI Processing
    // ========================================

    // Step 1: Choose which hub
    {
      name: 'publishedTo',
      title: 'Where does this live?',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '📚 Content Hub', value: 'content' },
          { title: '🎓 Enablement Hub', value: 'enablement' },
        ],
        layout: 'grid',
      },
      description: 'Select which hub(s) this content should appear in',
      validation: (Rule: any) => Rule.required().min(1),
      group: 'create',
    },

    // Step 2: Enablement-specific - Template type
    {
      name: 'pageTemplate',
      title: 'Page Template',
      type: 'string',
      options: {
        list: [
          { title: '📺 Training — Session recording + takeaways', value: 'training' },
          { title: '📋 Playbook — How-to guide with assets', value: 'playbook' },
          { title: '⚔️ Battle Card — Competitive positioning', value: 'battle-card' },
        ],
        layout: 'radio',
      },
      description: 'How should this content be displayed?',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.publishedTo?.includes('enablement') && !value) {
          return 'Template is required for Enablement Hub content'
        }
        return true
      }),
      group: 'create',
    },

    // Step 3: AI Content Generation
    {
      name: 'aiInput',
      title: '🤖 AI Content Generation',
      type: 'object',
      description: 'Upload content and let AI generate fields, or edit existing content with AI',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'inputMode',
          title: 'How do you want to create content?',
          type: 'string',
          options: {
            list: [
              { title: '📝 Paste transcript/document', value: 'paste' },
              { title: '✏️ Manual entry', value: 'manual' },
              { title: '🔄 Edit with AI', value: 'edit' },
            ],
            layout: 'radio',
          },
          initialValue: 'manual',
        },
        {
          name: 'rawContent',
          title: 'Paste your content here',
          type: 'text',
          rows: 10,
          description: 'Transcript, document, or description. AI will generate title, description, takeaways, etc.',
          hidden: ({ parent }: any) => parent?.inputMode !== 'paste',
        },
        {
          name: 'editPrompt',
          title: 'What should AI change?',
          type: 'text',
          rows: 3,
          description: 'Describe what you want to update. AI will edit only those fields while preserving the rest.',
          hidden: ({ parent }: any) => parent?.inputMode !== 'edit',
        },
        {
          name: 'preserveFields',
          title: 'Fields to preserve (AI won\'t change these)',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Title', value: 'title' },
              { title: 'Description', value: 'description' },
              { title: 'Key Takeaways', value: 'keyTakeaways' },
              { title: 'How-To Steps', value: 'articleSections' },
              { title: 'Action Items', value: 'actionItems' },
              { title: 'FAQs', value: 'faqs' },
            ],
          },
          hidden: ({ parent }: any) => parent?.inputMode !== 'edit',
        },
      ],
      group: 'create',
    },

    // ========================================
    // CONTENT TAB - Core Fields
    // ========================================

    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      group: 'content',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
      group: 'content',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: '1-2 sentences for card preview',
      group: 'content',
    },

    // Content Hub only - External Link
    {
      name: 'externalUrl',
      title: 'External Link',
      type: 'url',
      description: 'Where does this link to? (Google Drive, Docs, etc.)',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('content') || parent?.publishedTo?.includes('enablement'),
      group: 'content',
    },

    // Content Hub - Content Type reference
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'reference',
      to: [{ type: 'contentType' }],
      description: 'Template, Guide, Training, etc.',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('content'),
      group: 'content',
    },

    // ========================================
    // NEW: Flexible Page Sections (replaces scattered fields)
    // ========================================
    {
      name: 'pageSections',
      title: '📄 Page Sections (NEW - Recommended)',
      type: 'array',
      description: '🎯 Build your page with flexible, orderable sections. Drag to reorder. This replaces keyTakeaways, actionItems, articleSections, and contentBlocks.',
      of: [{ type: 'pageSection' }],
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'content',
    },

    // Enablement - Key Takeaways (LEGACY - use pageSections instead)
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways (LEGACY)',
      type: 'array',
      of: [{ type: 'string' }],
      description: '⚠️ LEGACY: Use Page Sections instead for better control',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'content',
    },

    // Enablement - How-To Steps (for Playbooks) (LEGACY)
    {
      name: 'articleSections',
      title: 'How-To Steps (LEGACY)',
      type: 'array',
      description: '⚠️ LEGACY: Use Page Sections instead for better control',
      hidden: ({ parent }: any) => parent?.pageTemplate !== 'playbook',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Step Name', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'content', title: 'Instructions', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
          ],
          preview: {
            select: { title: 'heading', subtitle: 'content' },
            prepare({ title, subtitle }: any) {
              return { title, subtitle: subtitle?.slice(0, 60) + '...' }
            },
          },
        },
      ],
      group: 'content',
    },

    // Enablement - Action Items (Tips & Pitfalls) (LEGACY)
    {
      name: 'actionItems',
      title: 'Tips & Pitfalls (LEGACY)',
      type: 'array',
      of: [{ type: 'string' }],
      description: '⚠️ LEGACY: Use Page Sections instead for better control',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'content',
    },

    // Enablement - Content Blocks (FAQs, Assets, Checklists) (LEGACY)
    {
      name: 'contentBlocks',
      title: 'Additional Sections (LEGACY)',
      type: 'array',
      description: '⚠️ LEGACY: Use Page Sections instead for better control',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      of: [
        {
          type: 'object',
          name: 'contentBlock',
          fields: [
            {
              name: 'blockType',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  { title: '❓ FAQs', value: 'faq' },
                  { title: '📦 Assets', value: 'assets' },
                  { title: '✅ Checklist', value: 'checklist' },
                  { title: '📝 Text', value: 'text' },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'description', title: 'Section Description', type: 'string', hidden: ({ parent }: any) => parent?.blockType !== 'checklist' },
            { name: 'content', title: 'Content', type: 'text', rows: 4, hidden: ({ parent }: any) => parent?.blockType !== 'text' },
            {
              name: 'faqs',
              title: 'Q&A Items',
              type: 'array',
              hidden: ({ parent }: any) => parent?.blockType !== 'faq',
              of: [{
                type: 'object',
                fields: [
                  { name: 'question', title: 'Question', type: 'string' },
                  { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
                ],
                preview: { select: { title: 'question', subtitle: 'answer' } },
              }],
            },
            {
              name: 'items',
              title: 'Asset Items',
              type: 'array',
              hidden: ({ parent }: any) => parent?.blockType !== 'assets',
              of: [{
                type: 'object',
                fields: [
                  { name: 'icon', title: 'Icon', type: 'string', description: 'Emoji icon' },
                  { name: 'title', title: 'Asset Name', type: 'string' },
                  { name: 'description', title: 'Description', type: 'string' },
                  { name: 'url', title: 'Link', type: 'url' },
                ],
                preview: { select: { title: 'title', subtitle: 'description' } },
              }],
            },
            {
              name: 'columns',
              title: 'Checklist Columns',
              type: 'array',
              hidden: ({ parent }: any) => parent?.blockType !== 'checklist',
              of: [{
                type: 'object',
                fields: [
                  { name: 'title', title: 'Column Title', type: 'string' },
                  { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
                ],
                preview: { select: { title: 'title' } },
              }],
            },
          ],
          preview: {
            select: { title: 'title', blockType: 'blockType' },
            prepare({ title, blockType }: any) {
              const icons: any = { faq: '❓', assets: '📦', checklist: '✅', text: '📝' }
              return { title: title || blockType, subtitle: `${icons[blockType] || '📦'} ${blockType}` }
            },
          },
        },
      ],
      group: 'content',
    },

    // ========================================
    // RESOURCES TAB - Links & Assets
    // ========================================

    {
      name: 'resourceLinks',
      title: 'Session Materials',
      type: 'object',
      description: 'Links to recording, slides, transcript',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      options: { collapsible: false },
      fields: [
        { name: 'videoUrl', title: '🎥 Recording URL', type: 'url' },
        { name: 'slidesUrl', title: '📊 Slides URL', type: 'url' },
        { name: 'transcriptUrl', title: '📄 Transcript URL', type: 'url' },
        { name: 'keyAssetUrl', title: '📦 Primary Asset URL', type: 'url' },
        { name: 'keyAssetLabel', title: 'Primary Asset Label', type: 'string', description: 'e.g., "First Meeting Deck 2.0"' },
      ],
      group: 'resources',
    },

    {
      name: 'modules',
      title: 'Training Modules',
      type: 'array',
      description: 'For multi-part training series',
      hidden: ({ parent }: any) => parent?.pageTemplate !== 'training',
      of: [{
        type: 'object',
        fields: [
          { name: 'moduleNumber', title: '#', type: 'number', validation: (Rule: any) => Rule.required().min(1) },
          { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
          { name: 'videoUrl', title: 'Video URL', type: 'url' },
          { name: 'duration', title: 'Duration', type: 'string' },
        ],
        preview: {
          select: { num: 'moduleNumber', title: 'title', duration: 'duration' },
          prepare({ num, title, duration }: any) {
            return { title: `${num}. ${title}`, subtitle: duration }
          },
        },
      }],
      group: 'resources',
    },

    {
      name: 'keyAssets',
      title: 'Key Assets',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'catalogEntry' }] }],
      description: 'Link to Content Hub items (decks, templates) to show as assets',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'resources',
    },

    {
      name: 'relatedContent',
      title: 'Related Content',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'catalogEntry' }] }],
      description: 'Related enablement articles',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'resources',
    },

    // ========================================
    // PUBLISH TAB - Metadata & Publishing
    // ========================================

    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '📝 Draft', value: 'draft' },
          { title: '🚀 Published', value: 'published' },
          { title: '📦 Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule: any) => Rule.required(),
      group: 'publish',
    },

    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'publish',
    },

    {
      name: 'presenter',
      title: 'Author / Presenter',
      type: 'string',
      group: 'publish',
    },

    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "45 min" or "5 min read"',
      group: 'publish',
    },

    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      group: 'publish',
    },

    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured sections',
      initialValue: false,
      group: 'publish',
    },

    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher = appears first (0-100)',
      initialValue: 50,
      validation: (Rule: any) => Rule.min(0).max(100),
      group: 'publish',
    },

    // Tagging
    {
      name: 'audiences',
      title: 'Audiences',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'audience' }] }],
      description: 'Who is this for?',
      group: 'publish',
    },

    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'publish',
    },

    {
      name: 'enablementCategory',
      title: 'Enablement Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Learning', value: 'Learning' },
          { title: 'Product', value: 'Product' },
          { title: 'Toolkit', value: 'Toolkit' },
          { title: 'Competitive', value: 'Competitive' },
          { title: 'Playbook', value: 'Playbook' },
        ],
      },
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'publish',
    },

    // Battle Card specific
    {
      name: 'competitor',
      title: 'Competitor',
      type: 'reference',
      to: [{ type: 'competitor' }],
      hidden: ({ parent }: any) => parent?.pageTemplate !== 'battle-card',
      group: 'publish',
    },

    // Legacy fields for backwards compatibility (hidden)
    {
      name: 'cardType',
      title: 'Card Type (Legacy)',
      type: 'string',
      hidden: true,
    },
    {
      name: 'format',
      title: 'Format (Legacy)',
      type: 'string',
      hidden: true,
    },
    {
      name: 'thumbnailImage',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      group: 'publish',
    },
    {
      name: 'mainContent',
      title: 'Main Content (Legacy)',
      type: 'object',
      hidden: true,
      fields: [
        { name: 'videoUrl', type: 'url' },
        { name: 'wistiaId', type: 'string' },
        { name: 'documentUrl', type: 'url' },
        { name: 'transcript', type: 'text' },
      ],
    },
    // View count - tracked automatically
    {
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      description: 'Number of views (updated automatically)',
      initialValue: 0,
      readOnly: true,
      group: 'publish',
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedTo: 'publishedTo',
      pageTemplate: 'pageTemplate',
      status: 'status',
      media: 'thumbnailImage',
    },
    prepare(selection: any) {
      const { title, publishedTo, pageTemplate, status, media } = selection

      const hubIcon = publishedTo?.includes('enablement') ? '🎓' : '📚'
      const templateIcon: Record<string, string> = {
        'training': '📺',
        'playbook': '📋',
        'battle-card': '⚔️',
      }
      const statusIcon: Record<string, string> = {
        draft: '📝',
        published: '🚀',
        archived: '📦',
      }

      const typeIcon = pageTemplate ? templateIcon[pageTemplate] || hubIcon : hubIcon
      const stIcon = statusIcon[status] || '📝'

      return {
        title: `${typeIcon} ${title}`,
        subtitle: `${stIcon} ${status}`,
        media,
      }
    },
  },
}
