'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Tablet, RotateCcw, ExternalLink, Share2, RotateCw } from 'lucide-react'

type ViewMode = 'desktop' | 'tablet' | 'mobile'
type Orientation = 'portrait' | 'landscape'

export default function PreviewPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop')
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [previewUrl, setPreviewUrl] = useState(
    typeof window !== 'undefined' ? window.location.origin : ''
  )
  const [scale, setScale] = useState(1)

  const getViewportSize = () => {
    if (viewMode === 'desktop') {
      return { width: '100%', height: '100%', maxWidth: '100%' }
    }
    
    const sizes = {
      tablet: orientation === 'portrait' ? { width: 768, height: 1024 } : { width: 1024, height: 768 },
      mobile: orientation === 'portrait' ? { width: 375, height: 667 } : { width: 667, height: 375 },
    }
    
    const { width, height } = sizes[viewMode]
    return { 
      width: `${width}px`, 
      height: `${height}px`,
      maxWidth: width,
    }
  }

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')
  }

  const viewportStyle = getViewportSize()

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Preview App
          </h1>
          <p className="text-slate-400">
            Visualiza tu aplicación en tiempo real mientras desarrollas
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700"
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Recargar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-600"
            onClick={() => window.open(previewUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Abrir en Nueva Pestaña
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className={viewMode === 'desktop' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-slate-700'}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tablet')}
                className={viewMode === 'tablet' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-slate-700'}
              >
                <Tablet className="w-4 h-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className={viewMode === 'mobile' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-slate-700'}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>

              {viewMode !== 'desktop' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleOrientation}
                  className="border-slate-700 ml-2"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  {orientation === 'portrait' ? 'Portrait' : 'Landscape'}
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                placeholder="URL de la aplicación"
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none w-64"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Frame */}
      <Card className="flex-1 bg-slate-900/50 border-slate-800 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Vista Previa en Vivo</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-slate-400">Conectado</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 min-h-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-6 overflow-auto">
          <div 
            className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 flex-shrink-0"
            style={{
              width: viewportStyle.width,
              height: viewportStyle.height,
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <div className="relative w-full h-full">
              {/* Device frame for mobile/tablet */}
              {viewMode !== 'desktop' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Notch for mobile in portrait */}
                  {viewMode === 'mobile' && orientation === 'portrait' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />
                  )}
                </div>
              )}
              
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="App Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Panel */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-sm">Información del Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs mb-1">Modo Actual</p>
              <p className="font-medium text-slate-200 capitalize">{viewMode}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Resolución</p>
              <p className="font-medium text-slate-200">
                {viewMode === 'desktop' && 'Responsive'}
                {viewMode === 'tablet' && orientation === 'portrait' && '768 × 1024'}
                {viewMode === 'tablet' && orientation === 'landscape' && '1024 × 768'}
                {viewMode === 'mobile' && orientation === 'portrait' && '375 × 667'}
                {viewMode === 'mobile' && orientation === 'landscape' && '667 × 375'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Orientación</p>
              <p className="font-medium text-slate-200 capitalize">
                {viewMode === 'desktop' ? 'N/A' : orientation}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Hot Reload</p>
              <p className="font-medium text-green-400">Activo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
