'use client'

import { useEffect, useRef } from 'react'

export default function WebTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Este es un placeholder. La implementación real con xterm.js se agregará después
    // para evitar problemas de dependencias
    if (terminalRef.current) {
      terminalRef.current.innerHTML = `
        <div style="padding: 1rem; font-family: 'Courier New', monospace;">
          <div style="color: #06b6d4; margin-bottom: 0.5rem;">AUTOCREA Terminal v1.0.0</div>
          <div style="color: #94a3b8; margin-bottom: 1rem;">Powered by JoxAI</div>
          <div style="color: #94a3b8; margin-bottom: 1.5rem;">─────────────────────────────────────────</div>
          <div style="margin-bottom: 0.5rem;"><span style="color: #10b981;">$</span> <span style="color: #e2e8f0;">npm --version</span></div>
          <div style="color: #94a3b8; margin-bottom: 1rem;">9.8.1</div>
          <div style="margin-bottom: 0.5rem;"><span style="color: #10b981;">$</span> <span style="color: #e2e8f0;">node --version</span></div>
          <div style="color: #94a3b8; margin-bottom: 1rem;">v20.11.0</div>
          <div style="margin-bottom: 0.5rem;"><span style="color: #10b981;">$</span> <span style="color: #e2e8f0;">git --version</span></div>
          <div style="color: #94a3b8; margin-bottom: 1.5rem;">git version 2.43.0</div>
          <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); padding: 1rem; border-radius: 0.5rem;">
            <div style="color: #06b6d4; font-weight: 600; margin-bottom: 0.5rem;">💡 Terminal Interactiva (Próximamente)</div>
            <div style="color: #cbd5e1; font-size: 0.875rem;">
              • Ejecuta comandos npm, git y más<br/>
              • Autocompletado inteligente<br/>
              • Historial de comandos<br/>
              • Integración con el proyecto
            </div>
          </div>
          <div style="margin-top: 1.5rem;"><span style="color: #10b981;">$</span> <span style="color: #e2e8f0;">_</span><span style="animation: blink 1s infinite;">█</span></div>
        </div>
        <style>
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        </style>
      `
    }
  }, [])

  return (
    <div 
      ref={terminalRef}
      className="w-full h-full bg-slate-950 text-slate-200 overflow-auto"
      style={{ minHeight: '400px' }}
    />
  )
}
