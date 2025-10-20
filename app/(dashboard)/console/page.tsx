'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, Play, StopCircle, RotateCcw, Download } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

// Importación dinámica del terminal para evitar errores de SSR
const WebTerminal = dynamic(() => import('@/components/console/web-terminal'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-slate-400">Cargando terminal...</div>
    </div>
  ),
})

export default function ConsolePage() {
  const [isRunning, setIsRunning] = useState(false)
  
  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Consola
          </h1>
          <p className="text-slate-400">
            Terminal interactiva para ejecutar comandos y controlar tu aplicación
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Logs
          </Button>
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
          >
            {isRunning ? (
              <>
                <StopCircle className="w-4 h-4 mr-2" />
                Detener
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Terminal Card */}
      <Card className="flex-1 bg-slate-900/50 border-slate-800 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <CardTitle>Terminal Interactiva</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400' : 'bg-gray-500'}`} />
              <span className="text-xs text-slate-400">
                {isRunning ? 'Ejecutando' : 'Detenido'}
              </span>
            </div>
          </div>
          <CardDescription className="text-slate-400">
            Ejecuta comandos de Node.js, npm, git y más
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 min-h-0 p-0">
          <WebTerminal />
        </CardContent>
      </Card>

      {/* Quick Commands */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-sm">Comandos Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-700 text-xs"
              onClick={() => {
                const input = document.querySelector('input[placeholder*="comando"]') as HTMLInputElement
                if (input) {
                  input.value = 'npm install'
                  input.focus()
                }
              }}
            >
              npm install
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-700 text-xs"
              onClick={() => {
                const input = document.querySelector('input[placeholder*="comando"]') as HTMLInputElement
                if (input) {
                  input.value = 'npm run dev'
                  input.focus()
                }
              }}
            >
              npm run dev
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-700 text-xs"
              onClick={() => {
                const input = document.querySelector('input[placeholder*="comando"]') as HTMLInputElement
                if (input) {
                  input.value = 'git status'
                  input.focus()
                }
              }}
            >
              git status
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-700 text-xs"
              onClick={() => {
                const input = document.querySelector('input[placeholder*="comando"]') as HTMLInputElement
                if (input) {
                  input.value = 'npm run build'
                  input.focus()
                }
              }}
            >
              npm run build
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
