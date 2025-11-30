// Flexible Page Section Schema for Training/Playbook Templates
// This replaces scattered fields (contentBlocks, keyTakeaways, actionItems, etc.)
// with a single, orderable array of sections

export default {
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  fields: [
    {
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: '📋 Overview Cards', value: 'overview' },
          { title: '🎬 Video/Recording', value: 'video' },
          { title: '💡 Key Takeaways', value: 'takeaways' },
          { title: '📝 Process/Guidelines', value: 'process' },
          { title: '⚠️ Tips & Pitfalls', value: 'tips' },
          { title: '❓ FAQs', value: 'faq' },
          { title: '📦 Assets', value: 'assets' },
          { title: '📄 Text Content', value: 'text' },
          { title: '✅ Checklist', value: 'checklist' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Display title for this section (e.g., "Key Takeaways", "How We Do It")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      description: 'Optional subheading or intro text for the section',
    },
    {
      name: 'collapsible',
      title: 'Collapsible?',
      type: 'boolean',
      description: 'Allow users to collapse/expand this section',
      initialValue: false,
    },
    {
      name: 'defaultExpanded',
      title: 'Expanded by Default?',
      type: 'boolean',
      description: 'Start expanded or collapsed (only applies if collapsible)',
      initialValue: true,
      hidden: ({ parent }: any) => !parent?.collapsible,
    },

    // ========================================
    // OVERVIEW SECTION - Editable Cards
    // ========================================
    {
      name: 'overviewCards',
      title: 'Overview Cards',
      type: 'array',
      description: 'Create 2-4 overview cards (What It Is, Who It\'s For, etc.)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'overview',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Card Label', type: 'string', description: 'E.g., "What It Is", "Who It\'s For"' },
          { name: 'content', title: 'Card Content', type: 'text', rows: 3 },
        ],
        preview: {
          select: { title: 'label', subtitle: 'content' },
        },
      }],
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'overview' && (!value || value.length === 0)) {
          return 'Overview section requires at least one card'
        }
        return true
      }),
    },

    // ========================================
    // VIDEO SECTION
    // ========================================
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Wistia, Loom, Google Drive, etc.',
      hidden: ({ parent }: any) => parent?.sectionType !== 'video',
    },
    {
      name: 'wistiaId',
      title: 'Wistia ID',
      type: 'string',
      description: 'Alternative to URL - just the Wistia video ID',
      hidden: ({ parent }: any) => parent?.sectionType !== 'video',
    },
    {
      name: 'sessionMaterials',
      title: 'Session Materials',
      type: 'object',
      description: 'Links to slides, transcript, recording',
      hidden: ({ parent }: any) => parent?.sectionType !== 'video',
      fields: [
        { name: 'videoUrl', title: '🎬 Recording Link', type: 'url' },
        { name: 'slidesUrl', title: '📊 Slides Link', type: 'url' },
        { name: 'transcriptUrl', title: '📄 Transcript Link', type: 'url' },
      ],
    },

    // ========================================
    // TAKEAWAYS SECTION
    // ========================================
    {
      name: 'takeaways',
      title: 'Takeaway Items',
      type: 'array',
      description: 'Key learnings or takeaways (5-7 items)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'takeaways',
      of: [{ type: 'text', rows: 2 }],
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'takeaways' && (!value || value.length === 0)) {
          return 'Takeaways section requires at least one item'
        }
        return true
      }),
    },

    // ========================================
    // PROCESS/GUIDELINES SECTION
    // ========================================
    {
      name: 'processLayout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Step-by-Step (numbered)', value: 'steps' },
          { title: 'Text Paragraphs', value: 'text' },
          { title: 'Bullet List', value: 'bullets' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'process',
      initialValue: 'steps',
    },
    {
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      description: 'Step-by-step instructions',
      hidden: ({ parent }: any) => parent?.sectionType !== 'process' || parent?.processLayout !== 'steps',
      of: [{
        type: 'object',
        fields: [
          { name: 'heading', title: 'Step Name', type: 'string' },
          { name: 'content', title: 'Instructions', type: 'text', rows: 4 },
        ],
        preview: { select: { title: 'heading', subtitle: 'content' } },
      }],
    },
    {
      name: 'processText',
      title: 'Process Content',
      type: 'text',
      rows: 10,
      description: 'Full text content for this section',
      hidden: ({ parent }: any) => parent?.sectionType !== 'process' || parent?.processLayout === 'steps',
    },

    // ========================================
    // TIPS & PITFALLS SECTION
    // ========================================
    {
      name: 'tips',
      title: 'Tips & Pitfalls',
      type: 'array',
      description: 'Tips (start normally) and Pitfalls (start with "Don\'t")',
      hidden: ({ parent }: any) => parent?.sectionType !== 'tips',
      of: [{ type: 'text', rows: 2 }],
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'tips' && (!value || value.length === 0)) {
          return 'Tips section requires at least one item'
        }
        return true
      }),
    },

    // ========================================
    // FAQ SECTION
    // ========================================
    {
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      description: 'Frequently asked questions',
      hidden: ({ parent }: any) => parent?.sectionType !== 'faq',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text', rows: 4 },
        ],
        preview: { select: { title: 'question', subtitle: 'answer' } },
      }],
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'faq' && (!value || value.length === 0)) {
          return 'FAQ section requires at least one question'
        }
        return true
      }),
    },

    // ========================================
    // ASSETS SECTION
    // ========================================
    {
      name: 'assetItems',
      title: 'Asset Items',
      type: 'array',
      description: 'Individual assets with icons, titles, and links',
      hidden: ({ parent }: any) => parent?.sectionType !== 'assets',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon', type: 'string', description: 'Emoji or icon' },
          { name: 'title', title: 'Asset Name', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
          { name: 'url', title: 'Link', type: 'url' },
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    },

    // ========================================
    // TEXT CONTENT SECTION
    // ========================================
    {
      name: 'textContent',
      title: 'Text Content',
      type: 'text',
      rows: 10,
      description: 'Free-form text content (supports markdown)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'text',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'text' && !value) {
          return 'Text section requires content'
        }
        return true
      }),
    },

    // ========================================
    // CHECKLIST SECTION
    // ========================================
    {
      name: 'checklistColumns',
      title: 'Checklist Columns',
      type: 'array',
      description: 'Organize checklist items into columns',
      hidden: ({ parent }: any) => parent?.sectionType !== 'checklist',
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
    select: {
      title: 'title',
      sectionType: 'sectionType',
      description: 'description',
    },
    prepare({ title, sectionType, description }: any) {
      const icons: Record<string, string> = {
        overview: '📋',
        video: '🎬',
        takeaways: '💡',
        process: '📝',
        tips: '⚠️',
        faq: '❓',
        assets: '📦',
        text: '📄',
        checklist: '✅',
      }
      return {
        title: `${icons[sectionType] || '📄'} ${title}`,
        subtitle: description || sectionType,
      }
    },
  },
}
