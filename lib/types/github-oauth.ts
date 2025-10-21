export interface GitHubAccount {
  provider: 'github'
  providerAccountId: string
  access_token: string
  token_type: string
  scope: string
}

export interface GitHubUser {
  id: number
  login: string
  name: string
  email: string
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

export interface GitHubConnectionStatus {
  connected: boolean
  account: GitHubAccount | null
  user: GitHubUser | null
}
