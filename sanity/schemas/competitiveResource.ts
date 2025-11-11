export default {
  name: 'competitiveResource',
  title: 'Competitive Resources',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'competitor',
      title: 'Competitor',
      type: 'string',
      options: {
        list: [
          { title: 'All Competitors', value: 'all' },
          { title: 'Zendesk', value: 'zendesk' },
          { title: 'Salesforce', value: 'salesforce' },
          { title: 'Freshdesk', value: 'freshdesk' },
          { title: 'Intercom', value: 'intercom' },
          { title: 'Genesys', value: 'genesys' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'All Types', value: 'all' },
          { title: 'Battle Card', value: 'battlecard' },
          { title: 'Feature Comparison', value: 'comparison' },
          { title: 'Positioning Guide', value: 'positioning' },
          { title: 'Win/Loss Analysis', value: 'winloss' },
          { title: 'Objection Handling', value: 'objections' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon/Emoji',
      type: 'string',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      description: 'e.g., "Updated Oct 2024"',
    },
    {
      name: 'link',
      title: 'Link to Resource',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'competitor',
      type: 'resourceType',
    },
    prepare(selection: any) {
      const { title, subtitle, type } = selection;
      return {
        title: title,
        subtitle: `${subtitle} • ${type}`,
      };
    },
  },
}
