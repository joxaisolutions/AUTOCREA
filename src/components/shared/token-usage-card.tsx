'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { useTokenLimits } from '@/src/lib/hooks/use-token-limits';
import { formatTokenCount, getTokenColor, getTokenProgressColor } from '@/src/lib/utils/token-counter';

export function TokenUsageCard() {
  const {
    tokensUsed,
    tokensLimit,
    remaining,
    percentage,
    isNearLimit,
    isAtLimit,
  } = useTokenLimits();

  const progressColor = getTokenProgressColor(percentage);
  const textColor = getTokenColor(percentage);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Tokens Este Mes
          </span>
          {isAtLimit && (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <p className={`text-2xl font-bold ${textColor}`}>
              {formatTokenCount(tokensUsed)}
            </p>
            <p className="text-xs text-slate-400">
              de {tokensLimit === -1 ? '∞' : formatTokenCount(tokensLimit)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-300">
              {remaining === Infinity ? '∞' : formatTokenCount(remaining)}
            </p>
            <p className="text-xs text-slate-500">restantes</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Progress 
            value={percentage} 
            className="h-2"
            indicatorClassName={progressColor}
          />
          <p className="text-xs text-slate-400 flex items-center justify-between">
            <span>{percentage.toFixed(1)}% usado</span>
            {isNearLimit && !isAtLimit && (
              <span className="flex items-center gap-1 text-orange-400">
                <TrendingUp className="w-3 h-3" />
                Cerca del límite
              </span>
            )}
            {isAtLimit && (
              <span className="text-red-400 font-medium">
                Límite alcanzado
              </span>
            )}
          </p>
        </div>

        {isAtLimit && (
          <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-xs text-red-300">
              Has alcanzado tu límite de tokens. 
              <a href="/pricing" className="underline ml-1 font-semibold">
                Mejora tu plan
              </a> para continuar generando.
            </p>
          </div>
        )}

        {isNearLimit && !isAtLimit && (
          <div className="mt-3 p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <p className="text-xs text-orange-300">
              Te quedan pocos tokens. Considera 
              <a href="/pricing" className="underline mx-1 font-semibold">
                mejorar tu plan
              </a>
              para no interrumpir tu trabajo.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
