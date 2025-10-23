# 🔐 Guía de Configuración de Stripe

## ✅ Estado Actual

**APIs Keys:** ✅ Configuradas en Replit Secrets
- `STRIPE_SECRET_KEY` ✅
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` ✅
- `STRIPE_WEBHOOK_SECRET` ✅

**Código:** ✅ Implementado
- APIs de checkout, portal y webhooks
- Hooks personalizados para frontend
- Manejo de errores unificado

---

## 📋 Próximos Pasos en Stripe Dashboard

### 1. Crear Productos y Precios

Ve a: https://dashboard.stripe.com/products

**Creator Plan - $29/mes**
```
Nombre: AUTOCREA Creator
Descripción: Plan Creator - 10,000 tokens mensuales
Precio: $29 USD
Tipo: Recurring - Mensual
```
Después de crear, copia el **Price ID** (empieza con `price_...`)

**Professional Plan - $79/mes**
```
Nombre: AUTOCREA Professional
Descripción: Plan Professional - 30,000 tokens mensuales
Precio: $79 USD
Tipo: Recurring - Mensual
```
Copia el **Price ID**

**Business Plan - $199/mes**
```
Nombre: AUTOCREA Business
Descripción: Plan Business - 100,000 tokens mensuales
Precio: $199 USD
Tipo: Recurring - Mensual
```
Copia el **Price ID**

### 2. Configurar Price IDs en el Código

Actualiza `src/config/plans.ts`:

```typescript
export const PLANS: Record<string, Plan> = {
  creator: {
    // ...
    stripePriceId: 'price_XXX_CREATOR', // ← Pegar aquí
  },
  professional: {
    // ...
    stripePriceId: 'price_XXX_PROFESSIONAL', // ← Pegar aquí
  },
  business: {
    // ...
    stripePriceId: 'price_XXX_BUSINESS', // ← Pegar aquí
  },
}
```

### 3. Configurar Webhooks

Ve a: https://dashboard.stripe.com/webhooks

Click en **"Add endpoint"**

**Endpoint URL:**
```
https://[tu-repl-url].repl.co/api/stripe/webhooks
```

**Eventos a escuchar:**
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

**Webhook Secret:**
Ya está configurado en `STRIPE_WEBHOOK_SECRET` ✅

---

## 🧪 Testing

### Tarjetas de Prueba

**Pago exitoso:**
```
Número: 4242 4242 4242 4242
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
ZIP: Cualquier 5 dígitos
```

**Pago rechazado:**
```
Número: 4000 0000 0000 0002
```

**Requiere autenticación 3D Secure:**
```
Número: 4000 0025 0000 3155
```

### Testing Local de Webhooks

Instala Stripe CLI:
```bash
stripe listen --forward-to http://localhost:5000/api/stripe/webhooks
```

Simular evento:
```bash
stripe trigger checkout.session.completed
```

---

## 🔄 Flujo Completo

### 1. Usuario selecciona plan
```
Usuario → Pricing Page → Click "Seleccionar Plan"
```

### 2. Crear sesión de checkout
```
Frontend → POST /api/stripe/create-checkout
         → Stripe API → Checkout Session
         → Redirect a Stripe Checkout
```

### 3. Usuario completa pago
```
Stripe Checkout → Usuario ingresa tarjeta
                → Stripe procesa pago
                → Redirect a /dashboard?success=true
```

### 4. Webhook notifica el pago
```
Stripe → POST /api/stripe/webhooks
       → Evento: checkout.session.completed
       → Crear suscripción en DB
       → Actualizar tokens del usuario
       → Enviar email de bienvenida
```

### 5. Usuario gestiona suscripción
```
Settings → "Gestionar Suscripción"
        → POST /api/stripe/create-portal
        → Redirect a Stripe Customer Portal
        → Usuario puede cancelar, actualizar, ver facturas
```

---

## 🗄️ Integración con Base de Datos

### Schema Necesario (Convex)

```typescript
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
}).index("by_user", ["userId"])
  .index("by_stripe_customer", ["stripeCustomerId"])
  .index("by_stripe_subscription", ["stripeSubscriptionId"]),

users: defineTable({
  // ... campos existentes
  stripeCustomerId: v.optional(v.string()),
}).index("by_stripe_customer", ["stripeCustomerId"]),
```

---

## 📧 Emails Automáticos (Próxima Fase)

Integrar con Resend para enviar:

1. **Bienvenida** - Al completar checkout
2. **Recibo** - Cada pago mensual exitoso
3. **Pago Fallido** - Si falla el cargo
4. **Cancelación** - Al cancelar suscripción
5. **Límite de Tokens** - Al 50%, 80%, 100%

---

## 🔒 Seguridad

✅ **Verificación de Webhooks**
- Firma verificada con `STRIPE_WEBHOOK_SECRET`
- Previene webhooks falsos

✅ **API Keys Seguras**
- Almacenadas en Replit Secrets
- No expuestas en código

✅ **HTTPS Obligatorio**
- Stripe requiere HTTPS en producción
- Replit provee HTTPS automáticamente

---

## 🚀 Checklist de Producción

Antes de lanzar:

- [ ] Crear productos en Stripe (modo Live)
- [ ] Actualizar Price IDs en el código
- [ ] Configurar webhook en modo Live
- [ ] Actualizar API keys a modo Live
- [ ] Probar flujo completo end-to-end
- [ ] Configurar emails transaccionales
- [ ] Revisar políticas de reembolso
- [ ] Términos y condiciones de suscripción
- [ ] Configurar taxes si aplica

---

## 📞 Soporte

**Documentación Stripe:**
- https://stripe.com/docs/billing/subscriptions/overview
- https://stripe.com/docs/webhooks
- https://stripe.com/docs/testing

**Contacto AUTOCREA:**
- Email: dev@autocrea.joxai.org

---

**Implementado por:** Replit Agent  
**Fecha:** Octubre 2025  
**Versión:** 1.0
