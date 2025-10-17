import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, agentRole } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const region = process.env.RELEVANCE_AI_REGION;
    const projectId = process.env.RELEVANCE_AI_PROJECT_ID;
    const apiKey = process.env.RELEVANCE_AI_API_KEY;
    const agentId = process.env.RELEVANCE_AI_AGENT_ID;

    if (!region || !projectId || !apiKey || !agentId) {
      return NextResponse.json(
        {
          error: "Relevance AI not configured",
          message: "Relevance AI credentials not found in environment variables",
          status: "pending_configuration",
          requiredVars: [
            "RELEVANCE_AI_REGION",
            "RELEVANCE_AI_PROJECT_ID",
            "RELEVANCE_AI_API_KEY",
            "RELEVANCE_AI_AGENT_ID"
          ]
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Relevance AI integration ready",
      status: "ready",
      agentInfo: {
        region,
        agentId,
        model: "Relevance AI Agent"
      }
    });
  } catch (error) {
    console.error("Relevance AI API error:", error);
    return NextResponse.json(
      { error: "Relevance AI API request failed" },
      { status: 500 }
    );
  }
}
