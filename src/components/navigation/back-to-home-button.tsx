'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'

export function BackToHomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
    >
      <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium">Volver al Inicio</span>
    </Link>
  )
}
