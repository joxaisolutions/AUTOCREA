import { AppError, TokenLimitError } from './app-error';

export interface ErrorAction {
  label: string;
  onClick: () => void;
}

export function getErrorDescription(code: string): string {
  const descriptions: Record<string, string> = {
    'TOKEN_LIMIT_EXCEEDED': 'Resetea en 30 días o mejora tu plan ahora',
    'VALIDATION_ERROR': 'Verifica que todos los campos sean correctos',
    'GENERATION_ERROR': 'El modelo no pudo procesar tu solicitud',
    'AUTHENTICATION_ERROR': 'Por favor inicia sesión para continuar',
    'AUTHORIZATION_ERROR': 'No tienes permisos para realizar esta acción',
    'NOT_FOUND': 'El recurso solicitado no existe',
    'RATE_LIMIT_EXCEEDED': 'Has alcanzado el límite de solicitudes',
    'STRIPE_ERROR': 'Error al procesar el pago',
    'CONVEX_ERROR': 'Error al conectar con la base de datos',
  };
  
  return descriptions[code] || 'Error desconocido';
}

export function getErrorAction(code: string): ErrorAction | undefined {
  const actions: Record<string, ErrorAction> = {
    'TOKEN_LIMIT_EXCEEDED': {
      label: 'Mejorar Plan',
      onClick: () => {
        if (typeof window !== 'undefined') {
          window.location.href = '/pricing';
        }
      }
    },
    'AUTHENTICATION_ERROR': {
      label: 'Iniciar Sesión',
      onClick: () => {
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
      }
    },
  };
  
  return actions[code];
}

export function handleError(error: unknown): {
  title: string;
  description: string;
  action?: ErrorAction;
} {
  console.error('Error:', error);
  
  if (error instanceof AppError) {
    return {
      title: error.message,
      description: getErrorDescription(error.code),
      action: getErrorAction(error.code),
    };
  }
  
  if (error instanceof Error) {
    return {
      title: 'Algo salió mal',
      description: error.message || 'Por favor intenta de nuevo',
    };
  }
  
  return {
    title: 'Error inesperado',
    description: 'Por favor intenta de nuevo o contacta soporte',
  };
}

export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

export function logError(error: unknown, context?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
    context,
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Log:', JSON.stringify(errorInfo, null, 2));
  }
  
  // TODO: Send to Sentry or other error tracking service in production
  if (process.env.NODE_ENV === 'production' && !isOperationalError(error)) {
    // captureException(error, { extra: context });
  }
}
