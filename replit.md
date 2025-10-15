# AUTOCREA V2.0

## Overview

AUTOCREA V2.0 is a complete autonomous full-stack development platform powered by JoxCoder (proprietary LLM model). The application enables users to generate complete applications from natural language descriptions, with real-time preview and multi-role AI agents.

**Current Status:** ✅ Frontend Complete (Demo Mode)

**Core Value Proposition:**
- 100% autonomous app generation from idea to deployment
- Proprietary JoxCoder model (no external API dependencies required)
- Optional user-provided API keys for GPT-4, Claude, etc.
- Real-time code preview and generation steps visualization
- Automated Git operations (commits, branches, deployments)

## Recent Changes (October 15, 2025)

### Completed ✅
1. **Landing Page**
   - Beautiful hero section with gradient design
   - Features showcase (6 key features)
   - Pricing section (Free Trial, Basic $29, Pro $99)
   - Fully responsive design
   - Framer Motion animations

2. **Route Structure**
   - Public routes: `/` (landing)
   - Auth routes: `/login`, `/register` (demo mode - Clerk integration pending)
   - Dashboard routes: `/chat`, `/projects`, `/settings`

3. **Dashboard**
   - Sidebar navigation
   - Token balance display
   - User profile (demo mode)
   - Responsive layout

4. **Chat Interface**
   - Project name and description inputs
   - Quick example templates
   - Real-time preview panel
   - Generation simulation (demo)
   - Token cost estimation

5. **UI Components**
   - Custom Button component with variants
   - Card components (shadcn/ui style)
   - Consistent dark theme with cyan/blue accents
   - Tailwind CSS integration

6. **Settings & Projects Pages**
   - Settings page with API key management UI
   - Projects page with empty state
   - Subscription management UI

### Pending Integrations 🔄
1. **Clerk Authentication** - Requires valid API keys in `.env.local`
2. **Convex Database** - Schema defined, needs deployment setup
3. **Stripe Payments** - Integration pending
4. **FastAPI Backend** - Code generation service (to be built)
5. **JoxCoder Integration** - Primary AI model connection

## User Preferences

- **Communication Style:** Simple, everyday language
- **Design:** Dark theme, gradient accents (cyan/blue)
- **Framework:** Next.js 14 with App Router

## System Architecture

### Frontend Architecture

**Framework:** Next.js 14 with App Router
- **TypeScript** for type safety
- **React 18** for UI rendering
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

**Route Structure:**
```
app/
├── (auth)/
│   ├── login/          # Login page (demo mode)
│   └── register/       # Register page (demo mode)
├── (dashboard)/
│   ├── layout.tsx      # Dashboard layout with sidebar
│   ├── chat/           # Main chat interface
│   ├── projects/       # Project management
│   └── settings/       # Settings & API keys
├── layout.tsx          # Root layout
└── page.tsx            # Landing page
```

**Key Design Patterns:**
- Client-side components with 'use client' directive
- Server components for static content
- Route groups for layout organization
- Shared UI components in `/components/ui/`

### Backend Architecture (To Be Built)

**API Layer:** FastAPI (Python)
- JoxCoder model integration
- Code generation pipeline
- Multi-role agent orchestration

**Database:** Convex (real-time)
- User management
- Project metadata
- Token balances
- Generation history

**Planned Data Models:**
- **Users:** Clerk ID, token balance, subscription status
- **Projects:** Name, description, status, generated code
- **Generations:** Steps log, tokens used, model info

### Authentication & Authorization (Pending Setup)

**Provider:** Clerk
- Install status: ✅ Package installed
- Configuration: ⚠️ Needs API keys
- Middleware: Created but disabled (missing keys)

**To Enable:**
1. Get Clerk API keys from https://clerk.dev
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   ```
3. Rename `middleware.ts.bak` to `middleware.ts`
4. Update auth pages to use Clerk components

### Payment Processing (Planned)

**Provider:** Stripe
- Subscription plans: Free Trial, Basic ($29), Pro ($99)
- Token purchase system
- Webhook handling for events

### AI/ML Core

**Primary Model:** JoxCoder (Proprietary)
- Hugging Face Inference API
- No external API dependencies
- Multi-role agent system

**Optional External APIs:**
- User-provided keys for GPT-4, Claude, Gemini
- Stored securely in user preferences

## Tech Stack

**Frontend:**
- Next.js 14.2.33
- React 18.3.1
- TypeScript 5.9.3
- Tailwind CSS 3.4.0
- Framer Motion (latest)
- Lucide React (latest)
- @clerk/nextjs (latest)

**Build Tools:**
- Vite (not used, Next.js has built-in bundler)
- PostCSS for Tailwind
- ESLint for linting

## Environment Setup

**Required Environment Variables:**
```bash
# JoxCoder (Primary - Add when ready)
JOXCODER_API_URL=https://api-inference.huggingface.co/models/...
JOXCODER_API_KEY=hf_...

# Clerk (Required for auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Convex (Required for database)
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
CONVEX_DEPLOY_KEY=prod:...

# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional External APIs
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

## Development Workflow

**Running Locally:**
```bash
npm run dev          # Runs on port 5000
npm run build        # Production build
npm run start        # Production server
```

**Deployment:**
- Target: Vercel (autoscale)
- Build command: `npm run build`
- Start command: `npm run start`
- Port: 5000 (configured in package.json)

## Next Steps

1. **Get API Keys:**
   - Sign up for Clerk → Add auth keys
   - Set up Convex → Add database URL
   - Configure Stripe → Add payment keys
   - Get JoxCoder access → Add model API key

2. **Backend Development:**
   - Create FastAPI service
   - Implement JoxCoder client
   - Build multi-role agent system
   - Set up code generation pipeline

3. **Database Setup:**
   - Deploy Convex schema
   - Create mutation/query functions
   - Implement real-time subscriptions

4. **Integration:**
   - Connect frontend to backend API
   - Implement actual code generation
   - Add real-time preview with Monaco Editor
   - Set up Git automation

5. **Testing & Deployment:**
   - End-to-end testing
   - Performance optimization
   - Deploy to production
   - Monitor and iterate

## Known Issues

1. **Clerk Not Active:** Demo mode enabled - need to add API keys
2. **LSP Warnings:** Type imports for UI components (non-blocking)
3. **Mock Data:** Chat interface uses simulated generation (backend pending)

## File Structure

```
autocrea-v2/
├── app/                     # Next.js 14 app directory
│   ├── (auth)/             # Auth routes (login, register)
│   ├── (dashboard)/        # Protected dashboard routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── chat/              # Chat components (to be added)
│   └── landing/           # Landing components (to be added)
├── lib/
│   └── utils.ts           # Utility functions
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── .env.local             # Local env (gitignored)
├── .gitignore             # Git ignore rules
├── middleware.ts.bak      # Clerk middleware (disabled)
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
├── postcss.config.js      # PostCSS config
├── README.md              # Project documentation
├── replit.md              # This file
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

**Last Updated:** October 15, 2025
**Status:** Frontend Complete, Backend Pending
**Next Milestone:** API Integration
