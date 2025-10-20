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

    const { 
      platform, 
      token, 
      owner, 
      repo, 
      title,
      body,
      head, // Branch de origen
      base = 'main' // Branch de destino
    } = await request.json()

    if (!platform || !token || !owner || !repo || !title || !head) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      )
    }

    if (platform === 'github') {
      const { Octokit } = await import('@octokit/rest')
      const octokit = new Octokit({ auth: token })

      try {
        const { data: pr } = await octokit.pulls.create({
          owner,
          repo,
          title,
          body: body || `🤖 Pull request generado automáticamente por AUTOCREA\n\n${title}`,
          head,
          base
        })

        return NextResponse.json({
          success: true,
          prNumber: pr.number,
          prUrl: pr.html_url,
          state: pr.state,
          message: 'Pull request creado exitosamente'
        })

      } catch (error: any) {
        console.error('GitHub PR error:', error)
        return NextResponse.json(
          { error: 'Error al crear pull request en GitHub', details: error.message },
          { status: 500 }
        )
      }
    } else if (platform === 'gitlab') {
      try {
        const response = await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(owner + '/' + repo)}/merge_requests`, {
          method: 'POST',
          headers: {
            'PRIVATE-TOKEN': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            source_branch: head,
            target_branch: base,
            title,
            description: body || `🤖 Merge request generado automáticamente por AUTOCREA\n\n${title}`
          })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Error al crear merge request')
        }

        const mr = await response.json()

        return NextResponse.json({
          success: true,
          prNumber: mr.iid,
          prUrl: mr.web_url,
          state: mr.state,
          message: 'Merge request creado exitosamente'
        })

      } catch (error: any) {
        console.error('GitLab MR error:', error)
        return NextResponse.json(
          { error: 'Error al crear merge request en GitLab', details: error.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Plataforma no soportada' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Pull request error:', error)
    return NextResponse.json(
      { error: 'Error al crear pull request' },
      { status: 500 }
    )
  }
}
