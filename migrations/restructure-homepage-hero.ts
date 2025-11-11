import {defineMigration, at, set, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Restructure Homepage - Move Hero to Fixed Fields',
  documentTypes: ['homepage'],

  migrate: {
    document(doc, context) {
      const currentPageBuilder = doc.pageBuilder || []

      // Find and extract hero section from pageBuilder
      const heroSection = currentPageBuilder.find((section: any) => section._type === 'heroWithSearchSection')

      // Remove hero from pageBuilder
      const newPageBuilder = currentPageBuilder.filter((section: any) => section._type !== 'heroWithSearchSection')

      // Create patches to update the document
      const patches: any[] = []

      // Set hero fields from pageBuilder hero section or keep existing
      if (heroSection) {
        patches.push(
          at('heroTitle', set(heroSection.heroTitle || doc.heroTitle || 'The GTM Hub')),
          at('heroSubtitle', set(heroSection.heroSubtitle || doc.heroSubtitle || 'Your central hub for selling, supporting, and growing with Gladly')),
          at('searchPlaceholder', set(heroSection.searchPlaceholder || doc.searchPlaceholder || 'Search for battle cards, templates, demos, product info...'))
        )
      } else {
        // Ensure hero fields exist even if no hero in pageBuilder
        patches.push(
          at('heroTitle', setIfMissing(doc.heroTitle || 'The GTM Hub')),
          at('heroSubtitle', setIfMissing(doc.heroSubtitle || 'Your central hub for selling, supporting, and growing with Gladly')),
          at('searchPlaceholder', setIfMissing(doc.searchPlaceholder || 'Search for battle cards, templates, demos, product info...'))
        )
      }

      // Update pageBuilder without hero section
      patches.push(at('pageBuilder', set(newPageBuilder)))

      // Apply all patches
      return patches
    },
  },
})
