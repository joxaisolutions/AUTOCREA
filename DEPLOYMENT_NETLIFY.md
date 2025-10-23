# Guía de Deployment en Netlify para AUTOCREA V2.0

## ⚠️ IMPORTANTE: Vercel es Recomendado

**Nota:** Vercel es la plataforma recomendada para Next.js ya que fue creada por el mismo equipo de Next.js y tiene mejor soporte para API Routes y Convex. Sin embargo, si prefieres usar Netlify, sigue estas instrucciones.

**Requisito:** Netlify automáticamente usa el plugin `@netlify/plugin-nextjs` para manejar correctamente SSR y API Routes de Next.js. El archivo `netlify.toml` está configurado para esto.

---

## Configuración de Variables de Entorno en Netlify

Antes de desplegar, debes configurar estas variables de entorno en Netlify Dashboard → Site Settings → Environment Variables:

### Variables Requeridas:

```bash
# Clerk Authentication (REQUERIDO)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Convex Database (REQUERIDO)
CONVEX_DEPLOYMENT=prod:...
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud

# IMPORTANTE: NO necesitas CONVEX_ADMIN_KEY para el build
# El comando `convex codegen` solo genera tipos, no hace deployment

# JoxCoder AI (Opcional por ahora)
JOXCODER_API_KEY=tu_api_key
JOXCODER_API_URL=https://api.joxcoder.com

# GitHub OAuth (Opcional)
GITHUB_TOKEN=ghp_...

# GitLab OAuth (Opcional)
GITLAB_TOKEN=glpat-...

# Stripe (Opcional - si usas Clerk Billing, no es necesario)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Configuración de Build en Netlify Dashboard

### 1. Build Settings:

- **Build command:** `npm run build:netlify`
- **Publish directory:** `.next`
- **Node version:** `20`

**Nota:** El comando `build:netlify` ejecuta `npx convex codegen && npm run build`, lo cual genera los tipos de TypeScript necesarios sin requerir credenciales de admin.

### 2. Deploy Settings:

- **Branch to deploy:** `main` (o la rama que uses)
- **Production branch:** `main`

---

## Pasos para Desplegar:

### 1. Configurar Convex para Producción:

```bash
# En tu terminal local, ejecuta:
npx convex deploy --prod

# Esto te dará:
# - CONVEX_DEPLOYMENT
# - NEXT_PUBLIC_CONVEX_URL
```

### 2. Agregar Variables de Entorno:

Ve a Netlify Dashboard → tu sitio → Site Settings → Environment Variables

Agrega TODAS las variables listadas arriba.

### 3. Hacer Deploy:

```bash
git add .
git commit -m "Configuración para Netlify deployment"
git push origin main
```

Netlify automáticamente detectará el push y comenzará el build.

---

## Troubleshooting

### Error: "Module not found: Can't resolve '@/convex/_generated/api'"

**Solución:** Asegúrate de que las variables `CONVEX_DEPLOYMENT` y `NEXT_PUBLIC_CONVEX_URL` estén configuradas en Netlify.

### Error: "Build failed"

**Solución:** 
1. Verifica que todas las variables de entorno estén configuradas
2. Asegúrate de que el build command sea `npm run build:netlify`
3. Revisa los logs de Netlify para ver el error específico

### Clerk: "Infinite redirect loop"

**Solución:** Asegúrate de que las URLs de redirect en Clerk Dashboard coincidan con tu dominio de Netlify:
- Authorized redirect URLs: `https://tu-sitio.netlify.app/*`
- Sign-in URL: `https://tu-sitio.netlify.app/sign-in`
- Sign-up URL: `https://tu-sitio.netlify.app/sign-up`

---

## Alternativa: Deployment en Vercel (Recomendado)

Si tienes problemas con Netlify, te recomendamos usar Vercel:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

Vercel tiene mejor integración con Next.js y Convex, por lo que el deployment es más sencillo.

---

## Checklist antes de Deploy:

- [ ] Variables de entorno configuradas en Netlify
- [ ] Convex desplegado en producción (`npx convex deploy --prod`)
- [ ] Clerk configurado con URLs de producción
- [ ] Build command: `npm run build:netlify`
- [ ] Publish directory: `.next`
- [ ] Node version: `20`

---

## Contacto

Si tienes problemas con el deployment, revisa los logs de Netlify o contacta al equipo de soporte.
