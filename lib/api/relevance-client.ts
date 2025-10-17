export interface RelevanceAIConfig {
  region: string;
  projectId: string;
  apiKey: string;
  agentId: string;
}

export interface RelevanceGenerationRequest {
  prompt: string;
  context?: string;
  agentRole?: "architect" | "backend" | "frontend" | "devops" | "security";
  previousSteps?: string[];
}

export interface RelevanceGenerationResponse {
  success: boolean;
  content: string;
  tokensUsed: number;
  conversationId?: string;
  error?: string;
}

export class RelevanceAIClient {
  private config: RelevanceAIConfig;
  private baseUrl: string;

  constructor(config: RelevanceAIConfig) {
    this.config = config;
    this.baseUrl = `https://api-${config.region}.stack.tryrelevance.com/latest`;
  }

  private getAuthToken(): string {
    return `${this.config.projectId}:${this.config.apiKey}`;
  }

  async generate(request: RelevanceGenerationRequest): Promise<RelevanceGenerationResponse> {
    try {
      const fullPrompt = this.buildPrompt(request);

      const response = await fetch(`${this.baseUrl}/agents/trigger`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.getAuthToken(),
        },
        body: JSON.stringify({
          message: {
            role: "user",
            content: fullPrompt,
          },
          agent_id: this.config.agentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Relevance AI API error: ${response.statusText}`);
      }

      const data = await response.json();

      const conversationId = data.conversation_id;
      const jobInfo = data.job_info;

      const result = await this.pollForResults(jobInfo.studio_id, jobInfo.job_id);

      return {
        success: true,
        content: result.content,
        tokensUsed: this.estimateTokens(result.content),
        conversationId,
      };
    } catch (error) {
      return {
        success: false,
        content: "",
        tokensUsed: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private async pollForResults(studioId: string, jobId: string, maxAttempts = 60): Promise<{ content: string }> {
    const pollUrl = `${this.baseUrl}/studios/${studioId}/async_poll/${jobId}`;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await fetch(pollUrl, {
        headers: {
          "Authorization": this.getAuthToken(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to poll for results");
      }

      const data = await response.json();

      for (const update of data.updates || []) {
        if (update.type === "chain-success") {
          const content = this.extractContent(data);
          return { content };
        }
        
        if (update.type === "chain-error") {
          throw new Error("Agent execution failed");
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error("Timeout waiting for agent response");
  }

  private extractContent(pollData: any): string {
    if (pollData.output) {
      if (typeof pollData.output === 'string') {
        return pollData.output;
      }
      if (pollData.output.answer) {
        return pollData.output.answer;
      }
      if (pollData.output.content) {
        return pollData.output.content;
      }
    }

    if (pollData.updates && pollData.updates.length > 0) {
      const lastUpdate = pollData.updates[pollData.updates.length - 1];
      if (lastUpdate.output) {
        return JSON.stringify(lastUpdate.output);
      }
    }

    return "Código generado exitosamente";
  }

  private buildPrompt(request: RelevanceGenerationRequest): string {
    let prompt = "";

    if (request.agentRole) {
      const roleInstructions = {
        architect: `Como arquitecto de software, diseña la arquitectura del sistema y selecciona las tecnologías apropiadas.`,
        backend: `Como desarrollador backend, implementa las APIs, modelos de datos y lógica de negocio.`,
        frontend: `Como desarrollador frontend, crea componentes de UI hermosos y responsivos.`,
        devops: `Como ingeniero DevOps, configura la infraestructura y pipelines de deployment.`,
        security: `Como auditor de seguridad, revisa el código en busca de vulnerabilidades y aplica mejores prácticas.`,
      };

      prompt += `${roleInstructions[request.agentRole]}\n\n`;
    }

    if (request.context) {
      prompt += `Contexto del proyecto:\n${request.context}\n\n`;
    }

    if (request.previousSteps && request.previousSteps.length > 0) {
      prompt += `Trabajo previo de otros agentes:\n${request.previousSteps.join("\n")}\n\n`;
    }

    prompt += `Tarea:\n${request.prompt}\n\nGenera código limpio, bien documentado y siguiendo las mejores prácticas.`;

    return prompt;
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  async generateMultiAgent(
    projectDescription: string
  ): Promise<{
    steps: Array<{ 
      role: string; 
      content: string; 
      tokensUsed: number;
    }>;
    totalTokens: number;
  }> {
    const agentRoles: Array<"architect" | "backend" | "frontend" | "devops" | "security"> = [
      "architect",
      "backend",
      "frontend",
      "devops",
      "security",
    ];

    const steps: Array<{ 
      role: string; 
      content: string; 
      tokensUsed: number;
    }> = [];
    const previousOutputs: string[] = [];

    for (const role of agentRoles) {
      const request: RelevanceGenerationRequest = {
        prompt: projectDescription,
        agentRole: role,
        previousSteps: previousOutputs,
      };

      const response = await this.generate(request);

      if (response.success) {
        steps.push({
          role,
          content: response.content,
          tokensUsed: response.tokensUsed,
        });
        previousOutputs.push(`${role}: ${response.content}`);
      } else {
        steps.push({
          role,
          content: `Error: ${response.error}`,
          tokensUsed: 0,
        });
      }
    }

    const totalTokens = steps.reduce((sum, step) => sum + step.tokensUsed, 0);

    return { steps, totalTokens };
  }
}

export function createRelevanceAIClient(): RelevanceAIClient | null {
  const region = process.env.RELEVANCE_AI_REGION;
  const projectId = process.env.RELEVANCE_AI_PROJECT_ID;
  const apiKey = process.env.RELEVANCE_AI_API_KEY;
  const agentId = process.env.RELEVANCE_AI_AGENT_ID;

  if (!region || !projectId || !apiKey || !agentId) {
    console.warn("Relevance AI credentials not configured");
    return null;
  }

  return new RelevanceAIClient({
    region,
    projectId,
    apiKey,
    agentId,
  });
}
