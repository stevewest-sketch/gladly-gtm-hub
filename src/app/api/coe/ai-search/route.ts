import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import Anthropic from '@anthropic-ai/sdk';
import { generateEmbedding, cosineSimilarity } from '@/lib/embeddings';
import {
  getCachedSearchResult,
  cacheSearchResult,
  getCachedQueryAnalysis,
  cacheQueryAnalysis,
  incrementCacheHit,
  incrementCacheMiss,
} from '@/lib/cache';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, mode = 'hybrid', filters = {}, limit = 10 } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      return NextResponse.json({ error: 'Query too short' }, { status: 400 });
    }

    // 1. Check full result cache first
    const cachedResult = await getCachedSearchResult(trimmedQuery, mode);
    if (cachedResult) {
      await incrementCacheHit();
      return NextResponse.json({ ...cachedResult, cached: true });
    }
    await incrementCacheMiss();

    // 2. Determine if this is a simple search (skip AI for simple keyword lookups)
    const isSimpleSearch = isSimpleKeywordSearch(trimmedQuery);

    // 3. Get query analysis (use Haiku for cost savings, with caching)
    let queryAnalysis = null;
    if (!isSimpleSearch) {
      queryAnalysis = await getQueryAnalysis(trimmedQuery);
    }

    // 4. Perform search
    let results: any[] = [];

    if (isSimpleSearch) {
      // Simple keyword search only
      results = await performKeywordSearch(trimmedQuery, filters, limit);
    } else {
      // Hybrid search: semantic + keyword
      const [semanticResults, keywordResults] = await Promise.all([
        performSemanticSearch(trimmedQuery, limit),
        performKeywordSearch(
          queryAnalysis?.reformulatedQuery || trimmedQuery,
          { ...filters, ...extractFiltersFromAnalysis(queryAnalysis) },
          limit
        ),
      ]);
      results = mergeResults(semanticResults, keywordResults, limit);
    }

    // 5. Generate AI response only if requested and query is complex
    let aiResponse = null;
    if (mode === 'assistant' && !isSimpleSearch && results.length > 0) {
      aiResponse = await generateAIResponse(trimmedQuery, results, queryAnalysis);
    }

    const response = {
      results,
      queryAnalysis,
      aiResponse,
      meta: {
        mode,
        isSimpleSearch,
        resultCount: results.length,
      },
    };

    // 6. Cache the result
    await cacheSearchResult(trimmedQuery, mode, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Detect simple keyword searches that don't need AI
function isSimpleKeywordSearch(query: string): boolean {
  const words = query.split(/\s+/);

  // Single word or very short queries
  if (words.length <= 2) {
    return true;
  }

  // Check if it's a question
  const questionPatterns = /^(how|what|why|when|where|which|can|do|does|is|are|should|could|would|find|show|give|get|help)/i;
  if (questionPatterns.test(query)) {
    return false;
  }

  // Check for question mark
  if (query.includes('?')) {
    return false;
  }

  // Check for complex phrases
  const complexPatterns = /(best practice|proof point|customer.*example|how to|looking for|need.*help|compare|difference|recommend)/i;
  if (complexPatterns.test(query)) {
    return false;
  }

  return true;
}

// Get query analysis with caching (uses Haiku for cost savings)
async function getQueryAnalysis(query: string): Promise<any> {
  // Check cache first
  const cached = await getCachedQueryAnalysis(query);
  if (cached) {
    return cached;
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Use Haiku for cost savings
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: `Analyze this search query for a Sales/CS enablement knowledge base. Extract key info.

Query: "${query}"

Respond with ONLY valid JSON (no markdown):
{
  "intent": "find_proof_point|find_best_practice|find_tool|find_customer_example|general_question|how_to",
  "entities": {
    "customers": [],
    "industries": [],
    "channels": [],
    "metrics": []
  },
  "keywords": ["key", "terms"],
  "isQuestion": true,
  "reformulatedQuery": "cleaner search terms"
}`,
        },
      ],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0]);
      // Cache the analysis
      await cacheQueryAnalysis(query, analysis);
      return analysis;
    }
  } catch (error) {
    console.error('Query analysis error:', error);
  }

  // Return default analysis on error
  return {
    intent: 'general_question',
    entities: {},
    keywords: query.split(/\s+/).filter(w => w.length > 2),
    isQuestion: query.includes('?'),
    reformulatedQuery: query,
  };
}

// Extract filters from query analysis
function extractFiltersFromAnalysis(analysis: any): Record<string, string> {
  const filters: Record<string, string> = {};

  // Map intent to entry type filter
  const intentToType: Record<string, string> = {
    'find_proof_point': 'proof-point',
    'find_tool': 'tool',
    'find_best_practice': 'best-practice',
    'find_customer_example': 'meeting-asset',
  };

  if (analysis?.intent && intentToType[analysis.intent]) {
    filters.entryType = intentToType[analysis.intent];
  }

  return filters;
}

// Semantic search using embeddings
async function performSemanticSearch(query: string, limit: number): Promise<any[]> {
  try {
    // Generate query embedding (will use cache if available)
    const queryEmbedding = await generateEmbedding(query, 'query');

    // Fetch all embeddings from Sanity
    // Note: In production with 1000+ entries, use a vector database
    const embeddings = await sanityClient.fetch(`
      *[_type == "coeEmbedding"]{
        "entryId": entry._ref,
        embedding
      }
    `);

    if (!embeddings || embeddings.length === 0) {
      console.log('No embeddings found, falling back to keyword search');
      return [];
    }

    // Calculate similarities
    const scored = embeddings
      .map((emb: any) => ({
        entryId: emb.entryId,
        score: cosineSimilarity(queryEmbedding, emb.embedding),
      }))
      .filter((item: any) => item.score > 0.3) // Minimum relevance threshold
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, limit);

    if (scored.length === 0) {
      return [];
    }

    // Fetch full entry data for top results
    const entryIds = scored.map((s: any) => s.entryId);
    const entries = await sanityClient.fetch(`
      *[_type == "coeEntry" && _id in $entryIds && status == "published"]{
        _id,
        _updatedAt,
        entryType,
        title,
        slug,
        summary,
        headline,
        proofType,
        customer,
        account,
        howToUse,
        "coeSection": coeSection->{_id, name, slug, icon},
        "industry": industry->{_id, name, icon},
        "permission": permission->{_id, name, color}
      }
    `, { entryIds });

    // Attach scores and sort
    return entries
      .map((entry: any) => ({
        ...entry,
        _score: scored.find((s: any) => s.entryId === entry._id)?.score || 0,
        _matchType: 'semantic',
      }))
      .sort((a: any, b: any) => b._score - a._score);
  } catch (error) {
    console.error('Semantic search error:', error);
    return [];
  }
}

// Keyword search using GROQ
async function performKeywordSearch(
  query: string,
  filters: Record<string, string>,
  limit: number
): Promise<any[]> {
  const conditions: string[] = [
    '_type == "coeEntry"',
    'status == "published"',
  ];

  // Add text search
  const searchTerms = query.split(/\s+/).filter(term => term.length > 2);
  if (searchTerms.length > 0) {
    const termConditions = searchTerms.map(term =>
      `(title match "*${term}*" || summary match "*${term}*" || headline match "*${term}*" || customer match "*${term}*" || account match "*${term}*")`
    );
    conditions.push(`(${termConditions.join(' || ')})`);
  }

  // Add filters
  if (filters.entryType) {
    conditions.push(`entryType == "${filters.entryType}"`);
  }
  if (filters.section) {
    conditions.push(`coeSection._ref == "${filters.section}"`);
  }
  if (filters.industry) {
    conditions.push(`industry._ref == "${filters.industry}"`);
  }

  const groqQuery = `*[${conditions.join(' && ')}] | order(priority desc, _updatedAt desc)[0...${limit}]{
    _id,
    _updatedAt,
    entryType,
    title,
    slug,
    summary,
    headline,
    proofType,
    customer,
    account,
    howToUse,
    "coeSection": coeSection->{_id, name, slug, icon},
    "industry": industry->{_id, name, icon},
    "permission": permission->{_id, name, color}
  }`;

  try {
    const results = await sanityClient.fetch(groqQuery);
    return results.map((entry: any) => ({
      ...entry,
      _score: 0.5,
      _matchType: 'keyword',
    }));
  } catch (error) {
    console.error('Keyword search error:', error);
    return [];
  }
}

// Merge semantic and keyword results
function mergeResults(semantic: any[], keyword: any[], limit: number): any[] {
  const seen = new Set<string>();
  const merged: any[] = [];

  // Add semantic results first (higher quality matches)
  for (const result of semantic) {
    if (!seen.has(result._id)) {
      seen.add(result._id);
      merged.push(result);
    }
  }

  // Add keyword results, boosting if also in semantic
  for (const result of keyword) {
    if (seen.has(result._id)) {
      // Boost score if found in both
      const existing = merged.find(m => m._id === result._id);
      if (existing) {
        existing._score = Math.min(1, existing._score + 0.2);
        existing._matchType = 'hybrid';
      }
    } else {
      seen.add(result._id);
      merged.push(result);
    }
  }

  return merged
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
}

// Generate AI response using Sonnet (only for complex questions)
async function generateAIResponse(
  query: string,
  results: any[],
  queryAnalysis: any
): Promise<any> {
  if (results.length === 0) {
    return {
      answer: "I couldn't find relevant content for your query. Try different keywords or browse the sections directly.",
      sources: [],
      confidence: 'low',
    };
  }

  // Build context from top results
  const topResults = results.slice(0, 5);
  const context = topResults.map((r, i) => `
[${i + 1}] ${r.title}
Type: ${r.entryType}${r.proofType ? ` (${r.proofType})` : ''}
${r.summary ? `Summary: ${r.summary}` : ''}
${r.headline ? `Key Point: ${r.headline}` : ''}
${r.customer ? `Customer: ${r.customer}` : ''}
${r.howToUse ? `Usage Guidance: ${r.howToUse}` : ''}
`).join('\n---\n');

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: `You are an AI assistant for Gladly's Center of Excellence (CoE) Hub, helping Sales and Customer Success teams find enablement content.

Use ONLY the provided context to answer. If the answer isn't in the context, say so honestly.

Guidelines:
- Be concise and actionable (2-4 paragraphs max)
- Reference specific content by title using [number] citations
- For proof points, highlight the key stats or quotes
- For best practices, summarize key recommendations
- Suggest which content would be most useful

Context:
${context}`,
      messages: [
        {
          role: 'user',
          content: query,
        },
      ],
    });

    const answer = response.content[0].type === 'text' ? response.content[0].text : '';

    // Determine confidence based on top result score
    const topScore = topResults[0]?._score || 0;
    const confidence = topScore > 0.75 ? 'high' : topScore > 0.5 ? 'medium' : 'low';

    return {
      answer,
      sources: topResults.map(r => ({
        id: r._id,
        title: r.title,
        slug: r.slug?.current,
        type: r.entryType,
        relevance: Math.round(r._score * 100),
      })),
      confidence,
    };
  } catch (error) {
    console.error('AI response generation error:', error);
    return {
      answer: "I encountered an error generating a response. Please try a simpler search or browse the content directly.",
      sources: [],
      confidence: 'low',
    };
  }
}
