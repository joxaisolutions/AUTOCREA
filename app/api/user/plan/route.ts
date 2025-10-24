import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getPlanById, getDefaultPlan } from '@/src/config/plans';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Get user from Clerk
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    // Get user's current plan from metadata
    const planId = user.publicMetadata?.plan as string || 'free';
    const plan = getPlanById(planId) || getDefaultPlan();

    // Get subscription status from Clerk metadata
    const subscriptionStatus = user.publicMetadata?.subscriptionStatus as string || 'inactive';
    const stripeCustomerId = user.publicMetadata?.stripeCustomerId as string;

    return NextResponse.json({
      success: true,
      data: {
        plan,
        subscriptionStatus,
        stripeCustomerId,
        userId,
      },
    });

  } catch (error) {
    console.error('Error fetching user plan:', error);
    return NextResponse.json(
      { error: 'Error al obtener el plan del usuario' },
      { status: 500 }
    );
  }
}
