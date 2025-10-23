import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from '@/src/lib/convex-client'
import './globals.css'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'AUTOCREA V2.0 - Powered by JoxAI',
  description: 'Plataforma autónoma de desarrollo con IA. De idea a aplicación completa en minutos. Creado por JoxAI.',
  keywords: 'AI, desarrollo, automatización, JoxAI, AUTOCREA, código, generación',
  openGraph: {
    title: 'AUTOCREA V2.0 - Powered by JoxAI',
    description: 'De idea a aplicación completa en minutos con IA',
    images: ['/autocrea-hero.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
