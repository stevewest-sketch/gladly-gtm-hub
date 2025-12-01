import { getCachedEmbedding, cacheEmbedding } from './cache';

// Generate embedding using Voyage AI
export async function generateEmbedding(
  text: string,
  inputType: 'document' | 'query' = 'document'
): Promise<number[]> {
  // Check cache first for queries
  if (inputType === 'query') {
    const cached = await getCachedEmbedding(text);
    if (cached) {
      console.log('Embedding cache hit');
      return cached;
    }
  }

  const response = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'voyage-large-2',
      input: text,
      input_type: inputType,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Voyage API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const embedding = data.data[0].embedding;

  // Cache query embeddings
  if (inputType === 'query') {
    await cacheEmbedding(text, embedding);
  }

  return embedding;
}

// Batch generate embeddings (for initial indexing)
export async function generateEmbeddings(
  texts: string[],
  inputType: 'document' | 'query' = 'document'
): Promise<number[][]> {
  // Voyage supports batch requests (up to 128 texts)
  const batchSize = 100;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    const response = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'voyage-large-2',
        input: batch,
        input_type: inputType,
      }),
    });

    if (!response.ok) {
      throw new Error(`Voyage API error: ${response.statusText}`);
    }

    const data = await response.json();
    const embeddings = data.data.map((d: any) => d.embedding);
    allEmbeddings.push(...embeddings);

    // Rate limiting between batches
    if (i + batchSize < texts.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return allEmbeddings;
}

// Cosine similarity for comparing embeddings
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
