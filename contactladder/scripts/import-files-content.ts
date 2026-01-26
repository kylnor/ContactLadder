/**
 * Import Training Modules from /files directory
 *
 * Migrates all markdown files to database with proper metadata
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ModuleData {
  title: string
  slug: string
  category: 'essentials' | 'deep-dive' | 'mini-guide'
  order_index: number
  description: string
  estimated_duration: number
  prerequisites: string[]
  video_urls: Record<string, string>
  content: string
  is_published: boolean
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].replace(/CLOZE\s+/i, '').trim() : 'Untitled'
}

function createSlug(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/^(Deep_Dive_\d+_|Essentials_Module_\d+[A-Z]?_|Mini_(Guide|Module|Course)_)/i, '')
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function determineCategory(filename: string): 'essentials' | 'deep-dive' | 'mini-guide' {
  if (filename.includes('Deep_Dive')) return 'deep-dive'
  if (filename.includes('Essentials') || filename.includes('cloze_essentials')) return 'essentials'
  if (filename.includes('Mini')) return 'mini-guide'
  if (filename.includes('Advanced')) return 'deep-dive'
  if (filename.includes('Connections_Hub')) return 'deep-dive'
  return 'essentials'
}

function extractOrderIndex(filename: string): number {
  const match = filename.match(/_(\d+)_/)
  return match ? parseInt(match[1]) : 99
}

function estimateDuration(content: string): number {
  const wordCount = content.trim().split(/\s+/).length
  const readingSpeed = 200 // words per minute
  const duration = Math.ceil(wordCount / readingSpeed)

  // Deep dives are typically longer
  if (content.includes('DEEP DIVE')) {
    return Math.max(duration, 45)
  }

  // Mini guides are shorter
  if (content.includes('Mini')) {
    return Math.min(duration, 20)
  }

  return duration
}

function extractDescription(content: string): string {
  // Try to find "Goal:" line
  const goalMatch = content.match(/\*\*Goal:\*\*\s*(.+?)(?:\n|$)/i)
  if (goalMatch) return goalMatch[1].trim()

  // Try to find first paragraph after title
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && !line.startsWith('#') && !line.startsWith('---') && line.length > 20) {
      return line.substring(0, 200)
    }
  }

  return 'Comprehensive training module'
}

function shouldSkipFile(filename: string): boolean {
  const skipPatterns = [
    'Summary',
    'Research',
    'Recommendations',
    'Outline',
    'Session',
  ]
  return skipPatterns.some(pattern => filename.includes(pattern))
}

async function importModules() {
  console.log('🚀 Starting import from /files directory...\n')

  const filesDir = path.join(process.cwd(), '..', 'files')

  if (!fs.existsSync(filesDir)) {
    console.error('❌ /files directory not found')
    console.log('Looking in:', filesDir)
    process.exit(1)
  }

  const files = fs.readdirSync(filesDir).filter(f =>
    f.endsWith('.md') && !shouldSkipFile(f)
  )

  console.log(`📁 Found ${files.length} training modules to import\n`)

  let imported = 0
  let skipped = 0
  let errors: string[] = []

  for (const filename of files) {
    try {
      const filePath = path.join(filesDir, filename)
      const content = fs.readFileSync(filePath, 'utf-8')

      const moduleData: ModuleData = {
        title: extractTitle(content),
        slug: createSlug(filename),
        category: determineCategory(filename),
        order_index: extractOrderIndex(filename),
        description: extractDescription(content),
        estimated_duration: estimateDuration(content),
        prerequisites: [],
        video_urls: {},
        content: content.trim(),
        is_published: false, // Start as draft
      }

      const dbData = {
        ...moduleData,
        content_path: `files/${filename}`,
      }

      const { error } = await supabase
        .from('modules')
        .upsert(dbData, { onConflict: 'slug' })

      if (error) {
        errors.push(`${filename}: ${error.message}`)
        console.log(`   ❌ ${moduleData.title} - ${error.message}`)
        skipped++
      } else {
        console.log(`   ✅ ${moduleData.title} (${moduleData.category}, ${moduleData.estimated_duration} min)`)
        imported++
      }

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      errors.push(`${filename}: ${errorMsg}`)
      console.log(`   ❌ ${filename} - ${errorMsg}`)
      skipped++
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 IMPORT SUMMARY')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✅ Successfully imported: ${imported} modules`)
  console.log(`⏭️  Skipped/Failed: ${skipped} modules`)

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:')
    errors.forEach(err => console.log(`   - ${err}`))
  }

  console.log('\n🎉 Import complete!')
  console.log('\n💡 Next steps:')
  console.log('   1. Go to http://localhost:3000/admin')
  console.log('   2. Review imported modules (all start as drafts)')
  console.log('   3. Add header images, videos, and prerequisites')
  console.log('   4. Publish when ready!')
}

importModules().catch(console.error)
