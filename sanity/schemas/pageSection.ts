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
          { title: '⚖️ Split/Comparison', value: 'split' },
          { title: '🔗 Embed (Loom, Slides, etc.)', value: 'embed' },
          { title: '🎯 Call to Action', value: 'cta' },
          { title: '💬 Quote/Testimonial', value: 'quote' },
          // CoE-specific section types
          { title: '📊 Proof Points Grid', value: 'proofPointsGrid' },
          { title: '🛠️ Featured Tool', value: 'featuredTool' },
          { title: '🔢 Framework Steps', value: 'frameworkSteps' },
          { title: '🃏 Resource Cards', value: 'resourceCards' },
          { title: '🏆 Customer Wins', value: 'customerWins' },
          { title: '📈 Stats Highlight', value: 'statsHighlight' },
          { title: '🔗 Quick Links', value: 'quickLinks' },
          { title: '📋 Content Browser', value: 'contentBrowser' },
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
          {
            name: 'icon',
            title: 'Icon/Emoji',
            type: 'string',
            description: 'Emoji for this card (e.g., 📋, 👥, 🎯, 💡). Leave empty to auto-select based on label.',
          },
          {
            name: 'colorPreset',
            title: 'Color Theme',
            type: 'string',
            description: 'Card color theme. Leave empty to auto-select based on label.',
            options: {
              list: [
                { title: '🔵 Blue - Information, "What It Is"', value: 'blue' },
                { title: '🟢 Green - People, "Who It\'s For"', value: 'green' },
                { title: '🌹 Rose - Goals, "Key Outcome"', value: 'rose' },
                { title: '🟣 Purple - Insights, "Why It Matters"', value: 'purple' },
                { title: '🟡 Amber - Timing, "When To Use It"', value: 'amber' },
                { title: '🔷 Indigo - Structure, "Four Pillars"', value: 'indigo' },
                { title: '🩵 Cyan - Process, "How It Works"', value: 'cyan' },
                { title: '🩷 Pink - Benefits, "What You Get"', value: 'pink' },
                { title: '⚫ Gray - Default/Other', value: 'gray' },
              ],
              layout: 'dropdown',
            },
          },
        ],
        preview: {
          select: { title: 'label', subtitle: 'content', icon: 'icon', color: 'colorPreset' },
          prepare({ title, subtitle, icon, color }: any) {
            const colorIcons: Record<string, string> = {
              blue: '🔵',
              green: '🟢',
              rose: '🌹',
              purple: '🟣',
              amber: '🟡',
              indigo: '🔷',
              cyan: '🩵',
              pink: '🩷',
              gray: '⚫',
            };
            const displayIcon = icon || colorIcons[color] || '📌';
            return {
              title: `${displayIcon} ${title}`,
              subtitle: subtitle,
            };
          },
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
      name: 'videoLayout',
      title: 'Video Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width (default)', value: 'default' },
          { title: 'Split with Content (50/50)', value: 'splitWithContent' },
          { title: 'Thumbnail Preview (expands on click)', value: 'thumbnail' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'video',
      initialValue: 'default',
    },
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
      name: 'videoSideContent',
      title: 'Side Content (for split layout)',
      type: 'text',
      rows: 6,
      description: 'Description or bullet points shown alongside video in split layout',
      hidden: ({ parent }: any) => parent?.sectionType !== 'video' || parent?.videoLayout !== 'splitWithContent',
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
      name: 'takeawaysLayout',
      title: 'Takeaways Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Bullet List (default)', value: 'list' },
          { title: 'Cards Grid (2-3 columns)', value: 'cards' },
          { title: 'Numbered (big numbers)', value: 'numbered' },
          { title: 'With Icons', value: 'icons' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'takeaways',
      initialValue: 'list',
    },
    {
      name: 'takeaways',
      title: 'Takeaway Items (Simple)',
      type: 'array',
      description: 'Key learnings or takeaways (5-7 items) - for list/cards/numbered layouts',
      hidden: ({ parent }: any) => parent?.sectionType !== 'takeaways' || parent?.takeawaysLayout === 'icons',
      of: [{ type: 'text', rows: 2 }],
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'takeaways' &&
            context.parent?.takeawaysLayout !== 'icons' &&
            (!value || value.length === 0)) {
          return 'Takeaways section requires at least one item'
        }
        return true
      }),
    },
    {
      name: 'takeawaysWithIcons',
      title: 'Takeaway Items (With Icons)',
      type: 'array',
      description: 'Takeaways with custom icons - for icons layout',
      hidden: ({ parent }: any) => parent?.sectionType !== 'takeaways' || parent?.takeawaysLayout !== 'icons',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon/Emoji', type: 'string', description: 'Emoji or icon (e.g., 🎯, 💡, ✅)' },
          { name: 'text', title: 'Takeaway Text', type: 'text', rows: 2 },
        ],
        preview: {
          select: { title: 'text', icon: 'icon' },
          prepare({ title, icon }: any) {
            return { title: `${icon || '•'} ${title}` }
          },
        },
      }],
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'takeaways' &&
            context.parent?.takeawaysLayout === 'icons' &&
            (!value || value.length === 0)) {
          return 'Takeaways with icons requires at least one item'
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
      name: 'faqLayout',
      title: 'FAQ Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Accordion (expandable)', value: 'accordion' },
          { title: 'List (all visible)', value: 'list' },
          { title: 'Two Columns', value: 'twoColumn' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'faq',
      initialValue: 'accordion',
    },
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
      name: 'assetsLayout',
      title: 'Assets Layout',
      type: 'string',
      options: {
        list: [
          { title: 'List (with descriptions)', value: 'list' },
          { title: 'Cards Grid', value: 'cards' },
          { title: 'Compact (inline links)', value: 'compact' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'assets',
      initialValue: 'list',
    },
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
      name: 'textLayout',
      title: 'Text Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Prose (single column)', value: 'prose' },
          { title: 'Two Columns', value: 'twoColumn' },
          { title: 'Callout Box', value: 'callout' },
          { title: 'Blockquote', value: 'quote' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'text',
      initialValue: 'prose',
    },
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

    // ========================================
    // SPLIT/COMPARISON SECTION
    // ========================================
    {
      name: 'splitLayout',
      title: 'Split Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Equal (50/50)', value: 'equal' },
          { title: 'Left Wide (60/40)', value: 'leftWide' },
          { title: 'Right Wide (40/60)', value: 'rightWide' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'split',
      initialValue: 'equal',
    },
    {
      name: 'splitStyle',
      title: 'Split Style',
      type: 'string',
      options: {
        list: [
          { title: 'Neutral', value: 'neutral' },
          { title: 'Good vs Bad (green/red)', value: 'goodBad' },
          { title: 'Comparison (branded headers)', value: 'comparison' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'split',
      initialValue: 'neutral',
    },
    {
      name: 'leftColumn',
      title: 'Left Column',
      type: 'object',
      hidden: ({ parent }: any) => parent?.sectionType !== 'split',
      fields: [
        { name: 'columnTitle', title: 'Column Title', type: 'string' },
        {
          name: 'columnContent',
          title: 'Column Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
    {
      name: 'rightColumn',
      title: 'Right Column',
      type: 'object',
      hidden: ({ parent }: any) => parent?.sectionType !== 'split',
      fields: [
        { name: 'columnTitle', title: 'Column Title', type: 'string' },
        {
          name: 'columnContent',
          title: 'Column Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },

    // ========================================
    // EMBED SECTION
    // ========================================
    {
      name: 'embedType',
      title: 'Embed Type',
      type: 'string',
      options: {
        list: [
          { title: 'Loom', value: 'loom' },
          { title: 'Google Slides', value: 'googleSlides' },
          { title: 'Figma', value: 'figma' },
          { title: 'Airtable', value: 'airtable' },
          { title: 'Generic iframe', value: 'generic' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'embed',
    },
    {
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'Full URL to the embeddable content',
      hidden: ({ parent }: any) => parent?.sectionType !== 'embed',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'embed' && !value) {
          return 'Embed URL is required'
        }
        return true
      }),
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Video)', value: '16:9' },
          { title: '4:3 (Slides)', value: '4:3' },
          { title: '1:1 (Square)', value: '1:1' },
          { title: 'Auto', value: 'auto' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'embed',
      initialValue: '16:9',
    },
    {
      name: 'embedCaption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Optional caption below the embed',
      hidden: ({ parent }: any) => parent?.sectionType !== 'embed',
    },

    // ========================================
    // CALL TO ACTION SECTION
    // ========================================
    {
      name: 'ctaLayout',
      title: 'CTA Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Inline (text left, buttons right)', value: 'inline' },
          { title: 'Banner (full width highlight)', value: 'banner' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'cta',
      initialValue: 'centered',
    },
    {
      name: 'ctaHeadline',
      title: 'Headline',
      type: 'string',
      description: 'Main CTA headline',
      hidden: ({ parent }: any) => parent?.sectionType !== 'cta',
    },
    {
      name: 'ctaDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Supporting text for the CTA',
      hidden: ({ parent }: any) => parent?.sectionType !== 'cta',
    },
    {
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      description: 'One or more action buttons',
      hidden: ({ parent }: any) => parent?.sectionType !== 'cta',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'buttonLabel',
            title: 'Button Label',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'buttonLink',
            title: 'Button Link',
            type: 'url',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'buttonStyle',
            title: 'Button Style',
            type: 'string',
            options: {
              list: [
                { title: 'Primary', value: 'primary' },
                { title: 'Secondary', value: 'secondary' },
                { title: 'Outline', value: 'outline' },
              ],
              layout: 'radio',
            },
            initialValue: 'primary',
          },
        ],
        preview: {
          select: { title: 'buttonLabel', subtitle: 'buttonStyle' },
        },
      }],
    },

    // ========================================
    // QUOTE/TESTIMONIAL SECTION
    // ========================================
    {
      name: 'quoteLayout',
      title: 'Quote Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Simple (quote + attribution)', value: 'simple' },
          { title: 'Card (boxed with optional image)', value: 'card' },
          { title: 'Featured (large, prominent)', value: 'featured' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }: any) => parent?.sectionType !== 'quote',
      initialValue: 'simple',
    },
    {
      name: 'quoteText',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      description: 'The quote content',
      hidden: ({ parent }: any) => parent?.sectionType !== 'quote',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.parent?.sectionType === 'quote' && !value) {
          return 'Quote text is required'
        }
        return true
      }),
    },
    {
      name: 'quoteAttribution',
      title: 'Attribution',
      type: 'object',
      description: 'Who said this quote',
      hidden: ({ parent }: any) => parent?.sectionType !== 'quote',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'title', title: 'Title/Role', type: 'string' },
        { name: 'company', title: 'Company', type: 'string' },
      ],
    },
    {
      name: 'quoteImage',
      title: 'Quote Image',
      type: 'image',
      description: 'Optional photo of the person (for card/featured layouts)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'quote',
      options: {
        hotspot: true,
      },
    },

    // ========================================
    // PROOF POINTS GRID
    // For displaying stats, metrics, and proof points in a grid
    // ========================================

    {
      name: 'proofPointsSource',
      title: 'Content Source',
      type: 'string',
      options: {
        list: [
          { title: '✏️ Manual Entry - Add stats directly', value: 'manual' },
          { title: '🔗 Reference - Select existing proof points', value: 'reference' },
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
      hidden: ({ parent }: any) => parent?.sectionType !== 'proofPointsGrid',
    },

    {
      name: 'proofPointRefs',
      title: 'Select Proof Points',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'coeEntry' }],
        options: {
          filter: 'entryType == "proof-point"',
        },
      }],
      description: 'Select existing proof point entries from the CoE Hub',
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'proofPointsGrid' ||
        parent?.proofPointsSource !== 'reference',
    },

    {
      name: 'manualProofPoints',
      title: 'Proof Points',
      type: 'array',
      of: [{
        type: 'object',
        name: 'proofPointItem',
        title: 'Proof Point',
        fields: [
          {
            name: 'statValue',
            title: 'Value',
            type: 'string',
            description: 'The number or metric (e.g., "87%", "$500K+", "30 min", "40%")',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'statLabel',
            title: 'Label',
            type: 'string',
            description: 'What it measures (e.g., "Resolution rate", "Higher win rate", "Avg value shown")',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'statColor',
            title: 'Color',
            type: 'string',
            options: {
              list: [
                { title: '🟣 Purple (Primary)', value: 'purple' },
                { title: '🟢 Green (Success)', value: 'green' },
                { title: '🔵 Blue (Info)', value: 'blue' },
                { title: '⚫ Dark (Neutral)', value: 'dark' },
                { title: '🌈 Gradient', value: 'gradient' },
              ],
            },
            initialValue: 'purple',
          },
          {
            name: 'source',
            title: 'Source (optional)',
            type: 'string',
            description: 'Attribution (e.g., "Allbirds case study")',
          },
          {
            name: 'icon',
            title: 'Icon (optional)',
            type: 'string',
            description: 'Emoji icon to display with the stat',
          },
        ],
        preview: {
          select: { value: 'statValue', label: 'statLabel', color: 'statColor' },
          prepare({ value, label, color }: any) {
            const colorIcons: Record<string, string> = {
              purple: '🟣',
              green: '🟢',
              blue: '🔵',
              dark: '⚫',
              gradient: '🌈',
            };
            return {
              title: value,
              subtitle: `${colorIcons[color] || '⚪'} ${label}`,
            };
          },
        },
      }],
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'proofPointsGrid' ||
        parent?.proofPointsSource !== 'manual',
    },

    {
      name: 'proofPointsLayout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (2x2) - Four boxes in a grid', value: 'grid' },
          { title: 'Row - Horizontal row of stats', value: 'row' },
          { title: 'Featured - One large + smaller ones', value: 'featured' },
          { title: 'Compact - Smaller, inline stats', value: 'compact' },
        ],
      },
      initialValue: 'grid',
      hidden: ({ parent }: any) => parent?.sectionType !== 'proofPointsGrid',
    },

    {
      name: 'proofPointsMaxDisplay',
      title: 'Max Display',
      type: 'number',
      description: 'Maximum number of proof points to display (leave empty for all)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'proofPointsGrid',
    },

    // ========================================
    // FEATURED TOOL
    // For showcasing tools like the CoE Assistant with split layout
    // ========================================

    {
      name: 'toolSource',
      title: 'Tool Source',
      type: 'string',
      options: {
        list: [
          { title: '🔗 Reference - Select existing tool', value: 'reference' },
          { title: '✏️ Manual - Enter details directly', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
      hidden: ({ parent }: any) => parent?.sectionType !== 'featuredTool',
    },

    {
      name: 'toolRef',
      title: 'Select Tool',
      type: 'reference',
      to: [{ type: 'coeEntry' }],
      options: {
        filter: 'entryType == "tool"',
      },
      description: 'Select an existing tool entry from the CoE Hub',
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'featuredTool' ||
        parent?.toolSource !== 'reference',
    },

    {
      name: 'manualTool',
      title: 'Tool Details',
      type: 'object',
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'featuredTool' ||
        parent?.toolSource !== 'manual',
      fields: [
        {
          name: 'toolTitle',
          title: 'Title',
          type: 'string',
          description: 'e.g., "Meet Your CoE Assistant"',
        },
        {
          name: 'toolDescription',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Brief description of what the tool does',
        },
        {
          name: 'toolIcon',
          title: 'Icon',
          type: 'string',
          description: 'Emoji icon (e.g., 🤖, 🧮, 📊)',
        },
        {
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Bullet points of key benefits',
        },
        {
          name: 'ctaLabel',
          title: 'CTA Button Label',
          type: 'string',
          description: 'e.g., "Access CoE Assistant →"',
        },
        {
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'url',
        },
      ],
    },

    {
      name: 'toolExampleQuery',
      title: 'Example Interaction',
      type: 'object',
      description: 'Show an example query/response (great for AI tools)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'featuredTool',
      fields: [
        {
          name: 'exampleLabel',
          title: 'Example Label',
          type: 'string',
          description: 'e.g., "Example Query"',
          initialValue: 'Example Query',
        },
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
          description: 'How would the tool respond?',
        },
      ],
    },

    {
      name: 'featuredToolLayout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal - Content left, example right (like screenshot)', value: 'horizontal' },
          { title: 'Vertical - Stacked', value: 'vertical' },
          { title: 'Compact - Smaller card', value: 'compact' },
          { title: 'Full Width - Banner style', value: 'full-width' },
        ],
      },
      initialValue: 'horizontal',
      hidden: ({ parent }: any) => parent?.sectionType !== 'featuredTool',
    },

    {
      name: 'featuredToolBackground',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: '🟣 Brand - Purple gradient (like screenshot)', value: 'brand' },
          { title: '🔵 Blue - Blue gradient', value: 'blue' },
          { title: '🟢 Green - Green gradient', value: 'green' },
          { title: '⚪ Subtle - Light gray', value: 'subtle' },
          { title: '⬜ None - No background', value: 'none' },
        ],
      },
      initialValue: 'brand',
      hidden: ({ parent }: any) => parent?.sectionType !== 'featuredTool',
    },

    // ========================================
    // FRAMEWORK STEPS
    // For numbered progressions like the BVA 101/201/301 framework
    // ========================================

    {
      name: 'frameworkIntro',
      title: 'Framework Description',
      type: 'text',
      rows: 2,
      description: 'Brief intro text above the steps',
      hidden: ({ parent }: any) => parent?.sectionType !== 'frameworkSteps',
    },

    {
      name: 'frameworkSteps',
      title: 'Steps',
      type: 'array',
      of: [{
        type: 'object',
        name: 'frameworkStep',
        title: 'Step',
        fields: [
          {
            name: 'stepNumber',
            title: 'Step Number/Label',
            type: 'string',
            description: 'e.g., "101", "201", "301" or "1", "2", "3" or "Step 1"',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'stepTitle',
            title: 'Title',
            type: 'string',
            description: 'e.g., "Value messaging & metrics"',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'stepDescription',
            title: 'Description',
            type: 'text',
            rows: 2,
            description: 'Brief explanation of this step',
          },
          {
            name: 'stepLink',
            title: 'Link (optional)',
            type: 'url',
            description: 'Link to learn more about this step',
          },
          {
            name: 'stepColor',
            title: 'Accent Color',
            type: 'string',
            options: {
              list: [
                { title: '🟣 Purple', value: 'purple' },
                { title: '🔵 Blue', value: 'blue' },
                { title: '🟢 Green', value: 'green' },
                { title: '🟡 Yellow', value: 'yellow' },
              ],
            },
          },
        ],
        preview: {
          select: { num: 'stepNumber', title: 'stepTitle' },
          prepare({ num, title }: any) {
            return { title: `${num}. ${title}` };
          },
        },
      }],
      hidden: ({ parent }: any) => parent?.sectionType !== 'frameworkSteps',
    },

    {
      name: 'frameworkStats',
      title: 'Companion Stats',
      type: 'array',
      description: 'Stats to show alongside the framework (like the "Proven impact" boxes)',
      of: [{
        type: 'object',
        name: 'frameworkStat',
        title: 'Stat',
        fields: [
          {
            name: 'statValue',
            title: 'Value',
            type: 'string',
            description: 'e.g., "40%", "$500K+", "15%", "30 min"',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'statLabel',
            title: 'Label',
            type: 'string',
            description: 'e.g., "Higher win rate", "Avg value shown"',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'statColor',
            title: 'Color',
            type: 'string',
            options: {
              list: [
                { title: '🟣 Purple', value: 'purple' },
                { title: '🟢 Green', value: 'green' },
                { title: '🔵 Blue', value: 'blue' },
                { title: '⚫ Dark', value: 'dark' },
              ],
            },
            initialValue: 'purple',
          },
        ],
        preview: {
          select: { value: 'statValue', label: 'statLabel', color: 'statColor' },
          prepare({ value, label, color }: any) {
            const colorIcons: Record<string, string> = {
              purple: '🟣',
              green: '🟢',
              blue: '🔵',
              dark: '⚫',
            };
            return {
              title: value,
              subtitle: `${colorIcons[color] || '⚪'} ${label}`,
            };
          },
        },
      }],
      hidden: ({ parent }: any) => parent?.sectionType !== 'frameworkSteps',
    },

    {
      name: 'frameworkStatsTitle',
      title: 'Stats Section Title',
      type: 'string',
      description: 'Title above the stats (e.g., "Proven impact:")',
      initialValue: 'Proven impact:',
      hidden: ({ parent }: any) => parent?.sectionType !== 'frameworkSteps',
    },

    {
      name: 'frameworkLayout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Split - Steps left, stats right (like screenshot)', value: 'split' },
          { title: 'Stacked - Steps then stats below', value: 'stacked' },
          { title: 'Steps Only - No stats', value: 'steps-only' },
          { title: 'Timeline - Vertical timeline style', value: 'timeline' },
        ],
      },
      initialValue: 'split',
      hidden: ({ parent }: any) => parent?.sectionType !== 'frameworkSteps',
    },

    // ========================================
    // RESOURCE CARDS
    // For displaying tools/resources with audience tags
    // ========================================

    {
      name: 'resourceCardsSource',
      title: 'Content Source',
      type: 'string',
      options: {
        list: [
          { title: '✏️ Manual - Enter cards directly', value: 'manual' },
          { title: '🔗 Reference - Select existing entries', value: 'reference' },
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
      hidden: ({ parent }: any) => parent?.sectionType !== 'resourceCards',
    },

    {
      name: 'resourceCardRefs',
      title: 'Select Entries',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'coeEntry' }],
      }],
      description: 'Select existing CoE entries to display as cards',
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'resourceCards' ||
        parent?.resourceCardsSource !== 'reference',
    },

    {
      name: 'resourceCards',
      title: 'Cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'resourceCard',
        title: 'Card',
        fields: [
          {
            name: 'cardIcon',
            title: 'Icon',
            type: 'string',
            description: 'Emoji icon (e.g., 📊, 🧮, 📋)',
          },
          {
            name: 'cardIconImage',
            title: 'Icon Image (alternative)',
            type: 'image',
            description: 'Upload an icon image instead of emoji',
            options: { hotspot: true },
          },
          {
            name: 'cardTitle',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'audienceTag',
            title: 'Audience Tag',
            type: 'string',
            description: 'e.g., "For Prospects", "For Customers", "For CS Teams"',
          },
          {
            name: 'audienceTagColor',
            title: 'Tag Color',
            type: 'string',
            options: {
              list: [
                { title: '🟢 Green', value: 'green' },
                { title: '🟠 Orange', value: 'orange' },
                { title: '🔵 Blue', value: 'blue' },
                { title: '🟣 Purple', value: 'purple' },
                { title: '⚫ Gray', value: 'gray' },
              ],
            },
            initialValue: 'green',
          },
          {
            name: 'cardDescription',
            title: 'Description',
            type: 'text',
            rows: 2,
          },
          {
            name: 'bestFor',
            title: 'Best For',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Bullet points of use cases (e.g., "Early deal cycle conversations")',
          },
          {
            name: 'cardUrl',
            title: 'URL',
            type: 'url',
          },
          {
            name: 'cardCtaLabel',
            title: 'CTA Label',
            type: 'string',
            description: 'Button text (e.g., "Open Tool", "Learn More")',
          },
        ],
        preview: {
          select: { title: 'cardTitle', icon: 'cardIcon', tag: 'audienceTag' },
          prepare({ title, icon, tag }: any) {
            return {
              title: `${icon || '📄'} ${title}`,
              subtitle: tag,
            };
          },
        },
      }],
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'resourceCards' ||
        parent?.resourceCardsSource !== 'manual',
    },

    {
      name: 'resourceCardsLayout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Two Column - Side by side (like screenshot)', value: 'two-column' },
          { title: 'Three Column - Three across', value: 'three-column' },
          { title: 'List - Vertical list', value: 'list' },
          { title: 'Carousel - Scrollable', value: 'carousel' },
        ],
      },
      initialValue: 'two-column',
      hidden: ({ parent }: any) => parent?.sectionType !== 'resourceCards',
    },

    // ========================================
    // CUSTOMER WINS
    // For showcasing customer success stories and anecdotes
    // ========================================

    {
      name: 'customerWinsSource',
      title: 'Content Source',
      type: 'string',
      options: {
        list: [
          { title: '✏️ Manual - Enter wins directly', value: 'manual' },
          { title: '🔗 Reference - Select existing proof points', value: 'reference' },
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
      hidden: ({ parent }: any) => parent?.sectionType !== 'customerWins',
    },

    {
      name: 'customerWinRefs',
      title: 'Select Customer Wins',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'coeEntry' }],
        options: {
          filter: 'entryType == "proof-point" && (proofType == "anecdote" || proofType == "quote" || proofType == "case-study")',
        },
      }],
      description: 'Select existing anecdotes, quotes, or case studies',
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'customerWins' ||
        parent?.customerWinsSource !== 'reference',
    },

    {
      name: 'manualCustomerWins',
      title: 'Customer Wins',
      type: 'array',
      of: [{
        type: 'object',
        name: 'customerWin',
        title: 'Customer Win',
        fields: [
          {
            name: 'headline',
            title: 'Headline',
            type: 'string',
            description: 'The key achievement or quote',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'customer',
            title: 'Customer',
            type: 'string',
            description: 'Customer name (or "Anonymous" if not approved)',
          },
          {
            name: 'customerLogo',
            title: 'Customer Logo',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'industry',
            title: 'Industry',
            type: 'string',
          },
          {
            name: 'quote',
            title: 'Quote',
            type: 'text',
            rows: 3,
            description: 'Full quote or story',
          },
          {
            name: 'attribution',
            title: 'Attribution',
            type: 'string',
            description: 'Who said it? (e.g., "VP of Customer Experience")',
          },
          {
            name: 'metrics',
            title: 'Key Metrics',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Quantitative results (e.g., "87% resolution rate")',
          },
          {
            name: 'sourceUrl',
            title: 'Source URL',
            type: 'url',
          },
          {
            name: 'winType',
            title: 'Type',
            type: 'string',
            options: {
              list: [
                { title: '💬 Quote', value: 'quote' },
                { title: '📖 Story', value: 'story' },
                { title: '📊 Metric', value: 'metric' },
              ],
            },
          },
        ],
        preview: {
          select: { headline: 'headline', customer: 'customer', type: 'winType' },
          prepare({ headline, customer, type }: any) {
            const icons: Record<string, string> = {
              quote: '💬',
              story: '📖',
              metric: '📊',
            };
            return {
              title: headline,
              subtitle: `${icons[type] || '🏆'} ${customer || 'Anonymous'}`,
            };
          },
        },
      }],
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'customerWins' ||
        parent?.customerWinsSource !== 'manual',
    },

    {
      name: 'customerWinsLayout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel - Scrollable cards', value: 'carousel' },
          { title: 'Grid - Card grid', value: 'grid' },
          { title: 'Featured - One large + smaller', value: 'featured' },
          { title: 'List - Vertical list', value: 'list' },
          { title: 'Testimonial - Quote style', value: 'testimonial' },
        ],
      },
      initialValue: 'carousel',
      hidden: ({ parent }: any) => parent?.sectionType !== 'customerWins',
    },

    {
      name: 'customerWinsShowMetrics',
      title: 'Show Metrics',
      type: 'boolean',
      description: 'Display metrics alongside quotes/stories',
      initialValue: true,
      hidden: ({ parent }: any) => parent?.sectionType !== 'customerWins',
    },

    // ========================================
    // STATS HIGHLIGHT
    // Simple row of big stats (standalone version of proof points)
    // ========================================

    {
      name: 'highlightStats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        name: 'highlightStat',
        title: 'Stat',
        fields: [
          {
            name: 'statValue',
            title: 'Value',
            type: 'string',
            description: 'e.g., "87%", "$2.4M", "15 min"',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'statLabel',
            title: 'Label',
            type: 'string',
            description: 'e.g., "Resolution rate", "Saved annually"',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'statColor',
            title: 'Color',
            type: 'string',
            options: {
              list: [
                { title: '🟣 Purple', value: 'purple' },
                { title: '🟢 Green', value: 'green' },
                { title: '🔵 Blue', value: 'blue' },
                { title: '⚫ Dark', value: 'dark' },
                { title: '🌈 Gradient', value: 'gradient' },
              ],
            },
            initialValue: 'purple',
          },
          {
            name: 'statIcon',
            title: 'Icon (optional)',
            type: 'string',
            description: 'Emoji to display with stat',
          },
        ],
        preview: {
          select: { value: 'statValue', label: 'statLabel' },
          prepare({ value, label }: any) {
            return { title: value, subtitle: label };
          },
        },
      }],
      validation: (Rule: any) => Rule.max(6),
      description: 'Maximum 6 stats',
      hidden: ({ parent }: any) => parent?.sectionType !== 'statsHighlight',
    },

    {
      name: 'statsLayout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Row - Horizontal row', value: 'row' },
          { title: 'Grid (2x2) - Two by two', value: 'grid' },
          { title: 'Grid (3) - Three across', value: 'grid-3' },
          { title: 'Featured - One large + smaller', value: 'featured' },
        ],
      },
      initialValue: 'row',
      hidden: ({ parent }: any) => parent?.sectionType !== 'statsHighlight',
    },

    {
      name: 'statsSize',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Large - Big, prominent stats', value: 'large' },
          { title: 'Medium - Standard size', value: 'medium' },
          { title: 'Small - Compact', value: 'small' },
        ],
      },
      initialValue: 'large',
      hidden: ({ parent }: any) => parent?.sectionType !== 'statsHighlight',
    },

    // ========================================
    // QUICK LINKS
    // Grid of icon + label links for navigation
    // ========================================

    {
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [{
        type: 'object',
        name: 'quickLink',
        title: 'Link',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Emoji icon',
          },
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string',
            description: 'Brief description (optional)',
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'isExternal',
            title: 'External Link',
            type: 'boolean',
            description: 'Opens in new tab',
            initialValue: false,
          },
        ],
        preview: {
          select: { label: 'label', icon: 'icon' },
          prepare({ label, icon }: any) {
            return { title: `${icon || '🔗'} ${label}` };
          },
        },
      }],
      hidden: ({ parent }: any) => parent?.sectionType !== 'quickLinks',
    },

    {
      name: 'quickLinksLayout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (4) - Four across', value: 'grid-4' },
          { title: 'Grid (3) - Three across', value: 'grid-3' },
          { title: 'Grid (2) - Two across', value: 'grid-2' },
          { title: 'List - Vertical list', value: 'list' },
        ],
      },
      initialValue: 'grid-4',
      hidden: ({ parent }: any) => parent?.sectionType !== 'quickLinks',
    },

    // ========================================
    // CONTENT BROWSER
    // Dynamic section that displays filtered CoE content
    // ========================================

    {
      name: 'browserContentType',
      title: 'Content Type to Browse',
      type: 'string',
      options: {
        list: [
          { title: 'All CoE Entries', value: 'all' },
          { title: 'Best Practices', value: 'best-practice' },
          { title: 'Process Innovations', value: 'process-innovation' },
          { title: 'Proof Points', value: 'proof-point' },
          { title: 'Tools', value: 'tool' },
          { title: 'Meeting Assets', value: 'meeting-asset' },
        ],
      },
      initialValue: 'all',
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
    },

    {
      name: 'browserDefaultSection',
      title: 'Filter by Section',
      type: 'reference',
      to: [{ type: 'coeSection' }],
      description: 'Only show entries from this section (optional)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
    },

    {
      name: 'browserDefaultChannel',
      title: 'Filter by Channel',
      type: 'reference',
      to: [{ type: 'coeChannel' }],
      description: 'Only show entries for this channel (optional)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
    },

    {
      name: 'browserShowFilters',
      title: 'Show Filter Controls',
      type: 'boolean',
      description: 'Allow users to filter the content',
      initialValue: true,
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
    },

    {
      name: 'browserFilterOptions',
      title: 'Available Filters',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Channel', value: 'channel' },
          { title: 'Capability', value: 'capability' },
          { title: 'Audience', value: 'audience' },
          { title: 'Industry', value: 'industry' },
          { title: 'Content Category', value: 'content-category' },
          { title: 'Product', value: 'product' },
        ],
      },
      hidden: ({ parent }: any) =>
        parent?.sectionType !== 'contentBrowser' ||
        !parent?.browserShowFilters,
    },

    {
      name: 'browserShowSearch',
      title: 'Show Search',
      type: 'boolean',
      description: 'Include search functionality',
      initialValue: true,
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
    },

    {
      name: 'browserLayout',
      title: 'Display Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid - Card grid', value: 'grid' },
          { title: 'List - Vertical list', value: 'list' },
          { title: 'Compact - Dense list', value: 'compact' },
          { title: 'Table - Table view', value: 'table' },
        ],
      },
      initialValue: 'grid',
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
    },

    {
      name: 'browserMaxItems',
      title: 'Max Items to Display',
      type: 'number',
      description: 'Initial items to show before "Load More" (leave empty for pagination)',
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
    },

    {
      name: 'browserPinnedEntries',
      title: 'Pinned Entries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coeEntry' }] }],
      description: 'Pin specific entries at the top',
      hidden: ({ parent }: any) => parent?.sectionType !== 'contentBrowser',
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
        split: '⚖️',
        embed: '🔗',
        cta: '🎯',
        quote: '💬',
        // CoE section types
        proofPointsGrid: '📊',
        featuredTool: '🛠️',
        frameworkSteps: '🔢',
        resourceCards: '🃏',
        customerWins: '🏆',
        statsHighlight: '📈',
        quickLinks: '🔗',
        contentBrowser: '📋',
      }
      return {
        title: `${icons[sectionType] || '📄'} ${title}`,
        subtitle: description || sectionType,
      }
    },
  },
}
