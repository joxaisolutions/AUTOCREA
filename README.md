# AUTOCREA V2.0

The most powerful AI-powered chatbot to build powerful applications autonomously using **JoxCoder** - our proprietary LLM model.

## 🚀 Features

- **100% Autonomous Development**: From idea to full application without manual coding
- **JoxCoder AI Model**: Proprietary code generation model optimized for app development
- **Multi-Role AI Agents**: Architect, Developer, DevOps, Tester, and Security Auditor
- **Real-Time Preview**: Watch your application being built step by step
- **Token-Based System**: 100 free tokens on signup, paid plans available
- **Optional External APIs**: Integrate your own OpenAI, Claude, or Gemini API keys

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React 18** for UI components

### Planned Integrations
- **Convex** - Real-time database
- **Clerk** - Authentication
- **Stripe** - Payment processing
- **FastAPI** - Backend API
- **JoxCoder** - AI code generation

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/joxaisolutions/AUTOCREA.git
cd AUTOCREA
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your API keys and configuration.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📋 Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `JOXCODER_API_KEY` - Your JoxCoder AI model API key
- `NEXT_PUBLIC_CONVEX_URL` - Convex database URL (when implemented)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication (when implemented)
- `STRIPE_SECRET_KEY` - Stripe payment processing (when implemented)

## 🎯 Current Status

**✅ Phase 1 Complete**: Basic UI and chat interface
- Dark theme with gradient design
- Project input form
- Real-time preview panel
- Token balance display
- Quick example prompts

**🚧 Coming Soon**:
- JoxCoder AI integration
- Convex real-time database
- Clerk authentication
- Stripe payment processing
- FastAPI backend
- Code generation pipeline
- Git automation
- One-click deployment

## 📁 Project Structure

```
autocrea-v2/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main chat interface
├── components/               # React components (to be added)
├── lib/                     # Utility functions (to be added)
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

ISC

## 🔗 Links

- [Website](https://autocrea.joxai.com) (coming soon)
- [Documentation](./docs) (coming soon)
- [API Reference](./docs/API.md) (coming soon)

---

**AUTOCREA V2.0** - Powered by JoxCoder • De idea a aplicación en minutos
