'use client'

import { useState, useRef, KeyboardEvent } from 'react'

export default function WebTerminal() {
  const [output, setOutput] = useState<string[]>(['$ Welcome to AUTOCREA Terminal', '$ Escribe tus comandos aquí...'])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const outputRef = useRef<HTMLDivElement>(null)

  const executeCommand = async (command: string) => {
    if (!command.trim()) return

    setIsExecuting(true)
    setOutput(prev => [...prev, `$ ${command}`])
    setHistory(prev => [...prev, command])

    try {
      const response = await fetch('/api/terminal/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, cwd: process.cwd })
      })

      const data = await response.json()

      if (data.success) {
        const lines = data.output.split('\n').filter((line: string) => line.trim())
        setOutput(prev => [...prev, ...lines])
      } else {
        setOutput(prev => [
          ...prev,
          `❌ Error: ${data.error}`,
          ...(data.stderr ? data.stderr.split('\n').filter((line: string) => line.trim()) : [])
        ])
      }
    } catch (error: any) {
      setOutput(prev => [...prev, `❌ Error: ${error.message}`])
    } finally {
      setIsExecuting(false)
      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
      }, 100)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isExecuting) {
      executeCommand(currentCommand)
      setCurrentCommand('')
      setHistoryIndex(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCurrentCommand(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(history[history.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setOutput(['$ Terminal limpiada', '$ Escribe tus comandos aquí...'])
    }
  }

  return (
    <div className="h-full w-full bg-black/90 flex flex-col font-mono text-sm">
      {/* Output area */}
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
      >
        {output.map((line, index) => (
          <div 
            key={index}
            className={
              line.startsWith('$') 
                ? 'text-cyan-400 font-semibold' 
                : line.startsWith('❌') 
                ? 'text-red-400' 
                : line.startsWith('✅')
                ? 'text-green-400'
                : 'text-slate-300'
            }
          >
            {line}
          </div>
        ))}
        
        {isExecuting && (
          <div className="text-yellow-400 animate-pulse">
            Ejecutando...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-slate-700 p-4 flex items-center gap-2 bg-slate-900/50">
        <span className="text-cyan-400 font-semibold">$</span>
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isExecuting}
          placeholder="Escribe un comando (npm, git, ls, etc.)"
          className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-600"
          autoFocus
        />
        {isExecuting && (
          <div className="text-xs text-slate-500">
            ⏳ Ejecutando...
          </div>
        )}
      </div>

      {/* Help */}
      <div className="border-t border-slate-700 px-4 py-2 bg-slate-900/30 text-xs text-slate-500">
        💡 Tip: ↑/↓ para historial | Ctrl+L para limpiar | Enter para ejecutar
      </div>
    </div>
  )
}
