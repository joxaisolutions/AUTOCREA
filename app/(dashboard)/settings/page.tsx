'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Key, CreditCard, User, Sparkles, Check, Eye, EyeOff, Zap, Shield, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PLAN_LIMITS, UserPlan } from '@/lib/joxcoder/types'

const PLAN_FEATURES: Record<UserPlan, { title: string; icon: any; color: string; features: string[] }> = {
  starter: {
    title: 'Starter',
    icon: Rocket,
    color: 'text-green-400',
    features: [
      '100 generaciones/mes',
      '4 roles técnicos',
      '3 lenguajes principales',
      'Soporte comunidad',
      'Hasta 3 repositorios',
    ],
  },
  professional: {
    title: 'Professional',
    icon: Zap,
    color: 'text-cyan-400',
    features: [
      '500 generaciones/mes',
      '8 roles técnicos',
      '8+ lenguajes',
      'Soporte prioritario',
      'Hasta 15 repositorios',
      'Analytics avanzados',
    ],
  },
  enterprise: {
    title: 'Enterprise',
    icon: Shield,
    color: 'text-purple-400',
    features: [
      '2000 generaciones/mes',
      'Todos los 12 roles',
      'Todos los lenguajes',
      'Soporte dedicado',
      'Repositorios ilimitados',
      'Pentesting automático',
      'API access',
    ],
  },
  custom: {
    title: 'Custom',
    icon: Sparkles,
    color: 'text-pink-400',
    features: [
      'Generaciones ilimitadas',
      'Todos los roles',
      'Modelos personalizados',
      'Soporte 24/7',
      'White-label',
      'On-premise deployment',
    ],
  },
}

export default function SettingsPage() {
  const [showOpenAI, setShowOpenAI] = useState(false)
  const [showAnthropic, setShowAnthropic] = useState(false)
  const [showGoogle, setShowGoogle] = useState(false)
  const [saved, setSaved] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<UserPlan>('starter')
  const [generationsUsed, setGenerationsUsed] = useState(24)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const currentLimits = PLAN_LIMITS[currentPlan]
  const usagePercentage = (generationsUsed / currentLimits.generationsPerMonth) * 100

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-200 mb-2">Configuración</h1>
        <p className="text-slate-400">Gestiona tu plan de JoxCoder AI y preferencias</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Current Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Uso de Generaciones
              </CardTitle>
              <CardDescription>
                Plan actual: <span className="font-semibold text-cyan-400">{PLAN_FEATURES[currentPlan].title}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg mb-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-slate-400 mb-2">Generaciones este mes</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {generationsUsed} / {currentLimits.generationsPerMonth}
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
                
                <p className="text-xs text-slate-400 text-center mt-2">
                  {currentLimits.generationsPerMonth - generationsUsed} generaciones restantes
                </p>
              </div>

              {/* Plan Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Roles disponibles:</span>
                  <span className="font-semibold">{currentLimits.availableRoles.length} roles</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Lenguajes:</span>
                  <span className="font-semibold">{currentLimits.availableLanguages.length} lenguajes</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Repositorios:</span>
                  <span className="font-semibold">
                    {currentLimits.repositoriesLimit === 9999 ? 'Ilimitados' : currentLimits.repositoriesLimit}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Soporte:</span>
                  <span className="font-semibold capitalize">{currentLimits.supportLevel}</span>
                </div>
              </div>

              {usagePercentage > 80 && (
                <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-sm text-orange-300">
                    ⚠️ Has usado más del 80% de tus generaciones. Considera hacer upgrade.
                  </p>
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

        {/* Right Column - Plans */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                Planes de Suscripción
              </CardTitle>
              <CardDescription>
                Elige el plan perfecto para tus necesidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Starter Plan */}
                <div
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    currentPlan === 'starter'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setCurrentPlan('starter')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-green-400" />
                      <h5 className="font-semibold text-lg">Starter</h5>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">$29</p>
                      <p className="text-xs text-slate-500">/ mes</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {PLAN_FEATURES.starter.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {currentPlan === 'starter' && (
                    <div className="text-xs text-green-400 font-medium">✓ Plan actual</div>
                  )}
                </div>

                {/* Professional Plan */}
                <div
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative ${
                    currentPlan === 'professional'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-cyan-500/30 hover:border-cyan-500/50 bg-cyan-500/5'
                  }`}
                  onClick={() => setCurrentPlan('professional')}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full">
                      RECOMENDADO
                    </span>
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <h5 className="font-semibold text-lg">Professional</h5>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-400">$79</p>
                      <p className="text-xs text-slate-500">/ mes</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {PLAN_FEATURES.professional.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {currentPlan === 'professional' && (
                    <div className="text-xs text-cyan-400 font-medium">✓ Plan actual</div>
                  )}
                </div>

                {/* Enterprise Plan */}
                <div
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    currentPlan === 'enterprise'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setCurrentPlan('enterprise')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-400" />
                      <h5 className="font-semibold text-lg">Enterprise</h5>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-400">$199</p>
                      <p className="text-xs text-slate-500">/ mes</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {PLAN_FEATURES.enterprise.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {currentPlan === 'enterprise' && (
                    <div className="text-xs text-purple-400 font-medium">✓ Plan actual</div>
                  )}
                </div>

                <Button className="w-full" disabled>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Gestionar Suscripción (Próximamente)
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Pagos seguros procesados por Stripe
                </p>
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
                  <span><strong>Pentesting y seguridad</strong> (Enterprise)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
