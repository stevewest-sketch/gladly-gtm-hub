# Hub Components Documentation

This guide covers all components used in Hub pages (COE Hub, BVA, etc.) with the unified catalog design system.

## Table of Contents

- [StatGrid](#statgrid)
- [FeatureCard](#featurecard)
- [ProcessSteps](#processsteps)
- [HubSection](#hubsection)
- [ButtonNav](#buttonnav)

---

## StatGrid

Displays statistics in a grid layout with multiple style variants.

**Location**: `/components/hub/StatGrid.tsx`

### Props

```typescript
interface StatGridProps {
  stats: Stat[]                    // Array of statistics to display
  columns?: 2 | 3 | 4             // Number of columns (default: 4)
  styleVariant?: StyleVariant      // Visual style (default: 'minimal')
  accentColor?: string            // Hex color for gradients (default: '#8C69F0')
  className?: string              // Additional CSS classes
}

interface Stat {
  value: string | number          // Main statistic value (e.g., "40%", "500K+")
  label: string                   // Descriptive label
  icon?: string                   // Optional emoji icon
  color?: string                  // Icon background color (hex) or border color
}
```

### Style Variants

#### 1. `minimal` (Recommended)
Clean, modern cards with subtle shadows and icon badges.

**Use case**: Default choice for most hub pages
**Visual**: White cards, icon badges with colored backgrounds, hover shadow
**Example**:
```tsx
<StatGrid
  stats={stats}
  styleVariant="minimal"
/>
```

#### 2. `gradient`
Premium look with gradient backgrounds.

**Use case**: Hero sections, important metrics
**Visual**: Gradient backgrounds, white text, no borders
**Example**:
```tsx
<StatGrid
  stats={stats}
  styleVariant="gradient"
  accentColor="#8C69F0"
/>
```

#### 3. `badge`
Catalog-style cards with purple hover effects.

**Use case**: Matching the catalog-demo aesthetic
**Visual**: Border on hover, lift animation, icon badges
**Example**:
```tsx
<StatGrid
  stats={stats}
  styleVariant="badge"
/>
```

#### 4. `border-legacy`
Legacy style with left border accent.

**Use case**: Backward compatibility with existing content
**Visual**: Left colored border, emoji icons (no badges)
**Example**:
```tsx
<StatGrid
  stats={stats}
  styleVariant="border-legacy"
/>
```

### Icon Badge Colors

Available in theme (`/lib/theme.ts`):

```typescript
badge.iconBg = {
  purple: '#F5F3FF',
  blue: '#EFF6FF',
  green: '#F0FDF4',
  orange: '#FFF7ED',
  yellow: '#FEFCE8',
  pink: '#FCE7F3',
  red: '#FEF2F2',
  gray: '#F9FAFB'
}
```

### Usage in Sanity

1. Add a "Hub Stat Grid Section" to your hub page
2. Choose style variant from dropdown
3. Set accent color (hex format: `#8C69F0`)
4. Add stats with values, labels, and optional icons
5. For icon badges: set stat color to one of the badge.iconBg colors

---

## FeatureCard

Card component for features, resources, or content items.

**Location**: `/components/hub/FeatureCard.tsx`

### Props

```typescript
interface FeatureCardProps {
  icon?: string                   // Emoji icon
  iconStyle?: 'emoji' | 'badge'   // Icon display style (default: 'emoji')
  iconBadgeColor?: string         // Background color for badge style
  title: string                   // Card title
  description: string             // Card description
  meta?: string                   // Optional metadata (e.g., "5 min read")
  cta?: string                    // Call-to-action text (e.g., "Learn More")
  link?: string                   // URL for the card
  tag?: string                    // Tag label (e.g., "Guide", "Tool")
  tagColor?: string              // Tag background color
  hoverColor?: string            // Border color on hover (default: '#8C69F0')
  className?: string             // Additional CSS classes
}
```

### Icon Styles

#### `emoji` (Default)
Large emoji displayed at top of card.

**Use case**: Friendly, casual content
**Visual**: 4xl text size, no background

#### `badge`
Icon in a colored badge background.

**Use case**: Professional, catalog-style cards
**Visual**: 12x12 rounded badge, icon centered

### Tag Colors

Use hex colors for custom tag styling:
- Purple (default): `#8C69F0`
- Blue: `#3B82F6`
- Green: `#10B981`
- Orange: `#F97316`

### Usage Example

```tsx
<FeatureCard
  icon="📊"
  iconStyle="badge"
  iconBadgeColor="#F5F3FF"
  title="BVA Calculator"
  description="Build compelling business cases early in the sales cycle"
  tag="Tool"
  tagColor="#8C69F0"
  link="/coe/bva"
  cta="Explore Tool"
/>
```

### Usage in Sanity

1. Add "Hub Feature Cards Section"
2. For each card:
   - Set icon style: emoji or badge
   - If badge: choose icon badge color
   - Add tag and tag color for categorization
   - Set hover color (default purple)

---

## ProcessSteps

Step-by-step process or workflow display.

**Location**: `/components/hub/ProcessSteps.tsx`

### Props

```typescript
interface ProcessStepsProps {
  steps: Step[]                   // Array of process steps
  columns?: 2 | 3 | 4            // Number of columns (default: 3)
  variant?: 'default' | 'compact' // Display style (default: 'default')
  accentColor?: string           // Color for step numbers (default: '#8C69F0')
  elevation?: ElevationLevel     // Shadow depth for compact variant
  className?: string             // Additional CSS classes
}

interface Step {
  icon?: string                  // Optional emoji (overrides step number)
  title: string                  // Step title
  description: string            // Step description
  details?: string[]             // Optional bullet points
}

type ElevationLevel = 'none' | 'subtle' | 'medium'
```

### Variants

#### `default`
Large cards with prominent icons or step numbers.

**Use case**: Major processes, onboarding flows
**Visual**: Spacious layout, large text, prominent numbers

#### `compact`
Denser layout with subtle elevation.

**Use case**: Quick reference, space-constrained sections
**Visual**: Tighter spacing, smaller text, optional shadows

### Accent Color

The accent color is used for:
- Step number circles (white text on accent background)
- Icon highlights (if using emoji icons)
- Connecting lines between steps (future enhancement)

**Default**: Purple `#8C69F0` (catalog theme)
**Previous**: Yellow (legacy COE theme)

### Elevation (Compact Variant Only)

- `none`: Flat cards, no shadow
- `subtle`: Light shadow (0 1px 3px) - **Recommended**
- `medium`: Pronounced shadow (0 4px 6px)

### Usage Example

```tsx
<ProcessSteps
  steps={[
    {
      title: "Discovery",
      description: "Understand customer needs and pain points",
      details: ["Conduct stakeholder interviews", "Analyze current metrics"]
    },
    {
      title: "Analysis",
      description: "Quantify potential value and ROI",
      details: ["Calculate cost savings", "Project revenue impact"]
    },
    {
      title: "Presentation",
      description: "Deliver compelling business case",
      details: ["Create executive summary", "Present to decision makers"]
    }
  ]}
  variant="default"
  accentColor="#8C69F0"
  columns={3}
/>
```

### Usage in Sanity

1. Add "Hub Process Steps Section"
2. Choose variant: default or compact
3. Set accent color (hex format)
4. Set number of columns (2-4)
5. Add steps with titles, descriptions, and optional details
6. Optional: Add emoji icons to override step numbers

---

## HubSection

Wrapper component for all hub sections.

**Location**: `/components/hub/HubSection.tsx`

### Props

```typescript
interface HubSectionProps {
  title?: string                  // Optional section title
  description?: string            // Optional section description
  background?: string             // Background style (e.g., 'gradient-purple')
  className?: string              // Additional CSS classes
  transparent?: boolean           // Remove white container (default: false)
  children: React.ReactNode       // Section content
}
```

### Transparent Mode

When `transparent={true}`:
- Removes white background container
- Content flows naturally into page background
- Useful for custom-styled sections (e.g., COE Assistant)

### Usage Example

```tsx
<HubSection
  title="Getting Started"
  description="Follow these steps to begin your journey"
  transparent={false}
>
  <ProcessSteps steps={steps} />
</HubSection>
```

---

## ButtonNav

Button-based navigation for hub pages.

**Location**: `/components/hub/ButtonNav.tsx`

### Props

```typescript
interface ButtonNavProps {
  buttons: NavButton[]            // Navigation buttons
  activeButton: string            // Currently active button ID
  onButtonChange: (id: string) => void  // Callback when button clicked
}

interface NavButton {
  id: string                      // Unique identifier
  label: string                   // Button text
  icon: string                    // Emoji icon
  color: string                   // Background color class (e.g., 'bg-purple-600')
}
```

### Behavior

- Sticky navigation below hero section
- Active button highlighted with gradient
- Smooth scrolling to content sections
- Responsive: wraps on mobile

### Usage Example

```tsx
<ButtonNav
  buttons={[
    { id: 'overview', label: 'Overview', icon: '🏠', color: 'bg-purple-600' },
    { id: 'resources', label: 'Resources', icon: '📚', color: 'bg-blue-600' },
    { id: 'tools', label: 'Tools', icon: '🛠️', color: 'bg-green-600' }
  ]}
  activeButton={activeButton}
  onButtonChange={setActiveButton}
/>
```

---

## Design System Integration

All components use the unified catalog design system from `/lib/theme.ts`.

### Key Design Tokens

```typescript
// Primary purple (catalog theme)
catalog.borderHover: '#8C69F0'
catalog.badgeBackground: '#8C69F0'

// Card styling
catalog.borderLight: '#F3F3F3'
shadows.card: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
shadows.cardHover: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'

// Icon badge backgrounds
badge.iconBg: {
  purple: '#F5F3FF',
  blue: '#EFF6FF',
  green: '#F0FDF4',
  // ... more colors
}
```

### Spacing Standards

- Main content container: `py-12` (3rem vertical padding)
- Section bottom margin: `mb-8` (2rem)
- Grid gaps: `gap-6` (1.5rem)
- Card padding: `p-6` (1.5rem) for large, `p-5` (1.25rem) for compact

---

## Common Patterns

### Hero + ButtonNav + Sections

```tsx
<div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
  {/* Hero */}
  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16 px-4">
    <h1>Hub Title</h1>
  </div>

  {/* Navigation */}
  <ButtonNav buttons={buttons} activeButton={active} onButtonChange={setActive} />

  {/* Content */}
  <div className="max-w-7xl mx-auto px-4 py-12">
    {sections.map(section => (
      <HubSection key={section.id} title={section.title}>
        {/* Component based on section type */}
      </HubSection>
    ))}
  </div>
</div>
```

### Stat Grid + Feature Cards

```tsx
<HubSection title="By the Numbers">
  <StatGrid stats={stats} styleVariant="minimal" />
</HubSection>

<HubSection title="Key Resources" className="bg-gray-50">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {features.map(feature => (
      <FeatureCard key={feature.id} {...feature} iconStyle="badge" />
    ))}
  </div>
</HubSection>
```

---

## Migration Guide

### Updating Existing Content

1. **StatGrid**: Content will continue to work with default 'minimal' style
2. **FeatureCard**: Existing emoji icons preserved, can add badge style per card
3. **ProcessSteps**: Yellow accents automatically changed to purple
4. **Spacing**: All spacing automatically standardized (py-12, mb-8, gap-6)

### Sanity Updates

After deployment, content editors can:
1. Edit existing sections in Sanity Studio
2. Choose new style variants from dropdowns
3. Set custom accent colors (hex format)
4. Add icon badge colors for modern look

No content migration required - all changes are backward compatible.

---

## Troubleshooting

### Icons not showing as badges
- Check `iconStyle` prop is set to `'badge'`
- Verify `iconBadgeColor` is a valid hex color
- Ensure theme includes the color in `badge.iconBg`

### Hover effects not working
- Confirm `group` class is on parent container
- Check `transition-all duration-200` is present
- Verify hover classes use `group-hover:` prefix

### Spacing looks inconsistent
- Use standard spacing: `py-12` for sections, `mb-8` for margins, `gap-6` for grids
- Wrap sections in `<HubSection>` for automatic spacing
- Check `max-w-7xl mx-auto px-4` on main container

### Colors not matching catalog-demo
- Use purple `#8C69F0` for primary accents
- Use `catalog.borderLight` (`#F3F3F3`) for borders
- Apply `catalog.borderHover` (`#8C69F0`) for hover states
- Icon badge backgrounds from `badge.iconBg` colors
