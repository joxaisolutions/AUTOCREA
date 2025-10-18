# AUTOCREA V2.0 - MVP Funcional

## Overview

AUTOCREA V2.0 es una plataforma autónoma de desarrollo full-stack que genera aplicaciones completas desde la idea hasta el deployment. 

**Estado Actual: MVP FUNCIONAL** ✅

**Características Implementadas:**
- ✅ Autenticación completa con Clerk (sign-up, sign-in, protected routes)
- ✅ Generación de código real con Relevance AI (5 agentes especializados)
- ✅ Sistema de tokens funcionando (UI completa, backend pendiente Convex)
- ✅ Página de configuración con planes de suscripción (Stripe UI lista)
- ✅ Branding completo "Powered by JoxAI" en toda la app
- ✅ UI/UX completamente en español
- ✅ Tema oscuro con gradientes cyan/blue

**Integraciones Configuradas:**
- **Relevance AI**: Región bcbe5a, Proyecto 72d29230, Agente ee9406f5 (ACTIVO)
- **Clerk**: Autenticación configurada y funcionando (ACTIVO)
- **Stripe**: Blueprint listo, pendiente configuración de API keys

**Próximos Pasos (Para plataforma completa):**
1. Configurar Convex para persistencia de tokens real
2. Integrar Stripe para pagos reales
3. Agregar Monaco Editor para edición de código
4. Implementar File Explorer en creation room
5. Agregar Live Preview del código generado
6. Implementar Terminal integrado
7. Automatizar operaciones Git

## User Preferences

- **Communication Style:** Simple, everyday language
- **Design:** Dark theme, gradient accents (cyan/blue)
- **Framework:** Next.js 14 with App Router
- **Language:** Spanish UI throughout
- **Branding:** "Powered by JoxAI" visible en toda la aplicación

## System Architecture

### Frontend Architecture

The frontend is built with **Next.js 14 (App Router)**, **TypeScript**, **React 18**, and styled using **Tailwind CSS** with **Framer Motion** for animations. Key UI components include a **Monaco Editor** for code preview, a chat interface for project definition, and pages for projects, settings, and authentication. **Zustand** is used for global state management.

### Backend Architecture

The backend primarily utilizes **Convex** as a real-time database, with a comprehensive schema for users, projects, generations, and API key storage. **Next.js API routes** serve as the API layer for integration with the JoxCoder system and optional external AI services.

### AI/ML Core - JoxCoder V2.0 Hybrid System

The core intelligence is the proprietary **JoxCoder Hybrid System**, which combines:
- **DeepSeek-Coder-33B**: Specialized in Architecture, Blockchain, DevOps, and Security.
- **CodeLlama-34B**: Specialized in Frontend, Backend, Python/JS, and Debugging.

A **Smart Router** analyzes prompts and agent roles to select the most appropriate model. The system employs a multi-agent architecture with five specialized AI roles: Architect, Backend, Frontend, DevOps, and Security, each assigned to the optimal model.

### UI/UX Decisions

The application features a dark theme with cyan/blue gradient accents. The user interface is designed for responsiveness and includes elements for token balance display, project management, and a detailed generation progress tracker.

## External Dependencies

**AI Providers:**
- ✅ **Relevance AI** (ACTIVO): Agent ee9406f5 en región bcbe5a, generación real de código
- ⏳ **JoxCoder Hybrid System**: DeepSeek-Coder-33B + CodeLlama-34B (para implementar después)

**Infrastructure:**
- ✅ **Clerk** (ACTIVO): Autenticación completamente funcional
- ⏳ **Convex**: Esquema definido, pendiente configuración del proyecto
- ⏳ **Stripe**: Blueprint integrado, pendiente API keys

**Optional External AI:**
- **OpenAI API**: Opcional, UI lista en settings
- **Anthropic API**: Opcional, UI lista en settings
- **Google AI API**: Opcional, UI lista en settings

## Flujo Actual (MVP)

1. **Landing Page** → Usuario ve features y planes
2. **Sign Up** → Registro con Clerk (recibe 100 tokens gratis)
3. **Dashboard/Chat** → Usuario describe su proyecto
4. **AI Generation** → 5 agentes especializados generan código con Relevance AI
5. **Results** → Usuario ve el código generado y puede descargarlo
6. **Settings** → Usuario puede ver tokens y planes (pagos próximamente)