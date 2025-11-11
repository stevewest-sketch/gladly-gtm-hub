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
      name: 'heroColor',
      title: 'Hero Section Color',
      type: 'string',
      options: {
        list: [
          { title: 'Purple', value: 'purple' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Orange', value: 'orange' },
        ],
        layout: 'radio',
      },
      initialValue: 'purple',
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
