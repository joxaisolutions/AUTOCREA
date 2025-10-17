# 🚀 Guía Completa - Setup AUTOCREA V2.0

## 📋 Índice

1. [Configurar Relevance AI](#1-configurar-relevance-ai)
2. [Configurar Clerk Authentication](#2-configurar-clerk-authentication)
3. [Configurar Convex Database (Opcional)](#3-configurar-convex-database-opcional)
4. [Publicar Tu App](#4-publicar-tu-app)

---

## 1. Configurar Relevance AI

### Paso 1.1: Obtener API Key

1. Ve a: https://app.relevanceai.com
2. Inicia sesión o crea una cuenta
3. Ve a **Settings** → **API Keys**
4. Click en **"Create new secret key"**
5. Selecciona rol: **"Admin"**
6. Click **"Generate API key"**
7. **Copia y guarda** tu API key (no podrás verla después)

### Paso 1.2: Configurar Variables

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# RELEVANCE AI - Tu agente personalizado
RELEVANCE_AI_REGION=bcbe5a
RELEVANCE_AI_PROJECT_ID=72d29230-c441-4e89-81c2-1342f3968ad9
RELEVANCE_AI_API_KEY=tu_api_key_aqui    # ← Pega tu API key aquí
RELEVANCE_AI_AGENT_ID=ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7
```

### Paso 1.3: Verificar

```bash
npm run dev
# Ir a http://localhost:5000
# Click "Crear Mi Primera App"
# Describe un proyecto simple
# ✅ Si funciona, Relevance AI está configurado
```

---

## 2. Configurar Clerk Authentication

### Paso 2.1: Crear Cuenta en Clerk

1. Ve a: https://clerk.com
2. Click **"Sign Up"** o **"Get Started"**
3. Crea tu cuenta (puedes usar GitHub, Google, etc.)
4. Verifica tu email

### Paso 2.2: Crear Aplicación

1. En el dashboard de Clerk, click **"Add Application"**
2. **Nombre**: "AUTOCREA V2.0"
3. **Sign-in methods**: Selecciona los que quieras:
   - ✅ Email + Password
   - ✅ Google (recomendado)
   - ✅ GitHub (opcional)
   - ✅ Magic Links (opcional)
4. Click **"Create Application"**

### Paso 2.3: Obtener API Keys

1. En tu dashboard de Clerk, ve a **"API Keys"** en el menú lateral
2. Verás dos tipos de keys:
   - **Publishable key** (empieza con `pk_test_...`)
   - **Secret key** (empieza con `sk_test_...`)
3. Copia ambas keys

### Paso 2.4: Configurar en AUTOCREA

Agrega estas líneas a tu archivo `.env.local`:

```bash
# CLERK AUTHENTICATION
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_key_aqui
CLERK_SECRET_KEY=sk_test_tu_secret_aqui
```

### Paso 2.5: Configurar URLs (Importante)

1. En Clerk dashboard, ve a **"Domains"** → **"Development"**
2. Agrega tu URL de desarrollo: `http://localhost:5000`
3. Si estás en producción, agrega tu dominio de Replit o custom

### Paso 2.6: Verificar Clerk

```bash
# Reinicia el servidor
npm run dev

# Ir a http://localhost:5000
# Click "Iniciar Sesión" en la esquina superior derecha
# ✅ Deberías ver el formulario de Clerk
# Crea una cuenta de prueba
# ✅ Si funciona, Clerk está configurado
```

---

## 3. Configurar Convex Database (Opcional)

### Paso 3.1: Crear Cuenta en Convex

1. Ve a: https://www.convex.dev
2. Click **"Sign Up"** (puedes usar GitHub)
3. Verifica tu cuenta

### Paso 3.2: Crear Proyecto

```bash
# En tu terminal, desde la raíz del proyecto:
npx convex dev

# Sigue las instrucciones:
# 1. Selecciona "Create a new project"
# 2. Nombre: "autocrea-v2"
# 3. Team: Selecciona tu equipo o crea uno nuevo
```

### Paso 3.3: Copiar Variables

El comando anterior creará automáticamente un archivo `.env.local` con:

```bash
# CONVEX
CONVEX_DEPLOYMENT=dev:tu-deployment-aqui
NEXT_PUBLIC_CONVEX_URL=https://tu-deployment.convex.cloud
```

### Paso 3.4: Deploy Schema

```bash
# El schema ya está en /convex/schema.ts
# Convex lo detectará automáticamente

# Verifica en https://dashboard.convex.dev
# ✅ Deberías ver las tablas: users, projects, generations, apiKeys
```

---

## 4. Publicar Tu App

### Opción A: Publicar en Replit (Recomendado)

#### 4.1: Configurar Deployment

1. En Replit, click el botón **"Deployments"** (arriba a la derecha)
2. Click **"Create deployment"**
3. Selecciona:
   - **Type**: Autoscale Deployment
   - **Build command**: `npm run build` (ya está configurado)
   - **Run command**: `npm start` (ya está configurado)

#### 4.2: Agregar Variables de Entorno

En la sección **"Environment Variables"** del deployment:

```bash
# RELEVANCE AI
RELEVANCE_AI_REGION=bcbe5a
RELEVANCE_AI_PROJECT_ID=72d29230-c441-4e89-81c2-1342f3968ad9
RELEVANCE_AI_API_KEY=tu_api_key_aqui
RELEVANCE_AI_AGENT_ID=ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7

# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# CONVEX (si lo configuraste)
CONVEX_DEPLOYMENT=prod:tu-deployment-aqui
NEXT_PUBLIC_CONVEX_URL=https://tu-deployment.convex.cloud
```

#### 4.3: Deploy

1. Click **"Deploy"**
2. Espera 2-3 minutos
3. ✅ Tu app estará en: `https://tu-proyecto.replit.app`

#### 4.4: Configurar Clerk para Producción

1. Ve a Clerk dashboard → **"Domains"**
2. En **"Production"**, agrega: `https://tu-proyecto.replit.app`
3. Guarda cambios

---

### Opción B: Publicar en Vercel (Alternativa)

#### 4.1: Instalar Vercel CLI

```bash
npm i -g vercel
```

#### 4.2: Deploy

```bash
# Desde la raíz del proyecto:
vercel

# Sigue las instrucciones:
# 1. Link to existing project? No
# 2. What's your project's name? autocrea-v2
# 3. In which directory is your code located? ./
# 4. Want to override settings? No
```

#### 4.3: Agregar Variables en Vercel

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto
3. **Settings** → **Environment Variables**
4. Agrega las mismas variables que en Replit

#### 4.4: Re-deploy

```bash
vercel --prod
```

Tu app estará en: `https://autocrea-v2.vercel.app`

---

### Opción C: Publicar en Railway (Alternativa)

#### 4.1: Crear Cuenta

1. Ve a: https://railway.app
2. Sign up con GitHub

#### 4.2: Deploy desde GitHub

1. Push tu código a GitHub
2. En Railway: **"New Project"** → **"Deploy from GitHub repo"**
3. Selecciona tu repositorio

#### 4.3: Configurar Variables

En Railway dashboard:
1. Tu proyecto → **"Variables"**
2. Agrega todas las variables de entorno

#### 4.4: Deploy automático

Railway detectará Next.js y deployará automáticamente.

---

## 5. Verificación Final

### Checklist de Configuración

- [ ] ✅ Relevance AI configurado y funcionando
- [ ] ✅ Clerk authentication funcionando
- [ ] ✅ Convex database conectado (opcional)
- [ ] ✅ App desplegada en producción
- [ ] ✅ Variables de entorno configuradas en producción
- [ ] ✅ Clerk configurado con dominio de producción

### Probar Todo

1. **Autenticación**:
   - Ir a tu app → Iniciar sesión
   - Crear cuenta nueva
   - ✅ Logout y login de nuevo

2. **Generación de Apps**:
   - Click "Crear Mi Primera App"
   - Describe un proyecto simple
   - ✅ Observar proceso de generación
   - ✅ Ver código generado

3. **Persistencia**:
   - Crear un proyecto
   - Logout
   - Login de nuevo
   - ✅ El proyecto debe seguir ahí

---

## 6. Troubleshooting

### Error: "Clerk not initialized"

**Solución**:
```bash
# Verifica que ambas variables estén en .env.local:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Reinicia el servidor:
npm run dev
```

### Error: "Relevance AI timeout"

**Solución**:
- Simplifica tu prompt
- Verifica que tu agente funcione en Relevance AI dashboard
- Aumenta el timeout en `lib/api/relevance-client.ts`

### Error: "Convex connection failed"

**Solución**:
```bash
# Re-run Convex setup:
npx convex dev

# Verifica las variables en .env.local
```

### Error de CORS en producción

**Solución**:
1. Verifica que el dominio esté agregado en Clerk
2. Verifica que `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` use la key correcta (test vs prod)

---

## 7. Próximos Pasos

### Personalizar

1. **Cambiar colores**: Edita `tailwind.config.js`
2. **Agregar features**: Usa la estructura en `/app`
3. **Modificar agentes**: Edita `lib/api/relevance-client.ts`

### Optimizar

1. **Analytics**: Agrega Google Analytics o Plausible
2. **SEO**: Edita metadata en `app/layout.tsx`
3. **Performance**: Optimiza imágenes y código

### Monetizar

1. **Stripe**: Para pagos de tokens
2. **Subscripciones**: Planes Pro/Enterprise
3. **API Access**: Vende acceso a tu API

---

## 🎉 ¡Felicidades!

Tu AUTOCREA V2.0 está completamente configurada y publicada. Ahora puedes:

✅ Generar aplicaciones con IA
✅ Autenticar usuarios con Clerk
✅ Guardar proyectos en Convex
✅ Compartir tu app con el mundo

**¿Necesitas ayuda?** Revisa la documentación en:
- `RELEVANCE_AI_SETUP.md`
- `RELEVANCE_AI_INTEGRATION_SUMMARY.md`
- `README.md`
