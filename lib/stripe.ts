import Stripe from 'stripe';
import prisma from './prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function getOrCreateStripeCustomer(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  if (user.stripeCustomerId) {
    return stripe.customers.retrieve(user.stripeCustomerId) as Promise<Stripe.Customer>;
  }

  const customer = await stripe.customers.create({
    email: user.email || undefined,
    metadata: { userId },
  });

  await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customer.id } });
  return customer;
}

export default stripe;
