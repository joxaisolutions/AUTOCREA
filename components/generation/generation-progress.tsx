"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, Zap, Clock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GenerationProgressProps {
  isGenerating: boolean;
  currentStep: number;
  totalSteps: number;
  tokensUsed: number;
  estimatedTokens: number;
  elapsedTime?: number;
}

export function GenerationProgress({
  isGenerating,
  currentStep,
  totalSteps,
  tokensUsed,
  estimatedTokens,
  elapsedTime,
}: GenerationProgressProps) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  const isComplete = currentStep === totalSteps && !isGenerating;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-200">
            {isComplete ? "Generación Completada" : "Generando..."}
          </h3>
          {isComplete && (
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          )}
        </div>

        <Progress value={progress} className="h-2" />

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Progreso</p>
              <p className="text-sm font-semibold text-slate-200">
                {currentStep}/{totalSteps}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Tokens</p>
              <p className="text-sm font-semibold text-slate-200">
                {tokensUsed}
                {estimatedTokens > 0 && (
                  <span className="text-slate-500">/{estimatedTokens}</span>
                )}
              </p>
            </div>
          </div>

          {elapsedTime !== undefined && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Tiempo</p>
                <p className="text-sm font-semibold text-slate-200">
                  {Math.floor(elapsedTime / 60)}:
                  {(elapsedTime % 60).toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          )}
        </div>

        {isGenerating && (
          <div className="pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <p className="text-sm text-slate-400">
                JoxCoder está trabajando en tu proyecto...
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
