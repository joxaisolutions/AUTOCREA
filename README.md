# AUTOCREA V2.0 🚀

The most powerful autonomous development platform powered by **JoxCoder Hybrid** - our proprietary AI system.

![AUTOCREA V2.0](https://img.shields.io/badge/Version-2.0-blue) ![JoxCoder](https://img.shields.io/badge/JoxCoder-Hybrid%20System-purple) ![Status](https://img.shields.io/badge/Status-Ready%20for%20Integration-green) ![License](https://img.shields.io/badge/License-Proprietary-red)

## 🌟 Overview

AUTOCREA V2.0 is an autonomous full-stack development agent that creates complete applications from natural language descriptions. Built with Next.js 14 and powered by the **JoxCoder V2.0 Hybrid System**.

### 🔥 JoxCoder Hybrid System

**Two specialized models working together:**

- 🏗️ **DeepSeek-Coder-33B** - Expert in Architecture, Blockchain, DevOps, Security
- 💻 **CodeLlama-34B** - Expert in Frontend, Backend, Python/JS, Debugging
- 🎯 **Smart Router** - Automatically selects the best model for each task

### ✨ Key Features

- ✅ **100% Autonomous Development** - From idea to deployed app
- ✅ **Hybrid AI System** - DeepSeek-33B + CodeLlama-34B with intelligent routing
- ✅ **Multi-Role Agents** - 5 specialized agents (Architect, Backend, Frontend, DevOps, Security)
- ✅ **Real-time Preview** - Watch your app being built with Monaco Editor
- ✅ **Smart Model Selection** - Router automatically chooses the best model
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

### Multi-Agent System with Hybrid Models
1. **🧠 Architect** (DeepSeek-33B) - System design and technology selection
2. **⚙️ Backend** (CodeLlama-34B) - API and database implementation
3. **🎨 Frontend** (CodeLlama-34B) - UI/UX development
4. **🚀 DevOps** (DeepSeek-33B) - Deployment and infrastructure
5. **🛡️ Security** (DeepSeek-33B) - Code auditing and best practices

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

Create a `.env.local` file (see `.env.example` for complete list):

**OPTION 1: Relevance AI (Recommended - 2 min setup)**
```bash
# Your custom Relevance AI agent
RELEVANCE_AI_REGION=bcbe5a
RELEVANCE_AI_PROJECT_ID=72d29230-c441-4e89-81c2-1342f3968ad9
RELEVANCE_AI_API_KEY=your_api_key_here
RELEVANCE_AI_AGENT_ID=ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7
```

**OPTION 2: JoxCoder V2.0 Hybrid (Advanced - requires training)**
```bash
# DeepSeek-Coder-33B (Architecture, Blockchain, DevOps, Security)
JOXCODER_DEEPSEEK_API_URL=https://api-inference.huggingface.co/models/your-username/joxcoder-deepseek-33b
JOXCODER_DEEPSEEK_API_KEY=hf_your_key_here

# CodeLlama-34B (Frontend, Backend, Python/JS, Debugging)
JOXCODER_CODELLAMA_API_URL=https://api-inference.huggingface.co/models/your-username/joxcoder-codellama-34b
JOXCODER_CODELLAMA_API_KEY=hf_your_key_here
```

**Optional Services:**
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=prod:...
```

📖 **Setup Guides:**
- **Relevance AI**: See `RELEVANCE_AI_SETUP.md` (Quick start - 2 minutes)
- **JoxCoder Hybrid**: See `JOXCODER_INTEGRATION.md` (Advanced - ~12 hours training)

## 📁 Project Structure

```
autocrea-v2/
├── app/                        # Next.js 14 app directory
│   ├── (auth)/                # Authentication pages
│   ├── (dashboard)/           # Main app (Chat, Projects, Settings)
│   ├── api/                   # API routes
│   └── page.tsx               # Landing page
├── src/                        # ⭐ NEW: Clean Architecture
│   ├── config/                # Configuración global
│   │   ├── plans.ts           # Sistema de planes
│   │   ├── site.ts            # Configuración del sitio
│   │   └── constants.ts       # Constantes
│   ├── types/                 # TypeScript types
│   │   ├── joxcoder.ts
│   │   ├── user.ts
│   │   └── project.ts
│   ├── lib/
│   │   ├── errors/            # Error handling unificado
│   │   ├── hooks/             # Custom React hooks
│   │   ├── stores/            # Zustand stores
│   │   └── utils/             # Utilidades (token counter, etc.)
│   └── components/
│       └── shared/            # Componentes compartidos (UI)
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
- JoxCoder Hybrid (DeepSeek-33B + CodeLlama-34B)
- Smart Router for model selection

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

| Plan | Precio | Tokens/mes | Proyectos | Popular |
|------|--------|-----------|-----------|---------|
| 🎯 Free Trial | $0 | 100 | 1 | - |
| ⭐ Creator | $29 | 10,000 | 5 | ✅ Más Popular |
| 💼 Professional | $79 | 30,000 | 20 | - |
| 🏢 Business | $199 | 100,000 | Ilimitados | - |
| 🌐 Enterprise | Custom | Ilimitados | Ilimitados | - |

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

**Fase 1: Arquitectura ✅ COMPLETADA**
- [x] Frontend development
- [x] Database schema design
- [x] API route structure
- [x] Monaco Editor integration
- [x] Multi-agent visualization
- [x] State management
- [x] Clean Architecture structure (src/)
- [x] Sistema de planes de suscripción
- [x] Error handling unificado
- [x] Token tracking system
- [x] Componentes UI compartidos
- [x] Documentación técnica completa

**Fase 2: Stripe Integration ✅ COMPLETADA**
- [x] Configurar Stripe (API keys en Secrets)
- [x] Implementar checkout flow con metadata
- [x] Webhooks de suscripción (6 eventos)
- [x] Customer portal con búsqueda real
- [x] Página de Pricing completa
- [x] Documentación (STRIPE_SETUP_GUIDE.md)
- [x] Aprobado por arquitecto

**Fase 3: Convex Database ⏳ SIGUIENTE**
- [ ] Deploy schema de Convex
- [ ] Crear queries y mutations
- [ ] Conectar webhooks de Stripe con DB
- [ ] Sincronizar con Admin Portal de JoxAI
- Ver: `CONVEX_SETUP_GUIDE.md`

**Próximas Fases:**
- [ ] JoxCoder AI model integration
- [ ] GitHub OAuth setup con Clerk
- [ ] Repository management features
- [ ] Code generation engine
- [ ] Clerk authentication
- [ ] Sistema de tokens en producción
- [ ] Onboarding & Nurturing emails
- [ ] Analytics & Monitoring
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
