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
    // Flexible Page Sections
    // ========================================
    {
      name: 'pageSections',
      title: '📄 Page Sections',
      type: 'array',
      description: 'Build your page with flexible, orderable sections. Drag to reorder.',
      of: [{ type: 'pageSection' }],
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
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
      hidden: ({ parent }: any) => parent?.pageTemplate !== 'training-session',
      of: [{
        type: 'object',
        name: 'trainingModule',
        title: 'Training Module',
        fields: [
          { name: 'moduleNumber', title: '#', type: 'number', validation: (Rule: any) => Rule.min(1) },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
          { name: 'videoUrl', title: 'Video URL', type: 'url' },
          { name: 'duration', title: 'Duration', type: 'string' },
        ],
        preview: {
          select: { num: 'moduleNumber', title: 'title', duration: 'duration' },
          prepare({ num, title, duration }: any) {
            return { title: `${num || ''}. ${title || 'Untitled'}`, subtitle: duration }
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
      description: 'Which product(s) does this content relate to?',
      group: 'publish',
    },

    {
      name: 'enablementCategory',
      title: 'Enablement Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Product', value: 'Product' },
          { title: 'GTM Strategy', value: 'GTM Strategy' },
          { title: 'Internal Ops', value: 'Internal Ops' },
          { title: 'Competitive', value: 'Competitive' },
          { title: 'Technical', value: 'Technical' },
          { title: 'Partner', value: 'Partner' },
          { title: 'Value Realization', value: 'Value Realization' },
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
