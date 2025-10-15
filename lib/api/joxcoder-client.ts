export interface JoxCoderHybridConfig {
  deepSeekApiUrl: string;
  deepSeekApiKey: string;
  codeLlamaApiUrl: string;
  codeLlamaApiKey: string;
  routerUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerationRequest {
  prompt: string;
  context?: string;
  agentRole?: "architect" | "backend" | "frontend" | "devops" | "security";
  previousSteps?: string[];
  preferredModel?: "deepseek" | "codellama" | "auto";
}

export interface GenerationResponse {
  success: boolean;
  content: string;
  tokensUsed: number;
  modelUsed: string;
  error?: string;
}

export interface RouterDecision {
  model: "deepseek" | "codellama";
  confidence: number;
  reasoning: string;
}

export class JoxCoderHybridClient {
  private config: JoxCoderHybridConfig;

  constructor(config: JoxCoderHybridConfig) {
    this.config = {
      temperature: 0.7,
      maxTokens: 2000,
      ...config,
    };
  }

  private analyzePromptForRouter(request: GenerationRequest): RouterDecision {
    const prompt = request.prompt.toLowerCase();
    const role = request.agentRole || "backend";

    const deepSeekKeywords = [
      "arquitectura", "architecture", "blockchain", "smart contract",
      "devops", "kubernetes", "docker", "terraform", "infrastructure",
      "security", "audit", "vulnerabilidad", "solidity", "web3",
      "microservices", "distributed", "scalability"
    ];

    const codeLlamaKeywords = [
      "react", "vue", "angular", "frontend", "ui", "ux", "component",
      "python", "javascript", "typescript", "debug", "error", "fix",
      "api", "endpoint", "database", "sql", "mongodb", "express",
      "data science", "machine learning", "pandas", "numpy"
    ];

    let deepSeekScore = 0;
    let codeLlamaScore = 0;

    deepSeekKeywords.forEach(keyword => {
      if (prompt.includes(keyword)) deepSeekScore++;
    });

    codeLlamaKeywords.forEach(keyword => {
      if (prompt.includes(keyword)) codeLlamaScore++;
    });

    if (role === "architect" || role === "devops" || role === "security") {
      deepSeekScore += 3;
    }

    if (role === "frontend" || role === "backend") {
      codeLlamaScore += 2;
    }

    const model = deepSeekScore > codeLlamaScore ? "deepseek" : "codellama";
    const total = deepSeekScore + codeLlamaScore;
    const confidence = total > 0 ? Math.max(deepSeekScore, codeLlamaScore) / total : 0.5;

    return {
      model,
      confidence,
      reasoning: `DeepSeek score: ${deepSeekScore}, CodeLlama score: ${codeLlamaScore}`
    };
  }

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      let modelToUse: "deepseek" | "codellama";
      
      if (request.preferredModel && request.preferredModel !== "auto") {
        modelToUse = request.preferredModel;
      } else {
        const decision = this.analyzePromptForRouter(request);
        modelToUse = decision.model;
        console.log(`🎯 Router decision: ${decision.model} (confidence: ${decision.confidence.toFixed(2)})`);
      }

      const apiUrl = modelToUse === "deepseek" 
        ? this.config.deepSeekApiUrl 
        : this.config.codeLlamaApiUrl;
      
      const apiKey = modelToUse === "deepseek"
        ? this.config.deepSeekApiKey
        : this.config.codeLlamaApiKey;

      const fullPrompt = this.buildPrompt(request, modelToUse);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            temperature: this.config.temperature,
            max_new_tokens: this.config.maxTokens,
            return_full_text: false,
            do_sample: true,
            top_p: 0.95,
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
        modelUsed: modelToUse === "deepseek" ? "DeepSeek-33B" : "CodeLlama-34B",
      };
    } catch (error) {
      return {
        success: false,
        content: "",
        tokensUsed: 0,
        modelUsed: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private buildPrompt(request: GenerationRequest, model: "deepseek" | "codellama"): string {
    let prompt = "";

    if (request.agentRole) {
      const rolePrompts = {
        deepseek: {
          architect: `Eres un arquitecto de software experto especializado en diseño de sistemas distribuidos, microservicios y arquitecturas escalables. Diseña la arquitectura del sistema, selecciona las tecnologías apropiadas y planifica la estructura del proyecto.`,
          devops: `Eres un ingeniero DevOps experto en Kubernetes, Docker, Terraform e infraestructura como código. Configura pipelines de deployment, infraestructura y asegura la escalabilidad.`,
          security: `Eres un auditor de seguridad experto en OWASP, vulnerabilidades y mejores prácticas. Revisa el código en busca de vulnerabilidades, implementa prácticas de seguridad y asegura la protección de datos.`,
          backend: `Eres un desarrollador backend experto en APIs RESTful, GraphQL, bases de datos y lógica de negocio compleja. Implementa APIs robustas, modelos de datos y lógica de negocio.`,
          frontend: `Eres un desarrollador frontend experto en React, Vue, Angular y diseño de interfaces. Crea interfaces hermosas y responsivas con excelente UX.`,
        },
        codellama: {
          frontend: `Eres un desarrollador frontend senior experto en React, TypeScript, Next.js, Tailwind CSS y componentes modernos. Crea interfaces de usuario hermosas, responsivas y con excelente experiencia de usuario.`,
          backend: `Eres un desarrollador backend senior experto en Python, FastAPI, Node.js, Express, bases de datos SQL/NoSQL. Implementa APIs robustas con manejo de errores apropiado.`,
          architect: `Eres un arquitecto de software con experiencia en diseño de aplicaciones web modernas. Diseña la estructura del proyecto y selecciona las tecnologías apropiadas.`,
          devops: `Eres un ingeniero DevOps con experiencia en CI/CD, contenedores y deployment. Configura la infraestructura y pipelines de deployment.`,
          security: `Eres un experto en seguridad de aplicaciones web. Revisa el código e implementa las mejores prácticas de seguridad.`,
        }
      };

      const modelPrompts = model === "deepseek" ? rolePrompts.deepseek : rolePrompts.codellama;
      prompt += `${modelPrompts[request.agentRole]}\n\n`;
    }

    if (request.context) {
      prompt += `Contexto:\n${request.context}\n\n`;
    }

    if (request.previousSteps && request.previousSteps.length > 0) {
      prompt += `Pasos previos:\n${request.previousSteps.join("\n")}\n\n`;
    }

    prompt += `Tarea:\n${request.prompt}\n\nProporciona código limpio, bien documentado y siguiendo las mejores prácticas.`;

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
      modelUsed: string;
    }>;
    totalTokens: number;
  }> {
    const agentRoles: Array<{
      role: "architect" | "backend" | "frontend" | "devops" | "security";
      preferredModel: "deepseek" | "codellama";
    }> = [
      { role: "architect", preferredModel: "deepseek" },
      { role: "backend", preferredModel: "codellama" },
      { role: "frontend", preferredModel: "codellama" },
      { role: "devops", preferredModel: "deepseek" },
      { role: "security", preferredModel: "deepseek" },
    ];

    const steps: Array<{ 
      role: string; 
      content: string; 
      tokensUsed: number;
      modelUsed: string;
    }> = [];
    const previousOutputs: string[] = [];

    for (const { role, preferredModel } of agentRoles) {
      const request: GenerationRequest = {
        prompt: projectDescription,
        agentRole: role,
        previousSteps: previousOutputs,
        preferredModel,
      };

      const response = await this.generate(request);

      if (response.success) {
        steps.push({
          role,
          content: response.content,
          tokensUsed: response.tokensUsed,
          modelUsed: response.modelUsed,
        });
        previousOutputs.push(`${role} (${response.modelUsed}): ${response.content}`);
      } else {
        steps.push({
          role,
          content: `Error: ${response.error}`,
          tokensUsed: 0,
          modelUsed: "error",
        });
      }
    }

    const totalTokens = steps.reduce((sum, step) => sum + step.tokensUsed, 0);

    return { steps, totalTokens };
  }
}

export function createJoxCoderHybridClient(): JoxCoderHybridClient | null {
  const deepSeekApiUrl = process.env.JOXCODER_DEEPSEEK_API_URL;
  const deepSeekApiKey = process.env.JOXCODER_DEEPSEEK_API_KEY;
  const codeLlamaApiUrl = process.env.JOXCODER_CODELLAMA_API_URL;
  const codeLlamaApiKey = process.env.JOXCODER_CODELLAMA_API_KEY;

  if (!deepSeekApiUrl || !deepSeekApiKey || !codeLlamaApiUrl || !codeLlamaApiKey) {
    console.warn("JoxCoder Hybrid API credentials not fully configured");
    return null;
  }

  return new JoxCoderHybridClient({
    deepSeekApiUrl,
    deepSeekApiKey,
    codeLlamaApiUrl,
    codeLlamaApiKey,
  });
}
