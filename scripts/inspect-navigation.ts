import { client } from '../lib/sanity';

async function inspectNavigation() {
  try {
    console.log('🔍 Checking navigation document...\n');

    const nav = await client.fetch(`*[_type == "navigation"][0]`);

    if (nav) {
      console.log('✅ Navigation document found!');
      console.log('\n📄 Navigation data:');
      console.log(JSON.stringify(nav, null, 2));
    } else {
      console.log('❌ No navigation document found in Sanity');
      console.log('The site is using hardcoded navigation as fallback');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

inspectNavigation();
