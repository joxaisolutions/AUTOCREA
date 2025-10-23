'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { Plan } from '@/src/config/plans';
import { useStripeCheckout } from '@/src/lib/hooks/use-stripe-checkout';

interface PricingCardProps {
  plan: Plan;
  currentPlanId?: string;
}

export function PricingCard({ plan, currentPlanId }: PricingCardProps) {
  const { createCheckoutSession, loading, error } = useStripeCheckout();
  const isCurrentPlan = currentPlanId === plan.id;
  const isFree = plan.id === 'free';
  const isEnterprise = plan.id === 'enterprise';

  const handleSelect = async () => {
    if (isCurrentPlan) return;
    
    if (isFree) {
      window.location.href = '/sign-up';
      return;
    }

    if (isEnterprise) {
      window.location.href = 'mailto:sales@autocrea.joxai.org';
      return;
    }
    
    await createCheckoutSession(plan.id);
  };

  return (
    <Card className={`relative flex flex-col h-full transition-all duration-300 ${plan.popular ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 scale-105' : 'border-slate-800 hover:border-slate-700 hover:scale-105'}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold whitespace-nowrap z-10">
          ⭐ Más Popular
        </div>
      )}
      
      <CardHeader className={`${plan.popular ? 'pt-8' : 'pt-6'} pb-4`}>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        
        <div className="mt-6">
          {isEnterprise ? (
            <div>
              <span className="text-3xl md:text-4xl font-bold text-slate-200">Contactar</span>
              <p className="text-sm text-slate-500 mt-1">Precios personalizados</p>
            </div>
          ) : (
            <div>
              <span className="text-4xl md:text-5xl font-bold text-slate-200">
                ${plan.price}
              </span>
              <span className="text-slate-400 text-lg">/{plan.interval === 'month' ? 'mes' : 'año'}</span>
              <p className="text-sm text-slate-500 mt-1">
                {plan.tokens >= 1000 
                  ? `${(plan.tokens / 1000).toFixed(0)}K tokens/mes` 
                  : `${plan.tokens} tokens/mes`}
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col pt-4">
        <ul className="space-y-3 mb-8 flex-grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={handleSelect}
          disabled={isCurrentPlan || loading}
          variant={plan.popular ? 'default' : 'outline'}
          size="lg"
          className="w-full mt-auto"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando...
            </span>
          ) : isCurrentPlan ? (
            'Plan Actual'
          ) : isFree ? (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Comenzar Gratis
            </>
          ) : isEnterprise ? (
            'Contactar Ventas'
          ) : (
            'Seleccionar Plan'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
