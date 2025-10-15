# AUTOCREA V2.0

## Overview

AUTOCREA V2.0 is a complete autonomous full-stack development platform powered by JoxCoder (proprietary LLM model). The application enables users to generate complete applications from natural language descriptions, with real-time preview and multi-role AI agents.

**Current Status:** ✅ Frontend & Infrastructure Complete (Ready for JoxCoder Integration)

**Core Value Proposition:**
- 100% autonomous app generation from idea to deployment
- Proprietary JoxCoder model (no external API dependencies required)
- Optional user-provided API keys for GPT-4, Claude, etc.
- Real-time code preview and generation steps visualization
- Automated Git operations (commits, branches, deployments)

## Recent Changes (October 15, 2025)

### Completed ✅

#### Frontend (Complete)
1. **Landing Page**
   - Beautiful hero section with gradient design
   - Features showcase (6 key features)
   - Pricing section (Free Trial, Basic $29, Pro $99)
   - Fully responsive design with Framer Motion animations

2. **Authentication Pages**
   - Login and Register pages (demo mode)
   - Ready for Clerk integration
   - Clean UI matching dark theme

3. **Dashboard Layout**
   - Sidebar navigation with route indicators
   - Token balance display
   - User profile section
   - Fully responsive layout

4. **Enhanced Chat Interface**
   - Project name and description inputs
   - Quick example templates
   - Real-time generation simulation with multi-agent workflow
   - Monaco Editor integration for code preview
   - Generation progress tracking with elapsed time
   - Token cost estimation and tracking
   - Copy and download generated code

5. **Projects Page**
   - Demo projects grid with status indicators
   - Project cards showing framework, tokens used, creation date
   - "Create New Project" card
   - Quick actions (View Code, External Link)
   - Status badges (Completed, Generating, Failed)

6. **Settings Page**
   - Optional external API keys (OpenAI, Anthropic, Google Gemini)
   - Password visibility toggle for security
   - User profile management (demo mode)
   - Subscription plans display (Free, Basic $29, Pro $99)
   - Token balance and usage tracking

#### Backend Infrastructure (Complete - Ready for Integration)

7. **Convex Database Schema**
   - `users`: User management with token balances and subscriptions
   - `projects`: Project metadata and generated code storage
   - `generations`: Generation tracking with status and steps
   - `generationSteps`: Detailed multi-agent step tracking
   - `apiKeys`: Secure encrypted API key storage
   - `tokenTransactions`: Complete token usage history
   - Comprehensive indexes for efficient querying

8. **Convex Functions**
   - User creation with signup bonus
   - Token balance management
   - Project CRUD operations
   - Generation tracking and status updates
   - Step-by-step generation logging

9. **API Routes**
   - `/api/generate`: Project generation endpoint
   - `/api/joxcoder`: JoxCoder model integration endpoint
   - Ready for production implementation

10. **JoxCoder Client Library**
    - Multi-agent architecture (Architect, Backend, Frontend, DevOps, Security)
    - Streaming support for real-time updates
    - Token usage tracking
    - Context-aware prompt building
    - Error handling and retries

11. **State Management (Zustand)**
    - Global chat state management
    - Generation progress tracking
    - Step-by-step status updates
    - Token counting and estimation
    - Error state handling

12. **UI Components**
    - **CodeEditor**: Monaco Editor with syntax highlighting, copy, download
    - **GenerationSteps**: Visual multi-agent workflow display
    - **GenerationProgress**: Real-time progress with tokens and time tracking
    - **Progress**: Radix UI progress bar with gradient
    - **Button, Card**: Consistent shadcn/ui components

### Pending Integrations 🔄
1. **JoxCoder Model** - API training in progress, infrastructure ready
2. **Clerk Authentication** - Requires API keys in `.env.local`
3. **Convex Database** - Schema ready, needs deployment and connection
4. **Stripe Payments** - Integration pending
5. **FastAPI Backend** - Optional external API integration layer

## User Preferences

- **Communication Style:** Simple, everyday language
- **Design:** Dark theme, gradient accents (cyan/blue)
- **Framework:** Next.js 14 with App Router
- **Language:** Spanish UI throughout

## System Architecture

### Frontend Architecture

**Framework:** Next.js 14 with App Router
- **TypeScript** for type safety
- **React 18** for UI rendering
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Monaco Editor** for code display
- **Zustand** for state management

**Route Structure:**
```
app/
├── (auth)/
│   ├── login/              # Login page (demo mode)
│   └── register/           # Register page (demo mode)
├── (dashboard)/
│   ├── layout.tsx          # Dashboard layout with sidebar
│   ├── chat/               # Enhanced chat with Monaco Editor
│   ├── projects/           # Project management with demo data
│   └── settings/           # Settings with API keys & subscriptions
├── api/
│   ├── generate/           # Generation API endpoint
│   └── joxcoder/           # JoxCoder integration endpoint
├── layout.tsx              # Root layout
└── page.tsx                # Landing page
```

**Component Structure:**
```
components/
├── ui/                     # Base shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── progress.tsx
├── chat/
│   └── code-editor.tsx    # Monaco Editor wrapper
└── generation/
    ├── generation-steps.tsx    # Multi-agent step visualization
    └── generation-progress.tsx # Progress tracking component
```

### Backend Architecture

**Convex Database:**
- Real-time subscriptions ready
- Complete schema with 6 tables
- Optimized indexes for performance
- Secure API key encryption support

**JoxCoder Integration:**
- Multi-agent workflow: 5 specialized AI roles
- Context-aware prompt generation
- Token estimation and tracking
- Streaming response support (ready)

**API Layer:**
- Next.js API routes for serverless functions
- Ready for JoxCoder Hugging Face integration
- Optional external API support (OpenAI, Claude, Gemini)

### State Management

**Zustand Store:**
```typescript
- projectName, projectDescription
- isGenerating, currentStep, totalSteps
- steps: GenerationStep[]
- generatedCode, tokensUsed, estimatedTokens
- error handling
```

### Authentication & Authorization

**Provider:** Clerk
- Install status: ✅ Package installed
- Configuration: ⚠️ Needs API keys
- Middleware: Disabled (awaiting keys)

**To Enable:**
1. Get Clerk API keys from https://clerk.dev
2. Add to `.env.local`
3. Restore from `middleware.ts.bak`
4. Update auth pages to use Clerk components

### Payment Processing

**Provider:** Stripe
- Subscription plans ready: Free Trial, Basic ($29), Pro ($99)
- Token purchase system UI complete
- Webhook handling (pending implementation)

### AI/ML Core

**Primary Model:** JoxCoder (Proprietary)
- Hugging Face Inference API integration ready
- Multi-role agent system implemented
- No external dependencies required

**Multi-Agent Roles:**
1. **Architect**: System design and technology selection
2. **Backend**: API and database implementation
3. **Frontend**: UI/UX development
4. **DevOps**: Deployment and infrastructure
5. **Security**: Code auditing and best practices

**Optional External APIs:**
- User-provided keys for GPT-4, Claude, Gemini
- Secure encrypted storage in Convex
- UI for management in Settings page

## Tech Stack

**Frontend:**
- Next.js 14.2.33
- React 18.3.1
- TypeScript 5.9.3
- Tailwind CSS 3.4.0
- Framer Motion (latest)
- Lucide React (latest)
- @monaco-editor/react (latest)
- @radix-ui/react-progress (latest)
- Zustand (latest)
- @clerk/nextjs (latest)

**Backend:**
- Convex (latest) - Database
- Next.js API Routes - Serverless functions

**Build Tools:**
- PostCSS for Tailwind
- ESLint for linting
- TypeScript compiler

## Environment Setup

**Required Environment Variables:**
```bash
# JoxCoder (Primary - Add when ready)
JOXCODER_API_URL=https://api-inference.huggingface.co/models/your-org/joxcoder
JOXCODER_API_KEY=hf_...

# Clerk (Required for real auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Convex (Required for database)
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
CONVEX_DEPLOY_KEY=prod:...

# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional External APIs (Stored in Convex when user provides)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AI...
```

## Development Workflow

**Running Locally:**
```bash
npm run dev          # Runs on port 5000
npm run build        # Production build
npm run start        # Production server
```

**Convex Development:**
```bash
npx convex dev       # Start Convex development server
npx convex deploy    # Deploy schema to production
```

**Deployment:**
- Target: Vercel (autoscale)
- Build command: `npm run build`
- Start command: `npm run start`
- Port: 5000 (configured in package.json)

## Next Steps (When JoxCoder is Ready)

1. **JoxCoder Integration:**
   - Add Hugging Face API credentials
   - Test multi-agent workflow
   - Implement streaming responses
   - Add error handling and retries

2. **Convex Setup:**
   - Deploy Convex schema
   - Connect to Next.js app
   - Test real-time subscriptions
   - Implement token transactions

3. **Clerk Authentication:**
   - Add API keys
   - Enable middleware
   - Update auth pages
   - Test user flows

4. **Stripe Integration:**
   - Set up Stripe account
   - Configure webhook endpoints
   - Implement payment flows
   - Test subscriptions

5. **Testing & Polish:**
   - End-to-end generation testing
   - Error handling improvements
   - Performance optimization
   - User feedback integration

## File Structure

```
autocrea-v2/
├── app/                        # Next.js 14 app directory
│   ├── (auth)/                # Auth routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/           # Protected routes
│   │   ├── chat/             # Enhanced with Monaco Editor
│   │   ├── projects/         # Project management
│   │   ├── settings/         # Settings & API keys
│   │   └── layout.tsx
│   ├── api/                   # API routes
│   │   ├── generate/
│   │   └── joxcoder/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── progress.tsx
│   ├── chat/
│   │   └── code-editor.tsx   # Monaco Editor integration
│   └── generation/
│       ├── generation-steps.tsx
│       └── generation-progress.tsx
├── convex/                     # Convex database
│   ├── schema.ts              # Database schema
│   ├── users.ts               # User functions
│   ├── projects.ts            # Project functions
│   ├── generations.ts         # Generation functions
│   └── tsconfig.json
├── lib/
│   ├── api/
│   │   └── joxcoder-client.ts # JoxCoder client library
│   ├── stores/
│   │   └── chat-store.ts      # Zustand state management
│   └── utils.ts
├── public/
├── .env.example
├── .env.local                  # Local env (gitignored)
├── .gitignore
├── middleware.ts.bak           # Clerk middleware (disabled)
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── replit.md                   # This file
├── tailwind.config.js
└── tsconfig.json
```

## Known Issues

1. **Clerk Not Active:** Demo mode - need API keys
2. **Convex Not Connected:** Schema ready - needs deployment
3. **JoxCoder Training:** Model in progress - infrastructure ready
4. **LSP Warnings:** Convex type generation pending (non-blocking)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

**Last Updated:** October 15, 2025
**Status:** Infrastructure Complete - Ready for JoxCoder Integration
**Next Milestone:** JoxCoder Model Integration & Convex Deployment
