# AUTOCREA V2.0 🚀

The most powerful autonomous development platform powered by JoxCoder - our proprietary AI model.

## Overview

AUTOCREA V2.0 is an autonomous full-stack development agent that creates complete applications from natural language descriptions. Built with Next.js 14, it features:

- ✅ **100% Autonomous Development** - From idea to deployed app
- ✅ **JoxCoder AI Model** - Our proprietary LLM trained specifically for code generation
- ✅ **Multi-Role Agents** - Architect, Backend Dev, Frontend Dev, DevOps, Security Auditor
- ✅ **Real-time Preview** - Watch your app being built step by step
- ✅ **Free Trial** - 100 tokens free on signup
- ✅ **Optional External APIs** - Connect GPT-4, Claude, or Gemini if desired

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **shadcn/ui** components

### Backend (To be added)
- **FastAPI** (Python)
- **Convex** (Database)
- **Clerk** (Authentication)
- **Stripe** (Payments)

### AI/ML
- **JoxCoder** - Primary model (Hugging Face)
- **Optional**: OpenAI, Anthropic, Google Gemini

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm run start
```

The app will run on `http://localhost:5000`

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# JoxCoder (Primary AI Model)
JOXCODER_API_URL=https://api-inference.huggingface.co/models/your-org/joxcoder
JOXCODER_API_KEY=hf_your_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: External AI APIs
OPENAI_API_KEY=sk-... # Optional
ANTHROPIC_API_KEY=sk-ant-... # Optional

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=prod:...

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Project Structure

```
autocrea-v2/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── chat/           # Main chat interface
│   │   ├── projects/       # Project management
│   │   └── settings/       # User settings
│   ├── layout.tsx
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # UI components
│   ├── chat/              # Chat-specific components
│   └── landing/           # Landing page components
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Features

### Landing Page
- Hero section with gradient design
- Feature highlights
- Pricing plans (Free Trial, Basic, Pro)
- Responsive design

### Chat Interface
- Project name and description input
- Quick example templates
- Real-time generation preview
- Token balance display
- Generation steps visualization

### Dashboard
- Sidebar navigation
- Projects management
- Settings and API key configuration
- Token balance tracking

## Roadmap

- [ ] Backend FastAPI integration
- [ ] Convex database setup
- [ ] Clerk authentication (keys needed)
- [ ] Stripe payment integration
- [ ] JoxCoder model integration
- [ ] Code editor with Monaco
- [ ] Git integration
- [ ] Deployment automation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding Integrations

1. **Clerk Authentication**: Add your Clerk API keys to `.env.local`
2. **Convex Database**: Set up Convex project and add deployment URL
3. **Stripe Payments**: Configure Stripe keys and webhook endpoints
4. **JoxCoder**: Add your Hugging Face API key for the JoxCoder model

## Architecture

```
┌─────────────────────────────────────────┐
│         AUTOCREA V2.0 Frontend          │
│           (Next.js 14)                  │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┼──────────┬───────────┐
    │          │          │           │
    ▼          ▼          ▼           ▼
┌────────┐ ┌────────┐ ┌──────┐  ┌─────────┐
│FastAPI │ │ Convex │ │Clerk │  │ Stripe  │
│Backend │ │Database│ │ Auth │  │Payments │
└────┬───┘ └────────┘ └──────┘  └─────────┘
     │
     ▼
┌──────────────────────────────────────┐
│         JoxCoder AI Model            │
│   + Optional External APIs           │
└──────────────────────────────────────┘
```

## Contributing

This is a proprietary project. For questions or support, please contact the AUTOCREA team.

## License

© 2025 AUTOCREA V2.0 - All Rights Reserved

## Support

For support or questions:
- 📧 Email: support@autocrea.com
- 📚 Documentation: Coming soon
- 💬 Community: Discord (link coming soon)

---

Built with ❤️ by the AUTOCREA Team
Powered by JoxCoder - Our proprietary AI model
