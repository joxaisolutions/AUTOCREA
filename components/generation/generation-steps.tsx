"use client";

import { Card } from "@/components/ui/card";
import {
  Brain,
  Server,
  Palette,
  Rocket,
  Shield,
  CheckCircle2,
  Loader2,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GenerationStep } from "@/lib/stores/chat-store";

interface GenerationStepsProps {
  steps: GenerationStep[];
  currentStep?: number;
}

const roleIcons = {
  architect: Brain,
  backend: Server,
  frontend: Palette,
  devops: Rocket,
  security: Shield,
};

const roleColors = {
  architect: "from-purple-500 to-pink-500",
  backend: "from-blue-500 to-cyan-500",
  frontend: "from-green-500 to-emerald-500",
  devops: "from-orange-500 to-red-500",
  security: "from-yellow-500 to-amber-500",
};

const roleLabels = {
  architect: "Arquitecto",
  backend: "Backend",
  frontend: "Frontend",
  devops: "DevOps",
  security: "Seguridad",
};

export function GenerationSteps({ steps, currentStep }: GenerationStepsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-200">
          Pasos de Generación
        </h3>
        <div className="text-sm text-slate-400">
          {steps.filter((s) => s.status === "completed").length} de {steps.length}{" "}
          completados
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = roleIcons[step.role];
          const isActive = currentStep === index + 1;

          return (
            <Card
              key={step.id}
              className={cn(
                "p-4 transition-all duration-300",
                isActive && "ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br flex-shrink-0",
                    roleColors[step.role]
                  )}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-slate-200">
                        {roleLabels[step.role]}
                      </h4>
                      <span className="text-xs text-slate-500">
                        #{index + 1}
                      </span>
                    </div>
                    {step.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    )}
                    {step.status === "in_progress" && (
                      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                    )}
                    {step.status === "failed" && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    {step.status === "pending" && (
                      <Clock className="w-5 h-5 text-slate-500" />
                    )}
                  </div>

                  <p className="text-sm text-slate-400 mb-2">{step.name}</p>

                  {step.output && (
                    <div className="mt-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                      <p className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                        {step.output.length > 200
                          ? step.output.substring(0, 200) + "..."
                          : step.output}
                      </p>
                    </div>
                  )}

                  {step.error && (
                    <div className="mt-3 p-3 bg-red-950/30 rounded-lg border border-red-900">
                      <p className="text-xs text-red-300">{step.error}</p>
                    </div>
                  )}

                  {step.tokensUsed !== undefined && step.tokensUsed > 0 && (
                    <div className="mt-2 text-xs text-slate-500">
                      {step.tokensUsed} tokens utilizados
                    </div>
                  )}

                  {step.completedAt && step.startedAt && (
                    <div className="mt-1 text-xs text-slate-500">
                      Duración:{" "}
                      {((step.completedAt - step.startedAt) / 1000).toFixed(1)}s
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
