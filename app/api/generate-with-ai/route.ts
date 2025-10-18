import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

interface GenerationRequest {
  projectName: string;
  projectDescription: string;
}

interface AgentStep {
  role: 'architect' | 'backend' | 'frontend' | 'devops' | 'security';
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  output?: string;
  tokensUsed?: number;
}

async function callRelevanceAI(prompt: string, role: string): Promise<{ output: string; tokens: number }> {
  const region = process.env.RELEVANCE_AI_REGION;
  const projectId = process.env.RELEVANCE_AI_PROJECT_ID;
  const agentId = process.env.RELEVANCE_AI_AGENT_ID;
  const apiKey = process.env.RELEVANCE_AI_API_KEY;

  if (!region || !projectId || !agentId || !apiKey) {
    throw new Error("Relevance AI not configured");
  }

  const url = `https://api-${region}.stack.tryrelevance.com/latest/agents/trigger`;

  const rolePrompts = {
    architect: `Como Arquitecto de Software Senior, analiza el siguiente proyecto y diseña la arquitectura completa del sistema. Incluye:
- Estructura de carpetas y archivos
- Tecnologías recomendadas
- Diagrama de arquitectura
- Decisiones técnicas clave

Proyecto: ${prompt}`,
    backend: `Como Desarrollador Backend Senior, crea el código completo para el backend. Incluye:
- API endpoints
- Modelos de datos
- Lógica de negocio
- Conexión a base de datos

Proyecto: ${prompt}`,
    frontend: `Como Desarrollador Frontend Senior, crea el código completo para la interfaz de usuario. Incluye:
- Componentes React/Next.js
- Estilos con Tailwind CSS
- Estado y manejo de datos
- Integración con API

Proyecto: ${prompt}`,
    devops: `Como Ingeniero DevOps Senior, configura el deployment y CI/CD. Incluye:
- Configuración de deployment
- Variables de entorno
- Scripts de build
- Documentación de deploy

Proyecto: ${prompt}`,
    security: `Como Auditor de Seguridad Senior, revisa y asegura el proyecto. Incluye:
- Análisis de vulnerabilidades
- Mejores prácticas de seguridad
- Validación de inputs
- Protección de datos sensibles

Proyecto: ${prompt}`,
  };

  const fullPrompt = rolePrompts[role as keyof typeof rolePrompts] || prompt;

  // Trigger agent
  const triggerResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        role: "user",
        content: fullPrompt,
      },
      agent_id: agentId,
    }),
  });

  if (!triggerResponse.ok) {
    throw new Error(`Relevance AI trigger failed: ${triggerResponse.statusText}`);
  }

  const triggerData = await triggerResponse.json();
  const { studio_id: studioId, job_id: jobId } = triggerData;

  // Poll for results
  const pollUrl = `https://api-${region}.stack.tryrelevance.com/latest/studios/${studioId}/async_poll/${jobId}`;
  
  let attempts = 0;
  const maxAttempts = 120; // 2 minutes max

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pollResponse = await fetch(pollUrl, {
      headers: {
        "Authorization": apiKey,
      },
    });

    if (!pollResponse.ok) {
      throw new Error(`Polling failed: ${pollResponse.statusText}`);
    }

    const pollData = await pollResponse.json();

    if (pollData.type === "chain-success") {
      const output = pollData.output?.answer || pollData.output?.output || JSON.stringify(pollData.output);
      const tokens = Math.ceil(fullPrompt.length / 4) + Math.ceil(output.length / 4);
      
      return {
        output,
        tokens,
      };
    } else if (pollData.type === "chain-error") {
      throw new Error(`Agent error: ${pollData.message || "Unknown error"}`);
    }

    attempts++;
  }

  throw new Error("Timeout waiting for agent response");
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await auth();
    const userId = authResult.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: GenerationRequest = await request.json();
    const { projectName, projectDescription } = body;

    if (!projectName || !projectDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const agentRoles: Array<{ role: AgentStep['role']; name: string }> = [
      { role: 'architect', name: 'Diseñando arquitectura del sistema' },
      { role: 'backend', name: 'Generando API y lógica de negocio' },
      { role: 'frontend', name: 'Creando interfaz de usuario' },
      { role: 'devops', name: 'Configurando deployment' },
      { role: 'security', name: 'Auditando seguridad' },
    ];

    const steps: AgentStep[] = [];
    let totalTokens = 0;
    let fullContext = `Proyecto: ${projectName}\n\nDescripción: ${projectDescription}\n\n`;

    for (const agent of agentRoles) {
      try {
        const result = await callRelevanceAI(fullContext, agent.role);
        
        steps.push({
          role: agent.role,
          name: agent.name,
          status: 'completed',
          output: result.output,
          tokensUsed: result.tokens,
        });

        totalTokens += result.tokens;
        fullContext += `\n\n=== ${agent.name.toUpperCase()} ===\n${result.output}\n`;

      } catch (error) {
        console.error(`Error in ${agent.role}:`, error);
        steps.push({
          role: agent.role,
          name: agent.name,
          status: 'error',
          output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          tokensUsed: 0,
        });
      }
    }

    // Generate final code summary
    const finalCode = `/**
 * ${projectName}
 * Generado por AUTOCREA V2.0 - Powered by JoxAI
 * 
 * ${projectDescription}
 */

${fullContext}

// Total tokens usados: ${totalTokens}
// Generado con IA: Relevance AI
`;

    return NextResponse.json({
      success: true,
      steps,
      totalTokens,
      generatedCode: finalCode,
      projectId: `${userId}-${Date.now()}`,
    });

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
