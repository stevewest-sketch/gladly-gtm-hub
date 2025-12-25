import CollectionSubsectionInput from '../components/CollectionSubsectionInput'

export default {
  name: 'catalogEntry',
  title: 'Catalog Entries',
  type: 'document',
  groups: [
    { name: 'create', title: '✨ Create', default: true },
    { name: 'content', title: '📝 Content' },
    { name: 'links', title: '🔗 Links' },
    { name: 'resources', title: '📦 Resources' },
    { name: 'publish', title: '🚀 Publish' },
  ],
  fields: [
    // ========================================
    // CREATE TAB - Hub Selection & Format
    // ========================================

    {
      name: 'publishedTo',
      title: 'Where does this live?',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '📚 Content Hub', value: 'content' },
          { title: '🎓 Enablement Hub', value: 'enablement' },
          { title: '🏆 CoE Hub', value: 'coe' },
          { title: '✨ Curated Hub', value: 'curated' },
        ],
        layout: 'grid',
      },
      description: 'Select which hub(s) this content should appear in',
      validation: (Rule: any) => Rule.required().min(1),
      group: 'create',
    },

    {
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: '📄 Document', value: 'document' },
          { title: '📊 Slides', value: 'slides' },
          { title: '🎬 Video', value: 'video' },
          { title: '📋 One-Pager', value: 'one-pager' },
          { title: '⚔️ Battle Card', value: 'battlecard' },
          { title: '🔍 Competitive', value: 'competitive' },
          { title: '📖 Guide', value: 'guide' },
          { title: '💬 Messaging', value: 'messaging' },
          { title: '🤝 Meeting Asset', value: 'meeting-asset' },
          { title: '🎯 Playbook', value: 'playbook' },
          { title: '🧪 Prototype', value: 'prototype' },
          { title: '🛠️ Tool', value: 'tool' },
          { title: '🎥 Live Replay', value: 'live-replay' },
          { title: '📺 On-Demand', value: 'on-demand' },
        ],
        layout: 'dropdown',
      },
      description: 'What type of content is this?',
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

    // Session Date for Live Replays
    {
      name: 'sessionDate',
      title: 'Session Date',
      type: 'date',
      description: 'Date of the enablement session (shown on card)',
      hidden: ({ parent }: any) => parent?.format !== 'live-replay' && parent?.format !== 'on-demand',
      options: {
        dateFormat: 'M/D/YY',
      },
      group: 'content',
    },

    // Customer Logo for Meeting Assets
    {
      name: 'customerLogoUrl',
      title: 'Customer Logo URL',
      type: 'url',
      description: 'URL to customer logo image (for meeting assets)',
      hidden: ({ parent }: any) => parent?.format !== 'meeting-asset',
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
    // LINKS TAB - URL Hierarchy
    // ========================================

    {
      name: 'externalUrl',
      title: '🔗 Primary Link',
      type: 'url',
      description: 'Main link - for single documents, this is where users go. For Live Replays, this is the folder link.',
      group: 'links',
    },

    {
      name: 'videoUrl',
      title: '🎥 Video / Recording URL',
      type: 'url',
      description: 'Link to video recording (Wistia, Google Drive, etc.)',
      group: 'links',
    },

    {
      name: 'slidesUrl',
      title: '📊 Slides URL',
      type: 'url',
      description: 'Link to presentation slides',
      group: 'links',
    },

    {
      name: 'keyAssetUrl',
      title: '📦 Key Asset URL',
      type: 'url',
      description: 'Additional important asset (e.g., template, calculator)',
      group: 'links',
    },

    {
      name: 'keyAssetLabel',
      title: 'Key Asset Label',
      type: 'string',
      description: 'Label for the key asset button (e.g., "First Meeting Deck 2.0")',
      hidden: ({ parent }: any) => !parent?.keyAssetUrl,
      group: 'links',
    },

    {
      name: 'transcriptUrl',
      title: '📄 Transcript URL',
      type: 'url',
      description: 'Link to transcript or notes document',
      group: 'links',
    },

    // ========================================
    // Page Sections (Enablement only)
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
    // Page Theme (Enablement only)
    // ========================================
    {
      name: 'pageTheme',
      title: '🎨 Page Theme',
      type: 'string',
      description: 'Color theme for the detail page header and accents',
      options: {
        list: [
          { title: '🟢 Green (Default)', value: 'green' },
          { title: '🔵 Blue', value: 'blue' },
          { title: '🟣 Purple', value: 'purple' },
          { title: '🟠 Orange', value: 'orange' },
          { title: '🔴 Rose', value: 'rose' },
          { title: '🌊 Teal', value: 'teal' },
          { title: '⚫ Slate', value: 'slate' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'green',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'content',
    },

    // ========================================
    // RESOURCES TAB - Related Content
    // ========================================

    {
      name: 'modules',
      title: 'Training Modules',
      type: 'array',
      description: 'For multi-part training series',
      hidden: ({ parent }: any) => parent?.format !== 'on-demand',
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
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '💼 Sales', value: 'sales' },
          { title: '🤝 Customer Success', value: 'customer-success' },
          { title: '🚀 Implementation', value: 'implementation' },
          { title: '🎯 Solutions Consultant', value: 'solutions-consultant' },
          { title: '🛠️ Professional Services', value: 'ps' },
        ],
        layout: 'grid',
      },
      description: 'Which team(s) is this content for?',
      group: 'publish',
    },

    {
      name: 'enablementCategory',
      title: 'Enablement Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '📦 Product', value: 'product' },
          { title: '🎯 GTM Strategy', value: 'gtm-strategy' },
          { title: '⚙️ Internal Ops', value: 'internal-ops' },
          { title: '⚔️ Competitive', value: 'competitive' },
          { title: '🔧 Technical', value: 'technical' },
          { title: '🤝 Partner', value: 'partner' },
          { title: '💰 Value Realization', value: 'value-realization' },
        ],
      },
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      group: 'publish',
    },

    {
      name: 'coeType',
      title: 'CoE Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '⭐ Internal Best Practice', value: 'internal-best-practice' },
          { title: '🔄 Process Innovation', value: 'process-innovation' },
          { title: '📊 Proof Point', value: 'proof-point' },
          { title: '🛠️ Tool', value: 'tool' },
          { title: '🤝 Meeting Asset', value: 'meeting-asset' },
        ],
        layout: 'grid',
      },
      description: 'Type of CoE content',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('coe'),
      group: 'publish',
    },

    // ========================================
    // COLLECTION ASSIGNMENTS
    // ========================================

    {
      name: 'enablementHubCollections',
      title: 'Enablement Hub Collections & Subsections',
      type: 'array',
      of: [{
        type: 'object',
        name: 'collectionAssignment',
        components: {
          input: CollectionSubsectionInput,
        },
        fields: [
          {
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            to: [{ type: 'collection' }],
            options: {
              filter: 'hub == "enablement" && isEnabled == true',
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'subsections',
            title: 'Subsections',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Which subsections within this collection? Leave empty to show in all subsections.',
          },
        ],
        preview: {
          select: {
            collectionName: 'collection.name',
            collectionIcon: 'collection.icon',
            subsections: 'subsections',
          },
          prepare({ collectionName, collectionIcon, subsections }: any) {
            const subsectionText = subsections && subsections.length > 0
              ? ` → ${subsections.join(', ')}`
              : ' (all subsections)';
            return {
              title: `${collectionIcon || '📁'} ${collectionName || 'Untitled'}`,
              subtitle: subsectionText,
            };
          },
        },
      }],
      description: 'Assign to specific collections and optionally to specific subsections',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('enablement'),
      validation: (Rule: any) => Rule.custom((collections: any, context: any) => {
        const parent = (context as any).parent;
        if (parent?.publishedTo?.includes('enablement') && (!collections || collections.length === 0)) {
          return 'Please assign to at least one Enablement Hub collection';
        }
        return true;
      }),
      group: 'publish',
    },

    {
      name: 'coeHubCollections',
      title: 'CoE Hub Collections & Subsections',
      type: 'array',
      of: [{
        type: 'object',
        name: 'collectionAssignment',
        components: {
          input: CollectionSubsectionInput,
        },
        fields: [
          {
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            to: [{ type: 'collection' }],
            options: {
              filter: 'hub == "coe" && isEnabled == true',
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'subsections',
            title: 'Subsections',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Which subsections within this collection? Leave empty to show in all subsections.',
          },
        ],
        preview: {
          select: {
            collectionName: 'collection.name',
            collectionIcon: 'collection.icon',
            subsections: 'subsections',
          },
          prepare({ collectionName, collectionIcon, subsections }: any) {
            const subsectionText = subsections && subsections.length > 0
              ? ` → ${subsections.join(', ')}`
              : ' (all subsections)';
            return {
              title: `${collectionIcon || '📁'} ${collectionName || 'Untitled'}`,
              subtitle: subsectionText,
            };
          },
        },
      }],
      description: 'Assign to specific collections and optionally to specific subsections',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('coe'),
      validation: (Rule: any) => Rule.custom((collections: any, context: any) => {
        const parent = (context as any).parent;
        if (parent?.publishedTo?.includes('coe') && (!collections || collections.length === 0)) {
          return 'Please assign to at least one CoE Hub collection';
        }
        return true;
      }),
      group: 'publish',
    },

    {
      name: 'contentHubCollections',
      title: 'Content Hub Collections & Subsections',
      type: 'array',
      of: [{
        type: 'object',
        name: 'collectionAssignment',
        components: {
          input: CollectionSubsectionInput,
        },
        fields: [
          {
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            to: [{ type: 'collection' }],
            options: {
              filter: 'hub == "content" && isEnabled == true',
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'subsections',
            title: 'Subsections',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Which subsections within this collection? Leave empty to show in all subsections.',
          },
        ],
        preview: {
          select: {
            collectionName: 'collection.name',
            collectionIcon: 'collection.icon',
            subsections: 'subsections',
          },
          prepare({ collectionName, collectionIcon, subsections }: any) {
            const subsectionText = subsections && subsections.length > 0
              ? ` → ${subsections.join(', ')}`
              : ' (all subsections)';
            return {
              title: `${collectionIcon || '📁'} ${collectionName || 'Untitled'}`,
              subtitle: subsectionText,
            };
          },
        },
      }],
      description: 'Assign to specific collections and optionally to specific subsections',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('content'),
      validation: (Rule: any) => Rule.custom((collections: any, context: any) => {
        const parent = (context as any).parent;
        if (parent?.publishedTo?.includes('content') && (!collections || collections.length === 0)) {
          return 'Please assign to at least one Content Hub collection';
        }
        return true;
      }),
      group: 'publish',
    },

    {
      name: 'curatedHubCollections',
      title: 'Curated Hub Collections & Subsections',
      type: 'array',
      of: [{
        type: 'object',
        name: 'collectionAssignment',
        components: {
          input: CollectionSubsectionInput,
        },
        fields: [
          {
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            to: [{ type: 'collection' }],
            options: {
              filter: 'hub == "curated" && isEnabled == true',
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'subsections',
            title: 'Subsections',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Which subsections within this collection? Leave empty to show in all subsections.',
          },
        ],
        preview: {
          select: {
            collectionName: 'collection.name',
            collectionIcon: 'collection.icon',
            subsections: 'subsections',
          },
          prepare({ collectionName, collectionIcon, subsections }: any) {
            const subsectionText = subsections && subsections.length > 0
              ? ` → ${subsections.join(', ')}`
              : ' (all subsections)';
            return {
              title: `${collectionIcon || '📁'} ${collectionName || 'Untitled'}`,
              subtitle: subsectionText,
            };
          },
        },
      }],
      description: 'Assign to curated collections (can include entries from any hub)',
      hidden: ({ parent }: any) => !parent?.publishedTo?.includes('curated'),
      validation: (Rule: any) => Rule.custom((collections: any, context: any) => {
        const parent = (context as any).parent;
        if (parent?.publishedTo?.includes('curated') && (!collections || collections.length === 0)) {
          return 'Please assign to at least one Curated Hub collection';
        }
        return true;
      }),
      group: 'publish',
    },

    // Display priority for featured content
    {
      name: 'displayPriority',
      title: 'Display Priority',
      type: 'string',
      options: {
        list: [
          { title: '⭐ Hero Callout', value: 'hero' },
          { title: '✨ Featured', value: 'featured' },
          { title: '📌 Normal', value: 'normal' },
        ],
        layout: 'radio',
      },
      description: 'Hero callouts appear in large cards at top of Featured tab',
      initialValue: 'normal',
      group: 'publish',
    },

    // Meeting type for CoE meeting assets
    {
      name: 'meetingType',
      title: 'Meeting Type',
      type: 'string',
      options: {
        list: [
          { title: '🔍 Business Value Assessment (BVA)', value: 'bva' },
          { title: '📊 Executive Business Review (EBR)', value: 'ebr' },
          { title: '📈 Quarterly Business Review (QBR)', value: 'qbr' },
          { title: '📝 RFX Response', value: 'rfx' },
          { title: '🎯 Strategy Session', value: 'strategy-session' },
        ],
      },
      description: 'Type of meeting this asset supports',
      hidden: ({ parent }: any) => !parent?.coeType?.includes('meeting-asset'),
      group: 'publish',
    },

    // Battle Card specific
    {
      name: 'competitor',
      title: 'Competitor',
      type: 'reference',
      to: [{ type: 'competitor' }],
      hidden: ({ parent }: any) => parent?.format !== 'battlecard',
      group: 'publish',
    },

    {
      name: 'thumbnailImage',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      group: 'publish',
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

    // Legacy fields for backwards compatibility (hidden)
    {
      name: 'cardType',
      title: 'Card Type (Legacy)',
      type: 'string',
      hidden: true,
    },
    {
      name: 'pageTemplate',
      title: 'Page Template (Legacy)',
      type: 'string',
      hidden: true,
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
    {
      name: 'resourceLinks',
      title: 'Resource Links (Legacy)',
      type: 'object',
      hidden: true,
      fields: [
        { name: 'videoUrl', type: 'url' },
        { name: 'slidesUrl', type: 'url' },
        { name: 'transcriptUrl', type: 'url' },
        { name: 'keyAssetUrl', type: 'url' },
        { name: 'keyAssetLabel', type: 'string' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedTo: 'publishedTo',
      format: 'format',
      status: 'status',
      media: 'thumbnailImage',
    },
    prepare(selection: any) {
      const { title, publishedTo, format, status, media } = selection

      const formatIcons: Record<string, string> = {
        'document': '📄',
        'slides': '📊',
        'video': '🎬',
        'one-pager': '📋',
        'battlecard': '⚔️',
        'competitive': '🔍',
        'guide': '📖',
        'messaging': '💬',
        'meeting-asset': '🤝',
        'playbook': '🎯',
        'prototype': '🧪',
        'tool': '🛠️',
        'live-replay': '🎥',
        'on-demand': '📺',
      }
      const statusIcon: Record<string, string> = {
        draft: '📝',
        published: '🚀',
        archived: '📦',
      }

      const hubIcon = publishedTo?.includes('enablement') ? '🎓' : '📚'
      const fmtIcon = format ? formatIcons[format] || hubIcon : hubIcon
      const stIcon = statusIcon[status] || '📝'

      return {
        title: `${fmtIcon} ${title}`,
        subtitle: `${stIcon} ${status || 'draft'}`,
        media,
      }
    },
  },
}
