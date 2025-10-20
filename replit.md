# AUTOCREA V2.0 - Plataforma de Desarrollo con JoxCoder AI

## Overview

**AUTOCREA V2.0** es una plataforma autónoma de desarrollo full-stack impulsada por **JoxCoder AI**, un modelo especializado multi-rol que genera código profesional automáticamente.

**Estado Actual: REESTRUCTURADO Y FUNCIONAL** ✅

**Características Implementadas:**
- ✅ **JoxCoder AI Integration** - Sistema de 12 roles técnicos especializados
- ✅ **Selector de Roles** - Arquitecto, Fullstack, Frontend, Backend, DevOps, Security, QA, Data Engineer, ML Engineer, Pentester, Mobile Dev, Blockchain Dev
- ✅ **Autenticación con Clerk** - Sign-up, sign-in, protected routes funcionando
- ✅ **Nuevos Planes Premium** - Starter ($29), Professional ($79), Enterprise ($199), Custom
- ✅ **Sistema de Límites por Plan** - Generaciones/mes, roles disponibles, lenguajes, repositorios
- ✅ **UI Moderna** - Interfaz completamente rediseñada en español con tema dark cyan/blue
- ✅ **Tracking de Uso** - Dashboard de generaciones con progress bar y métricas
- ✅ **Branding JoxAI** - "Powered by JoxAI" en toda la aplicación

**Integraciones Activas:**
- **Clerk**: Autenticación completa (ACTIVO)
- **JoxCoder AI**: Modelo multi-rol preparado para integración (INFRAESTRUCTURA LISTA)
- **Convex**: Esquema definido, pendiente activación para persistencia
- **Stripe**: Blueprint preparado, pendiente configuración de pagos

## System Architecture

### Frontend Architecture

**Next.js 14 (App Router)** + **TypeScript** + **React 18** + **Tailwind CSS**

Páginas principales:
- `/chat` - Interfaz principal con selector de 12 roles técnicos
- `/settings` - Gestión de planes y métricas de uso
- `/projects` - Gestión de proyectos generados
- `/sign-in`, `/sign-up` - Autenticación con Clerk

### Backend Architecture

**API Routes (Next.js)**:
- `/api/joxcoder/generate` - Generación de código con JoxCoder AI
- Más endpoints a implementar: `/analyze-code`, `/refactor-code`

**Database (Convex)** - Pendiente configuración:
- `users` - Información de usuarios y planes
- `generations` - Historial de generaciones
- `projects` - Proyectos creados
- `usage` - Tracking de uso por usuario

### JoxCoder AI - Sistema Multi-Rol

**12 Roles Técnicos Especializados:**

1. **🏗️ Arquitecto** - Diseño de sistemas, arquitectura, decisiones técnicas
2. **⚡ Fullstack** - Apps completas frontend + backend
3. **🎨 Frontend** - React, Next.js, UI/UX moderno
4. **⚙️ Backend** - APIs, bases de datos, lógica de negocio
5. **🚀 DevOps** - CI/CD, Docker, deployment
6. **🔒 Security** - Auditoría, OWASP, secure coding
7. **✅ QA Engineer** - Testing automatizado, TDD
8. **📊 Data Engineer** - Pipelines de datos, ETL
9. **🤖 ML Engineer** - Machine Learning, MLOps
10. **🛡️ Pentester** - Pentesting, ethical hacking
11. **📱 Mobile Dev** - React Native, Flutter
12. **⛓️ Blockchain Dev** - Solidity, Web3, smart contracts

### Planes de Servicio

| Plan | Precio | Generaciones/mes | Roles | Lenguajes | Repos |
|------|--------|-----------------|-------|-----------|-------|
| **Starter** | $29/mes | 100 | 4 | 3 | 3 |
| **Professional** | $79/mes | 500 | 8 | 8+ | 15 |
| **Enterprise** | $199/mes | 2000 | 12 | Todos | ∞ |
| **Custom** | $499+/mes | ∞ | 12 | Todos | ∞ |

**Diferenciadores por Plan:**
- **Starter**: Roles básicos (Fullstack, Frontend, Backend, QA)
- **Professional**: + Arquitecto, DevOps, Security, Data Engineer
- **Enterprise**: + ML Engineer, Pentester, Mobile Dev, Blockchain Dev, API access
- **Custom**: White-label, modelos personalizados, on-premise

## Flujo de Usuario

```
1. Usuario inicia sesión (Clerk)
   ↓
2. Navega a /chat
   ↓
3. Selecciona un rol técnico (ej: Fullstack)
   ↓
4. Describe lo que necesita crear
   ↓
5. JoxCoder AI genera código especializado
   ↓
6. Usuario ve el código + explicación
   ↓
7. Puede copiar, descargar o modificar
   ↓
8. Sistema rastrea uso y límites
```

## User Preferences

- **Language:** Spanish UI throughout
- **Theme:** Dark mode with cyan/blue gradients
- **Framework:** Next.js 14 with App Router
- **Branding:** "Powered by JoxAI" visible en toda la app
- **Design:** Modern, clean, professional aesthetic

## Technical Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management)

**Backend:**
- Next.js API Routes
- Clerk (authentication)
- Convex (database - pendiente)

**AI/ML:**
- JoxCoder AI (modelo principal)
- Sistema de prompts especializados por rol
- Templates de código por lenguaje

## File Structure

```
app/
├── (auth)/
│   ├── sign-in/
│   └── sign-up/
├── (dashboard)/
│   ├── chat/          # Interfaz principal de generación
│   ├── settings/      # Planes y configuración
│   ├── projects/      # Proyectos generados
│   └── layout.tsx     # Dashboard layout
├── api/
│   └── joxcoder/
│       └── generate/  # Endpoint de generación
└── layout.tsx         # Root layout

lib/
├── joxcoder/
│   ├── client.ts      # Cliente JoxCoder AI
│   ├── types.ts       # Tipos y límites por plan
│   └── role-prompts.ts # Prompts especializados
└── stores/
    └── chat-store.ts  # Estado global
```

## Environment Variables

```bash
# JOXCODER AI (cuando esté disponible)
# JOXCODER_MODEL_PATH=/path/to/model
# JOXCODER_API_ENDPOINT=http://...

# CLERK AUTH (en Replit Secrets)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# CONVEX (pendiente)
# CONVEX_DEPLOYMENT=...
```

## Próximos Pasos

1. **Modelo JoxCoder AI** - Integrar cuando esté entrenado (6-7h)
2. **Convex Setup** - Activar database para persistencia
3. **Stripe Integration** - Conectar pagos reales
4. **Usage Tracking** - Implementar conteo de generaciones real
5. **Rate Limiting** - Enforcement de límites por plan
6. **Repository Analysis** - Agregar capacidad de analizar repos Git
7. **Code Refactoring** - Endpoint para modificar código existente

## Recent Changes (Latest Session)

**Fecha:** 20/10/2025

**Cambios Principales:**
1. ✅ Eliminado Relevance AI - No es necesario
2. ✅ Creada infraestructura completa para JoxCoder AI
3. ✅ Implementados 12 roles técnicos con prompts especializados
4. ✅ Rediseñada página `/chat` con selector de roles moderno
5. ✅ Actualizada página `/settings` con nuevos planes premium
6. ✅ Sistema de límites por plan (generaciones, roles, lenguajes)
7. ✅ Nuevo endpoint `/api/joxcoder/generate`
8. ✅ UI completamente en español con tema cyan/blue
9. ✅ Eliminados archivos Convex obsoletos que causaban errores de build
10. ✅ Build de producción funcionando correctamente (npm run build ✓)

## Notes

- El modelo JoxCoder AI está en entrenamiento y se integrará cuando esté listo
- Mientras tanto, el sistema usa generación mock para demostrar la UI
- Clerk auth está funcionando correctamente
- Todos los componentes visuales están operativos
- La app está lista para conectar el modelo real cuando esté disponible
