import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import fs from 'fs-extra'
import path from 'path'

// Helper top-level: readDirectory fuera del bloque POST para evitar el error ES5/strict
const readDirectory = async (dir: string, baseDir: string = dir): Promise<any[]> => {
  const items = await fs.readdir(dir, { withFileTypes: true })
  const files: any[] = []

  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    const relativePath = path.relative(baseDir, fullPath)

    if (item.isDirectory()) {
      const subFiles = await readDirectory(fullPath, baseDir)
      files.push({
        id: relativePath,
        name: item.name,
        type: 'folder',
        children: subFiles,
      })
    } else {
      const content = await fs.readFile(fullPath, 'utf-8')
      const ext = path.extname(item.name).substring(1)

      files.push({
        id: relativePath,
        name: item.name,
        type: 'file',
        content,
        language: getLanguageFromExtension(ext),
      })
    }
  }

  return files
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { projectName } = await request.json()

    if (!projectName) {
      return NextResponse.json({ error: 'Nombre del proyecto requerido' }, { status: 400 })
    }

    const projectDir = path.join(process.cwd(), 'generated-projects', userId, projectName)

    try {
      // Verificar que el directorio existe
      const exists = await fs.pathExists(projectDir)

      if (!exists) {
        return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
      }

      const files = await readDirectory(projectDir, projectDir)

      return NextResponse.json({ success: true, projectName, projectDir, files })
    } catch (error: any) {
      console.error('File load error:', error)
      return NextResponse.json(
        { error: 'Error al cargar archivos', details: String(error?.message ?? error) },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Files load error:', error)
    return NextResponse.json({ error: 'Error al procesar carga', details: String(error?.message ?? error) }, { status: 500 })
  }
}

function getLanguageFromExtension(ext: string): string {
  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    html: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
  }

  return languageMap[ext] || 'text'
}
