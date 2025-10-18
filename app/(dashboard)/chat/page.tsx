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

  const generateWithAI = async () => {
    if (!projectName.trim() || !projectDescription.trim()) return
    
    setGenerating(true)
    setEstimatedTokens(Math.ceil(projectDescription.length / 4) * 50)
    
    try {
      const response = await fetch('/api/generate-with-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName,
          projectDescription,
        }),
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const data = await response.json()

      // Add steps as they come
      if (data.steps) {
        for (const step of data.steps) {
          const stepId = `step-${Date.now()}-${step.role}`
          
          addStep({
            id: stepId,
            role: step.role,
            name: step.name,
            status: 'completed',
            output: step.output,
            tokensUsed: step.tokensUsed,
          })

          setTokensUsed(data.totalTokens)
        }
      }

      setGeneratedCode(data.generatedCode)
      setShowCode(true)
    } catch (error) {
      console.error('Generation error:', error)
      alert('Error al generar. Por favor intenta de nuevo.')
    } finally {
      setGenerating(false)
    }
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
                  onClick={generateWithAI}
                  disabled={isGenerating || !projectDescription.trim() || !projectName.trim()}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generando con IA...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Generar con Relevance AI
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
