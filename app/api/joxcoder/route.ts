import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      prompt, 
      agentRole,
      preferredModel = "auto",
      temperature = 0.7 
    } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const deepSeekUrl = process.env.JOXCODER_DEEPSEEK_API_URL;
    const deepSeekKey = process.env.JOXCODER_DEEPSEEK_API_KEY;
    const codeLlamaUrl = process.env.JOXCODER_CODELLAMA_API_URL;
    const codeLlamaKey = process.env.JOXCODER_CODELLAMA_API_KEY;

    if (!deepSeekUrl || !deepSeekKey || !codeLlamaUrl || !codeLlamaKey) {
      return NextResponse.json(
        {
          error: "JoxCoder Hybrid API not configured",
          message: "JoxCoder Hybrid API credentials not found in environment variables",
          status: "pending_configuration",
          requiredVars: [
            "JOXCODER_DEEPSEEK_API_URL",
            "JOXCODER_DEEPSEEK_API_KEY",
            "JOXCODER_CODELLAMA_API_URL",
            "JOXCODER_CODELLAMA_API_KEY"
          ]
        },
        { status: 503 }
      );
    }

    const modelDecision = decideModel(prompt, agentRole, preferredModel);

    return NextResponse.json({
      success: true,
      message: "JoxCoder Hybrid integration ready",
      modelSelected: modelDecision.model,
      confidence: modelDecision.confidence,
      status: "ready",
      hybridInfo: {
        deepSeek: "DeepSeek-Coder-33B (Architecture, Blockchain, DevOps, Security)",
        codeLlama: "CodeLlama-34B (Frontend, Backend, Python/JS, Debugging)"
      }
    });
  } catch (error) {
    console.error("JoxCoder Hybrid API error:", error);
    return NextResponse.json(
      { error: "JoxCoder Hybrid API request failed" },
      { status: 500 }
    );
  }
}

function decideModel(
  prompt: string, 
  agentRole?: string,
  preferredModel?: string
): { model: string; confidence: number } {
  if (preferredModel && preferredModel !== "auto") {
    return { model: preferredModel, confidence: 1.0 };
  }

  const promptLower = prompt.toLowerCase();
  
  const deepSeekKeywords = [
    "arquitectura", "architecture", "blockchain", "smart contract",
    "devops", "kubernetes", "docker", "terraform", "infrastructure",
    "security", "audit", "vulnerabilidad", "solidity", "web3"
  ];

  const codeLlamaKeywords = [
    "react", "vue", "angular", "frontend", "ui", "component",
    "python", "javascript", "typescript", "debug", "api", "database"
  ];

  let deepSeekScore = 0;
  let codeLlamaScore = 0;

  deepSeekKeywords.forEach(keyword => {
    if (promptLower.includes(keyword)) deepSeekScore++;
  });

  codeLlamaKeywords.forEach(keyword => {
    if (promptLower.includes(keyword)) codeLlamaScore++;
  });

  if (agentRole === "architect" || agentRole === "devops" || agentRole === "security") {
    deepSeekScore += 3;
  }

  if (agentRole === "frontend" || agentRole === "backend") {
    codeLlamaScore += 2;
  }

  const model = deepSeekScore > codeLlamaScore ? "deepseek" : "codellama";
  const total = deepSeekScore + codeLlamaScore;
  const confidence = total > 0 ? Math.max(deepSeekScore, codeLlamaScore) / total : 0.5;

  return { model, confidence };
}
