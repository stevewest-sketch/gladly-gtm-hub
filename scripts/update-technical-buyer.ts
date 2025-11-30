/**
 * Update Technical Buyer Enablement entry with new URLs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const SLUG = 'technical-buyer-enablement-ciocto';
const NEW_VIDEO_URL = 'https://drive.google.com/file/d/1ZXszCroPsKZr84Nt560OikWmgpzjM1xU/view?usp=drive_link';
const TRANSCRIPT_URL = 'https://docs.google.com/document/d/1pOmV9otFQzxRRtJxW5sYvGLD0w_Nv2vI52DjAGuB5J8/edit?usp=drive_link';
const SLIDES_URL = 'https://docs.google.com/presentation/d/1NXc2GmnFDOmtePM-c9G0GrSlY5Fb0VXZHWZKrOF0MuY/edit?usp=drive_link';

async function updateTechnicalBuyer() {
  console.log('Updating Technical Buyer Enablement entry...\n');

  const doc = await client.fetch(
    `*[_type == "catalogEntry" && slug.current == $slug][0] { _id, title }`,
    { slug: SLUG }
  );

  if (!doc) {
    console.log('Entry not found!');
    return;
  }

  console.log(`Found: ${doc.title}`);
  console.log(`Setting:`);
  console.log(`  Video URL: ${NEW_VIDEO_URL}`);
  console.log(`  Session URL: ${NEW_VIDEO_URL}`);
  console.log(`  Transcript URL: ${TRANSCRIPT_URL}`);
  console.log(`  Slides URL: ${SLIDES_URL}`);

  await client
    .patch(doc._id)
    .set({
      'mainContent.videoUrl': NEW_VIDEO_URL,
      'resourceLinks.videoUrl': NEW_VIDEO_URL,
      'resourceLinks.transcriptUrl': TRANSCRIPT_URL,
      'resourceLinks.slidesUrl': SLIDES_URL,
    })
    .commit();

  console.log('\n✅ Updated successfully!');
}

updateTechnicalBuyer().catch(console.error);
