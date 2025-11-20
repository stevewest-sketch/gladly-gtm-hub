import { client } from '../lib/sanity'

async function updateNavigation() {
  try {
    const navigationDoc = {
      _id: 'navigation',
      _type: 'navigation',
      logoText: 'Gladly GTM Hub',
      items: [
        {
          _key: 'home',
          _type: 'navigationItem',
          title: 'Home',
          icon: '🏠',
          href: '/',
          defaultExpanded: false,
          activeColor: 'blue',
        },
        {
          _key: 'coe-hub',
          _type: 'navigationItem',
          title: 'CoE',
          icon: '⭐',
          href: '/coe-hub',
          defaultExpanded: false,
          activeColor: 'orange',
        },
        {
          _key: 'content-hub',
          _type: 'navigationItem',
          title: 'Content',
          icon: '📚',
          href: '/content-hub',
          defaultExpanded: false,
          activeColor: 'green',
        },
      ],
    }

    // Update or create the navigation document
    await client.createOrReplace(navigationDoc)

    console.log('✅ Navigation updated successfully!')
    console.log('New navigation structure:')
    console.log('- Home')
    console.log('- CoE → /coe-hub')
    console.log('- Content → /content-hub')
  } catch (error) {
    console.error('❌ Failed to update navigation:', error)
    process.exit(1)
  }
}

updateNavigation()
