'use client'

import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ReactNode, useMemo } from 'react'

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
    if (!convexUrl) {
      if (typeof window !== 'undefined') {
        console.warn('NEXT_PUBLIC_CONVEX_URL is not set. Convex functionality will be limited.')
      }
      return new ConvexReactClient('https://placeholder.convex.cloud')
    }
    return new ConvexReactClient(convexUrl)
  }, [])

  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
