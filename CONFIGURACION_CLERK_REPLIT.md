# ⚠️ CONFIGURACIÓN CRÍTICA DE CLERK PARA REPLIT

## Problema Actual

La aplicación está presentando el error: `"Failed to load Clerk"` porque Clerk no reconoce el dominio de Replit.

## Solución (PASO OBLIGATORIO)

Debes agregar el dominio de Replit a Clerk Dashboard:

### 1. Ir a Clerk Dashboard
Accede a: https://dashboard.clerk.com

### 2. Seleccionar tu Aplicación
- Selecciona el proyecto "AUTOCREA V2.0" (o como lo hayas nombrado)

### 3. Configurar Dominios Permitidos
1. En el menú lateral, haz clic en **"Domains"**
2. En la sección **"Development domains"**, click **"Add domain"**
3. Agrega esta URL EXACTA:
   ```
   https://ee6ca176-ead0-4433-b438-0cbd5401deb1-00-1sghrbpy78nyi.picard.replit.dev
   ```
4. Haz clic en **"Save"** o **"Add"**

### 4. Verificar la Configuración

Una vez agregado el dominio, espera 1-2 minutos y recarga la aplicación. Clerk debería funcionar correctamente.

## ¿Por Qué Es Necesario?

Clerk requiere que todos los dominios donde se ejecuta tu aplicación estén explícitamente autorizados por razones de seguridad. Esto previene ataques de phishing y clonación de tu aplicación.

## Dominios a Configurar

### Para Development (Replit):
```
https://ee6ca176-ead0-4433-b438-0cbd5401deb1-00-1sghrbpy78nyi.picard.replit.dev
```

### Para Production (Netlify - ya configurado):
El dominio de Netlify que mencionaste ya debería estar configurado.

## Variables de Entorno Actuales

Las siguientes variables ya están configuradas en Replit Secrets:
- ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- ✅ `CLERK_SECRET_KEY`
- ✅ `NEXT_PUBLIC_CONVEX_URL`
- ✅ `CONVEX_DEPLOY_KEY`

## Próximos Pasos

Una vez que agregues el dominio en Clerk:

1. La autenticación funcionará correctamente
2. Podrás hacer sign-up/sign-in
3. La integración con Clerk Billing estará lista
4. Los planes (Free, Creator, Pro, Enterprise) estarán operativos

## Soporte

Si tienes problemas:
1. Verifica que el dominio esté correctamente copiado (sin espacios extras)
2. Espera 1-2 minutos después de guardar
3. Limpia el caché del navegador (Ctrl + Shift + R)
4. Recarga la aplicación

---

**Última actualización**: 24 de Octubre, 2025
**Dominio actual de Replit**: https://ee6ca176-ead0-4433-b438-0cbd5401deb1-00-1sghrbpy78nyi.picard.replit.dev
