'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X } from 'lucide-react'

interface Module {
  id: string
  slug: string
  title: string
  category: string
}

interface PrerequisiteSelectorProps {
  selectedSlugs: string[]
  onChange: (slugs: string[]) => void
  currentModuleSlug?: string
}

export function PrerequisiteSelector({
  selectedSlugs,
  onChange,
  currentModuleSlug
}: PrerequisiteSelectorProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadModules()
  }, [])

  const loadModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('id, slug, title, category')
        .eq('is_published', true)
        .order('category')
        .order('order_index')

      if (error) throw error

      // Filter out current module if editing
      const filtered = currentModuleSlug
        ? data?.filter(m => m.slug !== currentModuleSlug) || []
        : data || []

      setModules(filtered)
    } catch (err) {
      console.error('Error loading modules:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      onChange(selectedSlugs.filter(s => s !== slug))
    } else {
      onChange([...selectedSlugs, slug])
    }
  }

  const handleRemove = (slug: string) => {
    onChange(selectedSlugs.filter(s => s !== slug))
  }

  const selectedModules = modules.filter(m => selectedSlugs.includes(m.slug))
  const availableModules = modules.filter(m => !selectedSlugs.includes(m.slug))

  // Group by category
  const groupedModules = availableModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = []
    }
    acc[module.category].push(module)
    return acc
  }, {} as Record<string, Module[]>)

  const categoryLabels: Record<string, string> = {
    'essentials': 'Essentials',
    'deep-dive': 'Deep Dives',
    'mini-guide': 'Mini Guides'
  }

  if (loading) {
    return (
      <div className="text-sm text-gray-500">Loading modules...</div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Selected Prerequisites */}
      {selectedModules.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedModules.map(module => (
            <div
              key={module.slug}
              className="inline-flex items-center gap-1 rounded-full bg-[#2c66e2] px-3 py-1 text-sm text-white"
            >
              <span>{module.title}</span>
              <button
                type="button"
                onClick={() => handleRemove(module.slug)}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Available Modules Dropdown */}
      <details className="group">
        <summary className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <span className="font-medium">
            {selectedModules.length === 0
              ? 'Select prerequisites...'
              : `Add more prerequisites (${selectedModules.length} selected)`}
          </span>
        </summary>

        <div className="mt-2 max-h-64 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {availableModules.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No more modules available
            </div>
          ) : (
            Object.entries(groupedModules).map(([category, mods]) => (
              <div key={category} className="border-b border-gray-100 last:border-0">
                <div className="bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {categoryLabels[category] || category}
                </div>
                <div>
                  {mods.map(module => (
                    <button
                      key={module.slug}
                      type="button"
                      onClick={() => handleToggle(module.slug)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      {module.title}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </details>

      <p className="text-xs text-gray-500">
        Select which modules students must complete before accessing this module
      </p>
    </div>
  )
}
