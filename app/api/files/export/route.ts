import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import archiver from 'archiver'
import { Readable } from 'stream'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { files, projectName = 'autocrea-project' } = await request.json()

    if (!files || !Array.isArray(files)) {
      return NextResponse.json(
        { error: 'Lista de archivos requerida' },
        { status: 400 }
      )
    }

    // Crear ZIP en memoria
    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    // Buffer para almacenar el ZIP
    const chunks: Buffer[] = []

    archive.on('data', (chunk) => {
      chunks.push(chunk)
    })

    // Agregar archivos al ZIP
    for (const file of files) {
      if (file.name && file.content) {
        archive.append(file.content, { name: file.name })
      }
    }

    // Agregar README con información del proyecto
    const readme = `# ${projectName}

**Generado automáticamente por AUTOCREA v2.0**
Powered by JoxAI

## Archivos incluidos

${files.map((f: any) => `- ${f.name}`).join('\n')}

## Instrucciones

1. Descomprime este archivo
2. Instala las dependencias (si las hay): \`npm install\` o \`pip install -r requirements.txt\`
3. Ejecuta el proyecto según su tipo

---
🤖 Creado con JoxCoder AI - https://autocrea.ai
`

    archive.append(readme, { name: 'README.md' })

    // Finalizar archivo
    await archive.finalize()

    // Esperar a que termine
    await new Promise((resolve) => {
      archive.on('end', resolve)
    })

    // Combinar chunks
    const zipBuffer = Buffer.concat(chunks)

    // Retornar como archivo descargable
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${projectName}.zip"`,
        'Content-Length': zipBuffer.length.toString()
      }
    })

  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Error al exportar proyecto', details: error.message },
      { status: 500 }
    )
  }
}
