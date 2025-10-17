# 🚀 Relevance AI Integration - Setup Guide

## ✅ ¡Tu Agente Ya Está Pre-configurado!

He extraído la información de tu agente de Relevance AI del link que proporcionaste:

```
https://app.relevanceai.com/agents/bcbe5a/72d29230-c441-4e89-81c2-1342f3968ad9/ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7/clone
```

### Información Extraída:
- ✅ **Region**: `bcbe5a`
- ✅ **Project ID**: `72d29230-c441-4e89-81c2-1342f3968ad9`
- ✅ **Agent ID**: `ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7`

---

## 🔑 Paso 1: Obtener tu API Key de Relevance AI

1. Ve a tu dashboard de Relevance AI: https://app.relevanceai.com
2. Ve a **Settings** → **API Keys**
3. Click en **"Create new secret key"** con rol **"Admin"**
4. Click **"Generate API key"**
5. **Copia y guarda** tu API key (no podrás verla de nuevo)

---

## ⚙️ Paso 2: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# RELEVANCE AI - Tu agente personalizado
RELEVANCE_AI_REGION=bcbe5a
RELEVANCE_AI_PROJECT_ID=72d29230-c441-4e89-81c2-1342f3968ad9
RELEVANCE_AI_API_KEY=tu_api_key_aqui
RELEVANCE_AI_AGENT_ID=ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7

# Convex Database (Opcional por ahora)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=prod:...

# Clerk Authentication (Opcional por ahora)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**Importante**: Solo necesitas agregar tu **API Key de Relevance AI**. Los demás valores ya están pre-configurados.

---

## 🚀 Paso 3: Probar AUTOCREA

```bash
# Iniciar el servidor
npm run dev

# Ir a http://localhost:5000
# Click en "Crear Mi Primera App"
# Describe tu proyecto
# ¡Observa cómo tu agente de Relevance AI genera el código!
```

---

## 🎯 Cómo Funciona la Integración

### Flujo de Generación

```
Usuario describe proyecto
        ↓
AUTOCREA divide en 5 agentes
        ↓
┌─────────────────────────────────┐
│  1. 🧠 Architect (tu agente)    │
│  2. ⚙️ Backend (tu agente)      │
│  3. 🎨 Frontend (tu agente)     │
│  4. 🚀 DevOps (tu agente)       │
│  5. 🛡️ Security (tu agente)     │
└─────────────────────────────────┘
        ↓
Cada agente usa tu modelo de Relevance AI
        ↓
Código completo generado ✅
```

### Ventajas de Relevance AI

✅ **No necesitas entrenar modelos** - Tu agente ya está listo
✅ **Setup en 2 minutos** - Solo API key
✅ **Multi-agente automático** - AUTOCREA maneja la orquestación
✅ **Polling automático** - Espera a que tu agente complete
✅ **Manejo de errores** - Reintentos y fallbacks integrados

---

## 🔧 Arquitectura Técnica

### Cliente de Relevance AI (`lib/api/relevance-client.ts`)

```typescript
import { createRelevanceAIClient } from "@/lib/api/relevance-client";

const client = createRelevanceAIClient();

// Generar con un solo agente
const response = await client.generate({
  prompt: "Crear API de usuarios con Express",
  agentRole: "backend"
});

// Generar con multi-agente
const result = await client.generateMultiAgent(
  "Crear e-commerce con React y Stripe"
);
```

### API Endpoint (`/api/relevance`)

```bash
POST /api/relevance
{
  "prompt": "Crear dashboard con Next.js",
  "agentRole": "frontend"
}
```

### Sistema de Polling

- ⏱️ **Polling automático** cada 1 segundo
- ⏰ **Timeout**: 60 segundos máximo
- 🔄 **Reintentos**: Manejo automático de errores
- ✅ **Detección de éxito**: Espera a `chain-success`

---

## 📊 Diferencia vs JoxCoder

| Característica | Relevance AI | JoxCoder Hybrid |
|---------------|--------------|-----------------|
| **Setup** | ✅ 2 minutos | ⏱️ ~12 horas training |
| **Modelos** | 1 agente personalizado | 2 modelos (DeepSeek + CodeLlama) |
| **Costo inicial** | $0 | ~$50 (Colab Pro+) |
| **Especialización** | Tu configuración | Especializado por tarea |
| **Router** | No necesario | Smart router incluido |
| **Listo para usar** | ✅ Ahora mismo | ⏳ Después de training |

**Recomendación**: Usa Relevance AI para empezar rápido. Migra a JoxCoder cuando tengas modelos entrenados.

---

## 🐛 Troubleshooting

### Error: "Relevance AI not configured"

**Solución**: Verifica que las 4 variables estén en `.env.local`:
```bash
RELEVANCE_AI_REGION=bcbe5a
RELEVANCE_AI_PROJECT_ID=72d29230-c441-4e89-81c2-1342f3968ad9
RELEVANCE_AI_API_KEY=tu_key_aqui
RELEVANCE_AI_AGENT_ID=ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7
```

### Error: "Timeout waiting for agent response"

**Solución**: Tu agente puede estar tardando más de 60 segundos. Opciones:
1. Optimiza tu agente en Relevance AI
2. Simplifica el prompt
3. Aumenta el timeout en `relevance-client.ts` (línea con `maxAttempts`)

### Error: "Agent execution failed"

**Solución**: 
1. Verifica que tu agente funcione en Relevance AI dashboard
2. Revisa los logs en la consola del navegador
3. Confirma que tu API key tenga permisos "Admin"

---

## 🔐 Seguridad

### Mejores Prácticas

✅ **Nunca commitees** `.env.local` al repositorio
✅ **Usa variables de entorno** en producción (Vercel, Railway, etc.)
✅ **Rota tu API key** regularmente
✅ **Limita permisos** de API key solo a lo necesario

### Variables de Entorno en Vercel

```bash
# En tu proyecto de Vercel:
Settings → Environment Variables

RELEVANCE_AI_REGION=bcbe5a
RELEVANCE_AI_PROJECT_ID=72d29230-c441-4e89-81c2-1342f3968ad9
RELEVANCE_AI_API_KEY=tu_key_de_produccion
RELEVANCE_AI_AGENT_ID=ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7
```

---

## 📈 Monitoreo

### Ver Decisiones en Consola

```javascript
// En browser console verás:
"🎯 Using Relevance AI for generation"
"📡 Triggering agent: ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7"
"✅ Agent completed successfully"
```

### Tracking de Conversaciones

Cada generación crea un `conversation_id` que puedes usar para:
- Ver historial en Relevance AI dashboard
- Debugging de respuestas
- Analytics de uso

---

## 🚀 Próximos Pasos

### 1. **Prueba el Sistema** (5 minutos)
```bash
# Agrega tu API key a .env.local
npm run dev
# Crea un proyecto de prueba
```

### 2. **Personaliza tu Agente** (Opcional)
- Ve a Relevance AI dashboard
- Mejora los prompts de tu agente
- Agrega herramientas adicionales
- Entrena con ejemplos específicos

### 3. **Deploy a Producción** (Cuando estés listo)
```bash
# Vercel
vercel deploy

# Agregar variables de entorno en Vercel dashboard
```

---

## 📚 Recursos

- **Relevance AI Docs**: https://relevanceai.com/docs
- **API Reference**: https://relevanceai.com/docs/agent/api
- **Dashboard**: https://app.relevanceai.com
- **Tu Agente**: https://app.relevanceai.com/agents/bcbe5a/72d29230-c441-4e89-81c2-1342f3968ad9/ee9406f5-59a3-4b2b-bac3-71a2cc03fbc7

---

## ✨ ¡Listo para Usar!

AUTOCREA está **100% integrada** con tu agente de Relevance AI. Solo necesitas:

1. ✅ Obtener tu API key de Relevance AI
2. ✅ Agregarla a `.env.local`
3. ✅ Ejecutar `npm run dev`
4. ✅ ¡Empezar a generar apps!

**El diseño y funcionalidad de AUTOCREA se mantienen exactamente igual. Solo cambié el backend para usar tu agente de Relevance AI.** 🚀
