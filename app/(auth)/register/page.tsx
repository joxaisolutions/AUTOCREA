import { SignUp } from "@clerk/nextjs"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white",
            card: "bg-slate-800/50 border-slate-700",
            headerTitle: "text-slate-200",
            headerSubtitle: "text-slate-400",
            socialButtonsBlockButton: "bg-slate-700 border-slate-600 hover:bg-slate-600",
            formFieldLabel: "text-slate-300",
            formFieldInput: "bg-slate-900 border-slate-700 text-slate-200",
            footerActionLink: "text-cyan-400 hover:text-cyan-300"
          }
        }}
        routing="path"
        path="/register"
        signInUrl="/login"
        redirectUrl="/chat"
      />
    </div>
  )
}
