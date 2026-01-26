import { notFound } from 'next/navigation'
import { ModuleCategory } from '@/types'
import { getModule, moduleExists } from '@/lib/modules/db-loader'
import { parseMarkdown, extractVideoInfo } from '@/lib/modules/parser'
import { ModuleContent } from '@/components/training/ModuleContent'
import { VideoPlayer } from '@/components/training/VideoPlayer'
import { createClient } from '@/lib/supabase/server'
import { Clock, BookOpen } from 'lucide-react'
import Image from 'next/image'

interface ModulePageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { category, slug } = await params

  // Validate category
  const validCategories: ModuleCategory[] = ['essentials', 'deep-dive', 'mini-guide']
  if (!validCategories.includes(category as ModuleCategory)) {
    notFound()
  }

  // Check if module exists
  if (!(await moduleExists(category as ModuleCategory, slug))) {
    notFound()
  }

  // Load module
  const module = await getModule(category as ModuleCategory, slug)

  // Get user for personalization
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user preferences for personalization
  let personalizationData = {}
  if (user) {
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    personalizationData = {
      name: profile?.full_name || '',
      gciGoal: preferences?.gci_goal?.toString() || '',
      averageSalePrice: preferences?.average_sale_price?.toString() || '',
      commissionPercent: preferences?.commission_percent?.toString() || '',
      magicNumber: preferences?.magic_number?.toString() || '',
    }
  }

  // Parse markdown with personalization
  const htmlContent = await parseMarkdown(module.content, personalizationData)

  // Extract videos
  const videos = module.videos ? extractVideoInfo(module.videos) : []

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      {module.headerImage && (
        <div className="relative h-80 w-full overflow-hidden bg-gray-100">
          <Image
            src={module.headerImage}
            alt={module.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <header className="mb-8 border-b pb-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <span className="capitalize">{category.replace('-', ' ')}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {module.estimatedDuration} min
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {module.title}
          </h1>

          {module.description && (
            <p className="text-lg text-gray-600">{module.description}</p>
          )}

          {module.prerequisites && module.prerequisites.length > 0 && (
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-900">
                <BookOpen className="h-5 w-5" />
                Prerequisites
              </h3>
              <ul className="list-inside list-disc text-sm text-blue-800">
                {module.prerequisites.map((prereq, i) => (
                  <li key={i}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* Videos */}
        {videos.length > 0 && (
          <div className="mb-8 space-y-6">
            {videos.map((video) => (
              <div key={video.key}>
                <h3 className="mb-2 text-lg font-semibold capitalize">
                  {video.key.replace(/([A-Z])/g, ' $1').trim()} Video
                </h3>
                <VideoPlayer videoUrl={video.url} title={`${module.title} - ${video.key}`} />
              </div>
            ))}
          </div>
        )}

        {/* Module Content */}
        <ModuleContent
          htmlContent={htmlContent}
          moduleId={slug}
        />
      </div>
    </div>
  )
}
