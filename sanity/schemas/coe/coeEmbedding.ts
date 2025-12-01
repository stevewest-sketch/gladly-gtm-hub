import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'coeEmbedding',
  title: 'CoE Embedding',
  type: 'document',
  // Hide from regular studio navigation
  fields: [
    defineField({
      name: 'entry',
      title: 'Entry',
      type: 'reference',
      to: [{ type: 'coeEntry' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedding',
      title: 'Embedding Vector',
      type: 'array',
      of: [{ type: 'number' }],
    }),
    defineField({
      name: 'textHash',
      title: 'Text Hash',
      type: 'string',
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
      title: 'entry.title',
      created: 'createdAt',
    },
    prepare({ title, created }) {
      return {
        title: title || 'Embedding',
        subtitle: created ? `Created: ${new Date(created).toLocaleDateString()}` : '',
      };
    },
  },
});
