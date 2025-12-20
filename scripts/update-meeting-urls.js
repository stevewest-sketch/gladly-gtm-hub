const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '9epiazve',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  // Update 1/9/25 Enablement: Voice AI
  const voiceAI = await client.fetch(`*[_type == "coeEntry" && title match "*1/9/25*Voice*"][0]{_id, title}`);
  if (voiceAI) {
    await client.patch(voiceAI._id).set({
      videoUrl: 'https://drive.google.com/file/d/1zRwLZmitdGlgQ4B2N2Rn00K5i2wznC6U/view?usp=drive_link',
      slidesUrl: 'https://docs.google.com/presentation/d/1KakiYx7r79ITbjUbK1hZkWOMLylOd4D0ZbqOC5sMcBc/edit?usp=drive_link'
    }).commit();
    console.log('UPDATED:', voiceAI.title);
  }

  // Update 7/17/25 BVA SLA entries
  const bvaSLA = await client.fetch(`*[_type == "coeEntry" && (title match "*7/17*BVA*" || title match "*7/17/25*" || title match "*7/17/26*BVA*")]{_id, title}`);
  for (const doc of bvaSLA) {
    await client.patch(doc._id).set({
      videoUrl: 'https://drive.google.com/file/d/1Itkk6F2_Xyo697xny_TN99yQM4NscpdV/view?usp=drive_link',
      slidesUrl: 'https://docs.google.com/presentation/d/1Xrvj5G2QH9Cz85c4F8nJKKtex4YL7MBdyUf5K4kxaFM/edit?usp=drive_link'
    }).commit();
    console.log('UPDATED:', doc.title);
  }

  // Delete entries (skip if they have references)
  const patternsToDelete = [
    'Birkenstock Example',
    'Smith Optics Example',
    'Answer Threads Kickoff',
    'Sales Attribution Guide'
  ];

  for (const pattern of patternsToDelete) {
    const docs = await client.fetch(`*[_type == "coeEntry" && title match "*${pattern}*"]{_id, title}`);
    for (const doc of docs) {
      try {
        await client.delete(doc._id);
        console.log('DELETED:', doc.title);
      } catch (err) {
        console.log('SKIP (has refs):', doc.title);
      }
    }
  }

  // Delete Deckers meeting-asset entries
  const deckers = await client.fetch(`*[_type == "coeEntry" && title match "*Deckers*" && entryType == "meeting-asset"]{_id, title}`);
  for (const doc of deckers) {
    try {
      await client.delete(doc._id);
      console.log('DELETED:', doc.title);
    } catch (err) {
      console.log('SKIP (has refs):', doc.title);
    }
  }

  // Delete template/guide entries
  const templates = await client.fetch(`*[_type == "coeEntry" && entryType == "meeting-asset" && (
    title match "*Template*" ||
    title match "*Guide*" ||
    title match "*Kickoff*"
  )]{_id, title}`);
  for (const doc of templates) {
    try {
      await client.delete(doc._id);
      console.log('DELETED:', doc.title);
    } catch (err) {
      console.log('SKIP (has refs):', doc.title);
    }
  }

  console.log('\nDone!');
}

run().catch(console.error);
