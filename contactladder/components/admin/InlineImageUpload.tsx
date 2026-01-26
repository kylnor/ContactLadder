'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function InlineImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('module-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('module-images')
        .getPublicUrl(fileName)

      setUploadedUrl(publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const copyMarkdown = () => {
    if (!uploadedUrl) return

    const markdown = `![Image description](${uploadedUrl})`
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        Upload Screenshot or Image
      </h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!uploadedUrl ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? 'Uploading...' : 'Choose Image'}
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
            <img
              src={uploadedUrl}
              alt="Uploaded"
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyMarkdown}
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Markdown
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setUploadedUrl(null)
                setCopied(false)
              }}
            >
              Upload Another
            </Button>
          </div>

          <div className="rounded bg-gray-50 p-2">
            <code className="text-xs text-gray-700 break-all">
              ![Image description]({uploadedUrl})
            </code>
          </div>

          <p className="text-xs text-gray-600">
            Paste this markdown into your content wherever you want the image to appear
          </p>
        </div>
      )}
    </div>
  )
}
