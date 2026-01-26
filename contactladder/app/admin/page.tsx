import { createClient } from '@/lib/supabase/server'
import { ModuleListItem } from '@/components/admin/ModuleListItem'
import { Plus, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Module {
  id: string
  slug: string
  title: string
  category: 'essentials' | 'deep-dive' | 'mini-guide'
  order_index: number
  estimated_duration: number
  is_published: boolean
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch ALL modules (including unpublished)
  // Note: This uses the admin RLS policy which allows admins to see all modules
  const { data: modules, error } = await supabase
    .from('modules')
    .select('id, slug, title, category, order_index, estimated_duration, is_published')
    .order('category')
    .order('order_index')

  if (error) {
    console.error('Error fetching modules:', error)
  }

  const allModules = (modules || []) as Module[]

  // Group modules by category
  const essentials = allModules.filter((m) => m.category === 'essentials')
  const deepDives = allModules.filter((m) => m.category === 'deep-dive')
  const miniGuides = allModules.filter((m) => m.category === 'mini-guide')

  return (
    <div className="mx-auto max-w-7xl px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Training Modules</h2>
          <p className="mt-2 text-gray-600">
            Manage all training content. Create, edit, or delete modules.
          </p>
        </div>

        <Link href="/admin/modules/new">
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Module
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600">Total Modules</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{allModules.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600">Published</h3>
          <p className="mt-2 text-3xl font-bold text-[#4DBDBD]">
            {allModules.filter((m) => m.is_published).length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600">Drafts</h3>
          <p className="mt-2 text-3xl font-bold text-gray-500">
            {allModules.filter((m) => !m.is_published).length}
          </p>
        </div>
      </div>

      {/* Essentials */}
      {essentials.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Essentials</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {essentials.map((module) => (
                  <ModuleListItem key={module.id} module={module} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Deep Dives */}
      {deepDives.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Deep Dives</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {deepDives.map((module) => (
                  <ModuleListItem key={module.id} module={module} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Mini Guides */}
      {miniGuides.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Mini Guides</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {miniGuides.map((module) => (
                  <ModuleListItem key={module.id} module={module} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Empty State */}
      {allModules.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No modules yet
          </h3>
          <p className="mt-2 text-gray-600">
            Get started by creating your first training module.
          </p>
          <Link href="/admin/modules/new">
            <Button className="mt-6">
              <Plus className="mr-2 h-5 w-5" />
              Create Module
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
