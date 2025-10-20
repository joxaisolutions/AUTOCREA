import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import fs from 'fs-extra'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { files, projectName } = await request.json()

    if (!files || !Array.isArray(files)) {
      return NextResponse.json(
        { error: 'Lista de archivos requerida' },
        { status: 400 }
      )
    }

    // Crear directorio del proyecto
    const projectDir = path.join(process.cwd(), 'generated-projects', userId, projectName || 'default')
    
    try {
      await fs.ensureDir(projectDir)

      const savedFiles = []

      // Guardar cada archivo
      for (const file of files) {
        if (!file.name || !file.content) continue

        const filePath = path.join(projectDir, file.name)
        const fileDir = path.dirname(filePath)

        // Asegurar que el directorio existe
        await fs.ensureDir(fileDir)

        // Guardar archivo
        await fs.writeFile(filePath, file.content, 'utf-8')

        savedFiles.push({
          name: file.name,
          path: filePath,
          size: file.content.length
        })
      }

      return NextResponse.json({
        success: true,
        projectDir,
        filesCount: savedFiles.length,
        files: savedFiles,
        message: `${savedFiles.length} archivos guardados exitosamente`
      })

    } catch (error: any) {
      console.error('File save error:', error)
      return NextResponse.json(
        { error: 'Error al guardar archivos', details: error.message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Files save error:', error)
    return NextResponse.json(
      { error: 'Error al procesar archivos' },
      { status: 500 }
    )
  }
}
