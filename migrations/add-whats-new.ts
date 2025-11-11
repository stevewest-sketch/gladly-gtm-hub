import {defineMigration, at, set} from 'sanity/migrate'

const whatsNewSection = {
  _type: 'whatsNewSection',
  _key: 'whatsNew',
  badgeText: 'OCT 2025',
  updates: [
    {
      _key: 'update1',
      date: 'OCTOBER 1, 2025',
      emoji: '📦',
      title: 'Conversation Reviewer Enhancements',
      description: "Improve visibility into Sidekick's response reasoning to help customers make targeted improvements.",
      links: [
        {_key: 'link1', text: 'Product Guide', url: '#'},
        {_key: 'link2', text: 'Training Materials', url: '#'},
      ],
    },
    {
      _key: 'update2',
      date: 'OCTOBER 1, 2025',
      emoji: '🎯',
      title: 'Guide-Level Advice',
      description: 'Customize advice at the individual guide level to support tailored tone and coaching.',
      links: [
        {_key: 'link1', text: 'Documentation', url: '#'},
        {_key: 'link2', text: 'Demo Setup', url: '#'},
      ],
    },
    {
      _key: 'update3',
      date: 'SEPTEMBER 28, 2025',
      emoji: '💰',
      title: 'Cost Tracking for Sidekick Sales',
      description: 'Track costs and explore optimizations as Sidekick Sales scales.',
      links: [
        {_key: 'link1', text: 'Feature Overview', url: '#'},
        {_key: 'link2', text: 'Customer FAQ', url: '#'},
      ],
    },
  ],
}

export default defineMigration({
  title: 'Add Whats New Section',
  documentTypes: ['homepage'],

  migrate: {
    document(doc, context) {
      // Get existing pageBuilder or initialize as empty array
      const currentPageBuilder = doc.pageBuilder || []

      // Remove any existing whatsNewSection
      const filteredPageBuilder = currentPageBuilder.filter(
        (section: any) => section._type !== 'whatsNewSection'
      )

      // Add the new whatsNewSection
      const updatedPageBuilder = [...filteredPageBuilder, whatsNewSection]

      // Return the set operation
      return at('pageBuilder', set(updatedPageBuilder))
    },
  },
})
