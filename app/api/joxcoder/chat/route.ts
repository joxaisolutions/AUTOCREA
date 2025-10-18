import { NextRequest, NextResponse } from 'next/server';
import { getJoxCoder } from '@/lib/joxcoder/relevance-client';
import { auth } from '@clerk/nextjs/server';

interface ChatRequest {
  message: string;
  conversationId?: string;
  context?: {
    files?: Array<{ name: string; content: string }>;
    projectInfo?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await auth();
    const userId = authResult.userId;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body: ChatRequest = await request.json();
    
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'El mensaje no puede estar vacío' },
        { status: 400 }
      );
    }

    const joxcoder = getJoxCoder();

    const result = await joxcoder.chat(body.message, {
      files: body.context?.files,
      projectInfo: body.context?.projectInfo || 'Proyecto AUTOCREA V2.0',
      conversationId: body.conversationId
    });

    return NextResponse.json({
      success: result.success,
      response: result.response,
      conversationId: result.conversationId,
      error: result.error
    });

  } catch (error) {
    console.error('Error en API de JoxCoder:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}
