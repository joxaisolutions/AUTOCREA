import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getTemplateById } from '@/lib/templates'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { templateId } = await request.json()

    if (!templateId) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 })
    }

    const template = getTemplateById(templateId)

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      template,
      message: `Template "${template.name}" aplicado exitosamente`
    })
  } catch (error: any) {
    console.error('Error applying template:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
