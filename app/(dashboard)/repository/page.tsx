'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GitBranch, GitCommit, GitPullRequest, Github, GitlabIcon as GitLab, Plus, RefreshCw, Upload } from 'lucide-react'
import { useFileStore } from '@/lib/stores/file-store'

export default function RepositoryPage() {
  const [connectedRepo, setConnectedRepo] = useState<any>(null)
  const [repos, setRepos] = useState<any[]>([])
  const [commits, setCommits] = useState<any[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [platform, setPlatform] = useState<'github' | 'gitlab'>('github')
  const [token, setToken] = useState('')
  const [selectedRepo, setSelectedRepo] = useState<any>(null)
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { files } = useFileStore()

  const connectPlatform = async (selectedPlatform: 'github' | 'gitlab') => {
    setPlatform(selectedPlatform)
    setShowTokenInput(true)
  }

  const connectWithToken = async () => {
    if (!token) {
      alert('Por favor ingresa tu token de acceso')
      return
    }

    setIsConnecting(true)
    
    try {
      const response = await fetch('/api/repository/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, token })
      })

      const data = await response.json()

      if (data.success) {
        setConnectedRepo(data)
        setShowTokenInput(false)
        loadRepositories()
      } else {
        alert(data.error || 'Error al conectar')
      }
    } catch (error) {
      console.error('Connection error:', error)
      alert('Error al conectar con la plataforma')
    } finally {
      setIsConnecting(false)
    }
  }

  const loadRepositories = async () => {
    if (!connectedRepo) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/repository/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, token })
      })

      const data = await response.json()

      if (data.success) {
        setRepos(data.repos)
      }
    } catch (error) {
      console.error('Load repos error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createCommit = async () => {
    if (!selectedRepo || files.length === 0) {
      alert('Selecciona un repositorio y genera código primero')
      return
    }

    setIsLoading(true)

    try {
      const formattedFiles = files.map(file => ({
        path: file.name,
        content: file.content
      }))

      const [owner, repo] = selectedRepo.fullName.split('/')

      const response = await fetch('/api/repository/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          token,
          owner,
          repo,
          files: formattedFiles,
          message: `feat: código generado por JoxCoder AI\n\n🤖 Generado automáticamente por AUTOCREA\n- ${files.length} archivos creados/actualizados`
        })
      })

      const data = await response.json()

      if (data.success) {
        const newCommit = {
          id: data.commitSha,
          message: 'feat: código generado por JoxCoder AI',
          files: files.length,
          date: new Date().toLocaleString(),
          url: data.commitUrl
        }
        setCommits([newCommit, ...commits])
        alert('✅ Commit creado exitosamente!')
      } else {
        alert(data.error || 'Error al crear commit')
      }
    } catch (error) {
      console.error('Commit error:', error)
      alert('Error al crear commit')
    } finally {
      setIsLoading(false)
    }
  }

  const createPullRequest = async () => {
    if (!selectedRepo) {
      alert('Selecciona un repositorio primero')
      return
    }

    const [owner, repo] = selectedRepo.fullName.split('/')

    setIsLoading(true)

    try {
      const response = await fetch('/api/repository/pull-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          token,
          owner,
          repo,
          title: 'feat: Código generado por JoxCoder AI',
          body: `🤖 Pull request generado automáticamente por AUTOCREA\n\n**Archivos incluidos:** ${files.length}\n**Generado con:** JoxCoder AI`,
          head: 'autocrea-generated',
          base: selectedRepo.defaultBranch || 'main'
        })
      })

      const data = await response.json()

      if (data.success) {
        alert(`✅ Pull Request #${data.prNumber} creado exitosamente!`)
        window.open(data.prUrl, '_blank')
      } else {
        alert(data.error || 'Error al crear pull request')
      }
    } catch (error) {
      console.error('PR error:', error)
      alert('Error al crear pull request')
    } finally {
      setIsLoading(false)
    }
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
                {!showTokenInput ? (
                  <>
                    <Button 
                      onClick={() => connectPlatform('github')}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Conectar GitHub
                    </Button>
                    
                    <Button 
                      onClick={() => connectPlatform('gitlab')}
                      variant="outline"
                      className="w-full border-slate-700 hover:bg-slate-800"
                    >
                      <GitLab className="w-5 h-5 mr-2" />
                      Conectar GitLab
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">
                        Token de acceso de {platform === 'github' ? 'GitHub' : 'GitLab'}
                      </label>
                      <Input
                        type="password"
                        placeholder="ghp_xxxxxxxxxxxx"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="bg-slate-800/50 border-slate-700"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {platform === 'github' 
                          ? 'Crea un token en Settings → Developer settings → Personal access tokens'
                          : 'Crea un token en Settings → Access Tokens'
                        }
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={connectWithToken}
                        disabled={isConnecting}
                        className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50"
                      >
                        {isConnecting ? 'Conectando...' : 'Conectar'}
                      </Button>
                      <Button 
                        onClick={() => setShowTokenInput(false)}
                        variant="outline"
                        className="border-slate-700"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

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
                    {platform === 'github' ? <Github className="w-5 h-5" /> : <GitLab className="w-5 h-5" />}
                    <span className="font-semibold">Conectado - {connectedRepo.username}</span>
                  </div>
                  <p className="text-sm text-slate-300">{connectedRepo.repos} repositorios disponibles</p>
                </div>

                {repos.length > 0 && (
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Seleccionar Repositorio</label>
                    <select 
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-2 text-sm"
                      onChange={(e) => {
                        const repo = repos.find(r => r.id === parseInt(e.target.value))
                        setSelectedRepo(repo)
                      }}
                    >
                      <option value="">Selecciona un repositorio</option>
                      {repos.map((repo) => (
                        <option key={repo.id} value={repo.id}>
                          {repo.fullName} {repo.private ? '🔒' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={createCommit}
                    disabled={isLoading || !selectedRepo || files.length === 0}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Commit ({files.length})
                  </Button>
                  <Button 
                    onClick={createPullRequest}
                    disabled={isLoading || !selectedRepo}
                    variant="outline"
                    className="border-slate-700"
                  >
                    <GitPullRequest className="w-4 h-4 mr-2" />
                    Pull Request
                  </Button>
                </div>

                <Button 
                  variant="outline"
                  onClick={() => {
                    setConnectedRepo(null)
                    setSelectedRepo(null)
                    setRepos([])
                    setToken('')
                  }}
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
                      {commit.url && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(commit.url, '_blank')}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          Ver
                        </Button>
                      )}
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
