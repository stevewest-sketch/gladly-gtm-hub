import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Hash function for cache keys
function hashString(str: string): string {
  const normalized = str.toLowerCase().trim().replace(/\s+/g, ' ');
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = ((hash << 5) - hash) + normalized.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Cache query embeddings
export async function getCachedEmbedding(query: string): Promise<number[] | null> {
  try {
    const cacheKey = `coe:emb:${hashString(query)}`;
    const cached = await redis.get<number[]>(cacheKey);
    return cached;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function cacheEmbedding(query: string, embedding: number[]): Promise<void> {
  try {
    const cacheKey = `coe:emb:${hashString(query)}`;
    await redis.set(cacheKey, embedding, { ex: 86400 * 7 }); // 7 day TTL
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// Cache search results
export async function getCachedSearchResult(
  query: string,
  mode: string
): Promise<any | null> {
  try {
    const cacheKey = `coe:search:${mode}:${hashString(query)}`;
    const cached = await redis.get(cacheKey);
    return cached;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function cacheSearchResult(
  query: string,
  mode: string,
  result: any
): Promise<void> {
  try {
    const cacheKey = `coe:search:${mode}:${hashString(query)}`;
    // Shorter TTL for AI responses, longer for regular search
    const ttl = mode === 'assistant' ? 3600 : 86400; // 1 hour vs 24 hours
    await redis.set(cacheKey, result, { ex: ttl });
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// Cache query analysis
export async function getCachedQueryAnalysis(query: string): Promise<any | null> {
  try {
    const cacheKey = `coe:analysis:${hashString(query)}`;
    return await redis.get(cacheKey);
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function cacheQueryAnalysis(query: string, analysis: any): Promise<void> {
  try {
    const cacheKey = `coe:analysis:${hashString(query)}`;
    await redis.set(cacheKey, analysis, { ex: 86400 * 7 }); // 7 day TTL
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// Track cache stats (optional, for monitoring)
export async function incrementCacheHit(): Promise<void> {
  try {
    await redis.incr('coe:stats:cache_hits');
  } catch (error) {
    // Ignore stats errors
  }
}

export async function incrementCacheMiss(): Promise<void> {
  try {
    await redis.incr('coe:stats:cache_misses');
  } catch (error) {
    // Ignore stats errors
  }
}

export async function getCacheStats(): Promise<{ hits: number; misses: number }> {
  try {
    const [hits, misses] = await Promise.all([
      redis.get<number>('coe:stats:cache_hits'),
      redis.get<number>('coe:stats:cache_misses'),
    ]);
    return { hits: hits || 0, misses: misses || 0 };
  } catch (error) {
    return { hits: 0, misses: 0 };
  }
}
