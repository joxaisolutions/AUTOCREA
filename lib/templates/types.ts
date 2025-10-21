export interface TemplateFile {
  path: string
  content: string
  language: string
}

export interface CodeTemplate {
  id: string
  name: string
  description: string
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'ai-ml' | 'blockchain' | 'data'
  framework: string
  language: string
  icon: string
  tags: string[]
  complexity: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  files: TemplateFile[]
  dependencies: string[]
  scripts: Record<string, string>
  envVariables?: string[]
  setupInstructions: string[]
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: string
  templates: CodeTemplate[]
}
