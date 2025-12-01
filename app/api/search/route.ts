import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import Anthropic from '@anthropic-ai/sdk';
import { Redis } from '@upstash/redis';
import {
  UnifiedSearchResult,
  UnifiedSearchFilters,
  UnifiedSearchFacets,
  UnifiedSearchResponse,
  AISearchResponse,
} from '@/types/unified-search';

// Initialize clients
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Generate query embedding (returns null if API fails)
async function getQueryEmbedding(query: string): Promise<number[] | null> {
  const cacheKey = `emb:query:${query.toLowerCase().trim()}`;

  try {
    if (redis) {
      const cached = await redis.get<number[]>(cacheKey);
      if (cached) return cached;
    }

    const response = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'voyage-large-2',
        input: query,
        input_type: 'query',
      }),
    });

    if (!response.ok) {
      console.warn('Voyage API failed, falling back to keyword search');
      return null;
    }

    const data = await response.json();
    const embedding = data.data[0].embedding;

    if (redis) {
      await redis.set(cacheKey, embedding, { ex: 3600 });
    }

    return embedding;
  } catch (error) {
    console.warn('Embedding generation failed:', error);
    return null;
  }
}

// Analyze query intent
async function analyzeQuery(query: string): Promise<{
  intent: string;
  entities: Record<string, string[]>;
  keywords: string[];
  isQuestion: boolean;
  suggestedHub: 'all' | 'enablement' | 'coe';
}> {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Analyze this search query and return JSON:
Query: "${query}"

Return:
{
  "intent": "find_tool|find_proof_point|find_best_practice|find_training|ask_question|general_search",
  "entities": {"customers": [], "products": [], "metrics": [], "topics": []},
  "keywords": ["key", "search", "terms"],
  "isQuestion": true/false,
  "suggestedHub": "all|enablement|coe"
}

Hub hints:
- "coe" for: proof points, best practices, metrics, benchmarks, BVA, customer stories, resolution rates
- "enablement" for: training, onboarding, sales tools, competitive info, processes
- "all" if unclear

JSON only:`
    }],
  });

  try {
    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    return JSON.parse(text);
  } catch {
    return {
      intent: 'general_search',
      entities: {},
      keywords: query.split(/\s+/),
      isQuestion: query.includes('?') || /^(how|what|why|when|where|who|can|does|is)/i.test(query),
      suggestedHub: 'all',
    };
  }
}

// Search CoE entries with semantic matching (falls back to keyword if no embedding)
async function searchCoeEntries(
  query: string,
  queryEmbedding: number[] | null,
  filters: UnifiedSearchFilters,
  limit: number
): Promise<UnifiedSearchResult[]> {
  // Build filter conditions
  const conditions: string[] = ['_type == "coeEntry"'];

  if (filters.type && filters.type !== 'all') {
    conditions.push(`entryType == "${filters.type}"`);
  }
  if (filters.channel) {
    conditions.push(`channel._ref == "${filters.channel}"`);
  }
  if (filters.industry) {
    conditions.push(`industry._ref == "${filters.industry}"`);
  }

  // Fetch entries with embeddings
  const entries = await sanityClient.fetch(`
    *[${conditions.join(' && ')}]{
      _id,
      title,
      "slug": slug,
      summary,
      headline,
      entryType,
      proofType,
      customer,
      icon,
      tags,
      "industry": industry->{name, icon},
      "channel": channel->{name, icon},
      "section": channel->{name, icon},
      "embedding": *[_type == "coeEmbedding" && entry._ref == ^._id][0].embedding
    }
  `);

  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 2);

  // Score entries - use semantic if available, else keyword-only
  const scored = entries
    .map((entry: any) => {
      let semanticScore = 0;

      // Semantic scoring if embedding available
      if (queryEmbedding && entry.embedding) {
        semanticScore = cosineSimilarity(queryEmbedding, entry.embedding);
      }

      // Keyword scoring
      const titleMatch = entry.title?.toLowerCase().includes(queryLower) ? 0.3 : 0;
      const summaryMatch = entry.summary?.toLowerCase().includes(queryLower) ? 0.2 : 0;
      const customerMatch = entry.customer?.toLowerCase().includes(queryLower) ? 0.2 : 0;

      // Term matching for partial matches
      const termMatches = queryTerms.reduce((score, term) => {
        if (entry.title?.toLowerCase().includes(term)) score += 0.1;
        if (entry.summary?.toLowerCase().includes(term)) score += 0.05;
        if (entry.customer?.toLowerCase().includes(term)) score += 0.05;
        return score;
      }, 0);

      const keywordScore = titleMatch + summaryMatch + customerMatch + termMatches;
      const totalScore = queryEmbedding ? (semanticScore * 0.7 + keywordScore * 0.3) : keywordScore;

      return {
        ...entry,
        _score: totalScore,
        _matchType: queryEmbedding && semanticScore > 0.5 ? 'semantic' : 'keyword',
        _hub: 'coe' as const,
        _type: 'coeEntry' as const,
      };
    })
    .filter((e: any) => e._score > 0.15)
    .sort((a: any, b: any) => b._score - a._score)
    .slice(0, limit);

  return scored.map((e: any) => ({
    _id: e._id,
    _type: e._type,
    _score: e._score,
    _matchType: e._matchType,
    _hub: e._hub,
    title: e.title,
    slug: e.slug,
    summary: e.summary || e.headline,
    icon: e.icon,
    entryType: e.entryType,
    proofType: e.proofType,
    customer: e.customer,
    industry: e.industry,
    section: e.section,
    tags: e.tags,
  }));
}

// Search Enablement catalog entries
async function searchCatalogEntries(
  query: string,
  filters: UnifiedSearchFilters,
  limit: number
): Promise<UnifiedSearchResult[]> {
  const conditions: string[] = ['_type == "catalogEntry"'];

  if (filters.type && filters.type !== 'all') {
    conditions.push(`category == "${filters.type}"`);
  }
  if (filters.section) {
    conditions.push(`section._ref == "${filters.section}"`);
  }
  if (filters.audience) {
    conditions.push(`"${filters.audience}" in audiences[]._ref`);
  }

  // Keyword search for catalog (no embeddings yet)
  const searchTerms = query.split(/\s+/).map(t => `"${t}"`).join(' || ');

  const entries = await sanityClient.fetch(`
    *[${conditions.join(' && ')} && (
      title match "*${query}*" ||
      summary match "*${query}*" ||
      headline match "*${query}*"
    )][0...${limit}]{
      _id,
      title,
      "slug": slug,
      summary,
      headline,
      category,
      icon,
      tags,
      "section": section->{name, icon}
    }
  `);

  return entries.map((e: any) => ({
    _id: e._id,
    _type: 'catalogEntry' as const,
    _score: 0.5,
    _matchType: 'keyword' as const,
    _hub: 'enablement' as const,
    title: e.title,
    slug: e.slug,
    summary: e.summary || e.headline,
    icon: e.icon,
    category: e.category,
    section: e.section,
    tags: e.tags,
  }));
}

// Search Content Hub entries (competitive, training, articles, etc.)
async function searchContentHubEntries(
  query: string,
  filters: UnifiedSearchFilters,
  limit: number
): Promise<UnifiedSearchResult[]> {
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 2);

  // Search competitive resources (no slug field, competitor is a string)
  const competitiveResults = await sanityClient.fetch(`
    *[_type == "competitiveResource"][0...100]{
      _id,
      _type,
      title,
      description,
      resourceType,
      competitor,
      link,
      icon
    }
  `);

  // Search training sessions (no slug field, uses link for navigation)
  const trainingResults = await sanityClient.fetch(`
    *[_type == "trainingSession" && isActive == true][0...100]{
      _id,
      _type,
      title,
      description,
      duration,
      link,
      tags
    }
  `);

  // Search enablement articles (has slug.current)
  const articleResults = await sanityClient.fetch(`
    *[_type == "enablementArticle"][0...100]{
      _id,
      _type,
      title,
      slug,
      summary,
      category
    }
  `);

  // Combine and score results
  const allContent = [
    ...competitiveResults.map((e: any) => ({
      ...e,
      contentType: 'competitive',
      summary: e.description,
      // Create a pseudo-slug from ID for fallback routing
      slug: { current: e._id },
    })),
    ...trainingResults.map((e: any) => ({
      ...e,
      contentType: 'training',
      summary: e.description,
      // Create a pseudo-slug from ID for fallback routing (link is used for actual navigation)
      slug: { current: e._id },
    })),
    ...articleResults.map((e: any) => ({
      ...e,
      contentType: 'article',
    })),
  ];

  return allContent.map((e: any) => {
    // Score based on keyword matches
    const titleMatch = e.title?.toLowerCase().includes(queryLower) ? 0.4 : 0;
    const summaryMatch = e.summary?.toLowerCase().includes(queryLower) ? 0.2 : 0;
    const competitorMatch = e.competitor?.toLowerCase().includes(queryLower) ? 0.3 : 0;
    const termMatches = queryTerms.reduce((score: number, term: string) => {
      if (e.title?.toLowerCase().includes(term)) score += 0.1;
      if (e.summary?.toLowerCase().includes(term)) score += 0.05;
      if (e.competitor?.toLowerCase().includes(term)) score += 0.1;
      if (e.tags?.some((t: string) => t.toLowerCase().includes(term))) score += 0.05;
      return score;
    }, 0);

    const totalScore = titleMatch + summaryMatch + competitorMatch + termMatches;

    return {
      _id: e._id,
      _type: e._type,
      _score: totalScore,
      _matchType: 'keyword' as const,
      _hub: 'content' as const,
      title: e.title,
      slug: e.slug,
      summary: e.summary,
      icon: e.icon,
      entryType: e.contentType,
      category: e.category || e.resourceType,
      competitor: e.competitor,
      link: e.link,
    };
  })
  .filter((e: any) => e._score > 0.1)  // Lower threshold for content hub
  .sort((a: any, b: any) => b._score - a._score)
  .slice(0, limit);
}

// Generate AI response
async function generateAIResponse(
  query: string,
  results: UnifiedSearchResult[],
  queryAnalysis: any
): Promise<AISearchResponse | null> {
  if (results.length === 0) return null;

  const topResults = results.slice(0, 8);
  const context = topResults.map((r, i) => {
    const parts = [`[${i + 1}] ${r.title} (${r._hub} - ${r.entryType || r.category || r._type})`];
    if (r.summary) parts.push(r.summary);
    if (r.customer) parts.push(`Customer: ${r.customer}`);
    if ((r as any).competitor) parts.push(`Competitor: ${(r as any).competitor}`);
    if (r.industry?.name) parts.push(`Industry: ${r.industry.name}`);
    return parts.join('\n');
  }).join('\n\n');

  const isQuestion = queryAnalysis.isQuestion;

  const systemPrompt = `You are an expert assistant for Gladly's GTM (Go-To-Market) team. You have access to:
- CoE Hub: Customer proof points, best practices, metrics, success stories
- Enablement Hub: Training materials, sales tools, processes
- Content Hub: Competitive intelligence, battle cards, training sessions

Your role is to synthesize information from multiple sources to provide comprehensive, actionable insights for sales, customer success, and support teams.`;

  const userPrompt = isQuestion
    ? `Based on the following Gladly resources, answer this question:

Question: "${query}"

Available resources:
${context}

Instructions:
1. Synthesize information from multiple sources when relevant
2. Reference specific sources by number [1], [2], etc.
3. Highlight key metrics, statistics, or proof points when available
4. If the resources don't fully answer the question, explain what IS available
5. Keep your answer focused and under 250 words
6. Use bullet points for clarity when listing multiple points`
    : `Based on the following Gladly resources, provide a helpful summary for someone searching for: "${query}"

Available resources:
${context}

Instructions:
1. Summarize what's available across these resources
2. Highlight the most relevant/useful items for this search
3. Reference specific sources by number [1], [2], etc.
4. If there are proof points or metrics, mention them
5. Keep your summary concise (under 200 words)
6. Help the user understand what they can find in these results`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: userPrompt,
    }],
  });

  const answer = message.content[0].type === 'text' ? message.content[0].text : '';

  return {
    answer,
    sources: topResults.map((r, i) => ({
      id: r._id,
      title: r.title,
      slug: r.slug?.current || r._id,
      type: r._type,
      hub: r._hub,
      relevance: Math.round((1 - i * 0.1) * 100) / 100,
    })),
    confidence: topResults[0]?._score > 0.7 ? 'high' : topResults[0]?._score > 0.5 ? 'medium' : 'low',
  };
}

// Build facets
async function buildFacets(
  allResults: UnifiedSearchResult[],
  filters: UnifiedSearchFilters
): Promise<UnifiedSearchFacets> {
  // Count by hub
  const hubCounts = allResults.reduce((acc, r) => {
    acc[r._hub] = (acc[r._hub] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count by entry type
  const typeCounts = allResults.reduce((acc, r) => {
    const type = r.entryType || r.category || 'other';
    const key = `${type}:${r._hub}`;
    if (!acc[key]) {
      acc[key] = { value: type, hub: r._hub, count: 0 };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, { value: string; hub: string; count: number }>);

  const typeLabels: Record<string, { label: string; icon: string }> = {
    'proof-point': { label: 'Proof Points', icon: '📊' },
    'best-practice': { label: 'Best Practices', icon: '✨' },
    'process-innovation': { label: 'Process Innovation', icon: '⚡' },
    'internal-best-practice': { label: 'Internal Best Practice', icon: '🏠' },
    'meeting-asset': { label: 'Meeting Assets', icon: '📋' },
    'training': { label: 'Training', icon: '📚' },
    'resource': { label: 'Resources', icon: '📁' },
    'tool': { label: 'Tools', icon: '🛠️' },
    'process': { label: 'Processes', icon: '📝' },
    'competitive': { label: 'Competitive Intel', icon: '🎯' },
    'article': { label: 'Articles', icon: '📰' },
  };

  return {
    hubs: [
      { value: 'all', label: 'All Hubs', count: allResults.length },
      { value: 'coe', label: 'CoE Hub', count: hubCounts['coe'] || 0 },
      { value: 'enablement', label: 'Enablement', count: hubCounts['enablement'] || 0 },
      { value: 'content', label: 'Content Hub', count: hubCounts['content'] || 0 },
    ],
    entryTypes: Object.values(typeCounts).map(t => ({
      value: t.value,
      label: typeLabels[t.value]?.label || t.value,
      icon: typeLabels[t.value]?.icon || '📄',
      count: t.count,
      hub: t.hub,
    })),
    sections: [],
    channels: [],
    audiences: [],
    industries: [],
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const { query, mode = 'search', filters = {}, limit = 30 } = body;

    if (!query?.trim()) {
      return NextResponse.json({ error: 'Query required' }, { status: 400 });
    }

    // Check cache
    const cacheKey = `search:unified:${query}:${JSON.stringify(filters)}:${mode}`;
    if (redis) {
      const cached = await redis.get<UnifiedSearchResponse>(cacheKey);
      if (cached) {
        return NextResponse.json({ ...cached, meta: { ...cached.meta, cached: true } });
      }
    }

    // Analyze query (gracefully handle failure)
    let queryAnalysis;
    try {
      queryAnalysis = await analyzeQuery(query);
    } catch {
      queryAnalysis = {
        intent: 'general_search',
        entities: {},
        keywords: query.split(/\s+/),
        isQuestion: query.includes('?'),
        suggestedHub: 'all' as const,
      };
    }

    // Get query embedding for semantic search (returns null on failure)
    const queryEmbedding = await getQueryEmbedding(query);

    // Search all hubs based on filters
    const searchHub = filters.hub || queryAnalysis.suggestedHub || 'all';

    const searchPromises: Promise<UnifiedSearchResult[]>[] = [];

    if (searchHub === 'all' || searchHub === 'coe') {
      searchPromises.push(searchCoeEntries(query, queryEmbedding, filters, limit));
    }

    if (searchHub === 'all' || searchHub === 'enablement') {
      searchPromises.push(searchCatalogEntries(query, filters, limit));
    }

    if (searchHub === 'all' || searchHub === 'content') {
      searchPromises.push(searchContentHubEntries(query, filters, limit));
    }

    const searchResults = await Promise.all(searchPromises);

    // Merge and sort results
    let allResults = searchResults.flat().sort((a, b) => b._score - a._score);

    // Apply hub filter if specified
    if (filters.hub && filters.hub !== 'all') {
      allResults = allResults.filter(r => r._hub === filters.hub);
    }

    // Apply type filter
    if (filters.type && filters.type !== 'all') {
      allResults = allResults.filter(r =>
        r.entryType === filters.type || r.category === filters.type
      );
    }

    // Limit results
    const results = allResults.slice(0, limit);

    // Build facets from unfiltered results
    const facets = await buildFacets(searchResults.flat(), filters);

    // Generate AI response for all searches (gracefully handle failure)
    let aiResponse: AISearchResponse | null = null;
    if (results.length > 0) {
      try {
        aiResponse = await generateAIResponse(query, results, queryAnalysis);
      } catch (error) {
        console.warn('AI response generation failed:', error);
      }
    }

    const response: UnifiedSearchResponse = {
      results,
      total: allResults.length,
      facets,
      queryAnalysis,
      aiResponse: aiResponse || undefined,
      meta: {
        query,
        mode,
        cached: false,
        took: Date.now() - startTime,
      },
    };

    // Cache response
    if (redis) {
      await redis.set(cacheKey, response, { ex: 300 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Unified search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
