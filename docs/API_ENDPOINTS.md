# API Endpoints Documentation

## Overview

This document describes all current and planned API endpoints for the Gladly GTM Enablement Hub. Currently, the application primarily uses Sanity GROQ queries in Server Components, with plans to add dedicated API routes for search, webhooks, and integrations.

## Base URL

**Development:** `http://localhost:3000/api`
**Production:** `https://gladly-gtm-hub.vercel.app/api`

## Current Endpoints

### None Yet
The application currently doesn't expose any custom API endpoints. All data is fetched via:
- Sanity Client GROQ queries in Server Components
- Direct Sanity API calls from client components

## Planned Endpoints

---

### Search API

#### POST `/api/search`

Performs AI-powered semantic search using Google File Search API.

**Authentication:** None (public endpoint, rate-limited)

**Request Body:**
```json
{
  "query": "how to use sidekick for sales",
  "filters": {
    "category": "Toolkit",
    "contentType": "training"
  },
  "limit": 10,
  "offset": 0
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search query text |
| filters | object | No | Filter criteria |
| filters.category | string | No | Content category filter |
| filters.contentType | string | No | Content type filter |
| limit | number | No | Max results (default: 10, max: 50) |
| offset | number | No | Pagination offset (default: 0) |

**Response (200 OK):**
```json
{
  "success": true,
  "results": [
    {
      "id": "doc_123",
      "title": "Sidekick for Sales Training",
      "description": "Complete training guide for Sidekick Sales product",
      "url": "/product/sidekick-sales/training",
      "category": "Training",
      "score": 0.95,
      "highlights": [
        "...use sidekick for sales calls...",
        "...sales enablement features..."
      ]
    }
  ],
  "total": 42,
  "query": "how to use sidekick for sales",
  "took_ms": 145
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid query parameter",
  "message": "Query must be at least 2 characters"
}
```

**Response (429 Too Many Requests):**
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Maximum 100 requests per minute",
  "retry_after": 30
}
```

**Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Search service unavailable",
  "message": "Google File Search API error"
}
```

**Rate Limits:**
- 100 requests/minute per IP
- 1000 requests/hour per IP
- 10000 requests/day per IP

**Example Usage:**
```typescript
const response = await fetch('/api/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'battle cards for zendesk',
    filters: { category: 'Competitive' },
    limit: 5
  })
});

const data = await response.json();
```

---

### Sanity Webhook

#### POST `/api/sanity-webhook`

Receives webhook events from Sanity CMS when content is created, updated, or published. Triggers automatic indexing to Google File Search.

**Authentication:** Webhook signature validation

**Headers:**
```
Content-Type: application/json
X-Sanity-Signature: sha256=abc123...
X-Sanity-Webhook-Id: webhook_xyz
```

**Request Body:**
```json
{
  "ids": {
    "created": [],
    "updated": ["draft.doc_123"],
    "deleted": []
  },
  "timestamp": "2024-11-14T12:00:00Z",
  "_type": "page",
  "_id": "draft.doc_123",
  "_rev": "abc123",
  "title": "New Training Article",
  "slug": {
    "current": "new-training-article"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "indexed": true,
  "document_id": "doc_123",
  "indexed_at": "2024-11-14T12:00:05Z"
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Invalid signature",
  "message": "Webhook signature validation failed"
}
```

**Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Indexing failed",
  "message": "Failed to index document to Google File Search"
}
```

**Webhook Configuration:**
```
URL: https://gladly-gtm-hub.vercel.app/api/sanity-webhook
Events: create, update, publish
Dataset: production
Secret: ${SANITY_WEBHOOK_SECRET}
```

**Implementation Notes:**
- Verifies webhook signature using HMAC SHA256
- Fetches full document from Sanity
- Extracts searchable content
- Indexes to Google File Search API
- Revalidates Next.js cache for affected pages

---

### Health Check

#### GET `/api/health`

Returns application health status and system information.

**Authentication:** None (public endpoint)

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": 1699972800000,
  "version": "1.0.0",
  "services": {
    "nextjs": "ok",
    "sanity": "ok",
    "google_file_search": "ok"
  },
  "uptime": 86400,
  "environment": "production"
}
```

**Response (503 Service Unavailable):**
```json
{
  "status": "degraded",
  "timestamp": 1699972800000,
  "services": {
    "nextjs": "ok",
    "sanity": "ok",
    "google_file_search": "error"
  },
  "errors": [
    "Google File Search API unreachable"
  ]
}
```

---

### Content Indexing (Manual Trigger)

#### POST `/api/index-content`

Manually triggers content indexing to Google File Search. Used for initial setup or re-indexing all content.

**Authentication:** API Key required

**Headers:**
```
Content-Type: application/json
X-API-Key: ${ADMIN_API_KEY}
```

**Request Body:**
```json
{
  "reindex_all": false,
  "document_ids": ["doc_123", "doc_456"],
  "content_types": ["page", "searchableContent"]
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| reindex_all | boolean | No | Reindex all content (default: false) |
| document_ids | string[] | No | Specific document IDs to index |
| content_types | string[] | No | Content types to index |

**Response (200 OK):**
```json
{
  "success": true,
  "indexed": 150,
  "failed": 2,
  "skipped": 5,
  "duration_ms": 3450,
  "results": [
    {
      "document_id": "doc_123",
      "status": "success",
      "indexed_at": "2024-11-14T12:00:00Z"
    }
  ]
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Valid API key required"
}
```

---

## Future Endpoints

### Slack Bot Integration

#### POST `/api/slack/events`

Handles Slack event subscriptions for bot interactions.

#### POST `/api/slack/commands`

Handles Slack slash commands (`/gladly-search`, etc.).

### Voice Features

#### POST `/api/text-to-speech`

Converts article text to audio using 11 Labs API.

#### GET `/api/audio/:article_id`

Retrieves generated audio file for an article.

### Analytics

#### POST `/api/analytics/track`

Tracks user interactions and search queries.

#### GET `/api/analytics/stats`

Returns usage statistics and insights.

---

## Authentication Methods

### Webhook Signature Validation
```typescript
import crypto from 'crypto';

function validateWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}
```

### API Key Validation
```typescript
function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get('X-API-Key');
  return apiKey === process.env.ADMIN_API_KEY;
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "error_code",
  "message": "Human-readable error message",
  "details": {
    "field": "specific_field",
    "reason": "validation_failed"
  }
}
```

### Common Error Codes
| Code | Status | Description |
|------|--------|-------------|
| invalid_request | 400 | Malformed request body |
| unauthorized | 401 | Missing or invalid authentication |
| forbidden | 403 | Insufficient permissions |
| not_found | 404 | Resource not found |
| rate_limit_exceeded | 429 | Too many requests |
| internal_error | 500 | Server error |
| service_unavailable | 503 | External service unavailable |

---

## Rate Limiting

### Implementation Strategy
```typescript
// Using Vercel Edge Config or Upstash Redis
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  // Process request...
}
```

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699972860
```

---

## Monitoring & Logging

### Request Logging
```typescript
export async function POST(request: Request) {
  const start = Date.now();

  try {
    // Process request
    const result = await processRequest(request);

    // Log success
    console.log({
      method: 'POST',
      path: '/api/search',
      status: 200,
      duration_ms: Date.now() - start,
      ip: request.headers.get('x-forwarded-for')
    });

    return Response.json(result);
  } catch (error) {
    // Log error
    console.error({
      method: 'POST',
      path: '/api/search',
      error: error.message,
      duration_ms: Date.now() - start
    });

    throw error;
  }
}
```

### Performance Targets
- **Search API:** < 500ms p95
- **Webhook:** < 200ms p95
- **Health Check:** < 50ms p95

---

## Testing

### Manual Testing
```bash
# Search API
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "sidekick training", "limit": 5}'

# Health Check
curl http://localhost:3000/api/health

# Webhook (with signature)
curl -X POST http://localhost:3000/api/sanity-webhook \
  -H "Content-Type: application/json" \
  -H "X-Sanity-Signature: sha256=..." \
  -d '{"_type": "page", "_id": "doc_123"}'
```

### Integration Tests
```typescript
import { POST } from '@/app/api/search/route';

describe('/api/search', () => {
  it('returns search results', async () => {
    const request = new Request('http://localhost:3000/api/search', {
      method: 'POST',
      body: JSON.stringify({ query: 'test' })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.results).toBeInstanceOf(Array);
  });
});
```

---

## Security Considerations

### Input Validation
- Validate all request parameters
- Sanitize search queries
- Limit query length (max 500 chars)
- Validate document IDs format

### CORS Configuration
```typescript
export async function POST(request: Request) {
  const response = Response.json(data);

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
```

### Rate Limiting
- Per-IP limits for public endpoints
- API key limits for authenticated endpoints
- Exponential backoff for retries

---

**Last Updated:** November 14, 2024
**Version:** 1.0.0
