'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">AUTOCREA</h3>
                <p className="text-xs text-slate-400">Powered by JoxAI</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Plataforma autónoma de desarrollo con IA. Transforma tus ideas en aplicaciones completas usando JoxCoder AI, el modelo multi-rol especializado.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://joxai.org" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/joxai-logo.svg"
                  alt="JoxAI Logo"
                  width={80}
                  height={24}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    // Fallback si no existe la imagen
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Comenzar
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Proyectos
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Guías
                </a>
              </li>
              <li>
                <a href="mailto:support@joxai.org" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Soporte
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} AUTOCREA. Powered by <Link href="https://joxai.org" className="text-cyan-400 hover:underline">JoxAI</Link>. Todos los derechos reservados.
            </p>
            
            {/* Logo de JoxAI en esquina */}
            <Link 
              href="https://joxai.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative w-12 h-12 rounded-lg border border-slate-700/50 bg-slate-900/50 p-2 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <Image
                  src="/joxai-logo.svg"
                  alt="JoxAI"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:support@joxai.org"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
