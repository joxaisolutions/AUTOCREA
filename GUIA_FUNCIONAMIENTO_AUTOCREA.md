# 📘 Guía de Funcionamiento Completo de AUTOCREA V2.0

## Índice
1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Interfaz Principal](#interfaz-principal)
4. [Generación de Código](#generación-de-código)
5. [Gestión de Proyectos](#gestión-de-proyectos)
6. [Integraciones](#integraciones)
7. [Preview y Testing](#preview-y-testing)
8. [Planes y Facturación](#planes-y-facturación)
9. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

AUTOCREA V2.0 es una plataforma autónoma de desarrollo potenciada por **JoxCoder AI**, un modelo de inteligencia artificial multi-rol especializado en generación de código profesional. Con AUTOCREA puedes transformar ideas en aplicaciones completas, listas para producción, en cuestión de minutos.

### ¿Qué hace AUTOCREA diferente?

- **JoxCoder AI Propio**: No dependes de APIs externas. Modelo entrenado específicamente para desarrollo.
- **12 Roles Técnicos Especializados**: Desde arquitectura hasta blockchain.
- **100% Autónomo**: De la idea al código completo sin intervención manual.
- **Integración Completa**: GitHub, GitLab, Clerk Auth, Convex Database.
- **Preview en Tiempo Real**: Ve cómo se construye tu aplicación paso a paso.

---

## Primeros Pasos

### 1. Registro y Onboarding

1. Visita [AUTOCREA](https://autocrea.joxai.org)
2. Haz clic en **"Comenzar Gratis"**
3. Regístrate con:
   - Email y contraseña
   - GitHub OAuth
   - Google OAuth
   - Apple ID

4. **Onboarding Interactive**: Aparecerá un tutorial de 4 pasos que te explicará:
   - Cómo funciona AUTOCREA
   - Los 12 roles técnicos disponibles
   - Cómo generar tu primera aplicación
   - Conectar integraciones (GitHub/GitLab)

5. **Plan Free Trial**: Automáticamente recibes **1,000 tokens gratis** para comenzar.

### 2. Configuración Inicial

Después del onboarding, configura tu cuenta:

1. Ve a **Configuración** (icono de engranaje en el sidebar)
2. Completa tu perfil
3. Conecta GitHub o GitLab (opcional pero recomendado)
4. Configura APIs externas si lo deseas (OpenAI, Anthropic)

---

## Interfaz Principal

### Dashboard Layout

El dashboard de AUTOCREA está dividido en secciones clave:

#### **Sidebar (Barra Lateral)**

- **Chat**: Interfaz principal de generación de código
- **Proyectos**: Gestiona todas tus aplicaciones generadas
- **GitHub/GitLab**: Conecta y gestiona repositorios
- **Consola**: Terminal interactiva para ejecutar comandos
- **Preview App**: Vista previa en Desktop/Tablet/Mobile
- **Configuración**: Gestiona tu cuenta y suscripción

#### **Header (Cabecera)**

- **Logo AUTOCREA**: Clic para ir a inicio
- **Token Balance**: Muestra tokens disponibles del mes actual
- **Comprar Tokens**: Acceso rápido a upgrade de plan
- **User Button**: Perfil y ajustes de Clerk

#### **Botón "Volver al Inicio"**

En cualquier página del dashboard, puedes regresar al landing page sin cerrar sesión usando el botón con icono de casa en el sidebar.

---

## Generación de Código

### Paso 1: Seleccionar Rol Técnico

AUTOCREA ofrece **12 roles especializados**:

| Rol | Especialidad | Casos de Uso |
|-----|-------------|--------------|
| **Architect** | Diseño de sistemas y arquitectura técnica | Aplicaciones enterprise, microservicios |
| **Fullstack** | Frontend + Backend completo | MVPs, SaaS, e-commerce |
| **Frontend** | React, Next.js, UI/UX | Landing pages, dashboards |
| **Backend** | APIs, bases de datos, lógica de negocio | APIs REST, GraphQL |
| **DevOps** | CI/CD, Docker, deployment | Pipelines, infraestructura |
| **Security** | Auditoría, código seguro | Pentesting, compliance |
| **QA Engineer** | Testing automatizado, TDD | Suites de tests |
| **Data Engineer** | Pipelines de datos, ETL | Data warehouses |
| **ML Engineer** | Machine Learning, MLOps | Modelos predictivos |
| **Pentester** | Penetration testing | Análisis de vulnerabilidades |
| **Mobile Dev** | React Native, Flutter | Apps móviles |
| **Blockchain Dev** | Solidity, Web3, Smart Contracts | dApps, NFTs |

**Cómo seleccionar:**
1. Ve a **Chat**
2. Elige el rol del selector de 12 opciones
3. Lee la descripción del rol seleccionado

### Paso 2: Describir tu Proyecto

En la sección **"Contexto del Proyecto"**:

```
Nombre del Proyecto: Mi App SaaS
Descripción General: Plataforma de gestión de tareas con autenticación, 
dashboard de usuario, y API REST
```

### Paso 3: Escribir el Prompt

En el chat, describe específicamente qué código necesitas:

**Ejemplo de Prompt (Fullstack):**
```
Crea una aplicación Next.js 14 con:
- Autenticación con Clerk
- Dashboard con lista de tareas
- API routes para CRUD de tareas
- Base de datos con Convex
- Diseño con Tailwind CSS y glassmorphism
- Responsive para mobile y desktop
```

### Paso 4: Generar Código

1. Haz clic en **"Generar Código"**
2. JoxCoder AI procesará tu solicitud (10-30 segundos)
3. El código aparecerá en el **Editor de Código** (Monaco Editor)
4. Los **archivos generados** se organizarán automáticamente en carpetas

### Paso 5: Revisar y Editar

- **File Explorer**: Navega entre archivos generados
- **Code Editor**: Edita directamente en Monaco Editor
- **Token Usage**: Ve cuántos tokens consumió esta generación

---

## Gestión de Proyectos

### Crear Nuevo Proyecto

1. Ve a **Proyectos**
2. Clic en **"+ Nuevo Proyecto"**
3. Completa:
   - Nombre
   - Descripción
   - Rol técnico
   - Framework (opcional)

4. Guarda y comienza a generar código

### Ver Proyectos Existentes

En la sección **Proyectos** verás:

- **Nombre del proyecto**
- **Rol utilizado**
- **Fecha de creación**
- **Archivos generados**
- **Botón "Ver Código"**: Abre el editor
- **Botón "Ver en GitHub"**: Si está conectado

### Proyectos Demo

AUTOCREA incluye **proyectos de demostración** para que veas ejemplos reales de lo que JoxCoder puede crear.

---

## Integraciones

### GitHub Integration

#### Conectar GitHub

1. Ve a **GitHub / GitLab** en el sidebar
2. Clic en **"Conectar GitHub"**
3. Autoriza a AUTOCREA en GitHub OAuth
4. Selecciona repositorios a los que darás acceso

#### Auto-Commit

**Cuando generas código, AUTOCREA automáticamente:**

1. Organiza archivos en carpetas y subcarpetas
2. Crea un commit con mensaje descriptivo:
   ```
   feat: Add user authentication with Clerk
   - Created auth pages
   - Added middleware protection
   - Configured environment variables
   ```
3. Push al repositorio conectado

#### Pull Requests

Crea pull requests directamente desde AUTOCREA:

1. Genera código
2. Clic en **"Crear Pull Request"**
3. Escribe descripción
4. Selecciona branch base
5. Envía PR a GitHub

### GitLab Integration

Similar a GitHub, con soporte para:
- Repositorios GitLab
- Commits automáticos
- Merge requests

### Convex Database

AUTOCREA usa **Convex** como base de datos compartida con el Admin Portal de JoxAI.

**Qué almacena:**
- Usuarios y autenticación (Clerk sync)
- Proyectos generados
- Historial de generaciones
- Token usage mensual
- Archivos del proyecto
- Commits y cambios

**Sincronización automática:**
- Al generar código → Se guarda en Convex
- Al cambiar de plan → Se actualiza límite de tokens
- Al crear proyecto → Se persiste en DB

---

## Preview y Testing

### Preview App

La sección **Preview App** te permite ver tu aplicación en tiempo real:

#### Modos de Vista

1. **Desktop** (1920x1080): Vista completa de escritorio
2. **Tablet** (768x1024): Vista de tablet en portrait/landscape
3. **Mobile** (375x667): Vista de smartphone

#### Funciones

- **Recargar**: Refresh manual del preview
- **Compartir**: Genera URL pública temporal
- **Abrir en Nueva Pestaña**: Vista standalone
- **Responsive Toggle**: Cambia entre modos

#### Información del Preview

- **Modo Actual**: Desktop/Tablet/Mobile
- **Resolución**: Ancho x Alto en píxeles
- **Hot Reload**: Estado de conexión (Activo/Desconectado)

### Consola Interactive

Terminal web para ejecutar comandos:

```bash
# Instalar dependencias
npm install

# Ejecutar dev server
npm run dev

# Ejecutar build
npm run build

# Ver estado de git
git status
```

**Comandos Básicos Disponibles:**
- `npm install`, `npm run dev`
- `git status`, `git log`
- `npx`, `yarn`, `pnpm`

---

## Planes y Facturación

### Planes Disponibles

AUTOCREA usa **Clerk Billing** para gestionar suscripciones:

#### 1. Free Trial ($0/mes)
- 1,000 tokens/mes
- 1 proyecto activo
- Todas las features básicas
- Community support

#### 2. Creator ($29/mes)
- 10,000 tokens/mes
- 5 proyectos activos
- GitHub integration
- Priority support

#### 3. Pro ($79/mes)
- 30,000 tokens/mes
- 20 proyectos activos
- GitHub + GitLab integration
- API access
- Team collaboration
- Advanced analytics
- Dedicated support

#### 4. Enterprise (Custom)
- Tokens ilimitados
- Proyectos ilimitados
- Enterprise support
- SSO (Single Sign-On)
- SLA guarantee
- Custom integrations

### Cambiar de Plan

1. Ve a **Configuración**
2. Sección **"Gestión de Suscripción"**
3. Clic en **"Ver Todos los Planes"**
4. Selecciona el plan deseado
5. Completa checkout con Clerk Billing

### Token Management

**¿Qué son los tokens?**

Los tokens miden el consumo de recursos de JoxCoder AI. Cada generación de código consume tokens dependiendo de:
- Complejidad del prompt
- Cantidad de código generado
- Rol técnico seleccionado

**Cómo ver tu consumo:**

1. **Header**: Badge con tokens restantes
2. **Configuración**: Gráfico de uso mensual
3. **Alerta**: Notificación al 80% de consumo

**Renovación:**

- Tokens se resetean el **1er día de cada mes**
- Upgrade de plan → Acceso inmediato a más tokens
- Enterprise → Tokens ilimitados

---

## Preguntas Frecuentes

### ¿Necesito conocimientos de programación?

No es estrictamente necesario, pero ayuda. AUTOCREA está diseñado para:
- **Developers**: Acelerar desarrollo con IA
- **Non-developers**: Crear MVPs rápidamente

### ¿El código generado es production-ready?

Sí. JoxCoder AI está entrenado para generar código que sigue:
- Best practices de la industria
- Patrones de diseño probados
- Seguridad y performance optimizados
- Testing automatizado (cuando aplique)

### ¿Puedo editar el código generado?

¡Por supuesto! El código es 100% tuyo. Puedes:
- Editarlo directamente en AUTOCREA
- Exportarlo a tu máquina local
- Modificarlo en tu editor favorito (VS Code, WebStorm)

### ¿AUTOCREA reemplaza a los developers?

No. AUTOCREA es una **herramienta de productividad** que:
- Acelera tareas repetitivas
- Genera boilerplate code
- Ayuda con arquitectura inicial
- Automatiza setup de proyectos

Los developers siguen siendo necesarios para:
- Lógica de negocio compleja
- Decisiones arquitectónicas críticas
- Code reviews y optimización
- Mantenimiento a largo plazo

### ¿Mis datos están seguros?

Sí. AUTOCREA usa:
- **Clerk** para autenticación (SOC 2 Type II)
- **Convex** para database (encriptación en reposo)
- **HTTPS** para todas las comunicaciones
- **GitHub OAuth** (no almacenamos contraseñas)

### ¿Puedo cancelar mi suscripción?

Sí, en cualquier momento:
1. Ve a **Configuración**
2. Clic en tu avatar (UserButton)
3. Tab **"Billing"**
4. **"Cancel Subscription"**

Mantendrás acceso hasta el final del período facturado.

### ¿Hay límite de generaciones?

No directamente. El límite es por **tokens consumidos**. Puedes generar tanto código como quieras mientras tengas tokens disponibles.

### ¿Soporte técnico?

- **Free**: Community support (Discord, FAQ)
- **Creator**: Priority email support
- **Pro**: Dedicated support (24-48h response)
- **Enterprise**: SLA guaranteed (sub-4h response)

---

## Próximos Pasos

1. **Explora la Guía Técnica** para entender la arquitectura interna
2. **Lee la Guía de Integración de JoxCoder API** si quieres usar AUTOCREA en tus propios proyectos
3. **Únete a la comunidad** en Discord para tips y mejores prácticas

---

**¿Preguntas?** Contacta a: support@joxai.org

**Powered by JoxAI** 🚀
