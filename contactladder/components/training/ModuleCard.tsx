import Link from 'next/link'
import { ModuleMetadata } from '@/types'
import { Clock, BookOpen, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModuleCardProps {
  module: ModuleMetadata
  progress?: {
    status: 'not_started' | 'in_progress' | 'completed'
    progressPercent: number
  }
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  const categoryColors = {
    essentials: 'bg-[#2c66e2]/10 text-[#2c66e2] border-[#2c66e2]/20',
    'deep-dive': 'bg-[#F37C5F]/10 text-[#F37C5F] border-[#F37C5F]/20',
    'mini-guide': 'bg-[#4DBDBD]/10 text-[#4DBDBD] border-[#4DBDBD]/20',
  }

  const statusIcons = {
    completed: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    in_progress: (
      <div className="h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    ),
    not_started: null,
  }

  return (
    <Link
      href={`/training/${module.category}/${module.slug}`}
      className="group flex h-full min-h-[280px] flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-gray-300 hover:-translate-y-1"
    >
      <div className="mb-3 flex items-start justify-between">
        <span
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium',
            categoryColors[module.category]
          )}
        >
          {module.category === 'deep-dive'
            ? 'Deep Dive'
            : module.category === 'mini-guide'
            ? 'Mini Guide'
            : 'Essentials'}
        </span>

        {progress && statusIcons[progress.status]}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-[#2c66e2]">
        {module.title}
      </h3>

      <p className="mb-4 flex-1 line-clamp-2 text-sm text-gray-600">
        {module.description}
      </p>

      {progress && progress.status === 'in_progress' && (
        <div className="mb-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#2c66e2] transition-all"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {progress.progressPercent}% complete
          </p>
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{module.estimatedDuration} min</span>
        </div>

        {module.prerequisites && module.prerequisites.length > 0 && (
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{module.prerequisites.length} prerequisites</span>
          </div>
        )}
      </div>
    </Link>
  )
}
