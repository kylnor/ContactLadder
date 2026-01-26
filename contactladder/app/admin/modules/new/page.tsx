import { ModuleEditor } from '@/components/admin/ModuleEditor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewModulePage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Create New Module</h1>
        <p className="mt-2 text-gray-600">
          Add a new training module to the platform.
        </p>
      </div>

      {/* Editor Form */}
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <ModuleEditor />
      </div>
    </div>
  )
}
