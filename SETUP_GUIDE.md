# Wendy's Travel Agency - Setup Guide

This guide will help you set up and deploy the Wendy's Travel Agency website.

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Resend account (for emails)
- A Sanity account (for blog CMS, optional)
- A Vercel account (for hosting)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to SQL Editor in Supabase dashboard
3. Run the schema from `supabase/schema.sql`
4. Copy your project URL and anon key from Settings > API
5. Add them to your `.env.local` file

### 3. Set Up Resend

1. Go to [resend.com](https://resend.com) and create an account
2. Get your API key from the dashboard
3. Add it to your `.env.local` file
4. Verify your domain (for production emails)

### 4. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Update all the placeholder values with your actual credentials.

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables in Vercel dashboard
4. Deploy

## Optional: Set Up Sanity CMS

1. Create a Sanity project
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Configure your Sanity schema
4. Add credentials to `.env.local`

## Domain Setup

1. Register a domain (flowerpetal.com or similar)
2. In Vercel, add the domain to your project
3. Update DNS records as instructed by Vercel
4. Configure SPF/DKIM/DMARC for branded email

## Admin Setup

1. Create an admin user through Supabase Auth UI
2. Insert the user record into the `users` table with role='admin'
3. Use this account to access /admin for review management

## Features

- ✅ Home page with hero, value propositions, destinations, testimonials
- ✅ Meet Wendy page with bio and credentials
- ✅ Custom trip planning inquiry form
- ✅ Reviews system with admin approval
- ✅ Contact/Start Planning page
- ✅ Privacy Policy and Terms pages
- ✅ Admin dashboard (basic structure)
- ✅ Responsive design with Tailwind CSS
- ⏳ Blog integration with Sanity (placeholder ready)
- ⏳ Full admin authentication and management

## Next Steps

1. Customize content with Wendy's actual information
2. Add real travel images
3. Set up Sanity for blog content
4. Complete admin dashboard functionality
5. Test all forms and integrations
6. Deploy to production

## Support

For issues or questions, contact the development team.
