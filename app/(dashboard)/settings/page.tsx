import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Key, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-200 mb-2">Configuración</h1>
        <p className="text-slate-400">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="space-y-6">
        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400" />
              API Keys (Opcionales)
            </CardTitle>
            <CardDescription>
              Conecta APIs externas como GPT-4 o Claude para funciones adicionales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">OpenAI API Key</label>
                <input
                  type="password"
                  placeholder="sk-..."
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Anthropic API Key</label>
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <Button>Guardar API Keys</Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              Suscripción
            </CardTitle>
            <CardDescription>
              Plan Free Trial - 100 tokens disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Actualizar Plan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
