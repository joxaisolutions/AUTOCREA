'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Code2, Sparkles, Rocket, Save } from 'lucide-react'
import { CodeEditor } from "@/components/chat/code-editor"
import { FileExplorer } from "@/components/chat/file-explorer"
import TemplateSelector from "@/components/templates/template-selector"
import { useFileStore } from "@/lib/stores/file-store"
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
  const [explanation, setExplanation] = useState('')
  const [tokensUsed, setTokensUsed] = useState(0)

  const { files, selectedFileId, addFile, selectFile, getSelectedFile } = useFileStore()
  const selectedFile = getSelectedFile()

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
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
      
      // Determinar lenguaje y nombre del archivo
      const language = data.language || 'typescript'
      const extensions: Record<string, string> = {
        typescript: 'tsx',
        javascript: 'jsx',
        python: 'py',
        css: 'css',
        html: 'html',
        json: 'json',
      }
      const ext = extensions[language] || 'txt'
      const fileName = data.fileName || `generated-${selectedRole}-${Date.now()}.${ext}`

      // Agregar archivo al file store
      addFile({
        name: fileName,
        type: 'file',
        content: data.code || '',
        language,
        generatedBy: selectedRole,
      })

      setExplanation(data.explanation || '')
      setTokensUsed(data.tokensUsed || 0)

    } catch (error) {
      console.error('Generation error:', error)
      alert(error instanceof Error ? error.message : 'Error al generar código')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="h-full flex gap-4 p-6">
      {/* Left Panel - Input (30%) */}
      <div className="w-[30%] flex flex-col gap-4 overflow-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
            JoxCoder AI
          </h1>
          <p className="text-sm text-slate-400">
            Modelo multi-rol especializado
          </p>
        </div>

        {/* Role Selector */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Rol Técnico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(ROLE_ICONS) as TechnicalRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`
                    p-2 rounded-lg border-2 transition-all flex flex-col items-center gap-1 text-xs
                    ${selectedRole === role
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                    }
                  `}
                >
                  <span className="text-lg">{ROLE_ICONS[role]}</span>
                  <span className="font-medium text-[10px]">{ROLE_NAMES[role]}</span>
                </button>
              ))}
            </div>

            <div className="mt-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{ROLE_ICONS[selectedRole]}</span>
                <span className="text-sm font-semibold">{ROLE_NAMES[selectedRole]}</span>
              </div>
              <p className="text-xs text-slate-400">
                {ROLE_PROMPTS[selectedRole].expertise.slice(0, 2).join(' • ')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Project Context */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Rocket className="w-4 h-4 text-cyan-400" />
              Contexto del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="ej: TodoApp"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Descripción General
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="ej: App de gestión de tareas..."
                rows={2}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Prompt */}
        <Card className="flex-1 flex flex-col bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              ¿Qué quieres crear?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe lo que necesitas crear con ${ROLE_NAMES[selectedRole]}...`}
              rows={6}
              className="flex-1 px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none font-mono"
            />

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generar
                  </>
                )}
              </Button>
              
              <TemplateSelector />
            </div>

            {explanation && (
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-xs text-blue-300">
                  <span className="font-semibold">💡</span> {explanation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Middle Panel - File Explorer (15%) */}
      <div className="w-[15%]">
        <Card className="h-full bg-slate-900/50 border-slate-800 flex flex-col">
          <FileExplorer 
            files={files} 
            selectedFile={selectedFileId || undefined}
            onFileSelect={(file) => selectFile(file.id)}
          />
        </Card>
      </div>

      {/* Right Panel - Code Editor (55%) */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 bg-slate-900/50 border-slate-800 flex flex-col min-h-0">
          <CardHeader className="flex-shrink-0 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                {selectedFile ? selectedFile.name : 'Código Generado'}
              </CardTitle>
              <div className="flex items-center gap-2">
                {selectedFile && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                )}
                {tokensUsed > 0 && (
                  <span className="text-xs text-slate-400">
                    {tokensUsed} tokens
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {!selectedFile && files.length === 0 && !isGenerating && (
              <div className="flex-1 flex items-center justify-center text-center">
                <div className="space-y-3">
                  <div className="text-6xl">🤖</div>
                  <p className="text-slate-400">
                    Genera código con JoxCoder AI
                  </p>
                  <p className="text-sm text-slate-500">
                    Selecciona un rol y describe lo que necesitas
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
                      Generando código profesional
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedFile && (
              <div className="flex-1 min-h-0">
                <CodeEditor 
                  code={selectedFile.content || ''} 
                  language={selectedFile.language}
                />
              </div>
            )}

            {!selectedFile && files.length > 0 && !isGenerating && (
              <div className="flex-1 flex items-center justify-center text-center">
                <div className="space-y-3">
                  <Code2 className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="text-slate-500">
                    Selecciona un archivo para verlo
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
