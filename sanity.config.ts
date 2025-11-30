import { defineConfig, Template } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { ProcessContentAction } from './sanity/actions/ProcessContentAction'

// Streamlined initial value templates for the new schema
const initialValueTemplates: Template[] = [
  // Content Hub entry
  {
    id: 'catalogEntry-content-hub',
    title: 'Content Hub Card',
    schemaType: 'catalogEntry',
    value: {
      publishedTo: ['content'],
      status: 'draft',
      aiInput: { inputMode: 'manual' },
    },
  },
  // Enablement Hub entries by template type
  {
    id: 'catalogEntry-training',
    title: 'Training Session',
    schemaType: 'catalogEntry',
    value: {
      publishedTo: ['enablement'],
      pageTemplate: 'training',
      status: 'draft',
      aiInput: { inputMode: 'paste' },
    },
  },
  {
    id: 'catalogEntry-playbook',
    title: 'Playbook / How-To',
    schemaType: 'catalogEntry',
    value: {
      publishedTo: ['enablement'],
      pageTemplate: 'playbook',
      status: 'draft',
      aiInput: { inputMode: 'paste' },
    },
  },
  {
    id: 'catalogEntry-battle-card',
    title: 'Battle Card',
    schemaType: 'catalogEntry',
    value: {
      publishedTo: ['enablement'],
      pageTemplate: 'battle-card',
      status: 'draft',
      aiInput: { inputMode: 'manual' },
    },
  },
]

export default defineConfig({
  name: 'default',
  title: 'GTM Hub',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9epiazve',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...initialValueTemplates],
  },

  document: {
    actions: (prev, context) => {
      // Add Process Content action for catalogEntry documents
      if (context.schemaType === 'catalogEntry') {
        return [...prev, ProcessContentAction]
      }
      return prev
    },
  },
})
