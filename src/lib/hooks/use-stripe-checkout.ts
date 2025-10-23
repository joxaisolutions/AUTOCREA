'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createCheckoutSession = async (planId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear sesión de pago');
      }

      if (data.url) {
        // Redirigir a Stripe Checkout
        window.location.href = data.url;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al abrir portal del cliente');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Portal error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    openCustomerPortal,
    loading,
    error,
  };
}
