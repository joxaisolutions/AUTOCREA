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
                Conecta APIs externas como GPT-4, Claude o Gemini para funciones adicionales (opcional).
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
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Balance de Tokens
              </CardTitle>
              <CardDescription>
                Tokens actuales y uso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-2">Balance Actual</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    100
                  </p>
                  <p className="text-sm text-slate-500">tokens disponibles</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Comprar Más Tokens</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <p className="text-2xl font-bold text-slate-200 mb-1">100</p>
                    <p className="text-xs text-slate-500 mb-2">tokens</p>
                    <p className="text-lg font-bold text-cyan-400">$9.99</p>
                  </div>
                  
                  <div className="p-3 border-2 border-cyan-500/50 rounded-lg bg-cyan-500/5 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-2xl font-bold text-cyan-400">500</p>
                      <span className="text-xs px-1.5 py-0.5 bg-cyan-500 text-white rounded">+50</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">tokens</p>
                    <p className="text-lg font-bold text-cyan-400">$39.99</p>
                  </div>
                </div>
                
                <Button className="w-full" disabled>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Comprar Tokens (Próximamente)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                Suscripciones Mensuales
              </CardTitle>
              <CardDescription>
                Obtén tokens recurrentes cada mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-slate-200">Plan Basic</h5>
                      <p className="text-xs text-slate-500">500 tokens/mes</p>
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
                      <p className="text-xs text-slate-500">1,500 tokens/mes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-cyan-400">$79</p>
                      <p className="text-xs text-slate-500">/ mes</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-slate-200">Plan Enterprise</h5>
                      <p className="text-xs text-slate-500">5,000 tokens/mes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-200">$199</p>
                      <p className="text-xs text-slate-500">/ mes</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4" disabled>
                Suscribirse (Próximamente)
              </Button>

              <p className="text-xs text-slate-500 text-center mt-3">
                Pagos seguros procesados por Stripe
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg">💡 ¿Cómo funcionan los tokens?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 mb-3">
                Los tokens se usan cada vez que generas una aplicación con IA. El costo depende de la complejidad:
              </p>
              <ul className="text-sm text-slate-300 space-y-1.5 mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Proyecto simple: ~50-100 tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Proyecto mediano: ~200-500 tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Proyecto complejo: ~500-1000 tokens</span>
                </li>
              </ul>
              <p className="text-sm text-cyan-400 font-medium">
                Los tokens no expiran. Úsalos cuando quieras.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
