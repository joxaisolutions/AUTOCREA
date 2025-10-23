import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/src/lib/stripe/stripe-client';
import Stripe from 'stripe';
import { getPlanById, PLANS } from '@/src/config/plans';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    // Verificar firma del webhook
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

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

  console.log('✅ Checkout completed:', { 
    userId, 
    planId,
    customerId: session.customer,
    subscriptionId: session.subscription,
  });

  if (!userId || !planId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  const plan = getPlanById(planId);
  if (!plan) {
    console.error('Invalid plan ID:', planId);
    return;
  }

  // TODO: Crear suscripción en DB
  // await db.subscriptions.create({
  //   userId,
  //   planId,
  //   stripeSubscriptionId: session.subscription as string,
  //   stripeCustomerId: session.customer as string,
  //   status: 'active',
  //   currentPeriodStart: Date.now(),
  //   currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000,
  //   cancelAtPeriodEnd: false,
  //   createdAt: Date.now(),
  //   updatedAt: Date.now(),
  // });
  
  // await db.tokenUsage.update({
  //   userId,
  //   tokensLimit: plan.tokens,
  //   tokensUsed: 0,
  // });

  // TODO: Enviar email de bienvenida
  console.log('📧 Send welcome email to user:', userId);
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  
  console.log('🔄 Subscription changed:', { 
    userId, 
    status: subscription.status,
  });

  if (!userId) {
    console.error('Missing userId in subscription metadata');
    return;
  }

  const priceId = subscription.items.data[0]?.price.id;
  const plan = Object.values(PLANS).find(p => p.stripePriceId === priceId);

  // TODO: Actualizar suscripción en DB
  // await db.subscriptions.update({
  //   userId,
  //   status: subscription.status,
  //   currentPeriodStart: subscription.current_period_start * 1000,
  //   currentPeriodEnd: subscription.current_period_end * 1000,
  //   cancelAtPeriodEnd: subscription.cancel_at_period_end,
  //   updatedAt: Date.now(),
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
  
  console.log('❌ Subscription cancelled:', { 
    userId,
    cancelAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
  });

  if (!userId) return;

  // TODO: Actualizar en DB - mantener acceso hasta end of period
  // await db.subscriptions.update({
  //   userId,
  //   status: 'canceled',
  //   cancelAtPeriodEnd: true,
  //   updatedAt: Date.now(),
  // });

  // TODO: Enviar email de cancelación
  console.log('📧 Send cancellation email to user:', userId);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const userId = invoice.metadata?.userId;
  
  console.log('💰 Payment succeeded:', { 
    userId, 
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
  });

  if (!userId) return;

  // TODO: Resetear tokens del mes
  // const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  // await db.tokenUsage.resetMonthlyTokens(userId, month);

  // TODO: Enviar recibo por email
  console.log('📧 Send receipt to user:', userId);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const userId = invoice.metadata?.userId;
  
  console.log('⚠️ Payment failed:', { 
    userId,
    amount: invoice.amount_due / 100,
    attemptCount: invoice.attempt_count,
  });

  if (!userId) return;

  // TODO: Enviar email de pago fallido
  console.log('📧 Send payment failed email to user:', userId);
}
