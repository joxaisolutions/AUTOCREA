'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Key, CreditCard, Sparkles, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth, UserButton } from "@clerk/nextjs"
import Link from 'next/link'
import { useState } from 'react'

export default function SettingsPage() {
  const { has } = useAuth()
  const [showOpenAI, setShowOpenAI] = useState(false)
  const [showAnthropic, setShowAnthropic] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Check user features from Clerk Billing
  const hasTokens1000 = has({ feature: 'tokens_1000' })
  const hasTokens10000 = has({ feature: 'tokens_10000' })
  const hasTokens30000 = has({ feature: 'tokens_30000' })
  const hasUnlimitedTokens = has({ feature: 'unlimited_tokens' })
  const hasGithubIntegration = has({ feature: 'github_integration' })
  const hasPrioritySupport = has({ feature: 'priority_support' })

  // Determine current plan based on features
  let currentPlanName = 'Free Trial'
  let currentTokens = 1000
  let currentProjects = 1

  if (hasUnlimitedTokens) {
    currentPlanName = 'Enterprise'
    currentTokens = -1
    currentProjects = -1
  } else if (hasTokens30000) {
    currentPlanName = 'Pro'
    currentTokens = 30000
    currentProjects = 20
  } else if (hasTokens10000) {
    currentPlanName = 'Creator'
    currentTokens = 10000
    currentProjects = 5
  }

  // Mock usage for demo (TODO: integrate with Convex)
  const tokensUsed = 2450
  const usagePercentage = currentTokens === -1 ? 0 : (tokensUsed / currentTokens) * 100

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Configuración</h1>
          <p className="text-slate-400">Gestiona tu plan de JoxCoder AI y preferencias</p>
        </div>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-12 h-12"
            }
          }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Current Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Uso de Tokens
              </CardTitle>
              <CardDescription>
                Plan actual: <span className="font-semibold text-cyan-400">{currentPlanName}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg mb-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-slate-400 mb-2">Tokens este mes</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {currentTokens === -1 ? 'Ilimitados' : `${tokensUsed.toLocaleString()} / ${currentTokens.toLocaleString()}`}
                  </p>
                </div>
                
                {currentTokens !== -1 && (
                  <>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                      />
                    </div>
                    
                    <p className="text-xs text-slate-400 text-center mt-2">
                      {(currentTokens - tokensUsed).toLocaleString()} tokens restantes
                    </p>
                  </>
                )}
              </div>

              {/* Plan Features */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Tokens/mes:</span>
                  <span className="font-semibold">
                    {currentTokens === -1 ? 'Ilimitados' : currentTokens.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Proyectos:</span>
                  <span className="font-semibold">
                    {currentProjects === -1 ? 'Ilimitados' : currentProjects}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">GitHub Integration:</span>
                  <span className={`font-semibold ${hasGithubIntegration ? 'text-green-400' : 'text-slate-500'}`}>
                    {hasGithubIntegration ? '✓ Activo' : '✗ No disponible'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Soporte:</span>
                  <span className="font-semibold capitalize">
                    {hasPrioritySupport ? 'Prioritario' : 'Comunidad'}
                  </span>
                </div>
              </div>

              {usagePercentage > 80 && currentTokens !== -1 && (
                <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-sm text-orange-300">
                    ⚠️ Has usado más del 80% de tus tokens. Considera hacer upgrade.
                  </p>
                  <Link href="/pricing">
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Ver Planes
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" />
                API Keys Externas (Opcionales)
              </CardTitle>
              <CardDescription>
                APIs adicionales para funciones específicas (opcional)
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Billing Management */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                Gestión de Suscripción
              </CardTitle>
              <CardDescription>
                Administra tu plan y facturación con Clerk Billing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-400">Plan Actual</p>
                      <p className="text-2xl font-bold text-slate-200">{currentPlanName}</p>
                    </div>
                    <Sparkles className="w-10 h-10 text-cyan-400" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">
                      {currentTokens === -1 ? 'Tokens ilimitados' : `${currentTokens.toLocaleString()} tokens/mes`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">
                      {currentProjects === -1 ? 'Proyectos ilimitados' : `Hasta ${currentProjects} proyectos`}
                    </span>
                  </div>
                </div>

                <Link href="/pricing" className="block">
                  <Button className="w-full" size="lg">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Ver Todos los Planes
                  </Button>
                </Link>

                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Para gestionar tu facturación, métodos de pago y facturas,
                    haz clic en tu foto de perfil arriba → Billing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg">💡 Powered by JoxCoder AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 mb-3">
                JoxCoder AI es un modelo especializado entrenado específicamente para desarrollo de software multi-rol:
              </p>
              <ul className="text-sm text-slate-300 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">🏗️</span>
                  <span><strong>12 roles técnicos</strong> especializados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">💻</span>
                  <span><strong>11+ lenguajes</strong> de programación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">⚡</span>
                  <span><strong>Código production-ready</strong> desde día 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">🔒</span>
                  <span><strong>Pentesting y seguridad</strong> integrados</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Billing Powered by Clerk */}
          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="text-center text-sm text-slate-500">
                <p>Pagos seguros procesados por</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="font-semibold text-slate-300">Clerk Billing</span>
                  <span className="text-slate-600">+</span>
                  <span className="font-semibold text-slate-300">Stripe</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
