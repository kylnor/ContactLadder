import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default async function OnboardingPage() {
  const supabase = await createClient()

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if already completed onboarding
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('onboarding_completed')
    .eq('user_id', user.id)
    .single()

  if (preferences?.onboarding_completed) {
    redirect('/dashboard')
  }

  // Get user profile for name
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const userName = profile?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <OnboardingFlow userName={userName} userId={user.id} />
    </div>
  )
}
