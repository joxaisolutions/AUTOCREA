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
      branch = 'main',
      files, 
      message 
    } = await request.json()

    if (!platform || !token || !owner || !repo || !files || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      )
    }

    if (platform === 'github') {
      const { Octokit } = await import('@octokit/rest')
      const octokit = new Octokit({ auth: token })

      try {
        // Obtener el último commit de la rama
        const { data: refData } = await octokit.git.getRef({
          owner,
          repo,
          ref: `heads/${branch}`
        })

        const commitSha = refData.object.sha

        // Obtener el árbol base
        const { data: commitData } = await octokit.git.getCommit({
          owner,
          repo,
          commit_sha: commitSha
        })

        const baseTreeSha = commitData.tree.sha

        // Crear blobs para cada archivo
        const fileBlobs = await Promise.all(
          files.map(async (file: { path: string; content: string }) => {
            const { data: blob } = await octokit.git.createBlob({
              owner,
              repo,
              content: Buffer.from(file.content).toString('base64'),
              encoding: 'base64'
            })

            return {
              path: file.path,
              mode: '100644' as const,
              type: 'blob' as const,
              sha: blob.sha
            }
          })
        )

        // Crear nuevo árbol
        const { data: newTree } = await octokit.git.createTree({
          owner,
          repo,
          base_tree: baseTreeSha,
          tree: fileBlobs
        })

        // Crear commit
        const { data: newCommit } = await octokit.git.createCommit({
          owner,
          repo,
          message,
          tree: newTree.sha,
          parents: [commitSha]
        })

        // Actualizar referencia
        await octokit.git.updateRef({
          owner,
          repo,
          ref: `heads/${branch}`,
          sha: newCommit.sha
        })

        return NextResponse.json({
          success: true,
          commitSha: newCommit.sha,
          commitUrl: newCommit.html_url,
          message: 'Commit creado exitosamente',
          filesCommitted: files.length
        })

      } catch (error: any) {
        console.error('GitHub commit error:', error)
        return NextResponse.json(
          { error: 'Error al crear commit en GitHub', details: error.message },
          { status: 500 }
        )
      }
    } else if (platform === 'gitlab') {
      try {
        // GitLab permite commits múltiples en una sola acción
        const actions = files.map((file: { path: string; content: string }) => ({
          action: 'create',
          file_path: file.path,
          content: file.content
        }))

        const response = await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(owner + '/' + repo)}/repository/commits`, {
          method: 'POST',
          headers: {
            'PRIVATE-TOKEN': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            branch,
            commit_message: message,
            actions
          })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Error al crear commit')
        }

        const commit = await response.json()

        return NextResponse.json({
          success: true,
          commitSha: commit.id,
          commitUrl: commit.web_url,
          message: 'Commit creado exitosamente',
          filesCommitted: files.length
        })

      } catch (error: any) {
        console.error('GitLab commit error:', error)
        return NextResponse.json(
          { error: 'Error al crear commit en GitLab', details: error.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Plataforma no soportada' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Commit error:', error)
    return NextResponse.json(
      { error: 'Error al crear commit' },
      { status: 500 }
    )
  }
}
