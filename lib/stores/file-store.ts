import { create } from 'zustand'

export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  content?: string
  language?: string
  generatedBy?: string // Role que lo generó
  timestamp?: number
}

interface FileStore {
  files: FileNode[]
  selectedFileId: string | null
  addFile: (file: Omit<FileNode, 'id'>) => void
  updateFile: (id: string, content: string) => void
  deleteFile: (id: string) => void
  selectFile: (id: string | null) => void
  getSelectedFile: () => FileNode | null
  clearFiles: () => void
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  selectedFileId: null,

  addFile: (fileData) => {
    const newFile: FileNode = {
      ...fileData,
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    }
    
    set((state) => ({
      files: [...state.files, newFile],
      selectedFileId: newFile.id,
    }))
  },

  updateFile: (id, content) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, content } : file
      ),
    }))
  },

  deleteFile: (id) => {
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
      selectedFileId: state.selectedFileId === id ? null : state.selectedFileId,
    }))
  },

  selectFile: (id) => {
    set({ selectedFileId: id })
  },

  getSelectedFile: () => {
    const { files, selectedFileId } = get()
    return files.find((f) => f.id === selectedFileId) || null
  },

  clearFiles: () => {
    set({ files: [], selectedFileId: null })
  },
}))
