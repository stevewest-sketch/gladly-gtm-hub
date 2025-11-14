# Gladly GTM Enablement Hub - Claude Project Guidelines

## Project Overview

The Gladly GTM Enablement Hub is a comprehensive Next.js-based enablement platform that provides sales, customer success, and marketing teams with easy access to product information, training materials, competitive intelligence, and sales resources.

**Live Site:** https://gladly-gtm-hub.vercel.app
**Repository:** https://github.com/stevewest-sketch/gladly-gtm-hub
**CMS Studio:** http://localhost:3000/studio (in development)

## Purpose

This platform serves as a centralized knowledge base for Gladly's go-to-market teams, replacing scattered Google Sites and enabling better content discovery, consistent branding, and AI-powered search capabilities.

## Tech Stack

### Core Technologies
- **Framework:** Next.js 15 (App Router)
- **React:** v19
- **TypeScript:** v5
- **Styling:** Tailwind CSS 3.4
- **CMS:** Sanity v4.11.0 (Headless CMS)
- **Deployment:** Vercel
- **Package Manager:** npm

### Key Dependencies
- `next-sanity` (v9.8.9) - Sanity integration for Next.js
- `@sanity/client` (v6.22.2) - Sanity API client
- `@portabletext/react` (v4.0.3) - Rich text rendering
- `styled-components` (v6.1.19) - Component styling
- `tsx` (v4.20.6) - TypeScript execution for scripts

## Project Structure

```
/
├── .claude/               # Claude AI configuration
│   ├── claude.md         # This file - project guidelines
│   ├── settings.local.json # Claude permissions
│   └── skills/           # Claude automation skills
│       └── gladly-design.md # Design system guidelines
├── .github/              # GitHub workflows (to be added)
├── app/                  # Next.js App Router pages
│   ├── (routes)/        # Page routes
│   ├── api/             # API routes
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/           # React components
│   ├── sections/        # Page sections
│   ├── search/          # Search components
│   ├── toolkit/         # Toolkit components
│   └── ui/              # Reusable UI components
├── config/              # Configuration files
│   └── toolkits/       # Toolkit data configs
├── docs/                # Project documentation
├── lib/                 # Utility libraries
│   ├── sanity.ts       # Sanity client
│   └── theme.ts        # Design system theme
├── public/              # Static assets
├── sanity/              # Sanity CMS configuration
│   ├── schemas/        # Content schemas
│   └── lib/            # Sanity utilities
├── scripts/             # Automation scripts
│   ├── seed-*.ts       # Database seeding scripts
│   └── process-*.ts    # Content processing scripts
└── styles/              # Global styles
```

## Development Workflow

### Starting Development

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Start Sanity Studio (available at /studio route)
# Already integrated - no separate command needed

# Build for production
npm run build

# Run production build locally
npm start
```

### Common Commands

```bash
# Linting
npm run lint

# Seed searchable content
npm run seed

# Seed all content types
npm run seed:all

# Seed competitive resources
npm run seed:competitive

# Seed content library
npm run seed:content
```

## Content Management System (Sanity)

### CMS Access
- **Studio URL:** http://localhost:3000/studio (development)
- **Production Studio:** https://gladly-gtm-hub.vercel.app/studio
- **Project ID:** 9epiazve
- **Dataset:** production

### Schema Types (30+ types)
Key content types managed in Sanity:
- `page` - Dynamic pages
- `searchableContent` - Search-indexed items
- `competitiveResource` - Battle cards and competitive intel
- `contentResource` - Content library items
- `quickStatsSection` - Statistics displays
- `featuredContentSection` - Featured content cards
- Plus 20+ other section and component types

### Content Workflow
1. Create/edit content in Sanity Studio
2. Content auto-syncs to Next.js frontend
3. Changes appear immediately (ISR with revalidation)
4. Search content managed through CMS

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define interfaces for component props
- Use proper typing (avoid `any`)
- Export types alongside components

### React Components
- Functional components with hooks
- Client components: Mark with `'use client'` directive
- Server components: Default, no directive needed
- Props interfaces named `ComponentNameProps`

### Naming Conventions
```typescript
// Components: PascalCase
export function SearchBar() {}

// Files: kebab-case
search-bar.tsx

// Variables/functions: camelCase
const searchResults = []
function handleSearch() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RESULTS = 10

// Interfaces: PascalCase with 'Props' or 'Data' suffix
interface SearchBarProps {}
interface UserData {}
```

### Component Structure
```typescript
'use client'; // If client component

import { useState } from 'react';

// Props interface
interface ComponentNameProps {
  title: string;
  optional?: boolean;
}

/**
 * Component description
 *
 * @param title - What the title represents
 * @param optional - Optional parameter description
 */
export function ComponentName({ title, optional }: ComponentNameProps) {
  // 1. Hooks
  const [state, setState] = useState(initial);

  // 2. Event handlers
  const handleEvent = () => {
    // handler logic
  };

  // 3. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Styling
- **Primary:** Tailwind utility classes
- **Complex:** `styled-jsx` for scoped styles
- **Theming:** Use design tokens from `lib/theme.ts`
- **Colors:** Use semantic color classes (primary-purple, primary-blue)

### File Organization
- One component per file
- Export component as named export
- Colocate related files (e.g., `SearchBar.tsx` and `SearchBar.test.tsx`)
- Group by feature, not by type

## Git Commit Guidelines

### Commit Message Format
```
type(scope): description

Longer explanation if needed

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, missing semicolons)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `cms` - Sanity CMS changes
- `content` - Content updates

### Scopes
- `search` - Search functionality
- `cms` - Sanity CMS integration
- `ui` - UI components
- `api` - API routes
- `toolkit` - Toolkit pages
- `coe` - Center of Excellence
- `competitive` - Competitive resources
- `demo` - Demo materials

### Examples
```bash
feat(search): integrate Google File Search API
fix(cms): resolve webhook timeout on content publish
docs(readme): add architecture documentation
refactor(ui): consolidate button components
cms(schema): add new training resource type
content(competitive): add 15 new battle cards
```

### Commit Frequency
- **Commit often** - After each logical change
- **Small commits** - Single purpose per commit
- **Descriptive messages** - Clear, concise descriptions
- **Credit Claude** - Always include Co-Authored-By

## Testing Strategy

### Manual Testing Checklist
- [ ] Search functionality works correctly
- [ ] All links open properly (internal and external)
- [ ] CMS changes reflect on frontend
- [ ] Mobile responsive on all pages
- [ ] Images load and display correctly
- [ ] Forms submit successfully
- [ ] Error states display properly

### Before Deployment
- [ ] Run `npm run build` successfully
- [ ] Test in production mode (`npm start`)
- [ ] Verify environment variables in Vercel
- [ ] Check Sanity Studio access
- [ ] Test search with real queries

## Environment Variables

### Required Variables
```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=9epiazve
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<write_token>

# Future: Google File Search
GOOGLE_CLOUD_PROJECT_ID=<tbd>
GOOGLE_FILE_SEARCH_API_KEY=<tbd>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<tbd>
GOOGLE_PRIVATE_KEY=<tbd>

# Future: 11 Labs (Voice)
ELEVEN_LABS_API_KEY=<tbd>

# Future: Slack Integration
SLACK_BOT_TOKEN=<tbd>
SLACK_SIGNING_SECRET=<tbd>
```

### Local Development
- Store in `.env.local` (not committed to Git)
- Never commit secrets
- Use Vercel dashboard for production variables

## Common Development Tasks

### Adding a New Page
1. Create file in `app/(routes)/path/page.tsx`
2. Define page component with proper metadata
3. Add to navigation if needed
4. Create corresponding Sanity schema if CMS-driven
5. Test routing and display

### Creating a New Component
1. Create in appropriate `components/` subdirectory
2. Define TypeScript props interface
3. Implement component with proper typing
4. Add to component exports if reusable
5. Document usage in component comments

### Adding Content to CMS
1. Define schema in `sanity/schemas/`
2. Register schema in `sanity/schemas/index.ts`
3. Create seed script if needed (optional)
4. Access Sanity Studio to add content
5. Query content in Next.js pages

### Creating a Seed Script
1. Create `scripts/seed-[type].ts`
2. Import Sanity client
3. Define content array
4. Create import function
5. Add npm script to `package.json`
6. Run with `npm run seed:[type]`

### Updating Search Content
1. Edit in Sanity Studio at `/studio`
2. Or use seed scripts for bulk updates
3. Content auto-indexes (once webhook is set up)
4. Test search immediately

## Design System

### Color Palette
```javascript
// Primary Colors
primary-purple: '#8C69F0'      // Main brand purple
primary-blue: '#009B00'        // Accent blue
neutral-black: '#0D0D0D'       // Text
neutral-gray: '#DFDFDF'        // Borders

// Extended Palette
purple-light: '#E8E0F8'
blue-light: '#DBEAFE'
success-green: '#10B981'
warning-orange: '#F97316'
```

### Typography
- **Headings:** Font weight 600-700 (semibold-bold)
- **Body:** Font weight 400 (normal)
- **Small text:** 13px with 400 weight
- **Line heights:** 1.5 for body, 1.2 for headings

### Spacing Scale
- 2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- Use Tailwind spacing utilities

### Component Patterns
- Consistent border-radius: 8px (rounded-lg)
- Box shadows for elevation
- Hover states with subtle transitions
- Loading states with skeletons
- Empty states with helpful messaging

## Performance Guidelines

### Image Optimization
- Use Next.js `<Image>` component
- Define width and height
- Use appropriate formats (WebP preferred)
- Lazy load below-fold images

### Code Splitting
- Use dynamic imports for heavy components
- Lazy load sections not in viewport
- Defer non-critical JavaScript

### CMS Query Optimization
- Use GROQ projections to limit fields
- Implement pagination for large lists
- Cache frequently accessed queries
- Use ISR (Incremental Static Regeneration)

## Deployment Process

### Vercel Integration
- **Auto-deploy:** Push to `main` branch triggers deployment
- **Preview:** PR creates preview deployment
- **Environment:** Production variables in Vercel dashboard

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] CMS schemas deployed to Sanity
- [ ] No console errors in browser
- [ ] Performance metrics acceptable

### Post-deployment
- [ ] Verify live site functionality
- [ ] Test search and navigation
- [ ] Check Sanity Studio access
- [ ] Monitor error logs
- [ ] Verify webhook endpoints (when implemented)

## AI-Powered Features (Roadmap)

### Immediate (Weeks 2-3)
- **Google File Search API** - AI-powered semantic search
- **Auto-indexing** - Webhook to index content on publish
- **Content Processor Skill** - Transcript to article automation

### Short-term (Month 2)
- **GitHub PR Automation** - Automated PR creation
- **Publishing Workflow** - End-to-end content automation
- **Additional Skills** - SEO optimizer, component generator

### Long-term (Months 3-6)
- **Slack Agent** - Query content from Slack
- **Voice Features** - 11 Labs text-to-speech
- **Analytics** - Usage tracking and insights
- **AI Recommendations** - Smart content suggestions

## Security Best Practices

### API Security
- Validate all webhook signatures
- Rate limit public endpoints
- Sanitize user inputs
- Use environment variables for secrets
- Implement CORS properly

### Content Security
- Validate CMS content before rendering
- Escape user-generated content
- Use Content Security Policy headers
- Implement proper authentication for Studio

## Troubleshooting

### Common Issues

**Build Fails**
- Check TypeScript errors: `npm run build`
- Verify all imports are correct
- Ensure environment variables are set

**CMS Not Updating**
- Clear Next.js cache: delete `.next` folder
- Check Sanity Studio authentication
- Verify API token has write permissions
- Check network tab for API errors

**Search Not Working**
- Verify searchable content exists in CMS
- Check SearchBar component is receiving data
- Inspect browser console for errors
- Verify API routes are accessible

**Deployment Issues**
- Check Vercel build logs
- Verify environment variables in dashboard
- Ensure all dependencies are in package.json
- Check for build-time errors in logs

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

### Internal Docs
- `/docs/*.md` - Comprehensive project documentation
- Design system guide in `.claude/skills/gladly-design.md`
- Search implementation guide
- CMS schema documentation

### Getting Help
- Review this Claude.md first
- Check project documentation in `/docs`
- Search existing commits for examples
- Ask Claude for assistance with specific tasks

## Future Enhancements

### Planned Features
1. **Google File Search Integration** - Week 2-3
2. **Webhook Auto-indexing** - Week 3
3. **Content Processing Automation** - Week 4
4. **GitHub Actions Workflows** - Month 2
5. **Slack Bot Integration** - Month 3-4
6. **Voice/Audio Features** - Month 4-5
7. **Advanced Analytics** - Month 5-6

### Ideas Under Consideration
- User authentication for personalized content
- Content versioning and history
- Multi-language support
- Offline mode with service workers
- Custom training path builder
- Interactive product demos
- Video transcript integration
- Gamification for training completion

## Contact & Collaboration

**Project Owner:** Steve (Gladly)
**Development Assistant:** Claude Code
**Repository:** stevewest-sketch/gladly-gtm-hub

---

**Last Updated:** November 14, 2024
**Version:** 1.0.0

*This document should be updated as the project evolves. Keep it current with new patterns, decisions, and best practices.*
