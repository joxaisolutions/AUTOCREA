'use client'

import { useState } from 'react'
import { X, Sparkles, Code, Rocket, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const steps = [
  {
    title: 'Bienvenido a AUTOCREA',
    description: 'La plataforma de desarrollo potenciada por JoxCoder AI que transforma tus ideas en aplicaciones completas.',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Selecciona un Rol Técnico',
    description: 'Elige entre 12 roles especializados: Fullstack, Frontend, Backend, DevOps, Security, y más. Cada rol está optimizado para generar código específico.',
    icon: Code,
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Describe tu Proyecto',
    description: 'Proporciona detalles sobre tu aplicación y deja que JoxCoder AI genere código production-ready automáticamente.',
    icon: Rocket,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: '¡Listo para Crear!',
    description: 'Conecta GitHub/GitLab, organiza archivos automáticamente, y despliega tu app. ¡Comienza a generar código ahora!',
    icon: CheckCircle2,
    color: 'from-pink-500 to-cyan-500',
  },
]

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
      onClose()
    }
  }

  const handleSkip = () => {
    onComplete()
    onClose()
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleSkip}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${currentStepData.color} flex items-center justify-center`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {currentStepData.title}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-8 bg-cyan-400'
                        : index < currentStep
                        ? 'w-2 bg-cyan-600'
                        : 'w-2 bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSkip}
                  className="flex-1 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Saltar Tutorial
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  {currentStep === steps.length - 1 ? '¡Comenzar!' : 'Siguiente'}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Powered by <span className="text-cyan-400 font-semibold">JoxAI</span>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
