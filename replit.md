# AUTOCREA V2.0

## Overview

AUTOCREA is an autonomous full-stack development platform powered by JoxCoder (a proprietary LLM model). The application enables users to generate complete applications from natural language descriptions, with real-time preview and multi-role AI agents (Architect, Developer, DevOps, Tester, Security Auditor). The platform operates on a freemium model with a token-based system, offering 100 free tokens on signup and paid subscription plans via Stripe.

**Core Value Proposition:**
- 100% autonomous app generation from idea to deployment
- Proprietary JoxCoder model (no external API dependencies required)
- Optional user-provided API keys for GPT-4, Claude, etc.
- Real-time code preview and generation steps visualization
- Automated Git operations (commits, branches, deployments)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** Next.js 14 with App Router
- **TypeScript** for type safety across the application
- **React 18** with client-side interactivity for real-time updates
- **Tailwind CSS** for utility-first styling with custom gradient themes
- **Dark mode design system** with slate color palette and cyan/blue accent colors

**Key Design Patterns:**
- Client-side state management using React hooks (useState, useEffect, useRef)
- Real-time polling mechanism for generation status updates
- Component-based architecture separating concerns (CodePreview, GenerationSteps)
- Progressive enhancement with loading states and optimistic UI updates

**Routing Structure:**
- Public routes: `/` (landing), `/pricing`, `/about`
- Protected routes: `/dashboard/*`, `/chat` (authentication required)
- Auth routes: `/login`, `/signup` (Clerk integration)

### Backend Architecture

**API Layer:** FastAPI (Python-based REST API)
- Handles JoxCoder model integration and inference
- Manages code generation pipeline and multi-role agent orchestration
- Processes generation requests and streams responses

**Database Solution:** Convex (real-time database)
- **Rationale:** Chosen for built-in real-time subscriptions, eliminating need for custom WebSocket infrastructure
- Stores user data, project metadata, generation history, and token balances
- Provides reactive queries that auto-update UI on data changes

**Data Models:**
- **Users:** Clerk ID, token balance, subscription status, API key storage (optional)
- **Projects:** Name, description, status, owner reference, Git metadata
- **Generations:** Steps log, code outputs, timestamps, status tracking

**Why Convex over traditional databases:**
- Real-time reactivity out-of-the-box (critical for live generation updates)
- Serverless deployment model aligns with project scalability needs
- Built-in TypeScript client with type safety
- Eliminates need for separate WebSocket or polling infrastructure

### Authentication & Authorization

**Provider:** Clerk
- Handles user registration, login, session management
- JWT-based authentication with middleware protection
- Social auth support (GitHub, Google) for developer audience

**Middleware Configuration:**
- Public routes whitelist for marketing pages and webhooks
- API route protection with token validation
- Automatic redirect to login for protected resources

### Payment Processing

**Provider:** Stripe
- Subscription-based billing (monthly/annual plans)
- Token purchase system for pay-as-you-go users
- Webhook handling for subscription events and payment confirmations
- Free tier: 100 tokens on signup (no credit card required)

### AI/ML Core

**Primary Model:** JoxCoder (Proprietary LLM)
- Custom-trained model for code generation
- No external API dependencies (fully self-hosted capability)
- Multi-role agent system: Architect → Developer → DevOps → Tester → Security

**Optional External APIs:**
- User can provide their own API keys for GPT-4, Claude, Gemini
- Fallback/enhancement layer for specific use cases
- Stored securely in user preferences, never shared

## External Dependencies

### Core Services

**Clerk (Authentication)**
- User management and session handling
- Social OAuth providers integration
- Webhook endpoints for user lifecycle events

**Convex (Database & Real-time)**
- Primary data store for all application data
- Real-time subscriptions for live UI updates
- Serverless functions for backend logic
- API endpoints: User queries, project mutations, generation tracking

**Stripe (Payments)**
- Subscription management (tiered plans)
- Token purchases and balance tracking
- Webhook integration for payment events
- Customer portal for subscription management

### Development Tools

**Styling & UI:**
- Tailwind CSS v3.4 - Utility-first CSS framework
- Autoprefixer & PostCSS - CSS processing pipeline
- Lucide React - Icon library (consistent design system)

**Build & Development:**
- Vite 7.1 - Fast development server and build tool
- Next.js 14.2 - React framework with App Router
- TypeScript 5.9 - Static type checking

### Optional Integrations

**LLM APIs (User-Configured):**
- OpenAI GPT-4 (user provides API key)
- Anthropic Claude (user provides API key)
- Google Gemini (user provides API key)

**Git & Deployment:**
- GitHub API (for repository creation and commits)
- Vercel/Railway (deployment targets)
- Automated CI/CD pipeline integration

### Infrastructure Assumptions

**Hosting:** Designed for serverless deployment (Vercel, Railway, or similar)
**JoxCoder Deployment:** Requires separate model hosting infrastructure (GPU-enabled servers)
**Database:** Convex cloud-hosted (no self-managed database required)
**File Storage:** May require S3/Cloudflare R2 for generated project artifacts (to be added)