import { NextResponse } from 'next/server'
import { allTemplates, templateCategories } from '@/lib/templates'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const framework = searchParams.get('framework')
  const language = searchParams.get('language')

  let filteredTemplates = allTemplates

  if (category) {
    filteredTemplates = filteredTemplates.filter(t => t.category === category)
  }

  if (framework) {
    filteredTemplates = filteredTemplates.filter(t => 
      t.framework.toLowerCase() === framework.toLowerCase()
    )
  }

  if (language) {
    filteredTemplates = filteredTemplates.filter(t => 
      t.language.toLowerCase() === language.toLowerCase()
    )
  }

  return NextResponse.json({
    templates: filteredTemplates,
    categories: templateCategories,
    total: filteredTemplates.length
  })
}
