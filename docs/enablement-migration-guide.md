# Enablement Hub Migration Guide

This guide explains how to migrate from the legacy `enablementArticle` schema to the new unified `catalogEntry` schema with full filtering capabilities.

## Step 1: Create Audience Taxonomy Entries in Sanity Studio

Before migrating content, you need to create the audience taxonomy entries in Sanity Studio.

### Access Sanity Studio

1. Navigate to `http://localhost:3000/studio` (or your production studio URL)
2. Click on "Audiences" in the sidebar

### Create These Audience Entries

Create the following audience entries with these exact values:

#### 1. Sales
- **Audience Name**: `Sales`
- **Slug**: `sales` (auto-generated)
- **Description**: `Sales team members including AEs, SDRs, and Sales Leadership`
- **Display Order**: `10`

#### 2. CSM
- **Audience Name**: `CSM`
- **Slug**: `csm` (auto-generated)
- **Description**: `Customer Success Managers`
- **Display Order**: `20`

#### 3. SC
- **Audience Name**: `SC`
- **Slug**: `sc` (auto-generated)
- **Description**: `Solutions Consultants and Pre-Sales Engineers`
- **Display Order**: `30`

#### 4. Marketing
- **Audience Name**: `Marketing`
- **Slug**: `marketing` (auto-generated)
- **Description**: `Marketing team members`
- **Display Order**: `40`

#### 5. Leadership
- **Audience Name**: `Leadership`
- **Slug**: `leadership` (auto-generated)
- **Description**: `Leadership and management team members`
- **Display Order**: `50`

#### 6. All Teams
- **Audience Name**: `All Teams`
- **Slug**: `all-teams` (auto-generated)
- **Description**: `Content relevant to all team members`
- **Display Order**: `60`

**Publish each entry after creation.**

---

## Step 2: Verify Content Types Exist

The enablement hub uses content types. Verify these exist in Sanity Studio:

1. Go to "Content Types" in the sidebar
2. Ensure these entries exist:
   - **Training** (icon: 🎓, color: #3B82F6)
   - **Meeting** (icon: 🎥, color: #8C69F0)
   - **Demo** (icon: 🖥️, color: #F97316)
   - **Guide** (icon: 📖, color: #10B981)

If they don't exist, create them with the suggested icons and colors.

---

## Step 3: Manual Migration Approach

Since the schema has changed significantly, the recommended approach is **manual migration** through Sanity Studio:

### For Each Enablement Article:

1. **Open the old enablementArticle** in Sanity Studio
2. **Create a new Catalog Entry** with these field mappings:

#### Content Group
- **Title**: Copy from enablementArticle `title`
- **Description**: Copy from enablementArticle `summary`
- **Slug**: Use the same slug from enablementArticle
- **Thumbnail Image**: (optional, can add later)

#### Classification Group
- **Content Type**: Select the matching content type from the dropdown
  - Look up by name (Training, Meeting, Demo, or Guide)
- **Page Template**: Select `training-session` for most enablement content
- **Format**:
  - Choose `live-replay` for Training/Meeting/Demo
  - Choose `async` for Guide

#### Taxonomies Group
- **Audiences**: Select the matching audience(s)
  - Map from old `audience` field
  - Can select multiple if content applies to multiple audiences
- **Topics**: (optional) Convert old `tags` to topics if topics exist
- **Enablement Hub Category**: Check the appropriate categories
  - Map from old `category` field:
    - Product → ☑ Product
    - Toolkit → ☑ Toolkit
    - Competitive → ☑ Competitive
    - Learning → ☑ Learning
    - CoE → ☑ CoE
    - Resources → ☑ Resources

#### Metadata Group
- **Publish Date**: Copy from `publishedDate`
- **Duration**: Convert `readingTime` if applicable ("5 minutes" → 5)
- **Difficulty**: (optional) Add if relevant
- **Presenter**: Copy from old data if available

#### Content Group (continued)
- **Main Content**:
  - **Video URL**: Copy from `videoUrl`
  - **Additional Resources**: Add entries for:
    - Slides: `title: "Presentation Slides"`, `url: [slidesUrl]`, `type: link`
    - Transcript: `title: "Meeting Transcript"`, `url: [transcriptUrl]`, `type: link`
    - Key Asset: `title: [keyAssetLabel]`, `url: [keyAssetUrl]`, `type: download`
- **Key Takeaways**: Copy array from `keyTakeaways`

#### Display Group
- **Featured**: Check if the old entry had `featured: true`
- **Priority**: Set to 50 (default) or higher for important content
- **Published To**: Check "Enablement Hub"
- **Status**: Set to "Published"

3. **Publish the new Catalog Entry**
4. **(Optional) Archive or delete the old enablementArticle**

---

## Step 4: Automated Migration Script (Optional)

If you have many entries to migrate, you can use the provided migration script:

### Prerequisites
```bash
npm install @sanity/client dotenv
```

### Environment Variables
Create a `.env.local` file with:
```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=your_dataset
SANITY_API_TOKEN=your_write_token
```

### Run Migration Script
```bash
npm run migrate:enablement
# or
node scripts/migrate-enablement-to-catalog.js
```

The script will:
1. Fetch all `enablementArticle` entries
2. Look up matching audiences and content types
3. Create new `catalogEntry` entries with mapped fields
4. Print a summary of migrated entries

**Note**: The script will NOT delete the old entries. Review the migrated entries in Sanity Studio before deleting originals.

---

## Step 5: Verify Migration

After migrating content:

1. **Visit the Enablement Hub**: `http://localhost:3000/enablement-hub`
2. **Test filters**:
   - Click different button categories
   - Use the Audience filter in the sidebar
   - Use the Category filter in the sidebar
   - Try the search box
3. **Test pagination**: Ensure pages load correctly
4. **Test sorting**: Try different sort options
5. **Verify Featured section**: Featured entries should appear at the top
6. **Test card clicks**: Ensure detail pages load (may need updating)

---

## Field Mapping Reference

| Old Schema (enablementArticle) | New Schema (catalogEntry) | Notes |
|-------------------------------|---------------------------|-------|
| `title` | `title` | Direct copy |
| `slug` | `slug` | Direct copy |
| `summary` | `description` | Direct copy |
| `category` | `enablementCategory[]` | String → Array |
| `contentType` | `contentType` (ref) | Lookup by name |
| `audience` | `audiences[]` (refs) | Lookup + convert to array |
| `keyTakeaways` | `keyTakeaways` | Direct copy |
| `tags` | `topics[]` (refs) | Optional: lookup topics |
| `readingTime` | `duration` | Parse "X minutes" → number |
| `publishedDate` | `publishDate` | Direct copy |
| `videoUrl` | `mainContent.videoUrl` | Nested object |
| `slidesUrl` | `mainContent.additionalResources[]` | Add as resource |
| `transcriptUrl` | `mainContent.additionalResources[]` | Add as resource |
| `keyAssetUrl` | `mainContent.additionalResources[]` | Add as resource |
| `keyAssetLabel` | `mainContent.additionalResources[].title` | Use for resource title |
| `featured` | `featured` | Direct copy |
| N/A | `status` | Set to "published" |
| N/A | `publishedTo` | Set to ["enablement"] |
| N/A | `pageTemplate` | Set to "training-session" |

---

## Troubleshooting

### "No enablement content found"
- Verify catalogEntry entries have `status: "published"`
- Verify `publishedTo` includes "enablement" or "all"
- Check the server logs for GROQ query errors

### Filters not showing options
- Ensure audience taxonomy entries are published
- Verify `audiences` field is populated on catalog entries
- Check `enablementCategory` array is not empty

### Cards not displaying correctly
- Verify all required fields are populated (title, slug, description)
- Check that `contentType` reference is resolved
- Ensure images are uploaded if using thumbnails

---

## Rollback Plan

If you need to rollback to the old system:

1. Revert `/app/enablement-hub/page.tsx` to fetch `enablementArticle`
2. Revert `/app/enablement-hub/EnablementHubClient.tsx` to use old interface
3. Old `EnablementCard` component should still work with old data
4. Keep both schemas in place during transition period

---

## Next Steps After Migration

1. **Update Article Detail Pages**: Modify `/app/enablement/articles/[slug]/page.tsx` to fetch from `catalogEntry`
2. **Test Thoroughly**: Run through all use cases
3. **Clean Up**: Once verified, archive old `enablementArticle` entries
4. **(Optional) Remove old schema**: After 30 days, remove `enablementArticle` schema if no longer needed
