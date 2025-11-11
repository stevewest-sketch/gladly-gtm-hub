# 🚀 Quick Start - Get Your Website Running in 5 Minutes!

## What You Need to Do First

Your website is ready, but you need to connect it to Sanity CMS (a free content management system) so you can edit your content.

---

## Step 1: Create a Free Sanity Account (2 minutes)

1. Go to **https://sanity.io**
2. Click "Get started for free"
3. Sign up with Google, GitHub, or email
4. Click "Create new project"
5. Name your project (e.g., "My Website")
6. Choose a region closest to you
7. Select "Production" dataset
8. **IMPORTANT**: Copy your **Project ID** - it looks like `abc12xyz` or similar

---

## Step 2: Connect Sanity to Your Website (1 minute)

1. Open the file `.env.local` in this folder
2. Replace `placeholder` with your Project ID:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc12xyz
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Save the file

---

## Step 3: Start Your Website (1 minute)

Open your terminal in this folder and run:

```bash
npm run dev
```

Wait a few seconds, then open your browser to:

- **Your Website**: http://localhost:3000
- **Content Editor**: http://localhost:3000/studio

---

## Step 4: Add Your Content (1 minute)

1. Go to **http://localhost:3000/studio**
2. Sign in with your Sanity account
3. Click on any content type (Homepage, Blog Post, About, Contact)
4. Add your content
5. Click **Publish**
6. Refresh your website to see the changes!

---

## 🎉 You're Done!

Your website is now running. Here's what you can do:

### Edit Content
- Go to `/studio` to edit everything
- No coding needed!

### View Your Website
- Homepage: http://localhost:3000
- Blog: http://localhost:3000/blog
- About: http://localhost:3000/about
- Contact: http://localhost:3000/contact

### Deploy to the Internet
When you're ready, follow the instructions in `README.md` to deploy to Vercel for free!

---

## ❓ Having Issues?

**Can't access /studio?**
→ Make sure you replaced `placeholder` with your real Sanity Project ID in `.env.local`

**Changes not showing?**
→ Refresh your browser after publishing in Sanity Studio

**Need more help?**
→ Check `SETUP.md` or `README.md` for detailed instructions

---

Happy website building! 🎨
