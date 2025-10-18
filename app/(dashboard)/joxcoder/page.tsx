import JoxCoderChat from '@/components/joxcoder/JoxCoderChat';
import { Code2, Sparkles } from 'lucide-react';

export default function JoxCoderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-4 rounded-xl shadow-lg shadow-cyan-500/20">
              <Code2 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                JoxCoder Assistant
                <Sparkles size={28} className="text-cyan-400" />
              </h1>
              <p className="text-slate-400 mt-2 text-lg">
                Tu asistente de desarrollo especializado en el stack de AUTOCREA
              </p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-cyan-400">JoxCoder</strong> está potenciado por <strong className="text-blue-400">Relevance AI</strong> y puede ayudarte con:
              desarrollo en Next.js, React, TypeScript, análisis de código, debugging, y optimización de rendimiento.
            </p>
          </div>
        </div>
        
        <JoxCoderChat />
        
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Powered by <span className="text-cyan-400 font-semibold">JoxAI</span> · Relevance AI Integration
          </p>
        </div>
      </div>
    </div>
  );
}
