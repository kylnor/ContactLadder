import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data, error } = await supabase
  .from('modules')
  .select('slug, title, content')
  .ilike('title', '%settings%preferences%')
  .single()

if (error) {
  console.log('Error:', error.message)
} else {
  console.log('Module:', data.title)
  console.log('Slug:', data.slug)
  console.log('Content length:', data.content?.length || 0)
  console.log('\nFirst 1000 chars of content:')
  console.log(data.content?.substring(0, 1000))
}
