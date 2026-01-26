import { createClient } from '@/lib/supabase/server'
import { getAllModules } from '@/lib/modules/db-loader'
import { ModuleCard } from '@/components/training/ModuleCard'
import { BookOpen, CheckCircle2, Clock, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { ResetOnboardingButton } from '@/components/dev/ResetOnboardingButton'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Not authenticated</div>
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user preferences and check onboarding
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Redirect to onboarding if not completed
  if (!preferences?.onboarding_completed) {
    redirect('/onboarding')
  }

  // Get all modules
  const allModules = await getAllModules()

  // Get personalized recommendations
  const recommendedSlugs = preferences?.recommended_modules || []
  const personalizedModules = recommendedSlugs
    .map((slug: string) => allModules.find(m => m.slug === slug))
    .filter(Boolean)
    .slice(0, 6)

  // Get user progress
  const { data: progressData } = await supabase
    .from('module_progress')
    .select('*')
    .eq('user_id', user.id)

  const completedModules = progressData?.filter((p) => p.status === 'completed') || []
  const inProgressModules = progressData?.filter((p) => p.status === 'in_progress') || []

  const completionPercentage = Math.round(
    (completedModules.length / allModules.length) * 100
  )

  // Get recently accessed modules
  const recentModules =
    progressData
      ?.sort(
        (a, b) =>
          new Date(b.last_accessed_at).getTime() -
          new Date(a.last_accessed_at).getTime()
      )
      .slice(0, 3) || []

  // Map progress to modules
  const recentModulesWithData = recentModules
    .map((progress) => {
      const module = allModules.find((m) => m.slug === progress.module_id)
      return module ? { module, progress } : null
    })
    .filter(Boolean) as Array<{ module: any; progress: any }>

  // Get next module in learning path
  const nextModule = personalizedModules.find((module: any) => {
    const progress = progressData?.find((p) => p.module_id === module.slug)
    return progress?.status !== 'completed'
  })

  // Check if next module exists and get its progress
  const nextModuleProgress = nextModule
    ? progressData?.find((p) => p.module_id === nextModule.slug)
    : null

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Welcome back, {profile?.full_name || 'there'}!
          </h1>
          <p className="text-lg text-gray-600">
            Continue your Cloze mastery journey
          </p>
        </div>

        {/* Continue Your Journey */}
        {nextModule && (
          <div className="mb-12 rounded-xl border-2 border-[#2c66e2] bg-gradient-to-br from-blue-50 via-white to-teal-50 p-8 shadow-lg">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-[#2c66e2]" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Continue Your Journey
                  </h2>
                </div>
                <p className="mb-4 text-gray-600">
                  {nextModuleProgress?.status === 'in_progress'
                    ? "Pick up where you left off"
                    : "Ready for your next module"}
                </p>
                <div className="rounded-lg bg-white/80 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-[#2c66e2] px-3 py-1 text-xs font-semibold text-white">
                      {nextModule.category === 'deep-dive'
                        ? 'Deep Dive'
                        : nextModule.category === 'mini-guide'
                        ? 'Mini Guide'
                        : 'Essentials'}
                    </span>
                    {nextModule.estimatedDuration && (
                      <span className="text-xs text-gray-600">
                        {nextModule.estimatedDuration} min
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-900">
                    {nextModule.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {nextModule.description}
                  </p>
                  {nextModuleProgress?.progress_percent > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-xs text-gray-600">
                          {nextModuleProgress.progress_percent}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-[#2c66e2]"
                          style={{ width: `${nextModuleProgress.progress_percent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link href={`/training/${nextModule.category}/${nextModule.slug}`}>
                  <Button size="lg" className="w-full min-w-[200px] text-lg">
                    {nextModuleProgress?.status === 'in_progress'
                      ? 'Continue Module'
                      : 'Start Module'} →
                  </Button>
                </Link>
                <Link href="/learning-path">
                  <Button size="lg" variant="outline" className="w-full">
                    View Full Path
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Total Modules</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{allModules.length}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <p className="text-3xl font-bold text-[#4DBDBD]">
              {completedModules.length}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <p className="text-3xl font-bold text-[#2c66e2]">
              {inProgressModules.length}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <p className="text-3xl font-bold text-[#F37C5F]">
              {completionPercentage}%
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Overall Progress
          </h2>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2c66e2] to-[#4DBDBD] transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {completedModules.length} of {allModules.length} modules completed
          </p>
        </div>

        {/* Personalized Learning Path */}
        {personalizedModules.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#2c66e2]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Your Personalized Learning Path
              </h2>
            </div>
            <div className="mb-4 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 p-4">
              <p className="text-sm text-gray-700">
                Based on your assessment, here are the modules we recommend for you:
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {personalizedModules.map((module: any, index: number) => (
                <div key={module.slug} className="relative h-full">
                  <div className="absolute -left-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#2c66e2] text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <ModuleCard module={module} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Modules */}
        {recentModulesWithData.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Continue Learning
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentModulesWithData.map(({ module, progress }) => (
                <ModuleCard
                  key={module.slug}
                  module={module}
                  progress={progress}
                />
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/learning-path">
              <Button size="lg">Continue Learning Path</Button>
            </Link>
            <Link href="/training">
              <Button size="lg" variant="outline">
                Browse All Modules
              </Button>
            </Link>
            <ResetOnboardingButton />
          </div>
        </section>
      </div>
    </div>
  )
}
