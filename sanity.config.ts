import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { ProcessTranscriptAction } from './sanity/actions/ProcessTranscriptAction'

export default defineConfig({
  name: 'default',
  title: 'My Website',
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
  },

  document: {
    actions: (prev, context) => {
      // Add Process Transcript action only for enablementArticle documents
      if (context.schemaType === 'enablementArticle') {
        return [...prev, ProcessTranscriptAction]
      }
      return prev
    },
  },
})
