# Catalog Design System Style Guide

The unified design system for the Enablement Website, establishing consistent visual language across catalog-demo, COE Hub, BVA, and all future hub pages.

## Table of Contents

- [Design Principles](#design-principles)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing System](#spacing-system)
- [Card Anatomy](#card-anatomy)
- [Icon Badges](#icon-badges)
- [Shadows & Elevation](#shadows--elevation)
- [Interactive States](#interactive-states)
- [Layout Patterns](#layout-patterns)

---

## Design Principles

### 1. Clean & Modern
- Subtle shadows, not heavy borders
- Ample whitespace between elements
- Refined typography with clear hierarchy

### 2. Consistent Interactions
- Unified hover states across all cards
- Smooth transitions (200ms duration)
- Purple accent for primary actions

### 3. Flexible Components
- Multiple style variants for different contexts
- Backward compatible with existing content
- Easy to configure in Sanity CMS

### 4. Professional Polish
- Icon badges instead of raw emojis (where appropriate)
- Thoughtful color backgrounds for icons
- Consistent spacing throughout

---

## Color Palette

### Primary Colors

#### Purple (Primary Accent)
```
Catalog Purple:    #8C69F0
Purpose:           Primary hover states, badges, CTAs
Usage:             Buttons, hover borders, step numbers, tags
```

#### Yellow (Hero Backgrounds)
```
Yellow 500:        #EAB308
Yellow 600:        #CA8A04
Purpose:           Hero gradients, attention-grabbing sections
Usage:             COE Hub hero, special callouts
```

### Neutral Colors

```
White:             #FFFFFF    (Card backgrounds)
Gray 50:           #F9FAFB    (Page backgrounds, subtle sections)
Gray 100:          #F3F4F6    (Hover backgrounds)
Gray 600:          #4B5563    (Body text)
Gray 700:          #374151    (Descriptions, meta text)
Gray 900:          #111827    (Headlines, emphasis)
```

### Border Colors

```
Light Border:      #F3F3F3    (Default card borders)
Hover Border:      #8C69F0    (Active/hover state)
```

### Icon Badge Backgrounds

Soft, tinted backgrounds for icon badges:

```
Purple:            #F5F3FF
Blue:              #EFF6FF
Green:             #F0FDF4
Orange:            #FFF7ED
Yellow:            #FEFCE8
Pink:              #FCE7F3
Red:               #FEF2F2
Gray:              #F9FAFB
```

**Usage**: Provide subtle color coding for different content types or categories while maintaining visual consistency.

### Gradient Colors

#### Primary Gradients
```css
/* Hero Purple Gradient */
background: linear-gradient(135deg, #8C69F0 0%, #6B46C1 100%)

/* Hero Yellow Gradient (COE Hub) */
background: linear-gradient(to right, #EAB308, #CA8A04)

/* Page Background Gradient */
background: linear-gradient(to bottom, #FEFCE8, #FFFFFF)
```

---

## Typography

### Font Family

```
Primary:           Inter, system-ui, sans-serif
Monospace:         'Monaco', 'Courier New', monospace (code snippets)
```

### Type Scale

```
Hero Title:        text-5xl (48px) / font-bold
Section Title:     text-2xl (24px) / font-bold
Card Title:        text-lg (18px) / font-semibold
Body Text:         text-base (16px) / font-normal
Description:       text-sm (14px) / font-normal
Meta Text:         text-xs (12px) / font-medium
```

### Text Colors

```
Headlines:         text-gray-900
Body:              text-gray-700
Descriptions:      text-gray-600
Meta/Labels:       text-gray-500
White Text:        text-white (on colored backgrounds)
```

---

## Spacing System

### Container Spacing

```
Max Width:         max-w-7xl (1280px)
Horizontal:        px-4 (1rem)
Vertical Padding:  py-12 (3rem) for main content areas
                   py-16 (4rem) for hero sections
```

### Section Spacing

```
Between Sections:  mb-8 (2rem)
Section Internal:  space-y-6 (1.5rem vertical rhythm)
```

### Grid & Layout

```
Grid Gap:          gap-6 (1.5rem between grid items)
Card Padding:      p-6 (1.5rem) for standard cards
                   p-5 (1.25rem) for compact cards
```

### Component Spacing

```
Icon to Text:      mb-3 (0.75rem)
Title to Desc:     mb-4 (1rem)
Button Padding:    px-8 py-3.5 (2rem x 0.875rem)
```

---

## Card Anatomy

### Standard Card Structure

```
┌─────────────────────────────────────────┐
│  ┌─────┐                                │
│  │ 🎯  │  Icon Badge (48x48)           │
│  └─────┘                                │
│                                         │
│  Card Title                             │  ← text-lg font-semibold
│  Brief description of the card content  │  ← text-sm text-gray-600
│  that spans multiple lines...           │
│                                         │
│  [Tag]                    5 min read    │  ← Badge + Meta
│                                         │
│  Learn More →                           │  ← CTA Link
└─────────────────────────────────────────┘
```

### Card Specifications

```
Background:        bg-white
Border:            border border-[#F3F3F3]
Border Radius:     rounded-lg (8px)
Padding:           p-6 (1.5rem)
Shadow (Default):  shadow-sm (0 1px 2px rgba(0,0,0,0.05))
Shadow (Hover):    shadow-lg (0 10px 25px rgba(0,0,0,0.1))

Hover Transform:   -translate-y-1 (lift effect)
Hover Border:      border-[#8C69F0]
Transition:        transition-all duration-200
```

### Stat Card Structure

```
┌─────────────────────┐
│  ┌─────┐            │
│  │ 📊  │            │  ← Icon Badge (w-12 h-12)
│  └─────┘            │
│                     │
│  40%                │  ← text-3xl font-bold
│  Higher win rate    │  ← text-sm text-gray-600
└─────────────────────┘
```

---

## Icon Badges

### Design Specifications

```
Size:              w-12 h-12 (48x48px)
Border Radius:     rounded-lg (8px)
Icon Size:         text-2xl (24px emoji)
Alignment:         inline-flex items-center justify-center
Margin:            mb-3 (12px below badge)
```

### Color Mapping

Use appropriate background colors to create visual hierarchy:

```
Purple:    Strategy, leadership, premium features
Blue:      Tools, technical resources, processes
Green:     Success metrics, growth, optimization
Orange:    Important, action items, warnings
Yellow:    Documentation, guides, learning
Pink:      Customer-facing, support resources
Red:       Critical, urgent, alerts
Gray:      Neutral, utility, reference
```

### Implementation

```tsx
<div
  className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-2xl mb-3"
  style={{ backgroundColor: '#F5F3FF' }}
>
  🎯
</div>
```

---

## Shadows & Elevation

### Shadow Levels

#### Level 1: Card (Default)
```css
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
```
**Usage**: Default cards, subtle separation

#### Level 2: Card Hover
```css
box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.1);
```
**Usage**: Hover states, active cards

#### Level 3: Elevated
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
```
**Usage**: Modals, popovers, floating elements

#### Level 0: None
```css
box-shadow: none;
```
**Usage**: Flat designs, minimal variants

### Tailwind Classes

```
shadow-sm          → Level 1 (Card)
shadow-lg          → Level 2 (Card Hover)
shadow-xl          → Level 3 (Elevated)
shadow-none        → Level 0 (None)
```

---

## Interactive States

### Hover Effects

#### Card Hover (Standard)
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #8C69F0;
}
```

**Tailwind**: `hover:shadow-lg hover:-translate-y-1 hover:border-[#8C69F0]`

#### Button Hover
```css
.button:hover {
  background-color: #7C59D0; /* Slightly darker purple */
  transform: scale(1.02);
}
```

**Tailwind**: `hover:bg-purple-700 hover:scale-102`

### Focus States

```
Focus Ring:        focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
Outline:           focus:outline-none (when using ring)
```

### Active States

```
Button Active:     active:scale-98
Card Active:       active:translate-y-0
```

### Disabled States

```
Opacity:           opacity-50
Cursor:            cursor-not-allowed
Pointer Events:    pointer-events-none
```

---

## Layout Patterns

### Grid Layouts

#### 2 Column Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

#### 3 Column Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

#### 4 Column Grid (Stats)
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {stats.map(stat => <StatCard key={stat.id} {...stat} />)}
</div>
```

### Responsive Breakpoints

```
Mobile:            < 768px   (1 column)
Tablet:            768px+    (2 columns)
Desktop:           1024px+   (3-4 columns)
Wide:              1280px+   (max-w-7xl container)
```

### Page Structure

```
┌─────────────────────────────────────────────────┐
│  Hero Section (full-width gradient)             │
│  - Large title + subtitle                       │
│  - No max-width constraint                      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  Button Navigation (sticky)                     │
│  - max-w-7xl container                          │
│  - Horizontal scroll on mobile                  │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  Content Sections (max-w-7xl mx-auto px-4)     │
│  ┌───────────────────────────────────────────┐ │
│  │  Section 1: Stats Grid                    │ │
│  │  py-12 mb-8                               │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  Section 2: Feature Cards                 │ │
│  │  py-12 mb-8                               │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  Section 3: Process Steps                 │ │
│  │  py-12 mb-8                               │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## Component Combinations

### Hero + Stats + Cards Pattern

Common pattern for hub overview pages:

```tsx
{/* Hero */}
<div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-5xl font-bold">Page Title</h1>
    <p className="text-xl text-yellow-100">Subtitle description</p>
  </div>
</div>

{/* Navigation */}
<ButtonNav buttons={navButtons} />

{/* Stats */}
<div className="max-w-7xl mx-auto px-4 py-12">
  <HubSection title="By The Numbers">
    <StatGrid stats={stats} styleVariant="minimal" />
  </HubSection>

  {/* Feature Cards */}
  <HubSection title="Key Resources" className="bg-gray-50">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map(card => <FeatureCard key={card.id} {...card} />)}
    </div>
  </HubSection>
</div>
```

### Two-Column Content Split

For detailed explanations with supporting visuals:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
    <h3 className="text-lg font-bold mb-3">Left Content</h3>
    <p className="text-gray-700 mb-6">Description...</p>
    {/* More content */}
  </div>
  <div>
    <h3 className="text-lg font-bold mb-3">Right Content</h3>
    {/* Stats grid or visual */}
  </div>
</div>
```

---

## Design Tokens Reference

### Theme Configuration Location

`/lib/theme.ts` contains all design tokens as TypeScript objects.

### Key Exports

```typescript
// Color system
export const colors = {
  catalog: {
    borderLight: '#F3F3F3',
    borderHover: '#8C69F0',
    badgeBackground: '#8C69F0',
    iconBg: { ... }
  }
}

// Badge utilities
export const badge = {
  size: { sm, md, lg },
  style: { pill, rounded, square },
  colors: { purple, blue, green, ... },
  iconBg: { purple, blue, green, ... }
}

// Shadows
export const shadows = {
  card: '0 1px 3px...',
  cardHover: '0 10px 25px...',
  elevated: '0 4px 6px...'
}

// Gradients
export const gradients = {
  purplePrimary: 'linear-gradient(135deg, #8C69F0 0%, #6B46C1 100%)',
  yellowHero: 'linear-gradient(to right, #EAB308, #CA8A04)'
}
```

### Using Design Tokens

```tsx
import { badge, shadows } from '@/lib/theme'

// In your component
<div
  style={{
    backgroundColor: badge.iconBg.purple,
    boxShadow: shadows.card
  }}
>
  {/* Content */}
</div>
```

---

## Accessibility Guidelines

### Color Contrast

All text must meet WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components: 3:1 minimum

### Focus Indicators

Always provide visible focus indicators:
```tsx
<button className="focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
  Click Me
</button>
```

### Semantic HTML

Use appropriate HTML elements:
- `<button>` for actions
- `<a>` for navigation
- `<h1>` through `<h6>` for headings (in order)
- `<nav>` for navigation sections

### Alt Text

All decorative emoji icons should have `aria-hidden="true"` or be wrapped in elements with appropriate labels.

---

## Browser Support

### Modern Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### CSS Features Used

- CSS Grid
- Flexbox
- CSS Custom Properties (via Tailwind)
- Transforms & Transitions
- Box Shadow
- Linear Gradients

### Fallbacks

- Grid layouts fallback to single column on old browsers
- Transitions degrade gracefully (no animation)
- Shadows simply don't appear (design still functional)

---

## Migration Checklist

When updating existing pages to use the catalog design system:

- [ ] Update spacing: py-8 → py-12, mb-12 → mb-8
- [ ] Convert emoji icons to badge style where appropriate
- [ ] Use purple (#8C69F0) for primary accents instead of yellow
- [ ] Apply catalog border colors (#F3F3F3 default, #8C69F0 hover)
- [ ] Add hover effects: lift + shadow + border color change
- [ ] Use StatGrid styleVariant='minimal' or 'badge'
- [ ] Set FeatureCard iconStyle='badge' for modern look
- [ ] Update ProcessSteps accentColor to purple
- [ ] Ensure all cards have transition-all duration-200
- [ ] Test responsive behavior on mobile/tablet/desktop
- [ ] Verify focus states for accessibility
- [ ] Check color contrast ratios

---

## Resources

### Design Files

- Figma (if applicable): [Link to design system]
- Design tokens: `/lib/theme.ts`

### Code References

- Components: `/components/hub/`
- Sanity schemas: `/sanity/schemas/sections/`
- Theme configuration: `/lib/theme.ts`

### Documentation

- Component documentation: `/docs/HUB_COMPONENTS.md`
- This style guide: `/docs/CATALOG_STYLE_GUIDE.md`

---

## Questions & Support

For questions about the design system:
1. Check this style guide first
2. Review component documentation
3. Examine existing implementations (catalog-demo, COE Hub)
4. Reach out to the design/development team

**Last Updated**: Phase 5 of catalog design system unification
