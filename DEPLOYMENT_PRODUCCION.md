# 🚀 Deployment de AUTOCREA V2.0 a Producción (autocrea.joxai.org)

## Objetivo
Desplegar AUTOCREA V2.0 a tu dominio de producción `autocrea.joxai.org` con Clerk funcionando correctamente.

---

## 📋 Requisitos Previos

1. **Dominio**: `autocrea.joxai.org` configurado
2. **Servidor**: Netlify, Vercel, o tu propio servidor
3. **Clerk**: Cuenta con Production Keys
4. **Convex**: Base de datos configurada
5. **Código**: Repositorio en GitHub/GitLab

---

## 🎯 Opción 1: Deployment en Netlify (Recomendado si ya tienes configurado)

### Paso 1: Configurar Variables de Entorno en Netlify

1. **Ve a Netlify Dashboard**: https://app.netlify.com
2. Selecciona tu sitio de AUTOCREA
3. Ve a **Site Settings** → **Environment Variables**
4. Agrega estas variables:

```bash
# Clerk (Production Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Convex
NEXT_PUBLIC_CONVEX_URL=https://kindhearted-cormorant-798.convex.cloud
CONVEX_DEPLOYMENT=prod:kindhearted-cormorant-798
CONVEX_DEPLOY_KEY=prod:xxxxxxxxxxxxx

# App URL
NEXT_PUBLIC_APP_URL=https://autocrea.joxai.org

# JoxCoder (cuando esté listo)
JOXCODER_API_ENDPOINT=https://api.joxcoder.ai/v1
JOXCODER_API_KEY=tu_api_key_secreta
```

### Paso 2: Configurar Build Settings

En **Site Settings** → **Build & Deploy** → **Build Settings**:

- **Build command**: `npm run build:netlify`
- **Publish directory**: `.next`
- **Node version**: `20`

### Paso 3: Configurar Dominio Personalizado

1. En Netlify Dashboard → **Domain Management**
2. **Add custom domain**: `autocrea.joxai.org`
3. Netlify te dará instrucciones DNS:
   - Si tienes acceso completo al DNS: Agregar registro CNAME
   - Si solo subdominios: Configurar según instrucciones

**Ejemplo de configuración DNS**:
```
Type: CNAME
Name: autocrea
Value: tu-sitio.netlify.app
TTL: 3600
```

### Paso 4: Configurar SSL/HTTPS

Netlify automáticamente configura SSL con Let's Encrypt. Solo verifica que esté activado:
- Ve a **Domain Management** → **HTTPS**
- Asegúrate de que "HTTPS" esté habilitado

### Paso 5: Deploy

```bash
git add .
git commit -m "Configuración para producción"
git push origin main
```

Netlify automáticamente detectará el push y hará el deploy.

---

## 🎯 Opción 2: Deployment en Vercel (Más fácil para Next.js)

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Configurar Variables de Entorno

Crea un archivo `.env.production` (NO lo subas a Git):

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Convex
NEXT_PUBLIC_CONVEX_URL=https://kindhearted-cormorant-798.convex.cloud
CONVEX_DEPLOYMENT=prod:kindhearted-cormorant-798
CONVEX_DEPLOY_KEY=prod:xxxxxxxxxxxxx

# App URL
NEXT_PUBLIC_APP_URL=https://autocrea.joxai.org

# JoxCoder
JOXCODER_API_ENDPOINT=https://api.joxcoder.ai/v1
JOXCODER_API_KEY=tu_api_key_secreta
```

### Paso 3: Configurar Dominio en Vercel

1. **Hacer el deploy inicial**:
```bash
vercel --prod
```

2. **Agregar dominio personalizado**:
   - Ve a Vercel Dashboard
   - Selecciona tu proyecto
   - Ve a **Settings** → **Domains**
   - Agrega: `autocrea.joxai.org`
   - Vercel te dará la configuración DNS

**Ejemplo de configuración DNS**:
```
Type: A
Name: autocrea
Value: 76.76.21.21 (IP de Vercel)
TTL: 3600
```

### Paso 4: Agregar Variables de Entorno en Vercel Dashboard

1. Ve a **Settings** → **Environment Variables**
2. Agrega todas las variables del archivo `.env.production`
3. Selecciona **"Production"** como scope

### Paso 5: Redeploy

```bash
vercel --prod
```

---

## 🔧 Configuración de Clerk para Producción

**Archivo separado con instrucciones detalladas**: `CLERK_PRODUCCION_SETUP.md`

### Resumen rápido:

1. **Clerk Dashboard** → Tu aplicación → **Domains**:
   - Agregar: `autocrea.joxai.org` (Production)

2. **Paths**:
   - Sign-in: `https://autocrea.joxai.org/sign-in`
   - Sign-up: `https://autocrea.joxai.org/sign-up`
   - After sign-in: `https://autocrea.joxai.org/dashboard`

3. **Security** → **Allowed Origins**:
   - Agregar: `https://autocrea.joxai.org`

4. **API Keys** (Production):
   - Usar `pk_live_...` y `sk_live_...`

---

## 🔒 Configuración de Convex para Producción

### Paso 1: Deploy a Producción

```bash
npx convex deploy --prod
```

Esto te dará:
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`

### Paso 2: Obtener Deploy Key

**Opción A** (Recomendado):
1. Ve a https://dashboard.convex.dev
2. Selecciona tu proyecto
3. **Settings** → **Deploy Keys**
4. Copia el Deploy Key de producción

**Opción B** (Terminal):
```bash
npx convex deploy --cmd 'echo $CONVEX_DEPLOY_KEY'
```

### Paso 3: Agregar Variables al Servidor

Agrega estas tres variables a Netlify/Vercel:
```
CONVEX_DEPLOYMENT=prod:kindhearted-cormorant-798
NEXT_PUBLIC_CONVEX_URL=https://kindhearted-cormorant-798.convex.cloud
CONVEX_DEPLOY_KEY=prod:xxxxxxxxxxxxx
```

---

## 🎨 Verificar Configuración del Código

### 1. Archivo `.env.local` (solo desarrollo)

Este archivo NO debe ir a producción. Verifica que esté en `.gitignore`:

```bash
# .gitignore
.env.local
.env.production
```

### 2. Configuración de Next.js

**next.config.js**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Sin restricciones de dominio
}

module.exports = nextConfig
```

### 3. Middleware de Clerk

**middleware.ts** ya está configurado correctamente:
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/clerk(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

---

## ✅ Checklist de Deployment

### Antes de Deploy:

- [ ] Variables de entorno configuradas en Netlify/Vercel
- [ ] Clerk configurado con dominio `autocrea.joxai.org`
- [ ] Convex deployed a producción
- [ ] DNS configurado correctamente
- [ ] SSL/HTTPS habilitado
- [ ] `.gitignore` incluye `.env.local` y `.env.production`

### Después de Deploy:

- [ ] Sitio carga en `https://autocrea.joxai.org`
- [ ] Sin errores en la consola del navegador
- [ ] Clerk funcionando (sign-up y sign-in)
- [ ] Convex conectado (verificar en dashboard)
- [ ] Webhooks de Clerk funcionando

---

## 🐛 Troubleshooting

### Problema: "Site not found"

**Solución**: Verifica configuración DNS. Puede tardar hasta 48h en propagarse.

```bash
# Verificar DNS
nslookup autocrea.joxai.org
```

---

### Problema: Clerk error "Invalid publishable key"

**Solución**: 
1. Verifica que uses `pk_live_...` (Production)
2. Verifica variables de entorno en Netlify/Vercel
3. Ver `CLERK_PRODUCCION_SETUP.md` para más detalles

---

### Problema: "Module not found: @/convex/_generated/api"

**Solución**:
1. Verifica que `CONVEX_DEPLOY_KEY` esté en variables de entorno
2. Verifica que build command sea `npm run build:netlify`
3. Revisa logs de build para errores de Convex

---

### Problema: Redirección infinita en login

**Solución**:
1. Clerk Dashboard → Paths
2. Verifica que todas las URLs sean `https://autocrea.joxai.org`
3. Verifica que Authorized redirect URLs incluya `https://autocrea.joxai.org/*`

---

## 📞 Soporte

Si tienes problemas:

1. **Logs del servidor**:
   - Netlify: Deploy logs
   - Vercel: Function logs

2. **Consola del navegador**:
   - F12 → Console
   - Buscar errores de Clerk, Convex, o Next.js

3. **Contacto**:
   - Clerk: https://clerk.com/support
   - Convex: https://convex.dev/community
   - Netlify: https://www.netlify.com/support/
   - Vercel: https://vercel.com/support

---

**Última actualización**: 24 de Octubre, 2025  
**Dominio de producción**: autocrea.joxai.org
