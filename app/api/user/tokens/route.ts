import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // TODO: Get token usage from Convex
    // const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    // const tokenUsage = await convex.query(api.tokenUsage.getCurrentMonth, {
    //   userId: convexUserId,
    // });

    // Mock data for now
    const currentMonth = new Date().toISOString().slice(0, 7);
    const tokenUsage = {
      month: currentMonth,
      tokensUsed: 0,
      tokensLimit: 1000, // Free plan default
      generationsCount: 0,
      lastGenerationAt: null,
    };

    return NextResponse.json({
      success: true,
      data: tokenUsage,
    });

  } catch (error) {
    console.error('Error fetching token usage:', error);
    return NextResponse.json(
      { error: 'Error al obtener el uso de tokens' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { tokensToAdd } = body;

    if (typeof tokensToAdd !== 'number' || tokensToAdd <= 0) {
      return NextResponse.json(
        { error: 'Cantidad de tokens inválida' },
        { status: 400 }
      );
    }

    // TODO: Increment tokens in Convex
    // const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    // await convex.mutation(api.tokenUsage.incrementTokens, {
    //   userId: convexUserId,
    //   tokensUsed: tokensToAdd,
    // });

    console.log(`Added ${tokensToAdd} tokens for user ${userId}`);

    return NextResponse.json({
      success: true,
      message: `${tokensToAdd} tokens agregados`,
    });

  } catch (error) {
    console.error('Error incrementing tokens:', error);
    return NextResponse.json(
      { error: 'Error al agregar tokens' },
      { status: 500 }
    );
  }
}
