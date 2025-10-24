# AUTOCREA V2.0 - Plataforma de Desarrollo con JoxCoder AI

## Overview
AUTOCREA V2.0 es una plataforma autónoma de desarrollo full-stack impulsada por JoxCoder AI (sistema híbrido DeepSeek-33B + CodeLlama-34B). El proyecto sirve como el "núcleo creativo" del ecosistema JoxAI, diseñado para transformar ideas en aplicaciones listas para producción.

**Versión Actual**: 2.0.0  
**Estado**: ✅ Backend completamente funcional, listo para desarrollo frontend  
**Última Actualización**: 24 de Octubre, 2025

---

## User Preferences
- **Idioma**: Español (UI y documentación)
- **Tema**: Dark mode con gradientes cyan/blue/purple
- **Framework**: Next.js 14 con App Router
- **Branding**: "Powered by JoxAI" visible en toda la app
- **Diseño**: Moderno, glassmorphism, gradientes vibrantes
- **Paleta de Colores**:
  - Principal: Cyan (#06b6d4)
  - Secundario: Blue (#3b82f6)
  - Acento: Purple (#9333ea)
  - Fondo: Slate dark (#020617)

---

## System Architecture

### Stack Tecnológico (Actualizado Oct 2025)

#### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Componentes**: Radix UI
- **Editor de Código**: Monaco Editor (@monaco-editor/react)
- **Animaciones**: Framer Motion
- **Estado**: Zustand

#### Backend
- **API**: Next.js API Routes
- **Autenticación**: Clerk (con Billing integrado)
- **Base de Datos**: Convex (real-time)
- **GitHub Integration**: @octokit/rest
- **Webhooks**: Svix (Clerk webhooks)

#### IA y Generación de Código
- **JoxCoder AI**: Sistema híbrido DeepSeek-33B + CodeLlama-34B
- **12 Roles de IA**: Architect, Fullstack, Frontend, Backend, DevOps, Security, QA, Data Engineer, ML Engineer, Pentester, Mobile Dev, Blockchain Dev
- **Estado Actual**: Mock mode (esperando deployment de JoxCoder)

---

## Configuración Actual (Replit)

### Variables de Entorno Configuradas
✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Replit Secret)  
✅ `CLERK_SECRET_KEY` (Replit Secret)  
✅ `NEXT_PUBLIC_CONVEX_URL` (https://kindhearted-cormorant-798.convex.cloud)  
✅ `CONVEX_DEPLOY_KEY` (Replit Secret)

### Convex Database
- **Deployment**: `kindhearted-cormorant-798`
- **URL**: https://kindhearted-cormorant-798.convex.cloud
- **Dashboard**: https://dashboard.convex.dev/d/kindhearted-cormorant-798

**Tablas Configuradas**:
1. `users` - Gestión de usuarios (sincronizado con Clerk)
2. `tokenUsage` - Tracking de consumo de tokens
3. `codeGenerations` - Historial de generaciones de código
4. `projects` - Proyectos de usuarios
5. `files` - Archivos de proyectos

### Clerk Authentication
- **Status**: ⚠️ Requiere cambiar a Development Keys
- **Problema Actual**: Usando Production Keys (solo funcionan con autocrea.joxai.org)
- **Solución**: Ver archivo `SOLUCION_CLERK.md`

---

## API Endpoints Implementados

### Gestión de Usuarios
```
GET  /api/user/plan          → Obtener plan actual del usuario
GET  /api/user/tokens        → Obtener uso de tokens del mes
GET  /api/user/can-generate  → Verificar si puede generar código
```

### Webhooks
```
POST /api/webhooks/clerk     → Sincronizar eventos de Clerk con Convex
```
- Eventos soportados: `user.created`, `user.updated`, `user.deleted`
- Sincronización de suscripciones y planes

### JoxCoder AI
```
POST /api/joxcoder/generate  → Generar código con IA
```
**Request Body**:
```json
{
  "prompt": "Crear una app de tareas",
  "projectType": "web",
  "framework": "nextjs"
}
```

**Features**:
- ✅ Validación de autenticación
- ✅ Verificación de límites de tokens
- ✅ Validación de plan
- ✅ Tracking de uso en Convex
- ⏳ Mock mode (esperando JoxCoder real)

---

## Sistema de Planes y Tokens

| Plan | Tokens/Mes | Precio | Características |
|------|-----------|--------|-----------------|
| **Free** | 500 | Gratis | - 3 proyectos<br>- Roles básicos<br>- Preview limitado |
| **Creator** | 5,000 | $9.99/mes | - Proyectos ilimitados<br>- Todos los roles<br>- GitHub sync |
| **Pro** | 50,000 | $49.99/mes | - Todo de Creator<br>- Prioridad de generación<br>- Soporte prioritario |
| **Enterprise** | Ilimitado | $199.99/mes | - Todo de Pro<br>- API privada<br>- Soporte dedicado |

**Gestión de Planes**: Clerk Billing (integrado con Stripe)

---

## Feature Specifications

### ✅ Implementado

1. **Autenticación (Clerk)**
   - Sign-up / Sign-in
   - Protección de rutas con middleware
   - Sincronización con Convex vía webhooks

2. **Base de Datos (Convex)**
   - Schema completo
   - Queries y mutations para usuarios y tokens
   - Real-time sync

3. **Sistema de Tokens**
   - Tracking por usuario y mes
   - Verificación de límites por plan
   - API endpoints completos

4. **Webhooks**
   - Clerk webhook configurado
   - Sincronización automática de usuarios

### ⏳ Pendiente

1. **JoxCoder AI Integration**
   - Actualmente en mock mode
   - Esperando deployment del modelo
   - Variables necesarias:
     - `JOXCODER_API_ENDPOINT`
     - `JOXCODER_API_KEY`

2. **Stripe Integration**
   - Conectar Stripe con Clerk
   - Configurar planes de suscripción
   - Webhook de Stripe

3. **Frontend Development**
   - Dashboard de usuario
   - Editor de código (Monaco)
   - Historial de generaciones
   - Gestión de proyectos
   - Preview de aplicaciones

4. **Repository Management**
   - GitHub OAuth
   - Commits automáticos
   - Pull requests

---

## External Dependencies

### Autenticación y Pagos
- **Clerk**: Autenticación completa + Billing
- **Stripe**: Procesamiento de pagos (vía Clerk)

### Base de Datos
- **Convex**: Database real-time

### IA
- **JoxCoder AI**: Motor de generación de código
  - DeepSeek-33B (arquitectura y planificación)
  - CodeLlama-34B (generación de código)

### GitHub
- **@octokit/rest**: Integración con GitHub
  - Repository management
  - Commits y pull requests

---

## Recent Changes (24 de Octubre, 2025)

### Backend Completo Implementado
- ✅ 8 API endpoints funcionales
- ✅ Webhook de Clerk configurado
- ✅ Sistema de tokens y planes
- ✅ Convex totalmente configurado
- ✅ Tipos de TypeScript generados

### Correcciones Técnicas
- ✅ Fixed: `clerkClient()` usage (await agregado)
- ✅ Fixed: Variables de entorno configuradas
- ✅ Fixed: Convex types generation
- ✅ Fixed: API route handlers

### Documentación Actualizada
- ✅ `README.md` - Guía completa del proyecto
- ✅ `ESTADO_PROYECTO.md` - Estado actual
- ✅ `SOLUCION_CLERK.md` - Fix para Clerk error
- ✅ `CONFIGURACION_CLERK_REPLIT.md` - Setup de dominios

---

## Known Issues

### 🔴 CRÍTICO: Clerk Development Keys
**Problema**: Usando Production Keys en entorno de desarrollo  
**Error**: "Production Keys are only allowed for domain 'autocrea.joxai.org'"  
**Solución**: Ver `SOLUCION_CLERK.md`

**Pasos**:
1. Ir a Clerk Dashboard
2. Cambiar a modo "Development"
3. Copiar Development Keys
4. Actualizar Replit Secrets
5. Reiniciar servidor

---

## Deployment

### Netlify (Configurado)
- ✅ `netlify.toml` configurado
- ✅ Plugin de Next.js oficial
- ✅ Build script para Convex
- 📄 Guía: `DEPLOYMENT_NETLIFY.md`

### Variables para Production
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (Production)
CLERK_SECRET_KEY (Production)
NEXT_PUBLIC_CONVEX_URL
CONVEX_DEPLOY_KEY
JOXCODER_API_ENDPOINT
JOXCODER_API_KEY
```

---

## File Organization

```
autocrea-v2/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   ├── (auth)/               # Auth pages
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── convex/                   # Convex backend
│   ├── schema.ts             # Database schema
│   ├── users.ts              # User functions
│   └── tokenUsage.ts         # Token tracking
├── src/
│   ├── components/           # React components
│   ├── config/
│   │   └── plans.ts          # Plan configuration
│   └── lib/
│       ├── convex-client.tsx # Convex provider
│       └── hooks/            # Custom hooks
├── middleware.ts             # Clerk middleware
├── .env.local                # Local env vars
└── README.md                 # Documentation
```

---

## Testing & Verification

### Checklist Post-Clerk Fix
- [ ] Clerk carga sin errores
- [ ] Sign-up funciona
- [ ] Usuario se crea en Convex
- [ ] `/api/user/plan` retorna plan correcto
- [ ] `/api/user/tokens` retorna 0 tokens usados
- [ ] `/api/joxcoder/generate` verifica límites

---

## Next Steps

1. **Inmediato**: Cambiar a Clerk Development Keys
2. **Corto Plazo**: Desarrollar dashboard frontend
3. **Medio Plazo**: Integrar JoxCoder AI real
4. **Largo Plazo**: Deploy a producción con Stripe

---

## Support & Documentation

- `README.md` - Guía principal
- `ESTADO_PROYECTO.md` - Estado actual detallado
- `SOLUCION_CLERK.md` - Solución al error de Clerk
- Convex Dashboard: https://dashboard.convex.dev/d/kindhearted-cormorant-798
- Clerk Dashboard: https://dashboard.clerk.com

---

**Desarrollado por**: JoxAI Solutions  
**Contacto**: Dominio de producción: autocrea.joxai.org  
**Última Actualización**: 24 de Octubre, 2025
