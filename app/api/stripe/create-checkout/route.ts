import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getPlanById } from '@/src/config/plans';
import { createCheckoutSession } from '@/src/lib/stripe/stripe-client';
import { AuthenticationError, ValidationError } from '@/src/lib/errors/app-error';
import { handleError } from '@/src/lib/errors/error-handler';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new AuthenticationError('Debes iniciar sesión para suscribirte');
    }

    const { planId } = await req.json();
    
    if (!planId) {
      throw new ValidationError('Plan ID es requerido');
    }

    const plan = getPlanById(planId);
    
    if (!plan || !plan.stripePriceId) {
      throw new ValidationError('Plan inválido o no disponible');
    }

    if (plan.id === 'free') {
      return NextResponse.json(
        { error: 'El plan gratuito no requiere pago' },
        { status: 400 }
      );
    }

    if (plan.id === 'enterprise') {
      return NextResponse.json(
        { 
          error: 'Para el plan Enterprise, contacta a ventas',
          contactUrl: 'mailto:sales@autocrea.joxai.org'
        },
        { status: 400 }
      );
    }

    // Obtener email del usuario desde Clerk
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userEmail = user.emailAddresses[0]?.emailAddress;
    
    if (!userEmail) {
      throw new ValidationError('No se encontró email del usuario');
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000';
    
    const session = await createCheckoutSession({
      userId,
      email: userEmail,
      planId: plan.id,
      priceId: plan.stripePriceId,
      successUrl: `${appUrl}/chat?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/pricing?canceled=true`,
    });

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url 
    });
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    const errorResponse = handleError(error);
    
    return NextResponse.json(
      { error: errorResponse.title },
      { status: error instanceof AuthenticationError ? 401 : 500 }
    );
  }
}
