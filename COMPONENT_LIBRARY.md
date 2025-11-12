# Component Library Documentation

Complete guide to using the Gladly Enablement Website component library.

## Design System Components (`/components/ui`)

### Buttons

#### Button
Universal button component with variants and sizes.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" href="/link">
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `href`: Optional link URL
- `onClick`: Optional click handler

---

### Cards

#### BaseCard
Foundation card component with consistent styling.

```tsx
import { BaseCard } from '@/components/ui';

<BaseCard padding="md" hover={true} href="/link">
  Card content
</BaseCard>
```

#### IconCard
Card with icon, title, and description.

```tsx
import { IconCard } from '@/components/ui';

<IconCard
  icon="🚀"
  title="Feature Name"
  description="Feature description"
  href="/feature"
/>
```

---

### Layout

#### PageHero
Hero section for pages.

```tsx
import { PageHero } from '@/components/ui';

<PageHero
  title="Page Title"
  subtitle="Page subtitle"
  gradient="purple"
  backLink={{ href: "/back", label: "Back" }}
/>
```

#### ContentSection
Full-width section container with variants.

```tsx
import { ContentSection } from '@/components/ui';

<ContentSection
  id="section-id"
  title="Section Title"
  variant="light"
  fullWidth={true}
>
  Section content
</ContentSection>
```

#### GradientDivider
Gradient divider line.

```tsx
import { GradientDivider } from '@/components/ui';

<GradientDivider gradient="purple" height="normal" />
```

---

### Content

#### InfoCallout
Highlighted information box.

```tsx
import { InfoCallout } from '@/components/ui';

<InfoCallout
  icon="💡"
  title="Pro Tip"
  variant="purple"
>
  Important information here
</InfoCallout>
```

#### StepList
Display steps or bullet points.

```tsx
import { StepList } from '@/components/ui';

<StepList
  numbered={true}
  variant="purple"
  steps={[
    { title: "Step 1", description: "Do this" },
    { title: "Step 2", description: "Then this" }
  ]}
/>
```

#### Badge
Status label or tag.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="success" size="md">
  New
</Badge>
```

#### Alert
Banner for announcements.

```tsx
import { Alert } from '@/components/ui';

<Alert
  title="Important Update"
  description="New features available"
  buttonText="Learn More"
  buttonLink="/updates"
/>
```

---

## Navigation & Search

### SearchBar
Global search component.

```tsx
import { SearchBar, searchableContent } from '@/components/search';

<SearchBar
  placeholder="Search..."
  searchableContent={searchableContent}
/>
```

### QuickNav
Quick navigation links.

```tsx
import QuickNav from '@/components/QuickNav';

<QuickNav
  links={[
    { label: "Section 1", anchor: "section-1" },
    { label: "Section 2", anchor: "section-2" }
  ]}
/>
```

---

## SEO & Analytics

### SEO Component
Meta tags and structured data.

```tsx
import { SEO } from '@/components/seo';

<SEO
  title="Page Title"
  description="Page description"
  keywords={["keyword1", "keyword2"]}
  ogImage="/image.png"
/>
```

### Analytics Tracking

```tsx
import { trackEvent, trackSearch } from '@/lib/analytics';

// Track custom event
trackEvent({
  action: 'click',
  category: 'button',
  label: 'CTA Button'
});

// Track search
trackSearch('query', resultsCount);
```

---

## Toolkit Components (`/components/toolkit`)

### ToolkitHero
Hero for toolkit pages.

```tsx
import { ToolkitHero } from '@/components/toolkit';

<ToolkitHero
  title="CSM Toolkit"
  subtitle="Resources for Customer Success Managers"
  gradient="purple"
/>
```

### ToolkitPageMultiSection
Complete toolkit page layout.

```tsx
import { ToolkitPageMultiSection } from '@/components/toolkit';
import { marketingToolkitData } from '@/config/toolkits/marketing';

export default function MarketingToolkitPage() {
  return <ToolkitPageMultiSection {...marketingToolkitData} />;
}
```

---

## Theme System (`/lib/theme.ts`)

### Colors

```tsx
import { colors } from '@/lib/theme';

// Use in style prop
style={{ color: colors.primary.purple }}
```

### Gradients

```tsx
import { gradients } from '@/lib/theme';

// Use in style prop
style={{ background: gradients.purple }}
```

### Tailwind Classes

Available semantic classes:
- `bg-primary-purple`, `bg-primary-blue`, etc.
- `text-neutral-black`, `text-neutral-dark`, etc.
- `border-primary-purple`, etc.

---

## Best Practices

1. **Always use components from `/components/ui` first**
2. **Use theme colors** instead of hardcoded hex values
3. **Keep data separate** from presentation (use config files)
4. **Add SEO component** to all public pages
5. **Track important user actions** with analytics
6. **Test components** before deploying

---

## Adding New Content to Search

Edit `/components/search/searchContent.ts`:

```tsx
export const searchableContent: SearchableItem[] = [
  // ... existing items
  {
    title: 'New Page',
    description: 'Page description',
    url: '/new-page',
    category: 'Category',
    keywords: ['keyword1', 'keyword2'],
  },
];
```

---

## Need Help?

- Check existing components in `/components/ui`
- Review toolkit pages for examples
- See `DESIGN_SYSTEM_EXAMPLES.md` for before/after examples
- Contact the development team

