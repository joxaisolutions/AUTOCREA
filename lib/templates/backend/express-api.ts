import type { CodeTemplate } from '../types'

export const expressApiTemplate: CodeTemplate = {
  id: 'express-typescript-api',
  name: 'Express TypeScript API',
  description: 'API REST moderna con Express, TypeScript y arquitectura limpia',
  category: 'backend',
  framework: 'Express',
  language: 'TypeScript',
  icon: '🚀',
  tags: ['express', 'typescript', 'api', 'rest', 'backend'],
  complexity: 'intermediate',
  estimatedTime: '10 min',
  files: [
    {
      path: 'src/index.ts',
      language: 'typescript',
      content: `import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🚀 API funcionando correctamente',
    version: '1.0.0',
    createdWith: 'AUTOCREA - Powered by JoxAI'
  })
})

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  })
})

// Example endpoint
app.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'María García', email: 'maria@example.com' }
  ]
  res.json({ data: users, count: users.length })
})

app.post('/api/users', (req: Request, res: Response) => {
  const { name, email } = req.body
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }
  
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    createdAt: new Date().toISOString()
  }
  
  res.status(201).json({ data: newUser, message: 'User created successfully' })
})

// Error handling
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(port, () => {
  console.log(\`⚡ Server running on port \${port}\`)
  console.log(\`🌍 http://localhost:\${port}\`)
})`
    },
    {
      path: 'package.json',
      language: 'json',
      content: `{
  "name": "express-typescript-api",
  "version": "1.0.0",
  "description": "Express API with TypeScript - Created with AUTOCREA",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src/**/*.ts",
    "test": "jest"
  },
  "keywords": ["express", "typescript", "api", "rest"],
  "author": "AUTOCREA",
  "license": "MIT",
  "dependencies": {
    "express": "^4.19.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/morgan": "^1.9.9",
    "@types/node": "^20.12.7",
    "typescript": "^5.4.5",
    "ts-node-dev": "^2.0.0",
    "@typescript-eslint/eslint-plugin": "^7.7.0",
    "@typescript-eslint/parser": "^7.7.0",
    "eslint": "^8.57.0"
  }
}`
    },
    {
      path: 'tsconfig.json',
      language: 'json',
      content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`
    },
    {
      path: '.env.example',
      language: 'text',
      content: `PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=

# JWT
JWT_SECRET=your_secret_key_here

# API Keys
API_KEY=`
    },
    {
      path: '.gitignore',
      language: 'text',
      content: `node_modules/
dist/
.env
.env.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.log`
    },
    {
      path: 'README.md',
      language: 'markdown',
      content: `# Express TypeScript API

API REST moderna creada con **AUTOCREA** - Powered by **JoxAI**

## 🚀 Características

- ⚡ Express.js con TypeScript
- 🔒 Seguridad con Helmet
- 🌐 CORS habilitado
- 📝 Logging con Morgan
- ♻️ Hot reload con ts-node-dev
- 🏗️ Arquitectura limpia

## 📦 Instalación

\`\`\`bash
npm install
\`\`\`

## 🔧 Configuración

Crea un archivo \`.env\` basado en \`.env.example\`:

\`\`\`bash
cp .env.example .env
\`\`\`

## 🏃‍♂️ Desarrollo

\`\`\`bash
npm run dev
\`\`\`

## 🏗️ Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 📡 Endpoints

- \`GET /\` - Root endpoint
- \`GET /health\` - Health check
- \`GET /api/users\` - Obtener usuarios
- \`POST /api/users\` - Crear usuario

## 🧪 Testing

\`\`\`bash
npm test
\`\`\`

---

**Creado con ❤️ usando AUTOCREA**`
    }
  ],
  dependencies: [
    'express@^4.19.2',
    'cors@^2.8.5',
    'helmet@^7.1.0',
    'morgan@^1.10.0',
    'dotenv@^16.4.5',
    '@types/express@^4.17.21',
    '@types/cors@^2.8.17',
    '@types/morgan@^1.9.9',
    '@types/node@^20.12.7',
    'typescript@^5.4.5',
    'ts-node-dev@^2.0.0'
  ],
  scripts: {
    dev: 'ts-node-dev --respawn --transpile-only src/index.ts',
    build: 'tsc',
    start: 'node dist/index.js'
  },
  envVariables: ['PORT', 'NODE_ENV', 'DATABASE_URL', 'JWT_SECRET'],
  setupInstructions: [
    'Instala las dependencias con npm install',
    'Copia .env.example a .env y configura las variables',
    'Inicia el servidor de desarrollo con npm run dev',
    'La API estará disponible en http://localhost:3000',
    'Prueba el endpoint /health para verificar que funciona',
    'Para producción, ejecuta npm run build && npm start'
  ]
}
