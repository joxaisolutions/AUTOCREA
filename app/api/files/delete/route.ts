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

    const { projectName, filePath } = await request.json()

    if (!projectName || !filePath) {
      return NextResponse.json(
        { error: 'Nombre del proyecto y ruta del archivo son requeridos' },
        { status: 400 }
      )
    }

    const projectDir = path.join(process.cwd(), 'generated-projects', userId, projectName)
    const fullPath = path.join(projectDir, filePath)

    // Verificar que el path está dentro del directorio del proyecto (seguridad)
    if (!fullPath.startsWith(projectDir)) {
      return NextResponse.json(
        { error: 'Ruta de archivo inválida' },
        { status: 403 }
      )
    }

    try {
      const exists = await fs.pathExists(fullPath)
      
      if (!exists) {
        return NextResponse.json(
          { error: 'Archivo no encontrado' },
          { status: 404 }
        )
      }

      await fs.remove(fullPath)

      return NextResponse.json({
        success: true,
        message: 'Archivo eliminado exitosamente',
        deletedPath: filePath
      })

    } catch (error: any) {
      console.error('File delete error:', error)
      return NextResponse.json(
        { error: 'Error al eliminar archivo', details: error.message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Files delete error:', error)
    return NextResponse.json(
      { error: 'Error al procesar eliminación' },
      { status: 500 }
    )
  }
}
