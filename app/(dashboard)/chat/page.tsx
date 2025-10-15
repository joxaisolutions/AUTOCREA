'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, Code2, Rocket, Sparkles } from 'lucide-react'
import { CodeEditor } from "@/components/chat/code-editor"
import { GenerationSteps } from "@/components/generation/generation-steps"
import { GenerationProgress } from "@/components/generation/generation-progress"
import { useChatStore, GenerationStep } from "@/lib/stores/chat-store"

export default function ChatPage() {
  const {
    projectName,
    projectDescription,
    isGenerating,
    steps,
    generatedCode,
    tokensUsed,
    estimatedTokens,
    setProjectName,
    setProjectDescription,
    setGenerating,
    addStep,
    updateStep,
    setGeneratedCode,
    setTokensUsed,
    setEstimatedTokens,
    reset,
  } = useChatStore()

  const [elapsedTime, setElapsedTime] = useState(0)
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGenerating) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    } else {
      setElapsedTime(0)
    }
    return () => clearInterval(interval)
  }, [isGenerating])

  const simulateGeneration = async () => {
    if (!projectName.trim() || !projectDescription.trim()) return
    
    setGenerating(true)
    setEstimatedTokens(Math.ceil(projectDescription.length / 4) * 10)
    
    const agentSteps: Array<{
      role: GenerationStep['role']
      name: string
      duration: number
    }> = [
      { role: 'architect', name: 'Diseñando arquitectura del sistema', duration: 3000 },
      { role: 'backend', name: 'Generando API y modelos de datos', duration: 4000 },
      { role: 'frontend', name: 'Creando interfaz de usuario', duration: 3500 },
      { role: 'devops', name: 'Configurando deployment y CI/CD', duration: 2500 },
      { role: 'security', name: 'Auditando seguridad del código', duration: 2000 },
    ]

    let totalTokens = 0

    for (let i = 0; i < agentSteps.length; i++) {
      const step = agentSteps[i]
      const stepId = `step-${Date.now()}-${i}`
      
      addStep({
        id: stepId,
        role: step.role,
        name: step.name,
        status: 'pending',
      })

      await new Promise(resolve => setTimeout(resolve, 500))

      updateStep(stepId, {
        status: 'in_progress',
        startedAt: Date.now(),
      })

      await new Promise(resolve => setTimeout(resolve, step.duration))

      const stepTokens = Math.floor(Math.random() * 30) + 20
      totalTokens += stepTokens

      updateStep(stepId, {
        status: 'completed',
        completedAt: Date.now(),
        tokensUsed: stepTokens,
        output: `✅ ${step.name} completado exitosamente`,
      })

      setTokensUsed(totalTokens)
    }

    const demoCode = `// ${projectName}
// Generado por AUTOCREA V2.0 con JoxCoder

import { useState, useEffect } from 'react'
import { Card, Button } from '@/components/ui'

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        ${projectName}
      </h1>
      <p className="text-slate-400 mb-8">
        ${projectDescription}
      </p>
      <div className="grid gap-4">
        {data.map((item) => (
          <Card key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Nota: Este es código de demostración
// La generación completa estará disponible cuando JoxCoder esté entrenado`

    setGeneratedCode(demoCode)
    setShowCode(true)
    setGenerating(false)
  }

  const handleReset = () => {
    reset()
    setShowCode(false)
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left Panel */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-cyan-400" />
                Describe tu aplicación
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Nombre del proyecto
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="mi-super-app"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  disabled={isGenerating}
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-sm text-slate-400 mb-2 block">
                  Descripción completa
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Ejemplo: Crear una plataforma de e-commerce con carrito de compras, pagos con Stripe, panel de administración..."
                  rows={6}
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  disabled={isGenerating}
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-500">Ejemplos rápidos:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Landing page con formulario',
                    'Blog con autenticación',
                    'Dashboard con gráficos',
                    'API REST completa'
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => setProjectDescription(example)}
                      className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-full text-slate-300 transition-colors"
                      disabled={isGenerating}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={simulateGeneration}
                  disabled={isGenerating || !projectDescription.trim() || !projectName.trim()}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Generar Aplicación
                    </>
                  )}
                </Button>
                {(steps.length > 0 || showCode) && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    disabled={isGenerating}
                  >
                    Nuevo
                  </Button>
                )}
              </div>

              <p className="text-xs text-slate-500 text-center">
                Costo estimado: {estimatedTokens || 50} tokens • ~2-3 minutos
              </p>
            </CardContent>
          </Card>

          {steps.length > 0 && (
            <GenerationProgress
              isGenerating={isGenerating}
              currentStep={steps.filter(s => s.status === 'completed').length}
              totalSteps={steps.length}
              tokensUsed={tokensUsed}
              estimatedTokens={estimatedTokens}
              elapsedTime={elapsedTime}
            />
          )}
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-6 min-h-0">
          {!showCode && steps.length === 0 ? (
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-green-400" />
                  Preview en Tiempo Real
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
                <Code2 className="w-16 h-16 text-slate-600 mb-4" />
                <p className="text-slate-400 text-lg font-medium mb-2">
                  Comienza a crear
                </p>
                <p className="text-slate-500 text-sm">
                  Describe tu aplicación y observa cómo AUTOCREA la construye
                </p>
              </CardContent>
            </Card>
          ) : showCode ? (
            <div className="flex-1 min-h-0">
              <CodeEditor 
                code={generatedCode}
                language="typescript"
                readOnly={true}
              />
            </div>
          ) : (
            <Card className="flex-1 overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Generación en Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <GenerationSteps 
                  steps={steps}
                  currentStep={steps.findIndex(s => s.status === 'in_progress') + 1}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
