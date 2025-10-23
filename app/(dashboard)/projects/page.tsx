'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, ExternalLink, Clock, Sparkles, CheckCircle2, XCircle, Code2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useUserProjects } from "@/src/lib/hooks/use-user-projects"

export default function ProjectsPage() {
  const { projects, isLoading } = useUserProjects();

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

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Cargando proyectos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Mis Proyectos</h1>
          <p className="text-slate-400">
            {projects.length > 0 
              ? `${projects.length} ${projects.length === 1 ? 'proyecto' : 'proyectos'}`
              : 'Aún no tienes proyectos'
            }
          </p>
        </div>
        <Link href="/chat">
          <Button>
            <Code2 className="w-4 h-4 mr-2" />
            Nuevo Proyecto
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-700 bg-slate-800/30">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderKanban className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No tienes proyectos aún
            </h3>
            <p className="text-slate-500 text-center mb-6 max-w-md">
              Comienza creando tu primer proyecto con JoxCoder AI. Describe tu idea y déjanos construirla.
            </p>
            <Link href="/chat">
              <Button size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Crear Primer Proyecto
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
          <Card key={project._id} className="group hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description || 'Sin descripción'}
                  </CardDescription>
                </div>
                {getStatusIcon(project.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  {project.framework && (
                    <div className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                      {project.framework}
                    </div>
                  )}
                  <div className="px-2 py-1 bg-cyan-500/10 rounded text-xs text-cyan-400">
                    {project.role}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Code2 className="w-3 h-3" />
                    <span className="text-xs">{project.filesCount} archivos</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.createdAt).toLocaleDateString('es-ES')}</span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-700">
                  <Link href={`/chat?project=${project._id}`} className="flex-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      <Code2 className="w-4 h-4 mr-1" />
                      Ver Código
                    </Button>
                  </Link>
                  {project.githubRepoUrl && (
                    <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="ghost" 
                        size="sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
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
      )}
    </div>
  )
}
