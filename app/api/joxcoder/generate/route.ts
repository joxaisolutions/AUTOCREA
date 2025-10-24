import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getJoxCoder } from '@/lib/joxcoder/client';
import { JoxCoderRequest } from '@/lib/joxcoder/types';
import { getPlanById, getDefaultPlan, canUserGenerate } from '@/src/config/plans';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const body: JoxCoderRequest = await request.json();

    // Validación básica
    if (!body.role || !body.prompt) {
      return NextResponse.json(
        { error: 'Campos requeridos: role, prompt' },
        { status: 400 }
      );
    }

    // Verificar límites del plan del usuario
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const planId = user.publicMetadata?.plan as string || 'free';
    const plan = getPlanById(planId) || getDefaultPlan();

    // TODO: Get actual token usage from Convex
    // For now, we'll use a simple check
    const tokensUsed = 0; // TODO: Get from Convex
    const tokensLimit = plan.tokens;

    if (!canUserGenerate(tokensUsed, tokensLimit)) {
      return NextResponse.json(
        { 
          error: 'Límite de tokens alcanzado',
          tokensUsed,
          tokensLimit,
          plan: plan.name,
        },
        { status: 429 }
      );
    }

    // Generar código con JoxCoder AI
    const joxcoder = getJoxCoder();
    const result = await joxcoder.generate(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Error en generación' },
        { status: 500 }
      );
    }

    // TODO: Guardar generación en Convex
    // const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    // await convex.mutation(api.generations.create, {
    //   userId: convexUserId,
    //   role: body.role,
    //   prompt: body.prompt,
    //   code: result.generatedCode,
    //   tokensUsed: result.tokensUsed,
    //   language: body.language || 'typescript',
    //   success: true,
    // });
    //
    // await convex.mutation(api.tokenUsage.incrementTokens, {
    //   userId: convexUserId,
    //   tokensUsed: result.tokensUsed,
    // });

    console.log(`Code generated for user ${userId}: ${result.tokensUsed} tokens used`);

    return NextResponse.json({
      success: true,
      code: result.generatedCode,
      explanation: result.explanation,
      tokensUsed: result.tokensUsed || 0,
      remainingTokens: tokensLimit === -1 ? Infinity : tokensLimit - tokensUsed - (result.tokensUsed || 0),
    });

  } catch (error) {
    console.error('JoxCoder Generation Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
