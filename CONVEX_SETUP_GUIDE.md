# 🗄️ Guía de Configuración de Convex para AUTOCREA

## Estado Actual

✅ **Stripe completamente integrado** con tus 4 planes reales
✅ **Price IDs configurados** en el código
❌ **Convex pendiente** - Base de datos necesaria para persistencia

---

## 🎯 ¿Por qué Convex?

Ya usas Convex en tu **Admin Portal de JoxAI**, así que AUTOCREA compartirá la misma base de datos para:
- Gestión unificada de usuarios
- Sincronización de suscripciones entre apps
- Control centralizado de límites y tokens

---

## 📋 Pasos para Conectar Convex

### 1. Instalar Dependencias de Convex

```bash
npm install convex
```

### 2. Inicializar Convex en el Proyecto

```bash
npx convex dev
```

Esto te preguntará:
- ¿Usar proyecto existente? **SÍ** (usa el mismo de tu Admin Portal)
- ¿Nombre del proyecto? **joxai** (o el nombre que uses)

### 3. Agregar Schema de AUTOCREA

Crea o actualiza `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ========== USUARIOS ==========
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    plan: v.string(), // 'free', 'creator', 'professional', 'enterprise'
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // ========== SUSCRIPCIONES ==========
  subscriptions: defineTable({
    userId: v.id("users"),
    planId: v.string(),
    stripeSubscriptionId: v.string(),
    stripeCustomerId: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due"),
      v.literal("trialing")
    ),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_stripe_subscription", ["stripeSubscriptionId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // ========== TOKENS Y USO ==========
  tokenUsage: defineTable({
    userId: v.id("users"),
    month: v.string(), // YYYY-MM
    tokensUsed: v.number(),
    tokensLimit: v.number(),
    generationsCount: v.number(),
    lastGenerationAt: v.optional(v.number()),
  }).index("by_user_month", ["userId", "month"]),

  // ========== PROYECTOS ==========
  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    role: v.string(), // 'architect', 'fullstack', 'frontend', etc.
    language: v.string(), // 'typescript', 'python', etc.
    githubRepoUrl: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("archived"),
      v.literal("deleted")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // ========== GENERACIONES ==========
  generations: defineTable({
    userId: v.id("users"),
    projectId: v.id("projects"),
    role: v.string(),
    prompt: v.string(),
    code: v.string(),
    language: v.string(),
    tokensUsed: v.number(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"]),
});
```

### 4. Crear Queries y Mutations

#### `convex/users.ts`

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Obtener usuario por Clerk ID
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();
  },
});

// Crear o actualizar usuario
export const upsert = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
      plan: "free",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Actualizar Stripe Customer ID
export const updateStripeCustomerId = mutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, { userId, stripeCustomerId }) => {
    await ctx.db.patch(userId, {
      stripeCustomerId,
      updatedAt: Date.now(),
    });
  },
});

// Actualizar plan del usuario
export const updatePlan = mutation({
  args: {
    userId: v.id("users"),
    planId: v.string(),
  },
  handler: async (ctx, { userId, planId }) => {
    await ctx.db.patch(userId, {
      plan: planId,
      updatedAt: Date.now(),
    });
  },
});
```

#### `convex/subscriptions.ts`

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Crear suscripción
export const create = mutation({
  args: {
    userId: v.id("users"),
    planId: v.string(),
    stripeSubscriptionId: v.string(),
    stripeCustomerId: v.string(),
    status: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("subscriptions", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Obtener suscripción activa del usuario
export const getActiveByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();
  },
});

// Actualizar suscripción por Stripe ID
export const updateByStripeId = mutation({
  args: {
    stripeSubscriptionId: v.string(),
    status: v.string(),
    cancelAtPeriodEnd: v.boolean(),
  },
  handler: async (ctx, { stripeSubscriptionId, status, cancelAtPeriodEnd }) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_stripe_subscription", (q) =>
        q.eq("stripeSubscriptionId", stripeSubscriptionId)
      )
      .first();

    if (!subscription) return;

    await ctx.db.patch(subscription._id, {
      status,
      cancelAtPeriodEnd,
      updatedAt: Date.now(),
    });
  },
});
```

#### `convex/tokenUsage.ts`

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Obtener uso actual del mes
export const getCurrentMonth = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const month = new Date().toISOString().slice(0, 7); // YYYY-MM
    return await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();
  },
});

// Incrementar tokens usados
export const incrementTokens = mutation({
  args: {
    userId: v.id("users"),
    tokensUsed: v.number(),
  },
  handler: async (ctx, { userId, tokensUsed }) => {
    const month = new Date().toISOString().slice(0, 7);
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        tokensUsed: existing.tokensUsed + tokensUsed,
        generationsCount: existing.generationsCount + 1,
        lastGenerationAt: Date.now(),
      });
    }
  },
});

// Actualizar límite de tokens (cuando cambia de plan)
export const updateLimit = mutation({
  args: {
    userId: v.id("users"),
    tokensLimit: v.number(),
  },
  handler: async (ctx, { userId, tokensLimit }) => {
    const month = new Date().toISOString().slice(0, 7);
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { tokensLimit });
    } else {
      await ctx.db.insert("tokenUsage", {
        userId,
        month,
        tokensLimit,
        tokensUsed: 0,
        generationsCount: 0,
      });
    }
  },
});

// Resetear tokens del mes (pago exitoso)
export const resetMonthlyTokens = mutation({
  args: {
    userId: v.id("users"),
    month: v.string(),
  },
  handler: async (ctx, { userId, month }) => {
    const usage = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (usage) {
      await ctx.db.patch(usage._id, {
        tokensUsed: 0,
        generationsCount: 0,
        lastGenerationAt: undefined,
      });
    }
  },
});
```

### 5. Configurar Variables de Entorno

Después de ejecutar `npx convex dev`, agrega a tus Secrets de Replit:

```bash
CONVEX_DEPLOYMENT=your-deployment-url
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### 6. Integrar ConvexProvider en la App

Actualiza `app/layout.tsx`:

```typescript
import { ConvexProvider } from "convex/react";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConvexProvider client={convex}>
          <ClerkProvider>
            {children}
          </ClerkProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
```

---

## 🔗 Integrando con el Código Existente

Una vez que Convex esté configurado, necesitas actualizar estos archivos (ver `DB_INTEGRATION_CHECKLIST.md`):

1. **`src/lib/stripe/stripe-client.ts`** - `getOrCreateStripeCustomer()`
2. **`app/api/stripe/create-checkout/route.ts`** - Obtener email real de Clerk
3. **`app/api/stripe/create-portal/route.ts`** - Buscar stripeCustomerId en DB
4. **`app/api/stripe/webhooks/route.ts`** - Persistir subscriptions en DB

---

## 📊 Sincronización con Admin Portal

Como AUTOCREA y tu Admin Portal comparten la misma base de datos Convex:

✅ **Usuarios sincronizados** - Mismo Clerk ID
✅ **Suscripciones compartidas** - Un solo Stripe customer
✅ **Tokens unificados** - Control centralizado
✅ **Proyectos visibles** - Desde ambas apps

---

## 🧪 Testing

Después de conectar Convex:

1. Crear usuario → Verificar en Convex dashboard
2. Suscribirse a Creator → Webhook crea suscripción
3. Generar código → Tokens se decrementan
4. Verificar en Admin Portal → Debe verse la misma data

---

## 🆘 Necesitas Ayuda?

Si tienes problemas configurando Convex, comparte:
1. El error específico que ves
2. Screenshot de Convex dashboard
3. Logs del servidor

¡Listo para continuar! 🚀
