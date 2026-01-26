import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data: modules } = await supabase
  .from('modules')
  .select('slug, title, content')

console.log('Searching for modules with "Version" or "Audience" table...\n')

modules.forEach(m => {
  if (m.content && (m.content.includes('Version') && m.content.includes('Audience'))) {
    console.log('FOUND IN:', m.title, '(' + m.slug + ')')
    console.log('First 800 chars:')
    console.log(m.content.substring(0, 800))
    console.log('\n---\n')
  }
})
