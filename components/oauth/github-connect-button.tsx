'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import type { GitHubConnectionStatus } from '@/lib/types/github-oauth'

export default function GitHubConnectButton() {
  const { user } = useUser()
  const [status, setStatus] = useState<GitHubConnectionStatus>({
    connected: false,
    account: null,
    user: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkConnection()
  }, [user])

  const checkConnection = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/oauth/github/status')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error('Error checking GitHub connection:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = () => {
    const githubAccount = user?.externalAccounts.find(
      (account) => account.provider === 'github'
    )
    
    if (!githubAccount) {
      window.location.href = '/sign-in?redirect_url=' + encodeURIComponent(window.location.pathname)
    } else {
      checkConnection()
    }
  }

  if (loading) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub OAuth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Verificando conexión...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status.connected) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub OAuth
          </CardTitle>
          <CardDescription>Conectado y listo para usar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-slate-200">
                {status.user?.name || status.user?.login}
              </p>
              <p className="text-sm text-slate-400">
                @{status.user?.login} • {status.user?.public_repos} repos
              </p>
            </div>
          </div>

          <div className="bg-slate-950/50 rounded p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Permisos:</span>
              <span className="text-slate-200">user, repo</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Estado:</span>
              <span className="text-green-500 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Activo
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={checkConnection}
            className="w-full border-slate-700"
          >
            Actualizar Estado
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub OAuth
        </CardTitle>
        <CardDescription>Conecta tu cuenta de GitHub para acceso automático</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="text-blue-300 font-medium">
                OAuth Flow Automático
              </p>
              <p className="text-slate-300">
                Conecta tu cuenta de GitHub una vez y obtén acceso automático a tus repositorios sin necesidad de tokens manuales.
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-1 ml-2">
                <li>Acceso seguro a repositorios</li>
                <li>Commits automáticos</li>
                <li>Pull requests inteligentes</li>
                <li>Sin tokens manuales</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          onClick={handleConnect}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700"
        >
          <Github className="mr-2 h-4 w-4" />
          Conectar con GitHub
        </Button>

        <p className="text-xs text-slate-500 text-center">
          Al conectar, autorizas a AUTOCREA a acceder a tu información de GitHub
        </p>
      </CardContent>
    </Card>
  )
}
