# AUTOCREA V2.0 🚀

The most powerful autonomous development platform powered by JoxCoder - our proprietary AI model.

![AUTOCREA V2.0](https://img.shields.io/badge/Version-2.0-blue) ![Status](https://img.shields.io/badge/Status-Ready%20for%20JoxCoder-green) ![License](https://img.shields.io/badge/License-Proprietary-red)

## 🌟 Overview

AUTOCREA V2.0 is an autonomous full-stack development agent that creates complete applications from natural language descriptions. Built with Next.js 14, it features:

- ✅ **100% Autonomous Development** - From idea to deployed app
- ✅ **JoxCoder AI Model** - Our proprietary LLM trained specifically for code generation
- ✅ **Multi-Role Agents** - Architect, Backend Dev, Frontend Dev, DevOps, Security Auditor
- ✅ **Real-time Preview** - Watch your app being built step by step with Monaco Editor
- ✅ **Free Trial** - 100 tokens free on signup
- ✅ **Optional External APIs** - Connect GPT-4, Claude, or Gemini if desired

## 🎯 Features

### Frontend (Complete ✅)
- **Beautiful Landing Page** with pricing and features
- **Enhanced Chat Interface** with Monaco Editor for code preview
- **Generation Visualization** showing all 5 AI agents working
- **Project Management** with history and status tracking
- **Settings Dashboard** for API keys and subscriptions
- **Real-time Progress** tracking with tokens and elapsed time

### Backend Infrastructure (Ready ✅)
- **Convex Database** with complete schema (6 tables)
- **JoxCoder Client** with multi-agent architecture
- **API Routes** ready for integration
- **State Management** with Zustand
- **Token Tracking** and usage analytics

### Multi-Agent System
1. **🧠 Architect** - System design and technology selection
2. **⚙️ Backend** - API and database implementation
3. **🎨 Frontend** - UI/UX development
4. **🚀 DevOps** - Deployment and infrastructure
5. **🛡️ Security** - Code auditing and best practices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd autocrea-v2

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will run on `http://localhost:5000`

### Environment Variables

Create a `.env.local` file:

```bash
# JoxCoder (Primary AI Model)
JOXCODER_API_URL=https://api-inference.huggingface.co/models/your-org/joxcoder
JOXCODER_API_KEY=hf_your_key

# Clerk Authentication (Optional for now)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Convex Database (Optional for now)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=prod:...

# Stripe Payments (Optional for now)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📁 Project Structure

```
autocrea-v2/
├── app/                        # Next.js 14 app directory
│   ├── (auth)/                # Authentication pages
│   ├── (dashboard)/           # Main app (Chat, Projects, Settings)
│   ├── api/                   # API routes
│   └── page.tsx               # Landing page
├── components/
│   ├── ui/                    # UI components (Button, Card, Progress)
│   ├── chat/                  # Code Editor (Monaco)
│   └── generation/            # Generation Steps & Progress
├── convex/                     # Convex database schema
│   ├── schema.ts
│   ├── users.ts
│   ├── projects.ts
│   └── generations.ts
├── lib/
│   ├── api/joxcoder-client.ts # JoxCoder integration
│   └── stores/chat-store.ts   # Zustand state management
└── public/                     # Static assets
```

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Monaco Editor
- Zustand
- shadcn/ui + Radix UI

**Backend:**
- Convex (Database)
- Next.js API Routes
- JoxCoder (AI Model)

**Infrastructure:**
- Clerk (Auth)
- Stripe (Payments)
- Vercel (Deployment)

## 📖 How to Use

1. **Describe Your App**
   - Enter project name
   - Write detailed description
   - Or use quick templates

2. **Watch It Build**
   - See 5 AI agents working
   - Track progress in real-time
   - Monitor token usage

3. **Get Your Code**
   - View generated code in Monaco Editor
   - Copy or download
   - Deploy with one click (coming soon)

## 🔌 Integrations

### Current Status
- ✅ **Frontend**: Complete and functional
- ✅ **Database Schema**: Ready for deployment
- ✅ **API Structure**: Prepared for JoxCoder
- ✅ **State Management**: Implemented
- 🔄 **JoxCoder Model**: Training in progress
- ⏳ **Clerk Auth**: Awaiting API keys
- ⏳ **Convex DB**: Awaiting deployment
- ⏳ **Stripe Payments**: Pending setup

### Next Steps
1. **Add JoxCoder credentials** when model training completes
2. **Deploy Convex schema** and connect database
3. **Configure Clerk** for real authentication
4. **Set up Stripe** for payment processing

## 🎨 Screenshots

### Landing Page
Beautiful gradient design with features and pricing

### Chat Interface
Real-time generation with Monaco Editor code preview

### Projects Dashboard
Manage all your generated applications

### Settings
Configure API keys and manage subscription

## 🔐 Security

- Encrypted API key storage
- Secure token management
- Clerk authentication integration
- HTTPS-only in production

## 💳 Pricing

- **Free Trial**: 100 tokens included
- **Basic Plan**: $29/month - 1,000 tokens
- **Pro Plan**: $99/month - 5,000 tokens

## 🤝 Contributing

This is a proprietary project. For inquiries, please contact the AUTOCREA team.

## 📝 License

© 2025 AUTOCREA V2.0 - All Rights Reserved

## 📞 Support

For support or questions:
- 📧 Email: support@autocrea.com
- 📚 Documentation: See `replit.md` for technical details
- 💬 Community: Coming soon

## 🗺️ Roadmap

- [x] Frontend development
- [x] Database schema design
- [x] API route structure
- [x] Monaco Editor integration
- [x] Multi-agent visualization
- [x] State management
- [ ] JoxCoder model integration
- [ ] Convex deployment
- [ ] Clerk authentication
- [ ] Stripe payment processing
- [ ] Git integration
- [ ] One-click deployment
- [ ] Mobile app

## 🙏 Acknowledgments

Built with ❤️ by the AUTOCREA Team

Powered by:
- JoxCoder - Our proprietary AI model
- Next.js - The React Framework
- Convex - Real-time database
- Clerk - User authentication
- Vercel - Deployment platform

---

**Ready to build something amazing? Start with AUTOCREA V2.0!** 🚀
