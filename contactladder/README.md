# ContactLadder Training Platform

Complete training platform for real estate professionals to master Cloze CRM. Built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- **User Authentication** - Secure signup/login with Supabase Auth
- **Training Catalog** - Browse 23+ training modules organized by category
- **Dynamic Module Rendering** - Markdown-based content with frontmatter metadata
- **Progress Tracking** - Track completion status and scroll progress
- **Personalized Content** - Content customized with user's GCI goals and business metrics
- **Video Integration** - YouTube/Vimeo video embeds
- **User Dashboard** - Progress overview, stats, and recommendations
- **Mobile Responsive** - Optimized for all devices
- **Protected Routes** - Middleware-based authentication

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database & Auth:** Supabase (PostgreSQL + Auth)
- **Styling:** Tailwind CSS v4 + Typography plugin
- **Content:** Markdown with gray-matter frontmatter parsing
- **Language:** TypeScript
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([supabase.com](https://supabase.com))

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Set up Supabase**

- Create a new Supabase project at [supabase.com](https://supabase.com)
- Go to Settings > API to get your project URL and anon key
- Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

- Fill in your Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. **Run database migrations**

In your Supabase project dashboard:
- Go to SQL Editor
- Create a new query
- Copy the contents of `supabase/migrations/001_initial_schema.sql`
- Run the migration

This will create all necessary tables, RLS policies, and triggers.

4. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
contactladder/
├── app/
│   ├── (auth)/              # Authentication routes (/login, /signup)
│   ├── (marketing)/         # Public routes (/)
│   ├── (platform)/          # Protected routes (/dashboard, /training)
│   ├── api/                 # API routes (auth callback)
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/
│   ├── auth/                # Login/Signup forms
│   ├── training/            # Module cards, content, video player
│   └── ui/                  # Reusable UI components
├── content/                 # Markdown training modules
│   ├── essentials/
│   ├── deep-dives/
│   └── mini-guides/
├── lib/
│   ├── supabase/            # Supabase client/server/middleware
│   ├── modules/             # Content loader and parser
│   └── utils/               # Utility functions
├── types/                   # TypeScript types
├── middleware.ts            # Route protection
└── supabase/
    └── migrations/          # Database schema
```

## Database Schema

### Tables

- **profiles** - User profiles (extends auth.users)
- **modules** - Training module metadata
- **module_progress** - User progress tracking
- **video_progress** - Video watch progress
- **user_preferences** - Personalization data

See `supabase/migrations/001_initial_schema.sql` for full schema.

## Adding Training Modules

1. Create a markdown file in the appropriate category folder:
   - `content/essentials/` - Essential modules
   - `content/deep-dives/` - Deep dive modules
   - `content/mini-guides/` - Mini guide modules

2. Add frontmatter with metadata:

```yaml
---
title: "Module Title"
slug: "module-slug"
category: "essentials" # or "deep-dive" or "mini-guide"
orderIndex: 1
estimatedDuration: 30
prerequisites: []
description: "Module description"
videos:
  intro: "youtube:VIDEO_ID"
  demo: "vimeo:VIDEO_ID"
published: true
---

# Your Module Content

Markdown content here with personalization variables:
- [Name] - User's full name
- [GCI Goal] - User's GCI goal
- [Average Sale Price] - User's average sale price
- [Commission Percent] - User's commission percentage
- [Magic Number] - User's magic number
```

3. The module will automatically appear in the training catalog.

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

```bash
npm install -g vercel
vercel
```

2. **Set environment variables in Vercel**

Go to your Vercel project settings and add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

3. **Deploy**

```bash
vercel --prod
```

4. **Configure Supabase**

In your Supabase project:
- Go to Authentication > URL Configuration
- Add your Vercel domain to "Site URL" and "Redirect URLs"

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (server-side only)

## Next Steps

To complete the platform, you'll need to:

1. **Set up Supabase** - Create a project and run the database migrations
2. **Configure environment variables** - Add your Supabase credentials
3. **Convert training modules** - Add the 23 markdown files from `/files` to `/content`
4. **Test locally** - Run the dev server and test all features
5. **Deploy to production** - Deploy to Vercel and configure domain

## License

Proprietary - All rights reserved
