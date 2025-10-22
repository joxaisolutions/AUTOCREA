export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super('VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
    if (field) {
      this.message = `${field}: ${message}`;
    }
  }
}

export class TokenLimitError extends AppError {
  constructor(used: number, limit: number) {
    super(
      'TOKEN_LIMIT_EXCEEDED',
      `Has excedido tu límite de tokens (${used}/${limit}). Mejora tu plan para continuar.`,
      429
    );
    this.name = 'TokenLimitError';
  }
}

export class GenerationError extends AppError {
  constructor(message: string, details?: string) {
    super('GENERATION_ERROR', message, 500);
    this.name = 'GenerationError';
    if (details) {
      this.message = `${message}: ${details}`;
    }
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'No autenticado') {
    super('AUTHENTICATION_ERROR', message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'No autorizado') {
    super('AUTHORIZATION_ERROR', message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} no encontrado`, 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    const message = retryAfter 
      ? `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter} segundos.`
      : 'Demasiadas solicitudes. Por favor espera un momento.';
    
    super('RATE_LIMIT_EXCEEDED', message, 429);
    this.name = 'RateLimitError';
  }
}

export class StripeError extends AppError {
  constructor(message: string, details?: unknown) {
    super('STRIPE_ERROR', message, 500);
    this.name = 'StripeError';
    if (details) {
      console.error('Stripe Error Details:', details);
    }
  }
}

export class ConvexError extends AppError {
  constructor(message: string, details?: unknown) {
    super('CONVEX_ERROR', message, 500);
    this.name = 'ConvexError';
    if (details) {
      console.error('Convex Error Details:', details);
    }
  }
}
