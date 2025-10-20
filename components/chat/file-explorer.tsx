'use client'

import { useState } from 'react'
import { FileCode, Folder, FolderOpen, ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  content?: string
  language?: string
}

interface FileExplorerProps {
  files: FileNode[]
  onFileSelect?: (file: FileNode) => void
  selectedFile?: string
}

export function FileExplorer({ files, onFileSelect, selectedFile }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']))

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedFolders(newExpanded)
  }

  const FileIcon = ({ type, name }: { type: string; name: string }) => {
    const ext = name.split('.').pop()?.toLowerCase()
    const colors: Record<string, string> = {
      ts: 'text-blue-400',
      tsx: 'text-blue-400',
      js: 'text-yellow-400',
      jsx: 'text-yellow-400',
      css: 'text-purple-400',
      html: 'text-orange-400',
      json: 'text-green-400',
      md: 'text-slate-400',
    }
    
    return (
      <FileCode className={`w-4 h-4 ${colors[ext || ''] || 'text-cyan-400'}`} />
    )
  }

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.id)
    const isSelected = selectedFile === node.id
    
    return (
      <div key={node.id}>
        <div
          className={`
            flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-slate-800/50 rounded
            ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-300'}
          `}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id)
            } else {
              onFileSelect?.(node)
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-500" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-yellow-500" />
              ) : (
                <Folder className="w-4 h-4 text-yellow-500" />
              )}
            </>
          ) : (
            <>
              <span className="w-4" />
              <FileIcon type={node.type} name={node.name} />
            </>
          )}
          <span className="text-sm font-medium flex-1">{node.name}</span>
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/50 border-r border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-800">
        <span className="text-sm font-semibold text-slate-300">Archivos</span>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-7 w-7 p-0 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4 text-slate-400" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-7 w-7 p-0 hover:bg-slate-800"
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto p-2">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <FileCode className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-sm text-slate-500 mb-1">
              No hay archivos
            </p>
            <p className="text-xs text-slate-600">
              Los archivos generados aparecerán aquí
            </p>
          </div>
        ) : (
          files.map(node => renderNode(node))
        )}
      </div>

      {/* Stats */}
      <div className="p-3 border-t border-slate-800 text-xs text-slate-500">
        {files.length} {files.length === 1 ? 'archivo' : 'archivos'}
      </div>
    </div>
  )
}
