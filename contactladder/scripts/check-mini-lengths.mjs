import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data: miniGuides } = await supabase
  .from('modules')
  .select('slug, title, estimated_duration, content')
  .eq('category', 'mini-guide')
  .order('estimated_duration', { ascending: false })

console.log('Remaining Mini-Guides:\n')
miniGuides.forEach(m => {
  const contentLength = m.content?.length || 0
  const estimatedWords = Math.round(contentLength / 5)
  const estimatedMinutes = Math.round(estimatedWords / 200) // ~200 words/min reading
  
  console.log(`${m.title}`)
  console.log(`  Listed duration: ${m.estimated_duration} min`)
  console.log(`  Content: ${contentLength} chars (~${estimatedWords} words, ~${estimatedMinutes} min read)`)
  console.log()
})
