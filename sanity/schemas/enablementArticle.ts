export default {
  name: 'enablementArticle',
  title: 'Enablement Articles',
  type: 'document',
  description: 'Processed training transcripts and enablement content',
  fields: [
    {
      name: 'rawTranscript',
      title: 'Raw Transcript (Optional)',
      type: 'text',
      description: 'Paste meeting transcript here - use "Process Transcript" action to auto-fill fields below',
      rows: 8,
      hidden: ({ document }: any) => !!document?.title, // Hide once processed
    },
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
    },
    {
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 3,
      description: '2-3 sentence overview',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Product', value: 'Product' },
          { title: 'Toolkit', value: 'Toolkit' },
          { title: 'Competitive', value: 'Competitive' },
          { title: 'Learning', value: 'Learning' },
          { title: 'CoE', value: 'CoE' },
          { title: 'Resources', value: 'Resources' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Training', value: 'Training' },
          { title: 'Meeting', value: 'Meeting' },
          { title: 'Demo', value: 'Demo' },
          { title: 'Guide', value: 'Guide' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'audience',
      title: 'Target Audience',
      type: 'string',
      options: {
        list: [
          { title: 'Sales', value: 'Sales' },
          { title: 'CSM', value: 'CSM' },
          { title: 'SC', value: 'SC' },
          { title: 'Marketing', value: 'Marketing' },
          { title: 'Leadership', value: 'Leadership' },
          { title: 'All Teams', value: 'All Teams' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Major insights and learnings (3-7 bullet points)',
    },
    {
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'text',
              rows: 8,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'heading',
              content: 'content',
            },
            prepare({ title, content }: any) {
              return {
                title,
                subtitle: content?.slice(0, 80) + '...',
              };
            },
          },
        },
      ],
    },
    {
      name: 'actionItems',
      title: 'Action Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Actionable next steps from the content',
    },
    {
      name: 'videoUrl',
      title: 'Session Video URL',
      type: 'url',
      description: 'Link to recording (Google Drive, Wistia, etc.) - can be auto-extracted from transcript or added manually',
      placeholder: 'https://drive.google.com/file/d/... or https://gladly.wistia.com/...',
    },
    {
      name: 'slidesUrl',
      title: 'Presentation Slides URL',
      type: 'url',
      description: 'Link to presentation deck (Google Slides, PDF, etc.) - can be auto-extracted from transcript or added manually',
      placeholder: 'https://docs.google.com/presentation/...',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Topics and keywords for search and filtering',
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'e.g., "5 minutes"',
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'SEO Title',
          type: 'string',
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'SEO Description',
          type: 'text',
          rows: 2,
          validation: (Rule: any) => Rule.max(160),
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
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
      category: 'category',
      contentType: 'contentType',
      audience: 'audience',
    },
    prepare({ title, category, contentType, audience }: any) {
      return {
        title,
        subtitle: `${contentType} • ${category} • ${audience}`,
      };
    },
  },
};
