# System Architecture

## Overview

The Gladly GTM Enablement Hub is built on a modern, serverless architecture leveraging Next.js 15, Sanity CMS, and Vercel for hosting. This document outlines the system architecture, data flow, and key components.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                            │
│  (Chrome, Safari, Edge - Desktop & Mobile)                      │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ HTTPS
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                          │
│  (CDN, SSL, DDoS Protection, Edge Caching)                      │
└────────────┬────────────────────────────────────────────────────┘
             │
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Application                           │
│  (Serverless Functions + Static Generation)                     │
│                                                                   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐      │
│  │   App Router  │  │  API Routes   │  │  Components   │      │
│  │  (Pages/SSR)  │  │  (Serverless) │  │  (React 19)   │      │
│  └───────┬───────┘  └───────┬───────┘  └───────────────┘      │
│          │                  │                                    │
└──────────┼──────────────────┼────────────────────────────────────┘
           │                  │
           │                  │
   ┌───────▼──────┐   ┌───────▼──────┐
   │              │   │              │
   │    Sanity    │   │   External   │
   │     CMS      │   │     APIs     │
   │              │   │              │
   │ ┌──────────┐ │   │ ┌──────────┐ │
   │ │ Content  │ │   │ │  Google  │ │
   │ │ Storage  │ │   │ │   File   │ │
   │ └──────────┘ │   │ │  Search  │ │
   │              │   │ └──────────┘ │
   │ ┌──────────┐ │   │              │
   │ │ Studio   │ │   │ ┌──────────┐ │
   │ │   UI     │ │   │ │ 11 Labs  │ │
   │ └──────────┘ │   │ │  (Voice) │ │
   │              │   │ └──────────┘ │
   │ ┌──────────┐ │   │              │
   │ │ Webhooks │ │   │ ┌──────────┐ │
   │ └──────────┘ │   │ │  Slack   │ │
   │              │   │ │   API    │ │
   └──────────────┘   │ └──────────┘ │
                      │              │
                      └──────────────┘
```

## Technology Stack

### Frontend Layer
- **Next.js 15** - React framework with App Router
  - Server Components by default
  - Client Components where needed (interactivity)
  - Automatic code splitting
  - Built-in optimization

- **React 19** - UI library
  - Functional components with hooks
  - Server and client component architecture
  - Suspense for data fetching

- **TypeScript** - Type safety
  - Strict mode enabled
  - Interface-driven development
  - Type inference where appropriate

- **Tailwind CSS** - Utility-first styling
  - Custom design tokens
  - Responsive design utilities
  - Dark mode support (planned)

### Backend/API Layer
- **Next.js API Routes** - Serverless functions
  - `/api/search` - Search endpoint (future)
  - `/api/sanity-webhook` - Content indexing webhook (future)
  - `/api/health` - Health check

- **Server Actions** - Direct database access
  - Form submissions
  - Data mutations
  - Optimistic updates

### Content Management
- **Sanity CMS v4** - Headless CMS
  - Real-time collaboration
  - Structured content with schemas
  - Image optimization and CDN
  - Version history
  - GROQ query language

- **Sanity Studio** - Content editor
  - Embedded at `/studio` route
  - Customizable dashboard
  - Role-based access (planned)
  - Preview capabilities

### Hosting & Infrastructure
- **Vercel** - Deployment platform
  - Automatic deployments from GitHub
  - Preview deployments for PRs
  - Edge network distribution
  - Analytics and monitoring
  - Environment variable management

### Data Storage
- **Sanity Content Lake** - Primary data store
  - Document-based storage
  - Globally distributed
  - Real-time synchronization
  - GDPR compliant

## Data Flow

### Content Publishing Flow

```
1. Content Creator
   ↓
2. Sanity Studio UI
   ↓
3. Content Saved to Sanity
   ↓
4. Webhook Triggered (planned)
   ↓
5. Next.js API Route Receives Event
   ↓
6. Content Indexed to Google File Search (planned)
   ↓
7. Frontend Revalidates Cache
   ↓
8. Updated Content Visible to Users
```

### Search Flow (Current)

```
User Input → SearchBar Component → Client-side Filter
                                  ↓
                         Search State Update
                                  ↓
                         Results Display
```

### Search Flow (Planned with Google File Search)

```
User Input → SearchBar Component → API Route (/api/search)
                                  ↓
                         Google File Search API
                                  ↓
                         Semantic Search Results
                                  ↓
                         Ranked & Returned
                                  ↓
                         Results Display
```

### Page Rendering Flow

```
1. User Requests Page
   ↓
2. Next.js Router Matches Route
   ↓
3. Server Component Executes
   ↓
4. Sanity Query (GROQ) Fetches Data
   ↓
5. Data Returned to Component
   ↓
6. HTML Generated
   ↓
7. Client Hydration (if needed)
   ↓
8. Interactive Page Delivered
```

## Component Architecture

### Page Hierarchy

```
RootLayout (app/layout.tsx)
  ├── Search Provider
  ├── Navigation
  └── Page Routes
      ├── Homepage (/)
      ├── Toolkits (/enablement/toolkits/*)
      ├── Products (/product/*)
      ├── CoE (/coe/*)
      ├── Resources (/resources/*)
      └── Studio (/studio)
```

### Component Categories

#### 1. Layout Components
- `RootLayout` - Top-level application shell
- `Navigation` - Main navigation menu
- `Footer` - Site footer
- `Sidebar` - Navigation sidebar

#### 2. Section Components
15+ reusable sections for page building:
- `HeroSection` - Page headers
- `QuickStatsSection` - Statistics display
- `FeaturedContentSection` - Content cards
- `CTASection` - Call-to-action blocks
- `ResourceGridSection` - Resource listings
- etc.

#### 3. UI Components
Reusable interface elements:
- `Button` - Primary interaction element
- `Card` - Content container
- `Badge` - Status indicators
- `Alert` - Notifications
- `Modal` - Overlays
- `Tooltip` - Contextual help
- `Toast` - Temporary notifications

#### 4. Feature Components
- `SearchBar` - Global search
- `ContentFilter` - Filter controls
- `ToolkitNav` - Toolkit navigation
- `ResourceCard` - Resource display
- `CompetitiveCard` - Battle card display

#### 5. Utility Components
- `OptimizedImage` - Image optimization
- `LazySection` - Lazy loading wrapper
- `ErrorBoundary` - Error handling
- `Loading` - Loading states

## CMS Schema Architecture

### Document Types

#### Core Content Types
1. **page** - Dynamic pages
   - title, slug, sections[]
   - SEO metadata
   - Publication status

2. **searchableContent** - Search-indexed items
   - title, description, url
   - keywords[], category
   - priority, isActive, icon

3. **competitiveResource** - Battle cards
   - competitor, title, description
   - resourceType, link
   - lastUpdated, icon

4. **contentResource** - Content library
   - title, description, category
   - type, metadata, link
   - compact (layout variant)

#### Section Types (15+)
- `heroSection` - Page headers
- `quickStatsSection` - Statistics
- `featuredContentSection` - Content cards
- `ctaSection` - Call-to-actions
- `resourceGridSection` - Resource grids
- `textSection` - Rich text
- `imageSection` - Images
- `videoSection` - Video embeds
- `faqSection` - FAQ accordions
- And more...

### Schema Relationships

```
Page
  ├── sections[] → Section Types
  │   ├── heroSection
  │   ├── quickStatsSection
  │   └── ctaSection
  │
  └── seo → SEO Object

Navigation
  ├── mainNav[] → NavItems
  └── footerNav[] → NavItems

NavItem
  ├── link (reference to Page)
  ├── or externalUrl
  └── children[] → NavItems (nested)
```

## API Endpoints

### Current Endpoints
None yet - all data fetched via Sanity GROQ queries in Server Components

### Planned Endpoints

#### Search API
```
POST /api/search
Request: { query: string, filters?: object }
Response: { results: SearchResult[], total: number }
```

#### Webhook API
```
POST /api/sanity-webhook
Headers: { x-sanity-signature: string }
Request: { _type: string, _id: string, _rev: string }
Response: { success: boolean, indexed: boolean }
```

#### Health Check
```
GET /api/health
Response: { status: 'ok', timestamp: number }
```

## Security Architecture

### Authentication & Authorization
- **Sanity Studio:** Token-based authentication
- **API Routes:** API key validation (planned)
- **Webhooks:** Signature verification (planned)

### Data Security
- **HTTPS:** All traffic encrypted
- **Environment Variables:** Secrets stored securely
- **Input Validation:** All user inputs sanitized
- **CORS:** Restricted to allowed origins
- **Rate Limiting:** API endpoint protection (planned)

### Content Security Policy
```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval'
style-src 'self' 'unsafe-inline'
img-src 'self' data: https:
connect-src 'self' https://cdn.sanity.io
```

## Performance Optimization

### Caching Strategy

#### Static Generation (SSG)
- Homepage
- Static toolkit pages
- Resource pages with stable content

#### Incremental Static Regeneration (ISR)
- Dynamic pages with CMS content
- Revalidate every 60 seconds
- On-demand revalidation via webhooks (planned)

#### Client-side Caching
- React Query for data fetching (planned)
- Browser cache for static assets
- Service Worker for offline (future)

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy loading for below-fold content

### Image Optimization
- Next.js Image component
- Automatic WebP conversion
- Responsive image sizing
- Lazy loading by default
- Sanity CDN for hosted images

### Bundle Optimization
- Tree shaking unused code
- Minification in production
- Gzip compression
- Font optimization (subset loading)

## Monitoring & Observability

### Current Monitoring
- Vercel Analytics (basic metrics)
- Build logs
- Runtime logs
- Git commit history

### Planned Monitoring
- **Error Tracking:** Sentry integration
- **Performance:** Web Vitals tracking
- **User Analytics:** Plausible or PostHog
- **Search Analytics:** Query performance
- **API Monitoring:** Endpoint health checks
- **Uptime Monitoring:** Status checks

## Scalability Considerations

### Current Scale
- ~100 pages
- ~500 searchable items
- ~100 users/day (estimated)
- ~1000 searches/day (estimated)

### Scaling Strategy

#### Horizontal Scaling
- Vercel auto-scales serverless functions
- CDN handles traffic distribution
- Sanity scales automatically

#### Vertical Scaling
- Next.js optimizations (code splitting, ISR)
- Database query optimization
- Image optimization
- Caching layers

#### Performance Targets
- **Time to First Byte (TTFB):** < 200ms
- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Search Response Time:** < 500ms

## Disaster Recovery

### Backup Strategy
- **Sanity:** Automatic backups and version history
- **Code:** Git repository (GitHub)
- **Deployment:** Vercel preserves all deployments

### Rollback Procedures
1. Revert git commit
2. Push to GitHub
3. Vercel auto-deploys previous version
4. Or manually rollback in Vercel dashboard

### Data Recovery
- Sanity maintains version history
- Point-in-time recovery available
- Export data via API if needed

## Future Architecture Enhancements

### Planned Additions

#### Google File Search Integration
```
User Query → API Route → Google File Search
                        ↓
                   Semantic Search
                        ↓
                   Ranked Results
                        ↓
                   Return to User
```

#### Webhook Auto-indexing
```
Content Publish → Sanity Webhook → API Route
                                   ↓
                            Index to Google
                                   ↓
                            Confirmation
```

#### Slack Bot Integration
```
Slack Command → Slack API → Bot Endpoint
                            ↓
                    Query Content
                            ↓
                    Format Response
                            ↓
                    Return to Slack
```

#### Voice Features (11 Labs)
```
Article Content → API Route → 11 Labs API
                             ↓
                    Generate Audio
                             ↓
                    Return Audio URL
                             ↓
                    Audio Player Component
```

### Infrastructure Evolution
- **CDN:** CloudFlare for additional caching
- **Database:** PostgreSQL for analytics (if needed)
- **Queue:** Background job processing
- **Cache:** Redis for API response caching
- **Search:** Dedicated search infrastructure at scale

## Migration Path

### Phase 1: Foundation (Complete)
- ✅ Next.js application
- ✅ Sanity CMS integration
- ✅ Basic search
- ✅ Component library
- ✅ Deployment to Vercel

### Phase 2: AI Search (Weeks 2-3)
- Google File Search API integration
- Auto-indexing webhook
- Enhanced search UI

### Phase 3: Automation (Month 2)
- Content processing automation
- GitHub workflow automation
- Claude skills library

### Phase 4: Extensions (Months 3-6)
- Slack bot
- Voice features
- Advanced analytics
- AI recommendations

---

**Last Updated:** November 14, 2024
**Version:** 1.0.0
