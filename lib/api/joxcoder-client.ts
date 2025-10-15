export interface JoxCoderConfig {
  apiUrl: string;
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerationRequest {
  prompt: string;
  context?: string;
  agentRole?: "architect" | "backend" | "frontend" | "devops" | "security";
  previousSteps?: string[];
}

export interface GenerationResponse {
  success: boolean;
  content: string;
  tokensUsed: number;
  model: string;
  error?: string;
}

export class JoxCoderClient {
  private config: JoxCoderConfig;

  constructor(config: JoxCoderConfig) {
    this.config = {
      model: "joxcoder-v1",
      temperature: 0.7,
      maxTokens: 2000,
      ...config,
    };
  }

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await fetch(this.config.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          inputs: this.buildPrompt(request),
          parameters: {
            temperature: this.config.temperature,
            max_new_tokens: this.config.maxTokens,
            return_full_text: false,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`JoxCoder API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        content: data[0]?.generated_text || "",
        tokensUsed: this.estimateTokens(data[0]?.generated_text || ""),
        model: this.config.model || "joxcoder-v1",
      };
    } catch (error) {
      return {
        success: false,
        content: "",
        tokensUsed: 0,
        model: this.config.model || "joxcoder-v1",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private buildPrompt(request: GenerationRequest): string {
    let prompt = "";

    if (request.agentRole) {
      const rolePrompts = {
        architect:
          "You are an expert software architect. Design the system architecture, select technologies, and plan the project structure.",
        backend:
          "You are an expert backend developer. Implement robust APIs, database models, and business logic.",
        frontend:
          "You are an expert frontend developer. Create beautiful, responsive user interfaces with excellent UX.",
        devops:
          "You are an expert DevOps engineer. Set up deployment pipelines, configure infrastructure, and ensure scalability.",
        security:
          "You are an expert security auditor. Review code for vulnerabilities, implement security best practices, and ensure data protection.",
      };
      prompt += `${rolePrompts[request.agentRole]}\n\n`;
    }

    if (request.context) {
      prompt += `Context:\n${request.context}\n\n`;
    }

    if (request.previousSteps && request.previousSteps.length > 0) {
      prompt += `Previous steps:\n${request.previousSteps.join("\n")}\n\n`;
    }

    prompt += `Task:\n${request.prompt}`;

    return prompt;
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  async generateMultiAgent(
    projectDescription: string
  ): Promise<{
    steps: Array<{ role: string; content: string; tokensUsed: number }>;
    totalTokens: number;
  }> {
    const roles: Array<"architect" | "backend" | "frontend" | "devops" | "security"> = [
      "architect",
      "backend",
      "frontend",
      "devops",
      "security",
    ];

    const steps: Array<{ role: string; content: string; tokensUsed: number }> = [];
    const previousOutputs: string[] = [];

    for (const role of roles) {
      const request: GenerationRequest = {
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

export function createJoxCoderClient(): JoxCoderClient | null {
  const apiUrl = process.env.JOXCODER_API_URL;
  const apiKey = process.env.JOXCODER_API_KEY;

  if (!apiUrl || !apiKey) {
    console.warn("JoxCoder API credentials not configured");
    return null;
  }

  return new JoxCoderClient({ apiUrl, apiKey });
}
