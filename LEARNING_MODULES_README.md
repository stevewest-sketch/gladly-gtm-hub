# Learning Modules System

## Overview
This system integrates async learning modules with your existing Training Hub, allowing you to create rich, interactive training content that complements your recorded training sessions.

## ✅ Completed

### 1. Sanity Schemas
- **Created `/sanity/schemas/learningModule.ts`** - Full schema with all required fields
- **Updated `/sanity/schemas/index.ts`** - Registered new schema
- Schema includes:
  - Basic info (title, slug, category, description)
  - Video embedding (URL, duration)
  - Key takeaways (icon, title, description)
  - Interactive flow (decision tree/triage logic)
  - Examples & FAQs (portable text)
  - Quick actions sidebar (PDFs, Slack templates, related links)
  - Product tags for filtering

### 2. Seed Data
- **Created `/app/api/seed-learning-modules/route.ts`** - API route to populate content
- **First Module Created**: "Competitive Support Triage Process"
  - Category: Competitive
  - 3 key takeaways
  - Interactive triage flow
  - 2 real-world examples (Nordstrom/Sierra, Natomi)
  - 4 FAQs
  - Quick actions with Slack templates
- **Run**: `curl http://localhost:3000/api/seed-learning-modules` to populate

## 📋 Next Steps (To Complete)

### 3. Training Hub Integration
Update `/app/enablement/training/page.tsx` to:
- Query BOTH `trainingSession` and `learningModule`
- Add "Content Type" filter (All | Recorded Sessions | Learning Modules)
- Update `TrainingFilters` component to show both types

### 4. Card Differentiation
Create enhanced card component that:
- Shows colored left border for learning modules (orange=competitive, blue=product, purple=process)
- Displays category badge in top-right
- Standard styling for training sessions

### 5. Dynamic Page Template
Create `/app/enablement/training/[slug]/page.tsx`:
- Handles both content types with conditional rendering
- Purple gradient hero (matching design system)
- Sticky navigation with chapter links
- 60/40 main/sidebar layout

### 6. Core Components

#### Video Player Component
```tsx
// components/learning/VideoPlayer.tsx
- Embed Loom/Vimeo/Wistia
- Optional chapters sidebar
- Responsive container
```

#### Key Takeaway Cards
```tsx
// components/learning/KeyTakeawayCard.tsx
- Icon + title + description
- Uses exact demo-card pattern
- 3-column grid layout
```

#### Interactive Flow
```tsx
// components/learning/InteractiveFlow.tsx
- Decision tree visualization
- Clickable paths with routing info
- White card with purple accents
```

#### Accordion Components
```tsx
// components/learning/Accordion.tsx
- Expandable examples
- FAQ display
- Smooth transitions
```

#### Quick Actions Sidebar
```tsx
// components/learning/QuickActionsSidebar.tsx
- Sticky positioning
- Copy-to-clipboard for Slack templates
- Download PDF button
- Related links list
```

## Design System Reference

All components must match these exact styles:

### Colors
```css
--purple-primary: #8C69F0;
--purple-hover: #7557d9;
--purple-light: #C5B3F8;
--purple-border: #E8E0F8;
--gray-bg: #F3F3F3;
--dark-text: #0D0D0D;
--secondary-text: #4A4A4A;

/* Category Colors */
--competitive-border: #FF4500; /* Orange */
--product-border: #0066CC; /* Blue */
--process-border: #8B5CF6; /* Purple */
```

### Card Pattern
```css
.card {
  background: white;
  border: 2px solid #F3F3F3;
  border-radius: 8px;
  padding: 24px;
}

.card:hover {
  border-color: #8C69F0;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(140, 105, 240, 0.15);
}
```

### Button Styles
```css
.btn-primary {
  background: #8C69F0;
  color: white;
  padding: 14px 32px;
  border-radius: 6px;
}

.btn-primary:hover {
  background: #7557d9;
}
```

## Data Structure

### Learning Module Type
```typescript
interface LearningModule {
  _id: string;
  _type: 'learningModule';
  title: string;
  slug: { current: string };
  category: 'competitive' | 'product' | 'process';
  moduleType: string; // Badge label
  description: string;
  oneLiner: string;
  videoUrl?: string;
  videoDuration?: number;
  lastUpdated: string;
  keyTakeaways: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  interactiveFlow?: {
    question: string;
    paths: Array<{
      label: string;
      route: string;
      description?: string;
    }>;
  };
  examples: Array<{
    title: string;
    content: PortableTextBlock[];
  }>;
  faqs: Array<{
    question: string;
    answer: PortableTextBlock[];
  }>;
  quickActions: {
    pdfUrl?: string;
    slackTemplates?: string[];
    relatedLinks?: Array<{
      label: string;
      url: string;
    }>;
  };
  productTags: string[];
  isActive: boolean;
}
```

## File Structure
```
app/
├── api/
│   └── seed-learning-modules/
│       └── route.ts ✅
├── enablement/
│   └── training/
│       ├── page.tsx (needs update)
│       ├── TrainingFilters.tsx (needs update)
│       └── [slug]/
│           └── page.tsx (needs creation)

components/
└── learning/ (needs creation)
    ├── VideoPlayer.tsx
    ├── KeyTakeawayCard.tsx
    ├── InteractiveFlow.tsx
    ├── Accordion.tsx
    └── QuickActionsSidebar.tsx

sanity/
└── schemas/
    ├── learningModule.ts ✅
    └── index.ts ✅
```

## Usage

### Creating a New Learning Module
1. Go to Sanity Studio
2. Create new "Learning Module"
3. Fill in all required fields
4. Add key takeaways (3-4 recommended)
5. Set up interactive flow if applicable
6. Add examples and FAQs
7. Configure quick actions
8. Publish

### Updating the Training Hub
The training hub will automatically show both training sessions and learning modules once the integration is complete. Learning modules will be visually differentiated by:
- Colored left border (based on category)
- Category badge in top-right
- "Learning Module" label vs "Training Session"

## Technical Implementation Notes

### Copy-to-Clipboard
```typescript
const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  // Show toast notification
};
```

### Smooth Scrolling
```typescript
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
```

### Sticky Sidebar
```css
.sidebar {
  position: sticky;
  top: 100px; /* Below header */
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
```

## Accessibility
- All interactive elements have ARIA labels
- Keyboard navigation supported
- Focus states clearly visible
- Screen reader friendly
- High contrast ratios maintained

## Next Module Ideas
1. **Product Feature Deep Dive** (category: product)
   - AI feature walkthrough
   - Integration guides
   - Best practices

2. **Sales Process Guide** (category: process)
   - Discovery questions
   - Demo flow
   - Objection handling

3. **Competitive Battle Card** (category: competitive)
   - Feature comparisons
   - Win/loss analysis
   - Positioning strategies

## Support
For questions or issues, contact the enablement team or check the main Training Hub at `/enablement/training`.
