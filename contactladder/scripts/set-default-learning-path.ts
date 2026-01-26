import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import path from 'path'

config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function setDefaultLearningPath() {
  // A well-rounded learning path for most users
  const defaultPath = [
    'getting-started',
    'import-export',
    'properties',
    'deals-projects',
    'task-lists',
    'templates-campaigns',
    'cloze-ai-mastery',
    'mobile-workflows',
    'custom-fields',
    'analytics-reporting'
  ]

  const { data: users } = await supabase
    .from('user_preferences')
    .select('user_id')

  if (!users || users.length === 0) {
    console.log('No users found')
    return
  }

  for (const user of users) {
    const { error } = await supabase
      .from('user_preferences')
      .update({ recommended_modules: defaultPath })
      .eq('user_id', user.user_id)

    if (error) {
      console.error(`Error updating user ${user.user_id}:`, error)
    } else {
      console.log(`✅ Updated learning path for user ${user.user_id}`)
      console.log(`   Modules: ${defaultPath.length}`)
    }
  }

  console.log('\n🚀 All users now have a complete learning path!')
}

setDefaultLearningPath()
