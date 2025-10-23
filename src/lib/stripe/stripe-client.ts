import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY no está configurado');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});

export async function getOrCreateStripeCustomer(userId: string, email: string): Promise<string> {
  // TODO: Buscar en DB si ya existe stripeCustomerId
  // const user = await db.users.get({ userId });
  // if (user?.stripeCustomerId) {
  //   return user.stripeCustomerId;
  // }

  // Crear nuevo customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  // TODO: Guardar stripeCustomerId en DB
  // await db.users.update({ userId, stripeCustomerId: customer.id });

  return customer.id;
}

export async function createCheckoutSession(params: {
  userId: string;
  email: string;
  planId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const customerId = await getOrCreateStripeCustomer(params.userId, params.email);

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      userId: params.userId,
      planId: params.planId,
    },
  });

  return session;
}

export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}
