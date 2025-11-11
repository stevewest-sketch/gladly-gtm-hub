import {defineMigration, at, set} from 'sanity/migrate'

export default defineMigration({
  title: 'Migrate All Legacy Fields to Page Builder',
  documentTypes: ['homepage'],

  migrate: {
    document(doc, context) {
      // Get existing pageBuilder (might already have whatsNewSection from previous migration)
      const currentPageBuilder = doc.pageBuilder || []

      // Build array of new sections from legacy fields
      const newSections: any[] = []

      // 1. Hero Section
      if (doc.heroTitle || doc.heroSubtitle || doc.searchPlaceholder) {
        newSections.push({
          _type: 'heroWithSearchSection',
          _key: 'hero',
          heroTitle: doc.heroTitle || 'The GTM Hub',
          heroSubtitle: doc.heroSubtitle || 'Your central hub for selling, supporting, and growing with Gladly',
          searchPlaceholder: doc.searchPlaceholder || 'Search for battle cards, templates, demos, product info...',
        })
      }

      // 2. Team Toolkits Section
      if (doc.teamToolkits && doc.teamToolkits.length > 0) {
        newSections.push({
          _type: 'teamToolkitsSection',
          _key: 'teamToolkits',
          sectionTitle: doc.teamToolkitsTitle || 'Start with Your Role',
          sectionSubtitle: doc.teamToolkitsSubtitle || 'Everything you need, organized for your job',
          toolkits: doc.teamToolkits,
        })
      }

      // 3. Quick Tasks Section
      if (doc.quickTasks && doc.quickTasks.length > 0) {
        newSections.push({
          _type: 'quickTasksSection',
          _key: 'quickTasks',
          sectionTitle: doc.quickTasksTitle || 'What do you need to do today?',
          tasks: doc.quickTasks,
        })
      }

      // 4. Products Grid Section
      if (doc.products && doc.products.length > 0) {
        newSections.push({
          _type: 'productsGridSection',
          _key: 'productsGrid',
          sectionTitle: doc.productsTitle || 'Product Knowledge',
          sectionSubtitle: doc.productsSubtitle || 'Learn about our products and features',
          products: doc.products,
        })
      }

      // 5. What's New Section (preserve existing one if it exists, otherwise migrate legacy)
      const existingWhatsNew = currentPageBuilder.find((section: any) => section._type === 'whatsNewSection')
      if (existingWhatsNew) {
        newSections.push(existingWhatsNew)
      } else if (doc.whatsNew && doc.whatsNew.length > 0) {
        newSections.push({
          _type: 'whatsNewSection',
          _key: 'whatsNew',
          badgeText: doc.whatsNewBadge || 'Oct 2025',
          updates: doc.whatsNew,
        })
      }

      // 6. Popular Resources Section
      if (doc.popularResources && doc.popularResources.length > 0) {
        newSections.push({
          _type: 'popularResourcesSection',
          _key: 'popularResources',
          sectionTitle: doc.popularResourcesTitle || 'Most Useful Resources',
          resources: doc.popularResources,
        })
      }

      // 7. Help Section
      if (doc.helpSection && (doc.helpSection.title || doc.helpSection.description)) {
        newSections.push({
          _type: 'helpSection',
          _key: 'help',
          title: doc.helpSection.title || '💡 Can\'t find what you need?',
          description: doc.helpSection.description || 'Ask in Slack - the team will help you find it',
          buttons: doc.helpSection.buttons || [],
        })
      }

      // Set the pageBuilder with all migrated sections
      return at('pageBuilder', set(newSections))
    },
  },
})
