# Search Functionality Guide

## Overview

The Gladly Enablement Website includes a powerful global search feature that allows users to find any content across the entire site.

## Features

✅ **Instant Search** - Results appear as you type
✅ **Keyboard Navigation** - Use arrow keys and Enter
✅ **Categorized Results** - Results show content type
✅ **Smart Matching** - Searches titles, descriptions, and keywords
✅ **Mobile Responsive** - Works on all devices

## How to Use

### For Users

1. **Find the search bar** in the left navigation
2. **Type your query** - results appear instantly
3. **Navigate results**:
   - Use arrow keys (↑/↓) to select
   - Press Enter to visit
   - Click any result
   - Press Escape to close

### For Developers

#### Adding Content to Search

All searchable content is defined in `/components/search/searchContent.ts`.

**Add a new page:**

```tsx
{
  title: 'Your Page Title',
  description: 'Brief description of the page',
  url: '/path/to/page',
  category: 'Category Name',
  keywords: ['keyword1', 'keyword2', 'synonym'],
}
```

**Example:**

```tsx
{
  title: 'Sales Playbook',
  description: 'Comprehensive sales methodology and tactics',
  url: '/enablement/playbooks/sales',
  category: 'Resources',
  keywords: ['sales', 'selling', 'playbook', 'strategy', 'methodology'],
}
```

#### Search Interface

```tsx
import { SearchBar, searchableContent } from '@/components/search';

<SearchBar
  placeholder="Search resources..."
  searchableContent={searchableContent}
/>
```

#### Tracking Searches

```tsx
import { trackSearch } from '@/lib/analytics';

// Automatically tracked when user searches
trackSearch(query, resultsCount);
```

## Content Categories

Current categories:
- **Toolkit** - Role-specific toolkits (CSM, Sales, etc.)
- **Learning** - Training and certification
- **Demo** - Demo environments and guides
- **Resources** - Content library and templates
- **CoE** - Center of Excellence materials
- **Product** - Product information and features

## Search Algorithm

The search matches against:
1. **Page titles** (highest priority)
2. **Descriptions**
3. **Keywords** (synonyms and related terms)

Results are:
- Limited to top 10 matches
- Sorted by relevance
- Displayed with category labels

## Best Practices

### When Adding Content

1. **Use descriptive titles** - Clear and specific
2. **Write helpful descriptions** - 1-2 sentences
3. **Add comprehensive keywords** - Include:
   - Synonyms
   - Common misspellings
   - Related terms
   - Acronyms

4. **Choose appropriate categories** - Helps users understand content type

### Examples

**Good:**
```tsx
{
  title: 'Sidekick for Email',
  description: 'AI-powered email automation and intelligent drafting',
  keywords: ['sidekick', 'email', 'ai', 'automation', 'compose', 'draft', 'assist'],
}
```

**Not as good:**
```tsx
{
  title: 'Email',
  description: 'Info about email',
  keywords: ['email'],
}
```

## Future Enhancements

Potential improvements:
- [ ] Fuzzy matching for typos
- [ ] Recent searches
- [ ] Popular searches
- [ ] Search analytics dashboard
- [ ] Advanced filters
- [ ] Search highlighting

## Troubleshooting

**Content not appearing in search?**
1. Check if it's added to `searchContent.ts`
2. Verify the URL is correct
3. Clear browser cache
4. Check for typos in keywords

**Search not working?**
1. Check browser console for errors
2. Verify `SearchBar` component is imported correctly
3. Ensure `searchableContent` is passed as prop

## Support

For issues or questions:
- Check this guide first
- Review `/components/search/SearchBar.tsx` source
- Contact the development team

