'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code2, Sparkles, Zap, Shield, GitBranch, Rocket, Check } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { PLANS } from "@/src/config/plans"
import { PricingCard } from "@/src/components/shared/pricing-card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 backdrop-blur-sm bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AUTOCREA
                </h1>
                <p className="text-xs text-slate-400">Powered by JoxAI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">Iniciar Sesión</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">1,000 tokens gratis al registrarte</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                De Idea a Aplicación
              </span>
              <br />
              <span className="text-slate-200">en Minutos</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto">
              AUTOCREA V2.0 utiliza IA avanzada para crear aplicaciones completas de forma autónoma. 
              Arquitectura, backend, frontend, DevOps y seguridad, todo automático.
              <br />
              <span className="text-sm text-slate-500 mt-2 block">Creado por <span className="text-cyan-400 font-semibold">JoxAI</span></span>
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg">
                  <Rocket className="mr-2 w-5 h-5" />
                  Crear Mi Primera App
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg">
                  Ver Características
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-200 mb-4">
              ¿Por qué AUTOCREA?
            </h2>
            <p className="text-xl text-slate-400">
              La plataforma más completa para desarrollo autónomo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "JoxCoder Propio",
                description: "Modelo IA entrenado específicamente para generación de código. No dependes de APIs externas.",
                color: "text-yellow-400"
              },
              {
                icon: Code2,
                title: "100% Autónomo",
                description: "De la idea al código completo sin intervención. Arquitectura, desarrollo, testing y deployment.",
                color: "text-cyan-400"
              },
              {
                icon: GitBranch,
                title: "Multi-Rol IA",
                description: "5 agentes especializados: Arquitecto, Backend, Frontend, DevOps y Security Auditor.",
                color: "text-purple-400"
              },
              {
                icon: Rocket,
                title: "Preview en Tiempo Real",
                description: "Ve cómo se construye tu app paso a paso con vista previa del código en vivo.",
                color: "text-blue-400"
              },
              {
                icon: Shield,
                title: "Auditoría de Seguridad",
                description: "Cada app generada pasa por análisis de vulnerabilidades y mejores prácticas.",
                color: "text-green-400"
              },
              {
                icon: Sparkles,
                title: "APIs Opcionales",
                description: "Conecta GPT-4, Claude o Gemini como complemento si lo deseas (no obligatorio).",
                color: "text-pink-400"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:border-slate-600 transition-colors">
                  <CardHeader>
                    <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-200 mb-4">
              Planes Transparentes
            </h2>
            <p className="text-xl text-slate-400">
              Comienza gratis, escala cuando lo necesites
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['free', 'creator', 'professional'].map((planId) => {
              const plan = PLANS[planId];
              return (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  currentPlanId="free"
                />
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                Ver Todos los Planes
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
              <h2 className="text-4xl font-bold text-slate-200 mb-6">
                ¿Listo para crear tu próxima aplicación?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Únete a miles de desarrolladores que ya están construyendo con AUTOCREA
              </p>
              <Link href="/sign-up">
                <Button size="lg" className="text-lg">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Obtener 1,000 Tokens Gratis
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p className="mb-4">© 2025 AUTOCREA V2.0 • Powered by JoxAI</p>
          <p className="text-sm">De idea a aplicación completa en minutos</p>
        </div>
      </footer>
    </div>
  )
}
