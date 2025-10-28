# Wendy's Travel Agency Website

A modern travel agency website built with Next.js 14, featuring custom trip planning, cruise expertise, and concierge support.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **Database & Auth**: Supabase (Postgres + RLS)
- **CMS**: Sanity
- **Email**: Resend
- **Hosting**: Vercel
- **Analytics**: Google Analytics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Sanity account
- Resend account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables by creating a `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Calendly (optional)
NEXT_PUBLIC_CALENDLY_URL=your_calendly_url

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

3. Set up Supabase database:
- Create a new Supabase project
- Run the SQL schema provided in `/supabase/schema.sql`
- Enable RLS policies

4. Set up Sanity CMS:
- Create a new Sanity project
- Import the schema from `/sanity/schema.ts`
- Configure content model

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (pages)/           # Page routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── home/             # Home page components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client
│   ├── sanity/           # Sanity client
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
└── public/                # Static assets
```

## Features

- **Home Page**: Hero section, value propositions, destination highlights, testimonials, and lead form
- **Meet Wendy**: Bio, credentials, and scheduling
- **Custom Trip Planning**: Inquiry form with file upload
- **Reviews**: Display and submit reviews with admin approval
- **Blog**: Sanity CMS-driven blog with dynamic routing
- **Contact**: Full contact form with Calendly integration
- **Admin Dashboard**: Review management and lead tracking

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically handle:
- SSL certificates
- Domain management
- Optimized builds
- Edge network distribution

### Domain Setup

1. Register domain (Namecheap/Cloudflare)
2. Point DNS records to Vercel
3. Configure SSL in Vercel dashboard

## License

This project is private and proprietary.
