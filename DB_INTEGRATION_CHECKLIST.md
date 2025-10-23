# ✅ Checklist de Integración con Base de Datos

## 🎯 Estado Actual

La integración de Stripe está **implementada y lista**, pero requiere conectar con la base de datos para funcionar completamente.

---

## 📋 TODOs Pendientes por Archivo

### 1. `src/lib/stripe/stripe-client.ts`

**Función: `getOrCreateStripeCustomer`**

```typescript
// ❌ ACTUAL (líneas 15-25)
export async function getOrCreateStripeCustomer(userId: string, email: string): Promise<string> {
  // TODO: Buscar en DB si ya existe stripeCustomerId
  // const user = await db.users.get({ userId });
  // if (user?.stripeCustomerId) {
  //   return user.stripeCustomerId;
  // }

  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  // TODO: Guardar stripeCustomerId en DB
  // await db.users.update({ userId, stripeCustomerId: customer.id });

  return customer.id;
}
```

**✅ NECESITAS:**
```typescript
// Implementación con Convex
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';

export async function getOrCreateStripeCustomer(userId: string, email: string): Promise<string> {
  // 1. Buscar usuario en DB
  const user = await convex.query(api.users.getByClerkId, { clerkId: userId });
  
  if (user?.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  // 2. Crear customer en Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  // 3. Guardar stripeCustomerId en DB
  await convex.mutation(api.users.updateStripeCustomerId, {
    userId: user._id,
    stripeCustomerId: customer.id,
  });

  return customer.id;
}
```

---

### 2. `app/api/stripe/create-checkout/route.ts`

**❌ ACTUAL (línea 38)**
```typescript
const userEmail = 'user@example.com'; // Temporal
```

**✅ NECESITAS:**
```typescript
import { clerkClient } from '@clerk/nextjs/server';

// Obtener email real del usuario
const user = await clerkClient.users.getUser(userId);
const userEmail = user.emailAddresses[0]?.emailAddress;

if (!userEmail) {
  throw new ValidationError('Email no encontrado');
}
```

---

### 3. `app/api/stripe/create-portal/route.ts`

**❌ ACTUAL (líneas 15-22)**
```typescript
// TODO: Obtener stripeCustomerId de la DB
// const user = await db.users.get({ userId });
// if (!user?.stripeCustomerId) {
//   throw new NotFoundError('Suscripción');
// }

// IMPORTANTE: Este endpoint no funcionará hasta que se implemente la DB
throw new NotFoundError('Suscripción activa. Primero debes implementar...');
```

**✅ NECESITAS:**
```typescript
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

// Obtener stripeCustomerId de la DB
const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });

if (!user?.stripeCustomerId) {
  throw new NotFoundError('No tienes una suscripción activa');
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000';
const session = await createPortalSession(
  user.stripeCustomerId,
  `${appUrl}/settings/billing`
);

return NextResponse.json({ url: session.url });
```

---

### 4. `app/api/stripe/webhooks/route.ts`

**Función: `handleCheckoutCompleted`** (líneas 100-122)

```typescript
// ✅ NECESITAS:
import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;

  if (!userId || !planId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  const plan = getPlanById(planId);
  if (!plan) {
    console.error('Invalid plan ID:', planId);
    return;
  }

  // 1. Buscar usuario por Clerk ID
  const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });
  
  if (!user) {
    console.error('User not found:', userId);
    return;
  }

  // 2. Crear suscripción en DB
  await fetchMutation(api.subscriptions.create, {
    userId: user._id,
    planId,
    stripeSubscriptionId: session.subscription as string,
    stripeCustomerId: session.customer as string,
    status: 'active',
    currentPeriodStart: Date.now(),
    currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000,
    cancelAtPeriodEnd: false,
  });
  
  // 3. Actualizar límite de tokens
  await fetchMutation(api.tokenUsage.updateLimit, {
    userId: user._id,
    tokensLimit: plan.tokens,
    tokensUsed: 0,
  });

  // 4. Enviar email de bienvenida (opcional)
  // await sendWelcomeEmail(userEmail, plan.name);
  
  console.log('✅ Checkout completed successfully:', { userId, planId });
}
```

**Función: `handleSubscriptionChange`** (líneas 124-154)

```typescript
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  
  if (!userId) {
    console.error('Missing userId in subscription metadata');
    return;
  }

  const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });
  if (!user) return;

  const priceId = subscription.items.data[0]?.price.id;
  const plan = Object.values(PLANS).find(p => p.stripePriceId === priceId);

  // Actualizar suscripción en DB
  await fetchMutation(api.subscriptions.updateByStripeId, {
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
  
  // Actualizar límite de tokens si cambió el plan
  if (plan) {
    await fetchMutation(api.tokenUsage.updateLimit, {
      userId: user._id,
      tokensLimit: plan.tokens,
    });
  }
}
```

**Función: `handleSubscriptionCancelled`** (líneas 156-178)

```typescript
async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });
  if (!user) return;

  // Actualizar en DB - mantener acceso hasta end of period
  await fetchMutation(api.subscriptions.updateByStripeId, {
    stripeSubscriptionId: subscription.id,
    status: 'canceled',
    cancelAtPeriodEnd: true,
  });

  // Enviar email de cancelación
  // await sendCancellationEmail(userEmail);
}
```

**Función: `handlePaymentSucceeded`** (líneas 180-197)

```typescript
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const userId = invoice.metadata?.userId;
  if (!userId) return;

  const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });
  if (!user) return;

  // Resetear tokens del mes
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  await fetchMutation(api.tokenUsage.resetMonthlyTokens, {
    userId: user._id,
    month,
  });

  // Enviar recibo por email
  // await sendReceiptEmail(userEmail, invoice.id);
}
```

**Función: `handlePaymentFailed`** (líneas 199-212)

```typescript
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const userId = invoice.metadata?.userId;
  if (!userId) return;

  const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });
  if (!user) return;

  // Enviar email de pago fallido
  // await sendPaymentFailedEmail(userEmail, invoice.id);
  
  // Opcional: Marcar cuenta como past_due
  await fetchMutation(api.subscriptions.updateStatus, {
    userId: user._id,
    status: 'past_due',
  });
}
```

---

## 🗄️ Schema de Convex Necesario

**Archivo: `convex/schema.ts`**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    plan: v.string(),
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

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

  tokenUsage: defineTable({
    userId: v.id("users"),
    month: v.string(), // YYYY-MM
    tokensUsed: v.number(),
    tokensLimit: v.number(),
    generationsCount: v.number(),
    lastGenerationAt: v.optional(v.number()),
  }).index("by_user_month", ["userId", "month"]),
});
```

---

## 📝 Queries y Mutations de Convex Necesarias

**Archivo: `convex/users.ts`**

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();
  },
});

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
```

**Archivo: `convex/subscriptions.ts`**

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

**Archivo: `convex/tokenUsage.ts`**

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateLimit = mutation({
  args: {
    userId: v.id("users"),
    tokensLimit: v.number(),
    tokensUsed: v.optional(v.number()),
  },
  handler: async (ctx, { userId, tokensLimit, tokensUsed }) => {
    const month = new Date().toISOString().slice(0, 7);
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        tokensLimit,
        ...(tokensUsed !== undefined && { tokensUsed }),
      });
    } else {
      await ctx.db.insert("tokenUsage", {
        userId,
        month,
        tokensLimit,
        tokensUsed: tokensUsed ?? 0,
        generationsCount: 0,
      });
    }
  },
});

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

---

## ✅ Orden de Implementación Recomendado

1. **Deploy Convex Schema** ✅
   ```bash
   npx convex dev
   ```

2. **Crear queries y mutations de Convex** ✅
   - `convex/users.ts`
   - `convex/subscriptions.ts`
   - `convex/tokenUsage.ts`

3. **Actualizar `stripe-client.ts`** ✅
   - Implementar getOrCreateStripeCustomer con DB

4. **Actualizar `create-checkout`** ✅
   - Obtener email real de Clerk

5. **Actualizar `create-portal`** ✅
   - Remover throw, obtener stripeCustomerId de DB

6. **Actualizar `webhooks`** ✅
   - Implementar todos los handlers con DB

7. **Testing End-to-End** ✅
   - Probar flujo completo de checkout
   - Verificar webhooks con Stripe CLI
   - Confirmar actualización de tokens

---

## 🧪 Testing Checklist

- [ ] Usuario puede seleccionar un plan
- [ ] Checkout session se crea correctamente
- [ ] Usuario completa pago en Stripe
- [ ] Webhook `checkout.session.completed` actualiza DB
- [ ] Tokens se actualizan correctamente
- [ ] Usuario puede ver suscripción en settings
- [ ] Customer portal se abre correctamente
- [ ] Usuario puede cancelar suscripción
- [ ] Webhook `subscription.deleted` actualiza DB
- [ ] Pago mensual resetea tokens
- [ ] Pago fallido envía notificación

---

**Siguiente paso:** Deploy Convex y crear las queries/mutations necesarias.
