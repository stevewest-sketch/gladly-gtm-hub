# My Website

A simple, easy-to-update website built with Next.js and Sanity CMS. Edit your content through a web interface - no coding required!

## What's Included

- **Homepage** with a hero section
- **Blog** with posts
- **About** page
- **Contact** page
- Clean, modern design that works on all devices (phones, tablets, computers)
- Easy content editing through Sanity Studio

## Getting Started

### Step 1: Set Up Sanity CMS

1. Go to [sanity.io](https://sanity.io) and create a free account
2. Create a new project
3. Copy your Project ID (you'll find this in your project settings)

### Step 2: Add Your Sanity Credentials

1. Copy `.env.example` to `.env` (or `.env.local`):
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Sanity Project ID:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### Step 3: Run Your Website

1. Install dependencies (first time only):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and go to:
   - **Website**: http://localhost:3000
   - **Content Editor (Sanity Studio)**: http://localhost:3000/studio

### Step 4: Add Your Content

1. Go to http://localhost:3000/studio
2. Sign in with your Sanity account
3. Start adding content:
   - Click "Homepage" to edit your hero section
   - Click "Blog Post" to create blog posts
   - Click "About Page" to add your about content
   - Click "Contact Page" to add contact information

## Editing Content

All content is managed through the Sanity Studio at `/studio`. Here's what you can edit:

### Homepage
- Hero title and subtitle
- Hero image
- Call to action button

### Blog
- Create new posts
- Add images
- Write content
- Set publish dates

### About Page
- Title
- Image
- Rich text content

### Contact Page
- Title and description
- Email
- Phone
- Address

## Deploying to the Internet

### Deploy to Vercel (Recommended)

Vercel is free for personal projects and works perfectly with Next.js.

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository (you'll need to push your code to GitHub first)
4. Add your environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
5. Click "Deploy"

That's it! Your website will be live in a few minutes.

### Important: Add Your Website URL to Sanity

After deploying, you need to add your website URL to Sanity's CORS settings:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" settings
4. Add your Vercel URL to "CORS origins" (e.g., `https://your-site.vercel.app`)

## Project Structure

```
my-website/
├── app/                    # All your pages
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── studio/            # Sanity Studio (content editor)
├── sanity/
│   └── schemas/           # Content structure definitions
├── lib/
│   └── sanity.ts          # Sanity configuration
└── components/            # Reusable components (empty for now)
```

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Check code quality

## Customizing Design

The website uses Tailwind CSS for styling. Colors, spacing, and layout can be customized in the component files in the `app/` folder.

## Need Help?

- **Sanity Documentation**: https://www.sanity.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Documentation**: https://vercel.com/docs

## Tips

- Always edit content through the Sanity Studio at `/studio`
- Your changes in Sanity will appear on the website after refreshing
- Back up your content regularly through Sanity's export feature
- Keep your `.env.local` file secret - never share it or commit it to GitHub

Enjoy your new website! 🎉
