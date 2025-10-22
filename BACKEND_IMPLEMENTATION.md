# 🔧 GUÍA DE IMPLEMENTACIÓN DEL BACKEND

## 📋 Overview

Esta guía detalla cómo implementar el backend de AUTOCREA V2.0, incluyendo la integración con Stripe, sistema de tokens, webhooks, y funcionalidades de autenticación.

---

## 🎯 Arquitectura del Backend

### Stack Tecnológico
- **Framework**: Next.js 14 API Routes
- **Database**: Convex (para desarrollo rápido) o PostgreSQL (para producción)
- **Auth**: Clerk
- **Payments**: Stripe
- **Cache**: Upstash Redis (opcional)
- **AI**: JoxCoder via Hugging Face Inference Endpoints

### Estructura de APIs

```
app/api/
├── joxcoder/
│   └── generate/route.ts          # Generación de código con IA
├── stripe/
│   ├── create-checkout/route.ts   # Crear sesión de checkout
│   ├── create-portal/route.ts     # Customer portal
│   └── webhooks/route.ts          # Webhooks de Stripe
├── tokens/
│   ├── usage/route.ts             # Consultar uso de tokens
│   └── validate/route.ts          # Validar tokens antes de generar
├── projects/
│   ├── create/route.ts            # Crear proyecto
│   ├── list/route.ts              # Listar proyectos
│   └── [id]/route.ts              # CRUD de proyecto específico
└── user/
    ├── profile/route.ts           # Perfil del usuario
    └── subscription/route.ts      # Estado de suscripción
```

---

## 💳 IMPLEMENTACIÓN DE STRIPE

### 1. Configuración Inicial

**Variables de entorno necesarias:**
```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs (obtener de Stripe Dashboard)
STRIPE_CREATOR_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_BUSINESS_PRICE_ID=price_...
```

### 2. API: Create Checkout Session

**Archivo**: `app/api/stripe/create-checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { getPlanById } from '@/src/config/plans';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const { planId } = await req.json();
    const plan = getPlanById(planId);
    
    if (!plan || !plan.stripePriceId) {
      return NextResponse.json(
        { error: 'Plan inválido' },
        { status: 400 }
      );
    }

    // Obtener o crear customer
    const customer = await getOrCreateStripeCustomer(userId);

    // Crear checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId,
        planId,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Error al crear sesión de pago' },
      { status: 500 }
    );
  }
}

async function getOrCreateStripeCustomer(userId: string): Promise<Stripe.Customer> {
  // TODO: Buscar en DB si ya existe stripeCustomerId
  // const user = await db.users.get({ userId });
  // if (user?.stripeCustomerId) {
  //   return await stripe.customers.retrieve(user.stripeCustomerId);
  // }

  // Crear nuevo customer
  const customer = await stripe.customers.create({
    metadata: { userId },
  });

  // TODO: Guardar stripeCustomerId en DB
  // await db.users.update({ userId, stripeCustomerId: customer.id });

  return customer;
}
```

### 3. API: Customer Portal

**Archivo**: `app/api/stripe/create-portal/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // TODO: Obtener stripeCustomerId de la DB
    // const user = await db.users.get({ userId });
    // if (!user?.stripeCustomerId) {
    //   return NextResponse.json(
    //     { error: 'No hay suscripción activa' },
    //     { status: 404 }
    //   );
    // }

    const stripeCustomerId = 'cus_...'; // TODO: Obtener de DB

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    });

    return NextResponse.json({ url: session.url });
    
  } catch (error) {
    console.error('Stripe portal error:', error);
    return NextResponse.json(
      { error: 'Error al crear sesión del portal' },
      { status: 500 }
    );
  }
}
```

### 4. Webhooks de Stripe

**Archivo**: `app/api/stripe/webhooks/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { getPlanById } from '@/src/config/plans';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    // Verificar firma del webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Manejar eventos
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;

  if (!userId || !planId) return;

  const plan = getPlanById(planId);
  if (!plan) return;

  // TODO: Crear suscripción en DB
  console.log('Checkout completed:', { userId, planId });
  
  // await db.subscriptions.create({
  //   userId,
  //   planId,
  //   stripeSubscriptionId: session.subscription as string,
  //   stripeCustomerId: session.customer as string,
  //   status: 'active',
  //   currentPeriodStart: Date.now(),
  //   currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000,
  // });
  
  // await db.tokenUsage.update({
  //   userId,
  //   tokensLimit: plan.tokens,
  //   tokensUsed: 0,
  // });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  const priceId = subscription.items.data[0]?.price.id;
  const plan = Object.values(getPlanById).find(p => p.stripePriceId === priceId);

  console.log('Subscription changed:', { userId, status: subscription.status });

  // TODO: Actualizar suscripción en DB
  // await db.subscriptions.update({
  //   userId,
  //   status: subscription.status,
  //   currentPeriodStart: subscription.current_period_start * 1000,
  //   currentPeriodEnd: subscription.current_period_end * 1000,
  //   cancelAtPeriodEnd: subscription.cancel_at_period_end,
  // });
  
  // if (plan) {
  //   await db.tokenUsage.update({
  //     userId,
  //     tokensLimit: plan.tokens,
  //   });
  // }
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  console.log('Subscription cancelled:', { userId });

  // TODO: Actualizar en DB - mantener acceso hasta end of period
  // await db.subscriptions.update({
  //   userId,
  //   status: 'canceled',
  //   cancelAtPeriodEnd: true,
  // });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const userId = invoice.metadata?.userId;
  if (!userId) return;

  console.log('Payment succeeded:', { userId, amount: invoice.amount_paid });

  // TODO: Resetear tokens del mes
  // await db.tokenUsage.resetMonthlyTokens(userId);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const userId = invoice.metadata?.userId;
  if (!userId) return;

  console.log('Payment failed:', { userId });

  // TODO: Enviar email de pago fallido
  // await sendEmail(userId, EMAIL_TEMPLATES.PAYMENT_FAILED);
}
```

---

## 🎫 SISTEMA DE TOKENS

### API: Validar Tokens

**Archivo**: `app/api/tokens/validate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { TokenLimitError } from '@/src/lib/errors/app-error';
import { estimateTokensFromText } from '@/src/lib/utils/token-counter';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();
    const estimatedTokens = estimateTokensFromText(prompt);

    // TODO: Obtener token usage de DB
    // const usage = await db.tokenUsage.get({ userId });
    const usage = { tokensUsed: 0, tokensLimit: 100 };

    const canGenerate = usage.tokensUsed + estimatedTokens <= usage.tokensLimit;

    if (!canGenerate) {
      throw new TokenLimitError(usage.tokensUsed, usage.tokensLimit);
    }

    return NextResponse.json({
      canGenerate: true,
      estimatedTokens,
      tokensUsed: usage.tokensUsed,
      tokensLimit: usage.tokensLimit,
      remaining: usage.tokensLimit - usage.tokensUsed,
    });
    
  } catch (error) {
    if (error instanceof TokenLimitError) {
      return NextResponse.json(
        {
          canGenerate: false,
          error: error.message,
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al validar tokens' },
      { status: 500 }
    );
  }
}
```

---

## 🗄️ ESQUEMA DE BASE DE DATOS (Convex)

### Schema

**Archivo**: `convex/schema.ts`

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
  }).index("by_clerk_id", ["clerkId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    planId: v.string(),
    stripeSubscriptionId: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
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
  }).index("by_user", ["userId"]),

  tokenUsage: defineTable({
    userId: v.id("users"),
    month: v.string(),
    tokensUsed: v.number(),
    tokensLimit: v.number(),
    generationsCount: v.number(),
    lastGenerationAt: v.optional(v.number()),
  }).index("by_user_month", ["userId", "month"]),

  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("deployed")
    ),
    tokensUsed: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    deployedUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  generations: defineTable({
    userId: v.id("users"),
    projectId: v.optional(v.id("projects")),
    role: v.string(),
    prompt: v.string(),
    generatedCode: v.string(),
    explanation: v.optional(v.string()),
    tokensUsed: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
    error: v.optional(v.string()),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_user", ["userId"])
    .index("by_project", ["projectId"]),
});
```

---

## 📧 SISTEMA DE EMAILS (Recomendación)

### Plataforma Recomendada: Resend

```bash
npm install resend
```

**Variables de entorno:**
```bash
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@autocrea.joxai.org
```

### Templates de Email

1. **Bienvenida** - Al registrarse
2. **Token 50%** - Al usar 50% de tokens
3. **Token 80%** - Al usar 80% de tokens
4. **Token 100%** - Al alcanzar el límite
5. **Upgrade** - Promoción para mejorar plan
6. **Subscription Confirmed** - Confirmación de suscripción
7. **Subscription Cancelled** - Cancelación de suscripción
8. **Payment Failed** - Pago fallido
9. **Onboarding Day X** - Serie de onboarding

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Configurar cuenta de Stripe
2. ✅ Crear productos y precios en Stripe
3. ✅ Configurar webhooks en Stripe
4. ✅ Deployar Convex schema
5. ✅ Implementar APIs de Stripe
6. ✅ Probar flujo completo con tarjetas de prueba
7. ✅ Configurar Resend para emails
8. ✅ Crear templates de email
9. ✅ Implementar sistema de onboarding

---

## 📊 TESTING

### Tarjetas de Prueba de Stripe

```
Éxito: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Requiere autenticación: 4000 0025 0000 3155
```

### CLI de Stripe para Webhooks Locales

```bash
stripe listen --forward-to localhost:5000/api/stripe/webhooks
```

---

**Documentado por:** Replit Agent  
**Fecha:** Octubre 2025  
**Versión:** 1.0
