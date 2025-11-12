export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL Path)',
      type: 'slug',
      description: 'e.g., "coe/bva" for /coe/bva page',
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'object',
      description: 'Override default SEO settings for this page',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Custom title for search engines (leave empty to use Page Title)',
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description shown in search results (150-160 characters)',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image shown when sharing on social media (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          description: 'Prevent search engines from indexing this page',
          initialValue: false,
        },
      ],
    },
    {
      name: 'heroStyle',
      title: 'Hero Background Style',
      type: 'string',
      description: 'Choose from preset gradients, solids, or create custom',
      options: {
        list: [
          { title: 'Gradient - Purple (Default)', value: 'gradient-purple' },
          { title: 'Gradient - Blue', value: 'gradient-blue' },
          { title: 'Gradient - Green', value: 'gradient-green' },
          { title: 'Gradient - Orange', value: 'gradient-orange' },
          { title: 'Gradient - Pink', value: 'gradient-pink' },
          { title: 'Gradient - Teal', value: 'gradient-teal' },
          { title: 'Gradient - Custom', value: 'gradient-custom' },
          { title: 'Solid - Purple', value: 'solid-purple' },
          { title: 'Solid - Blue', value: 'solid-blue' },
          { title: 'Solid - Green', value: 'solid-green' },
          { title: 'Solid - Orange', value: 'solid-orange' },
          { title: 'Solid - Pink', value: 'solid-pink' },
          { title: 'Solid - Teal', value: 'solid-teal' },
          { title: 'Solid - Custom', value: 'solid-custom' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'gradient-purple',
    },
    {
      name: 'heroGradientStart',
      title: 'Custom Gradient Start Color',
      type: 'string',
      description: 'Hex color code (e.g., #6B46C1)',
      initialValue: '#6B46C1',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'gradient-custom',
    },
    {
      name: 'heroGradientMiddle',
      title: 'Custom Gradient Middle Color',
      type: 'string',
      description: 'Hex color code (e.g., #8C69F0)',
      initialValue: '#8C69F0',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'gradient-custom',
    },
    {
      name: 'heroGradientEnd',
      title: 'Custom Gradient End Color',
      type: 'string',
      description: 'Hex color code (e.g., #A78BFA)',
      initialValue: '#A78BFA',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'gradient-custom',
    },
    {
      name: 'heroSolidColor',
      title: 'Custom Solid Color',
      type: 'string',
      description: 'Hex color code (e.g., #8C69F0)',
      initialValue: '#8C69F0',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'solid-custom',
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
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
                    validation: (Rule: any) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    },
    {
      name: 'quickNav',
      title: 'Quick Navigation (Anchor Links)',
      type: 'array',
      description: 'Add sticky navigation buttons that jump to sections on the page',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Button Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'anchor',
              title: 'Anchor ID',
              type: 'string',
              description: 'e.g., "overview" for #overview (no # symbol)',
              validation: (Rule: any) => Rule.required().regex(/^[a-z0-9-]+$/, {
                name: 'anchor',
                invert: false,
              }).error('Use lowercase letters, numbers, and hyphens only'),
            },
          ],
          preview: {
            select: {
              label: 'label',
              anchor: 'anchor',
            },
            prepare({ label, anchor }: any) {
              return {
                title: label,
                subtitle: `#${anchor}`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'pageBuilder',
      title: 'Page Builder (Drag & Drop Sections)',
      type: 'array',
      description: 'Build your page by adding and reordering different section types',
      of: [
        { type: 'heroSection' },
        { type: 'featureGridSection' },
        { type: 'statsSection' },
        { type: 'contentSection' },
        { type: 'ctaSection' },
        { type: 'launchStatusSection' },
        { type: 'imageTextSection' },
        { type: 'accordionSection' },
        { type: 'videoSection' },
        { type: 'testimonialSection' },
        { type: 'quickStatsSection' },
        { type: 'featuredContentSection' },
      ],
    },
    {
      name: 'sections',
      title: 'Legacy Content Sections (deprecated)',
      type: 'array',
      description: 'Old section format - use Page Builder instead',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'sectionContent',
              title: 'Section Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      slug: 'slug.current',
    },
    prepare(selection: any) {
      const { title, subtitle, slug } = selection;
      return {
        title: title,
        subtitle: slug ? `/${slug}` : subtitle || 'No slug set',
      };
    },
  },
}
