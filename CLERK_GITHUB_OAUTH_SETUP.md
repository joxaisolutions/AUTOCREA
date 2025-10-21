# 🔐 Configuración de GitHub OAuth en Clerk

## 📋 Pasos para habilitar GitHub OAuth

### 1. Acceder a Clerk Dashboard

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com)
2. Selecciona tu aplicación **AUTOCREA V2.0**
3. En el menú lateral, ve a **Configure** → **SSO Connections**

### 2. Habilitar GitHub como Provider

1. Busca **GitHub** en la lista de Social Connections
2. Click en el toggle para habilitar GitHub
3. Marca **"Use custom credentials"** para usar tu propia OAuth App

### 3. Crear GitHub OAuth App

1. Ve a [GitHub Developer Settings](https://github.com/settings/developers)
2. Click en **OAuth Apps** → **New OAuth App**
3. Llena los campos:
   - **Application name**: `AUTOCREA V2.0`
   - **Homepage URL**: Tu URL de Replit (ej: `https://tu-repl.repl.co`)
   - **Application description**: `Plataforma de desarrollo con IA - Powered by JoxAI`
   - **Authorization callback URL**: (Copia este del Clerk Dashboard en el paso 4)

### 4. Configurar Credenciales en Clerk

1. En Clerk Dashboard, bajo GitHub settings, verás:
   - **Authorized redirect URI** - Cópialo
2. Pega este URI en tu GitHub OAuth App como **Authorization callback URL**
3. En GitHub, después de crear la app:
   - Copia el **Client ID**
   - Click **Generate a new client secret** y cópialo
4. Vuelve a Clerk Dashboard y pega:
   - **Client ID** de GitHub
   - **Client Secret** de GitHub
5. Click **Save**

### 5. Habilitar Scopes Necesarios

Asegúrate de que los siguientes scopes estén habilitados:
- ✅ `user` - Leer información del perfil
- ✅ `user:email` - Leer emails privados
- ✅ `repo` - Acceso completo a repositorios
- ✅ `read:org` - Leer membresía de organizaciones

### 6. Verificar Configuración

1. Ve a `/repository` en tu aplicación
2. Deberías ver el componente **GitHub OAuth** 
3. Click en **"Conectar con GitHub"**
4. Completa el flujo de autorización
5. Una vez conectado, verás tu perfil y estadísticas

---

## ✅ Qué hace esto

Una vez configurado, los usuarios podrán:

1. **Login automático** - Iniciar sesión con GitHub
2. **Acceso sin tokens** - No necesitan crear tokens personales manualmente
3. **Commits automáticos** - Hacer commits directamente desde AUTOCREA
4. **Pull Requests** - Crear PRs con un click
5. **Lista de Repos** - Ver todos sus repositorios automáticamente

---

## 🔧 Desarrollo vs Producción

### Desarrollo (Replit)
- **Callback URL**: `https://[tu-repl-url]/api/auth/callback/github`
- Usa la misma OAuth App o crea una para desarrollo

### Producción
- **Callback URL**: `https://[tu-dominio-produccion]/api/auth/callback/github`
- Crea una OAuth App separada para producción
- Actualiza las environment variables en tu plataforma de deployment

---

## 🚨 Troubleshooting

### "GitHub no conectado"
- Verifica que hayas completado el flujo OAuth
- Revisa que los scopes incluyan `repo` y `user`

### "Token no disponible"
- Clerk guarda el token en `publicMetadata`
- Verifica en Clerk Dashboard que el usuario tiene GitHub conectado

### "Callback URL mismatch"
- El callback URL en GitHub debe coincidir EXACTAMENTE con el de Clerk
- Incluye `https://` y no uses trailing slash

---

## 📚 Referencias

- [Clerk Social Connections](https://clerk.com/docs/authentication/social-connections/github)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
- [Clerk API Reference](https://clerk.com/docs/reference/backend-api)

---

## 🎯 Siguiente Paso

Una vez configurado GitHub OAuth, el sistema estará listo para:
1. ✅ Autenticación automática
2. ✅ Acceso a repositorios sin tokens manuales
3. ✅ Commits y PRs automáticos
4. ✅ Sincronización bidireccional

**La experiencia de usuario mejorará significativamente** al eliminar la fricción de tokens manuales.
