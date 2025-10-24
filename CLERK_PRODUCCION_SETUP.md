# 🔧 Configuración de Clerk para Producción (autocrea.joxai.org)

## Problema Actual
Clerk con Production Keys no está funcionando en tu dominio `autocrea.joxai.org`.

---

## ✅ Solución Paso a Paso

### 1. Configurar Dominio en Clerk Dashboard

1. **Ve a Clerk Dashboard**: https://dashboard.clerk.com

2. **Selecciona tu aplicación** "AUTOCREA V2.0"

3. **Asegúrate de estar en modo "Production"** (selector arriba a la derecha)

4. **Ve a "Domains"** en el menú lateral

5. **Agregar Dominio de Producción**:
   - En la sección **"Production domains"**
   - Click en **"Add domain"**
   - Agrega: `autocrea.joxai.org`
   - Click en **"Save"**

---

### 2. Configurar URLs de Redirect

1. **En Clerk Dashboard**, ve a **"Paths"** (o "Account Portal")

2. **Configura las URLs**:
   
   **Sign-in URL**:
   ```
   https://autocrea.joxai.org/sign-in
   ```
   
   **Sign-up URL**:
   ```
   https://autocrea.joxai.org/sign-up
   ```
   
   **After sign-in URL** (redirect después de login):
   ```
   https://autocrea.joxai.org/dashboard
   ```
   
   **After sign-up URL** (redirect después de registro):
   ```
   https://autocrea.joxai.org/dashboard
   ```

3. **Authorized redirect URLs** (si aparece esta opción):
   ```
   https://autocrea.joxai.org/*
   ```

---

### 3. Verificar Production Keys

1. **En Clerk Dashboard**, ve a **"API Keys"**

2. **Asegúrate de estar en "Production"** (selector arriba)

3. **Copia las Production Keys**:
   - `Publishable key` (comienza con `pk_live_...`)
   - `Secret key` (comienza con `sk_live_...`)

4. **Verifica que estas sean las keys que tienes en tu servidor de producción**

---

### 4. Configurar Variables de Entorno en tu Servidor

Dependiendo de dónde esté desplegada tu aplicación (Netlify, Vercel, otro):

**Variables requeridas**:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_... # Production key
CLERK_SECRET_KEY=sk_live_...                   # Production secret
NEXT_PUBLIC_APP_URL=https://autocrea.joxai.org
```

#### Si usas Netlify:
- Ve a **Netlify Dashboard** → Tu sitio → **Site Settings** → **Environment Variables**
- Agrega/actualiza las variables de arriba

#### Si usas Vercel:
- Ve a **Vercel Dashboard** → Tu proyecto → **Settings** → **Environment Variables**
- Agrega/actualiza las variables de arriba

---

### 5. Configurar CORS y Allowed Origins

1. **En Clerk Dashboard**, ve a **"Security"** o **"Advanced"**

2. **Busca "Allowed Origins"** o "CORS"

3. **Agrega tu dominio**:
   ```
   https://autocrea.joxai.org
   ```

---

### 6. Verificar Configuración de DNS

Asegúrate de que tu dominio `autocrea.joxai.org` esté correctamente apuntando a tu servidor:

```bash
# Verifica que tu DNS esté correcto
nslookup autocrea.joxai.org
```

Tu dominio debe apuntar a:
- **Netlify**: Registro CNAME a tu sitio de Netlify
- **Vercel**: Registro A o CNAME según te indique Vercel

---

### 7. Configuración en el Código (si es necesario)

Si has hardcodeado alguna URL, actualiza:

**En `middleware.ts`** (verificar):
```typescript
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

**En `next.config.js`** (si existe configuración de dominios):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Asegúrate de no tener restricciones de dominio aquí
}

module.exports = nextConfig
```

---

## 🔍 Verificación

Después de configurar todo:

1. **Limpia caché de Clerk**:
   - Espera 2-3 minutos después de hacer cambios
   - Clerk necesita tiempo para propagar los cambios

2. **Prueba tu sitio**:
   - Ve a `https://autocrea.joxai.org`
   - Abre DevTools (F12) → Console
   - No debe haber errores de Clerk

3. **Prueba Sign-up**:
   - Ve a `https://autocrea.joxai.org/sign-up`
   - Crea una cuenta de prueba
   - Verifica que funcione

---

## ❌ Errores Comunes y Soluciones

### Error: "This application's Clerk publishable key is invalid"

**Causa**: La key de Clerk no está configurada correctamente o no coincide con el dominio.

**Solución**:
1. Verifica que estés usando `pk_live_...` (Production key)
2. Verifica que el dominio esté en Clerk Dashboard → Domains
3. Espera 2-3 minutos y vuelve a intentar

---

### Error: "Redirect URI mismatch"

**Causa**: Las URLs de redirect no coinciden con las configuradas en Clerk.

**Solución**:
1. Ve a Clerk Dashboard → Paths
2. Verifica que todas las URLs usen `https://autocrea.joxai.org`
3. Agrega `https://autocrea.joxai.org/*` a Authorized redirect URLs

---

### Error: "CORS policy blocked"

**Causa**: El dominio no está en la lista de allowed origins.

**Solución**:
1. Ve a Clerk Dashboard → Security
2. Agrega `https://autocrea.joxai.org` a Allowed Origins
3. Espera 2-3 minutos

---

## 📝 Checklist Final

Antes de declarar que Clerk está funcionando:

- [ ] Dominio `autocrea.joxai.org` agregado a Clerk → Domains → Production
- [ ] URLs de redirect configuradas con `https://autocrea.joxai.org`
- [ ] Production Keys (`pk_live_...` y `sk_live_...`) en variables de entorno
- [ ] `NEXT_PUBLIC_APP_URL=https://autocrea.joxai.org` configurado
- [ ] Allowed Origins incluye `https://autocrea.joxai.org`
- [ ] DNS apuntando correctamente al servidor
- [ ] Sin errores de Clerk en la consola del navegador
- [ ] Sign-up y Sign-in funcionando

---

## 🆘 Si Sigue Sin Funcionar

Si después de seguir todos estos pasos Clerk sigue sin funcionar:

1. **Captura de pantalla**:
   - Abre DevTools (F12) en `https://autocrea.joxai.org`
   - Ve a la pestaña "Console"
   - Toma screenshot del error exacto de Clerk

2. **Verifica logs del servidor**:
   - Si usas Netlify: Ve a Deploy logs
   - Si usas Vercel: Ve a Function logs
   - Busca errores relacionados con Clerk

3. **Contacta a Clerk Support**:
   - https://clerk.com/support
   - Proporciona:
     - Dominio: `autocrea.joxai.org`
     - Error exacto de la consola
     - Screenshots

---

**Última actualización**: 24 de Octubre, 2025  
**Dominio**: autocrea.joxai.org
