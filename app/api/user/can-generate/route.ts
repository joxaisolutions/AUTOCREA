import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getPlanById, getDefaultPlan, canUserGenerate } from '@/src/config/plans';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Get user's plan
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const planId = user.publicMetadata?.plan as string || 'free';
    const plan = getPlanById(planId) || getDefaultPlan();

    // TODO: Get token usage from Convex
    // const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    // const tokenUsage = await convex.query(api.tokenUsage.getCurrentMonth, {
    //   userId: convexUserId,
    // });

    // Mock data for now
    const tokensUsed = 0;
    const tokensLimit = plan.tokens;

    const canGenerate = canUserGenerate(tokensUsed, tokensLimit);
    const remainingTokens = tokensLimit === -1 ? Infinity : Math.max(0, tokensLimit - tokensUsed);

    return NextResponse.json({
      success: true,
      data: {
        canGenerate,
        tokensUsed,
        tokensLimit,
        remainingTokens,
        plan: plan.name,
        planId: plan.id,
      },
    });

  } catch (error) {
    console.error('Error checking generation limits:', error);
    return NextResponse.json(
      { error: 'Error al verificar límites de generación' },
      { status: 500 }
    );
  }
}
