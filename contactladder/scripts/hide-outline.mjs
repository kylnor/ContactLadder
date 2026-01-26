import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Find and unpublish the outline modules
const { data: outlines } = await supabase
  .from('modules')
  .select('slug, title, is_published')
  .or('slug.eq.cloze-essentials-outline,slug.eq.cloze-connections-hub')

console.log('Found outline modules:')
outlines.forEach(m => console.log('-', m.title, '- Published:', m.is_published))

// Unpublish them
const { error } = await supabase
  .from('modules')
  .update({ is_published: false })
  .or('slug.eq.cloze-essentials-outline,slug.eq.cloze-connections-hub')

if (error) {
  console.log('Error:', error)
} else {
  console.log('\n✓ Successfully hid outline modules from users')
}
