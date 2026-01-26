'use client'

interface VideoPlayerProps {
  videoUrl: string
  title?: string
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
      <iframe
        src={videoUrl}
        title={title || 'Training video'}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
