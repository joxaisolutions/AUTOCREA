'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, ExternalLink, Clock, Sparkles, CheckCircle2, XCircle, Code2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  status: 'completed' | 'generating' | 'failed'
  tokensUsed: number
  createdAt: string
  framework?: string
}

export default function ProjectsPage() {
  const demoProjects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Plataforma de comercio electrónico con carrito de compras y pagos con Stripe',
      status: 'completed',
      tokensUsed: 450,
      createdAt: '2025-10-14',
      framework: 'Next.js + Stripe'
    },
    {
      id: '2',
      name: 'Blog Personal',
      description: 'Blog con autenticación, editor Markdown y comentarios',
      status: 'completed',
      tokensUsed: 320,
      createdAt: '2025-10-13',
      framework: 'React + Firebase'
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case 'generating':
        return <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado'
      case 'generating':
        return 'Generando...'
      case 'failed':
        return 'Fallido'
      default:
        return status
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Mis Proyectos</h1>
          <p className="text-slate-400">Gestiona todas tus aplicaciones generadas</p>
        </div>
        <Link href="/chat">
          <Button>
            <Code2 className="w-4 h-4 mr-2" />
            Nuevo Proyecto
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoProjects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </div>
                {getStatusIcon(project.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                    {project.framework}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs">{project.tokensUsed} tokens</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.createdAt).toLocaleDateString('es-ES')}</span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-700">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    disabled
                  >
                    <Code2 className="w-4 h-4 mr-1" />
                    Ver Código
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    disabled
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-2 border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all cursor-pointer">
          <Link href="/chat" className="h-full">
            <CardContent className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <Code2 className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-slate-300 mb-2">
                Crear Nuevo Proyecto
              </h3>
              <p className="text-sm text-slate-500 text-center px-4">
                Describe tu idea y AUTOCREA lo construirá
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>

      <Card className="mt-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Proyectos Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Estos son proyectos de demostración. Una vez que JoxCoder esté entrenado y las integraciones
            estén configuradas (Convex + Clerk), tus proyectos reales aparecerán aquí con todas sus
            funcionalidades: código fuente, deployment URLs, y gestión completa.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
