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

    if (platform === 'github') {
      const { Octokit } = await import('@octokit/rest')
      const octokit = new Octokit({ auth: token })
      
      try {
        const { data: repos } = await octokit.repos.listForAuthenticatedUser({
          sort: 'updated',
          per_page: 50
        })

        const formattedRepos = repos.map((repo) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          private: repo.private,
          url: repo.html_url,
          defaultBranch: repo.default_branch,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at
        }))

        return NextResponse.json({
          success: true,
          repos: formattedRepos,
          total: repos.length
        })
      } catch (error: any) {
        return NextResponse.json(
          { error: 'Error al obtener repositorios', details: error.message },
          { status: 500 }
        )
      }
    } else if (platform === 'gitlab') {
      try {
        const response = await fetch('https://gitlab.com/api/v4/projects?membership=true&per_page=50', {
          headers: {
            'PRIVATE-TOKEN': token
          }
        })

        if (!response.ok) {
          throw new Error('Error al obtener repositorios')
        }

        const repos = await response.json()

        const formattedRepos = repos.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.path_with_namespace,
          description: repo.description,
          private: repo.visibility === 'private',
          url: repo.web_url,
          defaultBranch: repo.default_branch,
          language: null, // GitLab no expone esto en el mismo formato
          stars: repo.star_count,
          forks: repo.forks_count,
          updatedAt: repo.last_activity_at
        }))

        return NextResponse.json({
          success: true,
          repos: formattedRepos,
          total: repos.length
        })
      } catch (error: any) {
        return NextResponse.json(
          { error: 'Error al obtener repositorios de GitLab', details: error.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Plataforma no soportada' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Repository list error:', error)
    return NextResponse.json(
      { error: 'Error al listar repositorios' },
      { status: 500 }
    )
  }
}
