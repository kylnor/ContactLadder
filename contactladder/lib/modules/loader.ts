import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ModuleMetadata, ModuleCategory } from '@/types'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ModuleWithContent extends ModuleMetadata {
  content: string
}

/**
 * Get all module files from a category directory
 */
export function getModulesByCategory(category: ModuleCategory): string[] {
  const categoryPath = path.join(contentDirectory, getCategoryFolder(category))

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const files = fs.readdirSync(categoryPath)
  return files.filter(file => file.endsWith('.md'))
}

/**
 * Get all modules across all categories
 */
export function getAllModules(): ModuleMetadata[] {
  const categories: ModuleCategory[] = ['essentials', 'deep-dive', 'mini-guide']
  const allModules: ModuleMetadata[] = []

  categories.forEach(category => {
    const files = getModulesByCategory(category)

    files.forEach(filename => {
      const slug = filename.replace(/\.md$/, '')
      const { data } = getModuleContent(category, slug)

      allModules.push({
        title: data.title || slug,
        slug,
        category,
        orderIndex: data.orderIndex || 0,
        estimatedDuration: data.estimatedDuration || 30,
        prerequisites: data.prerequisites || [],
        description: data.description || '',
        videos: data.videos || {},
        published: data.published !== false,
      })
    })
  })

  // Sort by category and order index
  return allModules.sort((a, b) => {
    if (a.category !== b.category) {
      const categoryOrder = { essentials: 1, 'deep-dive': 2, 'mini-guide': 3 }
      return categoryOrder[a.category] - categoryOrder[b.category]
    }
    return a.orderIndex - b.orderIndex
  })
}

/**
 * Get module content by category and slug
 */
export function getModuleContent(
  category: ModuleCategory,
  slug: string
): { data: any; content: string } {
  const categoryFolder = getCategoryFolder(category)
  const filePath = path.join(contentDirectory, categoryFolder, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Module not found: ${category}/${slug}`)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return { data, content }
}

/**
 * Get a single module with its metadata and content
 */
export function getModule(category: ModuleCategory, slug: string): ModuleWithContent {
  const { data, content } = getModuleContent(category, slug)

  return {
    title: data.title || slug,
    slug,
    category,
    orderIndex: data.orderIndex || 0,
    estimatedDuration: data.estimatedDuration || 30,
    prerequisites: data.prerequisites || [],
    description: data.description || '',
    videos: data.videos || {},
    published: data.published !== false,
    content,
  }
}

/**
 * Get category folder name
 */
function getCategoryFolder(category: ModuleCategory): string {
  const folderMap: Record<ModuleCategory, string> = {
    essentials: 'essentials',
    'deep-dive': 'deep-dives',
    'mini-guide': 'mini-guides',
  }
  return folderMap[category]
}

/**
 * Check if a module exists
 */
export function moduleExists(category: ModuleCategory, slug: string): boolean {
  const categoryFolder = getCategoryFolder(category)
  const filePath = path.join(contentDirectory, categoryFolder, `${slug}.md`)
  return fs.existsSync(filePath)
}

/**
 * Get module slugs for a category
 */
export function getModuleSlugs(category: ModuleCategory): string[] {
  const files = getModulesByCategory(category)
  return files.map(file => file.replace(/\.md$/, ''))
}
