import type { CodeTemplate } from '../types'

export const nextjsAppTemplate: CodeTemplate = {
  id: 'nextjs-14-app',
  name: 'Next.js 14 App Router',
  description: 'Aplicación moderna de Next.js con App Router, TypeScript y Tailwind CSS',
  category: 'fullstack',
  framework: 'Next.js',
  language: 'TypeScript',
  icon: '⚡',
  tags: ['react', 'nextjs', 'typescript', 'tailwind', 'app-router'],
  complexity: 'intermediate',
  estimatedTime: '5 min',
  files: [
    {
      path: 'app/layout.tsx',
      language: 'typescript',
      content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mi App Next.js',
  description: 'Creada con AUTOCREA - Powered by JoxAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`
    },
    {
      path: 'app/page.tsx',
      language: 'typescript',
      content: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Bienvenido a tu App Next.js
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Creada con AUTOCREA - Powered by JoxAI
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <FeatureCard 
            title="⚡ Rápido"
            description="Construido con Next.js 14 y App Router"
          />
          <FeatureCard 
            title="🎨 Moderno"
            description="Diseñado con Tailwind CSS"
          />
          <FeatureCard 
            title="🔧 TypeScript"
            description="Type-safe desde el inicio"
          />
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}`
    },
    {
      path: 'app/globals.css',
      language: 'css',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}`
    },
    {
      path: 'package.json',
      language: 'json',
      content: `{
  "name": "my-nextjs-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "next": "14.2.0"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "@types/node": "^20.12.7",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0"
  }
}`
    },
    {
      path: 'tailwind.config.ts',
      language: 'typescript',
      content: `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;`
    },
    {
      path: 'next.config.js',
      language: 'javascript',
      content: `/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig`
    },
    {
      path: 'tsconfig.json',
      language: 'json',
      content: `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`
    },
    {
      path: '.gitignore',
      language: 'text',
      content: `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`
    },
    {
      path: 'README.md',
      language: 'markdown',
      content: `# Mi App Next.js

Aplicación creada con **AUTOCREA** - Powered by **JoxAI**

## 🚀 Características

- ⚡ Next.js 14 con App Router
- 📘 TypeScript para type safety
- 🎨 Tailwind CSS para estilos
- 🔥 Hot Module Replacement

## 📦 Instalación

\`\`\`bash
npm install
\`\`\`

## 🏃‍♂️ Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 📚 Documentación

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Creado con ❤️ usando AUTOCREA**`
    }
  ],
  dependencies: [
    'react@^18.3.1',
    'react-dom@^18.3.1',
    'next@14.2.0',
    'typescript@^5.4.5',
    '@types/node@^20.12.7',
    '@types/react@^18.3.1',
    '@types/react-dom@^18.3.0',
    'autoprefixer@^10.4.19',
    'postcss@^8.4.38',
    'tailwindcss@^3.4.3'
  ],
  scripts: {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'next lint'
  },
  setupInstructions: [
    'Instala las dependencias con npm install',
    'Inicia el servidor de desarrollo con npm run dev',
    'Abre http://localhost:3000 en tu navegador',
    'Comienza a editar app/page.tsx para ver cambios en vivo',
    'Para producción, ejecuta npm run build && npm start'
  ]
}
