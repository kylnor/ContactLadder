import { ModuleMetadata } from '@/types'
import { Lock, Clock, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LockedModuleCardProps {
  module: ModuleMetadata
  position: number
}

export function LockedModuleCard({ module, position }: LockedModuleCardProps) {
  const categoryColors = {
    essentials: 'bg-[#2c66e2]/10 text-[#2c66e2] border-[#2c66e2]/20',
    'deep-dive': 'bg-[#F37C5F]/10 text-[#F37C5F] border-[#F37C5F]/20',
    'mini-guide': 'bg-[#4DBDBD]/10 text-[#4DBDBD] border-[#4DBDBD]/20',
  }

  return (
    <div className="relative flex h-full min-h-[280px] flex-col cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 p-6 opacity-60">
      {/* Lock Icon Overlay */}
      <div className="absolute right-4 top-4">
        <div className="rounded-full bg-gray-600 p-2">
          <Lock className="h-4 w-4 text-white" />
        </div>
      </div>

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
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-500">
        {module.title}
      </h3>

      <p className="mb-4 flex-1 line-clamp-2 text-sm text-gray-400">
        {module.description}
      </p>

      <div className="mb-4">
        <div className="rounded-lg bg-gray-200 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock className="h-3 w-3" />
            <span className="font-medium">Complete module {position - 1} to unlock</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400">
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
    </div>
  )
}
