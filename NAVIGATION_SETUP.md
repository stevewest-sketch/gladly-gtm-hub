# Navigation Setup Guide

## Overview

The navigation is now controllable through Sanity CMS! Follow these steps to set it up.

---

## Step 1: Access Sanity Studio

Visit your Sanity Studio:
- **Local**: http://localhost:3000/studio
- **Production**: https://gladly-gtm-hub.vercel.app/studio

---

## Step 2: Create Navigation Document

1. In the Sanity Studio sidebar, click **"🧭 Navigation"**
2. Click the **"Create"** button
3. Fill in the following fields:

### Basic Settings

**Title**: `Main Navigation` (internal name, not shown on site)

**Logo Text**: `GTM Hub` (displayed at the top of the navigation)

---

## Step 3: Add Navigation Items

Click **"Add item"** under **Navigation Items** to add each section below:

### 1. Home

- **Title**: `Home`
- **Icon (Emoji)**: `🏠`
- **Link URL**: `/`
- **Expanded by Default**: ☐ (unchecked)
- **Active Highlight Color**: `Blue`
- **Child Items**: (leave empty)

### 2. Center of Excellence

- **Title**: `Center of Excellence`
- **Icon (Emoji)**: `🎯`
- **Link URL**: (leave empty)
- **Expanded by Default**: ☑ (checked)
- **Active Highlight Color**: `Purple`
- **Child Items**: Click "Add item" for each:
  1. **Title**: `CoE Overview`, **Link URL**: `/coe`, **Color**: `Purple`
  2. **Title**: `Business Value`, **Link URL**: `/coe/bva`, **Color**: `Green`
  3. **Title**: `AI Best Practices`, **Link URL**: `/coe/ai-best-practices`, **Color**: `Blue`
  4. **Title**: `Customer Wins`, **Link URL**: `/coe/customer-wins`, **Color**: `Orange`

### 3. Enablement

- **Title**: `Enablement`
- **Icon (Emoji)**: `📚`
- **Link URL**: (leave empty)
- **Expanded by Default**: ☐ (unchecked)
- **Active Highlight Color**: `Blue`
- **Child Items**:
  1. **Title**: `Demo Hub`, **Link URL**: `/enablement/demo`, **Color**: `Blue`
  2. **Title**: `Competitive`, **Link URL**: `/enablement/competitive`, **Color**: `Orange`
  3. **Title**: `Training Hub`, **Link URL**: `/enablement/training`, **Color**: `Green`
  4. **Title**: `E-Learning Hub`, **Link URL**: `/enablement/e-learning`, **Color**: `Blue`
  5. **Title**: `Playbooks`, **Link URL**: `/enablement/playbooks`, **Color**: `Blue`

### 4. Team Toolkits

- **Title**: `Team Toolkits`
- **Icon (Emoji)**: `🛠️`
- **Link URL**: (leave empty)
- **Expanded by Default**: ☐ (unchecked)
- **Active Highlight Color**: `Blue`
- **Child Items**:
  1. **Title**: `Sales`, **Link URL**: `/enablement/toolkits/sales`, **Color**: `Blue`
  2. **Title**: `CSM`, **Link URL**: `/enablement/toolkits/csm`, **Color**: `Purple`
  3. **Title**: `SC`, **Link URL**: `/enablement/toolkits/success`, **Color**: `Green`
  4. **Title**: `Marketing`, **Link URL**: `/enablement/toolkits/marketing`, **Color**: `Orange`

### 5. Products

- **Title**: `Products`
- **Icon (Emoji)**: `🤖`
- **Link URL**: (leave empty)
- **Expanded by Default**: ☑ (checked)
- **Active Highlight Color**: `Blue`
- **Child Items**:
  1. **Title**: `Sidekick Standalone`, **Link URL**: `/product/sidekick-standalone`, **Color**: `Green`
  2. **Title**: `Sidekick Voice`, **Link URL**: `/product/sidekick-voice`, **Color**: `Green`
  3. **Title**: `Sidekick Email`, **Link URL**: `/product/sidekick-email`, **Color**: `Green`
  4. **Title**: `Sidekick Sales`, **Link URL**: `/product/sidekick-sales`, **Color**: `Green`
  5. **Title**: `Customer AI`, **Link URL**: `/product/customer-ai`, **Color**: `Purple`
  6. **Title**: `Guides & Journeys`, **Link URL**: `/product/guides-and-journeys`, **Color**: `Purple`
  7. **Title**: `App Platform`, **Link URL**: `/product/app-platform`, **Color**: `Blue`

### 6. Resources

- **Title**: `Resources`
- **Icon (Emoji)**: `📁`
- **Link URL**: (leave empty)
- **Expanded by Default**: ☐ (unchecked)
- **Active Highlight Color**: `Blue`
- **Child Items**:
  1. **Title**: `Templates`, **Link URL**: `/resources/templates`, **Color**: `Orange`
  2. **Title**: `Content Hub`, **Link URL**: `/resources/content`, **Color**: `Purple`

---

## Step 4: Publish

Click the **"Publish"** button at the bottom of the page.

---

## Step 5: Verify

Refresh your website and the navigation should now be controlled by Sanity!

---

## How It Works

- **Logo Text**: The text at the top of the navigation ("GTM Hub")
- **Single Links**: Items with a Link URL but no children (like "Home")
- **Expandable Sections**: Items without a Link URL but with children (like "Products")
- **Default Expanded**: Whether a section starts open or closed
- **Active Highlight Color**: The color theme when a link is active (Blue/Purple/Green/Orange)

---

## Editing Navigation

After setup, you can:
- ✅ Add/remove navigation items
- ✅ Reorder sections by dragging
- ✅ Change link URLs
- ✅ Update icons and colors
- ✅ Change which sections are expanded by default
- ✅ Modify the logo text

All changes will appear instantly on the website after publishing!

---

## Fallback Behavior

If no navigation document exists in Sanity, the website will show the hardcoded navigation as a fallback. Once you create the navigation document, it will automatically switch to the Sanity-controlled version.

---

**Last Updated**: 2025-11-11
