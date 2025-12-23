# Sanity CMS Quick Start

## 1. Install Dependencies

```bash
npm install
```

## 2. Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io) and create an account/login
2. Click **"Create new project"**
3. Name it (e.g., "Wendy Travel Blog")
4. Choose dataset: **"production"** (or keep default)
5. Click **"Create project"**

## 3. Get Your Credentials

In your Sanity project dashboard:
1. Go to **Settings** → **API**
2. Copy:
   - **Project ID** (looks like `abc123xyz`)
   - **Dataset** (usually `production`)
3. Go to **API** → **Tokens** → **Add API token**
   - Name: "Website Token"
   - Permissions: **Editor**
   - Copy the token (you won't see it again!)

## 4. Add Environment Variables

### Local (.env.local)
Add to your `.env.local` file:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

### Vercel
1. Go to Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Add all three variables (same values as above)
3. **Redeploy** your site

## 5. Create Your First Blog Post

### Option A: Use Sanity Studio Online
1. Go to `https://your-project-id.sanity.studio`
2. Sign in with your Sanity account
3. Click **"Create new"** → **"Blog Post"**
4. Fill in the form and click **"Publish"**

### Option B: Run Studio Locally (Optional)
```bash
npx sanity dev
```
Then visit `http://localhost:3333`

## 6. View Your Blog

Visit `/blog` on your website to see your posts!

## That's It! 🎉

Your blog is now connected to Sanity CMS. You can:
- Create/edit posts in Sanity Studio
- Posts automatically appear on your website
- Images are hosted by Sanity
- Rich text editing with formatting

## Troubleshooting

**"No blog posts yet"**
- Check environment variables are set correctly
- Make sure you've published at least one post
- Verify Project ID matches in both places

**Build errors**
- Run `npm install` to ensure all packages are installed
- Check that `SANITY_API_TOKEN` has Editor permissions
