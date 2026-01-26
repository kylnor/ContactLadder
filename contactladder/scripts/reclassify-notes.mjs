import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Update the notes module to be a deep dive
const { data, error } = await supabase
  .from('modules')
  .update({ 
    category: 'deep-dive',
    title: 'DEEP DIVE: NOTES & ACTIVITY LOGGING',
    estimated_duration: 60
  })
  .eq('slug', 'notes-activity-logging')
  .select()

if (error) {
  console.log('Error:', error)
} else {
  console.log('✓ Updated module:')
  console.log('  Title:', data[0].title)
  console.log('  Category:', data[0].category)
  console.log('  Duration:', data[0].estimated_duration, 'min')
}
