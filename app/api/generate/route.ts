import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectName, description, userId, useHybrid = true } = body;

    if (!projectName || !description) {
      return NextResponse.json(
        { error: "Project name and description are required" },
        { status: 400 }
      );
    }

    const estimatedTokens = Math.ceil(description.length / 4) * 15;

    const agentPlan = [
      { role: "architect", model: "DeepSeek-33B", reason: "System design expertise" },
      { role: "backend", model: "CodeLlama-34B", reason: "API development" },
      { role: "frontend", model: "CodeLlama-34B", reason: "UI/UX development" },
      { role: "devops", model: "DeepSeek-33B", reason: "Infrastructure setup" },
      { role: "security", model: "DeepSeek-33B", reason: "Security audit" }
    ];

    return NextResponse.json({
      success: true,
      message: "Generation queued for JoxCoder Hybrid system",
      estimatedTokens,
      projectId: `joxcoder-${Date.now()}`,
      status: "queued",
      hybridInfo: {
        totalAgents: 5,
        agentPlan,
        modelsUsed: ["DeepSeek-Coder-33B", "CodeLlama-34B"],
        estimatedTime: "2-3 minutes"
      }
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to start generation" },
      { status: 500 }
    );
  }
}
