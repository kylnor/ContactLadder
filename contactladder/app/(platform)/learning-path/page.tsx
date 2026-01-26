import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getAllModules } from '@/lib/modules/db-loader'
import { ModuleCard } from '@/components/training/ModuleCard'
import { LockedModuleCard } from '@/components/training/LockedModuleCard'
import { Sparkles, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LearningPathPage() {
  const supabase = await createClient()

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if they've completed onboarding
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!preferences?.onboarding_completed) {
    redirect('/onboarding')
  }

  // Get all modules
  const allModules = await getAllModules()

  // Get personalized recommendations
  const recommendedSlugs = preferences?.recommended_modules || []
  const personalizedModules = recommendedSlugs
    .map((slug: string) => allModules.find((m) => m.slug === slug))
    .filter(Boolean)

  // Get user progress
  const { data: progressData } = await supabase
    .from('module_progress')
    .select('*')
    .eq('user_id', user.id)

  const progressMap: Record<string, any> = {}
  if (progressData) {
    progressData.forEach((p) => {
      progressMap[p.module_id] = p
    })
  }

  const completedCount = personalizedModules.filter(
    (m: any) => progressMap[m.slug]?.status === 'completed'
  ).length

  const progressPercent = personalizedModules.length > 0
    ? Math.round((completedCount / personalizedModules.length) * 100)
    : 0

  // Determine which module is unlocked
  // Logic: You can access a module if all previous modules are completed
  const modulesWithLockState = personalizedModules.map((module: any, index: number) => {
    const isCompleted = progressMap[module.slug]?.status === 'completed'

    // First module is always unlocked
    if (index === 0) {
      return { ...module, isLocked: false, isCompleted }
    }

    // Check if all previous modules are completed
    const allPreviousCompleted = personalizedModules
      .slice(0, index)
      .every((m: any) => progressMap[m.slug]?.status === 'completed')

    return {
      ...module,
      isLocked: !allPreviousCompleted,
      isCompleted
    }
  })

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-[#2c66e2]" />
            <h1 className="text-4xl font-bold text-gray-900">
              Your Learning Path
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            A personalized curriculum designed just for you based on your goals and experience level
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {completedCount} of {personalizedModules.length} Complete
              </h2>
              <p className="text-sm text-gray-600">
                Keep going! Follow the modules in order for the best results.
              </p>
            </div>
            <Link href="/training">
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Modules
              </Button>
            </Link>
          </div>
          <div className="h-3 w-full rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2c66e2] to-[#4DBDBD] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Learning Path Modules */}
        {modulesWithLockState.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modulesWithLockState.map((module: any, index: number) => (
              <div key={module.slug} className="relative h-full">
                <div className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#2c66e2] text-sm font-bold text-white shadow-lg">
                  {index + 1}
                </div>
                {module.isLocked ? (
                  <LockedModuleCard module={module} position={index + 1} />
                ) : (
                  <ModuleCard module={module} progress={progressMap[module.slug]} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No Learning Path Yet
            </h3>
            <p className="mb-4 text-gray-600">
              Complete the onboarding assessment to get your personalized learning path
            </p>
            <Link href="/onboarding">
              <Button>
                <Sparkles className="mr-2 h-4 w-4" />
                Start Assessment
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
