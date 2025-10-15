import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model = "joxcoder", temperature = 0.7 } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const joxcoderApiUrl = process.env.JOXCODER_API_URL;
    const joxcoderApiKey = process.env.JOXCODER_API_KEY;

    if (!joxcoderApiUrl || !joxcoderApiKey) {
      return NextResponse.json(
        {
          error: "JoxCoder API not configured",
          message: "JoxCoder API credentials not found in environment variables",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "JoxCoder integration ready",
      model,
      status: "pending_api_setup",
    });
  } catch (error) {
    console.error("JoxCoder API error:", error);
    return NextResponse.json(
      { error: "JoxCoder API request failed" },
      { status: 500 }
    );
  }
}
