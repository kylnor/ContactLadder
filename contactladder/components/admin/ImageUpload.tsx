'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  aspectRatio?: 'video' | 'square' | 'wide'
}

export function ImageUpload({ value, onChange, label, aspectRatio = 'wide' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('module-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('module-images')
        .getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!value) return

    try {
      // Extract filename from URL
      const urlParts = value.split('/')
      const fileName = urlParts[urlParts.length - 1]

      // Delete from storage
      await supabase.storage
        .from('module-images')
        .remove([fileName])

      onChange('')
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {value ? (
        // Show uploaded image
        <div className="relative">
          <div className={`relative ${aspectRatioClasses[aspectRatio]} w-full rounded-lg overflow-hidden border border-gray-300`}>
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        // Show upload area
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative ${aspectRatioClasses[aspectRatio]} w-full rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2c66e2]"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </>
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
