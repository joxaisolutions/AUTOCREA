export const siteConfig = {
  name: "AUTOCREA",
  fullName: "AUTOCREA V2.0",
  description: "De idea a la materialización - Plataforma de desarrollo autónomo con JoxCoder AI",
  tagline: "De idea a la materialización",
  url: "https://autocrea.joxai.org",
  company: "JoxAI",
  companyUrl: "https://joxai.org",
  
  links: {
    github: "https://github.com/joxai",
    twitter: "https://twitter.com/joxai",
    linkedin: "https://linkedin.com/company/joxai",
  },
  
  features: {
    maxProjectsPerUser: 100,
    defaultTokenAllowance: 100,
    supportedLanguages: [
      'typescript',
      'javascript', 
      'python',
      'css',
      'html',
      'json',
      'markdown'
    ],
  },
  
  branding: {
    poweredBy: "Powered by JoxAI",
    logoGradient: "from-cyan-400 to-blue-500",
    primaryGradient: "from-cyan-400 via-blue-500 to-purple-600",
    backgroundGradient: "from-slate-950 via-slate-900 to-slate-950",
  }
} as const;

export type SiteConfig = typeof siteConfig;
