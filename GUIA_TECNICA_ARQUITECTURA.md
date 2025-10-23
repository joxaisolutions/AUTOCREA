# 🏗️ Guía Técnica de Arquitectura y Componentes - AUTOCREA V2.0

## Índice
1. [Stack Tecnológico](#stack-tecnológico)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Componentes Principales](#componentes-principales)
5. [Base de Datos (Convex)](#base-de-datos-convex)
6. [Autenticación y Billing (Clerk)](#autenticación-y-billing-clerk)
7. [Integraciones](#integraciones)
8. [Flujos de Datos](#flujos-de-datos)
9. [Deployment](#deployment)
10. [Variables de Entorno](#variables-de-entorno)

---

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.9+
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4
- **Components**: Radix UI + shadcn/ui
- **State Management**: Zustand 5.0
- **Animations**: Framer Motion 12
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Icons**: Lucide React

### Backend
- **Runtime**: Next.js API Routes (Edge + Node.js)
- **Database**: Convex (Real-time, serverless)
- **Authentication**: Clerk v6 (Auth + Billing)
- **File Storage**: Convex Storage
- **Git Integration**: Octokit/REST (GitHub API)

### AI/ML
- **Primary Model**: JoxCoder AI (JoxAI proprietary)
- **Optional APIs**: OpenAI, Anthropic, Google Gemini

### DevOps
- **Package Manager**: npm
- **Version Control**: Git
- **Deployment**: Netlify (frontend), Backend TBD
- **CI/CD**: GitHub Actions (planned)

---

## Arquitectura del Sistema

### Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                      AUTOCREA V2.0                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Frontend   │───▶│  Next.js API │───▶│   JoxCoder   │ │
│  │  (Next.js)   │◀───│    Routes    │◀───│      AI      │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│         │                    │                             │
│         │                    │                             │
│         ▼                    ▼                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │    Clerk     │    │    Convex    │    │GitHub/GitLab │ │
│  │ Auth+Billing │    │   Database   │    │     API      │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Request Típico

1. **User Action** → Component Event
2. **Component** → API Route (`/api/joxcoder/generate`)
3. **API Route** → JoxCoder AI (HTTP POST)
4. **JoxCoder AI** → Código generado
5. **API Route** → Convex (Guardar generación)
6. **API Route** → Response to Frontend
7. **Component** → Update UI + File Explorer

---

## Estructura de Directorios

```
autocrea-v2/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rutas de autenticación
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/              # Rutas protegidas
│   │   ├── chat/                 # Interfaz principal de generación
│   │   ├── projects/             # Gestión de proyectos
│   │   ├── repository/           # GitHub/GitLab
│   │   ├── console/              # Terminal interactiva
│   │   ├── preview/              # Preview de app
│   │   ├── settings/             # Configuración de usuario
│   │   └── layout.tsx            # Dashboard layout (sidebar)
│   ├── (marketing)/              # Rutas públicas
│   │   └── pricing/              # Página de precios
│   ├── api/                      # API Routes
│   │   ├── joxcoder/             # JoxCoder AI endpoints
│   │   ├── oauth/                # GitHub OAuth
│   │   ├── terminal/             # Terminal execution
│   │   └── templates/            # Code templates
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Root layout (Providers)
│   └── page.tsx                  # Landing page
│
├── src/
│   ├── components/               # Componentes React
│   │   ├── features/             # Feature-specific components
│   │   ├── landing/              # Landing page components
│   │   │   ├── footer.tsx
│   │   │   └── pricing-card-simple.tsx
│   │   ├── navigation/           # Navigation components
│   │   │   ├── back-to-home-button.tsx
│   │   │   └── breadcrumbs.tsx
│   │   └── onboarding/           # Onboarding flow
│   │       └── onboarding-modal.tsx
│   │
│   ├── config/                   # Configuración
│   │   ├── constants.ts          # Constantes globales
│   │   ├── plans.ts              # Planes de suscripción
│   │   └── site.ts               # Metadata del sitio
│   │
│   ├── lib/                      # Utilidades y helpers
│   │   ├── convex-client.tsx     # Convex provider
│   │   ├── hooks/                # Custom React hooks
│   │   ├── stores/               # Zustand stores
│   │   │   └── use-app-store.ts
│   │   └── utils/                # Helper functions
│   │       └── token-counter.ts
│   │
│   └── types/                    # TypeScript types
│       ├── index.ts
│       ├── joxcoder.ts
│       ├── project.ts
│       └── user.ts
│
├── convex/                       # Convex backend
│   ├── schema.ts                 # Database schema
│   ├── users.ts                  # User queries/mutations
│   ├── projects.ts               # Project queries/mutations
│   ├── generations.ts            # Generation history
│   ├── tokenUsage.ts             # Token tracking
│   ├── projectFiles.ts           # File management
│   ├── commits.ts                # Git commits log
│   └── tsconfig.json
│
├── components/ui/                # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
│
├── public/                       # Static assets
│   ├── joxai-logo.svg
│   └── autocrea-hero.png
│
├── middleware.ts                 # Clerk middleware (route protection)
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── convex.json                   # Convex config
└── package.json                  # Dependencies
```

---

## Componentes Principales

### 1. Chat Interface (`app/(dashboard)/chat/page.tsx`)

**Responsabilidades:**
- Selector de 12 roles técnicos
- Input de prompt del usuario
- File Explorer (archivos generados)
- Monaco Code Editor
- Token usage tracking
- Feature gating (Clerk Billing)

**Key Functions:**
```typescript
const handleGenerate = async () => {
  // 1. Validar token limits
  if (!canGenerate) {
    alert('Sin tokens disponibles');
    return;
  }

  // 2. Call API
  const response = await fetch('/api/joxcoder/generate', {
    method: 'POST',
    body: JSON.stringify({ role, prompt, projectId }),
  });

  // 3. Update UI
  const { code, tokensUsed } = await response.json();
  addFile(code);
  
  // 4. Save to Convex
  await saveGeneration({ code, tokensUsed });
};
```

**State Management (Zustand):**
```typescript
// src/lib/stores/use-app-store.ts
interface FileStore {
  files: File[];
  selectedFileId: string | null;
  addFile: (file: File) => void;
  selectFile: (id: string) => void;
  updateFile: (id: string, content: string) => void;
}
```

### 2. Projects Page (`app/(dashboard)/projects/page.tsx`)

**Responsabilidades:**
- Lista de proyectos del usuario
- Crear nuevo proyecto
- Ver/editar proyectos existentes
- Archivar/eliminar proyectos

**Convex Integration:**
```typescript
const projects = useQuery(api.projects.getUserProjects, { 
  userId: user._id 
});

const createProject = useMutation(api.projects.create);
```

### 3. Preview App (`app/(dashboard)/preview/page.tsx`)

**Responsabilidades:**
- Preview en 3 modos: Desktop, Tablet, Mobile
- Hot reload
- Responsive toggle
- Share preview URL

**Responsive Modes:**
```typescript
const MODES = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};
```

### 4. Settings Page (`app/(dashboard)/settings/page.tsx`)

**Responsabilidades:**
- Mostrar plan actual (Clerk features)
- Token usage del mes
- Conectar APIs externas (OpenAI, Anthropic)
- Link a Clerk Billing tab

**Feature Gating:**
```typescript
const { has, isLoaded } = useAuth();

const hasTokens10000 = has?.({ feature: 'tokens_10000' });
const hasUnlimitedTokens = has?.({ feature: 'unlimited_tokens' });

if (!isLoaded) return <LoadingSpinner />;
```

### 5. Onboarding Modal (`src/components/onboarding/onboarding-modal.tsx`)

**Responsabilidades:**
- 4 steps interactivos
- Explicar JoxCoder AI
- Tutorial de roles técnicos
- Guardar estado en Convex

**Flow:**
1. Bienvenida + Sparkles icon
2. Roles Técnicos + Code icon
3. Descripción de proyecto + Rocket icon
4. ¡Listo! + CheckCircle icon

---

## Base de Datos (Convex)

### Schema Design

#### **users** Table
```typescript
{
  clerkId: string,              // Clerk user ID (unique)
  email: string,
  name: string?,
  imageUrl: string?,
  plan: 'free' | 'creator' | 'pro' | 'enterprise',
  clerkSubscriptionId: string?,
  onboardingCompleted: boolean,
  githubConnected: boolean,
  gitlabConnected: boolean,
  createdAt: number,
  updatedAt: number,
}
```

#### **projects** Table
```typescript
{
  userId: Id<"users">,
  name: string,
  description: string?,
  role: string,                 // 'fullstack', 'frontend', etc.
  framework: string?,           // 'nextjs', 'react', 'vue'
  language: string?,            // 'typescript', 'python'
  githubRepoUrl: string?,
  gitlabRepoUrl: string?,
  status: 'active' | 'archived' | 'deleted',
  filesCount: number,
  lastGeneratedAt: number?,
  createdAt: number,
  updatedAt: number,
}
```

#### **tokenUsage** Table
```typescript
{
  userId: Id<"users">,
  month: string,                // 'YYYY-MM'
  tokensUsed: number,
  tokensLimit: number,
  generationsCount: number,
  lastGenerationAt: number?,
}
```

### Queries y Mutations

**Ejemplo: Get User Projects**
```typescript
// convex/projects.ts
export const getUserProjects = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user_status", (q) => 
        q.eq("userId", userId).eq("status", "active")
      )
      .order("desc")
      .collect();
  },
});
```

**Ejemplo: Increment Tokens**
```typescript
// convex/tokenUsage.ts
export const incrementTokens = mutation({
  args: {
    userId: v.id("users"),
    tokensUsed: v.number(),
  },
  handler: async (ctx, { userId, tokensUsed }) => {
    const month = new Date().toISOString().slice(0, 7);
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        tokensUsed: existing.tokensUsed + tokensUsed,
        generationsCount: existing.generationsCount + 1,
      });
    }
  },
});
```

---

## Autenticación y Billing (Clerk)

### Clerk Setup

**middleware.ts:**
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/pricing',
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});
```

### Feature Gating

**Clerk Billing Features:**
- `tokens_1000`: Free plan
- `tokens_10000`: Creator plan
- `tokens_30000`: Pro plan
- `unlimited_tokens`: Enterprise plan

**Usage in Components:**
```typescript
const { has, isLoaded } = useAuth();

if (!isLoaded) {
  return <LoadingState />;
}

const tokenLimit = has?.({ feature: 'unlimited_tokens' })
  ? -1
  : has?.({ feature: 'tokens_30000' })
  ? 30000
  : has?.({ feature: 'tokens_10000' })
  ? 10000
  : 1000;
```

### Clerk + Convex Sync

**On user sign-up:**
1. Clerk creates user
2. Webhook → `api/webhooks/clerk`
3. Create user in Convex
4. Initialize token usage

---

## Integraciones

### GitHub Integration

**OAuth Flow:**
1. User clicks "Conectar GitHub"
2. Redirect to GitHub OAuth
3. Callback → `/api/oauth/github/callback`
4. Store `GITHUB_TOKEN` in Clerk metadata
5. Update `githubConnected: true` in Convex

**API Routes:**
- `/api/oauth/github/status`: Check connection
- `/api/oauth/github/token`: Get access token
- `/api/repository/connect`: Link repo to project
- `/api/repository/commit`: Create commit
- `/api/repository/pull-request`: Create PR

**Octokit Usage:**
```typescript
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

await octokit.repos.createOrUpdateFileContents({
  owner: 'username',
  repo: 'project-name',
  path: 'src/app.ts',
  message: 'feat: Add authentication',
  content: Buffer.from(code).toString('base64'),
});
```

### JoxCoder AI Integration

Ver **GUIA_INTEGRACION_JOXCODER_API.md** para detalles completos.

**Endpoint:**
```
POST https://api.joxai.com/v1/generate
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "role": "fullstack",
  "prompt": "Create a Next.js app...",
  "context": {
    "language": "typescript",
    "framework": "nextjs"
  }
}
```

---

## Flujos de Datos

### Flujo de Generación de Código

```
1. User escribe prompt
   ↓
2. Component valida tokens disponibles (Clerk has())
   ↓
3. Si tiene tokens → Call /api/joxcoder/generate
   ↓
4. API Route → JoxCoder AI (HTTP POST)
   ↓
5. JoxCoder AI → Response con código
   ↓
6. API Route:
   - Guarda generación en Convex
   - Incrementa tokensUsed
   - Organiza archivos en carpetas
   ↓
7. Response a frontend con código
   ↓
8. Component:
   - Actualiza File Explorer
   - Renderiza código en Monaco Editor
   - Muestra toast de éxito
```

### Flujo de Auto-Commit

```
1. Código generado
   ↓
2. Archivos organizados en carpetas
   ↓
3. Si proyecto tiene githubRepoUrl:
   ↓
4. Auto-commit activado:
   - Mensaje: "feat: [generación]"
   - Archivos changed: [lista]
   ↓
5. Call /api/repository/commit
   ↓
6. GitHub API crea commit
   ↓
7. Guarda commit en Convex (commits table)
   ↓
8. Toast: "Commit creado exitosamente"
```

---

## Deployment

### Frontend (Netlify)

**Build Settings:**
```bash
Build command: npm run build
Publish directory: .next
Node version: 18.x
```

**Environment Variables (Netlify):**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_APP_URL`

### Backend (TBD)

**Opciones:**
1. **Vercel** (recomendado para Next.js)
2. **Railway** (Node.js + Convex)
3. **Render** (Dockerized backend)

**Problema con Netlify:**
Netlify solo soporta:
- Static sites
- Serverless functions (limitadas)
- **NO soporta** backend robusto con procesamiento pesado

**Recomendación:**
- **Frontend**: Netlify
- **Backend (API Routes pesadas)**: Vercel o Railway

---

## Variables de Entorno

### Producción

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=prod:your-deployment

# JoxCoder AI
JOXCODER_API_KEY=jox_...
JOXCODER_API_URL=https://api.joxai.com/v1

# GitHub
GITHUB_TOKEN=ghp_...

# GitLab (optional)
GITLAB_TOKEN=glpat-...

# App
NEXT_PUBLIC_APP_URL=https://autocrea.joxai.org
```

### Desarrollo

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.site
CONVEX_DEPLOYMENT=dev:your-deployment

# JoxCoder AI
JOXCODER_API_KEY=jox_test_...
JOXCODER_API_URL=https://api-dev.joxai.com/v1

# App
NEXT_PUBLIC_APP_URL=http://localhost:5000
```

---

## Próximos Pasos

1. Lee **GUIA_INTEGRACION_JOXCODER_API.md** para integrar JoxCoder
2. Revisa **GUIA_FUNCIONAMIENTO_AUTOCREA.md** para flujos de usuario
3. Explora `convex/schema.ts` para entender el data model

---

**Mantenido por**: JoxAI Engineering Team  
**Última actualización**: 2025-10-23
