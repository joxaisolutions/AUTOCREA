# AUTOCREA V2.0 - Plataforma de Desarrollo con JoxCoder AI

## Overview
AUTOCREA V2.0 es una plataforma autónoma de desarrollo full-stack potenciada por JoxCoder AI, un modelo de IA multi-rol especializado que genera código profesional automáticamente. El proyecto es el "núcleo creador" del ecosistema JoxAI, diseñado para transformar ideas en aplicaciones completas listas para producción.

**Estado:** Stripe integrado ✅ | Convex pendiente ⏳ | Lanzamiento Q1 2026
**Dominio objetivo:** autocrea.joxai.org
**Eslogan:** "De idea a la materialización"

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
- `/chat`: Main interface with a 12-role technical selector, File Explorer, and Code Editor.
- `/repository`: GitHub/GitLab repository management, automated commits, and pull requests.
- `/console`: Interactive web terminal for command execution.
- `/preview`: Application preview with responsive modes.
- `/projects`: Management of generated projects.
- `/settings`: Plan management and usage metrics.
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

### Service Plans (Conectados a Stripe)
La plataforma ofrece 4 planes de suscripción configurados en Stripe:
1. **Free Trial** ($0/mes) - 1,000 tokens, 1 proyecto
2. **Creator** ($29/mes) - 10,000 tokens, 5 proyectos
3. **Pro** ($79/mes) - 30,000 tokens, 20 proyectos
4. **Enterprise** (Custom) - Tokens ilimitados, soluciones personalizadas

Cada plan tiene su Price ID real de Stripe configurado en `src/config/plans.ts`.

### Technical Stack
-   **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand.
-   **Backend:** Next.js API Routes.
-   **AI/ML:** JoxCoder AI model, specialized role prompts, language-specific code templates.

## External Dependencies
-   **Clerk**: For full authentication services and GitHub OAuth provider.
-   **JoxCoder AI**: The core multi-role AI model for code generation.
-   **GitHub API (@octokit/rest)**: For comprehensive GitHub integration (repository management, commits, pull requests).
-   **Convex**: Database for user data, generation history, projects, and usage tracking (schema ready, deployment pending).
-   **Stripe**: Payment processing for subscription plans ✅ Fully implemented and tested.