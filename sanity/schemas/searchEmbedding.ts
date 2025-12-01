import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'searchEmbedding',
  title: 'Search Embedding',
  type: 'document',
  fields: [
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      description: 'The Sanity document type (catalogEntry, coeEntry, etc.)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentId',
      title: 'Content ID',
      type: 'string',
      description: 'The _id of the source document',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hub',
      title: 'Hub',
      type: 'string',
      options: {
        list: [
          { title: 'Enablement', value: 'enablement' },
          { title: 'CoE', value: 'coe' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedding',
      title: 'Embedding Vector',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Voyage AI embedding vector (1024 dimensions)',
      hidden: true,
    }),
    defineField({
      name: 'textContent',
      title: 'Text Content Preview',
      type: 'text',
      description: 'First 500 characters of embedded text (for debugging)',
      rows: 4,
    }),
    defineField({
      name: 'textHash',
      title: 'Text Hash',
      type: 'string',
      description: 'Hash of the embedded text for change detection',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'entryType', type: 'string', title: 'Entry Type' },
        { name: 'section', type: 'string', title: 'Section' },
        { name: 'customer', type: 'string', title: 'Customer' },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'metadata.title',
      contentType: 'contentType',
      hub: 'hub',
    },
    prepare({ title, contentType, hub }) {
      return {
        title: title || 'Untitled',
        subtitle: `${contentType} (${hub})`,
      };
    },
  },
});
