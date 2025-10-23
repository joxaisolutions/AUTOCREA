# 🔐 Guía de Configuración de Clerk Authentication

## ⚠️ Estado Actual

AUTOCREA está ejecutándose en **modo keyless** de Clerk, lo cual causa errores de autenticación. Necesitas configurar las API keys reales para que funcione correctamente.

---

## 🎯 ¿Qué es Clerk?

Clerk es el sistema de autenticación que usa AUTOCREA para:
- Login/Sign up de usuarios
- OAuth con GitHub (para repository management)
- Gestión de sesiones
- Protección de rutas

---

## 📋 Pasos para Configurar Clerk

### 1. Acceder a Clerk Dashboard

El mensaje en los logs dice:

```
[Clerk]: You are running in keyless mode.
You can claim your keys by visiting https://dashboard.clerk.com/apps/claim?token=v6l6x0u7karjh0m0ozwzhcloueaxtmt4dja18w7o
```

**Opción A:** Haz clic en ese link para reclamar las keys automáticamente

**Opción B:** Ve a [Clerk Dashboard](https://dashboard.clerk.com) y crea una nueva aplicación

---

### 2. Obtener las API Keys

Una vez en Clerk Dashboard:

1. Ve a **API Keys** en el menú lateral
2. Copia las siguientes keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

**Ejemplo:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cXVpZXQtZ2hvc3QtNjEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_abcd1234efgh5678ijkl9012mnop3456qrst7890
```

---

### 3. Agregar API Keys a Replit Secrets

En tu Repl de AUTOCREA:

1. Haz clic en **"Secrets"** en el panel lateral (ícono de 🔒)
2. Agrega estas dos secrets:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` (tu key pública) |
| `CLERK_SECRET_KEY` | `sk_test_...` (tu key secreta) |

---

### 4. Configurar Dominios Permitidos

En Clerk Dashboard:

1. Ve a **Domains** 
2. Agrega tu dominio de Replit:
   ```
   0588727a-3a7d-4fdc-89a9-84c8a1659a0f-00-2cl6xpz0m131n.kirk.replit.dev
   ```
3. También agrega tu dominio de producción cuando lo tengas:
   ```
   autocrea.joxai.org
   ```

---

### 5. Configurar Redirecciones

En Clerk Dashboard → **Paths**:

**Sign-in URL:**
```
/sign-in
```

**Sign-up URL:**
```
/sign-up
```

**After sign-in URL:**
```
/chat
```

**After sign-up URL:**
```
/chat
```

**Home URL:**
```
/
```

---

### 6. Habilitar GitHub OAuth (Opcional)

Para conectar repositories de GitHub:

1. En Clerk Dashboard → **Social Connections**
2. Activa **GitHub**
3. Sigue las instrucciones para crear OAuth App en GitHub
4. Configura las URLs de callback

---

### 7. Reiniciar el Servidor

Una vez agregadas las secrets:

1. En Replit, detén el workflow actual
2. Reinícialo con el botón **"Run"**
3. El warning de "keyless mode" debería desaparecer

---

## ✅ Verificación

Después de configurar Clerk, verifica que:

- [ ] No hay warnings de "keyless mode" en los logs
- [ ] Puedes hacer sign up en `/sign-up`
- [ ] El login funciona en `/sign-in`
- [ ] Después de login, redirige a `/chat`
- [ ] Las rutas protegidas requieren autenticación

---

## 🔒 Seguridad

**IMPORTANTE:** 
- Nunca compartas tu `CLERK_SECRET_KEY` públicamente
- Usa diferentes keys para development y production
- La `NEXT_PUBLIC_*` key es segura para el frontend

---

## 🐛 Troubleshooting

### Error: "Clerk failed to load"

**Solución:** Verifica que las keys estén correctamente copiadas sin espacios extra

### Error: "Redirect loop"

**Solución:** Revisa las URLs de redirección en Clerk Dashboard

### Error: "Domain not allowed"

**Solución:** Agrega tu dominio de Replit en Clerk → Domains

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los [docs oficiales de Clerk](https://clerk.com/docs)
2. Verifica que las secrets estén bien configuradas
3. Revisa los logs del servidor para mensajes específicos

---

**Próximo paso:** Una vez configurado Clerk, AUTOCREA funcionará completamente con autenticación real.
