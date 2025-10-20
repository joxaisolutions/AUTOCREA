import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { spawn } from 'child_process'

// Comandos permitidos por seguridad
const ALLOWED_COMMANDS = [
  'npm',
  'node',
  'git',
  'ls',
  'pwd',
  'cat',
  'echo',
  'mkdir',
  'rm',
  'cp',
  'mv',
  'touch',
  'cd'
]

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { command, cwd } = await request.json()

    if (!command) {
      return NextResponse.json(
        { error: 'Comando requerido' },
        { status: 400 }
      )
    }

    // Validar comando por seguridad
    const cmdParts = command.trim().split(' ')
    const baseCmd = cmdParts[0]

    if (!ALLOWED_COMMANDS.includes(baseCmd)) {
      return NextResponse.json(
        { 
          error: 'Comando no permitido',
          allowedCommands: ALLOWED_COMMANDS 
        },
        { status: 403 }
      )
    }

    // Ejecutar comando
    return new Promise((resolve) => {
      const proc = spawn('bash', ['-c', command], {
        cwd: cwd || process.cwd(),
        env: process.env,
        timeout: 30000 // 30 segundos máximo
      })

      let stdout = ''
      let stderr = ''

      proc.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      proc.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      proc.on('error', (error) => {
        resolve(NextResponse.json({
          success: false,
          error: error.message,
          output: stdout,
          stderr
        }, { status: 500 }))
      })

      proc.on('close', (exitCode) => {
        resolve(NextResponse.json({
          success: exitCode === 0,
          output: stdout,
          error: stderr,
          exitCode,
          command
        }))
      })

      // Timeout de seguridad
      setTimeout(() => {
        proc.kill()
        resolve(NextResponse.json({
          success: false,
          error: 'Comando excedió el tiempo límite (30s)',
          output: stdout,
          stderr
        }, { status: 408 }))
      }, 31000)
    })

  } catch (error: any) {
    console.error('Terminal execute error:', error)
    return NextResponse.json(
      { error: 'Error al ejecutar comando', details: error.message },
      { status: 500 }
    )
  }
}
