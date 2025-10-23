import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createPortalSession } from '@/src/lib/stripe/stripe-client';
import { AuthenticationError, NotFoundError } from '@/src/lib/errors/app-error';
import { handleError } from '@/src/lib/errors/error-handler';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new AuthenticationError('Debes iniciar sesión');
    }

    // TODO: Obtener stripeCustomerId de la DB
    // const user = await db.users.get({ userId });
    // if (!user?.stripeCustomerId) {
    //   throw new NotFoundError('Suscripción');
    // }

    const stripeCustomerId = 'cus_temporary'; // TODO: Reemplazar con real

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000';
    
    const session = await createPortalSession(
      stripeCustomerId,
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
