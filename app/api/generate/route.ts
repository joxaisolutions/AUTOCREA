import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectName, description, userId, aiProvider = "auto" } = body;

    if (!projectName || !description) {
      return NextResponse.json(
        { error: "Project name and description are required" },
        { status: 400 }
      );
    }

    const estimatedTokens = Math.ceil(description.length / 4) * 15;

    const relevanceConfigured = !!(
      process.env.RELEVANCE_AI_REGION &&
      process.env.RELEVANCE_AI_PROJECT_ID &&
      process.env.RELEVANCE_AI_API_KEY &&
      process.env.RELEVANCE_AI_AGENT_ID
    );

    const joxcoderConfigured = !!(
      process.env.JOXCODER_DEEPSEEK_API_URL &&
      process.env.JOXCODER_DEEPSEEK_API_KEY &&
      process.env.JOXCODER_CODELLAMA_API_URL &&
      process.env.JOXCODER_CODELLAMA_API_KEY
    );

    let selectedProvider = aiProvider;
    if (aiProvider === "auto") {
      if (relevanceConfigured) {
        selectedProvider = "relevance";
      } else if (joxcoderConfigured) {
        selectedProvider = "joxcoder";
      } else {
        selectedProvider = "none";
      }
    }

    let agentPlan;
    let systemInfo;

    if (selectedProvider === "relevance") {
      agentPlan = [
        { role: "architect", model: "Relevance AI Agent", reason: "System design and architecture" },
        { role: "backend", model: "Relevance AI Agent", reason: "API and database implementation" },
        { role: "frontend", model: "Relevance AI Agent", reason: "UI/UX development" },
        { role: "devops", model: "Relevance AI Agent", reason: "Infrastructure and deployment" },
        { role: "security", model: "Relevance AI Agent", reason: "Security audit and best practices" }
      ];

      systemInfo = {
        provider: "Relevance AI",
        totalAgents: 5,
        agentPlan,
        modelsUsed: ["Relevance AI Custom Agent"],
        estimatedTime: "2-3 minutes"
      };
    } else if (selectedProvider === "joxcoder") {
      agentPlan = [
        { role: "architect", model: "DeepSeek-33B", reason: "System design expertise" },
        { role: "backend", model: "CodeLlama-34B", reason: "API development" },
        { role: "frontend", model: "CodeLlama-34B", reason: "UI/UX development" },
        { role: "devops", model: "DeepSeek-33B", reason: "Infrastructure setup" },
        { role: "security", model: "DeepSeek-33B", reason: "Security audit" }
      ];

      systemInfo = {
        provider: "JoxCoder Hybrid",
        totalAgents: 5,
        agentPlan,
        modelsUsed: ["DeepSeek-Coder-33B", "CodeLlama-34B"],
        estimatedTime: "2-3 minutes"
      };
    } else {
      return NextResponse.json(
        {
          error: "No AI provider configured",
          message: "Please configure either Relevance AI or JoxCoder in environment variables",
          requiredVars: {
            relevance: [
              "RELEVANCE_AI_REGION",
              "RELEVANCE_AI_PROJECT_ID", 
              "RELEVANCE_AI_API_KEY",
              "RELEVANCE_AI_AGENT_ID"
            ],
            joxcoder: [
              "JOXCODER_DEEPSEEK_API_URL",
              "JOXCODER_DEEPSEEK_API_KEY",
              "JOXCODER_CODELLAMA_API_URL",
              "JOXCODER_CODELLAMA_API_KEY"
            ]
          }
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Generation queued for ${systemInfo.provider}`,
      estimatedTokens,
      projectId: `${selectedProvider}-${Date.now()}`,
      status: "queued",
      aiProvider: selectedProvider,
      systemInfo
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to start generation" },
      { status: 500 }
    );
  }
}
