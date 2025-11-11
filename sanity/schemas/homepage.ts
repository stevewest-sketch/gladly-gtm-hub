export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero Section (Fixed at Top)
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Main heading (displays at 72px)',
      initialValue: 'The GTM Hub',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Supporting text below title',
      initialValue: 'Your central hub for selling, supporting, and growing with Gladly',
    },
    {
      name: 'searchPlaceholder',
      title: 'Search Bar Placeholder',
      type: 'string',
      initialValue: 'Search for battle cards, templates, demos, product info...',
    },
    {
      name: 'heroPaddingTop',
      title: 'Hero Top Spacing',
      type: 'string',
      description: 'Adjust the spacing above the hero title',
      options: {
        list: [
          { title: 'None (0px)', value: 'none' },
          { title: 'Small (40px)', value: 'small' },
          { title: 'Medium (80px)', value: 'medium' },
          { title: 'Large (120px)', value: 'large' },
          { title: 'Extra Large (160px)', value: 'xlarge' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    },
    {
      name: 'heroStyle',
      title: 'Hero Background Style',
      type: 'string',
      description: 'Choose between gradient or solid color',
      options: {
        list: [
          { title: 'Gradient (Default Purple)', value: 'gradient' },
          { title: 'Solid Color', value: 'solid' },
        ],
        layout: 'radio',
      },
      initialValue: 'gradient',
    },
    {
      name: 'heroGradientStart',
      title: 'Gradient Start Color',
      type: 'string',
      description: 'Hex color code (e.g., #6B46C1)',
      initialValue: '#6B46C1',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'gradient',
    },
    {
      name: 'heroGradientMiddle',
      title: 'Gradient Middle Color',
      type: 'string',
      description: 'Hex color code (e.g., #8C69F0)',
      initialValue: '#8C69F0',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'gradient',
    },
    {
      name: 'heroGradientEnd',
      title: 'Gradient End Color',
      type: 'string',
      description: 'Hex color code (e.g., #A78BFA)',
      initialValue: '#A78BFA',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'gradient',
    },
    {
      name: 'heroSolidColor',
      title: 'Solid Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #8C69F0)',
      initialValue: '#8C69F0',
      hidden: ({ parent }: any) => parent?.heroStyle !== 'solid',
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
              description: 'e.g., "toolkits" for #toolkits (no # symbol)',
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
      description: 'Build your homepage by adding and reordering different section types',
      of: [
        { type: 'teamToolkitsSection' },
        { type: 'quickTasksSection' },
        { type: 'productsGridSection' },
        { type: 'whatsNewSection' },
        { type: 'popularResourcesSection' },
        { type: 'helpSection' },
      ],
    },
    // Legacy fields (kept for backwards compatibility)
    {
      name: 'teamToolkitsTitle',
      title: 'Team Toolkits Section Title',
      type: 'string',
      initialValue: 'Start with Your Role',
    },
    {
      name: 'teamToolkitsSubtitle',
      title: 'Team Toolkits Section Subtitle',
      type: 'string',
      initialValue: 'Everything you need, organized for your job',
    },

    // Team Toolkits Section
    {
      name: 'teamToolkits',
      title: 'Team Toolkits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
              description: 'Single emoji character',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
            {
              name: 'color',
              title: 'Color Theme',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue (Sales)', value: 'blue' },
                  { title: 'Purple (CSM)', value: 'purple' },
                  { title: 'Green (SC)', value: 'green' },
                  { title: 'Orange (Marketing)', value: 'orange' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
              color: 'color',
            },
            prepare({ title, emoji, color }: any) {
              return {
                title: `${emoji} ${title}`,
                subtitle: color,
              };
            },
          },
        },
      ],
    },

    // Quick Tasks Section
    {
      name: 'quickTasksTitle',
      title: 'Quick Tasks Section Title',
      type: 'string',
      initialValue: 'What do you need to do today?',
    },
    {
      name: 'quickTasks',
      title: 'Quick Tasks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
            },
            prepare({ title, emoji }: any) {
              return {
                title: `${emoji} ${title}`,
              };
            },
          },
        },
      ],
    },

    // Products Grid Section
    {
      name: 'productsTitle',
      title: 'Products Section Title',
      type: 'string',
      initialValue: 'Product Knowledge',
    },
    {
      name: 'productsSubtitle',
      title: 'Products Section Subtitle',
      type: 'string',
      initialValue: 'Learn about our products and features',
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
            },
            prepare({ title, emoji }: any) {
              return {
                title: `${emoji} ${title}`,
              };
            },
          },
        },
      ],
    },

    // What's New Section
    {
      name: 'whatsNewBadge',
      title: "What's New Badge Text",
      type: 'string',
      initialValue: 'Oct 2025',
      description: 'Badge text shown next to "What\'s New" heading',
    },
    {
      name: 'whatsNew',
      title: "What's New",
      type: 'array',
      validation: (Rule: any) => Rule.max(3),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'Format: MONTH DAY, YEAR (e.g., OCTOBER 1, 2025)',
            },
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              validation: (Rule: any) => Rule.max(2),
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
            },
            prepare({ title, date }: any) {
              return {
                title: title,
                subtitle: date,
              };
            },
          },
        },
      ],
    },

    // Popular Resources Section
    {
      name: 'popularResourcesTitle',
      title: 'Popular Resources Section Title',
      type: 'string',
      initialValue: 'Most Useful Resources',
    },
    {
      name: 'popularResources',
      title: 'Popular Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
            },
            prepare({ title, emoji }: any) {
              return {
                title: `${emoji} ${title}`,
              };
            },
          },
        },
      ],
    },

    // Help Section
    {
      name: 'helpSection',
      title: 'Help Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'buttons',
          title: 'Buttons',
          type: 'array',
          validation: (Rule: any) => Rule.max(2),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                },
                {
                  name: 'variant',
                  title: 'Button Variant',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
