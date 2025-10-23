# AUTOCREA V2.0 - Plataforma de Desarrollo con JoxCoder AI

## Overview
AUTOCREA V2.0 es una plataforma autónoma de desarrollo full-stack potenciada por JoxCoder AI, un modelo de IA multi-rol especializado que genera código profesional automáticamente. El proyecto es el "núcleo creador" del ecosistema JoxAI, diseñado para transformar ideas en aplicaciones completas listas para producción.

**Estado:** Autenticación Clerk ✅ | Clerk Billing ✅ | Convex pendiente ⏳ | Lanzamiento Q1 2026
**Dominio objetivo:** autocrea.joxai.org
**Eslogan:** "De idea a la materialización"
**Última actualización:** 23 de octubre 2025 - Migración completa a Clerk Billing

## User Preferences
- **Language:** Spanish UI throughout
- **Theme:** Dark mode with cyan/blue/purple gradients (MANTENER estos colores)
- **Framework:** Next.js 14 with App Router
- **Branding:** "Powered by JoxAI" visible en toda la app
- **Design:** Modern, glassmorphism, gradientes vibrantes
- **Paleta de Colores:**
  - Principal: Cyan (#06b6d4)
  - Secundario: Blue (#3b82f6)
  - Acento: Purple (#9333ea)
  - Fondo: Slate dark (#020617)

## System Architecture

### Frontend
Built with Next.js 14 (App Router), TypeScript, React 18, and Tailwind CSS, the frontend provides a modern and responsive user interface. Key pages include:
- `/chat`: Main interface with a 12-role technical selector, File Explorer, Code Editor, and real-time token usage tracking.
- `/repository`: GitHub/GitLab repository management, automated commits, and pull requests.
- `/console`: Interactive web terminal for command execution.
- `/preview`: Application preview with responsive modes.
- `/projects`: Management of generated projects.
- `/settings`: Plan management with Clerk Billing integration and usage metrics.
- `/pricing`: Clerk Billing pricing table with FAQ section.
- `/sign-in`, `/sign-up`: Authentication handled by Clerk.

### Backend
The backend utilizes Next.js API Routes for core functionalities, including:
- JoxCoder AI code generation (`/api/joxcoder/generate`).
- GitHub OAuth and token management (`/api/oauth/github/status`, `/api/oauth/github/token`).
- Code template management (`/api/templates/list`, `/api/templates/get`, `/api/templates/apply`).
- Repository operations (connect, list, commit, pull-request).
- Terminal command execution (`/api/terminal/execute`).
- File management (save, load, delete, export).

### JoxCoder AI - Multi-Role System
JoxCoder AI features 12 specialized technical roles, each with tailored prompts for code generation:
1.  **Architect**: System design and technical architecture.
2.  **Fullstack**: Complete frontend and backend applications.
3.  **Frontend**: React, Next.js, UI/UX development.
4.  **Backend**: APIs, databases, business logic.
5.  **DevOps**: CI/CD, Docker, deployment.
6.  **Security**: Auditing, secure coding.
7.  **QA Engineer**: Automated testing, TDD.
8.  **Data Engineer**: Data pipelines, ETL.
9.  **ML Engineer**: Machine Learning, MLOps.
10. **Pentester**: Penetration testing.
11. **Mobile Dev**: React Native, Flutter.
12. **Blockchain Dev**: Solidity, Web3, smart contracts.

### Service Plans (Clerk Billing)
La plataforma ofrece 4 planes de suscripción gestionados por Clerk Billing:
1. **Free Trial** ($0/mes) - 1,000 tokens, 1 proyecto
   - Features: `tokens_1000`, `projects_1`
2. **Creator** ($29/mes) - 10,000 tokens, 5 proyectos
   - Features: `tokens_10000`, `projects_5`, `github_integration`, `priority_support`
3. **Pro** ($79/mes) - 30,000 tokens, 20 proyectos
   - Features: `tokens_30000`, `projects_20`, `github_integration`, `api_access`, `team_collaboration`, `advanced_analytics`, `dedicated_support`
4. **Enterprise** (Custom) - Tokens ilimitados, soluciones personalizadas
   - Features: `unlimited_tokens`, `unlimited_projects`, `enterprise_support`, `sso`, `sla_guarantee`

### Technical Stack
-   **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand.
-   **Backend:** Next.js API Routes.
-   **AI/ML:** JoxCoder AI model, specialized role prompts, language-specific code templates.
-   **Payments:** Clerk Billing (replaces direct Stripe integration).

## External Dependencies
-   **Clerk**: Full authentication services, GitHub OAuth provider, and Clerk Billing for subscription management ✅ Production-ready (v6, compatible with React 18 + Next.js 14)
-   **JoxCoder AI**: The core multi-role AI model for code generation.
-   **GitHub API (@octokit/rest)**: For comprehensive GitHub integration (repository management, commits, pull requests).
-   **Convex**: Database for user data, generation history, projects, and usage tracking (schema ready, deployment pending).

## Recent Changes (October 23, 2025)

### 🚀 Refactorización Completa para Producción

**Objetivo**: Llevar AUTOCREA de desarrollo a producción con todas las funcionalidades listas.

### Convex Database - Completamente Configurado ✅
**Motivación**: Simplificar el stack tecnológico centralizando autenticación y pagos en Clerk Billing, eliminando la necesidad de webhooks personalizados y sincronización manual de estado.

**Cambios implementados:**
- ✅ Eliminados todos los archivos y rutas API de Stripe:
  - `/api/stripe/create-checkout`
  - `/api/stripe/create-portal`
  - `/api/stripe/webhooks`
  - `/src/lib/stripe/*` (cliente, config, hooks)
- ✅ Desinstalados paquetes: `@stripe/stripe-js`, `stripe`
- ✅ Actualizado `src/config/plans.ts`:
  - Agregado campo `clerkFeatures` con feature slugs para cada plan
  - Eliminado campo `stripePriceId`
- ✅ Implementada página `/pricing` con componente `<PricingTable />` de Clerk
- ✅ Actualizada página `/settings`:
  - Usa `useAuth().has({ feature })` para verificar permisos
  - Muestra plan actual basado en features de Clerk
  - Link a UserButton para gestionar facturación (tab Billing automático)
- ✅ Implementado **feature gating** en `/chat`:
  - Verifica límite de tokens usando `has({ feature })`
  - Muestra badge de tokens disponibles en tiempo real
  - Alerta cuando está cerca del límite (>80%)
  - Deshabilita botón "Generar" si no hay tokens disponibles
  - Link directo a `/pricing` para upgrade
- ✅ Actualizados tipos en `src/types/user.ts`:
  - Reemplazado `stripeSubscriptionId` y `stripeCustomerId` con `clerkSubscriptionId`
- ✅ Limpiadas constantes en `src/config/constants.ts`:
  - Eliminada sección `WEBHOOK_EVENTS.STRIPE`

**Ventajas de Clerk Billing:**
- ✅ Todo en un solo dashboard (auth + billing)
- ✅ No requiere webhooks personalizados
- ✅ UI components pre-built (`<PricingTable />`, billing tab en UserProfile)
- ✅ Feature gating nativo con `has({ feature })`
- ✅ Sincronización automática de estado de suscripción
- ✅ Costo adicional: solo 0.7% por transacción (vs desarrollo/mantenimiento de webhooks)

### Autenticación Clerk - Ready for Production ✅
- ✅ Convertidas páginas sign-in/sign-up a Client Components con 'use client'
- ✅ Migrado a `forceRedirectUrl` (reemplazando `afterSignInUrl`/`afterSignUpUrl` deprecated)
- ✅ Downgraded @types/react a 18.2.79 y @types/react-dom a 18.2.25 (compatibilidad con Clerk v6)
- ✅ Flujo de autenticación completo: Landing → Sign-in → Chat (protegido)
- ✅ OAuth providers funcionando: Apple, GitHub, Google
- ✅ Landing page con botones inteligentes (detecta si usuario está autenticado)

**Schemas creados:**
- `users`: Usuarios con Clerk sync, onboarding, GitHub/GitLab connection status
- `projects`: Proyectos con roles, frameworks, repo URLs, status
- `tokenUsage`: Tracking mensual de tokens por usuario
- `generations`: Historial completo de código generado
- `projectFiles`: Archivos organizados por proyecto y path
- `commits`: Log de commits a GitHub/GitLab

**Queries y Mutations completos**: Ver `convex/` directory

**ConvexProvider integrado** en `app/layout.tsx` ✅

### Sistema de Onboarding Creado ✅

**Componente**: `src/components/onboarding/onboarding-modal.tsx`

**Features:**
- 4 pasos interactivos con animaciones (Framer Motion)
- Iconos temáticos: Sparkles, Code, Rocket, CheckCircle2
- Guardado de estado en Convex (`onboardingCompleted: boolean`)
- Skip tutorial option
- Diseño acorde a paleta cyan/blue/purple

### Navegación Mejorada ✅

**Nuevos componentes:**
- `src/components/navigation/back-to-home-button.tsx`: Botón "Volver al Inicio" en sidebar
- `src/components/navigation/breadcrumbs.tsx`: Navegación entre páginas

**Integrado en**: `app/(dashboard)/layout.tsx`

### Footer con Logo JoxAI ✅

**Componente**: `src/components/landing/footer.tsx`

**Features:**
- Logo de JoxAI (con fallback si no existe imagen)
- Links a producto, recursos, precios
- Social media icons (GitHub, Twitter, LinkedIn, Email)
- Copyright y "Powered by JoxAI"

**Integrado en**: `app/page.tsx` (landing)

### Documentación Completa ✅

**3 Guías Creadas:**

1. **GUIA_FUNCIONAMIENTO_AUTOCREA.md** (Para Usuarios)
   - Introducción y features únicas
   - Primeros pasos y onboarding
   - Interfaz principal completa
   - Generación de código paso a paso
   - Gestión de proyectos
   - Integraciones (GitHub, GitLab, Convex)
   - Preview y testing
   - Planes y facturación
   - FAQ completo

2. **GUIA_TECNICA_ARQUITECTURA.md** (Para Desarrolladores)
   - Stack tecnológico completo
   - Arquitectura del sistema (diagrama)
   - Estructura de directorios detallada
   - Componentes principales explicados
   - Base de datos Convex (schemas, queries, mutations)
   - Autenticación y Billing con Clerk
   - Flujos de datos completos
   - Deployment y variables de entorno

3. **GUIA_INTEGRACION_JOXCODER_API.md** (Integración de JoxCoder)
   - Arquitectura de integración completa
   - 7 pasos detallados para integrar
   - API Route implementation
   - Cliente JoxCoder tipado
   - Auto-organización de archivos
   - Auto-commit a GitHub
   - Testing, error handling, optimizaciones
   - Checklist completo

### Migración Completa a Clerk Billing ✅ (Reemplaza Stripe)
