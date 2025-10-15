import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-200 mb-2">Mis Proyectos</h1>
        <p className="text-slate-400">Gestiona todas tus aplicaciones generadas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-cyan-400" />
            Proyectos Recientes
          </CardTitle>
          <CardDescription>
            Tus aplicaciones generadas aparecerán aquí
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FolderKanban className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">No tienes proyectos aún</p>
            <p className="text-slate-500 text-sm">Crea tu primera aplicación en la sección Chat</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
