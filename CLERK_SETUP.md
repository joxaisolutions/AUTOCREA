# 🔐 Guía de Configuración - Clerk Authentication

## ¿Por Qué Clerk?

Clerk proporciona autenticación completa y segura sin que tengas que escribir código de seguridad. Incluye:

- ✅ Login/Signup con email + contraseña
- ✅ OAuth (Google, GitHub, Facebook, etc.)
- ✅ Magic Links (login sin contraseña)
- ✅ Verificación de email automática
- ✅ Gestión de sesiones
- ✅ Protección contra bots
- ✅ UI pre-diseñada y personalizable

---

## 🚀 Setup Paso a Paso

### Paso 1: Crear Cuenta en Clerk

1. Ve a: **https://clerk.com**
2. Click **"Sign Up"** o **"Get Started for Free"**
3. Crea tu cuenta usando:
   - Email + contraseña
   - O sign up con GitHub/Google (más rápido)
4. Verifica tu email si es necesario

---

### Paso 2: Crear Tu Primera Aplicación

1. **En el Dashboard de Clerk**, verás un prompt para crear tu primera aplicación
2. Click **"Add Application"** o **"Create Application"**

3. **Configurar la aplicación**:
   - **Application name**: `AUTOCREA V2.0`
   - **Sign-in methods** (selecciona los que quieras):
     - ✅ **Email** (recomendado - básico)
     - ✅ **Google** (recomendado - login rápido)
     - ✅ **GitHub** (opcional - para developers)
     - ✅ **Magic Links** (opcional - login sin contraseña)
   
4. Click **"Create Application"**

---

### Paso 3: Obtener API Keys

1. En tu dashboard de Clerk, deberías estar en la página de tu aplicación
2. En el menú lateral izquierdo, click **"API Keys"**
3. Verás dos secciones importantes:

   **Publishable Key** (clave pública):
   - Empieza con `pk_test_...` (development) o `pk_live_...` (production)
   - Esta key es segura para usar en el frontend
   - Click en el icono de **copiar** 📋

   **Secret Key** (clave secreta):
   - Empieza con `sk_test_...` (development) o `sk_live_...` (production)
   - Esta key es privada, NUNCA la expongas en el frontend
   - Click **"Show"** y luego copia

4. **Guarda ambas keys** - las necesitarás en el siguiente paso

---

### Paso 4: Configurar Variables de Entorno

#### En Desarrollo (Local)

1. Abre o crea el archivo `.env.local` en la raíz de tu proyecto

2. Agrega estas líneas:

```bash
# CLERK AUTHENTICATION
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ABC123...    # ← Pega tu Publishable Key
CLERK_SECRET_KEY=sk_test_XYZ789...                     # ← Pega tu Secret Key
```

3. **Importante**: El prefijo `NEXT_PUBLIC_` es necesario para que Next.js exponga la variable en el frontend

#### En Producción (Deployment)

Cuando despliegues tu app, necesitarás agregar estas mismas variables:

**Si usas Replit Deployments**:
1. Deployments → Tu deployment → Environment Variables
2. Agregar las dos variables

**Si usas Vercel**:
1. Dashboard → Tu proyecto → Settings → Environment Variables
2. Agregar las dos variables

**Si usas Railway**:
1. Tu proyecto → Variables
2. Agregar las dos variables

---

### Paso 5: Configurar Dominios Permitidos

**Muy Importante**: Clerk necesita saber qué dominios pueden usar tu autenticación.

1. En Clerk Dashboard, ve a **"Domains"** en el menú lateral
2. Verás dos secciones:

   **Development**:
   - Click **"Add domain"**
   - Agrega: `http://localhost:5000`
   - Esto permite que funcione en tu entorno local

   **Production** (cuando despliegues):
   - Click **"Add domain"**
   - Agrega tu dominio de producción:
     - Replit: `https://tu-proyecto.replit.app`
     - Vercel: `https://autocrea-v2.vercel.app`
     - Custom: `https://tudominio.com`

3. **Guarda los cambios**

---

### Paso 6: Verificar Configuración

1. **Reinicia tu servidor de desarrollo**:
   ```bash
   # Detén el servidor (Ctrl+C) y reinicia:
   npm run dev
   ```

2. **Abre tu app**: `http://localhost:5000`

3. **Prueba el login**:
   - Click **"Iniciar Sesión"** en la esquina superior derecha
   - Deberías ver el **formulario de Clerk** (con tu branding)
   - Si configuraste Google, verás el botón "Continue with Google"

4. **Crea una cuenta de prueba**:
   - Usa tu email personal
   - O usa Google/GitHub si los configuraste
   - Verifica tu email si es necesario

5. **Verifica que funcionó**:
   - ✅ Deberías ver tu perfil/avatar en la esquina superior derecha
   - ✅ Click en tu avatar debería mostrar opciones de cuenta
   - ✅ Puedes hacer logout y volver a entrar

---

## 🎨 Personalización (Opcional)

### Cambiar Colores y Branding

1. En Clerk Dashboard → **"Customization"** → **"Theme"**
2. Puedes personalizar:
   - Colores (para que coincidan con AUTOCREA - cyan/blue)
   - Logo
   - Favicon
   - Fuentes

### Ajustar Métodos de Sign-in

1. Clerk Dashboard → **"User & Authentication"** → **"Email, Phone, Username"**
2. Puedes:
   - Requerir verificación de email
   - Agregar número de teléfono
   - Permitir username en vez de solo email

### Configurar Social Logins

1. Clerk Dashboard → **"User & Authentication"** → **"Social Connections"**
2. Para cada proveedor (Google, GitHub, etc.):
   - Click **"Enable"**
   - Sigue las instrucciones para crear OAuth app
   - Agrega las credenciales

---

## 🔧 Integración con AUTOCREA

### Cómo Funciona

AUTOCREA ya tiene Clerk integrado. El código relevante está en:

1. **`app/layout.tsx`**:
   - Wrapper `<ClerkProvider>` que envuelve toda la app
   - Proporciona contexto de autenticación

2. **`middleware.ts`** (si existe):
   - Protege rutas privadas
   - Redirige usuarios no autenticados

3. **Componentes de UI**:
   - Botones de login/signup
   - Avatar de usuario
   - Menú de perfil

### Acceder a Datos del Usuario

En cualquier componente de React:

```typescript
import { useUser } from "@clerk/nextjs";

function MiComponente() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Cargando...</div>;
  
  if (!isSignedIn) return <div>Por favor inicia sesión</div>;

  return <div>Hola, {user.firstName}!</div>;
}
```

En API routes (backend):

```typescript
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Usuario autenticado, continuar...
}
```

---

## 🐛 Troubleshooting

### Error: "Clerk: Missing publishable key"

**Causa**: Falta la variable `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

**Solución**:
1. Verifica que esté en `.env.local`
2. Verifica que empiece con `NEXT_PUBLIC_` (obligatorio)
3. Reinicia el servidor: `npm run dev`

---

### Error: "Clerk: Invalid domain"

**Causa**: El dominio no está autorizado en Clerk

**Solución**:
1. Ve a Clerk Dashboard → Domains
2. Agrega `http://localhost:5000` en Development
3. Si estás en producción, agrega tu dominio de producción

---

### El formulario de Clerk no aparece

**Causa**: Problema con las keys o configuración

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca errores de Clerk
3. Verifica que ambas keys estén correctas en `.env.local`
4. Verifica que no haya espacios extras al copiar las keys

---

### Error de CORS en producción

**Causa**: Dominio de producción no configurado

**Solución**:
1. Clerk Dashboard → Domains → Production
2. Agrega tu dominio exacto (con https://)
3. Espera 1-2 minutos para que se propague

---

### Los usuarios pueden registrarse pero no hacer login

**Causa**: Verificación de email habilitada

**Solución**:
1. Revisa el email del usuario - debe tener un link de verificación
2. O desactiva verificación en: Clerk Dashboard → Email, Phone, Username → Email → Verification

---

## 📊 Plan Gratuito de Clerk

Clerk ofrece un plan gratuito generoso:

- ✅ **10,000 usuarios activos mensuales** (MAU)
- ✅ **Todos los métodos de autenticación**
- ✅ **OAuth social ilimitado**
- ✅ **Personalización completa**
- ✅ **Soporte de la comunidad**

Esto es **más que suficiente** para empezar y probar AUTOCREA.

---

## 🔐 Seguridad

### Mejores Prácticas

✅ **NUNCA** commitees `.env.local` a Git (ya está en `.gitignore`)
✅ **Rota las keys** si las expones accidentalmente
✅ **Usa keys de test** (`pk_test_`, `sk_test_`) en desarrollo
✅ **Usa keys de prod** (`pk_live_`, `sk_live_`) solo en producción
✅ **Habilita 2FA** en tu cuenta de Clerk

### Rotar Keys (Si Las Expusiste)

1. Clerk Dashboard → API Keys
2. Click **"Regenerate"** en la key comprometida
3. Actualiza inmediatamente en tu `.env.local` y deployment
4. Las keys antiguas dejarán de funcionar en minutos

---

## 📈 Monitoreo

### Ver Usuarios

1. Clerk Dashboard → **"Users"**
2. Verás lista de todos los usuarios registrados
3. Puedes:
   - Ver detalles de cada usuario
   - Banear usuarios
   - Forzar logout
   - Ver sesiones activas

### Analytics

1. Clerk Dashboard → **"Analytics"**
2. Verás:
   - Nuevos registros
   - Logins activos
   - Métodos de autenticación usados
   - Tasa de conversión

---

## 🎯 Checklist de Configuración

- [ ] ✅ Cuenta de Clerk creada
- [ ] ✅ Aplicación "AUTOCREA V2.0" creada
- [ ] ✅ Métodos de sign-in configurados (Email + Google)
- [ ] ✅ API Keys copiadas
- [ ] ✅ Variables agregadas a `.env.local`
- [ ] ✅ Dominio localhost agregado en Clerk
- [ ] ✅ Servidor reiniciado
- [ ] ✅ Login probado y funciona
- [ ] ✅ Usuario de prueba creado

---

## 🚀 Próximos Pasos

Una vez que Clerk esté configurado:

1. **Personaliza el branding** para que coincida con AUTOCREA
2. **Configura webhooks** para sincronizar con Convex (opcional)
3. **Agrega metadata** a usuarios (tokens, plan, etc.)
4. **Configura roles** si necesitas admin vs usuarios normales

---

## 📚 Recursos

- **Clerk Docs**: https://clerk.com/docs
- **Next.js Integration**: https://clerk.com/docs/quickstarts/nextjs
- **Dashboard**: https://dashboard.clerk.com
- **Support**: https://clerk.com/support

---

## ✨ ¡Listo!

Con Clerk configurado, AUTOCREA ahora tiene:

✅ Sistema de autenticación profesional
✅ Login/Signup seguro
✅ Gestión de sesiones
✅ OAuth con Google/GitHub
✅ UI pre-diseñada y personalizable

**¡Tu app está lista para tener usuarios reales!** 🎉
