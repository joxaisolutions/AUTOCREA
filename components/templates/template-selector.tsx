'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code2, Sparkles, Search, X, Check } from 'lucide-react'
import { useFileStore } from '@/lib/stores/file-store'
import type { CodeTemplate, TemplateCategory } from '@/lib/templates/types'

export default function TemplateSelector() {
  const [templates, setTemplates] = useState<CodeTemplate[]>([])
  const [categories, setCategories] = useState<TemplateCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSelector, setShowSelector] = useState(false)
  const { addFile, clearFiles } = useFileStore()

  useEffect(() => {
    loadTemplates()
  }, [selectedCategory])

  const loadTemplates = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }

      const response = await fetch(`/api/templates/list?${params}`)
      const data = await response.json()

      setTemplates(data.templates)
      setCategories(data.categories)
    } catch (error) {
      console.error('Error loading templates:', error)
    }
  }

  const applyTemplate = async (template: CodeTemplate) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/templates/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: template.id })
      })

      const data = await response.json()

      if (data.success) {
        clearFiles()
        
        data.template.files.forEach((file: any) => {
          addFile({
            name: file.path,
            type: 'file',
            content: file.content,
            language: file.language,
            generatedBy: 'Arquitecto'
          })
        })

        setShowSelector(false)
        alert(`✅ Template "${template.name}" aplicado exitosamente!\n\n${template.files.length} archivos creados.`)
      }
    } catch (error) {
      console.error('Error applying template:', error)
      alert('Error al aplicar template')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.framework.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (!showSelector) {
    return (
      <Button
        onClick={() => setShowSelector(true)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Usar Template
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Templates de Código
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Inicia tu proyecto con templates profesionales pre-configurados
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSelector(false)}
              className="hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar templates por nombre, framework o tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 py-4 border-b border-slate-800 overflow-x-auto">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-purple-500/20 border-purple-500' : 'border-slate-700'}
            >
              Todos ({templates.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'bg-purple-500/20 border-purple-500' : 'border-slate-700'}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="text-3xl">{template.icon}</div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      template.complexity === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      template.complexity === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {template.complexity}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {template.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div>
                      <span className="font-semibold text-slate-300">Framework:</span> {template.framework}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-300">Lenguaje:</span> {template.language}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-300">Archivos:</span> {template.files.length}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-300">Tiempo:</span> {template.estimatedTime}
                    </div>
                  </div>

                  <Button
                    onClick={() => applyTemplate(template)}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Usar Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <Code2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No se encontraron templates</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
