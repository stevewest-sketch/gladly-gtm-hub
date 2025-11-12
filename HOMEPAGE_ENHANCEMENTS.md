# Homepage Enhancement Guide

This guide explains the new homepage section components that can enhance your site's first impression and engagement.

## New Homepage Sections

### 1. Quick Stats Section

Display key metrics and statistics in an eye-catching grid.

**Use cases:**
- Show platform statistics (users, uptime, satisfaction)
- Display company metrics (customers, revenue, growth)
- Highlight performance numbers (speed improvements, efficiency gains)

**Features:**
- 2-4 column responsive grid
- Color-coded stats (purple, blue, green, orange)
- Optional emoji icons
- Hover animations

**How to add in Sanity:**
1. Go to Homepage in Sanity Studio
2. Add a new section to Page Builder
3. Select "Quick Stats Section"
4. Configure:
   - Section Title (e.g., "By the Numbers")
   - Section Subtitle (optional)
   - Background: White or Light Gray
   - Add 2-4 stats with:
     - Value (e.g., "99.9%", "10x", "50+")
     - Label (description)
     - Icon (emoji, optional)
     - Color theme

**Example:**
```
Section Title: "Platform Impact"
Subtitle: "Real results from real customers"

Stats:
- 📊 99.9% | Uptime Guarantee | Purple
- 🚀 10x | Faster Response Times | Blue
- 💰 $2M | Average Savings | Green
- 😊 94% | Customer Satisfaction | Orange
```

---

### 2. Featured Content Section

Highlight important content, new features, or popular resources.

**Use cases:**
- Showcase new product features
- Promote important resources
- Highlight training materials
- Feature case studies or success stories

**Features:**
- Two layout options: Cards Grid or List
- Optional badges (New, Updated, Popular)
- Emoji icons or image thumbnails
- Responsive grid (1-3 columns)
- Hover effects and animations

**How to add in Sanity:**
1. Go to Homepage in Sanity Studio
2. Add a new section to Page Builder
3. Select "Featured Content Section"
4. Configure:
   - Section Title (e.g., "What's New")
   - Section Subtitle (optional)
   - Layout: Cards or List
   - Background: White or Light Gray
   - Add featured items with:
     - Title
     - Description
     - URL/Link
     - Icon (emoji, optional)
     - Badge text (optional)
     - Badge color (Info, Success, Warning, Error)
     - Image URL (optional, for cards layout)

**Example - Cards Layout:**
```
Section Title: "Featured Resources"
Subtitle: "Essential tools to get started"
Layout: Cards Grid

Items:
1. 🎯 Sales Playbook
   Description: "Complete methodology for selling Gladly"
   URL: /enablement/playbooks/sales
   Badge: "Updated" (Success)

2. 📊 ROI Calculator
   Description: "Calculate business value and savings"
   URL: /coe/bva
   Badge: "Popular" (Info)

3. 🎓 Training Portal
   Description: "Interactive courses and certifications"
   URL: /enablement/training
   Badge: "New" (Warning)
```

**Example - List Layout:**
```
Section Title: "Recently Updated"
Layout: List

Items:
1. 📝 Competitive Battlecards | Latest competitor analysis
2. 🎨 Brand Guidelines | Updated visual identity
3. 💡 AI Best Practices | New implementation guide
```

---

## Recommended Homepage Structure

For maximum impact, consider this section order:

```
1. Hero with Search (existing)
   - Eye-catching hero
   - Prominent search bar

2. Quick Stats Section (NEW)
   - Show platform credibility
   - Display key metrics

3. Quick Navigation (existing)
   - Jump links to key sections

4. Featured Content Section (NEW)
   - Highlight what's new
   - Promote important resources

5. Team Toolkits (existing)
   - Role-based navigation

6. Products Grid (existing)
   - Product catalog

7. What's New Section (existing)
   - Latest updates

8. Popular Resources (existing)
   - Most useful content
```

---

## Design Best Practices

### Quick Stats Section

**Do:**
- Use 2-4 stats for optimal impact
- Keep values concise (e.g., "99%", "10x")
- Use emojis that match your metric
- Vary colors for visual interest

**Don't:**
- Overcrowd with too many stats
- Use vague or unimpressive numbers
- Mix incompatible color schemes

### Featured Content Section

**Do:**
- Use Cards layout for rich content (images, longer descriptions)
- Use List layout for quick scanning of many items
- Add badges to highlight status (New, Updated, etc.)
- Keep descriptions concise (1-2 sentences)

**Don't:**
- Mix cards with and without images in same section
- Use too many different badge colors
- Write long descriptions that break card layout

---

## Color Guide

### Stats Colors
- **Purple**: Primary/Platform metrics
- **Blue**: Trust/Reliability metrics
- **Green**: Success/Growth metrics
- **Orange**: Performance/Speed metrics

### Badge Colors
- **Info (Blue)**: General information, popular items
- **Success (Green)**: Completed, verified, recommended
- **Warning (Orange)**: New, important, time-sensitive
- **Error (Red)**: Critical, urgent, breaking changes

---

## Examples

### SaaS Platform Homepage
```
Quick Stats:
- 🌐 10,000+ | Active Users | Purple
- ⚡ 99.9% | Uptime SLA | Blue
- 💚 95% | Customer Satisfaction | Green
- 🚀 2x | Faster Than Competitors | Orange

Featured Content (Cards):
- Product Demo | See the platform in action
- Customer Stories | Real results from real customers
- Get Started Guide | Launch in 30 minutes
```

### Training Portal Homepage
```
Quick Stats:
- 📚 150+ | Training Modules | Purple
- 🎓 5,000+ | Certified Users | Blue
- ⭐ 4.8/5 | Average Rating | Green

Featured Content (List):
- New Certification Program | Advanced Gladly Platform
- Updated Course | Sales Methodology 2.0
- Popular Training | Demo Fundamentals
```

---

## Component Code

Located in:
- `/components/sections/QuickStatsSection.tsx`
- `/components/sections/FeaturedContentSection.tsx`

Sanity schemas:
- `/sanity/schemas/sections/quickStatsSection.ts`
- `/sanity/schemas/sections/featuredContentSection.ts`

Homepage integration:
- `/app/page.tsx` (renderSection function)

---

## Additional Notes

- Both sections are fully responsive (mobile, tablet, desktop)
- All sections integrate with Sanity's Page Builder
- Sections can be reordered via drag-and-drop in Sanity
- Stats and featured items can be added/removed/reordered
- No code changes needed - fully CMS-driven

---

## Need Help?

- Check existing sections in Sanity for examples
- Review the Component Library documentation
- See `SEARCH_GUIDE.md` for search functionality
- Contact the development team
