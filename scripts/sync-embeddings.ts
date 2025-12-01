import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

interface CoeEntry {
  _id: string;
  title: string;
  summary?: string;
  headline?: string;
  howToUse?: string;
  customer?: string;
  account?: string;
  tags?: string[];
  entryType: string;
}

// Build text for embedding
function buildEmbeddingText(entry: CoeEntry): string {
  const parts = [
    entry.title,
    entry.summary,
    entry.headline,
    entry.howToUse,
    entry.customer,
    entry.account,
    entry.tags?.join(', '),
    `Type: ${entry.entryType}`,
  ].filter(Boolean);

  return parts.join('\n\n');
}

// Hash function
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Generate embeddings via Voyage API
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

async function syncEmbeddings() {
  console.log('Starting embedding sync...\n');

  // Fetch all entries (including drafts)
  console.log('Fetching CoE entries...');
  const entries = await sanityClient.fetch<CoeEntry[]>(`
    *[_type == "coeEntry"]{
      _id,
      title,
      summary,
      headline,
      howToUse,
      customer,
      account,
      tags,
      entryType
    }
  `);
  console.log(`   Found ${entries.length} published entries\n`);

  // Fetch existing embeddings
  console.log('Fetching existing embeddings...');
  const existingEmbeddings = await sanityClient.fetch<{ entryId: string; textHash: string }[]>(`
    *[_type == "coeEmbedding"]{
      "entryId": entry._ref,
      textHash
    }
  `);
  const existingMap = new Map(existingEmbeddings.map(e => [e.entryId, e.textHash]));
  console.log(`   Found ${existingEmbeddings.length} existing embeddings\n`);

  // Find entries that need embedding
  const toProcess: { entry: CoeEntry; text: string; hash: string }[] = [];

  for (const entry of entries) {
    const text = buildEmbeddingText(entry);
    const hash = hashString(text);

    // Skip if embedding exists and text hasn't changed
    if (existingMap.get(entry._id) === hash) {
      continue;
    }

    toProcess.push({ entry, text, hash });
  }

  console.log(`Entries to process: ${toProcess.length}\n`);

  if (toProcess.length === 0) {
    console.log('All embeddings are up to date!');
    return;
  }

  // Process in small batches (free tier: 3 RPM limit)
  const batchSize = 5;
  const delayBetweenBatches = 22000; // 22 seconds between requests (3 RPM = 20s minimum)
  let processed = 0;
  let errors = 0;

  console.log(`Note: Using free tier rate limits (3 RPM). This will take ~${Math.ceil(toProcess.length / batchSize) * 22 / 60} minutes.\n`);

  for (let i = 0; i < toProcess.length; i += batchSize) {
    const batch = toProcess.slice(i, i + batchSize);
    const texts = batch.map(b => b.text);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(toProcess.length / batchSize);

    console.log(`Processing batch ${batchNum}/${totalBatches}...`);

    try {
      const embeddings = await generateEmbeddings(texts);

      // Save each embedding to Sanity
      for (let j = 0; j < batch.length; j++) {
        const { entry, hash } = batch[j];
        const embedding = embeddings[j];

        // Check if embedding document exists
        const existingDoc = await sanityClient.fetch(
          `*[_type == "coeEmbedding" && entry._ref == $entryId][0]._id`,
          { entryId: entry._id }
        );

        if (existingDoc) {
          // Update existing
          await sanityClient.patch(existingDoc).set({
            embedding,
            textHash: hash,
            updatedAt: new Date().toISOString(),
          }).commit();
        } else {
          // Create new
          await sanityClient.create({
            _type: 'coeEmbedding',
            entry: { _type: 'reference', _ref: entry._id },
            embedding,
            textHash: hash,
            createdAt: new Date().toISOString(),
          });
        }

        processed++;
        console.log(`   [${processed}/${toProcess.length}] ${entry.title.slice(0, 50)}...`);
      }

      // Rate limiting between batches (free tier: 3 RPM)
      if (i + batchSize < toProcess.length) {
        console.log(`   Waiting ${delayBetweenBatches / 1000}s for rate limit...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    } catch (error) {
      console.error(`   Batch error:`, error);
      errors += batch.length;
      // Wait extra time on error before retrying
      if (i + batchSize < toProcess.length) {
        console.log('   Waiting 30s before retry...');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    }
  }

  console.log('\nSummary:');
  console.log(`   Processed: ${processed}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total entries: ${entries.length}`);
}

// Run the sync
syncEmbeddings()
  .then(() => {
    console.log('\nEmbedding sync complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nSync failed:', error);
    process.exit(1);
  });
