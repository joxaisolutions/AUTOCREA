import { NextResponse } from "next/server";

export async function GET() {
  const relevanceConfigured = !!(
    process.env.RELEVANCE_AI_REGION &&
    process.env.RELEVANCE_AI_PROJECT_ID &&
    process.env.RELEVANCE_AI_API_KEY &&
    process.env.RELEVANCE_AI_AGENT_ID
  );

  const clerkConfigured = !!(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY
  );

  const joxcoderConfigured = !!(
    process.env.JOXCODER_DEEPSEEK_API_URL &&
    process.env.JOXCODER_DEEPSEEK_API_KEY &&
    process.env.JOXCODER_CODELLAMA_API_URL &&
    process.env.JOXCODER_CODELLAMA_API_KEY
  );

  const convexConfigured = !!(
    process.env.NEXT_PUBLIC_CONVEX_URL &&
    process.env.CONVEX_DEPLOY_KEY
  );

  return NextResponse.json({
    integrations: {
      relevanceAI: {
        configured: relevanceConfigured,
        status: relevanceConfigured ? "active" : "not_configured",
        details: {
          region: !!process.env.RELEVANCE_AI_REGION,
          projectId: !!process.env.RELEVANCE_AI_PROJECT_ID,
          apiKey: !!process.env.RELEVANCE_AI_API_KEY,
          agentId: !!process.env.RELEVANCE_AI_AGENT_ID,
        }
      },
      clerk: {
        configured: clerkConfigured,
        status: clerkConfigured ? "active" : "not_configured",
        details: {
          publishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
          secretKey: !!process.env.CLERK_SECRET_KEY,
        }
      },
      joxcoder: {
        configured: joxcoderConfigured,
        status: joxcoderConfigured ? "active" : "not_configured",
      },
      convex: {
        configured: convexConfigured,
        status: convexConfigured ? "active" : "not_configured",
      }
    },
    ready: relevanceConfigured || joxcoderConfigured,
    recommendedProvider: relevanceConfigured ? "relevance" : joxcoderConfigured ? "joxcoder" : "none"
  });
}
