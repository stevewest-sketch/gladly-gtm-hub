# Quick Setup Guide

## Before You Start Your Website

You need to set up Sanity CMS first. Follow these steps:

### 1. Create a Sanity Account and Project

1. Go to https://sanity.io and create a free account
2. Click "Create New Project"
3. Give it a name (e.g., "My Website")
4. Choose "Production" dataset
5. Copy your **Project ID** - you'll need this!

### 2. Configure Your Environment Variables

1. Create a `.env.local` file in this folder:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and paste your Project ID:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### 3. Start Your Website

```bash
npm run dev
```

Open these URLs in your browser:
- Website: http://localhost:3000
- Content Editor: http://localhost:3000/studio

### 4. Add Content

1. Go to http://localhost:3000/studio
2. Sign in with your Sanity account
3. Start adding your content!

## Troubleshooting

**Problem**: "Project ID not found" error
- **Solution**: Make sure you created the `.env.local` file and added your Project ID

**Problem**: Can't access Sanity Studio
- **Solution**: Make sure you're signed in to Sanity and your project is active

**Problem**: Changes not showing on website
- **Solution**: Refresh your browser page

## Next Steps

Once everything works locally:
1. Push your code to GitHub
2. Deploy to Vercel (see README.md for instructions)
3. Add your Vercel URL to Sanity CORS settings

Need more help? Check the main README.md file!
