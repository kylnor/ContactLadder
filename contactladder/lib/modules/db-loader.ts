/**
 * Database Module Loader
 *
 * Loads training modules from Supabase database instead of file system
 * Drop-in replacement for the file-based loader
 */

import { createClient } from '@/lib/supabase/server'
import { ModuleMetadata, ModuleCategory } from '@/types'

export interface ModuleWithContent extends ModuleMetadata {
  content: string
  headerImage?: string
}

interface DatabaseModule {
  id: string
  slug: string
  title: string
  description: string
  category: ModuleCategory
  order_index: number
  estimated_duration: number
  prerequisites: string[]
  video_urls: Record<string, string>
  header_image?: string
  is_published: boolean
  content: string
  content_path: string
  created_at: string
  updated_at: string
}

/**
 * Convert database module to ModuleMetadata format
 */
function toModuleMetadata(dbModule: DatabaseModule): ModuleMetadata {
  return {
    title: dbModule.title,
    slug: dbModule.slug,
    category: dbModule.category,
    orderIndex: dbModule.order_index,
    estimatedDuration: dbModule.estimated_duration,
    prerequisites: dbModule.prerequisites || [],
    description: dbModule.description || '',
    videos: dbModule.video_urls || {},
    published: dbModule.is_published,
  }
}

/**
 * Convert database module to ModuleWithContent format
 */
function toModuleWithContent(dbModule: DatabaseModule): ModuleWithContent {
  return {
    ...toModuleMetadata(dbModule),
    content: dbModule.content || '',
    headerImage: dbModule.header_image,
  }
}

/**
 * Get all published modules across all categories
 */
export async function getAllModules(): Promise<ModuleMetadata[]> {
  const supabase = await createClient()

  const { data: modules, error } = await supabase
    .from('modules')
    .select('*')
    .eq('is_published', true)
    .order('category')
    .order('order_index')

  if (error) {
    console.error('Error fetching modules:', error)
    return []
  }

  if (!modules || modules.length === 0) {
    return []
  }

  return modules.map(toModuleMetadata)
}

/**
 * Get a single module with its metadata and content
 */
export async function getModule(
  category: ModuleCategory,
  slug: string
): Promise<ModuleWithContent> {
  const supabase = await createClient()

  const { data: module, error } = await supabase
    .from('modules')
    .select('*')
    .eq('category', category)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !module) {
    throw new Error(`Module not found: ${category}/${slug}`)
  }

  return toModuleWithContent(module)
}

/**
 * Check if a module exists
 */
export async function moduleExists(
  category: ModuleCategory,
  slug: string
): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('modules')
    .select('id')
    .eq('category', category)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  return !error && !!data
}

/**
 * Get module slugs for a category
 */
export async function getModuleSlugs(category: ModuleCategory): Promise<string[]> {
  const supabase = await createClient()

  const { data: modules, error } = await supabase
    .from('modules')
    .select('slug')
    .eq('category', category)
    .eq('is_published', true)
    .order('order_index')

  if (error || !modules) {
    return []
  }

  return modules.map(m => m.slug)
}

/**
 * Get modules by category
 */
export async function getModulesByCategory(category: ModuleCategory): Promise<ModuleMetadata[]> {
  const supabase = await createClient()

  const { data: modules, error } = await supabase
    .from('modules')
    .select('*')
    .eq('category', category)
    .eq('is_published', true)
    .order('order_index')

  if (error || !modules) {
    return []
  }

  return modules.map(toModuleMetadata)
}
