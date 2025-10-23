# AUTOCREA V2.0 - Plataforma de Desarrollo con JoxCoder AI

## Overview
AUTOCREA V2.0 is an autonomous full-stack development platform powered by JoxCoder AI, a multi-role AI model that generates professional code automatically. This project serves as the "creative core" of the JoxAI ecosystem, designed to transform ideas into production-ready applications. Its vision is to provide a comprehensive development environment, significantly reducing time-to-market and enabling rapid prototyping and deployment of innovative solutions.

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

### UI/UX Decisions
The platform features a dark mode theme with vibrant cyan, blue, and purple gradients, adhering to a modern glassmorphism design. Branding includes "Powered by JoxAI" visible across the application. The UI is built for responsiveness and includes an onboarding system, enhanced navigation with breadcrumbs and a "Back to Home" button, and a JoxAI-branded footer.

### Technical Implementations
The frontend is built with Next.js 14 (App Router), TypeScript, React 18, and Tailwind CSS. Key pages include `/chat` for AI interaction, `/repository` for Git management, `/console` for terminal access, `/preview` for application preview, `/projects` for project management, and `/settings`/`/pricing` for plan management.

The backend leverages Next.js API Routes for core functionalities such as JoxCoder AI code generation, GitHub OAuth, template management, repository operations, terminal command execution, and file management.

JoxCoder AI integrates a 12-role system (Architect, Fullstack, Frontend, Backend, DevOps, Security, QA Engineer, Data Engineer, ML Engineer, Pentester, Mobile Dev, Blockchain Dev), each with specialized prompts for code generation.

### Feature Specifications
- **Code Generation:** Powered by JoxCoder AI, generating code based on selected roles and user input.
- **Repository Management:** Automated commits, pull requests, and repository connection for GitHub.
- **Web Terminal:** Interactive console with special commands, improved UX, and security features.
- **Application Preview:** Responsive preview with desktop, tablet, and mobile views, dynamic orientation, and simulated device features.
- **File Organization Utility:** Automatic organization of generated files into 12 categories, framework/language detection, and file tree generation.
- **Subscription Management:** Four service plans (Free Trial, Creator, Pro, Enterprise) managed via Clerk Billing with feature gating.
- **User Management:** Clerk for authentication, user onboarding, and syncing user data with Convex.
- **Project Management:** Create, update, archive, and remove projects with associated metadata.
- **Token Usage Tracking:** Real-time monitoring of token consumption per user, integrated with plan limits.

### System Design Choices
The architecture emphasizes a full-stack Next.js approach, utilizing Next.js API routes for the backend to maintain a unified development environment. Clerk is chosen for robust authentication and billing, simplifying payment and user management. Convex serves as the primary database for real-time data synchronization. The system is designed for modularity, allowing for easy integration of new AI roles and features.

## External Dependencies
-   **Clerk**: For full authentication services, GitHub OAuth, and Clerk Billing for subscription management.
-   **JoxCoder AI**: The core multi-role AI model for code generation.
-   **GitHub API (@octokit/rest)**: For comprehensive GitHub integration (repository management, commits, pull requests).
-   **Convex**: Database for user data, generation history, projects, and usage tracking.