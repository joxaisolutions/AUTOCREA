'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, Code2, Rocket } from 'lucide-react'

export default function ChatPage() {
  const [prompt, setPrompt] = useState('')
  const [projectName, setProjectName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])

  const handleGenerate = async () => {
    if (!prompt.trim() || !projectName.trim()) return
    
    setIsGenerating(true)
    setMessages(prev => [...prev, {
      role: 'user',
      content: `Proyecto: ${projectName}\n\n${prompt}`
    }])
    
    // Simulate generation
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `🚀 Generando "${projectName}"...\n\n✅ Arquitectura diseñada\n✅ Backend configurado\n✅ Frontend creado\n\n¡Tu aplicación está lista! (Demo mode - Integrations pending)`
      }])
      setIsGenerating(false)
      setPrompt('')
      setProjectName('')
    }, 2000)
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left: Input Panel */}
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
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ejemplo: Crear una plataforma de e-commerce con carrito de compras, pagos con Stripe, panel de administración..."
                rows={8}
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
                    onClick={() => setPrompt(example)}
                    className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-full text-slate-300 transition-colors"
                    disabled={isGenerating}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim() || !projectName.trim()}
              className="w-full"
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

            <p className="text-xs text-slate-500 text-center">
              Costo estimado: 50 tokens • ~2-3 minutos
            </p>
          </CardContent>
        </Card>

        {/* Right: Messages/Preview */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-green-400" />
              Preview en Tiempo Real
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Code2 className="w-16 h-16 text-slate-600 mb-4" />
                <p className="text-slate-400 text-lg font-medium mb-2">
                  Comienza a crear
                </p>
                <p className="text-slate-500 text-sm">
                  Describe tu aplicación y observa cómo AUTOCREA la construye
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/10 border border-cyan-500/30'
                        : 'bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    <div className="text-xs text-slate-400 mb-2">
                      {msg.role === 'user' ? 'Tú' : 'AUTOCREA'}
                    </div>
                    <div className="text-sm text-slate-200 whitespace-pre-line">
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
