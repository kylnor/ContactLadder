import { createBrowserClient } from '@supabase/ssr'

// Cloud Supabase client configuration
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  console.log('[Supabase Client] URL:', url)
  console.log('[Supabase Client] Key exists:', !!key)

  return createBrowserClient(url, key)
}
