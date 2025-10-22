import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getOrCreateStripeCustomer } from '../../../lib/stripe';
import prisma from '../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, userId, priceIds, couponId } = body;

    // Soportar single priceId o array de priceIds (bundles)
    const line_items = (priceIds || (priceId ? [priceId] : [])).map((p: string) => ({
      price: p,
      quantity: 1,
    }));

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const customer = await getOrCreateStripeCustomer(userId);

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      metadata: {
        userId,
      },
      allow_promotion_codes: true,
      discounts: couponId ? [{ coupon: couponId }] : undefined,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
