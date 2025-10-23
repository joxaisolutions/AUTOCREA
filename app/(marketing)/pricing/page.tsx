'use client';

import { PLANS } from '@/src/config/plans';
import { PricingCard } from '@/src/components/shared/pricing-card';

export default function PricingPage() {
  // TODO: Obtener plan actual del usuario
  const currentPlanId = 'free';

  const planOrder = ['free', 'creator', 'professional', 'business', 'enterprise'];
  const sortedPlans = planOrder.map(id => PLANS[id]).filter(Boolean);

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
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {sortedPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currentPlanId={currentPlanId}
            />
          ))}
        </div>

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
                Sí, puedes mejorar o degradar tu plan en cualquier momento. Los cambios se aplicarán 
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
