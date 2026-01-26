import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import path from 'path'

// Load .env.local
config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function publishAllModules() {
  console.log('Publishing all modules...')

  const { data, error } = await supabase
    .from('modules')
    .update({ is_published: true })
    .eq('is_published', false)
    .select('slug, title')

  if (error) {
    console.error('Error publishing modules:', error)
    process.exit(1)
  }

  console.log(`\n✅ Published ${data?.length || 0} modules:\n`)
  data?.forEach((module) => {
    console.log(`   - ${module.title} (${module.slug})`)
  })

  console.log('\n🚀 All modules are now published!')
  process.exit(0)
}

publishAllModules()
