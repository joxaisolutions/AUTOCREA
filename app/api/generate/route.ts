import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectName, description, userId, model = "joxcoder" } = body;

    if (!projectName || !description) {
      return NextResponse.json(
        { error: "Project name and description are required" },
        { status: 400 }
      );
    }

    const estimatedTokens = Math.ceil(description.length / 4) * 10;

    return NextResponse.json({
      success: true,
      message: "Generation queued",
      estimatedTokens,
      projectId: `demo-${Date.now()}`,
      status: "queued",
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to start generation" },
      { status: 500 }
    );
  }
}
