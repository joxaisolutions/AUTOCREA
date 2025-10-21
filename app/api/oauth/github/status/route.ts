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
      return NextResponse.json({
        connected: false,
        account: null,
        user: null
      })
    }

    let githubUser = null
    if (githubAccount.publicMetadata) {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${githubAccount.publicMetadata.oauth_access_token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      
      if (response.ok) {
        githubUser = await response.json()
      }
    }

    return NextResponse.json({
      connected: true,
      account: {
        provider: 'github',
        providerAccountId: githubAccount.externalId,
        access_token: githubAccount.publicMetadata?.oauth_access_token as string || '',
        token_type: 'bearer',
        scope: 'user,repo'
      },
      user: githubUser
    })
  } catch (error: any) {
    console.error('Error checking GitHub connection:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
