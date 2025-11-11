# Homepage Setup Guide - GTM Hub Style

Your new homepage has been successfully recreated to match the GTM Hub design from your HTML file! Here's how to populate it with content through Sanity Studio.

## Accessing Sanity Studio

1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/studio`
3. Find and click on "Homepage" in the left sidebar

## Content Structure

### 1. Hero Section
- **Hero Title**: Large main heading (e.g., "Internal Resources Hub")
- **Hero Subtitle**: Supporting text below the title
- **Search Placeholder**: Placeholder text for the search bar

### 2. Team Toolkits (4 cards recommended)
Each toolkit card should have:
- **Emoji**: Single emoji character (e.g., 📊, 💜, 🌱, 🎨)
- **Title**: Card heading
- **Description**: Short description (2-3 sentences)
- **Link**: URL or path
- **Color**: Choose from Blue (Sales), Purple (CSM), Green (SC), Orange (Marketing)

Example:
```
Emoji: 📊
Title: Sales Team Toolkit
Description: Everything you need to close deals and track your pipeline
Link: /sales
Color: Blue (Sales)
```

### 3. Quick Tasks (6 cards recommended)
Simpler cards with:
- **Emoji**: Icon (e.g., ✍️, 📋, 🎯)
- **Title**: Task name
- **Link**: URL

Example:
```
Emoji: ✍️
Title: Submit Expense Report
Link: /expenses
```

### 4. Products Grid
- **Emoji**: Product icon
- **Title**: Product name
- **Link**: Product page URL

### 5. What's New (Shows latest 3)
Updates section with:
- **Date**: Publication date
- **Emoji**: Update icon (e.g., 🚀, ✨, 🎉)
- **Title**: Update heading
- **Description**: Brief description
- **Links** (up to 2):
  - Link Text: "Read more", "Learn more", etc.
  - URL: Link destination

Example:
```
Date: 2025-10-20
Emoji: 🚀
Title: New Dashboard Released
Description: We've launched a completely redesigned dashboard with improved analytics
Links:
  - Text: "View Dashboard"
    URL: "/dashboard"
  - Text: "What's Changed"
    URL: "/changelog"
```

### 6. Popular Resources (6 cards recommended)
Same structure as Quick Tasks:
- **Emoji**: Resource icon
- **Title**: Resource name
- **Link**: Resource URL

### 7. Help Section
Bottom section with:
- **Title**: Main heading (e.g., "Need Help?")
- **Description**: Supporting text
- **Buttons** (up to 2):
  - Text: Button label
  - Link: Button URL
  - Variant: Choose "Primary" or "Secondary"

Example:
```
Title: Need Help?
Description: Our support team is here to assist you
Buttons:
  - Text: "Contact Support"
    Link: "/support"
    Variant: Primary
  - Text: "Browse FAQ"
    Link: "/faq"
    Variant: Secondary
```

## Design Features

### Colors
- **Blue**: Sales team content
- **Purple**: Customer Success (CSM) content
- **Green**: Supply Chain (SC) content
- **Orange**: Marketing content
- **Background**: Light gray (#f8f9fa)

### Hover Effects
All cards have:
- Lift animation (moves up slightly)
- Shadow increase
- Color highlight on hover

### Typography
- Main title: 72px (text-6xl/text-7xl)
- Section headings: 30px (text-3xl)
- Card titles: 20px (text-xl)
- Body text: 16px (text-base)

## Tips

1. **Emoji Selection**: Use visually distinct emojis for better recognition
2. **Link Format**: Use relative paths (e.g., `/dashboard`) for internal links
3. **Content Length**: Keep descriptions concise - 1-2 sentences for cards
4. **Color Coding**: Use consistent colors for each team across all sections
5. **What's New**: Only the 3 most recent updates will display

## Next Steps

1. Log into Sanity Studio at `/studio`
2. Create or edit the Homepage document
3. Fill in all sections with your content
4. Click "Publish" to make changes live
5. Refresh your homepage to see the updates

## Example Data Set

Here's a complete example you can use as inspiration:

**Hero:**
- Title: "Internal Resources Hub"
- Subtitle: "Everything you need, all in one place"

**Team Toolkits:**
1. 📊 Sales Toolkit - Blue
2. 💜 CSM Toolkit - Purple
3. 🌱 Supply Chain - Green
4. 🎨 Marketing Hub - Orange

**Quick Tasks:**
1. ✍️ Submit Expense Report
2. 📋 Request Time Off
3. 🎯 Set Goals
4. 📊 View Reports
5. 🔄 Update Profile
6. 📧 Send Announcement

Enjoy your new homepage!
