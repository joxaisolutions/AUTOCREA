'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Code2, Sparkles, Rocket } from 'lucide-react'
import { CodeEditor } from "@/components/chat/code-editor"
import { TechnicalRole } from '@/lib/joxcoder/types'
import { ROLE_PROMPTS } from '@/lib/joxcoder/role-prompts'

const ROLE_ICONS: Record<TechnicalRole, string> = {
  arquitecto: '🏗️',
  fullstack: '⚡',
  frontend: '🎨',
  backend: '⚙️',
  devops: '🚀',
  security: '🔒',
  qa: '✅',
  data_engineer: '📊',
  ml_engineer: '🤖',
  pentester: '🛡️',
  mobile_dev: '📱',
  blockchain_dev: '⛓️',
}

const ROLE_NAMES: Record<TechnicalRole, string> = {
  arquitecto: 'Arquitecto',
  fullstack: 'Fullstack',
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  security: 'Security',
  qa: 'QA Engineer',
  data_engineer: 'Data Engineer',
  ml_engineer: 'ML Engineer',
  pentester: 'Pentester',
  mobile_dev: 'Mobile Dev',
  blockchain_dev: 'Blockchain',
}

export default function ChatPage() {
  const [selectedRole, setSelectedRole] = useState<TechnicalRole>('fullstack')
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [explanation, setExplanation] = useState('')
  const [tokensUsed, setTokensUsed] = useState(0)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedCode('')
    setExplanation('')

    try {
      const response = await fetch('/api/joxcoder/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: selectedRole,
          prompt,
          context: {
            projectName,
            projectDescription,
          },
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error en generación')
      }

      const data = await response.json()
      setGeneratedCode(data.code || '')
      setExplanation(data.explanation || '')
      setTokensUsed(data.tokensUsed || 0)

    } catch (error) {
      console.error('Generation error:', error)
      alert(error instanceof Error ? error.message : 'Error al generar código')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setGeneratedCode('')
    setExplanation('')
    setPrompt('')
    setTokensUsed(0)
  }

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          JoxCoder AI
        </h1>
        <p className="text-slate-400">
          Modelo multi-rol especializado en desarrollo de software
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left Panel - Input */}
        <div className="flex flex-col gap-4">
          {/* Role Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selecciona el Rol Técnico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(Object.keys(ROLE_ICONS) as TechnicalRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`
                      p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 text-sm
                      ${selectedRole === role
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                      }
                    `}
                  >
                    <span className="text-2xl">{ROLE_ICONS[role]}</span>
                    <span className="text-xs font-medium">{ROLE_NAMES[role]}</span>
                  </button>
                ))}
              </div>

              {/* Role Info */}
              <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{ROLE_ICONS[selectedRole]}</span>
                  <span className="font-semibold">{ROLE_NAMES[selectedRole]}</span>
                </div>
                <p className="text-sm text-slate-400">
                  {ROLE_PROMPTS[selectedRole].expertise.join(' • ')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Project Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Rocket className="w-5 h-5 text-cyan-400" />
                Contexto del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Nombre del Proyecto (opcional)
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="ej: TodoApp, EcommerceStore..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Descripción General (opcional)
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="ej: App de gestión de tareas con autenticación..."
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Main Prompt */}
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                ¿Qué quieres crear?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Ejemplo para ${ROLE_NAMES[selectedRole]}:\n${selectedRole === 'fullstack' ? '• Crear una app CRUD completa de tareas\n• Implementar autenticación con Clerk\n• Agregar dashboard con estadísticas' : selectedRole === 'frontend' ? '• Crear componente de login moderno\n• Implementar dark mode toggle\n• Diseñar página de landing' : '• Describe lo que necesitas...'}`}
                rows={8}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none font-mono text-sm"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generando con {ROLE_NAMES[selectedRole]}...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar con JoxCoder AI
                    </>
                  )}
                </Button>

                {generatedCode && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-gray-700"
                  >
                    Limpiar
                  </Button>
                )}
              </div>

              {isGenerating && (
                <div className="text-sm text-slate-400 text-center">
                  ⏱️ Tiempo estimado: 2-3 minutos
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Output */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  Código Generado
                </span>
                {tokensUsed > 0 && (
                  <span className="text-sm text-slate-400 font-normal">
                    {tokensUsed} tokens
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
              {!generatedCode && !isGenerating && (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div className="space-y-3">
                    <div className="text-6xl">🤖</div>
                    <p className="text-slate-400">
                      Selecciona un rol y describe lo que necesitas
                    </p>
                    <p className="text-sm text-slate-500">
                      JoxCoder AI generará código profesional automáticamente
                    </p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto" />
                    <div>
                      <p className="text-lg font-semibold">
                        {ROLE_ICONS[selectedRole]} {ROLE_NAMES[selectedRole]} trabajando...
                      </p>
                      <p className="text-sm text-slate-400 mt-2">
                        Analizando requisitos y generando código
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {generatedCode && (
                <>
                  {explanation && (
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-sm text-blue-300">
                        <span className="font-semibold">💡 Explicación:</span> {explanation}
                      </p>
                    </div>
                  )}

                  <div className="flex-1 min-h-0">
                    <CodeEditor code={generatedCode} />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigator.clipboard.writeText(generatedCode)}
                      variant="outline"
                      className="flex-1 border-gray-700"
                    >
                      📋 Copiar Código
                    </Button>
                    <Button
                      onClick={() => {
                        const blob = new Blob([generatedCode], { type: 'text/plain' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `${projectName || 'codigo'}-${selectedRole}.txt`
                        a.click()
                      }}
                      variant="outline"
                      className="flex-1 border-gray-700"
                    >
                      💾 Descargar
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
