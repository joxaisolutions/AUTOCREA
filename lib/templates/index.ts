import type { CodeTemplate, TemplateCategory } from './types'

// Frontend templates
import { nextjsAppTemplate } from './frontend/nextjs-app'
import { reactViteTemplate } from './frontend/react-vite'

// Backend templates
import { expressApiTemplate } from './backend/express-api'
import { flaskApiTemplate } from './backend/flask-api'

export const allTemplates: CodeTemplate[] = [
  nextjsAppTemplate,
  reactViteTemplate,
  expressApiTemplate,
  flaskApiTemplate,
]

export const templateCategories: TemplateCategory[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack',
    description: 'Aplicaciones completas con frontend y backend',
    icon: '🚀',
    templates: allTemplates.filter(t => t.category === 'fullstack')
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Aplicaciones de interfaz de usuario',
    icon: '🎨',
    templates: allTemplates.filter(t => t.category === 'frontend')
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'APIs y servicios del lado del servidor',
    icon: '⚙️',
    templates: allTemplates.filter(t => t.category === 'backend')
  },
  {
    id: 'mobile',
    name: 'Mobile',
    description: 'Aplicaciones móviles nativas y cross-platform',
    icon: '📱',
    templates: allTemplates.filter(t => t.category === 'mobile')
  },
  {
    id: 'ai-ml',
    name: 'AI & ML',
    description: 'Machine Learning y proyectos de IA',
    icon: '🤖',
    templates: allTemplates.filter(t => t.category === 'ai-ml')
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    description: 'Smart contracts y aplicaciones Web3',
    icon: '⛓️',
    templates: allTemplates.filter(t => t.category === 'blockchain')
  },
  {
    id: 'data',
    name: 'Data Engineering',
    description: 'Pipelines de datos y ETL',
    icon: '📊',
    templates: allTemplates.filter(t => t.category === 'data')
  }
]

export function getTemplateById(id: string): CodeTemplate | undefined {
  return allTemplates.find(template => template.id === id)
}

export function getTemplatesByCategory(category: string): CodeTemplate[] {
  return allTemplates.filter(template => template.category === category)
}

export function getTemplatesByFramework(framework: string): CodeTemplate[] {
  return allTemplates.filter(template => 
    template.framework.toLowerCase() === framework.toLowerCase()
  )
}

export function getTemplatesByLanguage(language: string): CodeTemplate[] {
  return allTemplates.filter(template => 
    template.language.toLowerCase() === language.toLowerCase()
  )
}

export function searchTemplates(query: string): CodeTemplate[] {
  const lowerQuery = query.toLowerCase()
  return allTemplates.filter(template => 
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.framework.toLowerCase().includes(lowerQuery) ||
    template.language.toLowerCase().includes(lowerQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
