/**
 * Content Migration Script
 *
 * Migrates markdown files from /content/ to Supabase database
 * Parses frontmatter and stores content in modules table
 *
 * Usage: npx tsx scripts/migrate-content-to-db.ts
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
import { config } from 'dotenv'
config({ path: path.join(process.cwd(), '.env.local') })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ModuleFrontmatter {
  title: string
  slug: string
  category: 'essentials' | 'deep-dive' | 'mini-guide'
  orderIndex: number
  estimatedDuration: number
  prerequisites: string[]
  description: string
  videos: Record<string, string>
  published: boolean
}

async function migrateContent() {
  console.log('🚀 Starting content migration...\n')

  const contentDir = path.join(process.cwd(), 'content')
  const categories = ['essentials', 'deep-dives', 'mini-guides']

  let totalMigrated = 0
  let totalSkipped = 0
  let errors: string[] = []

  for (const categoryDir of categories) {
    const categoryPath = path.join(contentDir, categoryDir)

    // Skip if directory doesn't exist
    if (!fs.existsSync(categoryPath)) {
      console.log(`⏭️  Skipping ${categoryDir} (directory not found)`)
      continue
    }

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))

    console.log(`📂 Processing ${categoryDir}/ (${files.length} files)`)

    for (const file of files) {
      const filePath = path.join(categoryPath, file)

      try {
        // Read and parse markdown file
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data: frontmatter, content } = matter(fileContent)

        const fm = frontmatter as ModuleFrontmatter

        // Map category directory to database enum value
        let dbCategory: 'essentials' | 'deep-dive' | 'mini-guide'
        if (categoryDir === 'deep-dives') {
          dbCategory = 'deep-dive'
        } else if (categoryDir === 'mini-guides') {
          dbCategory = 'mini-guide'
        } else {
          dbCategory = 'essentials'
        }

        // Prepare module data
        const moduleData = {
          slug: fm.slug,
          title: fm.title,
          description: fm.description || '',
          category: dbCategory,
          order_index: fm.orderIndex,
          estimated_duration: fm.estimatedDuration,
          prerequisites: fm.prerequisites || [],
          video_urls: fm.videos || {},
          is_published: fm.published !== false,
          content: content.trim(),
          content_path: `content/${categoryDir}/${file}`, // Keep for reference
        }

        // Insert into database (upsert based on slug)
        const { error } = await supabase
          .from('modules')
          .upsert(moduleData, { onConflict: 'slug' })

        if (error) {
          errors.push(`${file}: ${error.message}`)
          console.log(`   ❌ ${file} - ${error.message}`)
          totalSkipped++
        } else {
          console.log(`   ✅ ${fm.title}`)
          totalMigrated++
        }

      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error'
        errors.push(`${file}: ${errorMsg}`)
        console.log(`   ❌ ${file} - ${errorMsg}`)
        totalSkipped++
      }
    }

    console.log('') // Empty line between categories
  }

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 MIGRATION SUMMARY')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✅ Successfully migrated: ${totalMigrated} modules`)
  console.log(`⏭️  Skipped/Failed: ${totalSkipped} modules`)

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:')
    errors.forEach(err => console.log(`   - ${err}`))
  }

  console.log('\n🎉 Migration complete!')
  console.log('\n💡 Next steps:')
  console.log('   1. Verify modules in Supabase Studio: http://127.0.0.1:54323')
  console.log('   2. Rename content/ to content-backup/')
  console.log('   3. Test loading modules from database')
}

// Run migration
migrateContent().catch(console.error)
