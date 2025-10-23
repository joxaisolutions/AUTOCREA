import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { createPortalSession, stripe } from '@/src/lib/stripe/stripe-client';
import { AuthenticationError, NotFoundError } from '@/src/lib/errors/app-error';
import { handleError } from '@/src/lib/errors/error-handler';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new AuthenticationError('Debes iniciar sesión');
    }

    // Obtener usuario de Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new NotFoundError('Email del usuario');
    }

    // Buscar customer en Stripe por email
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    const customer = customers.data[0];

    if (!customer) {
      throw new NotFoundError('Suscripción activa. Debes suscribirte primero en la página de precios');
    }

    // TODO: Verificar que tiene suscripción activa en DB cuando se implemente
    // const subscription = await db.subscriptions.getByUserId(userId);
    // if (!subscription || subscription.status !== 'active') {
    //   throw new NotFoundError('Suscripción activa');
    // }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000';
    const session = await createPortalSession(
      customer.id,
      `${appUrl}/settings/billing`
    );

    return NextResponse.json({ url: session.url });
    
  } catch (error) {
    console.error('Stripe portal error:', error);
    
    const errorResponse = handleError(error);
    
    return NextResponse.json(
      { error: errorResponse.title },
      { status: error instanceof AuthenticationError ? 401 : 404 }
    );
  }
}
