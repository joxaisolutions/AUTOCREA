'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitBranch, GitCommit, GitPullRequest, Github, GitlabIcon as GitLab, Plus, RefreshCw, Upload } from 'lucide-react'

export default function RepositoryPage() {
  const [connectedRepo, setConnectedRepo] = useState<string | null>(null)
  const [commits, setCommits] = useState<any[]>([])
  const [isConnecting, setIsConnecting] = useState(false)

  const connectGitHub = async () => {
    setIsConnecting(true)
    // TODO: Implementar conexión real con GitHub OAuth
    setTimeout(() => {
      setConnectedRepo('github.com/usuario/autocrea-project')
      setIsConnecting(false)
    }, 1500)
  }

  const createCommit = async () => {
    // TODO: Implementar commit basado en generaciones
    const newCommit = {
      id: Date.now(),
      message: 'feat: código generado por JoxCoder AI',
      files: 3,
      date: new Date().toLocaleString()
    }
    setCommits([newCommit, ...commits])
  }

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Repositorios
        </h1>
        <p className="text-slate-400">
          Conecta GitHub o GitLab para gestionar tus repositorios y commits automáticos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conectar Repositorio */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              Conectar Repositorio
            </CardTitle>
            <CardDescription className="text-slate-400">
              Vincula tu repositorio de GitHub o GitLab
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!connectedRepo ? (
              <div className="space-y-3">
                <Button 
                  onClick={connectGitHub}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <Github className="w-5 h-5 mr-2" />
                  {isConnecting ? 'Conectando...' : 'Conectar GitHub'}
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-slate-700 hover:bg-slate-800"
                >
                  <GitLab className="w-5 h-5 mr-2" />
                  Conectar GitLab
                </Button>

                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold">💡 Funcionalidades:</span>
                    <br />• Commits automáticos de generaciones
                    <br />• Pull requests inteligentes
                    <br />• Sincronización bidireccional
                    <br />• Gestión de branches
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Github className="w-5 h-5" />
                    <span className="font-semibold">Conectado</span>
                  </div>
                  <p className="text-sm text-slate-300">{connectedRepo}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={createCommit}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Commit
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-slate-700"
                  >
                    <GitPullRequest className="w-4 h-4 mr-2" />
                    Pull Request
                  </Button>
                </div>

                <Button 
                  variant="outline"
                  onClick={() => setConnectedRepo(null)}
                  className="w-full border-slate-700"
                >
                  Desconectar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Historial de Commits */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-cyan-400" />
              Commits Recientes
            </CardTitle>
            <CardDescription className="text-slate-400">
              Commits realizados por AUTOCREA
            </CardDescription>
          </CardHeader>
          <CardContent>
            {commits.length === 0 ? (
              <div className="text-center py-8">
                <GitCommit className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">
                  No hay commits aún
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  Los commits se crearán automáticamente al generar código
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {commits.map((commit) => (
                  <div 
                    key={commit.id}
                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-200">
                          {commit.message}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {commit.files} archivos • {commit.date}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Configuración del Repositorio */}
      {connectedRepo && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-cyan-400" />
              Configuración Automática
            </CardTitle>
            <CardDescription className="text-slate-400">
              Configura cómo AUTOCREA interactúa con tu repositorio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-slate-200">Commits Automáticos</p>
                <p className="text-sm text-slate-500">Crear commit después de cada generación</p>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="border-cyan-500 text-cyan-400"
              >
                Activado
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-slate-200">Branch Principal</p>
                <p className="text-sm text-slate-500">main</p>
              </div>
              <Button 
                variant="ghost"
                size="sm"
                className="text-cyan-400"
              >
                Cambiar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-slate-200">Pull Requests Automáticos</p>
                <p className="text-sm text-slate-500">Crear PR para revisión</p>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-400"
              >
                Desactivado
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
