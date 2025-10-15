import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Clerk Authentication - Add your API keys in .env.local
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 mb-4">
            To enable authentication, add your Clerk API keys to .env.local
          </p>
          <Link href="/chat">
            <Button className="w-full">Go to Dashboard (Demo)</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
