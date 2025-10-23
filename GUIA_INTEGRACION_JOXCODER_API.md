# 🔌 Guía de Integración de JoxCoder API en AUTOCREA

## Índice
1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Arquitectura de Integración](#arquitectura-de-integración)
4. [Paso 1: Configurar API Keys](#paso-1-configurar-api-keys)
5. [Paso 2: Crear API Route](#paso-2-crear-api-route)
6. [Paso 3: Implementar Cliente JoxCoder](#paso-3-implementar-cliente-joxcoder)
7. [Paso 4: Conectar con Frontend](#paso-4-conectar-con-frontend)
8. [Paso 5: Guardar en Convex](#paso-5-guardar-en-convex)
9. [Paso 6: Auto-Organización de Archivos](#paso-6-auto-organización-de-archivos)
10. [Paso 7: Auto-Commit a GitHub](#paso-7-auto-commit-a-github)
11. [Testing](#testing)
12. [Error Handling](#error-handling)
13. [Optimizaciones](#optimizaciones)

---

## Introducción

**JoxCoder AI** es el modelo de inteligencia artificial multi-rol de JoxAI, entrenado específicamente para generación de código profesional. Esta guía te ayudará a integrar JoxCoder API en AUTOCREA de manera completa y funcional.

### ¿Qué lograrás con esta integración?

- ✅ Generación de código usando 12 roles técnicos especializados
- ✅ Persistencia automática en Convex
- ✅ Tracking de tokens consumidos
- ✅ Auto-organización de archivos en carpetas
- ✅ Auto-commit a GitHub/GitLab
- ✅ Error handling robusto

---

## Requisitos Previos

### 1. API Credentials

Necesitas tener configuradas estas variables de entorno:

```bash
JOXCODER_API_KEY=jox_...           # API key de JoxCoder
JOXCODER_API_URL=https://api.joxai.com/v1  # Base URL de la API
```

### 2. Convex Configurado

Asegúrate de que Convex esté completamente configurado con los schemas necesarios:

```bash
convex/
├── schema.ts
├── users.ts
├── projects.ts
├── generations.ts
├── tokenUsage.ts
├── projectFiles.ts
└── commits.ts
```

### 3. Clerk Auth Funcionando

La integración requiere autenticación con Clerk para:
- Obtener `userId`
- Verificar token limits (feature gating)
- Sincronizar con Convex

---

## Arquitectura de Integración

### Flujo Completo

```
┌───────────────┐
│ User (Chat)   │
│ - Rol         │
│ - Prompt      │
└───────┬───────┘
        │
        ▼
┌───────────────────┐
│ Frontend          │
│ - Validate tokens │
│ - Show loading    │
└───────┬───────────┘
        │
        ▼
┌───────────────────────┐
│ API Route             │
│ /api/joxcoder/generate│
│ - Auth check          │
│ - Call JoxCoder       │
│ - Parse response      │
└───────┬───────────────┘
        │
        ▼
┌───────────────────────┐
│ JoxCoder API          │
│ - Process prompt      │
│ - Generate code       │
│ - Return tokens used  │
└───────┬───────────────┘
        │
        ▼
┌───────────────────────┐
│ Post-Processing       │
│ - Save to Convex      │
│ - Increment tokens    │
│ - Organize files      │
│ - Auto-commit (if connected) │
└───────┬───────────────┘
        │
        ▼
┌───────────────────────┐
│ Response to Frontend  │
│ - Code generated      │
│ - Files list          │
│ - Tokens used         │
└───────────────────────┘
```

---

## Paso 1: Configurar API Keys

### 1.1 Crear Variables de Entorno

En Replit Secrets o `.env.local`:

```bash
# JoxCoder API
JOXCODER_API_KEY=jox_live_abc123...
JOXCODER_API_URL=https://api.joxai.com/v1

# Para desarrollo
JOXCODER_API_KEY=jox_test_xyz789...
JOXCODER_API_URL=https://api-dev.joxai.com/v1
```

### 1.2 Validar en Runtime

```typescript
// src/lib/utils/validate-env.ts
export function validateJoxCoderEnv() {
  if (!process.env.JOXCODER_API_KEY) {
    throw new Error('JOXCODER_API_KEY no está configurada');
  }
  
  if (!process.env.JOXCODER_API_URL) {
    throw new Error('JOXCODER_API_URL no está configurada');
  }
  
  return {
    apiKey: process.env.JOXCODER_API_KEY,
    apiUrl: process.env.JOXCODER_API_URL,
  };
}
```

---

## Paso 2: Crear API Route

### 2.1 Estructura del Archivo

Crea: `app/api/joxcoder/generate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { fetchMutation, fetchQuery } from 'convex/nextjs';

export async function POST(request: NextRequest) {
  try {
    // 1. Autenticación
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // 2. Obtener usuario de Convex
    const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // 3. Validar tokens disponibles
    const tokenUsage = await fetchQuery(api.tokenUsage.getCurrentMonth, {
      userId: user._id,
    });

    const hasUnlimitedTokens = user.plan === 'enterprise';
    if (!hasUnlimitedTokens && tokenUsage) {
      if (tokenUsage.tokensUsed >= tokenUsage.tokensLimit) {
        return NextResponse.json(
          { error: 'Sin tokens disponibles. Upgrade tu plan.' },
          { status: 403 }
        );
      }
    }

    // 4. Parse request body
    const body = await request.json();
    const { role, prompt, projectId } = body;

    // 5. Call JoxCoder API
    const response = await fetch(
      `${process.env.JOXCODER_API_URL}/generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.JOXCODER_API_KEY}`,
        },
        body: JSON.stringify({
          role,
          prompt,
          context: {
            userId: user._id,
            projectId,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'JoxCoder API error');
    }

    const data = await response.json();

    // 6. Save generation to Convex
    await fetchMutation(api.generations.create, {
      userId: user._id,
      projectId,
      role,
      prompt,
      code: data.code,
      language: data.language || 'typescript',
      fileName: data.fileName,
      tokensUsed: data.tokensUsed,
      success: true,
    });

    // 7. Increment tokens used
    await fetchMutation(api.tokenUsage.incrementTokens, {
      userId: user._id,
      tokensUsed: data.tokensUsed,
    });

    // 8. Save files to Convex
    if (data.files && data.files.length > 0) {
      for (const file of data.files) {
        await fetchMutation(api.projectFiles.upsert, {
          projectId,
          fileName: file.name,
          filePath: file.path,
          language: file.language,
          content: file.content,
        });
      }
    }

    // 9. Increment project files count
    await fetchMutation(api.projects.incrementFiles, { projectId });

    // 10. Return response
    return NextResponse.json({
      code: data.code,
      files: data.files,
      tokensUsed: data.tokensUsed,
      explanation: data.explanation,
    });

  } catch (error: any) {
    console.error('[JoxCoder API Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## Paso 3: Implementar Cliente JoxCoder

### 3.1 Crear Cliente Tipado

Crea: `src/lib/joxcoder-client.ts`

```typescript
export interface JoxCoderRequest {
  role: string;
  prompt: string;
  context?: {
    userId?: string;
    projectId?: string;
    language?: string;
    framework?: string;
  };
}

export interface JoxCoderResponse {
  code: string;
  files: Array<{
    name: string;
    path: string;
    language: string;
    content: string;
  }>;
  tokensUsed: number;
  explanation: string;
  language: string;
  fileName?: string;
}

export class JoxCoderClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async generate(request: JoxCoderRequest): Promise<JoxCoderResponse> {
    const response = await fetch(`${this.baseUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'JoxCoder API request failed');
    }

    return await response.json();
  }

  async streamGenerate(
    request: JoxCoderRequest,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/generate/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Stream request failed');
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  }
}

// Singleton instance
export const joxCoder = new JoxCoderClient(
  process.env.JOXCODER_API_KEY!,
  process.env.JOXCODER_API_URL!
);
```

---

## Paso 4: Conectar con Frontend

### 4.1 Actualizar Chat Component

En `app/(dashboard)/chat/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function ChatPage() {
  const { userId } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [code, setCode] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/joxcoder/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: selectedRole,
          prompt: userPrompt,
          projectId: currentProjectId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      
      // Update UI
      setCode(data.code);
      setTokensUsed(prev => prev + data.tokensUsed);
      
      // Add files to explorer
      data.files.forEach(file => {
        addFile(file);
      });

      // Success toast
      toast.success(`Código generado! (${data.tokensUsed} tokens)`);

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    // ... UI
  );
}
```

---

## Paso 5: Guardar en Convex

### 5.1 Generation History

```typescript
// convex/generations.ts
export const create = mutation({
  args: {
    userId: v.id("users"),
    projectId: v.id("projects"),
    role: v.string(),
    prompt: v.string(),
    code: v.string(),
    language: v.string(),
    fileName: v.optional(v.string()),
    tokensUsed: v.number(),
    success: v.boolean(),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("generations", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
```

### 5.2 Token Usage Tracking

```typescript
// convex/tokenUsage.ts
export const incrementTokens = mutation({
  args: {
    userId: v.id("users"),
    tokensUsed: v.number(),
  },
  handler: async (ctx, { userId, tokensUsed }) => {
    const month = new Date().toISOString().slice(0, 7); // YYYY-MM
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        tokensUsed: existing.tokensUsed + tokensUsed,
        generationsCount: existing.generationsCount + 1,
        lastGenerationAt: Date.now(),
      });
    }
  },
});
```

---

## Paso 6: Auto-Organización de Archivos

### 6.1 Algoritmo de Organización

```typescript
// src/lib/utils/file-organizer.ts
export function organizeGeneratedFiles(files: any[]) {
  const organized = {
    src: [],
    components: [],
    pages: [],
    api: [],
    styles: [],
    utils: [],
    types: [],
    tests: [],
    config: [],
    public: [],
  };

  files.forEach(file => {
    const path = file.path.toLowerCase();

    if (path.includes('component')) {
      organized.components.push(file);
    } else if (path.includes('page')) {
      organized.pages.push(file);
    } else if (path.includes('api') || path.includes('route')) {
      organized.api.push(file);
    } else if (path.includes('.css') || path.includes('.scss')) {
      organized.styles.push(file);
    } else if (path.includes('util') || path.includes('helper')) {
      organized.utils.push(file);
    } else if (path.includes('type') || path.includes('.d.ts')) {
      organized.types.push(file);
    } else if (path.includes('test') || path.includes('.spec.')) {
      organized.tests.push(file);
    } else if (path.includes('config') || path.includes('.json')) {
      organized.config.push(file);
    } else if (path.includes('public') || path.includes('asset')) {
      organized.public.push(file);
    } else {
      organized.src.push(file);
    }
  });

  return organized;
}
```

### 6.2 Actualizar File Explorer

```typescript
// Guardar archivos organizados en Convex
const organizedFiles = organizeGeneratedFiles(data.files);

for (const [folder, files] of Object.entries(organizedFiles)) {
  for (const file of files) {
    await fetchMutation(api.projectFiles.upsert, {
      projectId,
      fileName: file.name,
      filePath: `${folder}/${file.path}`,
      language: file.language,
      content: file.content,
    });
  }
}
```

---

## Paso 7: Auto-Commit a GitHub

### 7.1 Verificar Conexión

```typescript
// En API route después de generar código
const project = await fetchQuery(api.projects.getById, { projectId });

if (project.githubRepoUrl) {
  await autoCommitToGitHub({
    repoUrl: project.githubRepoUrl,
    files: data.files,
    message: `feat: ${prompt.substring(0, 50)}...`,
  });
}
```

### 7.2 Implementar Auto-Commit

Crea: `app/api/repository/auto-commit/route.ts`

```typescript
import { Octokit } from '@octokit/rest';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { repoUrl, files, message } = await request.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Parse repo URL
    const [owner, repo] = repoUrl
      .replace('https://github.com/', '')
      .split('/');

    // Create or update files
    for (const file of files) {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: file.path,
        message,
        content: Buffer.from(file.content).toString('base64'),
      });
    }

    // Save commit to Convex
    await fetchMutation(api.commits.create, {
      projectId,
      userId: user._id,
      message,
      filesChanged: files.map(f => f.path),
      repository: 'github',
      commitUrl: `https://github.com/${owner}/${repo}/commits`,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('[Auto-Commit Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## Testing

### 1. Test API Endpoint

```bash
curl -X POST http://localhost:5000/api/joxcoder/generate \
  -H "Content-Type: application/json" \
  -d '{
    "role": "fullstack",
    "prompt": "Create a simple todo app",
    "projectId": "123"
  }'
```

### 2. Test Frontend Integration

```typescript
// Cypress test
describe('JoxCoder Integration', () => {
  it('should generate code successfully', () => {
    cy.visit('/chat');
    cy.get('[data-testid="role-selector"]').select('fullstack');
    cy.get('[data-testid="prompt-input"]').type('Create a todo app');
    cy.get('[data-testid="generate-button"]').click();
    
    cy.get('[data-testid="code-editor"]').should('contain', 'function');
    cy.get('[data-testid="token-used"]').should('be.visible');
  });
});
```

---

## Error Handling

### Common Errors

1. **401 Unauthorized**: API key inválida
2. **403 Forbidden**: Sin tokens disponibles
3. **429 Too Many Requests**: Rate limit exceeded
4. **500 Internal Server Error**: Error en JoxCoder API

### Retry Logic

```typescript
async function generateWithRetry(request: JoxCoderRequest, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await joxCoder.generate(request);
    } catch (error: any) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

---

## Optimizaciones

### 1. Caching

```typescript
// Cachear respuestas frecuentes
const cache = new Map<string, JoxCoderResponse>();

function getCacheKey(role: string, prompt: string): string {
  return `${role}:${prompt.substring(0, 100)}`;
}
```

### 2. Streaming Response

Para UX mejorada, usa streaming:

```typescript
const response = await fetch('/api/joxcoder/generate/stream', {
  method: 'POST',
  body: JSON.stringify({ role, prompt }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  setCode(prev => prev + chunk); // Actualizar UI incrementalmente
}
```

### 3. Rate Limiting

```typescript
// En API route
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

const { success } = await ratelimit.limit(userId);
if (!success) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

---

## Checklist de Integración

- [ ] Variables de entorno configuradas
- [ ] API Route `/api/joxcoder/generate` implementado
- [ ] Cliente JoxCoder creado
- [ ] Frontend conectado
- [ ] Persistencia en Convex funcionando
- [ ] Token tracking activo
- [ ] Auto-organización de archivos
- [ ] Auto-commit a GitHub (opcional)
- [ ] Error handling implementado
- [ ] Tests escritos

---

**¡Listo!** Ahora tienes JoxCoder AI completamente integrado en AUTOCREA. 🚀

**Soporte**: support@joxai.org
