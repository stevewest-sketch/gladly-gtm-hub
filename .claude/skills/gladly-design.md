# Gladly Design System Skill

This skill ensures all UI/UX updates maintain consistency with the established Gladly demo design patterns.

## Core Design Principles

1. **Professional and Clean**: Minimalist approach with generous whitespace
2. **Brand Consistency**: Green primary (#009B00) for actions and success
3. **Clear Hierarchy**: Well-defined typography scale and color usage
4. **Accessibility First**: Ring focus states, semantic HTML, ARIA labels
5. **Performance**: Subtle animations, 200ms transitions

## Color Palette

### Primary Colors (MUST USE THESE)
```css
/* Brand Colors */
--brand-green-500: #009B00     /* Primary actions, success states */
--brand-purple-500: #8C69F0    /* Secondary accents, badges */

/* Neutrals */
--neutral-900: #0D0D0D         /* Primary text */
--neutral-700: #252525         /* Headers, navigation backgrounds */
--neutral-200: #DFDFDF         /* Borders, dividers */
--neutral-100: #F3F3F3         /* Section backgrounds */

/* Semantic Colors */
--error: #E44F4F               /* Errors, destructive actions */
--warning: #F5A623             /* Warnings */
--success: #009B00             /* Success states */

/* Message Bubbles */
--bubble-customer: #F6F6F6     /* Customer messages */
--bubble-agent: #D5F2E8        /* Agent messages (mint green) */
```

### Usage Guidelines
- **Navigation**: Use `bg-[var(--neutral-700)]` with white text
- **Primary Actions**: Use `bg-[var(--brand-green-500)]` with white text
- **Borders**: Always use `border-[var(--neutral-200)]`
- **Backgrounds**: White for main areas, `bg-[var(--neutral-100)]` for sections
- **Text Hierarchy**:
  - Primary: `text-[var(--neutral-900)]`
  - Secondary: `text-[var(--neutral-700)]`
  - Muted: `text-muted-foreground`

## Typography System

### Font Sizes (USE EXACT VALUES)
```tsx
/* Headlines/Titles */
text-[28px] leading-[32px] font-bold tracking-[-0.01em]    // Main logo/display
text-[18px] leading-[24px] font-semibold tracking-[-0.005em] // Section headers
text-[16px] leading-[24px] font-semibold                   // Subsection headers

/* Body Text */
text-[15px] leading-[24px] font-normal                     // Main body text
text-[13px] leading-[20px] font-normal                     // Secondary text
text-[12px] leading-[16px] font-semibold                   // Labels, badges

/* Font Weights */
font-bold (700)      // Headlines only
font-semibold (600)  // Subheadings, labels
font-medium (500)    // Button text, emphasis
font-normal (400)    // Body text
```

### Typography Implementation
```tsx
// Section Title
<h2 className="text-[18px] leading-[24px] font-semibold tracking-[-0.005em] text-[var(--neutral-900)]">
  Title
</h2>

// Body Text
<p className="text-[15px] leading-[24px] text-[var(--neutral-700)]">
  Content
</p>

// Label
<span className="text-[12px] leading-[16px] font-semibold text-muted-foreground">
  Label
</span>
```

## Spacing Conventions

### Padding/Margin Rules
```tsx
/* Section Padding */
p-6 (24px)    // Large sections, modal headers/footers
p-4 (16px)    // Content areas, cards
p-3 (12px)    // Compact areas
p-2 (8px)     // Small elements, badges

/* Gaps Between Elements */
gap-4 (16px)  // Primary spacing between elements
gap-3 (12px)  // Secondary spacing
gap-2 (8px)   // Tight spacing

/* Vertical Spacing */
space-y-6     // Between major sections
space-y-4     // Between subsections
space-y-3     // Between form fields
space-y-2     // Between list items

/* Margins */
mb-6          // After major headers
mb-4          // After section headers
mb-2          // After labels
```

### Border Radius
```tsx
rounded-lg (8px)   // Cards, modals, major containers
rounded-md (6px)   // Buttons, inputs
rounded-sm (4px)   // Badges, small elements
rounded-full       // Avatars, circular buttons
```

## Component Patterns

### Layout Structure
```tsx
// Three-Panel Layout
<div className="flex h-screen">
  {/* Left Sidebar - Fixed 64px */}
  <div className="w-16 bg-[var(--neutral-700)] border-r border-[var(--neutral-200)]">
    {/* Customer avatars */}
  </div>

  {/* Left Content Panel - Fixed 384px */}
  <div className="w-96 border-r border-[var(--neutral-200)] overflow-y-auto">
    {/* Customer details */}
  </div>

  {/* Main Content - Flexible */}
  <div className="flex-1 flex flex-col">
    {/* Messages and composer */}
  </div>
</div>
```

### Button Styles
```tsx
// Primary Action Button (Green)
<Button className="bg-[var(--brand-green-500)] text-white hover:bg-[var(--brand-green-500)]/90">
  Action
</Button>

// Secondary Button
<Button variant="secondary" className="bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)]">
  Cancel
</Button>

// Destructive Button
<Button variant="destructive" className="bg-[var(--error)] hover:bg-[var(--error)]/90">
  Delete
</Button>

// Ghost Button (Icon buttons)
<Button variant="ghost" size="icon" className="h-10 w-10">
  <Icon className="h-4 w-4" />
</Button>
```

### Card Pattern
```tsx
<Card className="border border-[var(--neutral-200)] shadow-sm">
  <CardHeader className="p-4 border-b border-[var(--neutral-200)]">
    <CardTitle className="text-[16px] font-semibold">Title</CardTitle>
  </CardHeader>
  <CardContent className="p-4">
    {/* Content */}
  </CardContent>
</Card>
```

### Input Fields
```tsx
// Standard Input
<div className="space-y-2">
  <Label className="text-[13px] font-semibold text-[var(--neutral-900)]">
    Label
  </Label>
  <Input
    className="h-10 text-[15px] border-[var(--neutral-200)] focus:ring-2 focus:ring-[var(--brand-green-500)]"
    placeholder="Placeholder text"
  />
</div>

// Search Input
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10 pr-4" placeholder="Search..." />
</div>
```

### Message Bubbles
```tsx
// Agent Message
<div className="flex gap-3 mb-4">
  <div className="flex-1 ml-8">
    <div className="bg-[var(--bubble-agent)] rounded-lg p-4 text-[15px] leading-[24px]">
      {message}
    </div>
    <span className="text-[12px] text-muted-foreground mt-1">{time}</span>
  </div>
</div>

// Customer Message
<div className="flex justify-end mb-4">
  <div className="max-w-[80%]">
    <div className="bg-[var(--bubble-customer)] rounded-lg p-4 text-[15px] leading-[24px]">
      {message}
    </div>
    <span className="text-[12px] text-muted-foreground mt-1 text-right block">{time}</span>
  </div>
</div>
```

## Modal/Dialog Patterns

### Standard Modal Structure
```tsx
<Dialog>
  <DialogContent className="max-w-6xl max-h-[90vh] p-0">
    {/* Header */}
    <DialogHeader className="px-6 py-4 border-b border-[var(--neutral-200)]">
      <div className="flex items-center justify-between">
        <DialogTitle className="text-[18px] font-semibold">
          Title
        </DialogTitle>
        <Badge className="bg-[var(--brand-green-500)] text-white">
          Status
        </Badge>
      </div>
    </DialogHeader>

    {/* Content */}
    <div className="flex-1 overflow-y-auto p-6">
      {/* Modal content */}
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t border-[var(--neutral-200)] bg-[var(--neutral-100)]">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-muted-foreground">
          Additional info
        </span>
        <div className="flex gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button className="bg-[var(--brand-green-500)]">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
```

### Tabbed Modal Pattern
```tsx
<Tabs defaultValue="products">
  <TabsList className="grid w-full grid-cols-5">
    <TabsTrigger value="products">
      <Package className="h-4 w-4 mr-2" />
      Products
      <Badge className="ml-2">{count}</Badge>
    </TabsTrigger>
    {/* More tabs */}
  </TabsList>
  <TabsContent value="products" className="p-6">
    {/* Tab content */}
  </TabsContent>
</Tabs>
```

## Form Design Guidelines

### Form Layout
```tsx
<form className="space-y-4">
  {/* Field Group */}
  <div className="space-y-2">
    <Label htmlFor="field" className="text-[13px] font-semibold">
      Field Label
    </Label>
    <Input
      id="field"
      className="h-10"
      placeholder="Enter value"
    />
    <p className="text-[12px] text-muted-foreground">
      Helper text
    </p>
  </div>

  {/* Actions */}
  <div className="flex gap-3 justify-end pt-4">
    <Button variant="secondary">Cancel</Button>
    <Button type="submit" className="bg-[var(--brand-green-500)]">
      Submit
    </Button>
  </div>
</form>
```

### Radio/Checkbox Patterns
```tsx
// Radio Group with Cards
<RadioGroup value={selected} onValueChange={setSelected}>
  <div className="space-y-2">
    <div className="border border-[var(--neutral-200)] rounded-lg p-4 cursor-pointer hover:bg-[var(--neutral-100)]">
      <RadioGroupItem value="option1" />
      <Label className="ml-2">Option 1</Label>
    </div>
  </div>
</RadioGroup>

// Checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms" className="text-[13px] cursor-pointer">
    I agree to terms
  </Label>
</div>
```

## Animation Guidelines

### Standard Transitions
```tsx
// Hover transitions
className="transition-colors duration-200 hover:bg-primary/90"

// Shadow transitions
className="transition-shadow hover:shadow-md"

// Opacity transitions
className="transition-opacity duration-200"

// All transitions
className="transition-all duration-200"
```

### Loading States
```tsx
// Spinner
<Loader2 className="h-4 w-4 animate-spin" />

// Button with loading
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### Focus States
```tsx
// Always include focus states
className="focus:ring-2 focus:ring-[var(--brand-green-500)] focus:ring-offset-2"

// Or with outline
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green-500)]"
```

## Responsive Design Rules

### Breakpoint Usage
```tsx
// Mobile first approach
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Hide/show elements
className="hidden md:block"  // Hide on mobile
className="md:hidden"         // Show only on mobile

// Responsive padding
className="p-4 md:p-6"

// Responsive text
className="text-[14px] md:text-[15px]"
```

### Modal Responsiveness
```tsx
// Responsive modal widths
className="max-w-lg md:max-w-2xl lg:max-w-6xl"

// Full screen on mobile
className="w-full md:max-w-2xl"
```

## Best Practices

### DO's
1. ✅ Use exact color variables from the palette
2. ✅ Maintain consistent spacing (4px base unit)
3. ✅ Use exact typography sizes specified
4. ✅ Include hover, focus, and disabled states
5. ✅ Use semantic HTML elements
6. ✅ Add ARIA labels for accessibility
7. ✅ Use border-[var(--neutral-200)] for all borders
8. ✅ Keep animations at 200ms duration
9. ✅ Use shadcn/ui components when available
10. ✅ Test with keyboard navigation

### DON'Ts
1. ❌ Don't create new color values
2. ❌ Don't use arbitrary spacing values
3. ❌ Don't mix typography scales
4. ❌ Don't skip focus states
5. ❌ Don't use inline styles for colors
6. ❌ Don't create heavy animations
7. ❌ Don't ignore accessibility
8. ❌ Don't break the three-panel layout
9. ❌ Don't use different border colors
10. ❌ Don't forget loading states

## Implementation Checklist

When updating any UI element:

- [ ] Colors match the defined palette
- [ ] Typography uses exact specified sizes
- [ ] Spacing follows the 4px unit system
- [ ] Borders use neutral-200
- [ ] Hover states implemented
- [ ] Focus states visible
- [ ] Disabled states styled
- [ ] Loading states included
- [ ] Responsive behavior tested
- [ ] Accessibility verified
- [ ] Animations are 200ms
- [ ] Component follows existing patterns

## Common Patterns Reference

### Status Badges
```tsx
// Success
<Badge className="bg-[var(--brand-green-500)] text-white">Active</Badge>

// Warning
<Badge className="bg-[var(--warning)] text-white">Pending</Badge>

// Error
<Badge className="bg-[var(--error)] text-white">Failed</Badge>

// Neutral
<Badge variant="secondary">Draft</Badge>
```

### Alert Messages
```tsx
// Error Alert
<Alert className="border-[var(--error)] bg-[var(--error)]/10">
  <AlertCircle className="h-4 w-4 text-[var(--error)]" />
  <AlertDescription className="text-[var(--error)]">
    Error message
  </AlertDescription>
</Alert>

// Success Alert
<Alert className="border-[var(--brand-green-500)] bg-[var(--brand-green-500)]/10">
  <Check className="h-4 w-4 text-[var(--brand-green-500)]" />
  <AlertDescription className="text-[var(--brand-green-500)]">
    Success message
  </AlertDescription>
</Alert>
```

### Empty States
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <Icon className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-[16px] font-semibold mb-2">No items found</h3>
  <p className="text-[13px] text-muted-foreground max-w-sm">
    Description of empty state
  </p>
</div>
```

## Usage

To maintain design consistency when making updates:

1. Reference this guide for all UI changes
2. Use exact values, not approximations
3. Copy patterns from existing components
4. Test across different screen sizes
5. Verify accessibility compliance
6. Ensure smooth transitions
7. Maintain visual hierarchy
8. Keep interactions consistent
9. Follow the component structure
10. Test with real data

This skill ensures the Gladly demo maintains its professional, cohesive design system across all updates and modifications.

