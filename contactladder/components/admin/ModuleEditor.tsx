'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { VideoManager } from '@/components/admin/VideoManager'
import { MarkdownEditor } from '@/components/admin/MarkdownEditor'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { InlineImageUpload } from '@/components/admin/InlineImageUpload'
import { PrerequisiteSelector } from '@/components/admin/PrerequisiteSelector'
import { Save, X } from 'lucide-react'

interface ModuleFormData {
  title: string
  slug: string
  category: 'essentials' | 'deep-dive' | 'mini-guide'
  order_index: number
  description: string
  estimated_duration: number
  prerequisites: string[]
  video_urls: string
  header_image: string
  content: string
  is_published: boolean
}

interface ModuleEditorProps {
  moduleId?: string
  initialData?: Partial<ModuleFormData>
}

export function ModuleEditor({ moduleId, initialData }: ModuleEditorProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Parse initial video URLs from JSON string to array
  const parseInitialVideos = (videoUrlsJson: string | undefined) => {
    if (!videoUrlsJson) return []
    try {
      const parsed = JSON.parse(videoUrlsJson)
      return Object.entries(parsed).map(([key, url]) => ({ key, url: url as string }))
    } catch {
      return []
    }
  }

  const [videos, setVideos] = useState<Array<{ key: string; url: string }>>(
    parseInitialVideos(initialData?.video_urls)
  )

  const parsePrerequisites = (prereqs: any): string[] => {
    if (!prereqs) return []
    if (Array.isArray(prereqs)) return prereqs
    if (typeof prereqs === 'string') {
      return prereqs.split(',').map(p => p.trim()).filter(Boolean)
    }
    return []
  }

  const [formData, setFormData] = useState<ModuleFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'essentials',
    order_index: initialData?.order_index || 1,
    description: initialData?.description || '',
    estimated_duration: initialData?.estimated_duration || 30,
    prerequisites: parsePrerequisites(initialData?.prerequisites),
    video_urls: initialData?.video_urls || '{}',
    header_image: initialData?.header_image || '',
    content: initialData?.content || '',
    is_published: initialData?.is_published || false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked :
        type === 'number' ? parseInt(value) || 0 :
        value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug must only contain lowercase letters, numbers, and hyphens'
    }

    if (formData.estimated_duration <= 0) {
      newErrors.estimated_duration = 'Duration must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSaving(true)

    try {
      // Convert videos array to JSON object
      const video_urls = videos.reduce((acc, video) => {
        if (video.key && video.url) {
          acc[video.key] = video.url
        }
        return acc
      }, {} as Record<string, string>)

      const payload = {
        ...formData,
        video_urls,
      }

      const url = moduleId
        ? `/api/admin/modules/${moduleId}`
        : '/api/admin/modules'

      const method = moduleId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save module')
      }

      // Redirect to admin dashboard
      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('Error saving module:', error)
      alert(error instanceof Error ? error.message : 'Failed to save module')
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]`}
          placeholder="Getting Started with Cloze"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.slug ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]`}
          placeholder="getting-started"
          pattern="[a-z0-9-]+"
        />
        {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
        <p className="mt-1 text-xs text-gray-500">
          URL-friendly identifier (lowercase letters, numbers, hyphens only)
        </p>
      </div>

      {/* Category & Order */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]"
          >
            <option value="essentials">Essentials</option>
            <option value="deep-dive">Deep Dive</option>
            <option value="mini-guide">Mini Guide</option>
          </select>
        </div>

        <div>
          <label htmlFor="order_index" className="block text-sm font-medium text-gray-700">
            Order Index
          </label>
          <input
            type="number"
            id="order_index"
            name="order_index"
            value={formData.order_index}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]"
          placeholder="Brief description of what this module covers"
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="estimated_duration" className="block text-sm font-medium text-gray-700">
          Estimated Duration (minutes) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="estimated_duration"
          name="estimated_duration"
          value={formData.estimated_duration}
          onChange={handleChange}
          min="1"
          className={`mt-1 block w-full rounded-md border ${
            errors.estimated_duration ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 text-gray-900 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]`}
        />
        {errors.estimated_duration && (
          <p className="mt-1 text-sm text-red-500">{errors.estimated_duration}</p>
        )}
      </div>

      {/* Header Image */}
      <div>
        <ImageUpload
          value={formData.header_image}
          onChange={(url) => setFormData((prev) => ({ ...prev, header_image: url }))}
          label="Header Image (Optional)"
          aspectRatio="wide"
        />
        <p className="mt-2 text-xs text-gray-500">
          Wide banner image displayed at the top of the module (recommended: 1200x400px)
        </p>
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prerequisites
        </label>
        <PrerequisiteSelector
          selectedSlugs={formData.prerequisites}
          onChange={(slugs) => setFormData((prev) => ({ ...prev, prerequisites: slugs }))}
          currentModuleSlug={formData.slug}
        />
      </div>

      {/* Videos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Videos
        </label>
        <VideoManager
          videos={videos}
          onChange={(newVideos) => setVideos(newVideos)}
        />
      </div>

      {/* Inline Image Upload Helper */}
      <div>
        <InlineImageUpload />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
          placeholder="# Module Title

## Welcome, [Name]!

Your markdown content here...

**Tip:** You can paste markdown content and it will be formatted automatically!"
        />
      </div>

      {/* Published */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          checked={formData.is_published}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-[#2c66e2] focus:ring-[#2c66e2]"
        />
        <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
          Published (visible to students)
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 border-t pt-6">
        <Button type="submit" disabled={isSaving} size="lg">
          <Save className="mr-2 h-5 w-5" />
          {isSaving ? 'Saving...' : moduleId ? 'Update Module' : 'Create Module'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin')}
          disabled={isSaving}
          size="lg"
        >
          <X className="mr-2 h-5 w-5" />
          Cancel
        </Button>
      </div>
    </form>
  )
}
