'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface ModuleContentProps {
  htmlContent: string
  moduleId: string
  onProgressUpdate?: (percent: number) => void
}

export function ModuleContent({
  htmlContent,
  moduleId,
  onProgressUpdate,
}: ModuleContentProps) {
  const router = useRouter()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const totalScroll = documentHeight - windowHeight
      const progress = Math.min(Math.round((scrollTop / totalScroll) * 100), 100)

      setScrollProgress(progress)
      onProgressUpdate?.(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onProgressUpdate])

  const handleMarkComplete = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/modules/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsCompleted(true)
        onProgressUpdate?.(100)

        // Navigate to next module or back to training
        if (data.nextModuleUrl) {
          router.push(data.nextModuleUrl)
        } else {
          router.push('/training')
        }
      } else {
        alert('Failed to mark module as complete')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error marking complete:', error)
      alert('Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Content */}
      <article
        className="prose prose-lg max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-900 prose-li:text-gray-900 prose-strong:text-gray-900 prose-td:text-gray-900 prose-th:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Mark complete button */}
      <div className="mt-12 flex justify-center">
        <Button
          size="lg"
          onClick={handleMarkComplete}
          disabled={isCompleted || isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving Progress...
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Module Complete
            </>
          ) : (
            'Mark as Complete'
          )}
        </Button>
      </div>
    </div>
  )
}
