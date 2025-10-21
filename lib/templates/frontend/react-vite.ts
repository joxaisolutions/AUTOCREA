import type { CodeTemplate } from '../types'

export const reactViteTemplate: CodeTemplate = {
  id: 'react-vite-app',
  name: 'React + Vite SPA',
  description: 'Single Page Application con React, Vite y TailwindCSS',
  category: 'frontend',
  framework: 'React',
  language: 'TypeScript',
  icon: '⚛️',
  tags: ['react', 'vite', 'typescript', 'tailwind', 'spa'],
  complexity: 'beginner',
  estimatedTime: '5 min',
  files: [
    {
      path: 'src/main.tsx',
      language: 'typescript',
      content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
    },
    {
      path: 'src/App.tsx',
      language: 'typescript',
      content: `import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Bienvenido a React + Vite
          </h1>
          <p className="text-xl text-gray-600">
            Creada con AUTOCREA - Powered by JoxAI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon="⚡"
            title="Ultra Rápido"
            description="Vite proporciona HMR instantáneo"
          />
          <FeatureCard
            icon="🎨"
            title="Tailwind CSS"
            description="Diseño moderno y responsive"
          />
          <FeatureCard
            icon="📘"
            title="TypeScript"
            description="Type-safe development"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Contador de Ejemplo
          </h2>
          <div className="space-y-4">
            <div className="text-6xl font-bold text-indigo-600">
              {count}
            </div>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Incrementar
            </button>
            <button
              onClick={() => setCount(0)}
              className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default App`
    },
    {
      path: 'src/index.css',
      language: 'css',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  width: 100%;
}`
    },
    {
      path: 'src/App.css',
      language: 'css',
      content: ``
    },
    {
      path: 'index.html',
      language: 'html',
      content: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React + Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
    },
    {
      path: 'package.json',
      language: 'json',
      content: `{
  "name": "react-vite-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.7.0",
    "@typescript-eslint/parser": "^7.7.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5",
    "vite": "^5.2.10"
  }
}`
    },
    {
      path: 'vite.config.ts',
      language: 'typescript',
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})`
    },
    {
      path: 'tailwind.config.js',
      language: 'javascript',
      content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    {
      path: 'tsconfig.json',
      language: 'json',
      content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`
    },
    {
      path: '.gitignore',
      language: 'text',
      content: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`
    },
    {
      path: 'README.md',
      language: 'markdown',
      content: `# React + Vite App

Aplicación React moderna creada con **AUTOCREA** - Powered by **JoxAI**

## 🚀 Características

- ⚛️ React 18 con hooks
- ⚡ Vite para build ultrarrápido
- 📘 TypeScript para type safety
- 🎨 Tailwind CSS para estilos
- 🔥 HMR (Hot Module Replacement)

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
npm run preview
\`\`\`

## 📝 Scripts Disponibles

- \`npm run dev\` - Inicia servidor de desarrollo
- \`npm run build\` - Build para producción
- \`npm run lint\` - Lint del código
- \`npm run preview\` - Preview del build

---

**Creado con ❤️ usando AUTOCREA**`
    }
  ],
  dependencies: [
    'react@^18.3.1',
    'react-dom@^18.3.1',
    '@types/react@^18.3.1',
    '@types/react-dom@^18.3.0',
    '@vitejs/plugin-react@^4.2.1',
    'vite@^5.2.10',
    'typescript@^5.4.5',
    'tailwindcss@^3.4.3',
    'autoprefixer@^10.4.19',
    'postcss@^8.4.38'
  ],
  scripts: {
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview'
  },
  setupInstructions: [
    'Instala las dependencias con npm install',
    'Inicia el servidor de desarrollo con npm run dev',
    'Abre http://localhost:3000 en tu navegador',
    'Comienza a editar src/App.tsx para ver cambios en vivo',
    'Para producción, ejecuta npm run build'
  ]
}
