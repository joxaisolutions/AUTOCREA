import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    
    const githubAccount = user.externalAccounts.find(
      (account) => account.provider === 'github'
    )
    
    if (!githubAccount) {
      return NextResponse.json({ error: 'GitHub no conectado' }, { status: 404 })
    }

    const token = githubAccount.publicMetadata?.oauth_access_token as string
    
    if (!token) {
      return NextResponse.json({ error: 'Token no disponible' }, { status: 404 })
    }

    return NextResponse.json({ 
      access_token: token,
      provider: 'github',
      scope: 'user,repo'
    })
  } catch (error: any) {
    console.error('Error getting GitHub token:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
