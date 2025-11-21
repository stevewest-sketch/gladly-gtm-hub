# Enablement Page Standard

This document defines the standard structure for enablement pages in the Gladly Enablement Hub.

## 📄 Page Structure

### **1. Header Section**
Displays at the top of every enablement detail page.

**Components:**
- **Format Badge** - Colored pill indicating content type
  - 🎥 Live Replay (blue) - `live-replay`
  - 📚 E-Learning (purple) - `async`
  - 📄 Document (gray) - `document`

- **Difficulty Badge** - Optional skill level indicator
  - Beginner
  - Intermediate
  - Advanced

- **Title** - Large, bold heading (H1)
- **Description** - 2-3 sentence summary explaining what learners will gain

**Metadata Row:**
- 📅 Publish Date
- ⏱️ Duration (in minutes)
- 👤 Presenter/Author name

**Tags:**
- Product tags (colored pills matching product brand colors)
- Team tags (outlined pills)
- Topic tags (gray background pills)

---

### **2. Main Content Area** (Left Column - 2/3 width)

**A. Video Player**
- **Wistia Embed** - Primary video hosting platform
- **YouTube/Vimeo Fallback** - Alternative video URL
- Responsive 16:9 aspect ratio
- Play button overlay on placeholder

**B. Key Takeaways Section**
- White card with shadow
- 📝 Section heading
- **Checkmark list** - Green circles with white checkmarks
- 3-5 bullet points highlighting main learnings
- Clear, action-oriented statements

**C. Full Transcript** (Collapsible)
- **Accordion component** - Collapsed by default
- 📄 Section heading with dropdown arrow
- Complete video transcript
- Searchable text for accessibility
- Preserves line breaks and formatting

**D. Additional Content Blocks** (Optional, Flexible)
- **Modular sections** - Add as many as needed
- 8 different block types available:
  - 📝 **Rich Text** - General content with formatting
  - 📋 **Step-by-Step Guide** - Numbered steps with optional images
  - ❓ **FAQ** - Expandable questions and answers
  - 💡 **Tips & Best Practices** - Highlighted advice
  - ⚠️ **Common Mistakes** - Pitfalls to avoid
  - 🎯 **Use Cases** - Real-world scenarios
  - 🔧 **How to Use** - Application instructions
  - 📊 **Data/Stats** - Metrics and statistics
- Each block can be **collapsible** for better page organization
- **Custom styling** - Each block type has unique colors and icons
- **Rich formatting** - Supports headings, bold, italic, lists, links, images
- Great for **comprehensive guides** that need structured sections

---

### **3. Sidebar** (Right Column - 1/3 width)

**A. Related Materials**
- **Slides Deck** - Download presentation files
- Icon: 📎 Document icon in purple circle
- Hover state: Purple background
- Download icon on right

**B. Additional Resources**
- 🔗 Section heading
- **Resource cards** with:
  - Resource title
  - Resource type (link, download, external)
  - Click to open in new tab
- Hover state: Purple border

---

## 📋 Content Guidelines

### **Title Best Practices**
✅ **Good Examples:**
- "Mastering Gladly Sidekick AI - Complete Training"
- "Discovery Call Framework for AE Success"
- "Q1 Product Roadmap & Feature Highlights"

❌ **Avoid:**
- Generic titles: "Training Session"
- Missing context: "AI Features"
- Too long: "A Comprehensive Deep-Dive into the Advanced Features..."

### **Description Guidelines**
- **Length:** 2-3 sentences (30-50 words)
- **Focus:** What will learners achieve?
- **Include:** Who it's for, what they'll learn, why it matters

✅ **Good Example:**
> "Learn how to leverage Gladly Sidekick AI to supercharge your customer service team. This comprehensive training covers setup, best practices, and advanced features to maximize efficiency and customer satisfaction."

### **Key Takeaways Guidelines**
- **Count:** 3-5 bullet points
- **Format:** Action-oriented, specific outcomes
- **Lead with verbs:** Understand, Configure, Implement, Measure, Leverage

✅ **Good Examples:**
- "Understand how Sidekick AI enhances agent productivity by 40%"
- "Configure AI settings to match your brand voice"
- "Implement best practices for training agents to work alongside AI"

❌ **Avoid:**
- Vague statements: "Learn about AI"
- Feature lists: "Sidekick AI has these features..."
- Too technical: "Configure BERT-based NLP models..."

### **Transcript Guidelines**
- **Include:** Welcome, main content, conclusion
- **Format:** Natural speaking style with paragraphs
- **Length:** Full video content (500-2000 words typical)
- **Accessibility:** Critical for searchability and inclusivity

---

## 🎨 Visual Design Standards

### **Colors**
- **Primary Green:** `#009B00` - Gladly brand, CTA buttons
- **Purple:** `#8C69F0` - Interactive elements, hover states
- **Blue:** `#3B82F6` - Live replay badge
- **Gray Scale:**
  - `#0D0D0D` - Headings
  - `#252525` - Body text
  - `#666666` - Metadata
  - `#F3F3F3` - Backgrounds

### **Typography**
- **H1 (Title):** 36px, bold
- **H2 (Sections):** 24px, bold
- **H3 (Sidebar):** 18px, bold
- **Body:** 16px, regular
- **Metadata:** 14px, semi-bold
- **Badges:** 12px, semi-bold

### **Spacing**
- **Card Padding:** 24px
- **Section Spacing:** 32px between major sections
- **List Item Spacing:** 12px between takeaways
- **Border Radius:** 8px for cards, 999px for pills

---

## 📊 Required vs Optional Fields

### **Required (Must Have)**
- ✅ Title
- ✅ Slug (auto-generated)
- ✅ Description
- ✅ Content Type
- ✅ Page Template
- ✅ Status: Published
- ✅ Published To: (at least "enablement")
- ✅ At least 1 key takeaway

### **Highly Recommended**
- ⭐ Video URL or Wistia ID
- ⭐ 3-5 Key Takeaways
- ⭐ Duration
- ⭐ Presenter name
- ⭐ Publish date
- ⭐ Audience targeting
- ⭐ Learning path assignment

### **Optional (Nice to Have)**
- Transcript
- Additional resources
- Slides deck
- Difficulty level
- Product/Team/Topic tags
- Featured toggle
- Priority score
- **Content Blocks** - Add structured sections like FAQs, step-by-step guides, tips, use cases, etc.

---

## 🎯 Example Use Cases

### **1. Training Session (Most Common)**
**Best for:** Live trainings, workshops, webinars
**Template:** `training-session`
**Format:** `live-replay`

**Required:**
- Video (Wistia or YouTube)
- Key Takeaways (5)
- Presenter name
- Duration

**Optional:**
- Slides deck
- Transcript (highly recommended)
- Additional resources

---

### **2. Quick Learning**
**Best for:** Short videos, bite-sized content
**Template:** `micro-learning`
**Format:** `video` or `async`

**Required:**
- Video (under 10 minutes)
- 2-3 Key Takeaways
- Clear title describing specific skill

---

### **3. Documentation/Guide**
**Best for:** Written guides, SOPs, how-tos
**Template:** `training-session`
**Format:** `document`

**Required:**
- Document URL (Google Docs)
- Key Takeaways
- Clear description

**Optional:**
- Supplementary video
- Templates/examples

---

## 🚀 Quick Start Checklist

When creating a new enablement, follow this checklist:

- [ ] **1. Basics Tab**
  - [ ] Enter clear, descriptive title
  - [ ] Generate slug
  - [ ] Write 2-3 sentence description
  - [ ] Select Content Type: Training
  - [ ] Select Page Template: Training Session
  - [ ] Select Format: Live Replay

- [ ] **2. Content Tab**
  - [ ] Add video URL (YouTube/Vimeo) OR Wistia ID
  - [ ] Add 3-5 key takeaways
  - [ ] Set duration (minutes)
  - [ ] Set difficulty level
  - [ ] Add presenter name
  - [ ] (Optional) Upload slides
  - [ ] (Optional) Add transcript
  - [ ] (Optional) Add additional resources
  - [ ] (Optional) Add content blocks for structured sections:
    - [ ] How to Use guide
    - [ ] Step-by-step instructions
    - [ ] FAQs
    - [ ] Tips & best practices
    - [ ] Common mistakes
    - [ ] Use cases
    - [ ] Data/stats

- [ ] **3. Tagging Tab**
  - [ ] Select target audiences (Sales, CSM, SC, etc.)
  - [ ] Assign to learning path(s)
  - [ ] Add enablement categories

- [ ] **4. Publishing Tab**
  - [ ] Set status: Published
  - [ ] Select "Enablement Hub" in Published To
  - [ ] Set publish date (today)
  - [ ] (Optional) Toggle featured ON for high-priority
  - [ ] (Optional) Set priority 80-100 for featured content

- [ ] **5. Review**
  - [ ] Preview in Sanity
  - [ ] Click "Publish"
  - [ ] Visit enablement hub to verify
  - [ ] Click on card to test detail page

---

## 📈 Analytics & Tracking

Track these metrics for enablements:

- **Views** - How many people accessed the detail page
- **Watch time** - Average % of video watched
- **Downloads** - Slides and resource downloads
- **Completion rate** - If using learning platform
- **Feedback** - CSAT or thumbs up/down

---

## 🗂️ File Organization

```
/scripts/
  create-example-enablement.js    # Reference implementation
  seed-learning-path-enablements.js # Bulk demo data

/components/
  /templates/
    TrainingSessionTemplate.tsx   # Standard enablement page
  /enablement/
    EnablementCard.tsx            # Card component for grids

/app/
  /enablement-hub/
    EnablementHubClient.tsx       # Hub with filters
  /catalog/
    [slug]/page.tsx              # Detail page router
```

---

## 💡 Pro Tips

1. **Video First** - Always include a video when possible. It's the #1 engagement driver.

2. **Transcript = SEO** - Full transcripts make content searchable and accessible.

3. **Clear Takeaways** - Make them specific and measurable. "Increase productivity by 40%" beats "Be more productive."

4. **Featured Sparingly** - Only feature truly exceptional or urgent content. Aim for 3-5 featured items max.

5. **Learning Paths** - Tag content to multiple paths when relevant. It increases discoverability.

6. **Keep It Fresh** - Archive content older than 12 months or update it regularly.

7. **Use Tags Wisely** - Don't over-tag. 2-3 relevant tags is better than 10 loosely related ones.

8. **Test The Flow** - Always preview your enablement as a user before publishing.

9. **Use Content Blocks Strategically** - Don't add every block type just because you can. Choose the blocks that add real value. A great enablement might have just an FAQ and Tips section, while a comprehensive guide might use all block types.

10. **Collapsible = Scannable** - Make longer content blocks collapsible so users can scan the page and expand only what they need.

---

## 📞 Support

**Questions?** Contact the Enablement Team
**Technical Issues?** Check the dev documentation
**Content Strategy?** Review quarterly enablement roadmap
