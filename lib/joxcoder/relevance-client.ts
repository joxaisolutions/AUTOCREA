interface RelevanceConfig {
  apiKey: string;
  region: string;
  projectId: string;
  agentId: string;
}

interface JoxCoderMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface JoxCoderResponse {
  success: boolean;
  response?: string;
  conversationId?: string;
  error?: string;
  tokensUsed?: number;
}

export class JoxCoderClient {
  private apiKey: string;
  private region: string;
  private projectId: string;
  private agentId: string;
  private conversationHistory: JoxCoderMessage[] = [];

  constructor(config: RelevanceConfig) {
    this.apiKey = config.apiKey;
    this.region = config.region;
    this.projectId = config.projectId;
    this.agentId = config.agentId;
  }

  async chat(
    message: string, 
    context?: {
      files?: Array<{ name: string; content: string }>;
      projectInfo?: string;
      conversationId?: string;
    }
  ): Promise<JoxCoderResponse> {
    try {
      const enrichedMessage = this.buildEnrichedMessage(message, context);

      this.conversationHistory.push({
        role: 'user',
        content: enrichedMessage,
        timestamp: new Date()
      });

      const url = `https://api-${this.region}.stack.tryrelevance.com/latest/agents/trigger`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this.apiKey}`
        },
        body: JSON.stringify({
          message: {
            role: 'user',
            content: enrichedMessage
          },
          agent_id: this.agentId,
          project_id: this.projectId
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = this.extractAssistantMessage(data);

      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date()
      });

      return {
        success: true,
        response: assistantMessage,
        conversationId: data.conversation_id || context?.conversationId,
        tokensUsed: data.tokens_used
      };

    } catch (error) {
      console.error('JoxCoder Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  private buildEnrichedMessage(
    message: string, 
    context?: {
      files?: Array<{ name: string; content: string }>;
      projectInfo?: string;
    }
  ): string {
    let enrichedMessage = message;

    if (context?.projectInfo) {
      enrichedMessage = `CONTEXTO DEL PROYECTO:\n${context.projectInfo}\n\n${enrichedMessage}`;
    }

    if (context?.files && context.files.length > 0) {
      const filesContext = context.files.map(file => 
        `\n--- ARCHIVO: ${file.name} ---\n${file.content}\n--- FIN ARCHIVO ---`
      ).join('\n');
      
      enrichedMessage = `${enrichedMessage}\n\nARCHIVOS RELEVANTES:${filesContext}`;
    }

    return enrichedMessage;
  }

  private extractAssistantMessage(data: any): string {
    return data.output?.answer || 
           data.output?.message || 
           data.output ||
           data.message || 
           'No se recibió respuesta del agente';
  }

  private generateConversationId(): string {
    return `autocrea_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getConversationHistory(): JoxCoderMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}

let joxCoderInstance: JoxCoderClient | null = null;

export function getJoxCoder(): JoxCoderClient {
  if (!joxCoderInstance) {
    const apiKey = process.env.RELEVANCE_AI_API_KEY;
    const region = process.env.RELEVANCE_AI_REGION;
    const projectId = process.env.RELEVANCE_AI_PROJECT_ID;
    const agentId = process.env.RELEVANCE_AI_AGENT_ID;

    if (!apiKey || !region || !projectId || !agentId) {
      throw new Error(
        'Faltan credenciales de Relevance AI. ' +
        'Configura las variables de entorno necesarias'
      );
    }

    joxCoderInstance = new JoxCoderClient({
      apiKey,
      region,
      projectId,
      agentId
    });
  }

  return joxCoderInstance;
}

export type { JoxCoderMessage, JoxCoderResponse, RelevanceConfig };
