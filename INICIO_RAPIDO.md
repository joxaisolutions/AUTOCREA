# ⚡ Inicio Rápido - AUTOCREA V2.0

## 🎯 Lo Que Necesitas Hacer (En Orden)

### ✅ Paso 1: Relevance AI (2 minutos) - OBLIGATORIO

1. **Obtener API Key**:
   - Ve a: https://app.relevanceai.com
   - Settings → API Keys → Create new secret key (rol: Admin)
   - Copia tu API key

2. **Configurar**:
   ```bash
   # Crea archivo .env.local en la raíz:
   RELEVANCE_AI_REGION=bcbe5a
   RELEVANCE_AI_PROJECT_ID=72d29230-c441-4e89-81c2-1342f3968ad9
   RELEVANCE_AI_API_KEY=tu_api_key_aqui    # ← Pega aquí
   RELEVANCE_AI_AGENT_ID=ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7
   ```

3. **Probar**:
   ```bash
   npm run dev
   # Ir a http://localhost:5000
   # Click "Crear Mi Primera App"
   ```

---

### ✅ Paso 2: Clerk Authentication (5 minutos) - RECOMENDADO

1. **Crear cuenta**: https://clerk.com → Sign Up

2. **Crear aplicación**:
   - Dashboard → "Add Application"
   - Nombre: "AUTOCREA V2.0"
   - Sign-in: Email + Google (recomendado)

3. **Copiar keys**:
   - Dashboard → API Keys
   - Copia: Publishable key (`pk_test_...`)
   - Copia: Secret key (`sk_test_...`)

4. **Agregar a .env.local**:
   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_key_aqui
   CLERK_SECRET_KEY=sk_test_tu_secret_aqui
   ```

5. **Configurar dominio**:
   - Clerk Dashboard → Domains → Development
   - Agregar: `http://localhost:5000`

6. **Probar**:
   ```bash
   npm run dev
   # Click "Iniciar Sesión" en tu app
   # ✅ Deberías ver el formulario de Clerk
   ```

---

### ✅ Paso 3: Publicar Tu App (10 minutos)

#### Opción A: Replit Deployments (Más Fácil)

1. **En Replit**:
   - Click "Deployments" (arriba derecha)
   - "Create deployment" → Autoscale
   - Agregar variables de entorno (las mismas de .env.local)
   - Click "Deploy"

2. **Actualizar Clerk**:
   - Clerk Dashboard → Domains → Production
   - Agregar: `https://tu-proyecto.replit.app`

#### Opción B: Vercel (Alternativa)

```bash
npm i -g vercel
vercel
# Sigue las instrucciones
# Agrega variables en vercel.com/dashboard
```

---

## 📋 Checklist Final

- [ ] ✅ Relevance AI configurado (OBLIGATORIO)
- [ ] ✅ Clerk configurado (login/signup funciona)
- [ ] ✅ App funciona en localhost
- [ ] ✅ App desplegada en producción
- [ ] ✅ Clerk configurado con dominio de producción

---

## 🆘 ¿Problemas?

### "No AI provider configured"
→ Falta API key de Relevance AI en `.env.local`

### "Clerk not initialized"
→ Faltan las 2 keys de Clerk en `.env.local`

### App no carga en producción
→ Verifica que agregaste las variables en el deployment

---

## 📚 Documentación Completa

- **Setup detallado**: `GUIA_SETUP_COMPLETO.md`
- **Relevance AI**: `RELEVANCE_AI_SETUP.md`
- **Resumen técnico**: `RELEVANCE_AI_INTEGRATION_SUMMARY.md`

---

## ⏱️ Tiempo Total Estimado

- Relevance AI: **2 minutos**
- Clerk: **5 minutos**
- Deploy: **10 minutos**
- **Total: ~17 minutos para tener tu app pública** 🚀
