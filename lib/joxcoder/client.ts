// ==============================================
// JOXCODER AI - CLIENTE PRINCIPAL
// ==============================================

import { JoxCoderRequest, JoxCoderResponse } from './types';
import { getRolePrompt } from './role-prompts';

export class JoxCoderClient {
  private modelEndpoint: string;
  private apiKey: string;

  constructor(config?: { endpoint?: string; apiKey?: string }) {
    this.modelEndpoint = config?.endpoint || process.env.JOXCODER_API_ENDPOINT || '';
    this.apiKey = config?.apiKey || process.env.JOXCODER_API_KEY || '';
  }

  async generate(request: JoxCoderRequest): Promise<JoxCoderResponse> {
    try {
      // Construir prompt completo con el rol especializado
      const fullPrompt = getRolePrompt(
        request.role,
        request.prompt,
        request.context
      );

      // TODO: Cuando el modelo JoxCoder esté disponible, conectar aquí
      // Por ahora, retornamos una respuesta simulada para que la UI funcione
      if (!this.modelEndpoint) {
        return this.mockGeneration(request, fullPrompt);
      }

      // Llamada real al modelo JoxCoder
      const response = await fetch(this.modelEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          role: request.role,
          language: request.language,
          max_tokens: 4096,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`JoxCoder API Error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        generatedCode: data.code || data.output,
        explanation: data.explanation,
        tokensUsed: data.tokens_used,
      };

    } catch (error) {
      console.error('JoxCoder Generation Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // Método temporal para simular generación mientras el modelo se entrena
  private async mockGeneration(
    request: JoxCoderRequest,
    fullPrompt: string
  ): Promise<JoxCoderResponse> {
    // Simular delay del modelo
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockCode = this.generateMockCode(request);

    return {
      success: true,
      generatedCode: mockCode,
      explanation: `Código generado por rol "${request.role}" para: ${request.prompt}`,
      tokensUsed: Math.floor(fullPrompt.length / 4) + Math.floor(mockCode.length / 4),
    };
  }

  private generateMockCode(request: JoxCoderRequest): string {
    const { role, prompt, language = 'typescript' } = request;

    // Plantillas básicas por rol para demostración
    const templates: Record<string, string> = {
      fullstack: `// ========================================
// APLICACIÓN FULLSTACK - Generada por JoxCoder AI
// Rol: Fullstack Developer
// ========================================

// FRONTEND - React Component
import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        ${request.context?.projectName || 'Mi Aplicación'}
      </h1>
      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            {JSON.stringify(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// BACKEND - API Routes (Next.js)
// ========================================

// app/api/data/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Conectar a base de datos
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener datos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Guardar en base de datos
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear item' },
      { status: 500 }
    );
  }
}`,

      frontend: `// ========================================
// COMPONENTES FRONTEND - Generada por JoxCoder AI
// Rol: Frontend Developer
// ========================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ${request.context?.projectName?.replace(/\s+/g, '') || 'Component'}() {
  const [state, setState] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', state);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
        ${request.context?.projectName || 'Componente'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Input
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-cyan-500 outline-none"
            placeholder="Ingrese valor..."
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          Enviar
        </button>
      </form>
    </motion.div>
  );
}`,

      backend: `// ========================================
// BACKEND API - Generada por JoxCoder AI
// Rol: Backend Developer
// ========================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// Tipo de datos
interface DataItem {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

// GET - Obtener todos los items
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // TODO: Consultar base de datos
    const items: DataItem[] = [];

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo item
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validación
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes' },
        { status: 400 }
      );
    }

    // TODO: Guardar en base de datos
    const newItem: DataItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: body.name,
      description: body.description,
      createdAt: new Date(),
    };

    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}`,

      arquitecto: `# ========================================
# ARQUITECTURA DEL SISTEMA - Generada por JoxCoder AI
# Rol: Software Architect
# ========================================

## Proyecto: ${request.context?.projectName || 'Sistema'}

### 1. STACK TECNOLÓGICO RECOMENDADO

**Frontend:**
- Framework: Next.js 14 (App Router)
- UI Library: React 18
- Styling: Tailwind CSS
- State Management: Zustand
- Forms: React Hook Form + Zod

**Backend:**
- Runtime: Node.js 20+
- Framework: Next.js API Routes
- Database: PostgreSQL (Neon)
- ORM: Drizzle ORM
- Auth: Clerk

**DevOps:**
- Deployment: Vercel/Replit
- CI/CD: GitHub Actions
- Monitoring: Vercel Analytics

### 2. ESTRUCTURA DE PROYECTO

\`\`\`
project/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── [...]/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/
│   └── features/
├── lib/
│   ├── db/
│   ├── utils/
│   └── hooks/
├── public/
└── package.json
\`\`\`

### 3. PATRONES DE ARQUITECTURA

- **Frontend:** Component-based architecture
- **Backend:** RESTful API con Next.js Route Handlers
- **Database:** Relational model con PostgreSQL
- **Auth:** Session-based con Clerk

### 4. DECISIONES TÉCNICAS

1. **¿Por qué Next.js?**
   - SSR/SSG para SEO
   - API routes integradas
   - File-based routing
   - Optimización automática

2. **¿Por qué Clerk?**
   - Auth completa out-of-the-box
   - Social logins
   - Session management
   - Fácil integración

3. **¿Por qué PostgreSQL?**
   - Relaciones complejas
   - ACID compliance
   - Escalabilidad
   - JSON support

### 5. DIAGRAMA DE FLUJO

\`\`\`
Usuario → Frontend (Next.js) → API Routes → Database (PostgreSQL)
                ↓
            Clerk Auth
\`\`\``,

      devops: `# ========================================
# CONFIGURACIÓN DEVOPS - Generada por JoxCoder AI
# Rol: DevOps Engineer
# ========================================

## Dockerfile
\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## docker-compose.yml
\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
\`\`\`

## GitHub Actions CI/CD
\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run lint
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
\`\`\`

## Variables de Entorno (.env.example)
\`\`\`bash
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tuapp.com

# Database
DATABASE_URL=postgresql://...

# Auth
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
\`\`\``,
    };

    return templates[role] || `// Código generado para: ${prompt}\n\n// TODO: Implementar funcionalidad`;
  }
}

// Singleton para uso global
let joxCoderClient: JoxCoderClient | null = null;

export function getJoxCoder(): JoxCoderClient {
  if (!joxCoderClient) {
    joxCoderClient = new JoxCoderClient();
  }
  return joxCoderClient;
}
