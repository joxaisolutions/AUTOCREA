'use client';

import { PricingTable } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Elige tu Plan
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Desde pruebas gratuitas hasta soluciones empresariales.
            Todos los planes incluyen acceso completo a JoxCoder AI.
          </p>
          
          <SignedOut>
            <div className="mt-6">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Comenzar Gratis - 1,000 Tokens
                </Button>
              </Link>
            </div>
          </SignedOut>
        </div>

        {/* Clerk Pricing Table */}
        <SignedIn>
          <div className="max-w-7xl mx-auto">
            <PricingTable />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="max-w-7xl mx-auto bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-300 text-lg mb-4">
              Inicia sesión para ver los planes disponibles y suscribirte
            </p>
            <Link href="/sign-in">
              <Button variant="outline" size="lg">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </SignedOut>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-200">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                ¿Qué son los tokens?
              </h3>
              <p className="text-slate-400">
                Los tokens son unidades de procesamiento que se consumen cuando generas código con JoxCoder AI. 
                Aproximadamente 1,000 palabras = 750 tokens.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="text-slate-400">
                Sí, puedes mejorar o degradar tu plan en cualquier momento con Clerk Billing. Los cambios se aplicarán 
                inmediatamente y se prorrateará el costo según corresponda.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                ¿Qué incluye el plan Enterprise?
              </h3>
              <p className="text-slate-400">
                El plan Enterprise incluye tokens ilimitados, proyectos ilimitados, modelo on-premise opcional, 
                soporte dedicado 24/7, SLA personalizado, y entrenamiento del equipo.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                ¿Cómo funciona el proceso de pago?
              </h3>
              <p className="text-slate-400">
                Utilizamos Clerk Billing integrado con Stripe para procesar pagos de forma segura. Todos los pagos 
                están encriptados y cumplen con los estándares PCI-DSS.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                ¿Ofrecen descuentos para educación?
              </h3>
              <p className="text-slate-400">
                Sí, ofrecemos descuentos especiales para estudiantes, profesores e instituciones educativas. 
                Contacta a nuestro equipo de ventas para más información.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-4">
            ¿Necesitas ayuda para elegir el plan correcto?
          </p>
          <a 
            href="mailto:sales@autocrea.joxai.org"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Contacta a nuestro equipo de ventas →
          </a>
        </div>
      </div>
    </div>
  );
}
