# Hub Page Management in Sanity Studio

This guide explains how content editors will create and manage hub pages (like the COE Hub) through the Sanity CMS backend.

## Table of Contents
1. [Overview](#overview)
2. [Creating a New Hub Page](#creating-a-new-hub-page)
3. [Configuring Navigation Buttons](#configuring-navigation-buttons)
4. [Adding Content Sections](#adding-content-sections)
5. [Section Types Reference](#section-types-reference)
6. [Example Workflow](#example-workflow)

---

## Overview

The Hub Page system allows content editors to build sophisticated, button-navigated landing pages entirely through Sanity Studio—no code required. Each hub page consists of:

- **Hero Section**: Large banner with icon, title, and subtitle
- **Navigation Buttons**: 2-6 customizable buttons (each with unique content)
- **Content Sections**: Different section types that display when each button is active
- **Universal Catalog**: Optional filtered catalog at the bottom

### Visual Structure

```
┌─────────────────────────────────────────────────┐
│  🎯 Hero Section (Title + Subtitle + Icon)      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  ⭐ Overview  |  💰 BVA  |  🏆 Proof Points     │  ← Navigation Buttons
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  📊 Stat Grid Section                           │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐           │
│  │ 89% │  │150+ │  │200+ │  │ 40% │           │  ← Content Sections
│  └─────┘  └─────┘  └─────┘  └─────┘           │     (shown for active button)
│                                                 │
│  📋 Feature Cards Section                       │
│  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │ Card 1 │  │ Card 2 │  │ Card 3 │           │
│  └────────┘  └────────┘  └────────┘           │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  📚 Universal Catalog (filtered by button)      │  ← Always at bottom
└─────────────────────────────────────────────────┘
```

---

## Creating a New Hub Page

### Step 1: Access Sanity Studio

Navigate to: `https://yoursite.vercel.app/studio` (or `http://localhost:3000/studio` locally)

### Step 2: Create New Hub Page

1. Click **"Content"** in the sidebar
2. Click **"Hub Page"** (🎯 icon)
3. Click **"Create New Hub Page"**

### Step 3: Fill Basic Information

```yaml
Page Title: "Center of Excellence"      # Internal name
URL Slug: "coe-hub"                      # Becomes /coe-hub
```

### Step 4: Configure Hero Section

```yaml
Hero Section:
  Icon: "⭐"
  Title: "Center of Excellence"
  Subtitle: "Where customer wins become repeatable success..."
  Background Gradient: "Orange Gradient"  # Dropdown options available
```

**Available gradient options:**
- Purple Gradient
- Blue Gradient
- Green Gradient
- Orange Gradient
- Yellow Gradient

---

## Configuring Navigation Buttons

Each hub page requires 2-6 navigation buttons. Each button acts as a "view" with its own content sections.

### Adding a Button

Click **"+ Add item"** under "Navigation Buttons"

### Button Configuration

```yaml
Button ID: "overview"                    # Unique identifier (lowercase, no spaces)
Button Label: "Overview"                 # Display text on button
Icon: "⭐"                                # Emoji icon
Active Color: "bg-[#F59E0B]"            # Color when button is active
```

**Available color options:**
- Purple: `bg-[#8C69F0]`
- Orange: `bg-[#F59E0B]`
- Yellow: `bg-yellow-600`
- Amber: `bg-amber-600`
- Blue: `bg-blue-600`
- Green: `bg-green-600`
- Pink: `bg-pink-600`

### Example Button Setup

For a COE Hub with 4 buttons:

```yaml
Button 1:
  ID: "overview"
  Label: "Overview"
  Icon: "⭐"
  Color: "bg-[#F59E0B]"

Button 2:
  ID: "bva"
  Label: "BVA"
  Icon: "💰"
  Color: "bg-yellow-600"

Button 3:
  ID: "proof-points"
  Label: "Proof Points"
  Icon: "🏆"
  Color: "bg-orange-600"

Button 4:
  ID: "resources"
  Label: "Resources"
  Icon: "📚"
  Color: "bg-amber-600"
```

---

## Adding Content Sections

Each button can have multiple content sections that display when that button is active.

### Adding Sections to a Button

1. Expand a button in the editor
2. Scroll to **"Sections for this Button"**
3. Click **"+ Add item"**
4. Choose a section type from the dropdown:
   - Hub Content Section
   - Hub Stat Grid Section
   - Hub Feature Cards Section
   - Hub Process Steps Section
   - Content Section (rich text)
   - CTA Section (call-to-action)

---

## Section Types Reference

### 1. Hub Content Section

**Use for:** Flexible text content with custom backgrounds

**Fields:**
- Section ID (for anchor links)
- Title
- Description
- Icon (emoji)
- Background Style:
  - White
  - Light Gray
  - Gradient (Gray to White)
  - Dark
  - Custom (use custom CSS classes)
- Content Type:
  - Rich Text (single column)
  - Two Column Layout (left/right columns)
  - Custom HTML/JSX
- Call to Action button (optional)

**Example Use Case:** The purple "Meet Your CoE Assistant" section

```yaml
Hub Content Section:
  Title: "Meet Your CoE Assistant"
  Icon: null  # No icon in this case
  Background: "custom"
  Custom Class: "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
  Content Type: "twoColumn"
  Left Column: [Rich text with bullet points]
  Right Column: [Example query box]
  CTA:
    Text: "Access CoE Assistant →"
    Link: "https://gemini.google.com/..."
    Style: "white"
```

---

### 2. Hub Stat Grid Section

**Use for:** Displaying key metrics and statistics

**Fields:**
- Section Title
- Section Description
- Number of Columns (2, 3, or 4)
- Statistics (array):
  - Value (e.g., "89.9%", "150+")
  - Label (description)
  - Icon (emoji)
  - Border Color (purple, blue, green, etc.)

**Example:**

```yaml
Hub Stat Grid Section:
  Title: "CoE at a Glance"
  Description: "Impact across our organization"
  Columns: 4
  Stats:
    - Value: "150+"
      Label: "Success Stories"
      Icon: "🏆"
      Border Color: "border-yellow-500"
    - Value: "89.9%"
      Label: "Highest FCR Achieved"
      Icon: "📊"
      Border Color: "border-orange-500"
    - Value: "200+"
      Label: "Resources Available"
      Icon: "📚"
      Border Color: "border-amber-500"
    - Value: "40%"
      Label: "Higher Win Rate with BVA"
      Icon: "💰"
      Border Color: "border-yellow-600"
```

**Studio Preview:** Shows "Stat Grid: CoE at a Glance • 4 stats • 4 columns"

---

### 3. Hub Feature Cards Section

**Use for:** Grid of clickable cards linking to resources

**Fields:**
- Section Title
- Section Description
- Number of Columns (2, 3, or 4)
- Show Filter Tabs (boolean)
- Filter Tabs (if enabled)
- Cards (array):
  - Icon (emoji)
  - Title
  - Description
  - Meta Info (e.g., "15 min read")
  - CTA Text (e.g., "View Guide →")
  - Link URL
  - Tag (e.g., "Best Practices")

**Example:**

```yaml
Hub Feature Cards Section:
  Title: "CoE Resource Library"
  Description: "Proven templates, guides, and playbooks..."
  Columns: 3
  Show Filter Tabs: true
  Filter Tabs: ["All Resources", "Best Practices", "Templates", "Dashboards"]
  Cards:
    - Icon: "📊"
      Title: "Chat Optimization Mastery"
      Description: "Complete guide to achieving 90% FCR in chat..."
      Meta: "Path to 90% FCR"
      CTA: "View Guide →"
      Link: "https://docs.google.com/document/d/..."
      Tag: "Chat Optimization"
    - Icon: "🚀"
      Title: "Rapid Value Realization Guide"
      Description: "Customer success patterns showing how..."
      Meta: "15 min read"
      CTA: "View Guide →"
      Link: "https://docs.google.com/document/d/..."
      Tag: "Implementation"
```

**Studio Preview:** Shows "Feature Cards: CoE Resource Library • 8 cards • 3 columns"

---

### 4. Hub Process Steps Section

**Use for:** Step-by-step processes, workflows, or how-it-works

**Fields:**
- Section Title
- Section Description
- Display Variant:
  - Default (large with icons)
  - Compact (dense layout)
- Number of Columns (2, 3, or 4)
- Process Steps (array):
  - Icon (emoji or leave empty for numbers)
  - Title
  - Description
  - Detail Points (optional bullet list)

**Example:**

```yaml
Hub Process Steps Section:
  Title: "How CoE Works"
  Description: "Our systematic approach to capturing and distributing success"
  Variant: "default"
  Columns: 3
  Steps:
    - Icon: "🔍"
      Title: "1. Discover & Identify"
      Description: "We continuously monitor customer implementations..."
      Detail Points: null
    - Icon: "💡"
      Title: "2. Extract Insights"
      Description: "Through data analysis and customer interviews..."
      Detail Points: null
    - Icon: "📦"
      Title: "3. Package & Publish"
      Description: "We transform insights into actionable guides..."
      Detail Points: null
```

**Studio Preview:** Shows "Process Steps: How CoE Works • 3 steps • default variant"

---

## Catalog Filtering

Each button can specify how the universal catalog at the bottom should be filtered.

### Configuring Catalog Filters

Within each button configuration:

```yaml
Catalog Filter:
  CoE Categories: ["bva", "templates"]
```

**Available categories:**
- BVA
- Proof Points
- Templates
- Best Practices

**Example:**
- Overview button: No filter (shows all)
- BVA button: Filter by `["bva"]`
- Proof Points button: Filter by `["proof-points"]`
- Resources button: Filter by `["templates", "best-practices"]`

---

## Example Workflow: Creating the COE Hub

Let's walk through creating the full COE Hub page from scratch.

### Step 1: Create Hub Page

```yaml
Title: "Center of Excellence"
Slug: "coe-hub"
Hero:
  Icon: "⭐"
  Title: "Center of Excellence"
  Subtitle: "Where customer wins become repeatable success..."
  Background: "Orange Gradient"
Show Catalog: true
Catalog Title: "Browse All Resources"
```

### Step 2: Create Overview Button

```yaml
Button ID: "overview"
Label: "Overview"
Icon: "⭐"
Color: "bg-[#F59E0B]"
```

#### Add Sections to Overview:

**Section 1: CoE Assistant (Hub Content Section)**
```yaml
Title: "Meet Your CoE Assistant"
Background: "custom"
Custom Class: "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
Content Type: "twoColumn"
Left Column: [Rich text describing assistant]
Right Column: [Example query]
CTA: "Access CoE Assistant →"
```

**Section 2: Stats (Hub Stat Grid Section)**
```yaml
Title: "CoE at a Glance"
Description: "Impact across our organization"
Columns: 4
Stats: [4 statistics as shown above]
```

**Section 3: How It Works (Hub Process Steps Section)**
```yaml
Title: "How CoE Works"
Description: "Our systematic approach..."
Variant: "default"
Columns: 3
Steps: [3 process steps]
```

**Catalog Filter:**
```yaml
CoE Categories: [] (empty = show all)
```

### Step 3: Create BVA Button

```yaml
Button ID: "bva"
Label: "BVA"
Icon: "💰"
Color: "bg-yellow-600"
```

#### Add Sections to BVA:

**Section 1: BVA Overview (Hub Content Section)**
```yaml
Title: "Business Value Analysis Playbook"
Description: "Quantify the impact of Gladly Sidekick..."
Background: "white"
Content Type: "twoColumn"
[Configure columns with BVA content]
```

**Section 2: BVA Levels (Hub Feature Cards Section)**
```yaml
Title: "Choose Your BVA Level"
Description: "Match your analysis to your available data"
Columns: 3
Cards: [3 cards for 101, 201, 301 levels]
```

**Catalog Filter:**
```yaml
CoE Categories: ["bva"]
```

### Step 4: Create Proof Points Button

```yaml
Button ID: "proof-points"
Label: "Proof Points"
Icon: "🏆"
Color: "bg-orange-600"
```

#### Add Sections:

**Section 1: Quick Links (Hub Feature Cards Section)**
```yaml
Title: null
Columns: 2
Cards:
  - Proof Point Repository (external link)
  - Social Proof Templates (external link)
```

**Section 2: Latest Wins (Hub Feature Cards Section)**
```yaml
Title: "Latest Customer Wins"
Description: "Recent success stories..."
Columns: 3
Cards: [3 customer win cards]
```

**Catalog Filter:**
```yaml
CoE Categories: ["proof-points"]
```

### Step 5: Create Resources Button

```yaml
Button ID: "resources"
Label: "Resources"
Icon: "📚"
Color: "bg-amber-600"
```

#### Add Sections:

**Section 1: Resource Library (Hub Feature Cards Section)**
```yaml
Title: "CoE Resource Library"
Description: "Proven templates, guides, and playbooks..."
Columns: 3
Show Filter Tabs: true
Filter Tabs: ["All Resources", "Best Practices", "Dashboards", "Templates"]
Cards: [8+ resource cards with real links]
```

**Catalog Filter:**
```yaml
CoE Categories: ["templates", "best-practices"]
```

### Step 6: Publish

Click **"Publish"** in the top-right corner of Sanity Studio. Your hub page is now live!

---

## What Content Editors See in Sanity Studio

### Main Hub Page Editor

```
┌─────────────────────────────────────────────┐
│ 🎯 Hub: Center of Excellence                │
│ /coe-hub • 4 buttons                        │
├─────────────────────────────────────────────┤
│ [Expand] Hero Section                       │
│   Icon: ⭐                                   │
│   Title: Center of Excellence               │
│   Subtitle: Where customer wins...          │
│   Background: Orange Gradient               │
├─────────────────────────────────────────────┤
│ [Expand] Navigation Buttons (4)             │
│   ├─ ⭐ Overview (3 sections)               │
│   ├─ 💰 BVA (2 sections)                    │
│   ├─ 🏆 Proof Points (2 sections)           │
│   └─ 📚 Resources (1 section)               │
├─────────────────────────────────────────────┤
│ Show Universal Catalog: ✓                   │
│ Catalog Title: Browse All Resources         │
├─────────────────────────────────────────────┤
│ [Expand] SEO                                │
│   Meta Title: ...                           │
│   Meta Description: ...                     │
└─────────────────────────────────────────────┘
```

### Button Editor (Expanded View)

```
┌─────────────────────────────────────────────┐
│ ⭐ Overview (3 sections)                    │
├─────────────────────────────────────────────┤
│ Button ID: overview                         │
│ Label: Overview                             │
│ Icon: ⭐                                    │
│ Active Color: bg-[#F59E0B]                 │
├─────────────────────────────────────────────┤
│ [Expand] Sections for this Button (3)      │
│   ├─ 💜 Meet Your CoE Assistant             │
│   │   (Hub Content Section)                 │
│   ├─ 📊 Stat Grid: CoE at a Glance         │
│   │   (4 stats • 4 columns)                 │
│   └─ 🔄 Process Steps: How CoE Works       │
│       (3 steps • default variant)           │
├─────────────────────────────────────────────┤
│ [Expand] Catalog Filter                    │
│   CoE Categories: [] (show all)            │
└─────────────────────────────────────────────┘
```

### Section Editor (Stats Example)

```
┌─────────────────────────────────────────────┐
│ Stat Grid: CoE at a Glance                  │
│ 4 stats • 4 columns                         │
├─────────────────────────────────────────────┤
│ Section Title: CoE at a Glance              │
│ Description: Impact across our organization │
│ Columns: 4                                  │
├─────────────────────────────────────────────┤
│ [Expand] Statistics (4)                     │
│   ├─ 🏆 150+ (Success Stories)              │
│   ├─ 📊 89.9% (Highest FCR Achieved)        │
│   ├─ 📚 200+ (Resources Available)          │
│   └─ 💰 40% (Higher Win Rate with BVA)      │
└─────────────────────────────────────────────┘
```

---

## Key Benefits of This System

### For Content Editors
✅ **No coding required** - Build complex hub pages entirely through Sanity Studio
✅ **Visual previews** - See how content will look as you build
✅ **Flexible sections** - Mix and match section types for each button
✅ **Reusable components** - Same section types work across all hub pages
✅ **Easy updates** - Change content anytime without developer involvement

### For Developers
✅ **Type-safe schemas** - All fields properly typed and validated
✅ **Component-driven** - Maps directly to React components
✅ **Maintainable** - Clear separation between content and code
✅ **Extensible** - Easy to add new section types as needed

### For Users
✅ **Fast navigation** - Button-based navigation with instant view switching
✅ **Curated content** - Each button shows targeted, relevant content
✅ **Consistent design** - All hubs follow same patterns and styling
✅ **Smart filtering** - Universal catalog auto-filters by button context

---

## Next Steps

1. **Access Sanity Studio**: Visit `/studio` route
2. **Create your first Hub Page**: Follow the workflow above
3. **Add buttons and sections**: Build out your content structure
4. **Preview changes**: Use Sanity's preview mode to see live changes
5. **Publish**: Make your hub page live for all users

---

## Need Help?

- **Sanity Studio Docs**: https://www.sanity.io/docs
- **Project Documentation**: See `/docs` folder
- **Schema Files**: Located in `/sanity/schemas/`
- **Component Files**: Located in `/components/hub/`

**Questions?** Reach out to the development team or check the project's Claude.md file for more context.
