import { Code2, Sparkles, LayoutDashboard, Settings, FolderKanban } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 backdrop-blur-sm bg-slate-950/50">
        <div className="flex items-center justify-between h-16 px-6">
          <Link href="/chat" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AUTOCREA
              </h1>
              <p className="text-xs text-slate-400">V2.0 con JoxCoder</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Token Balance */}
            <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-slate-200">100 tokens</span>
              </div>
            </div>
            
            <Link href="/settings">
              <Button variant="outline" size="sm">
                Comprar Tokens
              </Button>
            </Link>
            
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950/30 p-4">
          <nav className="space-y-2">
            <Link href="/chat">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <LayoutDashboard className="w-5 h-5" />
                Chat
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <FolderKanban className="w-5 h-5" />
                Proyectos
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="w-5 h-5" />
                Configuración
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
