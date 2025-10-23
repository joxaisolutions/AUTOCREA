import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            AUTOCREA
          </h1>
          <p className="text-slate-400">Powered by JoxAI</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-sm text-cyan-400 font-medium">🎉 1,000 tokens gratis al registrarte</span>
          </div>
        </div>
        <SignUp 
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#06b6d4",
              colorBackground: "#0f172a",
              colorInputBackground: "#1e293b",
              colorInputText: "#f1f5f9",
              colorText: "#f1f5f9",
              colorTextSecondary: "#94a3b8",
              colorDanger: "#ef4444",
              borderRadius: "0.5rem",
            },
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
              formButtonPrimary: "bg-cyan-500 hover:bg-cyan-600 text-white",
              footerActionLink: "text-cyan-400 hover:text-cyan-300",
            }
          }}
          fallbackRedirectUrl="/chat"
        />
      </div>
    </div>
  );
}
