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
- ✅ **GitHub/GitLab Integration** - Página de gestión de repositorios y commits automáticos
- ✅ **Consola Web** - Terminal interactiva para ejecutar comandos
- ✅ **App Preview** - Vista previa de aplicación con responsive modes (desktop/tablet/mobile)
- ✅ **File Explorer** - Sidebar con archivos generados, navegación y selección
- ✅ **File Management** - Sistema de estado global con Zustand para gestión de archivos

**Integraciones Activas:**
- **Clerk**: Autenticación completa (ACTIVO)
- **JoxCoder AI**: Modelo multi-rol preparado para integración (INFRAESTRUCTURA LISTA)
- **Convex**: Esquema definido, pendiente activación para persistencia
- **Stripe**: Blueprint preparado, pendiente configuración de pagos

## System Architecture

### Frontend Architecture

**Next.js 14 (App Router)** + **TypeScript** + **React 18** + **Tailwind CSS**

Páginas principales:
- `/chat` - Interfaz principal con selector de 12 roles técnicos + FileExplorer + CodeEditor (layout 3 columnas)
- `/repository` - Gestión de repositorios GitHub/GitLab, commits automáticos, pull requests
- `/console` - Terminal web interactiva para ejecutar comandos npm, git, etc
- `/preview` - Vista previa de aplicación con modos responsive (desktop/tablet/mobile)
- `/projects` - Gestión de proyectos generados
- `/settings` - Gestión de planes y métricas de uso
- `/sign-in`, `/sign-up` - Autenticación con Clerk

### Backend Architecture

**API Routes (Next.js)**:
- `/api/joxcoder/generate` - Generación de código con JoxCoder AI
- `/api/repository/connect` - Conectar GitHub/GitLab
- `/api/repository/list` - Listar repositorios
- `/api/repository/commit` - Crear commits automáticos
- `/api/repository/pull-request` - Crear pull requests
- `/api/terminal/execute` - Ejecutar comandos shell
- `/api/files/save` - Guardar archivos
- `/api/files/load` - Cargar archivos
- `/api/files/delete` - Eliminar archivos
- `/api/files/export` - Exportar proyecto como ZIP

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
│   ├── chat/          # Interfaz principal de generación (3 columnas)
│   ├── repository/    # GitHub/GitLab integration (FUNCIONAL)
│   ├── console/       # Terminal web interactiva (FUNCIONAL)
│   ├── preview/       # App preview con responsive modes
│   ├── settings/      # Planes y configuración
│   ├── projects/      # Proyectos generados
│   └── layout.tsx     # Dashboard layout
├── api/
│   ├── joxcoder/
│   │   └── generate/  # Endpoint de generación
│   ├── repository/
│   │   ├── connect/   # Conectar GitHub/GitLab
│   │   ├── list/      # Listar repos
│   │   ├── commit/    # Crear commits
│   │   └── pull-request/ # Crear PRs
│   ├── terminal/
│   │   └── execute/   # Ejecutar comandos
│   └── files/
│       ├── save/      # Guardar archivos
│       ├── load/      # Cargar archivos
│       ├── delete/    # Eliminar archivos
│       └── export/    # Exportar como ZIP
└── layout.tsx         # Root layout

components/
├── chat/
│   ├── code-editor.tsx      # Monaco editor
│   └── file-explorer.tsx    # Árbol de archivos
├── console/
│   └── web-terminal.tsx     # Terminal funcional
└── ui/
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx            # Nuevo
    └── progress.tsx

lib/
├── joxcoder/
│   ├── client.ts      # Cliente JoxCoder AI
│   ├── types.ts       # Tipos y límites
│   └── role-prompts.ts # Prompts especializados
├── stores/
│   ├── chat-store.ts  # Estado del chat
│   └── file-store.ts  # Estado de archivos
└── utils/
    └── file-system.ts # Utilidades de archivos
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

## Próximos Pasos Sugeridos

### Prioridad Alta
1. **Modelo JoxCoder AI** - Integrar cuando esté entrenado (6-7h)
2. **GitHub OAuth** - Implementar OAuth real en lugar de tokens manuales
3. **Convex Setup** - Activar database para persistencia de proyectos
4. **Stripe Integration** - Conectar pagos reales para suscripciones

### Funcionalidades Adicionales Recomendadas
5. **Code Templates** - Templates predefinidos por lenguaje y framework
6. **Project Sharing** - Compartir proyectos con otros usuarios
7. **Version History** - Historial de versiones con rollback
8. **Code Search** - Búsqueda inteligente en código generado
9. **AI Chat Assistant** - Chat para preguntas sobre el código
10. **Code Review** - Review automático con sugerencias
11. **Testing Generator** - Generar tests automáticamente
12. **Documentation Generator** - Generar README y docs
13. **Deployment Integration** - Vercel, Netlify, Railway
14. **Collaboration** - Edición colaborativa en tiempo real
15. **Code Snippets Library** - Biblioteca de snippets reutilizables
16. **Analytics Dashboard** - Métricas de uso y estadísticas
17. **API Access** - API REST para integración externa
18. **Webhooks** - Notificaciones de eventos (commits, PRs)
19. **Custom Themes** - Personalización de colores y tema
20. **Mobile App** - Versión móvil con React Native

## Recent Changes (Latest Session)

**Fecha:** 20/10/2025

**Sesión 1 - Infraestructura Base:**
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

**Sesión 2 - Nuevas Herramientas (UI):**
1. ✅ **Sidebar Actualizado** - Agregadas 3 nuevas opciones: Repository, Console, Preview
2. ✅ **Página /repository** - Integración GitHub/GitLab con:
   - Conexión de repositorios (OAuth pendiente)
   - Commits automáticos basados en generaciones
   - Pull requests inteligentes
   - Configuración de sincronización
3. ✅ **Página /console** - Terminal web interactiva con:
   - Placeholder funcional (xterm.js pendiente de integración completa)
   - Comandos rápidos (npm, git)
   - Controles de start/stop
4. ✅ **Página /preview** - Vista previa de aplicación con:
   - Modos responsive (desktop/tablet/mobile)
   - Iframe para visualización
   - Controles de recarga y compartir
5. ✅ **FileExplorer Component** - Sidebar de archivos en /chat con:
   - Árbol de archivos generados
   - Selección de archivos
   - Iconos por tipo de archivo
   - Estadísticas de archivos
6. ✅ **File Store (Zustand)** - Sistema de gestión de archivos con:
   - Add/Update/Delete archivos
   - Selección de archivo activo
   - Tracking de rol generador
   - Timestamps
7. ✅ **Chat Layout Rediseñado** - Nuevo layout de 3 columnas:
   - Izquierda (30%): Selector de roles + contexto + prompt
   - Centro (15%): FileExplorer con archivos generados
   - Derecha (55%): CodeEditor con archivo seleccionado
8. ✅ **Integración Automática** - Los archivos generados se agregan automáticamente al FileExplorer

**Sesión 3 - Backend Completo:**
1. ✅ **GitHub/GitLab API Integration** - Backend completo para repositorios:
   - `/api/repository/connect` - Conectar con GitHub/GitLab usando tokens
   - `/api/repository/list` - Listar repositorios del usuario
   - `/api/repository/commit` - Crear commits automáticos con archivos generados
   - `/api/repository/pull-request` - Crear PRs automáticos
   - Soporte para GitHub y GitLab
   - Validación de tokens y autenticación con Clerk
2. ✅ **Terminal Backend Real** - Ejecución de comandos:
   - `/api/terminal/execute` - Ejecutar comandos shell (npm, git, ls, etc.)
   - Whitelist de comandos por seguridad
   - Timeout de 30 segundos
   - Captura de stdout y stderr
3. ✅ **File Management API** - Persistencia de archivos:
   - `/api/files/save` - Guardar proyectos en filesystem
   - `/api/files/load` - Cargar proyectos existentes
   - `/api/files/delete` - Eliminar archivos
   - `/api/files/export` - Exportar proyecto como ZIP
   - Organización por usuario y proyecto
4. ✅ **Utilidades de Archivos** - `lib/utils/file-system.ts`:
   - Detección automática de lenguajes
   - Iconos por tipo de archivo
   - Creación de árboles de archivos
   - Generación de estructura de proyecto
5. ✅ **Frontend Actualizado** - Conexión con backend real:
   - Página /repository usa APIs reales de GitHub/GitLab
   - Terminal interactivo con ejecución real de comandos
   - Historial de comandos y navegación (↑/↓)
   - Auto-scroll y manejo de errores
6. ✅ **Dependencias Instaladas**:
   - @octokit/rest - GitHub API
   - fs-extra - File system operations
   - archiver - ZIP generation
   - Input component agregado

## Notes

- El modelo JoxCoder AI está en entrenamiento y se integrará cuando esté listo
- Mientras tanto, el sistema usa generación mock para demostrar la UI
- Clerk auth está funcionando correctamente
- Todos los componentes visuales están operativos
- La app está lista para conectar el modelo real cuando esté disponible
