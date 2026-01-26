'use client'

import { useState, useEffect } from 'react'
import { ModuleCard } from '@/components/training/ModuleCard'
import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ModuleMetadata } from '@/types'

interface SearchModulesProps {
  allModules: ModuleMetadata[]
}

export function SearchModules({ allModules }: SearchModulesProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ModuleMetadata[]>([])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = allModules.filter((module) => {
      return (
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.category.toLowerCase().includes(query)
      )
    })

    setSearchResults(filtered)
  }, [searchQuery, allModules])

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Search Modules
          </h1>
          <p className="text-lg text-gray-600">
            Find the training module you need
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 relative">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by title, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 text-base"
            />
          </div>
        </div>

        {/* Results */}
        {searchQuery && (
          <div>
            <p className="mb-6 text-sm text-gray-600">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </p>

            {searchResults.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((module) => (
                  <ModuleCard key={module.slug} module={module} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  No modules found matching "{searchQuery}"
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              Start typing to search for modules
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
