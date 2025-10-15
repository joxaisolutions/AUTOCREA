'use client'

import { useState } from 'react'
import { Send, Sparkles, Code2, Rocket, Github, Zap } from 'lucide-react'

export default function Home() {
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
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `🚀 Generando "${projectName}"...\n\n✅ Arquitectura diseñada\n✅ Backend configurado\n✅ Frontend creado\n\n¡Tu aplicación está lista! (Demo mode - JoxCoder integration pending)`
      }])
      setIsGenerating(false)
      setPrompt('')
      setProjectName('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 backdrop-blur-sm bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AUTOCREA
                </h1>
                <p className="text-xs text-slate-400">V2.0 con JoxCoder</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-slate-200">100 tokens</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/50 rounded-lg text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors">
                Get Tokens
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-cyan-400" />
                Describe tu aplicación
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="mi-super-app"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    disabled={isGenerating}
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    Descripción completa
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ejemplo: Crear una plataforma de e-commerce con carrito de compras, pagos con Stripe, panel de administración y sistema de reviews..."
                    rows={8}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
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

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim() || !projectName.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Generar Aplicación
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Costo estimado: 50 tokens • ~2-3 minutos
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Zap, title: 'JoxCoder AI', desc: 'Modelo propio optimizado' },
                { icon: Github, title: 'Git Automático', desc: 'Commits y branches' },
                { icon: Rocket, title: 'Deploy Directo', desc: 'A producción en 1 clic' },
                { icon: Code2, title: 'Multi-Framework', desc: 'React, Vue, Python...' }
              ].map((feature) => (
                <div key={feature.title} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                  <feature.icon className="w-6 h-6 text-cyan-400 mb-2" />
                  <h3 className="text-sm font-semibold text-slate-200 mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Messages/Preview */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 min-h-[600px] flex flex-col">
              <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-green-400" />
                Preview en Tiempo Real
              </h2>

              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <Code2 className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-slate-400 text-lg font-medium mb-2">
                    Comienza a crear
                  </p>
                  <p className="text-slate-500 text-sm max-w-md">
                    Describe tu aplicación en el panel izquierdo y observa cómo AUTOCREA la construye paso a paso
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-4">
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
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            AUTOCREA V2.0 • Powered by JoxCoder • De idea a aplicación en minutos
          </p>
        </div>
      </footer>
    </div>
  )
}
