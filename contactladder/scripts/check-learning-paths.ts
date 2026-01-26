import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import path from 'path'

config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkLearningPaths() {
  const { data: preferences, error } = await supabase
    .from('user_preferences')
    .select('user_id, onboarding_completed, recommended_modules, onboarding_assessment')

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('User Learning Paths:\n')
  preferences?.forEach((pref, i) => {
    console.log(`User ${i + 1}: ${pref.user_id}`)
    console.log(`Onboarding: ${pref.onboarding_completed ? 'Complete' : 'Not complete'}`)
    console.log(`Recommended modules: ${pref.recommended_modules?.length || 0}`)
    if (pref.recommended_modules) {
      console.log('Modules:', pref.recommended_modules.slice(0, 5).join(', '), '...')
    }
    console.log('---\n')
  })
}

checkLearningPaths()
