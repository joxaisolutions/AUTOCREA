import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { platform, token, username } = await request.json()

    if (!platform || !token) {
      return NextResponse.json(
        { error: 'Plataforma y token son requeridos' },
        { status: 400 }
      )
    }

    // Validar plataforma
    if (!['github', 'gitlab'].includes(platform)) {
      return NextResponse.json(
        { error: 'Plataforma no soportada. Usa "github" o "gitlab"' },
        { status: 400 }
      )
    }

    // TODO: Aquí guardarías el token de forma segura en tu base de datos
    // Por ahora, solo validamos que el token funcione
    
    if (platform === 'github') {
      const { Octokit } = await import('@octokit/rest')
      const octokit = new Octokit({ auth: token })
      
      try {
        const { data: user } = await octokit.users.getAuthenticated()
        
        return NextResponse.json({
          success: true,
          platform: 'github',
          username: user.login,
          name: user.name,
          avatar: user.avatar_url,
          repos: user.public_repos,
          message: 'Conexión exitosa con GitHub'
        })
      } catch (error: any) {
        return NextResponse.json(
          { error: 'Token de GitHub inválido', details: error.message },
          { status: 401 }
        )
      }
    } else if (platform === 'gitlab') {
      // GitLab API
      try {
        const response = await fetch('https://gitlab.com/api/v4/user', {
          headers: {
            'PRIVATE-TOKEN': token
          }
        })

        if (!response.ok) {
          throw new Error('Token inválido')
        }

        const user = await response.json()

        return NextResponse.json({
          success: true,
          platform: 'gitlab',
          username: user.username,
          name: user.name,
          avatar: user.avatar_url,
          message: 'Conexión exitosa con GitLab'
        })
      } catch (error: any) {
        return NextResponse.json(
          { error: 'Token de GitLab inválido', details: error.message },
          { status: 401 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Error desconocido' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Repository connect error:', error)
    return NextResponse.json(
      { error: 'Error al conectar repositorio' },
      { status: 500 }
    )
  }
}
