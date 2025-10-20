// Utilidades para manejo de archivos

export interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  language?: string
  children?: FileItem[]
}

export function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
    'php': 'php',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sql': 'sql',
    'sh': 'shell',
    'bash': 'shell',
    'dockerfile': 'dockerfile',
  }

  return languageMap[ext || ''] || 'plaintext'
}

export function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  const iconMap: Record<string, string> = {
    'js': '📜',
    'jsx': '⚛️',
    'ts': '📘',
    'tsx': '⚛️',
    'py': '🐍',
    'rb': '💎',
    'go': '🔷',
    'rs': '⚙️',
    'java': '☕',
    'html': '🌐',
    'css': '🎨',
    'json': '📋',
    'md': '📝',
    'txt': '📄',
    'yml': '⚙️',
    'yaml': '⚙️',
    'sql': '🗄️',
    'sh': '💻',
    'dockerfile': '🐳',
  }

  return iconMap[ext || ''] || '📄'
}

export function generateProjectStructure(files: FileItem[]): string {
  function buildTree(items: FileItem[], prefix: string = ''): string {
    let result = ''
    
    items.forEach((item, index) => {
      const isLast = index === items.length - 1
      const connector = isLast ? '└── ' : '├── '
      const newPrefix = isLast ? '    ' : '│   '
      
      result += prefix + connector + item.name + '\n'
      
      if (item.type === 'folder' && item.children) {
        result += buildTree(item.children, prefix + newPrefix)
      }
    })
    
    return result
  }

  return '.\n' + buildTree(files)
}

export function flattenFileTree(files: FileItem[]): FileItem[] {
  const flat: FileItem[] = []
  
  function traverse(items: FileItem[]) {
    items.forEach(item => {
      if (item.type === 'file') {
        flat.push(item)
      }
      if (item.children) {
        traverse(item.children)
      }
    })
  }
  
  traverse(files)
  return flat
}

export function createFileTree(files: Array<{ name: string; content: string }>): FileItem[] {
  const tree: FileItem[] = []
  const folderMap = new Map<string, FileItem>()

  files.forEach((file, index) => {
    const parts = file.name.split('/')
    let currentPath = ''

    // Crear folders si no existen
    for (let i = 0; i < parts.length - 1; i++) {
      const folderName = parts[i]
      currentPath += (currentPath ? '/' : '') + folderName

      if (!folderMap.has(currentPath)) {
        const folder: FileItem = {
          id: `folder-${currentPath}`,
          name: folderName,
          type: 'folder',
          children: []
        }
        folderMap.set(currentPath, folder)

        if (i === 0) {
          tree.push(folder)
        } else {
          const parentPath = currentPath.split('/').slice(0, -1).join('/')
          const parent = folderMap.get(parentPath)
          if (parent && parent.children) {
            parent.children.push(folder)
          }
        }
      }
    }

    // Crear archivo
    const fileItem: FileItem = {
      id: `file-${index}`,
      name: parts[parts.length - 1],
      type: 'file',
      content: file.content,
      language: detectLanguage(file.name)
    }

    if (parts.length === 1) {
      tree.push(fileItem)
    } else {
      const parentPath = parts.slice(0, -1).join('/')
      const parent = folderMap.get(parentPath)
      if (parent && parent.children) {
        parent.children.push(fileItem)
      }
    }
  })

  return tree
}
