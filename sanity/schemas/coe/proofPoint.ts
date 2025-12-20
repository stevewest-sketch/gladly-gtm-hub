import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'proofPoint',
  title: 'Proof Point',
  type: 'document',
  fields: [
    defineField({
      name: 'stat',
      title: 'The Stat',
      type: 'string',
      description: 'The proof point itself, e.g., "33% decrease in handle time"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customer',
      title: 'Customer / Source',
      type: 'string',
      description: 'Customer name or "Blind case study" or "Internal calculations"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isBlind',
      title: 'Blind Case Study?',
      type: 'boolean',
      description: 'Check if this cannot be attributed to a specific customer',
      initialValue: false
    }),
    defineField({
      name: 'kpiCategory',
      title: 'KPI Category',
      type: 'string',
      options: {
        list: [
          { title: 'Resolution Rate', value: 'Resolution Rate' },
          { title: 'Handle Time', value: 'Handle Time' },
          { title: 'CSAT', value: 'CSAT' },
          { title: 'FCR', value: 'FCR' },
          { title: 'Cost Savings', value: 'Cost Savings' },
          { title: 'ROI', value: 'ROI' },
          { title: 'Volume / Capacity', value: 'Volume' },
          { title: 'Self-Service', value: 'Self-Service' },
          { title: 'Revenue', value: 'Revenue' },
          { title: 'Other', value: 'Other' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Sidekick', value: 'Sidekick' },
          { title: 'Gladly Platform', value: 'Gladly Platform' },
          { title: 'Gladly Team (Hero)', value: 'Gladly Team' },
          { title: 'Guides', value: 'Guides' },
          { title: 'Journeys', value: 'Journeys' },
          { title: 'Sidekick Sales', value: 'Sidekick Sales' },
          { title: 'App Platform', value: 'App Platform' },
          { title: 'Voice AI', value: 'Voice AI' }
        ]
      }
    }),
    defineField({
      name: 'channel',
      title: 'Channel',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'All' },
          { title: 'Chat', value: 'Chat' },
          { title: 'Email', value: 'Email' },
          { title: 'Voice', value: 'Voice' },
          { title: 'SMS', value: 'SMS' },
          { title: 'Digital', value: 'Digital' }
        ]
      }
    }),
    defineField({
      name: 'approved',
      title: 'Approved for External Use',
      type: 'boolean',
      description: 'Has customer approved sharing this stat externally?',
      initialValue: false
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to original source (case study, doc, etc.)'
    }),
    defineField({
      name: 'context',
      title: 'Context / Notes',
      type: 'text',
      description: 'Additional context about this proof point'
    }),
    defineField({
      name: 'dateCollected',
      title: 'Date Collected',
      type: 'date'
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Retail / Apparel', value: 'Retail' },
          { title: 'Travel / Airlines', value: 'Travel' },
          { title: 'DTC / E-commerce', value: 'DTC' },
          { title: 'Food & Beverage', value: 'Food' },
          { title: 'Health & Wellness', value: 'Health' },
          { title: 'Financial Services', value: 'Finance' },
          { title: 'Other', value: 'Other' }
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'stat',
      subtitle: 'customer'
    }
  }
})
