'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Video {
  key: string
  url: string
}

interface VideoManagerProps {
  videos: Video[]
  onChange: (videos: Video[]) => void
}

/**
 * Extract video ID from YouTube or Vimeo URL
 */
function parseVideoUrl(url: string): string | null {
  if (!url) return null

  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Just the ID
  ]

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern)
    if (match) {
      return `youtube:${match[1]}`
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /^(\d{8,})$/, // Just the ID
  ]

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern)
    if (match) {
      return `vimeo:${match[1]}`
    }
  }

  return null
}

export function VideoManager({ videos, onChange }: VideoManagerProps) {
  const [editingVideos, setEditingVideos] = useState<Video[]>(
    videos.length > 0 ? videos : [{ key: '', url: '' }]
  )

  const handleAddVideo = () => {
    const newVideos = [...editingVideos, { key: '', url: '' }]
    setEditingVideos(newVideos)
  }

  const handleRemoveVideo = (index: number) => {
    const newVideos = editingVideos.filter((_, i) => i !== index)
    setEditingVideos(newVideos)

    // Update parent with valid videos
    const validVideos = newVideos.filter(v => v.key && v.url)
    onChange(validVideos)
  }

  const handleVideoChange = (index: number, field: 'key' | 'url', value: string) => {
    const newVideos = [...editingVideos]
    newVideos[index][field] = value

    setEditingVideos(newVideos)

    // If URL field changed, try to parse it
    if (field === 'url') {
      const parsed = parseVideoUrl(value)
      if (parsed) {
        newVideos[index].url = parsed
      }
    }

    // Update parent with valid videos
    const validVideos = newVideos.filter(v => v.key && v.url)
    onChange(validVideos)
  }

  return (
    <div className="space-y-4">
      {editingVideos.map((video, index) => (
        <div key={index} className="flex gap-3 items-start">
          {/* Video Title/Key */}
          <div className="flex-1">
            <input
              type="text"
              value={video.key}
              onChange={(e) => handleVideoChange(index, 'key', e.target.value)}
              placeholder="Video title (e.g., intro, demo, walkthrough)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]"
            />
          </div>

          {/* Video URL */}
          <div className="flex-[2]">
            <input
              type="text"
              value={video.url}
              onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
              placeholder="Paste YouTube or Vimeo URL (e.g., https://www.youtube.com/watch?v=...)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#2c66e2] focus:outline-none focus:ring-[#2c66e2]"
            />
          </div>

          {/* Remove Button */}
          {editingVideos.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveVideo(index)}
              className="mt-1 text-red-600 hover:text-red-700 transition-colors"
              title="Remove video"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}

      {/* Add Video Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddVideo}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Another Video
      </Button>

      {/* Help Text */}
      <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
        <p className="font-medium mb-1">💡 Quick Tips:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Title: Short name like "intro", "demo", "setup"</li>
          <li>YouTube: Paste any YouTube URL or just the video ID</li>
          <li>Vimeo: Paste any Vimeo URL or just the video ID</li>
          <li>The app will automatically extract the video ID for you!</li>
        </ul>
      </div>
    </div>
  )
}
