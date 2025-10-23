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
    <Card className={`relative ${plan.popular ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-slate-800'}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold whitespace-nowrap">
          ⭐ Más Popular
        </div>
      )}
      
      <CardHeader className={plan.popular ? 'pt-8' : ''}>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        
        <div className="mt-4">
          {isEnterprise ? (
            <div>
              <span className="text-3xl font-bold text-slate-200">Contactar</span>
            </div>
          ) : (
            <div>
              <span className="text-4xl font-bold text-slate-200">
                ${plan.price}
              </span>
              <span className="text-slate-400">/{plan.interval === 'month' ? 'mes' : 'año'}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={handleSelect}
          disabled={isCurrentPlan || loading}
          variant={plan.popular ? 'default' : 'outline'}
          className="w-full"
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
