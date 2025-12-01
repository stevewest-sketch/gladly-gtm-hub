import { defineConfig, Template } from 'sanity'
import { structureTool } from 'sanity/structure'
import { assist } from '@sanity/assist'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { AIContentAssistant } from './sanity/actions/AIContentAssistant'

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
      pageTemplate: 'training-session',
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
      pageTemplate: 'play',
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
    assist(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...initialValueTemplates],
  },

  document: {
    actions: (prev, context) => {
      // Add AI Content Assistant for catalogEntry and coeEntry documents
      if (['catalogEntry', 'coeEntry'].includes(context.schemaType)) {
        return [AIContentAssistant, ...prev]
      }
      return prev
    },
  },
})
