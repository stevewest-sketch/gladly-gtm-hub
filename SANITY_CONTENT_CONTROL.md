# Sanity Content Control Guide

## Overview

Your Sanity CMS now has comprehensive control over almost every aspect of the website! Here's everything you can manage.

---

## 🧭 Navigation Control

**Location:** Sanity Studio → 🧭 Navigation

**What You Can Control:**
- ✅ Logo text at the top
- ✅ All navigation sections and links
- ✅ Section icons (emojis)
- ✅ Which sections are expanded by default
- ✅ Active highlight colors
- ✅ Add/remove/reorder navigation items
- ✅ Create nested sub-menus

**Setup Required:** See `NAVIGATION_SETUP.md` for step-by-step instructions

---

## ⚙️ Site Settings (NEW!)

**Location:** Sanity Studio → ⚙️ Site Settings

**Global Configuration:**

### Branding
- Site title (browser tabs, SEO)
- Site description (default for all pages)
- Site URL
- Default social share image
- Favicon

### Brand Colors
- Primary color (Purple) - `#8C69F0`
- Secondary color (Blue) - `#3B82F6`
- Accent color (Orange) - `#F97316`

### Analytics & Tracking
- Google Analytics ID
- Google Tag Manager ID

### Maintenance Mode
- Enable/disable maintenance mode
- Custom maintenance message

### Site-wide Announcement Bar
- Show/hide announcement
- Announcement message
- Link URL and text
- Style (Info/Success/Warning/Important)

---

## 📄 Page Control

**Location:** Sanity Studio → All Pages (or specific page categories)

### Basic Settings
- Page title
- Subtitle
- URL slug
- Hero section color theme

### SEO & Social Sharing (NEW!)
Each page now has SEO controls:
- Custom meta title (for search results)
- Meta description (150-160 characters)
- Custom social share image (1200x630px)
- Hide from search engines option

### Content Options
- Rich text content (with formatting, links, images)
- Quick navigation anchor links
- Drag & drop page builder (see sections below)

---

## 🎨 Page Builder Sections

**Location:** In any page → Page Builder (Drag & Drop Sections)

### Existing Sections
1. **Hero Section** - Large banner with title and CTA
2. **Feature Grid** - Multiple feature cards in a grid
3. **Stats Section** - Key metrics display
4. **Content Section** - Rich text content blocks
5. **CTA Section** - Call-to-action with buttons
6. **Launch Status** - Product status badges

### NEW Sections (Added Today!)

#### 7. Image & Text Section
Perfect for product features, case studies, or explanations
- **Layouts:** Image left, right, or top
- **Content:** Heading, rich text, multiple CTA buttons
- **Background:** White, gray, purple, or blue

#### 8. Accordion / FAQ Section
Collapsible Q&A or information sections
- **Items:** Question + detailed answer (rich text)
- **Options:** Set items to open by default
- **Great for:** FAQs, documentation, feature details

#### 9. Video Section
Embed videos from multiple sources
- **Platforms:** YouTube, Vimeo, Loom, or direct MP4
- **Options:** Custom thumbnail, aspect ratio, autoplay
- **Content:** Heading and description

#### 10. Testimonial Section
Customer quotes and reviews
- **Layouts:** Grid, single large, or carousel
- **Content:** Quote, author, role, company, photo, rating
- **Backgrounds:** White, gray, or purple

---

## 📚 Content Types You Control

### Homepage
- Hero with search bar
- Team toolkits cards
- Quick tasks
- Products grid
- What's new section
- Popular resources
- Help section

### Training Sessions
- Title, date, description
- Product association
- Duration, materials
- Video/recording link
- Tags for filtering

### Learning Modules
- Course content
- Completion tracking
- Prerequisites

### Resources
- **Templates:** Downloadable files and templates
- **Content:** Articles, guides, documentation
- **Competitive:** Competitive intelligence and battle cards

### Products
- Product pages with full page builder
- Launch status
- Feature highlights
- Documentation

### Center of Excellence (CoE)
- CoE overview
- Business value analysis
- AI best practices
- Customer wins and case studies

---

## 🎯 What You Can Now Do

### Content Management
✅ Edit all text and images
✅ Add new pages without code
✅ Reorder sections by dragging
✅ Create custom page layouts
✅ Manage SEO for each page
✅ Control navigation structure

### Design Control
✅ Choose background colors
✅ Select highlight colors
✅ Pick section layouts
✅ Upload custom images

### Site-wide Settings
✅ Configure brand colors
✅ Set up analytics tracking
✅ Show announcements
✅ Enable maintenance mode
✅ Manage default SEO

### No Code Required
✅ All changes through Sanity Studio
✅ Live preview of changes
✅ Publish when ready
✅ No developer needed for content updates

---

## 🚀 Getting Started

1. **Access Sanity Studio:**
   - Local: http://localhost:3000/studio
   - Production: https://gladly-gtm-hub.vercel.app/studio

2. **Set Up Navigation:** (if not done yet)
   - Follow `NAVIGATION_SETUP.md`

3. **Configure Site Settings:**
   - Go to ⚙️ Site Settings
   - Fill in your site title, description, and URLs
   - Add analytics IDs if you have them

4. **Enhance Existing Pages:**
   - Open any page
   - Add SEO information
   - Try new section types in Page Builder

5. **Create New Pages:**
   - Click "+" to create a new page
   - Use Page Builder to add sections
   - Publish when ready

---

## 📖 Resources

- **Navigation Setup:** See `NAVIGATION_SETUP.md`
- **Design Guidelines:** See `DESIGN_GUIDELINES.md`
- **Okta SSO Setup:** See `OKTA_SSO_SETUP.md`

---

## 💡 Tips

### Best Practices
- Use SEO fields for better search rankings
- Keep meta descriptions under 160 characters
- Use 1200x630px images for social sharing
- Test navigation changes before publishing
- Use accordions for lengthy content
- Add testimonials for credibility

### Content Strategy
- Alternate section backgrounds for visual interest
- Use videos to increase engagement
- Break up long content with images
- Add quick navigation for long pages
- Keep CTAs clear and action-oriented

---

## 🆘 Need Help?

If you need additional content controls or custom section types:
1. Describe what you want to control
2. We can add new schemas and section types
3. Everything can be made editable through Sanity!

---

**Last Updated:** 2025-11-11

**Changes Made Today:**
- ✅ Removed green Vision Tool widget
- ✅ Added navigation control system
- ✅ Created Site Settings document
- ✅ Added SEO fields to all pages
- ✅ Added 4 new section types (Image & Text, Accordion, Video, Testimonials)
- ✅ Enhanced page builder capabilities
