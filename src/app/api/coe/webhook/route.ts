import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Only process coeEntry documents
    if (body._type !== 'coeEntry') {
      return NextResponse.json({ message: 'Ignored' });
    }

    // Only process published entries
    if (body.status !== 'published') {
      return NextResponse.json({ message: 'Not published, skipping' });
    }

    const entryId = body._id;

    // Build embedding text
    const text = [
      body.title,
      body.summary,
      body.headline,
      body.howToUse,
      body.customer,
      body.account,
      body.tags?.join(', '),
    ].filter(Boolean).join('\n\n');

    // Generate embedding
    const embeddingResponse = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'voyage-large-2',
        input: text,
        input_type: 'document',
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error('Failed to generate embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Hash for change detection
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash = hash & hash;
    }
    const textHash = Math.abs(hash).toString(16);

    // Check for existing embedding
    const existing = await client.fetch(
      `*[_type == "coeEmbedding" && entry._ref == $entryId][0]._id`,
      { entryId }
    );

    if (existing) {
      await client.patch(existing).set({
        embedding,
        textHash,
        updatedAt: new Date().toISOString(),
      }).commit();
    } else {
      await client.create({
        _type: 'coeEmbedding',
        entry: { _type: 'reference', _ref: entryId },
        embedding,
        textHash,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
