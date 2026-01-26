import { getAllModules } from '@/lib/modules/db-loader'
import { ModuleCard } from '@/components/training/ModuleCard'
import { createClient } from '@/lib/supabase/server'
import { BookOpen, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function TrainingPage() {
  const modules = await getAllModules()
  const supabase = await createClient()

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user's progress for all modules
  let progressMap: Record<string, any> = {}
  let hasLearningPath = false

  if (user) {
    const { data: progressData } = await supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', user.id)

    if (progressData) {
      progressMap = progressData.reduce(
        (acc, p) => ({
          ...acc,
          [p.module_id]: p,
        }),
        {}
      )
    }

    // Check if they have a learning path
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('recommended_modules, onboarding_completed')
      .eq('user_id', user.id)
      .single()

    hasLearningPath =
      preferences?.onboarding_completed &&
      preferences?.recommended_modules?.length > 0
  }

  // Group modules by category
  const essentials = modules.filter((m) => m.category === 'essentials')
  const deepDives = modules.filter((m) => m.category === 'deep-dive')
  const miniGuides = modules.filter((m) => m.category === 'mini-guide')

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Training Catalog
          </h1>
          <p className="text-lg text-gray-600">
            Browse all available Cloze training modules. Start with
            Essentials, then dive deep into advanced features.
          </p>
        </div>

        {/* Learning Path Banner */}
        {hasLearningPath && (
          <div className="mb-12 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-6 w-6 flex-shrink-0 text-[#2c66e2]" />
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Looking for guidance?
                  </h3>
                  <p className="text-sm text-gray-700">
                    Follow your personalized learning path with curated modules in the
                    recommended order.
                  </p>
                </div>
              </div>
              <Link href="/learning-path">
                <Button>
                  View My Path
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Essentials */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#2c66e2]/10">
              <BookOpen className="h-6 w-6 text-[#2c66e2]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Essentials</h2>
              <p className="text-sm text-gray-600">
                Core features every agent needs to know - start here
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {essentials.map((module) => (
              <div key={module.slug} className="h-full">
                <ModuleCard
                  module={module}
                  progress={progressMap[module.slug]}
                />
              </div>
            ))}
          </div>

          {essentials.length === 0 && (
            <p className="text-gray-500">
              No modules available yet. Check back soon!
            </p>
          )}
        </section>

        {/* Deep Dives */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#F37C5F]/10">
              <BookOpen className="h-6 w-6 text-[#F37C5F]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Deep Dives</h2>
              <p className="text-sm text-gray-600">
                Advanced features for power users
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deepDives.map((module) => (
              <div key={module.slug} className="h-full">
                <ModuleCard
                  module={module}
                  progress={progressMap[module.slug]}
                />
              </div>
            ))}
          </div>

          {deepDives.length === 0 && (
            <p className="text-gray-500">
              No modules available yet. Check back soon!
            </p>
          )}
        </section>

        {/* Mini Guides */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#4DBDBD]/10">
              <BookOpen className="h-6 w-6 text-[#4DBDBD]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mini Guides</h2>
              <p className="text-sm text-gray-600">
                Quick reference guides for specific features
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {miniGuides.map((module) => (
              <div key={module.slug} className="h-full">
                <ModuleCard
                  module={module}
                  progress={progressMap[module.slug]}
                />
              </div>
            ))}
          </div>

          {miniGuides.length === 0 && (
            <p className="text-gray-500">
              No modules available yet. Check back soon!
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
