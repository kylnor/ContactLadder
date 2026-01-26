'use client'

import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
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

interface ModuleListItemProps {
  module: Module
}

export function ModuleListItem({ module }: ModuleListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/admin/modules/${module.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Reload the page to show updated list
        window.location.reload()
      } else {
        alert('Failed to delete module')
        setIsDeleting(false)
        setShowDeleteConfirm(false)
      }
    } catch (error) {
      console.error('Error deleting module:', error)
      alert('Failed to delete module')
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
        {module.order_index}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {module.title}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm">
        {module.is_published ? (
          <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
            Published
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
            Draft
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {module.estimated_duration} min
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
        <div className="flex items-center justify-end gap-2">
          {/* Preview */}
          {module.is_published && (
            <Link
              href={`/training/${module.category}/${module.slug}`}
              target="_blank"
              className="text-gray-600 hover:text-[#2c66e2] transition-colors"
              title="Preview"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}

          {/* Edit */}
          <Link
            href={`/admin/modules/${module.id}/edit`}
            className="text-gray-600 hover:text-[#2c66e2] transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </Link>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`transition-colors ${
              showDeleteConfirm
                ? 'text-red-600 hover:text-red-700'
                : 'text-gray-600 hover:text-red-600'
            } ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={showDeleteConfirm ? 'Click again to confirm' : 'Delete'}
          >
            <Trash2 className="h-4 w-4" />
          </button>

          {showDeleteConfirm && (
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}
