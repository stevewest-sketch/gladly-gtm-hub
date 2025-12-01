import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'coeEntry',
  title: 'CoE Entry',
  type: 'document',
  icon: () => '🎯',
  groups: [
    { name: 'create', title: '✨ Create', default: true },
    { name: 'content', title: '📝 Content' },
    { name: 'taxonomy', title: '🏷️ Taxonomy' },
    { name: 'resources', title: '📦 Resources' },
    { name: 'publish', title: '🚀 Publish' },
  ],
  fields: [
    // ========================================
    // CREATE GROUP - Entry Type & Source Content
    // ========================================

    defineField({
      name: 'entryType',
      title: 'Entry Type',
      type: 'string',
      description: 'What kind of CoE content is this?',
      options: {
        list: [
          { title: '📋 Best Practice - Channel or capability guidance', value: 'best-practice' },
          { title: '💡 Process Innovation - Customer implementation story', value: 'process-innovation' },
          { title: '🏢 Internal Best Practice - Internal methodology', value: 'internal-best-practice' },
          { title: '📊 Proof Point - Stat, quote, or anecdote', value: 'proof-point' },
          { title: '🛠️ Tool - Calculator, template, or assistant', value: 'tool' },
          { title: '📁 Meeting Asset - BVA, QBR, or customer deliverable', value: 'meeting-asset' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'create',
    }),

    // Source Content for AI Processing
    defineField({
      name: 'sourceContent',
      title: '📋 Source Content',
      type: 'object',
      description: 'Paste source content here, then use the ✨ AI Assistant button to generate fields',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'rawContent',
          title: 'Paste content here',
          type: 'text',
          rows: 8,
          description: 'Transcript, Slack thread, notes, or document. Use AI Assistant to process into structured fields.',
        },
        {
          name: 'sourceUrl',
          title: 'Source URL',
          type: 'url',
          description: 'Link to original Slack thread, recording, doc, etc.',
        },
        {
          name: 'submittedBy',
          title: 'Submitted By',
          type: 'string',
          description: 'Who submitted this content?',
        },
        {
          name: 'submissionDate',
          title: 'Submission Date',
          type: 'date',
        },
      ],
      group: 'create',
    }),

    // ========================================
    // CONTENT GROUP - Core Fields (All Types)
    // ========================================

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Clear, descriptive title',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: '2-3 sentence overview for cards and previews',
      group: 'content',
    }),

    // ========================================
    // CONTENT GROUP - Best Practice / Process Innovation Fields
    // ========================================

    defineField({
      name: 'linkType',
      title: 'Content Location',
      type: 'string',
      options: {
        list: [
          { title: '📄 Internal Page - Build page in Sanity', value: 'internal-page' },
          { title: '🔗 External Link - Link to external resource', value: 'external-link' },
          { title: '📄🔗 Both - Page with external resources', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal-page',
      hidden: ({ parent }) => !['best-practice', 'process-innovation', 'internal-best-practice'].includes(parent?.entryType || ''),
      group: 'content',
    }),

    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Primary external link (Google Doc, Slides, etc.)',
      hidden: ({ parent }) =>
        !['best-practice', 'process-innovation', 'internal-best-practice'].includes(parent?.entryType || '') ||
        parent?.linkType === 'internal-page',
      group: 'content',
    }),

    defineField({
      name: 'pageSections',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'pageSection' }],
      description: 'Build your page with flexible, reorderable sections. Drag to reorder.',
      hidden: ({ parent }) =>
        !['best-practice', 'process-innovation', 'internal-best-practice'].includes(parent?.entryType || '') ||
        parent?.linkType === 'external-link',
      group: 'content',
    }),

    // ========================================
    // CONTENT GROUP - Proof Point Fields
    // ========================================

    defineField({
      name: 'headline',
      title: 'Data Point / Quote / Anecdote',
      type: 'text',
      rows: 3,
      description: 'The actual stat, quote, or story (e.g., "87% of cancel order conversations resolved automatically")',
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as Record<string, unknown>;
        if (parent?.entryType === 'proof-point' && !value) {
          return 'Headline is required for proof points';
        }
        return true;
      }),
      group: 'content',
    }),

    defineField({
      name: 'proofType',
      title: 'Proof Type',
      type: 'string',
      options: {
        list: [
          { title: '📈 Stat - Quantitative metric', value: 'stat' },
          { title: '💬 Anecdote - Customer story', value: 'anecdote' },
          { title: '🗣️ Quote - Direct customer quote', value: 'quote' },
          { title: '📊 Benchmark - Industry comparison', value: 'benchmark' },
          { title: '📖 Case Study - Detailed success story', value: 'case-study' },
        ],
      },
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      group: 'content',
    }),

    defineField({
      name: 'customer',
      title: 'Customer Name',
      type: 'string',
      description: 'Leave blank for anonymized or industry-wide data',
      hidden: ({ parent }) =>
        !['proof-point', 'meeting-asset'].includes(parent?.entryType || ''),
      group: 'content',
    }),

    defineField({
      name: 'source',
      title: 'Source',
      type: 'text',
      rows: 2,
      description: 'Where did this come from? (Slack thread, call recording, QBR, etc.)',
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      group: 'content',
    }),

    defineField({
      name: 'proofSourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to original source',
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      group: 'content',
    }),

    defineField({
      name: 'howToUse',
      title: 'How to Use This',
      type: 'text',
      rows: 3,
      description: 'Guidance for Sales/CS on when and how to use this proof point',
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      group: 'content',
    }),

    defineField({
      name: 'reformattingRecommendations',
      title: 'Reformatting Recommendations',
      type: 'text',
      rows: 2,
      description: 'How should this be formatted for different uses?',
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      group: 'content',
    }),

    defineField({
      name: 'kpis',
      title: 'Related KPIs',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Resolution Rate', value: 'resolution-rate' },
          { title: 'AHT (Avg Handle Time)', value: 'aht' },
          { title: 'Cost Savings', value: 'cost-savings' },
          { title: 'Cost Per Contact', value: 'cost-per-contact' },
          { title: 'CSAT', value: 'csat' },
          { title: 'First Contact Resolution', value: 'fcr' },
          { title: 'Conversation Volume', value: 'conversation-volume' },
          { title: 'Agent Productivity', value: 'agent-productivity' },
          { title: 'Revenue Impact', value: 'revenue-impact' },
          { title: 'Reopen Rate', value: 'reopen-rate' },
        ],
      },
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      group: 'content',
    }),

    // ========================================
    // CONTENT GROUP - Tool Fields
    // ========================================

    defineField({
      name: 'toolType',
      title: 'Tool Type',
      type: 'string',
      options: {
        list: [
          { title: '🧮 Calculator - ROI or value calculator', value: 'calculator' },
          { title: '📄 Template - Reusable document template', value: 'template' },
          { title: '🤖 AI Assistant - Conversational AI tool', value: 'assistant' },
          { title: '📝 Form - Submission or intake form', value: 'form' },
          { title: '✅ Checklist - Step-by-step checklist', value: 'checklist' },
          { title: '🧩 Framework - Conceptual framework or model', value: 'framework' },
        ],
      },
      hidden: ({ parent }) => parent?.entryType !== 'tool',
      group: 'content',
    }),

    defineField({
      name: 'toolUrl',
      title: 'Tool URL',
      type: 'url',
      description: 'Link to the tool (if external)',
      hidden: ({ parent }) => parent?.entryType !== 'tool',
      group: 'content',
    }),

    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'Button text (e.g., "Open Calculator", "Download Template", "Access CoE Assistant")',
      hidden: ({ parent }) => parent?.entryType !== 'tool',
      group: 'content',
    }),

    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points highlighting what this tool does',
      hidden: ({ parent }) => parent?.entryType !== 'tool',
      group: 'content',
    }),

    defineField({
      name: 'exampleUsage',
      title: 'Example Usage',
      type: 'object',
      description: 'Show an example interaction (especially for AI assistants)',
      hidden: ({ parent }) =>
        parent?.entryType !== 'tool' ||
        parent?.toolType !== 'assistant',
      fields: [
        {
          name: 'userQuery',
          title: 'Example Question',
          type: 'string',
          description: 'What might a user ask?',
        },
        {
          name: 'assistantResponse',
          title: 'Example Response',
          type: 'text',
          rows: 4,
          description: 'How would the assistant respond?',
        },
      ],
      group: 'content',
    }),

    // ========================================
    // CONTENT GROUP - Meeting Asset Fields
    // ========================================

    defineField({
      name: 'assetType',
      title: 'Asset Type',
      type: 'reference',
      to: [{ type: 'coeAssetType' }],
      description: 'BVA, QBR, EBR, RFX, or Strategy Session',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'meetingType',
      title: 'Meeting Type',
      type: 'string',
      options: {
        list: [
          { title: 'BVA - Business Value Assessment', value: 'BVA' },
          { title: 'QBR - Quarterly Business Review', value: 'QBR' },
          { title: 'EBR - Executive Business Review', value: 'EBR' },
          { title: 'RFX - Request for Proposal/Info', value: 'RFX' },
          { title: 'Strategy Session', value: 'Strategy Session' },
        ],
      },
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'customerLogoUrl',
      title: 'Customer Logo URL',
      type: 'url',
      description: 'URL to customer logo image',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'account',
      title: 'Account Name',
      type: 'string',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as Record<string, unknown>;
        if (parent?.entryType === 'meeting-asset' && !value) {
          return 'Account name is required for meeting assets';
        }
        return true;
      }),
      group: 'content',
    }),

    defineField({
      name: 'positioning',
      title: 'Product Positioning',
      type: 'string',
      description: 'Which products were positioned?',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Sidekick', value: 'sidekick' },
          { title: 'Hero + Sidekick', value: 'hero-sidekick' },
          { title: 'Platform', value: 'platform' },
        ],
      },
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'outcomes',
      title: 'Outcomes / Results',
      type: 'text',
      rows: 3,
      description: 'What were the results of this engagement?',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'deliveryDate',
      title: 'Delivery Date',
      type: 'date',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'salesStage',
      title: 'Sales Stage',
      type: 'string',
      options: {
        list: [
          { title: 'Pre-Sales - Prospect', value: 'pre-sales' },
          { title: 'Post-Sales - Customer', value: 'post-sales' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'csOrSalesLead',
      title: 'CS or Sales Lead',
      type: 'string',
      description: 'Who led this engagement?',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'assetAuthor',
      title: 'Asset Author(s)',
      type: 'string',
      description: 'Who created the deliverable?',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    defineField({
      name: 'learnings',
      title: 'Key Learnings',
      type: 'text',
      rows: 3,
      description: 'What can others learn from this engagement? What worked well?',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'content',
    }),

    // ========================================
    // TAXONOMY GROUP
    // ========================================

    defineField({
      name: 'coeSection',
      title: 'Hub Section',
      type: 'reference',
      to: [{ type: 'coeSection' }],
      description: 'Which section of the CoE Hub does this belong to?',
      group: 'taxonomy',
    }),

    defineField({
      name: 'channels',
      title: 'Channels',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coeChannel' }] }],
      description: 'Which channels does this apply to? (Chat, Voice, Email, etc.)',
      group: 'taxonomy',
    }),

    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coeCapability' }] }],
      description: 'Which platform capabilities does this cover? (Guides, Journeys, App Actions, etc.)',
      group: 'taxonomy',
    }),

    defineField({
      name: 'contentCategories',
      title: 'Content Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coeContentCategory' }] }],
      description: 'What types of content does this include? (Implementation Checklist, Optimization Tips, etc.)',
      group: 'taxonomy',
    }),

    defineField({
      name: 'audiences',
      title: 'Target Audiences',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coeAudience' }] }],
      description: 'Who is this content for? (Executive, Admin, Agent, etc.)',
      group: 'taxonomy',
    }),

    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{ type: 'coeIndustry' }],
      description: 'Which industry does this relate to?',
      hidden: ({ parent }) =>
        !['proof-point', 'meeting-asset', 'process-innovation'].includes(parent?.entryType || ''),
      group: 'taxonomy',
    }),

    defineField({
      name: 'product',
      title: 'Product',
      type: 'string',
      description: 'Which product does this primarily relate to?',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Sidekick', value: 'sidekick' },
          { title: 'Platform (Both)', value: 'platform' },
          { title: 'All / General', value: 'all' },
        ],
      },
      group: 'taxonomy',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Freeform tags for search and filtering',
      group: 'taxonomy',
    }),

    // ========================================
    // RESOURCES GROUP
    // ========================================

    defineField({
      name: 'slidesUrl',
      title: 'Slides URL',
      type: 'url',
      description: 'Primary link to presentation slides (card will link here)',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'resources',
    }),

    defineField({
      name: 'executiveSummaryUrl',
      title: 'Executive Summary / Deck URL',
      type: 'url',
      description: 'Link to the main deliverable',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'resources',
    }),

    defineField({
      name: 'modelUrl',
      title: 'BVA Model URL',
      type: 'url',
      description: 'Link to the financial model (if applicable)',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'resources',
    }),

    defineField({
      name: 'recordingUrl',
      title: 'Meeting Recording URL',
      type: 'url',
      description: 'Link to meeting recording',
      hidden: ({ parent }) => parent?.entryType !== 'meeting-asset',
      group: 'resources',
    }),

    defineField({
      name: 'additionalResources',
      title: 'Additional Resources',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
          {
            name: 'resourceType',
            title: 'Type',
            type: 'string',
            options: {
              list: [
                { title: '📄 Document', value: 'document' },
                { title: '📊 Spreadsheet', value: 'spreadsheet' },
                { title: '📽️ Presentation', value: 'presentation' },
                { title: '🎥 Recording', value: 'recording' },
                { title: '🔗 Link', value: 'link' },
              ],
            },
          },
        ],
        preview: {
          select: { title: 'label', type: 'resourceType' },
          prepare({ title, type }) {
            const icons: Record<string, string> = {
              document: '📄',
              spreadsheet: '📊',
              presentation: '📽️',
              recording: '🎥',
              link: '🔗',
            };
            return { title: `${icons[type] || '🔗'} ${title}` };
          },
        },
      }],
      description: 'Additional links and resources',
      group: 'resources',
    }),

    defineField({
      name: 'relatedEntries',
      title: 'Related Content',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coeEntry' }] }],
      description: 'Link to related CoE entries',
      group: 'resources',
    }),

    // ========================================
    // PUBLISH GROUP
    // ========================================

    defineField({
      name: 'permission',
      title: 'Permission Status',
      type: 'reference',
      to: [{ type: 'coePermission' }],
      description: 'Can this be shared externally?',
      hidden: ({ parent }) =>
        !['proof-point', 'meeting-asset', 'process-innovation'].includes(parent?.entryType || ''),
      group: 'publish',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '📝 Draft - Still being created', value: 'draft' },
          { title: '👀 In Review - Ready for review', value: 'in-review' },
          { title: '🚀 Published - Live and visible', value: 'published' },
          { title: '🔄 Needs Update - Content is stale', value: 'needs-update' },
          { title: '📦 Archived - No longer relevant', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      group: 'publish',
    }),

    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'string',
      description: 'Team or person responsible for this content',
      group: 'publish',
    }),

    defineField({
      name: 'dateCollected',
      title: 'Date Collected',
      type: 'date',
      description: 'When was this information collected?',
      hidden: ({ parent }) => parent?.entryType !== 'proof-point',
      group: 'publish',
    }),

    defineField({
      name: 'lastReviewed',
      title: 'Last Reviewed',
      type: 'date',
      description: 'When was this content last reviewed for accuracy?',
      group: 'publish',
    }),

    defineField({
      name: 'reviewNotes',
      title: 'Review Notes',
      type: 'text',
      rows: 2,
      description: 'Notes from last review or needed updates',
      group: 'publish',
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured sections on the hub',
      initialValue: false,
      group: 'publish',
    }),

    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Display priority (higher = appears first, 0-100)',
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(100),
      group: 'publish',
    }),

    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      description: 'Number of views (updated automatically)',
      initialValue: 0,
      readOnly: true,
      group: 'publish',
    }),
  ],

  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      headline: 'headline',
      account: 'account',
      entryType: 'entryType',
      status: 'status',
      customer: 'customer',
      proofType: 'proofType',
      featured: 'featured',
      sectionName: 'coeSection.name',
      sectionIcon: 'coeSection.icon',
    },
    prepare({ title, headline, account, entryType, status, customer, proofType, featured, sectionName, sectionIcon }) {
      const typeIcons: Record<string, string> = {
        'best-practice': '📋',
        'process-innovation': '💡',
        'internal-best-practice': '🏢',
        'proof-point': '📊',
        'tool': '🛠️',
        'meeting-asset': '📁',
      };
      const statusIcons: Record<string, string> = {
        'draft': '📝',
        'in-review': '👀',
        'published': '🚀',
        'needs-update': '🔄',
        'archived': '📦',
      };
      const proofTypeLabels: Record<string, string> = {
        'stat': '📈 Stat',
        'anecdote': '💬 Anecdote',
        'quote': '🗣️ Quote',
        'benchmark': '📊 Benchmark',
        'case-study': '📖 Case Study',
      };

      const icon = typeIcons[entryType] || '📄';
      const statusIcon = statusIcons[status] || '📝';
      const featuredBadge = featured ? '⭐ ' : '';

      // Build display title
      let displayTitle = title || headline || account || 'Untitled';
      if (entryType === 'meeting-asset' && account) {
        displayTitle = account + (title ? ` - ${title}` : '');
      }

      // Build subtitle
      const subtitleParts = [`${statusIcon} ${status || 'draft'}`];
      if (entryType === 'proof-point' && proofType) {
        subtitleParts.push(proofTypeLabels[proofType] || proofType);
      }
      if (customer) {
        subtitleParts.push(customer);
      }
      if (sectionName) {
        subtitleParts.push(`${sectionIcon || '📂'} ${sectionName}`);
      }

      return {
        title: `${featuredBadge}${icon} ${displayTitle}`,
        subtitle: subtitleParts.join(' • '),
      };
    },
  },
});
