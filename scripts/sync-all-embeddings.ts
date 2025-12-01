import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ========================================
// CONFIGURATION
// ========================================

interface ContentConfig {
  type: string;
  hub: 'enablement' | 'coe' | 'general';
  query: string;
  buildText: (doc: any) => string;
}

const contentConfigs: ContentConfig[] = [
  // Catalog entries (Enablement Hub)
  {
    type: 'catalogEntry',
    hub: 'enablement',
    query: `*[_type == "catalogEntry"]{
      _id,
      title,
      summary,
      description,
      entryType,
      "category": category->name,
      tags
    }`,
    buildText: (doc) => [
      doc.title,
      doc.summary,
      doc.description,
      doc.category ? `Category: ${doc.category}` : '',
      doc.entryType ? `Type: ${doc.entryType}` : '',
      doc.tags?.join(', '),
    ].filter(Boolean).join('\n\n'),
  },

  // CoE entries
  {
    type: 'coeEntry',
    hub: 'coe',
    query: `*[_type == "coeEntry" && status == "published"]{
      _id,
      title,
      summary,
      headline,
      howToUse,
      customer,
      account,
      entryType,
      proofType,
      "section": coeSection->name,
      tags
    }`,
    buildText: (doc) => [
      doc.title,
      doc.summary,
      doc.headline,
      doc.howToUse,
      doc.customer ? `Customer: ${doc.customer}` : '',
      doc.account ? `Account: ${doc.account}` : '',
      doc.entryType ? `Type: ${doc.entryType}` : '',
      doc.proofType ? `Proof Type: ${doc.proofType}` : '',
      doc.section ? `Section: ${doc.section}` : '',
      doc.tags?.join(', '),
    ].filter(Boolean).join('\n\n'),
  },
];

// ========================================
// HELPERS
// ========================================

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'voyage-large-2',
      input: texts,
      input_type: 'document',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Voyage API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data.map((d: any) => d.embedding);
}

// ========================================
// MAIN SYNC
// ========================================

async function syncAllEmbeddings() {
  console.log('🔄 Starting unified embedding sync...\n');

  // Get existing embeddings
  console.log('📥 Fetching existing embeddings...');
  const existing = await sanityClient.fetch<{ contentId: string; textHash: string }[]>(`
    *[_type == "searchEmbedding"]{ contentId, textHash }
  `);
  const existingMap = new Map(existing.map(e => [e.contentId, e.textHash]));
  console.log(`   Found ${existing.length} existing embeddings\n`);

  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const config of contentConfigs) {
    console.log(`\n📂 Processing ${config.type} (${config.hub} hub)...`);

    // Fetch documents
    const docs = await sanityClient.fetch(config.query);
    console.log(`   Found ${docs.length} documents`);

    // Filter to only those needing updates
    const toProcess: { doc: any; text: string; hash: string }[] = [];

    for (const doc of docs) {
      const text = config.buildText(doc);
      const hash = hashString(text);

      if (existingMap.get(doc._id) === hash) {
        totalSkipped++;
        continue;
      }

      toProcess.push({ doc, text, hash });
    }

    console.log(`   ${toProcess.length} need embedding, ${docs.length - toProcess.length} up to date`);

    if (toProcess.length === 0) continue;

    // Process in batches
    const batchSize = 50;
    for (let i = 0; i < toProcess.length; i += batchSize) {
      const batch = toProcess.slice(i, i + batchSize);
      const texts = batch.map(b => b.text);

      console.log(`   🔄 Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(toProcess.length / batchSize)}...`);

      try {
        const embeddings = await generateEmbeddings(texts);

        for (let j = 0; j < batch.length; j++) {
          const { doc, text, hash } = batch[j];
          const embedding = embeddings[j];

          // Check if embedding exists
          const existingDoc = await sanityClient.fetch(
            `*[_type == "searchEmbedding" && contentId == $contentId][0]._id`,
            { contentId: doc._id }
          );

          const embeddingData = {
            contentType: config.type,
            contentId: doc._id,
            hub: config.hub,
            embedding,
            textContent: text.slice(0, 500), // Store first 500 chars for debugging
            textHash: hash,
            metadata: {
              title: doc.title,
              entryType: doc.entryType,
              section: doc.section || doc.category,
              customer: doc.customer,
            },
            updatedAt: new Date().toISOString(),
          };

          if (existingDoc) {
            await sanityClient.patch(existingDoc).set(embeddingData).commit();
          } else {
            await sanityClient.create({
              _type: 'searchEmbedding',
              ...embeddingData,
              createdAt: new Date().toISOString(),
            });
          }

          totalProcessed++;
          console.log(`      ✅ ${doc.title?.slice(0, 40)}...`);
        }

        // Rate limit
        if (i + batchSize < toProcess.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`      ❌ Batch error:`, error);
        totalErrors += batch.length;
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Processed: ${totalProcessed}`);
  console.log(`   Skipped (up to date): ${totalSkipped}`);
  console.log(`   Errors: ${totalErrors}`);
}

syncAllEmbeddings()
  .then(() => {
    console.log('\n✅ Unified embedding sync complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Sync failed:', error);
    process.exit(1);
  });
