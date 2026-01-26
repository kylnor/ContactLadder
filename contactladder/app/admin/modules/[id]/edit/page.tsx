import { createClient } from '@/lib/supabase/server'
import { ModuleEditor } from '@/components/admin/ModuleEditor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface EditModulePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditModulePage({ params }: EditModulePageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch module
  const { data: module, error } = await supabase
    .from('modules')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !module) {
    notFound()
  }

  // Prepare initial data for editor
  const initialData = {
    title: module.title,
    slug: module.slug,
    category: module.category,
    order_index: module.order_index,
    description: module.description || '',
    estimated_duration: module.estimated_duration,
    prerequisites: module.prerequisites?.join(', ') || '',
    video_urls: JSON.stringify(module.video_urls || {}, null, 2),
    header_image: module.header_image || '',
    content: module.content || '',
    is_published: module.is_published,
  }

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Modules
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Module</h1>
        <p className="mt-2 text-gray-600">
          Update the training module content and settings.
        </p>
      </div>

      {/* Editor Form */}
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <ModuleEditor moduleId={id} initialData={initialData} />
      </div>
    </div>
  )
}
