# Sanity CMS Setup Guide

This guide will walk you through setting up Sanity CMS for the blog functionality.

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io) and sign up/login
2. Click "Create new project"
3. Choose a project name (e.g., "Wendy Travel Blog")
4. Choose a dataset name (default: "production")
5. Click "Create project"

## Step 2: Install Sanity CLI and Initialize Schema

1. Install Sanity CLI globally (if not already installed):
   ```bash
   npm install -g @sanity/cli
   ```

2. In your project directory, initialize Sanity:
   ```bash
   cd "/Users/cazkotsen/Wendy Website"
   sanity init --env
   ```
   
   When prompted:
   - Select "Create new project" or "Use existing project"
   - Choose your project
   - Select "Blog (schema)" or "Clean project with no predefined schemas"
   - Choose the dataset (usually "production")

3. This will create a `sanity` folder with configuration files.

## Step 3: Add the Blog Post Schema

The schema file is already created at `sanity/schema.ts`. You need to:

1. In your `sanity` folder, create or update `sanity.config.ts`:
   ```typescript
   import { defineConfig } from 'sanity'
   import { deskTool } from 'sanity/desk'
   import { schemaTypes } from './schema'

   export default defineConfig({
     name: 'default',
     title: 'Wendy Travel Blog',
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
     plugins: [deskTool()],
     schema: {
       types: schemaTypes,
     },
   })
   ```

2. Create `sanity/schema/index.ts`:
   ```typescript
   import { postSchema } from './post'

   export const schemaTypes = [postSchema]
   ```

3. Move `sanity/schema.ts` to `sanity/schema/post.ts`

## Step 4: Get API Credentials

1. In your Sanity project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project ID** (e.g., `abc123xyz`)
   - **Dataset** (usually `production`)
   - **API Token** (create a new token with "Editor" permissions)

## Step 5: Add Environment Variables

### Local Development (.env.local)

Add these to your `.env.local` file:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the same three variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (optional, defaults to "production")
   - `SANITY_API_TOKEN`

## Step 6: Install Dependencies

Run in your project directory:
```bash
npm install
```

This will install:
- `next-sanity` - Next.js integration for Sanity
- `groq` - Query language for Sanity
- `@portabletext/react` - Render Sanity rich text

## Step 7: Start Sanity Studio (Optional)

To edit content locally, you can run Sanity Studio:

```bash
cd sanity
sanity dev
```

This will start the Sanity Studio at `http://localhost:3333` where you can:
- Create and edit blog posts
- Upload images
- Manage content

## Step 8: Create Your First Blog Post

1. Go to your Sanity Studio (either locally or at `https://your-project.sanity.studio`)
2. Click "Create new" → "Blog Post"
3. Fill in:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated from title (or customize)
   - **Author**: Defaults to "Wendy" (or change)
   - **Published At**: Set to current date/time
   - **Excerpt**: Short description (appears in blog listing)
   - **Main Image**: Upload a featured image
   - **Categories**: Select one or more categories
   - **Body**: Write your blog post content (supports rich text and images)
4. Click "Publish"

## Step 9: View Your Blog

1. Visit `/blog` on your website to see the blog listing
2. Click on any post to view the full article at `/blog/[slug]`

## Troubleshooting

### Blog page shows "No blog posts yet"
- Check that environment variables are set correctly
- Verify your Sanity project ID and dataset name
- Make sure you've published at least one blog post in Sanity Studio

### Images not loading
- Ensure `SANITY_API_TOKEN` has proper permissions
- Check that images are uploaded and published in Sanity

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check that environment variables are set in Vercel

## Next Steps

- Customize the blog post schema in `sanity/schema/post.ts` if needed
- Add more content types (e.g., destinations, travel tips)
- Style the blog pages to match your brand
- Set up Sanity webhooks for automatic rebuilds on content updates
