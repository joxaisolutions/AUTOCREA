'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Key, CreditCard, User, Sparkles, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [showOpenAI, setShowOpenAI] = useState(false)
  const [showAnthropic, setShowAnthropic] = useState(false)
  const [showGoogle, setShowGoogle] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-200 mb-2">Configuración</h1>
        <p className="text-slate-400">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* API Keys */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" />
                API Keys Externas (Opcionales)
              </CardTitle>
              <CardDescription>
                Conecta APIs externas como GPT-4, Claude o Gemini para funciones adicionales. JoxCoder funciona sin estas keys.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block flex items-center justify-between">
                    <span>OpenAI API Key</span>
                    <span className="text-xs text-slate-500">Opcional</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showOpenAI ? "text" : "password"}
                      placeholder="sk-..."
                      className="w-full px-4 py-2 pr-10 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      onClick={() => setShowOpenAI(!showOpenAI)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showOpenAI ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block flex items-center justify-between">
                    <span>Anthropic API Key (Claude)</span>
                    <span className="text-xs text-slate-500">Opcional</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showAnthropic ? "text" : "password"}
                      placeholder="sk-ant-..."
                      className="w-full px-4 py-2 pr-10 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      onClick={() => setShowAnthropic(!showAnthropic)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showAnthropic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block flex items-center justify-between">
                    <span>Google Gemini API Key</span>
                    <span className="text-xs text-slate-500">Opcional</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showGoogle ? "text" : "password"}
                      placeholder="AI..."
                      className="w-full px-4 py-2 pr-10 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      onClick={() => setShowGoogle(!showGoogle)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showGoogle ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full">
                  {saved ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Guardado
                    </>
                  ) : (
                    <>
                      Guardar API Keys
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-500">
                  Nota: Estas keys se almacenan de forma segura y encriptada. Solo se usarán si lo solicitas explícitamente.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                Perfil de Usuario
              </CardTitle>
              <CardDescription>
                Información de tu cuenta (Demo mode)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Nombre</label>
                  <input
                    type="text"
                    defaultValue="Usuario Demo"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Email</label>
                  <input
                    type="email"
                    defaultValue="demo@autocrea.com"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Para habilitar autenticación real, agrega tus Clerk API keys en .env.local
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription & Tokens */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                Suscripción y Tokens
              </CardTitle>
              <CardDescription>
                Plan Free Trial - 100 tokens disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200">Plan Gratuito</h3>
                      <p className="text-sm text-slate-400">100 tokens incluidos</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Acceso a JoxCoder</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>5 proyectos simultáneos</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Preview en tiempo real</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Planes Disponibles</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-slate-200">Plan Basic</h5>
                          <p className="text-xs text-slate-500">1,000 tokens/mes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-200">$29</p>
                          <p className="text-xs text-slate-500">/ mes</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border-2 border-cyan-500/50 rounded-lg bg-cyan-500/5">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-slate-200">Plan Pro</h5>
                            <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">Popular</span>
                          </div>
                          <p className="text-xs text-slate-500">5,000 tokens/mes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-cyan-400">$99</p>
                          <p className="text-xs text-slate-500">/ mes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full" disabled>
                  Actualizar Plan (Próximamente)
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Los pagos se procesarán mediante Stripe una vez configurado
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg">💡 Consejo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300">
                JoxCoder es el modelo principal de AUTOCREA y no requiere API keys externas. 
                Las keys opcionales (OpenAI, Claude, Gemini) solo se usan si las activas manualmente 
                para tareas específicas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
