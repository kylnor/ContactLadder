'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Eye, Code } from 'lucide-react'

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview' | 'live'>('live')

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 bg-gray-50 border-b border-gray-300 px-3 py-2">
        <button
          type="button"
          onClick={() => setPreviewMode('edit')}
          className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
            previewMode === 'edit'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Code className="h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => setPreviewMode('live')}
          className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
            previewMode === 'live'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Split
        </button>
        <button
          type="button"
          onClick={() => setPreviewMode('preview')}
          className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
            previewMode === 'preview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>

        <div className="ml-auto text-xs text-gray-500">
          Supports markdown formatting
        </div>
      </div>

      {/* Editor */}
      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || '')}
          preview={previewMode}
          height={500}
          textareaProps={{
            placeholder: placeholder || 'Write your markdown content here...\n\n# Headings\n**Bold** and *italic* text\n- Lists\n- Are easy',
          }}
          style={{
            border: 'none',
          }}
        />
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border-t border-blue-100 px-3 py-2 text-xs text-blue-800">
        <p className="font-medium mb-1">💡 Markdown Tips:</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span># Heading 1, ## Heading 2</span>
          <span>**bold**, *italic*</span>
          <span>- Bullet list, 1. Numbered list</span>
          <span>[Link text](url)</span>
          <span>`code`, ```code block```</span>
          <span>[Name], [GCI Goal] for personalization</span>
        </div>
      </div>
    </div>
  )
}
