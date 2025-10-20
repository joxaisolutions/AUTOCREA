import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getJoxCoder } from '@/lib/joxcoder/client';
import { JoxCoderRequest } from '@/lib/joxcoder/types';

export async function POST(request: NextRequest) {
  try {
    const { userId, isAuthenticated } = await auth();

    if (!isAuthenticated || !userId) {
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

    // TODO: Verificar límites del plan del usuario
    // const userPlan = await getUserPlan(userId);
    // if (!canGenerate(userPlan)) {
    //   return NextResponse.json(
    //     { error: 'Límite de generaciones alcanzado' },
    //     { status: 429 }
    //   );
    // }

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
    // await saveGeneration({
    //   userId,
    //   role: body.role,
    //   prompt: body.prompt,
    //   code: result.generatedCode,
    //   tokensUsed: result.tokensUsed,
    // });

    return NextResponse.json({
      success: true,
      code: result.generatedCode,
      explanation: result.explanation,
      tokensUsed: result.tokensUsed,
    });

  } catch (error) {
    console.error('JoxCoder Generation Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
